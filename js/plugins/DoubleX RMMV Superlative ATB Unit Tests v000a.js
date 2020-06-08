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
        checkDataType: function(val, param) {
            SATBUT.checkFuncs.checkVal(val, param, [
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
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @since v0.00a @version v0.00a
         */
        checkParam: function(module, param) {
            var m = SATBUT.unitTests.params[module];
            if (!m) return SATBUT.showFailMsg(
                    module, "module", "This module doesn't exist!");
            if (!m[param]) SATBUT.showFailMsg(param, "param",
                    "This parameter doesn't exist in module " + module + "!");
        }, // checkParam

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
            if (typeof val === "string" || val instanceof String) return;
            SATBUT.showFailMsg(val, param, "It should be a String!");
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
            if (vals.indexOf(val) >= 0) return;
            SATBUT.showFailMsg(val, param, "It should be within " + vals + "!");
        } // checkVal

    }; // SATBUT.checkFuncs
    //

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests);

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Tests the notetag reading and switch/variable change factor mappings
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.DataManager.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.DataManager.new;
    var _GS = SATB.DataManager.unitTests.orig;
    var _UT = SATB.DataManager.unitTests.new;

    _GS.updateSATBNoteScriptInVar = DataManager.updateSATBNoteScriptInVar;
    _UT.updateSATBNoteScriptInVar = DataManager.updateSATBNoteScriptInVar = function(id, val) {
    // v0.00a - v0.00a; Extended
        _GS.updateSATBNoteScriptInVar.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        SATBUT.checkFuncs.checkNaturalNum(
                id, "DataManager.updateSATBNoteScriptInVar id");
        // val can be anything so it can't be checked
    }; // DataManager.updateSATBNoteScriptInVar

    _GS.scanSATBFuncContentForSwitchVars = DataManager.scanSATBFuncContentForSwitchVars;
    _UT.scanSATBFuncContentForSwitchVars = DataManager.scanSATBFuncContentForSwitchVars = function(funcContent, noteType) {
    // v0.00a - v0.00a; Extended
        _GS.scanSATBFuncContentForSwitchVars.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        _UT._checkScanSATBFuncContentForSwitchVarsArgs.call(
                this, funcContent, noteType);
        //
    }; // DataManager.scanSATBFuncContentForSwitchVars

    _GS.storeUpdatedSATBSwitchVarIds = DataManager.storeUpdatedSATBSwitchVarIds;
    _UT.storeUpdatedSATBSwitchVarIds = DataManager.storeUpdatedSATBSwitchVarIds = function(noteType, switchVar_, id_, dataTypes_) {
    // v0.00a - v0.00a; Extended
        _GS.storeUpdatedSATBSwitchVarIds.apply(this, arguments);
        // Added to check this public API arguments that can be checked
        _UT._checkStoreUpdatedSATBSwitchVarIdsArgs.call(
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
    _UT._checkScanSATBFuncContentForSwitchVarsArgs = function(funcContent, noteType) {
        SATBUT.checkFuncs.checkString(funcContent,
                "_UT._checkScanSATBFuncContentForSwitchVarsArgs funcContent");
        SATBUT.checkFuncs.checkNoteType(noteType,
                "_UT._checkScanSATBFuncContentForSwitchVarsArgs noteType");
    }; // _UT._checkScanSATBFuncContentForSwitchVarsArgs

    /**
     * The this pointer is DataManager
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _UT._checkStoreUpdatedSATBSwitchVarIdsArgs = function(noteType, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkNoteType(noteType,
                "_UT._checkStoreUpdatedSATBSwitchVarIdsArgs noteType");
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(switchVar_,
                "_UT._checkStoreUpdatedSATBSwitchVarIdsArgs switchVar_");
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "_UT._checkStoreUpdatedSATBSwitchVarIdsArgs id_");
        if (!dataTypes_) return;
        // _SATB._updateAllSwitchVarIds sets dataTypes_ as ["result"] correctly
        var dataTypes = dataTypes_.filter(function(dataType) {
            return dataType !== "result";
        });
        //
        SATBUT.checkFuncs.checkArrayDataType(dataTypes,
                "_UT._checkStoreUpdatedSATBSwitchVarIdsArgs dataTypes_");
    }; // _UT._checkStoreUpdatedSATBSwitchVarIdsArgs

    /**
     * No-op
     * @since v0.00a @version v0.00a
     */
    function testReadNotes() {
      // Don't test switch, var and script suffix here as they've side effects
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
        ], satbLines = JSON.stringify({ satb: satb, lines: lines });
        //
        _SATB._readNote(satb, lines);
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
    } // testReadNotes

    function testUpdateSwitchVarIds() {
        // Setups the test fixture by preserving original switch/variable ids
        var switchIds = JSON.parse(JSON.stringify(_SATB.switchIds));
        var varIds = JSON.parse(JSON.stringify(_SATB.varIds));
        //
        // Only tests switch, var and script suffix here as they've side effects
        var satb = { datumType: "skills" }, lines = [
              "<satb coreMax var: 1>",
              "<satb coreMax script: 2>",
              // Reading state notetags in skills doesn't matter as it's ignored
              "<satb coreActState switch: 1>"
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
            SATBUT.showFailMsg(switchIdLines, "_SATB._readNote",
                    "_SATB.switchIds should've the game switch with id 1!");
        } else {
            var coreActState = switchId1.coreActState;
            if (!coreActState) {
                SATBUT.showFailMsg(switchIdLines, "_SATB._readNote",
                        "The game switch with id 1 should've mapped to " +
                        "the notetag type coreActState in _SATB.switchIds!");
            } else {
                // switch only changes the cached notetag value but not the list
                if (coreActState[0] !== "result") {
                    SATBUT.showFailMsg(switchIdLines, "_SATB._readNote", "The " +
                            "1st data type of the notetag type coreActState " +
                            "mapped by the game switch with id 1 in " +
                            "_SATB.switchIds should be result!");
                }
                //
                if (coreActState.length > 1) {
                    SATBUT.showFailMsg(switchIdLines, "_SATB._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreActState mapped by the " +
                            "game switch with id 1 in _SATB.switchIds!");
                }
            }
            if (Object.keys(switchId1).length > 1) {
                SATBUT.showFailMsg(switchIdLines, "_SATB._readNote",
                        "The game switch with id 1 shouldn't have mapped to " +
                        "more than 1 notetag types in _SATB.switchIds!");
            }
        }
        if (Object.keys(_SATB.switchIds).length > 1) {
            SATBUT.showFailMsg(switchIdLines, "_SATB._readNote",
                    "_SATB.switchIds shouldn't have more than 1 game " +
                    "switches!");
        }
        var varId1 = _SATB.varIds["1"];
        if (!varId1) {
            SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                    "_SATB.varIds should've the game variable with id 1!");
        } else {
            var coreMax = varId1.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                        "The game variable with id 1 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!");
            } else {
                // var only changes the cached notetag value but not the list
                if (coreMax[0] !== "result") {
                    SATBUT.showFailMsg(varIdLines, "_SATB._readNote", "The " +
                            "1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 1 in " +
                            "_SATB.varIds should be result!");
                }
                //
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 1 in _SATB.varIds!");
                }
            }
            if (Object.keys(varId1).length > 1) {
                SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                        "The game variable with id 1 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!");
            }
        }
        var varId2 = _SATB.varIds["2"];
        if (!varId2) {
            SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                    "_SATB.varIds should've the game variable with id 1!");
        } else {
            var coreMax = varId2.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                        "The game variable with id 1 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!");
            } else {
                if (coreMax[0] !== "skills") {
                    SATBUT.showFailMsg(varIdLines, "_SATB._readNote", "The " +
                            "1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 1 in " +
                            "_SATB.varIds should be skills!");
                }
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 1 in _SATB.varIds!");
                }
            }
            if (Object.keys(varId2).length > 1) {
                SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                        "The game variable with id 1 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!");
            }
        }
        if (Object.keys(_SATB.varIds).length > 2) {
            SATBUT.showFailMsg(varIdLines, "_SATB._readNote",
                    "_SATB.varIds shouldn't have more than 2 game " +
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

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Tests the stored parameter and notetag values
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Game_System.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Game_System.new, $ = Game_System.prototype;
    var _GS = SATB.Game_System.unitTests.orig;
    var _UT = SATB.Game_System.unitTests.new;

    _GS.extractSATBFuncContents = $.extractSATBFuncContents;
    _UT.extractSATBFuncContents = $.extractSATBFuncContents = function(funcType) {
    // v0.00a - v0.00a; Extended
        _GS.extractSATBFuncContents.apply(this, arguments);
        // Added to check the validity of this parameter function result value
        _UT._checkExtractSATBFuncContentsArg.call(this, funcType);
        //
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
        _UT._checkSetSATBParamArgs(param, funcContent, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    _GS.satbNote = $.satbNote;
    _UT.satbNote = $.satbNote = function(noteType, name) {
    // v0.00a - v0.00a; Extended
        var funcContent = _GS.satbNote.apply(this, arguments);
        // Added to check the validity of this raw parameter value
        _UT._checkNote.call(this, noteType, name, funcContent);
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
                "_UT._checkExtractSATBFuncContentsArg funcType",
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
            SATBUT.showFailMsg(param, "_UT._checkParamFunc param", "Only " +
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
        // Invalid function contents will crash the game so it's so checked here
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
    _UT._checkSetSATBParamArgs = function(param, funcContent, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkParam(_SATB._PARAM_MODULES[param], param);
        if (_SATB._IS_FUNC_PARAM(param)) SATBUT.checkFuncs.checkString(
                funcContent, "_UT._checkSetSATBParamArgs funcContent");
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(
                switchVar_, "_UT._checkSetSATBParamArgs switchVar_");
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "_UT._checkSetSATBParamArgs id_");
        if (dataTypes_) SATBUT.checkFuncs.checkArrayDataType(
                dataTypes_, "_UT._checkSetSATBParamArgs dataTypes_");
    }; // _UT._checkSetSATBParamArgs

    /**
     * The this pointer is Game_System.prototype
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The type of the notetag
     * @param {String} name - The name of the notetag
     * @param {String} funcContent - Function content returning notetag value
     */
    _UT._checkNote = function(noteType, name, funcContent) {
        SATBUT.checkFuncs.checkNoteType(noteType, "_UT._checkNote noteType");
        SATBUT.checkFuncs.checkString(
                funcContent, "_UT._checkNote funcContent");
    }; // _UT._checkNote

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
