// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Unit Tests"] = "v0.00a";
//

/*:
 * @plugindesc The unit test plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 */
if (DoubleX_RMMV["Superlative ATB Implementations"]) {

/*----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Unit_Tests = {

        /**
         * Shows the failed parameter test with its value, condition and error
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {String} cond - The parameter validity condition description
         */
        showFailMsg: function(val, param, cond) {
            try { x; } catch (err) {
                console.warn([
                    param + " in DoubleX RMMV Superlative ATB has value:",
                    val,
                    "Which isn't valid because:",
                    cond,
                    "The source's shown by this stacktrace:",
                    err.stack
                ].join("\n"));
            }
        } // showFailMsg

    }; // SATB.Unit_Test

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    // Stores all the original parameter/notetag functions
    SATBUT.orig = { params: {}, notes: {} };
    //

    SATBUT.testNoArgParamFunc = function(func) { return func(); };

    // Stores all the parameter/notetag function unit tests
    SATBUT.unitTests = {
        // Stores all the parameter function unit tests
        params: {
            core: {
                _isCached: "checkBool",
                _isAlwaysRecacheAllSwitchVars: "checkBool",
                IsCoreEnabled: "checkBool",
                _coreBaseFillUnit: "checkCoreBaseFillUnit",
                coreBaseFillATBFrame: "checkNaturalNum",
                coreBaseFillATBSec: "checkPositiveNum",
                _coreTurnUnit: "checkCoreTurnUnit",
                coreTurnATBTime: "checkPositiveNum",
                coreTurnATBAct: "checkNaturalNum",
                canCoreTurnClockOverflow: "checkBool",
                coreMaxATBVal: "checkPositiveNum",
                _coreMaxATBValNoteChainingRule: "checkChainNumRule",
                _coreMaxATBValNotePriorities: "checkArrayDataType",
                _coreActStateNoteChainingRule: "checkChainBoolRule"
            } // core
        }, // params
        testParamArgsWithoutContext: {
            core: {
                IsCoreEnabled: SATBUT.testNoArgParamFunc,
                coreBaseFillATBFrame: SATBUT.testNoArgParamFunc,
                coreBaseFillATBSec: SATBUT.testNoArgParamFunc,
                coreTurnATBTime: function(func) { return func(600); },
                coreTurnATBAct: SATBUT.testNoArgParamFunc,
                canCoreTurnClockOverflow: SATBUT.testNoArgParamFunc
            } // core
        }, // testParamArgsWithoutContext
        // Stores all the notetag type result unit tests
        noteTypes: { coreMax: "checkPositiveNum", coreActState: "checkBool" },
        //
        // Stores all the chained notetag type result unit tests
        chainedNoteTypes: {
            coreMax: "checkPositiveNum",
            coreActState: "checkBool"
        },
        // Stores all the notetag type argument requirements
        noteArgObjs: {
            coreMax: {},
            coreActState: { state: "checkStateDataMeta" }
        }
        //
    }; // SATBUT.unitTests

    // Stores all the unit test value validity checks
    SATBUT.checkFuncs = {

        /**
         * Hotspot/Pure Function
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @returns {Boolean} The check result
         * @since v0.00a @version v0.00a
         */
        checkArray: function(val, param) {
            if (Array.isArray(val)) return true;
            return SATBUT.showFailMsg(val, param, "It should be an Array!");
        }, // checkArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkArrayDataType: function(val, param) {
            SATBUT.checkFuncs.checkArrayVals(val, param, [
                "states",
                "skills",
                "usableSkills",
                "items",
                "usableItems",
                "latestSkillItem",
                "armors",
                "weapons",
                "class",
                "actor",
                "enemy"
            ]);
        }, // checkArrayDataType

        /**
         * Hotspot/No-op
         * @param {<T>} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[<T>]} vals - The list of valid primitive values
         * @since v0.00a @version v0.00a
         */
        checkArrayVals: function(val, param, vals) {
            if (!SATBUT.checkFuncs.checkArray(val, param)) return;
            var conds = [
                "These elements should be within " + vals + ":"
            ].concat(val.mapFilter(function(v, i) {
                return vals.contains(v) ? "" : v + " with index " + i;
            }, function(cond) { return cond; }));
            if (conds.length <= 1) return;
            SATBUT.showFailMsg(JSON.stringify(val), param, conds.join("\n"));
        }, // checkArrayVals

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkBool: function(val, param) {
            if (val === !!val) return;
            SATBUT.showFailMsg(val, param, "It should be a Boolean!");
        }, // checkBool

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkChainBoolRule: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "first",
                "every",
                "some",
                "last"
            ]);
        }, // checkChainBoolRule

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkChainNumRule: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "first",
                "+",
                "-",
                "*",
                "/",
                "%",
                "=",
                "last"
            ]);
        }, // checkChainNumRule

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkCoreBaseFillUnit: function(val, param) {
            if (val === "coreBaseFillATBFrame") return;
            if (val === "coreBaseFillATBSec") return;
            SATBUT.showFailMsg(val, param, "It should be either " +
                    "coreBaseFillATBFrame or coreBaseFillATBSec!");
        }, // checkCoreBaseFillUnit

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkCoreTurnUnit: function(val, param) {
            if (val === "coreTurnATBTime") return;
            if (val === "coreTurnATBAct") return;
            SATBUT.showFailMsg(val, param, "It should be either " +
                    "coreTurnATBTime or coreTurnATBAct!");
        }, // checkCoreTurnUnit

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {String} dataType - The type of the data of the actual value
         * @since v0.00a @version v0.00a
         */
        checkDataMeta: function(val, param, dataType) {
            var meta = val.meta;
            if (meta && meta.satb && meta.satb.datumType === dataType) return;
            SATBUT.showFailMsg(JSON.stringify(val), param,
                    "It should be a valid state data!");
        }, // checkDataMeta

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkNaturalNum: function(val, param) {
            if (val > 0 && Number.isInteger(val)) return;
            SATBUT.showFailMsg(val, param, "It should be a natural Number!");
        }, // checkNaturalNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkNum: function(val, param) {
            if (!isNaN(val)) return;
            SATBUT.showFailMsg(val, param, "It should be a Number!");
        }, // checkNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{String}} checkFuncs - The function to check each object val
         * @since v0.00a @version v0.00a
         */
        checkObjVals: function(val, param, checkFuncs) {
            Object.keys(checkFuncs).forEach(function(key) {
                SATBUT.checkFuncs[checkFuncs[key]](val[key], param + "." + key);
            });
        }, // checkObjVals

        /**
         * Hotspot/No-op
         * @param {*} func - The parameter function
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkParamFunc: function(func, module, param) {
            var checkFunc = SATBUT.unitTests.params[module][param];
            var f = SATBUT.unitTests.testParamArgsWithoutContext[module][param];
            // Functions with contexts can only be checking in their call sites
            if (f) SATBUT.checkFuncs[checkFunc](f(func), module + "." + param);
            //
        }, // checkParamFunc

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkPositiveNum: function(val, param) {
            if (!isNaN(val) && val > 0) return;
            SATBUT.showFailMsg(val, param, "It should be a positive Number!");
        }, // checkPositiveNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkStateDataMeta: function(val, param) {
            SATBUT.checkFuncs.checkDataMeta(val, param, "states");
        }, // checkStateDataMeta

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[*]} vals - The list of valid values
         * @since v0.00a @version v0.00a
         */
        checkVal: function(val, param, vals) {
            if (vals.indexOf(val) >= 0) return;
            SATBUT.showFailMsg(val, param, "It should be within " + vals + "!");
        } // checkVal

    }; // SATBUT.checkFuncs
    //

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests);

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var _SATB = SATB.DataManager.new;

    /**
     * No-op
     * @since v0.00a @version v0.00a
     */
    function testReadNotes() {
        var satb = { datumType: "states" }, lines = [
            "<doublex rmmv coremax>",
            "<doublex rmmv satb coreMax cfg: CMATB_MAX>",
            "<satb coreMax val: 100>",
            "<doublex rmmv satb coreMax>",
            "return 999.0 / this.agi;",
            "</satb coreMax>",
            "<doublex rmmv satb coreActsState cfg: CASX_FALSE>",
            "<satb coreActState>",
            "'<satb coreActsState val: false>';",
            "return $gameSwtiches.value(1);",
            "</doublex rmmv satb coreActState>",
            "</satb coreActState>",
            "<satb coreActState>",
            "<satb coreActState val: 100.0/>"
        ];
        // switch, var and script suffix can't be tested as they've side effects
        _SATB._readNote(satb, lines);
        var satbLines = JSON.stringify({ satb: satb, lines: lines });
        var coreMax = satb.coreMax;
        if (!coreMax) {
            SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                    "It should be able to read coreMax notetags!");
        } else {
            var firstCoreMax = coreMax[0];
            if (firstCoreMax.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                        "The suffix of the 1st coreMax notetag should be cfg!");
            }
            if (firstCoreMax.entry1 !== "CMATB_MAX") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The entry " +
                        "of the 1st coreMax notetag should be CMATB_MAX!");
            }
            var secondCoreMax = coreMax[1];
            if (secondCoreMax.suffix1 !== "val") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                        "The suffix of the 2nd coreMax notetag should be val!");
            }
            if (secondCoreMax.entry1 !== "100") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The entry " +
                        "of the 2nd coreMax notetag should be 100!");
            }
            var thirdCoreMax = coreMax[2];
            if (thirdCoreMax.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The suffix" +
                        " of the 3rd coreMax notetag should be eval!");
            }
            if (thirdCoreMax.entry1 !== "return 999.0 / this.agi;") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The entry " +
                        "of the 3rd coreMax notetag should be " +
                        "return 999.0 / this.agi;!");
            }
            if (coreMax[3]) {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                        "There shouldn't be more than 3 coreMax notetags!");
            }
        }
        var coreActsState = satb.coreActsState;
        if (!coreActsState) {
            SATBUT.showFailMsg(satbLines, "_SATB._readNote", "It should be " +
                    "able to read coreActsState notetags" +
                    "(even if it's invalid)!");
        } else {
            var firstCoreActsState = coreActsState[0];
            if (firstCoreActsState.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The suffix" +
                        " of the 1st coreActsState notetag should be cfg!");
            }
            if (firstCoreActsState.entry1 !== "CASX_FALSE") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The entry " +
                        "of the 1st coreActsState notetag should be " +
                        "CASX_FALSE(even if no such NOTEX exists)!");
            }
            if (coreActsState[1]) {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "There " +
                        "shouldn't be more than 1 coreActsState notetag!");
            }
        }
        var coreActState = satb.coreActState;
        if (!coreActState) {
            SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                    "It should be able to read coreActState notetags!");
        } else {
            var firstCoreActState = coreActState[0];
            if (firstCoreActState.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The suffix" +
                        " of the 1st coreActState notetag should be eval!");
            }
            if (firstCoreActState.entry1 !== "'<satb coreActsState val: false>';\nreturn $gameSwtiches.value(1);") {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote", "The entry " +
                        "of the 1st coreActState notetag should be " +
                        "'<satb coreActsState val: false>';\nreturn $gameSwtiches.value(1);");
            }
            if (coreActState[1]) {
                SATBUT.showFailMsg(satbLines, "_SATB._readNote",
                        "There shouldn't be more than 1 coreActState notetag!");
            }
        }
        //
    } // testReadNotes

    testReadNotes();

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // DataManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Extends all parameter/notetag functions upon load game
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Game_System.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Game_System.new, $ = Game_System.prototype;
    var _GS = SATB.Game_System.unitTests.orig;
    var _UT = SATB.Game_System.unitTests.new;

    _GS.satbParamFunc = $.satbParamFunc;
    _UT.satbParamFunc = $.satbParamFunc = function(param) {
    // v0.00a - v0.00a; Extended
        var func = _GS.satbParamFunc.apply(this, arguments);
        // Added to check the validity of this parameter function result value
        _UT._checkParamFunc.call(this, func, param);
        //
        return func;
    }; // $.satbParamFunc

    _GS.satbParam = $.satbParam;
    _UT.satbParam = $.satbParam = function(param) { // v0.00a - v0.00a; Extended
        var val = _GS.satbParam.apply(this, arguments);
        // Added to check the validity of this raw parameter value
        _UT._checkParam.call(this, val, param);
        //
        return val;
    }; // $.satbParam

    /**
     * The this pointer is Game_System.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {(**) -> *} func - The parameter function
     * @param {Param} param - The parameter name
     */
    _UT._checkParamFunc = function(func, param) {
        var module = _SATB._PARAM_MODULES[param];
        if (!_SATB._IS_FUNC_PARAM(param)) {
            SATBUT.showFailMsg(param, "_UT._checkParamFunc", "Only " +
                    "parameters storing function contents as their values " +
                    "should call satbParamFunc!");
        }
        SATBUT.checkFuncs.checkParamFunc(func, module, param);
    }; // $._checkParamFunc

    /**
     * The this pointer is Game_System.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {*} val - The raw parameter value
     * @param {Param} param - The parameter name
     */
    _UT._checkParam = function(val, param) {
        var module = _SATB._PARAM_MODULES[param];
        var name = "params." + module + "." + param;
        // The raw parameter function content has nothing to check for
        if (_SATB._IS_FUNC_PARAM(param)) return;
        //
        SATBUT.checkFuncs[SATBUT.unitTests.params[module][param]](val, name);
    }; // $._checkParam

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_System

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBNotes
 *      - Unit tests the chained note results to ensure proper chainings
 *----------------------------------------------------------------------------*/

 (function(SATB, SATBUT) {

     "use strict";

     var GSATBN = SATB.Game_SATBNotes.unitTests = { orig: {}, new: {} };
     var $ = Game_SATBNotes.prototype, _GSATBN = GSATBN.orig, _UT = GSATBN.new;

    // Only interfaces will have their argument invariants checked
    _GSATBN.result = $.result;
    _UT.result = $.result = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var result = _GSATBN.result.apply(this, arguments);
        // Added to check whether the interface function arguments are valid
        _UT._checkRunResult.call(this, note, argObj_);
        //
        return result;
    }; // $.result
    //

    _GSATBN.run = $.run;
    _UT.run = $.run = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        _GSATBN.run.apply(this, arguments);
        // Added to check whether the interface function arguments are valid
        _UT._checkRunResult.call(this, note, argObj_);
        //
    }; // $.run
    //

    _GSATBN._uncachedResult = $._uncachedResult;
    _UT._uncachedResult = $._uncachedResult = function(note, argObj_, funcNameSuffix) {
    // v0.00a - v0.00a; Extended
        var result = _GSATBN._uncachedResult.apply(this, arguments);
        // Added to check whether the uncached chained end result's valid
        var checkFunc = SATBUT.unitTests.chainedNoteTypes[note];
        SATBUT.checkFuncs[checkFunc](
                result, "_GSATBN._uncachedResult note " + note);
        // Checking the cached result as well will be unnecessarily wasting time
        return result;
    }; // $._uncachedResult

    /**
     * The this pointer is Game_SATBNotes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    _UT._checkRunResult = function(note, argObj_) {
        SATBUT.checkFuncs.checkVal(note, "GSATBN.new._checkRunResult note",
                SATB.Game_SATBCache._NOTES);
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBN.new._checkRunResult note " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note]);
    }; // _UT._checkRunResult

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBNotes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBPairs
 *      - Unit tests all data notetags to pinpoint the data with faulty notes
 *----------------------------------------------------------------------------*/

 (function(SATB, SATBUT) {

     "use strict";

     var GSATBP = SATB.Game_SATBPairs.unitTests = { orig: {}, new: {} };
     var $ = Game_SATBPairs.prototype, _GSATBP = GSATBP.orig, _UT = GSATBP.new;

    _GSATBP.run_ = $.run_;
    _UT.run_ = $.run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
    // v0.00a - v0.00a; Extended
        var result = _GSATBP.run_.apply(this, arguments);
        // Added to check whether the uncached chained end result's valid
        var checkFunc = SATBUT.unitTests.noteTypes[note];
        if (!checkFunc) return result; // Some notes don't return any result
        SATBUT.checkFuncs[checkFunc](result, "_GSATBP.run_ note " + note);
        // Checking the cached result as well will be unnecessarily wasting time
        return result;
    }; // $.run_

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBPairs

/*----------------------------------------------------------------------------*/

} else {
    alert("DoubleX RMMV Superlative ATB Implementations should be above " +
            "DoubleX RMMV Superlative ATB Unit Test");
} // if (DoubleX_RMMV["Superlative ATB Configurations"])

/*============================================================================*/
