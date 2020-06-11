// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Unit Tests"] = "v0.00a";
//

/*:
 * @plugindesc The unit test plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 * If your parameters/notetags use game switches/variables, it's normal for
 * the unit test to report that those values are invalid before even starting
 * a new game or loading a saved game, because those game switches/variables
 * don't have their values set yet at that moment
 * You can open this unit test plugin js file to set how the failed tests are
 * reported
 * DON'T ENABLE THIS UNIT TEST PLUGIN WITHOUT ENABLING THE SATB PLUGIN ITSELF
 * UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 */

if (DoubleX_RMMV["Superlative ATB Implementations"]) {

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

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
            // Effectively disables unit test when game switch with id 6 is on
            if (!$gameSwitches || !$gameSwitches.value(6)) return;
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
            //
        } // showFailMsg

    }; // SATB.Unit_Test

})(DoubleX_RMMV.SATB);

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what unit test does in general
 *         - Solid understanding on the implementation plugin to fully
 *           comprehend this unit test plugin
 *----------------------------------------------------------------------------*/

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
                _isParamFuncCached: "checkBool",
                _isNoteCached: "checkBool",
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
        defaultNoteTypes: {
            coreMax: "checkPositiveNum",
            coreActState: "checkInvalidVal"
        },
        chainedNoteTypes: { coreMax: "checkPositiveNum" },
        noteChainingRules: {
            coreMax: "checkChainNumRule",
            coreActState: "checkChainBoolRule"
        },
        // Stores all the notetag type argument requirements
        noteArgObjs: {
            // Only notetags needing argObj need to be registered here
            coreActState: { state: "checkStateDataMeta" }
            //
        }
        //
    }; // SATBUT.unitTests

    /**
     * Hotspot/Pure Function
     * @param {DatamType} datumType - The datum type in the data of the notetag
     * @param {DatamType} dataType - The notetag part list data type
     * @returns {Boolean} The check result
     * @since v0.00a @version v0.00a
     */
    SATBUT.isSameDataType = function(datumType, dataType) {
        if (datumType === dataType) return true;
        if (datumType === "states" && dataType === "thisState") return true;
        // It's very unlikely for latestSkillItem to have the wrong data
        if (datumType === "skills" && (dataType === "usableSkills" ||
                dataType === "latestSkillItem")) return true;
        return datumType === "items" &&
                (dataType === "usableItems" || dataType === "latestSkillItem");
        //
    }; // SATBUT.isSameDataType
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
                "thisState",
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
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkArrayFactor: function(val, param) {
            SATBUT.checkFuncs.checkArrayVals(val, param, [
                "thisState",
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
                "enemy",
                "priority",
                "chainingRule",
                "result"
            ]);
        }, // checkArrayFactor

        /**
         * Hotspot/No-op
         * @param {<T>} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[<T>]} vals - The list of valid primitive values
         * @since v0.00a @version v0.00a
         */
        checkArrayVals: function(val, param, vals) {
            if (!SATBUT.checkFuncs.checkArray(val, param)) return;
            // The filter function doesn't use the original array
            var conds = [
                "These elements should be within " + vals + ":"
            ].concat(val.mapFilter(function(v, i) {
                return vals.contains(v) ? "" : v + " with index " + i;
            }, function(cond) { return cond; }));
            //
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
            SATBUT.checkFuncs.checkVal(val, param, [
                "coreBaseFillATBFrame",
                "coreBaseFillATBSec"
            ]);
        }, // checkCoreBaseFillUnit

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkCoreTurnUnit: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "coreTurnATBTime",
                "coreTurnATBAct"
            ]);
        }, // checkCoreTurnUnit

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkData: function(val, param) {
            var meta = val.meta;
            if (meta && meta.satb && meta.satb.datumType) return;
            SATBUT.showFailMsg(
                    JSON.stringify(val), param, "It should be a valid data!");
        }, // checkData

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {String} dataType - The type of the data of the actual value
         * @since v0.00a @version v0.00a
         */
        checkDataMeta: function(val, param, dataType) {
            var meta = val.meta;
            if (meta && meta.satb && SATBUT.isSameDataType(
                    meta.satb.datumType, dataType)) return;
            SATBUT.showFailMsg(JSON.stringify(val), param,
                    "It should be a valid " + dataType + " data!");
        }, // checkDataMeta

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkDataType: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "thisState",
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
        }, // checkDataType

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkFactor: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "thisState",
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
                "enemy",
                "priority",
                "chainingRule",
                "result"
            ]);
        }, // checkFactor

        /**
         * Hotspot/No-op
         * @param {*} val - The parameter function
         * @enum @param {Param} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkFunc: function(val, param) {
            if (typeof val === "function") return true;
            return SATBUT.showFailMsg(
                    val, param, "func should be a function!");
        }, // checkFunc

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkInvalidVal: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [null, undefined]);
        }, // checkInvalidVal

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkNonnegativeInt: function(val, param) {
            if (val >= 0 && Number.isInteger(val)) return;
            SATBUT.showFailMsg(
                    val, param, "It should be a nonnegative integer!");
        }, // checkNonnegativeInt

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
        checkNoteFactors: function(val, param) {
            if (!SATBUT.checkFuncs.checkObj(val, param)) return;
            Object.keys(val).forEach(function(key) {
                SATBUT.checkFuncs.checkNoteType(key, param);
                SATBUT.checkFuncs.checkArrayFactor(val[key], param);
            });
        }, // checkNoteFactors

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkNoteType: function(val, param) {
            SATBUT.checkFuncs.checkVal(
                    val, param, Object.keys(SATBUT.unitTests.noteTypes));
        }, // checkNoteType

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
         * @since v0.00a @version v0.00a
         */
        checkObj: function(val, param) {
            if (val && val.constructor === Object) return true;
            return SATBUT.showFailMsg(val, param, "It should be an Object!");
        }, // checkObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {Constructor} Type - The type of the actual parameter value
         * @since v0.00a @version v0.00a
         */
        checkObjType: function(val, param, Type) {
            if (val instanceof Type) return;
            SATBUT.showFailMsg(val, param, "It should be a " + Type + "!");
        }, // checkObjType

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{String}} checkFuncs - The function to check each object val
         * @since v0.00a @version v0.00a
         */
        checkObjVals: function(val, param, checkFuncs) {
            // There's no need to check anything if there's no checkFunc
            if (!checkFuncs || !SATBUT.checkFuncs.checkObj(val, param)) return;
            Object.keys(checkFuncs).forEach(function(key) {
                SATBUT.checkFuncs[checkFuncs[key]](val[key], param + "." + key);
            });
        }, // checkObjVals

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkPairFuncList: function(val, param) {
            if (!SATBUT.checkFuncs.checkArray(val, param)) return;
            val.forEach(function(pairFunc) {
                SATBUT.checkFuncs.checkPairFunc(pairFunc, param);
            });
        }, // checkPairFuncList

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkPairFunc: function(val, param) {
            SATBUT.checkFuncs.checkBool(val.canBind, param + " canBind");
            SATBUT.checkFuncs.checkData(val.datum, param + " datum");
            SATBUT.checkFuncs.checkFunc(
                    val.unboundFunc, param + " unboundFunc");
        }, // checkPairFunc

        /**
         * Hotspot/No-op
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkParam: function(module, param) {
            var m = SATBUT.unitTests.params[module];
            if (!m) return SATBUT.showFailMsg(
                    module, "module", "This module doesn't exist!");
            if (!m[param]) return SATBUT.showFailMsg(param, "param",
                    "This parameter doesn't exist in module " + module + "!");
            return true;
        }, // checkParam

        /**
         * Hotspot/No-op
         * @param {*} func - The parameter function
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkParamFunc: function(func, module, param) {
            if (!SATBUT.checkFuncs.checkFunc(func, module + "." + param)) {
                return;
            }
            if (!SATBUT.checkFuncs.checkParam(module, param)) return;
            var checkFunc = SATBUT.unitTests.params[module][param];
            var f = SATBUT.unitTests.testParamArgsWithoutContext[module][param];
            // Functions with contexts can only be checked in their call sites
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
         * @since v0.00a @version v0.00a
         */
        checkString: function(val, param) {
            if (typeof val === "string" || val instanceof String) return true;
            return SATBUT.showFailMsg(val, param, "It should be a String!");
        }, // checkString

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkSwitchVar: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, ["switch", "var"]);
        }, // checkSwitchVar

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[*]} vals - The list of valid values
         * @since v0.00a @version v0.00a
         */
        checkVal: function(val, param, vals) {
            if (vals.contains(val)) return;
            SATBUT.showFailMsg(val, param, "It should be within " + vals + "!");
        }, // checkVal

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkVarName: function(val, param) {
            if (!SATBUT.checkFuncs.checkString(val, param)) return;
            if (!val) return SATBUT.showFailMsg(
                    val, param, "It should be a non empty String!");
            if (val[0].match(/[A-Za-z_]/) && val.slice(1).match(/\w*/)) return;
            SATBUT.showFailMsg(val, param, "It should be a String having " +
                    "alphanumeric characters only" +
                    "(The 1st one can't be a number)!");
        }, // checkVarName

    }; // SATBUT.checkFuncs
    //

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests);

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Tests the notetag reading and switch/variable change factor mappings
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var DM = SATB.DataManager.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.DataManager.new, _DM = DM.orig, _UT = DM.new;

    _DM.updateSATBNoteScriptInVar = DataManager.updateSATBNoteScriptInVar;
    _UT.updateSATBNoteScriptInVar = DataManager.updateSATBNoteScriptInVar = function(id, val) {
    // v0.00a - v0.00a; Extended
        _DM.updateSATBNoteScriptInVar.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        SATBUT.checkFuncs.checkNaturalNum(
                id, "_DM.updateSATBNoteScriptInVar id");
        // val can be anything so it can't be checked
    }; // DataManager.updateSATBNoteScriptInVar

    _DM.scanSATBFuncContentForSwitchVars = DataManager.scanSATBFuncContentForSwitchVars;
    _UT.scanSATBFuncContentForSwitchVars = DataManager.scanSATBFuncContentForSwitchVars = function(funcContent, noteType) {
    // v0.00a - v0.00a; Extended
        _DM.scanSATBFuncContentForSwitchVars.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        _UT._checkFuncContentNoteType.call(
                this, funcContent, noteType);
        //
    }; // DataManager.scanSATBFuncContentForSwitchVars

    _DM.storeUpdatedSATBSwitchVarIds = DataManager.storeUpdatedSATBSwitchVarIds;
    _UT.storeUpdatedSATBSwitchVarIds = DataManager.storeUpdatedSATBSwitchVarIds = function(noteType, switchVar_, id_, dataTypes_) {
    // v0.00a - v0.00a; Extended
        _DM.storeUpdatedSATBSwitchVarIds.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        _UT._checkNoteTypeSwitchVarIdDataTypes.call(
                this, noteType, switchVar_, id_, dataTypes_);
        //
    }; // DataManager.storeUpdatedSATBSwitchVarIds

    /**
     * The this pointer is DataManager
     * No-op
     * @since v0.00a @version v0.00a
     * @param {String} funcContent - The function content as the parameter value
     * @param {NoteType} noteType - The type of the note
     */
    _UT._checkFuncContentNoteType = function(funcContent, noteType) {
        SATBUT.checkFuncs.checkString(
                funcContent, "DM.new._checkFuncContentNoteType funcContent");
        SATBUT.checkFuncs.checkNoteType(
                noteType, "DM.new._checkFuncContentNoteType noteType");
    }; // _UT._checkFuncContentNoteType

    /**
     * The this pointer is DataManager
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _UT._checkNoteTypeSwitchVarIdDataTypes = function(noteType, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkNoteType(
                noteType, "DM.new._checkNoteTypeSwitchVarIdDataTypes noteType");
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(switchVar_,
                "DM.new._checkNoteTypeSwitchVarIdDataTypes switchVar_");
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "DM.new._checkNoteTypeSwitchVarIdDataTypes id_");
        if (!dataTypes_) return;
        // _SATB._updateAllSwitchVarIds sets dataTypes_ as ["result"] correctly
        var dataTypes = dataTypes_.filter(function(dataType) {
            return dataType !== "result";
        });
        //
        SATBUT.checkFuncs.checkArrayDataType(dataTypes,
                "DM.new._checkNoteTypeSwitchVarIdDataTypes dataTypes_");
    }; // _UT._checkNoteTypeSwitchVarIdDataTypes

    /**
     * No-op
     * @since v0.00a @version v0.00a
     */
    function testReadNotes() {
      // Don't test switch, var and script suffix here as they've side effects
        var satb = { datumType: "states" }, lines = [
            "<doublex rmmv coremax>",
            "<doublex rmmv satb coreMax cfg: CMATB_MAX>",
            "<satb coreMax val: 102.4>",
            // eval suffix has no side effects if is content's no switch/vars
            "<doublex rmmv satb coreMax>",
            "return 999.0 / this.agi;",
            "</satb coreMax>",
            //
            "<doublex rmmv satb coreActsState cfg: CASX_FALSE>",
            // eval suffix has no side effects if is content's no switch/vars
            "<satb coreActState>",
            "'<satb coreActsState val: false>';",
            "return $gameSwtiches.value(1);",
            "</doublex rmmv satb coreActState>",
            //
            "</satb coreActState>",
            "<satb coreActState>",
            "<satb coreActState val: 100.0/>"
        ], satbLines = JSON.stringify({ satb: satb, lines: lines });
        //
        _SATB._readNote(satb, lines);
        var coreMax = satb.coreMax;
        if (!coreMax) {
            SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                    "It should be able to read coreMax notetags!");
        } else {
            var firstCoreMax = coreMax[0];
            if (firstCoreMax.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreMax notetag should be cfg!");
            }
            if (firstCoreMax.entry1 !== "CMATB_MAX") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 1st coreMax notetag should be " +
                        "CMATB_MAX!");
            }
            var secondCoreMax = coreMax[1];
            if (secondCoreMax.suffix1 !== "val") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 2nd coreMax notetag should be val!");
            }
            if (secondCoreMax.entry1 !== "102.4") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 2nd coreMax notetag should be 100!");
            }
            var thirdCoreMax = coreMax[2];
            if (thirdCoreMax.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 3rd coreMax notetag should be " +
                        "eval!");
            }
            if (thirdCoreMax.entry1 !== "return 999.0 / this.agi;") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 3rd coreMax notetag should be " +
                        "return 999.0 / this.agi;!");
            }
            if (coreMax[3]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 3 coreMax notetags!");
            }
        }
        var coreActsState = satb.coreActsState;
        if (!coreActsState) {
            SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                    "It should be able to read coreActsState notetags" +
                    "(even if it's invalid)!");
        } else {
            var firstCoreActsState = coreActsState[0];
            if (firstCoreActsState.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreActsState notetag should " +
                        "be cfg!");
            }
            if (firstCoreActsState.entry1 !== "CASX_FALSE") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 1st coreActsState notetag should " +
                        "be CASX_FALSE(even if no such NOTEX exists)!");
            }
            if (coreActsState[1]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 1 coreActsState " +
                        "notetag!");
            }
        }
        var coreActState = satb.coreActState;
        if (!coreActState) {
            SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                    "It should be able to read coreActState notetags!");
        } else {
            var firstCoreActState = coreActState[0];
            if (firstCoreActState.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreActState notetag should " +
                        "be eval!");
            }
            if (firstCoreActState.entry1 !== [
                "'<satb coreActsState val: false>';",
                "return $gameSwtiches.value(1);"
            ].join("\n")) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 1st coreActState notetag should be" +
                        [
                            "'<satb coreActsState val: false>';",
                            "return $gameSwtiches.value(1);"
                        ].join("\n"));
            }
            if (coreActState[1]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 1 coreActState notetag!");
            }
        }
    } // testReadNotes

    function testUpdateSwitchVarIds() {
        // Setups the test fixture by preserving original switch/variable ids
        var switchIds = JSON.parse(JSON.stringify(_SATB.switchIds));
        var varIds = JSON.parse(JSON.stringify(_SATB.varIds));
        //
        // Only tests switch, var and script suffix here as they've side effects
        var satb = { datumType: "skills" }, lines = [
            // Reading state notetags in skills doesn't matter as it's ignored
            "<satb coreActState switch: 1>",
            //
            // eval suffix has side effects if is content's switch/variables
            "<satb coreActState>",
            "return $gameSwitches.value(2)",
            "</satb coreActState>",
            //
            "<satb coreMax var: 1>",
            "<satb coreMax script: 2>",
            // eval suffix has side effects if is content's switch/variables
            "<satb coreMax>",
            "return $gameVariables.value(3)",
            "</satb coreMax>"
            //
        ];
        //
        _SATB._readNote(satb, lines);
        var switchIdLines = JSON.stringify({
            lines: lines,
            switchIds: _SATB.switchIds
        });
        var varIdLines = JSON.stringify({ lines: lines, varIds: _SATB.varIds });
        var switchId1 = _SATB.switchIds["1"];
        if (!switchId1) {
            SATBUT.showFailMsg(switchIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.switchIds should've the game switch with id 1!");
        } else {
            var coreActState = switchId1.coreActState;
            if (!coreActState) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 1 should've mapped to " +
                        "the notetag type coreActState in _SATB.switchIds!");
            } else {
                // switch only changes the cached notetag value but not the list
                if (coreActState[0] !== "result") {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote", "The 1st data " +
                            "type of the notetag type coreActState mapped by" +
                            " the game switch with id 1 in _SATB.switchIds " +
                            "should be result!");
                }
                //
                if (coreActState.length > 1) {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreActState mapped by the " +
                            "game switch with id 1 in _SATB.switchIds!");
                }
            }
            if (Object.keys(switchId1).length > 1) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 1 shouldn't have mapped to " +
                        "more than 1 notetag types in _SATB.switchIds!");
            }
        }
        var switchId2 = _SATB.switchIds["2"];
        if (!switchId2) {
            SATBUT.showFailMsg(switchIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.switchIds should've the game switch with id 2!");
        } else {
            var coreActState = switchId2.coreActState;
            if (!coreActState) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 2 should've mapped to " +
                        "the notetag type coreActState in _SATB.switchIds!");
            } else {
                // switch only changes the cached notetag value but not the list
                if (coreActState[0] !== "result") {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type " +
                            "coreActState mapped by the game switch with id " +
                            "2 in _SATB.switchIds should be result!");
                }
                //
                if (coreActState.length > 1) {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreActState mapped by the " +
                            "game switch with id 2 in _SATB.switchIds!");
                }
            }
            if (Object.keys(switchId2).length > 1) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 2 shouldn't have mapped to " +
                        "more than 1 notetag types in _SATB.switchIds!");
            }
        }
        if (Object.keys(_SATB.switchIds).length > 2) {
            SATBUT.showFailMsg(switchIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.switchIds shouldn't have more than 2 game " +
                    "switches!");
        }
        var varId1 = _SATB.varIds["1"];
        if (!varId1) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 1!");
        } else {
            var coreMax = varId1.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 1 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!");
            } else {
                // var only changes the cached notetag value but not the list
                if (coreMax[0] !== "result") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 1 in " +
                            "_SATB.varIds should be result!");
                }
                //
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 1 in _SATB.varIds!");
                }
            }
            if (Object.keys(varId1).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 1 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!");
            }
        }
        var varId2 = _SATB.varIds["2"];
        if (!varId2) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 2!");
        } else {
            var coreMax = varId2.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 2 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!");
            } else {
                if (coreMax[0] !== "skills") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 2 in " +
                            "_SATB.varIds should be skills!");
                }
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 2 in _SATB.varIds!");
                }
            }
            if (Object.keys(varId2).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 2 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!");
            }
        }
        var varId3 = _SATB.varIds["3"];
        if (!varId3) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 3!");
        } else {
            var coreMax = varId3.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 3 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!");
            } else {
                if (coreMax[0] !== "result") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 3 in " +
                            "_SATB.varIds should be skills!");
                }
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 3 in _SATB.varIds!");
                }
            }
            if (Object.keys(varId3).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 3 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!");
            }
        }
        if (Object.keys(_SATB.varIds).length > 3) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds shouldn't have more than 3 game " +
                    "variables!");
        }
        // Cleans up the test fixture by restoring the original switch/var ids
        _SATB.switchIds = switchIds, _SATB.varIds = varIds;
        //
    } // testUpdateSwitchVarIds

    testReadNotes();
    testUpdateSwitchVarIds();

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // DataManager

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Tests all BattleManager preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var BM = SATB.BattleManager.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.BattleManager.new, _BM = BM.orig, _UT = BM.new;

    _BM.addSATBInputableActor = BattleManager.addSATBInputableActor;
    _UT.addSATBInputableActor = BattleManager.addSATBInputableActor = function(actor) {
    // v0.00a - v0.00a; Extended
        _BM.addSATBInputableActor.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(actor,
                "_BM.addSATBInputableActor actor " + actor.name(), Game_Actor);
        //
    }; // BattleManager.addSATBInputableActor

    _BM.addSATBActBattler = BattleManager.addSATBActBattler;
    _UT.addSATBActBattler = BattleManager.addSATBActBattler = function(battler) {
    // v0.00a - v0.00a; Extended
        _BM.addSATBActBattler.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(battler,
                "_BM.addSATBActBattler battler " + battler.name(),
                Game_Battler);
        //
    }; // BattleManager.addSATBActBattler

    _BM.eraseSATBInputableActor = BattleManager.eraseSATBInputableActor;
    _UT.eraseSATBInputableActor = BattleManager.eraseSATBInputableActor = function(actor) {
    // v0.00a - v0.00a; Extended
        _BM.eraseSATBInputableActor.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(actor,
                "_BM.eraseSATBInputableActor actor " + actor.name(), Game_Actor);
        //
    }; // BattleManager.eraseSATBInputableActor

    _BM.eraseSATBActBattler = BattleManager.eraseSATBActBattler;
    _UT.eraseSATBActBattler = BattleManager.eraseSATBActBattler = function(battler) {
    // v0.00a - v0.00a; Extended
        _BM.eraseSATBActBattler.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(battler,
                "_BM.eraseSATBActBattler battler " + battler.name(),
                Game_Battler);
        //
    }; // BattleManager.eraseSATBActBattler

    _BM.raiseSATBMemNoteChangeFactors = BattleManager.raiseSATBMemNoteChangeFactors;
    _UT.raiseSATBMemNoteChangeFactors = BattleManager.raiseSATBMemNoteChangeFactors = function(note, factors) {
    // v0.00a - v0.00a; Extended
        _BM.raiseSATBMemNoteChangeFactors.apply(this, arguments);
        // Added to check the arguments of this public api
        _UT._checkNoteFactors.call(this, note, factors);
        //
    }; // BattleManager.raiseSATBMemNoteChangeFactors

    _BM.raiseRefreshedSATBMemChangeFactors = BattleManager.raiseRefreshedSATBMemChangeFactors;
    _UT.raiseRefreshedSATBMemChangeFactors = BattleManager.raiseRefreshedSATBMemChangeFactors = function(noteFactors) {
    // v0.00a - v0.00a; Extended
        _BM.raiseRefreshedSATBMemChangeFactors.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNoteFactors(noteFactors,
                "_BM.raiseRefreshedSATBMemChangeFactors noteFactors");
        //
    }; // BattleManager.raiseRefreshedSATBMemChangeFactors

    _BM._sortActBattlers = _SATB._sortActBattlers;
    _UT._sortActBattlers = _SATB._sortActBattlers = function() {
    // v0.00a - v0.00a; Extended
        _BM._sortActBattlers.apply(this, arguments);
        // Added to check whether the battlers in this queue's properly sorted
        _UT._checkSortActBattlers.call(this);
        //
    }; // _SATB._sortActBattlers

    /**
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    _UT._checkNoteFactors = function(note, factors) {
        SATBUT.checkFuncs.checkNoteType(note, "BM.new._checkNoteFactors note");
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "BM.new._checkNoteFactors factors");
    }; // _UT._checkNoteFactors

    /**
     * The this pointer is BattleManager
     * No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkSortActBattlers = function() {
        this._actionBattlers.forEach(function(battler, i, self) {
            var prev = self[i - 1];
            if (!prev) return;
            // It isn't tautological as the Speed Module can behave differently
            if (prev.latestSATBItem.speed < battler.latestSATBItem.speed) {
                SATBUT.showFailMsg(prev.name() + " " + battler.name(),
                        "BM.new._checkSortActBattlers prev battler",
                        "The action execution queue should be sorted " +
                        "descendingly by the battler action speed!");
            }
            //
        });
    }; // _UT._checkSortActBattlers

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // BattleManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Tests the stored parameter and notetag values
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GS = SATB.Game_System.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Game_System.new, $ = Game_System.prototype;
    var _GS = GS.orig, _UT = GS.new;

    _GS.extractSATBFuncContents = $.extractSATBFuncContents;
    _UT.extractSATBFuncContents = $.extractSATBFuncContents = function(funcType) {
    // v0.00a - v0.00a; Extended
        _GS.extractSATBFuncContents.apply(this, arguments);
        // Added to check the validity of this parameter function result value
        _UT._checkExtractSATBFuncContentsArg.call(this, funcType);
        // It's an extremely special check that only applies here
    }; // $.extractSATBFuncContents

    _GS.satbParamFunc = $.satbParamFunc;
    _UT.satbParamFunc = $.satbParamFunc = function(param) {
    // v0.00a - v0.00a; Extended
        var func = _GS.satbParamFunc.apply(this, arguments);
        // Added to check the validity of this parameter function result value
        _UT._checkParamFunc.call(this, param, func);
        //
        return func;
    }; // $.satbParamFunc

    _GS.satbParam = $.satbParam;
    _UT.satbParam = $.satbParam = function(param) { // v0.00a - v0.00a; Extended
        var val = _GS.satbParam.apply(this, arguments);
        // Added to check the validity of this raw parameter value
        _UT._checkParam.call(this, param, val);
        //
        return val;
    }; // $.satbParam

    _GS.setSATBParam = $.setSATBParam;
    _UT.setSATBParam = $.setSATBParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
     // v0.00a - v0.00a; Extended
        _GS.setSATBParam.apply(this, arguments);
        _UT._checkParamFuncContentSwitchVarIdDataTypes(
                param, funcContent, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    _GS.satbNote = $.satbNote;
    _UT.satbNote = $.satbNote = function(noteType, name) {
    // v0.00a - v0.00a; Extended
        var funcContent = _GS.satbNote.apply(this, arguments);
        // Added to check the validity of this raw parameter value
        _UT._checkNoteTypeNameFuncContent.call(this, noteType, name, funcContent);
        //
        return funcContent;
    }; // $.satbNote

    /**
     * The this pointer is Game_System.prototype
     * No-op
     * @since v0.00a @version v0.00a
     * @enum @param {String} funcType - "params", "notes"
     */
    _UT._checkExtractSATBFuncContentsArg = function(funcType) {
        if (funcType === "params" || funcType === "notes") return;
        SATBUT.showFailMsg(funcType,
                "GS.new._checkExtractSATBFuncContentsArg funcType",
                "The value of this argument should be either params or notes!");
    }; // _UT._checkExtractSATBFuncContentsArg

    /**
     * The this pointer is Game_System.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {(**) -> *} func - The parameter function
     */
    _UT._checkParamFunc = function(param, func) {
        var module = _SATB._PARAM_MODULES[param];
        // This makes the reasons of the upcoming game crash more clear
        SATBUT.checkFuncs.checkParam(module, param);
        //
        if (!_SATB._IS_FUNC_PARAM(param)) {
            SATBUT.showFailMsg(param, "GS.new._checkParamFunc param", "Only " +
                    "parameters storing function contents as their values " +
                    "should call satbParamFunc!");
        }
        SATBUT.checkFuncs.checkParamFunc(func, module, param);
    }; // _UT._checkParamFunc

    /**
     * The this pointer is Game_System.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {*} val - The raw parameter value
     */
    _UT._checkParam = function(param, val) {
        // The raw parameter function content has nothing to check for
        if (_SATB._IS_FUNC_PARAM(param)) return;
        // Invalid function content will crash the game so it's not checked here
        var module = _SATB._PARAM_MODULES[param];
        // This makes the reasons of the upcoming game crash more clear
        SATBUT.checkFuncs.checkParam(module, param);
        //
        var name = "params." + module + "." + param;
        SATBUT.checkFuncs[SATBUT.unitTests.params[module][param]](val, name);
    }; // _UT._checkParam

    /**
     * The this pointer is Game_System.prototype
     * No-op
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _UT._checkParamFuncContentSwitchVarIdDataTypes = function(param, funcContent, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkParam(_SATB._PARAM_MODULES[param], param);
        if (_SATB._IS_FUNC_PARAM(param)) SATBUT.checkFuncs.checkString(
                funcContent,
                "GS.new._checkParamFuncContentSwitchVarIdDataTypes " +
                "funcContent");
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(
                switchVar_,
                "GS.new._checkParamFuncContentSwitchVarIdDataTypes switchVar_");
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "GS.new._checkParamFuncContentSwitchVarIdDataTypes id_");
        if (dataTypes_) SATBUT.checkFuncs.checkArrayDataType(dataTypes_,
                "GS.new._checkParamFuncContentSwitchVarIdDataTypes dataTypes_");
    }; // _UT._checkParamFuncContentSwitchVarIdDataTypes

    /**
     * The this pointer is Game_System.prototype
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The type of the notetag
     * @param {String} name - The name of the notetag
     * @param {String} funcContent - Function content returning notetag value
     */
    _UT._checkNoteTypeNameFuncContent = function(noteType, name, funcContent) {
        SATBUT.checkFuncs.checkNoteType(
                noteType, "GS.new._checkNoteTypeNameFuncContent noteType");
        SATBUT.checkFuncs.checkVarName(
                name, "GS.new._checkNoteTypeNameFuncContent name");
        SATBUT.checkFuncs.checkString(funcContent,
                "GS.new._checkNoteTypeNameFuncContent funcContent");
    }; // _UT._checkNoteTypeNameFuncContent

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_System

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *      - Tests Game_BattlerBase preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GBB =  SATB.Game_BattlerBase.unitTests = { orig: {}, new: {} };
    var $ = Game_BattlerBase.prototype, _GBB = GBB.orig, _UT = GBB.new;

    _GBB.updateSATBStateTurns = $.updateSATBStateTurns;
    _UT.updateSATBStateTurns = $.updateSATBStateTurns = function(timing) {
    // v0.00a - v0.00a; Extended
        _GBB.updateSATBStateTurns.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkVal(timing, "_GBB.updateSATBStateTurns timing", [
            1,
            2
        ]);
        //
    }; // $.updateSATBStateTurns

    _GBB.onToggleAutoInputSATBActs = $.onToggleAutoInputSATBActs;
    _UT.onToggleAutoInputSATBActs = $.onToggleAutoInputSATBActs = function() {
    // v0.00a - v0.00a; Extended
        _GBB.onToggleAutoInputSATBActs.apply(this, arguments);
        // Added to ensure this battler won't be inputable nor able to exec act
        _UT._checkOnToggleAutoInputSATBActs.call(this);
        // This must be placed here or the check will be all wrong
    }; // _UT.onToggleAutoInputSATBActs

    /**
     * The this pointer is Game_BattlerBase.prototype
     * No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkOnToggleAutoInputSATBActs = function() {
        if (BattleManager._satb.inputableActors.contains(this)) {
            SATBUT.showFailMsg(this.name(),
                    "GBB.new._checkOnToggleAutoInputSATBActs",
                    "A battler right after toggling auto input actions " +
                    "shouldn't be inputable!");
        }
        if (!BattleManager._actionBattlers.contains(this)) return;
        SATBUT.showFailMsg(this.name(),
                "GBB.new._checkOnToggleAutoInputSATBActs",
                "A battler right after toggling auto input actions shouldn't" +
                " be able to execute actions!");
    }; // _UT._checkOnToggleAutoInputSATBActs

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_BattlerBase

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      - Tests all Game_Battler preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GB = SATB.Game_Battler.unitTests = { orig: {}, new: {} };
    var $ = Game_Battler.prototype, _GB = GB.orig, _UT = GB.new;

    _GB.raiseSATBChangeFactorsWithRefresh = $.raiseSATBChangeFactorsWithRefresh;
    _UT.raiseSATBChangeFactorsWithRefresh = $.raiseSATBChangeFactorsWithRefresh = function(noteFactors) {
    // v0.00a - v0.00a; Extended
        _GB.raiseSATBChangeFactorsWithRefresh.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNoteFactors(noteFactors,
                "_GB.raiseSATBChangeFactorsWithRefresh noteFactors");
        //
    }; // $.raiseSATBChangeFactorsWithRefresh

    _GB.setStartSATB = $.setStartSATB;
    _UT.setStartSATB = $.setStartSATB = function(val) {
    // v0.00a - v0.00a; Extended
        _GB.setStartSATB.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(val, "_GB.setStartSATB val");
        //
    }; // $.setStartSATB

    _GB.fillCoreSATB = $.fillCoreSATB;
    _UT.fillCoreSATB = $.fillCoreSATB = function(fillRate) {
    // v0.00a - v0.00a; Extended
        _GB.fillCoreSATB.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(fillRate, "_GB.fillCoreSATB fillRate");
        //
    }; // $.fillCoreSATB

    _GB.baseCoreMaxSATB = $.baseCoreMaxSATB;
    _UT.baseCoreMaxSATB = $.baseCoreMaxSATB = function() {
    // v0.00a - v0.00a; Extended
        var baseCoreMax = _GB.baseCoreMaxSATB.apply(this, arguments);
        // Added to test the validity of returned maximum ATB value of battler
        SATBUT.checkFuncs[SATBUT.unitTests.params.core.coreMaxATBVal](
                baseCoreMax, "_GB.baseCoreMaxSATB baseCoreMax");
        // Functions with contexts can only be tested on the call sites
        return baseCoreMax;
    }; // $.baseCoreMaxSATB

    _GB.initCoreSATBActs = $.initCoreSATBActs;
    _UT.initCoreSATBActs = $.initCoreSATBActs = function(atbVal) {
    // v0.00a - v0.00a; Extended
        _GB.initCoreSATBActs.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(atbVal, "_GB.initCoreSATBActs atbVal");
        //
    }; // $.initCoreSATBActs

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_Battler

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBPhaseTypes
 *      - Test Game_SATBPhaseTypes preconditions, postconditions and invariant
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GSATBPT = SATB.Game_SATBPhaseTypes.unitTests = { orig: {}, new: {} };
    var $ = Game_SATBPhaseTypes.prototype;
    var _GSATBPT = GSATBPT.orig, _UT = GSATBPT.new;

    _GSATBPT.initialize = $.initialize;
    _UT.initialize = $.initialize = function(battler, notes_) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.initialize.apply(this, arguments);
        // Added to test the arguments of this constructor
        _UT._checkInit.call(this, battler, notes_);
        //
    }; // $.initialize

    _GSATBPT.fillCoreATB = $.fillCoreATB;
    _UT.fillCoreATB = $.fillCoreATB = function(fillRate) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.fillCoreATB.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(fillRate, "_GSATBPT.fillCoreATB fillRate");
        //
    }; // $.fillCoreATB

    _GSATBPT.addSmallestCoreSATBDecrement = $.addSmallestCoreSATBDecrement;
    _UT.addSmallestCoreSATBDecrement = $.addSmallestCoreSATBDecrement = function() {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addSmallestCoreSATBDecrement.apply(this, arguments);
        // Added to ensure the current ATB value's indeed smaller than the max
        _UT._checkAddSmallestCoreSATBDecrement.call(this);
        // This is far from being tautological due to the IEEE-754 precisions
    }; // $.addSmallestCoreSATBDecrement

    _GSATBPT.addCoreATBProportion = $.addCoreATBProportion;
    _UT.addCoreATBProportion = $.addCoreATBProportion = function(increment) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addCoreATBProportion.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCoreATBProportion increment");
        //
    }; // $.addCoreATBProportion

    _GSATBPT.addCoreATB = $.addCoreATB;
    _UT.addCoreATB = $.addCoreATB = function(increment) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addCoreATB.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(increment, "_GSATBPT.addCoreATB increment");
        //
    }; // $.addCoreATB

    _GSATBPT.setCoreATBProportion = $.setCoreATBProportion;
    _UT.setCoreATBProportion = $.setCoreATBProportion = function(proportion) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.setCoreATBProportion.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setCoreATBProportion proportion");
        //
    }; // $.setCoreATB

    _GSATBPT.setCoreATB = $.setCoreATB;
    _UT.setCoreATB = $.setCoreATB = function(val) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.setCoreATB.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNum(val, "_GSATBPT.setCoreATB val");
        //
    }; // $.setCoreATB

    _GSATBPT.coreATB = $.coreATB;
    _UT.coreATB = $.coreATB = function() { // v0.00a - v0.00a; Extended
        var current = _GSATBPT.coreATB.apply(this, arguments);
        // Added to check the validity of the returned resul
        SATBUT.checkFuncs.checkNum(current, "_GSATBPT.coreATB");
        //
        return current;
    }; // $.coreATB

    _GSATBPT._onCoreATBBecomeFull = $._onCoreATBBecomeFull;
    _UT._onCoreATBBecomeFull = $._onCoreATBBecomeFull = function(coreMax) {
    // v0.00a - v0.00a; Extended
        // Added to test the inputability/actability invariants of this battler
        _UT._checkWillCoreATBBecomeFull.call(this);
        //
        _GSATBPT._onCoreATBBecomeFull.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeFull.call(this);
        //
    }; // $._onCoreATBBecomeFull

    _GSATBPT._onCoreATBBecomeNotFull = $._onCoreATBBecomeNotFull;
    _UT._onCoreATBBecomeNotFull = $._onCoreATBBecomeNotFull = function() {
    // v0.00a - v0.00a; Extended
        _GSATBPT._onCoreATBBecomeNotFull.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeNotFull.call(this);
        // There's nothing to check right before this listener callback triggers
    }; // $._onCoreATBBecomeNotFull

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBNotes?} notes_ - The wrapped notetag result/runner
     */
    _UT._checkInit = function(battler, notes_) {
        SATBUT.checkFuncs.checkObjType(
                battler, "GSATBPT.new._checkInit battler", Game_Battler);
        if (notes_) SATBUT.checkFuncs.checkObjType(
                notes_, "GSATBPT.new._checkInit notes_", Game_SATBNotes);
    }; // _UT._checkInit

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * @since v0.00a @version v0.00a
     */
    _UT._checkAddSmallestCoreSATBDecrement = function() {
        // Not using this.coreMax() - this.coreATB() > 0 is due to IEEE-754
        var current = this.coreATB(), max = this.coreMax();
        if (current >= max) SATBUT.showFailMsg(max - current,
                "GSATBPT.new._checkAddSmallestCoreSATBDecrement",
                "The current ATB value should be smaller than the maximum!");
        //
    }; // _UT._checkAddSmallestCoreSATBDecrement

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkWillCoreATBBecomeFull = function() {
        if (!$gameParty.inBattle()) return;
        if (BattleManager._subject === this._battler) {
            SATBUT.showFailMsg(this._battler.name(),
                    "GSATBPT.new._checkWillCoreATBBecomeFull",
                    "A battler right before having full ATB value shouldn't " +
                    "be the action execution subject!");
        }
        if (BattleManager._satb.inputableActors.contains(this._battler)) {
            SATBUT.showFailMsg(this._battler.name(),
                    "GSATBPT.new._checkWillCoreATBBecomeFull",
                    "A battler right before having full ATB value shouldn't " +
                    "be inputable!");
        }
        if (!BattleManager._actionBattlers.contains(this._battler)) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkWillCoreATBBecomeFull",
                "A battler right before having full ATB value shouldn't be " +
                "able to execute actions!");
    }; // _UT._checkWillCoreATBBecomeFull

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkDidCoreATBBecomeFull = function() {
        if (!$gameParty.inBattle() || !this._battler.canMove()) return;
        var isInputable =
                BattleManager._satb.inputableActors.contains(this._battler);
        var isActable = BattleManager._actionBattlers.contains(this._battler);
        if (isInputable || isActable) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkDidCoreATBBecomeFull",
                "A battler right after having full ATB value should be " +
                "either inputable or able to execute actions!");
    }; // _UT._checkDidCoreATBBecomeFull

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkDidCoreATBBecomeNotFull = function() {
        if (!$gameParty.inBattle()) return;
        if (BattleManager._satb.inputableActors.contains(this._battler)) {
            SATBUT.showFailMsg(this._battler.name(),
                    "GSATBPT.new._checkDidCoreATBBecomeNotFull",
                    "A battler right after not having full ATB value " +
                    "shouldn't be inputable!");
        }
        if (!BattleManager._actionBattlers.contains(this._battler)) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkDidCoreATBBecomeNotFull",
                "A battler right after not having full ATB value shouldn't " +
                "be able to execute actions!");
    }; // _UT._checkDidCoreATBBecomeNotFull

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBPhaseTypes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBNotes
 *      - Unit tests the chained note results to ensure proper chainings
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GSATBN = SATB.Game_SATBNotes.unitTests = { orig: {}, new: {} };
    var $ = Game_SATBNotes.prototype, _GSATBN = GSATBN.orig, _UT = GSATBN.new;

    _GSATBN.initialize = $.initialize;
    _UT.initialize = $.initialize = function(battler, cache_, pairs_, rules_) {
    // v0.00a - v0.00a; Extended
        _GSATBN.initialize.apply(this, arguments);
        // Added to test the arguments of this constructor
        _UT._checkInit.call(this, battler, cache_, pairs_, rules_);
        //
    }; // $.initialize

    // Only interfaces will have their argument invariants checked
    _GSATBN.result_ = $.result_;
    _UT.result_ = $.result_ = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBN.result_.apply(this, arguments);
        // Added to check whether the interface function arguments are valid
        _UT._checkRunResult.call(this, note, argObj_);
        // Checking the cached result as well will be unnecessarily wasting time
        return result_;
    }; // $.result_
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

    _GSATBN._uncachedResult_ = $._uncachedResult_;
    _UT._uncachedResult_ = $._uncachedResult_ = function(note, argObj_, funcNameSuffix) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBN._uncachedResult_.apply(this, arguments);
        // Added to check whether the uncached chained end result's valid
        _UT._checkUncachedResult_.call(this, note, result_);
        // Checking the cached result as well will be unnecessarily wasting time
        return result_;
    }; // $._uncachedResult_

    _GSATBN._partResultWithoutCache_ = $._partResultWithoutCache_;
    _UT._partResultWithoutCache_ = $._partResultWithoutCache_ = function(note, argObj_, part) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBN._partResultWithoutCache_.apply(this, arguments);
        // Added to check whether the cache's really supposed to be disabled
        _UT._checkIsCached.call(this, false);
        // It's not tautological as it's not instantly obvious if it's the case
        return result_;
    }; // $._partResultWithoutCache_

    _GSATBN._partResultWithCache_ = $._partResultWithCache_;
    _UT._partResultWithCache_ = $._partResultWithCache_ = function(note, argObj_, part) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBN._partResultWithCache_.apply(this, arguments);
        // Added to check whether the cache's really supposed to be enabled
        _UT._checkIsCached.call(this, true);
        // It's not tautological as it's not instantly obvious if it's the case
        return result_;
    }; // $._partResultWithCache_

    _GSATBN._pairFuncListWithoutCache = $._pairFuncListWithoutCache;
    _UT._pairFuncListWithoutCache = $._pairFuncListWithoutCache = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var list = _GSATBN._pairFuncListWithoutCache.apply(this, arguments);
        // Added to check whether the cache's really supposed to be enabled
        _UT._checkIsCached.call(this, false);
        // It's not tautological as it's not instantly obvious if it's the case
        return list;
    }; // $._pairFuncListWithoutCache

    _GSATBN._pairFuncListWithCache = $._pairFuncListWithCache;
    _UT._pairFuncListWithCache = $._pairFuncListWithCache = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var list = _GSATBN._pairFuncListWithCache.apply(this, arguments);
        // Added to check whether the cache's really supposed to be enabled
        _UT._checkIsCached.call(this, true);
        // It's not tautological as it's not instantly obvious if it's the case
        return list;
    }; // $._pairFuncListWithCache

    _GSATBN._pairFuncListPartWithCache = $._pairFuncListPartWithCache;
    _UT._pairFuncListPartWithCache = $._pairFuncListPartWithCache = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var list = _GSATBN._pairFuncListPartWithCache.apply(this, arguments);
        // Added to check whether the cache's really supposed to be enabled
        _UT._checkIsCached.call(this, true);
        // It's not tautological as it's not instantly obvious if it's the case
        return list;
    }; // $._pairFuncListPartWithCache

    /**
     * The this pointer is Game_SATBNotes.prototype
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBCache?} cache_ - The helper caching notetag list/result
     * @param {Game_SATBPairs?} pairs_ - The helper checking/returning note pair
     * @param {Game_SATBRules?} rules_ - The helper using the rule to chain note
     */
    _UT._checkInit = function(battler, cache_, pairs_, rules_) {
        SATBUT.checkFuncs.checkObjType(
                battler, "GSATBN.new._checkInit battler", Game_Battler);
        if (cache_) SATBUT.checkFuncs.checkObjType(
                cache_, "GSATBN.new._checkInit cache_", Game_SATBCache);
        if (pairs_) SATBUT.checkFuncs.checkObjType(
                pairs_, "GSATBN.new._checkInit pairs_", Game_SATBPairs);
        if (rules_) SATBUT.checkFuncs.checkObjType(
                rules_, "GSATBN.new._checkInit rules_", Game_SATBRules);
    }; // _UT._checkInit

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
                "GSATBN.new._checkRunResult " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note]);
    }; // _UT._checkRunResult

    /**
     * The this pointer is Game_SATBNotes.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {*?} result - Chained result from all effective notetags involved
     */
    _UT._checkUncachedResult_ = function(note, result_) {
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (chainedFunc) SATBUT.checkFuncs[chainedFunc](
                result_, "GSATBN.new._checkUncachedResult_ result_ " + note);
    }; // _UT._checkUncachedResult_

    /**
     * The this pointer is Game_SATBNotes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {Boolean} isCached - Whether the cache's supposed to be enabled
     */
    _UT._checkIsCached = function(isCached) {
        if (isCached === $gameSystem.satbParam("_isNoteCached")) return;
        SATBUT.showFailMsg(isCached, "GSATBN.new._checkIsCached isCached",
                "The notetag cache's enability's supposed to be " +
                !isCached + "!");
    }; // _UT._checkIsCached

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBNotes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBCache
 *      - Unit tests all data notetags to pinpoint the data with faulty notes
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GSATBC = SATB.Game_SATBCache.unitTests = { orig: {}, new: {} };
    var $ = Game_SATBCache.prototype, _GSATBC = GSATBC.orig, _UT = GSATBC.new;

    _GSATBC.markChangeFactors = $.markChangeFactors;
    _UT.markChangeFactors = $.markChangeFactors = function(factors) {
    // v0.00a - v0.00a; Extended
        _GSATBC.markChangeFactors.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "_GSATBC.markChangeFactors factors");
        //
    }; // $.markChangeFactors

    _GSATBC.markNoteChangeFactors = $.markNoteChangeFactors;
    _UT.markNoteChangeFactors = $.markNoteChangeFactors = function(note, factors) {
    // v0.00a - v0.00a; Extended
        _GSATBC.markNoteChangeFactors.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteChangeFactors.call(this, note, factors);
        //
    }; // $.markNoteChangeFactors

    _GSATBC.raiseChangeFactors = $.raiseChangeFactors;
    _UT.raiseChangeFactors = $.raiseChangeFactors = function(note, factors) {
    // v0.00a - v0.00a; Extended
        _GSATBC.raiseChangeFactors.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteChangeFactors.call(this, note, factors);
        //
    }; // $.raiseChangeFactors

    _GSATBC.invalidateResultCache = $.invalidateResultCache;
    _UT.invalidateResultCache = $.invalidateResultCache = function(note, factor) {
    // v0.00a - v0.00a; Extended
        _GSATBC.invalidateResultCache.apply(this, arguments);
        // Added to check whether the cached results are properly invalidated
        _UT._checkInvalidateResultCache.call(this, note, factor);
        //
    }; // $.run_

    _GSATBC.invalidatePairFuncListCache = $.invalidatePairFuncListCache;
    _UT.invalidatePairFuncListCache = $.invalidatePairFuncListCache = function(note, factor) {
    // v0.00a - v0.00a; Extended
        _GSATBC.invalidatePairFuncListCache.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteFactor.call(this, note, factor);
        //
    }; // $.run_

    _GSATBC.result_ = $.result_;
    _UT.result_ = $.result_ = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBC.result_.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteArgObj.call(this, note, argObj_);
        //
        return result_;
    }; // $.result_

    _GSATBC.partResult_ = $.partResult_;
    _UT.partResult_ = $.partResult_ = function(note, argObj_, part) {
    // v0.00a - v0.00a; Extended
        var partResult_ = _GSATBC.partResult_.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteArgObjPart.call(this, note, argObj_, part);
        //
        return partResult_;
    }; // $.partResult_

    _GSATBC.updatePartResult = $.updatePartResult;
    _UT.updatePartResult = $.updatePartResult = function(note, argObj_, part, result_) {
    // v0.00a - v0.00a; Extended
        _GSATBC.updatePartResult.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteArgObjPartResult.call(this, note, argObj_, part, result_);
        //
    }; // $.updatePartResult

    _GSATBC.updateResult = $.updateResult;
    _UT.updateResult = $.updateResult = function(note, argObj_, result) {
    // v0.00a - v0.00a; Extended
        _GSATBC.updateResult.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNoteArgObjResult.call(this, note, argObj_, result);
        //
    }; // $.updateResult

    _GSATBC.pairFuncList_ = $.pairFuncList_;
    _UT.pairFuncList_ = $.pairFuncList_ = function(note) {
    // v0.00a - v0.00a; Extended
        var pairFuncList_ = _GSATBC.pairFuncList_.apply(this, arguments);
        // Added to test the arguments of this public api
        SATBUT.checkFuncs.checkNoteType(note, "_GSATBC.pairFuncList note");
        //
        return pairFuncList_;
    }; // $.pairFuncList_

    _GSATBC.pairFuncListPart_ = $.pairFuncListPart_;
    _UT.pairFuncListPart_ = $.pairFuncListPart_ = function(note, part) {
    // v0.00a - v0.00a; Extended
        var pairFuncListPart_ =
                _GSATBC.pairFuncListPart_.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNotePart.call(this, note, part);
        //
        return pairFuncListPart_;
    }; // $.pairFuncListPart_

    _GSATBC.partListData = $.partListData;
    _UT.partListData = $.partListData = function(part, battler, argObj_) {
    // v0.00a - v0.00a; Extended
        var data = _GSATBC.partListData.apply(this, arguments);
        // Added to check whether the returned data are indeed a list of data
        _UT._checkPartListData.call(this, part, battler, data);
        //
        return data;
    }; // $.partListData

    _GSATBC.updatePairFuncListPart = $.updatePairFuncListPart;
    _UT.updatePairFuncListPart = $.updatePairFuncListPart = function(note, part, partList) {
    // v0.00a - v0.00a; Extended
        _GSATBC.updatePairFuncListPart.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNotePartPairFuncList.call(this, note, part, partList);
        //
    }; // $.updatePairFuncListPart

    _GSATBC.updatePairFuncList = $.updatePairFuncList;
    _UT.updatePairFuncList = $.updatePairFuncList = function(note, list) {
    // v0.00a - v0.00a; Extended
        _GSATBC.updatePairFuncList.apply(this, arguments);
        // Added to test the arguments of this public api
        _UT._checkNotePairFuncList.call(this, note, list);
        //
    }; // $.updatePairFuncList

    /**
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to having its change factor
     * @param {[Factor]} factors - The change factors to be marked/raised
     */
    _UT._checkNoteChangeFactors = function(note, factors) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteChangeFactors note");
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "GSATBC.new._checkNoteChangeFactors factors");
    }; // _UT._checkNoteChangeFactors

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its part result cache invalidated
     * @param {Factor} factor - The change factor as the note part to invalidate
     */
    _UT._checkInvalidateResultCache = function(note, factor) {
        _UT._checkNoteFactor.call(this, note, factor);
        // Checking _partResults would result in tautological tests
        var keys = Object.keys(this._cachedResults[note]);
        if (keys.length <= 0) return;
        SATBUT.showFailMsg(keys,
                "GSATBC.new._checkInvalidateResultCache " + note,
                "All the cached results of note " + note +
                " should be invalidated!");
        //
    }; // _UT._checkInvalidateResultCache

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its part cache invalidated
     * @param {Factor} factor - The change factor as the note to invalidate
     */
    _UT._checkNoteFactor = function(note, factor) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteFactor note");
        SATBUT.checkFuncs.checkFactor(
                factor, "GSATBC.new._checkNoteFactor factor");
    }; // _UT._checkNoteFactor

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result
     * @param {*?} result_ - The effective notetag list part result to be cached
     */
    _UT._checkNoteArgObjPartResult = function(note, argObj_, part, result_) {
        _UT._checkNoteArgObjPart.call(this, note, argObj_, part);
        var chainFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (result_ && chainFunc) SATBUT.checkFuncs[chainFunc](result_,
                "GSATBC.new._checkNoteArgObjPartResult result " + note);
    }; // _UT._checkNoteArgObjPartResult

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result
     */
    _UT._checkNoteArgObjPart = function(note, argObj_, part) {
        _UT._checkNoteArgObj.call(this, note, argObj_);
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkNoteArgObjPart part");
    }; // _UT._checkNoteArgObjPart

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} result - The effective notetag list part result to be cached
     */
    _UT._checkNoteArgObjResult = function(note, argObj_, result) {
        _UT._checkNoteArgObj.call(this, note, argObj_);
        var chainFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (chainFunc) SATBUT.checkFuncs[chainFunc](
                result, "GSATBC.new._checkNoteArgObjResult result " + note);
    }; // _UT._checkNoteArgObjResult

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    _UT._checkNoteArgObj = function(note, argObj_) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteArgObj note");
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBC.new._checkNoteArgObj " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note]);
    }; // _UT._checkNoteArgObj

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {DatumType} part - The note part to have its part result
     */
    _UT._checkNotePart = function(note, part) {
        SATBUT.checkFuncs.checkNoteType(note, "GSATBC.new._checkNotePart note");
        SATBUT.checkFuncs.checkDataType(part, "GSATBC.new._checkNotePart part");
    }; // _UT._checkNotePart

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {[Datum]} data - List of data having effective notetags involved
     */
    _UT._checkPartListData = function(part, battler, data) {
        // argObj_ can't be checked as it needs note which is absent here
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkPartListData part");
        SATBUT.checkFuncs.checkObjType(
                battler, "GSATBC.new._checkPartListData battler", Game_Battler);
        data.forEach(function(datum_) {
            // Missing data will be filtered out before they're used anyway
            if (datum_) SATBUT.checkFuncs.checkDataMeta(
                    datum_, "GSATBC.new._checkPartListData datum", part);
            //
        });
        //
    }; // _UT._checkPartListData

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {[PairFunc]} list = List of functions of the effective notetags
     */
    _UT._checkNotePartPairFuncList = function(note, part, list) {
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkPartListData part");
        _UT._checkNotePairFuncList.call(this, note, list);
    }; // _UT._checkNotePartPairFuncList

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {[PairFunc]} list = List of functions of the effective notetags
     */
    _UT._checkNotePairFuncList = function(note, list) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNotePairFuncList note");
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBC.new._checkNotePairFuncList list");
    }; // _UT._checkNotePairFuncList

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBCache

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBPairs
 *      - Unit tests all data notetags to pinpoint the data with faulty notes
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GSATBP = SATB.Game_SATBPairs.unitTests = { orig: {}, new: {} };
    var $ = Game_SATBPairs.prototype, _GSATBP = GSATBP.orig, _UT = GSATBP.new;

    function testPairFuncs() {
        // It's too painful to mock a battler and pairFuncs doesn't need it
        var pairs = new Game_SATBPairs(), datum = {
            meta: {
                satb: {
                    // Only val and eval suffixes can be tested as pure functions
                    coreMax: [
                        { suffix1: "val", entry1: "1" },
                        { suffix1: "eval", entry1: "return latestMax * 0.5;" }
                    ],
                    coreActState: [
                        { suffix1: "val", entry1: "true" },
                        {
                            suffix1: "eval",
                            entry1: "return datumType !== 'states';"
                        }
                    ],
                    // eval entry contents should also be pure functions
                    datumType: "states"
                }
            }
        };
        //
        var coreMaxDatum = JSON.stringify({ datum: datum, note: "coreMax" });
        var coreActStateDatum = JSON.stringify({
            datum: datum,
            note: "coreActStateDatum"
        });
        var coreMaxPairFuncs = pairs.pairFuncs("coreMax", datum);
        var coreMaxPairFunc0 = coreMaxPairFuncs[0];
        var coreMaxPairFunc1 = coreMaxPairFuncs[1];
        if (!coreMaxPairFunc0) {
            SATBUT.showFailMsg(coreMaxDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreMax PairFunc list should have 2 PairFunc!");
        } else {
            if (coreMaxPairFunc0.canBind) SATBUT.showFailMsg(coreMaxPairFunc0,
                    "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                    "The canBind field of the 1st coreMax PairFunc should be" +
                    " false!");
            if (coreMaxPairFunc0.datum !== datum) {
                SATBUT.showFailMsg(coreMaxPairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The datum field of the 1st coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!");
            }
            var unboundFunc = coreMaxPairFunc0.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 1st unboundFunc")) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== 1) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The result of the 1st coreMax PairFunc should be 1!");
            }
        }
        if (!coreMaxPairFunc1) {
            SATBUT.showFailMsg(coreMaxDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreMax PairFunc list should have 2 PairFunc!");
        } else {
            if (!coreMaxPairFunc1.canBind) SATBUT.showFailMsg(coreMaxPairFunc1,
                    "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                    "The canBind field of the 2nd coreMax PairFunc should be" +
                    " true!");
            if (coreMaxPairFunc1.datum !== datum) {
                SATBUT.showFailMsg(coreMaxPairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The datum field of the 2nd coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!");
            }
            var unboundFunc = coreMaxPairFunc1.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 2nd unboundFunc")) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== 2) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The result of the 2nd coreMax PairFunc should be 2!");
            }
        }
        if (coreMaxPairFuncs.length > 2) SATBUT.showFailMsg(coreMaxDatum,
                "Game_SATBPairs.prototype.pairFuncs",
                "The coreMax PairFunc list shouldn't have more than 2 " +
                "PairFunc!");
        var coreActStatePairFuncs = pairs.pairFuncs("coreActState", datum);
        var coreActStatePairFunc0 = coreActStatePairFuncs[0];
        var coreActStatePairFunc1 = coreActStatePairFuncs[1];
        if (!coreActStatePairFunc0) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list should have 2 PairFunc!");
        } else {
            if (coreActStatePairFunc0.canBind) {
                SATBUT.showFailMsg(coreActStatePairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The canBind field of the 1st coreMax PairFunc " +
                        "should be false!");
            }
            if (coreActStatePairFunc0.datum !== datum) {
                SATBUT.showFailMsg(coreActStatePairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The datum field of the 1st coreMax PairFunc should be" +
                        " the original datum having the coreMax notetag!");
            }
            var unboundFunc = coreActStatePairFunc0.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 1st unboundFunc")) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== true) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The result of the 1st coreActState PairFunc should " +
                        "be true!");
            }
        }
        if (!coreActStatePairFunc1) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list should have 2 PairFunc!");
        } else {
            if (!coreActStatePairFunc1.canBind) {
                SATBUT.showFailMsg(coreActStatePairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The canBind field of the 2nd coreMax PairFunc " +
                        "should be true!");
            }
            if (coreActStatePairFunc1.datum !== datum) {
                SATBUT.showFailMsg(coreActStatePairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The datum field of the 2nd coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!");
            }
            var unboundFunc = coreActStatePairFunc1.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 2nd unboundFunc")) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== false) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The result of the 2nd coreActState PairFunc should " +
                        "be false!");
            }
        }
        if (coreActStatePairFuncs.length > 2) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list shouldn't have more than" +
                    " 2 PairFunc!");
        }
    }

    // This must be run here or the unit test would report an invalid battler
    testPairFuncs();
    //

    _GSATBP.initialize = $.initialize;
    _UT.initialize = $.initialize = function(battler) {
    // v0.00a - v0.00a; Extended
        _GSATBP.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkObjType(
                battler, "_GSATBP.initialize battler", Game_Battler);
        //
    }; // $.initialize

    _GSATBP.default = $.default;
    _UT.default = $.default = function(note, argObj_) {
    // v0.00a - v0.00a; Extended
        var defaultVal = _GSATBP.default.apply(this, arguments);
        // Added to test whether the default value's valid
        _UT._checkDefault.call(this, note, argObj_, defaultVal);
        //
        return defaultVal;
    }; // $.default

    _GSATBP.pairFuncs = $.pairFuncs;
    _UT.pairFuncs = $.pairFuncs = function(note, datum_) {
    // v0.00a - v0.00a; Extended
        var pairFuncs = _GSATBP.pairFuncs.apply(this, arguments);
        // Added to test whether the default value's valid
        _UT._checkPairFuncs.call(this, note, datum_, pairFuncs);
        //
        return pairFuncs;
    }; // $.pairFuncs

    _GSATBP.run_ = $.run_;
    _UT.run_ = $.run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
    // v0.00a - v0.00a; Extended
        var result_ = _GSATBP.run_.apply(this, arguments);
        // Added to check whether the uncached chained end result's valid
        _UT._checkRun_.call(
                this, argObj_, note, pairFunc, latestChainedResult_, result_);
        //
        return result_;
    }; // $.run_

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} defaultVal - The default result of the note
     */
    _UT._checkDefault = function(note, argObj_, defaultVal) {
        _UT._checkArgObjNote.call(this, argObj_, note);
        SATBUT.checkFuncs[SATBUT.unitTests.defaultNoteTypes[note]](
                defaultVal, "_GSATBP._checkDefault default " + note);
    }; // _UT._checkDefault

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @param {[PairFunc]} pairFuncs - List of unbound funcs of note involved
     */
    _UT._checkPairFuncs = function(note, datum_, pairFuncs) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBP.new._checkPairFuncs note");
        if (datum_) SATBUT.checkFuncs.checkData(
                datum_, "GSATBP.new._checkPairFuncs datum_");
        SATBUT.checkFuncs.checkPairFuncList(
                pairFuncs, "GSATBP.new._checkPairFuncs pairFuncs");
    }; // $._checkPairFuncs

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {*?} latestChainedResult_ - The latest chained notetag result
     * @param {*?} result_ - The result of the notetag function involved
     */
    _UT._checkRun_ = function(argObj_, note, pairFunc, latestChainedResult_, result_) {
        _UT._checkArgObjNote.call(this, argObj_, note);
        SATBUT.checkFuncs.checkPairFunc(
                pairFunc, "GSATBP.new._checkRun_ pairFunc");
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (latestChainedResult_ && chainedFunc) {
            SATBUT.checkFuncs[chainedFunc](latestChainedResult_,
                    "GSATBP.new._checkRun_ latestChainedResult_ " + note);
        }
        var checkFunc = SATBUT.unitTests.noteTypes[note];
        // Some notes don't return any result
        if (!checkFunc || !result_) return;
        //
        // Checking the cached result as well will be unnecessarily wasting time
        SATBUT.checkFuncs[checkFunc](result_, "GSATBP.new._checkRun_ " + note);
        //
    }; // _UT._checkRun_

    /**
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     */
    _UT._checkArgObjNote = function(argObj_, note) {
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBP.new._checkArgObjNote " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note]);
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBP.new._checkArgObjNote note");
    }; // _UT._checkArgObjNote

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBPairs

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SATBRules
 *      - Unit tests all data notetags to pinpoint the data with faulty notes
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GSATBR = SATB.Game_SATBPairs.unitTests = { orig: {}, new: {} };
    var $ = Game_SATBRules.prototype, _GSATBR = GSATBR.orig, _UT = GSATBR.new;

    _GSATBR.initialize = $.initialize;
    _UT.initialize = $.initialize = function(pairs) {
    // v0.00a - v0.00a; Extended
        _GSATBR.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkObjType(
                pairs, "_GSATBR.initialize pairs", Game_SATBPairs);
        //
    }; // $.initialize

    _GSATBR.isAssociative = $.isAssociative;
    _UT.isAssociative = $.isAssociative = function(note) {
    // v0.00a - v0.00a; Extended
        var isAssociative = _GSATBR.isAssociative.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkIsAssociative.call(this, note, isAssociative);
        //
        return isAssociative;
    }; // $.isAssociative

    _GSATBR.chainedResult = $.chainedResult;
    _UT.chainedResult = $.chainedResult = function(list, note, argObj_, initVal_) {
    // v0.00a - v0.00a; Extended
        var chainedResult = _GSATBR.chainedResult.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkChainedResult.call(
                this, list, note, argObj_, initVal_, chainedResult);
        //
        return chainedResult;
    }; // $.chainedResult

    _GSATBR.chainedValResult = $.chainedValResult;
    _UT.chainedValResult = $.chainedValResult = function(list, note, argObj_, initVal_) {
    // v0.00a - v0.00a; Extended
        var chainedResult = _GSATBR.chainedValResult.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkChainedValResult.call(
                this, list, note, argObj_, initVal_, chainedResult);
        //
        return chainedResult;
    }; // $.chainedValResult

    _GSATBR.chainedRunList = $.chainedRunList;
    _UT.chainedRunList = $.chainedRunList = function(list, note) {
    // v0.00a - v0.00a; Extended
        var chainFunc = _GSATBR.chainedRunList.apply(this, arguments);
        // Added to test whether the returned function's valid
        _UT._checkChainedRunList.call(this, list, note, chainFunc);
        //
        return chainFunc;
    }; // $.chainedRunList

    _GSATBR.priorities = $.priorities;
    _UT.priorities = $.priorities = function(note) {
    // v0.00a - v0.00a; Extended
        var priorities = _GSATBR.priorities.apply(this, arguments);
        // Added to test whether the returned priorities' valid
        _UT._checkPriorities.call(this, note, priorities);
        //
        return priorities;
    }; // $.priorities

    _GSATBR._chainingRule = $._chainingRule;
    _UT._chainingRule = $._chainingRule = function(note) {
    // v0.00a - v0.00a; Extended
        var _chainingRule = _GSATBR._chainingRule.apply(this, arguments);
        // Added to test whether the returned chaining rule' valid
        _UT._checkChainingRule.call(this, note, _chainingRule);
        // It's a very useful check even if it's a private method
        return _chainingRule;
    }; // $._chainingRule

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective results chained
     * @param {Boolean} isAssociative - The check result
     */
    _UT._checkIsAssociative = function(note, isAssociative) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkIsAssociative note");
        SATBUT.checkFuncs.checkBool(
                isAssociative, "GSATBR.new._checkIsAssociative isAssociative");
    }; // _UT._checkIsAssociative

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @param {*} chainedResult - Chained result from note list of note involved
     */
    _UT._checkChainedResult = function(list, note, argObj_, initVal_, chainedResult) {
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBR.new._checkChainedResult list");
        _UT._checkNoteArgObjInitValChainedResult.call(
                this, note, argObj_, initVal_, chainedResult);
    }; // _UT._checkChainedResult

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[<T>]} list - The effective notetag results to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {<T>?} initVal_ - The initial result to chain the notetag list
     * @param {<T>} chainedResult - Chained result from the note list involved
     */
    _UT._checkChainedValResult = function(list, note, argObj_, initVal_, chainedResult) {
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (chainedFunc) list.forEach(function(val, i) {
            SATBUT.checkFuncs[chainedFunc](val,
                    "GSATBR.new._checkChainedResult chainedResult ith " +
                    note + " value");
        });
        _UT._checkNoteArgObjInitValChainedResult.call(
                this, note, argObj_, initVal_, chainedResult);
    }; // _UT._checkChainedValResult

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @param {*} chainedResult - Chained result from note list of note involved
     */
    _UT._checkNoteArgObjInitValChainedResult = function(note, argObj_, initVal_, chainedResult) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkNoteArgObjInitValChainedResult note");
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBR.new._checkNoteArgObjInitValChainedResult " + note +
                " argObj_", SATBUT.unitTests.noteArgObjs[note]);
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (!chainedFunc) return;
        if (initVal_) SATBUT.checkFuncs[chainedFunc](initVal_,
                "GSATBR.new._checkNoteArgObjInitValChainedResult initVal_ " +
                note);
        SATBUT.checkFuncs[chainedFunc](chainedResult,
                "GSATBR.new._checkNoteArgObjInitValChainedResult " +
                "chainedResult " + note);
    }; // _UT._checkNoteArgObjInitValChainedResult

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its effective results chained
     * @param {([PairFunc]) -> [PairFunc]} chainFunc - The function chaining the
     *                                                 note list
     */
    _UT._checkChainedRunList = function(list, note, chainFunc) {
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBR.new._checkChainedRunList list");
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkChainedRunList note");
        SATBUT.checkFuncs.checkFunc(
                chainFunc, "GSATBR.new._checkChainedRunList chainFunc");
    }; // _UT._checkChainedRunList

    /**
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {[String]} priorities - Data type priority queue parameter value
     */
    _UT._checkPriorities = function(note, priorities) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkPriorities note");
        SATBUT.checkFuncs.checkArrayDataType(
                priorities, "GSATBR.new._checkPriorities priorities");
    }; // _UT._checkPriorities

    /**
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @param {ChainRule} chainingRule - The effective notetag chaining rule
     *                                   parameter value
     */
    _UT._checkChainingRule = function(note, chainingRule) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkChainingRule note");
        SATBUT.checkFuncs[SATBUT.unitTests.noteChainingRules[note]](
                chainingRule, "GSATBR.new._checkChainingRule chainingRule");
    }; // _UT._checkChainingRule

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_SATBRules

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Unit tests all plugin commands to validate the inputted parameters
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GI = SATB.Game_Interpreter.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Game_Interpreter.new, _GI = GI.orig, _UT = GI.new;

    _GI._FILTERED_TARGETS = _SATB._FILTERED_TARGETS;
    _UT._FILTERED_TARGETS = _SATB._FILTERED_TARGETS = function(targetType, targets, targetGroup) {
    // v0.00a - v0.00a; Extended
        var filteredTargets = _GI._FILTERED_TARGETS.apply(_SATB, arguments);
        // Added to check the parameters of this private pure function
        _UT._CHECK_FILTERED_TARGETS(
                targetType, targets, targetGroup, filteredTargets);
        // It's very useful to check the user inputs even if it's a private func
        return filteredTargets;
    }; // _SATB._FILTERED_TARGETS

    _UT._CHECK_FILTERED_TARGETS = function(targetType, targets, targetGroup, filteredTargets) {
        SATBUT.checkFuncs.checkVal(targetType,
                "GI.new._CHECK_FILTERED_TARGETS targetType",
                Object.keys(_SATB._TARGET_GROUPS));
        targets.forEach(function(target, i) {
            SATBUT.checkFuncs.checkString(
                    target, "GI.new._CHECK_FILTERED_TARGETS target " + i);
            if (!isNaN(target)) SATBUT.checkFuncs.checkNonnegativeInt(
                    +target, "GI.new._CHECK_FILTERED_TARGETS target " + i);
        });
        targetGroup.forEach(function(target, i) {
            SATBUT.checkFuncs.checkObjType(target,
                    "GI.new._CHECK_FILTERED_TARGETS target " + i, Game_Battler);
        });
        filteredTargets.forEach(function(target, i) {
            SATBUT.checkFuncs.checkObjType(target,
                    "GI.new._CHECK_FILTERED_TARGETS target " + i, Game_Battler);
        });
    }; // _UT._CHECK_FILTERED_TARGETS

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_Interpreter

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Tests all Scene_Battle preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var SB = SATB.Scene_Battle.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Scene_Battle.new, _SB = SB.orig, _UT = SB.new;

    _SB._updateBattleProc = _SATB._updateBattleProc;
    _UT._updateBattleProc = _SATB._updateBattleProc = function() {
    // v0.00a - v0.00a; Extended
        _SB._updateBattleProc.apply(this, arguments);
        // Added to check if combinations of different window states are valid
        _UT._checkInputWinStates.call(this);
        // It's a very useful check that must be run per frame
    }; // _SATB._updateBattleProc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkInputWinStates = function() {
        // These obvious invariants are actually very easy to become all wrong
        var cmdWins = {
            partyCmdWin: this._partyCommandWindow,
            actorCmdWin: this._actorCommandWindow
        };
        var selectWins = {
            skillWin: this._skillWindow,
            itemWin: this._itemWindow,
            actorWin: this._actorWindow,
            enemyWin: this._enemyWindow
        };
        var activeCmdWins = Object.keys(cmdWins).filter(function(win) {
            return cmdWins[win].active;
        });
        var activeSelectWins = Object.keys(selectWins).filter(function(win) {
            return selectWins[win].active;
        });
        _UT._checkActiveCmdWinNum.call(this, activeCmdWins);
        _UT._checkActiveSelectWinNum.call(this, activeSelectWins);
        if (_SATB._canDisplayWins.call(this)) {
            _UT._checkDisplayableActiveVisibleCmdWins.call(
                    this, cmdWins, activeCmdWins);
            _UT._checkDisplayableActiveVisibleSelectWins.call(
                    this, selectWins, activeSelectWins);
        }
        var openCmdWins = Object.keys(cmdWins).filter(function(win) {
            return cmdWins[win].isOpen();
        });
        var visibleSelectWins = Object.keys(selectWins).filter(function(win) {
            return selectWins[win].visible;
        });
        _UT._checkOpenCmdWinNum.call(this, openCmdWins);
        _UT._checkVisibleSelectWinNum.call(this, visibleSelectWins);
        _UT._checkVisibleActiveSelectWins.call(
                this, selectWins, visibleSelectWins);
        if (this._partyCommandWindow.active) {
            _UT._checkActivePartyCmdActiveSelectWins.call(
                    this, activeSelectWins);
            _UT._checkActivePartyCmdVisibleSelectWins.call(
                    this, visibleSelectWins);
        }
        var actor = BattleManager.actor();
        // There's nothing to check for the else case as it's 1 frame delay
        if (actor) _UT._checkInputtingActorStatusWinI.call(this, actor.index());
        // It's pointless to check the visibility of any command window
    }; // _UT._checkInputWinStates

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Command]} activeCmdWins - The list of active cmd windows
     */
    _UT._checkActiveCmdWinNum = function(activeCmdWins) {
        if (activeCmdWins.length > 1) SATBUT.showFailMsg(activeCmdWins,
                "SB.new._checkActiveCmdWinNum activeCmdWins",
                "At most 1 command window can be active at a time!");
    }; // _UT._checkActiveCmdWinNum

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} activeSelectWins - List of active select win
     */
    _UT._checkActiveSelectWinNum = function(activeSelectWins) {
        if (activeSelectWins.length > 1) SATBUT.showFailMsg(activeSelectWins,
                "SB.new._checkActiveSelectWinNum activeSelectWins",
                "At most 1 selection window can be active at a time!");
    }; // _UT._checkActiveSelectWinNum

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Command]} cmdWins - The list of command windows
     * @param {[Window_Command]} activeCmdWins - The list of active cmd windows
     */
    _UT._checkDisplayableActiveVisibleCmdWins = function(cmdWins, activeCmdWins) {
        activeCmdWins.forEach(function(win) {
            if (!cmdWins[win].visible) SATBUT.showFailMsg(win,
                    "SB.new._checkDisplayableActiveVisibleCmdWins",
                    "An active command window must be visible!");
        });
    }; // _UT._checkDisplayableActiveVisibleCmdWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} selectWins - The list of selection windows
     * @param {[Window_Selectable]} activeSelectWins - List of active select win
     */
    _UT._checkDisplayableActiveVisibleSelectWins = function(selectWins, activeSelectWins) {
        activeSelectWins.forEach(function(win) {
            if (!selectWins[win].visible) SATBUT.showFailMsg(win,
                    "SB.new._checkDisplayableActiveVisibleSelectWins",
                    "An active selection window must be visible!");
        });
    }; // _UT._checkDisplayableActiveVisibleSelectWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Command]} openCmdWins - The list of open cmd windows
     */
    _UT._checkOpenCmdWinNum = function(openCmdWins) {
        if (openCmdWins.length > 1) SATBUT.showFailMsg(openCmdWins,
                "SB.new._checkOpenCmdWinNum openCmdWins",
                "At most 1 command window can be open at a time!");
    }; // _UT._checkOpenCmdWinNum

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} visibleSelectWins - Visible select win list
     */
    _UT._checkVisibleSelectWinNum = function(visibleSelectWins) {
        if (visibleSelectWins.length > 1) SATBUT.showFailMsg(visibleSelectWins,
                "SB.new._checkVisibleSelectWinNum visibleSelectWins",
                "At most 1 selection window can be visible at a time!");
    }; // _UT._checkVisibleSelectWinNum

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} selectWins - The list of selection windows
     * @param {[Window_Selectable]} visibleSelectWins - Visible select win list
     */
    _UT._checkVisibleActiveSelectWins = function(selectWins, visibleSelectWins) {
        visibleSelectWins.forEach(function(win) {
            if (selectWins[win].active) return;
            SATBUT.showFailMsg(win, "SB.new._checkVisibleActiveSelectWins",
                    "A visible selection window must be active!");
        });
    }; // _UT._checkVisibleActiveSelectWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} activeSelectWins - List of active select win
     */
    _UT._checkActivePartyCmdActiveSelectWins = function(activeSelectWins) {
        if (activeSelectWins.length > 0) SATBUT.showFailMsg(activeSelectWins,
                "SB.new._checkActivePartyCmdActiveSelectWins activeSelectWins",
                "No selection window can be active when the party " +
                "command window's active!");
    }; // _UT._checkActivePartyCmdActiveSelectWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {[Window_Selectable]} visibleSelectWins - Visible select win list
     */
    _UT._checkActivePartyCmdVisibleSelectWins = function(visibleSelectWins) {
        if (visibleSelectWins.length > 0) SATBUT.showFailMsg(visibleSelectWins,
                "SB.new._checkActivePartyCmdVisibleSelectWins " +
                "visibleSelectWins",
                "No selection window can be visible when the party " +
                "command window's active!");
    }; // _UT._checkActivePartyCmdVisibleSelectWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {Index} actorIndex - The index of the inputting actor
     */
    _UT._checkInputtingActorStatusWinI = function(actorIndex) {
        var statusWindowIndex = this._statusWindow._index;
        if (actorIndex === statusWindowIndex) return;
        SATBUT.showFailMsg(JSON.stringify({
            actorIndex: actorIndex,
            statusWindowIndex: statusWindowIndex
        }), "SB.new._checkInputtingActorStatusWinI indices",
                "The status window index must be the same as that of the " +
                "inputting actor!");
    }; // _UT._checkInputtingActorStatusWinI

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Scene_Battle

/*----------------------------------------------------------------------------*/

} else {
    alert("DoubleX RMMV Superlative ATB Implementations should be above " +
            "DoubleX RMMV Superlative ATB Unit Tests");
} // if (DoubleX_RMMV["Superlative ATB Implementations"])

/*============================================================================*/
