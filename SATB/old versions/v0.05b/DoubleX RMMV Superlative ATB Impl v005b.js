// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Implementations"] = "v0.05b";
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
 *           this implementation plugin
 *           (Thorough comprehension on the essence of RMMV plugin development
 *           with at least 1 advanced complex high quality plugin written
 *           without nontrivial bugs up to 10000 LoC scale and being a veteran
 *           with significant number of plugin users)
 *      2. All reference tags are to have clear references between the
 *         documentation plugin and implementation plugin by searching them
 *      3. All intentionally hidden script calls can be found by searching
 *         ADVANCED_SCRIPT_CALLS_ONLY
 *      4. Parameter/Return value of type * means it might be of any type
 *      5. Function signature with (**) means it might take any number of
 *         parameters of any type
 *      6. Supposedly nullable variables are marked with the _ suffix in their
 *         names(but they can be sure to be non null in some cases)
 *      7. Functions supposedly returning nullable values are marked with the
 *         _ suffix in their names(but their return values can be sure to be
 *         non null in some cases)
 *    # Adding new parameters:
 *      1. Add them in the parameter plugin
 *         - Please add Additional Descriptions, Function arguments,
 *           Valid values, and Examples as well
 *      2. Add them in the configuration plugin
 *         - Please return results/execute commands that are consistent with
 *           the parameter default values in the parameter plugin
 *      3. Add them in the following parts of the implementation plugin:
 *         - _SATB.PARAM_NOTE_FUNCS.params in Game_System
 *         - _SATB._PARAM_UPDATES in Game_System if changing the parameter
 *           value might have to invalidate the corresponding part of the
 *           notetag cache
 *         - _SATB._BOOL_PARAMS in Game_System if the parameter store raw
 *           boolean values in text rather than function contents
 *         - _SATB._JSON_PARAMS in Game_System if the parameter value needs to
 *           be parsed into JSON first before being able to be read properly
 *         - _SATB._CACHED_DEFAULT_NOTE_PARAMS in Game_System if the parameter
 *           value is the default value of a notetag
 *         - _SATB._PARAM_MODULES in Game_System
 *      4. Add them in the following parts of the unit test plugin:
 *         - SATBUT.unitTests.params
 *         - SATBUT.unitTests.testParamArgsWithoutContext if the parameter
 *           function doesn't use any contexts
 *    # Adding new notetags:
 *      1. Add them in the documentation plugin
 *      2. Add the corresponding NOTEX in the configuration plugin
 *      3. Add them in the following parts of the implementation plugin:
 *         - _SATB.PARAM_NOTE_FUNCS.notes in Game_System
 *         - _SATB._DEFAULT_RESULTS in Game_SATBPairs if the notetag has
 *           default values(may or may not be from parameters)
 *         - _SATB._NOTE_ARG_OBJS in Game_SATBPairs
 *         - _SATB._NOTE_TYPES in Game_SATBPairs
 *         - _SATB._NOTE_PRIORITIES in Game_SATBRules
 *         - _SATB._IS_NOTE_USE_DEFAULT in Game_SATBRules
 *         - _SATB._NOTE_CHAINING_RULES in Game_SATBRules
 *         - _SATB._RESULT_CHAINING_OPERATION in Game_SATBRules
 *      4. Add them in the following parts of the unit test plugin:
 *         - SATBUT.unitTests.noteTypes
 *         - SATBUT.unitTests.defaultNoteTypes if the notetag has default
 *           values(may or may not be from parameters)
 *         - SATBUT.unitTests.chainedNoteTypes unless there's really nothing
 *           to check for the chained notetag result
 *         - SATBUT.unitTests.noteChainingRules
 *         - SATBUT.unitTests.noteArgObjs if the notetag functions take
 *           argument objects
 *----------------------------------------------------------------------------
 */

if (DoubleX_RMMV.Superlative_ATB_Parameters_File && DoubleX_RMMV.SATB) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the note result/running helper for SATB
 *----------------------------------------------------------------------------*/

function SATBTurnManager() { // v0.04a+
    "use strict";
    throw new Error("SATBTurnManager is a static class!");
} // SATBTurnManager
function SATBManager() { // v0.04a+
    "use strict";
    throw new Error("SATBManager is a static class!");
} // SATBManager
function Game_SATBPhaseTypes() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseTypes
function Game_SATBNotes() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBNotes
// DON'T USE THESE ON YOUR OWN UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
function Game_SATBCache() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBCache
function Game_SATBPairs() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPairs
function Game_SATBRules() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBRules
//
function Window_SATBBar() { // v0.03a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBBar
// It's supposed to be an abstract class
function Window_SATBBase() { // v0.02a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBBase
//
function Window_SATBForceRunCmd() { // v0.02a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBForceRunCmd
function Window_SATBForceStopCmd() { // v0.02a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBForceStopCmd
function Window_SATBForceStatus() { // v0.02a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBForceStatus

    /*------------------------------------------------------------------------
     *    New types
     *------------------------------------------------------------------------*/
    /**
     * @enum @type {String} ATBForceState - stop, norm, run(v0.02a+)
     * @enum @type {String} ATBPhase - norm, charge, cooldown(v0.04a+)
     * @enum @type {String} ChainRule - first, last, +, -, *, /, %, =, some,
     *                                  every
     * @enum @type {String} ClockUnit - act, frame, sec(v0.04a+)
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
     * @type {{Param}} WinBaseParams - Check _setWinBaseParams in
     *                                 Window_SATBBase(v0.02a+)
     */

/*----------------------------------------------------------------------------
*    # Edit Javascript class: Array
*      - Adds methods combined from existing ones to be more GC friendly
*----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $ = Array.prototype;

    /**
     * @interface @since v0.00a @version v0.00a
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
     * @interface @since v0.00a @version v0.00a
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
     * @interface @since v0.00a @version v0.00a
     * @param {[*]} array - The array to be merged
     * @returns {This} The original array merged with another array in place
     */
    var pushFunc = function(elem) { this.push(elem); };
    $.fastMerge = $.fastMerge || function(array) {
        // forEach is tested to be the fastest among sandboxes including RMMV
        array.forEach(pushFunc, this);
        // array.forEach(this.push, this) can't be used as forEach has >1 args
        return this;
    }; // $.fastMerge

    /**
     * Chaining map with reduce will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in reduceCallback
     * @interface @since v0.00a @version v0.00a
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
     * @interface @since v0.00a @version v0.00a
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
     * @interface @since v0.00a @version v0.00a
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
     * @interface @since v0.00a @version v0.00a
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

    /**
     * This method erases the passed element(if any) from this original array
     * @interface @since v0.00a @version v0.00a
     * @param {*} elem - Element(if any) to be erased from this original array
     * @returns {This} This original array with passed element(if any) erased
     */
    $.eraseElem = $.eraseElem || function(elem) {
        var i = this.indexOf(elem);
        if (i >= 0) this.splice(i, 1);
        return this;
    }; // $.fastMerge

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
*    # (v0.05b+)Edit RMMV class: JsonEx
*      - Ensures the cache of the battler deep copy remains intact
*----------------------------------------------------------------------------*/

(function() {

    "use strict";

    // It's unlikely that the original version's needed
    var makeDeepCopy = JsonEx.makeDeepCopy;
    //
    JsonEx.makeDeepCopy = function(object) { // v0.05b - v0.05b; Extended
        var deepCopy = makeDeepCopy.apply(this, arguments);
        // Added to prevent the battler cache from losing pairFunc unboundFuncs
        if (isBattler(object)) copyCache(object, deepCopy);
        //
        return deepCopy;
    }; // JsonEx.makeDeepCopy

    /**
     * Pure Function
     * @since v0.05b @version v0.05b
     * @param {*} obj The object to have a deep copy
     * @return {Boolean} The check result
     */
    function isBattler(obj) { // It's unlikely that it'll ever be reused
        // The deep copy should share as little with the original as possible
        var satb = obj._satb;
        if (!satb) return false;
        var notes = satb.notes;
        return notes && notes._cache;
        //
    } // isBattler

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     * @param {*} obj The object to have a deep copy
     * @param {*} deepCopy The object deep copy
     * @return {Boolean} The check result
     */
    function copyCache(obj, deepCopy) { // It's unlikely that it'll be reused
        // The deep copy should share as little with the original as possible
        deepCopy._satb.notes._cache = obj._satb.notes._cache;
        //
    } // copyCache

})(); // JsonEx

/*----------------------------------------------------------------------------
*    # (v0.04a+)Edit RMMV class: Input
*      - Adds a method to detect the onKeyUp event
*----------------------------------------------------------------------------*/

(function() {

    "use strict";

    // The mapping of whether the key was pressed
    Input._wasPressed = {}; // New private variable
    //

    /**
     * Detects whether the onKeyUp event's just triggered
     * @interface @since v0.04a @version v0.04a
     * @param {String} keyName - The mapped name of the key
     * @return {Boolean} The check result
     * @todo Boosts performance without extending/rewriting any Input function
     */
    Input.isReleased = Input.isReleased || function(keyName) {
        // It's ok as the same key's supposed to have at most 1 check per frame
        var wasPressed = this._wasPressed;
        wasPressed[keyName] = wasPressed[keyName] || this.isPressed(keyName);
        if (this._isEscapeCompatible(keyName) && this.isReleased('escape')) {
            return true;
        }
        if (!wasPressed[keyName] || this._currentState[keyName]) return false;
        wasPressed[keyName] = false;
        return true;
        //
    }; // Input.isReleased

})(); // Input

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
    _SATB._SHOW_INVALID_NOTE = function(id, noteType, datumType, line) {
        console.warn([
            "A " + datumType + " data with id " + id,
            "Has the following invalid SATB notetag type " + noteType + ":",
            line
        ].join("\n"));
    }; // _SATB._SHOW_INVALID_NOTE
    _SATB._SWITCH_VAR_ID = function(match) {
        return +match.replace(_SATB._SWITCH_VAR_ID_REG_EXP, "");
    }; // _SATB._SWITCH_VAR_ID
    _SATB._SWITCH_VAR_IDS = function(funcContent, regex) {
        var matches = funcContent.match(regex);
        // It's possible for a function content to use tons of switch/variables
        return matches ? matches.fastMap(_SATB._SWITCH_VAR_ID) : [];
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
    // So alphanumeric characters as well as numbers with decimals are captured
    _SATB.REG_EXP_ENTRY_VAL = "[A-Za-z\\d_\.-]+";
    //
    _SATB._REG_EXP_ENTRY_SEPARATOR = " *, +";
    _SATB._REG_EXP_ENTRIES = " *(" + _SATB.REG_EXP_ENTRY_VAL + "(?:" +
            _SATB._REG_EXP_ENTRY_SEPARATOR + _SATB.REG_EXP_ENTRY_VAL + ")*) *";

    _SATB._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SATB._REG_EXP_NOTE + _SATB._REG_EXP_SUFFIXES +
                ":" + _SATB._REG_EXP_ENTRIES + ">", "gim"),
        evalStart: new RegExp("<" + _SATB._REG_EXP_NOTE + " *>", "gim"),
        evalEnd: new RegExp("< *\/" + _SATB._REG_EXP_NOTE + " *>", "gim")
        //
    }; // _SATB._REG_EXPS
    //
    // Extracts switch/variable id from results matching _SWITCH_VAR_REG_EXPS
    _SATB._SWITCH_VAR_ID_REG_EXP = /\D+/gim;
    //
    // Refer to reference tag SWITCH_VAR
    _SATB._SWITCH_VAR_REG_EXPS = {
        switch: /\$gameSwitches *\. *value *\( *(\d+) *\)/gim,
        var: /\$gameVariables *\. *value *\( *(\d+) *\)/gim
    }; // _SATB._SWITCH_VAR_REG_EXPS
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

    _DM.setupBattleTest = DataManager.setupBattleTest;
    _SATB.setupBattleTest = DataManager.setupBattleTest = function() {
    // v0.00a - v0.00a; Extended
        _DM.setupBattleTest.apply(this, arguments);
        // Added to setup everything that has to be setup upon battle test start
        SATB.onSetupBattleTest();
        //
    }; // DataManager.setupBattleTest

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
    DataManager.extractSaveContents = function(contents) {
    // v0.00a - v0.00a; Extended
        _DM.extractSaveContents.apply(this, arguments);
        // Added to use the stored function contents
        _SATB._extractSaveContents.call(this);
        // This must be placed here or game objects won't be ready
    }; // DataManager.extractSaveContents
    _SATB.extractSaveContents = DataManager.extractSaveContents;

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
        if (notes) Object.keys(notes).forEach(function(note) {
            this.scanSATBFuncContentForSwitchVars(val, note);
        }, this);
        // Not binding scanSATBFuncContentForSwitchVars is to minimize leak
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
        Object.keys(_SATB._SWITCH_VAR_REG_EXPS).forEach(function(switchVar) {
            _SATB._updateAllSwitchVarIds.call(
                    this, noteType, funcContent, switchVar);
        }, this);
        // Not binding _updateAllSwitchVarIds is to minimize memory leaks
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
            // Not binding _updateSwitchVarIds is to minimize memory leaks
            return dataTypes_.forEach(function(datumType) {
                _SATB._updateSwitchVarIds.call(
                        this, noteType, switchVar_, id_, datumType);
            }, this);
            //
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
     * @since v0.00a @version v0.05b
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
        var notes = Object.keys(SATB.Game_System.new.PARAM_NOTE_FUNCS.notes);
        Object.keys(allData).forEach(function(datumType) {
            // Not binding _loadNote is to minimize memory leaks
            allData[datumType].forEach(function(datum_) {
                _SATB._loadNote.call(this, notes, datumType, datum_);
            }, this);
            //
        }, this);
    }; // _SATB._loadAllNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.05b
     * @param {[NoteType]} notes - The list of note types of this plugin
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {Datum?} datum_ - The datum to have notetags loaded
     */
    _SATB._loadNote = function(notes, datumType, datum_) {
        if (!datum_) return;
        // Storing datumType is to streamline the notetag datum type reading
        var satb = datum_.meta.satb = { datumType: datumType };
        //
        _SATB._readNote.call(
                this, notes, datum_.id, satb, datum_.note.split(/[\r\n]+/));
    }; // _SATB._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.05b
     * @param {[NoteType]} notes - The list of note types of this plugin
     * @param {Index} id - The id of the datum to have its notetags read
     * @param {SATB} satb - The datum plugin notetag container
     * @param {[String]} lines - List of lines being read for notetags to load
     * @todo Breaks this excessively long function into smaller pieces
     */
    _SATB._readNote = function(notes, id, satb, lines) {
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
                _SATB._loadEvalNote.call(
                        this, notes, id, satb, line, noteType, funcLines);
                isEvalLine = false, noteType = "", funcLines = [];
                //
            } else _SATB._loadBaseNote.call(this, notes, id, satb, line);
        }, this);
    }; //  _SATB._readNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.05b
     * @param {[NoteType]} notes - The list of note types of this plugin
     * @param {Index} id - The id of the datum to have its notetags read
     * @param {SATB} satb - The datum plugin notetag container
     * @param {String} line - The line being scanned for notetags to be loaded
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} funcLines - The lines of the notetag function content
     */
    _SATB._loadEvalNote = function(notes, id, satb, line, noteType, funcLines) {
        // Refers to reference tag NOTETAG_MULTI
        if (noteType !== RegExp.$1) return; // It's just to play safe
        /** @todo Considers checking this in the unit test plugin instead */
        if (!notes.contains(noteType)) {
            return _SATB._SHOW_INVALID_NOTE(id, noteType, satb.datumType, line);
        }
        //
        var funcContent = funcLines.join("\n");
        _SATB._loadNotePairs.call(
                this, satb, noteType, ["eval"], [funcContent]);
        DataManager.scanSATBFuncContentForSwitchVars(funcContent, noteType);
        //
    }; //  _SATB._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.05b
     * @param {[NoteType]} notes - The list of note types of this plugin
     * @param {Index} id - The id of the datum to have its notetags read
     * @param {SATB} satb - The datum plugin notetag container
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SATB._loadBaseNote = function(notes, id, satb, line) {
        // Refers to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SATB._REG_EXPS.base)) return;
        var noteType = RegExp.$1;
        /** @todo Considers checking this in the unit test plugin instead */
        if (!notes.contains(noteType)) {
            return _SATB._SHOW_INVALID_NOTE(id, noteType, satb.datumType, line);
        }
        //
        var suffixes =
                RegExp.$2.split(new RegExp(_SATB._REG_EXP_SUFFIX_SEPARATOR));
        var entries =
                RegExp.$3.split(new RegExp(_SATB._REG_EXP_ENTRY_SEPARATOR));
        _SATB._loadNotePairs.call(this, satb, noteType, suffixes, entries);
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
        var regex = _SATB._SWITCH_VAR_REG_EXPS[switchVar];
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
        // Refer to reference tag SWITCH_VAR
        if (_SATB._SWITCH_VARS[suffix]) _SATB._UPDATE_IDS(
                factor, noteType, +entry, _SATB[_SATB._SWITCH_VARS[suffix]]);
        //
    }; // _SATB._updateSwitchVarIds

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._extractSaveContents = function() {
        $gameParty.initSATBNotes();
        $gameSystem.extractSATBFuncContents();
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

    _SATB._REDUCED_AVG_AGI = function(agiSum, mem) { return agiSum + mem.agi; };
    _SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY = function(a, b) {
        return b.latestSATBItem_.speed - a.latestSATBItem_.speed;
    }; // _SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isRefresh: Whether at least 1 battler's refreshed
    //       {Number} avgAgi: The average agi of all battlers in the battle
    //       {+ve Num?} coreBaseFillFrameRate_: The base ATB value fill rate by
    //                                          frames
    //       {+ve Num?} coreBaseFillSecRate_: The base ATB value fill rate by
    //                                        seconds

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
    // v0.00a - v0.04a; Extended
        // Added to keep the input windows opened if there are inputable actors
        if (SATBManager.isEnabled()) return $gameParty.hasSATBInputableActors();
        //
        return _BM.isInputting.apply(this, arguments);
    }; // BattleManager.isInputting

    _BM.canEscape = BattleManager.canEscape;
    _SATB.canEscape = BattleManager.canEscape = function() {
    // v0.00a - v0.00a; Extended
        // Edited to disable party escape command when there's technical limits
        return _BM.canEscape.apply(this, arguments) && this.canSATBEsc();
        //
    }; // BattleManager.canEscape

    _BM.changeActor = BattleManager.changeActor;
    BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    // v0.00a - v0.05b; Extended
        _BM.changeActor.apply(this, arguments);
        // Added to notify that the inputable actor selection might need updates
        SATBManager.procScene_("updateSATBActorSelect");
        //
    }; // BattleManager.changeActor
    _SATB.changeActor = BattleManager.changeActor;

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
    // v0.00a - v0.05b; Extended
        // Added to change the actor from being inputable to being able to act
        if (SATBManager.isEnabled()) return _SATB._selectNextCmd.call(this);
        // This must be placed here or the next inputable actor won't be setup
        _BM.selectNextCommand.apply(this, arguments);
    }; // BattleManager.selectNextCommand

    _BM.selectPreviousCommand = BattleManager.selectPreviousCommand;
    BattleManager.selectPreviousCommand = function() {
    // v0.00a - v0.04a; Extended
        // Added to clear the currently inputable actor pose
        if (SATBManager.isEnabled()) return this.clearActor();
        //
        _BM.selectPreviousCommand.apply(this, arguments);
    }; // BattleManager.selectPreviousCommand
    _SATB.selectPreviousCommand = BattleManager.selectPreviousCommand;

    _BM.refreshStatus = BattleManager.refreshStatus;
    _SATB.refreshStatus = BattleManager.refreshStatus = function() {
    // v0.00a - v0.00a; Extended
        // Added to refresh all cached parameters and input windows as well
        _SATB._refreshStatus.call(this);
        //
        _BM.refreshStatus.apply(this, arguments);
    }; // BattleManager.refreshStatus

    _BM.startTurn = BattleManager.startTurn;
    _SATB.startTurn = BattleManager.startTurn = function() {
    // v0.00a - v0.04a; Extended
        // Edited to abandon the default battle system phase transitions
        if (!SATBManager.isEnabled()) _BM.startTurn.apply(this, arguments);
        //
    }; // BattleManager.startTurn

    _BM.endTurn = BattleManager.endTurn;
    _SATB.endTurn = BattleManager.endTurn = function() {
    // v0.04a - v0.04a; Extended
        // Added to skip the turnEnd phase and increase the turn counter here
        if (SATBManager.isEnabled()) return _SATB._endTurn.call(this);
        //
        _BM.endTurn.apply(this, arguments);
    }; // BattleManager.endTurn

    _BM.endAction = BattleManager.endAction;
    _SATB.endAction = BattleManager.endAction = function() {
    // v0.00a - v0.00a; Extended
        _BM.endAction.apply(this, arguments);
        // Added to update the ATB turn action counter
        _SATB._endAct.call(this);
        //
    }; // endAction

    _BM.endBattle = BattleManager.endBattle;
    _SATB.endBattle = BattleManager.endBattle = function() {
    // v0.05b - v0.05b; Extended
        // Added to close all active input windows and relase all memory as well
        _SATB._endBattle.call(this);
        //
        _BM.endBattle.apply(this, arguments);
    }; // BattleManager.endBattle

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.04a
     * @returns {Boolean} The check result
     * @todo Considers placing this into SATBManager instead
     */
    BattleManager.isSATBBattle = function() {
        return $gameParty.inBattle() && SATBManager.isEnabled();
    }; // BattleManager.isSATBBattle

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    BattleManager.coreBaseSATBFillRate = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return _SATB._coreBaseFillFrameRate.call(this);
            } case "coreBaseFillATBSec": {
                return _SATB._coreBaseFillSecRate.call(this);
            } default: return 0; // So none of the ATB values will ever fill
            // Users should cache values themselves if there's costly computing
        }
    }; // BattleManager.coreBaseSATBFillRate

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.04a
     * @returns {Boolean} The check result
     */
    BattleManager.canSATBEsc = function() {
        // Ensures party escape attempt won't trigger when the battle's busy
        if (!SATBManager.isEnabled()) return true;
        if (!this._spriteset || !this._logWindow || this.isBusy()) return false;
        return this.canUpdateSATB() && !this.isSATBActPhase();
        // It's ok to check $gameMessage.isBusy() twice as it's nullipotent
    }; // BattleManager.canSATBEsc

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canUpdateSATB = function() {
        // Checks if cases always stopping global ATB frame update aren't met
        if ($gameMessage.isBusy()) return false;
        if (_SATB._isBattleStop.call(this)) return false;
        return $gameParty.inBattle() && this._phase !== 'init';
        // It's performant enough to be run multiple times per frame
    }; // BattleManager.canUpdateSATB

    /**
     * Compatibility/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.isSATBActPhase = function() {
        return this._phase === 'action';
    }; // BattleManager.isSATBActPhase

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
     * Hotspot/Nullipotent
     * @interface @since v0.05b @version v0.05b
     * @param {Game_Battler} battler - The battler to have actability checked
     * @returns {Boolean} The check result
     */
    BattleManager.canActSATB = function(battler) {
        return this._actionBattlers.contains(battler);
    }; // BattleManager.canActSATB

    /**
     * This method's sematically idempotent but not technically so
     * Compatibility/Idempotent
     * @interface @since v0.00a @version v0.05b
     * @param {Game_Battler} battler - The battler to become able to exec acts
     */
    BattleManager.addSATBActBattler = function(battler) {
        if (!this.isSATBBattle()) return;
        // No actor should be both inputable and able to execute actions
        if (battler.isActor()) $gameParty.eraseSATBInputableActor(battler);
        //
        // Extracting them into a new method can lead to invalid states
        if (this.canActSATB(battler)) return;
        this._actionBattlers.push(battler);
        _SATB._sortActBattlers.call(this);
        //
    }; // BattleManager.addSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler to become unable to exec acts
     */
    BattleManager.eraseSATBActBattler = function(battler) {
        // _subject shouldn't be in _actionBattlers so it's safe to always erase
        if (this.isSATBBattle()) this._actionBattlers.eraseElem(battler);
        //
    }; // BattleManager.eraseSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.05b
     * @param {[Game_Battler]} battlers - The list of battlers having refreshed
     */
    BattleManager.onSATBBattlerRefresh = function(battlers) {
        // It's possible for this method to be called before calling _SATB._init
        if (this._satb) this._satb.isRefreshNeeded = true;
        //
        if (this._spriteset) this._spriteset.refreshSATBWins(battlers);
    }; // BattleManager.onSATBBattlerRefresh

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - The list of battlers having refreshed
     */
    BattleManager.onSATBBarRefresh = function(battlers) {
        if (this._spriteset) this._spriteset.refreshSATBBars(battlers);
    }; // BattleManager.onSATBBarRefresh

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.updateCoreSATBTurnAct = function() {
        // It must be run per frame
        if (!_SATB._canUpdateSATBAct.call(this)) return;
        //
        // It's useful to forcibly run the ATB frame update to test what happens
        _SATB._updateCoreATBTurnAct.call(this);
        //
    }; // BattleManager.updateCoreSATBTurnAct

    /**
     * The this pointer is BattleManager
     * Compatibility/Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._init = function() {
        SATBTurnManager.init();
        $gameParty.initSATB();
        this._satb = { avgAgi: _SATB._avgAgi.call(this) };
    }; // _SATB._init

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._startBattle = function() {
        if (!SATBManager.isEnabled()) return;
        this._phase = 'turn'; // It means that no battlers are executing actions
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
     * @since v0.00a @version v0.04a
     */
    _SATB._selectNextCmd = function() {
        if (!SATBManager.isEnabled()) return;
        var actor = this.actor();
        if (!actor) return;
        // All battlers always have at most 1 action slot only
        actor.didSATBInput();
        //
        // $gameParty.size() must be used or the actor pose will be all wrong
        this.changeActor($gameParty.size(), 'waiting');
        //
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.05b
     */
    _SATB._refreshStatus = function() {
        _SATB._updateCachedVals.call(this);
        // Not calling refreshStatus is to avoid redundant status win refresh
        SATBManager.procScene_("refreshSATBInputWins");
        //
        this._satb.isRefreshNeeded = false;
    }; // _SATB._refreshStatus

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCachedVals = function() {
        SATBTurnManager.updateCachedVals();
        delete this._satb.coreBaseFillFrameRate_;
        delete this._satb.coreBaseFillSecRate_;
        this._satb.avgAgi = _SATB._avgAgi.call(this);
    }; // _SATB._updateCachedVals

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
     * Potential Hotspot
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
     * Potential Hotspot
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} mem - The member to have his/her/its turn ended
     */
    _SATB._endMemTurn = function(mem) {
        mem.onTurnEnd();
        this._logWindow.displayAutoAffectedStatus(mem);
        this._logWindow.displayRegeneration(mem);
    }; // _SATB._endMemTurn

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.04a
     */
    _SATB._endAct = function() {
        // It's ok to run this even if the turn clock counter isn't action now
        if (SATBManager.isEnabled()) SATBTurnManager.addCoreTurnClockAct(1);
        //
    }; // _SATB._endAct

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    _SATB._endBattle = function() {
        // They can't be placed in Scene_Battle terminate which is too late
        SATBManager.procScene_("closeSATBInputWins");
        this._spriteset.eraseSATBBars(); // Otherwise there will be memory leaks
        //
    }; // _SATB._endBattle

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillFrameRate = function() {
        var SATBM = SATB.SATBManager;
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return 1.0 / $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
            //
        } else if (!SATBM.IS_VALID_RESULT(this._satb.coreBaseFillFrameRate_)) {
            this._satb.coreBaseFillFrameRate_ =
                    1.0 / $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
        }
        return this._satb.coreBaseFillFrameRate_;
    }; // _SATB._coreBaseFillFrameRate

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillSecRate = function() {
        var SATBM = SATB.SATBManager;
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return SceneManager._deltaTime /
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")();
            //
        } else if (!SATBM.IS_VALID_RESULT(this._satb.coreBaseFillSecRate_)) {
            // It's unlikely that the delta time will be changed during battles
            this._satb.coreBaseFillSecRate_ = SceneManager._deltaTime /
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")();
            //
        }
        return this._satb.coreBaseFillSecRate_;
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
            // A battler being able to execute actions should have an action
            var item = battler.latestSATBItem_;
            //
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
     * this.updateEvent() must be called per frame when possible
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._canUpdateSATBAct = function() {
        // Checks if the ATB frame update or action execution can be processed
        if (_SATB._isBattleStop.call(this)) {
            // There's no point in extracting these into a new method.function
            this.update(); // It must be run per frame in those phases
            return false;
            //
        }
        if ($gameMessage.isBusy() || this.updateEvent()) return;
        return this.canUpdateSATB(); // $gameMessage.isBusy() is checked twice
        // These check ordering must be this as some checks have side effects
    }; // _SATB._canUpdateSATBAct

    /**
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._isBattleStop = function() {
        return this.isAborting() || this.isBattleEnd();
    }; // _SATB._isBattleStop

    /**
     * Hotspot
     * @since v0.00a @version v0.05b
     * @todo Extracts the last 2 lines into a method with a meaningful name
     */
    _SATB._updateCoreATBTurnAct = function() {
        // Placing everything in Scene_Battle would result in a worse spaghetti
        if (SATBManager.procScene_("isRunSATBFrameUpdate")) {
            _SATB._updateCoreATBTurn.call(this);
        }
        //
        // Updates current action when finished execution on the current target
        _SATB._updateAct.call(this);
        //
        _SATB._checkIsRefreshNeeded.call(this);
    }; // _SATB._updateCoreATBTurnAct

    /**
     * Hotspot
     * @since v0.02a @version v0.02a
     */
    _SATB._updateCoreATBTurn = function() {
        // So battlers inputting actions automatically can instantly be subjects
        _SATB._addCoreATB.call(this);
        _SATB._procTurn.call(this);
        //
        // It's ok to run this even if the turn clock counter isn't time now
        SATBTurnManager.updateCoreTurnByTime();
        //
    }; // _SATB._updateCoreATBTurn

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._addCoreATB = function() {
        // It's better for the agi logic to stick together than spread out
        var fillRate = this.coreBaseSATBFillRate() / this._satb.avgAgi;
        this.allBattleMembers().forEach(function(mem) {
            mem.fillSATB(fillRate * mem.agi);
        });
        //
    }; // _SATB._addCoreATB

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._procTurn = function() {
        if (this.isSATBActPhase()) return;
        $gameParty.requestMotionRefresh();
        this._subject = this._subject || this.getNextSubject();
        if (this._subject) this.processTurn();
    }; // _SATB._procTurn

    /**
     * The this pointer is BattleManager
     * Compatibility/Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateAct = function() {
        if (_SATB._canUpdateAct.call(this)) this.updateAction();
    }; // _SATB._updateAct

    /**
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._canUpdateAct = function() {
        // this.isSATBActPhase will be changed in the compatibility plugin
        return this._phase === 'action' && !this.isBusy();
        //
    }; // _SATB._canUpdateAct

    /**
     * The this pointer is BattleManager
     * Hotspot/Idempotent
     * @since v0.00a @version v0.05b
     */
    _SATB._checkIsRefreshNeeded = function() {
        if (!this._satb.isRefreshNeeded) return;
        this._satb.isRefreshNeeded = false;
        SATBManager.procScene_("refreshStatus");
    }; // _SATB._checkIsRefreshNeeded

})(DoubleX_RMMV.SATB); // BattleManager

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: SATBTurnManager
 *      - Implements the battle turn clock counter for all turn clock units
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.SATBTurnManager = {};

    // Potential Hotspots
    _SATB._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        this._onCoreTurnClockOverflow("act", clockMax, [{
            clockUnit: "frame",
            clockMax: this.coreTurnFrameClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            clockMax: this.coreTurnSecClockMaxInMs(),
            isInt: false
        }]);
    }; // _SATB._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _SATB._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        this._onCoreTurnClockOverflow("frame", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnActClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            clockMax: this.coreTurnSecClockMaxInMs(),
            isInt: false
        }]);
    }; // _SATB._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _SATB._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        this._onCoreTurnClockOverflow("sec", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnActClockMax(),
            isInt: true
        }, {
            clockUnit: "frame",
            clockMax: this.coreTurnFrameClockMax(),
            isInt: true
        }]);
    }; // _SATB._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC
    //

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Boolean?} _canCoreTurnClockOverflow_: Whether turn clock counter can
    //                                        overflow to next turn
    // {{Number}} _coreTurnClock: Mapping of all turn clock unit counters
    // {Natural Num?} _coreTurnActClockMax_: The turn clock maximum action
    //                                       counter
    // {Natural Num?} _coreTurnFrameClockMax_: The Turn clock maximum frame
    //                                         counter
    // {+ve Num?} _coreTurnSecClockMax_: The Turn clock maximum second
    //                                   counter(in milliseconds)

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
         */
    SATBTurnManager.init = function() {
        this._coreTurnClock = { act: 0, frame: 0, sec: 0.0 };
    }; // SATBTurnManager.init

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Int} The number of actions executed in a turn
     */
    SATBTurnManager.coreTurnActClock = function() {
        return this._coreTurnClock.act;
    }; // SATBTurnManager.coreTurnActClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Int} The number of frames elapsed in a battle turn
     */
    SATBTurnManager.coreTurnFrameClock = function() {
        return this._coreTurnClock.frame;
    }; // SATBTurnManager.coreTurnFrameClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Num} The number of milliseconds elapsed in a turn
     */
    SATBTurnManager.coreTurnSecClockInMs = function() {
        return this._coreTurnClock.sec;
    }; // SATBTurnManager.coreTurnSecClockInMs

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Natural Num} The maximum number of actions a turn can have
     */
    SATBTurnManager.coreTurnActClockMax = function() {
        return SATBManager.funcParam.call(
                this, "coreTurnATBAct", "_coreTurnActClockMax_");
    }; // SATBTurnManager.coreTurnActClockMax

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Natural Num} The maximum number of frames a turn can have
     */
    SATBTurnManager.coreTurnFrameClockMax = function() {
        var SATBM = SATB.SATBManager;
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBFrame")());
            //
        } else if (!SATBM.IS_VALID_RESULT(this._coreTurnFrameClockMax_)) {
            var baseFillFrame =
                    $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
            this._coreTurnFrameClockMax_ =
                    $gameSystem.satbParamFunc("coreTurnATBTime")(baseFillFrame);
        }
        return this._coreTurnFrameClockMax_;
    }; // SATBTurnManager.coreTurnFrameClockMax

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The maximum number of seconds a turn can have
     */
    SATBTurnManager.coreTurnSecClockMaxInMs = function() {
        var SATBM = SATB.SATBManager;
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")()) * 1000.0;
            //
        } else if (!SATBM.IS_VALID_RESULT(this._coreTurnSecClockMax_)) {
            var clockMax = $gameSystem.satbParamFunc("coreTurnATBTime")(
                    $gameSystem.satbParamFunc("coreBaseFillATBSec")()) * 1000.0;
            this._coreTurnSecClockMax_ = clockMax;
        }
        return this._coreTurnSecClockMax_;
    }; // SATBTurnManager.coreTurnSecClockMaxInMs

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @enum @returns {ClockUnit} The battle turn clock counter unit
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    SATBTurnManager.coreTurnClockUnit = function() {
        // They're simple values that are performant enough to be run per frame
        switch ($gameSystem.satbParam("_coreTurnUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreTurnATBTime": return this._coreTurnClockTimeUnit();
            case "coreTurnATBAct": return "act";
            default: return "";
            //
        }
        //
    }; // SATBTurnManager.coreTurnClockUnit

    /**
     * Script Call
     * @interface @since v0.01a @version v0.04a
     * @param {Number} multiplier - Battle turn clock action counter multiplier
     */
    SATBTurnManager.multiplyCoreTurnClockAct = function(multiplier) {
        // The action counter will be corrected to be an integer later
        this.addCoreTurnClockAct(this._coreTurnClock.act * (multiplier - 1));
        //
    }; // SATBTurnManager.multiplyCoreTurnClockAct

    /**
     * Script Call
     * @interface @since v0.01a @version v0.04a
     * @param {Number} multiplier - Battle turn clock frame counter multiplier
     */
    SATBTurnManager.multiplyCoreTurnClockFrame = function(multiplier) {
        // The action counter will be corrected to be an integer later
        var increment = this._coreTurnClock.frame * (multiplier - 1);
        this.addCoreTurnClockFrame(increment);
        //
    }; // SATBTurnManager.multiplyCoreTurnClockFrame

    /**
     * Script Call
     * @interface @since v0.01a @version v0.04a
     * @param {Number} multiplier - Battle turn clock second counter multiplier
     */
    SATBTurnManager.multiplyCoreTurnClockSec = function(multiplier) {
        var increment = this._coreTurnClock.sec * (multiplier - 1);
        this.addCoreTurnClockSecInMs(increment);
    }; // SATBTurnManager.multiplyCoreTurnClockSec

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Int} act - The battle turn clock action counter
     */
    SATBTurnManager.setCoreTurnClockAct = function(act) {
        this.addCoreTurnClockAct(act - this._coreTurnClock.act);
    }; // SATBTurnManager.setCoreTurnClockAct

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Int} frame - The battle turn clock frame counter
     */
    SATBTurnManager.setCoreTurnClockFrame = function(frame) {
        this.addCoreTurnClockFrame(frame - this._coreTurnClock.frame);
    }; // SATBTurnManager.setCoreTurnClockFrame

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} sec - The battle turn clock second counter
     */
    SATBTurnManager.setCoreTurnClockSecInMs = function(sec) {
        this.addCoreTurnClockSecInMs(sec - this._coreTurnClock.sec);
    }; // SATBTurnManager.setCoreTurnClockSecInMs

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Int} increment - The action ATB turn clock increment
     */
    SATBTurnManager.addCoreTurnClockAct = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnActClockMax();
        //
        var overflowFunc = _SATB._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        this._updateCoreTurnClock(
                increment, isInt, "act", clockMax, overflowFunc);
    }; // SATBTurnManager.addCoreTurnClockAct

    /**
     * Script Call/Hotspot
     * @interface @since v0.04a @version v0.04a
     * @param {Int} increment - The frame ATB turn clock increment
     */
    SATBTurnManager.addCoreTurnClockFrame = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnFrameClockMax();
        //
        var overflowFunc = _SATB._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        this._updateCoreTurnClock(
                increment, isInt, "frame", clockMax, overflowFunc);
    }; // SATBTurnManager.addCoreTurnClockFrame

    /**
     * Script Call/Hotspot
     * @interface @since v0.04a @version v0.04a
     * @param {Number} increment - The second ATB turn clock increment
     */
    SATBTurnManager.addCoreTurnClockSecInMs = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = false, clockMax = this.coreTurnSecClockMaxInMs();
        //
        var overflowFunc = _SATB._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        this._updateCoreTurnClock(
                increment, isInt, "sec", clockMax, overflowFunc);
    }; // SATBTurnManager.addCoreTurnClockSecInMs

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    SATBTurnManager.updateCachedVals = function() {
        delete this._canCoreTurnClockOverflow_;
        delete this._coreTurnActClockMax_;
        delete this._coreTurnFrameClockMax_;
        delete this._coreTurnSecClockMax_;
    }; // SATBTurnManager.updateCachedVals

    /**
     * Hotspot
     * @interface @since v0.04a @version v0.04a
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    SATBTurnManager.updateCoreTurnByTime = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": return this.addCoreTurnClockFrame(1);
            case "coreBaseFillATBSec": {
                var incrementMs = 1000.0 * SceneManager._deltaTime;
                return this.addCoreTurnClockSecInMs(incrementMs);
            }
            //
        }
    }; // SATBTurnManager.updateCoreTurnByTime

    /**
     * Hotspot
     * @since v0.04a @version v0.04a
     * @param {Int} increment - The action ATB turn clock increment
     * @param {Boolean} isInt - Whether the ATB turn clock unit is an Integer
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    SATBTurnManager._updateCoreTurnClock = function(increment, isInt, clockUnit, clockMax, overflowFunc) {
        var clock = this._coreTurnClock;
        clock[clockUnit] += increment;
        if (isInt) clock[clockUnit] = Math.floor(clock[clockUnit]);
        if (clock[clockUnit] < clockMax) return;
        this._onMaxCoreTurnClock(clockUnit, clockMax, overflowFunc);
    }; // SATBTurnManager._updateCoreTurnClock

    /**
     * Potential Hotspot
     * @since v0.04a @version v0.05b
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    SATBTurnManager._onMaxCoreTurnClock = function(clockUnit, clockMax, overflowFunc) {
        if (this.coreTurnClockUnit() !== clockUnit) return;
        // It's possible to change ATB turn clock unit during the same battle
        if (this._canCoreTurnClockOverflow()) {
            // The other maximum ATB turn clock units must be calculated here
            overflowFunc.call(this, clockMax);
            //
        } else this.init(); // This class should just handle battle turn clock
        //
        BattleManager.endTurn();
    }; // SATBTurnManager._onMaxCoreTurnClock

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    SATBTurnManager._canCoreTurnClockOverflow = function() {
        return SATBManager.funcParam.call(
                this, "canCoreTurnClockOverflow", "_canCoreTurnClockOverflow_");
    }; // SATBTurnManager._canCoreTurnClockOverflow

    /**
     * Potential Hotspot
     * @since v0.04a @version v0.04a
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {[{String, Number, Boolean}]} otherClockUnitData - Other clock
     *                                                           unit arguments
     */
    SATBTurnManager._onCoreTurnClockOverflow = function(clockUnit, clockMax, otherClockUnitData) {
        this._coreTurnClock[clockUnit] -= clockMax;
        // act and frame are integers but the proportion must be a real Number
        var newProportion = this._coreTurnClock[clockUnit] * 1.0 / clockMax;
        //
        // Prevents memory leaks even though it;s unlikely to be called often
        otherClockUnitData.forEach(function(otherClockUnit) {
            this._setNewCoreTurnClockProportion(newProportion, otherClockUnit);
        }, this);
        //
    }; // SATBTurnManager._onCoreTurnClockOverflow

    /**
     * Potential Hotspot
     * @since v0.04a @version v0.04a
     * @param {Number} newTurnClockProportion - The proportion of the other unit
     * @param {{String, Number, Boolean}} otherClockUnitDatum - Other clock
     *                                                          unit arguments
     */
    SATBTurnManager._setNewCoreTurnClockProportion = function(newTurnClockProportion, otherClockUnitDatum) {
        var clock = this._coreTurnClock, unit = otherClockUnitDatum.clockUnit;
        clock[unit] = otherClockUnitDatum.clockMax * newTurnClockProportion;
        if (unit.isInt) clock[unit] = Math.floor(clock[unit]);
    }; // SATBTurnManager._setNewCoreTurnClockProportion

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.05b @version v0.05b
     * @enum @returns {ClockUnit} The battle turn clock counter unit
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    SATBTurnManager._coreTurnClockTimeUnit = function() {
        // They're simple values that are performant enough to be run per frame
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": return "frame";
            case "coreBaseFillATBSec": return "sec";
            default: return "";
            //
        }
        //
    }; // SATBTurnManager._coreTurnClockTimeUnit

})(DoubleX_RMMV.SATB); // SATBTurnManager

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: SATBManager
 *      - Places all nontrivial business logic that fits into nowhere else
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.SATBManager = {};

    _SATB.IS_VALID_RESULT = function(result) { // v0.04a+; Hotspot
        // Using undefined is most memory efficient and using null's play safe
        return result !== null && result !== undefined;
        //
    }; // _SATB.IS_VALID_RESULT

    _SATB._REFRESH_MEM = function(mem) { mem.refresh(); };

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @enum @param {[Param]} modules - The module parameter names
     * @returns {Boolean} The check result
     */
    SATBManager.areModulesEnabled = function(modules) {
        if (!this.isEnabled()) return false;
        return modules.every(SATBManager._isModuleEnabled, this);
    }; // SATBManager.areModulesEnabled

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    SATBManager.isEnabled = function() {
        // IT CAN'T BE CHANGED DURING THE SAME BATTLE SO NO CACHING'S NEEDED
        return $gameSystem.satbParamFunc("IsCoreEnabled")();
        // It's useful to display ATB action costs outside battles
    }; // SATBManager.isEnabled

    /**
     * The this pointer is the owner of the function parameter value cache
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @enum @param {Param} param - The function parameter name
     * @param {String} cache - The function parameter return value cache name
     * @param {*?} context_ - The parameter function context
     * @param {*?} arg_ - The parameter function argument
     * @returns {*} The returned parameter function content value
     */
    SATBManager.funcParam = function(param, cache, context_, arg_) {
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc(param).call(context_, arg_);
            //
        } else if (!_SATB.IS_VALID_RESULT(this[cache])) {
            this[cache] = $gameSystem.satbParamFunc(param).call(context_, arg_);
        }
        return this[cache];
    }; // SATBManager.funcParam

    /**
     * @interface @since v0.00a @version v0.05b
     * @param {String} func - Name of the function in Scene_Battle to be called
     * @return {*?} The result returned by the Scene_Battle function
     */
    SATBManager.procScene_ = function(func) {
        // It serves as a helper function for calling Scene_Battle functions
        if (BattleManager.isSATBBattle()) return SceneManager._scene[func]();
        //
    }; // SATBManager.procScene_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @param {[Index]} inputableIndices - The inputable actor indices
     * @returns {Boolean} The check result
     */
    SATBManager.canSelectPrevNextActor = function(inputableIndices) {
        // Checking BattleManager.actor() is just to prevent very rare errors
        return BattleManager.actor() && inputableIndices.length > 1;
        // Can't select a new inputable actor when just 1 actor's inputable
    }; // SATBManager.canSelectPrevNextActor

    /**
     * Potential Hotspot/Nulliupotent
     * @interface @since v0.04a @version v0.04a
     * @enum @param {Integer} sign - The selection iteration direction(1/-1)
     * @param {[Index]} inputableIndices - The inputable actor indices
     * @returns {Index} - The index of the new inputable actor to input actions
     */
    SATBManager.newInputableActorIndex = function(sign, inputableIndices) {
        // It's ok to sort this in place as inputableIndices is a new array
        inputableIndices.sort(function(a, b) { return (a - b) * sign; });
        //
        // inputableIndices is supposed to have at least 2 indices
        var selectedIndex = BattleManager.actor().index();
        var i = 0, l = inputableIndices.length;
        while (i < l) { // while is slightly faster than for in general
            var newIndex = inputableIndices[i];
            if (newIndex * sign > selectedIndex * sign) return newIndex;
            i++;
        }
        //
        return inputableIndices[0];
    }; // SATBManager.newInputableActorIndex

    /**
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.04a
     * @enum @param {Param} module - The name of the module parameter function
     * @returns {Boolean} The check result
     */
    SATBManager._isModuleEnabled = function(module) {
        return $gameSystem.satbParamFunc(module)();
    }; // SATBManager._isModuleEnabled

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    SATBManager.invalidateParamCache = function() {
        // It's still performant enough to invalidate all param caches at once
        if (!$gameParty || !$gameParty.inBattle()) return;
        BattleManager.onSATBBattlerRefresh(BattleManager.satbMems());
        //
    }; // SATBManager.invalidateParamCache

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {NoteType} note - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    SATBManager.updateNoteDefault = function(note, switchVar_, id_, dataTypes_) {
        DataManager.storeUpdatedSATBSwitchVarIds(
                note, switchVar_, id_, dataTypes_);
        // Only the default value might change so factor result is raised
        this._raiseSATBMemNoteChangeFactors(note, ["result"]);
        //
    }; // SATBManager.updateNoteDefault

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {NoteType} note - The notetag type
     */
    SATBManager.updateNoteChainingRule = function(note) {
        this._raiseSATBMemNoteChangeFactors(note, ["chainingRule"]);
    }; // SATBManager.updateNoteChainingRule

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {NoteType} note - The notetag type
     */
    SATBManager.updateNotePriorities = function(note) {
        this._raiseSATBMemNoteChangeFactors(note, ["priority"]);
    }; // SATBManager.updateNotePriorities

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    SATBManager.refreshAllSATBMems = function() {
        BattleManager.satbMems().forEach(_SATB._REFRESH_MEM);
    }; // SATBManager.refreshAllSATBMems

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    SATBManager.raiseRefreshedSATBMemChangeFactors = function(noteFactors_) {
        if (noteFactors_) BattleManager.satbMems().forEach(function(mem) {
            mem.raiseSATBChangeFactorsWithRefresh(noteFactors_);
        });
    }; // SATBManager.raiseRefreshedSATBMemChangeFactors

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    SATBManager._raiseSATBMemNoteChangeFactors = function(note, factors) {
        // It's possible for this to be called before having $gameParty
        if ($gameParty) BattleManager.satbMems().forEach(function(mem) {
            mem.raiseSATBNoteChangeFactors(note, factors);
        });
        //
    }; // SATBManager._raiseSATBMemNoteChangeFactors

})(DoubleX_RMMV.SATB); // SATBManager

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
        return val && (val === "true" || val !== "false");
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
    _SATB._PARSED_PARAMS = function(params) { // v0.05b+
        Object.keys(params).forEach(function(param) {
            if (_SATB._BOOL_PARAMS.contains(param)) {
                params[param] = _SATB._BOOL_PARAM(params[param]);
            } else if (_SATB._JSON_PARAMS.contains(param)) {
                params[param] = _SATB._TRY_JSON_PARAM(param, params[param]);
            }
        });
        return params;
    }; // _SATB._PARSED_PARAMS
    _SATB._RAW_PARAMS = function() {
        // There's no need to cache it as _RAW_PARAMS should only be called once
        var fileName = DoubleX_RMMV.Superlative_ATB_Parameters_File;
        var params = PluginManager.parameters(fileName);
        //
        if (Object.keys(params) <= 0) {
            alert("Please check if the name of DoubleX RMMV Superlative ATB" +
                    " Parameters Plugin is " + fileName);
        }
        // The original plugin parameter container should never be edited
        return _SATB._PARSED_PARAMS(JsonEx.makeDeepCopy(params));
        //
    }; // _SATB._RAW_PARAMS
    _SATB._REDUCED_NOTE_CONTAINERS = function(notes, note) { // v0.05a+
        notes[note] = {};
        return notes;
    }; // _SATB._REDUCED_NOTE_CONTAINERS
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
    }; // _SATB._0_ARG_FUNC
    _SATB._BAR_FUNC = function(content) {
        return new Function("bar", "'use strict';\n" + content);
    }; // _SATB._BAR_FUNC
    _SATB._NOTE_FUNC = function(content) { // Potential Hotspot
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", c);
    }; // _SATB._NOTE_FUNC(v0.04a+)
    //

    // The new function argument names must all exactly match with the cfg parts
    _SATB.PARAM_NOTE_FUNCS = {
        params: {
            // Core Module
            IsCoreEnabled: _SATB._0_ARG_FUNC,
            coreBaseFillATBFrame: _SATB._0_ARG_FUNC,
            coreBaseFillATBSec: _SATB._0_ARG_FUNC,
            coreTurnATBTime: function(content) {
                return new Function("baseFillATB", "'use strict';\n" + content);
            }, // coreTurnATBTime
            coreTurnATBAct: _SATB._0_ARG_FUNC,
            canCoreTurnClockOverflow: _SATB._0_ARG_FUNC,
            coreMaxATBVal: _SATB._0_ARG_FUNC,
            //
            // (v0.03a+)Bar Module
            IsBarEnabled: _SATB._0_ARG_FUNC,
            isShowATBBar: _SATB._0_ARG_FUNC,
            atbBarText: _SATB._0_ARG_FUNC,
            atbBarXOffset: _SATB._0_ARG_FUNC,
            atbBarYOffset: _SATB._0_ARG_FUNC,
            atbBarW: _SATB._0_ARG_FUNC,
            atbBarH: _SATB._0_ARG_FUNC,
            atbBarTextSize: _SATB._0_ARG_FUNC,
            atbBarLineH: _SATB._0_ARG_FUNC,
            atbBarTextPadding: _SATB._0_ARG_FUNC,
            atbBarBackOpacity: _SATB._0_ARG_FUNC,
            atbBarTextXOffset: _SATB._0_ARG_FUNC,
            atbBarTextYOffset: _SATB._0_ARG_FUNC,
            atbBarTextColor: _SATB._BAR_FUNC,
            atbBarColor1: _SATB._BAR_FUNC,
            atbBarColor2: _SATB._BAR_FUNC,
            atbBarBackColor: _SATB._BAR_FUNC,
            //
            // (v0.01a+)Hotkey Module
            IsHotkeyEnabled: _SATB._0_ARG_FUNC,
            prevInputableActorKey: _SATB._0_ARG_FUNC,
            nextInputableActorKey: _SATB._0_ARG_FUNC,
            inputableActorKeys: _SATB._0_ARG_FUNC,
            //
            // (v0.02a+)Wait Module
            IsWaitEnabled: _SATB._0_ARG_FUNC,
            isATBWaitCondMet: _SATB._0_ARG_FUNC,
            forceRunATBKey: _SATB._0_ARG_FUNC,
            forceStopATBKey: _SATB._0_ARG_FUNC,
            isShowForceATBStatWin: _SATB._0_ARG_FUNC,
            noForceATBText: _SATB._0_ARG_FUNC,
            forceRunATBStatText: _SATB._0_ARG_FUNC,
            forceStopATBStatText: _SATB._0_ARG_FUNC,
            forceATBStatWinX: _SATB._0_ARG_FUNC,
            forceATBStatWinY: _SATB._0_ARG_FUNC,
            forceATBStatWinW: _SATB._0_ARG_FUNC,
            forceATBStatWinH: _SATB._0_ARG_FUNC,
            forceATBStatTextSize: _SATB._0_ARG_FUNC,
            forceATBStatWinLineH: _SATB._0_ARG_FUNC,
            forceATBStatWinPadding: _SATB._0_ARG_FUNC,
            forceATBStatTextPadding: _SATB._0_ARG_FUNC,
            forceATBStatBackOpacity: _SATB._0_ARG_FUNC,
            forceATBStatTextXOffset: _SATB._0_ARG_FUNC,
            forceATBStatTextYOffset: _SATB._0_ARG_FUNC,
            isShowForceATBRunCmdWin: _SATB._0_ARG_FUNC,
            forceRunATBCmdText: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinX: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinY: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinW: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinH: _SATB._0_ARG_FUNC,
            forceATBRunCmdTextSize: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinLineH: _SATB._0_ARG_FUNC,
            forceATBRunCmdWinPadding: _SATB._0_ARG_FUNC,
            forceATBRunCmdTextPadding: _SATB._0_ARG_FUNC,
            forceATBRunCmdBackOpacity: _SATB._0_ARG_FUNC,
            forceATBRunCmdTextXOffset: _SATB._0_ARG_FUNC,
            forceATBRunCmdTextYOffset: _SATB._0_ARG_FUNC,
            isShowForceATBStopCmdWin: _SATB._0_ARG_FUNC,
            forceStopATBCmdText: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinX: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinY: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinW: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinH: _SATB._0_ARG_FUNC,
            forceATBStopCmdTextSize: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinLineH: _SATB._0_ARG_FUNC,
            forceATBStopCmdWinPadding: _SATB._0_ARG_FUNC,
            forceATBStopCmdTextPadding: _SATB._0_ARG_FUNC,
            forceATBStopCmdBackOpacity: _SATB._0_ARG_FUNC,
            forceATBStopCmdTextXOffset: _SATB._0_ARG_FUNC,
            forceATBStopCmdTextYOffset: _SATB._0_ARG_FUNC,
            //
            // (v0.04a+)Charge Module
            IsChargeEnabled: _SATB._0_ARG_FUNC,
            chargeMaxATBVal: function(content) {
                return new Function("coreMax", "'use strict';\n" + content);
            }, // chargeMaxATBVal
            isPayBeforeExecCharge: _SATB._0_ARG_FUNC,
            cancelChargeATBKeys: _SATB._0_ARG_FUNC,
            forceChargeATBKeys: _SATB._0_ARG_FUNC,
            canCancelCharge: _SATB._0_ARG_FUNC,
            canForceCharge: _SATB._0_ARG_FUNC,
            //
            // (v0.05a+)Cooldown Module
            IsCooldownEnabled: _SATB._0_ARG_FUNC,
            cooldownMaxATBVal: function(content) {
                return new Function("coreMax", "'use strict';\n" + content);
            }, // cooldownMaxATBVal
            cancelCooldownATBKeys: _SATB._0_ARG_FUNC,
            canCancelCooldown: _SATB._0_ARG_FUNC
            //
        }, // params
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(content) { // Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestMax", c);
            },
            coreActState: _SATB._NOTE_FUNC,
            isBarVisible: _SATB._NOTE_FUNC, // v0.04a+
            chargeMax: function(content) { // v0.04a+; Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestChargeMax", c);
            }, // chargeMax
            isPayBeforeExecCharge: _SATB._NOTE_FUNC, // v0.04a+
            canCancelCharge: _SATB._NOTE_FUNC, // v0.04a+
            canForceCharge: _SATB._NOTE_FUNC, // v0.04a+
            cooldownMax: function(content) { // v0.05a+; Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function(
                        "datum", "datumType", "latestCooldownMax", c);
            }, // cooldownMax
            canCancelCooldown: _SATB._NOTE_FUNC // v0.05a+
            //
        } // notes
    }; // _SATB.PARAM_NOTE_FUNCS
    //
    /** @todo Minimizes memory leaks while still minimizing work to add param */
    _SATB._PARAM_UPDATES = {
        // Core Module
        coreBaseFillATBFrame: SATBManager.invalidateParamCache,
        coreBaseFillATBSec: SATBManager.invalidateParamCache,
        coreTurnATBTime: SATBManager.invalidateParamCache,
        coreTurnATBAct: SATBManager.invalidateParamCache,
        canCoreTurnClockOverflow: SATBManager.invalidateParamCache,
        coreMaxATBVal:
                SATBManager.updateNoteDefault.bind(SATBManager, "coreMax"),
        _coreMaxATBValNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "coreMax"),
        _coreMaxATBValNotePriorities:
                SATBManager.updateNotePriorities.bind(SATBManager, "coreMax"),
        _coreActStateNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "coreActState"),
        //
        // (v0.04a+)Bar Module
        isShowATBBar: SATBManager.updateNoteDefault.bind(
                SATBManager, "isBarVisible"),
        _isBarVisibleNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "isBarVisible"),
        _isBarVisibleNotePriorities: SATBManager.updateNotePriorities.bind(
                SATBManager, "isBarVisible"),
        //
        // (v0.04a+)Wait Module
        forceRunATBKey: SATBManager.invalidateParamCache,
        forceStopATBKey: SATBManager.invalidateParamCache,
        isShowForceATBStatWin: SATBManager.invalidateParamCache,
        noForceATBText: SATBManager.invalidateParamCache,
        forceRunATBStatText: SATBManager.invalidateParamCache,
        forceStopATBStatText: SATBManager.invalidateParamCache,
        forceATBStatWinX: SATBManager.invalidateParamCache,
        forceATBStatWinY: SATBManager.invalidateParamCache,
        forceATBStatWinW: SATBManager.invalidateParamCache,
        forceATBStatWinH: SATBManager.invalidateParamCache,
        forceATBStatTextSize: SATBManager.invalidateParamCache,
        forceATBStatWinLineH: SATBManager.invalidateParamCache,
        forceATBStatWinPadding: SATBManager.invalidateParamCache,
        forceATBStatTextPadding: SATBManager.invalidateParamCache,
        forceATBStatBackOpacity: SATBManager.invalidateParamCache,
        forceATBStatTextXOffset: SATBManager.invalidateParamCache,
        forceATBStatTextYOffset: SATBManager.invalidateParamCache,
        isShowForceATBRunCmdWin: SATBManager.invalidateParamCache,
        forceRunATBCmdText: SATBManager.invalidateParamCache,
        forceATBRunCmdWinX: SATBManager.invalidateParamCache,
        forceATBRunCmdWinY: SATBManager.invalidateParamCache,
        forceATBRunCmdWinW: SATBManager.invalidateParamCache,
        forceATBRunCmdWinH: SATBManager.invalidateParamCache,
        forceATBRunCmdTextSize: SATBManager.invalidateParamCache,
        forceATBRunCmdWinLineH: SATBManager.invalidateParamCache,
        forceATBRunCmdWinPadding: SATBManager.invalidateParamCache,
        forceATBRunCmdTextPadding: SATBManager.invalidateParamCache,
        forceATBRunCmdBackOpacity: SATBManager.invalidateParamCache,
        forceATBRunCmdTextXOffset: SATBManager.invalidateParamCache,
        forceATBRunCmdTextYOffset: SATBManager.invalidateParamCache,
        isShowForceATBStopCmdWin: SATBManager.invalidateParamCache,
        forceStopATBCmdText: SATBManager.invalidateParamCache,
        forceATBStopCmdWinX: SATBManager.invalidateParamCache,
        forceATBStopCmdWinY: SATBManager.invalidateParamCache,
        forceATBStopCmdWinW: SATBManager.invalidateParamCache,
        forceATBStopCmdWinH: SATBManager.invalidateParamCache,
        forceATBStopCmdTextSize: SATBManager.invalidateParamCache,
        forceATBStopCmdWinLineH: SATBManager.invalidateParamCache,
        forceATBStopCmdWinPadding: SATBManager.invalidateParamCache,
        forceATBStopCmdTextPadding: SATBManager.invalidateParamCache,
        forceATBStopCmdBackOpacity: SATBManager.invalidateParamCache,
        forceATBStopCmdTextXOffset: SATBManager.invalidateParamCache,
        forceATBStopCmdTextYOffset: SATBManager.invalidateParamCache,
        //
        // (v0.04a+)Charge Module
        chargeMaxATBVal:
                SATBManager.updateNoteDefault.bind(SATBManager, "chargeMax"),
        _chargeMaxATBValNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "chargeMax"),
        _chargeMaxATBValNotePriorities: SATBManager.updateNotePriorities.bind(
                SATBManager, "chargeMax"),
        isPayBeforeExecCharge: SATBManager.updateNoteDefault.bind(
                SATBManager, "isPayBeforeExecCharge"),
        _isPayBeforeExecChargeNoteChainingRule:
                SATBManager.updateNoteChainingRule.bind(
                SATBManager, "isPayBeforeExecCharge"),
        _isPayBeforeExecChargeNotePriorities: SATBManager.updateNotePriorities.
                bind(SATBManager, "isPayBeforeExecCharge"),
        canCancelCharge: SATBManager.updateNoteDefault.bind(
                SATBManager, "canCancelCharge"),
        _canCancelChargeNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "canCancelCharge"),
        _canCancelChargeNotePriorities: SATBManager.updateNotePriorities.
                bind(SATBManager, "canCancelCharge"),
        canForceCharge: SATBManager.updateNoteDefault.bind(
                SATBManager, "canForceCharge"),
        _canForceChargeNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "canForceCharge"),
        _canForceChargeNotePriorities: SATBManager.updateNotePriorities.
                bind(SATBManager, "canForceCharge"),
        //
        // (v0.05a+)Cooldown Module
        cooldownMaxATBVal:
                SATBManager.updateNoteDefault.bind(SATBManager, "cooldownMax"),
        _cooldownMaxATBValNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "cooldownMax"),
        _cooldownMaxATBValNotePriorities: SATBManager.updateNotePriorities.bind(
                SATBManager, "cooldownMax"),
        canCancelCooldown: SATBManager.updateNoteDefault.bind(
                SATBManager, "canCancelCooldown"),
        _canCancelCooldownNoteChainingRule: SATBManager.updateNoteChainingRule.
                bind(SATBManager, "canCancelCooldown"),
        _canCancelCooldownNotePriorities: SATBManager.updateNotePriorities.
                bind(SATBManager, "canCancelCooldown")
        //
    }; // _SATB._PARAM_UPDATES
    //

    _SATB._BOOL_PARAMS = [
        // Core Module
        "_isParamFuncCached",
        "_isNoteCached",
        "_isAlwaysRecacheAllSwitchVars"
        //
    ];
    _SATB._JSON_PARAMS = [
        // Core Module
        "IsCoreEnabled",
        "coreBaseFillATBFrame",
        "coreBaseFillATBSec",
        "coreTurnATBTime",
        "coreTurnATBAct",
        "canCoreTurnClockOverflow",
        "coreMaxATBVal",
        "_coreMaxATBValNotePriorities",
        //
        // (v0.03a+)Bar Module
        "IsBarEnabled",
        "isShowATBBar",
        "atbBarText",
        "atbBarXOffset",
        "atbBarYOffset",
        "atbBarW",
        "atbBarH",
        "atbBarTextSize",
        "atbBarLineH",
        "atbBarTextPadding",
        "atbBarBackOpacity",
        "atbBarTextXOffset",
        "atbBarTextYOffset",
        "atbBarTextColor",
        "atbBarColor1",
        "atbBarColor2",
        "atbBarBackColor",
        "_isBarVisibleNotePriorities", // v0.04a+
        //
        // (v0.01a+)Hotkey Module
        "IsHotkeyEnabled",
        "prevInputableActorKey",
        "nextInputableActorKey",
        "inputableActorKeys",
        //
        // (v0.02a+)Wait Module
        "IsWaitEnabled",
        "isATBWaitCondMet",
        "forceRunATBKey",
        "forceStopATBKey",
        "isShowForceATBStatWin",
        "noForceATBText",
        "forceRunATBStatText",
        "forceStopATBStatText",
        "forceATBStatWinX",
        "forceATBStatWinY",
        "forceATBStatWinW",
        "forceATBStatWinH",
        "forceATBStatTextSize",
        "forceATBStatWinLineH",
        "forceATBStatWinPadding",
        "forceATBStatTextPadding",
        "forceATBStatBackOpacity",
        "forceATBStatTextXOffset",
        "forceATBStatTextYOffset",
        "isShowForceATBRunCmdWin",
        "forceRunATBCmdText",
        "forceATBRunCmdWinX",
        "forceATBRunCmdWinY",
        "forceATBRunCmdWinW",
        "forceATBRunCmdWinH",
        "forceATBRunCmdTextSize",
        "forceATBRunCmdWinLineH",
        "forceATBRunCmdWinPadding",
        "forceATBRunCmdTextPadding",
        "forceATBRunCmdBackOpacity",
        "forceATBRunCmdTextXOffset",
        "forceATBRunCmdTextYOffset",
        "isShowForceATBStopCmdWin",
        "forceStopATBCmdText",
        "forceATBStopCmdWinX",
        "forceATBStopCmdWinY",
        "forceATBStopCmdWinW",
        "forceATBStopCmdWinH",
        "forceATBStopCmdTextSize",
        "forceATBStopCmdWinLineH",
        "forceATBStopCmdWinPadding",
        "forceATBStopCmdTextPadding",
        "forceATBStopCmdBackOpacity",
        "forceATBStopCmdTextXOffset",
        "forceATBStopCmdTextYOffset",
        //
        // (v0.04a+)Charge Module
        "IsChargeEnabled",
        "chargeMaxATBVal",
        "_chargeMaxATBValNotePriorities",
        "isPayBeforeExecCharge",
        "_isPayBeforeExecChargeNotePriorities",
        "cancelChargeATBKeys",
        "forceChargeATBKeys",
        "canCancelCharge",
        "_canCancelChargeNotePriorities",
        "canForceCharge",
        "_canForceChargeNotePriorities",
        //
        // (v0.05a+)Charge Module
        "IsCooldownEnabled",
        "cooldownMaxATBVal",
        "_cooldownMaxATBValNotePriorities",
        "cancelCooldownATBKeys",
        "canCancelCooldown",
        "_canCancelCooldownNotePriorities"
        //
    ]; // _SATB._JSON_PARAMS

    _SATB._CACHED_DEFAULT_NOTE_PARAMS = {
        coreMaxATBVal: "coreMax", // Core Module
        isShowATBBar: "isBarVisible", // (v0.04a+) Bar Module
        // (v0.04a+) Charge Module
        chargeMaxATBVal: "chargeMax",
        isPayBeforeExecCharge: "isPayBeforeExecCharge",
        canCancelCharge: "canCancelCharge",
        canforceCharge: "canforceCharge",
        //
        // (v0.05a+) Cooldown Module
        cooldownMaxATBVal: "cooldownMax",
        canCancelCooldown: "canCancelCooldown"
        //
    }; // _SATB._CACHED_DEFAULT_NOTE_PARAMS
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
        _coreActStateNoteChainingRule: "core",
        // v0.03a+
        IsBarEnabled: "bar",
        isShowATBBar: "bar",
        atbBarText: "bar",
        atbBarXOffset: "bar",
        atbBarYOffset: "bar",
        atbBarW: "bar",
        atbBarH: "bar",
        atbBarTextSize: "bar",
        atbBarLineH: "bar",
        atbBarTextPadding: "bar",
        atbBarBackOpacity: "bar",
        atbBarTextXOffset: "bar",
        atbBarTextYOffset: "bar",
        atbBarTextColor: "bar",
        atbBarColor1: "bar",
        atbBarColor2: "bar",
        atbBarBackColor: "bar",
        _isBarVisibleNoteChainingRule: "bar", // v0.04a+
        _isBarVisibleNotePriorities: "bar", // v0.04a+
        //
        // v0.01a+
        IsHotkeyEnabled: "hotkey",
        prevInputableActorKey: "hotkey",
        nextInputableActorKey: "hotkey",
        inputableActorKeys: "hotkey",
        //
        // v0.02a+
        IsWaitEnabled: "wait",
        isATBWaitCondMet: "wait",
        forceRunATBKey: "wait",
        forceStopATBKey: "wait",
        isShowForceATBStatWin: "wait",
        noForceATBText: "wait",
        forceRunATBStatText: "wait",
        forceStopATBStatText: "wait",
        forceATBStatWinX: "wait",
        forceATBStatWinY: "wait",
        forceATBStatWinW: "wait",
        forceATBStatWinH: "wait",
        forceATBStatTextSize: "wait",
        forceATBStatWinLineH: "wait",
        forceATBStatWinPadding: "wait",
        forceATBStatTextPadding: "wait",
        forceATBStatBackOpacity: "wait",
        forceATBStatTextXOffset: "wait",
        forceATBStatTextYOffset: "wait",
        isShowForceATBRunCmdWin: "wait",
        forceRunATBCmdText: "wait",
        forceATBRunCmdWinX: "wait",
        forceATBRunCmdWinY: "wait",
        forceATBRunCmdWinW: "wait",
        forceATBRunCmdWinH: "wait",
        forceATBRunCmdTextSize: "wait",
        forceATBRunCmdWinLineH: "wait",
        forceATBRunCmdWinPadding: "wait",
        forceATBRunCmdTextPadding: "wait",
        forceATBRunCmdBackOpacity: "wait",
        forceATBRunCmdTextXOffset: "wait",
        forceATBRunCmdTextYOffset: "wait",
        isShowForceATBStopCmdWin: "wait",
        forceStopATBCmdText: "wait",
        forceATBStopCmdWinX: "wait",
        forceATBStopCmdWinY: "wait",
        forceATBStopCmdWinW: "wait",
        forceATBStopCmdWinH: "wait",
        forceATBStopCmdTextSize: "wait",
        forceATBStopCmdWinLineH: "wait",
        forceATBStopCmdWinPadding: "wait",
        forceATBStopCmdTextPadding: "wait",
        forceATBStopCmdBackOpacity: "wait",
        forceATBStopCmdTextXOffset: "wait",
        forceATBStopCmdTextYOffset: "wait",
        //
        // (v0.04a+)Charge Module
        IsChargeEnabled: "charge",
        chargeMaxATBVal: "charge",
        _chargeMaxATBValNoteChainingRule: "charge",
        _chargeMaxATBValNotePriorities: "charge",
        isPayBeforeExecCharge: "charge",
        _isPayBeforeExecChargeNoteChainingRule: "charge",
        _isPayBeforeExecChargeNotePriorities: "charge",
        cancelChargeATBKeys: "charge",
        forceChargeATBKeys: "charge",
        canCancelCharge: "charge",
        _canCancelChargeNoteChainingRule: "charge",
        _canCancelChargeNotePriorities: "charge",
        canForceCharge: "charge",
        _canForceChargeNoteChainingRule: "charge",
        _canForceChargeNotePriorities: "charge",
        //
        // (v0.05a+)Cooldown Module
        IsCooldownEnabled: "cooldown",
        cooldownMaxATBVal: "cooldown",
        _cooldownMaxATBValNoteChainingRule: "cooldown",
        _cooldownMaxATBValNotePriorities: "cooldown",
        cancelCooldownATBKeys: "cooldown",
        canCancelCooldown: "cooldown",
        _canCancelCooldownNoteChainingRule: "cooldown",
        _canCancelCooldownNotePriorities: "cooldown"
        //
    }; // _SATB._PARAM_MODULES
    //

    /*------------------------------------------------------------------------
     *    New private variables
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
     * @interface @since v0.00a @version v0.04a
     */
    $.extractSATBFuncContents = function() {
        Object.keys(this._satb.params).forEach(
                _SATB._extractParamFuncContents, this);
        Object.keys(this._satb.notes).forEach(
                _SATB._extractNoteFuncContents, this);
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
     * @since v0.00a @version v0.04a
     */
    _SATB._initContainers = function() {
        this._satb = {
            params: Object.keys(SATB.params).reduce(
                    _SATB._REDUCED_NOTE_CONTAINERS, {}),
            notes: Object.keys(_SATB.PARAM_NOTE_FUNCS.notes).reduce(
                    _SATB._REDUCED_NOTE_CONTAINERS, {}),
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
        // Not binding _storeParam is to minimize memory leaks
        Object.keys(params).forEach(function(param) {
            _SATB._storeParam.call(this, params, param);
        }, this);
        //
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
        // Not binding _storeNote is to minimize memoey leaks
        Object.keys(SATB.notes[type]).forEach(function(name) {
            _SATB._storeNote.call(this, type, name);
        }, this);
        //
    }; // _SATB._storeNoteModule

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
            // Not binding func is to minimize memory leaks
            Object.keys(paramNote).forEach(function(name) {
                _SATB[func].call(this, module, name);
            }, this);
            //
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
        var note = _SATB._CACHED_DEFAULT_NOTE_PARAMS[param];
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
        /** @todo Considers separating these back into those 2 classes */
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
        //

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.04a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMemChangeFactors = function(id) {
            // Parameters not depending on battlers can still use switch/vars
            SATBManager.invalidateParamCache();
            //
            if ($gameSystem.satbParam("_isAlwaysRecacheAllSwitchVars")) {
                // refresh raises these factors and also instantly update values
                return SATBManager.refreshAllSATBMems();
                //
            }
            _SATB._raiseMappedMemChangeFactors.call(this, id);
        }; // _SATB._raiseMemChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.04a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMappedMemChangeFactors = function(id) {
            var noteFactors_ = DM[switchVarIds][id];
            // Such changes should instantly update values depending on these
            SATBManager.raiseRefreshedSATBMemChangeFactors(noteFactors_);
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
        // Added to check if the battler becomes in the auto input mode
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
    // v0.00a - v0.04a; Extended
        // Added to update state turns with removal timings as turn
        if (SATBManager.isEnabled()) return this.updateSATBStateTurns(2);
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
        // Not binding _updateStateTurn is to minimize memory leaks
        this.states().forEach(function(state) {
            _SATB._updateStateTurn.call(this, timing, state);
        }, this);
        //
    }; // $.updateSATBStateTurns

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.eraseCoreSATBActs = function() {
        this.setSATBActTimes(0);
        this.clearCoreSATB();
    }; // $.eraseCoreSATBActs

    /**
     * It's practically idempotent but not theoretically so
     * @interface @since v0.00a @version v0.05b
     */
    $.onToggleAutoInputSATBActs = function() {
        // Otherwise confused battler attacking self can cooldown without item
        if (BattleManager._subject === this) return;
        /** @todo Replace this with a more fathomable, proper and safe fix */
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
     * @since v0.00a @version v0.04a
     */
    _SATB._refresh = function() {
        BattleManager.onSATBBattlerRefresh([this]);
        // Refers to reference tag BATTLER_REFRESH_RECACHE_NOTE
        this._satb.notes.raiseMarkedChangeFactors();
        // This should be run outside battle as well to update instantly
        // It's just to play safe as it might clear or make actions unexpectedly
        if (SATBManager.isEnabled()) _SATB._updateCachedVals.call(this);
        //
    }; // _SATB._refresh

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._updateCachedVals = function() {
        // It must be placed here or checkUpdatedMaxes would use wrong max val
        delete this._satb.cachedBaseCoreMax_;
        //
        // It must be placed here or checkUpdatedMaxes would use wrong max val
        delete this._satb.cachedBaseChargeMax_;
        //
        // It must be placed here or checkUpdatedMaxes would use wrong max val
        delete this._satb.cachedBaseCooldownMax_;
        //
        // It's possible to change maximum ATB value without ATB frame updates
        this._satb.phaseTypes.checkUpdatedMaxes();
        //
    }; // _SATB._updateCachedVals

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @param {Boolean} wasAutoBattle - Whether battler was auto battle
     * @param {Boolean} wasRestricted - Whether the battler was restricted
     */
    _SATB._checkIsToggleAutoInput = function(wasAutoBattle, wasRestricted) {
        if (!BattleManager.isSATBBattle()) return;
        if (_SATB._isToggleAutoInput.call(this, wasAutoBattle, wasRestricted)) {
            this.onToggleAutoInputSATBActs();
        }
    }; // _SATB._checkIsToggleAutoInput

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Boolean} wasAutoBattle - Whether battler was auto battle
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
    var SATBM = SATB.SATBManager;

    // All these functions are battler script calls
    _SATB.NOTE_FORWARDED_FUNCS = {
        satbNoteResult_: "result_", // It's not shown in the doc as it's too raw
        raiseAllSATBNoteChangeFactors: "raiseAllChangeFactors",
        raiseSATBNoteChangeFactors: "raiseChangeFactors",
        invalidateSATBNoteResult: "invalidateResultCache",
        invalidateSATBNoteList: "invalidatePairFuncListCache"
    }; // _SATB.NOTE_FORWARDED_FUNCS
    _SATB.PHASE_TYPE_FORWARDED_FUNCS = {
        // These aren't shown in the documentation plugin as they're rarely used
        setCurSATB: "setCurATB",
        setCurSATBProportion: "setCurATBProportion",
        addCurSATB: "addCurATB",
        addCurSATBProportion: "addCurATBProportion",
        multiplyCurSATB: "multiplyCurATB",
        fillUpCurSATB: "fillUpCurATB",
        //
        setCoreSATB: "setCoreATB",
        setCoreSATBProportion: "setCoreATBProportion",
        addCoreSATB: "addCoreATB",
        addCoreSATBProportion: "addCoreATBProportion",
        multiplyCoreSATB: "multiplyCoreATB",
        fillUpCoreSATB: "fillUpCoreATB",
        setChargeSATB: "setChargeATB",
        setChargeSATBProportion: "setChargeATBProportion",
        addChargeSATB: "addChargeATB",
        addChargeSATBProportion: "addChargeATBProportion",
        multiplyChargeSATB: "multiplyChargeATB",
        fillUpChargeSATB: "fillUpChargeATB",
        setCooldownSATB: "setCooldownATB",
        setCooldownSATBProportion: "setCooldownATBProportion",
        addCooldownSATB: "addCooldownATB",
        addCooldownSATBProportion: "addCooldownATBProportion",
        multiplyCooldownSATB: "multiplyCooldownATB",
        fillUpCooldownSATB: "fillUpCooldownATB",
        clearCoreSATB: "clearCoreATB",
        clearChargeSATB: "clearChargeATB",
        // These aren't shown in the documentation plugin as they're rarely used
        curSATB: "curATB",
        curMaxSATB: "curMax",
        //
        coreSATB: "coreATB",
        chargeSATB: "chargeATB",
        cooldownSATB: "cooldownATB",
        curSATBProportion: "curATBProportion",
        coreSATBProportion: "coreATBProportion",
        chargeSATBProportion: "chargeATBProportion",
        cooldownSATBProportion: "cooldownATBProportion",
        isSATBFill: "isFill",
        isSATBCharge: "isCharge",
        isSATBCooldown: "isCooldown",
        onCancelSATBCharge: "onCancelCharge",
        onCancelSATBCooldown: "onCancelCooldown",
        onStartForceSATBCharge: "onStartForceCharge",
        onEndForceSATBCharge: "onEndForceCharge"
    }; // _SATB.PHASE_TYPE_FORWARDED_FUNCS
    //

    /*------------------------------------------------------------------------
     *    New public variables
     *------------------------------------------------------------------------*/
    // {{Number, Skill|Item}?} latestSATBItem_: The latest inputted skill/item

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isBecomeNotActable: Whether the battler becomes bot act
    //       {Game_SATBNotes} notes: The notetag results
    //       {Game_SATBPhaseTypes} phaseTypes: All ATB phase/state manipulations
    //       {Non-ve Int} actTimes: The virtual number of action slots
    //       {+ve Num?} cachedBaseCoreMax_: The cached coreMaxATBVal value
    //       {+ve Num?} cachedBaseChargeMax_: The cached chargeMaxATBVal value
    //       {+ve Num?} cachedBaseCooldownMax_: Cached cooldownMaxATBVal value

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
        if (this.isStateAddable(stateId) && !this.isStateAffected(stateId)) {
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
        this.onBecomeNotSATBActable();
        //
    }; // $.clearActions

    _GB.onRestrict = $.onRestrict;
    _SATB.onRestrict = $.onRestrict = function() { // v0.00a - v0.00a; Extended
        _GB.onRestrict.apply(this, arguments);
        // Added to fix null action battlers bugs and edge cases as well
        _SATB._onRestrict.call(this);
        // This should be placed here as clearActions should be called first
    }; // $.onRestrict

    _GB.makeActionTimes = $.makeActionTimes;
    _SATB.makeActionTimes = $.makeActionTimes = function() {
    // v0.00a - v0.04a; Extended
        // Added to simplify the action input and execution logic
        if (SATBManager.isEnabled()) return 1;
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

    _GB.useItem = $.useItem;
    _SATB.useItem = $.useItem = function(item) { // v0.04a - v0.04a; Extended
        // Added to pay the skill/item cost if it's not paid upon input already
        if (_SATB._isPayBeforeExecCharge.call(this)) return;
        //
        _GB.useItem.apply(this, arguments);
    }; // $.useItem

    _GB.onAllActionsEnd = $.onAllActionsEnd;
    _SATB.onAllActionsEnd = $.onAllActionsEnd = function() {
    // v0.00a - v0.00a; Extended
        // Added to update state turn in actions and clear ATB value as well
        this.onAllSATBActsEnd(this);
        // This must be placed here or removeStatesAuto will miss expired states
        _GB.onAllActionsEnd.apply(this, arguments);
    }; // $.onAllActionsEnd

    _GB.onTurnEnd = $.onTurnEnd;
    _SATB.onTurnEnd = $.onTurnEnd = function() { // v0.00a - v0.00a; Extended
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
        this.clearCoreSATBActs();
        //
    }; // $.onBattleEnd

    /**
     * Idempotent
     * @abstract @interface @since v0.00a @version v0.00a
     */
    $.setPreemptStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setPreemptStartSATB

    /**
     * Idempotent
     * @abstract @interface @since v0.00a @version v0.00a
     */
    $.setSurpriseStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setSurpriseStartSATB

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
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The maximum ATB value of this battler
     */
    $.coreMaxSATB = function() { return this.satbNoteResult_("coreMax"); };

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The maximum charge ATB value of this battler
     */
    $.chargeMaxSATB = function() { return this.satbNoteResult_("chargeMax"); };

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {+ve Num} The maximum cooldown ATB value of this battler
     */
    $.cooldownMaxSATB = function() {
        return this.satbNoteResult_("cooldownMax");
    }; // $.cooldownMaxSATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    $.canCancelChargeSATB = function() {
        return this.satbNoteResult_("canCancelCharge");
    }; // $.canCancelChargeSATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Boolean} The check result
     */
    $.canCancelCooldownSATB = function() {
        return this.satbNoteResult_("canCancelCooldown");
    }; // $.canCancelCooldownSATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    $.canForceChargeSATB = function() {
        return this.satbNoteResult_("canForceCharge");
    }; // $.canForceChargeSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.05b
     * @returns {+ve Num} Base maximum ATB value of the battler involved
     */
    $.baseCoreMaxSATB = function() {
        // Game_SATBPhaseTypes doesn't handle max ATB so it should stay here
        return SATBManager.funcParam.call(
                this._satb, "coreMaxATBVal", "cachedBaseCoreMax_", this);
        //
    }; // $.baseCoreMaxSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} Base Maximum ATB charge value of battler involved
     */
    $.baseChargeMaxSATB = function() {
        // Game_SATBPhaseTypes doesn't handle max ATB so it should stay here
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("chargeMaxATBVal").call(
                    this, this.coreMaxSATB());
            //
        } else if (!SATBM.IS_VALID_RESULT(this._satb.cachedBaseChargeMax_)) {
            this._satb.cachedBaseChargeMax_ = $gameSystem.satbParamFunc(
                    "chargeMaxATBVal").call(this, this.coreMaxSATB());
        }
        return this._satb.cachedBaseChargeMax_;
        //
    }; // $.baseChargeMaxSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {+ve Num} Base Maximum ATB cooldown value of battler involved
     */
    $.baseCooldownMaxSATB = function() {
        // Game_SATBPhaseTypes doesn't handle max ATB so it should stay here
        if (!$gameSystem.satbParam("_isParamFuncCached")) {
            // It must be called here or it'd defeat the purpose of the cache
            return $gameSystem.satbParamFunc("cooldownMaxATBVal").call(
                    this, this.coreMaxSATB());
            //
        } else if (!SATBM.IS_VALID_RESULT(this._satb.cachedBaseCooldownMax_)) {
            this._satb.cachedBaseCooldownMax_ = $gameSystem.satbParamFunc(
                    "cooldownMaxATBVal").call(this, this.coreMaxSATB());
        }
        return this._satb.cachedBaseCooldownMax_;
        //
    }; // $.baseCooldownMaxSATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The current number of virtual action slot
     */
    $.satbActTimes = function() { return this._satb.actTimes; };

    /**
     * Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $.canMakeSATBCmds = function() { return this.satbActTimes() > 0; };

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    $.isSATBChargeItem = function() {
        return _SATB._isItemNote.call(this, ["IsChargeEnabled"], [
            "chargeMax",
            "isPayBeforeExecCharge",
            "canCancelCharge",
            "canForceCharge"
        ]);
    }; // $.isSATBChargeItem

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Boolean} The check result
     */
    $.isSATBCooldownItem = function() {
        return _SATB._isItemNote.call(this, ["IsCooldownEnabled"], [
            "cooldownMax",
            "canCancelCooldown"
        ]);
    }; // $.isSATBCooldownItem

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.04a
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    $.raiseSATBChangeFactorsWithRefresh = function(noteFactors) {
        // It must be here as refresh must be instantly followed by mark changes
        Object.keys(noteFactors).forEach(function(note) {
            // There's no need to extract these codes into a new method
            this._satb.notes.markNoteChangeFactors(note, noteFactors[note]);
            //
        }, this);
        //
        this.refresh();
    }; // $.raiseSATBChangeFactorsWithRefresh

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() {
        this._satb.notes = new Game_SATBNotes(this);
        this._satb.phaseTypes = new Game_SATBPhaseTypes(this);
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks as it's the battler as a dependency
        ["notes", "phaseTypes"].forEach(_SATB._clearSATBHelper, this);
        //
    }; // $.clearSATBNotes

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
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $.fillSATB = function(fillRate) {
        if (this.canMove()) return this._satb.phaseTypes.fillATB(fillRate);
        // Unmovable battlers still need to show the right maximum ATB value
        this._satb.phaseTypes.checkUpdatedMaxes(); // It's just to play safe
        //
    }; // $.fillSATB

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.didSATBInput = function() {
        _SATB._updateActStateTurns.call(this);
        this.latestSATBItem_ = _SATB._latestItem_.call(this);
        if (_SATB._isPayBeforeExecCharge.call(this)) {
            _GB.useItem.call(this, this.latestSATBItem_.item);
        }
        this._satb.phaseTypes.onStartCharge();
        this.refresh(); // To detect ATB phase changes
    }; // $.didSATBInput

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.04a
     */
    $.onBecomeSATBActable = function() {
        BattleManager.addSATBActBattler(this);
    }; // $.onBecomeSATBActable

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.05b
     */
    $.onBecomeNotSATBActable = function() {
        // Otherwise inifinite recursion due to calling refresh can occur
        if (this._satb.isBecomeNotActable) return;
        this._satb.isBecomeNotActable = true;
        _SATB._onBecomeNotActable.call(this);
        this._satb.isBecomeNotActable = false;
        //
    }; // $.onBecomeNotSATBActable

    /**
     * @interface @since v0.00a @version v0.05b
     */
    $.onAllSATBActsEnd = function() {
        if (!SATBManager.isEnabled()) return;
        this.updateSATBStateTurns(1);
        // The ordering must be this or latestSATBItem_ would be deleted
        this._satb.phaseTypes.onStartCooldown();
        this.eraseVirtualSATBActSlot();
        this.refresh(); // To detect ATB phase changes
        // onStartCooldown should be run before running onBecomeNotSATBActable
    }; // $.onAllSATBActsEnd

    /**
     * @interface @since v0.05a @version v0.05a
     */
    $.eraseVirtualSATBActSlot = function() {
        if (!SATBManager.isEnabled()) return;
        this.addSATBActTimes(-1);
        if (!this.canMakeSATBCmds()) return this.clearCoreSATB();
        this._satb.phaseTypes.addSmallestCoreSATBDecrement();
    }; // $.eraseVirtualSATBActSlot

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.clearCoreSATBActs = function() {
        this.setSATBActTimes(0);
        // This will reset the current ATB values and phases for all types
        this._satb.phaseTypes.initialize(this);
        //
        this.refresh(); // To detect possible ATB phase changes
    }; // $.clearCoreSATBActs

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} atbVal - The new current ATB value of this battler
     */
    $.initCoreSATBActs = function(atbVal) {
        // The ordering must be this or the virtual action slots would be gone
        this.setSATBActTimes(0);
        this.setCoreSATB(atbVal);
        //
    }; // $.initCoreSATBActs

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Nonnegative Int} increment - The virtual action slot increment
     */
    $.addSATBActTimes = function(increment) {
        this.setSATBActTimes(this.satbActTimes() + increment);
    }; // $.addSATBActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Nonnegative Int} multiplier - The virtual action slot multipler
     */
    $.multiplySATBActTimes = function(multiplier) {
        this.setSATBActTimes(this.satbActTimes() * multiplier);
    }; // $.multiplySATBActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.05b
     * @param {Nonnegative Int} actTimes - The new number of virtual action slot
     */
    $.setSATBActTimes = function(actTimes) {
        var oldActTimes = this.satbActTimes();
        // It doesn't make sense to have negative virtual action slots
        this._satb.actTimes = Math.max(actTimes, 0);
        //
        var hadActs = oldActTimes > 0, hasActs = actTimes > 0;
        // It's to ensure that the ATB value will become full
        if (!hadActs && hasActs) return this.fillUpCoreSATB();
        //
        if (!hadActs || hasActs) return;
        // It's to ensure that the ATB value will become not full
        this._satb.phaseTypes.addSmallestCoreSATBDecrement();
        //
    }; // $.setSATBActTimes

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.onStartSATBFill = function() {
        this._satb.phaseTypes.onStartFill();
        delete this.latestSATBItem_;
        this.refresh(); // To detect ATB phase changes
    }; // $.onStartSATBFill

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        // The master container must be ready first before adding anything else
        this._satb = { actTimes: 0 };
        this.initSATBNotes();
        //
    }; // _SATB._init

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     * @enum @param {String} helper - notes/phaseTypes
     */
    _SATB._clearSATBHelper = function(helper) {
        this._satb[helper].clear();
        delete this._satb[helper];
    }; // _SATB._clearSATBHelper

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.05b
     */
    _SATB._onRestrict = function() {
        // Otherwise confused battler attacking self can cooldown without item
        if (BattleManager._subject === this) return;
        /** @todo Replace this with a more fathomable, proper and safe fix */
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
        if (this.canMakeSATBCmds()) return;
        this.setSATBActTimes(_GB.makeActionTimes.apply(this, arguments));
        // It's not idempotent as makeActionTimes are random by default
    }; // _SATB._makeActs

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._onTurnEnd = function() {
        if (SATBManager.isEnabled()) this.removeBuffsAuto();
    }; // _SATB._onTurnEnd

    /**
     * The this pointer is Game_Battler.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._updateActStateTurns = function() {
        this.states().forEach(_SATB._updateActStateTurn, this);
    }; // _SATB._updateActStateTurns

    /**
     * The this pointer is Game_Battler.prototype
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
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     * @returns {{Int, Datum}?} The latest inputted skill/item of the battler
     */
    _SATB._latestItem_ = function() {
        var currentAct = this.currentAction();
        if (!currentAct) return undefined;
        var item = currentAct.item();
        return item ? { speed: item.speed, item: item } : undefined;
    }; // _SATB._latestItem_

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    _SATB._isPayBeforeExecCharge = function() {
        return _SATB._isItemNote.call(this, ["IsChargeEnabled"], [
            "isPayBeforeExecCharge"
        ]);
    }; // _SATB._isPayBeforeExecCharge

    /**
     * The this pointer is Game_Battler.prototype
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.04a
     * @param {[Module]} modules - The list of modules that need to be enabled
     * @param {[NoteType]} notes - The list of notes needing any to be present
     * @returns {Boolean} The check result
     */
    _SATB._isItemNote = function(modules, notes) {
        if (!SATBManager.areModulesEnabled(modules)) return false;
        if (!this.latestSATBItem_) return false;
        return this._satb.notes.hasAnyNote(notes, this.latestSATBItem_.item);
    }; // _SATB._isItemNote

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    _SATB._onBecomeNotActable = function() {
        BattleManager.eraseSATBActBattler(this);
        this._satb.phaseTypes.onEndCharge();
        this.refresh(); // To detect actability/inputability/ATB phase changes
    }; // _SATB._onBecomeNotActable

})(DoubleX_RMMV.SATB); // Game_Battler.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Implements the ATB value, input and action logic detail for actors
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Actor = { orig: {}, new: {} };
    var _GA = SATB.Game_Actor.orig, _SATB = SATB.Game_Actor.new;
    var $ = Game_Actor.prototype, $$ = Game_Battler.prototype;

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
            this.didSATBInput();
            //
        }; // $[func]
        //
    });

    _GA.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GA.makeActions.apply(this, arguments);
        // Added to mark that this battler becomes inputable as well
        $gameParty.addSATBInputableActor(this);
        // This must be placed here or clearActions make the actor not inputable
    }; // $.makeActions

    _GA.clearActions = $.clearActions;
    _SATB.clearActions = $.clearActions = function() {
     // v0.00a - v0.00a; Extended
        _GA.clearActions.apply(this, arguments);
        // Added to ensures the actor won't be able to input actions
        $gameParty.eraseSATBInputableActor(this);
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
     * Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.didSATBInput = function() {
        $gameParty.eraseSATBInputableActor(this);
        $$.didSATBInput.call(this);
    }; // $.didSATBInput

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
        this.didSATBInput();
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

    _SATB._ATBS = function() { // v0.04a+
        return _SATB._PHASES.reduce(_SATB._REDUCED_ATB_CONTAINER, {});
    }; // _SATB._ATBS
    _SATB._REDUCED_ATB_CONTAINER = function(container, phase) { // v0.04a+
        container[phase] = 0;
        return container;
    }; // _SATB._REDUCED_ATB_CONTAINER

    // v0.04a+
    _SATB._FORCE_CHARGE = "force", _SATB._FORCE_ACT = "act";
    _SATB._PHASE_NORM = "norm";
    _SATB._PHASE_CHARGE = "charge", _SATB._PHASE_COOLDOWN = "cooldown";
    _SATB._PHASES = [
        _SATB._PHASE_NORM,
        _SATB._PHASE_CHARGE,
        _SATB._PHASE_COOLDOWN
    ]; // _SATB._PHASES
    //
    // Refer to reference tag SMALLEST_ATB_VAL_INCREMENT
    _SATB._SMALLEST_ATB_VAL_INCREMENT = Math.pow(2, -32);
    // Using Number.EPSILON would be too dangerous here

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // (v0.04a+){ForceChargeState}_forceChargeState: Whether the action's forced
    //                                               to charge or execute
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // (v0.04a+){Number} _forcedChargeBeyondMax: The amount of forced charge ATB
    //                                           beyond the maximum
    // (v0.04a+){{Number}} _atbs: The current ATB value of the battler of all
    //                            phases
    // (v0.04a+){{Number}} _lastATBs: The last current ATB value of the battler
    //                                of all phases
    // (v0.04a+){{Number}} _lastMaxes: The last maximum ATB value of the battler
    // (v0.04a+){ATBPhase} _phase: The current ATB phase

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.04a
     * @param {Game_Battler} battler - The battler with effective notetag list
     */
    $.initialize = function(battler) {
        this._battler = battler, this._phase = _SATB._PHASE_NORM;
        // They must use separate containers to catch their supposed differences
        this._atbs = _SATB._ATBS(), this._lastATBs = _SATB._ATBS();
        //
        this._forcedChargeBeyondMax = 0, this._lastMaxes = {};
        this._lastMaxes[_SATB._PHASE_NORM] = battler.coreMaxSATB();
        this._lastMaxes[_SATB._PHASE_CHARGE] = battler.chargeMaxSATB();
        this._lastMaxes[_SATB._PHASE_COOLDOWN] = battler.cooldownMaxSATB();
        // The latest item should be deleted as well to avoid invalid states
        delete battler.latestSATBItem_;
        //
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.00a @version v0.04a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        //
    }; // $.clear

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Number} The current ATB value of the battler
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $.curATB = function() {
        switch (this._phase) {
            case _SATB._PHASE_NORM: return this.coreATB();
            case _SATB._PHASE_CHARGE: return this.chargeATB();
            case _SATB._PHASE_COOLDOWN: return this.cooldownATB();
        }
    }; // $.curATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.04a
     * @returns {Number} The current ATB value of the battler
     */
    $.coreATB = function() { return this._atbs[_SATB._PHASE_NORM]; };

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Number} The current charge ATB value of the battler
     */
    $.chargeATB = function() {
        // Refer to reference tag MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM
        if (!this._forceChargeState) return this._atbs[_SATB._PHASE_CHARGE];
        //
        var beyondMaxCharge = Math.max(this._forcedChargeBeyondMax, 0);
        return this._atbs[_SATB._PHASE_CHARGE] + beyondMaxCharge;
    }; // $.chargeATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Number} The current cooldown ATB value of the battler
     * @todo Erases this performance tradeoff while still keeping the class nice
     */
    $.cooldownATB = function() {
        // The cooldown fill direction's opposite to normal and charge ATB
        var max = this._battler.cooldownMaxSATB();
        return max - this._atbs[_SATB._PHASE_COOLDOWN];
        // Reversing here's to simplify the cooldown logic in everywhere else
    }; // $.cooldownATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The current maximum ATB value of the battler
     */
    $.curMax = function() { return this._maxATB(this._phase); };

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The current ATB fill proportion of the battler
     */
    $.curATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        return this.curATB() * 1.0 / this.curMax();
        //
    }; // $.curATBProportion

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.04a
     * @returns {+ve Num} The ATB fill proportion of the battler
     */
    $.coreATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        return this.coreATB() * 1.0 / this._battler.coreMaxSATB();
        //
    }; // $.coreATBProportion

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @returns {+ve Num} The charge ATB fill proportion of the battler
     */
    $.chargeATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        return this.chargeATB() * 1.0 / this._battler.chargeMaxSATB();
        //
    }; // $.chargeATBProportion

    /**
     * Script Call/Idempotent
     * @interface @since v0.05a @version v0.05a
     * @returns {+ve Num} The cooldown ATB fill proportion of the battler
     */
    $.cooldownATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        return this.cooldownATB() * 1.0 / this._battler.cooldownMaxSATB();
        //
    }; // $.cooldownATBProportion

    /**
     * Script Call/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Boolean} The check result
     */
    $.isFill = function() { return this._phase === _SATB._PHASE_NORM; };

    /**
     * Script Call/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    $.isCharge = function() { return this._phase === _SATB._PHASE_CHARGE; };

    /**
     * Script Call/Nullipotent
     * @interface @since v0.05a @version v0.05a
     * @returns {Boolean} The check result
     */
    $.isCooldown = function() { return this._phase === _SATB._PHASE_COOLDOWN; };

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addCurATBProportion = function(increment) {
        this.addCurATB(increment * this.curMax());
    }; // $.addCurATBProportion

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addCurATB = function(increment) {
        this.setCurATB(this.curATB() + increment);
    }; // $.addCurATB

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} multiplier - Multiplier of current ATB value of battler
     */
    $.multiplyCurATB = function(multiplier) {
        this.setCurATB(this.curATB() * multiplier);
    }; // $.multiplyCurATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.fillUpCurATB = function() { this.setCurATB(this.curMax()); };

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setCurATBProportion = function(proportion) {
        this.setCurATB(proportion * this.curMax());
    }; // $.setCurATBProportion

    /**
     * Script Call
     * @interface @since v0.00a @version v0.04a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addCoreATBProportion = function(increment) {
        this.addCoreATB(increment * this._battler.coreMaxSATB());
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
     * Script Call
     * @interface @since v0.00a @version v0.00a
     * @param {Number} multiplier - Multiplier of current ATB value of battler
     */
    $.multiplyCoreATB = function(multiplier) {
        this.setCoreATB(this.coreATB() * multiplier);
    }; // $.multiplyCoreATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.04a
     */
    $.fillUpCoreATB = function() {
        this.setCoreATB(this._battler.coreMaxSATB());
    }; // $.fillUpCoreATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.04a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setCoreATBProportion = function(proportion) {
        this.setCoreATB(proportion * this._battler.coreMaxSATB());
    }; // $.setCoreATBProportion

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addChargeATBProportion = function(increment) {
        this.addChargeATB(increment * this._battler.chargeMaxSATB());
    }; // $.addChargeATBProportion

    /**
     * Script Call/Hotspot
     * @interface @since v0.04a @version v0.04a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addChargeATB = function(increment) {
        this.setChargeATB(this.chargeATB() + increment);
    }; // $.addChargeATB

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} multiplier - Multiplier of current ATB value of battler
     */
    $.multiplyChargeATB = function(multiplier) {
        this.setChargeATB(this.chargeATB() * multiplier);
    }; // $.multiplyChargeATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.fillUpChargeATB = function() {
        this.setChargeATB(this._battler.chargeMaxSATB());
    }; // $.fillUpChargeATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setChargeATBProportion = function(proportion) {
        this.setChargeATB(proportion * this._battler.chargeMaxSATB());
    }; // $.setChargeATBProportion

    /**
     * Script Call
     * @interface @since v0.05a @version v0.05a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addCooldownATBProportion = function(increment) {
        this.addCooldownATB(increment * this._battler.cooldownMaxSATB());
    }; // $.addCooldownATBProportion

    /**
     * Script Call/Hotspot
     * @interface @since v0.05a @version v0.05a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addCooldownATB = function(increment) {
        this.setCooldownATB(this.cooldownATB() + increment);
    }; // $.addCooldownATB

    /**
     * Script Call
     * @interface @since v0.05a @version v0.05a
     * @param {Number} multiplier - Multiplier of current ATB value of battler
     */
    $.multiplyCooldownATB = function(multiplier) {
        this.setCooldownATB(this.cooldownATB() * multiplier);
    }; // $.multiplyCooldownATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.05a @version v0.05a
     */
    $.fillUpCooldownATB = function() {
        this.setCooldownATB(this._battler.cooldownMaxSATB());
    }; // $.fillUpCooldownATB

    /**
     * Script Call/Idempotent
     * @interface @since v0.05a @version v0.05a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setCooldownATBProportion = function(proportion) {
        this.setCooldownATB(proportion * this._battler.cooldownMaxSATB());
    }; // $.setCooldownATBProportion

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.05b
     */
    $.clearCoreATB = function() { if (this.coreATB() > 0) this.setCoreATB(0); };

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.clearChargeATB = function() { this.addSmallestCoreSATBDecrement(); };

    /**
     * Script Call/Idempotent
     * @interface @since v0.04a @version v0.05a
     * @param {Number} val - The new current ATB value of the battler
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $.setCurATB = function(val) {
        switch (this._phase) {
            case _SATB._PHASE_NORM: return this.setCoreATB(val);
            case _SATB._PHASE_CHARGE: return this.setChargeATB(val);
            case _SATB._PHASE_COOLDOWN: return this.setCooldownATB(val);
        }
    }; // $.setCurATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.04a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setCoreATB = function(val) { this._setATB(val, _SATB._PHASE_NORM); };

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.04a @version v0.05b
     * @param {Number} val - The new current charge ATB value of the battler
     */
    $.setChargeATB = function(val) {
        // A valid ATB charge must have a valid skill/item to be charged
        if (!this._battler.latestSATBItem_ || !this.isCharge()) return;
        //
        // Refer to reference tag NEGATIVE_CHARGE_ATB_VAL_CANCEL_CHARGE
        if (val < 0) return this.clearChargeATB();
        //
        this._setATB(val, _SATB._PHASE_CHARGE);
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) return;
        this._forcedChargeBeyondMax = val - this._battler.chargeMaxSATB();
    }; // $.setChargeATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.05a @version v0.05b
     * @param {Number} val - The new current cooldown ATB value of the battler
     * @todo Erases this performance tradeoff while still keeping the class nice
     */
    $.setCooldownATB = function(val) {
        // A valid ATB cooldown must have a valid skill/item to be cooled down
        if (!this._battler.latestSATBItem_ || !this.isCooldown()) return;
        //
        // The cooldown fill direction's opposite to normal and charge ATB
        var reversedVal = this._battler.cooldownMaxSATB() - val;
        this._setATB(reversedVal, _SATB._PHASE_COOLDOWN);
        // Reversing here's to simplify the cooldown logic in everywhere else
    }; // $.setCooldownATB

    /**
     * Hotspot
     * @interface @since v0.04a @version v0.04a
     * @param {Number} fillRate - The increment of current ATB value proportion
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $.fillATB = function(fillRate) {
        switch (this._phase) {
            case _SATB._PHASE_NORM: return this._fillCoreATB(fillRate);
            case _SATB._PHASE_CHARGE: return this._fillChargeATB(fillRate);
            case _SATB._PHASE_COOLDOWN: return this._fillCooldownATB(fillRate);
        }
    }; // $.fillATB

    /**
     * This method's practically idempotent but not theoretically so
     * @interface @since v0.00a @version v0.04a
     */
    $.addSmallestCoreSATBDecrement = function() {
        // Otherwise the increment would be too small for huge max ATB values
        var addMultiplier = Math.min(this._battler.coreMaxSATB(), 1);
        // It's derived from extensive testing
        this.addCoreATB(-_SATB._SMALLEST_ATB_VAL_INCREMENT * addMultiplier);
    }; // $.addSmallestCoreSATBDecrement

    /**
     * Hotspot/Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.checkUpdatedMaxes = function() {
        // The norm phase must be checked first as it might clear ATB values
        this._checkUpdatedMax(
                this.coreATB(), _SATB._PHASE_NORM, this._battler.coreMaxSATB());
        //
        if (this.isFill()) return;
        var phase = this._phase;
        // The raw current ATB value must be used or cooldown wouldn't work
        this._checkUpdatedMax(
                this._atbs[phase], phase, this._battler.curMaxSATB());
        //
    }; // $.checkUpdatedMaxes

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.onStartCharge = function() {
        if (!this.isFill()) return; // A charge can't start without normal ATB
        // The ordering must be this or setChargeATB won't work due to _phase
        this._phase = _SATB._PHASE_CHARGE;
        this._resetForceChargeStates();
        this.setChargeATB(0);
        //
    }; // $.onStartCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.onEndCharge = function() {
        // Not setting it as 0 would lead to infinite loops that's hard to break
        this.setChargeATB(this._lastATBs[_SATB._PHASE_CHARGE] = 0);
        // _onChargeATBBecomeNotFull shouldn't be called again anyway
        this._resetForceChargeStates(); // It's just to play safe
        // Otherwise the ATB cooldown would be immediately cancelled wrongly
        if (this.isCharge()) this._battler.onStartSATBFill();
        // The ordering must be this or setChargeATB won't work due to _phase
    }; // $.onEndCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancelCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this.isCharge() || !this._battler.canCancelChargeSATB()) return;
        this.clearChargeATB();
    }; // $.onCancelCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.onStartForceCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this.isCharge() || !this._battler.canForceChargeSATB()) return;
        SoundManager.playOk();
        this._forcedChargeBeyondMax = 0;
        this._forceChargeState = _SATB._FORCE_CHARGE;
    }; // $.onStartForceCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    $.onEndForceCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        // They ensures disabling forcing during force won't make invalid states
        if (!this.isCharge()) return;
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) return;
        //
        SoundManager.playOk();
        // Refer to reference tag MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM
        if (this._battler.canForceChargeSATB()) {
            this._forceChargeState = _SATB._FORCE_ACT;
        } else {
            this._forceChargeState = "";
        }
        //
        this._battler.onBecomeSATBActable();
    }; // $.onEndForceCharge

    /**
     * Idempotent
     * @interface @since v0.05a @version v0.05a
     */
    $.onStartCooldown = function() {
        if (!this.isCharge()) return; // A cooldown can't start without charge
        // The ordering must be this or setChargeATB won't work due to _phase
        this._phase = _SATB._PHASE_COOLDOWN;
        this.setCooldownATB(this._battler.cooldownMaxSATB());
        //
    }; // $.onStartCooldown

    /**
     * Idempotent
     * @interface @since v0.05a @version v0.05a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancelCooldown = function() {
        if (!SATBManager.areModulesEnabled(["IsCooldownEnabled"])) return;
        if (this.isCooldown() && this._battler.canCancelCooldownSATB()) {
            this._onCooldownATBBecomeFull();
        }
    }; // $.onCancelCooldown

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.onStartFill = function() { this._phase = _SATB._PHASE_NORM; };

    /**
     * Hotspot
     * @since v0.00a @version v0.04a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $._fillCoreATB = function(fillRate) {
        this.addCoreATB(this._fillRate(fillRate));
    }; // $._fillCoreATB

    /**
     * Hotspot
     * @since v0.04a @version v0.04a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $._fillChargeATB = function(fillRate) {
        // Refer to reference tag NON_CHARGING_SKILL_ITEM_INSTANT_CHARGE
        if (!this._battler.isSATBChargeItem()) return this.fillUpChargeATB();
        //
        if (this._forceChargeState === _SATB._FORCE_ACT) return;
        this.addChargeATB(this._fillRate(fillRate));
    }; // $._fillChargeATB

    /**
     * Hotspot
     * @since v0.05a @version v0.05a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $._fillCooldownATB = function(fillRate) {
        // Refer to reference tag NON_COOLDOWN_SKILL_ITEM_INSTANT_COOLDOWN
        if (!this._battler.isSATBCooldownItem()) return this.setCooldownATB(0);
        //
        this.addCooldownATB(-this._fillRate(fillRate));
    }; // $._fillCooldownATB

    /**
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.04a
     * @param {Number} fillRate - The increment of current ATB value proportion
     */
    $._fillRate = function(fillRate) {
        // The base max should be used or changing max won't change fill rate
        return fillRate * this._battler.baseCoreMaxSATB();
        //
    }; // $._fillRate

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.05b
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     */
    $._setATB = function(val, phase) {
        // A valid max must be +ve and updating max will check max anyway
        var max = this._lastMaxes[phase] || this._maxATB(phase);
        //
        if (this._isAlreadyMaxATB(val, phase, max)) return;
        // It must be here or checkUpdatedMaxes would use wrong _atbs val
        this._atbs[phase] = Math.min(val, max);
        // _atbs must be capped by maxATB here to maximize performance gain
        this._checkUpdatedMax(val, phase, max);
        // It must be here or checkUpdatedMaxes would use wrong _lastATBs
        this._lastATBs[phase] = this._atbs[phase];
        //
    }; // $._setATB

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     */
    $._isAlreadyMaxATB = function(val, phase, max) {
        /** @todo Makes sure it's always correct even when it's tested so */
        if (val < max) return false;
        return this._atbs[phase] === max && this._lastATBs[phase] === max;
        //
    }; // $._isAlreadyMaxATB

    /**
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.05a
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @returns {+ve Num} The maximum ATB value of the specified phase
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._maxATB = function(phase) {
        switch (phase) {
            case _SATB._PHASE_NORM: return this._battler.coreMaxSATB();
            case _SATB._PHASE_CHARGE: return this._battler.chargeMaxSATB();
            case _SATB._PHASE_COOLDOWN: return this._battler.cooldownMaxSATB();
            // It's impossible to fallback into any sensible default
            default: throw new Error(phase + " isn't a valid ATB phase!");
            //
        }
    }; // $._maxATB

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.05b
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     */
    $._checkUpdatedMax = function(val, phase, max) {
        // It must be placed here or refreshBar would miss _onATBBecomeFull
        this._checkIsBecomeFullNotFull(val, phase, max);
        //
        this._lastMaxes[phase] = max;
        // It's the only place covering all cases changing current/max ATB value
        BattleManager.onSATBBarRefresh([this._battler]);
        //
    }; // $._checkUpdatedMax

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     */
    $._checkIsBecomeFullNotFull = function(val, phase, max) {
        var isFull = max <= val;
        var wasFull = this._lastMaxes[phase] <= this._lastATBs[phase];
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        if (!wasFull && isFull) return this._onATBBecomeFull(phase, max);
        // And DECREASED_MAX_CHARGE_ATB_ACTABLE
        // Refers to reference tag INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
        if (wasFull && !isFull) this._onATBBecomeNotFull(phase);
        // And INCREASED_MAX_CHARGE_ATB_NOT_ACTABLE
    }; // $._checkIsBecomeFullNotFull

    /**
     * Idempotent
     * @since v0.04a @version v0.05a
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._onATBBecomeFull = function(phase, max) {
        this._lastATBs[phase] = this._atbs[phase] = max;
        switch (phase) {
            case _SATB._PHASE_NORM: return this._onCoreATBBecomeFull();
            case _SATB._PHASE_CHARGE: return this._onChargeATBBecomeFull();
            // The cooldown ATB used in the reverse direction so full = empty
            case _SATB._PHASE_COOLDOWN: return this._onCooldownATBBecomeFull();
            //
        }
    }; // $._onATBBecomeFull

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    $._onCoreATBBecomeFull = function() {
        // It's okay for unmovable battlers to have full atb which will be reset
        if (this._battler.canMove()) this._battler.makeActions();
        //
    }; // $._onCoreATBBecomeFull

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    $._onChargeATBBecomeFull = function() {
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) {
            return this._battler.onBecomeSATBActable();
        }
        // It's to prevent errors from force charge state without Charge Module
        if (SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        //
        this._battler.onBecomeSATBActable();
    }; // $._onChargeATBBecomeFull

    /**
     * Idempotent
     * @since v0.05a @version v0.05a
     */
    $._onCooldownATBBecomeFull = function() {
        // The cooldown ATB used in the reverse direction so full = empty
        this.setCooldownATB(0);
        this._battler.onStartSATBFill();
        // The ordering must be this or setCooldownATB won't work due to _phase
    }; // $._onCooldownATBBecomeFull

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     * @param {ATBPhase} phase - The phase of the current ATB value that changed
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._onATBBecomeNotFull = function(phase) {
        switch (phase) {
            // There's nothing meaningful to happen for cooldown become not full
            case _SATB._PHASE_NORM: return this._onCoreATBBecomeNotFull();
            case _SATB._PHASE_CHARGE: return this._onChargeATBBecomeNotFull();
            //
        }
    }; // $._onATBBecomeNotFull

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    $._onCoreATBBecomeNotFull = function() { this._battler.clearActions(); };

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    $._onChargeATBBecomeNotFull = function() {
        this._forcedChargeBeyondMax = 0; // It's just to play safe
        BattleManager.eraseSATBActBattler(this._battler);
    }; // $._onChargeATBBecomeNotFull

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    $._resetForceChargeStates = function() {
        this._forcedChargeBeyondMax = 0, this._forceChargeState = "";
    }; // $._resetForceChargeStates

})(DoubleX_RMMV.SATB); // Game_SATBPhaseTypes.prototype

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBNotes.prototype, _SATB = SATB.Game_SATBNotes = {};
    var SATBM = SATB.SATBManager;

    // The suffix of the names of funcions with and without the cache enabled
    _SATB._FUNC_WITH_CACHE = "WithCache";
    _SATB._FUNC_WITHOUT_CACHE = "WithoutCache";
    //

    /*------------------------------------------------------------------------
     *    New private variables
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
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @param {[NoteType]} notes - List of notes to have its existence checked
     * @param {Datum?} datum_ - The datum having the notetag existence checked
     * @returns {Boolean} The check result
     */
    $.hasAnyNote = function(notes, datum_) {
        return notes.some(function(note) {
            return this._pairs.pairFuncs(note, datum_).length > 0;
        }, this);
    }; // $.hasAnyNote

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     * @todo Investigates the minor but still nontrivial memory leaks
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
        // Binding _pairs.run_ here can cause very severe memory leaks
        this._rules.chainedRunList(list, note).forEach(function(pairFunc) {
            this._pairs.run_(argObj_, note, pairFunc);
        }, this);
        //
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
        if (SATBM.IS_VALID_RESULT(cache_)) return cache_;
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
        return this._rules.chainedAssociativeResult_(
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
        //
        // SATBM.IS_VALID_RESULT doesn't use the original array
        return priorities.mapFilter(function(part) {
            return this[funcName](note, argObj_, part);
        }, SATBM.IS_VALID_RESULT, this);
        // Prevents memory leaks by not binding this[funcName]
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
        if (SATBM.IS_VALID_RESULT(cache_)) return cache_;
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
        if (list.length <= 0) return undefined; // An invalid result
        // The result of the 1st pairFunc must be the initial result of the list
        var initVal_ = this._pairs.run_(argObj_, note, list.shift());
        return this._rules.chainedPartResult_(list, note, argObj_, initVal_);
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
        return this._rules.chainedNonAssociativeResult_(
                list, note, argObj_, defaultResult);
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
        var funcName = "_pairFuncListPart" + funcNameSuffix, self = this;
        return this._rules.priorities(note).reduce(function(list, part) {
            // fastMerge is much faster than concat and works with large arrays
            return list.fastMerge(self[funcName](note, part, argObj_));
            //
        }, []);
        // Prevents memory leaks by not extracting the reduce function
    }; // $._uncachedPairFuncList

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
        var pairs = this._pairs, partListData =
                this._cache.partListData(part, this._battler, argObj_);
        // The reduce callback function doesn't use the original array
        return partListData.reduce(function(list, datum_) {
            // fastMerge is much faster than concat and works with large arrays
            return list.fastMerge(pairs.pairFuncs(note, datum_));
            //
        }, []);
        // Prevents memory leaks by not extracting the reduce function
    }; // $._pairFuncListPartWithoutCache

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
            var item_ = battler.latestSATBItem_;
            return item_ ? [item_.item] : [];
        }, // latestSkillItem
        // They're not used anyway but including them here's just to play safe
        priority: function() { return []; },
        chainingRule: function() { return []; },
        result: function() { return []; }
        //
    }; // _SATB._FACTOR_DATA
    //

    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = Object.keys(SATB.Game_System.new.PARAM_NOTE_FUNCS.notes);
    //

    /*------------------------------------------------------------------------
     *    New private variables
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
        // Binding _raiseChangeFactor might have nontrivial memory leaks
        factors.forEach(function(factor) {
            this._raiseChangeFactor(note, factor);
        }, this);
        //
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
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {DatumType} part - Note part to have its effective list updated
     * @param {[PairFunc]} partList List of functions of  notetags involved
     */
    $.updatePairFuncListPart = function(note, part, partList) {
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][part] = partList;
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
        this._cachedLists[note] = list;
        //
    }; // $.updatePairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {Factor} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        // Binding _markNoteChangeFactor might have nontrivial memory leaks
        _SATB._NOTES.forEach(function(note) {
            this._markNoteChangeFactor(factor, note);
        }, this);
        //
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
     * @enum @returns {[Factor]} The note change factors to be raised
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

    _SATB._IS_VALID_PAIR = function(note, pair_) { // Potential Hotspot
        if (!pair_) return false;
        return pair_.entry1 && _SATB._IS_VALID_SUFFIX(note, pair_.suffix1);
    }; // _SATB._IS_VALID_PAIR
    _SATB._IS_VALID_SUFFIX = function(note, suffix) { // Potential Hotspot
        return _SATB._NOTE_TYPES[note].suffixes.contains(suffix);
    }; // _SATB._IS_VALID_SUFFIX
    _SATB._NOTE_FUNC = function(battler, func, datum) { // v0.04a+
        return func.call(battler, datum, datum.meta.satb.datumType);
    }; // _SATB._NOTE_FUNC
    _SATB._PAIR_FUNC = function(note, datum, pair) { // Potential Hotspot
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
    _SATB._STRING_TO_NUM = function(r) { return +r; }; // Potential Hotspot

    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = { // Potential Hotspot
        // Core Module
        coreMax: function() { return this._battler.baseCoreMaxSATB(); },
        //
        isBarVisible: function() { // (v0.04a+)Bar Module
            return $gameSystem.satbParamFunc("isShowATBBar").call(
                    this._battler);
        }, // isBarVisible
        // (v0.04a+)Charge Module
        chargeMax: function() { return this._battler.baseChargeMaxSATB(); },
        isPayBeforeExecCharge: function() {
            return $gameSystem.satbParamFunc("isPayBeforeExecCharge").call(
                    this._battler);
        }, // isPayBeforeExecCharge
        canCancelCharge: function() {
            return $gameSystem.satbParamFunc("canCancelCharge").call(
                    this._battler);
        }, // canCancelCharge
        canForceCharge: function() {
            return $gameSystem.satbParamFunc("canForceCharge").call(
                    this._battler);
        }, // canForceCharge
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: function() {
            return this._battler.baseCooldownMaxSATB();
        }, // cooldownMax
        canCancelCooldown: function() {
            return $gameSystem.satbParamFunc("canCancelCooldown").call(
                    this._battler);
        }
        //
    }; // _SATB._DEFAULT_RESULTS
    //
    // The last argument must be the latest chained notetag value result
    _SATB._NOTE_ARG_OBJS = { // Hotspot
        // Core Module
        coreMax: function(battler, func, datum, argObj_, latestMax) {
            var datumType = datum.meta.satb.datumType;
            return func.call(battler, datum, datumType, latestMax);
        }, // coreMax
        coreActState: _SATB._NOTE_FUNC,
        //
        isBarVisible: _SATB._NOTE_FUNC, // (v0.04a+)Bar Module
        // (v0.04a+)Charge Module
        chargeMax: function(battler, func, datum, argObj_, latestChargeMax) {
            var datumType = datum.meta.satb.datumType;
            return func.call(battler, datum, datumType, latestChargeMax);
        }, // chargeMax
        isPayBeforeExecCharge: _SATB._NOTE_FUNC,
        canCancelCharge: _SATB._NOTE_FUNC,
        canForceCharge: _SATB._NOTE_FUNC,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: function(battler, func, datum, argObj_, latestCooldownMax) {
            var datumType = datum.meta.satb.datumType;
            return func.call(battler, datum, datumType, latestCooldownMax);
        }, // cooldownMax
        canCancelCooldown: _SATB._NOTE_FUNC
        //
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
            // Binding f to ongoing contexts might have nontrivial memory leaks
            return f ? f.bind(undefined, entry) : function() { return entry; };
            //
        }, // val
        switch: function(noteType, resultType, entry) {
            // Binding value might have nontrivial memory leaks
            return function() { return $gameSwitches.value(+entry); };
            //
        }, // switch
        event: function(noteType, resultType, entry) {
            // Binding reserveCommonEvent might have nontrivial memory leaks
            return function() { return $gameTemp.reserveCommonEvent(+entry); };
            //
        }, // event
        var: function(noteType, resultType, entry) {
            // Binding value might have nontrivial memory leaks
            return function() { return $gameVariables.value(+entry); };
            //
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
        // Core Module
        coreMax: _SATB._NUM_RESULT_NOTES,
        coreActState: _SATB._BOOL_RESULT_NOTES,
        //
        isBarVisible: _SATB._BOOL_RESULT_NOTES, // (v0.04a+)Bar Module
        // (v0.04a+)Charge Module
        chargeMax: _SATB._NUM_RESULT_NOTES,
        isPayBeforeExecCharge: _SATB._BOOL_RESULT_NOTES,
        canCancelCharge: _SATB._BOOL_RESULT_NOTES,
        canForceCharge: _SATB._BOOL_RESULT_NOTES,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: _SATB._NUM_RESULT_NOTES,
        canCancelCooldown: _SATB._BOOL_RESULT_NOTES
        //
    }; // _SATB._NOTE_TYPES
    //

    /*------------------------------------------------------------------------
     *    New private variables
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
        var func = _SATB._DEFAULT_RESULTS[note];
        // Not all notetags have default values
        return func ? func.call(this, argObj_) : undefined;
        //
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
        // Binding it to an ongoing context might have nontrivial memory leaks
        var isValidPairFunc = _SATB._IS_VALID_PAIR.bind(undefined, note);
        //
        // It's not pure due to the cfg, switch, event, var and script suffixes
        return pairs.filterMap(isValidPairFunc, function(pair) {
            return _SATB._PAIR_FUNC(note, datum_, pair);
        }, undefined, this);
        // Binding _PAIR_FUNC might have nontrivial memory leaks
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
        var unboundFunc = pairFunc.unboundFunc;
        // Using _NOTE_ARG_OBJS on the wrong suffix will have the wrong context
        if (!pairFunc.canBind) return unboundFunc();
        //
        // Binding unboundFunc here would cause very severe memory leaks
        return _SATB._NOTE_ARG_OBJS[note](this._battler, unboundFunc,
                pairFunc.datum, argObj_, latestChainedResult_);
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
    var SATBM = SATB.SATBManager;

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

    _SATB._CONCAT_EVERY_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        if (result.length <= 0) return result;
        var runResult_ = this._pairs.run_(argObj_, note, pairFunc, result);
        return runResult_ ? _SATB._CONCAT_EVERY_VAL_RESULT_FUNC(
                note, argObj_, result, runResult_) : [];
    }; // _SATB._CONCAT_EVERY_RESULT_FUNC
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
    _SATB._IS_UNIQ_ELEM = function(elem, i, self) {
        // These array elements should be Javascript literals
        return self.indexOf(elem) === i;
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
            if (ks.contains(key) && result[key] === valResult[key]) return;
            delete result[key];
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
            // Binding func directly would break the shared constant functions
            var self = this, f = function(result, pairFunc) {
                return func.call(self, note, argObj_, result, pairFunc);
            };
            // Prevents possibly nontrivial memory leaks by making f this way
            if (SATBM.IS_VALID_RESULT(initVal_)) {
                return list.reduce(f, initVal_);
            }
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
        // Core Module
        coreMax: function() {
            return $gameSystem.satbParam("_coreMaxATBValNotePriorities");
        }, // coreMax
        coreActState: function() { return ["thisState"]; },
        //
        isBarVisible: function() { // (v0.04a+)Bar Module
            return $gameSystem.satbParam("_isBarVisibleNotePriorities");
        }, // isBarVisible
        // (v0.04a+)Charge Module
        chargeMax: function() {
            return $gameSystem.satbParam("_chargeMaxATBValNotePriorities");
        }, // chargeMax
        isPayBeforeExecCharge: function() {
            return $gameSystem.satbParam(
                    "_isPayBeforeExecChargeNotePriorities");
        }, // isPayBeforeExecCharge
        canCancelCharge: function() {
            return $gameSystem.satbParam("_canCancelChargeNotePriorities");
        }, // canCancelCharge
        canForceCharge: function() {
            return $gameSystem.satbParam("_canForceChargeNotePriorities");
        }, // canForceCharge
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: function() {
            return $gameSystem.satbParam("_cooldownMaxATBValNotePriorities");
        }, // cooldownMax
        canCancelCooldown: function() {
            return $gameSystem.satbParam("_canCancelCooldownNotePriorities");
        }
        //
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

    // (v0.04a+)Whether the note will use the default value if there are notetag
    _SATB._IS_NOTE_USE_DEFAULT = {
        // Core Module
        coreMax: true,
        coreActState: false, // It's just to play safe even if it's no default
        //
        // Bar Module
        isBarVisible: false,
        //
        // Charge Module
        chargeMax: true,
        isPayBeforeExecCharge: false,
        canCancelCharge: false,
        canForceCharge: false,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: true,
        canCancelCooldown: false
        //
    }; // _SATB._IS_NOTE_USE_DEFAULT
    //
    _SATB._NOTE_CHAINING_RULES = {
        // Core Module
        coreMax: "_coreMaxATBValNoteChainingRule",
        coreActState: "_coreActStateNoteChainingRule",
        //
        isBarVisible: "_isBarVisibleNoteChainingRule", // (v0.04a+)Bar Module
        // (v0.04a+)Charge Module
        chargeMax: "_chargeMaxATBValNoteChainingRule",
        isPayBeforeExecCharge: "_isPayBeforeExecChargeNoteChainingRule",
        canCancelCharge: "_canCancelChargeNoteChainingRule",
        canForceCharge: "_canForceChargeNoteChainingRule",
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: "_cooldownMaxATBValNoteChainingRule",
        canCancelCooldown: "_canCancelCooldownNoteChainingRule"
        //
    };
    // Refers to reference tag NOTE_TYPE
    _SATB._RESULT_CHAINING_OPERATION = {
        // Core Module
        coreMax: "operator",
        coreActState: "operator",
        //
        isBarVisible: "operator", // (v0.04a+)Bar Module
        // (v0.04a+)Charge Module
        chargeMax: "operator",
        isPayBeforeExecCharge: "operator",
        canCancelCharge: "operator",
        canForceCharge: "operator",
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: "operator",
        canCancelCooldown: "operator"
        //
    }; // _SATB._RESULT_CHAINING_OPERATION
    //

    /*------------------------------------------------------------------------
     *    New private variable
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
     * @todo Tries to extract the commonalities among all 3 chainResult_ apis
     */
    $.chainedPartResult_ = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var op = _SATB._RESULT_CHAINING_OPERATION[note];
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][op];
        return resultFunc.call(this, list, note, argObj_, initVal_);
        //
    }; // $.chainedPartResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.04a
     * @param {[<T>]} list - The effective notetag results to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {<T>?} initVal_ - The initial result to chain the notetag list
     * @returns {<T>} The chained result from the notetag results involved
     * @todo Tries to extract the commonalities among all 3 chainResult_ apis
     */
    $.chainedAssociativeResult_ = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var valOp = _SATB._RESULT_CHAINING_OPERATION[note] + "Val";
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][valOp];
        if (list.length <= 0 || _SATB._IS_NOTE_USE_DEFAULT[note]) {
            return resultFunc.call(this, list, note, argObj_, initVal_);
        }
        return resultFunc.call(this, list, note, argObj_);
        //
    }; // $.chainedAssociativeResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @returns {*} The chained result from the notetag list of note involved
     * @todo Tries to extract the commonalities among all 3 chainResult_ apis
     */
    $.chainedNonAssociativeResult_ = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var op = _SATB._RESULT_CHAINING_OPERATION[note];
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][op];
        if (list.length <= 0 || _SATB._IS_NOTE_USE_DEFAULT[note]) {
            return resultFunc.call(this, list, note, argObj_, initVal_);
        }
        return resultFunc.call(this, list, note, argObj_);
        //
    }; // $.chainedNonAssociativeResult_

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
     * @enum @returns {ChainRule} Effective notetag chaining rule parameter val
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

    _SATB._ACTOR_INDEX = function(actor) { return actor.index(); }; // Hotspot
    _SATB._CLEAR_NOTES = function(mem) { mem.clearSATBNotes(); };
    _SATB._ERASE_VIRTUAL_ACT_SLOT = function(mem) {
        mem.eraseVirtualSATBActSlot();
    }; // _SATB._ERASE_VIRTUAL_ACT_SLOT
    _SATB._INIT_NOTES = function(mem) { mem.initSATBNotes(); };

    /*------------------------------------------------------------------------
     *    (v0.05b+)New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {[Game_Actor]} inputableActors - The list of all inputable actors

    _GP.clearActions = $.clearActions || $$.clearActions;
    _SATB.clearActions = $.clearActions = function() {
    // v0.00a - v0.00a; Extended
        _GP.clearActions.apply(this, arguments);
        // Added to clear the ATB value of all actors upon a failed escape
        _SATB._eraseVirtualActSlot.call(this);
        //
    }; // $.clearActions

    _GP.removeActor = $.removeActor;
    _SATB.removeActor = $.removeActor = function(actorId) {
    // v0.00a - v0.00a; Extended
        // Added to ensure actors being added back will have ATB value cleared
        _SATB._removeActor.call(this, actorId);
        // This must be placed here or it won't know if actorId is in the party
        _GP.removeActor.apply(this, arguments);
    }; // $.removeActor

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05b @version v0.05b
     * @returns {Boolean} The check result
     */
    $.hasSATBInputableActors = function() {
        return this._satb.inputableActors.length > 0;
    }; // _SATB.hasSATBInputableActors

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.05b
     * @param {Game_Actor?} actor_ - The actor to have the inputability checked
     * @returns {Boolean} The check result
     */
    $.isUnselectedSATBInputableActor = function(actor_) {
        return BattleManager.actor() === actor_ && this.canInputSATB(actor_);
    }; // $.isUnselectedSATBInputableActor

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.01a @version v0.05b
     * @param {Game_Actor?} actor_ - The actor to have the inputability checked
     * @returns {Boolean} The check result
     */
    $.canInputSATB = function(actor_) {
        return this._satb.inputableActors.contains(actor_);
    }; // $.canInputSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05b @version v0.05b
     * @returns {[Index]} The list of indices of all inputable actors
     */
    $.inputableSATBActorIndices = function() {
        return this._satb.inputableActors.fastMap(_SATB._ACTOR_INDEX);
    }; // $.inputableSATBActorIndices

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
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.initSATB = function() {
        // It's a FIFO queue so an Array must be used
        this._satb = { inputableActors: [] };
        //
    }; // $.initSATB

    /**
     * Compatibility/Idempotent
     * @interface @since v0.00a @version v0.05b
     * @param {Game_Actor} actor - The actor to become inputable
     */
    $.addSATBInputableActor = function(actor) {
        // Actors that can execute actions shouldn't be able to input actions
        if (!this.inBattle() || BattleManager.canActSATB(actor)) return;
        //
        // Extracting them into a new method can lead to invalid states
        if (actor.isAutoBattle() || actor.isConfused()) return;
        if (this.canInputSATB(actor)) return;
        this._satb.inputableActors.push(actor);
        SATBManager.procScene_("updateSATBActorSelect");
        //
    }; // $.addSATBInputableActor

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {Game_Actor} actor - The actor to become not inputable
     */
    $.eraseSATBInputableActor = function(actor) {
        if (!BattleManager.isSATBBattle()) return;
        this._satb.inputableActors.eraseElem(actor);
        // clearActor also calls updateSATBActorSelect
        if (BattleManager.actor() === actor) return BattleManager.clearActor();
        SATBManager.procScene_("updateSATBActorSelect");
        //
        // Otherwise inputable actors not being selected will have wrong poses
        actor.setActionState('');
        //
    }; // $.eraseSATBInputableActor

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Index} i - The index of the actor to cancel the ATB charge
     */
    $.onTryCancelActorChargeSATB = function(i) {
        var actor_ = this.members()[i];
        if (actor_) actor_.onCancelSATBCharge();
    }; // $.onTryCancelActorChargeSATB

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Index} i - The index of the actor to start forcing the ATB charge
     */
    $.onTryStartForceActorChargeSATB = function(i) {
        var actor_ = this.members()[i];
        if (actor_) actor_.onStartForceSATBCharge();
    }; // _SATB._onTryStartForceActorCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Index} i - The index of the actor to end forcing the ATB charge
     */
    $.onTryEndForceActorChargeSATB = function(i) {
        var actor_ = this.members()[i];
        if (actor_) actor_.onEndForceSATBCharge();
    }; // $.onTryEndForceActorChargeSATB

    /**
     * Idempotent
     * @interface @since v0.05a @version v0.05a
     * @param {Index} i - The index of the actor to cancel the ATB cooldown
     */
    $.onTryCancelActorCooldownSATB = function(i) {
        var actor_ = this.members()[i];
        if (actor_) actor_.onCancelSATBCooldown();
    }; // $.onTryCancelActorCooldownSATB

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._eraseVirtualActSlot = function() {
        this.members().forEach(_SATB._ERASE_VIRTUAL_ACT_SLOT);
    }; // _SATB._eraseVirtualActSlot

    /**
     * The this pointer is Game_Party.prototype
     * @since v0.00a @version v0.00a
     * @param {Id} actorId - The id of the actor to be removed from the party
     */
    _SATB._removeActor = function(actorId) {
    // v0.00a - v0.00a; Extended
        if (!this._actors.contains(actorId)) return;
        // clearCoreSATB shouldn't be used as -ve ATB value isn't desirable
        $gameActors.actor(actorId).clearCoreSATBActs();
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
            return targets.some(function(t) {
                return isNaN(t) ? t === target.name() : +t === i;
            });
        });
    }; // _SATB._FILTERED_TARGET_INDICES
    _SATB._IS_ALIVE = function(actor) { return actor.isAlive(); };
    _SATB._IS_DEAD = function(actor) { return actor.isDead(); };
    _SATB._IS_PLUGIN_CMD = function(cmd) { return _SATB._CMDS.contains(cmd); };
    _SATB._PARSED_ARGS = function(cmd, args) { // v0.05b+
        if (!_SATB._IS_NUM_ARGS[cmd]) return args;
        return args.map(function(arg) { return +arg; });
    }; // _SATB._PARSED_ARGS

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
    _SATB._CMDS = Object.keys(GB.NOTE_FORWARDED_FUNCS).concat([
        "setSATBActTimes",
        "addSATBActTimes",
        "multiplySATBActTimes"
    ]).concat(Object.keys(GB.PHASE_TYPE_FORWARDED_FUNCS));
    //
    _SATB._TARGET_ID = "id", _SATB._TARGET_INDEX = "index";

    _SATB._IS_NUM_ARGS = { // v0.05b+
        setSATBActTimes: true,
        addSATBActTimes: true,
        multiplySATBActTimes: true
    };
    Object.keys(GB.PHASE_TYPE_FORWARDED_FUNCS).forEach(function(func) {
        _SATB._IS_NUM_ARGS[func] = true;
    });

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
     * @since v0.00a @version v0.05b
     * @param {PluginCmd} cmd - The plugin command name
     * @param {PluginArgs} args - Plugin command arguments
     */
    _SATB._usePluginCmd = function(cmd, args) {
        // The 1st and 2nd arguments must always be the target type and target
        var targetType = args.shift(), targets = args.shift().split(",");
        /** @todo Makes the plugin command more forgiving to syntax errors */
        var battlers = _SATB._pluginCmdTargets.call(this, targetType, targets);
        var parsedArgs = _SATB._PARSED_ARGS(cmd, args);
        battlers.forEach(function(battler) {
            battler[cmd].apply(battler, parsedArgs);
        });
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
 *    # (v0.03a+)Edit class: Sprite_Battler
 *      - Attaches the battler ATB value bar to the battler sprite
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Sprite_Battler = { orig: {}, new: {} };
    var $ = Sprite_Battler.prototype;
    var _SB = SATB.Sprite_Battler.orig, _SATB = SATB.Sprite_Battler.new;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isBarErased: Whether the battler ATB bar's already erased
    //       {Window_SATBBar} bar: The battler ATB value bar

    _SB.setBattler = $.setBattler;
    _SATB.setBattler = $.setBattler = function(battler) {
    // v0.03a - v0.03a; Extended
        // Added to reconstruct the battler sprite ATB bar upon battler change
        _SATB._setBattler.call(this, battler);
        // It must be set here or the old battler could be lost
        _SB.setBattler.apply(this, arguments);
    }; // $.setBattler

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     */
    $.refreshSATBWin = function(battlers) {
        _SATB._refresh.call(this, battlers, "refreshWin");
    }; // $.refreshSATBWin

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     */
    $.refreshSATBBar = function(battlers) {
        _SATB._refresh.call(this, battlers, "refreshBar");
    }; // $.refreshSATBBar

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.eraseSATBBar = function() {
        this._satb.bar.setBattler(undefined);
        this._satb.bar.parent.removeChild(this._satb.bar);
        delete this._satb.bar;
        this._satb.isBarErased = true;
    }; // $.eraseSATBBar

    /**
     * The this pointer is Sprite_Battler.prototype
     * Idempotent
     * @since v0.03a @version v0.03a
     * @param {Game_Battler} battler - The battler owning this sprite
     */
    _SATB._setBattler = function(battler) {
        // It's possible for a null battler to be passed and null !== undefined
        if (!battler || battler === this._battler) return;
        //
        var satb = this._satb;
        if (!satb) return _SATB._initBar.call(this, battler);
        // initialize doesn't always provide a valid battler
        if (satb.bar && !satb.isBarErased) satb.bar.setBattler(battler);
        //
    }; // _SATB._setBattler

    /**
     * The this pointer is Sprite_Battler.prototype
     * Idempotent
     * @since v0.03a @version v0.03a
     * @param {Game_Battler} battler - The battler owning this sprite
     */
    _SATB._initBar = function(battler) {
        this._satb = { bar: new Window_SATBBar(battler) };
        this.addChild(this._satb.bar);
    }; // _SATB._initBar

    /**
     * The this pointer is Sprite_Battler.prototype
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     * @enum @param {String} refreshFunc - refreshWin/refreshBar
     */
    _SATB._refresh = function(battlers, refreshFunc) {
        if (!battlers.contains(this._battler)) return;
        if (this._satb && this._satb.bar) this._satb.bar[refreshFunc]();
    }; // _SATB._refresh

})(DoubleX_RMMV.SATB); // Sprite_Battler.prototype

/*----------------------------------------------------------------------------
 *    # (v0.05b+)Edit class: Spriteset_Battle
 *      - Updates the ATB bar attached to each battler sprite
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Spriteset_Battle = { orig: {}, new: {} };
    var $ = Spriteset_Battle.prototype, _SATB = SATB.Spriteset_Battle.new;

    _SATB._ERASE_BAR = function(sprite) { sprite.eraseSATBBar(); };
    _SATB._ERASE_BARS = function(sprites) {
        sprites.forEach(_SATB._ERASE_BAR);
    }; // _SATB._ERASE_BARS
    _SATB._REFRESH = function(battlers, refreshFunc, sprites) {
        sprites.forEach(function(sprite) { sprite[refreshFunc](battlers); });
    }; // _SATB._REFRESH

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     */
    $.refreshSATBWins = function(battlers) {
        _SATB._refreshAll.call(this, battlers, "refreshSATBWin");
    }; // $.refreshSATBWins

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     */
    $.refreshSATBBars = function(battlers) {
        _SATB._refreshAll.call(this, battlers, "refreshSATBBar");
    }; // $.refreshSATBBars

    $.eraseSATBBars = function() {
        // It's to avoid concat which can be costly to run per frame
        _SATB._ERASE_BARS(this._actorSprites);
        _SATB._ERASE_BARS(this._enemySprites);
        //
    }; // $.eraseSATBBars

    /**
     * The this pointer is Spriteset_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     * @enum @param {String} refreshFunc - refreshSATBWin/refreshSATBBar
     */
    _SATB._refreshAll = function(battlers, refreshFunc) {
        // It's to avoid concat which can be costly to run per frame
        _SATB._REFRESH(battlers, refreshFunc, this._actorSprites);
        _SATB._REFRESH(battlers, refreshFunc, this._enemySprites);
        //
    }; // _SATB._refreshAll

})(DoubleX_RMMV.SATB); // Spriteset_Battle.prototype

/*----------------------------------------------------------------------------
 *    # (v0.05a+)Edit class: Window_Selectable
 *      - Lets multiple methods to be attached to the same handler
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Window_Selectable = { orig: {}, new: {} };
    var $ = Window_Selectable.prototype, _SATB = SATB.Window_Selectable.new;

    _SATB._CALL_HANDLER = function(method) { method(); };

    /**
     * @interface @since v0.05a @version v0.05a
     * @param {KeyMap} symbol - The symbol of the key to be handled
     * @param {[()]} methods - The list of methods to be attached to the symbol
     */
    $.addHandlers = $.addHandlers || function(symbol, methods) {
        if (this.isHandled(symbol)) {
            return this._handlers[symbol].fastMerge(methods);
        }
        this._handlers[symbol] = methods.clone();
    }; // $.addHandlers

    /**
     * Hotspot
     * @interface @since v0.05a @version v0.05a
     * @param {KeyMap} symbol - The symbol of the key to be handled
     */
    $.callHandlers = $.callHandlers || function(symbol) {
        if (!this.isHandled(symbol)) return;
        this._handlers[symbol].forEach(_SATB._CALL_HANDLER);
    }; // $.callHandlers

})(DoubleX_RMMV.SATB); // Window_ActorCommand.prototype

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Window_ActorCommand
 *      - Implements hotkeys selecting new inputable actors to input actions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Window_ActorCommand = { orig: {}, new: {} };
    var _WAC = SATB.Window_ActorCommand.orig, $ = Window_ActorCommand.prototype;
    var $$ = Window_Selectable.prototype, _SATB = SATB.Window_ActorCommand.new;

    // It's to prevent unknowningly overriding that from other plugins
    if ($.processHandling) {
        _WAC.processHandling = $.processHandling;
        _SATB.processHandling = $.processHandling = function() {
        // v0.01a - v0.01a; Extended
            _WAC.processHandling.apply(this, arguments);
            _SATB._procHandling.call(this);
        }; // $.processHandling
    } else {
        /**
         * Hotspot/Idempotent
         * @interface @override @since v0.01a @version v0.01a
         */
        $.processHandling = function() {
            $$.processHandling.call(this);
            _SATB._procHandling.call(this);
        }; // $.processHandling
    }
    //

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.04a
     */
    _SATB._procHandling = function() {
        if (!SATBManager.areModulesEnabled(["IsHotkeyEnabled"])) return;
        if (!this.isOpenAndActive()) return;
        var prevKey = $gameSystem.satbParamFunc("prevInputableActorKey")();
        _SATB._procRepeatableHotkey.call(this, prevKey);
        var nextKey = $gameSystem.satbParamFunc("nextInputableActorKey")();
        _SATB._procRepeatableHotkey.call(this, nextKey);
        var indiceKeys = $gameSystem.satbParamFunc("inputableActorKeys")();
        indiceKeys.forEach(_SATB._procHotkey, this);
    }; // _SATB._procHandling

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be processed
     */
    _SATB._procRepeatableHotkey = function(hotkey) {
	    if (!Input.isTriggered(hotkey) && !Input.isRepeated(hotkey)) return;
      this.callHandler(hotkey);
    }; // _SATB._procRepeatableHotkey

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be processed
     */
    _SATB._procHotkey = function(hotkey) {
	      if (Input.isTriggered(hotkey)) this.callHandler(hotkey);
    }; // _SATB._procHotkey

})(DoubleX_RMMV.SATB); // Window_ActorCommand.prototype

/*----------------------------------------------------------------------------
 *    # (v0.04a+)New class: Window_BattleStatus
 *      - Handles the cancel and force ATB charge hotkeys
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Window_BattleStatus = { orig: {}, new: {} };
    var _WBS = SATB.Window_BattleStatus.orig, $ = Window_BattleStatus.prototype;
    var $$ = Window_Selectable.prototype, _SATB = SATB.Window_BattleStatus.new;

    _SATB.START_FORCE_CHARGE_KEY = function(hotkey) {
        return hotkey + _SATB.START_FORCE_CHARGE;
    }; // _SATB.START_FORCE_CHARGE_KEY
    _SATB.END_FORCE_CHARGE_KEY = function(hotkey) {
        return hotkey + _SATB.END_FORCE_CHARGE;
    }; // _SATB.END_FORCE_CHARGE_KEY

    _SATB.START_FORCE_CHARGE = "StartCharge";
    _SATB.END_FORCE_CHARGE = "EndCharge";

    // It's to prevent unknowningly overriding that from other plugins
    if ($.processHandling) {
        _WBS.processHandling = $.processHandling;
        _SATB.processHandling = $.processHandling = function() {
        // v0.04a - v0.04a; Extended
            _WBS.processHandling.apply(this, arguments);
            // Added to process the cancel and force ATB charge hotkeys as well
            _SATB._procHandling.call(this);
            //
        }; // $.processHandling

    } else {
        /**
         * Hotspot/Idempotent
         * @interface @override @since v0.04a @version v0.04a
         */
        $.processHandling = function() {
            $$.processHandling.call(this);
            _SATB._procHandling.call(this);
        }; // $.processHandling
    }
    //

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.04a @version v0.05b
     * @todo Boosts the performance of this method
     */
    _SATB._procHandling = function() {
        if (!this.isOpen()) return;
        var cancelKeys_;
        // It's ok to process cancel key for charge and cooldown simultaneously
        if (SATBManager.areModulesEnabled(["IsChargeEnabled"])) {
            cancelKeys_ = $gameSystem.satbParamFunc("cancelChargeATBKeys")();
            _SATB._procChargeHotkeys.call(this, cancelKeys_);
        }
        if (!SATBManager.areModulesEnabled(["IsCooldownEnabled"])) return;
        _SATB._procCooldownHotkeys.call(this, cancelKeys_);
        //
    }; // _SATB._procHandling

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @enum @param {[KeyMap]} cancelKeys - The list of charge cancel keymaps
     * @todo Boosts the performance of this method
     */
    _SATB._procChargeHotkeys = function(cancelKeys) {
        cancelKeys.forEach(_SATB._procCancelHotkey, this);
        var forceKeys = $gameSystem.satbParamFunc("forceChargeATBKeys")();
        forceKeys.forEach(_SATB._procForceChargeHotkey, this);
    }; // _SATB._procChargeHotkeys

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be processed
     */
    _SATB._procForceChargeHotkey = function(hotkey) {
        var startKey = _SATB.START_FORCE_CHARGE_KEY(hotkey);
	      if (Input.isTriggered(hotkey)) return this.callHandler(startKey);
        var endKey = _SATB.END_FORCE_CHARGE_KEY(hotkey);
        if (Input.isReleased(hotkey)) this.callHandler(endKey);
    }; // _SATB._procForceChargeHotkey

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @enum @param {[KeyMap]?} cancelKeys_ - The list of charge cancel keymaps
     * @todo Boosts the performance of this method
     */
    _SATB._procCooldownHotkeys = function(cancelKeys_) {
        var cancelCDKeys = $gameSystem.satbParamFunc("cancelCooldownATBKeys")();
        cancelCDKeys.filter(function(key) {
            // Otherwise both cancel charge and cooldown listener can run twice
            return !cancelKeys_ || !cancelKeys_.contains(key);
            //
        }).forEach(_SATB._procCancelHotkey, this);
    }; // _SATB._procCooldownHotkeys

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.04a @version v0.05a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be processed
     */
    _SATB._procCancelHotkey = function(hotkey) {
        if (Input.isTriggered(hotkey)) this.callHandlers(hotkey);
    }; // _SATB._procCancelHotkey

})(DoubleX_RMMV.SATB); // Window_BattleStatus.prototype

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_SATBBar
 *      - Shows the ATB values and maximums of all battlers
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_Base.prototype;

    Window_SATBBar.prototype = Object.create($$);

    var $ = Window_SATBBar.prototype;

    $.constructor = Window_SATBBar;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Boolean} _canMakeCmds: Whether the battler can input or execute actions
    // {Color} _backColor: The ATB bar background color
    // {Color} _color1: The ATB bar gradient color at the left
    // {Color} _color2: The ATB bar gradient color at the right
    // {Color} _textColor: The ATB bar text color
    // {Game_Battler} _battler: The battler owning this ATB bar
    // {Int} _textX: The last text x offset
    // {Int} _textY: The last text y offset
    // {Natural Num} _lineH: The last line height
    // {Natural Num} _textSize: The last text size
    // {Nonnegative Int} _padding: The last padding
    // {Nonnegative Int} _textPadding: The last text padding
    // {Number} _fillW: The ATB bar fill width
    // {String} _text: The last formatted text

    /**
     * Idempotent
     * @constructor @since v0.03a @version v0.03a
     * @param {Game_Battler} battler - The battler owning this ATB bar
     */
    $.initialize = function(battler) {
        this.setBattler(battler);
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
	      this.opacity = 0; // Only the battler sprite ATB bar needs to be shown
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Natural Num} The line height of this window
     * @todo Considers using notetags instead of just parameter function results
     */
    $.lineHeight = function() {
        return $gameSystem.satbParamFunc("atbBarLineH").call(this._battler);
    }; // $.lineHeight

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Natural Num} The text size of this window
     * @todo Considers using notetags instead of just parameter function results
     */
    $.standardFontSize = function() {
        return $gameSystem.satbParamFunc("atbBarTextSize").call(this._battler);
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The padding of this window
     */
    $.standardPadding = function() {
        return 0; // The whole window's just the battler ATB bar
    }; // $.standardPadding

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The text padding of this window
     * @todo Considers using notetags instead of just parameter function results
     */
    $.textPadding = function() {
        return $gameSystem.satbParamFunc("atbBarTextPadding").call(
                this._battler);
    }; // $.textPadding

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Opacity} The back opacity of this window
     * @todo Considers using notetags instead of just parameter function results
     */
    $.standardBackOpacity = function() {
        return $gameSystem.satbParamFunc("atbBarBackOpacity").call(
                this._battler);
    }; // $.standardBackOpacity

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled(["IsBarEnabled"])) {
            return this._updateProperty("visible", false);
        }
        var wasVisible = this.visible;
        if (!$gameSystem.satbParam("_isNoteCached")) {
            this._updateProperty("visible", this._isVisible());
        }
        if (!this.visible) return;
        if (wasVisible && $gameSystem.satbParam("_isParamFuncCached")) return;
        this._updateVisibleWin();
    }; // $.update

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Color} The background color of this window
     * @todo Considers using notetags instead of just parameter function results
     */
    $.gaugeBackColor = function() {
        return $gameSystem.satbParamFunc("atbBarBackColor").call(
                this._battler, this);
    }; // $.gaugeBackColor

    /**
     * Idempotent
     * @interface @since v0.03a @version v0.05b
     * @param {Game_Battler?} battler_ - The battler owning this ATB bar
     */
    $.setBattler = function(battler_) {
        if (this._battler === battler_) return;
        var lastBattler_ = this._battler;
        this._battler = battler_;
        if (!battler_) return this._updateProperty("visible", false);
        // refreshWin is only need upon changing from a valid battler to another
        if (lastBattler_ && lastBattler_ !== battler_) this.refreshWin();
        //
    }; // $.setBattler

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.refreshWin = function() {
        if (!SATBManager.areModulesEnabled(["IsBarEnabled"])) {
            return this._updateProperty("visible", false);
        }
        if ($gameSystem.satbParam("_isNoteCached")) {
            this._updateProperty("visible", this._isVisible());
        }
        if (this._isRefreshWithCache()) this._updateVisibleWin();
    }; // $.refreshWin

    /**
     * Hotspot/Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.refreshBar = function() {
        if (this._isRefreshWithCache()) this._refreshBar();
    }; // $.refreshBar

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {XYWH} The window x and y positions and its width and its height
     */
    $._xywh = function() {
        return {
            x: this._x(),
            y: this._y(),
            width: this._w(),
            height: this._h()
        };
    }; // $._xywh

    /**
     * Hotspot/Nullipotent
     * @since v0.05b @version v0.05b
     * @returns {Boolean} The check result
     */
    $._isRefreshWithCache = function() {
        return this.visible && $gameSystem.satbParam("_isParamFuncCached");
    }; // $._isRefreshWithCache

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    $._refreshBar = function() {
        this._updatePaintOpacity();
        this._updateBarVal();
    }; // $._refreshBar

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isVisible = function() {
        return this._battler.satbNoteResult_("isBarVisible");
    }; // $._isVisible

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    $._updateVisibleWin = function() {
        this._updateXY();
        this._updateOpacities();
        this._updateBar();
    }; // $._updateVisibleWin

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    $._updateXY = function() {
        this._updateProperty("x", this._x());
        this._updateProperty("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The window x position
     */
    $._x = function() {
        return $gameSystem.satbParamFunc("atbBarXOffset").call(this._battler);
    }; // $._x

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The window x position
     */
    $._y = function() {
        return $gameSystem.satbParamFunc("atbBarYOffset").call(this._battler);
    }; // $._y

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @todo Updates the translucent opacity as well
     */
    $._updateOpacities = function() {
        this._updateBackOpacity();
        this._updatePaintOpacity();
    }; // $._updateOpacities

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     */
    $._updateBackOpacity = function() {
        this._updateProperty("backOpacity", this.standardBackOpacity());
    }; // $._updateBackOpacity

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProperty = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProperty

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @todo Updates the translucent opacity as well
     */
    $._updatePaintOpacity = function() {
        /** @todo Considers adding parameter atbBarTranslucentOpacity */
        var isUpdateCanMakeCmds = this._isCacheUpdated(
                "_canMakeCmds", this._battler.canMakeSATBCmds());
        if (isUpdateCanMakeCmds) this.changePaintOpacity(this._canMakeCmds);
        // It's ok to update here as the text should change as well in this case
    }; // $._updatePaintOpacity

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     */
    $._updateBarVal = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateFillW = this._isCacheUpdated("_fillW", this._fillBarW());
        var isUpdateText = this._isCacheUpdated("_text", this._formattedText());
        //
        if (!isUpdateFillW && !isUpdateText) return;
        this.contents.clear();
        this._redraw();
    }; // $._updateBarVal

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $._updateBar = function() {
        // All of them must be run per frame to keep all these caches up to date
        // width must be updated first before updating fill width
        var isUpdateWH = this._isUpdateWH();
        var isUpdateFillW = this._isCacheUpdated("_fillW", this._fillBarW());
        //
        var isUpdateBarColors = this._isUpdateBarColors();
        var isUpdatePadding =
                this._isCacheUpdated("_padding", this.standardPadding());
        var isUpdateTextPadding =
                this._isCacheUpdated("_textPadding", this.textPadding());
        var isUpdateSize =
                this._isCacheUpdated("_textSize", this.standardFontSize());
        var isUpdateTextColor =
                this._isCacheUpdated("_textColor", this._atbTextColor());
        var isUpdateTextXY = this._isUpdateTextXY();
        var isUpdateText = this._isCacheUpdated("_text", this._formattedText());
        var isUpdateLineH = this._isCacheUpdated("_lineH", this.lineHeight());
        //
        if (!isUpdateWH && !isUpdateFillW && !isUpdateBarColors &&
                !isUpdatePadding && !isUpdateTextPadding && !isUpdateSize &&
                !isUpdateTextColor && !isUpdateTextXY && !isUpdateText &&
                !isUpdateLineH) return;
        this.contents.clear();
        if (isUpdateWH) this.contents.resize(this.width, this.height);
        if (isUpdatePadding) this.updatePadding();
        if (isUpdateSize) this.resetFontSettings();
        if (isUpdateTextColor) this.changeTextColor(this._textColor);
        this._redraw();
    }; // $._updateBar

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isUpdateWH = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateW = this._isCacheUpdated("width", this._w());
        var isUpdateH = this._isCacheUpdated("height", this._h());
        //
        return isUpdateW || isUpdateH;
    }; // $._isUpdateWH

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Natural Num} The window width
     */
    $._w = function() {
        return $gameSystem.satbParamFunc("atbBarW").call(this._battler);
    }; // $._w

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Natural Num} The window height
     */
    $._h = function() {
        return $gameSystem.satbParamFunc("atbBarH").call(this._battler);
    }; // $._h

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Number} The ATB bar fill width
     */
    $._fillBarW = function() {
        return this.width * this._battler.curSATBProportion();
    }; // $._fillBarW

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isUpdateBarColors = function() {
        var isUpdateBackColor =
                this._isCacheUpdated("_backColor", this.gaugeBackColor());
        var isUpdateColor1 = this._isCacheUpdated("_color1", this._barColor1());
        var isUpdateColor2 = this._isCacheUpdated("_color2", this._barColor2());
        return isUpdateBackColor || isUpdateColor1 || isUpdateColor2;
    }; // $._isUpdateBarColors

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Color} The 1st ATB bar color
     */
    $._barColor1 = function() {
        return $gameSystem.satbParamFunc("atbBarColor1").call(
                this._battler, this);
    }; // $._barColor1

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Color} The 2nd ATB bar color
     */
    $._barColor2 = function() {
        return $gameSystem.satbParamFunc("atbBarColor2").call(
                this._battler, this);
    }; // $._barColor2

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Color} The current ATB force status description text x offset
     */
    $._atbTextColor = function() {
        return $gameSystem.satbParamFunc("atbBarTextColor").call(
                this._battler, this);
    }; // $._atbTextColor

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isUpdateTextXY = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateX = this._isCacheUpdated("_textX", this._textXOffset());
        var isUpdateY = this._isCacheUpdated("_textY", this._textYOffset());
        //
        return isUpdateX || isUpdateY;
    }; // $._isUpdateTextXY

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Int} The current ATB force status description text x offset
     */
    $._textXOffset = function() {
        return $gameSystem.satbParamFunc("atbBarTextXOffset").call(
                this._battler);
    }; // $._textXOffset

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Int} The current ATB force status description text y offset
     */
    $._textYOffset = function() {
        return $gameSystem.satbParamFunc("atbBarTextYOffset").call(
                this._battler);
    }; // $._textYOffset

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {String} The formatted text to be shown in the window
     */
    $._formattedText = function() {
        return $gameSystem.satbParamFunc("atbBarText").call(this._battler);
    }; // $._formattedText

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @enum @param {String} cache - Name of the variable as the cache to check
     * @param {*} newVal - The new value of the cache to check
     * @returns {Boolean} The check result
     */
    $._isCacheUpdated = function(cache, newVal) {
        var isUpdated = this[cache] !== newVal;
        if (isUpdated) this[cache] = newVal;
        return isUpdated;
    }; // $._isCacheUpdated

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    $._redraw = function() {
        // The whole window is just the battler ATB bar
        this.contents.fillRect(0, 0, this.width, this.height, this._backColor);
        this.contents.gradientFillRect(
                0, 0, this._fillW, this.height, this._color1, this._color2);
        //
        var textW = this.textWidth(this._text);
        this.drawText(this._text, this._textX, this._textY, textW, "center");
    }; // $._redraw

})(); // Window_SATBBar.prototype

/*----------------------------------------------------------------------------
 *    # (v0.02a+)New class: Window_SATBBase
 *      - Facilitates the creation of new window classes
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    Window_SATBBase.prototype = Object.create(Window_Base.prototype);

    var $ = Window_SATBBase.prototype, $$ = Window_Base.prototype;
    var WS = Window_Selectable.prototype;

    $.constructor = Window_SATBBase;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Boolean} _isEnabled: Whether this window's shown as enabled
    // {Boolean} _isLastEnabled: Whether this window's shown as enabled
    // {Int} _lastTextX: The last text x offset
    // {Int} _lastTextY: The last text y offset
    // (v0.04a+){Boolean} _isShow: The cached result of if this window's shown
    // (v0.04a+){Int} _textX: The cached text x offset
    // (v0.04a+){Int} _textY: The cached text y offset
    // (v0.04a+){Int} _winX: The cached x position
    // (v0.04a+){Int} _winY: The cached y position
    // (v0.04a+){Natural Num} _lineH: The cached line height
    // (v0.04a+){Natural Num} _winW: The cached width
    // (v0.04a+){Natural Num} _winH: The cached height
    // (v0.04a+){Nonnegative Int} _cachedPadding: The cached padding
    // (v0.04a+){Nonnegative Int} _textPadding: The cached text padding
    // (v0.04a+){Natural Num} _textSize: The cached text size
    // (v0.04a+){Opacity} _backOpacity: The cached back opacity
    // (v0.04a+){String} _text: The cached formatted text
    // (v0.04a+){Natural Num} _lastLineH: The last line height
    // {Natural Num} _lastTextSize: The last text size
    // {Nonnegative Int} _lastPadding: The last padding
    // {Nonnegative Int} _lastTextPadding: The last text padding
    // {Param} _lineHParam: The parameter returning the line height
    // {Param} _textSizeParam: The parameter returning the text size
    // {Param} _paddingParam: The parameter returning the padding
    // {Param} _textPaddingParam: The parameter returning the text padding
    // {Param} _backOpacityParam: The parameter returning the back opacity
    // {Param} _moduleParam: The parameter returning if its module's enabled
    // {Param} _isShowParam: The parameter returning if this window's shown
    // {Param} _winXParam: The parameter returning the x position
    // {Param} _winYParam: The parameter returning the y position
    // {Param} _winWParam: The parameter returning the width
    // {Param} _winHParam: The parameter returning the height
    // {Param} _textXParam: The parameter returning the text x offset
    // {Param} _textYParam: The parameter returning the text y offset
    // {String} _lastText: The last formatted text

    /**
     * Idempotent
     * @constructor @since v0.02a @version v0.03a
     * @param {WinBaseParams} - The container of all base window parameter names
     */
    $.initialize = function(winBaseParams) {
        this._isEnabled = this._isLastEnabled = true;
        this._setWinBaseParams(winBaseParams);
        this._updateProperty("visible", this._isVisible());
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
        if ($gameSystem.satbParam("_isParamFuncCached")) this.refresh();
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Natural Num} The line height of this window
     */
    $.lineHeight = function() {
        return SATBManager.funcParam.call(this, this._lineHParam, "_lineH");
    }; // $.lineHeight

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Natural Num} The text size of this window
     */
    $.standardFontSize = function() {
        return SATBManager.funcParam.call(
                this, this._textSizeParam, "_textSize");
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Nonnegative Int} The padding of this window
     */
    $.standardPadding = function() {
        return SATBManager.funcParam.call(
                this, this._paddingParam, "_cachedPadding");
    }; // $.standardPadding

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Nonnegative Int} The text padding of this window
     */
    $.textPadding = function() {
        return SATBManager.funcParam.call(
                this, this._textPaddingParam, "_textPadding");
    }; // $.textPadding

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Opacity} The back opacity of this window
     */
    $.standardBackOpacity = function() {
        return SATBManager.funcParam.call(
                this, this._backOpacityParam, "_backOpacity");
    }; // $.standardBackOpacity

    /**
     * Hotspot/Idempotent
     * @interface @since v0.02a @version v0.04a
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled([this._moduleParam])) {
            return this._updateProperty("visible", false);
        }
        $$.update.call(this);
        this._updateAll();
        if ($gameSystem.satbParam("_isParamFuncCached")) {
            this._updateWithCache();
        } else this._updateWithoutCache();
    }; // $.update

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.04a @version v0.04a
     * @param {Boolean} isEnabled - Whether this window's shown as enabled
     */
    $.setIsEnabled = function(isEnabled) {
        if (this._isEnabled === isEnabled) return;
        this._isEnabled = isEnabled;
        this.refresh();
    }; // $.setIsEnabled

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.refresh = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) return;
        // It must be placed here or the old cache would be used right afterward
        this._invalidateCachedParams();
        //
        this._updateProperty("visible", this._isVisible());
        this._updateXY();
        this._updateBackOpacity();
    }; // $.refresh

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.02a
     * @returns {XYWH} The window x and y positions and its width and its height
     */
    $._xywh = function() {
        return {
            x: this._x(),
            y: this._y(),
            width: this._w(),
            height: this._h()
        };
    }; // $._xywh

    /**
     * Hotspot
     * @abstract @since v0.02a @version v0.02a
     */
    $._updateAll = function() {};

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     */
    $._updateWithCache = function() {
        if (!this.visible) return;
        this._updateWhenVisible();
        this._procTouch();
    }; // $._updateWithCache

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     */
    $._updateWithoutCache = function() {
        this._updateProperty("visible", this._isVisible());
        if (!this.visible) return;
        this._updateXY();
        this._updateBackOpacity();
        this._updateWhenVisible();
        this._procTouch();
    }; // $._updateWithoutCache

    /**
     * Hotspot/Nullipotent
     * @abstract @since v0.02a @version v0.02a
     * @returns {String} The formatted text to be shown in the window
     */
    $._formattedText = function() {
        console.warn("The abstract method _formattedText isn't implemented" +
                " by" + this.constructor);
        return "";
    }; // $._formattedText

    /**
     * Hotspot/Pure Function
     * @abstract @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $._canTouch = function() { return false; };

    /**
     * @abstract @since v0.02a @version v0.02a
     */
    $._onTouch = function() {
        console.warn("The abstract method _onTouch isn't implemented by" +
                this.constructor);
    }; // $._onTouch

    /**
     * Idempotent
     * @since v0.02a @version v0.03a
     * @param {WinBaseParams} - The container of all base window parameter names
     */
    $._setWinBaseParams = function(winBaseParams) {
        this._lineHParam = winBaseParams.lineHParam;
        this._textSizeParam = winBaseParams.textSizeParam;
        this._paddingParam = winBaseParams.paddingParam;
        this._textPaddingParam = winBaseParams.textPaddingParam;
        this._backOpacityParam = winBaseParams.backOpacityParam;
        this._moduleParam = winBaseParams.moduleParam;
        this._isShowParam = winBaseParams.isShowParam;
        this._winXParam = winBaseParams.winXParam;
        this._winYParam = winBaseParams.winYParam;
        this._winWParam = winBaseParams.winWParam;
        this._winHParam = winBaseParams.winHParam;
        this._textXParam = winBaseParams.textXParam;
        this._textYParam = winBaseParams.textYParam;
    }; // $._setWinBaseParams

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    $._invalidateCachedParams = function() {
        delete this._isShow;
        delete this._textX;
        delete this._textY;
        delete this._winX;
        delete this._winY;
        delete this._lineH;
        delete this._winW;
        delete this._winH;
        // Calling it _padding instead of _cachedPadding would've name collision
        delete this._cachedPadding;
        //
        delete this._textPadding;
        delete this._textSize;
        delete this._backOpacity;
        delete this._text;
    }; // $._invalidateCachedParams

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Boolean} The check result
     */
    $._isVisible = function() {
        return SATBManager.funcParam.call(this, this._isShowParam, "_isShow");
    }; // $._isVisible

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.04a
     */
    $._updateXY = function() {
        this._updateProperty("x", this._x());
        this._updateProperty("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Nonnegative Int} The window x position
     */
    $._x = function() {
        return SATBManager.funcParam.call(this, this._winXParam, "_winX");
    }; // $._x

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Nonnegative Int} The window y position
     */
    $._y = function() {
        return SATBManager.funcParam.call(this, this._winYParam, "_winY");
    }; // $._w

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.02a
     * @todo Updates the translucent opacity as well
     */
    $._updateBackOpacity = function() {
        this._updateProperty("backOpacity", this.standardBackOpacity());
    }; // $._updateBackOpacity

    /**
     * Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProperty = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProperty

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.03a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $._updateText = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateWH = this._isUpdateWH();
        var isUpdateEnabled =
              this._isCacheUpdated("_isLastEnabled", this._isEnabled);
        var isUpdatePadding =
                this._isCacheUpdated("_lastPadding", this.standardPadding());
        var isUpdateTextPadding =
                this._isCacheUpdated("_lastTextPadding", this.textPadding());
        var isUpdateSize =
                this._isCacheUpdated("_lastTextSize", this.standardFontSize());
        var isUpdateXY = this._isUpdateTextXY();
        var isUpdateText =
                this._isCacheUpdated("_lastText", this._formattedText());
        var isUpdateLineH =
                this._isCacheUpdated("_lastLineH", this.lineHeight());
        //
        if (!isUpdateWH && !isUpdateEnabled && !isUpdatePadding &&
                !isUpdateTextPadding && !isUpdateSize && !isUpdateXY &&
                !isUpdateText && !isUpdateLineH) return;
        this.contents.clear();
        if (isUpdateWH) this.contents.resize(this.width, this.height);
        if (isUpdateEnabled) this.changePaintOpacity(this._isEnabled);
        if (isUpdatePadding) this.updatePadding();
        if (isUpdateSize) this.resetFontSettings();
        this._redrawText();
    }; // $._updateText

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     * @returns {Boolean} The check result
     */
    $._isUpdateWH = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateW = this._isCacheUpdated("width", this._w());
        var isUpdateH = this._isCacheUpdated("height", this._h());
        //
        return isUpdateW || isUpdateH;
    }; // $._isUpdateWH

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Natural Num} The window width
     */
    $._w = function() {
        return SATBManager.funcParam.call(this, this._winWParam, "_winW");
    }; // $._w

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Natural Num} The window height
     */
    $._h = function() {
        return SATBManager.funcParam.call(this, this._winHParam, "_winH");
    }; // $._h

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isUpdateTextXY = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateX = this._isCacheUpdated("_lastTextX", this._textXOffset());
        var isUpdateY = this._isCacheUpdated("_lastTextY", this._textYOffset());
        //
        return isUpdateX || isUpdateY;
    }; // $._isUpdateTextXY

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Int} The current ATB force status description text x offset
     */
    $._textXOffset = function() {
        return SATBManager.funcParam.call(this, this._textXParam, "_textX");
    }; // $._textXOffset

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Int} The current ATB force status description text y offset
     */
    $._textYOffset = function() {
        return SATBManager.funcParam.call(this, this._textYParam, "_textY");
    }; // $._textYOffset

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @enum @param {String} cache - Name of the variable as the cache to check
     * @param {*} newVal - The new value of the cache to check
     * @returns {Boolean} The check result
     */
    $._isCacheUpdated = function(cache, newVal) {
        var isUpdated = this[cache] !== newVal;
        if (isUpdated) this[cache] = newVal;
        return isUpdated;
    }; // $._isCacheUpdated

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.02a
     */
    $._redrawText = function() {
        this.drawText(this._lastText, this._lastTextX, this._lastTextY,
                this.textWidth(this._lastText), "center");
    }; // $._redrawText

    /**
     * Hotspot
     * @since v0.02a @version v0.02a
     */
    $._procTouch = function() {
        // So windows that can't be touched can be even more performant
        if (!this._canTouch()) return false;
        //
        if (!TouchInput.isTriggered() || !this._isTouchedInsideFrame()) return;
        this._onTouch();
    }; // $._procTouch

    $._isTouchedInsideFrame = WS.isTouchedInsideFrame;

})(); // Window_SATBBase.prototype

/*----------------------------------------------------------------------------
 *    # (v0.02a+)New class: Window_SATBForceRunCmd
 *      - Lets players click it to forcibly run the ATB frame update
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBase.prototype;

    Window_SATBForceRunCmd.prototype = Object.create($$);

    var $ = Window_SATBForceRunCmd.prototype;

    $.constructor = Window_SATBForceRunCmd;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {()} _onForceRun: The force run trigger event listener

    /**
     * Idempotent
     * @constructor @since v0.02a @version v0.03a
     * @param {()} onForceRun - The on touch listener attached to this window
     */
    $.initialize = function(onForceRun) {
        this._onForceRun = onForceRun;
        $$.initialize.call(this, {
            lineHParam: "forceATBRunCmdWinLineH",
            textSizeParam: "forceATBRunCmdTextSize",
            paddingParam: "forceATBRunCmdWinPadding",
            textPaddingParam: "forceATBRunCmdTextPadding",
            backOpacityParam: "forceATBRunCmdBackOpacity",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBRunCmdWin",
            winXParam: "forceATBRunCmdWinX",
            winYParam: "forceATBRunCmdWinY",
            winWParam: "forceATBRunCmdWinW",
            winHParam: "forceATBRunCmdWinH",
            textXParam: "forceATBRunCmdTextXOffset",
            textYParam: "forceATBRunCmdTextYOffset"
        });
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.clear = function() {
        delete this._onForceRun; // It's bound to the battle scene
        this.close(); // A window that's about to be erased should be closed
    }; // $.clear

    /**
     * Potential Hotspot/Idempotent
     * @interface @override @since v0.02a @version v0.02a
     */
    $.refresh = function() {
        $$.refresh.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $.refresh

    /**
     * Hotspot
     * @override @since v0.02a @version v0.02a
     */
    $._updateAll = function() {
        if (this._isForceRunKeyTriggered()) this._onTouch();
    }; // $._updateAll

    /**
     * Hotspot/Idempotent
     * @override @since v0.02a @version v0.04a
     */
    $._updateWhenVisible = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $._updateWhenVisible

    /**
     * Hotspot/Nullipotent
     * @override @since v0.02a @version v0.04a
     * @returns {String} The current ATB force status description text
     */
    $._formattedText = function() {
        return SATBManager.funcParam.call(this, "forceRunATBCmdText", "_text");
    }; // $._formattedText

    /**
     * Hotspot/Pure Function
     * @override @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $._canTouch = function() { return true; };

    /**
     * @override @since v0.02a @version v0.02a
     */
    $._onTouch = function() {
        this._isEnabled ? this._onTouchOk() : SoundManager.playBuzzer();
    }; // $._onTouch

    /**
     * @override @since v0.05b @version v0.05b
     */
    $._onTouchOk = function() {
        SoundManager.playOk();
        this._onForceRun();
        this.refresh();
    }; // $._onTouchOk

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Boolean} The check result
     */
    $._isForceRunKeyTriggered = function() {
        // The function probably always returns the same keymap constant anyway
        return Input.isTriggered($gameSystem.satbParamFunc("forceRunATBKey")());
        //
    }; // $._isForceRunKeyTriggered

})(); // Window_SATBForceRunCmd.prototype

/*----------------------------------------------------------------------------
 *    # (v0.02a+)New class: Window_SATBForceStopCmd
 *      - Lets players click it to forcibly run the ATB frame update
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBase.prototype;

    Window_SATBForceStopCmd.prototype = Object.create($$);

    var $ = Window_SATBForceStopCmd.prototype;

    $.constructor = Window_SATBForceStopCmd;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {()} _onForceStop: The force stop trigger event listener

    /**
     * Idempotent
     * @constructor @since v0.02a @version v0.03a
     * @param {()} onForceStop - The on touch listener attached to this window
     */
    $.initialize = function(onForceStop) {
        this._onForceStop = onForceStop;
        $$.initialize.call(this, {
            lineHParam: "forceATBStopCmdWinLineH",
            textSizeParam: "forceATBStopCmdTextSize",
            paddingParam: "forceATBStopCmdWinPadding",
            textPaddingParam: "forceATBStopCmdTextPadding",
            backOpacityParam: "forceATBStopCmdBackOpacity",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBStopCmdWin",
            winXParam: "forceATBStopCmdWinX",
            winYParam: "forceATBStopCmdWinY",
            winWParam: "forceATBStopCmdWinW",
            winHParam: "forceATBStopCmdWinH",
            textXParam: "forceATBStopCmdTextXOffset",
            textYParam: "forceATBStopCmdTextYOffset"
        });
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.05b @version v0.05b
     */
    $.clear = function() {
        delete this._onForceStop; // It's bound to the battle scene
        this.close(); // A window that's about to be erased should be closed
    }; // $.clear

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.04a @version v0.04a
     */
    $.refresh = function() {
        $$.refresh.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $.refresh

    /**
     * Hotspot
     * @override @since v0.02a @version v0.02a
     */
    $._updateAll = function() {
        if (this._isForceStopKeyTriggered()) this._onTouch();
    }; // $._updateAll

    /**
     * Hotspot/Idempotent
     * @override @since v0.02a @version v0.04a
     */
    $._updateWhenVisible = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $._updateWhenVisible

    /**
     * Hotspot/Nullipotent
     * @override @since v0.02a @version v0.04a
     * @returns {String} The current ATB force status description text
     */
    $._formattedText = function() {
        return SATBManager.funcParam.call(this, "forceStopATBCmdText", "_text");
    }; // $._formattedText

    /**
     * Hotspot/Pure Function
     * @override @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $._canTouch = function() { return true; };

    /**
     * @override @since v0.02a @version v0.04a
     */
    $._onTouch = function() {
        this._isEnabled ? this._onTouchOk() : SoundManager.playBuzzer();
    }; // $._onTouch

    /**
     * @override @since v0.05b @version v0.05b
     */
    $._onTouchOk = function() {
        SoundManager.playOk();
        this._onForceStop();
        this.refresh();
    }; // $._onTouchOk

    /**
     * Hotspot/Nullipotent
     * @since v0.02a @version v0.04a
     * @returns {Boolean} The check result
     */
    $._isForceStopKeyTriggered = function() {
        // The function probably always returns the same keymap constant anyway
        var forceStopKey = $gameSystem.satbParamFunc("forceStopATBKey")();
        return Input.isTriggered(forceStopKey);
        //
    }; // $._isForceStopKeyTriggered

})(); // Window_SATBForceStopCmd.prototype

/*----------------------------------------------------------------------------
 *    # (v0.02a+)New class: Window_SATBForceStatus
 *      - Handles the ATB force hotkeys and shows the ATB force status
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    Window_SATBForceStatus.prototype = Object.create(Window_SATBBase.prototype);

    var $ = Window_SATBForceStatus.prototype, $$ = Window_SATBBase.prototype;
    var _SATB = SATB.Window_SATBForceStatus = {};

    $.constructor = Window_SATBForceStatus;

    _SATB._FORCE_RUN = "run", _SATB._FORCE_STOP = "stop";

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {ATBForceState} _forceState: The ATB force status

    /**
     * Idempotent
     * @constructor @since v0.02a @version v0.03a
     */
    $.initialize = function() {
        this._forceState = "";
        $$.initialize.call(this, {
            lineHParam: "forceATBStatWinLineH",
            textSizeParam: "forceATBStatTextSize",
            paddingParam: "forceATBStatWinPadding",
            textPaddingParam: "forceATBStatTextPadding",
            backOpacityParam: "forceATBStatBackOpacity",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBStatWin",
            winXParam: "forceATBStatWinX",
            winYParam: "forceATBStatWinY",
            winWParam: "forceATBStatWinW",
            winHParam: "forceATBStatWinH",
            textXParam: "forceATBStatTextXOffset",
            textYParam: "forceATBStatTextYOffset"
        });
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.04a @version v0.04a
     */
    $.refresh = function() {
        $$.refresh.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $.refresh

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $.isForceRun = function() { return this._forceState === _SATB._FORCE_RUN; };

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $.isForceStop = function() {
        return this._forceState === _SATB._FORCE_STOP;
    }; // $.isForceStop

    /**
     * @interface @since v0.02a @version v0.04a
     */
    $.onForceRun = function() {
        this._onForceStateChange("isForceStop", _SATB._FORCE_RUN);
    }; // $.onForceRun

    /**
     * @interface @since v0.02a @version v0.04a
     */
    $.onForceStop = function() {
        this._onForceStateChange("isForceRun", _SATB._FORCE_STOP);
    }; // $.onForceStop

    /**
     * Hotspot/Idempotent
     * @override @since v0.02a @version v0.04a
     */
    $._updateWhenVisible = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $._updateWhenVisible

    /**
     * Hotspot/Nullipotent
     * @override @since v0.02a @version v0.04a
     * @returns {String} The current ATB force status description text
     */
    $._formattedText = function() {
        return SATBManager.funcParam.call(this, this._textParam(), "_text");
    }; // $._formattedText

    /**
     * Hotspot/Nullipotent
     * @override @since v0.02a @version v0.02a
     * @enum @returns {Param} Parameter of the ATB force status description text
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._textParam = function() {
        switch (this._forceState) {
            case _SATB._FORCE_RUN: return "forceRunATBStatText";
            case _SATB._FORCE_STOP: return "forceStopATBStatText";
            default: return "noForceATBText";
        }
    }; // $._textParam

    /**
     * @since v0.05b @version v0.05b
     * @enum @param {String} checkStateFunc - isForceStop/isForceRun
     * @enum @param {ATBForceState} terminalState - _FORCE_RUN/_FORCE_STOP
     */
    $._onForceStateChange = function(checkStateFunc, terminalState) {
        var forceState = this._forceState;
        this._forceState = this[checkStateFunc]() ? "" : terminalState;
        if (forceState !== this._forceState) this.refresh();
    }; // $._onForceStateChange

})(DoubleX_RMMV.SATB); // Window_SATBForceStatus.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Edits the high level battle flow structure to run this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Scene_Battle = { orig: {}, new: {} };
    var _SB = SATB.Scene_Battle.orig, $ = Scene_Battle.prototype;
    var _SATB = SATB.Scene_Battle.new, WBS = SATB.Window_BattleStatus.new;

    _SATB._DEACTIVATE_HIDE_SELECTION_WIN = function(win) {
        // It's pointless to extract these codes into a new method
        if (win.active) win.deactivate();
        if (win.visible) win.hide();
        // These selection windows can't be inactive but visible
    }; // _SATB._DEACTIVATE_HIDE_SELECTION_WIN
    _SATB._IS_VISIBLE = function(win) { return win.visible; };
    _SATB._REFRESH_DESELECT_TARGET_WIN = function(refreshWin, deselectWin) {
        refreshWin.refresh();
        deselectWin.deselect();
    }; // _SATB._REFRESH_DESELECT_TARGET_WIN

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} canLastEsc: Whether the party can escape in last frame
    //       {Boolean} canLastDisplayWins: Whether the windows can be displayed
    //       {Boolean} isActorSelectUpdated: Whether the actor select's updated
    //       {{Boolean}} wasWinActive: Whether the windows were active before
    //       {Window_SATBForceStatus} forceStatusWin: The force status window
    //       {Window_SATBForceRunCmd} forceRunCmdWin: Force run command window
    //       {Window_SATBForceStopCmd} forceStopCmdWin: Force stop cmd window

    _SB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _SB.initialize.apply(this, arguments);
        // Added to initialize all the new variables as well
        _SATB._init.call(this);
        //
    }; // $.initialize

    _SB.updateBattleProcess = $.updateBattleProcess;
    _SATB.updateBattleProcess = $.updateBattleProcess = function() {
    // v0.00a - v0.04a; Extended
        // Added to abandon the default battle system action input and exec flow
        if (SATBManager.isEnabled()) return _SATB._updateBattleProc.call(this);
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

    _SB.createAllWindows = $.createAllWindows;
    _SATB.createAllWindows = $.createAllWindows = function() {
    // v0.02a - v0.02a; Extended
        _SB.createAllWindows.apply(this, arguments);
        // Added to create the ATB force status window as well
        _SATB._createForceWins.call(this);
        // Always creating it lets the wait module to be enabled during battles
    }; // Scene_Battle.prototype.createAllWindows

    _SB.createStatusWindow = $.createStatusWindow;
    _SATB.createStatusWindow = $.createStatusWindow = function() {
    // v0.04a - v0.04a; Extended
        _SB.createStatusWindow.apply(this, arguments);
        // Added to setup all hotkey handlers to cancel and force actor charges
        _SATB._createCancelForceChargeCooldownHotkeys.call(this);
        //
    }; // $.createStatusWindow

    _SB.createActorCommandWindow = $.createActorCommandWindow;
    _SATB.createActorCommandWindow = $.createActorCommandWindow = function() {
    // v0.01a - v0.01a; Extended
        _SB.createActorCommandWindow.apply(this, arguments);
        // Added to setup all hotkey handlers to select new inputable actors
        _SATB._createActorCmdHotkeys.call(this);
        //
    }; // $.createActorCommandWindow

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
    // v0.00a - v0.04a; Extended
        // Added to setup the inputable actor directly without selectNextCommand
        if (SATBManager.isEnabled()) return _SATB._cmdFight.call(this);
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
        // It's just to play safe even though it should be impossible to happen
        _SB.commandEscape.apply(this, arguments);
    }; // $.commandEscape

    _SB.selectNextCommand = $.selectNextCommand;
    _SATB.selectNextCommand = $.selectNextCommand = function() {
    // v0.00a - v0.04a; Extended
        // Added to avoid setting up the party command window upon next command
        if (SATBManager.isEnabled()) return _SATB._selectNextCmd.call(this);
        //
        _SB.selectNextCommand.apply(this, arguments);
    }; // $.selectNextCommand

    [
        "commandAttack",
        "commandSkill",
        "commandGuard",
        "onActorOk",
        "onEnemyOk",
        "onSkillOk",
        "onItemOk",
        "onSelectAction"
    ].forEach(function(func) {
        _SB[func] = $[func];
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            // Edited to prevent an extremely rare crash from happening
            if (!BattleManager.inputtingAction()) return;
            _SB[func].apply(this, arguments);
            // It's ok to just change to No-op as the windows will be cleaned up
        }; // $[func]
    });

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.04a
     * @returns {Boolean} The check result
     */
    $.isRunSATBFrameUpdate = function() {
        if (!SATBManager.areModulesEnabled(["IsWaitEnabled"])) return true;
        if (this._satb.forceStatusWin.isForceRun()) return true;
        if (this._satb.forceStatusWin.isForceStop()) return false;
        // There are too many probabilistic reasons to changes to be catched
        return !$gameSystem.satbParamFunc("isATBWaitCondMet").call(this);
        // Users are supposed to keep this parameter easy, simple and small
    }; // $.isRunSATBFrameUpdate

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.05b
     */
    $.closeSATBInputWins = function() {
        _SATB._deactivateHideSelectionWins.call(this);
        _SATB._closeDeactivateActorCmdWin.call(this);
        _SATB._closeDeactivatePartyCmdWin.call(this);
        _SATB._eraseWins.call(this);
    }; // $.closeSATBInputWins

    /**
     * Compatibility/Idempotent
     * @interface @since v0.00a @version v0.05b
     * @todo Breaks this excessive large method into several smaller methods
     */
    $.refreshSATBInputWins = function() {
        if (!SATBManager.isEnabled()) return;
        _SATB._refreshWins.call(this);
        // It's possible for the target list/availability to be changed
        if (this._actorWindow.visible) {
            return _SATB._REFRESH_DESELECT_TARGET_WIN(
                    this._actorWindow, this._enemyWindow);
        } else if (this._enemyWindow.visible) {
            return _SATB._REFRESH_DESELECT_TARGET_WIN(
                    this._enemyWindow, this._actorWindow);
        }
        // Invisible selection wins are active only when they can't be shown
        // It's to ensure that the stale targets aren't displayed as selected
        _SATB._deselectTargetWins.call(this);
        // Invisible selection wins are active only when they can't be shown
        // It's possible for the skill/item usability/cost to be changed
        if (this._skillWindow.visible) return this._skillWindow.refresh();
        if (this._itemWindow.visible) return this._itemWindow.refresh();
        // Invisible selection wins are active only when they can't be shown
        // It's possible for the command list/availability to be changed
        _SATB._refreshActiveActorCmdWin.call(this);
        //
    }; // $.refreshSATBInputWins

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.05b
     */
    $.updateSATBActorSelect = function() {
        // Otherwise infinite recursion due to calling changeActor can occur
        if (this._satb.isActorSelectUpdated) return;
        this._satb.isActorSelectUpdated = true;
        _SATB._updateActorSelect.call(this);
        this._satb.isActorSelectUpdated = false;
        //
    }; // $.updateSATBActorSelect

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.02a
     */
    _SATB._init = function() {
        this._satb = { atbForceState: _SATB._NO_FORCE, wasWinActive: {} };
    }; // _SATB._init

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot
     * @since v0.00a @version v0.02a
     */
    _SATB._updateBattleProc = function() {
        // Reconstructs battle system action input and execution flows for atb
        BattleManager.updateCoreSATBTurnAct(); // It must be run per frame
        if (BattleManager.canUpdateSATB()) _SATB._updateCanEsc.call(this);
        // It's possible for an inputable actor to die without ATB update
    }; // _SATB._updateBattleProc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCanEsc = function() {
        // Updates the party escape command availability if the window's active
        if (!this._partyCommandWindow.active) return;
        // It's not worth catching so many probabilistic reasons to changes
        var canEsc = BattleManager.canSATBEsc();
        if (this._satb.canLastEsc === canEsc) return;
        // canSATBEsc is performant enough to be called per frame after all
        this._satb.canLastEsc = canEsc;
        this._partyCommandWindow.refresh();
        //
    }; // _SATB._updateCanEsc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._updateInputWins = function() {
        if (!SATBManager.isEnabled()) return;
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
     * Compatibility/Idempotent
     * @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    _SATB._displayWins = function() {
        /** @todo Checks if party cmd win can be active with inputting actor */
        if (!BattleManager.actor()) {
            return _SATB._displayWinWithNoInputtingActor.call(this);
        }
        //
        this._actorCommandWindow.open();
        var wasWinActive = this._satb.wasWinActive;
        if (wasWinActive._actorWindow) return this.selectActorSelection();
        if (wasWinActive._enemyWindow) return this.selectEnemySelection();
        if (wasWinActive._skillWindow) return this.commandSkill();
        if (wasWinActive._itemWindow) return this.commandItem();
        /** @todo Ensures the actor command window really selects last cmd */
        this.startActorCommandSelection();
        //
    }; // _SATB._displayWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._displayWinWithNoInputtingActor = function() {
      if (this._partyCommandWindow.active) this._partyCommandWindow.setup();
    }; // _SATB._displayWinWithNoInputtingActor

    /**
     * The this pointer is Scene_Battle.prototype
     * Compatibility/Idempotent
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
     * Compatibility/Hotspot/Idempotent
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
     * @since v0.00a @version v0.04a
     * @returns {Boolean} The check result
     */
    _SATB._isUpdateActorWinPos = function() {
        if (!SATBManager.isEnabled()) return false;
        if (!this._actorWindow.visible) return false;
        return this._actorWindow.x !== this._statusWindow.x;
    }; // _SATB._isUpdateActorWinPos

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceWins = function() {
        _SATB._createForceStatusWin.call(this);
        _SATB._createForceRunCmdWin.call(this);
        _SATB._createForceStopCmdWin.call(this);
    }; // _SATB._createForceWins

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.02a
     */
    _SATB._createForceStatusWin = function() {
        this._satb.forceStatusWin = new Window_SATBForceStatus();
        this.addWindow(this._satb.forceStatusWin);
    }; // _SATB._createForceStatusWin

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceRunCmdWin = function() {
        this._satb.forceRunCmdWin =
                new Window_SATBForceRunCmd(_SATB._onForceRun.bind(this));
        this.addWindow(this._satb.forceRunCmdWin);
    }; // _SATB._createForceRunCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATB._onForceRun = function() {
        this._satb.forceStopCmdWin.setIsEnabled(true);
        this._satb.forceStatusWin.onForceRun();
        if (!this._satb.forceStatusWin.isForceRun()) return;
        this._satb.forceRunCmdWin.setIsEnabled(false);
    }; // _SATB._onForceRun

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceStopCmdWin = function() {
        this._satb.forceStopCmdWin =
                new Window_SATBForceStopCmd(_SATB._onForceStop.bind(this));
        this.addWindow(this._satb.forceStopCmdWin);
    }; // _SATB._createForceStopCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATB._onForceStop = function() {
        this._satb.forceRunCmdWin.setIsEnabled(true);
        this._satb.forceStatusWin.onForceStop();
        if (!this._satb.forceStatusWin.isForceStop()) return;
        this._satb.forceStopCmdWin.setIsEnabled(false);
    }; // _SATB._onForceStop

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATB._createCancelForceChargeCooldownHotkeys = function() {
        _SATB._createCancelChargeHotkeys.call(this);
        _SATB._createForceChargeHotkeys.call(this);
        _SATB._createCancelCooldownHotkeys.call(this);
    }; // _SATB._createCancelForceChargeCooldownHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATB._createCancelChargeHotkeys = function() {
        var cancelKeys = $gameSystem.satbParamFunc("cancelChargeATBKeys")();
        cancelKeys.forEach(_SATB._createCancelChargeHotkey, this);
    }; // _SATB._createCancelChargeHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to cancel the charging ATB
     */
    _SATB._createCancelChargeHotkey = function(hotkey, i) {
        this._statusWindow.addHandlers(hotkey,
                [$gameParty.onTryCancelActorChargeSATB.bind($gameParty, i)]);
    }; // _SATB._createCancelChargeHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATB._createForceChargeHotkeys = function() {
        var forceKeys = $gameSystem.satbParamFunc("forceChargeATBKeys")();
        forceKeys.forEach(_SATB._createForceChargeHotkey, this);
    }; // _SATB._createForceChargeHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.05b
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to force the charging ATB
     */
    _SATB._createForceChargeHotkey = function(hotkey, i) {
        _SATB._createStartForceChargeHotkey.call(this, hotkey, i);
        _SATB._createEndForceChargeHotkey.call(this, hotkey, i);
    }; // _SATB._createForceChargeHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to force the charging ATB
     */
    _SATB._createStartForceChargeHotkey = function(hotkey, i) {
        var startKey = WBS.START_FORCE_CHARGE_KEY(hotkey);
        this._statusWindow.setHandler(startKey,
                $gameParty.onTryStartForceActorChargeSATB.bind($gameParty, i));
    }; // _SATB._createStartForceChargeHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to force the charging ATB
     */
    _SATB._createEndForceChargeHotkey = function(hotkey, i) {
        var endKey = WBS.END_FORCE_CHARGE_KEY(hotkey);
        this._statusWindow.setHandler(endKey,
                $gameParty.onTryEndForceActorChargeSATB.bind($gameParty, i));
    }; // _SATB._createEndForceChargeHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05a @version v0.05a
     */
    _SATB._createCancelCooldownHotkeys = function() {
        var cancelKeys = $gameSystem.satbParamFunc("cancelCooldownATBKeys")();
        cancelKeys.forEach(_SATB._createCancelCooldownHotkey, this);
    }; // _SATB._createCancelCooldownHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05a @version v0.05a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to cancel the charging ATB
     */
    _SATB._createCancelCooldownHotkey = function(hotkey, i) {
        this._statusWindow.addHandlers(hotkey,
                [$gameParty.onTryCancelActorCooldownSATB.bind($gameParty, i)]);
    }; // _SATB._createCancelCooldownHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.01a @version v0.02a
     */
    _SATB._createActorCmdHotkeys = function() {
        // It's ok to create them now so the Hotkey Module can be enabled later
        _SATB._createPrevActorCmdHotkey.call(this);
        _SATB._createNextActorCmdHotkey.call(this);
        _SATB._createActorCmdIndexHotkeys.call(this);
        //
    }; // _SATB._createActorCmdHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.02a @version v0.02a
     */
    _SATB._createPrevActorCmdHotkey = function() {
        var prevKey = $gameSystem.satbParamFunc("prevInputableActorKey")();
        this._actorCommandWindow.setHandler(prevKey,
                _SATB._onTrySelectPrevNextActorByHotkey.bind(this, -1));
    }; // _SATB._createPrevActorCmdHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.02a @version v0.02a
     */
    _SATB._createNextActorCmdHotkey = function() {
        var nextKey = $gameSystem.satbParamFunc("nextInputableActorKey")();
        this._actorCommandWindow.setHandler(
                nextKey, _SATB._onTrySelectPrevNextActorByHotkey.bind(this, 1));
    }; // _SATB._createNextActorCmdHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.01a @version v0.04a
     * @enum @param {Integer} sign - The selection iteration direction(1/-1)
     */
    _SATB._onTrySelectPrevNextActorByHotkey = function(sign) {
        var inputableIndices = $gameParty.inputableSATBActorIndices();
        if (!SATBManager.canSelectPrevNextActor(inputableIndices)) {
            return SoundManager.playBuzzer();
        }
        _SATB._onSelectPrevNextActorByHotkey.call(this, sign, inputableIndices);
    }; // _SATB._onTrySelectPrevNextActorByHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.01a @version v0.04a
     * @enum @param {Integer} sign - The selection iteration direction(1/-1)
     * @param {[Index]} inputableIndices - The inputable actor indices
     */
    _SATB._onSelectPrevNextActorByHotkey = function(sign, inputableIndices) {
        SoundManager.playCursor();
        var newInputableIndex =
                SATBManager.newInputableActorIndex(sign, inputableIndices);
        _SATB._onSelectActor.call(this, newInputableIndex);
    }; // _SATB._onSelectPrevNextActorByHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.02a @version v0.02a
     */
    _SATB._createActorCmdIndexHotkeys = function() {
        var indiceKeys = $gameSystem.satbParamFunc("inputableActorKeys")();
        indiceKeys.forEach(_SATB._createActorCmdIndexHotkey, this);
    }; // _SATB._createActorCmdIndexHotkeys

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.01a @version v0.01a
     * @enum @param {KeyMap} hotkey - The mapping of the hotkey to be handled
     * @param {Index} i - The index of the actor to be selected to input actions
     */
    _SATB._createActorCmdIndexHotkey = function(hotkey, i) {
        this._actorCommandWindow.setHandler(
                hotkey, _SATB._onTrySelectActorIndexByHotkey.bind(this, i));
    }; // _SATB._createActorCmdIndexHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     * @param {Index} i - The index of the actor to be selected to input actions
     */
    _SATB._onTrySelectActorIndexByHotkey = function(i) {
        var newActor_ = $gameParty.members()[i];
        // Playing buzzer sound also works for cancelling the actor charge ATB
        if ($gameParty.isUnselectedSATBInputableActor(newActor_)) {
            return _SATB._onSelectActorIndexByHotkey.call(this, i);
        }
        //
        SoundManager.playBuzzer();
    }; // _SATB._onTrySelectActorIndexByHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     * @param {Index} i - The index of the actor to be selected to input actions
     */
    _SATB._onSelectActorIndexByHotkey = function(i) {
        SoundManager.playCursor();
        _SATB._onSelectActor.call(this, i);
    }; // _SATB._onSelectActorIndexByHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     */
    _SATB._cmdFight = function() {
        // Using nextCommand would cause inputable actor to be avtable instead
        var inputableIndices = $gameParty.inputableSATBActorIndices();
        _SATB._onSelectActor.call(this, inputableIndices[0]);
        //
    }; // _SATB._cmdFight

    /**
     * The this pointer is Scene_Battle.prototype
     * Compatibility
     * @since v0.00a @version v0.00a
     */
    _SATB._selectNextCmd = function() {
        BattleManager.selectNextCommand();
        // So actor cmd win will be immediately setup for next inputable actor
        if (BattleManager.isInputting() && BattleManager.actor()) {
            return this.startActorCommandSelection();
        }
        // Using BattleManager.isInputting() as well is just to play safe
        this.endCommandSelection();
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._deselectTargetWins = function() {
        this._actorWindow.deselect();
        this._enemyWindow.deselect();
    }; // _SATB._deselectTargetWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refreshActiveActorCmdWin = function() {
        if (this._actorCommandWindow.active) this._actorCommandWindow.refresh();
    }; // _SATB._refreshActiveActorCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.05b
     * @todo Breaks this excessive large method into several smaller methods
     */
    _SATB._updateActorSelect = function() {
        var inputableIndices = $gameParty.inputableSATBActorIndices();
        // Using BattleManager._actorIndex wouldn't deselect the only inputable
        var selectedIndex = this._statusWindow.index();
        // Only this._statusWindow.index() always points to the selected actor
        // The selected inputable actor remains inputable so no update's needed
        if (inputableIndices.contains(selectedIndex)) return;
        //
        // Deactivates the active input windows that should be no longer active
        if (selectedIndex >= 0) return _SATB._onDeselectActor.call(this);
        //
        var hasNoInputableActor = inputableIndices.length <= 0;
        // There's no need to setup a new inputable actor in this case
        if (_SATB._isWinWithNoInputtingActorActive.call(this)) {
            return _SATB._updateActivePartyCmdWin.call(
                    this, hasNoInputableActor);
        }
        //
        // Setups new inputable actors to input actions if there's such actors
        if (hasNoInputableActor) return;
        _SATB._onSelectActor.call(this, inputableIndices[0]);
        // It's pointless to extract these codes into a new method
    }; // _SATB._updateActorSelect

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
     * Compatibility/Idempotent
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
     * Compatibility/Idempotent
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
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @returns {[Window_Selectable]} The list of selection windows
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
     * Compatibility/Nullipotent
     * @since v0.05b @version v0.05b
     * @returns {Boolean} The check result
     */
    _SATB._isWinWithNoInputtingActorActive = function() {
        return this._partyCommandWindow.active;
    }; // _SATB._isWinWithNoInputtingActorActive

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Boolean} hasNoInputableActor - Whether there's no inputable actor
     */
    _SATB._updateActivePartyCmdWin = function(hasNoInputableActor) {
        // Deactivates the active input windows that should be no longer active
        if (hasNoInputableActor) _SATB._closeDeactivatePartyCmdWin.call(this);
        //
    }; // _SATB._updateActivePartyCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Compatibility/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._closeDeactivatePartyCmdWin = function() {
        this._partyCommandWindow.close();
        this._partyCommandWindow.deactivate();
    }; // _SATB._closeDeactivatePartyCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    _SATB._eraseWins = function() {
        this._satb.forceRunCmdWin.clear();
        this.removeChild(this._satb.forceRunCmdWin);
        delete this._satb.forceRunCmdWin;
        this._satb.forceStopCmdWin.clear();
        this.removeChild(this._satb.forceStopCmdWin);
        delete this._satb.forceStopCmdWin;
        this._satb.forceStatusWin.close();
        this.removeChild(this._satb.forceStatusWin);
        delete this._satb.forceStatusWin;
    }; // _SATB._eraseWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    _SATB._refreshWins = function() {
        if (this._satb.forceRunCmdWin) this._satb.forceRunCmdWin.refresh();
        if (this._satb.forceStopCmdWin) this._satb.forceStopCmdWin.refresh();
        if (this._satb.forceStatusWin) this._satb.forceStatusWin.refresh();
        /** @todo Considers calling this to play safe */
        // this.updateSATBActorSelect();
        // Right now it causes the selected actor to have wrong escape pose
    }; // _SATB._refreshWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Index} i - The index of the inputable actor in the party
     */
    _SATB._onSelectActor = function(i) {
        BattleManager.changeActor(i, 'waiting');
        this.startActorCommandSelection();
    }; // _SATB._onSelectActor

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
