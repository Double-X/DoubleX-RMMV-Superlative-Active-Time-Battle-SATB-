// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Implementations"] = "v0.16a";
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
 *           level and the reasoning behind it
 *         - Thorough comprehension on the essence of RMMV ATB system plugins
 *           and the reasoning behind it
 *         - Thorough comprehension on the essence of the default RMMV battle
 *           system implementations and the reasoning behind it
 *         - Advanced RMMV plugin development proficiency to fully comprehend
 *           this implementation plugin
 *           (Thorough comprehension on the essence of RMMV plugin development
 *           and the reasoning behind it with at least 1 advanced complex high
 *           quality plugin written without nontrivial bugs up to 10000 LoC
 *           scale and being a veteran with significant number of plugin
 *           users)
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
 *         (None of these applies to notetags in the Event Module)
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
 *         (None of these applies to notetags in the Event Module)
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
 *         (None of these applies to notetags in the Event Module)
 *         - SATBUT.unitTests.noteTypes
 *         - SATBUT.unitTests.defaultNoteTypes if the notetag has default
 *           values(may or may not be from parameters)
 *         - SATBUT.unitTests.chainedNoteTypes unless there's really nothing
 *           to check for the chained notetag result
 *         - SATBUT.unitTests.noteChainingRules
 *         - SATBUT.unitTests.noteArgObjs if the notetag functions take
 *           argument objects
 *    # Adding new events in the Event Module:
 *      1. Add them in _SATB.RUN_MODULES under SATBManager
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
function Game_SATBActs() { // v0.16a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseTypes
function Game_SATBPhaseTypes() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseTypes
function Game_SATBBasePhase() { // v0.16a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBBasePhase
function Game_SATBPhaseCooldown() { // v0.16a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseCooldown
function Game_SATBPhaseCharge() { // v0.16a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseCharge
function Game_SATBPhaseFill() { // v0.16a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Game_SATBPhaseFill
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
function Sprite_SATBContinuousOrderBattlerIcon() { // v0.14a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Sprite_SATBContinuousOrderBattlerIcon
function Sprite_SATBDiscreteOrderBattlerIcon() { // v0.14a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Sprite_SATBDiscreteOrderBattlerIcon
// It's supposed to be an abstract class
function Window_SATBBarBase() { // v0.06a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBBarBase
//
function Window_SATBBar() { // v0.03a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBBar
function Window_StatusSATBBar() { // v0.06a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_StatusSATBBar
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
function Window_SATBCTB() { // v0.13a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBCTB
function Window_SATBContinuousOrder() { // v0.14a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBContinuousOrder
function Window_SATBDiscreteOrder() { // v0.14a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBDiscreteOrder
function Window_SATBTurnClock() { // v0.11a+
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_SATBTurnClock

/*----------------------------------------------------------------------------
 *    New types
 *----------------------------------------------------------------------------*/
/**
 * @enum @type {String} ATBForceState - stop, norm, run(v0.02a+)
 * @enum @type {String} ATBPhase - fill, charge, cooldown(v0.04a+)
 * @enum @type {String} ChainRule - first, last, +, -, *, /, %, =, some, every
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
 * @enum @type {[String, [String|Number], **]} PluginArgs - The plugin command
 *                                                          argument
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
     * @interface @since v0.00a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> Boolean} filterCallback - The callback in
     *                                                          the Array filter
     *                                                          method
     * @param {*?} filterThis_ - The context of filterCallback
     * @todo Makes fastFilter much faster than filter
     * @returns {[<T>]} - The fully filtered array from this
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
        }, this);
        //
        return newArray;
    }; // $.fastFilter

    /**
     * @interface @since v0.00a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> <U>} mapCallback - The callback in the
     *                                                   Array map method
     * @param {*?} mapThis_ - The context of mapCallback
     * @returns {[<U>]} - The fully mapped array from this
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
        }, this);
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
     * @interface @since v0.00a @version v0.15b
     * @param {(<U>, <T>, Index, [<T>]) -> <U>} reduceCallback - The callback in
     *                                                           the Array
     *                                                           reduce method
     * @param {<U>?} initVal_ - The initial value of reduceCallback
     * @param {*?} reduceThis_ - The context of reduceCallback
     * @returns {<U>} - The fully reduced result from this
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
     * @interface @since v0.00a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> Boolean} filterCallback - The callback in
     *                                                          the Array filter
     *                                                          method
     * @param {(<T>, Index) -> <U>} mapCallback - The callback in the Array map
     *                                            method
     * @param {*?} filterThis_ - The context of filterCallback
     * @param {*?} mapThis_ - The context of mapCallback
     * @returns {[<U>]} - The fully filtered then mapped array from this
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
        }, this);
        //
        return newArray;
    }; // $.filterMap

    /**
     * Chaining map with filter will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in filterCallback
     * @interface @since v0.00a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> <U>} mapCallback - The callback in the
     *                                                   Array map method
     * @param {(<U>, Index) -> Boolean} filterCallback - The callback in the
     *                                                   Array filter method
     * @param {*?} mapThis_ - The context of mapCallback
     * @param {*?} filterThis_ - The context of filterCallback
     * @returns {[<U>]} - The fully mapped then filtered array from this
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
        }, this);
        //
        return newArray;
    }; // $.mapFilter

    /**
     * Chaining map with reduce will lead to a new redundantly throwaway Array
     * This method doesn't support the thisArg argument in reduceCallback
     * @interface @since v0.00a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> <U>} mapCallback - The callback in the
     *                                                   Array map method
     * @param {(<V>, <U>, Index) -> <V>} reduceCallback - The callback in the
     *                                                    Array reduce method
     * @param {<V>?} initVal_ - The initial value of reduceCallback
     * @param {*?} mapThis_ - The context of mapCallback
     * @param {*?} reduceThis_ - The context of reduceCallback
     * @returns {<V>} - The fully mapped then reduced result from this
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
            }, this);
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
     * Chaining map with some will lead to a new redundantly throwaway Array
     * Every element will be mapped before applying some
     * @interface @since v0.14a @version v0.15b
     * @param {(<T>, Index, [<T>]) -> <U>} mapCallback - The callback in the
     *                                                   Array map method
     * @param {(<U>, Indexx, [<U>]) -> Boolean} someCallback - The callback in
     *                                                         the Array some
     *                                                         method
     * @param {*?} mapThis_ - The context of mapCallback
     * @param {*?} someThis_ - The context of someCallback
     * @returns {Boolean} - The fully mapped array then applied some from this
     */
    $.mapSome = $.mapSome || function(mapCallback, someCallback, mapThis_, someThis_) {
        if (this == null) throw new TypeError('this is null or not defined');
        if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        } else if (typeof someCallback !== 'function') {
            throw new TypeError(someCallback + ' is not a function');
        }
        var newArray = [];
        // forEach is tested to be the fastest among sandboxes including RMMV
        this.forEach(function(elem, i) {
            // It's ok to call undefined context with previously bound callbacks
            newArray.push(mapCallback.call(mapThis_, elem, i, this));
            //
        }, this);
        //
        var i = 0, l = newArray.length;
        /** @todo Uses forEach to be faster */
        while (i < l) {
            if (someCallback.call(someThis_, newArray[i], i, newArray)) {
                return true;
            }
            i++;
        }
        //
        return false;
    }; // $.mapSome

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
    }; // $.eraseElem

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
     * @returns {Boolean} The check result
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
     * @returns {Boolean} The check result
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
     * @returns {Boolean} The check result
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
        delete wasPressed[keyName];
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
    _SATB._REG_EXP_SUFFIX_SEPARATOR_OBJ =
            new RegExp(_SATB._REG_EXP_SUFFIX_SEPARATOR);
    _SATB._REG_EXP_SUFFIXES =
            " +(\\w+(?:" + _SATB._REG_EXP_SUFFIX_SEPARATOR + "\\w+)*) *";
    // So alphanumeric characters as well as numbers with decimals are captured
    _SATB.REG_EXP_ENTRY_VAL = "[\/A-Za-z\\d_\.-]+";
    // The / is captured as well to support filepath strings
    _SATB._REG_EXP_ENTRY_SEPARATOR = " *, +";
    _SATB._REG_EXP_ENTRY_SEPARATOR_OBJ =
            new RegExp(_SATB._REG_EXP_ENTRY_SEPARATOR);
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
        // _loadAllNotes should be called once anyway so lazy's not needed
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
        var lines = datum_.note.split(/[\r\n]+/);
        _SATB._readNote.call(this, notes, datum_.id, satb, lines);
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
     * @since v0.00a @version v0.12a
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
        // Otherwise split would corrupt RegExp.$2 and RegExp.$3
        var rawSuffixes = RegExp.$2, rawEntries = RegExp.$3;
        var suffixes = rawSuffixes.split(_SATB._REG_EXP_SUFFIX_SEPARATOR_OBJ);
        var entries = rawEntries.split(_SATB._REG_EXP_ENTRY_SEPARATOR_OBJ);
        //
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
        satb[noteType] = satb[noteType] || [];
        // push is much faster than concat and pairs isn't an array
        satb[noteType].push(_SATB._notePairs.call(
                this, satb.datumType, noteType, suffixes, entries));
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
        return b.satbActSpeed() - a.satbActSpeed();
    }; // _SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY
    _SATB._UPDATE = function(mem) { mem.updateSATB(); }; // v0.10a+
    _SATB._UPDATE_ACT_SPEED = function(speedIncrement, battler) { // v0.14a+
        battler.latestSATBItems.forEach(function(item) {
            // 2000 is the action speed cap in the default RMMV editor
            item.speed = Math.min(item.speed + speedIncrement, 2000);
            //
        });
    }; // _SATB._UPDATE_ACT_SPEED

    /*------------------------------------------------------------------------
     *    New public variable
     *------------------------------------------------------------------------*/
     // {Number} satbAvgAgi: The average agi of all battlers in the battle

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isRefresh: Whether at least 1 battler's refreshed
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
    // v0.00a - v0.16a; Extended
        // Added to clear the currently inputable actor pose for non bundle mode
        if (SATBManager.isEnabled()) return _SATB._selectPreviousCmd.call(this);
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
            // Such invalid cases will be reported in the unit test plugin
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
        if (this._statusWindow) this._statusWindow.refreshSATBBars(battlers);
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
        this.satbAvgAgi = _SATB._avgAgi.call(this);
        this._satb = {};
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
     * @returns {String} The name of the battler function setting the start ATB
     */
    _SATB._startBattleFunc = function() {
        if (this._preemptive) return "setPreemptStartSATB";
        return this._surprise ? "setSurpriseStartSATB" : "setNormStartSATB";
    }; // _SATB._startBattleFunc

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.16a
     */
    _SATB._selectNextCmd = function() {
        var actor = this.actor();
        if (!actor || actor.selectNextCommand()) return;
        actor.didFinishSATBInput();
        // $gameParty.size() must be used or the actor pose will be all wrong
        this.changeActor($gameParty.size(), 'waiting');
        //
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.16a @version v0.16a
     */
    _SATB._selectPreviousCmd = function() {
        var actor = this.actor();
        if (actor && !actor.selectPreviousCommand()) this.clearActor();
    }; // _SATB._selectPreviousCmd

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
        this.satbAvgAgi = _SATB._avgAgi.call(this);
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
     * @since v0.00a @version v0.11a
     */
    _SATB._endAct = function() {
        // It's ok to run this even if the turn clock counter isn't action now
        if (SATBManager.isEnabled()) SATBTurnManager.tickCoreTurnClockAct();
        //
    }; // _SATB._endAct

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    _SATB._endBattle = function() {
        // They can't be placed in Scene_Battle terminate which is too late
        SATBManager.procScene_("cleanupSATBInputWins");
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
     * @todo Thinks of if SceneManager._deltaTime is as correct as Date.now()
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
     * @since v0.00a @version v0.08a
     */
    _SATB._sortActBattlers = function() {
        _SATB._onUpdateActSpeeds.call(this);
        this._actionBattlers.sort(_SATB._SORT_BATTLER_SPEEDS_DESCENDINGLY);
    }; // _SATB._sortActBattlers

    /**
     * This method's semantically idempotent but not technically so
     * The this pointer is BattleManager
     * @since v0.08a @version v0.08a
     */
    _SATB._onUpdateActSpeeds = function() {
        if (SATBManager.areModulesEnabled(["IsSpeedEnabled"])) {
            return $gameSystem.satbParamFunc("updateActSpeeds").call(this);
        }
        _SATB._updateActSpeeds.call(this);
    }; // _SATB._onUpdateActSpeeds

    /**
     * This method's semantically idempotent but not technically so
     * The this pointer is BattleManager
     * @since v0.00a @version v0.14a
     */
    _SATB._updateActSpeeds = function() {
        // 2000 is the action speed cap in the default RMMV editor
        var speedIncrement = 2000.0 / this._actionBattlers.length;
        //
        // Otherwise battlers with slow actions might never execute any action
        this._actionBattlers.forEach(
                _SATB._UPDATE_ACT_SPEED.bind(null, speedIncrement));
        //
    }; // _SATB._updateActSpeeds

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
     * @since v0.00a @version v0.13a
     * @todo Extracts the last 2 lines into a method with a meaningful name
     */
    _SATB._updateCoreATBTurnAct = function() {
        // Placing everything in Scene_Battle would result in a worse spaghetti
        if (SATBManager.procScene_("isRunSATBFrameUpdate")) {
            _SATB._updateCoreATBTurnCTB.call(this);
        }
        //
        // Updates current action when finished execution on the current target
        _SATB._updateAct.call(this);
        //
        _SATB._checkIsRefreshNeeded.call(this);
    }; // _SATB._updateCoreATBTurnAct

    /**
     * Hotspot
     * @since v0.13a @version v0.13a
     */
    _SATB._updateCoreATBTurnCTB = function() {
        do {
            _SATB._updateCoreATBTurn.call(this);
        } while (_SATB._canUpdateCTB.call(this));
    }; // _SATB._updateCoreATBTurnCTB

    /**
     * Hotspot
     * @since v0.02a @version v0.02a
     */
    _SATB._updateCoreATBTurn = function() {
        // So battlers inputting actions automatically can instantly be subjects
        _SATB._update.call(this);
        _SATB._procTurn.call(this);
        //
        // It's ok to run this even if the turn clock counter isn't time now
        SATBTurnManager.updateCoreTurnByTime();
        //
    }; // _SATB._updateCoreATBTurn

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.10a
     */
    _SATB._update = function() {
        this.allBattleMembers().forEach(_SATB._UPDATE);
    }; // _SATB._update

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
     * Hotspot/Nullipotent
     * @since v0.13a @version v0.13a
     * @returns {Boolean} The check result
     * @todo Verifies if they includes all needed conditions and nothing more
     */
    _SATB._canUpdateCTB = function() {
        if (!SATBManager.areModulesEnabled(["IsCTBEnabled"])) return false;
        // Only ATB frame updates that would be run can be skipped
        if (!SATBManager.procScene_("isRunSATBFrameUpdate")) return false;
        //
        // Executing actions and inputting actions should never be skipped
        if (this.isSATBActPhase() || this.isInputting()) return false;
        //
        // Checking isRefreshNeeded is just to play safe
        return this.canUpdateSATB() && !this._satb.isRefreshNeeded;
        //
    }; // _SATB._canUpdateCTB

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
            clockMax: this.coreTurnSecClockMax(),
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
            clockMax: this.coreTurnSecClockMax(),
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
    // {{Number}} _coreTurnClocks: Mapping of all turn clock unit counters
    // {Natural Num?} _coreTurnActClockMax_: The turn clock maximum action
    //                                       counter
    // {Natural Num?} _coreTurnFrameClockMax_: The Turn clock maximum frame
    //                                         counter
    // (v0.11a+){{Number}} _clockSpeeds: Battle turn clock increment multipliers
    // {+ve Num?} _coreTurnSecClockMax_: The Turn clock maximum second counter

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.04a
     */
    SATBTurnManager.init = function() {
        this._clockSpeeds = { act: 1, frame: 1, sec: 1 };
        this._coreTurnClocks = { act: 0, frame: 0, sec: 0.0 };
    }; // SATBTurnManager.init

    /**
     * Script Call/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Number} The current battle turn clock increment multiplier
     */
    SATBTurnManager.curTurnClockSpeed = function() {
        return this._clockSpeeds[this.coreTurnClockUnit()];
    }; // SATBTurnManager.curTurnClockSpeed

    /**
     * Script Call/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Number} The battle turn clock action increment multiplier
     */
    SATBTurnManager.coreTurnActClockSpeed = function() {
        return this._clockSpeeds.act;
    }; // SATBTurnManager.coreTurnActClockSpeed

    /**
     * Script Call/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Number} The battle turn clock frame increment multiplier
     */
    SATBTurnManager.coreTurnFrameClockSpeed = function() {
        return this._clockSpeeds.frame;
    }; // SATBTurnManager.coreTurnFrameClockSpeed

    /**
     * Script Call/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Number} The battle turn clock second increment multiplier
     */
    SATBTurnManager.coreTurnSecClockSpeed = function() {
        return this._clockSpeeds.sec;
    }; // SATBTurnManager.coreTurnSecClockSpeed

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Nonnegative Int} The current turn clock unit counter
     */
    SATBTurnManager.curTurnClock = function() {
        return this._coreTurnClocks[this.coreTurnClockUnit()];
    }; // SATBTurnManager.curTurnClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Int} The number of actions executed in a turn
     */
    SATBTurnManager.coreTurnActClock = function() {
        return this._coreTurnClocks.act;
    }; // SATBTurnManager.coreTurnActClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Int} The number of frames elapsed in a battle turn
     */
    SATBTurnManager.coreTurnFrameClock = function() {
        return this._coreTurnClocks.frame;
    }; // SATBTurnManager.coreTurnFrameClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Nonnegative Num} The number of seconds elapsed in a turn
     */
    SATBTurnManager.coreTurnSecClock = function() {
        return this._coreTurnClocks.sec;
    }; // SATBTurnManager.coreTurnSecClock

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.11a @version v0.11a
     * @returns {Number} The current maximum battle turn clock unit counter
     */
    SATBTurnManager.curTurnClockMax = function() {
        switch (this.coreTurnClockUnit()) {
            case "act": return this.coreTurnActClockMax();
            case "frame": return this.coreTurnFrameClockMax();
            case "sec": return this.coreTurnSecClockMax();
        }
    }; // SATBTurnManager.curTurnClockMax

    /**
     * Script Call/Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.04a
     * @returns {Natural Num} The maximum number of actions a turn can have
     */
    SATBTurnManager.coreTurnActClockMax = function() {
        var param = "coreTurnATBAct", cache = "_coreTurnActClockMax_";
        return SATBManager.funcParam.call(this, param, cache);
    }; // SATBTurnManager.coreTurnActClockMax

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.16a
     * @returns {Natural Num} The maximum number of frames a turn can have
     */
    SATBTurnManager.coreTurnFrameClockMax = function() {
        var cache = "_coreTurnFrameClockMax_", param = "coreTurnATBTime";
        var arg = $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
        return SATBManager.funcParam.call(this, param, cache, undefined, arg);
    }; // SATBTurnManager.coreTurnFrameClockMax

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.16a
     * @returns {+ve Num} The maximum number of seconds a turn can have
     */
    SATBTurnManager.coreTurnSecClockMax = function() {
        var cache = "_coreTurnSecClockMax_", param = "coreTurnATBTime";
        var arg = $gameSystem.satbParamFunc("coreBaseFillATBSec")();
        return SATBManager.funcParam.call(this, param, cache, undefined, arg);
    }; // SATBTurnManager.coreTurnSecClockMax

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
        this.addCoreTurnClockAct(this._coreTurnClocks.act * (multiplier - 1));
        //
    }; // SATBTurnManager.multiplyCoreTurnClockAct

    /**
     * Script Call
     * @interface @since v0.01a @version v0.04a
     * @param {Number} multiplier - Battle turn clock frame counter multiplier
     */
    SATBTurnManager.multiplyCoreTurnClockFrame = function(multiplier) {
        // The action counter will be corrected to be an integer later
        var increment = this._coreTurnClocks.frame * (multiplier - 1);
        this.addCoreTurnClockFrame(increment);
        //
    }; // SATBTurnManager.multiplyCoreTurnClockFrame

    /**
     * Script Call
     * @interface @since v0.01a @version v0.04a
     * @param {Number} multiplier - Battle turn clock second counter multiplier
     */
    SATBTurnManager.multiplyCoreTurnClockSec = function(multiplier) {
        var increment = this._coreTurnClocks.sec * (multiplier - 1);
        this.addCoreTurnClockSec(increment);
    }; // SATBTurnManager.multiplyCoreTurnClockSec

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Int} act - The battle turn clock action counter
     */
    SATBTurnManager.setCoreTurnClockAct = function(act) {
        this.addCoreTurnClockAct(act - this._coreTurnClocks.act);
    }; // SATBTurnManager.setCoreTurnClockAct

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Int} frame - The battle turn clock frame counter
     */
    SATBTurnManager.setCoreTurnClockFrame = function(frame) {
        this.addCoreTurnClockFrame(frame - this._coreTurnClocks.frame);
    }; // SATBTurnManager.setCoreTurnClockFrame

    /**
     * Script Call
     * @interface @since v0.04a @version v0.04a
     * @param {Number} sec - The battle turn clock second counter
     */
    SATBTurnManager.setCoreTurnClockSec = function(sec) {
        this.addCoreTurnClockSec(sec - this._coreTurnClocks.sec);
    }; // SATBTurnManager.setCoreTurnClockSec

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
    SATBTurnManager.addCoreTurnClockSec = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = false, clockMax = this.coreTurnSecClockMax();
        //
        var overflowFunc = _SATB._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        this._updateCoreTurnClock(
                increment, isInt, "sec", clockMax, overflowFunc);
    }; // SATBTurnManager.addCoreTurnClockSec

    /**
     * Script Call
     * @interface @since v0.11a @version v0.11a
     * @param {Number} multiplier - Current turn clock unit increment multiplier
     */
    SATBTurnManager.setCurTurnClockSpeed = function(multiplier) {
        this._clockSpeeds[this.coreTurnClockUnit()] = multiplier;
    }; // SATBTurnManager.setCurTurnClockSpeed

    /**
     * Script Call
     * @interface @since v0.11a @version v0.11a
     * @param {Number} multiplier - Battle turn clock act increment multiplier
     */
    SATBTurnManager.setCoreTurnClockActSpeed = function(multiplier) {
        this._clockSpeeds.act = multiplier;
    }; // SATBTurnManager.setCoreTurnClockActSpeed

    /**
     * Script Call
     * @interface @since v0.11a @version v0.11a
     * @param {Number} multiplier - Battle turn clock frame increment multiplier
     */
    SATBTurnManager.setCoreTurnClockFrameSpeed = function(multiplier) {
        this._clockSpeeds.frame = multiplier;
    }; // SATBTurnManager.setCoreTurnClockFrameSpeed

    /**
     * Script Call
     * @interface @since v0.11a @version v0.11a
     * @param {Number} multiplier - Battle turn clock sec increment multiplier
     */
    SATBTurnManager.setCoreTurnClockSecSpeed = function(multiplier) {
        this._clockSpeeds.sec = multiplier;
    }; // SATBTurnManager.setCoreTurnClockSecSpeed

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
     * @interface @since v0.11a @version v0.11a
     */
    SATBTurnManager.tickCoreTurnClockAct = function() {
        // It should still be run even with speed as 0 in case of clock overflow
        this.addCoreTurnClockAct(this._clockSpeeds.act);
        //
    }; // SATBTurnManager.tickCoreTurnClockAct

    /**
     * Hotspot
     * @interface @since v0.04a @version v0.11a
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    SATBTurnManager.updateCoreTurnByTime = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return this.addCoreTurnClockFrame(this._clockSpeeds.frame);
            } case "coreBaseFillATBSec": {
                /** @todo Thinks of if it's as correct as Date.now() */
                var incrementS = SceneManager._deltaTime;
                //
                var speed = this._clockSpeeds.sec;
                return this.addCoreTurnClockSec(incrementS * speed);
            }
            //
        }
    }; // SATBTurnManager.updateCoreTurnByTime

    /**
     * Hotspot
     * @since v0.04a @version v0.16a
     * @param {Int} increment - The action ATB turn clock increment
     * @param {Boolean} isInt - Whether the ATB turn clock unit is an Integer
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    SATBTurnManager._updateCoreTurnClock = function(increment, isInt, clockUnit, clockMax, overflowFunc) {
        var clock = this._coreTurnClocks;
        clock[clockUnit] += increment;
        if (isInt) clock[clockUnit] = Math.floor(clock[clockUnit]);
        if (clock[clockUnit] < clockMax) {
            SATBManager.procScene_("updateSATBWins");
        } else this._onMaxCoreTurnClock(clockUnit, clockMax, overflowFunc);
    }; // SATBTurnManager._updateCoreTurnClock

    /**
     * Potential Hotspot
     * @since v0.04a @version v0.16a
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    SATBTurnManager._onMaxCoreTurnClock = function(clockUnit, clockMax, overflowFunc) {
      // It's possible to change ATB turn clock unit during the same battle
        if (this.coreTurnClockUnit() !== clockUnit) {
            return SATBManager.procScene_("updateSATBWins");
        } else if (this._canCoreTurnClockOverflow()) {
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
        var param = "canCoreTurnClockOverflow";
        var cache = "_canCoreTurnClockOverflow_";
        return SATBManager.funcParam.call(this, param, cache);
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
        this._coreTurnClocks[clockUnit] -= clockMax;
        // act and frame are integers but the proportion must be a real Number
        var newProportion = this._coreTurnClocks[clockUnit] * 1.0 / clockMax;
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
        var clock = this._coreTurnClocks, unit = otherClockUnitDatum.clockUnit;
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

    _SATB._COUNTDOWN_MODULE = function() { // v0.16a+
        return {
            modules: ["IsCountdownEnabled", "IsEventEnabled"],
            paramFunc: "STATE_ID_FUNC",
            noteFunc: "STATE_ID_NOTE_FUNC"
        };
    }; // _SATB._ZERO_ARG_NOTE_MODULE

    _SATB._ZERO_ARG_NOTE_MODULE = function(modules) { // v0.16a+
        return {
            modules: modules,
            paramFunc: "ZERO_ARG_FUNC",
            noteFunc: "NOTE_FUNC"
        };
    }; // _SATB._ZERO_ARG_NOTE_MODULE

    _SATB.RUN_MODULES = { // v0.06a+
        didFinishInput: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didBecomeActable: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didSetActTimes: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didSetMaxActTimes: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didStartATBFill: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        willCancelCharge: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsChargeEnabled",
            "IsEventEnabled"
        ]),
        didStartForceCharge: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsChargeEnabled",
            "IsEventEnabled"
        ]),
        willCancelCooldown: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsCooldownEnabled",
            "IsEventEnabled"
        ]),
        didCoreATBBecomeFull: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didCoreATBBecomeNotFull: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsEventEnabled"
        ]),
        didChargeATBBecomeNotFull: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsChargeEnabled",
            "IsEventEnabled"
        ]),
        didAddInputableActor: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        // v0.13a+
        didFillCoreATB: _SATB._ZERO_ARG_NOTE_MODULE(["IsEventEnabled"]),
        didFillChargeATB: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsChargeEnabled",
            "IsEventEnabled"
        ]),
        didFillCooldownATB: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsCooldownEnabled",
            "IsEventEnabled"
        ]),
        //
        // v0.12a+
        didDecreaseCountdownStateTurn: _SATB._COUNTDOWN_MODULE(),
        didIncreaseCountdownStateTurn: _SATB._COUNTDOWN_MODULE(),
        //
        // v0.15a+
        didDelayCounterEnd: _SATB._ZERO_ARG_NOTE_MODULE([
            "IsDelayEnabled",
            "IsEventEnabled"
        ]),
        //
    }; // _SATB.RUN_MODULES

    _SATB.IS_VALID_RESULT = function(result) { // v0.04a+; Hotspot
        // Using undefined is most memory efficient and using null's play safe
        return result !== null && result !== undefined;
        //
    }; // _SATB.IS_VALID_RESULT

    _SATB._REFRESH_MEM = function(mem) { mem.refresh(); };

    _SATB._SORT_INPUTABLE_INDICES = function(sign, a, b) { // v0.14a+
        return (a - b) * sign;
    }; // _SATB._SORT_INPUTABLE_INDICES

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
     * @interface @since v0.00a @version v0.14a
     * @param {String} func - Name of the function in Scene_Battle to be called
     * @param {[*]} args_ - The list of arguments of the Scene_Battle function
     * @returns {*?} The result returned by the Scene_Battle function
     */
    SATBManager.procScene_ = function(func, args_) {
        // It serves as a helper function for calling Scene_Battle functions
        if (!BattleManager.isSATBBattle()) return;
        var scene = SceneManager._scene;
        return scene[func].apply(scene, args_ || []);
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
        inputableIndices.sort(_SATB._SORT_INPUTABLE_INDICES.bind(null, sign));
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
    var SATBM = SATB.SATBManager;
    var _GS = SATB.Game_System.orig, _SATB = SATB.Game_System.new;
    var $ = Game_System.prototype, DM = SATB.DataManager.new;

    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC = function(content) { // v0.14a+
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", "continuousOrderSprite", c);
    }, // _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC
    _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC = function(content) { // v0.14a+
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", "discreteOrderSprite", c);
    }, // _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC
    // Using Function.bind would cause the function to have the wrong contect
    _SATB.NOTE_FUNC = function(content) { // v0.04a+; Potential Hotspot
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", c);
    }; // _SATB.NOTE_FUNC
    _SATB.STATE_ID_FUNC = function(content) {// v0.12a+; Potential Hotspot
        return new Function("stateId", "'use strict';\n" + content);
    }; // _SATB.STATE_ID_FUNC
    _SATB.STATE_ID_NOTE_FUNC = function(content) {// v0.12a+; Potential Hotspot
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", "stateId", c);
    }; // _SATB.STATE_ID_NOTE_FUNC
    _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC = function(note) { // v0.16a+
        return SATBManager.updateNoteChainingRule.bind(SATBManager, note);
    }; // _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC
    _SATB._UPDATE_NOTE_DEFAULT_FUNC = function(note) { // v0.16a+
        return SATBManager.updateNoteDefault.bind(SATBManager, note);
    }; // _SATB._UPDATE_NOTE_DEFAULT_FUNC
    _SATB._UPDATE_NOTE_PRIORITIES = function(note) { // v0.16a+
        return SATBManager.updateNotePriorities.bind(SATBManager, note);
    }; // _SATB._UPDATE_NOTE_PRIORITIES
    _SATB.ZERO_ARG_FUNC = function(content) {
        return new Function("'use strict';\n" + content);
    }; // _SATB.ZERO_ARG_FUNC
    //

    _SATB._BOOL_PARAM = function(val) {
        return val && (val === "true" || val !== "false");
    }; // _SATB._BOOL_PARAM
    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC = function(content) { // v0.14a+
        var c = "'use strict';\n" + content;
        return new Function("continuousOrderSprite", c);
    }, // _SATB._CONTINUOUS_ORDER_SPRITE_FUNC
    _SATB._DISCRETE_ORDER_SPRITE_FUNC = function(content) { // v0.14a+
        var c = "'use strict';\n" + content;
        return new Function("discreteOrderSprite", c);
    }, // _SATB._DISCRETE_ORDER_SPRITE_FUNC
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
        try { return _SATB._JSON_PARAM(JSON.parse(val)); } catch (err) {
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
    _SATB._NOTE_START_FUNC = function(content) { // v0.09a+
        var c = "'use strict';\n" + content;
        return new Function("datum", "datumType", "latestStartATBVal", c);
    }; // _SATB._NOTE_START_FUNC
    //

    // The new function argument names must all exactly match with the cfg parts
    _SATB.PARAM_NOTE_FUNCS = {
        params: {
            // Core Module
            IsCoreEnabled: _SATB.ZERO_ARG_FUNC,
            coreBaseFillATBFrame: _SATB.ZERO_ARG_FUNC,
            coreBaseFillATBSec: _SATB.ZERO_ARG_FUNC,
            coreTurnATBTime: function(content) {
                return new Function("baseFillATB", "'use strict';\n" + content);
            }, // coreTurnATBTime
            coreTurnATBAct: _SATB.ZERO_ARG_FUNC,
            canCoreTurnClockOverflow: _SATB.ZERO_ARG_FUNC,
            coreMaxATBVal: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.03a+)Bar Module
            IsBarEnabled: _SATB.ZERO_ARG_FUNC,
            isShowATBBar: _SATB.ZERO_ARG_FUNC,
            atbBarText: _SATB.ZERO_ARG_FUNC,
            atbBarXOffset: _SATB.ZERO_ARG_FUNC,
            atbBarYOffset: _SATB.ZERO_ARG_FUNC,
            atbBarFrameOpacity: _SATB.ZERO_ARG_FUNC, // v0.06a+
            atbBarW: _SATB.ZERO_ARG_FUNC,
            atbBarH: _SATB.ZERO_ARG_FUNC,
            atbBarFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarTextSize: _SATB.ZERO_ARG_FUNC,
            atbBarLineH: _SATB.ZERO_ARG_FUNC,
            atbBarPadding: _SATB.ZERO_ARG_FUNC, // v0.06a+
            atbBarBackOpacity: _SATB.ZERO_ARG_FUNC,
            atbBarWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            atbBarTextXOffset: _SATB.ZERO_ARG_FUNC,
            atbBarTextYOffset: _SATB.ZERO_ARG_FUNC,
            atbBarTextColor: _SATB.ZERO_ARG_FUNC,
            atbBarColor1: _SATB.ZERO_ARG_FUNC,
            atbBarColor2: _SATB.ZERO_ARG_FUNC,
            atbBarBackColor: _SATB.ZERO_ARG_FUNC,
            isShowStatusATBBar: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarText: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarXOffset: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarYOffset: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarFrameOpacity: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarW: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarH: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarTextSize: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarLineH: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarPadding: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarBackOpacity: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            statusATBBarTextXOffset: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarTextYOffset: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarTextColor: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarColor1: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarColor2: _SATB.ZERO_ARG_FUNC, // v0.06a+
            statusATBBarBackColor: _SATB.ZERO_ARG_FUNC, // v0.06a+
            //
            // (v0.01a+)Hotkey Module
            IsHotkeyEnabled: _SATB.ZERO_ARG_FUNC,
            prevInputableActorKey: _SATB.ZERO_ARG_FUNC,
            nextInputableActorKey: _SATB.ZERO_ARG_FUNC,
            inputableActorKeys: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.02a+)Wait Module
            IsWaitEnabled: _SATB.ZERO_ARG_FUNC,
            isATBWaitCondMet: _SATB.ZERO_ARG_FUNC,
            forceRunATBKey: _SATB.ZERO_ARG_FUNC,
            forceStopATBKey: _SATB.ZERO_ARG_FUNC,
            isShowForceATBStatWin: _SATB.ZERO_ARG_FUNC,
            noForceATBText: _SATB.ZERO_ARG_FUNC,
            forceRunATBStatText: _SATB.ZERO_ARG_FUNC,
            forceStopATBStatText: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinX: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinY: _SATB.ZERO_ARG_FUNC,
            forceATBStatOpacity: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatWinW: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinH: _SATB.ZERO_ARG_FUNC,
            forceATBStatFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatTextSize: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinLineH: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinPadding: _SATB.ZERO_ARG_FUNC,
            forceATBStatBackOpacity: _SATB.ZERO_ARG_FUNC,
            forceATBStatWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatTextColor: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStatTextXOffset: _SATB.ZERO_ARG_FUNC,
            forceATBStatTextYOffset: _SATB.ZERO_ARG_FUNC,
            isShowForceATBRunCmdWin: _SATB.ZERO_ARG_FUNC,
            forceRunATBCmdText: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinX: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinY: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdOpacity: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdWinW: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinH: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdTextSize: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinLineH: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinPadding: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdBackOpacity: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdTextColor: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBRunCmdTextXOffset: _SATB.ZERO_ARG_FUNC,
            forceATBRunCmdTextYOffset: _SATB.ZERO_ARG_FUNC,
            isShowForceATBStopCmdWin: _SATB.ZERO_ARG_FUNC,
            forceStopATBCmdText: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinX: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinY: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdOpacity: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdWinW: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinH: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdTextSize: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinLineH: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinPadding: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdBackOpacity: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdTextColor: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            forceATBStopCmdTextXOffset: _SATB.ZERO_ARG_FUNC,
            forceATBStopCmdTextYOffset: _SATB.ZERO_ARG_FUNC,
            //
             // (v0.16a+)Action Module
            IsActEnabled: _SATB.ZERO_ARG_FUNC,
            actMode: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.04a+)Charge Module
            IsChargeEnabled: _SATB.ZERO_ARG_FUNC,
            chargeMaxATBVal: function(content) {
                return new Function("coreMax", "'use strict';\n" + content);
            }, // chargeMaxATBVal
            isPayBeforeExecCharge: _SATB.ZERO_ARG_FUNC,
            cancelChargeATBKeys: _SATB.ZERO_ARG_FUNC,
            forceChargeATBKeys: _SATB.ZERO_ARG_FUNC,
            canCancelCharge: _SATB.ZERO_ARG_FUNC,
            canForceCharge: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.05a+)Cooldown Module
            IsCooldownEnabled: _SATB.ZERO_ARG_FUNC,
            cooldownMaxATBVal: function(content) {
                return new Function("coreMax", "'use strict';\n" + content);
            }, // cooldownMaxATBVal
            cancelCooldownATBKeys: _SATB.ZERO_ARG_FUNC,
            canCancelCooldown: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.12a+)Countdown Module
            IsCountdownEnabled: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.13a+) CTB Module
            IsCTBEnabled: _SATB.ZERO_ARG_FUNC,
            isShowCTBWin: _SATB.ZERO_ARG_FUNC,
            ctbWinText: _SATB.ZERO_ARG_FUNC,
            ctbWinX: _SATB.ZERO_ARG_FUNC,
            ctbWinY: _SATB.ZERO_ARG_FUNC,
            ctbWinOpacity: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinW: _SATB.ZERO_ARG_FUNC,
            ctbWinH: _SATB.ZERO_ARG_FUNC,
            ctbWinFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinTextSize: _SATB.ZERO_ARG_FUNC,
            ctbWinLineH: _SATB.ZERO_ARG_FUNC,
            ctbWinPadding: _SATB.ZERO_ARG_FUNC,
            ctbWinBackOpacity: _SATB.ZERO_ARG_FUNC,
            ctbWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinTextColor: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            ctbWinTextXOffset: _SATB.ZERO_ARG_FUNC,
            ctbWinTextYOffset: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.15a+) Delay Module
            IsDelayEnabled: _SATB.ZERO_ARG_FUNC,
            delaySecs: _SATB.ZERO_ARG_FUNC,
            //
            IsEventEnabled: _SATB.ZERO_ARG_FUNC, // (v0.06a+)Event Module
            // (v0.14a+) Order Module
            IsOrderEnabled: _SATB.ZERO_ARG_FUNC,
            isShowContinuousOrderWin: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinX: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinY: _SATB.ZERO_ARG_FUNC,
            continuousOrderOpacity: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinW: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinH: _SATB.ZERO_ARG_FUNC,
            continuousOrderFontFace: _SATB.ZERO_ARG_FUNC,
            continuousOrderTextSize: _SATB.ZERO_ARG_FUNC,
            continuousOrderLineH: _SATB.ZERO_ARG_FUNC,
            continuousOrderPadding: _SATB.ZERO_ARG_FUNC,
            continuousOrderBackOpacity: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinskinPath: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinskinFile: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinskinHue: _SATB.ZERO_ARG_FUNC,
            continuousOrderWinskinSmooth: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarX: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarY: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarW: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarH: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarColor1: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownBarColor2: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownTextColor: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownText: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownTextX: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownTextY: _SATB.ZERO_ARG_FUNC,
            continuousOrderCooldownTextAlign: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarX: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarY: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarW: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarH: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarColor1: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreBarColor2: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreTextColor: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreText: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreTextX: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreTextY: _SATB.ZERO_ARG_FUNC,
            continuousOrderCoreTextAlign: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarX: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarY: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarW: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarH: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarColor1: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeBarColor2: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeTextColor: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeText: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeTextX: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeTextY: _SATB.ZERO_ARG_FUNC,
            continuousOrderChargeTextAlign: _SATB.ZERO_ARG_FUNC,
            continuousOrderSpriteOpacity: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconFolder:
                    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconFilename:
                    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconHue: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconSmooth:
                    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconXCoor: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconYCoor: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconSourceW:
                    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconSourceH:
                    _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconW: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteIconH: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            continuousOrderSpriteY: _SATB._CONTINUOUS_ORDER_SPRITE_FUNC,
            isShowDiscreteOrderWin: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinX: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinY: _SATB.ZERO_ARG_FUNC,
            discreteOrderOpacity: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinW: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinH: _SATB.ZERO_ARG_FUNC,
            discreteOrderPadding: _SATB.ZERO_ARG_FUNC,
            discreteOrderBackOpacity: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinskinPath: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinskinFile: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinskinHue: _SATB.ZERO_ARG_FUNC,
            discreteOrderWinskinSmooth: _SATB.ZERO_ARG_FUNC,
            showingDiscreteOrderBattlerSpriteOpacity:
                    _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            hidingDiscreteOrderBattlerSpriteOpacity:
                    _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteX: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteY: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteTargetOpacity: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconFolder: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconFilename: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconHue: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconSmooth: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconXCoor: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconYCoor: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconSourceW: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconSourceH: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconW: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            discreteOrderSpriteIconH: _SATB._DISCRETE_ORDER_SPRITE_FUNC,
            //
            // (v0.10a+) Rate Module
            IsRateEnabled: _SATB.ZERO_ARG_FUNC,
            coreATBRate: _SATB.ZERO_ARG_FUNC,
            chargeATBRate: _SATB.ZERO_ARG_FUNC,
            cooldownATBRate: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.07a+) Reset Module
            IsResetEnabled: _SATB.ZERO_ARG_FUNC,
            resetATBVal: function(content) {
                var c = "'use strict';\n" + content;
                return new Function("latestResetATBVal", c);
            }, // resetATBVal
            //
            // (v0.08a+) Speed Module
            IsSpeedEnabled: _SATB.ZERO_ARG_FUNC,
            updateActSpeeds: _SATB.ZERO_ARG_FUNC,
            actSpeed: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.09a+) Start Module
            IsStartEnabled: _SATB.ZERO_ARG_FUNC,
            normStartATBVal: _SATB.ZERO_ARG_FUNC,
            preemptStartATBVal: _SATB.ZERO_ARG_FUNC,
            surpriseStartATBVal: _SATB.ZERO_ARG_FUNC,
            //
            // (v0.11a+) Turn Module
            IsTurnEnabled: _SATB.ZERO_ARG_FUNC,
            isShowBattleTurnClockWin: _SATB.ZERO_ARG_FUNC,
            battleTurnClockText: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinX: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinY: _SATB.ZERO_ARG_FUNC,
            battleTurnClockOpacity: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockWinW: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinH: _SATB.ZERO_ARG_FUNC,
            battleTurnClockFontFace: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockTextSize: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinLineH: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinPadding: _SATB.ZERO_ARG_FUNC,
            battleTurnClockBackOpacity: _SATB.ZERO_ARG_FUNC,
            battleTurnClockWinskinPath: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockWinskinFile: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockWinskinHue: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockWinskinSmooth: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockTextColor: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockTextAlign: _SATB.ZERO_ARG_FUNC, // v0.14a+
            battleTurnClockTextXOffset: _SATB.ZERO_ARG_FUNC,
            battleTurnClockTextYOffset: _SATB.ZERO_ARG_FUNC
            //
        }, // params
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(content) { // Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestMax", c);
            },
            coreActState: _SATB.NOTE_FUNC,
            isBarVisible: _SATB.NOTE_FUNC, // v0.04a+
            isStatusBarVisible: _SATB.NOTE_FUNC, // v0.06a+
            actCost: function(content) { // v0.16a+; Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestActCost", c);
            }, // actCost
            actMode:  _SATB.NOTE_FUNC, // v0.16a+
            chargeMax: function(content) { // v0.04a+; Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestChargeMax", c);
            }, // chargeMax
            isPayBeforeExecCharge: _SATB.NOTE_FUNC, // v0.04a+
            canCancelCharge: _SATB.NOTE_FUNC, // v0.04a+
            canForceCharge: _SATB.NOTE_FUNC, // v0.04a+
            cooldownMax: function(content) { // v0.05a+; Potential Hotspot
                var c = "'use strict';\n" + content;
                return new Function(
                        "datum", "datumType", "latestCooldownMax", c);
            }, // cooldownMax
            canCancelCooldown: _SATB.NOTE_FUNC, // v0.05a+
            countdown: _SATB.NOTE_FUNC, // v0.12a+
            delay: _SATB.NOTE_FUNC, // v0.15a+
            continuousOrderSpriteOpacity:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconFolder:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconFilename:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconHue:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconSmooth:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconXCoor:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconYCoor:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconSourceW:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconSourceH:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconW:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteIconH:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            continuousOrderSpriteY:
                    _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteTargetOpacity:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconFolder:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconFilename:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconHue:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconSmooth:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconXCoor:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconYCoor:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconSourceW:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconSourceH:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconW:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            discreteOrderSpriteIconH:
                    _SATB._DISCRETE_ORDER_SPRITE_NOTE_FUNC, // v0.14a+
            coreATBRate: _SATB.NOTE_FUNC, // v0.10a+
            chargeATBRate: _SATB.NOTE_FUNC, // v0.10a+
            cooldownATBRate: _SATB.NOTE_FUNC, // v0.10a+
            resetATBVal: function(content) { // v0.07a+
                var c = "'use strict';\n" + content;
                return new Function(
                        "datum", "datumType", "latestResetATBVal", c);
            }, // resetATBVal
            actSpeed: function(content) { // v0.08a+
                var c = "'use strict';\n" + content;
                return new Function("datum", "datumType", "latestActSpeed", c);
            }, // actSpeed
            normStartATBVal: _SATB._NOTE_START_FUNC, // v0.09a+
            preemptStartATBVal: _SATB._NOTE_START_FUNC, // v0.09a+
            surpriseStartATBVal: _SATB._NOTE_START_FUNC // v0.09a+
            //
        } // notes
    }; // _SATB.PARAM_NOTE_FUNCS
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        var funcs = _SATB.PARAM_NOTE_FUNCS, runNote = SATBM.RUN_MODULES[note];
        funcs.params[note] = _SATB[runNote.paramFunc];
        funcs.notes[note] = _SATB[runNote.noteFunc];
    });
    //
    /** @todo Minimizes memory leaks while still minimizing work to add param */
    _SATB._PARAM_UPDATES = {
        // Core Module
        coreBaseFillATBFrame: SATBManager.invalidateParamCache,
        coreBaseFillATBSec: SATBManager.invalidateParamCache,
        coreTurnATBTime: SATBManager.invalidateParamCache,
        coreTurnATBAct: SATBManager.invalidateParamCache,
        canCoreTurnClockOverflow: SATBManager.invalidateParamCache,
        coreMaxATBVal: _SATB._UPDATE_NOTE_DEFAULT_FUNC("coreMax"),
        _coreMaxATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("coreMax"),
        _coreMaxATBValNotePriorities: _SATB._UPDATE_NOTE_PRIORITIES("coreMax"),
        _coreActStateNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("coreActState"),
        //
        // (v0.04a+)Bar Module
        isShowATBBar: _SATB._UPDATE_NOTE_DEFAULT_FUNC("isBarVisible"),
        atbBarText: SATBManager.invalidateParamCache,
        atbBarXOffset: SATBManager.invalidateParamCache,
        atbBarYOffset: SATBManager.invalidateParamCache,
        atbBarFrameOpacity: SATBManager.invalidateParamCache, // v0.14a+
        atbBarW: SATBManager.invalidateParamCache,
        atbBarH: SATBManager.invalidateParamCache,
        atbBarFontFace: SATBManager.invalidateParamCache, // v0.14a+
        atbBarTextSize: SATBManager.invalidateParamCache,
        atbBarLineH: SATBManager.invalidateParamCache,
        atbBarPadding: SATBManager.invalidateParamCache, // v0.14a+
        atbBarBackOpacity: SATBManager.invalidateParamCache,
        atbBarWinskinPath: SATBManager.invalidateParamCache, // v0.14a+
        atbBarWinskinFile: SATBManager.invalidateParamCache, // v0.14a+
        atbBarWinskinHue: SATBManager.invalidateParamCache, // v0.14a+
        atbBarWinskinSmooth: SATBManager.invalidateParamCache, // v0.14a+
        atbBarTextAlign: SATBManager.invalidateParamCache, // v0.14a+
        atbBarTextXOffset: SATBManager.invalidateParamCache,
        atbBarTextYOffset: SATBManager.invalidateParamCache,
        atbBarTextColor: SATBManager.invalidateParamCache,
        atbBarColor1: SATBManager.invalidateParamCache,
        atbBarColor2: SATBManager.invalidateParamCache,
        atbBarBackColor: SATBManager.invalidateParamCache,
        _isBarVisibleNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("isBarVisible"),
        _isBarVisibleNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("isBarVisible"),
        isShowStatusATBBar: // v0.06a+
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("isStatusBarVisible"),
        statusATBBarText: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarXOffset: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarYOffset: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarFrameOpacity: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarW: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarH: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarFontFace: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarTextSize: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarLineH: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarPadding: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarBackOpacity: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarWinskinPath: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarWinskinFile: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarWinskinHue: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarWinskinSmooth: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarTextAlign: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarTextXOffset: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarTextYOffset: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarTextColor: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarColor1: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarColor2: SATBManager.invalidateParamCache, // v0.14a+
        statusATBBarBackColor: SATBManager.invalidateParamCache, // v0.14a+
        _isStatusBarVisibleNoteChainingRule: // v0.06a+
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("isStatusBarVisible"),
        _isStatusBarVisibleNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("isStatusBarVisible"), // v0.06a+
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
        forceATBStatOpacity: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatWinW: SATBManager.invalidateParamCache,
        forceATBStatWinH: SATBManager.invalidateParamCache,
        forceATBStatFontFace: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatTextSize: SATBManager.invalidateParamCache,
        forceATBStatWinLineH: SATBManager.invalidateParamCache,
        forceATBStatWinPadding: SATBManager.invalidateParamCache,
        forceATBStatBackOpacity: SATBManager.invalidateParamCache,
        forceATBStatWinskinPath: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatWinskinFile: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatWinskinHue: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatWinskinSmooth: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatTextColor: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatTextAlign: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStatTextXOffset: SATBManager.invalidateParamCache,
        forceATBStatTextYOffset: SATBManager.invalidateParamCache,
        isShowForceATBRunCmdWin: SATBManager.invalidateParamCache,
        forceRunATBCmdText: SATBManager.invalidateParamCache,
        forceATBRunCmdWinX: SATBManager.invalidateParamCache,
        forceATBRunCmdWinY: SATBManager.invalidateParamCache,
        forceATBRunCmdOpacity: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdWinW: SATBManager.invalidateParamCache,
        forceATBRunCmdWinH: SATBManager.invalidateParamCache,
        forceATBRunCmdFontFace: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdTextSize: SATBManager.invalidateParamCache,
        forceATBRunCmdWinLineH: SATBManager.invalidateParamCache,
        forceATBRunCmdWinPadding: SATBManager.invalidateParamCache,
        forceATBRunCmdBackOpacity: SATBManager.invalidateParamCache,
        forceATBRunCmdWinskinPath: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdWinskinFile: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdWinskinHue: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdWinskinSmooth: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdTextColor: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdTextAlign: SATBManager.invalidateParamCache, // v0.14a+
        forceATBRunCmdTextXOffset: SATBManager.invalidateParamCache,
        forceATBRunCmdTextYOffset: SATBManager.invalidateParamCache,
        isShowForceATBStopCmdWin: SATBManager.invalidateParamCache,
        forceStopATBCmdText: SATBManager.invalidateParamCache,
        forceATBStopCmdWinX: SATBManager.invalidateParamCache,
        forceATBStopCmdWinY: SATBManager.invalidateParamCache,
        forceATBStopCmdOpacity: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdWinW: SATBManager.invalidateParamCache,
        forceATBStopCmdWinH: SATBManager.invalidateParamCache,
        forceATBStopCmdFontFace: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdTextSize: SATBManager.invalidateParamCache,
        forceATBStopCmdWinLineH: SATBManager.invalidateParamCache,
        forceATBStopCmdWinPadding: SATBManager.invalidateParamCache,
        forceATBStopCmdBackOpacity: SATBManager.invalidateParamCache,
        forceATBStopCmdWinskinPath: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdWinskinFile: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdWinskinHue: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdWinskinSmooth: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdTextColor: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdTextAlign: SATBManager.invalidateParamCache, // v0.14a+
        forceATBStopCmdTextXOffset: SATBManager.invalidateParamCache,
        forceATBStopCmdTextYOffset: SATBManager.invalidateParamCache,
        //
        // (v0.16a+)Action Module
        _actCostNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("actCost"),
        _actCostNotePriorities: _SATB._UPDATE_NOTE_PRIORITIES("actCost"),
        actMode: _SATB._UPDATE_NOTE_DEFAULT_FUNC("actMode"),
        _actModeNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("actMode"),
        _actModeNotePriorities: _SATB._UPDATE_NOTE_PRIORITIES("actMode"),
        //
        // (v0.04a+)Charge Module
        chargeMaxATBVal: _SATB._UPDATE_NOTE_DEFAULT_FUNC("chargeMax"),
        _chargeMaxATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("chargeMax"),
        _chargeMaxATBValNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("chargeMax"),
        isPayBeforeExecCharge:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("isPayBeforeExecCharge"),
        _isPayBeforeExecChargeNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("isPayBeforeExecCharge"),
        _isPayBeforeExecChargeNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("isPayBeforeExecCharge"),
        canCancelCharge: _SATB._UPDATE_NOTE_DEFAULT_FUNC("canCancelCharge"),
        _canCancelChargeNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("canCancelCharge"),
        _canCancelChargeNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("canCancelCharge"),
        canForceCharge: _SATB._UPDATE_NOTE_DEFAULT_FUNC("canForceCharge"),
        _canForceChargeNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("canForceCharge"),
        _canForceChargeNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("canForceCharge"),
        //
        // (v0.05a+)Cooldown Module
        cooldownMaxATBVal: _SATB._UPDATE_NOTE_DEFAULT_FUNC("cooldownMax"),
        _cooldownMaxATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("cooldownMax"),
        _cooldownMaxATBValNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("cooldownMax"),
        canCancelCooldown: _SATB._UPDATE_NOTE_DEFAULT_FUNC("canCancelCooldown"),
        _canCancelCooldownNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("canCancelCooldown"),
        _canCancelCooldownNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("canCancelCooldown"),
        //
        // (v0.12a+)Countdown Module
        _countdownNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("countdown"),
        //
        // (v0.14a+)CTB Module
        isShowCTBWin: SATBManager.invalidateParamCache,
        ctbWinText: SATBManager.invalidateParamCache,
        ctbWinX: SATBManager.invalidateParamCache,
        ctbWinY: SATBManager.invalidateParamCache,
        ctbWinOpacity: SATBManager.invalidateParamCache,
        ctbWinW: SATBManager.invalidateParamCache,
        ctbWinH: SATBManager.invalidateParamCache,
        ctbWinFontFace: SATBManager.invalidateParamCache,
        ctbWinTextSize: SATBManager.invalidateParamCache,
        ctbWinLineH: SATBManager.invalidateParamCache,
        ctbWinPadding: SATBManager.invalidateParamCache,
        ctbWinBackOpacity: SATBManager.invalidateParamCache,
        ctbWinskinPath: SATBManager.invalidateParamCache,
        ctbWinskinFile: SATBManager.invalidateParamCache,
        ctbWinskinHue: SATBManager.invalidateParamCache,
        ctbWinskinSmooth: SATBManager.invalidateParamCache,
        ctbWinTextColor: SATBManager.invalidateParamCache,
        ctbWinTextAlign: SATBManager.invalidateParamCache,
        ctbWinTextXOffset: SATBManager.invalidateParamCache,
        ctbWinTextYOffset: SATBManager.invalidateParamCache,
        //
        // (v0.15a+) Delay Module
        delaySecs: _SATB._UPDATE_NOTE_DEFAULT_FUNC("delay"),
        _delayNoteChainingRule: _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("delay"),
        _delayNotePriorities: _SATB._UPDATE_NOTE_PRIORITIES("delay"),
        //
        // (v0.14a+) Order Module
        isShowContinuousOrderWin: SATBManager.invalidateParamCache,
        continuousOrderWinX: SATBManager.invalidateParamCache,
        continuousOrderWinY: SATBManager.invalidateParamCache,
        continuousOrderOpacity: SATBManager.invalidateParamCache,
        continuousOrderWinW: SATBManager.invalidateParamCache,
        continuousOrderWinH: SATBManager.invalidateParamCache,
        continuousOrderFontFace: SATBManager.invalidateParamCache,
        continuousOrderTextSize: SATBManager.invalidateParamCache,
        continuousOrderLineH: SATBManager.invalidateParamCache,
        continuousOrderPadding: SATBManager.invalidateParamCache,
        continuousOrderBackOpacity: SATBManager.invalidateParamCache,
        continuousOrderWinskinPath: SATBManager.invalidateParamCache,
        continuousOrderWinskinFile: SATBManager.invalidateParamCache,
        continuousOrderWinskinHue: SATBManager.invalidateParamCache,
        continuousOrderWinskinSmooth: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarX: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarY: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarW: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarH: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarColor1: SATBManager.invalidateParamCache,
        continuousOrderCooldownBarColor2: SATBManager.invalidateParamCache,
        continuousOrderCooldownTextColor: SATBManager.invalidateParamCache,
        continuousOrderCooldownText: SATBManager.invalidateParamCache,
        continuousOrderCooldownTextX: SATBManager.invalidateParamCache,
        continuousOrderCooldownTextY: SATBManager.invalidateParamCache,
        continuousOrderCooldownTextAlign: SATBManager.invalidateParamCache,
        continuousOrderCoreBarX: SATBManager.invalidateParamCache,
        continuousOrderCoreBarY: SATBManager.invalidateParamCache,
        continuousOrderCoreBarW: SATBManager.invalidateParamCache,
        continuousOrderCoreBarH: SATBManager.invalidateParamCache,
        continuousOrderCoreBarColor1: SATBManager.invalidateParamCache,
        continuousOrderCoreBarColor2: SATBManager.invalidateParamCache,
        continuousOrderCoreTextColor: SATBManager.invalidateParamCache,
        continuousOrderCoreText: SATBManager.invalidateParamCache,
        continuousOrderCoreTextX: SATBManager.invalidateParamCache,
        continuousOrderCoreTextY: SATBManager.invalidateParamCache,
        continuousOrderCoreTextAlign: SATBManager.invalidateParamCache,
        continuousOrderChargeBarX: SATBManager.invalidateParamCache,
        continuousOrderChargeBarY: SATBManager.invalidateParamCache,
        continuousOrderChargeBarW: SATBManager.invalidateParamCache,
        continuousOrderChargeBarH: SATBManager.invalidateParamCache,
        continuousOrderChargeBarColor1: SATBManager.invalidateParamCache,
        continuousOrderChargeBarColor2: SATBManager.invalidateParamCache,
        continuousOrderChargeTextColor: SATBManager.invalidateParamCache,
        continuousOrderChargeText: SATBManager.invalidateParamCache,
        continuousOrderChargeTextX: SATBManager.invalidateParamCache,
        continuousOrderChargeTextY: SATBManager.invalidateParamCache,
        continuousOrderChargeTextAlign: SATBManager.invalidateParamCache,
        continuousOrderSpriteOpacity:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("continuousOrderSpriteOpacity"),
        continuousOrderSpriteIconFolder: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconFolder"),
        continuousOrderSpriteIconFilename: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconFilename"),
        continuousOrderSpriteIconHue:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("continuousOrderSpriteIconHue"),
        continuousOrderSpriteIconSmooth: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconSmooth"),
        continuousOrderSpriteIconXCoor: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconXCoor"),
        continuousOrderSpriteIconYCoor: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconYCoor"),
        continuousOrderSpriteIconSourceW: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconSourceW"),
        continuousOrderSpriteIconSourceH: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "continuousOrderSpriteIconSourceH"),
        continuousOrderSpriteIconW:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("continuousOrderSpriteIconW"),
        continuousOrderSpriteIconH:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("continuousOrderSpriteIconH"),
        continuousOrderSpriteY:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("continuousOrderSpriteY"),
        isShowDiscreteOrderWin: SATBManager.invalidateParamCache,
        discreteOrderWinX: SATBManager.invalidateParamCache,
        discreteOrderWinY: SATBManager.invalidateParamCache,
        discreteOrderOpacity: SATBManager.invalidateParamCache,
        discreteOrderWinW: SATBManager.invalidateParamCache,
        discreteOrderWinH: SATBManager.invalidateParamCache,
        discreteOrderPadding: SATBManager.invalidateParamCache,
        discreteOrderBackOpacity: SATBManager.invalidateParamCache,
        discreteOrderWinskinPath: SATBManager.invalidateParamCache,
        discreteOrderWinskinFile: SATBManager.invalidateParamCache,
        discreteOrderWinskinHue: SATBManager.invalidateParamCache,
        discreteOrderWinskinSmooth: SATBManager.invalidateParamCache,
        showingDiscreteOrderBattlerSpriteOpacity:
                SATBManager.invalidateParamCache,
        hidingDiscreteOrderBattlerSpriteOpacity:
                SATBManager.invalidateParamCache,
        discreteOrderSpriteX: SATBManager.invalidateParamCache,
        discreteOrderSpriteY: SATBManager.invalidateParamCache,
        discreteOrderSpriteTargetOpacity: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteTargetOpacity"),
        discreteOrderSpriteIconFolder: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteIconFolder"),
        discreteOrderSpriteIconFilename: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteIconFilename"),
        discreteOrderSpriteIconHue:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("discreteOrderSpriteIconHue"),
        discreteOrderSpriteIconSmooth: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteIconSmooth"),
        discreteOrderSpriteIconXCoor:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("discreteOrderSpriteIconXCoor"),
        discreteOrderSpriteIconYCoor:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("discreteOrderSpriteIconYCoor"),
        discreteOrderSpriteIconSourceW: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteIconSourceW"),
        discreteOrderSpriteIconSourceH: _SATB._UPDATE_NOTE_DEFAULT_FUNC(
                "discreteOrderSpriteIconSourceH"),
        discreteOrderSpriteIconW:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("discreteOrderSpriteIconW"),
        discreteOrderSpriteIconH:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("discreteOrderSpriteIconH"),
        //
        // (v0.10a+) Rate Module
        coreATBRate: _SATB._UPDATE_NOTE_DEFAULT_FUNC("coreATBRate"),
        _coreATBRateNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("coreATBRate"),
        _coreATBRateNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("coreATBRate"),
        chargeATBRate: _SATB._UPDATE_NOTE_DEFAULT_FUNC("chargeATBRate"),
        _chargeATBRateNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("chargeATBRate"),
        _chargeATBRateNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("chargeATBRate"),
        cooldownATBRate: _SATB._UPDATE_NOTE_DEFAULT_FUNC("cooldownATBRate"),
        _cooldownATBRateNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("cooldownATBRate"),
        _cooldownATBRateNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("cooldownATBRate"),
        //
        // (v0.07a+) Reset Module
        resetATBVal: _SATB._UPDATE_NOTE_DEFAULT_FUNC("resetATBVal"),
        _resetATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("resetATBVal"),
        _resetATBValNotePriorities: SATBManager.updateNotePriorities.bind(
                SATBManager, "resetATBVal"),
        //
        // (v0.08a+) Speed Module
        actSpeed: _SATB._UPDATE_NOTE_DEFAULT_FUNC("actSpeed"),
        _actSpeedNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("actSpeed"),
        _actSpeedNotePriorities: _SATB._UPDATE_NOTE_PRIORITIES("actSpeed"),
        //
        // (v0.09a+) Start Module
        normStartATBVal: _SATB._UPDATE_NOTE_DEFAULT_FUNC("normStartATBVal"),
        _normStartATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("normStartATBVal"),
        _normStartATBValNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("normStartATBVal"),
        preemptStartATBVal:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("preemptStartATBVal"),
        _preemptStartATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("preemptStartATBVal"),
        _preemptStartATBValNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("preemptStartATBVal"),
        surpriseStartATBVal:
                _SATB._UPDATE_NOTE_DEFAULT_FUNC("surpriseStartATBVal"),
        _surpriseStartATBValNoteChainingRule:
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC("surpriseStartATBVal"),
        _surpriseStartATBValNotePriorities:
                _SATB._UPDATE_NOTE_PRIORITIES("surpriseStartATBVal"),
        //
        // (v0.14a+) Turn Module
        isShowBattleTurnClockWin: SATBManager.invalidateParamCache,
        battleTurnClockText: SATBManager.invalidateParamCache,
        battleTurnClockWinX: SATBManager.invalidateParamCache,
        battleTurnClockWinY: SATBManager.invalidateParamCache,
        battleTurnClockOpacity: SATBManager.invalidateParamCache,
        battleTurnClockWinW: SATBManager.invalidateParamCache,
        battleTurnClockWinH: SATBManager.invalidateParamCache,
        battleTurnClockFontFace: SATBManager.invalidateParamCache,
        battleTurnClockTextSize: SATBManager.invalidateParamCache,
        battleTurnClockWinLineH: SATBManager.invalidateParamCache,
        battleTurnClockWinPadding: SATBManager.invalidateParamCache,
        battleTurnClockBackOpacity: SATBManager.invalidateParamCache,
        battleTurnClockWinskinPath: SATBManager.invalidateParamCache,
        battleTurnClockWinskinFile: SATBManager.invalidateParamCache,
        battleTurnClockWinskinHue: SATBManager.invalidateParamCache,
        battleTurnClockWinskinSmooth: SATBManager.invalidateParamCache,
        battleTurnClockTextColor: SATBManager.invalidateParamCache,
        battleTurnClockTextAlign: SATBManager.invalidateParamCache,
        battleTurnClockTextXOffset: SATBManager.invalidateParamCache,
        battleTurnClockTextYOffset: SATBManager.invalidateParamCache
        //
    }; // _SATB._PARAM_UPDATES
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        // These hardcode the param names but reduce works on adding events
        _SATB._PARAM_UPDATES[note] = _SATB._UPDATE_NOTE_DEFAULT_FUNC(note);
        _SATB._PARAM_UPDATES["_" + note + "NoteChainingRule"] =
                _SATB._UPDATE_NOTE_CHAINING_RULE_FUNC(note);
        _SATB._PARAM_UPDATES["_" + note + "NotePriorities"] =
                _SATB._UPDATE_NOTE_PRIORITIES(note);
        //
    });
    //

    _SATB._BOOL_PARAMS = [
        // Core Module
        "_isParamFuncCached",
        "_isNoteCached",
        "_isAlwaysRecacheAllSwitchVars"
        //
    ]; // _SATB._BOOL_PARAMS
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
        "atbBarFrameOpacity", // v0.06a+
        "atbBarW",
        "atbBarH",
        "atbBarFontFace", // v0.14a+
        "atbBarTextSize",
        "atbBarLineH",
        "atbBarPadding", // v0.06a+
        "atbBarBackOpacity",
        "atbBarWinskinPath", // v0.14a+
        "atbBarWinskinFile", // v0.14a+
        "atbBarWinskinHue", // v0.14a+
        "atbBarWinskinSmooth", // v0.14a+
        "atbBarTextColor", // v0.14a+
        "atbBarTextAlign", // v0.14a+
        "atbBarTextXOffset",
        "atbBarTextYOffset",
        "atbBarTextColor",
        "atbBarColor1",
        "atbBarColor2",
        "atbBarBackColor",
        "_isBarVisibleNotePriorities", // v0.04a+
        "isShowStatusATBBar", // v0.06a+
        "statusATBBarText", // v0.06a+
        "statusATBBarXOffset", // v0.06a+
        "statusATBBarYOffset", // v0.06a+
        "statusATBBarFrameOpacity", // v0.06a+
        "statusATBBarW", // v0.06a+
        "statusATBBarH", // v0.06a+
        "statusATBBarFontFace", // v0.14a+
        "statusATBBarTextSize", // v0.06a+
        "statusATBBarLineH", // v0.06a+
        "statusATBBarPadding", // v0.06a+
        "statusATBBarBackOpacity", // v0.06a+
        "statusATBBarWinskinPath", // v0.14a+
        "statusATBBarWinskinFile", // v0.14a+
        "statusATBBarWinskinHue", // v0.14a+
        "statusATBBarWinskinSmooth", // v0.14a+
        "statusATBBarTextColor", // v0.14a+
        "statusATBBarTextAlign", // v0.14a+
        "statusATBBarTextXOffset", // v0.06a+
        "statusATBBarTextYOffset", // v0.06a+
        "statusATBBarTextColor", // v0.06a+
        "statusATBBarColor1", // v0.06a+
        "statusATBBarColor2", // v0.06a+
        "statusATBBarBackColor", // v0.06a+
        "_isStatusBarVisibleNotePriorities", // v0.06a+
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
        "forceATBStatOpacity", // v0.14a+
        "forceATBStatWinW",
        "forceATBStatWinH",
        "forceATBStatFontFace", // v0.14a+
        "forceATBStatTextSize",
        "forceATBStatWinLineH",
        "forceATBStatWinPadding",
        "forceATBStatBackOpacity",
        "forceATBStatWinskinPath", // v0.14a+
        "forceATBStatWinskinFile", // v0.14a+
        "forceATBStatWinskinHue", // v0.14a+
        "forceATBStatWinskinSmooth", // v0.14a+
        "forceATBStatTextColor", // v0.14a+
        "forceATBStatTextAlign", // v0.14a+
        "forceATBStatTextXOffset",
        "forceATBStatTextYOffset",
        "isShowForceATBRunCmdWin",
        "forceRunATBCmdText",
        "forceATBRunCmdWinX",
        "forceATBRunCmdWinY",
        "forceATBRunCmdOpacity", // v0.14a+
        "forceATBRunCmdWinW",
        "forceATBRunCmdWinH",
        "forceATBRunCmdFontFace", // v0.14a+
        "forceATBRunCmdTextSize",
        "forceATBRunCmdWinLineH",
        "forceATBRunCmdWinPadding",
        "forceATBRunCmdBackOpacity",
        "forceATBRunCmdWinskinPath", // v0.14a+
        "forceATBRunCmdWinskinFile", // v0.14a+
        "forceATBRunCmdWinskinHue", // v0.14a+
        "forceATBRunCmdWinskinSmooth", // v0.14a+
        "forceATBRunCmdTextColor", // v0.14a+
        "forceATBRunCmdTextAlign", // v0.14a+
        "forceATBRunCmdTextXOffset",
        "forceATBRunCmdTextYOffset",
        "isShowForceATBStopCmdWin",
        "forceStopATBCmdText",
        "forceATBStopCmdWinX",
        "forceATBStopCmdWinY",
        "forceATBStopCmdOpacity", // v0.14a+
        "forceATBStopCmdWinW",
        "forceATBStopCmdWinH",
        "forceATBStopCmdFontFace", // v0.14a+
        "forceATBStopCmdTextSize",
        "forceATBStopCmdWinLineH",
        "forceATBStopCmdWinPadding",
        "forceATBStopCmdBackOpacity",
        "forceATBStopCmdWinskinPath", // v0.14a+
        "forceATBStopCmdWinskinFile", // v0.14a+
        "forceATBStopCmdWinskinHue", // v0.14a+
        "forceATBStopCmdWinskinSmooth", // v0.14a+
        "forceATBStopCmdTextColor", // v0.14a+
        "forceATBStopCmdTextAlign", // v0.14a+
        "forceATBStopCmdTextXOffset",
        "forceATBStopCmdTextYOffset",
        //
        // (v0.04a+)Action Module
        "IsActionEnabled",
        "_actCostNotePriorities",
        "actMode",
        "_actModeNotePriorities",
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
        // (v0.05a+)Cooldown Module
        "IsCooldownEnabled",
        "cooldownMaxATBVal",
        "_cooldownMaxATBValNotePriorities",
        "cancelCooldownATBKeys",
        "canCancelCooldown",
        "_canCancelCooldownNotePriorities",
        //
        // (v0.12a+)Countdown Module
        "IsCountdownEnabled",
        //
        // (v0.13a+)CTB Module
        "IsCTBEnabled",
        "isShowCTBWin",
        "ctbWinText",
        "ctbWinX",
        "ctbWinY",
        "ctbWinOpacity", // v0.14a+
        "ctbWinW",
        "ctbWinH",
        "ctbWinFontFace", // v0.14a+
        "ctbWinTextSize",
        "ctbWinLineH",
        "ctbWinPadding",
        "ctbWinBackOpacity",
        "ctbWinskinPath", // v0.14a+
        "ctbWinskinFile", // v0.14a+
        "ctbWinskinHue", // v0.14a+
        "ctbWinskinSmooth", // v0.14a+
        "ctbWinTextColor", // v0.14a+
        "ctbWinTextAlign", // v0.14a+
        "ctbWinTextXOffset",
        "ctbWinTextYOffset",
        //
        // (v0.15a+) Delay Module
        "IsDelayEnabled",
        "delaySecs",
        "_delayNotePriorities",
        //
        "IsEventEnabled", // (v0.06a+) Event Module
        // (v0.14a+) Order Module
        "IsOrderEnabled",
        "isShowContinuousOrderWin",
        "continuousOrderWinX",
        "continuousOrderWinY",
        "continuousOrderOpacity",
        "continuousOrderWinW",
        "continuousOrderWinH",
        "continuousOrderFontFace",
        "continuousOrderTextSize",
        "continuousOrderLineH",
        "continuousOrderPadding",
        "continuousOrderBackOpacity",
        "continuousOrderWinskinPath",
        "continuousOrderWinskinFile",
        "continuousOrderWinskinHue",
        "continuousOrderWinskinSmooth",
        "continuousOrderCooldownBarX",
        "continuousOrderCooldownBarY",
        "continuousOrderCooldownBarW",
        "continuousOrderCooldownBarH",
        "continuousOrderCooldownBarColor1",
        "continuousOrderCooldownBarColor2",
        "continuousOrderCooldownTextColor",
        "continuousOrderCooldownText",
        "continuousOrderCooldownTextX",
        "continuousOrderCooldownTextY",
        "continuousOrderCooldownTextAlign",
        "continuousOrderCoreBarX",
        "continuousOrderCoreBarY",
        "continuousOrderCoreBarW",
        "continuousOrderCoreBarH",
        "continuousOrderCoreBarColor1",
        "continuousOrderCoreBarColor2",
        "continuousOrderCoreTextColor",
        "continuousOrderCoreText",
        "continuousOrderCoreTextX",
        "continuousOrderCoreTextY",
        "continuousOrderCoreTextAlign",
        "continuousOrderChargeBarX",
        "continuousOrderChargeBarY",
        "continuousOrderChargeBarW",
        "continuousOrderChargeBarH",
        "continuousOrderChargeBarColor1",
        "continuousOrderChargeBarColor2",
        "continuousOrderChargeTextColor",
        "continuousOrderChargeText",
        "continuousOrderChargeTextX",
        "continuousOrderChargeTextY",
        "continuousOrderChargeTextAlign",
        "continuousOrderSpriteOpacity",
        "continuousOrderSpriteIconFolder",
        "continuousOrderSpriteIconFilename",
        "continuousOrderSpriteIconHue",
        "continuousOrderSpriteIconSmooth",
        "continuousOrderSpriteIconXCoor",
        "continuousOrderSpriteIconYCoor",
        "continuousOrderSpriteIconSourceW",
        "continuousOrderSpriteIconSourceH",
        "continuousOrderSpriteIconW",
        "continuousOrderSpriteIconH",
        "continuousOrderSpriteY",
        "isShowDiscreteOrderWin",
        "discreteOrderWinX",
        "discreteOrderWinY",
        "discreteOrderOpacity",
        "discreteOrderWinW",
        "discreteOrderWinH",
        "discreteOrderPadding",
        "discreteOrderBackOpacity",
        "discreteOrderWinskinPath",
        "discreteOrderWinskinFile",
        "discreteOrderWinskinHue",
        "discreteOrderWinskinSmooth",
        "showingDiscreteOrderBattlerSpriteOpacity",
        "hidingDiscreteOrderBattlerSpriteOpacity",
        "discreteOrderSpriteX",
        "discreteOrderSpriteY",
        "discreteOrderSpriteTargetOpacity",
        "discreteOrderSpriteIconFolder",
        "discreteOrderSpriteIconFilename",
        "discreteOrderSpriteIconHue",
        "discreteOrderSpriteIconSmooth",
        "discreteOrderSpriteIconXCoor",
        "discreteOrderSpriteIconYCoor",
        "discreteOrderSpriteIconSourceW",
        "discreteOrderSpriteIconSourceH",
        "discreteOrderSpriteIconW",
        "discreteOrderSpriteIconH",
        //
        // (v0.10a+) Rate Module
        "IsRateEnabled",
        "coreATBRate",
        "_coreATBRateNotePriorities",
        "chargeATBRate",
        "_chargeATBRateNotePriorities",
        "cooldownATBRate",
        "_cooldownATBRateNotePriorities",
        //
        // (v0.07a+) Reset Module
        "IsResetEnabled",
        "resetATBVal",
        "_resetATBValNotePriorities",
        //
        // (v0.08a+) Speed Module
        "IsSpeedEnabled",
        "updateActSpeeds",
        "actSpeed",
        "_actSpeedNotePriorities",
        //
        // (v0.09a+) Start Module
        "IsStartEnabled",
        "normStartATBVal",
        "_normStartATBValNotePriorities",
        "preemptStartATBVal",
        "_preemptStartATBValNotePriorities",
        "surpriseStartATBVal",
        "_surpriseStartATBValNotePriorities",
        //
        // (v0.11a+) Turn Module
        "IsTurnEnabled",
        "isShowBattleTurnClockWin",
        "battleTurnClockText",
        "battleTurnClockWinX",
        "battleTurnClockWinY",
        "battleTurnClockOpacity", // v0.14a+
        "battleTurnClockWinW",
        "battleTurnClockWinH",
        "battleTurnClockFontFace", // v0.14a+
        "battleTurnClockTextSize",
        "battleTurnClockWinLineH",
        "battleTurnClockWinPadding",
        "battleTurnClockBackOpacity",
        "battleTurnClockWinskinPath", // v0.14a+
        "battleTurnClockWinskinFile", // v0.14a+
        "battleTurnClockWinskinHue", // v0.14a+
        "battleTurnClockWinskinSmooth", // v0.14a+
        "battleTurnClockTextColor", // v0.14a+
        "battleTurnClockTextAlign", // v0.14a+
        "battleTurnClockTextXOffset",
        "battleTurnClockTextYOffset"
        //
    ]; // _SATB._JSON_PARAMS
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        // These hardcode the param names but reduce works on adding events
        _SATB._JSON_PARAMS.push(note);
        _SATB._JSON_PARAMS.push("_" + note + "NotePriorities");
        //
    });

    _SATB._CACHED_DEFAULT_NOTE_PARAMS = {
        coreMaxATBVal: "coreMax", // Core Module
        isShowATBBar: "isBarVisible", // (v0.04a+) Bar Module
        isShowStatusATBBar: "isStatusBarVisible", // (v0.06a+) Bar Module
        actMode: "actMode", // (v0.16a+) Action Module
        // (v0.04a+) Charge Module
        chargeMaxATBVal: "chargeMax",
        isPayBeforeExecCharge: "isPayBeforeExecCharge",
        canCancelCharge: "canCancelCharge",
        canforceCharge: "canforceCharge",
        //
        // (v0.05a+) Cooldown Module
        cooldownMaxATBVal: "cooldownMax",
        canCancelCooldown: "canCancelCooldown",
        //
        delaySecs: "delay", // (v0.15a+) Delay Module
        // (v0.14a+) Order Module
        continuousOrderSpriteOpacity: "continuousOrderSpriteOpacity",
        continuousOrderSpriteIconFolder: "continuousOrderSpriteIconFolder",
        continuousOrderSpriteIconFilename: "continuousOrderSpriteIconFilename",
        continuousOrderSpriteIconHue: "continuousOrderSpriteIconHue",
        continuousOrderSpriteIconSmooth: "continuousOrderSpriteIconSmooth",
        continuousOrderSpriteIconXCoor: "continuousOrderSpriteIconXCoor",
        continuousOrderSpriteIconYCoor: "continuousOrderSpriteIconYCoor",
        continuousOrderSpriteIconSourceW: "continuousOrderSpriteIconSourceW",
        continuousOrderSpriteIconSourceH: "continuousOrderSpriteIconSourceH",
        continuousOrderSpriteIconW:"continuousOrderSpriteIconW",
        continuousOrderSpriteIconH: "continuousOrderSpriteIconH",
        continuousOrderSpriteY: "continuousOrderSpriteY",
        discreteOrderSpriteTargetOpacity: "discreteOrderSpriteTargetOpacity",
        discreteOrderSpriteIconFolder: "discreteOrderSpriteIconFolder",
        discreteOrderSpriteIconFilename: "discreteOrderSpriteIconFilename",
        discreteOrderSpriteIconHue: "discreteOrderSpriteIconHue",
        discreteOrderSpriteIconSmooth: "discreteOrderSpriteIconSmooth",
        discreteOrderSpriteIconXCoor: "discreteOrderSpriteIconXCoor",
        discreteOrderSpriteIconYCoor: "discreteOrderSpriteIconYCoor",
        discreteOrderSpriteIconSourceW: "discreteOrderSpriteIconSourceW",
        discreteOrderSpriteIconSourceH: "discreteOrderSpriteIconSourceH",
        discreteOrderSpriteIconW: "discreteOrderSpriteIconW",
        discreteOrderSpriteIconH: "discreteOrderSpriteIconH",
        //
        // (v0.10a+) Rate Module
        coreATBRate: "coreATBRate",
        chargeATBRate: "chargeATBRate",
        cooldownATBRate: "cooldownATBRate",
        //
        resetATBVal: "resetATBVal", // (v0.07a+) Reset Module
        actSpeed: "actSpeed", // (v0.08a+) Speed Module
        // (v0.09a+) Speed Module
        normStartATBVal: "normStartATBVal",
        preemptStartATBVal: "preemptStartATBVal",
        surpriseStartATBVal: "surpriseStartATBVal"
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
        atbBarFrameOpacity: "bar", // v0.06a+
        atbBarW: "bar",
        atbBarH: "bar",
        atbBarFontFace: "bar", // v0.14a+
        atbBarTextSize: "bar",
        atbBarLineH: "bar",
        atbBarPadding: "bar", // v0.06a+
        atbBarBackOpacity: "bar",
        atbBarWinskinPath: "bar", // v0.14a+
        atbBarWinskinFile: "bar", // v0.14a+
        atbBarWinskinHue: "bar", // v0.14a+
        atbBarWinskinSmooth: "bar", // v0.14a+
        atbBarTextAlign: "bar", // v0.14a+
        atbBarTextXOffset: "bar",
        atbBarTextYOffset: "bar",
        atbBarTextColor: "bar",
        atbBarColor1: "bar",
        atbBarColor2: "bar",
        atbBarBackColor: "bar",
        _isBarVisibleNoteChainingRule: "bar", // v0.04a+
        _isBarVisibleNotePriorities: "bar", // v0.04a+
        isShowStatusATBBar: "bar", // v0.06a+
        statusATBBarText: "bar", // v0.06a+
        statusATBBarXOffset: "bar", // v0.06a+
        statusATBBarYOffset: "bar", // v0.06a+
        statusATBBarFrameOpacity: "bar", // v0.06a+
        statusATBBarW: "bar", // v0.06a+
        statusATBBarH: "bar", // v0.06a+
        statusATBBarFontFace: "bar", // v0.14a+
        statusATBBarTextSize: "bar", // v0.06a+
        statusATBBarLineH: "bar", // v0.06a+
        statusATBBarPadding: "bar", // v0.06a+
        statusATBBarBackOpacity: "bar", // v0.06a+
        statusATBBarWinskinPath: "bar", // v0.14a+
        statusATBBarWinskinFile: "bar", // v0.14a+
        statusATBBarWinskinHue: "bar", // v0.14a+
        statusATBBarWinskinSmooth: "bar", // v0.14a+
        statusATBBarTextAlign: "bar", // v0.14a+
        statusATBBarTextXOffset: "bar", // v0.06a+
        statusATBBarTextYOffset: "bar", // v0.06a+
        statusATBBarTextColor: "bar", // v0.06a+
        statusATBBarColor1: "bar", // v0.06a+
        statusATBBarColor2: "bar", // v0.06a+
        statusATBBarBackColor: "bar", // v0.06a+
        _isStatusBarVisibleNoteChainingRule: "bar", // v0.06a+
        _isStatusBarVisibleNotePriorities: "bar", // v0.06a+
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
        forceATBStatOpacity: "wait", // v0.14a+
        forceATBStatWinW: "wait",
        forceATBStatWinH: "wait",
        forceATBStatFontFace: "wait", // v0.14a+
        forceATBStatTextSize: "wait",
        forceATBStatWinLineH: "wait",
        forceATBStatWinPadding: "wait",
        forceATBStatBackOpacity: "wait",
        forceATBStatWinskinPath: "wait", // v0.14a+
        forceATBStatWinskinFile: "wait", // v0.14a+
        forceATBStatWinskinHue: "wait", // v0.14a+
        forceATBStatWinskinSmooth: "wait", // v0.14a+
        forceATBStatTextColor: "wait", // v0.14a+
        forceATBStatTextAlign: "wait", // v0.14a+
        forceATBStatTextXOffset: "wait",
        forceATBStatTextYOffset: "wait",
        isShowForceATBRunCmdWin: "wait",
        forceRunATBCmdText: "wait",
        forceATBRunCmdWinX: "wait",
        forceATBRunCmdWinY: "wait",
        forceATBRunCmdOpacity: "wait", // v0.14a+
        forceATBRunCmdWinW: "wait",
        forceATBRunCmdWinH: "wait",
        forceATBRunCmdFontFace: "wait", // v0.14a+
        forceATBRunCmdTextSize: "wait",
        forceATBRunCmdWinLineH: "wait",
        forceATBRunCmdWinPadding: "wait",
        forceATBRunCmdBackOpacity: "wait",
        forceATBRunCmdWinskinPath: "wait", // v0.14a+
        forceATBRunCmdWinskinFile: "wait", // v0.14a+
        forceATBRunCmdWinskinHue: "wait", // v0.14a+
        forceATBRunCmdWinskinSmooth: "wait", // v0.14a+
        forceATBRunCmdTextColor: "wait", // v0.14a+
        forceATBRunCmdTextAlign: "wait", // v0.14a+
        forceATBRunCmdTextXOffset: "wait",
        forceATBRunCmdTextYOffset: "wait",
        isShowForceATBStopCmdWin: "wait",
        forceStopATBCmdText: "wait",
        forceATBStopCmdWinX: "wait",
        forceATBStopCmdWinY: "wait",
        forceATBStopCmdOpacity: "wait", // v0.14a+
        forceATBStopCmdWinW: "wait",
        forceATBStopCmdWinH: "wait",
        forceATBStopCmdFontFace: "wait", // v0.14a+
        forceATBStopCmdTextSize: "wait",
        forceATBStopCmdWinLineH: "wait",
        forceATBStopCmdWinPadding: "wait",
        forceATBStopCmdBackOpacity: "wait",
        forceATBStopCmdWinskinPath: "wait", // v0.14a+
        forceATBStopCmdWinskinFile: "wait", // v0.14a+
        forceATBStopCmdWinskinHue: "wait", // v0.14a+
        forceATBStopCmdWinskinSmooth: "wait", // v0.14a+
        forceATBStopCmdTextColor: "wait", // v0.14a+
        forceATBStopCmdTextAlign: "wait", // v0.14a+
        forceATBStopCmdTextXOffset: "wait",
        forceATBStopCmdTextYOffset: "wait",
        //
        // v0.16a+
        IsActEnabled: "act",
        _actCostNoteChainingRule: "act",
        _actCostNotePriorities: "act",
        actMode: "act",
        _actModeNoteChainingRule: "act",
        _actModeNotePriorities: "act",
        // v0.04a+
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
        // v0.05a+
        IsCooldownEnabled: "cooldown",
        cooldownMaxATBVal: "cooldown",
        _cooldownMaxATBValNoteChainingRule: "cooldown",
        _cooldownMaxATBValNotePriorities: "cooldown",
        cancelCooldownATBKeys: "cooldown",
        canCancelCooldown: "cooldown",
        _canCancelCooldownNoteChainingRule: "cooldown",
        _canCancelCooldownNotePriorities: "cooldown",
        //
        // v0.12a+
        IsCountdownEnabled: "countdown",
        _countdownNoteChainingRule: "countdown",
        //
        // v0.13a+
        IsCTBEnabled: "ctb",
        isShowCTBWin: "ctb",
        ctbWinText: "ctb",
        ctbWinX: "ctb",
        ctbWinY: "ctb",
        ctbWinOpacity: "ctb", // v0.14a+
        ctbWinW: "ctb",
        ctbWinH: "ctb",
        ctbWinFontFace: "ctb", // v0.14a+
        ctbWinTextSize: "ctb",
        ctbWinLineH: "ctb",
        ctbWinPadding: "ctb",
        ctbWinBackOpacity: "ctb",
        ctbWinskinPath: "ctb", // v0.14a+
        ctbWinskinFile: "ctb", // v0.14a+
        ctbWinskinHue: "ctb", // v0.14a+
        ctbWinskinSmooth: "ctb", // v0.14a+
        ctbWinTextColor: "ctb", // v0.14a+
        ctbWinTextAlign: "ctb", // v0.14a+
        ctbWinTextXOffset: "ctb",
        ctbWinTextYOffset: "ctb",
        //
        // v0.15a+
        IsDelayEnabled: "delay",
        delaySecs: "delay",
        _delayNoteChainingRule: "delay",
        _delayNotePriorities: "delay",
        //
        IsEventEnabled: "event", // v0.06a+
        // v0.14a+
        IsOrderEnabled: "order",
        isShowContinuousOrderWin: "order",
        continuousOrderWinX: "order",
        continuousOrderWinY: "order",
        continuousOrderOpacity: "order",
        continuousOrderWinW: "order",
        continuousOrderWinH: "order",
        continuousOrderFontFace: "order",
        continuousOrderTextSize: "order",
        continuousOrderLineH: "order",
        continuousOrderPadding: "order",
        continuousOrderBackOpacity: "order",
        continuousOrderWinskinPath: "order",
        continuousOrderWinskinFile: "order",
        continuousOrderWinskinHue: "order",
        continuousOrderWinskinSmooth: "order",
        continuousOrderCooldownBarX: "order",
        continuousOrderCooldownBarY: "order",
        continuousOrderCooldownBarW: "order",
        continuousOrderCooldownBarH: "order",
        continuousOrderCooldownBarColor1: "order",
        continuousOrderCooldownBarColor2: "order",
        continuousOrderCooldownTextColor: "order",
        continuousOrderCooldownText: "order",
        continuousOrderCooldownTextX: "order",
        continuousOrderCooldownTextY: "order",
        continuousOrderCooldownTextAlign: "order",
        continuousOrderCoreBarX: "order",
        continuousOrderCoreBarY: "order",
        continuousOrderCoreBarW: "order",
        continuousOrderCoreBarH: "order",
        continuousOrderCoreBarColor1: "order",
        continuousOrderCoreBarColor2: "order",
        continuousOrderCoreTextColor: "order",
        continuousOrderCoreText: "order",
        continuousOrderCoreTextX: "order",
        continuousOrderCoreTextY: "order",
        continuousOrderCoreTextAlign: "order",
        continuousOrderChargeBarX: "order",
        continuousOrderChargeBarY: "order",
        continuousOrderChargeBarW: "order",
        continuousOrderChargeBarH: "order",
        continuousOrderChargeBarColor1: "order",
        continuousOrderChargeBarColor2: "order",
        continuousOrderChargeTextColor: "order",
        continuousOrderChargeText: "order",
        continuousOrderChargeTextX: "order",
        continuousOrderChargeTextY: "order",
        continuousOrderChargeTextAlign: "order",
        continuousOrderSpriteOpacity: "order",
        continuousOrderSpriteIconFolder: "order",
        continuousOrderSpriteIconFilename: "order",
        continuousOrderSpriteIconHue: "order",
        continuousOrderSpriteIconSmooth: "order",
        continuousOrderSpriteIconXCoor: "order",
        continuousOrderSpriteIconYCoor: "order",
        continuousOrderSpriteIconSourceW: "order",
        continuousOrderSpriteIconSourceH: "order",
        continuousOrderSpriteIconW: "order",
        continuousOrderSpriteIconH: "order",
        continuousOrderSpriteY: "order",
        isShowDiscreteOrderWin: "order",
        discreteOrderWinX: "order",
        discreteOrderWinY: "order",
        discreteOrderOpacity: "order",
        discreteOrderWinW: "order",
        discreteOrderWinH: "order",
        discreteOrderPadding: "order",
        discreteOrderBackOpacity: "order",
        discreteOrderWinskinPath: "order",
        discreteOrderWinskinFile: "order",
        discreteOrderWinskinHue: "order",
        discreteOrderWinskinSmooth: "order",
        showingDiscreteOrderBattlerSpriteOpacity: "order",
        hidingDiscreteOrderBattlerSpriteOpacity: "order",
        discreteOrderSpriteX: "order",
        discreteOrderSpriteY: "order",
        discreteOrderSpriteTargetOpacity: "order",
        discreteOrderSpriteIconFolder: "order",
        discreteOrderSpriteIconFilename: "order",
        discreteOrderSpriteIconHue: "order",
        discreteOrderSpriteIconSmooth: "order",
        discreteOrderSpriteIconXCoor: "order",
        discreteOrderSpriteIconYCoor: "order",
        discreteOrderSpriteIconSourceW: "order",
        discreteOrderSpriteIconSourceH: "order",
        discreteOrderSpriteIconW: "order",
        discreteOrderSpriteIconH: "order",
        //
        // v0.10a+
        IsRateEnabled: "rate",
        coreATBRate: "rate",
        _coreATBRateNoteChainingRule: "rate",
        _coreATBRateNotePriorities: "rate",
        chargeATBRate: "rate",
        _chargeATBRateNoteChainingRule: "rate",
        _chargeATBRateNotePriorities: "rate",
        cooldownATBRate: "rate",
        _cooldownATBRateNoteChainingRule: "rate",
        _cooldownATBRateNotePriorities: "rate",
        //
        // v0.07a+
        IsResetEnabled: "reset",
        resetATBVal: "reset",
        _resetATBValNoteChainingRule: "reset",
        _resetATBValNotePriorities: "reset",
        //
        // v0.08a+
        IsSpeedEnabled: "speed",
        updateActSpeeds: "speed",
        actSpeed: "speed",
        _actSpeedNoteChainingRule: "speed",
        _actSpeedNotePriorities: "speed",
        //
        // v0.09a+
        IsStartEnabled: "start",
        normStartATBVal: "start",
        _normStartATBValNoteChainingRule: "start",
        _normStartATBValNotePriorities: "start",
        preemptStartATBVal: "start",
        _preemptStartATBValNoteChainingRule: "start",
        _preemptStartATBValNotePriorities: "start",
        surpriseStartATBVal: "start",
        _surpriseStartATBValNoteChainingRule: "start",
        _surpriseStartATBValNotePriorities: "start",
        //
        // v0.11a+
        IsTurnEnabled: "turn",
        isShowBattleTurnClockWin: "turn",
        battleTurnClockText: "turn",
        battleTurnClockWinX: "turn",
        battleTurnClockWinY: "turn",
        battleTurnClockOpacity: "turn", // v0.14a+
        battleTurnClockWinW: "turn",
        battleTurnClockWinH: "turn",
        battleTurnClockFontFace: "turn", // v0.14a+
        battleTurnClockTextSize: "turn",
        battleTurnClockWinLineH: "turn",
        battleTurnClockWinPadding: "turn",
        battleTurnClockBackOpacity: "turn",
        battleTurnClockWinskinPath: "turn", // v0.14a+
        battleTurnClockWinskinFile: "turn", // v0.14a+
        battleTurnClockWinskinHue: "turn", // v0.14a+
        battleTurnClockWinskinSmooth: "turn", // v0.14a+
        battleTurnClockTextColor: "turn", // v0.14a+
        battleTurnClockTextAlign: "turn", // v0.14a+
        battleTurnClockTextXOffset: "turn",
        battleTurnClockTextYOffset: "turn"
        //
    }; // _SATB._PARAM_MODULES
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        // These hardcode the param names but reduce works on adding events
        _SATB._PARAM_MODULES[note] = "event";
        _SATB._PARAM_MODULES["_" + note + "NoteChainingRule"] = "event";
        _SATB._PARAM_MODULES["_" + note + "NotePriorities"] = "event";
        //
    });
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
         * @since v0.00a @version v0.16a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMemChangeFactors = function(id) {
            // Parameters not depending on battlers can still use switch/vars
            SATBManager.invalidateParamCache();
            //
            if ($gameSystem.satbParam("_isAlwaysRecacheAllSwitchVars")) {
                // refresh raises these factors and also instantly update values
                SATBManager.refreshAllSATBMems();
                //
            } else _SATB._raiseMappedMemChangeFactors.call(this, id);
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

    _GBB.clearStates = $.clearStates;
    _SATB.clearStates = $.clearStates = function() {
    // v0.12a - v0.12a; Extended
        _GBB.clearStates.apply(this, arguments);
        // Added to clear all countdown state counters
        _SATB._clearCountdownStateCounters.call(this);
        //
    }; // $.clearStates

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
        // Added to erase the countdown state counter if it's a countdown state
        _SATB._eraseCountdownStateCounter.call(this, stateId);
        //
    }; // $.eraseState

    _GBB.resetStateCounts = $.resetStateCounts;
    _SATB.resetStateCounts = $.resetStateCounts = function(stateId) {
    // v0.12a - v0.12a; Extended
        _GBB.resetStateCounts.apply(this, arguments);
        // Added to reset the state countdown counter if it's a countdown state
        _SATB.resetCountdownStateCounter.call(this, stateId);
        //
    }; // $.resetStateCounts

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

    _GBB.canUse = $.canUse;
    _SATB.canUse = $.canUse = function(item) {
    // v0.16a - v0.16a; Extended
        // Added to check if there are enough virtual action costs as well
        if (!this._satb.acts.hasEnoughActTimes(item)) return false;
        //
        return _GBB.canUse.apply(this, arguments);
    }; // $.canUse

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
     * Idempotent
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the state to have its counter erased
     */
    _SATB.resetCountdownStateCounter = function(stateId) {
        // It's possible for a normal state to become countdown after it's added
        this._satb.countdownStateCounters[stateId] = { frame: 0, sec: 0 };
        //
    }; // _SATB.resetCountdownStateCounter

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Idempotent
     * @since v0.12a @version v0.12a
     */
    _SATB._clearCountdownStateCounters = function() {
        // _init is called before initialize in Game_Battler so it's ok here
        this._satb.countdownStateCounters = {};
        //
    }; // _SATB._clearCountdownStateCounters

    /**
     * The this pointer is Game_BattlerBase.prototype
     * Idempotent
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the state to have its counter erased
     */
    _SATB._eraseCountdownStateCounter = function(stateId) {
        delete this._satb.countdownStateCounters[stateId];
    }; // _SATB._eraseCountdownStateCounter

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {Number} timing - The state auto removal timing(1/2)
     * @param {State} state - The state to have its turn updated
     */
    _SATB._updateStateTurn = function(timing, state) {
        if (this.satbNoteResult_("coreActState", { state: state })) return;
        var isCountdown = SATBManager.areModulesEnabled(["IsCountdownEnabled"]);
        if (isCountdown && this.satbNoteResult_("countdown", {
            state: state
        })) return;
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
        // They must be placed here or checkUpdatedMaxes would use wrong max val
        delete this._satb._cachedBaseCoreMax_;
        delete this._satb._cachedBaseChargeMax_;
        delete this._satb._cachedBaseCooldownMax_;
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
    var GBB = SATB.Game_BattlerBase.new, $ = Game_Battler.prototype;
    var _GB = SATB.Game_Battler.orig, _SATB = SATB.Game_Battler.new;

    // v0.16a+; Hotspot
    _SATB._ACT_SPEED = function(speed, item) { return speed + item.speed; };
    //
    _SATB._COUNTDOWN_STATE_COUNTER_INCREMENT = function(unit) {
    // v0.12a+; Hotspot
        switch (unit) {
            case "frame": return 1;
            /** @todo Thinks of if it's as correct as using Date.now() */
            case "sec": return SceneManager._deltaTime;
            //
        }
    }; // _SATB._COUNTDOWN_STATE_COUNTER_INCREMENT
    _SATB._IS_DECREASE_COUNTDOWN_STATE_TURN = function(interval, counter) {
    // v0.12a+; Hotspot
        return interval > 0 && counter >= interval;
    }; // _SATB._IS_DECREASE_COUNTDOWN_STATE_TURN
    _SATB._IS_INCREASE_COUNTDOWN_STATE_TURN = function(interval, counter) {
    // v0.12a+; Hotspot
        return interval < 0 && counter >= -interval;
    }; // _SATB._IS_INCREASE_COUNTDOWN_STATE_TURN
    _SATB._LATEST_SKILL_ITEM = function(item) { return item.item; }; // v0.16a+

    _SATB._ACT_FORWARDED_FUNCS = { // v0.16a+
        minSATBActCost: "minActCost",
        satbActTimes: "actTimes",
        maxSatbActTimes: "maxActTimes",
        usedSATBActTimes: "usedActTimes"
    }; // _SATB._ACT_FORWARDED_FUNCS

    // All these functions are battler script calls
    _SATB.NOTE_FORWARDED_FUNCS = {
        // They're not shown in the doc as it's too raw
        latestSATBItemNoteResult_: "latestItemResult_", // v0.16a+
        satbNoteResult_: "result_",
        runSATBNote: "run", // v0.06a+
        //
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
        setSATBDelaySecCounter: "setDelaySecCounter",
        addSATBDelaySecCounter: "addDelaySecCounter",
        multiplySATBDelaySecCounter: "multiplyDelaySecCounter",
        clearCoreSATB: "clearCoreATB",
        clearChargeSATB: "clearChargeATB",
        // These aren't shown in the documentation plugin as they're rarely used
        curSATB: "curATB",
        curMaxSATB: "curMax",
        //
        coreSATB: "coreATB",
        chargeSATB: "chargeATB",
        cooldownSATB: "cooldownATB",
        satbDelaySecCounter: "delaySecCounter",
        curSATBProportion: "curATBProportion",
        coreSATBProportion: "coreATBProportion",
        chargeSATBProportion: "chargeATBProportion",
        cooldownSATBProportion: "cooldownATBProportion",
        isSATBFill: "isFill",
        isSATBCharge: "isCharge",
        isSATBCooldown: "isCooldown",
        curSATBRate: "curRate",
        coreSATBRate: "coreRate",
        chargeSATBRate: "chargeRate",
        cooldownSATBRate: "cooldownRate",
        onCancelSATBCharge: "onCancelCharge",
        onCancelSATBCooldown: "onCancelCooldown",
        onStartForceSATBCharge: "onStartForceCharge",
        onEndForceSATBCharge: "onEndForceCharge"
    }; // _SATB.PHASE_TYPE_FORWARDED_FUNCS
    //

    /*------------------------------------------------------------------------
     *    New public variables
     *------------------------------------------------------------------------*/
    // {[{Number, Skill|Item}]} latestSATBItems: Latest inputted skills/items

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isBecomeNotActable: Whether the battler becomes bot act
    //       {Game_SATBNotes} notes: The notetag results
    //       {Game_SATBPhaseTypes} phaseTypes: All ATB phase/state manipulations
    //       {Non-ve Int} actTimes: The virtual number of action slots
    //       (v0.16a+){Non-ve Int} maxActTimes: The maximum virtual number of
    //                                          action slots
    //       {+ve Num?} _cachedBaseCoreMax_: The cached coreMaxATBVal value
    //       {+ve Num?} _cachedBaseChargeMax_: The cached chargeMaxATBVal value
    //       {+ve Num?} _cachedBaseCooldownMax_: Cached cooldownMaxATBVal value

    _GB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function(actorId) {
    // v0.00a - v0.00a; Extended
        // This method must be called first or _SATB._refresh would crash
        _SATB._init.call(this); // Added to initialize all superlative ATB vars
        //
        _GB.initialize.apply(this, arguments);
    }; // $.initialize

    _GB.addState = $.addState;
    _SATB.addState = $.addState = function(stateId) {
    // v0.00a - v0.16a; Extended
        // Added to mark that state notetags might have changed
        if (this.isStateAddable(stateId) && !this.isStateAffected(stateId)) {
            this._satb.notes.markChangeFactors(["states", "usableSkills"]);
        }
        // This must be placed here before calling refresh
        _GB.addState.apply(this, arguments);
    }; // $.addState

    _GB.removeState = $.removeState;
    _SATB.removeState = $.removeState = function(stateId) {
    // v0.00a - v0.00a; Extended
        // Added to mark that state notetags might have changed
        if (this.isStateAffected(stateId)) {
            this._satb.notes.markChangeFactors(["states", "usableSkills"]);
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
    // v0.00a - v0.16a; Extended
        // Edited to simplify the non bundle action input and execution logic
        if (SATBManager.isEnabled() && this.satbActMode() !== "bundle") {
            return 1;
        } else return _GB.makeActionTimes.apply(this, arguments);
        //
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
     * @abstract @interface @since v0.00a @version v0.16a
     */
    $.setPreemptStartSATB = function() {
        if (!SATBManager.areModulesEnabled(["IsStartEnabled"])) {
            // So this plugin still works for battler not being actor nor enemy
            return this.setNormStartSATB();
            //
        } else this.setStartSATB(this.satbNoteResult_("preemptStartATBVal"));
    }; // $.setPreemptStartSATB

    /**
     * Idempotent
     * @abstract @interface @since v0.00a @version v0.16a
     */
    $.setSurpriseStartSATB = function() {
        if (!SATBManager.areModulesEnabled(["IsStartEnabled"])) {
            // So this plugin still works for battler not being actor nor enemy
            return this.setNormStartSATB();
            //
        } else this.setStartSATB(this.satbNoteResult_("surpriseStartATBVal"));
    }; // $.setSurpriseStartSATB

    // (v0.16a+)Refers to the Game_SATBActs counterparts
    Object.keys(_SATB.ACT_FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB.ACT_FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.acts[f].apply(this._satb.acts, arguments);
        }; // $[func]
        //
    });
    //

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
        var param = "coreMaxATBVal", cache = "_cachedBaseCoreMax_";
        return SATBManager.funcParam.call(this._satb, param, cache, this);
        //
    }; // $.baseCoreMaxSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.16a
     * @returns {+ve Num} Base Maximum ATB charge value of battler involved
     */
    $.baseChargeMaxSATB = function() {
        // Game_SATBPhaseTypes doesn't handle max ATB so it should stay here
        var param = "chargeMaxATBVal", cache = "_cachedBaseChargeMax_";
        var arg = this.coreMaxSATB();
        return SATBManager.funcParam.call(this._satb, param, cache, this, arg);
        //
    }; // $.baseChargeMaxSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05a @version v0.17a
     * @returns {+ve Num} Base Maximum ATB cooldown value of battler involved
     */
    $.baseCooldownMaxSATB = function() {
        // Game_SATBPhaseTypes doesn't handle max ATB so it should stay here
        var param = "cooldownMaxATBVal", cache = "_cachedBaseCooldownMax_";
        var arg = this.coreMaxSATB();
        return SATBManager.funcParam.call(this._satb, param, cache, this, arg);
        //
    }; // $.baseCooldownMaxSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @enum @returns {String} The current action mode of this battler
     */
    $.satbActMode = function() {
        var actMode = this.satbNoteResult_("actMode");
        return actMode.replace(/\W+/g, "").toLowerCase();
    }; // $.satbActMode

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
     * Hotspot/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.hasLatestSATBItems = function() {
        return this.latestSATBItems.length > 0;
    }; // $.hasLatestSATBItems

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.08a @version v0.16a
     * @returns {Number} The speed of the action to be executed
     */
    $.satbActSpeed = function() {
        if (SATBManager.areModulesEnabled(["IsSpeedEnabled"])) {
            return this.satbNoteResult_("actSpeed");
        } else return this.latestSATBItems.reduce(_SATB._ACT_SPEED, 0);
    }; // $.satbActSpeed

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
     * @interface @since v0.00a @version v0.16a
     */
    $.initSATBNotes = function() {
        // Acts must use the same cache as notes to have proper invalidations
        var cache = new Game_SATBCache();
        this._satb.acts = new Game_SATBActs(this, cache);
        this._satb.notes = new Game_SATBNotes(this, cache);
        //
        this._satb.phaseTypes = new Game_SATBPhaseTypes(this);
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks as it's the battler as a dependency
        ["acts", "notes", "phaseTypes"].forEach(_SATB._clearSATBHelper, this);
        //
    }; // $.clearSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.16a
     */
    $.setNormStartSATB = function() {
        if (SATBManager.areModulesEnabled(["IsStartEnabled"])) {
            this.setStartSATB(this.satbNoteResult_("normStartATBVal"));
        } else this.initCoreSATBActs(0);
    }; // $.setNormStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} val - The starting ATB value of the battler
     */
    $.setStartSATB = function(val) {
        this.initCoreSATBActs(this.canMove() ? val : 0);
    }; // $.setStartSATB

    /**
     * Hotspot
     * @interface @since v0.12a @version v0.12a
     */
    $.updateSATB = function() {
        _SATB._fillATB.call(this);
        _SATB._updateCountdownStates.call(this);
    }; // $.updateSATB

    /**
     * Idempotent Without Events
     * @interface @since v0.04a @version v0.16a
     */
    $.didFinishSATBInput = function() {
        _SATB._updateActStateTurns.call(this);
        this.latestSATBItems = this._satb.acts.newLatestItems_();
        if (_SATB._isPayBeforeExecCharge.call(this)) {
            this.latestSATBItems.forEach(function(item) {
                _GB.useItem.call(this, item.item);
            }, this);
        }
        this._satb.phaseTypes.onStartCharge();
        this.refresh(); // To detect ATB phase changes
        this.runSATBNote("didFinishInput");
    }; // $.didFinishSATBInput

    /**
     * Idempotent Without Events
     * @interface @since v0.00a @version v0.06a
     */
    $.onBecomeSATBActable = function() {
        BattleManager.addSATBActBattler(this);
        this.runSATBNote("didBecomeActable");
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
        // This must be placed before onStartCooldown or reset val would wrong
        _SATB._onReset.call(this);
        //
        // The ordering must be this or latestSATBItems would be emptied
        this._satb.phaseTypes.onStartCooldown();
        this.eraseVirtualSATBActSlot();
        this.refresh(); // To detect ATB phase changes
        // onStartCooldown should be run before running onBecomeNotSATBActable
    }; // $.onAllSATBActsEnd

    /**
     * @interface @since v0.05a @version v0.05a
     * @todo Thinks of how to add an event to be run in the Event Module here
     */
    $.eraseVirtualSATBActSlot = function() {
        if (!SATBManager.isEnabled()) return;
        this.addSATBActTimes(-this.satbNoteResult_("actCost"));
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
     * Script Call/Idempotent Without Events
     * @interface @since v0.00a @version v0.15b
     * @param {Nonnegative Int} actTimes - The new number of virtual action slot
     */
    $.setSATBActTimes = function(actTimes) {
        this._satb.acts.setActTimes(actTimes);
        this.runSATBNote("didSetActTimes");
    }; // $.setSATBActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Nonnegative Int} increment - Max virtual action slot increment
     */
    $.addMaxSATBActTimes = function(increment) {
        this.setMaxSATBActTimes(this.maxSATBActTimes() + increment);
    }; // $.addMaxSATBActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Nonnegative Int} multiplier - Max virtual action slot multipler
     */
    $.multiplyMaxSATBActTimes = function(multiplier) {
        this.setMaxSATBActTimes(this.maxSATBActTimes() * multiplier);
    }; // $.multiplyMaxSATBActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Nonnegative Int} maxActTimes - New max no of virtual action slot
     */
    $.setMaxSATBActTimes = function(maxActTimes) {
        this._satb.acts.setMaxActTimes(maxActTimes);
        this.runSATBNote("didSetMaxActTimes");
    }; // $.setMaxSATBActTimes

    /**
     * Idempotent Without Events
     * @interface @since v0.05b @version v0.16a
     */
    $.onStartSATBFill = function() {
        this._satb.phaseTypes.onStartFill();
        this.latestSATBItems = [];
        this.refresh(); // To detect ATB phase changes
        this.runSATBNote("didStartATBFill");
    }; // $.onStartSATBFill

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.16a
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
     * @since v0.00a @version v0.16a
     */
    _SATB._makeActs = function() {
        if (this.canMakeSATBCmds()) return;
        // This must be set first as _SATB._newActTimes uses it right afterwards
        this._satb.maxActTimes = _SATB._newMaxActTimes.call(this);
        //
        // It's not idempotent as makeActionTimes are random by default
        this.setSATBActTimes(_SATB._newActTimes.call(this));
        //
    }; // _SATB._makeActs

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @since v0.16a @version v0.16a
     * @returns {Number} The new maximum number of virtual action slots
     */
    _SATB._newMaxActTimes = function() {
        if (this.satbActMode() === "bundle") return this.numActions();
        return _GB.makeActionTimes.apply(this, arguments);
    }; // _SATB._newMaxActTimes

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @since v0.16a @version v0.16a
     * @returns {Number} The new starting number of virtual action slots
     */
    _SATB._newActTimes = function() {
        return this.satbActMode() === "discrete" ? 1 : this.maxSATBActTimes();
    }; // _SATB._newActTimes

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.04a
     */
    _SATB._onTurnEnd = function() {
        if (SATBManager.isEnabled()) this.removeBuffsAuto();
    }; // _SATB._onTurnEnd

    /**
     * Hotspot
     * @since v0.00a @version v0.10a
     */
    _SATB._fillATB = function() {
        if (this.canMove()) return this._satb.phaseTypes.fillATB();
        // Unmovable battlers still need to show the right maximum ATB value
        this._satb.phaseTypes.checkUpdatedMaxes(); // It's just to play safe
        //
    }; // _SATB._fillATB

    /**
     * Hotspot
     * @since v0.12a @version v0.12a
     */
    _SATB._updateCountdownStates = function() {
        if (!SATBManager.areModulesEnabled(["IsCountdownEnabled"])) return;
        // It actually checks against every effective state to be sure
        Object.keys(this._satb.countdownStateCounters).forEach(
                _SATB._updateCountdownState, this);
        //
    }; // _SATB._updateCountdownStates

    /**
     * Hotspot
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the countdown state to be updated
     */
    _SATB._updateCountdownState = function(stateId) {
        stateId = +stateId; // The key of an Object's always String
        var unitInterval = this.satbNoteResult_("countdown", {
            state: $dataStates[stateId]
        });
        if (!unitInterval) return;
        var interval = unitInterval.interval;
        if (!interval || interval === 0) return;
        var unit = unitInterval.unit;
        var counterUnits = this._satb.countdownStateCounters[stateId];
        counterUnits[unit] += _SATB._COUNTDOWN_STATE_COUNTER_INCREMENT(unit);
        var counter = counterUnits[unit];
        _SATB._updateCountdownStateTurn.call(this, stateId, interval, counter);
    }; // _SATB._updateCountdownState

    /**
     * Hotspot
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the countdown state to be updated
     * @param {Number} interval - The number of units as a state turn interval
     * @param {Number} counter - The countdown state interval counter
     */
    _SATB._updateCountdownStateTurn = function(stateId, interval, counter) {
        if (_SATB._IS_DECREASE_COUNTDOWN_STATE_TURN(interval, counter)) {
            _SATB._decreaseCountdownStateTurn.call(this, stateId);
        } else if (_SATB._IS_INCREASE_COUNTDOWN_STATE_TURN(interval, counter)) {
            _SATB._increaseCountdownStateTurn.call(this, stateId);
        }
    }; // _SATB._updateCountdownStateTurn

    /**
     * Hotspot
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the countdown state to be updated
     */
    _SATB._decreaseCountdownStateTurn = function(stateId) {
        GBB.resetCountdownStateCounter.call(this, stateId);
        this._stateTurns[stateId]--;
        if (this.isStateExpired(stateId)) return this.removeState(stateId);
        this.runSATBNote("didDecreaseCountdownStateTurn", {
            state: $dataStates[stateId],
            stateId: stateId
        });
    }; // _SATB._decreaseCountdownStateTurn

    /**
     * Hotspot/Idempotent
     * @since v0.12a @version v0.12a
     * @param {Id} stateId - The id of the countdown state to be updated
     */
    _SATB._increaseCountdownStateTurn = function(stateId) {
        GBB.resetCountdownStateCounter.call(this, stateId);
        this._stateTurns[stateId]++;
        this.runSATBNote("didIncreaseCountdownStateTurn", {
            state: $dataStates[stateId],
            stateId: stateId
        });
    }; // _SATB._increaseCountdownStateTurn

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
        if (!this.satbNoteResult_("coreActState", { state: state })) return;
        var isCountdown = SATBManager.areModulesEnabled(["IsCountdownEnabled"]);
        if (isCountdown && this.satbNoteResult_("countdown", {
            state: state
        })) return;
        var id = state.id;
        if (this._stateTurns[id] > 0) return this._stateTurns[id] -= 1;
        this.removeState(id);
    }; // _SATB._updateActStateTurn

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
     * @since v0.04a @version v0.16a
     * @param {[Module]} modules - The list of modules that need to be enabled
     * @param {[NoteType]} notes - The list of notes needing any to be present
     * @returns {Boolean} The check result
     */
    _SATB._isItemNote = function(modules, notes) {
        if (!SATBManager.areModulesEnabled(modules)) return false;
        if (!this.hasLatestSATBItems()) return false;
        var items = this.latestSATBItems.map(_SATB._LATEST_SKILL_ITEM);
        return this._satb.notes.hasAnyNote(notes, items);
    }; // _SATB._isItemNote

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.05b @version v0.05b
     */
    _SATB._onBecomeNotActable = function() {
        BattleManager.eraseSATBActBattler(this);
        this._satb.phaseTypes.onEndCharge();
        this.refresh(); // To detect actability/inputability/ATB phase changes
    }; // _SATB._onBecomeNotActable

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.07a @version v0.07a
     */
    _SATB._onReset = function() {
        var phaseTypes = this._satb.phaseTypes;
        phaseTypes.setResetATBVal(this.satbNoteResult_("resetATBVal", {
            latestResetATBVal: phaseTypes.resetATBVal()
        }));
    }; // _SATB._onReset

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
            this._satb.notes.markChangeFactors([
                "weapons",
                "armors",
                "usableSkills"
            ]);
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
            this._satb.notes.markChangeFactors.markChangeFactors([
                "weapons",
                "armors",
                "usableSkills"
            ]);
        }
        // This must be placed here before calling refresh
        _GA.changeEquip.apply(this, arguments);
    }; // $[func]

    ["learnSkill", "forgetSkill"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.16a - v0.16a; Extended
            _GA[func].apply(this, arguments);
            // Added to mark that skill notetags might have changed
            _SATB._markSkillChangeFactors.call(this);
            // Those original methods won't call refrsh themselves
        }; // $[func]
        //
    });

    _GA.changeClass = $.changeClass;
    _SATB.changeClass = $.changeClass = function(classId, keepExp) {
    // v0.00a - v0.00a; Extended
        // Added to mark that class notetags might have changed
        this._satb.notes.markChangeFactors(["class", "usableSkills"]);
        // This must be placed here before calling refresh
        _GA.changeClass.apply(this, arguments);
    }; // $.changeClass

    ["makeAutoBattleActions", "makeConfusionActions"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            _GA[func].apply(this, arguments);
            // Added to ensure that the actor will be able to execute actions
            this.didFinishSATBInput();
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
     * @interface @since v0.00a @version v0.16a
     */
    $.setPreemptStartSATB = function() {
        if (SATBManager.areModulesEnabled(["IsStartEnabled"])) {
            $$.setPreemptStartSATB.call(this);
        } else this.setStartSATB(this.coreMaxSATB());
    }; // $.setPreemptStartSATB

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.didFinishSATBInput = function() {
        $gameParty.eraseSATBInputableActor(this);
        $$.didFinishSATBInput.call(this);
    }; // $.didFinishSATBInput

    /**
     * Script Call/Idempotent Without Events
     * @interface @since v0.16a @version v0.16a
     * @param {Nonnegative Int} actTimes - The new number of virtual action slot
     */
    $.setSATBActTimes = function(actTimes) {
        $$.setSATBActTimes.call(this, actTimes);
        // Otherwise actors could input action slots that no longer exist
        if (this.usedSATBActTimes() < this.satbActTimes()) return;
        BattleManager.selectNextCommand();
        //
    }; // $.setSATBActTimes

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._setup = function() {
        // Refresh should be called as it's possible to change the max ATB val
        this._satb.notes.markChangeFactors(["actor", "class", "usableSkills"]);
        this.refresh();
        //
    }; // _SATB._setup

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v0.16a @version v0.16a
     */
    _SATB._markSkillChangeFactors = function() {
        this._satb.notes.markChangeFactors(["skills", "usableSkills"]);
        this.refresh();
    }; // _SATB._markSkillChangeFactors

})(DoubleX_RMMV.SATB); // Game_Actor.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *      - Implements the ATB value, input and action logic detail for enemies
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Enemy = { orig: {}, new: {} };
    var _GE = SATB.Game_Enemy.orig, _SATB = SATB.Game_Enemy.new;
    var $ = Game_Enemy.prototype, $$ = Game_Battler.prototype;

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
        this.didFinishSATBInput();
        //
    }; // $.makeActions

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.16a
     */
    $.setSurpriseStartSATB = function() {
        if (SATBManager.areModulesEnabled(["IsStartEnabled"])) {
            $$.setSurpriseStartSATB.call(this);
        } else this.setStartSATB(this.coreMaxSATB());
    }; // $.setSurpriseStartSATB

    /**
     * The this pointer is Game_Enemy.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._setup = function() {
        // Refresh should be called as it's possible to change max ATB val
        this._satb.notes.markChangeFactors(["enemy", "usableSkills"]);
        this.refresh();
        //
    }; // _SATB._setup

    /**
     * The this pointer is Game_Enemy.prototype
     * Idempotent
     * @since v0.00a @version v0.14a
     */
    _SATB._transform = function() {
        // Refresh should be called as it's possible to change max ATB val
        this._satb.notes.markChangeFactors(["enemy", "usableSkills"]);
        this.refresh();
        //
        // Ensures the order window will be updated immediately
        SATBManager.procScene_("onTransformSATBEnemy", [this]);
        //
    }; // _SATB._transform

})(DoubleX_RMMV.SATB); // Game_Enemy.prototype

/*----------------------------------------------------------------------------
 *    # (v0.16a+)New class: Game_SATBActs
 *      - Implements all battler action cost, slots and times business logics
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBActs.prototype;
    var _SATB = SATB.Game_SATBActs = {};

    _SATB._IS_INPUTTED_ACT = function(act) { // Potential Hotspot
        return act.item() && (!act.needsSelection() || act._targetIndex >= 0);
    }; // _SATB._IS_INPUTTED_ACT
    // Potential Hotspot
    _SATB._INPUTTED_ITEM = function(act) { return { item: act.item() }; };
    //
    _SATB._MIN_SORT = function(a, b) { return a - b; };
    _SATB._NEW_LATEST_ITEM = function(act) {
        var item = act.item();
        return item ? { speed: item.speed, item: item } : undefined;
    }; // _SATB._NEW_LATEST_ITEM

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler involved in the action logics
    // {Game_SATBCache} _cache: The helper caching notetag list/result
    // {Nonnegative Int} _actTimes: The current number of virtual action slots
    // {Nonnegative Int} _maxActTimes: The max number of virtual action slots
    // {Nonnegative Number} _lastMinActCost: The last minimum action cost

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.16a
     * @param {Game_Battler} battler - The battler involved in the action logics
     * @param {Game_SATBCache} cache - The helper caching notetag list/result
     */
    $.initialize = function(battler, cache) {
        this._battler = battler, this._cache = cache;
        // The latest items should be emptied as well to avoid invalid states
        battler.latestSATBItems = [];
        // refresh can't be called or the game crash with uninitialized battler
        this._actTimes = this._maxActTimes = this._lastMinActCost = 0;
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.16a @version v0.16a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        //
    }; // $.clear

    /**
     * Script Call/Nullipotent
     * @interface @since v0.03a @version v0.03a
     * @returns {Nonnegative Int} The current number of virtual action slots
     */
    $.actTimes = function() { return this._actTimes; };

    /**
     * Script Call/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The maximum number of virtual action slots
     */
    $.maxActTimes = function() { return this._maxActTimes; };

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The number of used virtual action slots
     */
    $.usedActTimes = function() {
        var acts = this._battler._actions.filterMap(
                _SATB._IS_INPUTTED_ACT, _SATB._INPUTTED_ITEM);
        return this._battler.latestSATBItemNoteResult_("actCost", acts);
    }; // $.usedActTimes

    /**
     * Script Call/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Number} The minimum action cost of all usable skills/items
     */
    $.minActCost = function() {
        var cache = this._cache;
        var cachedMinActCost = cache.result_("minActCost");
        if (!isNaN(cachedMinActCost)) return cachedMinActCost;
        var newMinActCost = this._newMinActCost();
        cache.updateResult("minActCost", undefined, newMinActCost);
        return newMinActCost;
    }; // $.minActCost

    /**
     * Hotspot/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Number} The last minimum action cost of all usable skills/items
     */
    $.lastMinActCost = function() {
        var lastMinActCost = this._lastMinActCost;
        this._lastMinActCost = this.minActCost();
        return lastMinActCost;
    }; // $.lastMinActCost

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @param {Datum} item - The skill/item to be checked against
     * @returns {Boolean} The check result
     */
    $.hasEnoughActTimes = function(item) {
        var actCost = this._battler.latestSATBItemNoteResult_("actCost", [
            { item: item }
        ]);
        if (this.satbActMode() !== "bundle") return actCost <= this.actTimes();
        return actCost <= this.actTimes() - this.usedActTimes();
    }; // $.hasEnoughActTimes

    /**
     * Nullipotent
     * @interface @since v0.05b @version v0.16a
     * @returns {[{Int, Datum}]} The latest inputted skills/items of the battler
     */
    $.newLatestItems_ = function() {
        return this._battler._actions.mapFilter(
                _SATB._NEW_LATEST_ITEM, Boolean);
    }; // $.newLatestItems_

    /**
     * Script Call/Idempotent
     * @interface @since v0.15b @version v0.16a
     * @param {Nonnegative Int} actTimes - The new number of virtual action slot
     */
    $.setActTimes = function(actTimes) {
        var hadActs = this.actTimes() > 0, hasActs = actTimes > 0;
        // It doesn't make sense to have negative virtual action slots
        this._actTimes = Math.max(actTimes, 0);
        //
        var actMode = this._battler.satbActMode();
        if (actMode === "bundle") {
            // Number of real action slots must be consistent in the bundle mode
            this._battler._actions.length = this.actTimes();
            //
        } else if (actMode === "discrete") {
            this._correctDiscreteActTimes(actTimes);
        }
        // Ensures that the ATB value will become full
        if (!hadActs && hasActs) return this._battler.fillUpCoreSATB();
        //
        if (!hadActs || hasActs) return;
        // Ensures that the ATB value will become not full
        this._battler._satb.phaseTypes.addSmallestCoreSATBDecrement();
        //
    }; // $.setActTimes

    /**
     * Script Call/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Nonnegative Int} maxActTimes - New max no of virtual action slot
     */
    $.setMaxActTimes = function(maxActTimes) {
        this._maxActTimes = maxActTimes;
        if (this._battler.satbActMode() !== "discrete") return;
        if (maxActTimes >= this.actTimes()) return;
        this._battler.setSATBActTimes(maxActTimes);
    }; // $.setMaxActTimes

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @returns {Number} The new minimum action cost of all usable skills/items
     */
    $._newMinActCost = function() {
        var minSkillActCost = this._minPartActCost("usableSkills");
        var minItemActCost = this._minPartActCost("usableItems");
        return Math.min(minSkillActCost, minItemActCost);
    }; // $._newMinActCost

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @enum @param {String} part - The skill/item part involved
     * @returns {Number} The minimum action cost of the skill/item part
     */
    $._minPartActCost = function(part) {
        var minActCost = this._cache.partResult_("minActCost", undefined, part);
        if (!isNaN(minActCost)) return minActCost;
        var newActCost = this._newMinPartActCost(part);
        this._cache.updatePartResult("minActCost", undefined, part, newActCost);
        return newActCost;
    }; // $._minPartActCost

    /**
     * Hotspot/Nullipotent
     * @since v0.16a @version v0.16a
     * @enum @param {String} part - The skill/item part involved
     * @returns {Number} The new minimum action cost of the skill/item part
     * @todo Caches the part list data without compromising Game_SATBCache
     */
    $._newMinPartActCost = function(part) {
        var partListData = this._cache.partListData(part, this._battler);
        // The battler shouln't be able to act if there's no usable skills/items
        var newMinPartActCost = partListData.map(function(item) {
            return this._battler.latestSATBItemNoteResult_("actCost", [
                  { item: item }
            ]);
        }, this).sort(_SATB._MIN_SORT)[0] || Number.POSITIVE_INFINITY;
        // The inner function should be inline as it can't be used anywhere else
        return newMinPartActCost;
    }; // $._newMinPartActCost

    /**
     * Idempotent
     * @since v0.16a @version v0.16a
     * @param {Nonnegative Int} actTimes - The new number of virtual action slot
     */
    $._correctDiscreteActTimes = function(actTimes) {
        // The current number of action slots shouldn't exceed its maximum
        this._actTimes = Math.min(actTimes, this.maxActTimes());
        //
        // Number of virtual action slots must be in sync with the atb value
        var newATB = this.actTimes() * this._battler.coreMaxSATB();
        if (this._battler.coreSATB() === newATB) return;
        this._battler.setCoreSATB(newATB);
        //
    }; // $._correctDiscreteActTimes

})(DoubleX_RMMV.SATB); // Game_SATBActs.prototype

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBPhaseTypes
 *      - Implements all ATB business logic detail manipulations of a battler
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPhaseTypes.prototype;
    var _SATB = SATB.Game_SATBPhaseTypes = {};

    _SATB._ATBS = function() { // v0.04a+
        return _SATB.PHASES.reduce(_SATB._REDUCED_ATB_CONTAINER, {});
    }; // _SATB._ATBS
    _SATB._REDUCED_ATB_CONTAINER = function(container, phase) { // v0.04a+
        container[phase] = 0;
        return container;
    }; // _SATB._REDUCED_ATB_CONTAINER

    // v0.04a+
    _SATB._FORCE_CHARGE = "force", _SATB._FORCE_ACT = "act";
    _SATB._PHASE_FILL = "fill";
    _SATB._PHASE_CHARGE = "charge", _SATB._PHASE_COOLDOWN = "cooldown";
    //
    // Refer to reference tag SMALLEST_ATB_VAL_INCREMENT
    _SATB._SMALLEST_ATB_VAL_INCREMENT = Math.pow(2, -32);
    // Using Number.EPSILON would be too dangerous here

    // v0.04a+
    _SATB.PHASES = [
        _SATB._PHASE_FILL,
        _SATB._PHASE_CHARGE,
        _SATB._PHASE_COOLDOWN
    ]; // _SATB.PHASES
    //

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // (v0.04a+){ForceChargeState}_forceChargeState: Whether the action's forced
    //                                               to charge or execute
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // (v0.15a){Nonnegative Num} _delaySecCounter: The counter locking battler
    //                                             action inputs(watchdog timer)
    // (0.v16a){Nonnegative Num} _extraATB: The amount of ATB beyond 100% of max
    // (v0.04a+){Number} _forcedChargeBeyondMax: The amount of forced charge ATB
    //                                           beyond the maximum
    // (v0.04a+){{Number}} _atbs: The current ATB value of the battler of all
    //                            phases
    // (v0.04a+){{Number}} _lastATBs: The last current ATB value of the battler
    //                                of all phases
    // (v0.04a+){{Number}} _lastMaxes: The last maximum ATB value of the battler
    // (v0.07a+){Number} _resetATBVal: The accumulated battler reset ATB value
    // (v0.16a+){Number} _lastEnoughCoreATB: Discrete and continuous mode only
    // (v0.04a+){ATBPhase} _phase: The current ATB phase

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.16a
     * @param {Game_Battler} battler - The battler with effective notetag list
     */
    $.initialize = function(battler) {
        this._battler = battler, this._phase = _SATB._PHASE_FILL;
        // They must use separate containers to catch their supposed differences
        this._atbs = _SATB._ATBS(), this._lastATBs = _SATB._ATBS();
        //
        this._extraATB = this._forcedChargeBeyondMax = this._resetATBVal = 0;
        this._lastEnoughCoreATB = Number.NaN;
        this._lastMaxes = {};
        this._lastMaxes[_SATB._PHASE_FILL] = battler.coreMaxSATB();
        this._lastMaxes[_SATB._PHASE_CHARGE] = battler.chargeMaxSATB();
        this._lastMaxes[_SATB._PHASE_COOLDOWN] = battler.cooldownMaxSATB();
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
            case _SATB._PHASE_FILL: return this.coreATB();
            case _SATB._PHASE_CHARGE: return this.chargeATB();
            case _SATB._PHASE_COOLDOWN: return this.cooldownATB();
        }
    }; // $.curATB

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.16a
     * @returns {Number} The current ATB value of the battler
     */
    $.coreATB = function() {
        if (this._battler.satbActMode() === "discrete") {
            return this._atbs[_SATB._PHASE_FILL] + this._extraATB;
        } else return this._atbs[_SATB._PHASE_FILL];
    }; // $.coreATB

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
     * @interface @since v0.00a @version v0.16a
     * @returns {+ve Num} The ATB fill proportion of the battler
     */
    $.coreATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        var proportion = this.coreATB() * 1.0 / this._battler.coreMaxSATB();
        //
        // It's possible for the raw proportion to exceed 1 in the discrete mode
        if (proportion <= 1) return proportion;
        var remainder = proportion - Math.trunc(proportion);
        return remainder <= 0 ? 1 : remainder;
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
    $.isFill = function() { return this._phase === _SATB._PHASE_FILL; };

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
     *  Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.10a
     * @returns {Number} The current ATB fill rate
     */
    $.curRate = function() {
        switch (this._phase) {
            case _SATB._PHASE_FILL: return this.coreRate();
            case _SATB._PHASE_CHARGE: return this.chargeRate();
            case _SATB._PHASE_COOLDOWN: return this.cooldownRate();
        }
    }; // $.curRate

    /**
     *  Script Call/Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.16a
     * @returns {Number} The ATB fill rate without charge nor cooldown
     */
    $.coreRate = function() {
          if (SATBManager.areModulesEnabled(["IsRateEnabled"])) {
              return this._battler.satbNoteResult_("coreATBRate");
          } else return this._defaultFillRate();
    }; // $.coreRate

    /**
     *  Script Call/Hotspot/Nullipotent
     * @interface @since v0.10a @version v0.10a
     * @returns {Number} The ATB charge rate
     */
    $.chargeRate = function() {
        if (SATBManager.areModulesEnabled([
            "IsRateEnabled",
            "IsChargeEnabled"
        ])) return this._battler.satbNoteResult_("chargeATBRate");
        return this._defaultFillRate();
    }; // $.chargeRate

    /**
     *  Script Call/Hotspot/Nullipotent
     * @interface @since v0.10a @version v0.10a
     * @returns {Number} The ATB cooldown rate
     */
    $.cooldownRate = function() {
        if (SATBManager.areModulesEnabled([
            "IsRateEnabled",
            "IsCooldownEnabled"
        ])) return this._battler.satbNoteResult_("cooldownATBRate");
        return this._defaultFillRate();
    }; // $.cooldownRate

    /**
     * Script Call/Nullipotent
     * @interface @since v0.15a @version v0.15a
     * @returns {Nonnegative Num} Delay counter locking battler action inputs
     */
    $.delaySecCounter = function() { return this._delaySecCounter; };

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
        // Extra atb shouldn't be filled as max act slots might not be reached
        this.setCoreATB(this._battler.coreMaxSATB());
        //
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
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.15a @version v0.16a
     * @param {Nonnegative Num} multiplier - Delay counter locking battler input
     */
    $.multiplyDelaySecCounter = function(multiplier) {
        this.setDelaySecCounter(this.delaySecCounter() * multiplier);
    }; // multiplyDelaySecCounter

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.15a @version v0.16a
     * @param {Nonnegative Num} increment - Delay counter locking battler inputs
     */
    $.addDelaySecCounter = function(increment) {
        this.setDelaySecCounter(this.delaySecCounter() + increment);
    }; // addDelaySecCounter

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
            case _SATB._PHASE_FILL: return this.setCoreATB(val);
            case _SATB._PHASE_CHARGE: return this.setChargeATB(val);
            case _SATB._PHASE_COOLDOWN: return this.setCooldownATB(val);
        }
    }; // $.setCurATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setCoreATB = function(val) {
        // It means original ATB's already restored for discrete and continuous
        this._lastEnoughCoreATB = Number.NaN;
        //
        this._setATB(val, _SATB._PHASE_FILL);
        // val - this.coreATB will never be negative so there's no need to cap
        this._extraATB = val - this.coreATB();
        //
        if (this._battler.satbActMode() !== "discrete") return;
        var newActTimes = 1 + this._extraATB / this._battler.coreMaxSATB();
        if (newActTimes === this._battler.satbActTimes()) return;
        this._battler.setSATBActTimes(newActTimes);
    }; // $.setCoreATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.04a @version v0.16a
     * @param {Number} val - The new current charge ATB value of the battler
     */
    $.setChargeATB = function(val) {
        // A valid ATB charge must have a valid skill/item to be charged
        if (!this._battler.hasLatestSATBItems() || !this.isCharge()) return;
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
     * @interface @since v0.05a @version v0.16a
     * @param {Number} val - The new current cooldown ATB value of the battler
     * @todo Erases this performance tradeoff while still keeping the class nice
     */
    $.setCooldownATB = function(val) {
        // A valid ATB cooldown must have a valid skill/item to be cooled down
        if (!this._battler.hasLatestSATBItems() || !this.isCooldown()) return;
        //
        // The cooldown fill direction's opposite to normal and charge ATB
        var reversedVal = this._battler.cooldownMaxSATB() - val;
        this._setATB(reversedVal, _SATB._PHASE_COOLDOWN);
        // Reversing here's to simplify the cooldown logic in everywhere else
    }; // $.setCooldownATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.15a @version v0.15a
     * @param {Nonnegative Num} delay - Delay counter locking battler inputs
     */
    $.setDelaySecCounter = function(delay) { this._delaySecCounter = delay; };

    /**
     * Hotspot
     * @interface @since v0.04a @version v0.13a
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $.fillATB = function() {
        switch (this._phase) {
            case _SATB._PHASE_FILL: return this._onFillCoreATB();
            case _SATB._PHASE_CHARGE: return this._onFillChargeATB();
            case _SATB._PHASE_COOLDOWN: return this._onFillCooldownATB();
        }
    }; // $.fillATB

    /**
     * This method's practically idempotent but not theoretically so
     * @interface @since v0.00a @version v0.16a
     */
    $.addSmallestCoreSATBDecrement = function() {
        // Otherwise the increment would be too small for huge max ATB values
        var addMultiplier = Math.min(this._battler.coreMaxSATB(), 1);
        // It's derived from extensive testing
        var decrement = -_SATB._SMALLEST_ATB_VAL_INCREMENT * addMultiplier;
        var actMode = this._battler.satbActMode();
        if (actMode === "discrete" || actMode === "continuous") {
            this._setCoreATBJustNotEnough(decrement);
        } else this.addCoreATB(decrement);
    }; // $.addSmallestCoreSATBDecrement

    /**
     * Hotspot/Idempotent
     * @interface @since v0.04a @version v0.05b
     */
    $.checkUpdatedMaxes = function() {
        // The fill phase must be checked first as it might clear ATB values
        this._checkUpdatedMax(
                this.coreATB(), _SATB._PHASE_FILL, this._battler.coreMaxSATB());
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
     * Idempotent Without Events
     * @interface @since v0.04a @version v0.06a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancelCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this.isCharge() || !this._battler.canCancelChargeSATB()) return;
        this._battler.runSATBNote("willCancelCharge");
        this.clearChargeATB();
    }; // $.onCancelCharge

    /**
     * Idempotent Without Events
     * @interface @since v0.04a @version v0.16a
     */
    $.onStartForceCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this.isCharge() || !this._battler.canForceChargeSATB()) return;
        this._forcedChargeBeyondMax = 0;
        this._forceChargeState = _SATB._FORCE_CHARGE;
        this._battler.runSATBNote("didStartForceCharge");
    }; // $.onStartForceCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.15b
     */
    $.onEndForceCharge = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        // They ensures disabling forcing during force won't make invalid states
        if (!this.isCharge()) return;
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) return;
        //
        /** @todo Considers Adding didEndForceCharge so this becomes optional */
        SoundManager.playOk();
        //
        // Refer to reference tag MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM
        var canForceCharge = this._battler.canForceChargeSATB();
        this._forceChargeState = canForceCharge ? _SATB._FORCE_ACT : "";
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
     * Idempotent Without Events
     * @interface @since v0.05a @version v0.05a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancelCooldown = function() {
        if (!SATBManager.areModulesEnabled(["IsCooldownEnabled"])) return;
        if (this.isCooldown() && this._battler.canCancelCooldownSATB()) {
            this._battler.runSATBNote("willCancelCooldown");
            this._onCooldownATBBecomeFull();
        }
    }; // $.onCancelCooldown

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.07a
     */
    $.onStartFill = function() {
        this._phase = _SATB._PHASE_FILL;
        this._useResetATBVal();
    }; // $.onStartFill

    /**
     * Idempotent
     * @interface @since v0.07a @version v0.07a
     */
    $.resetATBVal = function() { return this._resetATBVal; };

    /**
     * Idempotent
     * @interface @since v0.07a @version v0.07a
     */
    $.setResetATBVal = function(resetATBVal) {
        this._resetATBVal = resetATBVal;
    }; // setResetATBVal

    /**
     * Hotspot
     * @since v0.00a @version v0.13a
     */
    $._onFillCoreATB = function() {
        this._fillCoreATB();
        this._updateDelaySecCounter();
        this._battler.runSATBNote("didFillCoreATB");
    }; // $._onFillCoreATB

    /**
     * Hotspot
     * @since v0.00a @version v0.16a
     */
    $._fillCoreATB = function() {
        // Discrete and continuous modes need to restore the original ATB values
        if (isNaN(this._lastEnoughCoreATB)) {
            this.addCoreATB(this.coreRate());
        } else this.setCoreATB(this._lastEnoughCoreATB);
        //
    }; // $._fillCoreATB

    /**
     * Hotspot
     * @since v0.15a @version v0.16a
     * @todo Thinks of if SceneManager._deltaTime is as correct as Date.now()
     */
    $._updateDelaySecCounter = function() {
        if (this.delaySecCounter() <= 0) return;
        if (SATBManager.areModulesEnabled(["IsDelayEnabled"])) {
            this.addDelaySecCounter(-SceneManager._deltaTime);
        } else this.setDelaySecCounter(0);
        if (this.delaySecCounter() <= 0) this._onDelayCounterEnd();
    }; // $._updateDelaySecCounter

    /**
     * Hotspot
     * @since v0.15a @version v0.15a
     */
    $._onDelayCounterEnd = function() {
        this._battler.makeActions();
        this._battler.runSATBNote("didDelayCounterEnd");
    }; // $._onDelayCounterEnd

    /**
     * Hotspot
     * @since v0.04a @version v0.13a
     */
    $._onFillChargeATB = function() {
        this._fillChargeATB();
        this._battler.runSATBNote("didFillChargeATB");
    }; // $._onFillChargeATB

    /**
     * Hotspot
     * @since v0.04a @version v0.06a
     */
    $._fillChargeATB = function() {
        // Refer to reference tag NON_CHARGING_SKILL_ITEM_INSTANT_CHARGE
        if (!this._battler.isSATBChargeItem()) return this.fillUpChargeATB();
        //
        if (this._forceChargeState === _SATB._FORCE_ACT) return;
        this.addChargeATB(this.chargeRate());
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) return;
        if (this.chargeATBProportion() <= 1) return;
        // Otherwise force charge ATB beyond max won't update the bar instantly
        BattleManager.onSATBBarRefresh([this._battler]);
        //
    }; // $._fillChargeATB

    /**
     * Hotspot
     * @since v0.05a @version v0.05a
     */
    $._onFillCooldownATB = function() {
        this._fillCooldownATB();
        this._battler.runSATBNote("didFillCooldownATB");
    }; // $._onFillCooldownATB

    /**
     * Hotspot
     * @since v0.05a @version v0.05a
     */
    $._fillCooldownATB = function() {
        // Refer to reference tag NON_COOLDOWN_SKILL_ITEM_INSTANT_COOLDOWN
        if (!this._battler.isSATBCooldownItem()) return this.setCooldownATB(0);
        //
        this.addCooldownATB(-this.cooldownRate());
    }; // $._fillCooldownATB

    /**
     * Hotspot/Nullipotent
     * @since v0.10a @version v0.10a
     * @returns {Number} The default ATB gain rate of all ATB phases
     */
    $._defaultFillRate = function() {
          // The base max should be used or changing max won't change fill rate
          var baseFillRate = BattleManager.coreBaseSATBFillRate();
          var baseMax = this._battler.baseCoreMaxSATB();
          var avgAgi = BattleManager.satbAvgAgi;
          return baseFillRate * this._battler.agi * baseMax * 1.0 / avgAgi;
          //
    }; // $._defaultFillRate

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
            case _SATB._PHASE_FILL: return this._battler.coreMaxSATB();
            case _SATB._PHASE_CHARGE: return this._battler.chargeMaxSATB();
            case _SATB._PHASE_COOLDOWN: return this._battler.cooldownMaxSATB();
            // It's impossible to fallback into any sensible default
            default: throw new Error(phase + " isn't a valid ATB phase!");
            //
        }
    }; // $._maxATB

    /**
     * Idempotent
     * @since v0.16a @version v0.16a
     * @param {Number} decrement - The amount to be subtracted from just enough
     */
    $._setCoreATBJustNotEnough = function(decrement) {
        // The ordering must be this or _lastEnoughCoreATB would be used now
        this.setCoreATB(this._coreATBThreshold() - decrement);
        this._lastEnoughCoreATB = this.coreATB();
        //
    }; // $._setCoreATBJustNotEnough

    /**
     * Nullipotent
     * @since v0.16a @version v0.16a
     * @returns {+ve Num} The minimum amount of ATB to be able to input actions
     */
    $._coreATBThreshold = function() {
        // The action mode must be discrete or continuous to be here
        if (this._battler.satbActMode() === "discrete") return this.coreMax();
        return this._battler.minSATBActCost();
        //
    }; // $._coreATBThreshold

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
     * @since v0.05b @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     */
    $._checkIsBecomeFullNotFull = function(val, phase, max) {
        var result = this._isBecomeEnoughNotEnough(val, phase, max);
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        if (result.isBecomeEnough) return this._onATBBecomeFull(phase, max);
        // And DECREASED_MAX_CHARGE_ATB_ACTABLE
        // Refers to reference tag INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
        if (result.isBecomeNotEnough) this._onATBBecomeNotFull(phase);
        // And INCREASED_MAX_CHARGE_ATB_NOT_ACTABLE
    }; // $._checkIsBecomeFullNotFull

    /**
     * Hotspot/Nullipotent
     * @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     * @returns {{Boolean}} The check result of becoming enough or not enough
     */
    $._isBecomeEnoughNotEnough = function(val, phase, max) {
        var isContinuous = this._battler.satbActMode() === "continuous";
        if (phase !== _SATB._PHASE_FILL || !isContinuous) {
            return this._isBecomeFullNotFull(val, phase, max);
        }
        var isEnough = this._battler.minSATBActCost() <= val;
        var lastMinActCost = this._battler._satb.acts.lastMinActCost();
        var wasEnough = lastMinActCost <= this._lastATBs[_SATB._PHASE_FILL];
        return {
            isBecomeEnough: !wasEnough && isEnough,
            isBecomeNotEnough: wasEnough && !isEnough
        };
    }; // $._isBecomeEnoughNotEnough

    /**
     * Hotspot/Nullipotent
     * @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {ATBPhase} phase - The phase of the current ATB value to be set
     * @param {+ve Num} max - The maximum ATB value of the specified phase
     * @returns {{Boolean}} The check result of becoming enough or not enough
     */
    $._isBecomeFullNotFull = function(val, phase, max) {
        var isFull = max <= val;
        var wasFull = this._lastMaxes[phase] <= this._lastATBs[phase];
        return {
            isBecomeEnough: !wasFull && isFull,
            isBecomeNotEnough: wasFull && !isFull
        };
    }; // $._isBecomeFullNotFull

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
            case _SATB._PHASE_FILL: return this._onCoreATBBecomeFull();
            case _SATB._PHASE_CHARGE: return this._onChargeATBBecomeFull();
            // The cooldown ATB used in the reverse direction so full = empty
            case _SATB._PHASE_COOLDOWN: return this._onCooldownATBBecomeFull();
            //
        }
    }; // $._onATBBecomeFull

    /**
     * Idempotent Without Events
     * @since v0.00a @version v0.16a
     */
    $._onCoreATBBecomeFull = function() {
        if (SATBManager.areModulesEnabled(["IsDelayEnabled"])) {
            this.setDelaySecCounter(this._battler.satbNoteResult_("delay"));
        } else this.setDelaySecCounter(0);
        // It's okay for unmovable battlers to have full atb which will be reset
        if (this.delaySecCounter() <= 0 && this._battler.canMove()) {
            this._battler.makeActions();
        }
        //
        this._battler.runSATBNote("didCoreATBBecomeFull");
    }; // $._onCoreATBBecomeFull

    /**
     * Idempotent
     * @since v0.04a @version v0.16a
     */
    $._onChargeATBBecomeFull = function() {
        // It's to prevent errors from force charge state without Charge Module
        if (this._forceChargeState !== _SATB._FORCE_CHARGE) {
            return this._battler.onBecomeSATBActable();
        } else if (SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
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
     * @since v0.07a @version v0.07a
     */
    $._useResetATBVal = function() {
        if (this._battler.canMakeSATBCmds()) return;
        if (SATBManager.areModulesEnabled(["IsResetEnabled"])) {
            this.addCoreATB(this.resetATBVal());
        }
        this.setResetATBVal(0);
    }; // $._useResetATBVal

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     * @param {ATBPhase} phase - The phase of the current ATB value that changed
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._onATBBecomeNotFull = function(phase) {
        switch (phase) {
            // There's nothing meaningful to happen for cooldown become not full
            case _SATB._PHASE_FILL: return this._onCoreATBBecomeNotFull();
            case _SATB._PHASE_CHARGE: return this._onChargeATBBecomeNotFull();
            //
        }
    }; // $._onATBBecomeNotFull

    /**
     * Idempotent Without Events
     * @since v0.00a @version v0.16a
     */
    $._onCoreATBBecomeNotFull = function() {
        // Ensures toggling auto inputs will correctly reset the delay counter
        this.setDelaySecCounter(0);
        //
        this._battler.clearActions();
        this._battler.runSATBNote("didCoreATBBecomeNotFull");
    }; // $._onCoreATBBecomeNotFull

    /**
     * Idempotent Without Events
     * @since v0.04a @version v0.04a
     */
    $._onChargeATBBecomeNotFull = function() {
        this._forcedChargeBeyondMax = 0; // It's just to play safe
        BattleManager.eraseSATBActBattler(this._battler);
        this._battler.runSATBNote("didChargeATBBecomeNotFull");
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
 *    # (v0.16a+)New class: Game_SATBBasePhase
 *      - Be the base class of all the fill, charge and cooldown ATB phases
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBBasePhase.prototype;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler involved in this ATB phase
    // {Number} _atb: The current ATB value of the battler of this phase
    // {Number} _lastATB: The last current ATB value of battler of this phase
    // {Number} _lastMax: The last maximum ATB value of battler of this phase

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.16a
     * @param {Game_Battler} battler - The battler involved in this ATB phase
     */
    $.initialize = function(battler) {
        this._battler = battler;
        this._atb = this._lastATB = 0;
        this._lastMax = this.maxATB();
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.16a @version v0.16a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        //
    }; // $.clear

    /**
     * Nullipotent
     * @abstract @interface @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The current ATB value of this phase
     */
    $.curATB = function() {
        throw new Error("Game_SATBBasePhase.prototype.curATB is abstract!");
    }; // $.curATB

    /**
     * Nullipotent
     * @abstract @interface @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The maximum ATB value of this phase
     */
    $.maxATB = function() {
        throw new Error("Game_SATBBasePhase.prototype.maxATB is abstract!");
    }; // $.maxATB

    /**
     * Hotspot
     * @abstract @interface @since v0.16a @version v0.16a
     */
    $.fillATB = function() {
        throw new Error("Game_SATBBasePhase.prototype.fillATB is abstract!");
    }; // $.fillATB

    /**
     * Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The maximum ATB value of this phase
     */
    $.curATBProportion = function() {
        // * 1.0 is just to ensure that integer division won't be used
        return this.curATB() * 1.0 / this.maxATB();
        //
    }; // $.curATBProportion

    /**
     * Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.isFill = function() { return false; };

    /**
     * Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.isCharge = function() { return false; };

    /**
     * Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.isCooldown = function() { return false; };

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.16a @version v0.16a
     * @returns {Number} The current ATB gain rate of this phase
     */
    $.atbRate = function() {
        // The base max should be used or changing max won't change fill rate
        var baseFillRate = BattleManager.coreBaseSATBFillRate();
        var baseMax = this._battler.baseCoreMaxSATB();
        var avgAgi = BattleManager.satbAvgAgi;
        return baseFillRate * this._battler.agi * baseMax * 1.0 / avgAgi;
        //
    }; // $.atbRate

    /**
     * @interface @since v0.16a @version v0.16a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addATBProportion = function(increment) {
        this.setATB(increment * this.maxATB());
    }; // $.addATBProportion

    /**
     * @interface @since v0.16a @version v0.16a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addATB = function(increment) { this.setATB(this.curATB() + increment); };

    /**
     * @interface @since v0.16a @version v0.16a
     * @param {Number} multiplier - Multiplier of current ATB value of battler
     */
    $.multiplyATB = function(multiplier) {
        this.setATB(this.curATB() * multiplier);
    }; // $.multiplyATB

    /**
     * Idempotent
     * @interface @since v0.16a @version v0.16a
     */
    $.fillUpATB = function() { this.setATB(this.maxATB()); };

    /**
     * Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setATBProportion = function(proportion) {
        this.setATB(proportion * this.maxATB());
    }; // $.setATBProportion

    /**
     * Hotspot/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setATB = function(val) {
        // A valid max must be +ve and updating max will check max anyway
        var max = this._lastMax || this.maxATB();
        //
        if (this._isAlreadyMaxATB(val, max)) return;
        // It must be here or checkUpdatedMaxes would use wrong _atbs val
        this._atb = Math.min(val, max);
        // _atbs must be capped by maxATB here to maximize performance gain
        this.checkUpdatedMax(val, max);
        // It must be here or checkUpdatedMaxes would use wrong _lastATBs
        this._lastATB = this._atb;
        //
    }; // $.setATB

    /**
     * Hotspot/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $.checkUpdatedMax = function(val, max) {
        // It must be placed here or refreshBar would miss _onATBBecomeFull
        this._checkIsBecomeEnoughNotEnough(val, max);
        //
        this._lastMax = max;
        // It's the only place covering all cases changing current/max ATB value
        BattleManager.onSATBBarRefresh([this._battler]);
        //
    }; // $.checkUpdatedMax

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $._isAlreadyMaxATB = function(val, max) {
        /** @todo Makes sure it's always correct even when it's tested so */
        return val >= max && this._atb === max && this._lastATB === max;
        //
    }; // $._isAlreadyMaxATB

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $._checkIsBecomeEnoughNotEnough = function(val, max) {
        var result = this._isBecomeEnoughNotEnough(val, max);
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        if (result.isBecomeEnough) return this._onATBBecomeEnough(max);
        // And DECREASED_MAX_CHARGE_ATB_ACTABLE
        // Refers to reference tag INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
        if (result.isBecomeNotEnough) this._onATBBecomeNotEnough();
        // And INCREASED_MAX_CHARGE_ATB_NOT_ACTABLE
    }; // $._checkIsBecomeEnoughNotEnough

    /**
     * Hotspot/Nullipotent
     * @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     * @param {+ve Num} max - The maximum ATB value of this phase
     * @returns {{Boolean}} The check result of becoming enough or not enough
     */
    $._isBecomeEnoughNotEnough = function(val, max) {
        var isFull = max <= val, wasFull = this._lastMax <= this._lastATB;
        return {
            isBecomeEnough: !wasFull && isFull,
            isBecomeNotEnough: wasFull && !isFull
        };
    }; // $._isBecomeEnoughNotEnough

    /**
     * Idempotent
     * @since v0.16a @version v0.16a
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $._onATBBecomeEnough = function(max) { this._lastATB = this._atb = max; };

    /**
     * Idempotent
     * @since v0.16a @version v0.16a
     */
    $._onATBBecomeNotEnough = function() {};

})(DoubleX_RMMV.SATB); // Game_SATBBasePhase.prototype

/*----------------------------------------------------------------------------
 *    # (v0.16a+)New class: Game_SATBPhaseCharge
 *      - Implements the ATB charge business logics for all battlers
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $$ = Game_SATBBasePhase.prototype;

    Game_SATBPhaseCharge.prototype = Object.create($$);

    var $ = Game_SATBPhaseCharge.prototype;

    $.constructor = Game_SATBPhaseCharge;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {ForceChargeState} _forceState: Whether action's forced to charge/execute
    // {Number} _forcedBeyondMax: The amount of forced charge ATB beyond maximum

    /**
     * Idempotent
     * @constructor @override @since v0.00a @version v0.16a
     * @param {Game_Battler} battler - The battler involved in this ATB phase
     */
    $.initialize = function(battler) {
        $$.initialize.call(this, battler);
        this._resetForceStates();
    }; // $.initialize

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The current ATB value of this phase
     */
    $.curATB = function() {
        // Refer to reference tag MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM
        if (!this._forceState) return this._atb;
        //
        return this._atb + Math.max(this._forcedBeyondMax, 0);
    }; // $.curATB

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The maximum ATB value of this phase
     */
    $.maxATB = function() { return this._battler.chargeMaxSATB(); };

    /**
     * Hotspot
     * @interface @override @since v0.16a @version v0.16a
     */
    $.fillATB = function() {
        this._fillATB();
        this._battler.runSATBNote("didFillChargeATB");
    }; // $.fillATB

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.isCharge = function() { return true; };

    /**
     * Hotspot/Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Number} The current ATB gain rate of this phase
     */
    $.atbRate = function() {
        if (SATBManager.areModulesEnabled([
            "IsRateEnabled",
            "IsChargeEnabled"
        ])) return this._battler.satbNoteResult_("chargeATBRate");
        return $$.atbRate.call(this);
    }; // $.atbRate

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setATB = function(val) {
        // A valid ATB charge must have a valid skill/item to be charged
        if (!this._battler.hasLatestSATBItems()) return;
        //
        // Refer to reference tag NEGATIVE_CHARGE_ATB_VAL_CANCEL_CHARGE
        if (val < 0) return this._battler.clearChargeSATB();
        //
        $$.setATB.call(this, val);
        if (this._forceState !== _SATB._FORCE_CHARGE) return;
        this._forcedBeyondMax = val - this.maxATB();
    }; // $.setATB

    /**
     * Idempotent
     * @interface @since v0.16a @version v0.16a
     */
    $.onStart = function() {
        this._resetForceStates();
        this.setATB(0);
    }; // $.onStart

    /**
     * Idempotent
     * @interface @since v0.16a @version v0.16a
     */
    $.onEnd = function() {
        // Not setting it as 0 would lead to infinite loops that's hard to break
        this._lastATB = 0
        this.setATB(this._lastATB);
        // _onChargeATBBecomeNotFull shouldn't be called again anyway
        this._resetForceStates(); // It's just to play safe
    }; // $.onEnd

    /**
     * Idempotent Without Events
     * @interface @since v0.16a @version v0.16a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancel = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this._battler.canCancelChargeSATB()) return;
        this._battler.runSATBNote("willCancelCharge");
        this._battler.clearChargeSATB();
    }; // $.onCancel

    /**
     * Idempotent Without Events
     * @interface @since v0.04a @version v0.16a
     */
    $.onStartForce = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        if (!this._battler.canForceChargeSATB()) return;
        this._forcedBeyondMax = 0;
        this._forceState = _SATB._FORCE_CHARGE;
        this._battler.runSATBNote("didStartForceCharge");
    }; // $.onStartForce

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.15b
     */
    $.onEndForce = function() {
        if (!SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        // They ensure disabling forcing during force won't make invalid states
        if (this._forceState !== _SATB._FORCE_CHARGE) return;
        //
        /** @todo Considers Adding didEndForceCharge so this becomes optional */
        SoundManager.playOk();
        //
        // Refer to reference tag MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM
        var canForceCharge = this._battler.canForceChargeSATB();
        this._forceState = canForceCharge ? _SATB._FORCE_ACT : "";
        //
        this._battler.onBecomeSATBActable();
    }; // $.onEndForce

    /**
     * Idempotent
     * @override @since v0.16a @version v0.16a
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $._onATBBecomeEnough = function(max) {
        $$._onATBBecomeEnough.call(this, max);
        // It's to prevent errors from force charge state without Charge Module
        if (this._forceState !== _SATB._FORCE_CHARGE) {
            return this._battler.onBecomeSATBActable();
        } else if (SATBManager.areModulesEnabled(["IsChargeEnabled"])) return;
        //
        this._battler.onBecomeSATBActable();
    }; // $._onATBBecomeEnough

    /**
     * Idempotent
     * @override @since v0.16a @version v0.16a
     */
    $._onATBBecomeNotEnough = function() {
        $$._onATBBecomeNotEnough.call(this); // It's just to play safe
        this._forcedBeyondMax = 0; // It's just to play safe
        BattleManager.eraseSATBActBattler(this._battler);
        this._battler.runSATBNote("didChargeATBBecomeNotFull");
    }; // $._onATBBecomeNotEnough

    /**
     * Hotspot
     * @since v0.16a @version v0.16a
     */
    $._fillATB = function() {
        // Refer to reference tag NON_CHARGING_SKILL_ITEM_INSTANT_CHARGE
        if (!this._battler.isSATBChargeItem()) return this.fillUpATB();
        //
        if (this._forceState === _SATB._FORCE_ACT) return;
        this.addATB(this.atbRate());
        if (this._forceState !== _SATB._FORCE_CHARGE) return;
        if (this.atbProportion() <= 1) return;
        // Otherwise force charge ATB beyond max won't update the bar instantly
        BattleManager.onSATBBarRefresh([this._battler]);
        //
    }; // $._fillATB

    /**
     * Idempotent
     * @since v0.16a @version v0.16a
     */
    $._resetForceStates = function() {
        this._forcedBeyondMax = 0, this._forceState = "";
    }; // $._resetForceStates

})(DoubleX_RMMV.SATB); // Game_SATBPhaseCooldown.prototype

/*----------------------------------------------------------------------------
 *    # (v0.16a+)New class: Game_SATBPhaseCooldown
 *      - Implements the ATB cooldown business logics for all battlers
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $$ = Game_SATBBasePhase.prototype;

    Game_SATBPhaseCooldown.prototype = Object.create($$);

    var $ = Game_SATBPhaseCooldown.prototype;

    $.constructor = Game_SATBPhaseCooldown;

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The current ATB value of this phase
     */
    $.curATB = function() {
        // The cooldown fill direction's opposite to normal and charge ATB
        return this.maxATB() - this._atb;
        // Reversing here's to simplify the cooldown logic in everywhere else
    }; // $.curATB

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Nonnegative Int} The maximum ATB value of this phase
     */
    $.maxATB = function() { return this._battler.cooldownMaxSATB(); };

    /**
     * Hotspot
     * @interface @override @since v0.16a @version v0.16a
     */
    $.fillATB = function() {
        this._fillATB();
        this._battler.runSATBNote("didFillCooldownATB");
    }; // $.fillATB

    /**
     * Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Boolean} The check result
     */
    $.isCooldown = function() { return true; };

    /**
     * Hotspot/Nullipotent
     * @interface @override @since v0.16a @version v0.16a
     * @returns {Number} The current ATB gain rate of this phase
     */
    $.atbRate = function() {
        if (SATBManager.areModulesEnabled([
            "IsRateEnabled",
            "IsCooldownEnabled"
        ])) return this._battler.satbNoteResult_("cooldownATBRate");
        return $$.atbRate.call(this);
    }; // $.atbRate

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.16a @version v0.16a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setATB = function(val) {
        // A valid ATB cooldown must have a valid skill/item to be cooled down
        if (!this._battler.hasLatestSATBItems()) return;
        //
        // The cooldown fill direction's opposite to normal and charge ATB
        $$.setATB.call(this, this.maxATB() - val);
        // Reversing here's to simplify the cooldown logic in everywhere else
    }; // $.setATB

    /**
     * Idempotent Without Events
     * @interface @since v0.16a @version v0.16a
     * @todo Considers adding a sound effect as an extra feedback
     */
    $.onCancel = function() {
        if (!SATBManager.areModulesEnabled(["IsCooldownEnabled"])) return;
        if (!this._battler.canCancelCooldownSATB()) return;
        this._battler.runSATBNote("willCancelCooldown");
        this._onATBBecomeEnough();
    }; // $.onCancel

    /**
     * Idempotent
     * @override @since v0.16a @version v0.16a
     * @param {+ve Num} max - The maximum ATB value of this phase
     */
    $._onATBBecomeEnough = function(max) {
        $$._onATBBecomeEnough.call(this, max);
        // The cooldown ATB used in the reverse direction so full = empty
        this.setATB(0);
        this._battler.onStartSATBFill();
        // The ordering must be this or setCooldownATB won't work due to _phase
    }; // $._onATBBecomeEnough

    /**
     * Hotspot
     * @since v0.16a @version v0.16a
     */
    $._fillATB = function() {
        // Refer to reference tag NON_COOLDOWN_SKILL_ITEM_INSTANT_COOLDOWN
        if (!this._battler.isSATBCooldownItem()) return this.setATB(0);
        //
        this.addATB(-this.atbRate());
    }; // $._fillATB

})(DoubleX_RMMV.SATB); // Game_SATBPhaseCooldown.prototype

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBNotes.prototype, _SATB = SATB.Game_SATBNotes = {};
    var SATBM = SATB.SATBManager;

    // v0.16a+
    _SATB._ACT_RESULT = function(sum, result) { return sum + result; };
    //

    // (v0.16a+)The list of notetags needing actions to be evaluated separately
    _SATB._ACT_RESULT_NOTES = [
        "actCost", // Action Module
        "chargeMax", // Charge Module
        "cooldownMax", // Cooldown Module
        // Rate Module
        "chargeATBRate",
        "cooldownATBRate",
        //
        "resetATBVal", // Reset Module
        "actSpeed", // Speed Module
    ];
    //

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
     * @constructor @since v0.00a @version v0.16a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBCache} cache - The helper caching notetag list/result
     * @param {Game_SATBPairs?} pairs_ - The helper checking/returning note pair
     * @param {Game_SATBRules?} rules_ - The helper using the rule to chain note
     */
    $.initialize = function(battler, cache, pairs_, rules_) {
        this._battler = battler;
        this._cache = cache;
        // Not making these as needed explicit dependecies' to simplify its uses
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
     * @interface @since v0.04a @version v0.16a
     * @param {[NoteType]} notes - List of notes to have its existence checked
     * @param {[Datum]} data - The data having the notetag existence checked
     * @returns {Boolean} The check result
     */
    $.hasAnyNote = function(notes, data) {
        return notes.some(function(note) {
            return data.some(function(datum) {
                return this._pairs.pairFuncs(note, datum).length > 0;
            }, this);
        }, this);
    }; // $.hasAnyNote

    /**
     * Hotspot/Idempotent
     * @interface @since v0.16a @version v0.16a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {[{Number, Skill|Item}]} items - The items involved in the result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     */
    $.latestItemResult_ = function(note, items, argObj_) {
        var oldItems = this._battler.latestSATBItems;
        this._battler.latestSATBItems = items;
        var result = this._result_(note, argObj_);
        this._battler.latestSATBItems = oldItems;
        return result;
    }; // $.latestItemResult_

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.16a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     * @todo Investigates the minor but still nontrivial memory leaks
     */
    $.result_ = function(note, argObj_) {
        if (_SATB._ACT_RESULT_NOTES.contains(note)) {
            return this._actResult(note, argObj_);
        } else return this._result_(note, argObj_);
        //
    }; // $.result_

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.06a
     * @param {NoteType} note - The note to have its notetag contents run
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    $.run = function(note, argObj_) {
        var modules = SATBM.RUN_MODULES[note].modules;
        if (!modules || !SATBManager.areModulesEnabled(modules)) return;
        this._run(note, argObj_);
    }; // $.run

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     * @todo Investigates the minor but still nontrivial memory leaks
     */
    $._actResult = function(note, argObj_) {
        // It's just to play safe so latestItemResult_ shouldn't be used here
        var items = this._battler.latestSATBItems.clone();
        //
        // This function should be inlined as it can't be used anywhere else
        var results = items.map(function(item) {
            this._battler.latestSATBItems = [item];
            return this._result_(note, argObj_);
        }, this);
        //
        this._battler.latestSATBItems = items;
        var actResult = results.reduce(_SATB._ACT_RESULT, 0);
        // Refers to reference tag NON_CONTINUOUS_INTEGER_ACT_COST
        if (this._battler.satbActMode() === "continuous") return actResult;
        return Math.ceil(actResult);
        //
    }; // $._actResult

    /**
     * Hotspot/Idempotent
     * @since v0.16a @version v0.16a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The chained result from all effective notetags involved
     * @todo Investigates the minor but still nontrivial memory leaks
     */
    $._result_ = function(note, argObj_) {
        if ($gameSystem.satbParam("_isNoteCached")) {
            return this._resultWithCache_(note, argObj_);
        }
        // Refers to reference tag NOTE_RESULT_CACHE
        return this._uncachedResult_(note, argObj_, _SATB._FUNC_WITHOUT_CACHE);
        //
    }; // $._result_

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
     * Hotspot
     * @interface @since v0.06a @version v0.06a
     * @param {NoteType} note - The note to have its notetag contents run
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    $._run = function(note, argObj_) {
        // Refers to reference tag RUN_DEFAULT_FIRST
        this._pairs.default_(note, argObj_);
        //
        var isCached = $gameSystem.satbParam("_isNoteCached"), funcNameSuffix =
                isCached ? _SATB._FUNC_WITH_CACHE : _SATB._FUNC_WITHOUT_CACHE;
        var list = this["_pairFuncList" + funcNameSuffix](note, argObj_);
        // Binding _pairs.run_ here can cause very severe memory leaks
        this._rules.chainedRunList(list, note).forEach(function(pairFunc) {
            this._pairs.run_(argObj_, note, pairFunc);
        }, this);
        //
    }; // $._run

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
    _SATB._LATEST_SKILL_ITEM = function(item) { return item.item; }; // v0.16a+
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
        latestSkillItems: function(battler) {
            return battler.latestSATBItems.map(_SATB._LATEST_SKILL_ITEM);
        }, // latestSkillItems
        // They're not used anyway but including them here's just to play safe
        priority: function() { return []; },
        chainingRule: function() { return []; },
        result: function() { return []; }
        //
    }; // _SATB._FACTOR_DATA
    //

    _SATB._FACTORS = Object.keys(_SATB._FACTOR_DATA);
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
     * @todo Changes _changeFactorMarks[note] to be an Array of factors instead
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
     * @interface @since v0.00a @version v0.07a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {DatumType} part - Note part to have its effective list updated
     * @param {[PairFunc]} partList List of functions of  notetags involved
     * @todo Checks why clone is needed with resetATBVal latestSkillItems
     */
    $.updatePairFuncListPart = function(note, part, partList) {
        this._partLists[note][part] = partList.clone();
    }; // $.updatePairFuncListPart

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.07a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {[PairFunc]} list - The list of functions of notetags involved
     * @todo Checks why clone is needed with resetATBVal latestSkillItems
     */
    $.updatePairFuncList = function(note, list) {
        this._cachedLists[note] = list.clone();
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
     * @todo Changes _changeFactorMarks[note] to be an Array of factors instead
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
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.07a
     * @param {NoteType} note - Note to have its marked change factors raised
     * @enum @returns {[Factor]} The note change factors to be raised
     * @todo Changes _changeFactorMarks[note] to be an Array of factors instead
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        // It's just to play safe
        var factors = _SATB._MARKED_NOTE_CHANGE_FACTORS(marks);
        //
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        var isMarkedOnly = !this._hasUnknownChangeFactor || factors.length > 0;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return isMarkedOnly ? factors : _SATB._FACTORS;
        //
    }; // $._raisedNoteChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.07a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {Factor} factor - The change factor to be raised for the note
     * @todo Changes _changeFactorMarks[note] to be an Array of factors instead
     */
    $._raiseChangeFactor = function(note, factor) {
        this.invalidateResultCache(note, factor);
        this.invalidatePairFuncListCache(note, factor);
        delete this._changeFactorMarks[note][factor];
    }; // $._raiseChangeFactor

})(DoubleX_RMMV.SATB); // Game_SATBCache.prototype

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPairs.prototype, _SATB = SATB.Game_SATBPairs = {};
    var SATBM = SATB.SATBManager, GS = SATB.Game_System.new;

    _SATB.NOTE_FUNC = function(battler, func, datum) { // v0.04a+
        return func.call(battler, datum, datum.meta.satb.datumType);
    }; // _SATB.NOTE_FUNC
    _SATB.STATE_ID_NOTE_FUNC = function(battler, func, datum, argObj_) {
    // v0.12a+; Potential Hotspot
        var datumType = datum.meta.satb.datumType;
        return func.call(battler, datum, datumType, argObj_.stateId);
    }; // _SATB.STATE_ID_NOTE_FUNC

    _SATB._DEFAULT_BATTLER_RESULT = function(note) { // v0.09a+
        return $gameSystem.satbParamFunc(note).call(this._battler);
    }; // _SATB._DEFAULT_BATTLER_RESULT
    _SATB._DEFAULT_BATTLER_SPRITE_RESULT = function(note, argObj_) { // v0.14a+
        return $gameSystem.satbParamFunc(note).
                call(this._battler, argObj_.sprite);
    }; // _SATB._DEFAULT_BATTLER_SPRITE_RESULT
    _SATB._COND_NUM_PAIR_FUNC = function(note, datum, pair) {
    // v0.12a+; Potential Hotspot
        // Refers to reference tag THIS_GAME_BATTLER
        var condSuffix = pair.suffix1, valSuffix = pair.suffix2;
        var condNoteFunc = _SATB._SUFFIX_FUNCS[condSuffix];
        var valNoteFunc = _SATB._SUFFIX_FUNCS[valSuffix];
        var noteType = _SATB._NOTE_TYPES[note];
        var condResultType = noteType.results[0];
        var valResultType = noteType.results[1];
        return {
            datum: datum,
            suffix1: _SATB._PAIR_FUNC_SUFFIX(note, condSuffix, condNoteFunc,
                    condResultType, pair.entry1),
            suffix2: _SATB._PAIR_FUNC_SUFFIX(note, valSuffix, valNoteFunc,
                    valResultType, pair.entry2)
        };
        //
    }; // _SATB._COND_NUM_PAIR_FUNC
    _SATB._COND_UNIT_INTERVAL_PAIR_FUNC = function(note, datum, pair) {
    // v0.12a+; Potential Hotspot
        // Refers to reference tag THIS_GAME_BATTLER
        var condSuffix = pair.suffix1, unitSuffix = pair.suffix2;
        var intervalSuffix = pair.suffix3;
        var condNoteFunc = _SATB._SUFFIX_FUNCS[condSuffix];
        var unitNoteFunc = _SATB._SUFFIX_FUNCS[unitSuffix];
        var intervalNoteFunc = _SATB._SUFFIX_FUNCS[intervalSuffix];
        var noteType = _SATB._NOTE_TYPES[note];
        var condResultType = noteType.results[0];
        var unitResultType = noteType.results[1];
        var intervalResultType = noteType.results[2];
        return {
            datum: datum,
            suffix1: _SATB._PAIR_FUNC_SUFFIX(note, condSuffix, condNoteFunc,
                    condResultType, pair.entry1),
            suffix2: _SATB._PAIR_FUNC_SUFFIX(note, unitSuffix, unitNoteFunc,
                    unitResultType, pair.entry2),
            suffix3: _SATB._PAIR_FUNC_SUFFIX(note, intervalSuffix,
                    intervalNoteFunc, intervalResultType, pair.entry3)
        };
        //
    }; // _SATB._COND_UNIT_INTERVAL_PAIR_FUNC
    _SATB._DEFAULT_RESULT_NO_ARG = function(note) { // v0.16a+
        return function() {
            return _SATB._DEFAULT_BATTLER_RESULT.call(this, note);
        };
    }; // _SATB._DEFAULT_RESULT_NO_ARG
    _SATB._DEFAULT_SPRITE_RESULT_ARG = function(note) { // v0.16a+
        return function(argObj_) {
            return _SATB._DEFAULT_BATTLER_SPRITE_RESULT.call(
                    this, note, argObj_);
        };
    }; // _SATB._DEFAULT_SPRITE_RESULT_ARG
    _SATB._IS_VALID_COND_NUM_PAIR = function(note, pair_) {
    // v0.12a+; Potential Hotspot
        if (!pair_ || !pair_.entry1 || !pair_.entry2) return false;
        if (!_SATB._IS_VALID_SUFFIX(note, pair_, "suffix1")) return false;
        return _SATB._IS_VALID_SUFFIX(note, pair_, "suffix2");
    }; // _SATB._IS_VALID_COND_NUM_PAIR
    _SATB._IS_VALID_COND_UNIT_INTERVAL_PAIR = function(note, pair_) {
    // v0.12a+; Potential Hotspot
        if (!pair_) return false;
        if (!pair_.entry1 || !pair_.entry2 || !pair_.entry3) return false;
        if (!_SATB._IS_VALID_SUFFIX(note, pair_, "suffix1")) return false;
        if (!_SATB._IS_VALID_SUFFIX(note, pair_, "suffix2")) return false;
        return _SATB._IS_VALID_SUFFIX(note, pair_, "suffix3");
    }; // _SATB._IS_VALID_COND_UNIT_INTERVAL_PAIR
    _SATB._IS_VALID_PAIR = function(note, pair_) { // Potential Hotspot
        if (!pair_) return false;
        return pair_.entry1 && _SATB._IS_VALID_SUFFIX(note, pair_, "suffix1");
    }; // _SATB._IS_VALID_PAIR
    _SATB._IS_VALID_SUFFIX = function(note, pair, suffix) { // Potential Hotspot
        return _SATB._NOTE_TYPES[note][suffix].contains(pair[suffix]);
    }; // _SATB._IS_VALID_SUFFIX
    _SATB._PAIR_FUNC = function(note, datum, pair) { // Potential Hotspot
        // Refers to reference tag THIS_GAME_BATTLER
        var suffix1 = pair.suffix1, noteFunc1 = _SATB._SUFFIX_FUNCS[suffix1];
        var resultType1 = _SATB._NOTE_TYPES[note].results[0];
        return {
            datum: datum,
            suffix1: _SATB._PAIR_FUNC_SUFFIX(
                    note, suffix1, noteFunc1, resultType1, pair.entry1)
        };
        //
    }; // _SATB._PAIR_FUNC
    _SATB._PAIR_FUNC_SUFFIX = function(note, suffix, noteFunc, resultType, entry) {
    // v0.12a+; Potential Hotspot
        return {
            canBind: _SATB._ARG_OBJ_SUFFIXES.contains(suffix),
            unboundFunc: noteFunc(note, resultType, entry)
        };
    }; // $._PAIR_FUNC_SUFFIX
    _SATB._STRING_TO_NUM = function(r) { return +r; }; // Potential Hotspot

    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = { // Potential Hotspot
        // Core Module
        coreMax: function() { return this._battler.baseCoreMaxSATB(); },
        //
        // (v0.04a+)Bar Module
        isBarVisible: _SATB._DEFAULT_RESULT_NO_ARG("isShowATBBar"),
        //
        // (v0.06a+)Bar Module
        isStatusBarVisible: _SATB._DEFAULT_RESULT_NO_ARG("isShowStatusATBBar"),
        //
        // (v0.04a+)Action Module
        actCost: function() {
            return 1; // Refers to reference tag DEFAULT_ACT_COST_1
        }, // actCost
        actMode: _SATB._DEFAULT_RESULT_NO_ARG("actMode"),
        //
        // (v0.04a+)Charge Module
        chargeMax: function() { return this._battler.baseChargeMaxSATB(); },
        isPayBeforeExecCharge:
                _SATB._DEFAULT_RESULT_NO_ARG("isPayBeforeExecCharge"),
        canCancelCharge: _SATB._DEFAULT_RESULT_NO_ARG("canCancelCharge"),
        canForceCharge: _SATB._DEFAULT_RESULT_NO_ARG("canForceCharge"),
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: function() {
            return this._battler.baseCooldownMaxSATB();
        }, // cooldownMax
        canCancelCooldown: _SATB._DEFAULT_RESULT_NO_ARG("canCancelCooldown"),
        //
        // (v0.15a+)Delay Module
        delay: _SATB._DEFAULT_RESULT_NO_ARG("delaySecs"),
        //
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteOpacity"),
        continuousOrderSpriteIconFolder: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconFolder"),
        continuousOrderSpriteIconFilename: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconFilename"),
        continuousOrderSpriteIconHue: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconHue"),
        continuousOrderSpriteIconSmooth: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconSmooth"),
        continuousOrderSpriteIconXCoor: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconXCoor"),
        continuousOrderSpriteIconYCoor: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconYCoor"),
        continuousOrderSpriteIconSourceW: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconSourceW"),
        continuousOrderSpriteIconSourceH: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "continuousOrderSpriteIconSourceH"),
        continuousOrderSpriteIconW:
                _SATB._DEFAULT_SPRITE_RESULT_ARG("continuousOrderSpriteIconW"),
        continuousOrderSpriteIconH:
                _SATB._DEFAULT_SPRITE_RESULT_ARG("continuousOrderSpriteIconH"),
        continuousOrderSpriteY:
                _SATB._DEFAULT_SPRITE_RESULT_ARG("continuousOrderSpriteY"),
        discreteOrderSpriteTargetOpacity: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteTargetOpacity"),
        discreteOrderSpriteIconFolder: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconFolder"),
        discreteOrderSpriteIconFilename: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconFilename"),
        discreteOrderSpriteIconHue:
                _SATB._DEFAULT_SPRITE_RESULT_ARG("discreteOrderSpriteIconHue"),
        discreteOrderSpriteIconSmooth: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconSmooth"),
        discreteOrderSpriteIconXCoor: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconXCoor"),
        discreteOrderSpriteIconYCoor: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconYCoor"),
        discreteOrderSpriteIconSourceW: _SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconSourceW"),
        discreteOrderSpriteIconSourceH: SATB._DEFAULT_SPRITE_RESULT_ARG(
                "discreteOrderSpriteIconSourceH"),
        discreteOrderSpriteIconW:
                SATB._DEFAULT_SPRITE_RESULT_ARG("discreteOrderSpriteIconW"),
        discreteOrderSpriteIconH:
                SATB._DEFAULT_SPRITE_RESULT_ARG("discreteOrderSpriteIconH"),
        //
        // (v0.10a+)Rate Module
        coreATBRate: _SATB._DEFAULT_RESULT_NO_ARG("coreATBRate"),
        chargeATBRate: _SATB._DEFAULT_RESULT_NO_ARG("chargeATBRate"),
        cooldownATBRate: _SATB._DEFAULT_RESULT_NO_ARG("cooldownATBRate"),
        //
        // (v0.07a+)Reset Module
        resetATBVal: function(argObj_) {
            return $gameSystem.satbParamFunc("resetATBVal").call(
                    this._battler, argObj_.latestResetATBVal);
        }, // resetATBVal
        //
        // (v0.08a+)Speed Module
        actSpeed: _SATB._DEFAULT_RESULT_NO_ARG("actSpeed"),
        //
        // (v0.09a+)Start Module
        normStartATBVal: _SATB._DEFAULT_RESULT_NO_ARG("normStartATBVal"),
        preemptStartATBVal: _SATB._DEFAULT_RESULT_NO_ARG("preemptStartATBVal"),
        surpriseStartATBVal:
                _SATB._DEFAULT_RESULT_NO_ARG("surpriseStartATBVal"),
        //
    }; // _SATB._DEFAULT_RESULTS
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        _SATB._DEFAULT_RESULTS[note] = function() {
            // This forces param and notetag name to be same but reduces works
            $gameSystem.satbParamFunc(note).call(this._battler);
            //
        }; // _SATB._DEFAULT_RESULTS[note]
    });
    //
    _SATB._NOTE_ARG_OBJ_LATEST_VAL = function(battler, func, datum, argObj_, latestVal) {
    // v0.09a+
        var datumType = datum.meta.satb.datumType;
        return func.call(battler, datum, datumType, latestVal);
    }; // _SATB._NOTE_ARG_OBJ_LATEST_VAL
    // The last argument must be the latest chained notetag value result
    _SATB._NOTE_ARG_OBJS = { // Hotspot
        // Core Module
        coreMax: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        coreActState: _SATB.NOTE_FUNC,
        //
        isBarVisible: _SATB.NOTE_FUNC, // (v0.04a+)Bar Module
        isStatusBarVisible: _SATB.NOTE_FUNC, // (v0.06a+)Bar Module
        // (v0.16a+)Action Module
        actCost: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        actMode: _SATB.NOTE_FUNC,
        //
        // (v0.04a+)Charge Module
        chargeMax: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        isPayBeforeExecCharge: _SATB.NOTE_FUNC,
        canCancelCharge: _SATB.NOTE_FUNC,
        canForceCharge: _SATB.NOTE_FUNC,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        canCancelCooldown: _SATB.NOTE_FUNC,
        //
        countdown: _SATB.NOTE_FUNC, // (v0.12a+)Countdown Module
        delay: _SATB.NOTE_FUNC, // (v0.15a+)Delay Module
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconFolder:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconFilename:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconHue: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconSmooth:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconXCoor:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconYCoor: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconSourceW:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconSourceH:
                _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconW: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteIconH: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        continuousOrderSpriteY: _SATB.CONTINUOUS_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteTargetOpacity: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconFolder: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconFilename: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconHue: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconSmooth: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconXCoor: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconYCoor: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconSourceW: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconSourceH: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconW: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        discreteOrderSpriteIconH: _SATB.DISCRETE_ORDER_SPRITE_NOTE_FUNC,
        //
        // (v0.10a+)Rate Module
        coreATBRate: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        chargeATBRate: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        cooldownATBRate: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        //
        // (v0.07a+)Reset Module
        resetATBVal: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        //
        // (v0.08a+)Speed Module
        actSpeed: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        //
        // (v0.09a+)Start Module
        normStartATBVal: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        preemptStartATBVal: _SATB._NOTE_ARG_OBJ_LATEST_VAL,
        surpriseStartATBVal: _SATB._NOTE_ARG_OBJ_LATEST_VAL
        //
    }; // _SATB._NOTE_ARG_OBJS
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        _SATB._NOTE_ARG_OBJS[note] = _SATB[SATBM.RUN_MODULES[note].noteFunc];
    });
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
    _SATB._BASE_RUN_NOTES = {
        isValidPair: _SATB._IS_VALID_PAIR,
        pairFunc: _SATB._PAIR_FUNC,
        runFunc: "_run_",
        results: [], // Notes running commands don't return any results
        suffix1: ["cfg", "event", "script", "eval"]
    };
    _SATB._BOOL_RESULT_NOTES = {
        isValidPair: _SATB._IS_VALID_PAIR,
        pairFunc: _SATB._PAIR_FUNC,
        results: ["bool"], // ith element corresponds to suffixi
        runFunc: "_run_",
        suffix1: ["cfg", "val", "switch", "script", "eval"]
    }; // _SATB._BOOL_RESULT_NOTES
    _SATB._COND_NUM_NOTES = { // v0.15a+
        isValidPair: _SATB._IS_VALID_COND_NUM_PAIR,
        pairFunc: _SATB._COND_NUM_PAIR_FUNC,
        results: ["bool", "num"], // ith element corresponds to suffixi
        runFunc: "_runCondNum_",
        suffix1: ["cfg", "val", "switch", "script", "eval"], // condSuffix
        suffix3: ["cfg", "val", "var", "script", "eval"] // valSuffix
    }, // _SATB._COND_UNIT_INTERVAL_NOTES
    _SATB._COND_UNIT_INTERVAL_NOTES = { // v0.15a+
        isValidPair: _SATB._IS_VALID_COND_UNIT_INTERVAL_PAIR,
        pairFunc: _SATB._COND_UNIT_INTERVAL_PAIR_FUNC,
        results: ["bool", "", "num"], // ith element corresponds to suffixi
        runFunc: "_runCondUnitInterval_",
        suffix1: ["cfg", "val", "switch", "script", "eval"], // condSuffix
        suffix2: ["cfg", "val", "var", "script", "eval"], // unitSuffix
        suffix3: ["cfg", "val", "var", "script", "eval"] // intervalSuffix
    }, // _SATB._COND_UNIT_INTERVAL_NOTES
    _SATB._NUM_RESULT_NOTES = {
        isValidPair: _SATB._IS_VALID_PAIR,
        pairFunc: _SATB._PAIR_FUNC,
        results: ["num"], // ith element corresponds to suffixi
        runFunc: "_run_",
        suffix1: ["cfg", "val", "var", "script", "eval"]
    }; // _SATB._NUM_RESULT_NOTES
    _SATB._STRING_RESULT_NOTES = { // v0.14a+
        isValidPair: _SATB._IS_VALID_PAIR,
        pairFunc: _SATB._PAIR_FUNC,
        results: [""], // ith element corresponds to suffixi
        runFunc: "_run_",
        suffix1: ["cfg", "val", "var", "script", "eval"]
    }; // _SATB._NUM_RESULT_NOTES
    //
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTE_TYPES = {
        // Core Module
        coreMax: _SATB._NUM_RESULT_NOTES,
        coreActState: _SATB._BOOL_RESULT_NOTES,
        //
        isBarVisible: _SATB._BOOL_RESULT_NOTES, // (v0.04a+)Bar Module
        isStatusBarVisible: _SATB._BOOL_RESULT_NOTES, // (v0.06a+)Bar Module
        // (v0.16a+)Action Module
        actCost: _SATB._NUM_RESULT_NOTES,
        actMode: _SATB._STRING_RESULT_NOTES,
        //
        // (v0.04a+)Charge Module
        chargeMax: _SATB._NUM_RESULT_NOTES,
        isPayBeforeExecCharge: _SATB._BOOL_RESULT_NOTES,
        canCancelCharge: _SATB._BOOL_RESULT_NOTES,
        canForceCharge: _SATB._BOOL_RESULT_NOTES,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: _SATB._NUM_RESULT_NOTES,
        canCancelCooldown: _SATB._BOOL_RESULT_NOTES,
        //
        // (v0.12a+)Countdown Module
        countdown: _SATB._COND_UNIT_INTERVAL_NOTES,
        //
        delay: _SATB._COND_NUM_NOTES, // (v0.15a+)Delay Module
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconFolder: _SATB._STRING_RESULT_NOTES,
        continuousOrderSpriteIconFilename: _SATB._STRING_RESULT_NOTES,
        continuousOrderSpriteIconHue: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconSmooth: _SATB._BOOL_RESULT_NOTES,
        continuousOrderSpriteIconXCoor: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconYCoor: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconSourceW: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconSourceH: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconW: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteIconH: _SATB._NUM_RESULT_NOTES,
        continuousOrderSpriteY: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteTargetOpacity: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconFolder: _SATB._STRING_RESULT_NOTES,
        discreteOrderSpriteIconFilename: _SATB._STRING_RESULT_NOTES,
        discreteOrderSpriteIconHue: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconSmooth: _SATB._BOOL_RESULT_NOTES,
        discreteOrderSpriteIconXCoor: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconYCoor: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconSourceW: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconSourceH: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconW: _SATB._NUM_RESULT_NOTES,
        discreteOrderSpriteIconH: _SATB._NUM_RESULT_NOTES,
        //
        // (v0.10a+)Rate Module
        coreATBRate: _SATB._NUM_RESULT_NOTES,
        chargeATBRate: _SATB._NUM_RESULT_NOTES,
        cooldownATBRate:_SATB._NUM_RESULT_NOTES,
        //
        resetATBVal: _SATB._NUM_RESULT_NOTES, // (v0.07a+) Reset Module
        actSpeed: _SATB._NUM_RESULT_NOTES, // (v0.08a+) Speed Module
        // (v0.09a+)Start Module
        normStartATBVal: _SATB._NUM_RESULT_NOTES,
        preemptStartATBVal: _SATB._NUM_RESULT_NOTES,
        surpriseStartATBVal: _SATB._NUM_RESULT_NOTES
        //
    }; // _SATB._NOTE_TYPES
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        _SATB._NOTE_TYPES[note] = _SATB._BASE_RUN_NOTES;
    });
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
        var pairs_ = datum_.meta.satb[note];
        if (!pairs_) return [];
        var isValidPair = _SATB._NOTE_TYPES[note].isValidPair;
        // Binding it to an ongoing context might have nontrivial memory leaks
        var isValidPairFunc = isValidPair.bind(undefined, note);
        //
        var pairFunc = _SATB._NOTE_TYPES[note].pairFunc;
        // It's not pure due to the cfg, switch, event, var and script suffixes
        return pairs_.filterMap(isValidPairFunc, function(pair) {
            return pairFunc(note, datum_, pair);
        }, undefined, this);
        // Binding _PAIR_FUNC might have nontrivial memory leaks
    }; // $.pairFuncs

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.12a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @returns {*?} The result of the notetag function involved
     */
    $.run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        var runFunc = _SATB._NOTE_TYPES[note].runFunc;
        return this[runFunc](argObj_, note, pairFunc, latestChainedResult_);
    }; // $.run_

    /**
     * Hotspot
     * @since v0.15a @version v0.15a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @returns {*?} The result of the notetag function involved
     * @todo Breaks this excessively long method into several smaller pieces
     */
    $._runCondNum_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        var condSuffix = pairFunc.suffix1, condPairFunc = {
            datum: pairFunc.datum,
            suffix1: {
                canBind: condSuffix.canBind,
                unboundFunc: condSuffix.unboundFunc
            }
        };
        var valSuffix = pairFunc.suffix2, valPairFunc = {
            datum: pairFunc.datum,
            suffix1: {
                canBind: valSuffix.canBind,
                unboundFunc: valSuffix.unboundFunc
            }
        };
        return {
            cond: this._run_(argObj_, note, condPairFunc, latestChainedResult_),
            val: this._run_(argObj_, note, valPairFunc, latestChainedResult_)
        };
    }; // $._runCondNum_

    /**
     * Hotspot
     * @since v0.12a @version v0.12a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @returns {*?} The result of the notetag function involved
     * @todo Breaks this excessively long method into several smaller pieces
     */
    $._runCondUnitInterval_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        var condSuffix = pairFunc.suffix1, condPairFunc = {
            datum: pairFunc.datum,
            suffix1: {
                canBind: condSuffix.canBind,
                unboundFunc: condSuffix.unboundFunc
            }
        };
        var unitSuffix = pairFunc.suffix2, unitPairFunc = {
            datum: pairFunc.datum,
            suffix1: {
                canBind: unitSuffix.canBind,
                unboundFunc: unitSuffix.unboundFunc
            }
        };
        var intervalSuffix = pairFunc.suffix3, intervalPairFunc = {
            datum: pairFunc.datum,
            suffix1: {
                canBind: intervalSuffix.canBind,
                unboundFunc: intervalSuffix.unboundFunc
            }
        };
        return {
            cond: this._run_(argObj_, note, condPairFunc, latestChainedResult_),
            unit: this._run_(argObj_, note, unitPairFunc, latestChainedResult_),
            interval: this._run_(
                    argObj_, note, intervalPairFunc, latestChainedResult_),
        };
    }; // $._runCondUnitInterval_

    /**
     * Hotspot
     * @since v0.00a @version v0.12a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @returns {*?} The result of the notetag function involved
     */
    $._run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        var suffix1 = pairFunc.suffix1, unboundFunc = suffix1.unboundFunc;
        // Using _NOTE_ARG_OBJS on the wrong suffix will have the wrong context
        if (!suffix1.canBind) return unboundFunc();
        //
        // Binding unboundFunc here would cause very severe memory leaks
        return _SATB._NOTE_ARG_OBJS[note](this._battler, unboundFunc,
                pairFunc.datum, argObj_, latestChainedResult_);
        //
    }; // $._run_

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
    // Such little duplications in fnction contents won't hurt much
    _SATB._OPERATOR_TRUTHY_RESULT_FUNC = function(operator) {
    // v0.15a+; Potential Hotspot
        var content = [
            "'use strict';",
            "var runResult = this._pairs.run_(argObj_, note, pairFunc, result);",
            "if (!runResult.cond) return result;",
            "return result " + operator + " runResult_.val;"
        ].join("\n");
        return new Function("note", "argObj_", "result", "pairFunc", content);
    }; // _SATB._OPERATOR_RESULT_FUNC
    //
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        return _SATB._LIST_MONO_FUNC.call(this, list, note, argObj_, 0);
    }; // _SATB._FIRST_LIST_MONO_FUNC
    _SATB._FIRST_VAL_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        return _SATB._VAL_MONO_FUNC(list, note, argObj_, 0);
    }; // _SATB._FIRST_VAL_MONO_FUNC
    _SATB._LAST_LIST_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        var i = list.length - 1;
        return _SATB._LIST_MONO_FUNC.call(this, list, note, argObj_, i);
    }; // _SATB._LAST_LIST_MONO_FUNC
    _SATB._LAST_VAL_MONO_FUNC = function(list, note, argObj_) {
     // Potential Hotspot
        return _SATB._VAL_MONO_FUNC(list, note, argObj_, list.length - 1);
    }; // _SATB._LAST_VAL_MONO_FUNC
    _SATB._LIST_MONO_FUNC = function(list, note, argObj_, i) {
     // v0.12a+; Potential Hotspot
        if (list.length <= 0) return this._pairs.default_(note, argObj_);
        return this._pairs.run_(argObj_, note, list[i]);
    }; // _SATB._LIST_MONO_FUNC
    _SATB._VAL_MONO_FUNC = function(list, note, argObj_, i) {
     // v0.12a+; Potential Hotspot
        return list[i] || this._pairs.default_(note, argObj_);
    }; // _SATB._VAL_MONO_FUNC
    _SATB._FIRST_LIST_TRUTHY_MONO_FUNC = function(list, note, argObj_) {
    // v0.12a+; Potential Hotspot
        if (list.length <= 0) return _SATB._LIST_NO_TRUTHY[note]();
        var truthyList = list.mapFilter(function(pairFunc) {
            return this._pairs.run_(argObj_, note, pairFunc);
        }, _SATB._IS_TRUTHY[note], this, undefined);
        var truthyMono = truthyList[0];
        return truthyMono && _SATB._TRUTHY_MONO[note](truthyMono);
    }; // _SATB._FIRST_LIST_TRUTHY_MONO_FUNC
    _SATB._LAST_LIST_TRUTHY_MONO_FUNC = function(list, note, argObj_) {
     // v0.12a+; Potential Hotspot
        if (list.length <= 0) return _SATB._LIST_NO_TRUTHY[note]();
        var truthyList = list.mapFilter(function(pairFunc) {
            return this._pairs.run_(argObj_, note, pairFunc);
        }, _SATB._IS_TRUTHY[note], this, undefined);
        var truthyMono = truthyList[truthyList.length - 1];
        return truthyMono && _SATB._TRUTHY_MONO[note](truthyMono);
    }; // _SATB._LAST_LIST_TRUTHY_MONO_FUNC
    //
    _SATB._NOTE_PRIORITY_BATTLER = function() { return ["actor", "enemy"]; };
    _SATB._NOTE_PRIORITY_THIS_STATE = function() { return ["thisState"]; };
    _SATB._MONO_RESULT_CHAINING_RULES = function(func, valFunc) {
    // Potential Hotspot
        // It's understood that associativity means nothing when running a list
        return {
            concat: func,
            concatVal: valFunc,
            mixObj: func,
            mixObjVal: valFunc,
            operator: func,
            operatorVal: valFunc,
            operatorTruthy: func,
            operatorTruthyVal: valFunc,
            mono: func,
            monoVal: valFunc
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
        coreActState: _SATB._NOTE_PRIORITY_THIS_STATE,
        //
        isBarVisible: function() { // (v0.04a+)Bar Module
            return $gameSystem.satbParam("_isBarVisibleNotePriorities");
        }, // isBarVisible
        isStatusBarVisible: function() { // (v0.06a+)Bar Module
            return $gameSystem.satbParam("_isStatusBarVisibleNotePriorities");
        }, // isStatusBarVisible
        // (v0.16a+)Action Module
        actCost: function() {
            return $gameSystem.satbParam("_actCostNotePriorities");
        }, // actCost
        actMode: function() {
            return $gameSystem.satbParam("_actModeNotePriorities");
        }, // actMode
        //
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
        }, // canCancelCooldown
        //
        // (v0.12a+)Countdown Module
        countdown: _SATB._NOTE_PRIORITY_THIS_STATE,
        //
        // (v0.15a+)Delay Module
        delay: function() {
            return $gameSystem.satbParam("_delayNotePriorities");
        }, // delay
        //
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconFolder: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconFilename: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconHue: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconSmooth: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconXCoor: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconYCoor: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconSourceW: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconSourceH: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconW: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteIconH: _SATB._NOTE_PRIORITY_BATTLER,
        continuousOrderSpriteY: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteTargetOpacity: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconFolder: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconFilename: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconHue: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconSmooth: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconXCoor: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconYCoor: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconSourceW: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconSourceH: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconW: _SATB._NOTE_PRIORITY_BATTLER,
        discreteOrderSpriteIconH: _SATB._NOTE_PRIORITY_BATTLER,
        //
        // (v0.10a+)Rate Module
        coreATBRate: function() {
            return $gameSystem.satbParam("_coreATBRateNotePriorities");
        }, // coreATBRate
        chargeATBRate: function() {
            return $gameSystem.satbParam("_chargeATBRateNotePriorities");
        }, // chargeATBRate
        cooldownATBRate: function() {
            return $gameSystem.satbParam("_cooldownATBRateNotePriorities");
        }, // cooldownATBRate
        //
        resetATBVal: function() { // (v0.07a+)Reset Module
            return $gameSystem.satbParam("_resetATBValNotePriorities");
        }, // resetATBVal
        actSpeed: function() { // (v0.08a+)Speed Module
            return $gameSystem.satbParam("_actSpeedNotePriorities");
        }, // actSpeed
        // (v0.09a+)Start Module
        normStartATBVal: function() {
            return $gameSystem.satbParam("_normStartATBValNotePriorities");
        }, // normStartATBVal
        preemptStartATBVal: function() {
            return $gameSystem.satbParam("_preemptStartATBValNotePriorities");
        }, // preemptStartATBVal
        surpriseStartATBVal: function() {
            return $gameSystem.satbParam("_surpriseStartATBValNotePriorities");
        } // surpriseStartATBVal
        //
    }; // _SATB._NOTE_PRIORITIES
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        _SATB._NOTE_PRIORITIES[note] = function() {
            // This hardcodes the param name but reduces work on adding events
            return $gameSystem.satbParam("_" + note + "NotePriorities");
            //
        }; // _SATB._NOTE_PRIORITIES[note]
    });
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
                    _SATB._OPERATOR_VAL_RESULT_FUNC("&&")),
            operatorTruthy: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("&&")),
            operatorTruthyVal: _SATB._RESULT_CHAINING_RULE_FUNC(
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
                    _SATB._OPERATOR_VAL_RESULT_FUNC("||")),
            operatorTruthy: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("||")),
            operatorTruthyVal: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_VAL_RESULT_FUNC("||"))
        }, // some
        // Conforms with the chaining rule interface
        first: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._FIRST_LIST_MONO_FUNC, _SATB._FIRST_VAL_MONO_FUNC),
        last: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._LAST_LIST_MONO_FUNC, _SATB._LAST_VAL_MONO_FUNC),
        firstTruthy: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._FIRST_LIST_TRUTHY_MONO_FUNC,
                _SATB._FIRST_LIST_TRUTHY_MONO_FUNC),
        lastTruthy: _SATB._MONO_RESULT_CHAINING_RULES(
                _SATB._LAST_LIST_TRUTHY_MONO_FUNC,
                _SATB._LAST_LIST_TRUTHY_MONO_FUNC)
        //
    }; // _SATB._RESULT_CHAINING_RULES
    Object.keys(_SATB._IS_ASSOCIATIVE_OPERATORS).forEach(function(operator) {
        var func = _SATB._OPERATOR_RESULT_FUNC(operator);
        var valFunc = _SATB._OPERATOR_VAL_RESULT_FUNC(operator);
        var truthyFunc = _SATB._OPERATOR_TRUTHY_RESULT_FUNC(operator);
        _SATB._RESULT_CHAINING_RULES[operator] = {
            isAssociative: _SATB._IS_ASSOCIATIVE_OPERATORS[operator],
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(func),
            operatorVal: _SATB._RESULT_CHAINING_RULE_FUNC(valFunc),
            operatorTruthy: _SATB._RESULT_CHAINING_RULE_FUNC(truthyFunc),
            operatorTruthyVal: _SATB._RESULT_CHAINING_RULE_FUNC(valFunc)
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
        isStatusBarVisible: false, // v0.06a+
        //
        // (v0.16a+)Action Module
        actCost: true,
        actMode: false,
        //
        // Charge Module
        chargeMax: true,
        isPayBeforeExecCharge: false,
        canCancelCharge: false,
        canForceCharge: false,
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: true,
        canCancelCooldown: false,
        //
        // (v0.12a+)Countdown Module
        countdown: false, // It's just to play safe even if it's no default
        //
        delay: true, // (v0.15a+)Delay Module
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: false,
        continuousOrderSpriteIconFolder: false,
        continuousOrderSpriteIconFilename: false,
        continuousOrderSpriteIconHue: false,
        continuousOrderSpriteIconSmooth: false,
        continuousOrderSpriteIconXCoor: false,
        continuousOrderSpriteIconYCoor: false,
        continuousOrderSpriteIconSourceW: false,
        continuousOrderSpriteIconSourceH: false,
        continuousOrderSpriteIconW: false,
        continuousOrderSpriteIconH: false,
        continuousOrderSpriteY: false,
        discreteOrderSpriteTargetOpacity: false,
        discreteOrderSpriteIconFolder: false,
        discreteOrderSpriteIconFilename: false,
        discreteOrderSpriteIconHue: false,
        discreteOrderSpriteIconSmooth: false,
        discreteOrderSpriteIconXCoor: false,
        discreteOrderSpriteIconYCoor: false,
        discreteOrderSpriteIconSourceW: false,
        discreteOrderSpriteIconSourceH: false,
        discreteOrderSpriteIconW: false,
        discreteOrderSpriteIconH: false,
        //
        // (v0.10a+)Rate Module
        coreATBRate: true,
        chargeATBRate: true,
        cooldownATBRate: true,
        //
        resetATBVal: true, // (v0.07a+)Reset Module
        actSpeed: true, // (v0.07a+)Speed Module
        // (v0.09a+)Start Module
        normStartATBVal: true,
        preemptStartATBVal: true,
        surpriseStartATBVal: true
        //
    }; // _SATB._IS_NOTE_USE_DEFAULT
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        _SATB._IS_NOTE_USE_DEFAULT[note] = true;
    });
    //
    // v0.12a+
    _SATB._LIST_NO_TRUTHY = { countdown: function() { return undefined; } };
    _SATB._IS_TRUTHY = {
        countdown: function(result) { return result.cond; }
    }; // _SATB._IS_TRUTHY
    _SATB._TRUTHY_MONO = {
        countdown: function(result) {
            delete result.cond;
            return result;
        }
    }; // _SATB._TRUTHY_MONO
    //
    _SATB._NOTE_CHAINING_RULES = {
        // Core Module
        coreMax: "_coreMaxATBValNoteChainingRule",
        coreActState: "_coreActStateNoteChainingRule",
        //
        isBarVisible: "_isBarVisibleNoteChainingRule", // (v0.04a+)Bar Module
        // (v0.06a+)Bar Module
        isStatusBarVisible: "_isStatusBarVisibleNoteChainingRule",
        //
        // (v0.16a+)Action Module
        actCost: "_actCostNoteChainingRule",
        actMode: "_actModeNoteChainingRule",
        //
        // (v0.04a+)Charge Module
        chargeMax: "_chargeMaxATBValNoteChainingRule",
        isPayBeforeExecCharge: "_isPayBeforeExecChargeNoteChainingRule",
        canCancelCharge: "_canCancelChargeNoteChainingRule",
        canForceCharge: "_canForceChargeNoteChainingRule",
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: "_cooldownMaxATBValNoteChainingRule",
        canCancelCooldown: "_canCancelCooldownNoteChainingRule",
        //
        countdown: "_countdownNoteChainingRule", // (v0.12a+)Countdown Module
        delay: "_delayNoteChainingRule", // (v0.15a+)Delay Module
        // (v0.10a+)Rate Module
        coreATBRate: "_coreATBRateNoteChainingRule",
        chargeATBRate: "_chargeATBRateNoteChainingRule",
        cooldownATBRate: "_cooldownATBRateNoteChainingRule",
        //
        resetATBVal: "_resetATBValNoteChainingRule", // (v0.07a+)Reset Module
        actSpeed: "_actSpeedNoteChainingRule", // (v0.08a+)Speed Module
        // (v0.09a+)Start Module
        normStartATBVal: "_normStartATBValNoteChainingRule",
        preemptStartATBVal: "_preemptStartATBValNoteChainingRule",
        surpriseStartATBVal: "_surpriseStartATBValNoteChainingRule"
        //
    }; // _SATB._NOTE_CHAINING_RULES
    Object.keys(SATBM.RUN_MODULES).forEach(function(note) { // v0.06a+
        // This hardcodes the param name but reduces work on adding events
        _SATB._NOTE_CHAINING_RULES[note] = "_" + note + "NoteChainingRule";
        //
    });
    // Refers to reference tag NOTE_TYPE
    _SATB._RESULT_CHAINING_OPERATION = {
        // Core Module
        coreMax: "operator",
        coreActState: "operator",
        //
        isBarVisible: "operator", // (v0.04a+)Bar Module
        isStatusBarVisible: "operator", // (v0.06a+)Bar Module
        // (v0.16a+)Action Module
        actCost: "operator",
        actMode: "mono",
        //
        // (v0.04a+)Charge Module
        chargeMax: "operator",
        isPayBeforeExecCharge: "operator",
        canCancelCharge: "operator",
        canForceCharge: "operator",
        //
        // (v0.05a+)Cooldown Module
        cooldownMax: "operator",
        canCancelCooldown: "operator",
        //
        countdown: "operator", // (v0.12a+)Countdown Module
        delay: "operatorTruthy", // (v0.15a+)Delay Module
        // (v0.14a+)Order Module
        continuousOrderSpriteOpacity: "mono",
        continuousOrderSpriteIconFolder: "mono",
        continuousOrderSpriteIconFilename: "mono",
        continuousOrderSpriteIconHue: "mono",
        continuousOrderSpriteIconSmooth: "mono",
        continuousOrderSpriteIconXCoor: "mono",
        continuousOrderSpriteIconYCoor: "mono",
        continuousOrderSpriteIconSourceW: "mono",
        continuousOrderSpriteIconSourceH: "mono",
        continuousOrderSpriteIconW: "mono",
        continuousOrderSpriteIconH: "mono",
        continuousOrderSpriteY: "mono",
        discreteOrderSpriteTargetOpacity: "mono",
        discreteOrderSpriteIconFolder: "mono",
        discreteOrderSpriteIconFilename: "mono",
        discreteOrderSpriteIconHue: "mono",
        discreteOrderSpriteIconSmooth: "mono",
        discreteOrderSpriteIconXCoor: "mono",
        discreteOrderSpriteIconYCoor: "mono",
        discreteOrderSpriteIconSourceW: "mono",
        discreteOrderSpriteIconSourceH: "mono",
        discreteOrderSpriteIconW: "mono",
        discreteOrderSpriteIconH: "mono",
        //
        // (v0.10a+)Rate Module
        coreATBRate: "operator",
        chargeATBRate: "operator",
        cooldownATBRate: "operator",
        //
        resetATBVal: "operator", // (v0.07a+)Reset Module
        actSpeed: "operator", // (v0.08a+)Speed Module
        // (v0.09a+)Start Module
        normStartATBVal: "operator",
        preemptStartATBVal: "operator",
        surpriseStartATBVal: "operator"
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
     * @interface @since v0.00a @version v0.16a
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
        } else return resultFunc.call(this, list, note, argObj_);
        //
    }; // $.chainedAssociativeResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.04a @version v0.16a
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
        } else return resultFunc.call(this, list, note, argObj_);
        //
    }; // $.chainedNonAssociativeResult_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {[PairFunc]} The chained list of PairFuncs to be run
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
     * @since v0.00a @version v0.14a
     * @param {NoteType} note - The note to have its effective list returned
     * @enum @returns {ChainRule} Effective notetag chaining rule parameter val
     */
    $._chainingRule = function(note) {
        var rule = _SATB._NOTE_CHAINING_RULES[note];
        // Some notetags do have no chaining rules
        if (!rule) return _SATB._DEFAULT_CHAINING_RULE;
        //
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
    _SATB._IS_ALIVE = function(mem) { return mem.isAlive(); }; // v0.14a+
    _SATB._MARK_ITEM_CHANGE_FACTORS = function(mem) { // v0.16a+
        // It's not worth making a new public method of Game_Actor just for this
        mem._satb.notes.markChangeFactors(["items", "usableItems"]);
        mem.refresh();
        //
    }; // _SATB._MARK_ITEM_CHANGE_FACTORS

    /*------------------------------------------------------------------------
     *    (v0.05b+)New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {[Game_Actor]} inputableActors - The list of all inputable actors

    // It's to avoid overriding Game_Party.prototype.clearActions from plugins
    _GP.clearActions = $.clearActions || $$.clearActions;
    //
    _SATB.clearActions = $.clearActions = function() {
    // v0.00a - v0.00a; Extended
        _GP.clearActions.apply(this, arguments);
        // Added to clear the ATB value of all actors upon a failed escape
        _SATB._eraseVirtualActSlot.call(this);
        //
    }; // $.clearActions

    _GP.addActor = $.addActor;
    _SATB.addActor = $.addActor = function(actorId) {
    // v0.14a - v0.14a; Extended
        _GP.addActor.apply(this, arguments);
        // Added to ensure the order windows will be updated instantly
        SATBManager.procScene_("onAddSATBActor", [$gameActors.actor(actorId)]);
        // This must be placed here or it won't access the newly added actor
    }; // $.addActor

    _GP.removeActor = $.removeActor;
    _SATB.removeActor = $.removeActor = function(actorId) {
    // v0.00a - v0.00a; Extended
        // Added to ensure actors being added back will have ATB value cleared
        _SATB._removeActor.call(this, actorId);
        // This must be placed here or it won't know if actorId is in the party
        _GP.removeActor.apply(this, arguments);
    }; // $.removeActor

    _GP.gainItem = $.gainItem;
    _SATB.gainItem = $.gainItem = function(item, amount, includeEquip) {
    // v0.16a - v0.16a; Extended
        _GP.gainItem.apply(this, arguments);
        // Added to ensure all actors will be notified of party item changes
        _SATB._markAllItemChangeFactors.call(this);
        //
    }; // $.gainItem

    _GP.swapOrder = $.swapOrder;
    _SATB.swapOrder = $.swapOrder = function(index1, index2) {
    // v0.14a - v0.14a; Extended
        _GP.swapOrder.apply(this, arguments);
        // Added to update continuous/discrete order window actor sprite icons
        if (!BattleManager.isSATBBattle()) return;
        _SATB._swapOrder.call(this, index1, index2);
        //
    }; // $.swapOrder

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.05b @version v0.05b
     * @returns {[Game_Actor]} The list of alive members in the battle
     */
    $.aliveSATBMems = function() {
        var allMems = this.allMembers();
        allMems.length = this.maxBattleMembers();
        return allMems.filter(_SATB._IS_ALIVE, this);
    }; // _SATB.aliveSATBMems

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
     * Compatibility/Idempotent Without Events
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
        actor.runSATBNote("didAddInputableActor");
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
     * @interface @since v0.04a @version v0.16a
     * @param {Index} i - The index of the actor to cancel the ATB charge
     */
    $.onTryCancelActorChargeSATB = function(i) {
        _SATB._onTryInvokeActorCmd.call(this, i, "onCancelSATBCharge");
    }; // $.onTryCancelActorChargeSATB

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.16a
     * @param {Index} i - The index of the actor to start forcing the ATB charge
     */
    $.onTryStartForceActorChargeSATB = function(i) {
        _SATB._onTryInvokeActorCmd.call(this, i, "onStartForceSATBCharge");
    }; // _SATB._onTryStartForceActorCharge

    /**
     * Idempotent
     * @interface @since v0.04a @version v0.16a
     * @param {Index} i - The index of the actor to end forcing the ATB charge
     */
    $.onTryEndForceActorChargeSATB = function(i) {
        _SATB._onTryInvokeActorCmd.call(this, i, "onEndForceSATBCharge");
    }; // $.onTryEndForceActorChargeSATB

    /**
     * Idempotent
     * @interface @since v0.05a @version v0.16a
     * @param {Index} i - The index of the actor to cancel the ATB cooldown
     */
    $.onTryCancelActorCooldownSATB = function(i) {
        _SATB._onTryInvokeActorCmd.call(this, i, "onCancelSATBCooldown");
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
        SATBManager.procScene_("onRemoveSATBActor", [actorId]);
    }; // _SATB._removeActor

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.16a @version v0.16a
     */
    _SATB._markAllItemChangeFactors = function() {
        this.members().forEach(_SATB._MARK_ITEM_CHANGE_FACTORS);
    }; // _SATB._markAllItemChangeFactors

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {Index} i1 - The index of the 1st actor to be swapped
     * @param {Index} i2 - The index of the 2nd actor to be swapped
     */
    _SATB._swapOrder = function(i1, i2) {
        var id1 = this._actors[i1], id2 = this._actors[i2];
        var actor1 = $gameActors.actor(id1), actor2 = $gameActors.actor(id2);
        var is1Appeared = actor1.isAppeared();
        var is2Appeared = actor2.isAppeared();
        // This should never happen but it;s just to play safe
        if (!is1Appeared && !is2Appeared) return;
        //
        if (!is1Appeared && is2Appeared) {
            _SATB._removeThenAddActors.call(this, [id1], [actor2]);
        } else if (is1Appeared && !is2Appeared) {
            return _SATB._removeThenAddActors.call(this, [id2], [actor1]);
        }
        // It's to ensure continuous/discrete order window have no stale data
        _SATB._removeThenAddActors.call(this, [id1, id2], [actor1, actor2]);
        //
    }; // _SATB._swapOrder

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {[Id]} removedIds - The list of ids of actors to be removed
     * @param {[Game_Actor]} addedActors - The list of actors to be added
     */
    _SATB._removeThenAddActors = function(removedIds, addedActors) {
        SATBManager.procScene_("onRemoveSATBActor", removedIds);
        SATBManager.procScene_("onAddSATBActor", addedActors);
    }; // _SATB._removeThenAddActors

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @interface @since v0.05a @version v0.16a
     * @param {Index} i - The index of the actor to cancel the ATB cooldown
     * @param {String} cmd - The name of the method to be triggered by actor
     */
    _SATB._onTryInvokeActorCmd = function(i, cmd) {
        var actor_ = this.members()[i];
        if (actor_) actor_[cmd]();
    }; // _SATB._onTryInvokeActorCmd

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
            } default: return [];
        }
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
    _SATB._IS_PLUGIN_CMD = function(cmd) {
        return _SATB._CMD_NAMES.contains(cmd);
    }; // _SATB._IS_PLUGIN_CMD
    // It's to tolerate input mistakes involving upper/lower cases
    _SATB._MAP_CMD = function(cmd) { _SATB._CMDS[cmd.toUpperCase()] = cmd; };
    //
    _SATB._PARSED_ARGS = function(cmd, args) { // v0.05b+
        if (!_SATB._IS_NUM_ARGS[cmd]) return args;
        return args.map(function(arg) { return +arg; });
    }; // _SATB._PARSED_ARGS
    _SATB._PLUGIN_CMD_TARGETS = function(targetText) { // v0.06a+
        var match = targetText.match(_SATB._PLUGIN_CMD_ARG_REGEX);
        if (!match) return [];
        // Not replacing args.shift() is to avoid redundant works and play safe
        return match.map(function(m) { return m.replace("'", "\""); });
        //
    }; // _SATB._PLUGIN_CMD_TARGETS
    _SATB._SHOW_INVALID_TARGET_TYPE = function(cmdText, targetType) { // v0.06a+
        console.warn([
            "The following plugin command of DoubleX RMMV Superlative ATB:",
            cmdText,
            "has an invalid targetType " + targetType +"!"
        ].join("\n"));
    }; // _SATB._SHOW_INVALID_TARGET_TYPE
    _SATB._SHOW_INVALID_TARGETS = function(cmdText, targetText) { // v0.06a+
        console.warn([
            "The following plugin command of DoubleX RMMV Superlative ATB:",
            cmdText,
            "has no targets specified in " + targetText +"!"
        ].join("\n"));
    }; // _SATB._SHOW_INVALID_TARGET_TYPE

    // Using all capital letters is to make the commands less case sensitive
    _SATB._TARGET_TYPES = {
        ALLPARTY: function() { return $gameParty.members(); },
        ALIVEPARTY: function() { return $gameParty.aliveMembers(); },
        DEADPARTY: function() { return $gameParty.deadMembers(); },
        MOVABLEPARTY: function() { return $gameParty.movableMembers(); },
        ALLTROOP: function() { return $gameTroop.members(); },
        ALIVETROOP: function() { return $gameTroop.aliveMembers(); },
        DEADTROOP: function() { return $gameTroop.deadMembers(); },
        MOVABLETROOP: function() { return $gameTroop.movableMembers(); },
        ALLACTORS: function() { return $gameActors._data; },
        ALIVEACTORS: function() {
            return $gameActors._data.filter(_SATB._IS_ALIVE);
        }, // aliveActors
        DEADACTORS: function() {
            return $gameActors._data.filter(_SATB._IS_DEAD);
        }, // deadActors
        MOVABLEACTORS: function() {
            return $gameActors._data.filter(_SATB._CAN_MOVE);
        } // movableActors
    }; // _SATB._TARGET_TYPES
    //

    // Such complicated and convoluted regexes are to have forgiving syntaxes
    _SATB._PLUGIN_CMD_ARG_REGEX_STRING = "[^'\", ]+|['\"][^'\"]*['\"]";
    _SATB._PLUGIN_CMD_ARG_REGEX =
            new RegExp(_SATB._PLUGIN_CMD_ARG_REGEX_STRING, "gim");
    _SATB._PLUGIN_CMD_REGEX = new RegExp("(?:" +
            _SATB._PLUGIN_CMD_ARG_REGEX_STRING + ")(?:, *(?:" +
            _SATB._PLUGIN_CMD_ARG_REGEX_STRING + "))*", "gim");
    //
    // These logs should be kept to so regex errors can be fixed more quickly
    console.info("_SATB._PLUGIN_CMD_ARG_REGEX", _SATB._PLUGIN_CMD_ARG_REGEX);
    console.info("_SATB._PLUGIN_CMD_REGEX", _SATB._PLUGIN_CMD_REGEX);
    //
    _SATB._TARGET_ID = "id", _SATB._TARGET_INDEX = "index";

    _SATB._CMDS = {};
    // Functions returning results aren't commands but they're not listed anyway
    Object.keys(GB.NOTE_FORWARDED_FUNCS).fastMerge([
        "setSATBActTimes",
        "addSATBActTimes",
        "multiplySATBActTimes"
    ]).fastMerge(Object.keys(GB.PHASE_TYPE_FORWARDED_FUNCS)).forEach(
            _SATB._MAP_CMD);
    //
    _SATB._CMD_NAMES = Object.keys(_SATB._CMDS);
    _SATB._IS_NUM_ARGS = { // v0.05b+
        setSATBActTimes: true,
        addSATBActTimes: true,
        multiplySATBActTimes: true
    };
    Object.keys(GB.PHASE_TYPE_FORWARDED_FUNCS).forEach(function(func) {
        _SATB._IS_NUM_ARGS[func] = true;
    });

    // Using all capital letters is to make the commands less case sensitive
    _SATB._TARGET_GROUPS = {
        ALLPARTY: _SATB._TARGET_INDEX,
        ALIVEPARTY: _SATB._TARGET_INDEX,
        DEADPARTY: _SATB._TARGET_INDEX,
        MOVABLEPARTY: _SATB._TARGET_INDEX,
        ALLTROOP: _SATB._TARGET_INDEX,
        ALIVETROOP: _SATB._TARGET_INDEX,
        DEADTROOP: _SATB._TARGET_INDEX,
        MOVABLETROOP: _SATB._TARGET_INDEX,
        ALLACTORS: _SATB._TARGET_ID,
        ALIVEACTORS: _SATB._TARGET_ID,
        DEADACTORS: _SATB._TARGET_ID,
        MOVABLEACTORS: _SATB._TARGET_ID
    }; // _SATB._TARGET_GROUPS
    //

    _GI.command356 = $.command356;
    _SATB.command356 = $.command356 = function() {
    // v0.06a - v0.06a; Extended
        var result = _GI.command356.apply(this, arguments);
        // Added to invoke the plugin command from this plugin
        _SATB._pluginCmd.call(this);
        //
        return result;
    }; // $.command356

    /**
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.06a
     */
    _SATB._pluginCmd = function() {
        var cmdText = this._params[0];
        var args = cmdText.match(_SATB._PLUGIN_CMD_REGEX);
        if (!args) return;
        var parsedCmd = args.shift().toUpperCase();
        if (!_SATB._IS_PLUGIN_CMD(parsedCmd)) return;
        _SATB._usePluginCmd.call(this, cmdText, parsedCmd, args);
    }; // _SATB._pluginCmd

    /**
     * Plugin command's just another way of using script call
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.06a
     * @param {String} cmdText - The original plugin command text
     * @param {PluginCmd} parsedCmd - The plugin command name in upper case
     * @param {PluginArgs} args - Plugin command arguments
     * @todo Breaks this exceesively long functions into several smaller pieces
     */
    _SATB._usePluginCmd = function(cmdText, parsedCmd, args) {
        // The 1st and 2nd arguments must always be the target type and target
        var targetType = args.shift().toUpperCase(), targetText = args.shift();
        var targets = _SATB._PLUGIN_CMD_TARGETS(targetText);
        //
        if (targets.length <= 0) {
            _SATB._SHOW_INVALID_TARGETS(cmdText, targetText);
        }
        var battlers = _SATB._pluginCmdTargets.call(
                this, cmdText, targetType, targets);
        // _SATB._CMDS[inputtedCmd.toUpperCase()] isn't always inputtedCmd
        var cmd = _SATB._CMDS[parsedCmd];
        //
        var parsedArgs = _SATB._PARSED_ARGS(cmd, args);
        battlers.forEach(function(battler) {
            battler[cmd].apply(battler, parsedArgs);
        });
    }; // _SATB._usePluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {String} cmdText - The original plugin command text
     * @param {TargetType} targetType - The battler group to be targeted
     * @param {[String|Number]} targets - Refer to reference tag
     *                                    PLUGIN_CMD_TARGET
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargets = function(cmdText, targetType, targets) {
        var targetGroup =
                _SATB._pluginCmdTargetGroup.call(this, cmdText, targetType);
        return _SATB._FILTERED_TARGETS(targetType, targets, targetGroup);
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.06a
     * @param {String} cmdText - The original plugin command text
     * @param {TargetType} targetType - The battler group to be targeted
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargetGroup = function(cmdText, targetType) {
        if (!_SATB._TARGET_TYPES[targetType]) {
            _SATB._SHOW_INVALID_TARGET_TYPE(cmdText, targetType);
            return [];
        }
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
 *    # (v0.14a+)New class: Sprite_SATBContinuousOrderBattlerIcon
 *      Shows the battler icon in the continuous order window
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Sprite_Base.prototype;

    Sprite_SATBContinuousOrderBattlerIcon.prototype = Object.create($$);

    var $ = Sprite_SATBContinuousOrderBattlerIcon.prototype;

    $.constructor = Sprite_SATBContinuousOrderBattlerIcon;

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {SpriteXFuncs}_spriteXFuncs: The list of functions for setting sprite x
    // {Nonnegative Int} _lastIconXCoor: The x coordinate of the icon in sheet
    // {Nonnegative Int} _lastIconYCoor: The y coordinate of the icon in sheet
    // {String} _lastIconFolder: The folder name having the icon sheet
    // {String} _lastIconFilename: The icon sheet filename
    // {Hue} _lastIconHue: The icon sheet hue
    // {Boolean} _lastIconSmooth: The icon sheet smooth
    // {Natural Num} _sw: The icon source width
    // {Natural Num} _sh: The icon source height

    /**
     * Idempotent
     * @constructor @since v0.14a @version v0.14a
     * @param {Game_Battler} battler - The battler owning this icon sprite
     * @param {SpriteXFuncs} spriteXFuncs - List of functions setting sprite x
     */
    $.initialize = function(battler, spriteXFuncs) {
        this._spriteXFuncs = spriteXFuncs;
        // It must be called first or super initialize would crash the game
        this.setBattler(battler);
        //
        $$.initialize.call(this);
        this.bitmap = new Bitmap(this._iconW(), this._iconH());
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.clear = function() {
        delete this._battler;
        delete this._spriteXFuncs;
    }; // $.clear

    /**
     * Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.update = function() {
        this.visible = this._battler.isAlive();
        if (!this.visible) return;
        this._updateVal("opacity");
        if (this.opacity <= 0) return;
        $$.update.call(this);
        this._updateWhenVisible();
    }; // $.update

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Battler} battler - The battler owning this icon sprite
     */
    $.setBattler = function(battler) { this._battler = battler; };

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWhenVisible = function() {
        this._updateBitmap();
        this._updateVal("x");
        this._updateVal("y");
    }; // $._updateWhenVisible

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._updateBitmap = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconSheet = this._isSameIconSheet();
        var isSameIconCoors = this._isSameCoors();
        var isSameIconSourceSize = this._isSameIconSourceSize();
        var isSameIconSize = this._isSameIconSize();
        //
        if (isSameIconSheet && isSameIconCoors && isSameIconSourceSize &&
                isSameIconSize) return;
        this.bitmap.clear();
        if (!isSameIconSheet) this._reloadBitmap();
        if (!isSameIconSize) this.bitmap.resize(this.width, this.height);
        this._redrawBitmap();
    }; // $._updateBitmap

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameIconSheet = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconFolder =
                this._isSameCachedVal("_lastIconFolder", "_iconFolder");
        var isSameIconFilename =
                this._isSameCachedVal("_lastIconFilename", "_iconFilename");
        var isSameIconHue =
                this._isSameCachedVal("_lastIconHue", "_iconHue");
        var isSameIconSmooth =
                this._isSameCachedVal("_lastIconSmooth", "_iconSmooth");
        //
        if (!isSameIconFolder || !isSameIconFilename) return;
        return isSameIconHue && isSameIconSmooth;
    }; // $._isSameIconSheet

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameCoors = function() {
        var isSameIconXCoor =
                this._isSameCachedVal("_lastIconXCoor", "_iconXCoor");
        var isSameIconYCoor =
                this._isSameCachedVal("_lastIconYCoor", "_iconYCoor");
        return isSameIconXCoor && isSameIconYCoor;
    }; // $._isSameCoors

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._reloadBitmap = function() {
        var folder = this._lastIconFolder, filename = this._lastIconFilename;
        var hue = this._lastIconHue, smooth = this._lastIconSmooth;
        this._bitmapSource =
                ImageManager.loadBitmap(folder, filename, hue, smooth);
    }; // $._reloadBitmap

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameIconSourceSize = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconSourceW = this._isSameCachedVal("_sw", "_iconSourceW");
        var isSameIconSourceH = this._isSameCachedVal("_sh", "_iconSourceH");
        //
        return isSameIconSourceW && isSameIconSourceH;
    }; // $._isSameIconSourceSize

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameIconSize = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconW = this._isSameCachedVal("width", "_iconW");
        var isSameIconH = this._isSameCachedVal("height", "_iconH");
        //
        return isSameIconW && isSameIconH;
    }; // $._isSameIconSize

    [
        "opacity",
        "iconFolder",
        "iconFilename",
        "iconHue",
        "iconSmooth",
        "iconXCoor",
        "iconYCoor",
        "iconSourceW",
        "iconSourceH",
        "iconW",
        "iconH",
        "y"
    ].forEach(function(funcName) {
        var upperFuncName = funcName[0].toUpperCase() + funcName.slice(1);
        var note = "continuousOrderSprite" + upperFuncName;
        /**
         * Hotspot/Idempotent
         * @since v0.14a @version v0.14a
         * @returns {*} The notetag result
         */
        $["_" + funcName] = function() {
            return this._battler.satbNoteResult_(note, { sprite: this });
        }; // $["_" + funcName]
    });

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {String} cachedVal - The name of the variable as the cache
     * @param {String} newVal - The name of the function getting the new value
     * @returns {Boolean} The check result
     */
    $._isSameCachedVal = function(cachedVal, newVal) {
        var val = this[newVal]();
        var isSameVal = this[cachedVal] === val;
        if (!isSameVal) this[cachedVal] = val;
        return isSameVal;
    }; // $._isSameCachedVal

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._redrawBitmap = function() {
        var sw = this._sw, sh = this._sh;
        var iconXCoor = this._lastIconXCoor, iconYCoor = this._lastIconYCoor;
        var sx = iconXCoor * sw, sy = iconYCoor * sh;
        var dw = this.width, dh = this.height;
        this.bitmap.blt(this._bitmapSource, sx, sy, sw, sh, 0, 0, dw, dh);
    }; // $._redrawBitmap

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @returns {Nonnegative Num} The battler icon x position in order window
     */
    $._x = function() {
        return this._baseX() - this.width / 2 + this._spriteXFuncs.padding();
    }; // $._x

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.16a
     * @returns {Nonnegative Num} The battler icon x position in order window
     */
    $._baseX = function() {
        if (this._battler.isSATBCooldown()) return this._phaseX("cooldown");
        if (this._battler.isSATBFill()) return this._phaseX("core");
        if (this._battler.isSATBCharge()) return this._phaseX("charge");
        throw new Error(
                "A battler must be either filling, charging or cooling down!");
    }; // $._baseX

    /**
     * Hotspot/Nullipotent
     * @since v0.16a @version v0.16a
     * @enum @param {String} phase - core/charge/cooldown
     * @returns {Nonnegative Num} The battler icon x position in order window
     */
    $._phaseX = function(phase) {
        var barX = this._spriteXFuncs[phase + "BarX"]();
        var barW = this._spriteXFuncs[phase + "BarW"]();
        return barX + barW * this._battler[phase + "SATBProportion"]();
    }; // $._phaseX

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {String} valName - The name of the icon value to be updated
     */
    $._updateVal = function(valName) {
        var val = this["_" + valName]();
        if (this[valName] !== val) this[valName] = val;
    }; // $._updateVal

})(); // Sprite_SATBContinuousOrderBattlerIcon.prototype

/*----------------------------------------------------------------------------
 *    # (v0.14a+)New class: Sprite_SATBDiscreteOrderBattlerIcon
 *      Shows the battler icon in the discrete order window
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $$ = Sprite_Base.prototype;
    var _SATB = SATB.Sprite_SATBDiscreteOrderBattlerIcon = {};

    Sprite_SATBDiscreteOrderBattlerIcon.prototype = Object.create($$);

    var $ = Sprite_SATBDiscreteOrderBattlerIcon.prototype;

    $.constructor = Sprite_SATBDiscreteOrderBattlerIcon;

    _SATB._PHASE_INIT = "init", _SATB._PHASE_CLEAR = "clear";
    _SATB._PHASE_IDLE = "idle", _SATB._PHASE_MOVE = "move";
    _SATB._SMALLEST_X_DIFF = Math.pow(2, -32);

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Boolean} _lastIconSmooth: The icon sheet smooth
    // {Hue} _lastIconHue: The icon sheet hue
    // {Natural Num} _sw: The icon source width
    // {Natural Num} _sh: The icon source height
    // {Nonnegative Int} _lastIconXCoor: The x coordinate of the icon in sheet
    // {Nonnegative Int} _lastIconYCoor: The y coordinate of the icon in sheet
    // {Nonnegative Int} _lastTargetX: The last targeted x position in window
    // {Nonnegative Int} _targetX: The current targeted x position in window
    // {String} _lastIconFolder: The folder name having the icon sheet
    // {String} _lastIconFilename: The icon sheet filename
    // {String} _phase: The current phase ofthe battler sprite icon

    /**
     * Idempotent
     * @constructor @since v0.14a @version v0.14a
     * @param {Game_Battler} battler - The battler owning this icon sprite
     */
    $.initialize = function(battler) {
        // It must be called first or super initialize would crash the game
        this.setBattler(battler);
        //
        $$.initialize.call(this);
        this._lastTargetX = this._targetX = this.x;
        this._phase = _SATB._PHASE_INIT, this.opacity = 0;
        this.bitmap = new Bitmap(this._iconW(), this._iconH());
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.clear = function() { this._phase = _SATB._PHASE_CLEAR; };

    /**
     * Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.update = function() {
        this.visible = this._battler.isAlive();
        if (!this.visible) return;
        this._updateOpacity();
        if (this.opacity <= 0) return;
        $$.update.call(this);
        this._updateWhenVisible();
    }; // $.update

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Battler} battler - The battler owning this icon sprite
     */
    $.setBattler = function(battler) { this._battler = battler; };

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Nonnegative Int} targetX - The new targeted x position in window
     */
    $.setTargetX = function(targetX) {
        this._lastTargetX = this.x;
        this._targetX = targetX;
        if (this._lastTargetX !== targetX) this._phase = _SATB._PHASE_MOVE;
        if (!this._battler || this._lastTargetX === targetX) return;
    }; // setTargetX

    /**
     * Idempotent
     * @since v0.14a @version v0.16a
     */
    $._updateOpacity = function() {
        this._updateVal("targetOpacity");
        if (this._phase === _SATB._PHASE_INIT) return this._updateInitOpacity();
        if (this._phase === _SATB._PHASE_CLEAR) {
            this._updateClearOpacity();
        } else this.opacity = this.targetOpacity;
    }; // $._updateOpacity

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $._updateInitOpacity = function() {
        this.opacity = this._initOpacity();
        if (this.opacity >= this.targetOpacity) this._phase = _SATB._PHASE_IDLE;
    }; // $._updateInitOpacity

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.15b
     * @returns {Opacity} The battler icon opacity when it's still showing
     */
    $._initOpacity = function() {
        var param = "showingDiscreteOrderBattlerSpriteOpacity";
        // Math.round will cancel small opacity updates causing opacity bugs
        return $gameSystem.satbParamFunc(param).call(this);
        //
    }; // $._initOpacity

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $._updateClearOpacity = function() {
        if (this.opacity <= 0) return;
        this.opacity = this._clearOpacity();
        if (this.opacity <= 0) this._clear();
    }; // $._updateClearOpacity

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.15b
     * @returns {Opacity} The battler icon opacity when it's still hiding
     */
    $._clearOpacity = function() {
        var param = "hidingDiscreteOrderBattlerSpriteOpacity";
        // Math.round will cancel small opacity updates causing opacity bugs
        return $gameSystem.satbParamFunc(param).call(this);
        //
    }; // $._clearOpacity

    /**
     * Destructor/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._clear = function() { delete this._battler; };

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWhenVisible = function() {
        this._updateBitmap();
        this._updateVal("x");
        this._updateVal("y");
    }; // $._updateWhenVisible

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._updateBitmap = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconSheet = this._isSameIconSheet();
        var isSameIconCoors = this._isSameCoors();
        var isSameIconSourceSize = this._isSameIconSourceSize();
        var isSameIconSize = this._isSameIconSize();
        //
        if (isSameIconSheet && isSameIconCoors && isSameIconSourceSize &&
                isSameIconSize) return;
        this.bitmap.clear();
        if (!isSameIconSheet) this._reloadBitmap();
        if (!isSameIconSize) this.bitmap.resize(this.width, this.height);
        this._redrawBitmap();
    }; // $._updateBitmap

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.16a
     * @returns {Boolean} The check result
     */
    $._isSameIconSheet = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconFolder =
                this._isSameCachedVal("_lastIconFolder", "_iconFolder");
        var isSameIconFilename =
                this._isSameCachedVal("_lastIconFilename", "_iconFilename");
        var isSameIconHue = this._isSameCachedVal("_lastIconHue", "_iconHue");
        var isSameIconSmooth =
                this._isSameCachedVal("_lastIconSmooth", "_iconSmooth");
        //
        if (!isSameIconFolder || !isSameIconFilename) return false;
        return isSameIconHue && isSameIconSmooth;
    }; // $._isSameIconSheet

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameCoors = function() {
        var isSameIconXCoor =
                this._isSameCachedVal("_lastIconXCoor", "_iconXCoor");
        var isSameIconYCoor =
                this._isSameCachedVal("_lastIconYCoor", "_iconYCoor");
        return isSameIconXCoor && isSameIconYCoor;
    }; // $._isSameCoors

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._reloadBitmap = function() {
        var folder = this._lastIconFolder, filename = this._lastIconFilename;
        var hue = this._lastIconHue, smooth = this._lastIconSmooth;
        this._bitmapSource =
                ImageManager.loadBitmap(folder, filename, hue, smooth);
    }; // $._reloadBitmap

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameIconSourceSize = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconSourceW = this._isSameCachedVal("_sw", "_iconSourceW");
        var isSameIconSourceH = this._isSameCachedVal("_sh", "_iconSourceH");
        //
        return isSameIconSourceW && isSameIconSourceH;
    }; // $._isSameIconSourceSize

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isSameIconSize = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isSameIconW = this._isSameCachedVal("width", "_iconW");
        var isSameIconH = this._isSameCachedVal("height", "_iconH");
        //
        return isSameIconW && isSameIconH;
    }; // $._isSameIconSize

    [
        "targetOpacity",
        "iconFolder",
        "iconFilename",
        "iconHue",
        "iconSmooth",
        "iconXCoor",
        "iconYCoor",
        "iconSourceW",
        "iconSourceH",
        "iconW",
        "iconH"
    ].forEach(function(funcName) {
        var upperFuncName = funcName[0].toUpperCase() + funcName.slice(1);
        var note = "discreteOrderSprite" + upperFuncName;
        /**
         * Hotspot/Idempotent
         * @since v0.14a @version v0.14a
         * @returns {*} The notetag result
         */
        $["_" + funcName] = function() {
            return this._battler.satbNoteResult_(note, { sprite: this });
        }; // $["_" + funcName]
    });

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {String} cachedVal - The name of the variable as the cache
     * @param {String} newVal - The name of the function getting the new value
     * @returns {Boolean} The check result
     */
    $._isSameCachedVal = function(cachedVal, newVal) {
        var val = this[newVal]();
        var isSameVal = this[cachedVal] === val;
        if (!isSameVal) this[cachedVal] = val;
        return isSameVal;
    }; // $._isSameCachedVal

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._redrawBitmap = function() {
        var sw = this._sw, sh = this._sh;
        var iconXCoor = this._lastIconXCoor, iconYCoor = this._lastIconYCoor;
        var sx = iconXCoor * sw, sy = iconYCoor * sh;
        var dw = this.width, dh = this.height;
        this.bitmap.blt(this._bitmapSource, sx, sy, sw, sh, 0, 0, dw, dh);
    }; // $._redrawBitmap

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Nonnegative Num} The battler icon x position in order window
     */
    $._x = function() {
        return this._phase === _SATB._PHASE_MOVE ? this._updatedX() : this.x;
    }; // $._x

    /**
     * Potential Hotspot/Idempotent
     * @since v0.14a @version v0.15b
     * @returns {Nonnegative Num} The battler icon x position in order window
     */
    $._updatedX = function() {
        if (this._isFinishUpdateX()) {
            this._onFinishUpdateX();
            return this._targetX;
        }
        // Math.round will cancel small x movements causing x position bugs
        return $gameSystem.satbParamFunc("discreteOrderSpriteX").call(this);
        //
    }; // $._updatedX

    /**
     * Potential Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isFinishUpdateX = function() {
        return Math.abs(this._targetX - this.x) <= _SATB._SMALLEST_X_DIFF;
    }; // _isFinishUpdateX

    /**
     * Potential Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._onFinishUpdateX = function() { this._phase = _SATB._PHASE_IDLE; };

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @returns {Nonnegative Num} The battler icon y position in order window
     */
    $._y = function() {
        return this._phase === _SATB._PHASE_MOVE ? this._updatedY() : this.y;
    }; // $._y

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.15b
     * @returns {Nonnegative Num} The battler icon y position in order window
     */
    $._updatedY = function() {
        // Math.round will cancel small y movements causing y position bugs
        return $gameSystem.satbParamFunc("discreteOrderSpriteY").call(this);
        //
    }; // $._updatedY

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {String} valName - The name of the icon value to be updated
     */
    $._updateVal = function(valName) {
        var val = this["_" + valName]();
        if (this[valName] !== val) this[valName] = val;
    }; // $._updateVal

})(DoubleX_RMMV.SATB); // Sprite_SATBDiscreteOrderBattlerIcon.prototype

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
     * @interface @since v0.05a @version v0.16a
     * @param {KeyMap} symbol - The symbol of the key to be handled
     * @param {[()]} methods - The list of methods to be attached to the symbol
     */
    $.addHandlers = $.addHandlers || function(symbol, methods) {
        if (this.isHandled(symbol)) {
            this._handlers[symbol].fastMerge(methods);
        } else this._handlers[symbol] = methods.clone();
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

})(DoubleX_RMMV.SATB); // Window_Selectable.prototype

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

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {[Window_StatusSATBBar]} bars: The list of actor ATB bars

    _WBS.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.06a - v0.06a; Extended
        // This must be placed here or refresh wouldn't have the needed variable
        _SATB._init.call(this); // Added to initialize all new variables as well
        //
        _WBS.initialize.apply(this, arguments);
    }; // $.initialize

    _WBS.refresh = $.refresh;
    _SATB.refresh = $.refresh = function() { // v0.06a - v0.06a; Extended
        _WBS.refresh.apply(this, arguments);
        // Added to refresh the actor ATB bars as well
        _SATB._refreshBarWins.call(this);
        //
    }; // $.refresh

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
     * Hotspot/Idempotent
     * @interface @since v0.06a @version v0.06a
     * @param {[Game_Battler]} battlers - List of battlers to refresh ATB bar
     * @todo Stops accessing the private _battler in battler ATB bars directly
     */
    $.refreshSATBBars = function(battlers) {
        this._satb.bars.forEach(function(bar) {
            if (battlers.contains(bar._battler)) bar.refreshBar();
        });
    }; // $.refreshSATBBars

    /**
     * Hotspot/Idempotent
     * @interface @since v0.06a @version v0.06a
     */
    $.clearSATBBars = function() {
        this._satb.bars.forEach(_SATB._clearBar, this);
        _SATB._init.call(this);
    }; // $.clearSATBBars

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Idempotent
     * @since v0.06a @version v0.06a
     * @todo Boosts the performance of this method
     */
    _SATB._init = function() { this._satb = { bars: [] }; };

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Idempotent
     * @since v0.06a @version v0.06a
     * @todo Stops accessing the private _battler in battler ATB bars directly
     */
    _SATB._refreshBarWins = function() {
        $gameParty.battleMembers().forEach(_SATB._refreshBarWin, this);
    }; // _SATB._refreshBarWins

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Idempotent
     * @param {Game_Actor} mem - The party member to have the ATB bar refreshed
     * @param {Index} i - The index of the party member involved
     * @since v0.06a @version v0.06a
     * @todo Stops accessing the private _battler in battler ATB bars directly
     */
    _SATB._refreshBarWin = function(mem, i) {
        var bar = this._satb.bars[i];
        if (!bar) return _SATB._addBar.call(this, mem, i);
        bar._battler === mem ? bar.refreshWin() : bar.setBattler(mem);
    }; // _SATB._refreshBarWin

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Idempotent
     * @param {Game_Actor} mem - The party member to have the ATB bar refreshed
     * @param {Index} i - The index of the party member involved
     * @since v0.06a @version v0.06a
     * @todo Stops accessing the private _battler in battler ATB bars directly
     */
    _SATB._addBar = function(mem, i) {
        this.addChild(this._satb.bars[i] = new Window_StatusSATBBar(mem));
    }; // _SATB._addBar

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

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Idempotent
     * @since v0.06a @version v0.06a
     * @param {Window_StatusSATBBar} bar - The battler ATB bar to be cleared
     */
    _SATB._clearBar = function(bar) {
        bar.setBattler(undefined);
        bar.parent.removeChild(bar);
    }; // _SATB._clearBar

})(DoubleX_RMMV.SATB); // Window_BattleStatus.prototype

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_SATBBarBase
 *      - Shows the ATB values and maximums of each battler
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.Window_SATBBarBase = {}, $$ = Window_Base.prototype;

    Window_SATBBarBase.prototype = Object.create($$);

    var $ = Window_SATBBarBase.prototype;

    $.constructor = Window_SATBBarBase;

    _SATB._FUNC_PARAM_CACHES = { // v0.14a+
        lineHeight: "lineH",
        standardFontFace: "fontFace",
        standardFontSize: "textSize",
        standardPadding: "padding",
        standardBackOpacity: "backOpacity",
        gaugeBackColor: "backColor",
        _winskinPath: "winskinPath",
        _winskinFile: "winskinFile",
        _winskinHue: "winskinHue",
        _winskinSmooth: "winskinSmooth",
        _x: "winX",
        _y: "winY",
        _opacity: "opacity",
        _w: "winW",
        _h: "winH",
        _barColor1: "color1",
        _barColor2: "color2",
        _textColor: "textColor",
        _textXOffset: "textX",
        _textYOffset: "textY",
        _textAlign: "textAlign"
    }; // _SATB._FUNC_PARAM_CACHES

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Boolean} _canMakeCmds: Whether the battler can input or execute actions
    // {Color} _backColor: The last ATB bar background color
    // {Color} _color1: The last ATB bar gradient color at the left
    // {Color} _color2: The last ATB bar gradient color at the right
    // {Color} _lastTextColor: The last ATB bar text color
    // {Game_Battler} _battler: The battler owning this ATB bar
    // {Int} _textX: The last text x offset
    // {Int} _textY: The last text y offset
    // {Natural Num} _lineH: The last line height
    // {Natural Num} _textSize: The last text size
    // {Nonnegative Int} _lastPadding: The last padding
    // {Number} _fillW: The last ATB bar fill width
    // {Param} _lineHParam: The parameter returning the line height
    // {Param} _fontFaceParam: The parameter returning the font face
    // {Param} _textSizeParam: The parameter returning the text size
    // {Param} _paddingParam: The parameter returning the padding
    // {Param} _backOpacityParam: The parameter returning the back opacity
    // {Param} _winskinPathParam: The parameter returning the windowskin path
    // {Param} _winskinFileParam: The parameter returning the windowskin name
    // {Param} _winskinHueParam: The parameter returning the windowskin hue
    // {Param} _winskinSmoothParam: The parameter returning windowskin smooth
    // {Param} _backColorParam: The parameter returning the bar back color
    // {Param} _isShowNote: The parameter returning if this window's shown
    // {Param} _winXParam: The parameter returning the x position
    // {Param} _winYParam: The parameter returning the y position
    // {Param} _opacityParam: The parameter returning the opacity
    // {Param} _winWParam: The parameter returning the width
    // {Param} _winHParam: The parameter returning the height
    // {Param} _color1Param: The parameter returning the 1st bar color
    // {Param} _color2Param: The parameter returning the 2nd bar color
    // {Param} _textColorParam: The parameter returning the text color
    // {Param} _textXParam: The parameter returning the text x offset
    // {Param} _textYParam: The parameter returning the text y offset
    // {Param} _textParam: The parameter returning the text
    // (v0.14a+){String} _fontFace: The last font face
    // (v0.14a+){String} _lastTextAlign: The last text alignment
    // (v0.14a+){String} _lastWinskinPath: The last windowskin file path
    // (v0.14a+){String} _lastWinskinFile: The last windowskin file name
    // (v0.14a+){String} _lastWinskinHue: The last windowskin hue
    // (v0.14a+){String} _lastWinskinSmooth: The last windowskin smooth
    // {String} _text: The last formatted text
    // (v0.14a+){{}} _cache: The parameter return result cache
    //               (v0.14a+){Natural Num} lineH: The cached line height
    //               (v0.14a+){String} fontFace: The cached font face
    //               (v0.14a+){Natural Num} textSize: The cached text size
    //               (v0.14a+){Nonnegative Int} padding: The cached padding
    //               (v0.14a+){Opacity} backOpacity: The cached back opacity
    //               (v0.14a+){String} winskinPath: The cached windowskin path
    //               (v0.14a+){String} winskinFile: The cached windowskin name
    //               (v0.14a+){Hue} winskinHue: The cached windowskin hue
    //               (v0.14a+){Boolean} winskinSmooth: The cached windowskin
    //                                                 smooth
    //               (v0.14a+){Color} backColor: The cached back color
    //               (v0.14a+){Nonnegative Int} winX: The cached x position
    //               (v0.14a+){Nonnegative Int} winY: The cached y position
    //               (v0.14a+){Opacity} opacity: The cached opacity
    //               (v0.14a+){Natural Num} winW: The cached bar width
    //               (v0.14a+){Natural Num} winH: The cached bar height
    //               (v0.14a+){Color} color1: The cached 1st gradient color
    //               (v0.14a+){Color} color2: The cached 2nd gradient color
    //               (v0.14a+){Color} textColor: The cached tex color
    //               (v0.14a+){Natural Num} textX: The cached text x offset
    //               (v0.14a+){Natural Num} textY: The cached text y offset
    //               (v0.14a+){String} fontFace: The cached font face
    //               (v0.14a+){String} textAlign: The cached text alignment

    /**
     * Idempotent
     * @constructor @since v0.03a @version v0.06a
     * @param {Game_Battler} battler - The battler owning this ATB bar
     * @param {BarBaseParams} barBaseParams - All base window parameter names
     */
    $.initialize = function(battler, barBaseParams) {
        // It must be called first or refreshWin could crash the game
        this._invalidateCachedParams();
        //
        this.setBattler(battler);
        this._setBarBaseParams(barBaseParams);
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
        // Prevents calling refreshBar first which would crash the game
        this.refreshWin();
        //
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.loadWindowskin = function() {
        var path = this._winskinPath(), name = this._winskinFile();
        var hue = this._winskinHue(), smooth = this._winskinSmooth();
        this.windowskin = ImageManager.loadBitmap(path, name, hue, smooth);
    }; // $.loadWindowskin

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.05b @version v0.05b
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled(["IsBarEnabled"])) {
            return this._updateProp("visible", false);
        }
        var wasVisible = this.visible;
        if (!$gameSystem.satbParam("_isNoteCached")) {
            this._updateProp("visible", this._isVisible());
        }
        if (!this.visible) return;
        if (wasVisible && $gameSystem.satbParam("_isParamFuncCached")) return;
        this._updateVisibleWin();
    }; // $.update

    /**
     * Idempotent
     * @interface @since v0.03a @version v0.05b
     * @param {Game_Battler?} battler_ - The battler owning this ATB bar
     */
    $.setBattler = function(battler_) {
        if (this._battler === battler_) return;
        var lastBattler_ = this._battler;
        this._battler = battler_;
        if (!battler_) return this._updateProp("visible", false);
        // refreshWin is only need upon changing from a valid battler to another
        if (lastBattler_ && lastBattler_ !== battler_) this.refreshWin();
        //
    }; // $.setBattler

    /**
     * Idempotent
     * @interface @since v0.05b @version v0.16a
     */
    $.refreshWin = function() {
        if (!SATBManager.areModulesEnabled(["IsBarEnabled"])) {
            return this._updateProp("visible", false);
        } else if ($gameSystem.satbParam("_isNoteCached")) {
            this._updateProp("visible", this._isVisible());
        }
        this._invalidateCachedParams();
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
     * Idempotent
     * @since v0.06a @version v0.06a
     * @param {BarBaseParams} barBaseParams - All base window parameter names
     */
    $._setBarBaseParams = function(barBaseParams) {
        this._lineHParam = barBaseParams.lineHParam;
        this._fontFaceParam = barBaseParams.fontFaceParam;
        this._textSizeParam = barBaseParams.textSizeParam;
        this._paddingParam = barBaseParams.paddingParam;
        this._backOpacityParam = barBaseParams.backOpacityParam;
        this._winskinPathParam = barBaseParams.winskinPathParam;
        this._winskinFileParam = barBaseParams.winskinFileParam;
        this._winskinHueParam = barBaseParams.winskinHueParam;
        this._winskinSmoothParam = barBaseParams.winskinSmoothParam;
        this._backColorParam = barBaseParams.backColorParam;
        this._isShowNote = barBaseParams.isShowNote;
        this._winXParam = barBaseParams.winXParam;
        this._winYParam = barBaseParams.winYParam;
        this._opacityParam = barBaseParams.opacityParam;
        this._winWParam = barBaseParams.winWParam;
        this._winHParam = barBaseParams.winHParam;
        this._color1Param = barBaseParams.color1Param;
        this._color2Param = barBaseParams.color2Param;
        this._textColorParam = barBaseParams.textColorParam;
        this._textXParam = barBaseParams.textXParam;
        this._textYParam = barBaseParams.textYParam;
        this._textParam = barBaseParams.textParam;
        this._textAlignParam = barBaseParams.textAlignParam;
    }; // $._setBarBaseParams

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
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._invalidateCachedParams = function() { this._cache = {}; };

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
        return this._battler.satbNoteResult_(this._isShowNote);
    }; // $._isVisible

    /**
     * Idempotent
     * @since v0.05b @version v0.14a
     */
    $._updateVisibleWin = function() {
        this._updateXY();
        this._updateOpacities();
        // The ordering must be this as everything else's based on window skin
        this._updateWinskin();
        this._updateBar();
        //
    }; // $._updateVisibleWin

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    $._updateXY = function() {
        this._updateProp("x", this._x());
        this._updateProp("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Idempotent
     * @since v0.03a @version v0.06a
     * @todo Updates the translucent opacity as well
     */
    $._updateOpacities = function() {
        this._updateOpacity();
        this._updateBackOpacity();
        this._updatePaintOpacity();
    }; // $._updateOpacities

    /**
     * Hotspot/Idempotent
     * @since v0.06a @version v0.06a
     */
    $._updateOpacity = function() {
        this._updateProp("opacity", this._opacity());
    }; // $._updateOpacity

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     */
    $._updateBackOpacity = function() {
        this._updateProp("backOpacity", this.standardBackOpacity());
    }; // $._updateBackOpacity

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProp = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProp

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
     * @since v0.14a @version v0.14a
     */
    $._updateWinskin = function() {
        if (this._isUpdateWinskin()) this.loadWindowskin();
    }; // $._updateWinskin

    $._isUpdateWinskin = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isPathChanged =
                this._isCacheUpdated("_lastWinskinPath", this._winskinPath());
        var isFileChanged =
                this._isCacheUpdated("_lastWinskinFile", this._winskinFile());
        var isHueChanged =
                this._isCacheUpdated("_lastWinskinHue", this._winskinHue());
        var isSmoothChanged = this._isCacheUpdated(
                "_lastWinskinSmooth", this._winskinSmooth());
        //
        if (isPathChanged || isFileChanged) return true;
        return isHueChanged || isSmoothChanged;
    }; // $._isUpdateWinskin

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
        var isUpdateWH = this._isUpdateWH(), isUpdatePadding =
                this._isCacheUpdated("_lastPadding", this.standardPadding());
        //
        var isUpdateFont = this._isUpdateFont(), isUpdateTextColor =
                this._isCacheUpdated("_lastTextColor", this._textColor());
        var isUpdateLineH = this._isCacheUpdated("_lineH", this.lineHeight());
        var isUpdateBar = this._isUpdateBar();
        //
        if (!isUpdateWH && !isUpdatePadding && !isUpdateFont &&
                !isUpdateTextColor && !isUpdateLineH && !isUpdateBar) return;
        this.contents.clear();
        if (isUpdateWH) this.contents.resize(this.width, this.height);
        if (isUpdatePadding) this.updatePadding();
        if (isUpdateFont) this.resetFontSettings();
        if (isUpdateTextColor) this.changeTextColor(this._lastTextColor);
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
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateFont = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateFontFace =
                this._isCacheUpdated("_fontFace", this.standardFontFace());
        var isUpdateSize =
                this._isCacheUpdated("_textSize", this.standardFontSize());
        //
        return isUpdateFontFace || isUpdateSize;
    }; // $._isUpdateFont

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateBar = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateFillW = this._isCacheUpdated("_fillW", this._fillBarW());
        var isUpdateBarColors = this._isUpdateBarColors();
        var isUpdateTextXY = this._isUpdateTextXY();
        var isUpdateText = this._isCacheUpdated("_text", this._formattedText());
        //
        if (isUpdateFillW || isUpdateBarColors) return true;
        return isUpdateTextXY || isUpdateText;
    }; // $._isUpdateBar

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
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    $._isUpdateTextXY = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateX = this._isCacheUpdated("_textX", this._textXOffset());
        var isUpdateY = this._isCacheUpdated("_textY", this._textYOffset());
        var isUpdateAlign =
                this._isCacheUpdated("_lastTextAlign", this._textAlign());
        //
        return isUpdateX || isUpdateY || isUpdateAlign;
    }; // $._isUpdateTextXY

    /**
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.06a
     * @returns {String} The formatted text to be shown in the window
     * @todo Considers using notetags instead of parameter function results
     */
    $._formattedText = function() {
        // I'ts pointless to cache this as it's likely to be change per frame
        return $gameSystem.satbParamFunc(this._textParam).call(this);
        //
    }; // $._formattedText

    Object.keys(_SATB._FUNC_PARAM_CACHES).forEach(function(funcName) {
        var cache = _SATB._FUNC_PARAM_CACHES[funcName];
        /**
         * Hotspot/Nullipotent
         * @since v0.03a @version v0.14a
         * @returns {*} The parameter function return result
         * @todo Considers using notetags instead of parameter function results
         */
        $[funcName] = function() {
            var param = this["_" + cache + "Param"];
            return SATBManager.funcParam.call(this._cache, param, cache, this);
        }; // $[funcName]
    });

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
     * @since v0.03a @version v0.14a
     */
    $._redraw = function() {
        this._redrawBar();
        this._redrawText();
    }; // $._redraw

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._redrawBar = function() {
        // The whole window is just the battler ATB bar
        var padding = this.standardPadding(), paddings = padding * 2;
        var w = this.width - paddings, h = this.height - paddings;
        this.contents.fillRect(0, 0, w, h, this._backColor);
        this.contents.gradientFillRect(
                0, 0, this._fillW - paddings, h, this._color1, this._color2);
        //
    }; // $._redrawBar

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._redrawText = function() {
        this.drawText(this._text, this._textX, this._textY,
                this.textWidth(this._text), this._lastTextAlign);
    }; // $._redrawText

})(DoubleX_RMMV.SATB); // Window_SATBBarBase.prototype

/*----------------------------------------------------------------------------
 *    # (v0.06a+)New class: Window_SATBBar
 *      - Shows the ATB values and maximums of each battler sprite
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBarBase.prototype;

    Window_SATBBar.prototype = Object.create($$);

    var $ = Window_SATBBar.prototype;

    $.constructor = Window_SATBBar;

    /**
     * Idempotent
     * @constructor @since v0.06a @version v0.06a
     * @param {Game_Battler} battler - The battler owning this ATB bar
     */
    $.initialize = function(battler) {
        $$.initialize.call(this, battler, {
            lineHParam: "atbBarLineH",
            fontFaceParam: "atbBarFontFace",
            textSizeParam: "atbBarTextSize",
            paddingParam: "atbBarPadding",
            backOpacityParam: "atbBarBackOpacity",
            winskinPathParam: "atbBarWinskinPath",
            winskinFileParam: "atbBarWinskinFile",
            winskinHueParam: "atbBarWinskinHue",
            winskinSmoothParam: "atbBarWinskinSmooth",
            backColorParam: "atbBarBackColor",
            isShowNote: "isBarVisible",
            winXParam: "atbBarXOffset",
            winYParam: "atbBarYOffset",
            opacityParam: "atbBarFrameOpacity",
            winWParam: "atbBarW",
            winHParam: "atbBarH",
            color1Param: "atbBarColor1",
            color2Param: "atbBarColor2",
            textColorParam: "atbBarTextColor",
            textXParam: "atbBarTextXOffset",
            textYParam: "atbBarTextYOffset",
            textParam: "atbBarText",
            textAlignParam: "atbBarTextAlign"
        });
    }; // $.initialize

})(); // Window_SATBBar.prototype

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_StatusSATBBar
 *      - Shows the ATB values and maximums of each battler sprite
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBarBase.prototype;

    Window_StatusSATBBar.prototype = Object.create($$);

    var $ = Window_StatusSATBBar.prototype;

    $.constructor = Window_StatusSATBBar;

    /**
     * Idempotent
     * @constructor @since v0.06a @version v0.06a
     * @param {Game_Battler} battler - The battler owning this ATB bar
     */
    $.initialize = function(battler) {
        $$.initialize.call(this, battler, {
            lineHParam: "statusATBBarLineH",
            fontFaceParam: "statusATBBarFontFace",
            textSizeParam: "statusATBBarTextSize",
            paddingParam: "statusATBBarPadding",
            backOpacityParam: "statusATBBarBackOpacity",
            winskinPathParam: "statusATBBarWinskinPath",
            winskinFileParam: "statusATBBarWinskinFile",
            winskinHueParam: "statusATBBarWinskinHue",
            winskinSmoothParam: "statusATBBarWinskinSmooth",
            backColorParam: "statusATBBarBackColor",
            isShowNote: "isStatusBarVisible",
            winXParam: "statusATBBarXOffset",
            winYParam: "statusATBBarYOffset",
            opacityParam: "statusATBBarFrameOpacity",
            winWParam: "statusATBBarW",
            winHParam: "statusATBBarH",
            color1Param: "statusATBBarColor1",
            color2Param: "statusATBBarColor2",
            textColorParam: "statusATBBarTextColor",
            textXParam: "statusATBBarTextXOffset",
            textYParam: "statusATBBarTextYOffset",
            textParam: "statusATBBarText",
            textAlignParam: "statusATBBarTextAlign"
        });
    }; // $.initialize

})(); // Window_StatusSATBBar.prototype

/*----------------------------------------------------------------------------
 *    # (v0.02a+)New class: Window_SATBBase
 *      - Facilitates the creation of new window classes
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.Window_SATBBase = {}, $$ = Window_Base.prototype;

    Window_SATBBase.prototype = Object.create($$);

    var $ = Window_SATBBase.prototype, WS = Window_Selectable.prototype;

    $.constructor = Window_SATBBase;

    _SATB._FUNC_PARAM_CACHES = { // v0.14a+
        lineHeight: "lineH",
        standardFontFace: "fontFace",
        standardFontSize: "textSize",
        standardPadding: "padding",
        standardBackOpacity: "backOpacity",
        _winskinPath: "winskinPath",
        _winskinFile: "winskinFile",
        _winskinHue: "winskinHue",
        _winskinSmooth: "winskinSmooth",
        _isVisible: "isShow",
        _x: "winX",
        _y: "winY",
        _opacity: "opacity",
        _w: "winW",
        _h: "winH",
        _textColor: "textColor",
        _textXOffset: "textX",
        _textYOffset: "textY",
        _textAlign: "textAlign"
    }; // _SATB._FUNC_PARAM_CACHES

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Boolean} _isEnabled: Whether this window's shown as enabled
    // {Boolean} _isLastEnabled: Whether this window's shown as enabled
    // {Color} _lastTextColor: The last ATB bar text color
    // {Int} _textX: The last text x offset
    // {Int} _textY: The last text y offset
    // (v0.04a+){Natural Num} _lineH: The last line height
    // {Natural Num} _textSize: The last text size
    // {Nonnegative Int} _lastPadding: The last last padding
    // {Param} _lineHParam: The parameter returning the line height
    // {Param} _fontFaceParam: The parameter returning the font face
    // {Param} _textSizeParam: The parameter returning the text size
    // {Param} _paddingParam: The parameter returning the padding
    // {Param} _backOpacityParam: The parameter returning the back opacity
    // {Param} _winskinPathParam: The parameter returning the windowskin path
    // {Param} _winskinFileParam: The parameter returning the windowskin name
    // {Param} _winskinHueParam: The parameter returning the windowskin hue
    // {Param} _winskinSmoothParam: The parameter returning windowskin smooth
    // {Param} _moduleParam: The parameter returning if its module's enabled
    // {Param} _isShowParam: The parameter returning if this window's shown
    // {Param} _winXParam: The parameter returning the x position
    // {Param} _winYParam: The parameter returning the y position
    // {Param} _winWParam: The parameter returning the width
    // {Param} _winHParam: The parameter returning the height
    // {Param} _textXParam: The parameter returning the text x offset
    // {Param} _textYParam: The parameter returning the text y offset
    // (v0.14a+){String} _fontFace: The last font face
    // (v0.14a+){String} _lastTextAlign: The last text alignment
    // (v0.14a+){String} _lastWinskinPath: The last windowskin file path
    // (v0.14a+){String} _lastWinskinFile: The last windowskin file name
    // (v0.14a+){String} _lastWinskinHue: The last windowskin hue
    // (v0.14a+){String} _lastWinskinSmooth: The last windowskin smooth
    // {String} _text: The last formatted text
    // (v0.14a+){{}} _cache: The parameter return result cache
    //               (v0.04a+){Boolean} isShow: The cached result of if this
    //                                          window's shown
    //               (v0.04a+){Int} textX: The cached text x offset
    //               (v0.04a+){Int} textY: The cached text y offset
    //               (v0.04a+){Int} winX: The cached x position
    //               (v0.04a+){Int} winY: The cached y position
    //               (v0.04a+){Natural Num} lineH: The cached line height
    //               (v0.04a+){Natural Num} winW: The cached width
    //               (v0.04a+){Natural Num} winH: The cached height
    //               (v0.04a+){Nonnegative Int} padding: The cached padding
    //               (v0.14a+){String} fontFace: The cached font face
    //               (v0.04a+){Natural Num} textSize: The cached text size
    //               (v0.04a+){Opacity} backOpacity: The cached back opacity
    //               (v0.14a+){String} winskinPath: The cached windowskin path
    //               (v0.14a+){String} winskinFile: The cached windowskin name
    //               (v0.14a+){Hue} winskinHue: The cached windowskin hue
    //               (v0.14a+){Boolean} winskinSmooth: The cached windowskin
    //                                                 smooth
    //               (v0.04a+){String} text: The cached formatted text
    //               (v0.14a+){String} fontFace: The cached font face
    //               (v0.14a+){String} textAlign: The cached text alignment

    /**
     * Idempotent
     * @constructor @since v0.02a @version v0.03a
     * @param {WinBaseParams} winBaseParams - All base window parameter names
     */
    $.initialize = function(winBaseParams) {
        // It must be called first or _updateProp could crash the game
        this._invalidateCachedParams();
        //
        this._isEnabled = this._isLastEnabled = true;
        this._setWinBaseParams(winBaseParams);
        this._updateProp("visible", this._isVisible());
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
        if ($gameSystem.satbParam("_isParamFuncCached")) this.refresh();
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.loadWindowskin = function() {
        var path = this._winskinPath(), name = this._winskinFile();
        var hue = this._winskinHue(), smooth = this._winskinSmooth();
        this.windowskin = ImageManager.loadBitmap(path, name, hue, smooth);
    }; // $.loadWindowskin

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.02a @version v0.04a
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled([this._moduleParam])) {
            return this._updateProp("visible", false);
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
     * @interface @since v0.04a @version v0.14a
     */
    $.refresh = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) return;
        // It must be placed here or the old cache would be used right afterward
        this._invalidateCachedParams();
        //
        this._updateProp("visible", this._isVisible());
        if (this.visible) this._refreshWhenVisible();
    }; // $.refresh

    /**
     * Hotspot
     * @abstract @since v0.02a @version v0.02a
     */
    $._updateAll = function() {};

    /**
     * Hotspot
     * @abstract @since v0.02a @version v0.02a
     */
    $._updateWhenVisible = function() {};

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
     * @param {WinBaseParams} winBaseParams - All base window parameter names
     */
    $._setWinBaseParams = function(winBaseParams) {
        this._lineHParam = winBaseParams.lineHParam;
        this._fontFaceParam = winBaseParams.fontFaceParam;
        this._textSizeParam = winBaseParams.textSizeParam;
        this._paddingParam = winBaseParams.paddingParam;
        this._backOpacityParam = winBaseParams.backOpacityParam;
        this._winskinPathParam = winBaseParams.winskinPathParam;
        this._winskinFileParam = winBaseParams.winskinFileParam;
        this._winskinHueParam = winBaseParams.winskinHueParam;
        this._winskinSmoothParam = winBaseParams.winskinSmoothParam;
        this._moduleParam = winBaseParams.moduleParam;
        this._isShowParam = winBaseParams.isShowParam;
        this._winXParam = winBaseParams.winXParam;
        this._winYParam = winBaseParams.winYParam;
        this._opacityParam = winBaseParams.opacityParam;
        this._winWParam = winBaseParams.winWParam;
        this._winHParam = winBaseParams.winHParam;
        this._textColorParam = winBaseParams.textColorParam;
        this._textXParam = winBaseParams.textXParam;
        this._textYParam = winBaseParams.textYParam;
        this._textAlignParam = winBaseParams.textAlignParam;
    }; // $._setWinBaseParams

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
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     */
    $._updateWithCache = function() {
        if (this.visible) this._updateWhenVisibleWithCache();
    }; // $._updateWithCache

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWhenVisibleWithCache = function() {
        this._updateWhenVisible();
        this._procTouch();
    }; // $._updateWhenVisibleWithCache

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.14a
     */
    $._updateWithoutCache = function() {
        this._updateProp("visible", this._isVisible());
        if (this.visible) this._updateWhenVisibleWithoutCache();
    }; // $._updateWithoutCache

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWhenVisibleWithoutCache = function() {
        // The ordering must be this as visible updates are based on the refresh
        this._refreshWhenVisible();
        this._updateWhenVisible();
        //
        this._procTouch();
    }; // $._updateWhenVisibleWithoutCache

    /**
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    $._invalidateCachedParams = function() { this._cache = {}; };

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._refreshWhenVisible = function() {
        this._updateXY();
        this._updateOpacities();
        this._updateWinskin();
    }; // $._refreshWhenVisible

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.04a
     */
    $._updateXY = function() {
        this._updateProp("x", this._x());
        this._updateProp("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.14a
     * @todo Updates the translucent opacity as well
     */
    $._updateOpacities = function() {
        this._updateProp("opacity", this._opacity());
        this._updateProp("backOpacity", this.standardBackOpacity());
    }; // $._updateOpacities

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProp = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProp

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWinskin = function() {
        if (this._isUpdateWinskin()) this.loadWindowskin();
    }; // $._updateWinskin

    $._isUpdateWinskin = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isPathChanged =
                this._isCacheUpdated("_lastWinskinPath", this._winskinPath());
        var isFileChanged =
                this._isCacheUpdated("_lastWinskinFile", this._winskinFile());
        var isHueChanged =
                this._isCacheUpdated("_lastWinskinHue", this._winskinHue());
        var isSmoothChanged = this._isCacheUpdated(
                "_lastWinskinSmooth", this._winskinSmooth());
        //
        if (isPathChanged || isFileChanged) return true;
        return isHueChanged || isSmoothChanged;
    }; // $._isUpdateWinskin

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.03a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $._updateText = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateWH = this._isUpdateWH(), isUpdateEnabled =
                this._isCacheUpdated("_isLastEnabled", this._isEnabled);
        var isUpdatePadding =
                this._isCacheUpdated("_lastPadding", this.standardPadding());
        var isUpdateFont = this._isUpdateFont(), isUpdateTextColor =
                this._isCacheUpdated("_lastTextColor", this._textColor());
        var isUpdateText = this._isUpdateText();
        var isUpdateLineH = this._isCacheUpdated("_lineH", this.lineHeight());
        //
        if (!isUpdateWH && !isUpdateEnabled && !isUpdatePadding &&
                !isUpdateFont && !isUpdateTextColor && !isUpdateText &&
                !isUpdateLineH) return;
        this.contents.clear();
        if (isUpdateWH) this.contents.resize(this.width, this.height);
        if (isUpdateEnabled) this.changePaintOpacity(this._isEnabled);
        if (isUpdatePadding) this.updatePadding();
        if (isUpdateFont) this.resetFontSettings();
        if (isUpdateTextColor) this.changeTextColor(this._lastTextColor);
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
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateFont = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateFontFace =
                this._isCacheUpdated("_fontFace", this.standardFontFace());
        var isUpdateSize =
                this._isCacheUpdated("_textSize", this.standardFontSize());
        //
        return isUpdateFontFace || isUpdateSize;
    }; // $._isUpdateFont

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateText = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateX = this._isCacheUpdated("_textX", this._textXOffset());
        var isUpdateY = this._isCacheUpdated("_textY", this._textYOffset());
        var isUpdateText = this._isCacheUpdated(
                "_text", this._formattedText());
        var isUpdateAlign =
                this._isCacheUpdated("_lastTextAlign", this._textAlign());
        //
        return isUpdateX || isUpdateY || isUpdateText || isUpdateAlign;
    }; // $._isUpdateText

    Object.keys(_SATB._FUNC_PARAM_CACHES).forEach(function(funcName) {
        var cache = _SATB._FUNC_PARAM_CACHES[funcName];
        /**
         * Hotspot/Nullipotent
         * @since v0.02a @version v0.14a
         * @returns {*} The parameter function return result
         */
        $[funcName] = function() {
            var param = this["_" + cache + "Param"];
            return SATBManager.funcParam.call(this._cache, param, cache, this);
        }; // $[funcName]
    });

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
        this.drawText(this._text, this._textX, this._textY,
                this.textWidth(this._text), this._lastTextAlign);
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

})(DoubleX_RMMV.SATB); // Window_SATBBase.prototype

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
            fontFaceParam: "forceATBRunCmdFontFace",
            textSizeParam: "forceATBRunCmdTextSize",
            paddingParam: "forceATBRunCmdWinPadding",
            backOpacityParam: "forceATBRunCmdBackOpacity",
            winskinPathParam: "forceATBRunCmdWinskinPath",
            winskinFileParam: "forceATBRunCmdWinskinFile",
            winskinHueParam: "forceATBRunCmdWinskinHue",
            winskinSmoothParam: "forceATBRunCmdWinskinSmooth",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBRunCmdWin",
            winXParam: "forceATBRunCmdWinX",
            winYParam: "forceATBRunCmdWinY",
            opacityParam: "forceATBRunCmdOpacity",
            winWParam: "forceATBRunCmdWinW",
            winHParam: "forceATBRunCmdWinH",
            textColorParam: "forceATBRunCmdTextColor",
            textXParam: "forceATBRunCmdTextXOffset",
            textYParam: "forceATBRunCmdTextYOffset",
            textAlignParam: "forceATBRunCmdTextAlign"
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
        var cache = this._cache, param = "forceRunATBCmdText";
        return SATBManager.funcParam.call(cache, param, "text", this);
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
            fontFaceParam: "forceATBStopCmdFontFace",
            textSizeParam: "forceATBStopCmdTextSize",
            paddingParam: "forceATBStopCmdWinPadding",
            backOpacityParam: "forceATBStopCmdBackOpacity",
            winskinPathParam: "forceATBStopCmdWinskinPath",
            winskinFileParam: "forceATBStopCmdWinskinFile",
            winskinHueParam: "forceATBStopCmdWinskinHue",
            winskinSmoothParam: "forceATBStopCmdWinskinSmooth",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBStopCmdWin",
            winXParam: "forceATBStopCmdWinX",
            winYParam: "forceATBStopCmdWinY",
            opacityParam: "forceATBStopCmdOpacity",
            winWParam: "forceATBStopCmdWinW",
            winHParam: "forceATBStopCmdWinH",
            textColorParam: "forceATBStopCmdTextColor",
            textXParam: "forceATBStopCmdTextXOffset",
            textYParam: "forceATBStopCmdTextYOffset",
            textAlignParam: "forceATBStopCmdTextAlign"
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
        var cache = this._cache, param = "forceStopATBCmdText";
        return SATBManager.funcParam.call(cache, param, "text", this);
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

    var $$ = Window_SATBBase.prototype;

    Window_SATBForceStatus.prototype = Object.create($$);

    var $ = Window_SATBForceStatus.prototype;
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
            fontFaceParam: "forceATBStatFontFace",
            textSizeParam: "forceATBStatTextSize",
            paddingParam: "forceATBStatWinPadding",
            backOpacityParam: "forceATBStatBackOpacity",
            winskinPathParam: "forceATBStatWinskinPath",
            winskinFileParam: "forceATBStatWinskinFile",
            winskinHueParam: "forceATBStatWinskinHue",
            winskinSmoothParam: "forceATBStatWinskinSmooth",
            moduleParam: "IsWaitEnabled",
            isShowParam: "isShowForceATBStatWin",
            winXParam: "forceATBStatWinX",
            winYParam: "forceATBStatWinY",
            opacityParam: "forceATBStatOpacity",
            winWParam: "forceATBStatWinW",
            winHParam: "forceATBStatWinH",
            textColorParam: "forceATBStatTextColor",
            textXParam: "forceATBStatTextXOffset",
            textYParam: "forceATBStatTextYOffset",
            textAlignParam: "forceATBStatTextAlign"
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
    $.isForceRun = function() {
        // There's no need to turn _forceState into a state object yet
        return this._forceState === _SATB._FORCE_RUN;
        //
    }; // $.isForceRun

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.02a @version v0.02a
     * @returns {Boolean} The check result
     */
    $.isForceStop = function() {
        // There's no need to turn _forceState into a state object yet
        return this._forceState === _SATB._FORCE_STOP;
        //
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
        var cache = this._cache, param = this._textParam();
        return SATBManager.funcParam.call(cache, param, "text", this);
    }; // $._formattedText

    /**
     * Hotspot/Nullipotent
     * @override @since v0.02a @version v0.02a
     * @enum @returns {Param} Parameter of the ATB force status description text
     * @todo Extracts this switch into an object instead to increase flexibility
     */
    $._textParam = function() {
        // There's no need to turn _forceState into a state object yet
        switch (this._forceState) {
            case _SATB._FORCE_RUN: return "forceRunATBStatText";
            case _SATB._FORCE_STOP: return "forceStopATBStatText";
            default: return "noForceATBText";
        }
        //
    }; // $._textParam

    /**
     * @since v0.05b @version v0.05b
     * @enum @param {String} checkStateFunc - isForceStop/isForceRun
     * @enum @param {ATBForceState} terminalState - _FORCE_RUN/_FORCE_STOP
     */
    $._onForceStateChange = function(checkStateFunc, terminalState) {
        // There's no need to turn _forceState into a state object yet
        var forceState = this._forceState;
        this._forceState = this[checkStateFunc]() ? "" : terminalState;
        if (forceState !== this._forceState) this.refresh();
        //
    }; // $._onForceStateChange

})(DoubleX_RMMV.SATB); // Window_SATBForceStatus.prototype

/*----------------------------------------------------------------------------
 *    # (v0.13a+)New class: Window_SATBCTB
 *      - Shows whether the battle system's CTB or ATB
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBase.prototype;

    Window_SATBCTB.prototype = Object.create($$);

    var $ = Window_SATBCTB.prototype;

    $.constructor = Window_SATBCTB;

    /**
     * Idempotent
     * @constructor @since v0.13a @version v0.13a
     */
    $.initialize = function() {
        $$.initialize.call(this, {
            lineHParam: "ctbWinLineH",
            fontFaceParam: "ctbWinFontFace",
            textSizeParam: "ctbWinTextSize",
            paddingParam: "ctbWinPadding",
            backOpacityParam: "ctbWinBackOpacity",
            winskinPathParam: "ctbWinskinPath",
            winskinFileParam: "ctbWinskinFile",
            winskinHueParam: "ctbWinskinHue",
            winskinSmoothParam: "ctbWinskinSmooth",
            // This window can be shown even when CTB Module's disabled
            moduleParam: "IsCoreEnabled",
            //
            isShowParam: "isShowCTBWin",
            winXParam: "ctbWinX",
            winYParam: "ctbWinY",
            opacityParam: "ctbWinOpacity",
            winWParam: "ctbWinW",
            winHParam: "ctbWinH",
            textColorParam: "ctbWinTextColor",
            textXParam: "ctbWinTextXOffset",
            textYParam: "ctbWinTextYOffset",
            textAlignParam: "ctbWinTextAlign"
        });
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.13a @version v0.13a
     */
    $.refresh = function() {
        $$.refresh.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $.refresh

    /**
     * Hotspot/Idempotent
     * @override @since v0.13a @version v0.13a
     */
    $._updateWhenVisible = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $._updateWhenVisible

    /**
     * Hotspot/Nullipotent
     * @override @since v0.13a @version v0.13a
     * @returns {String} The battle turn clock status description text
     */
    $._formattedText = function() {
        var cache = this._cache, param = "ctbWinText";
        return SATBManager.funcParam.call(cache, param, "text", this);
    }; // $._formattedText

})(); // Window_SATBCTB.prototype

/*----------------------------------------------------------------------------
 *    # (v0.14a+)New class: Window_SATBContinuousOrder
 *      - Shows all battler ATB values on the same bar in a continuous manner
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.Window_SATBContinuousOrder = {};

    var $$ = Window_Base.prototype;

    Window_SATBContinuousOrder.prototype = Object.create($$);

    var $ = Window_SATBContinuousOrder.prototype;

    $.constructor = Window_SATBContinuousOrder;

    _SATB._CACHED_PHASES = ["Cooldown", "Core", "Charge"];
    _SATB._CACHED_SUFFIXES = [
        "BarX",
        "BarY",
        "BarW",
        "BarH",
        "BarColor1",
        "BarColor2",
        "TextColor",
        "Text",
        "TextX",
        "TextY",
        "TextAlign"
    ]; // _SATB._CACHED_SUFFIXES

    _SATB._FUNC_PARAM_CACHES = {
        lineHeight: "lineH",
        standardFontFace: "fontFace",
        standardFontSize: "textSize",
        standardPadding: "padding",
        standardBackOpacity: "backOpacity",
        _winskinPath: "winskinPath",
        _winskinFile: "winskinFile",
        _winskinHue: "winskinHue",
        _winskinSmooth: "winskinSmooth",
        _x: "winX",
        _y: "winY",
        _opacity: "opacity",
        _w: "winW",
        _h: "winH",
        _cooldownBarX: "cooldownBarX",
        _cooldownBarY: "cooldownBarY",
        _cooldownBarW: "cooldownBarW",
        _cooldownBarH: "cooldownBarH",
        _cooldownBarColor1: "cooldownBarColor1",
        _cooldownBarColor2: "cooldownBarColor2",
        _cooldownTextColor: "cooldownTextColor",
        _cooldownText: "cooldownText",
        _cooldownTextX: "cooldownTextX",
        _cooldownTextY: "cooldownTextY",
        _cooldownTextAlign: "cooldownTextAlign",
        _coreBarX: "coreBarX",
        _coreBarY: "coreBarY",
        _coreBarW: "coreBarW",
        _coreBarH: "coreBarH",
        _coreBarColor1: "coreBarColor1",
        _coreBarColor2: "coreBarColor2",
        _coreTextColor: "coreTextColor",
        _coreText: "coreText",
        _coreTextX: "coreTextX",
        _coreTextY: "coreTextY",
        _coreTextAlign: "coreTextAlign",
        _chargeBarX: "chargeBarX",
        _chargeBarY: "chargeBarY",
        _chargeBarW: "chargeBarW",
        _chargeBarH: "chargeBarH",
        _chargeBarColor1: "chargeBarColor1",
        _chargeBarColor2: "chargeBarColor2",
        _chargeTextColor: "chargeTextColor",
        _chargeText: "chargeText",
        _chargeTextX: "chargeTextX",
        _chargeTextY: "chargeTextY",
        _chargeTextAlign: "chargeTextAlign"
    }; // _SATB._FUNC_PARAM_CACHES

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Color} _lastCooldownBarColor1: The last ATB cooldown bar gradient color
    //                                 at the left
    // {Color} _lastCooldownBarColor2: The last ATB cooldown bar gradient color
    //                                 at the right
    // {Color} _lastCoreBarColor1: The last ATB core bar gradient color at the
    //                             left
    // {Color} _lastCoreBarColor2: The last ATB core bar gradient color at the
    //                             right
    // {Color} _lastChargeBarColor1: The last ATB charge bar gradient color at
    //                               the left
    // {Color} _lastChargeBarColor2: The last ATB charge bar gradient color at
    //                               the right
    // {Color} _lastCooldownTextColor: The last ATB cooldown bar text color
    // {Color} _lastCoreTextColor: The last ATB core bar text color
    // {Color} _lastChargeTextColor: The last ATB charge bar text color
    // {Int} _lastCooldownTextX: The last ATB cooldown text x position
    // {Int} _lastCooldownTextY: The last ATB coolfown text y position
    // {Int} _lastCoreTextX: The last ATB core text x position
    // {Int} _lastCoreTextY: The last ATB core text y position
    // {Int} _lastChargeTextX: The last ATB charge text x position
    // {Int} _lastChargeTextY: The last ATB charge text y position
    // {Natural Num} _lineH: The last line height
    // {Natural Num} _textSize: The last text size
    // {Nonnegative Int} _lastPadding: The last padding
    // {String} _fontFace: The last font face
    // {String} _lastCooldownTextAlign: The last ATB cooldown text alignment
    // {String} _lastCoreTextAlign: The last ATB core text alignment
    // {String} _lastChargeTextAlign: The last ATB charge text alignment
    // {String} _lastWinskinPath: The last windowskin file path
    // {String} _lastWinskinFile: The last windowskin file name
    // {String} _lastWinskinHue: The last windowskin hue
    // {String} _lastWinskinSmooth: The last windowskin smooth
    // {String} _lastCooldownText: The last formatted ATB cooldown text
    // {String} _lastCoreText: The last formatted ATB core text
    // {String} _lastChargeText: The last formatted ATB charge text
    // {{}} _cache: The parameter return result cache
    //     {Natural Num} lineH: The cached line height
    //     {String} fontFace: The cached font face
    //     {Natural Num} textSize: The cached text size
    //     {Nonnegative Int} padding: The cached padding
    //     {Opacity} backOpacity: The cached back opacity
    //     {String} winskinPath: The cached windowskin path
    //     {String} winskinFile: The cached windowskin name
    //     {Hue} winskinHue: The cached windowskin hue
    //     {Boolean} winskinSmooth: The cached windowskin smooth
    //     {Nonnegative Int} winX: The cached x position
    //     {Nonnegative Int} winY: The cached y position
    //     {Opacity} opacity: The cached opacity
    //     {Natural Num} winW: The cached bar width
    //     {Natural Num} winH: The cached bar height
    //     {Nonnegative Int} cooldownBarX: The cached cooldown bar x position
    //     {Nonnegative Int} cooldownBarY: The cached cooldown bar y position
    //     {Nonnegative Int} cooldownBarW: The cached cooldown bar width
    //     {Nonnegative Int} cooldownBarH: The cached cooldown bar height
    //     {Color} cooldownBarColor1: The cahced cooldown bar 1st gradient color
    //     {Color} cooldownBarColor2: The cahced cooldown bar 2nd gradient color
    //     {Color} cooldownTextColor: The cahced cooldown bar text color
    //     {String} cooldownText: The cahced cooldown bar text
    //     {Nonnegative Int} cooldownTextX: The cached cooldown bar text x
    //                                      position
    //     {Nonnegative Int} cooldownTextY: The cached cooldown bar text y
    //                                      position
    //     {TextAlign} cooldownTextAlign: The cahced cooldown bar text alignment
    //     {Nonnegative Int} coreBarX: The cached core bar x position
    //     {Nonnegative Int} coreBarY: The cached core bar y position
    //     {Nonnegative Int} coreBarW: The cached core bar width
    //     {Nonnegative Int} coreBarH: The cached core bar height
    //     {Color} coreBarColor1: The cahced core bar 1st gradient color
    //     {Color} coreBarColor2: The cahced core bar 2nd gradient color
    //     {Color} coreTextColor: The cahced core bar text color
    //     {String} coreText: The cahced core bar text
    //     {Nonnegative Int} coreTextX: The cached core bar text x position
    //     {Nonnegative Int} coreTextY: The cached core bar text y position
    //     {TextAlign} coreTextAlign: The cahced core bar text alignment
    //     {Nonnegative Int} chargeBarX: The cached charge bar x position
    //     {Nonnegative Int} chargeBarY: The cached charge bar y position
    //     {Nonnegative Int} chargeBarW: The cached charge bar width
    //     {Nonnegative Int} chargeBarH: The cached charge bar height
    //     {Color} chargeBarColor1: The cahced charge bar 1st gradient color
    //     {Color} chargeBarColor2: The cahced charge bar 2nd gradient color
    //     {Color} chargeTextColor: The cahced charge bar text color
    //     {String} chargeText: The cahced charge bar text
    //     {Nonnegative Int} chargeTextX: The cached charge bar text x position
    //     {Nonnegative Int} chargeTextY: The cached charge bar text y position
    //     {TextAlign} coreTextAlign: The cahced charge bar text alignment

    /**
     * Idempotent
     * @constructor @since v0.14a @version v0.14a
     */
    $.initialize = function() {
        // It must be called first or _isVisible will crash the game
        this._invalidateCachedParams();
        //
        this._updateProp("visible", this._isVisible());
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
        this._initBattlerSprites();
        if ($gameSystem.satbParam("_isParamFuncCached")) this.refresh();
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.clear = function() {
        Object.keys(this._actorSprites).forEach(this.removeActorSprite, this);
        Object.keys(this._enemySprites).forEach(this.removeEnemySprite, this);
    }; // $.clear

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.loadWindowskin = function() {
        var path = this._winskinPath(), name = this._winskinFile();
        var hue = this._winskinHue(), smooth = this._winskinSmooth();
        this.windowskin = ImageManager.loadBitmap(path, name, hue, smooth);
    }; // $.loadWindowskin

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled(["IsOrderEnabled"])) {
            return this._updateProp("visible", false);
        }
        $$.update.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) return;
        this._updateWithoutCache();
    }; // $.update

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.refresh = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) return;
        this._refreshWithCache();
    }; // $.refresh

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Actor} actor - The actor to have the sprite icon added
     */
    $.addActorSprite = function(actor) {
        var actorId = actor.actorId();
        if (this._actorSprites[actorId]) return;
        this._actorSprites[actorId] = new Sprite_SATBContinuousOrderBattlerIcon(
                actor, this._spriteXFuncs());
        this.addChild(this._actorSprites[actorId]);
    }; // $.addActorSprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the sprite icon added
     */
    $.addEnemySprite = function(enemy) {
        var i = enemy.index();
        if (this._enemySprites[i]) return;
        this._enemySprites[i] = new Sprite_SATBContinuousOrderBattlerIcon(
                enemy, this._spriteXFuncs());
        this.addChild(this._enemySprites[i]);
    }; // $.addEnemySprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Id} actorId - The id of the actor to have the sprite icon removed
     */
    $.removeActorSprite = function(actorId) {
        var actorSprite = this._actorSprites[actorId];
        if (!actorSprite) return;
        this.removeChild(actorSprite);
        actorSprite.clear();
        delete this._actorSprites[actorId];
    }; // $.removeActorSprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Index} i - The index of the enemy to have the sprite icon removed
     */
    $.removeEnemySprite = function(i) {
        var enemySprite = this._enemySprites[i];
        if (!enemySprite) return;
        this.removeChild(enemySprite);
        enemySprite.clear();
        delete this._enemySprites[i];
    }; // $.removeEnemySprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the sprite icon transformed
     */
    $.transformEnemySprite = function(enemy) {
        var enemySprite = this._enemySprites[enemy.index()];
        if (enemySprite) enemySprite.setBattler(enemy);
    }; // $.transformEnemySprite

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
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
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._initBattlerSprites = function() {
        this._actorSprites = {}, this._enemySprites = {};
        $gameParty.battleMembers().forEach(this.addActorSprite, this);
        $gameTroop.members().forEach(this.addEnemySprite, this);
    }; // $._initBattlerSprites

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._refreshWithCache = function() {
        this._invalidateCachedParams();
        this._updateWithoutCache();
    }; // $._refreshWithCache

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._invalidateCachedParams = function() { this._cache = {}; };

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.14a
     */
    $._updateWithoutCache = function() {
        this._updateProp("visible", this._isVisible());
        if (this.visible) this._refreshWhenVisible();
    }; // $._updateWithoutCache

    /**
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isVisible = function() {
        var param = "isShowContinuousOrderWin";
        return SATBManager.funcParam.call(this._cache, param, "isShow", this);
    }; // $._isVisible

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._refreshWhenVisible = function() {
        this._updateXY();
        this._updateOpacities();
        // The ordering must be this as everything else's based on window skin
        this._updateWinskin();
        this._updateBarTexts();
        //
    }; // $._refreshWhenVisible

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.04a
     */
    $._updateXY = function() {
        this._updateProp("x", this._x());
        this._updateProp("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.14a
     * @todo Updates the translucent opacity as well
     */
    $._updateOpacities = function() {
        this._updateProp("opacity", this._opacity());
        this._updateProp("backOpacity", this.standardBackOpacity());
    }; // $._updateOpacities

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProp = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProp

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWinskin = function() {
        if (this._isUpdateWinskin()) this.loadWindowskin();
    }; // $._updateWinskin

    $._isUpdateWinskin = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isPathChanged =
                this._isCacheUpdated("_lastWinskinPath", this._winskinPath());
        var isFileChanged =
                this._isCacheUpdated("_lastWinskinFile", this._winskinFile());
        var isHueChanged =
                this._isCacheUpdated("_lastWinskinHue", this._winskinHue());
        var isSmoothChanged = this._isCacheUpdated(
                "_lastWinskinSmooth", this._winskinSmooth());
        //
        if (isPathChanged || isFileChanged) return true;
        return isHueChanged || isSmoothChanged;
    }; // $._isUpdateWinskin

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $._updateBarTexts = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateWH = this._isUpdateWH(), isUpdatePadding =
                this._isCacheUpdated("_lastPadding", this.standardPadding());
        var isUpdateFont = this._isUpdateFont();
        var isUpdateLineH = this._isCacheUpdated("_lineH", this.lineHeight());
        var isUpdateBarTexts = this._isUpdateBarTexts();
        //
        if (!isUpdateWH && !isUpdatePadding && !isUpdateFont &&
                !isUpdateLineH && !isUpdateBarTexts) return;
        this.contents.clear();
        if (isUpdateWH) this.contents.resize(this.width, this.height);
        if (isUpdatePadding) this.updatePadding();
        if (isUpdateFont) this.resetFontSettings();
        this._redrawBarTexts();
    }; // $._updateBarTexts

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
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
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateFont = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isUpdateFontFace =
                this._isCacheUpdated("_fontFace", this.standardFontFace());
        var isUpdateSize =
                this._isCacheUpdated("_textSize", this.standardFontSize());
        //
        return isUpdateFontFace || isUpdateSize;
    }; // $._isUpdateFont

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isUpdateBarTexts = function() {
        var phases = _SATB._CACHED_PHASES, isUpdateBarTexts = false;
        // All of them must be run per frame to keep all these caches up to date
        var i = 0, l = phases.length;
        while (i < l) {
            if (this._isUpdateBarText(phases[i])) isUpdateBarTexts = true;
            i++;
        }
        //
        return isUpdateBarTexts;
    }; // $._isUpdateBarTexts

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @enum @param {String} phase - Elements in _SATB._CACHED_PHASES
     * @returns {Boolean} The check result
     */
    $._isUpdateBarText = function(phase) {
        return this._isAnyCacheUpdated(phase, _SATB._CACHED_SUFFIXES);
    }; // $._isUpdateBarText

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.16a
     * @enum @param {String} phase - Elements in _SATB._CACHED_PHASES
     * @enum @param {[String]} suffixes - Elements in _SATB._CACHED_SUFFIXES
     * @returns {Boolean} The check result
     */
    $._isAnyCacheUpdated = function(phase, suffixes) {
        var funcPre = "_" + phase.toLowerCase();
        // All of them must be run per frame to keep all these caches up to date
        return suffixes.mapSome(function(suffix) {
            return this._isCacheUpdated(
                    "_last" + phase + suffix, this[funcPre + suffix]());
        }, Boolean, this);
        //
    }; // $._isAnyCacheUpdated

    Object.keys(_SATB._FUNC_PARAM_CACHES).forEach(function(funcName) {
        var cache = _SATB._FUNC_PARAM_CACHES[funcName];
        var param = "continuousOrder" + cache[0].toUpperCase() + cache.slice(1);
        /**
         * Hotspot/Nullipotent
         * @since v0.14a @version v0.14a
         * @returns {*} The parameter function return result
         */
        $[funcName] = function() {
            return SATBManager.funcParam.call(this._cache, param, cache, this);
        }; // $[funcName]
    });

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
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
     * @since v0.14a @version v0.14a
     */
    $._redrawBarTexts = function() {
        // The bars are always drawn beneath the texts
        _SATB._CACHED_PHASES.forEach(this._redrawBarText, this);
        // It's possible for a module text to be drawn above another module bar
    }; // $._redrawBarTexts

    /**
     * Hotspot/Idempotent
     * @enum @param {String} phase - Elements in _SATB._CACHED_PHASES
     * @since v0.14a @version v0.14a
     */
    $._redrawBarText = function(phase) {
        // The bars are always drawn beneath the texts
        this._redrawBar(phase);
        this._redrawText(phase);
        // It's possible for a module text to be drawn above another module bar
    }; // $._redrawBarText

    /**
     * Hotspot/Idempotent
     * @enum @param {String} phase - Elements in _SATB._CACHED_PHASES
     * @since v0.14a @version v0.14a
     */
    $._redrawBar = function(phase) {
        var barX = this["_last" + phase + "BarX"];
        var barY = this["_last" + phase + "BarY"];
        var barW = this["_last" + phase + "BarW"];
        var barH = this["_last" + phase + "BarH"];
        var color1 = this["_last" + phase + "BarColor1"];
        var color2 = this["_last" + phase + "BarColor2"];
        this.contents.gradientFillRect(barX, barY, barW, barH, color1, color2);
    }; // $._redrawCooldownBar

    /**
     * Hotspot/Idempotent
     * @enum @param {String} phase - Elements in _SATB._CACHED_PHASES
     * @since v0.14a @version v0.14a
     */
    $._redrawText = function(phase) {
        this.changeTextColor(this["_last" + phase + "TextColor"]);
        var text = this["_last" + phase + "Text"];
        var textX = this["_last" + phase + "TextX"];
        var textY = this["_last" + phase + "TextY"];
        var align = this["_last" + phase + "TextAlign"];
        this.drawText(text, textX, textY, this.textWidth(text), align);
    }; // $._redrawText

    /**
     * Nullipotent
     * @since v0.14a @version v0.14a
     * @returns {SpriteXFuncs} The list of functions for setting sprite x
     */
    $._spriteXFuncs = function() {
        return {
            padding: this.standardPadding.bind(this),
            cooldownBarX: this._cooldownBarX.bind(this),
            cooldownBarW: this._cooldownBarW.bind(this),
            coreBarX: this._coreBarX.bind(this),
            coreBarW: this._coreBarW.bind(this),
            chargeBarX: this._chargeBarX.bind(this),
            chargeBarW: this._chargeBarW.bind(this)
        };
    }; // $._spriteXFuncs

})(DoubleX_RMMV.SATB); // Window_SATBContinuousOrder.prototype

/*----------------------------------------------------------------------------
 *    # (v0.14a+)New class: Window_SATBDiscreteOrder
 *      - Shows all battler ATB values on the same bar in a discrete manner
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _SATB = SATB.Window_SATBDiscreteOrder = {};

    var $$ = Window_Base.prototype;

    Window_SATBDiscreteOrder.prototype = Object.create($$);

    var $ = Window_SATBDiscreteOrder.prototype;

    $.constructor = Window_SATBDiscreteOrder;

    _SATB._SORT_BATTLER_ORDERS_ASCENDINGLY = function(a, b) {
        return a.order - b.order;
    }; // _SATB._SORT_BATTLER_ORDERS_ASCENDINGLY

    _SATB._STRINGIFIED_BATTLER_ORDER = function(mem) {
        delete mem.order;
        return JSON.stringify(mem);
    }; // _STRINGIFIED_BATTLER_ORDER

    _SATB._FUNC_PARAM_CACHES = {
        standardPadding: "padding",
        standardBackOpacity: "backOpacity",
        _winskinPath: "winskinPath",
        _winskinFile: "winskinFile",
        _winskinHue: "winskinHue",
        _winskinSmooth: "winskinSmooth",
        _x: "winX",
        _y: "winY",
        _opacity: "opacity",
        _w: "winW",
        _h: "winH"
    }; // _SATB._FUNC_PARAM_CACHES

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {String} _lastBattlerOrders: The stored battler orders in the last frame
    // {String} _lastWinskinPath: The last windowskin file path
    // {String} _lastWinskinFile: The last windowskin file name
    // {String} _lastWinskinHue: The last windowskin hue
    // {String} _lastWinskinSmooth: The last windowskin smooth
    // {{}} _cache: The parameter return result cache
    //     {Nonnegative Int} padding: The cached padding
    //     {Opacity} backOpacity: The cached back opacity
    //     {String} winskinPath: The cached windowskin path
    //     {String} winskinFile: The cached windowskin name
    //     {Hue} winskinHue: The cached windowskin hue
    //     {Boolean} winskinSmooth: The cached windowskin smooth
    //     {Nonnegative Int} winX: The cached x position
    //     {Nonnegative Int} winY: The cached y position
    //     {Opacity} opacity: The cached opacity
    //     {Natural Num} winW: The cached bar width
    //     {Natural Num} winH: The cached bar height

    /**
     * Idempotent
     * @constructor @since v0.14a @version v0.14a
     */
    $.initialize = function() {
        this._actorSprites = {}, this._enemySprites = {};
        this._lastBattlerOrders = [];
        // It must be called first or _isVisible will crash the game
        this._invalidateCachedParams();
        //
        this._updateProp("visible", this._isVisible());
        var xywh = this._xywh();
        $$.initialize.call(this, xywh.x, xywh.y, xywh.width, xywh.height);
        if ($gameSystem.satbParam("_isParamFuncCached")) this.refresh();
    }; // $.initialize

    /**
     * Destructor/Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.clear = function() {
        Object.keys(this._actorSprites).forEach(this.removeActorSprite, this);
        Object.keys(this._enemySprites).forEach(this.removeEnemySprite, this);
    }; // $.clear

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.14a
     */
    $.loadWindowskin = function() {
        var path = this._winskinPath(), name = this._winskinFile();
        var hue = this._winskinHue(), smooth = this._winskinSmooth();
        this.windowskin = ImageManager.loadBitmap(path, name, hue, smooth);
    }; // $.loadWindowskin

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.14a @version v0.16a
     */
    $.update = function() {
        if (!SATBManager.areModulesEnabled(["IsOrderEnabled"])) {
            return this._updateProp("visible", false);
        }
        $$.update.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) {
            this._updateBattlerOrders();
        } else this._updateWithoutCache();
    }; // $.update

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.14a @version v0.14a
     */
    $.refresh = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) return;
        this._refreshWithCache();
    }; // $.refresh

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Actor} actor - The actor to have the sprite icon added
     */
    $.addActorSprite = function(actor) {
        var actorId = actor.actorId();
        if (this._actorSprites[actorId]) return;
        this._actorSprites[actorId] =
                new Sprite_SATBDiscreteOrderBattlerIcon(actor);
        this.addChild(this._actorSprites[actorId]);
    }; // $.addActorSprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the sprite icon added
     */
    $.addEnemySprite = function(enemy) {
        var i = enemy.index();
        if (this._enemySprites[i]) return;
        this._enemySprites[i] = new Sprite_SATBDiscreteOrderBattlerIcon(enemy);
        this.addChild(this._enemySprites[i]);
    }; // $.addEnemySprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Id} actorId - The id of the actor to have the sprite icon removed
     */
    $.removeActorSprite = function(actorId) {
        var actorSprite = this._actorSprites[actorId];
        if (!actorSprite) return;
        this.removeChild(actorSprite);
        actorSprite.clear();
        delete this._actorSprites[actorId];
    }; // $.removeActorSprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Index} i - The index of the enemy to have the sprite icon removed
     */
    $.removeEnemySprite = function(i) {
        var enemySprite = this._enemySprites[i];
        if (!enemySprite) return;
        this.removeChild(enemySprite);
        enemySprite.clear();
        delete this._enemySprites[i];
    }; // $.removeEnemySprite

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the sprite icon transformed
     */
    $.transformEnemySprite = function(enemy) {
        var enemySprite = this._enemySprites[enemy.index()];
        if (enemySprite) enemySprite.setBattler(enemy);
    }; // $.transformEnemySprite

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
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
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._refreshWithCache = function() {
        this._invalidateCachedParams();
        this._updateWithoutCache();
    }; // $._refreshWithCache

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     */
    $._invalidateCachedParams = function() { this._cache = {}; };

    /**
     * Hotspot/Idempotent
     * @since v0.04a @version v0.14a
     */
    $._updateWithoutCache = function() {
        this._updateProp("visible", this._isVisible());
        if (this.visible) this._refreshWhenVisible();
    }; // $._updateWithoutCache

    /**
     * Hotspot/Nullipotent
     * @since v0.04a @version v0.14a
     * @returns {Boolean} The check result
     */
    $._isVisible = function() {
        var param = "isShowDiscreteOrderWin";
        return SATBManager.funcParam.call(this._cache, param, "isShow", this);
    }; // $._isVisible

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._refreshWhenVisible = function() {
        this._updateXY();
        this._updateOpacities();
        this._updateWinskin();
        this._updateWH();
        this._updateBattlerOrders();
    }; // $._refreshWhenVisible

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.04a
     */
    $._updateXY = function() {
        this._updateProp("x", this._x());
        this._updateProp("y", this._y());
    }; // $._updateXY

    /**
     * Hotspot/Idempotent
     * @since v0.02a @version v0.14a
     * @todo Updates the translucent opacity as well
     */
    $._updateOpacities = function() {
        this._updateProp("opacity", this._opacity());
        this._updateProp("backOpacity", this.standardBackOpacity());
    }; // $._updateOpacities

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateWinskin = function() {
        if (this._isUpdateWinskin()) this.loadWindowskin();
    }; // $._updateWinskin

    $._isUpdateWinskin = function() {
        // All of them must be run per frame to keep all these caches up to date
        var isPathChanged =
                this._isCacheUpdated("_lastWinskinPath", this._winskinPath());
        var isFileChanged =
                this._isCacheUpdated("_lastWinskinFile", this._winskinFile());
        var isHueChanged =
                this._isCacheUpdated("_lastWinskinHue", this._winskinHue());
        var isSmoothChanged = this._isCacheUpdated(
                "_lastWinskinSmooth", this._winskinSmooth());
        //
        if (isPathChanged || isFileChanged) return true;
        return isHueChanged || isSmoothChanged;
    }; // $._isUpdateWinskin

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
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
     * @since v0.14a @version v0.14a
     */
    $._updateWH = function() {
        this._updateProp("width", this._w());
        this._updateProp("height", this._h());
    }; // $._updateWH

    /**
     * Hotspot/Idempotent
     * @since v0.05b @version v0.05b
     * @param {String} name - The name of the property to be updated
     * @param {*} val - The new value of the property to be updated
     */
    $._updateProp = function(name, val) {
        if (this[name] !== val) this[name] = val;
    }; // $._updateProp

    Object.keys(_SATB._FUNC_PARAM_CACHES).forEach(function(funcName) {
        var cache = _SATB._FUNC_PARAM_CACHES[funcName];
        var param = "discreteOrder" + cache[0].toUpperCase() + cache.slice(1);
        /**
         * Hotspot/Nullipotent
         * @since v0.14a @version v0.14a
         * @returns {*} The parameter function return result
         */
        $[funcName] = function() {
            return SATBManager.funcParam.call(this._cache, param, cache, this);
        }; // $[funcName]
    });

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     */
    $._updateBattlerOrders = function() {
        var curBattlerOrders = this._curBattlerOrders();
        this._updateBattlerSprites(curBattlerOrders);
        this._lastBattlerOrders = curBattlerOrders;
    }; // $._updateBattlerOrders

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @returns {[String]} - Latest battler order list of battler JSON strings
     */
    $._curBattlerOrders = function() {
        var partyOrders = $gameParty.aliveSATBMems().map(
                this._actorOrder, this);
        var troopOrders = $gameTroop.aliveMembers().map(this._enemyOrder, this);
        partyOrders.fastMerge(troopOrders);
        partyOrders.sort(_SATB._SORT_BATTLER_ORDERS_ASCENDINGLY);
        return partyOrders.map(_SATB._STRINGIFIED_BATTLER_ORDER);
    }; // $._curBattlerOrders

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @param {Game_Actor} actor - The actor to have the order retrieved
     * @returns {{Number}} - The battler and ordering identifier pairs
     */
    $._actorOrder = function(actor) {
        return { id: actor.actorId(), order: this._battlerOrder(actor) };
    }; // $._actorOrder

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the order retrieved
     * @returns {{Number}} - The battler and ordering identifier pairs
     */
    $._enemyOrder = function(enemy) {
        return { i: enemy.index(), order: this._battlerOrder(enemy) };
    }; // $._enemyOrder

    /**
     * Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @param {Game_Battler} battler - The battler to have the order retrieved
     * @returns {Number} - The ordering of the battler(smaller means lower)
     */
    $._battlerOrder = function(battler) {
        // The ordering must be charge > core > cooldown
        if (battler.isSATBCooldown()) return -battler.cooldownSATBProportion();
        if (battler.isSATBFill()) return battler.coreSATBProportion();
        if (battler.isSATBCharge()) return 1 + battler.chargeSATBProportion();
        //
        throw new Error("An alive battler must be charging/cooldown/fill!");
    }; // $._battlerOrder

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     */
    $._updateBattlerSprites = function(curBattlerOrders) {
        this._lastBattlerOrders.forEach(function(order, oldI) {
            this._updateLastBattlerSprites(curBattlerOrders, order, oldI);
        }, this);
        curBattlerOrders.forEach(this._updateCurBattlerSprites, this);
    }; // $._updateBattlerSprites

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {String} order - The battler order info in the JSON String form
     * @param {Index} oldI - The old index of the specified battler order info
     */
    $._updateLastBattlerSprites = function(curBattlerOrders, order, oldI) {
        var newI = curBattlerOrders.indexOf(order);
        if (newI === oldI) return;
        if (newI < 0) return this._removeBattlerSprite(order);
        this._updateBattlerSpriteTargetX(curBattlerOrders, newI);
    }; // $._updateLastBattlerSprites

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {String} order - The battler order info in the JSON String form
     */
    $._removeBattlerSprite = function(order) {
        var obj = JSON.parse(order), id = obj.id;
        if (id) return this.removeActorSprite(id);
        var i = obj.i;
        if (!isNaN(i)) this.removeEnemySprite(i);
    }; // $._removeBattlerSprite

    /**
     * Hotspot/Idempotent
     * @since v0.14a @version v0.15c
     * @param {String} order - The battler order info in the JSON String form
     * @param {Index} newI - The new index of the specified battler order info
     * @param {[String]} curBattlerOrders - The latest battler order list
     */
    $._updateCurBattlerSprites = function(order, newI, curBattlerOrders) {
        var oldI = this._lastBattlerOrders.indexOf(order);
        if (oldI === newI) return;
        if (oldI < 0) return this._addBattlerSprite(curBattlerOrders, newI);
        this._updateBattlerSpriteTargetX(curBattlerOrders, newI);
    }; // $._updateCurBattlerSprites

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {Index} newI - The new index of the specified battler order info
     */
    $._addBattlerSprite = function(curBattlerOrders, newI) {
        var obj = JSON.parse(curBattlerOrders[newI]), id = obj.id;
        if (id) return this._addActorSprite(curBattlerOrders, id, newI);
        var i = obj.i;
        // 0 is falsy but is still a valid index so isNaN should be used instead
        if (!isNaN(i)) this._addEnemySprite(curBattlerOrders, i, newI);
        //
    }; // $._addBattlerSprite

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {Id} id - The id of the actor to have the sprite icon added
     * @param {Index} newI - The new index of the specified battler order info
     */
    $._addActorSprite = function(curBattlerOrders, id, newI) {
        this.addActorSprite($gameActors.actor(id));
        var targetX = this._targetX(curBattlerOrders, newI);
        this._actorSprites[id].setTargetX(targetX);
    }; // $._addActorSprite

    /**
     * Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {Index} i - The index of the enemy to have the sprite icon added
     * @param {Index} newI - The new index of the specified battler order info
     */
    $._addEnemySprite = function(curBattlerOrders, i, newI) {
        this.addEnemySprite($gameTroop.aliveMembers()[i]);
        this._enemySprites[i].setTargetX(this._targetX(curBattlerOrders, newI));
    }; // $._addEnemySprite

    /**
     * Potential Hotspot/Idempotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {Index} newI - The new index of the specified battler order info
     */
    $._updateBattlerSpriteTargetX = function(curBattlerOrders, newI) {
        var battlerSprite_ = this._battlerSprite_(curBattlerOrders[newI]);
        if (!battlerSprite_) return;
        battlerSprite_.setTargetX(this._targetX(curBattlerOrders, newI));
    }; // $._updateBattlerSpriteTargetX

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @param {[String]} curBattlerOrders - The latest battler order list
     * @param {Index} newI - The new index of the specified battler order info
     */
    $._targetX = function(curBattlerOrders, newI) {
        var targetX = this.standardPadding(), i = 0;
        while (i < newI) {
            var battlerSprite_ = this._battlerSprite_(curBattlerOrders[i]);
            // It's too hard to take changed icon width later into account
            if (battlerSprite_) targetX += battlerSprite_.width;
            //
            i++;
        }
        return targetX;
    }; // $._targetX

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.14a @version v0.14a
     * @param {String} order - The battler order info in the JSON String form
     * @returns {Sprite_SATBDiscreteOrderBattlerIcon?} The battler sprite icon
     */
    $._battlerSprite_ = function(order) {
        var obj = JSON.parse(order), id = obj.id;
        if (id) return this._actorSprites[id];
        var i = obj.i;
        if (!isNaN(i)) return this._enemySprites[i];
    }; // $._battlerSprite_

})(DoubleX_RMMV.SATB); // Window_SATBDiscreteOrder.prototype

/*----------------------------------------------------------------------------
 *    # (v0.11a+)New class: Window_SATBTurnClock
 *      - Shows the battle turn clock statuses
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_SATBBase.prototype;

    Window_SATBTurnClock.prototype = Object.create($$);

    var $ = Window_SATBTurnClock.prototype;

    $.constructor = Window_SATBTurnClock;

    /**
     * Idempotent
     * @constructor @since v0.11a @version v0.11a
     */
    $.initialize = function() {
        $$.initialize.call(this, {
            lineHParam: "battleTurnClockWinLineH",
            fontFaceParam: "battleTurnClockFontFace",
            textSizeParam: "battleTurnClockTextSize",
            paddingParam: "battleTurnClockWinPadding",
            backOpacityParam: "battleTurnClockBackOpacity",
            winskinPathParam: "battleTurnClockWinskinPath",
            winskinFileParam: "battleTurnClockWinskinFile",
            winskinHueParam: "battleTurnClockWinskinHue",
            winskinSmoothParam: "battleTurnClockWinskinSmooth",
            moduleParam: "IsTurnEnabled",
            isShowParam: "isShowBattleTurnClockWin",
            winXParam: "battleTurnClockWinX",
            winYParam: "battleTurnClockWinY",
            opacityParam: "battleTurnClockOpacity",
            winWParam: "battleTurnClockWinW",
            winHParam: "battleTurnClockWinH",
            textColorParam: "battleTurnClockTextColor",
            textXParam: "battleTurnClockTextXOffset",
            textYParam: "battleTurnClockTextYOffset",
            textAlignParam: "battleTurnClockTextAlign"
        });
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @interface @override @since v0.11a @version v0.11a
     */
    $.refresh = function() {
        $$.refresh.call(this);
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $.refresh

    /**
     * Hotspot/Idempotent
     * @interface @since v0.11a @version v0.11a
     */
    $.updateStatus = function() {
        if ($gameSystem.satbParam("_isParamFuncCached")) this._updateStatus();
    }; // $.updateStatus

    /**
     * Hotspot/Idempotent
     * @override @since v0.11a @version v0.11a
     */
    $._updateWhenVisible = function() {
        if (!$gameSystem.satbParam("_isParamFuncCached")) this._updateText();
    }; // $._updateWhenVisible

    /**
     * Hotspot/Nullipotent
     * @override @since v0.11a @version v0.11a
     * @returns {String} The battle turn clock status description text
     */
    $._formattedText = function() {
        var cache = this._cache, param = "battleTurnClockText";
        return SATBManager.funcParam.call(cache, param, "text", this);
    }; // $._formattedText

    /**
     * Hotspot/Idempotent
     * @since v0.11a @version v0.11a
     */
    $._updateStatus = function() {
        delete this._cache.text;
        // Updates cache text and _text even when it always returns true
        if (!this._isCacheUpdated("_text", this._formattedText())) return;
        //
        this.contents.clear();
        this._redrawText();
    }; // $._updateStatus

})(); // Window_SATBTurnClock.prototype

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
    //       {{Window_Base}} wins: The container of all new windows
    //       {Window_SATBForceStatus} forceStatusWin: The force status window
    //       {Window_SATBForceRunCmd} forceRunCmdWin: Force run command window
    //       {Window_SATBForceStopCmd} forceStopCmdWin: Force stop cmd window
    //       (v0.13a+){Window_SATBCTB} ctbWin: CTB window
    //       (v0.14a+){Window_SATBContinuousOrder} continuousOrderWin: Order win
    //       (v0.14a+){Window_SATBDiscreteOrder} discreteOrderWin: Order window
    //       {Window_SATBTurnClock} turnClockWin: Battle turn clock window

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
        _SATB._createAllWins.call(this);
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
    // v0.00a - v0.16a; Extended
        // Edited to ensure party escape attempt won't invoke when battle's busy
        if (!BattleManager.canSATBEsc(this)) {
            this.startPartyCommandSelection();
        } else _SB.commandEscape.apply(this, arguments);
        // It's just to play safe even though it should be impossible to happen
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
     * @interface @since v0.02a @version v0.13a
     * @returns {Boolean} The check result
     */
    $.isRunSATBFrameUpdate = function() {
        if (!SATBManager.areModulesEnabled(["IsWaitEnabled"])) return true;
        var forceStatusWin = this._satb.wins.forceStatusWin;
        if (forceStatusWin.isForceRun()) return true;
        if (forceStatusWin.isForceStop()) return false;
        // There are too many probabilistic reasons to changes to be catched
        return !$gameSystem.satbParamFunc("isATBWaitCondMet").call(this);
        // Users are supposed to keep this parameter easy, simple and small
    }; // $.isRunSATBFrameUpdate

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.05b
     */
    $.cleanupSATBInputWins = function() {
        _SATB._deactivateHideSelectionWins.call(this);
        _SATB._closeDeactivateActorCmdWin.call(this);
        _SATB._closeDeactivatePartyCmdWin.call(this);
        _SATB._eraseWins.call(this);
    }; // $.cleanupSATBInputWins

    /**
     * Compatibility/Idempotent
     * @interface @since v0.00a @version v0.16a
     */
    $.refreshSATBInputWins = function() {
        if (!SATBManager.isEnabled()) return;
        _SATB._refreshWins.call(this);
        // It's possible for the target list/availability to be changed
        if (this._actorWindow.visible) {
            _SATB._REFRESH_DESELECT_TARGET_WIN(
                    this._actorWindow, this._enemyWindow);
        } else if (this._enemyWindow.visible) {
            _SATB._REFRESH_DESELECT_TARGET_WIN(
                    this._enemyWindow, this._actorWindow);
        } else _SATB._refreshInputWins.call(this);
        // Invisible selection wins are active only when they can't be shown
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
     * Hotspot/Idempotent
     * @interface @since v0.11a @version v0.14a
     */
    $.updateSATBWins = function() {
        this._satb.wins.turnClockWin.updateStatus();
    }; // $.updateSATBWins

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Enemy} enemy - The enemy to have the sprite icon transformed
     */
    $.onTransformSATBEnemy = function(enemy) {
        this._satb.wins.continuousOrderWin.transformEnemySprite(enemy);
    }; // $.onTransformSATBEnemy

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Game_Actor} actor - The actor to have the sprite icon added
     */
    $.onAddSATBActor = function(actor) {
        this._satb.wins.continuousOrderWin.addActorSprite(actor);
    }; // $.onAddSATBActor

    /**
     * Idempotent
     * @interface @since v0.14a @version v0.14a
     * @param {Id} actorId - The id of the actor to have the sprite icon removed
     */
    $.onRemoveSATBActor = function(actorId) {
        this._satb.wins.continuousOrderWin.removeActorSprite(actorId);
    }; // $.onRemoveSATBActor

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.13a
     */
    _SATB._init = function() { this._satb = { wasWinActive: {}, wins: {} }; };

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
     * @since v0.11a @version v0.13a
     */
    _SATB._createAllWins = function() {
        _SATB._createWin.call(this, "ctbWin", Window_SATBCTB);
        _SATB._createForceWins.call(this);
        _SATB._createWin.call(
                this, "continuousOrderWin", Window_SATBContinuousOrder);
        _SATB._createWin.call(
                this, "discreteOrderWin", Window_SATBDiscreteOrder);
        _SATB._createWin.call(this, "turnClockWin", Window_SATBTurnClock);
    }; // _SATB._createAllWins

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceWins = function() {
        _SATB._createWin.call(this, "forceStatusWin", Window_SATBForceStatus);
        _SATB._createForceRunCmdWin.call(this);
        _SATB._createForceStopCmdWin.call(this);
    }; // _SATB._createForceWins

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceRunCmdWin = function() {
        this._satb.wins.forceRunCmdWin =
                new Window_SATBForceRunCmd(_SATB._onForceRun.bind(this));
        this.addWindow(this._satb.wins.forceRunCmdWin);
    }; // _SATB._createForceRunCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATB._onForceRun = function() {
        this._satb.wins.forceStopCmdWin.setIsEnabled(true);
        this._satb.wins.forceStatusWin.onForceRun();
        if (!this._satb.wins.forceStatusWin.isForceRun()) return;
        this._satb.wins.forceRunCmdWin.setIsEnabled(false);
    }; // _SATB._onForceRun

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.02a @version v0.03a
     */
    _SATB._createForceStopCmdWin = function() {
        this._satb.wins.forceStopCmdWin =
                new Window_SATBForceStopCmd(_SATB._onForceStop.bind(this));
        this.addWindow(this._satb.wins.forceStopCmdWin);
    }; // _SATB._createForceStopCmdWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATB._onForceStop = function() {
        this._satb.wins.forceRunCmdWin.setIsEnabled(true);
        this._satb.wins.forceStatusWin.onForceStop();
        if (!this._satb.wins.forceStatusWin.isForceStop()) return;
        this._satb.wins.forceStopCmdWin.setIsEnabled(false);
    }; // _SATB._onForceStop

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.11a @version v0.11a
     * @enum @param {String} winName - The name of the window to be created
     * @enum @param {Window_Base} WinClass - The class creating the window
     */
    _SATB._createWin = function(winName, WinClass) {
        this._satb.wins[winName] = new WinClass();
        this.addWindow(this._satb.wins[winName]);
    }; // _SATB._createWin

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
     * @since v0.01a @version v0.16a
     * @param {Index} i - The index of the actor to be selected to input actions
     */
    _SATB._onTrySelectActorIndexByHotkey = function(i) {
        var newActor_ = $gameParty.members()[i];
        // Playing buzzer sound also works for cancelling the actor charge ATB
        if ($gameParty.isUnselectedSATBInputableActor(newActor_)) {
            _SATB._onSelectActorIndexByHotkey.call(this, i);
        } else SoundManager.playBuzzer();
        //
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
     * @since v0.00a @version v0.16a
     */
    _SATB._selectNextCmd = function() {
        BattleManager.selectNextCommand();
        // So actor cmd win will be immediately setup for next inputable actor
        if (BattleManager.isInputting() && BattleManager.actor()) {
            this.startActorCommandSelection();
        } else this.endCommandSelection();
        // Using BattleManager.isInputting() as well is just to play safe
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
     * Idempotent
     * @since v0.16a @version v0.16a
     * @todo Come up with a better method name
     */
    _SATB._refreshInputWins = function() {
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
    }; // _SATB._refreshInputWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.16a
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
        } else if (hasNoInputableActor) return;
        // Setups new inputable actors to input actions if there's such actors
        _SATB._onSelectActor.call(this, inputableIndices[0]);
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
     * @since v0.05b @version v0.13a
     */
    _SATB._eraseWins = function() {
        this._statusWindow.clearSATBBars();
        this._satb.wins.forceRunCmdWin.clear();
        this._satb.wins.forceStopCmdWin.clear();
        Object.keys(this._satb.wins).forEach(_SATB._eraseWin, this);
    }; // _SATB._eraseWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.13a @version v0.13a
     * @enum @param {String} winName - The name of the window to be erased
     */
    _SATB._eraseWin = function(winName) {
        this.removeChild(this._satb.wins[winName]);
        delete this._satb.wins[winName];
    }; // _SATB._eraseWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.05b @version v0.13a
     */
    _SATB._refreshWins = function() {
        Object.keys(this._satb.wins).forEach(_SATB._refreshWin, this);
        /** @todo Considers calling this to play safe */
        // this.updateSATBActorSelect();
        // Right now it causes the selected actor to have wrong escape pose
    }; // _SATB._refreshWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.13a @version v0.13a
     * @enum @param {String} winName - The name of the window to be refreshed
     */
    _SATB._refreshWins = function(winName) {
        var win = this._satb.wins[winName];
        if (win) win.refresh();
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
