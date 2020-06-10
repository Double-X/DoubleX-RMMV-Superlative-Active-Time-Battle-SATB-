// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Implementations"] = "v0.00a";
//

/*:
 * @plugindesc The implementation plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 *============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Thorough comprehension on the essence of this plugin on the user
 *           level
 *         - Thorough comprehension on the essence of RMMV ATB system plugins
 *         - Thorough comprehension on the essence of the default RMMV battle
 *           system implementations
 *         - Advanced RMMV plugin development proficiency to fully comprehend
 *           this plugin
 *      2. All reference tags are to have clear references between the
 *         Plugin Info and Plugin Implementations by searching them
 *      3. All intentionally hidden script calls can be found by searching
 *         ADVANCED_SCRIPT_CALLS_ONLY
 *----------------------------------------------------------------------------
 */

if (DoubleX_RMMV.Superlative_ATB_Parameters_File && DoubleX_RMMV.SATB) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the note result/running helper for SATB
 *----------------------------------------------------------------------------*/

function Game_SATBPhaseTypes() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBNotes() {
    "use strict";
    this.initialize.apply(this, arguments);
}
// DON'T USE THESE DIRECTLY ON YOUR OWN UNLESS YOU REALLY KNOW WHAT YOU'RE DOING
function Game_SATBCache() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBPairs() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBRules() {
    "use strict";
    this.initialize.apply(this, arguments);
}
//

    /*------------------------------------------------------------------------
     *    New types
     *------------------------------------------------------------------------*/
    /**
     * @enum @type {String} ChainRule - first, last, +, -, *, /, %, =, some,
     *                                  every
     * @type {{*}} Datum - The database datum
     * @enum @type {String} DatumType- Refer to reference tag NOTE_DATA_TYPES
     * @enum @type {String} Factor - Check _SATB._FACTOR_DATA in Game_SATBCache
     * @enum @type {String} Module - Refer to SATB._PARAM_MODULES in Game_System
     * @enum @type {String} NoteType - Check _SATB.PARAM_NOTE_FUNCS.notes in
     *                                 Game_System
     * @enum @type {{String}} Pairs - suffix1, entry1, suffix2, entry2, ...
     * @type {{Boolean, Datum, (**) -> *?}} PairFunc - Check _PAIR_FUNC in
     *                                                 Game_SATBPairs
     * @enum @type {String} Param - Check _SATB._PARAM_MODULES in Game_System
     * @enum @type {String} PluginCmd - Check _SATB._CMDS in Game_Interpreter
     * @enum @type {[String, [String|Number], **]} PluginArgs - The plugin
     *                                                          command argument
     * @type {String, [{String}]*} SATB - The datum notetag container
     * @enum @type {String} Suffix - Refer to reference tag NOTE_SUFFIX
     * @enum @type {String} TargetType - Refer to reference tag
     *                                   PLUGIN_CMD_TARGET_TYPE
     */

/*----------------------------------------------------------------------------
*    # Edit Javascript class: Array
*      - Adds methods combined from existing ones to be more GC friendly
*----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $ = Array.prototype;

    /**
     * @since v0.00a @version v0.00a
     * @param {(*, <T>, Index, [<T>]) -> Boolean} filterCallback - The callback
     *                                                             in the Array
     *                                                             filter method
     * @param {*?} filterThis_ - The context of filterCallback
     * @todo Makes fastFilter much faster than filter
     */
    $.fastFilter = $.fastFilter || function(filterCallback, filterThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        if (typeof filterCallback !== 'function') {
            throw new TypeError(filterCallback + ' is not a function');
        }
        var newArray = [];
        // forEach is tested to be the fastest among sandboxes including RMMV
        this.forEach(function(elem, i) {
            // It's ok to call undefined context with previously bound callbacks
            if (!filterCallback.call(filterThis_, elem, i, this)) return;
            newArray.push(elem);
            //
        });
        //
        return newArray;
    }; // $.fastFilter

    /**
     * @since v0.00a @version v0.00a
     * @param {(*, <T>, Index, [<T>]) -> *} mapCallback - The callback in the
     *                                                    Array map method
     * @param {*?} mapThis_ - The context of mapCallback
     */
    $.fastMap = $.fastMap || function(mapCallback, mapThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        }
        var newArray = [];
        // forEach is tested to be the fastest among sandboxes including RMMV
        this.forEach(function(elem, i) {
            // It's ok to call undefined context with previously bound callbacks
            newArray.push(mapCallback.call(mapThis_, elem, i, this));
            //
        });
        //
        return newArray;
    }; // $.fastMap

    /**
     * concat array that can be changed in place will lead to needless throwaway
     * push can't be applied to merge extremely long arrays so fastMerge is made
     * This method alters the original array(this) as it merges another in place
     * @since v0.00a @version v0.00a
     * @param {[*]} array - The array to be merged
     * @returns {This} The original array merged with another array in place
     */
    $.fastMerge = $.fastMerge || function(array) {
        // forEach is tested to be the fastest among sandboxes including RMMV
        array.forEach(function(elem) { this.push(elem); }, this);
        // array.forEach(this.push, this) can't be used as forEach has >1 args
        return this;
    }; // $.fastMerge

    /**
     * Chaining map with reduce will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in reduceCallback
     * @since v0.00a @version v0.00a
     * @param {(*, *, <T>, Index, [<T>]) -> *} reduceCallback - The callback in
     *                                                          the Array reduce
     *                                                          method
     * @param {*?} initVal_ - The initial value of reduceCallback
     * @param {*?} reduceThis_ - The context of reduceCallback
     * @todo Makes fastReduce much faster than reduce
     */
    $.fastReduce = $.fastReduce || function(reduceCallback, initVal_, reduceThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        var l = this.length, hasInitVal = initVal_ !== undefined;
        if (typeof reduceCallback !== 'function') {
            throw new TypeError(reduceCallback + ' is not a function');
        } else if (l <= 0 && !hasInitVal) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        if (hasInitVal) {
            var val = initVal_;
            // forEach is tested to be fastest among sandboxes including RMMV
            this.forEach(function(elem, i) {
                // It's ok to call undefined context with already bound callback
                val = reduceCallback.call(reduceThis_, val, elem, i);
                //
            });
            //
            return val;
        }
        /** @todo Uses forEach without checking if (i === 0) to be faster */
        var val = this[0], i = 1;
        while (i < l) {
            // It's ok to call undefined context with already bound callback
            val = reduceCallback.call(reduceThis_, val, this[i], i);
            //
            i++;
        }
        //
        return val;
    }; // $.fastReduce

    /**
     * Chaining filter with map will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in mapCallback
     * @since v0.00a @version v0.00a
     * @param {(*, <T>, Index, [<T>]) -> Boolean} filterCallback - The callback
     *                                                             in the Array
     *                                                             filter method
     * @param {(*, *, Index) -> *} mapCallback - The callback in the Array map
     *                                           method
     * @param {*?} filterThis_ - The context of filterCallback
     * @param {*?} mapThis_ - The context of mapCallback
     */
    $.filterMap = $.filterMap || function(filterCallback, mapCallback, filterThis_, mapThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        if (typeof filterCallback !== 'function') {
            throw new TypeError(filterCallback + ' is not a function');
        } else if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        }
        var newArray = [];
        // forEach is tested to be the fastest among sandboxes including RMMV
        this.forEach(function(elem, i) {
            // It's ok to call undefined context with previously bound callbacks
            if (!filterCallback.call(filterThis_, elem, i, this)) return;
            newArray.push(mapCallback.call(mapThis_, elem, i));
            //
        });
        //
        return newArray;
    }; // $.filterMap

    /**
     * Chaining map with filter will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in filterCallback
     * @since v0.00a @version v0.00a
     * @param {(*, <T>, Index, [<T>]) -> *} mapCallback - The callback in the
     *                                                    Array map method
     * @param {(*, *, Index) -> Boolean} filterCallback - The callback in the
     *                                                    Array filter method
     * @param {*?} mapThis_ - The context of mapCallback
     * @param {*?} filterThis_ - The context of filterCallback
     */
    $.mapFilter = $.mapFilter || function(mapCallback, filterCallback, mapThis_, filterThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        } else if (typeof filterCallback !== 'function') {
            throw new TypeError(filterCallback + ' is not a function');
        }
        var newArray = [];
        // forEach is tested to be the fastest among sandboxes including RMMV
        this.forEach(function(elem, i) {
            // It's ok to call undefined context with previously bound callbacks
            var mappedElem = mapCallback.call(mapThis_, elem, i, this);
            if (!filterCallback.call(filterThis_, mappedElem, i)) return;
            //
            newArray.push(mappedElem);
        });
        //
        return newArray;
    }; // $.mapFilter

    /**
     * Chaining map with reduce will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in reduceCallback
     * @since v0.00a @version v0.00a
     * @param {(*, <T>, Index, [<T>]) -> *} mapCallback - The callback in the
     *                                                    Array map method
     * @param {(*, *, *, Index) -> *} reduceCallback - The callback in the Array
     *                                                 reduce method
     * @param {*?} initVal_ - The initial value of reduceCallback
     * @param {*?} mapThis_ - The context of mapCallback
     * @param {*?} reduceThis_ - The context of reduceCallback
     */
    $.mapReduce = $.mapReduce || function(mapCallback, reduceCallback, initVal_, mapThis_, reduceThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        var l = this.length, hasInitVal = initVal_ !== undefined;
        if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        } else if (typeof reduceCallback !== 'function') {
            throw new TypeError(reduceCallback + ' is not a function');
        } else if (l <= 0 && !hasInitVal) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        if (hasInitVal) {
            var val = initVal_;
            // forEach is tested to be fastest among sandboxes including RMMV
            this.forEach(function(elem, i) {
                // It's ok to call undefined context with already bound callback
                var mappedElem = mapCallback.call(mapThis_, elem, i, this);
                val = reduceCallback.call(reduceThis_, val, mappedElem, i);
                //
            });
            //
            return val;
        }
        /** @todo Uses forEach without checking if (i === 0) to be faster */
        var val = this[0], i = 1;
        while (i < l) {
            // It's ok to call undefined context with already bound callback
            var mappedElem = mapCallback.call(mapThis_, this[i], i, this);
            val = reduceCallback.call(reduceThis_, val, mappedElem, i);
            //
            i++;
        }
        //
        return val;
    }; // $.mapReduce

    /*
    var preTestArray = [];
    for (var num = 1; num <= 10000000; num++) {
        preTestArray.push({ testNum: num });
    }
    var filterFunc = function(testObj) { return testObj.testNum % 2 === 0; };
    var mapFunc = function(testObj) {
        return { testNum: testObj.testNum, testMod3: testObj.testNum % 3 };
    };
    var reduceFunc = function(accumVal, testObj) {
        accumVal.push(testObj);
        // Object.keys(testObj).forEach(function(key) {
        //     accumVal[key] = (accumVal[key] || 0) + testObj[key];
        // });
        return accumVal;
    };
    */
    /*
    var reduceArrayFunc = function(accumArray, testArray) {
        // return accumArray.concat(testArray); // 1,000 * 1,000: 5485
        return accumArray.fastMerge(testArray); // 1,000 * 1,000: 99
        // This won't work if testArray is extremely large
        // Array.prototype.push.apply(accumArray, testArray); // 1,000 * 1,000: 71
        // return accumArray;
        //
    };
    */
    /*
    function testFastArrayFunc(oldArrayFunc, callbackFunc, newArrayFunc) {
        var preTestNow = Date.now();
        var postTestArray = preTestArray[oldArrayFunc](callbackFunc);
        console.info("preTestArray." + oldArrayFunc + "(callbackFunc)", Date.now() - preTestNow);
        console.info(preTestArray, postTestArray);
        var preTestNow = Date.now();
        var postTestArray = preTestArray[newArrayFunc](callbackFunc);
        console.info("preTestArray." + newArrayFunc + "(callbackFunc)", Date.now() - preTestNow);
        console.info(preTestArray, postTestArray);
    }
    */
    // Tests the correctness and performance of fastMap() with map()
    // testFastArrayFunc("filter", filterFunc, "fastFilter"); // 10,000,000: Old - 158, New - 149
    // testFastArrayFunc("map", mapFunc, "fastMap"); // 10,000,000: Old - 1829, New - 902
    // testFastArrayFunc("reduce", reduceFunc, "fastReduce"); // 10,000,000: Old - 629, New - 649(With initVal_)
    // testFastArrayFunc("reduce", reduceFunc, "fastReduce"); // 10,000,000: Old - 2237, New - 2183(Without initVal_)
    //
    /*
    function testArrayFuncs(oldArrayFunc1, callbackFunc1, oldArrayFunc2, callbackFunc2, newArrayFunc) {
        var preTestNow = Date.now();
        var postTestArray = preTestArray[oldArrayFunc1](callbackFunc1)[oldArrayFunc2](callbackFunc2);
        console.info("preTestArray." + oldArrayFunc1 + "(callbackFunc1)." + oldArrayFunc2 + "(callbackFunc2)", Date.now() - preTestNow);
        console.info(preTestArray, postTestArray);
        var preTestNow = Date.now();
        var postTestArray = preTestArray[newArrayFunc](callbackFunc1, callbackFunc2);
        console.info("preTestArray." + newArrayFunc + "(callbackFunc1, callbackFunc2)", Date.now() - preTestNow);
        console.info(preTestArray, postTestArray);
    }
    */
    // Tests the correctness and performance of filterMap() with filter().map()
    // testArrayFuncs("filter", filterFunc, "map", mapFunc, "filterMap"); // 10,000,000: Old - 1320, New - 517
    //
    // Tests the correctness and performance of filterMap() with filter().fastMap()
    // testArrayFuncs("filter", filterFunc, "fastMap", mapFunc, "filterMap"); // 10,000,000: Old - 781, New - 520
    //
    // Tests the correctness and performance of mapFilter() with map().filter()
    // testArrayFuncs("map", mapFunc, "filter", filterFunc, "mapFilter"); // 10,000,000: Old - 2130, New - 1050
    //
    // Tests the correctness and performance of mapFilter() with fastMap().filter()
    // testArrayFuncs("fastMap", mapFunc, "filter", filterFunc, "mapFilter"); // 10,000,000: Old - 1729, New - 1044
    //
    // Tests the correctness and performance of mapReduce() with map().reduce() and fastMap().reduce() with or without initVal_
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.map(mapFunc).reduce(reduceFunc, []); // 10,000,000: 2357
    console.info("preTestArray.map(mapFunc).reduce(reduceFunc, [])", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.fastMap(mapFunc).reduce(reduceFunc, []); // 10,000,000: 1448
    console.info("preTestArray.fastMap(mapFunc).reduce(reduceFunc, [])", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.mapReduce(mapFunc, reduceFunc, []); // 10,000,000: 929
    console.info("preTestArray.mapReduce(mapFunc, reduceFunc, [])", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.map(mapFunc).reduce(reduceFunc); // 10,000,000: 6666
    console.info("preTestArray.map(mapFunc).reduce(reduceFunc)", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.fastMap(mapFunc).reduce(reduceFunc); // 10,000,000: 5549
    console.info("preTestArray.fastMap(mapFunc).reduce(reduceFunc)", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    /*
    var preTestNow = Date.now();
    var postTestArray = preTestArray.mapReduce(mapFunc, reduceFunc); // 10,000,000: 972
    console.info("preTestArray.mapReduce(mapFunc, reduceFunc)", Date.now() - preTestNow);
    console.info(preTestArray, postTestArray);
    */
    //

})(); // Array.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.DataManager = { orig: {}, new: {} };
    var _DM = SATB.DataManager.orig, _SATB = SATB.DataManager.new;

    _SATB._ERASE_SWITCH_VAR_IDS = function(noteType, switchVar, id) {
        // Refer to reference tag SWITCH_VAR
        if (!_SATB._SWITCH_VARS[switchVar]) return;
        var ids = _SATB[_SATB._SWITCH_VARS[switchVar]];
        if (ids[id]) delete ids[id][noteType];
        //
    }; // _SATB._ERASE_SWITCH_VAR_IDS
    _SATB._SWITCH_VAR_ID = function(match) {
        return +match.replace(_SATB._SWITCH_VAR_ID_REGEX, "");
    }; // _SATB._SWITCH_VAR_ID
    _SATB._SWITCH_VAR_IDS = function(funcContent, regex) {
        // It's possible for a function content to use tons of switch/variables
        return (funcContent.match(regex) || []).fastMap(_SATB._SWITCH_VAR_ID);
        //
    }; // _SATB._SWITCH_VAR_IDS
    _SATB._UPDATE_IDS = function(factor, noteType, id, ids) {
        // Passing ids[id] as the function argument instead won't work at all
        var notes = ids[id] = ids[id] || {};
        //
        var factors = notes[noteType] = notes[noteType] || [];
        if (!factors.contains(factor)) factors.push(factor);
    }; // _SATB._UPDATE_IDS

    // Refers to reference tag NOTE_STRUCTURE
    _SATB._REG_EXP_NOTE = " *(?:doublex +rmmv +)?satb +(\\w+)";
    _SATB._REG_EXP_SUFFIX_SEPARATOR = " +";
    _SATB._REG_EXP_SUFFIXES =
            " +(\\w+(?:" + _SATB._REG_EXP_SUFFIX_SEPARATOR + "\\w+)*) *";
    _SATB._REG_EXP_ENTRY_SEPARATOR = " *, +";
    _SATB._REG_EXP_ENTRIES =
            " +(\\w+(?:" + _SATB._REG_EXP_ENTRY_SEPARATOR + "\\w+)*) *";

    _SATB._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SATB._REG_EXP_NOTE + _SATB._REG_EXP_SUFFIXES +
                ":" + _SATB._REG_EXP_ENTRIES + ">", "gim"),
        evalStart: new RegExp("<" + _SATB._REG_EXP_NOTE + " *>", "gim"),
        evalEnd: new RegExp("< *\/" + _SATB._REG_EXP_NOTE + " *>", "gim")
        //
    }; // _SATB._REG_EXPS
    //
    // Extracts the switch/variable id from results matching _SWITCH_VAR_REGEXES
    _SATB._SWITCH_VAR_ID_REGEX = /\D+/gim;
    //
    // Refer to reference tag SWITCH_VAR
    _SATB._SWITCH_VAR_REGEXES = {
        switch: /\$gameSwitches *\. *value *\( *(\d+) *\)/gim,
        var: /\$gameVariables *\. *value *\( *(\d+) *\)/gim
    }; // _SATB._SWITCH_VAR_REGEXES
    //
    _SATB._SWITCH_VARS = {
        switch: "switchIds",
        var: "varIds",
        script: "varIds"
    }; // _SATB._SWITCH_VARS
    _SATB.switchIds = {}, _SATB.varIds = {};

    _SATB._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _SATB.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v0.00a - v0.00a; Extended
        // Edited to read all notetags of this plugin as well
        var isLoaded = _DM.isDatabaseLoaded.apply(this, arguments);
        return isLoaded && _SATB._isDatabaseLoaded.call(this);
        // _isDatabaseLoaded must be placed here or the data might not be ready
    }; // DataManager.isDatabaseLoaded

    _DM.saveGame = DataManager.saveGame;
    _SATB.saveGame = DataManager.saveGame = function(contents) {
    // v0.00a - v0.00a; Extended
        // Added to clear all actor effective notetags to simplify saving
        $gameParty.clearSATBNotes();
        //
        var success = _DM.saveGame.apply(this, arguments);
        // Added to restores all actor effective notetags
        $gameParty.initSATBNotes();
        //
        return success;
    }; // DataManager.saveGame

    _DM.extractSaveContents = DataManager.extractSaveContents;
    _SATB.extractSaveContents = DataManager.extractSaveContents = function(contents) {
    // v0.00a - v0.00a; Extended
        _DM.extractSaveContents.apply(this, arguments);
        // Added to use the stored function contents
        _SATB._extractSaveContents.call(this);
        // This must be placed here or game objects won't be ready
    }; // DataManager.extractSaveContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {id} id - The id of the game variable
     * @param {*} val - The value of the game variable
     */
    DataManager.updateSATBNoteScriptInVar = function(id, val) {
        // Only variables storing strings can be scripts
        if (typeof val !== "string" && !(val instanceof String)) return;
        // Such strings having valid scan results are probably scripts anyway
        var notes = _SATB.varIds[id];
        // Only game variables storing scripts should have any valid scan result
        if (notes) Object.keys(notes).forEach(
                this.scanSATBFuncContentForSwitchVars.bind(this, val));
        //
    }; // DataManager.updateSATBNoteScriptInVar

    /**
     * The this pointer is DataManager
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} funcContent - The function content as the parameter value
     * @param {NoteType} noteType - The type of the note
     */
    DataManager.scanSATBFuncContentForSwitchVars = function(funcContent, noteType) {
        // Refer to reference tag SWITCH_VAR
        Object.keys(_SATB._SWITCH_VAR_REGEXES).forEach(
                _SATB._updateAllSwitchVarIds.bind(this, noteType, funcContent));
        //
    }; // DataManager.scanSATBFuncContentForSwitchVars

    /**
     * The this pointer is DataManager
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    DataManager.storeUpdatedSATBSwitchVarIds = function(noteType, switchVar_, id_, dataTypes_) {
        if (!switchVar_ || !id_ || !dataTypes_) return;
        if (dataTypes_.length > 0) {
            return dataTypes_.forEach(_SATB._updateSwitchVarIds.bind(
                    this, noteType, switchVar_, id_));
        }
        _SATB._ERASE_SWITCH_VAR_IDS(noteType, switchVar_, id_);
    }; // DataManager.storeUpdatedSATBSwitchVarIds

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The database loaded flag
     * @todo: Make this function Nullipotent to preserve the contract integrity
     */
    _SATB._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_SATB._areAllNotesLoaded) return true;
        _SATB._loadAllNotes.call(this);
        _SATB._areAllNotesLoaded = true;
        return true;
        //
    }; // _SATB._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._loadAllNotes = function() {
        // These note change factors must match those in the parameters plugin
        var allData = {
            actor: $dataActors,
            enemy: $dataEnemies,
            class: $dataClasses,
            weapons: $dataWeapons,
            armors: $dataArmors,
            states: $dataStates,
            skills: $dataSkills,
            items: $dataItems
        };
        //
        Object.keys(allData).forEach(function(datumType) {
            allData[datumType].forEach(_SATB._loadNote.bind(this, datumType));
        }, this);
    }; // _SATB._loadAllNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {Datum?} datum_ - The datum to have notetags loaded
     */
    _SATB._loadNote = function(datumType, datum_) {
        if (!datum_) return;
        var lines = datum_.note.split(/[\r\n]+/);
        // Storing datumType is to streamline the notetag datum type reading
        var satb = datum_.meta.satb = { datumType: datumType };
        //
        _SATB._readNote.call(this, satb, lines);
    }; // _SATB._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {SATB} satb - The datum plugin notetag container
     * @param {[String]} lines - List of lines being read for notetags to load
     */
    _SATB._readNote = function(satb, lines) {
        // It's tolerable and more performant than any declarative counterpart
        var isEvalLine = false, noteType = "", funcLines = [];
        lines.forEach(function(line) {
            if (line.match(_SATB._REG_EXPS.evalStart)) {
                // Marks that the next lines are function contents of noteType
                isEvalLine = true, noteType = RegExp.$1;
                //
            } else if (isEvalLine) {
                // evalEnd shouldn't be used without evalStart beforehand
                if (!line.match(_SATB._REG_EXPS.evalEnd)) {
                    // Stores eval notetag function contents
                    return funcLines.push(line);
                    //
                }
                //
                // Marks that the eval notetag function contents are fully read
                _SATB._loadEvalNote.call(this, satb, noteType, funcLines);
                isEvalLine = false, funcLines = [];
                //
            } else _SATB._loadBaseNote.call(this, satb, line);
        }, this);
        //
    }; //  _SATB._readNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {SATB} satb - The datum plugin notetag container
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} funcLines - The lines of the notetag function content
     */
    _SATB._loadEvalNote = function(satb, noteType, funcLines) {
        // Refers to reference tag NOTETAG_MULTI
        if (noteType !== RegExp.$1) return;
        var funcContent = funcLines.join("\n");
        _SATB._loadNotePairs.call(
                this, satb, noteType, ["eval"], [funcContent]);
        DataManager.scanSATBFuncContentForSwitchVars(funcContent, noteType);
        //
    }; //  _SATB._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {SATB} satb - The datum plugin notetag container
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SATB._loadBaseNote = function(satb, line) {
        // Refers to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SATB._REG_EXPS.base)) return;
        var suffixes =
                RegExp.$2.split(new RegExp(_SATB._REG_EXP_SUFFIX_SEPARATOR));
        var entries =
                RegExp.$3.split(new RegExp(_SATB._REG_EXP_ENTRY_SEPARATOR));
        _SATB._loadNotePairs.call(this, satb, RegExp.$1, suffixes, entries);
        //
    }; // _SATB._loadBaseNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {SATB} satb - The datum plugin notetag container
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     */
    _SATB._loadNotePairs = function(satb, noteType, suffixes, entries) {
        var pairs = _SATB._notePairs.call(
                this, satb.datumType, noteType, suffixes, entries);
        // push is much faster than concat and pairs isn't an array
        satb[noteType] = satb[noteType] || [];
        satb[noteType].push(pairs);
        //
    }; // _SATB._loadNotePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     * @returns {Pairs} The suffix-entry pair mapping
     */
    _SATB._notePairs = function(datumType, noteType, suffixes, entries) {
        // So those excessive suffixes/entries will be discarded right here
        var l = Math.min(suffixes.length, entries.length), i = 0, pairs = {};
        //
        // It's tolerable and more performant than any declarative counterpart
        while (i < l) { // while is at least slightly faster than for in general
            var count = i + 1, suffix = suffixes[i], entry = entries[i];
            // Refers to reference tag MULTI_SUFFIX_ENTRY
            pairs["suffix" + count] = suffix, pairs["entry" + count] = entry;
            //
            // Users changing the switch/var note map should update it manually
            _SATB._updateSwitchVarIds.call(
                    this, noteType, suffix, entry, datumType);
            //
            i++;
        }
        return pairs;
        //
    }; // _SATB._notePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The type of the note
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String} switchVar - Refer to reference tag SWITCH_VAR
     */
    _SATB._updateAllSwitchVarIds = function(noteType, funcContent, switchVar) {
        var regex = _SATB._SWITCH_VAR_REGEXES[switchVar];
        _SATB._SWITCH_VAR_IDS(funcContent, regex).forEach(function(id) {
            DataManager.storeUpdatedSATBSwitchVarIds(
                    noteType, switchVar, id, ["result"]);
        });
    }; // _SATB._updateAllSwitchVarIds

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {Suffix} suffix - The currently inspected suffix in the notetag
     * @param {String} entry - The currently inspected entry in the notetag
     * @param {DatumType} datumType - The type of the datum to be loaded
     */
    _SATB._updateSwitchVarIds = function(noteType, suffix, entry, datumType) {
        // All the other suffixes don't change the cached effective notetag list
        var factor = suffix === "script" ? datumType : "result";
        // But script changes the function content so the list must be voided
        var func = _SATB._UPDATE_IDS.bind(_SATB, factor, noteType, +entry);
        // Refer to reference tag SWITCH_VAR
        if (_SATB._SWITCH_VARS[suffix]) func(_SATB[_SATB._SWITCH_VARS[suffix]]);
        //
    }; // _SATB._updateSwitchVarIds

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._extractSaveContents = function() {
        $gameParty.initSATBNotes();
        ["params", "notes"].forEach(
                $gameSystem.extractSATBFuncContents, $gameSystem);
        $gameSystem.extractSATBSwitchVarIds();
    }; // _SATB._extractSaveContents

})(DoubleX_RMMV.SATB); // DataManager

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Edits the low level battle flow implementations to run this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.BattleManager = { orig: {}, new: {} };
    var _BM = SATB.BattleManager.orig, _SATB = SATB.BattleManager.new;

    _SATB._ACTOR_INDEX = function(actor) { return actor.index(); };
    // A new clean object must be returned or this clean state would be lost
    _SATB._CORE_TURN_CLOCK = function() {
        return { act: 0, frame: 0, sec: 0.0 };
    }; // _SATB._CORE_TURN_CLOCK
    //
    _SATB._REFRESH_MEM = function(mem) { mem.refresh(); };
    _SATB._REDUCED_AVG_AGI = function(agiSum, mem) { return agiSum + mem.agi; };
    _SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY = function(a, b) {
        return b.latestSATBItem.speed - a.latestSATBItem.speed;
    }; // _SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY

    _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "act", clockMax, [{
            clockUnit: "frame",
            clockMax: this.coreTurnSATBFrameClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            // clockMax is in ms rather than sec
            clockMax: this.coreTurnSATBSecClockMaxInMs(),
            //
            isInt: false
        }]);
    }; // _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "frame", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnSATBActClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            // clockMax is in ms rather than sec
            clockMax: this.coreTurnSATBSecClockMaxInMs(),
            //
            isInt: false
        }]);
    }; // _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "sec", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnSATBActClockMax(),
            isInt: true
        }, {
            clockUnit: "frame",
            clockMax: this.coreTurnSATBFrameClockMax(),
            isInt: true
        }]);
    }; // _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC

    _SATB.IS_VALID_RESULT = function(result) { // Hotspot
        // Using undefined is most memory efficient and using null's play safe
        return result !== null && result !== undefined;
        //
    }; // _SATB.IS_VALID_RESULT

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isRefresh: Whether at least 1 battler's refreshed
    //       {Boolean} canCoreTurnClockOverflow: Whether the turn clock counter
    //                                           can overflow to the next turn
    //       {[Game_Actor]} inputableActors: The list of all inputable actors
    //       {{Number}} coreTurnClock: Mapping of all turn clock unit counters
    //       {Natural Number} coreTurnActClockMax The turn clock maximum action
    //                                            counter
    //       {Natural Number} coreTurnFrameClockMax: The Turn clock maximum
    //                                               frame counter
    //       {+ve Number} coreTurnSecClockMax: The Turn clock maximum second
    //                                         counter(in milliseconds)
    //       {+ve Number} coreBaseFillFrameRate: The base ATB value fill rate by
    //                                           frames
    //       {+ve Number} coreBaseFillSecRate: The base ATB value fill rate by
    //                                         seconds
    //       {Number} avgAgi - The average agi of all battlers in the battle

    _BM.initMembers = BattleManager.initMembers;
    _SATB.initMembers = BattleManager.initMembers = function() {
    // v0.00a - v0.00a; Extended
        _BM.initMembers.apply(this, arguments);
        // Added to initialize all the new variables as well
        _SATB._init.call(this);
        //
    }; // BattleManager.initMembers

    _BM.isInputting = BattleManager.isInputting;
    _SATB.isInputting = BattleManager.isInputting = function() {
    // v0.00a - v0.00a; Extended
        // Added to keep the input windows opened if there are inputable actors
        if (this.isSATB()) return _SATB._hasInputableActors.call(this);
        //
        return _BM.isInputting.apply(this, arguments);
    }; // BattleManager.isInputting

    _BM.canEscape = BattleManager.canEscape;
    _SATB.canEscape = BattleManager.canEscape = function() {
    // v0.00a - v0.00a; Extended
        // Edited to disable party escape command when the ATB frame can update
        return _BM.canEscape.apply(this, arguments) && this.canSATBEsc();
        //
    }; // BattleManager.canEscape

    _BM.startBattle = BattleManager.startBattle;
    _SATB.startBattle = BattleManager.startBattle = function() {
    // v0.00a - v0.00a; Extended
        _BM.startBattle.apply(this, arguments);
        // Added to set the starting atb value for all battlers as well
        _SATB._startBattle.call(this);
        //
    }; // BattleManager.startBattle

    _BM.selectNextCommand = BattleManager.selectNextCommand;
    _SATB.selectNextCommand = BattleManager.selectNextCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to change the actor from being inputable to being able to act
        _SATB._selectNextCmd.call(this);
        // This must be placed here or the next inputable actor won't be setup
        _BM.selectNextCommand.apply(this, arguments);
    }; // BattleManager.selectNextCommand

    _BM.selectPreviousCommand = BattleManager.selectPreviousCommand;
    _SATB.selectPreviousCommand = BattleManager.selectPreviousCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to clear the currently inputable actor pose
        if (this.isSATB()) return this.clearActor();
        //
        _BM.selectPreviousCommand.apply(this, arguments);
    }; // BattleManager.selectPreviousCommand

    _BM.refreshStatus = BattleManager.refreshStatus;
    _SATB.refreshStatus = BattleManager.refreshStatus = function() {
    // v0.00a - v0.00a; Extended
        // Added to refresh all visible input windows as well
        _SATB._refreshStatus.call(this);
        //
        _BM.refreshStatus.apply(this, arguments);
    }; // BattleManager.refreshStatus

    _BM.startTurn = BattleManager.startTurn;
    _SATB.startTurn = BattleManager.startTurn = function() {
    // v0.00a - v0.00a; Extended
        // Edited to abandon the default battle system phase transitions
        if (!this.isSATB()) _BM.startTurn.apply(this, arguments);
        //
    }; // BattleManager.startTurn

    _BM.endAction = BattleManager.endAction;
    _SATB.endAction = BattleManager.endAction = function() {
    // v0.00a - v0.00a; Extended
        _BM.endAction.apply(this, arguments);
        // Added to update the ATB turn action counter
        _SATB._endAct.call(this);
        //
    }; // endAction

    ["processVictory", "processDefeat"].forEach(function(func) {
        _BM[func] = BattleManager[func];
        _SATB[func] = BattleManager[func] = function() {
        // v0.00a - v0.00a; Extended
            // Added to close all active input windows as well
            _SATB._procScene.call(this, "closeSATBInputWins");
            //
            _BM[func].apply(this, arguments);
        }; // BattleManager[func]
    });

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.isSATB = function() {
        // IT CAN'T BE CHANGED DURING THE SAME BATTLE SO NO CACHING'S NEEDED
        return $gameSystem.satbParamFunc("IsCoreEnabled")();
        //
    }; // BattleManager.isSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    BattleManager.coreBaseSATBFillRate = function() {
        // This can't be cached as FPS can vary at any time
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return _SATB._coreBaseFillFrameRate.call(this);
            } case "coreBaseFillATBSec": {
                return _SATB._coreBaseFillSecRate.call(this);
            } default: return 0; // So none of the ATB values will ever fill
            // Users should cache values themselves if there's costly computing
        }
        //
    }; // BattleManager.coreBaseSATBFillRate

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Natural Number} The maximum number of actions a turn can have
     */
    BattleManager.coreTurnSATBActClockMax = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreTurnATBAct")();
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreTurnActClockMax)) {
            this._satb.coreTurnActClockMax =
                    $gameSystem.satbParamFunc("coreTurnATBAct")();
        }
        return this._satb.coreTurnActClockMax;
    }; // BattleManager.coreTurnSATBActClockMax

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Natural Number} The maximum number of frames a turn can have
     */
    BattleManager.coreTurnSATBFrameClockMax = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBFrame")());
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreTurnFrameClockMax)) {
            var clockMax = $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBFrame")());
            this._satb.coreTurnFrameClockMax = clockMax;
        }
        return this._satb.coreTurnFrameClockMax;
    }; // BattleManager.coreTurnSATBFrameClockMax

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum number of seconds a turn can have
     */
    BattleManager.coreTurnSATBSecClockMaxInMs = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")()) * 1000.0;
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreTurnSecClockMax)) {
            var clockMax = $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")()) * 1000.0;
            this._satb.coreTurnSecClockMax = clockMax;
        }
        return this._satb.coreTurnSecClockMax;
    }; // BattleManager.coreTurnSATBSecClockMaxInMs

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canSATBEsc = function() {
        // Ensures party escape attempt won't trigger when the battle's busy
        if (!this.isSATB()) return true;
        if (!this._spriteset || !this._logWindow || this.isBusy()) return false;
        return this.canUpdateSATB() && this._phase !== 'action';
        //
    }; // BattleManager.canSATBEsc

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canUpdateSATB = function() {
        // Checks if cases always stopping global ATB frame update aren't met
        if (this.isAborting() || this.isBattleEnd()) return false;
        return $gameParty.inBattle() && this._phase !== 'init';
        //
    }; // BattleManager.canUpdateSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor to become inputable
     */
    BattleManager.addSATBInputableActor = function(actor) {
        if (!$gameParty.inBattle()) return;
        // Actors that can execute actions shouldn't be able to input actions
        if (this._actionBattlers.contains(actor)) return;
        //
        // Extracting them into a new method can lead to invalid states
        if (this._satb.inputableActors.contains(actor)) return;
        this._satb.inputableActors.push(actor);
        //
    }; // BattleManager.addSATBInputableActor

    /**
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler to become able to exec acts
     */
    BattleManager.addSATBActBattler = function(battler) {
        if (!$gameParty.inBattle() || !this.isSATB()) return;
        // No actor should be both inputable and able to execute actions
        if (battler.isActor()) this.eraseSATBInputableActor(battler);
        //
        // Extracting them into a new method can lead to invalid states
        if (this._actionBattlers.contains(battler)) return;
        battler.onBecomeActable();
        this._actionBattlers.push(battler);
        //
        _SATB._sortActBattlers.call(this);
    }; // BattleManager.addSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor to become not inputable
     */
    BattleManager.eraseSATBInputableActor = function(actor) {
        if (!$gameParty.inBattle()) return;
        var index = this._satb.inputableActors.indexOf(actor);
        if (index >= 0) this._satb.inputableActors.splice(index, 1);
        if (this.actor() === actor) return this.clearActor();
        // Otherwise inputable actors not being selected will have wrong poses
        actor.setActionState('');
        //
    }; // BattleManager.eraseSATBInputableActor

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler to become unable to exec acts
     */
    BattleManager.eraseSATBActBattler = function(battler) {
        if (!$gameParty.inBattle() || !this.isSATB()) return;
        // _subject shouldn't be in _actionBattlers so it's safe to always erase
        var index = this._actionBattlers.indexOf(battler);
        if (index >= 0) this._actionBattlers.splice(index, 1);
        //
    }; // BattleManager.eraseSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    BattleManager.raiseSATBMemNoteChangeFactors = function(note, factors) {
        if ($gameParty) this.satbMems().forEach(function(mem) {
            mem.raiseSATBNoteChangeFactors(note, factors);
        });
    }; // BattleManager.raiseSATBMemNoteChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.refreshAllSATBMems = function() {
        this.satbMems().forEach(_SATB._REFRESH_MEM);
    }; // BattleManager.refreshAllSATBMems

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    BattleManager.raiseRefreshedSATBMemChangeFactors = function(noteFactors) {
        this.satbMems().forEach(function(mem) {
            mem.raiseSATBChangeFactorsWithRefresh(noteFactors);
        });
    }; // BattleManager.raiseRefreshedSATBMemChangeFactors

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {[Game_Battler]} The list of all battlers used by this plugin
     */
    BattleManager.satbMems = function() {
        if ($gameParty.inBattle()) return this.allBattleMembers();
        return $gameParty.members();
    }; // BattleManager.satbMems

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.onSATBBattlerRefresh = function() {
        // It's possible for this method to be called before calling _SATB._init
        if (this._satb) this._satb.isRefreshNeeded = true;
        //
    }; // BattleManager.onSATBBattlerRefresh

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canUpdateSATBProc = function() {
        // Checks if the ATB frame update or action execution can be processed
        if (this.isAborting() || this.isBattleEnd()) {
            // There's no point in extracting these into a new method.function
            this.update();
            return false;
            //
        }
        return !$gameMessage.isBusy() && !this.updateEvent();
        //
    }; // BattleManager.canUpdateSATBProc

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.updateCoreSATB = function() {
        if (!this.canUpdateSATB()) return;
        _SATB._addCoreATB.call(this);
        _SATB._procTurn.call(this);
        // It's ok to run this even if the turn clock counter isn't time now
        _SATB._updateCoreTurnByTime.call(this);
        //
        if (!this._satb.isRefreshNeeded) return;
        this._satb.isRefreshNeeded = false;
        _SATB._procScene.call(this, "refreshStatus");
    }; // BattleManager.updateCoreSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {[Index]} The list of indices of all inputable actors
     */
    BattleManager.inputableSATBActorIndices = function() {
        return this._satb.inputableActors.fastMap(_SATB._ACTOR_INDEX);
    }; // BattleManager.inputableSATBActorIndices

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.updateSATBAct = function() {
        // Updates current action when finished execution on the current target
        if (this._phase === 'action' && !this.isBusy()) this.updateAction();
        //
    }; // BattleManager.updateSATBAct

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        this._satb = {
            avgAgi: _SATB._avgAgi.call(this),
            inputableActors: [], // It's a FIFO queu so an Array must be used
            coreTurnClock: _SATB._CORE_TURN_CLOCK()
        };
    }; // _SATB._init

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._hasInputableActors = function() {
        return this._satb.inputableActors.length > 0;
    }; // _SATB._hasInputableActors

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._startBattle = function() {
        if (!this.isSATB()) return;
        this._phase = 'turn';
        var startBattleFunc = _SATB._startBattleFunc.call(this);
        this.allBattleMembers().forEach(function(m) { m[startBattleFunc](); });
    }; // _SATB._startBattle

    /**
     * The this pointer is BattleManager
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @return {String} The name of the battler function setting the start ATB
     */
    _SATB._startBattleFunc = function() {
        if (this._preemptive) return "setPreemptStartSATB";
        return this._surprise ? "setSurpriseStartSATB" : "setNormStartSATB";
    }; // _SATB._startBattleFunc

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._selectNextCmd = function() {
        if (!this.isSATB()) return;
        var actor = this.actor();
        if (!actor) return;
        // All battlers always have at most 1 action slot only
        this.addSATBActBattler(actor);
        //
        // $gameParty.size() must be used or the actor pose will be all wrong
        this.changeActor($gameParty.size(), 'waiting');
        //
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refreshStatus = function() {
        _SATB._updateCachedVals.call(this);
        // Not calling refreshStatus is to avoid redundant status win refresh
        _SATB._procScene.call(this, "refreshSATBInputWins");
        //
        this._satb.isRefreshNeeded = false;
    }; // _SATB._refreshStatus

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCachedVals = function() {
        delete this._satb.canCoreTurnClockOverflow;
        delete this._satb.coreTurnActClockMax;
        delete this._satb.coreTurnFrameClockMax;
        delete this._satb.coreTurnSecClockMax;
        delete this._satb.coreBaseFillFrameRate;
        delete this._satb.coreBaseFillSecRate;
        this._satb.avgAgi = _SATB._avgAgi.call(this);
    }; // _SATB._updateCachedVals

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._endAct = function() {
        // It's ok to run this even if the turn clock counter isn't action now
        if (this.isSATB()) _SATB._updateCoreTurnClockByAct.call(this, 1);
        //
    }; // _SATB._endAct

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockByAct = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnSATBActClockMax();
        //
        var overflowFunc = _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "act", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockByAct

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {String} func - Name of the function in Scene_Battle to be called
     */
    _SATB._procScene = function(func) {
        // It serves as a helper function for calling Scene_Battle functions
        if ($gameParty.inBattle()) SceneManager._scene[func]();
        //
    }; // _SATB._procScene

    /**
     * The this pointer is BattleManager
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The average agi of all battlers in the battle
     */
    _SATB._avgAgi = function() {
        var mems = this.allBattleMembers();
        return mems.reduce(_SATB._REDUCED_AVG_AGI, 0) / mems.length;
    }; // _SATB._avgAgi

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillFrameRate = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return 1.0 / $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreBaseFillFrameRate)) {
            this._satb.coreBaseFillFrameRate =
                    1.0 / $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
        }
        return this._satb.coreBaseFillFrameRate;
    }; // _SATB._coreBaseFillFrameRate

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillSecRate = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return (1.0 / Graphics._fpsMeter.fps) /
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")();
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreBaseFillSecRate)) {
            this._satb.coreBaseFillSecRate =
                    1.0 / $gameSystem.satbParamFunc("coreBaseFillATBSec")();
        }
        // The FPS can't be cached as it can vary per frame
        return this._satb.coreBaseFillSecRate / Graphics._fpsMeter.fps;
        //
    }; // _SATB._coreBaseFillSecRate

    /**
     * This method's semantically idempotent but not technically so
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._sortActBattlers = function() {
        _SATB._updateActSpeeds.call(this);
        _SATB._sortActBattlersBySpeed.call(this);
    }; // _SATB._sortActBattlers

    /**
     * This method's semantically idempotent but not technically so
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._updateActSpeeds = function() {
        // 2000 is the action speed cap in the default RMMV editor
        var speedIncrement = 2000.0 / this._actionBattlers.length;
        //
        // Otherwise battlers with slow actions might never execute any action
        this._actionBattlers.forEach(function(battler) {
            var item = battler.latestSATBItem;
            // 2000 is the action speed cap in the default RMMV editor
            item.speed = Math.min(item.speed + speedIncrement, 2000);
            //
        });
        //
    }; // _SATB._updateActSpeeds

    /**
     * Idempotent
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._sortActBattlersBySpeed = function() {
        this._actionBattlers.sort(_SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY);
    }; // _SATB._sortActBattlersBySpeed

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._addCoreATB = function() {
        // It's better for the agi logic to stick together than spread out
        var fillRate = this.coreBaseSATBFillRate() / this._satb.avgAgi;
        this.allBattleMembers().forEach(function(mem) {
            mem.fillCoreSATB(fillRate * mem.agi);
        });
        //
    }; // _SATB._addCoreATB

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._procTurn = function() {
        if (this._phase === 'action') return;
        this._subject = this._subject || this.getNextSubject();
        if (this._subject) this.processTurn();
    }; // _SATB._procTurn

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCoreTurnByTime = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return _SATB._updateCoreTurnClockByFrame.call(this, 1);
            } case "coreBaseFillATBSec": {
                var incrementMs = 1000.0 / Graphics._fpsMeter.fps;
                _SATB._updateCoreTurnClockBySec.call(this, incrementMs);
            }
            //
        }
    }; // _SATB._updateCoreTurnByTime

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockByFrame = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnSATBFrameClockMax();
        //
        var overflowFunc = _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "frame", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockByFrame

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Number} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockBySec = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = false, clockMax = this.coreTurnSATBSecClockMaxInMs();
        //
        var overflowFunc = _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "sec", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockBySec

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     * @param {Boolean} isInt - Whether the ATB turn clock unit is an Integer
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    _SATB._updateCoreTurnClock = function(increment, isInt, clockUnit, clockMax, overflowFunc) {
        var clock = this._satb.coreTurnClock;
        clock[clockUnit] += increment;
        if (isInt) clock[clockUnit] = Math.floor(clock[clockUnit]);
        if (clock[clockUnit] < clockMax) return;
        _SATB._onMaxCoreTurnClock.call(this, clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClock

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    _SATB._onMaxCoreTurnClock = function(clockMax, overflowFunc) {
        // It's possible to change ATB turn clock unit during the same battle
        if (_SATB._canCoreTurnClockOverflow.call(this)) {
            // The other maximum ATB turn clock units must be calculated here
            overflowFunc(clockMax);
            //
        } else this._satb.coreTurnClock = _SATB._CORE_TURN_CLOCK();
        //
        _SATB._endTurn.call(this);
    }; // _SATB._onMaxCoreTurnClock

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._canCoreTurnClockOverflow = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("canCoreTurnClockOverflow")();
            //
        } else if (!_SATB.IS_VALID_RESULT(this._satb.coreTurnSecClockMax)) {
            this._satb.canCoreTurnClockOverflow =
                    $gameSystem.satbParamFunc("canCoreTurnClockOverflow")();
        }
        return this._satb.canCoreTurnClockOverflow;
    }; // _SATB._canCoreTurnClockOverflow

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {[{String, Number, Boolean}]} otherClockUnitData - Other clock
     *                                                           unit arguments
     */
    _SATB._onCoreTurnClockOverflow = function(clockUnit, clockMax, otherClockUnitData) {
        var clock = this._satb.coreTurnClock;
        clock[clockUnit] -= clockMax;
        // act and frame are integers but the proportion must be a real Number
        var newProportion = clock[clockUnit] * 1.0 / clockMax;
        //
        otherClockUnitData.forEach(
                _SATB._setNewCoreTurnClockProportion.bind(this, newProportion));
    }; // _SATB._onCoreTurnClockOverflow

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Number} newTurnClockProportion - The proportion of the other unit
     * @param {{String, Number, Boolean}} otherClockUnitDatum - Other clock
     *                                                          unit arguments
     */
    _SATB._setNewCoreTurnClockProportion = function(newTurnClockProportion, otherClockUnitDatum) {
        var clock = this._satb.coreTurnClock;
        var unit = otherClockUnitDatum.clockUnit;
        clock[unit] = otherClockUnitDatum.clockMax * newTurnClockProportion;
        if (unit.isInt) clock[unit] = Math.floor(clock[unit]);
    }; // _SATB._setNewCoreTurnClockProportion

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._endTurn = function() {
        this.allBattleMembers().forEach(_SATB._endMemTurn, this);
        // refreshStatus only need to be called once so the default's ignored
        this.refreshStatus();
        //
        $gameTroop.increaseTurn();
    }; // _SATB._endTurn

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} mem - The member to have his/her/its turn ended
     */
    _SATB._endMemTurn = function(mem) {
        mem.onTurnEnd();
        this._logWindow.displayAutoAffectedStatus(mem);
        this._logWindow.displayRegeneration(mem);
    }; // _SATB._endMemTurn

})(DoubleX_RMMV.SATB); // BattleManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores all params/configurations for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_System = { orig: {}, new: {} };
    var _GS = SATB.Game_System.orig, _SATB = SATB.Game_System.new;
    var $ = Game_System.prototype, DM = SATB.DataManager.new;

    _SATB._BOOL_PARAM = function(val) {
        return val === "true" || val !== "false";
    }; // _SATB._BOOL_PARAM
    _SATB._FUNC_CONTENT = function(func) {
        var funcStart = /^[^{]*{\s*/, funcEnd = /\s*}[^}]*$/;
        // Only the function contents are stored in save files
        return func.toString().replace(funcStart, "").replace(funcEnd, "");
        //
    }; // _SATB._FUNC_CONTENT
    _SATB._IS_FUNC_PARAM = function(param) { return param[0] !== "_"; };
    _SATB._JSON_PARAM = function(val) {
      // Some parameters written in notes might need to be parsed multiple times
      try {
          return _SATB._JSON_PARAM(JSON.parse(val));
      } catch (err) { return val; }
      //
    }; // _SATB._JSON_PARAM
    _SATB._RAW_PARAMS = function() {
        // There's no need to cache it as _RAW_PARAMS should only be called once
        var fileName = DoubleX_RMMV.Superlative_ATB_Parameters_File;
        var origParams = PluginManager.parameters(fileName);
        //
        // origParams mustn't be edited or false JSON fail messages would show
        var params = JSON.parse(JSON.stringify(origParams));
        //
        Object.keys(params).forEach(function(param) {
            if (_SATB._BOOL_PARAMS.contains(param)) {
                params[param] = _SATB._BOOL_PARAM(params[param]);
            } else if (_SATB._JSON_PARAMS.contains(param)) {
                params[param] = _SATB._TRY_JSON_PARAM(param, params[param]);
            }
        });
        return params;
    }; // _SATB._RAW_PARAMS
    _SATB._TRY_JSON_PARAM = function(param, val) {
        if (!val) return val;
        // It's possible for users to input raw parameter values directly
        try {
            return _SATB._JSON_PARAM(JSON.parse(val));
        } catch (err) {
            console.warn([
                "The value of the parameter " + param + " is",
                val,
                "Which should be entered via note rather than text",
                "The relevant stacktrace of DoubleX RMMV Superlative ATB is:",
                err.stack
            ].join("\n"));
            return val;
        }
        //
    }; // _SATB._TRY_JSON_PARAM
    // Using Function.bind would cause the function to have the wrong contect
    _SATB._0_ARG_FUNC = function(content) {
        return new Function("'use strict';\n" + content);
    };
    //

    // The new function argument names must all exactly match with the cfg parts
    _SATB.PARAM_NOTE_FUNCS = {
        params: {
            IsCoreEnabled: _SATB._0_ARG_FUNC,
            coreBaseFillATBFrame: _SATB._0_ARG_FUNC,
            coreBaseFillATBSec: _SATB._0_ARG_FUNC,
            coreTurnATBTime: function(content) {
                return new Function("baseFillATB", "'use strict';\n" + content);
            },
            coreTurnATBAct: _SATB._0_ARG_FUNC,
            canCoreTurnClockOverflow: _SATB._0_ARG_FUNC,
            coreMaxATBVal: _SATB._0_ARG_FUNC
        }, // params
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(content) {
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestMax", c);
            },
            coreActState: function(content) {
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", c);
            }
            //
        } // notes
    }; // _SATB.PARAM_NOTE_FUNCS
    //
    _SATB._PARAM_UPDATES = {
        coreMaxATBVal: function(switchVar_, id_, dataTypes_) {
            DataManager.storeUpdatedSATBSwitchVarIds(
                    "coreMax", switchVar_, id_, dataTypes_);
            // Only the default value might change so factor result is raised
            BattleManager.raiseSATBMemNoteChangeFactors("coreMax", ["result"]);
            //
        }, // coreMaxATBVal
        _coreMaxATBValNoteChainingRule: function() {
            BattleManager.raiseSATBMemNoteChangeFactors(
                    "coreMax", ["chainingRule"]);
        }, // _coreMaxATBValNoteChainingRule
        _coreMaxATBValNotePriorities: function() {
            BattleManager.raiseSATBMemNoteChangeFactors(
                    "coreMax", ["priority"]);
        }, // _coreMaxATBValNotePriorities
        _coreActStateNoteChainingRule: function() {
            BattleManager.raiseSATBMemNoteChangeFactors(
                    "coreActState", ["chainingRule"]);
        } // _coreActStateNoteChainingRule
    }; // _SATB._PARAM_UPDATES

    _SATB._BOOL_PARAMS = [
        "_isParamFuncCached",
        "_isNoteCached",
        "_isAlwaysRecacheAllSwitchVars"
    ];
    _SATB._JSON_PARAMS = [
        "IsCoreEnabled",
        "coreBaseFillATBFrame",
        "coreBaseFillATBSec",
        "coreTurnATBTime",
        "coreTurnATBAct",
        "canCoreTurnClockOverflow",
        "coreMaxATBVal",
        "_coreMaxATBValNotePriorities"
    ]; // _SATB._JSON_PARAMS

    _SATB._CACHED_PARAMS = { coreMaxATBVal: "coreMax" };
    // Not parsing from the parameter names directly's just to play safe
    _SATB._PARAM_MODULES = {
        _isParamFuncCached: "core",
        _isNoteCached: "core",
        _isAlwaysRecacheAllSwitchVars: "core",
        IsCoreEnabled: "core",
        _coreBaseFillUnit: "core",
        coreBaseFillATBFrame: "core",
        coreBaseFillATBSec: "core",
        _coreTurnUnit: "core",
        coreTurnATBTime: "core",
        coreTurnATBAct: "core",
        canCoreTurnClockOverflow: "core",
        coreMaxATBVal: "core",
        _coreMaxATBValNoteChainingRule: "core",
        _coreMaxATBValNotePriorities: "core",
        _coreActStateNoteChainingRule: "core"
    }; // _SATB._PARAM_MODULES
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {{{String}}} params: The container of all parameter values
    //       {{{String}}} notes: The container of all notetag function contents
    //       {{[String]}} switchIds: The game switch notetag factor mapping
    //       {{[String]}} varIds: The game variable notetag factor mapping

    _GS.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _GS.initialize.apply(this, arguments);
        _SATB._init.call(this); // Added to setup parameters/notetags
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} funcType - "params", "notes"
     */
    $.extractSATBFuncContents = function(funcType) {
        // params becomes Param and notes becomes Note
        var type = funcType.charAt(0).toUpperCase() + funcType.slice(1, -1);
        //
        // _extractParamFuncContents or _extractNoteFuncContents
        Object.keys(this._satb[funcType]).forEach(
                _SATB["_extract" + type + "FuncContents"], this);
        //
    }; // $.extractSATBFuncContents

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.extractSATBSwitchVarIds = function() {
        DM.switchIds = this._satb.switchIds, DM.varIds = this._satb.varIds;
    }; // $.extractSATBSwitchVarIds

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @returns {(**) -> *?} The parameter function return result
     */
    $.satbParamFunc = function(param) {
        // _SATB._PARAM_MODULES[param] is the module having the parameter
        return SATB.params[_SATB._PARAM_MODULES[param]][param];
        //
    }; // $.satbParamFunc

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @returns {String} The function content as the parameter value
     */
    $.satbParam = function(param) {
        // _SATB._PARAM_MODULES[param] is the module having the parameter
        return this._satb.params[_SATB._PARAM_MODULES[param]][param];
        //
    }; // $.satbParam

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    $.setSATBParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
        // _SATB._PARAM_MODULES[param] is the module having the parameter
        this._satb.params[_SATB._PARAM_MODULES[param]][param] = funcContent;
        //
        _SATB._updateParam.call(
                this, param, funcContent, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    /**
     * Script Call/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @returns {String} The notetag function content
     */
    $.satbNote = function(noteType, name) {
        return this._satb.notes[noteType][name];
    }; // $.satbNote

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    $.setSATBNote = function(noteType, name, funcContent, switchVar_, id_, dataTypes_) {
        this._satb.notes[noteType][name] = funcContent;
        _SATB._extractNoteFuncContent.call(this, noteType, name);
        // These are somehow duplicated but can still update different switchVar
        DataManager.scanSATBFuncContentForSwitchVars(funcContent, noteType);
        DataManager.storeUpdatedSATBSwitchVarIds(
                noteType, switchVar_, id_, dataTypes_);
        //
    }; // $.setSATBNote

    /**
     * The this pointer is Game_System.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        _SATB._initContainers.call(this);
        _SATB._storeParams.call(this);
        _SATB._storeNotes.call(this);
    }; // _SATB._init

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._initContainers = function() {
        this._satb = {
            params: { core: {} },
            notes: { coreMax: {}, coreActState: {} },
            // The DataManager counterparts are defined before calling this
            switchIds: DM.switchIds,
            varIds: DM.varIds
            //
        };
    }; // _SATB._initContainers

    /**
     * The this pointer is Game_System.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._storeParams = function() {
        var params = _SATB._RAW_PARAMS();
        Object.keys(params).forEach(_SATB._storeParam.bind(this, params));
    }; // _SATB._storeParams

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{String}} params - The parameter name-value map
     * @param {Param} param - The parameter name
     */
    _SATB._storeParam = function(params, param) {
        if (!_SATB._IS_FUNC_PARAM(param)) {
            return this.setSATBParam(param, params[param]);
        }
        this.setSATBParam(param, _SATB._param.call(this, param, params[param]));
    }; // _SATB._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} val - The stored raw parameter value
     */
    _SATB._param = function(param, val) {
        // Refers to reference tag PARAMETERS_CONFIGURATIONS
        return val || _SATB._FUNC_CONTENT(this.satbParamFunc(param));
        //
    }; // _SATB._param

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNotes = function() {
        Object.keys(SATB.notes).forEach(_SATB._storeNoteModule, this);
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {NoteType} type - The type of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNoteModule = function(type) {
        var note = SATB.notes[type];
        Object.keys(note).forEach(_SATB._storeNote.bind(this, type));
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {NoteType} type - The type of the note
     * @param {String} name - The name of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNote = function(type, name) {
        var noteFunc = SATB.notes[type][name];
        this._satb.notes[type][name] = _SATB._FUNC_CONTENT(noteFunc);
        DataManager.scanSATBFuncContentForSwitchVars(
                this.satbNote(type, name), type);
    }; // _SATB._storeNote

    ["Param", "Note"].forEach(function(type) {
        // Param becomes params and Note becomes notes
        var t = type.toLowerCase() + "s";
        //
        var func = "_extract" + type + "FuncContent";
        /**
         * The this pointer is Game_System.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {Module} module - The module of the stored function content
         */
        _SATB["_extract" + type + "FuncContents"] = function(module) {
            var paramNote = this._satb[t][module];
            Object.keys(paramNote).forEach(_SATB[func].bind(this, module));
        }; // _SATB["_extract" + type + "FuncContents"]
    });

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _SATB._updateParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
        // There's no need to call this if the parameter value hasn't changed
        if (_SATB._IS_FUNC_PARAM(param)) {
            _SATB._updateFuncParam.call(this, param, funcContent);
        }
        var func = _SATB._PARAM_UPDATES[param];
        if (func) func.call(this, switchVar_, id_, dataTypes_);
        //
    }; // _SATB._updateParam

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     */
    _SATB._updateFuncParam = function(param, funcContent) {
        _SATB._scanParamFuncContentForSwitchVars.call(this, param, funcContent);
        var module = _SATB._PARAM_MODULES[param];
        _SATB._extractParamFuncContent.call(this, module, param);
    }; // _SATB._updateFuncParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     */
    _SATB._scanParamFuncContentForSwitchVars = function(param, funcContent) {
        var note = _SATB._CACHED_PARAMS[param];
        if (!note) return;
        DataManager.scanSATBFuncContentForSwitchVars(funcContent, note);
    }; // _SATB._scanParamFuncContentForSwitchVars

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Module} module - The module of the stored function content
     * @param {Param} name - The name of the stored function content
     */
    _SATB._extractParamFuncContent = function(module, name) {
        if (!_SATB._IS_FUNC_PARAM(name)) return;
        // Converts the stored function content into a parameter function
        var func = _SATB.PARAM_NOTE_FUNCS.params[name](this.satbParam(name));
        SATB.params[module][name] = func;
        //
    }; // _SATB._extractParamFuncContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} type - The type of the stored function content
     * @param {String} name - The name of the stored function content
     */
    _SATB._extractNoteFuncContent = function(type, name) {
        // Converts the stored function content into a notetag function
        var content = this.satbNote(type, name);
        SATB.notes[type][name] = _SATB.PARAM_NOTE_FUNCS.notes[type](content);
        //
    }; // _SATB._extractNoteFuncContent

})(DoubleX_RMMV.SATB); // Game_System.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Switches/Game_Variables
 *      - Raises the note change factors linked to the game switches/variables
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var classes = {
        Game_Switches: {
            proto: Game_Switches.prototype,
            switchVarIds: "switchIds"
        },
        Game_Variables: {
            proto: Game_Variables.prototype,
            switchVarIds: "varIds"
        }
    };
    Object.keys(classes).forEach(function(klass) {

        SATB[klass] = { orig: {}, new: {} };
        var _GSV = SATB[klass].orig, _SATB = SATB[klass].new;
        var $ = classes[klass].proto, DM = SATB.DataManager.new;
        var switchVarIds = classes[klass].switchVarIds;

        _GSV.setValue = $.setValue;
        if (klass === "Game_Switches") {
            _SATB.setValue = $.setValue = function(id, value) {
            // v0.00a - v0.00a; Extended
                _GSV.setValue.apply(this, arguments);
                // Added to raise the change factors involving this id
                _SATB._raiseMemChangeFactors.call(this, id);
                //
            }; // $.setValue
        } else if (klass === "Game_Variables") {
            _SATB.setValue = $.setValue = function(id, value) {
            // v0.00a - v0.00a; Extended
                _GSV.setValue.apply(this, arguments);
                // Added to raise the change factors involving this id
                _SATB._raiseChangeFactors.call(this, id, value);
                //
            }; // $.setValue

            /**
             * The this pointer is Game_Variables.prototype
             * Idempotent
             * @since v0.00a @version v0.00a
             * @param {id} id - The id of the game variable
             * @param {*} val - The value of the game variable
             */
            _SATB._raiseChangeFactors = function(id, val) {
                // It's not needed in $.value as a script var must be set first
                DataManager.updateSATBNoteScriptInVar(id, val);
                //
                _SATB._raiseMemChangeFactors.call(this, id);
            }; // _SATB._raiseChangeFactors
        }

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMemChangeFactors = function(id) {
            // Parameters not depending on battlers can still use switch/vars
            if ($gameParty.inBattle()) BattleManager.refreshStatus();
            //
            if ($gameSystem.satbParam("_isAlwaysRecacheAllSwitchVars")) {
                // refresh raises these factors and also instantly update values
                return BattleManager.refreshAllSATBMems();
                //
            }
            _SATB._raiseMappedMemChangeFactors.call(this, id);
        }; // _SATB._raiseMemChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMappedMemChangeFactors = function(id) {
            var noteFactors_ = DM[switchVarIds][id];
            if (!noteFactors_) return;
            // Such changes should instantly update values depending on these
            BattleManager.raiseRefreshedSATBMemChangeFactors(noteFactors_);
            //
        }; // _SATB._raiseMappedMemChangeFactors

    });

})(DoubleX_RMMV.SATB); // Game_Switches/Game_Variables.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *      - Extends all methods that should be extended in Game_BattlerBase
 *----------------------------------------------------------------------------*/

 (function(SATB) {

     "use strict";

     SATB.Game_BattlerBase = { orig: {}, new: {} };
     var _GBB = SATB.Game_BattlerBase.orig, _SATB = SATB.Game_BattlerBase.new;
     var $ = Game_BattlerBase.prototype;

    _GBB.eraseState = $.eraseState;
    _SATB.eraseState = $.eraseState = function(stateId) {
    // v0.00a - v0.00a; Extended
        // Added to check if the battler becomes was in the auto input mode
        var wasAutoBattle = this.isAutoBattle();
        var wasRestricted = this.isRestricted();
        //
        _GBB.eraseState.apply(this, arguments);
        // Added to check if battler becomes input act automatically/manually
        _SATB._checkIsToggleAutoInput.call(this, wasAutoBattle, wasRestricted);
        //
    }; // $.eraseState

    _GBB.updateStateTurns = $.updateStateTurns;
    _SATB.updateStateTurns = $.updateStateTurns = function() {
    // v0.00a - v0.00a; Extended
        // Added to update state turns with diff removal timings at diff timings
        if (BattleManager.isSATB()) return this.updateSATBStateTurns(2);
        //
        _GBB.updateStateTurns.apply(this, arguments);
    }; // $.updateStateTurns

    _GBB.refresh = $.refresh;
    _SATB.refresh = $.refresh = function() { // v0.00a - v0.00a; Extended
        _GBB.refresh.apply(this, arguments);
        // Added to refresh all superlative ATB notetags lists/results
        _SATB._refresh.call(this);
        // Adding this in Game_Battler could wrongly raise the state factor
    }; // $.refresh

    _GBB.hide = $.hide;
    _SATB.hide = $.hide = function() { // v0.00a - v0.00a; Extended
        _GBB.hide.apply(this, arguments);
        // Added to ensure hidden battlers won't be able to execute or input act
        this.eraseCoreSATBActs();
        //
    }; // $.hide

    _GBB.addNewState = $.addNewState;
    _SATB.addNewState = $.addNewState = function(stateId) {
    // v0.00a - v0.00a; Extended
        // Added to check if the battler becomes was in the auto input mode
        var wasAutoBattle = this.isAutoBattle();
        var wasRestricted = this.isRestricted();
        //
        _GBB.addNewState.apply(this, arguments);
        // Added to check if battler becomes input act automatically/manually
        _SATB._checkIsToggleAutoInput.call(this, wasAutoBattle, wasRestricted);
        //
    }; // $.addNewState

    /**
     * @interface @since v0.00a @version v0.00a
     * @enum @param {Number} timing - The state auto removal timing(1/2)
     */
    $.updateSATBStateTurns = function(timing) {
        this.states().forEach(_SATB._updateStateTurn.bind(this, timing));
    }; // $.updateSATBStateTurns

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.eraseCoreSATBActs = function() {
        this.clearCoreSATB();
        this._satb.actTimes = 0;
    }; // $.eraseCoreSATBActs

    /**
     * It's practically idempotent but not theoretically so
     * @interface @since v0.00a @version v0.00a
     */
    $.onToggleAutoInputSATBActs = function() {
        // Ensures the actions are remade without changing the current ATB value
        this._satb.phaseTypes.addSmallestCoreSATBDecrement();
        // $.onToggleAutoInputSATBActs is a useful event listener callback
    }; // $.onToggleAutoInputSATBActs

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {Number} timing - The state auto removal timing(1/2)
     * @param {State} state - The state to have its turn updated
     */
    _SATB._updateStateTurn = function(timing, state) {
        if (this._satb.notes.result_("coreActState", { state: state })) return;
        var id = state.id;
        if (state.autoRemovalTiming === timing && this._stateTurns[id] > 0) {
            this._stateTurns[id] -= 1;
        }
    }; // _SATB._updateStateTurn

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refresh = function() {
        BattleManager.onSATBBattlerRefresh();
        // Refers to reference tag BATTLER_REFRESH_RECACHE_NOTE
        this._satb.notes.raiseMarkedChangeFactors();
        //
        // It's just to play safe as it might clear or make actions unexpectedly
        if (BattleManager.isSATB()) _SATB._checkUpdatedResults.call(this);
        //
    }; // _SATB._refresh

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._checkUpdatedResults = function() {
        // It must be placed here or checkUpdatedCoreMax would use wrong max val
        delete this._satb.cachedBaseCoreMax;
        //
        // It's possible to change maximum ATB value without ATB frame updates
        this._satb.phaseTypes.checkUpdatedCoreMax();
        //
    }; // _SATB._checkUpdatedResults

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {Boolean} wasAutoBattle - Whether battler was auto battle
     * @param {Boolean} wasRestricted - Whether the battler was restricted
     */
    _SATB._checkIsToggleAutoInput = function(wasAutoBattle, wasRestricted) {
        if (_SATB._isToggleAutoInput.call(this, wasAutoBattle, wasRestricted)) {
            this.onToggleAutoInputSATBActs();
        }
    }; // _SATB._checkIsToggleAutoInput

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {Boolean} wasAutoBattle - Whether battler was auto battle
     * @param {Boolean} wasRestricted - Whether the battler was restricted
     * @returns {Boolean} The check result
     */
    _SATB._isToggleAutoInput = function(wasAutoBattle, wasRestricted) {
        if (wasAutoBattle !== this.isAutoBattle()) return true;
        return wasRestricted !== this.isRestricted();
    }; // _SATB._isToggleAutoInput

})(DoubleX_RMMV.SATB); // Game_BattlerBase.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      - Implements the ATB value, input and action logic detail for battlers
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Battler = { orig: {}, new: {} };
    var _GB = SATB.Game_Battler.orig, _SATB = SATB.Game_Battler.new;
    var $ = Game_Battler.prototype, $$ = Game_BattlerBase.prototype;
    var BM = SATB.BattleManager.new;

    // All these functions are battler script calls
    _SATB.NOTE_FORWARDED_FUNCS = {
       raiseAllSATBNoteChangeFactors: "raiseAllChangeFactors",
       raiseSATBNoteChangeFactors: "raiseChangeFactors",
       invalidateSATBNoteResult: "invalidateResultCache",
       invalidateSATBNoteList: "invalidatePairFuncListCache"
    }; // _SATB.NOTE_FORWARDED_FUNCS
    _SATB.PHASE_TYPE_FORWARDED_FUNCS = {
        setCoreSATB: "setCoreATB",
        setCoreSATBProportion: "setCoreATBProportion",
        addCoreSATB: "addCoreATB",
        addCoreSATBProportion: "addCoreATBProportion",
        clearCoreSATB: "clearCoreATB",
        coreSATB: "coreATB",
        coreMaxSATB: "coreMax"
    }; // _SATB.PHASE_TYPE_FORWARDED_FUNCS
    //

    /*------------------------------------------------------------------------
     *    New public instance variables
     *------------------------------------------------------------------------*/
    // {{Number, {Skill|Item}}} latestSATBItem: The latest inputted skill/item

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Game_SATBNotes} notes: The notetag results
    //       {Game_SATBPhaseTypes} phaseTypes: All ATB phase/state manipulations
    //       {Non-ve Integer} actTimes: The virtual number of action slots
    //       {+ve Number} cachedBaseCoreMax: The cached coreMaxATBVal value

    _GB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function(actorId) {
    // v0.00a - v0.00a; Extended
        // This method must be called first or _SATB._refresh would crash
        _SATB._init.call(this); // Added to initialize all superlative ATB vars
        //
        _GB.initialize.apply(this, arguments);
    }; // $.initialize

    // It's to avoid overwriting func in Game_BattlerBase from other plugins
    _GB.addState = $.addState || $$.addState;
    //
    _SATB.addState = $.addState = function(stateId) {
    // v0.00a - v0.00a; Extended
        // Added to mark that state notetags might have changed
        if (this.isStateAffected(stateId) && !this.isStateAffected(stateId)) {
            this._satb.notes.markChangeFactors(["states"]);
        }
        // This must be placed here before calling refresh
        _GB.addState.apply(this, arguments);
    }; // $.addState

    // It's to avoid overwriting func in Game_BattlerBase from other plugins
    _GB.removeState = $.removeState || $$.removeState;
    //
    _SATB.removeState = $.removeState = function(stateId) {
    // v0.00a - v0.00a; Extended
        // Added to mark that state notetags might have changed
        if (this.isStateAffected(stateId)) {
            this._satb.notes.markChangeFactors(["states"]);
        }
        // This must be placed here before calling refresh
        _GB.removeState.apply(this, arguments);
    }; // $.removeState

    _GB.clearActions = $.clearActions;
    _SATB.clearActions = $.clearActions = function() {
     // v0.00a - v0.00a; Extended
        _GB.clearActions.apply(this, arguments);
        // Added to ensure the battler won't be able to execute actions
        BattleManager.eraseSATBActBattler(this);
        //
    }; // $.clearActions

    _GB.onRestrict = $.onRestrict;
    _SATB.onRestrict = $.onRestrict = function() {  // v0.00a - v0.00a; Extended
        _GB.onRestrict.apply(this, arguments);
        // Added to fix null action battlers bugs and edge cases as well
        _SATB._onRestrict.call(this);
        // This should be placed here as clearActions should be called first
    }; // $.onRestrict

    _GB.makeActionTimes = $.makeActionTimes;
    _SATB.makeActionTimes = $.makeActionTimes = function() {
    // v0.00a - v0.00a; Extended
        // Added to simplify the action input and execution logic
        if (BattleManager.isSATB()) return 1;
        //
        return _GB.makeActionTimes.apply(this, arguments);
    }; // $.makeActionTimes

    _GB.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GB.makeActions.apply(this, arguments);
        // Added to store the number of action slots using _GB.makeActionTimes
        _SATB._makeActs.call(this);
        //
    }; // $.makeActions

    _GB.onAllActionsEnd = $.onAllActionsEnd;
    _SATB.onAllActionsEnd = $.onAllActionsEnd = function() {
    // v0.00a - v0.00a; Extended
        // Added to update state turn in actions and clear ATB value as well
        this.onAllSATBActsEnd(this);
        // This must be placed here or removeStatesAuto will miss expired states
        _GB.onAllActionsEnd.apply(this, arguments);
    }; // $.onAllActionsEnd

    _GB.onTurnEnd = $.onTurnEnd;
    _SATB.onTurnEnd = $.onTurnEnd = function() {  // v0.00a - v0.00a; Extended
        _GB.onTurnEnd.apply(this, arguments);
        // Added to remove buffs to be removed of this battlers as well
        _SATB._onTurnEnd.call(this);
        //
    }; // $.onTurnEnd

    _GB.onBattleEnd = $.onBattleEnd;
    _SATB.onBattleEnd = $.onBattleEnd = function() {
    // v0.00a - v0.00a; Extended
        _GB.onBattleEnd.apply(this, arguments);
        // Added to reset the action times and ATB value(-ve value isn't wanted)
        this.initCoreSATBActs(0);
        //
    }; // $.onBattleEnd

    // Refers to the Game_SATBNotes counterparts
    Object.keys(_SATB.NOTE_FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB.NOTE_FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.notes[f].apply(this._satb.notes, arguments);
        }; // $[func]
        //
    });
    //

    // Refers to the Game_SATBPhaseTypes counterparts
    Object.keys(_SATB.PHASE_TYPE_FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB.PHASE_TYPE_FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.phaseTypes[f].apply(
                    this._satb.phaseTypes, arguments);
        }; // $[func]
        //
    });
    //

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    $.raiseSATBChangeFactorsWithRefresh = function(noteFactors) {
        Object.keys(noteFactors).forEach(function(note) {
            // There's no need to extract these codes into a new method
            this._satb.notes.markNoteChangeFactors(note, noteFactors[note]);
            //
        }, this);
        this.refresh();
    }; // $.raiseSATBChangeFactorsWithRefresh

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() {
        // The same notes must be shared by both the battler and phaseTypes
        this._satb.notes = new Game_SATBNotes(this);
        this._satb.phaseTypes = new Game_SATBPhaseTypes(this);
        //
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks as it's the battler as a dependency
        ["notes", "phaseTypes"].forEach(function(helper) {
            // There's no need to extract these into a new method
            this._satb[helper].clear();
            delete this._satb[helper];
            //
        }, this);
        //
    }; // $.clearSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setPreemptStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setPreemptStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setSurpriseStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setSurpriseStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setNormStartSATB = function() { this.initCoreSATBActs(0); };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} val - The starting ATB value of the battler
     */
    $.setStartSATB = function(val) {
        this.initCoreSATBActs(this.canMove() ? val : 0);
    }; // $.setStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $.fillCoreSATB = function(fillRate) {
        if (this.canMove()) return this._satb.phaseTypes.fillCoreATB(fillRate);
        // Unmovable battlers still need to show the right maximum ATB value
        this._satb.phaseTypes.checkUpdatedCoreMax(); // It's just to play safe
        //
    }; // $.fillCoreSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum ATB value of the battler involved
     */
    $.baseCoreMaxSATB = function() {
        // It shouldn't be in Game_SATBPhaseTypes as Game_SATBPairs uses it
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreMaxATBVal").call(this);
            //
        } else if (!BM.IS_VALID_RESULT(this._satb.cachedBaseCoreMax)) {
            this._satb.cachedBaseCoreMax =
                    $gameSystem.satbParamFunc("coreMaxATBVal").call(this);
        }
        return this._satb.cachedBaseCoreMax;
        //
    }; // $.baseCoreMaxSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.onBecomeActable = function() {
        _SATB._updateActStateTurns.call(this);
        _SATB._setLatestItem.call(this);
    }; // $.onBecomeActable

    /**
     * @interface @since v0.00a @version v0.00a
     */
    $.onAllSATBActsEnd = function() {
        if (!BattleManager.isSATB()) return;
        this.updateSATBStateTurns(1);
        delete this.latestSATBItem;
        this._satb.actTimes -= 1;
        if (this._satb.actTimes <= 0) return this.clearCoreSATB();
        this._satb.phaseTypes.addSmallestCoreSATBDecrement();
    }; // $.onAllSATBActsEnd

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} atbVal - The new current ATB value of this battler
     */
    $.initCoreSATBActs = function(atbVal) {
        this.setCoreSATB(atbVal);
        this._satb.actTimes = 0;
    }; // $.initCoreSATBActs

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        // The master container must be ready first before adding anything else
        this._satb = {};
        this.initSATBNotes();
        //
    }; // _SATB._init

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onRestrict = function() {
        // It doesn't hurt much to clear ATB value when this plugin's disabled
        if (!this.canMove()) return this.eraseCoreSATBActs();
        // Calling onToggleAutoInputSATBActs here makes it being called twice
    }; // _SATB._onRestrict

    /**
     * The this pointer is Game_Battler.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._makeActs = function() {
        // The number of action slots should always be 1 so the counter's needed
        if (this._satb.actTimes > 0) return;
        this._satb.actTimes = _GB.makeActionTimes.apply(this, arguments);
        //
    }; // _SATB._makeActs

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onTurnEnd = function() {
        if (BattleManager.isSATB()) this.removeBuffsAuto();
    }; // _SATB._onTurnEnd

    /**
     * @since v0.00a @version v0.00a
     */
    _SATB._updateActStateTurns = function() {
        this.states().forEach(_SATB._updateActStateTurn, this);
    }; // _SATB._updateActStateTurns

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {State} state - The action state to have its turn updated
     */
    _SATB._updateActStateTurn = function(state) {
        if (!this._satb.notes.result_("coreActState", { state: state })) return;
        var id = state.id;
        if (this._stateTurns[id] > 0) return this._stateTurns[id] -= 1;
        this.removeState(id);
    }; // _SATB._updateActStateTurn

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._setLatestItem = function() {
        var currentAct = this.currentAction();
        if (!currentAct) return;
        var item = currentAct.item();
        if (item) this.latestSATBItem = { speed: item.speed, item: item };
    }; // _SATB._setLatestItem

})(DoubleX_RMMV.SATB); // Game_Battler.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Implements the ATB value, input and action logic detail for actors
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Actor = { orig: {}, new: {} };
    var _GA = SATB.Game_Actor.orig, _SATB = SATB.Game_Actor.new;
    var $ = Game_Actor.prototype;

    _GA.setup = $.setup;
    _SATB.setup = $.setup = function() { // v0.00a - v0.00a; Extended
        _GA.setup.apply(this, arguments);
        // Added to mark that actor/class notetags might have changed
        _SATB._setup.call(this);
        // This must be placed here as the actor needs to be fully setup first
    }; // $.setup

    ["initEquips", "forceChangeEquip"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            // Added to mark that weapon/armor notetags might have changed
            this._satb.notes.markChangeFactors(["weapons", "armors"]);
            // This must be placed here before calling refresh
            _GA[func].apply(this, arguments);
        }; // $[func]
        //
    });

    _GA.changeEquip = $.changeEquip;
    _SATB.changeEquip = $.changeEquip = function(slotId, item) {
    // v0.00a - v0.00a; Extended
        // Added to mark that weapon/armor notetags might have changed
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
                (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._satb.notes.markChangeFactors(["weapons", "armors"]);
        }
        // This must be placed here before calling refresh
        _GA.changeEquip.apply(this, arguments);
    }; // $[func]

    _GA.changeClass = $.changeClass;
    _SATB.changeClass = $.changeClass = function(classId, keepExp) {
    // v0.00a - v0.00a; Extended
        // Added to mark that class notetags might have changed
        this._satb.notes.markChangeFactors(["class"]);
        // This must be placed here before calling refresh
        _GA.changeClass.apply(this, arguments);
    }; // $.changeClass

    ["makeAutoBattleActions", "makeConfusionActions"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            _GA[func].apply(this, arguments);
            // Added to ensure that the actor will be able to execute actions
            BattleManager.addSATBActBattler(this);
            //
        }; // $[func]
        //
    });

    _GA.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GA.makeActions.apply(this, arguments);
        // Added to mark that this battler becomes inputable as well
        BattleManager.addSATBInputableActor(this);
        // This must be placed here or clearActions make the actor not inputable
    }; // $.makeActions

    _GA.clearActions = $.clearActions;
    _SATB.clearActions = $.clearActions = function() {
     // v0.00a - v0.00a; Extended
        _GA.clearActions.apply(this, arguments);
        // Added to ensures the actor won't be able to input actions
        BattleManager.eraseSATBInputableActor(this);
        //
    }; // $.clearActions

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setPreemptStartSATB = function() {
        this.setStartSATB(this.coreMaxSATB());
    }; // $.setPreemptStartSATB

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._setup = function() {
        // Refresh should be called as it's possible to change the max ATB val
        this._satb.notes.markChangeFactors(["actor", "class"]);
        this.refresh();
        //
    }; // _SATB._setup

})(DoubleX_RMMV.SATB); // Game_Actor.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *      - Implements the ATB value, input and action logic detail for enemies
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Enemy = { orig: {}, new: {} };
    var _GE = SATB.Game_Enemy.orig, _SATB = SATB.Game_Enemy.new;
    var $ = Game_Enemy.prototype;

    ["setup", "transform"].forEach(function(func) {
        _GE[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            _GE[func].apply(this, arguments);
            // Added to mark that enemy notetags might have changed and refresh
            _SATB["_" + func].call(this);
            // This must be placed here as the enemy statuses need to be updated
        }; // $[func]
        //
    });

    _GE.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GE.makeActions.apply(this, arguments);
        // Added to mark that the battler becomes able to execute action as well
        BattleManager.addSATBActBattler(this);
        //
    }; // $.makeActions

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setSurpriseStartSATB = function() {
        this.setStartSATB(this.coreMaxSATB());
    }; // $.setSurpriseStartSATB

    ["_setup", "_transform"].forEach(function(func) {
        /**
         * The this pointer is Game_Enemy.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         */
        _SATB[func] = function() {
            // Refresh should be called as it's possible to change max ATB val
            this._satb.notes.markChangeFactors(["enemy"]);
            this.refresh();
            //
        }; // $[func]
    });

})(DoubleX_RMMV.SATB); // Game_Enemy.prototype

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBPhaseTypes
 *      - Implements all ATB business logic detail manipulations of a battler
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPhaseTypes.prototype;
    var _SATB = SATB.Game_SATBPhaseTypes = {};

    // Refer to reference tag SMALLEST_ATB_VAL_INCREMENT
    _SATB._SMALLEST_ATB_VAL_INCREMENT = Math.pow(2, -32);
    // Using Number.EPSILON would be too dangerous here

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // {Game_SATBNotes} _notes: The wrapped notetag result/runner with caches
    // {Number} _coreATB: The current ATB value of the battler
    // {Number} _lastCoreATB: The last current ATB value of the battler
    // {Number} _lastCoreMax: The last maximum ATB value of the battler

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBNotes?} notes_ - The wrapped notetag result/runner
     */
    $.initialize = function(battler, notes_) {
        // notes_ must be the same as battler._satb.notes
        this._battler = battler, this._notes = notes_ || battler._satb.notes;
        //
        this._coreATB = this._lastCoreATB = 0;
        this._lastCoreMax = this.coreMax();
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        delete this._notes;
        //
    }; // $.clear

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $.fillCoreATB = function(fillRate) {
        var baseCoreMax = this._battler.baseCoreMaxSATB();
        // The base max should be used or changing max won't change fill rate
        this.addCoreATB(fillRate * baseCoreMax);
        //
    }; // $.fillCoreATB

    /**
     * @interface @since v0.00a @version v0.00a
     */
    $.addSmallestCoreSATBDecrement = function() {
        // Otherwise the increment would be too small for huge max ATB values
        var addMultiplier = Math.min(this.coreMax(), 1);
        // It's derived from extensive testing
        this.addCoreATB(-_SATB._SMALLEST_ATB_VAL_INCREMENT * addMultiplier);
    }; // $.addSmallestCoreSATBDecrement

    /**
     * Script Call
     * @interface @since v0.00a @version v0.00a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addCoreATBProportion = function(increment) {
        this.addCoreATB(increment * this.coreMax());
    }; // $.addCoreATBProportion

    /**
     * Script Call/Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addCoreATB = function(increment) {
        this.setCoreATB(this.coreATB() + increment);
    }; // $.addCoreATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearCoreATB = function() {
        if (this.coreATB() > 0) this.setCoreATB(0);
    }; // clearCoreATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setCoreATBProportion = function(proportion) {
        this.setCoreATB(proportion * this.coreMax());
    }; // $.setCoreATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setCoreATB = function(val) {
        // It must be here or checkUpdatedCoreMax would use wrong _coreATB val
        this._coreATB = Math.min(val, this.coreMax());
        // _coreATB must be capped by coreMax here to maximize performance gain
        this.checkUpdatedCoreMax();
        // It must be here or checkUpdatedCoreMax would use wrong _lastCoreATB
        this._lastCoreATB = val;
        //
    }; // $.setCoreATB

    /**
     * Script Call/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Number} The current ATB value of the battler
     */
    $.coreATB = function() { return this._coreATB; };

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum ATB value of the battler
     */
    $.coreMax = function() { return this._notes.result_("coreMax"); };

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.checkUpdatedCoreMax = function() {
        var coreMax = this.coreMax(), isFull = coreMax <= this.coreATB();
        var wasFull = this._lastCoreMax <= this._lastCoreATB;
        this._lastCoreMax = coreMax;
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        if (!wasFull && isFull) return this._onCoreATBBecomeFull(coreMax);
        //
        // Refers to reference tag INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
        if (wasFull && !isFull) this._onCoreATBBecomeNotFull();
        //
    }; // $.checkUpdatedCoreMax

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {+ve Number} coreMax - The maximum ATB value of the battler
     */
    $._onCoreATBBecomeFull = function(coreMax) {
        // Passing coreMax instead of calling this.coreMax() is for performance
        this._lastCoreATB = this._coreATB = coreMax;
        //
        // It's okay for unmovable battlers to have full atb which is be reset
        if (this._battler.canMove()) this._battler.makeActions();
        //
    }; // $._onCoreATBBecomeFull

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    $._onCoreATBBecomeNotFull = function() { this._battler.clearActions(); };

})(DoubleX_RMMV.SATB); // Game_SATBPhaseTypes.prototype

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBNotes.prototype, _SATB = SATB.Game_SATBNotes = {};
    var BM = SATB.BattleManager.new;

    // The suffix of the names of funcions with and without the cache enabled
    _SATB._FUNC_WITH_CACHE = "WithCache";
    _SATB._FUNC_WITHOUT_CACHE = "WithoutCache";
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // {Game_SATBCache} _cache: The helper caching notetag list/result
    // {Game_SATBPairs} _pairs: The helper checking/returning note pair
    // {Game_SATBRules} _rules: The helper using the rule to chain note

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBCache?} cache_ - The helper caching notetag list/result
     * @param {Game_SATBPairs?} pairs_ - The helper checking/returning note pair
     * @param {Game_SATBRules?} rules_ - The helper using the rule to chain note
     */
    $.initialize = function(battler, cache_, pairs_, rules_) {
        this._battler = battler;
        // Not making these as needed explicit dependecies' to simplify its uses
        this._cache = cache_ || new Game_SATBCache();
        this._pairs = pairs_ || new Game_SATBPairs(battler);
        this._rules = rules_ || new Game_SATBRules(this._pairs);
        //
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        this._pairs.clear(); // It's idempotent so it doesn't hurt to play safe
        this._rules.clear();
        //
    }; // $.clear

    [
        "markChangeFactors",
        "markNoteChangeFactors",
        "raiseMarkedChangeFactors",
        "raiseAllChangeFactors",
        "raiseChangeFactors",
        "invalidateResultCache",
        "invalidatePairFuncListCache"
    ].forEach(function(f) {
        /**
         * Idempotent
         * @interface @since v0.00a @version v0.00a
         */
        $[f] = function() { // Refers to the Game_SATBCache counterparts
            return this._cache[f].apply(this._cache, arguments);
        }; // $[f]
    });

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     */
    $.result_ = function(note, argObj_) {
        if ($gameSystem.satbParam("_isNoteCached")) {
            return this._resultWithCache_(note, argObj_);
        }
        // Refers to reference tag NOTE_RESULT_CACHE
        return this._uncachedResult_(note, argObj_, _SATB._FUNC_WITHOUT_CACHE);
        //
    }; // $.result_

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its notetag contents run
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    $.run = function(note, argObj_) {
        // Refers to reference tag RUN_DEFAULT_FIRST
        this._pairs.default_(note, argObj_);
        //
        var isCached = $gameSystem.satbParam("_isNoteCached");
        var funcNameSuffix =
                isCached ? _SATB._FUNC_WITH_CACHE : _SATB._FUNC_WITHOUT_CACHE;
        var list = this["_pairFuncList" + funcNameSuffix](note, argObj_);
        var runFunc = this._pairs.run_.bind(this._pairs, argObj_, note);
        this._rules.chainedRunList(list, note).forEach(runFunc);
    }; // $.run

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     */
    $._resultWithCache_ = function(note, argObj_) {
        var cache_ = this._cache.result_(note, argObj_);
        if (BM.IS_VALID_RESULT(cache_)) return cache_;
        return this._updatedResultWithCache_(note, argObj_);
    }; // $._resultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     */
    $._updatedResultWithCache_ = function(note, argObj_) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result_ =
                this._uncachedResult_(note, argObj_, _SATB._FUNC_WITH_CACHE);
        this._cache.updateResult(note, argObj_, result_);
        return result_;
        //
    }; // $._updatedResultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*?} The chained result from all effective notetags involved
     */
    $._uncachedResult_ = function(note, argObj_, funcNameSuffix) {
        // Only associative results can directly reuse cached part results
        if (this._rules.isAssociative(note)) {
            return this._associativeResult_(note, argObj_, funcNameSuffix);
        }
        return this._nonAssociativeResult_(note, argObj_, funcNameSuffix);
        //
    }; // $._uncachedResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*?} The chained result from all effective notetags involved
     */
    $._associativeResult_ = function(note, argObj_, funcNameSuffix) {
        // These are the list of value results of all parts rather than PairFunc
        var partResults = this._partResults(note, argObj_, funcNameSuffix);
        //
        var defaultResult_ = this._pairs.default_(note, argObj_);
        // Refer to reference tag ASSOCIATIVE_CHAINING_RULE
        return this._rules.chainedValResult_(
                partResults, note, argObj_, defaultResult_);
        //
    }; // $._associativeResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {[*]} The chained results of all effective notetags parts
     */
    $._partResults = function(note, argObj_, funcNameSuffix) {
        // Refers to reference tag NOTE_LIST_PART
        var priorities = this._rules.priorities(note);
        var funcName = "_partResult" + funcNameSuffix + "_";
        var resultFunc = this[funcName].bind(this, note, argObj_);
        //
        // BM.IS_VALID_RESULT doesn't use the original array
        return priorities.mapFilter(resultFunc, BM.IS_VALID_RESULT);
        //
    }; // $._partResults

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._partResultWithoutCache_ = function(note, argObj_, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        return this._uncachedPartResult_(
                note, argObj_, part, _SATB._FUNC_WITHOUT_CACHE);
        //
    }; // $._partResultWithoutCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._partResultWithCache_ = function(note, argObj_, part) {
        var cache_ = this._cache.partResult_(note, argObj_, part);
        if (BM.IS_VALID_RESULT(cache_)) return cache_;
        return this._updatedPartResultWithCache_(note, argObj_, part);
    }; // $._partResultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._updatedPartResultWithCache_ = function(note, argObj_, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result_ = this._uncachedPartResult_(
                note, argObj_, part, _SATB._FUNC_WITH_CACHE);
        this._cache.updatePartResult(note, argObj_, part, result_);
        return result_;
        //
    }; // $._updatedPartResultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*?} The chained result from this effective notetags part
     */
    $._uncachedPartResult_ = function(note, argObj_, part, funcNameSuffix) {
        var funcName = "_pairFuncListPart" + funcNameSuffix;
        var list = this[funcName](note, part, argObj_);
        if (list.length <= 0) return undefined;
        // The result of the 1st pairFunc must be the initial result of the list
        var initVal_ = this._pairs.run_(argObj_, note, list[0]);
        return this._rules.chainedResult_(
                list.slice(1), note, argObj_, initVal_);
        // Refer to reference tag ASSOCIATIVE_CHAINING_RULE
    }; // $._uncachedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*?} The chained result from all effective notetags involved
     */
    $._nonAssociativeResult_ = function(note, argObj_, funcNameSuffix) {
        var list = this["_pairFuncList" + funcNameSuffix](note, argObj_);
        var defaultResult = this._pairs.default_(note, argObj_);
        return this._rules.chainedResult_(list, note, argObj_, defaultResult);
    }; // $._nonAssociativeResult_

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._pairFuncListWithoutCache = function(note, argObj_) {
        return this._uncachedPairFuncList(
                note, argObj_, _SATB._FUNC_WITHOUT_CACHE);
    }; // $._pairFuncListWithoutCache

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._pairFuncListWithCache = function(note, argObj_) {
        // The functions in the list aren't bound yet so argObj_ is not needed
        var cache_ = this._cache.pairFuncList_(note);
        //
        // A valid list must be an Array which must be truthy
        return cache_ || this._updatedPairFuncListWithCache(note, argObj_);
        //
    }; // $._pairFuncListWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._updatedPairFuncListWithCache = function(note, argObj_) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedPairFuncList(
                note, argObj_, _SATB._FUNC_WITH_CACHE);
        this._cache.updatePairFuncList(note, list);
        return list;
        //
    }; // $._updatedPairFuncListWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._uncachedPairFuncList = function(note, argObj_, funcNameSuffix) {
        // Refers to reference tag NOTE_LIST_PART
        var reduceFunc = this._reducedUncachedPairFuncList.bind(
                this, note, argObj_, "_pairFuncListPart" + funcNameSuffix);
        return this._rules.priorities(note).reduce(reduceFunc, []);
        //
    }; // $._uncachedPairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcName - The name of the pair func list part func
     * @param {[PairFunc]} list = List of functions of the effective notetags
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._reducedUncachedPairFuncList = function(note, argObj_, funcName, list, part) {
        // fastMerge is much faster than concat and works with large arrays
        return list.fastMerge(this[funcName](note, part, argObj_));
        //
    }; // $._reducedUncachedPairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._pairFuncListPartWithCache = function(note, part, argObj_) {
        // The functions in the list aren't bound yet so argObj_ is not needed
        var cache_ = this._cache.pairFuncListPart_(note, part, argObj_);
        //
        // A valid list must be an Array which must be truthy
        if (cache_) return cache_;
        return this._updatedPairFuncListPartWithCache(note, part, argObj_);
        //
    }; // $._pairFuncListPartWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._updatedPairFuncListPartWithCache = function(note, part, argObj_) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._pairFuncListPartWithoutCache(note, part, argObj_);
        this._cache.updatePairFuncListPart(note, part, list);
        return list;
        //
    }; // $._updatedPairFuncListPartWithCache

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._pairFuncListPartWithoutCache = function(note, part, argObj_) {
        var partListData =
                this._cache.partListData(part, this._battler, argObj_);
        // The reduce callback function doesn't use the original array
        return partListData.reduce(
                this._reducedPairFuncListPartWithoutCache.bind(this, note), []);
        //
    }; // $._pairFuncListPartWithoutCache

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {[PairFunc]} list - List of functions of the notetag part involved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._reducedPairFuncListPartWithoutCache = function(note, list, datum_) {
        // fastMerge is much faster than concat and works with large arrays
        return list.fastMerge(this._pairs.pairFuncs(note, datum_));
        //
    }; // $._reducedPairFuncListPartWithoutCache

})(DoubleX_RMMV.SATB); // Game_SATBNotes.prototype

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBCache
 *      - Caches the effective notetag lists and their end results
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBCache.prototype, _SATB = SATB.Game_SATBCache = {};

    _SATB._ACT_DATA_SKILLS = function(act) { return $dataSkills[act.skillId]; };
    _SATB._ALL_EMPTY_CONTAINERS = function() { // Potential Hotspot
        return _SATB._NOTES.reduce(_SATB._REDUCED_EMPTY_CONTAINERS, {});
    }; // _SATB._ALL_EMPTY_CONTAINERS
    _SATB._DEL_MASTER_KEY = function(cache, key) { // Potential Hotspot
        Object.keys(cache).forEach(function(k) {
            if (k.includes(key)) delete cache[k];
        });
    }; // _SATB._DEL_MASTER_KEY
    _SATB._MARKED_NOTE_CHANGE_FACTORS = function(marks) { // Potential Hotspot
        return Object.keys(marks).filter(function(f) { return marks[f]; });
    }; // _SATB._MARKED_NOTE_CHANGE_FACTORS
    _SATB._NOTE_KEY = function(argObj_, note) { // Hotspot
        if (!argObj_) return note; // A valid key shouldn't be null or undefined
        // It's infeasible to cache the target so an empty key means not caching
        return argObj_.target ? undefined : note + JSON.stringify(argObj_);
        //
    }; // _SATB._NOTE_KEY
    _SATB._REDUCED_EMPTY_CONTAINERS = function(containers, note) {
    // Potential Hotspot
        containers[note] = {};
        return containers;
    }; // _SATB._REDUCED_EMPTY_CONTAINERS

    // Refers to reference tag NOTE_DATA_TYPES
    _SATB._FACTOR_DATA = { // Potential Hotspot
        actor: function(battler) {
            // It's possible for actor to return undefiend before setup()
            if (!battler.isActor()) return [];
            var actor = battler.actor();
            return actor ? [actor] : [];
            //
        }, // actor
        enemy: function(battler) {
            return battler.isEnemy() ? [battler.enemy()] : [];
        }, // enemy
        class: function(battler) {
            // It's possible for currentClass to return undefined before setup()
            if (!battler.isActor()) return [];
            var klass = battler.currentClass();
            return klass ? [klass] : [];
        }, // class
        weapons: function(battler) {
            // Otherwise the game will crash upon start due to undefined _equips
            if (battler.isActor() && battler._equips) return battler.weapons();
            return [];
            //
        }, // weapons
        armors: function(battler) {
            // Otherwise the game will crash upon start due to undefined _equips
            return battler.isActor() && battler._equips ? battler.armors() : [];
            //
        }, // armors
        skills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            if (battler.isEnemy()) {
                return battler.enemy().actions.fastMap(_SATB._ACT_DATA_SKILLS);
            }
            return battler.isActor() ? battler.skills() : [];
            //
        }, // skills
        usableSkills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            if (battler.isActor()) return battler.usableSkills();
            if (!battler.isEnemy()) return [];
            //
            // The map callback function doesn't use the original array
            return battler.enemy().actions.filterMap(function(act) {
                return battler.isActionValid(act);
            }, _SATB._ACT_DATA_SKILLS);
            //
        }, // usableSkills
        items: function(battler) {
            return battler.isActor() ? $gameParty.items() : [];
        }, // items
        usableItems: function(battler) {
            return battler.isActor() ? $gameParty.items().filter(function(i) {
                return battler.canUse(i);
            }) : [];
        }, // usableItems
        states: function(battler) {
            // Otherwise the game will crash upon start due to undefined _states
            return battler._states ? battler.states() : [];
            //
        }, // states
        thisState: function(battler, argObj) { return [argObj.state]; },
        latestSkillItem: function(battler) {
            var item = battler.latestSATBItem;
            return item ? [item.item] : [];
        }, // latestSkillItem
        priority: function() { return []; },
        chainingRule: function() { return []; },
        result: function() { return []; }
    }; // _SATB._FACTOR_DATA
    //

    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = Object.keys(SATB.Game_System.new.PARAM_NOTE_FUNCS.notes);
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{[(**) -> *?]}} _cachedLists: Mapping from a note to its notetag func
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{[(**) -> *?]}}} _partLists: Mapping from note to list part function
    // {{{*}}} _partResults: The mapping from a note to its cached result parts
    // (Advanced){Boolean} _hasUnknownChangeFactor: ADVANCED_SCRIPT_CALLS_ONLY

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     */
    $.initialize = function() {
        this.raiseAllChangeFactors();
        // Set it as false only if you're sure this plugin's all change factors
        this._hasUnknownChangeFactor = true;
        //
    }; // $.initialize

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {[Factor]} factors - The change factors to be marked for all notes
     */
    $.markChangeFactors = function(factors) {
        factors.forEach(this._markChangeFactor, this);
    }; // $.markChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor marked
     * @param {[Factor]} factors - The change factors to be marked for this note
     */
    $.markNoteChangeFactors = function(note, factors) {
        factors.forEach(function(factor) {
            this._markNoteChangeFactor(factor, note);
        }, this);
    }; // $.markNoteChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseMarkedChangeFactors = function() {
        // Not using raiseAllChangeFactors is to be flexible with creative uses
        _SATB._NOTES.forEach(this._raiseMarkedNoteChangeFactors, this);
        //
    }; // $.raiseMarkedChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseAllChangeFactors = function() {
        this._cachedLists = {};
        // They use separate containers so it must be called multiple times
        this._cachedResults = _SATB._ALL_EMPTY_CONTAINERS();
        this._partLists = _SATB._ALL_EMPTY_CONTAINERS();
        this._partResults = _SATB._ALL_EMPTY_CONTAINERS();
        this._changeFactorMarks = _SATB._ALL_EMPTY_CONTAINERS();
        //
    }; // $.raiseAllChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    $.raiseChangeFactors = function(note, factors) {
        factors.forEach(this._raiseChangeFactor.bind(this, note));
    }; // $.raiseChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its part result cache invalidated
     * @param {Factor} factor - The change factor as the note part to invalidate
     */
    $.invalidateResultCache = function(note, factor) {
        // All part results belonging to part must be del regardless of argObj_
        _SATB._DEL_MASTER_KEY(this._partResults[note], factor);
        //
        // All end results belonging to note must be del regardless of argObj_
        _SATB._DEL_MASTER_KEY(this._cachedResults[note], note);
        //
    }; // $.invalidateResultCache

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its part list cache invalidated
     * @param {Factor} factor - The change factor as the note list to invalidate
     */
    $.invalidatePairFuncListCache = function(note, factor) {
        // These change factors only change the cached result but not the list
        if (factor === "chainingRule" || factor === "result") return;
        //
        // The cached functions aren't bound yet so the master key's not needed
        delete this._partLists[note][factor];
        delete this._cachedLists[note];
        //
    }; // $.invalidatePairFuncListCache

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The cached result from all effective notetags involved
     */
    $.result_ = function(note, argObj_) {
        // An undefined key means the result shouldn't be or isn't cached
        var key = _SATB._NOTE_KEY(note, argObj_);
        return key && this._cachedResults[note][key];
        //
    }; // $.result_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The cached result from this notetag part involved
     */
    $.partResult_ = function(note, argObj_, part) {
        // An undefined key means the part result shouldn't be or isn't cached
        var key = _SATB._NOTE_KEY(argObj_, part);
        return key && this._partResults[note][key];
        //
    }; // $.partResult_

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result updated
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result updated
     * @param {*?} result_ - The effective notetag list part result to be cached
     */
    $.updatePartResult = function(note, argObj_, part, result_) {
        // An undefined key means the part result shouldn't be cached
        var key = _SATB._NOTE_KEY(argObj_, part);
        if (key) this._partResults[note][key] = result_;
        // Caching an invalid result effectively means invalidating the cache
    }; // $.updatePartResult

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result updated
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} result - The effective notetag list result to be cached
     */
    $.updateResult = function(note, argObj_, result) {
        // An undefined key means the result shouldn't be cached
        var key = _SATB._NOTE_KEY(note, argObj_);
        if (key) this._cachedResults[note][key] = result;
        //
    }; // $.updateResult

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncList_ = function(note) {
        // Concatenating this._partLists[note] would need to use chaining rules
        return this._cachedLists[note];
        //
    }; // $.pairFuncList_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncListPart_ = function(note, part) {
        // The cache won't be saved in save files so it's ok to cache functions
        return this._partLists[note][part];
        //
    }; // $.pairFuncListPart_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[Datum]} List of data having the effective notetags involved
     */
    $.partListData = function(part, battler, argObj_) {
        return _SATB._FACTOR_DATA[part](battler, argObj_);
    }; // $.partListData

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {DatumType} part - Note part to have its effective list updated
     * @param {[PairFunc]} partList List of functions of  notetags involved
     */
    $.updatePairFuncListPart = function(note, part, partList) {
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][part] = partList; // partList.clone();
        //
    }; // $.updatePairFuncListPart

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {[PairFunc]} list - The list of functions of notetags involved
     */
    $.updatePairFuncList = function(note, list) {
        // list's supposed to be immutable so it's safe here
        this._cachedLists[note] = list; // list.clone();
        //
    }; // $.updatePairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {Factor} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        _SATB._NOTES.forEach(this._markNoteChangeFactor.bind(this, factor));
    }; // $._markChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {Factor} factor - The change factor to be marked for the note
     * @param {NoteType} note - The note to have its change factor marked
     */
    $._markNoteChangeFactor = function(factor, note) {
        this._changeFactorMarks[note][factor] = true;
    }; // $._markNoteChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its marked change factors raised
     */
    $._raiseMarkedNoteChangeFactors = function(note) {
        this.raiseChangeFactors(note, this._raisedNoteChangeFactors(note));
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its marked change factors raised
     * @returns {[Factor]} The note change factors to be raised
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        var factors = _SATB._MARKED_NOTE_CHANGE_FACTORS(marks);
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        var isMarkedOnly = !this._hasUnknownChangeFactor || factors.length > 0;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return isMarkedOnly ? factors : Object.keys(marks);
        //
    }; // $._raisedNoteChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {Factor} factor - The change factor to be raised for the note
     */
    $._raiseChangeFactor = function(note, factor) {
        this.invalidateResultCache(note, factor);
        this.invalidatePairFuncListCache(note, factor);
        this._changeFactorMarks[note][factor] = false;
    }; // $._raiseChangeFactor

})(DoubleX_RMMV.SATB); // Game_SATBCache.prototype

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPairs.prototype, _SATB = SATB.Game_SATBPairs = {};
    var GS = SATB.Game_System.new;

    _SATB._IS_VALID_PAIR = function(note, pair_) {
        if (!pair_) return false;
        return pair_.entry1 && _SATB._IS_VALID_SUFFIX(note, pair_.suffix1);
    }; // _SATB._IS_VALID_PAIR
    _SATB._IS_VALID_SUFFIX = function(note, suffix) { // Potential Hotspot
        return _SATB._NOTE_TYPES[note].suffixes.contains(suffix);
    }; // _SATB._IS_VALID_SUFFIX
    _SATB._PAIR_FUNC = function(note, datum, pair) {
        // Refers to reference tag THIS_GAME_BATTLER
        var suffix = pair.suffix1, noteFunc = _SATB._SUFFIX_FUNCS[suffix];
        var resultType = _SATB._NOTE_TYPES[note].result;
        return {
            canBind: _SATB._ARG_OBJ_SUFFIXES.contains(suffix),
            datum: datum,
            unboundFunc: noteFunc(note, resultType, pair.entry1)
        };
        //
    }; // $._PAIR_FUNC
    _SATB._STRING_TO_NUM = function(r) { return +r; };

    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = { // Hotspot
        coreMax: function() { return this._battler.baseCoreMaxSATB(); },
        // A notetag chaining boolean values can't have any valid default value
        coreActState: function() { return undefined; }
        //
    }; // _SATB._DEFAULT_RESULTS
    //
    // The last argument must be the latest chained notetag value result
    _SATB._NOTE_ARG_OBJS = { // Hotspot
        coreMax: function(func, datum, argObj_, latestMax) {
            return func(datum, datum.meta.satb.datumType, latestMax);
        }, // coreMax
        coreActState: function(func, datum) {
            return func(datum, datum.meta.satb.datumType);
        } // coreActState
    }; // _SATB._NOTE_ARG_OBJS
    //
    _SATB._RESULT_TYPES = { // Potential Hotspot
        bool: function(result) { return result.toLowerCase() === "true"; },
        num: _SATB._STRING_TO_NUM,
        numArray: function(result) {
            // Refers to reference tag NUMBER_ARRAY
            return result.split("_").fastMap(_SATB._STRING_TO_NUM);
            //
        } // numArray
    }; // _SATB._RESULT_TYPES
    // Refers to reference tag NOTE_SUFFIX
    _SATB._SUFFIX_FUNCS = { // Potential Hotspot
        cfg: function(noteType, resultType, entry) {
            return SATB.notes[noteType][entry];
        }, // cfg
        val: function(noteType, resultType, entry) {
            var f = _SATB._RESULT_TYPES[resultType];
            return f ? f.bind(_SATB, entry) : function() { return entry; };
        }, // val
        switch: function(noteType, resultType, entry) {
            return $gameSwitches.value.bind($gameSwitches, +entry);
        }, // switch
        event: function(noteType, resultType, entry) {
            return $gameTemp.reserveCommonEvent.bind($gameTemp, +entry);
        }, // event
        var: function(noteType, resultType, entry) {
            return $gameVariables.value.bind($gameVariables, +entry);
        }, // var
        // Function contents' not supposed to change frequently so it's ok here
        script: function(noteType, resultType, entry) {
            var funcContent = $gameVariables.value(+entry);
            return GS.PARAM_NOTE_FUNCS.notes[noteType](funcContent);
        }, // script
        eval: function(noteType, resultType, entry) {
            return GS.PARAM_NOTE_FUNCS.notes[noteType](entry);
        } // eval
        //
    }; // _SATB._SUFFIX_FUNCS
    //

    _SATB._ARG_OBJ_SUFFIXES = ["cfg", "script", "eval"];

    // Refers to reference tag NOTE_SUFFIX
    _SATB._BASE_RUN_NOTES = { suffixes: ["cfg", "event", "script", "eval"] };
    _SATB._BOOL_RESULT_NOTES = {
        result: "bool",
        suffixes: ["cfg", "val", "switch", "script", "eval"]
    }; // _SATB._BOOL_RESULT_NOTES
    _SATB._NUM_RESULT_NOTES = {
        result: "num",
        suffixes: ["cfg", "val", "var", "script", "eval"]
    }; // _SATB._NUM_RESULT_NOTES
    //
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTE_TYPES = {
        coreMax: _SATB._NUM_RESULT_NOTES,
        coreActState: _SATB._BOOL_RESULT_NOTES
    }; // _SATB._NOTE_TYPES
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler owning effective notetag list
     */
    $.initialize = function(battler) { this._battler = battler; };

    /**
     * Destructor/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() { delete this._battler; /* Avoids memory leaks */ };

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The default result of the note
     */
    $.default_ = function(note, argObj_) {
        return _SATB._DEFAULT_RESULTS[note].call(this, argObj_);
    }; // $.default_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @returns {[PairFunc]} The list of unbound functions of the note involved
     */
    $.pairFuncs = function(note, datum_) {
        if (!datum_) return [];
        var pairs = datum_.meta.satb[note];
        if (!pairs) return [];
        var isValidPairFunc = _SATB._IS_VALID_PAIR.bind(_SATB, note);
        // It's not pure due to the cfg, switch, event, var and script suffixes
        var pairFunc = _SATB._PAIR_FUNC.bind(this, note, datum_);
        //
        return pairs.filterMap(isValidPairFunc, pairFunc);
    }; // $.pairFuncs

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @returns {*?} The result of the notetag function involved
     */
    $.run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        // Using _NOTE_ARG_OBJS on the wrong suffix will have the wrong context
        var unboundFunc = pairFunc.unboundFunc;
        if (!pairFunc.canBind) return unboundFunc();
        var argObjFunc = _SATB._NOTE_ARG_OBJS[note];
        var boundFunc = unboundFunc.bind(this._battler), datum = pairFunc.datum;
        return argObjFunc(boundFunc, datum, argObj_, latestChainedResult_);
        //
    }; // $.run_

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBRules
 *      - Chains the effective notetag list into its results using the rules
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBRules.prototype, _SATB = SATB.Game_SATBRules = {};
    var BM = SATB.BattleManager.new;

    // Refers to reference tag NOTE_OPERATORS
    _SATB._IS_ASSOCIATIVE_OPERATORS = {
        "+": true,
        "*": true,
        "-": false,
        "/": false,
        "%": false,
        // = is intended for unintended uses so it shouldn't be associative
        "=": false
        //
    }; // _SATB._IS_ASSOCIATIVE_OPERATORS
    //

    // The control coupling's to simplify the use of these functions
    _SATB._CONCAT_EVERY_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        if (result.length <= 0) return result;
        var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);
        return runResult_ ? _SATB._CONCAT_EVERY_VAL_RESULT_FUNC(
                note, argObj_, result, runResult_) : [];
    }; // _SATB._CONCAT_EVERY_RESULT_FUNC
    // The control coupling's to simplify the use of these functions
    _SATB._CONCAT_EVERY_VAL_RESULT_FUNC = function(note, argObj_, result, valResult) {
    // Potential Hotspot
        if (result.length <= 0) return result;
        // Only elements present in all arrays can stay
        return valResult.filter(function(r) { return result.contains(r); });
        //
    }; // _SATB._CONCAT_EVERY_VAL_RESULT_FUNC
    _SATB._CONCAT_SOME_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);
        return runResult_ ? _SATB._CONCAT_SOME_VAL_RESULT_FUNC(
                note, argObj_, result, runResult_) : result;
    }; // _SATB._CONCAT_SOME_RESULT_FUNC
    _SATB._CONCAT_SOME_VAL_RESULT_FUNC = function(note, argObj_, result, valResult) {
    // Potential Hotspot
        // It makes no sense to have duplicated elements
        return result.concat(valResult).filter(_SATB._IS_UNIQ_ELEM);
        // fastMerge can't be used as result might be initVal_ that can't change
    }; // _SATB._CONCAT_SOME_VAL_RESULT_FUNC
    _SATB._IS_UNIQ_ELEM = function(r, i, self) {
        // These array elements should be Javascript literals
        return self.indexOf(r) === i;
        //
    }; // _IS_UNIQ_ELEM
    _SATB._MIX_EVERY_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var keys = Object.keys(result);
        if (keys.length <= 0) return result;
        var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);
        return runResult_ ? _SATB._MIX_EVERY_OBJ_VAL_RESULT_FUNC(
                note, argObj_, result, runResult_) : {};
    }; // _SATB._MIX_EVERY_OBJ_RESULT_FUNC
    _SATB._MIX_EVERY_OBJ_VAL_RESULT_FUNC = function(note, argObj_, result, valResult) {
    // Potential Hotspot
        var keys = Object.keys(result);
        if (keys.length <= 0) return result;
        // Only key value pairs present in all objects can stay
        var ks = Object.keys(valResult);
        keys.forEach(function(key) {
            if (!ks.contains(key) || result[key] !== valResult[key]) {
                return delete result[key];
            }
        });
        //
        return result;
    }; // _SATB._MIX_EVERY_OBJ_VAL_RESULT_FUNC
    _SATB._MIX_SOME_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);
        return runResult_ ? _SATB._MIX_SOME_OBJ_VAL_RESULT_FUNC(
                note, argObj_, result, runResult_) : result;
    }; // _SATB._MIX_SOME_OBJ_RESULT_FUNC
    _SATB._MIX_SOME_OBJ_VAL_RESULT_FUNC = function(note, argObj_, result, valResult) {
    // Potential Hotspot
        // Objects with lower priorities shouldn't override the higher ones
        Object.keys(valResult).forEach(function(key) {
            if (!result[key]) result[key] = valResult[key];
        });
        //
        return result;
    }; // _SATB._MIX_SOME_OBJ_VAL_RESULT_FUNC
    //
    // Such little duplications in fnction contents won't hurt much
    _SATB._OPERATOR_RESULT_FUNC = function(operator) { // Potential Hotspot
        var content = [
            "'use strict';",
            "var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);",
            "return result " + operator + " runResult_;"
        ].join("\n");
        return new Function("note", "argObj_", "result", "pairFunc", content);
    }; // _SATB._OPERATOR_RESULT_FUNC
    _SATB._OPERATOR_VAL_RESULT_FUNC = function(operator) { // Potential Hotspot
        var content = [
            "'use strict';",
            "return result " + operator + " valResult;"
        ].join("\n");
        return new Function("note", "argObj_", "result", "valResult", content);
    }; // _SATB._OPERATOR_VAL_RESULT_FUNC
    //
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default_(note, argObj_);
        return this._pairs.run_(argObj_, note, list[0]);
    }; // _SATB._FIRST_LIST_MONO_FUNC
    _SATB._FIRST_VAL_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        return list[0] || this._pairs.default_(note, argObj_);
    }; // _SATB._FIRST_VAL_MONO_FUNC
    _SATB._LAST_LIST_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default_(note, argObj_);
        return this._pairs.run_(argObj_, note, list[list.length - 1]);
    }; // _SATB._LAST_LIST_MONO_FUNC
    _SATB._LAST_VAL_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        return list[list.length - 1] || this._pairs.default_(note, argObj_);
    }; // _SATB._LAST_VAL_MONO_FUNC
    //
    _SATB._MONO_RESULT_CHAINING_RULES = function(func, valFunc) {
    // Potential Hotspot
        // It's understood that associativity means nothing when running a list
        return {
            concat: func,
            concatVal: valFunc,
            mixObj: func,
            mixObjVal: valFunc,
            operator: func,
            operatorVal: valFunc
        };
        //
    }; // _SATB._MONO_RESULT_CHAINING_RULES
    _SATB._RESULT_CHAINING_RULE_FUNC = function(func) { // Potential Hotspot
        // The this pointer is Game_SATBRules.prototype
        return function(list, note, argObj_, initVal_) { // Potential Hotspot
            // binding func directly would break the shared constant functions
            var f = func.bind(this, note, argObj_);
            //
            if (BM.IS_VALID_RESULT(initVal_)) return list.reduce(f, initVal_);
            var op = _SATB._RESULT_CHAINING_OPERATION[note];
            // The initial value of concat must be an Array
            if (op === "concat") return list.reduce(f, []);
            //
            // An empty list without a default value must return invalid value
            return list.length > 0 ? list.reduce(f) : undefined;
            //
        };
        //
    }; // _SATB._RESULT_CHAINING_RULE_FUNC
    _SATB._NOTE_PRIORITIES = {
        coreMax: function() {
            return $gameSystem.satbParam("_coreMaxATBValNotePriorities");
        },
        coreActState: function() { return ["thisState"]; }
    }; // _SATB._NOTE_PRIORITIES
    _SATB._RESULT_CHAINING_RULES = { // Potential Hotspot
        every: {
            isAssociative: true,
            concat: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_EVERY_RESULT_FUNC),
            concatVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_EVERY_VAL_RESULT_FUNC),
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_EVERY_OBJ_RESULT_FUNC),
            mixObjVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_EVERY_OBJ_VAL_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("&&")),
            operatorVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_VAL_RESULT_FUNC("&&"))
        }, // every
        some: {
            isAssociative: true,
            concat: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_SOME_RESULT_FUNC),
            concatVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_SOME_VAL_RESULT_FUNC),
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_SOME_OBJ_RESULT_FUNC),
            mixObjVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_SOME_OBJ_VAL_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("||")),
            operatorVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_VAL_RESULT_FUNC("||"))
        }, // some
        // Conforms with the chaining rule interface
        first: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._FIRST_LIST_MONO_FUNC, _SATB._FIRST_VAL_MONO_FUNC),
        last: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._LAST_LIST_MONO_FUNC, _SATB._LAST_VAL_MONO_FUNC),
        //
    }; // _SATB._RESULT_CHAINING_RULES
    Object.keys(_SATB._IS_ASSOCIATIVE_OPERATORS).forEach(function(operator) {
        var func = _SATB._OPERATOR_RESULT_FUNC(operator);
        var valFunc = _SATB._OPERATOR_VAL_RESULT_FUNC(operator);
        _SATB._RESULT_CHAINING_RULES[operator] = {
            isAssociative: _SATB._IS_ASSOCIATIVE_OPERATORS[operator],
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(func),
            operatorVal: _SATB._RESULT_CHAINING_RULE_FUNC(valFunc)
        }; // _SATB._RESULT_CHAINING_RULES[operator]
    });
    _SATB._RUN_LIST_CHAINING_RULES = { // Potential Hotspot
        every: function(list) { return list; },
        first: function(list) { return [list[0]]; },
        last: function(list) { return [list[list.length - 1]]; }
    }; // _RUN_LIST_CHAINING_RULES

    // Refers to reference tag DEFAULT_CHAINING_RULE_FIRST
    _SATB._DEFAULT_CHAINING_RULE = "first";
    //

    _SATB._NOTE_CHAINING_RULES = {
        coreMax: "_coreMaxATBValNoteChainingRule",
        coreActState: "_coreActStateNoteChainingRule"
    };
    // Refers to reference tag NOTE_TYPE
    _SATB._RESULT_CHAINING_OPERATION = {
        coreMax: "operator",
        coreActState: "operator"
    }; // _SATB._RESULT_CHAINING_OPERATION
    //

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Game_SATBPairs} _pairs: The helper checking/returning note pair

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_SATBPairs} pairs - The note pair checker/user
     */
    $.initialize = function(pairs) { this._pairs = pairs; };

    /**
     * Destructor/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() { this._pairs.clear(); /* Avoids memory leaks */ };

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {Boolean} The check result
     */
    $.isAssociative = function(note) {
        var chainingRule = this._chainingRule(note);
        return _SATB._RESULT_CHAINING_RULES[chainingRule].isAssociative;
    }; // $.isAssociative

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @returns {*} The chained result from the notetag list of note involved
     */
    $.chainedResult_ = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var op = _SATB._RESULT_CHAINING_OPERATION[note];
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][op];
        return resultFunc.call(this, list, note, argObj_, initVal_);
        //
    }; // $.chainedResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[<T>]} list - The effective notetag results to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {<T>?} initVal_ - The initial result to chain the notetag list
     * @returns {<T>} The chained result from the notetag results involved
     */
    $.chainedValResult_ = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var valOp = _SATB._RESULT_CHAINING_OPERATION[note] + "Val";
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][valOp];
        return resultFunc.call(this, list, note, argObj_, initVal_);
        //
    }; // $.chainedValResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {([PairFunc]) -> [PairFunc]} The function chaining the note list
     */
    $.chainedRunList = function(list, note) {
        return _SATB._RUN_LIST_CHAINING_RULES[this._chainingRule(note)](list);
    }; // $.chainedRunList

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[String]} The data type priority queue parameter value
     */
    $.priorities = function(note) {
        // Refers to reference tag NOTE_DATA_TYPES and THIS_GAME_BATTLER
        return _SATB._NOTE_PRIORITIES[note]();
        //
    }; // $.priorities

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @returns {ChainRule} The effective notetag chaining rule parameter value
     */
    $._chainingRule = function(note) {
        var rule = _SATB._NOTE_CHAINING_RULES[note];
        return $gameSystem.satbParam(rule) || _SATB._DEFAULT_CHAINING_RULE;
    }; // $._chainingRule

})(DoubleX_RMMV.SATB); // Game_SATBPairs.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Party
 *      - Clears battler notes before save and inits them afterwards/upon load
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Party = { orig: {}, new: {} };
    var _GP = SATB.Game_Party.orig, _SATB = SATB.Game_Party.new;
    var $ = Game_Party.prototype, $$ = Game_Unit.prototype;

    _SATB._INIT_NOTES = function(mem) { mem.initSATBNotes(); };
    _SATB._CLEAR_NOTES = function(mem) { mem.clearSATBNotes(); };
    _SATB._ON_ALL_ACTS_END = function(mem) { mem.onAllSATBActsEnd(); };

    _GP.clearActions = $.clearActions || $$.clearActions;
    _SATB.clearActions = $.clearActions = function() {
    // v0.00a - v0.00a; Extended
        _GP.clearActions.apply(this, arguments);
        // Added to clear the ATB value of all actors upon a failed escape
        _SATB._onAllActsEnd.call(this);
        //
    }; // $.clearActions

    _GP.removeActor = $.removeActor;
    _SATB.removeActor = $.removeActor = function(actorId) {
    // v0.00a - v0.00a; Extended
        // Added to ensure actors being add back will have the ATB value cleared
        _SATB._removeActor.call(this);
        // This must be placed here or it won't know if actorId is in the party
        _GP.removeActor.apply(this, arguments);
    }; // $.removeActor

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() { this.members().forEach(_SATB._INIT_NOTES); };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        this.members().forEach(_SATB._CLEAR_NOTES);
    }; // $.clearSATBNotes

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onAllActsEnd = function() {
        this.members().forEach(_SATB._ON_ALL_ACTS_END);
    }; // _SATB._onAllActsEnd

    /**
     * The this pointer is Game_Party.prototype
     * @since v0.00a @version v0.00a
     * @param {Id} actorId - The id of the actor to be removed from the party
     */
    _SATB._removeActor = function(actorId) {
    // v0.00a - v0.00a; Extended
        if (!this._actors.contains(actorId)) return;
        // clearCoreSATB shouldn't be used as -ve ATB value isn't desirable
        $gameActors.actor(actorId).initCoreSATBActs(0);
        //
    }; // _SATB._removeActor

})(DoubleX_RMMV.SATB); // Game_Party.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Intercepts plugin command coming from this plugin as script calls
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Interpreter = { orig: {}, new: {} };
    var _GI = SATB.Game_Interpreter.orig, $ = Game_Interpreter.prototype;
    var _SATB = SATB.Game_Interpreter.new, GB = SATB.Game_Battler.new;

    _SATB._CAN_MOVE = function(actor) { return actor.canMove(); };
    _SATB._FILTERED_TARGETS = function(targetType, targets, targetGroup) {
        // Refers to reference tag PLUGIN_CMD_TARGET
        switch (_SATB._TARGET_GROUPS[targetType]) {
            case _SATB._TARGET_ID: {
                return _SATB._FILTERED_TARGET_IDS(targets, targetGroup);
            } case _SATB._TARGET_INDEX: {
                return _SATB._FILTERED_TARGET_INDICES(targets, targetGroup);
            }
        }
        return [];
        //
    }; // _SATB._FILTERED_TARGETS
    _SATB._FILTERED_TARGET_IDS = function(targets, targetGroup) {
      return targetGroup.filter(function(target) {
          // targetGroup must only have actors for _SATB._TARGET_ID
          return targets.contains(target[isNaN(target) ? "name" : "actorId"]());
          //
      });
    }; // _SATB._FILTERED_TARGET_IDS
    _SATB._FILTERED_TARGET_INDICES = function(targets, targetGroup) {
        return targetGroup.filter(function(target, i) {
            if (isNaN(target)) return targets.contains(target.name());
            return targets.contains(i);
        });
    }; // _SATB._FILTERED_TARGET_INDICES
    _SATB._IS_ALIVE = function(actor) { return actor.isAlive(); };
    _SATB._IS_DEAD = function(actor) { return actor.isDead(); };
    _SATB._IS_PLUGIN_CMD = function(cmd) { return _SATB._CMDS.contains(cmd); };

    _SATB._TARGET_TYPES = {
        allParty: function() { return $gameParty.members(); },
        aliveParty: function() { return $gameParty.aliveMembers(); },
        deadParty: function() { return $gameParty.deadMembers(); },
        movableParty: function() { return $gameParty.movableMembers(); },
        allTroop: function() { return $gameTroop.members(); },
        aliveTroop: function() { return $gameTroop.aliveMembers(); },
        deadTroop: function() { return $gameTroop.deadMembers(); },
        movableTroop: function() { return $gameTroop.movableMembers(); },
        allActors: function() { return $gameActors._data; },
        aliveActors: function() {
            return $gameActors._data.filter(_SATB._IS_ALIVE);
        }, // aliveActors
        deadActors: function() {
            return $gameActors._data.filter(_SATB._IS_DEAD);
        }, // deadActors
        movableActors: function() {
            return $gameActors._data.filter(_SATB._CAN_MOVE);
        } // movableActors
    }; // _SATB._TARGET_TYPES

    // Functions returning results aren't commands but they're not listed anyway
    _SATB._CMDS = Object.keys(GB.NOTE_FORWARDED_FUNCS).concat(
            GB.PHASE_TYPE_FORWARDED_FUNCS);
    //
    _SATB._TARGET_ID = "id", _SATB._TARGET_INDEX = "index";

    _SATB._TARGET_GROUPS = {
        allParty: _SATB._TARGET_INDEX,
        aliveParty: _SATB._TARGET_INDEX,
        deadParty: _SATB._TARGET_INDEX,
        movableParty: _SATB._TARGET_INDEX,
        allTroop: _SATB._TARGET_INDEX,
        aliveTroop: _SATB._TARGET_INDEX,
        deadTroop: _SATB._TARGET_INDEX,
        movableTroop: _SATB._TARGET_INDEX,
        allActors: _SATB._TARGET_ID,
        aliveActors: _SATB._TARGET_ID,
        deadActors: _SATB._TARGET_ID,
        movableActors: _SATB._TARGET_ID
    }; // _SATB._TARGET_GROUPS

    _GI.pluginCommand = $.pluginCommand;
    _SATB.pluginCommand = $.pluginCommand = function(command, args) {
    // v0.00a - v0.00a; Extended
        _GI.pluginCommand.apply(this, arguments);
        // Added to invoke the plugin command from this plugin
        _SATB._pluginCmd.call(this, command, args);
        //
    }; // $.pluginCommand

    /**
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @param {PluginCmd} cmd - The plugin command name
     * @param {PluginArgs} args - Plugin command arguments
     */
    _SATB._pluginCmd = function(cmd, args) {
        if (!_SATB._IS_PLUGIN_CMD(cmd)) return;
        _SATB._usePluginCmd.call(this, cmd, args);
    }; // _SATB._pluginCmd

    /**
     * Plugin command's just another way of using script call
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @param {PluginCmd} cmd - The plugin command name
     * @param {PluginArgs} args - Plugin command arguments
     */
    _SATB._usePluginCmd = function(cmd, args) {
        // The 1st and 2nd arguments must always be the target type and target
        var targetType = args.shift(), targets = args.shift().split(",");
        //
        var battlers = _SATB._pluginCmdTargets.call(this, targetType, targets);
        battlers.forEach(function(t) { t[cmd].apply(this, args); }, this);
    }; // _SATB._usePluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {TargetType} targetType - The battler group to be targeted
     * @param {[String|Number]} targets - Refer to reference tag
     *                                    PLUGIN_CMD_TARGET
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargets = function(targetType, targets) {
        var targetGroup = _SATB._pluginCmdTargetGroup.call(this, targetType);
        return _SATB._FILTERED_TARGETS(targetType, targets, targetGroup);
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {TargetType} targetType - The battler group to be targeted
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargetGroup = function(targetType) {
        if (!_SATB._TARGET_TYPES[targetType]) return [];
        return _SATB._TARGET_TYPES[targetType]();
    }; // _SATB._pluginCmdTargetGroup

})(DoubleX_RMMV.SATB); // Game_Interpreter.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Edits the high level battle flow structure to run this plugin
 *----------------------------------------------------------------------------*/

 (function(SATB) {

     "use strict";

     SATB.Scene_Battle = { orig: {}, new: {} };
     var _SB = SATB.Scene_Battle.orig, $ = Scene_Battle.prototype;
     var _SATB = SATB.Scene_Battle.new;

    _SATB._DEACTIVATE_HIDE_SELECTION_WIN = function(win) {
        // It's pointless to extract these codes into a new method
        if (win.active) win.deactivate();
        if (win.visible) win.hide();
        // These selection windows can't be inactive but visible
    }; // _SATB._DEACTIVATE_HIDE_SELECTION_WIN
    _SATB._IS_VISIBLE = function(window) { return window.visible; };

     /*------------------------------------------------------------------------
      *    New private instance variables
      *------------------------------------------------------------------------*/
     // {{*}} _satb: The container of all other new variables
     //       {Boolean} canLastEsc: Whether the party can escape in last frame
     //       {Boolean} canLastDisplayWins: Whether the windows can be displayed
     //       {{Boolean}} wasWinActive: Whether the windows were active before

    _SB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _SB.initialize.apply(this, arguments);
        // Added to initialize all the new variables as well
        _SATB._init.call(this);
        //
    }; // $.initialize

    _SB.updateBattleProcess = $.updateBattleProcess;
    _SATB.updateBattleProcess = $.updateBattleProcess = function() {
    // v0.00a - v0.00a; Extended
        // Added to abandon the default battle system action input and exec flow
        if (BattleManager.isSATB()) return _SATB._updateBattleProc.call(this);
        //
        _SB.updateBattleProcess.apply(this, arguments);
    }; // $.updateBattleProcess

    _SB.updateStatusWindow = $.updateStatusWindow;
    _SATB.updateStatusWindow = $.updateStatusWindow = function() {
    // v0.00a - v0.00a; Extended
        // Added to update the statuses of all selection windows in this plugin
        _SATB._updateInputWins.call(this);
        //
        _SB.updateStatusWindow.apply(this, arguments);
    }; // $.updateStatusWindow

    _SB.updateWindowPositions = $.updateWindowPositions;
    _SATB.updateWindowPositions = $.updateWindowPositions = function() {
    // v0.00a - v0.00a; Extended
        _SB.updateWindowPositions.apply(this, arguments);
        // Added to let the actor window completely cover the status window
        _SATB._updateActorWinPos.call(this);
        //
    }; // $.updateWindowPositions

    _SB.refreshStatus = $.refreshStatus;
    _SATB.refreshStatus = $.refreshStatus = function() {
    // v0.00a - v0.00a; Extended
        // Added to refresh the contents and visibilities of all selection wins
        this.refreshSATBInputWins();
        //
        _SB.refreshStatus.apply(this, arguments);
    }; // $.refreshStatus

    _SB.commandFight = $.commandFight;
    _SATB.commandFight = $.commandFight = function() {
    // v0.00a - v0.00a; Extended
        // Added to setup the inputable actor directly without selectNextCommand
        if (BattleManager.isSATB()) return _SATB._cmdFight.call(this);
        //
        _SB.commandFight.apply(this, arguments);
    }; // _SATB.commandFight

    _SB.commandEscape = $.commandEscape;
    _SATB.commandEscape = $.commandEscape = function() {
    // v0.00a - v0.00a; Extended
        // Added to ensure party escape attempt won't trigger when battle's busy
        if (!BattleManager.canSATBEsc(this)) {
            return this.startPartyCommandSelection();
        }
        //
        _SB.commandEscape.apply(this, arguments);
    }; // $.commandEscape

    _SB.selectNextCommand = $.selectNextCommand;
    _SATB.selectNextCommand = $.selectNextCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to avoid setting up the party command window upon next command
        if (BattleManager.isSATB()) return _SATB._selectNextCmd.call(this);
        //
        _SB.selectNextCommand.apply(this, arguments);
    }; // $.selectNextCommand

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $.refreshSATBInputWins = function() {
        if (!BattleManager.isSATB()) return;
        // It's possible for the target list/availability to be changed
        if (this._actorWindow.visible) {
            this._actorWindow.refresh();
            return this._enemyWindow.deselect();
        } else if (this._enemyWindow.visible) {
            this._enemyWindow.refresh();
            return this._actorWindow.deselect();
        }
        // Invisible selection wins are active only when they can't be shown
        // It's to ensure that the stale targets aren't displayed as selected
        this._actorWindow.deselect();
        this._enemyWindow.deselect();
        // Invisible selection wins are active only when they can't be shown
        // It's possible for the skill/item usability/cost to be changed
        if (this._skillWindow.visible) return this._skillWindow.refresh();
        if (this._itemWindow.visible) return this._itemWindow.refresh();
        // Invisible selection wins are active only when they can't be shown
        // It's possible for the command list/availability to be changed
        if (this._actorCommandWindow.active) this._actorCommandWindow.refresh();
        //
    }; // $.refreshSATBInputWins

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.closeSATBInputWins = function() {
        _SATB._deactivateHideSelectionWins.call(this);
        _SATB._closeDeactivateActorCmdWin.call(this);
        _SATB._closeDeactivatePartyCmdWin.call(this);
    }; // $.closeSATBInputWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() { this._satb = { wasWinActive: {} }; };

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateBattleProc = function() {
        // Reconstructs battle system action input and execution flows for atb
        _SATB._updateCanEsc.call(this);
        if (!BattleManager.canUpdateSATBProc()) {
            // It's possible for an inputable actor to die without ATB update
            return _SATB._updateActorSelection.call(this);
            //
        }
        _SATB._updateProc.call(this);
        //
    }; // _SATB._updateBattleProc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCanEsc = function() {
        // Updates the party escape command availability if the window's active
        if (!this._partyCommandWindow.active) return;
        var canEsc = BattleManager.canSATBEsc();
        if (this._satb.canLastEsc === canEsc) return;
        this._partyCommandWindow.refresh();
        this._satb.canLastEsc = canEsc;
        //
    }; // _SATB._updateCanEsc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateProc = function() {
        BattleManager.updateCoreSATB();
        _SATB._updateActorSelection.call(this);
        BattleManager.updateSATBAct();
    }; // _SATB._updateProc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    _SATB._updateActorSelection = function() {
        var inputableIndices = BattleManager.inputableSATBActorIndices();
        var selectedIndex = this._statusWindow.index();
        // The selected inputable actor remains inputable so no update's needed
        if (inputableIndices.contains(selectedIndex)) return;
        //
        // Deactivates the active input windows that should be no longer active
        if (selectedIndex >= 0) return _SATB._onDeselectActor.call(this);
        var hasNoInputableActor = inputableIndices.length <= 0;
        if (this._partyCommandWindow.active) {
            // There's no need to setup a new inputable actor in this case
            if (hasNoInputableActor) {
                _SATB._closeDeactivatePartyCmdWin.call(this);
            }
            return;
            //
        }
        //
        // Setups new inputable actors to input actions if there's such actors
        if (hasNoInputableActor) return;
        _SATB._onSelectActor.call(this, inputableIndices[0]);
        //
    }; // _SATB._updateActorSelection

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onDeselectActor = function() {
        _SATB._deactivateHideSelectionWins.call(this);
        _SATB._closeDeactivateActorCmdWin.call(this);
        _SATB._deselectOpenStatusWin.call(this);
    }; // _SATB._onDeselectActor

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._deactivateHideSelectionWins = function() {
        // Close all selection windows for selected actor becoming not inputable
        _SATB._selectionWins.call(this).forEach(
                _SATB._DEACTIVATE_HIDE_SELECTION_WIN);
        //
    }; // _SATB._deactivateHideSelectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._closeDeactivateActorCmdWin = function() {
        this._actorCommandWindow.close();
        this._actorCommandWindow.deactivate();
    }; // _SATB._closeDeactivateActorCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._deselectOpenStatusWin = function() {
        // It's impossible to close the status win without closing actor cmd win
        if (_SATB._selectionWins.call(this).some(_SATB._IS_VISIBLE)) {
            this._statusWindow.open();
        }
        //
        this._statusWindow.deselect();
    }; // _SATB._deselectOpenStatusWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._closeDeactivatePartyCmdWin = function() {
        this._partyCommandWindow.close();
        this._partyCommandWindow.deactivate();
    }; // _SATB._closeDeactivatePartyCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateInputWins = function() {
        if (!BattleManager.isSATB()) return;
        var canDisplayWins = _SATB._canDisplayWins.call(this);
        if (this._satb.canLastDisplayWins === canDisplayWins) return;
        this._satb.canLastDisplayWins = canDisplayWins;
        // Reopens all commands windows after they become able to be open
        if (canDisplayWins) return _SATB._displayWins.call(this);
        //
        // Hides all selection windows as well when they can't be displayed
        _SATB._hideSelectionWins.call(this);
        //
    }; // _SATB._updateInputWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._canDisplayWins = function() {
        // Checks whether cases preventing windows to be open are all gone
        if ($gameMessage.isBusy()) return false;
        return this.isActive() && !this._messageWindow.isClosing();
        //
    }; // _SATB._canDisplayWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    _SATB._displayWins = function() {
        if (!BattleManager.actor()) {
            if (this._partyCommandWindow.active) {
                this._partyCommandWindow.setup();
            }
            return;
        }
        this._actorCommandWindow.open();
        if (this._satb.wasWinActive._actorWindow) {
            return this.selectActorSelection();
        } else if (this._satb.wasWinActive._enemyWindow) {
            return this.selectEnemySelection();
        }
        if (this._satb.wasWinActive._skillWindow) return this.commandSkill();
        if (this._satb.wasWinActive._itemWindow) return this.commandItem();
        /** @todo Ensures the actor command window really selects last cmd */
        this.startActorCommandSelection();
        //
    }; // _SATB._displayWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._hideSelectionWins = function() {
        [
            "_actorWindow",
            "_enemyWindow",
            "_skillWindow",
            "_itemWindow"
        ].forEach(_SATB._hideSelectionWin, this);
    }; // _SATB._hideSelectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} winName - The name of the selection window to be hidden
     */
    _SATB._hideSelectionWin = function(winName) {
        // The currently active window will be activated after it can be shown
        var win = this[winName], isActive = win.active;
        this._satb.wasWinActive[winName] = isActive;
        win.deactivate();
        //
        win.hide();
    }; // _SATB._hideSelectionWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {[Window_Selectable]} The list of selection windows
     */
    _SATB._selectionWins = function() {
        // Actor and party command windows are command but not selection windows
        return [
            this._actorWindow,
            this._enemyWindow,
            this._skillWindow,
            this._itemWindow
        ];
        //
    }; // _SATB._selectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateActorWinPos = function() {
        if (!_SATB._isUpdateActorWinPos.call(this)) return;
        // Ensure the actor window will completely cover the status window
        this._actorWindow.x = this._statusWindow.x;
        //
    }; // _SATB._updateActorWinPos

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._isUpdateActorWinPos = function() {
        if (!BattleManager.isSATB() || !this._actorWindow.visible) return false;
        return this._actorWindow.x !== this._statusWindow.x;
    }; // _SATB._isUpdateActorWinPos

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     */
    _SATB._cmdFight = function() {
        // Using nextCommand would cause inputable actor to be avtable instead
        var inputableIndices = BattleManager.inputableSATBActorIndices();
        _SATB._onSelectActor.call(this, inputableIndices[0]);
        //
    }; // _SATB._cmdFight

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Index} index - The index of the inputable actor in the party
     */
    _SATB._onSelectActor = function(index) {
        BattleManager.changeActor(index, 'waiting');
        this.startActorCommandSelection();
    }; // _SATB._onSelectActor

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._selectNextCmd = function(index) {
        BattleManager.selectNextCommand();
        // So actor cmd win will be immediately setup for next inputable actor
        if (BattleManager.isInputting() && BattleManager.actor()) {
            return this.startActorCommandSelection();
        }
        //
        this.endCommandSelection();
    }; // _SATB._selectNextCmd

})(DoubleX_RMMV.SATB); // Scene_Battle.prototype

/*----------------------------------------------------------------------------*/

} else {
    if (!DoubleX_RMMV.Superlative_ATB_Parameters_File) {
        alert("DoubleX RMMV Superlative ATB Parameters should be above " +
                "DoubleX RMMV Superlative ATB Implementations");
    }
    if (!DoubleX_RMMV.SATB) {
        alert("DoubleX RMMV Superlative ATB Configurations should be above " +
                "DoubleX RMMV Superlative ATB Implementations");
    }
} // if (DoubleX_RMMV.SATB)

/*============================================================================*/
