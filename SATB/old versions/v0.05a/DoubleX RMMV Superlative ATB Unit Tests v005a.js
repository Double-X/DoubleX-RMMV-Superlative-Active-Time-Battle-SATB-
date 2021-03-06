// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Unit Tests"] = "v0.05a";
//

/*:
 * @plugindesc The unit test plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 * THIS UNIT TEST PLUGIN DHOULD BE DISABLED WHEN PUBLISHING THE GAME, AS THIS
 * UNIT TEST PLUGIN MIGHT HAVE NONTRIVIAL PERFORMANCE PENALTIES OTHERWISE
 * If your parameters/notetags use game switches/variables, it's normal for
 * the unit test to report that those values are invalid before even starting
 * a new game or loading a saved game, because those game switches/variables
 * don't have their values set yet at that moment
 * You can open this unit test plugin js file to set how the failed tests are
 * reported
 * DON'T ENABLE THIS UNIT TEST PLUGIN WITHOUT ENABLING THE SATB PLUGIN ITSELF
 * UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 */

if (DoubleX_RMMV.SATB && DoubleX_RMMV["Superlative ATB Implementations"]) {

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var _failMsgArgs = {};

    SATB.Unit_Tests = {

        /**
         * Shows the failed parameter test with its value, condition and error
         * Hotspot/No-op
         * @since v0.00a @version v0.05a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {String} cond - The parameter validity condition description
         * @param {{*}} context - The context of the failed test
         */
        showFailMsg: function(val, param, cond, context) {
            // Effectively disables unit test when game switch with id 6 is on
            if (!$gameSwitches || !$gameSwitches.value(6)) return;
            var failMsgArgs = JSON.stringify({
                val: val,
                param: param,
                cond: cond
            });
            // It's to prevent the same fail msg needlessly flooding the console
            if (_failMsgArgs[failMsgArgs]) return;
            //
            try { x; } catch (err) {
                var failMsg = [
                    param + " in DoubleX RMMV Superlative ATB has value:",
                    val,
                    "Which isn't valid because:",
                    cond,
                    "The source's shown by this stacktrace:",
                    err.stack
                ].join("\n");
                _failMsgArgs[failMsgArgs] = failMsg;
                console.warn(failMsg, context);
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

(function(SATBUT) {

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
            }, // core
            bar: { // v0.03a+
                IsBarEnabled: "checkBool",
                isShowATBBar: "checkBool",
                atbBarText: "checkString",
                atbBarXOffset: "checkInt",
                atbBarYOffset: "checkInt",
                atbBarW: "checkNaturalNum",
                atbBarH: "checkNaturalNum",
                atbBarTextSize: "checkNaturalNum",
                atbBarLineH: "checkNaturalNum",
                atbBarTextPadding: "checkNonnegativeInt",
                atbBarBackOpacity: "checkOpacity",
                atbBarTextXOffset: "checkInt",
                atbBarTextYOffset: "checkInt",
                atbBarTextColor: "checkColor",
                atbBarColor1: "checkColor",
                atbBarColor2: "checkColor",
                atbBarBackColor: "checkColor",
                _isBarVisibleNoteChainingRule: "checkChainBoolRule",
                _isBarVisibleNotePriorities: "checkArrayDataType"
            }, // bar
            hotkey: { // v0.01a+
                IsHotkeyEnabled: "checkBool",
                prevInputableActorKey: "checkString",
                nextInputableActorKey: "checkString",
                inputableActorKeys: "checkStringArray"
            }, // hotkey
            wait: { // v0.02a+
                IsWaitEnabled: "checkBool",
                isATBWaitCondMet: "checkBool",
                forceRunATBKey: "checkString",
                forceStopATBKey: "checkString",
                isShowForceATBStatWin: "checkBool",
                noForceATBText: "checkString",
                forceRunATBStatText: "checkString",
                forceStopATBStatText: "checkString",
                forceATBStatWinX: "checkNonnegativeNum",
                forceATBStatWinY: "checkNonnegativeNum",
                forceATBStatWinW: "checkNaturalNum",
                forceATBStatWinH: "checkNaturalNum",
                forceATBStatTextSize: "checkNaturalNum",
                forceATBStatWinLineH: "checkNaturalNum",
                forceATBStatWinPadding: "checkNonnegativeInt",
                forceATBStatTextPadding: "checkNonnegativeInt",
                forceATBStatBackOpacity: "checkOpacity",
                forceATBStatTextXOffset: "checkInt",
                forceATBStatTextYOffset: "checkInt",
                isShowForceATBRunCmdWin: "checkBool",
                forceRunATBCmdText: "checkString",
                forceATBRunCmdWinX: "checkNonnegativeNum",
                forceATBRunCmdWinY: "checkNonnegativeNum",
                forceATBRunCmdWinW: "checkNaturalNum",
                forceATBRunCmdWinH: "checkNaturalNum",
                forceATBRunCmdTextSize: "checkNaturalNum",
                forceATBRunCmdWinLineH: "checkNaturalNum",
                forceATBRunCmdWinPadding: "checkNonnegativeInt",
                forceATBRunCmdTextPadding: "checkNonnegativeInt",
                forceATBRunCmdBackOpacity: "checkOpacity",
                forceATBRunCmdTextXOffset: "checkInt",
                forceATBRunCmdTextYOffset: "checkInt",
                isShowForceATBStopCmdWin: "checkBool",
                forceStopATBCmdText: "checkString",
                forceATBStopCmdWinX: "checkNonnegativeNum",
                forceATBStopCmdWinY: "checkNonnegativeNum",
                forceATBStopCmdWinW: "checkNaturalNum",
                forceATBStopCmdWinH: "checkNaturalNum",
                forceATBStopCmdTextSize: "checkNaturalNum",
                forceATBStopCmdWinLineH: "checkNaturalNum",
                forceATBStopCmdWinPadding: "checkNonnegativeInt",
                forceATBStopCmdTextPadding: "checkNonnegativeInt",
                forceATBStopCmdBackOpacity: "checkOpacity",
                forceATBStopCmdTextXOffset: "checkInt",
                forceATBStopCmdTextYOffset: "checkInt"
            }, // wait
            charge: { // v0.04a+
                IsChargeEnabled: "checkBool",
                chargeMaxATBVal: "checkPositiveNum",
                _chargeMaxATBValNoteChainingRule: "checkChainNumRule",
                _chargeMaxATBValNotePriorities: "checkArrayDataType",
                isPayBeforeExecCharge: "checkBool",
                _isPayBeforeExecChargeNoteChainingRule: "checkChainBoolRule",
                _isPayBeforeExecChargeNotePriorities: "checkArrayDataType",
                cancelChargeATBKeys: "checkStringArray",
                canCancelCharge: "checkBool",
                _canCancelChargeNoteChainingRule: "checkChainBoolRule",
                _canCancelChargeNotePriorities: "checkArrayDataType",
                forceChargeATBKeys: "checkStringArray",
                canForceCharge: "checkBool",
                _canForceChargeNoteChainingRule: "checkChainBoolRule",
                _canForceChargeNotePriorities: "checkArrayDataType"
            }, // charge
            cooldown: { // v0.05a+
                IsCooldownEnabled: "checkBool",
                cooldownMaxATBVal: "checkPositiveNum",
                _cooldownMaxATBValNoteChainingRule: "checkChainNumRule",
                _cooldownMaxATBValNotePriorities: "checkArrayDataType",
                cancelCooldownATBKeys: "checkStringArray",
                canCancelCooldown: "checkBool",
                _canCancelCooldownNoteChainingRule: "checkChainBoolRule",
                _canCancelCooldownNotePriorities: "checkArrayDataType"
            } // cooldown
        }, // params
        testParamArgsWithoutContext: {
            core: {
                IsCoreEnabled: SATBUT.testNoArgParamFunc,
                coreBaseFillATBFrame: SATBUT.testNoArgParamFunc,
                coreBaseFillATBSec: SATBUT.testNoArgParamFunc,
                coreTurnATBTime: function(func) { return func(600); },
                coreTurnATBAct: SATBUT.testNoArgParamFunc,
                canCoreTurnClockOverflow: SATBUT.testNoArgParamFunc
            }, // core
            bar: { // v0.03a+
                IsBarEnabled: SATBUT.testNoArgParamFunc
            }, // bar
            hotkey: { // v0.01a+
                IsHotkeyEnabled: SATBUT.testNoArgParamFunc,
                prevInputableActorKey: SATBUT.testNoArgParamFunc,
                nextInputableActorKey: SATBUT.testNoArgParamFunc,
                inputableActorKeys: SATBUT.testNoArgParamFunc
            }, // hotkey
            wait: { // v0.02a+
                IsWaitEnabled: SATBUT.testNoArgParamFunc,
                forceRunATBKey: SATBUT.testNoArgParamFunc,
                forceStopATBKey: SATBUT.testNoArgParamFunc,
                isShowForceATBStatWin: SATBUT.testNoArgParamFunc,
                noForceATBText: SATBUT.testNoArgParamFunc,
                forceRunATBStatText: SATBUT.testNoArgParamFunc,
                forceStopATBStatText: SATBUT.testNoArgParamFunc,
                forceATBStatWinX: SATBUT.testNoArgParamFunc,
                forceATBStatWinY: SATBUT.testNoArgParamFunc,
                forceATBStatWinW: SATBUT.testNoArgParamFunc,
                forceATBStatWinH: SATBUT.testNoArgParamFunc,
                forceATBStatTextSize: SATBUT.testNoArgParamFunc,
                forceATBStatWinLineH: SATBUT.testNoArgParamFunc,
                forceATBStatWinPadding: SATBUT.testNoArgParamFunc,
                forceATBStatTextPadding: SATBUT.testNoArgParamFunc,
                forceATBStatBackOpacity: SATBUT.testNoArgParamFunc,
                forceATBStatTextXOffset: SATBUT.testNoArgParamFunc,
                forceATBStatTextYOffset: SATBUT.testNoArgParamFunc,
                isShowForceATBRunCmdWin: SATBUT.testNoArgParamFunc,
                forceRunATBCmdText: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinX: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinY: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinW: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinH: SATBUT.testNoArgParamFunc,
                forceATBRunCmdTextSize: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinLineH: SATBUT.testNoArgParamFunc,
                forceATBRunCmdWinPadding: SATBUT.testNoArgParamFunc,
                forceATBRunCmdTextPadding: SATBUT.testNoArgParamFunc,
                forceATBRunCmdBackOpacity: SATBUT.testNoArgParamFunc,
                forceATBRunCmdTextXOffset: SATBUT.testNoArgParamFunc,
                forceATBRunCmdTextYOffset: SATBUT.testNoArgParamFunc,
                isShowForceATBStopCmdWin: SATBUT.testNoArgParamFunc,
                forceStopATBCmdText: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinX: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinY: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinW: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinH: SATBUT.testNoArgParamFunc,
                forceATBStopCmdTextSize: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinLineH: SATBUT.testNoArgParamFunc,
                forceATBStopCmdWinPadding: SATBUT.testNoArgParamFunc,
                forceATBStopCmdTextPadding: SATBUT.testNoArgParamFunc,
                forceATBStopCmdBackOpacity: SATBUT.testNoArgParamFunc,
                forceATBStopCmdTextXOffset: SATBUT.testNoArgParamFunc,
                forceATBStopCmdTextYOffset: SATBUT.testNoArgParamFunc
            }, // wait,
            charge: { // v0.04a+
                IsChargeEnabled: SATBUT.testNoArgParamFunc,
                cancelChargeATBKeys: SATBUT.testNoArgParamFunc,
                forceChargeATBKeys: SATBUT.testNoArgParamFunc
            }, // charge
            cooldown: { // v0.05a+
                IsCooldownEnabled: SATBUT.testNoArgParamFunc,
                cancelCooldownATBKeys: SATBUT.testNoArgParamFunc
            } // cooldown
        }, // testParamArgsWithoutContext
        // Stores all the notetag type result unit tests
        noteTypes: {
            // Core Module
            coreMax: "checkPositiveNum",
            coreActState: "checkBool",
            //
            isBarVisible: "checkBool", // (v0.04a+)Bar Module
            // (v0.04a+)Charge Module
            chargeMax: "checkPositiveNum",
            isPayBeforeExecCharge: "checkBool",
            canCancelCharge: "checkBool",
            canForceCharge: "checkBool",
            //
            // (v0.05a+)Cooldown Module
            cooldownMax: "checkPositiveNum",
            canCancelCooldown: "checkBool"
            //
        },
        //
        defaultNoteTypes: {
            // Core Module
            coreMax: "checkPositiveNum",
            coreActState: "checkInvalidVal",
            //
            isBarVisible: "checkBool", // (v0.04a+)Bar Module
            // (v0.04a+)Charge Module
            chargeMax: "checkPositiveNum",
            isPayBeforeExecCharge: "checkBool",
            canCancelCharge: "checkBool",
            canForceCharge: "checkBool",
            //
            // (v0.05a+)Cooldown Module
            cooldownMax: "checkPositiveNum",
            canCancelCooldown: "checkBool"
            //
        },
        // Stores all the chained notetag type result unit tests
        chainedNoteTypes: {
            coreMax: "checkPositiveNum", // Core Module
            isBarVisible: "checkBool", // (v0.04a+)Bar Module
            // (v0.04a+)Charge Module
            chargeMax: "checkPositiveNum",
            isPayBeforeExecCharge: "checkBool",
            canCancelCharge: "checkBool",
            canForceCharge: "checkBool",
            //
            // (v0.05a+)Cooldown Module
            cooldownMax: "checkPositiveNum",
            canCancelCooldown: "checkBool"
            //
        },
        //
        // Adding this' just to play safe
        noteChainingRules: {
            // Core Module
            coreMax: "checkChainNumRule",
            coreActState: "checkChainBoolRule",
            //
            isBarVisible: "checkChainBoolRule", // (v0.04a+)Bar Module
            // (v0.04a+)Charge Module
            chargeMax: "checkChainNumRule",
            isPayBeforeExecCharge: "checkChainBoolRule",
            canCancelCharge: "checkChainBoolRule",
            canForceCharge: "checkChainBoolRule",
            //
            // (v0.05a+)Cooldown Module
            cooldownMax: "checkChainNumRule",
            canCancelCooldown: "checkChainBoolRule"
            //
        },
        //
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
         * @since v0.00a @version v0.05a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkArray: function(val, param, context) {
            if (Array.isArray(val)) return true;
            SATBUT.showFailMsg(
                    val, param, "It should be an Array!", context);
            return false;
        }, // checkArray

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkArrayDataType: function(val, param, context) {
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
            ], context);
        }, // checkArrayDataType

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkArrayFactor: function(val, param, context) {
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
            ], context);
        }, // checkArrayFactor

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {<T>} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[<T>]} vals - The list of valid primitive values
         * @param {{*}} context - The context of the failed test
         */
        checkArrayVals: function(val, param, vals, context) {
            if (!SATBUT.checkFuncs.checkArray(val, param, context)) return;
            // The filter function doesn't use the original array
            var conds = [
                "These elements should be within " + vals + ":"
            ].concat(val.mapFilter(function(v, i) {
                return vals.contains(v) ? "" : v + " with index " + i;
            }, function(cond) { return cond; }));
            //
            if (conds.length > 1) SATBUT.showFailMsg(
                    JSON.stringify(val), param, conds.join("\n"), context);
        }, // checkArrayVals

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkBool: function(val, param, context) {
            if (val === !!val) return;
            SATBUT.showFailMsg(val, param, "It should be a Boolean!", context);
        }, // checkBool

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkChainBoolRule: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "first",
                "every",
                "some",
                "last"
            ], context);
        }, // checkChainBoolRule

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkChainNumRule: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "first",
                "+",
                "-",
                "*",
                "/",
                "%",
                "=",
                "last"
            ], context);
        }, // checkChainNumRule

        /**
         * Hotspot/No-op
         * @since v0.03a @version v0.03a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkColor: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkString(val, param, context)) return;
            // #0xrrggbb or #rrggbb
            if (!val.match(/^#(?:0x)?[0-9a-f]{6}$/)) SATBUT.showFailMsg(
                    val, param, "It should be a valid Color!", context);
            //
        }, // checkColor

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkCoreBaseFillUnit: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "coreBaseFillATBFrame",
                "coreBaseFillATBSec"
            ], context);
        }, // checkCoreBaseFillUnit

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkCoreTurnUnit: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "coreTurnATBTime",
                "coreTurnATBAct"
            ], context);
        }, // checkCoreTurnUnit

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkData: function(val, param, context) {
            var meta = val.meta;
            if (meta && meta.satb && meta.satb.datumType) return;
            SATBUT.showFailMsg(JSON.stringify(val), param,
                    "It should be a valid data!", context);
        }, // checkData

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {String} dataType - The type of the data of the actual value
         * @param {{*}} context - The context of the failed test
         */
        checkDataMeta: function(val, param, dataType, context) {
            var meta = val.meta;
            if (meta && meta.satb && SATBUT.isSameDataType(
                    meta.satb.datumType, dataType)) return;
            SATBUT.showFailMsg(JSON.stringify(val), param,
                    "It should be a valid " + dataType + " data!", context);
        }, // checkDataMeta

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkDataType: function(val, param, context) {
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
            ], context);
        }, // checkDataType

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkFactor: function(val, param, context) {
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
            ], context);
        }, // checkFactor

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The parameter function
         * @enum @param {Param} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkFunc: function(val, param, context) {
            if (typeof val === "function") return true;
            SATBUT.showFailMsg(
                    val, param, "func should be a function!", context);
            return false;
        }, // checkFunc

        /**
         * Hotspot/No-op
         * @since v0.02a @version v0.02a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkInt: function(val, param, context) {
            if (Number.isInteger(val)) return true;
            SATBUT.showFailMsg(
                    val, param, "It should be a nonnegative integer!", context);
            return false;
        }, // checkInt

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkInvalidVal: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [null, undefined], context);
        }, // checkInvalidVal

        /**
         * Hotspot/No-op
         * @since v0.04a @version v0.04a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkModule: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, [
                "IsCoreEnabled",
                "IsBarEnabled",
                "IsHotkeyEnabled",
                "IsWaitEnabled",
                "IsChargeEnabled",
                "IsCooldownEnabled"
            ], context);
        }, // checkModule

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNonnegativeInt: function(val, param, context) {
            if (val < 0 || !Number.isInteger(val)) SATBUT.showFailMsg(
                    val, param, "It should be a nonnegative integer!", context);
        }, // checkNonnegativeInt

        /**
         * Hotspot/No-op
         * @since v0.02a @version v0.02a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNonnegativeNum: function(val, param, context) {
            if (isNaN(val) || val < 0) SATBUT.showFailMsg(
                    val, param, "It should be a nonnegative Number!", context);
        }, // checkNonnegativeNum

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNaturalNum: function(val, param, context) {
            if (val > 0 && Number.isInteger(val)) return;
            SATBUT.showFailMsg(
                    val, param, "It should be a natural Number!", context);
        }, // checkNaturalNum

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNoteFactors: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkObj(val, param, context)) return;
            Object.keys(val).forEach(function(key) {
                SATBUT.checkFuncs.checkNoteType(key, param, context);
                SATBUT.checkFuncs.checkArrayFactor(val[key], param, context);
            });
        }, // checkNoteFactors

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNoteType: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param,
                    Object.keys(SATBUT.unitTests.noteTypes), context);
        }, // checkNoteType

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkNum: function(val, param, context) {
            if (!isNaN(val)) return;
            SATBUT.showFailMsg(val, param, "It should be a Number!", context);
        }, // checkNum

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkObj: function(val, param, context) {
            if (val && val.constructor === Object) return true;
            SATBUT.showFailMsg(val, param, "It should be an Object!", context);
            return false;
        }, // checkObj

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {Constructor} Type - The type of the actual parameter value
         * @param {{*}} context - The context of the failed test
         */
        checkObjType: function(val, param, Type, context) {
            if (val instanceof Type) return;
            SATBUT.showFailMsg(
                    val, param, "It should be a " + Type + "!", context);
        }, // checkObjType

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{String}} checkFuncs - The function to check each object val
         * @param {{*}} context - The context of the failed test
         */
        checkObjVals: function(val, param, checkFuncs, context) {
            // There's no need to check anything if there's no checkFunc
            if (!checkFuncs) return;
            if (!SATBUT.checkFuncs.checkObj(val, param, context)) return;
            Object.keys(checkFuncs).forEach(function(key) {
                SATBUT.checkFuncs[checkFuncs[key]](
                        val[key], param + "." + key, context);
            });
        }, // checkObjVals

        /**
         * Hotspot/No-op
         * @since v0.02a @version v0.02a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkOpacity: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkInt(val, param, context)) return;
            if (val < 0 || val > 255) SATBUT.showFailMsg(val, param,
                    "It should be an integer from 0 to 255 inclusive!",
                    context);
        }, // checkOpacity

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkPairFuncList: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkArray(val, param, context)) return;
            val.forEach(function(pairFunc) {
                SATBUT.checkFuncs.checkPairFunc(pairFunc, param, context);
            });
        }, // checkPairFuncList

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkPairFunc: function(val, param, context) {
            SATBUT.checkFuncs.checkBool(
                    val.canBind, param + " canBind", context);
            SATBUT.checkFuncs.checkData(val.datum, param + " datum", context);
            SATBUT.checkFuncs.checkFunc(
                    val.unboundFunc, param + " unboundFunc", context);
        }, // checkPairFunc

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkParam: function(module, param, context) {
            var m = SATBUT.unitTests.params[module];
            if (!m) {
                SATBUT.showFailMsg(module, "module",
                        "This module doesn't exist!", context);
                return false;
            }
            if (m[param]) return true;
            SATBUT.showFailMsg(param, "param", "This parameter doesn't exist" +
                    " in module " + module + "!", context);
            return false;
        }, // checkParam

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} func - The parameter function
         * @enum @param {Module} module - The module of parameter being tested
         * @enum @param {Param} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkParamFunc: function(func, module, param, context) {
            if (!SATBUT.checkFuncs.checkFunc(
                    func, module + "." + param, context)) return;
            if (!SATBUT.checkFuncs.checkParam(module, param, context)) return;
            var checkFunc = SATBUT.unitTests.params[module][param];
            var f = SATBUT.unitTests.testParamArgsWithoutContext[module][param];
            // Functions with contexts can only be checked in their call sites
            if (f) SATBUT.checkFuncs[checkFunc](
                    f(func), module + "." + param, context);
            //
        }, // checkParamFunc

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkPositiveNum: function(val, param, context) {
            if (isNaN(val) || val <= 0) SATBUT.showFailMsg(
                    val, param, "It should be a positive Number!", context);
        }, // checkPositiveNum

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkStateDataMeta: function(val, param, context) {
            SATBUT.checkFuncs.checkDataMeta(val, param, "states", context);
        }, // checkStateDataMeta

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         * @returns {Boolean} The check result
         */
        checkString: function(val, param, context) {
            if (typeof val === "string" || val instanceof String) return true;
            SATBUT.showFailMsg(val, param, "It should be a String!", context);
            return false;
        }, // checkString

        /**
         * Hotspot/No-op
         * @since v0.01a @version v0.01a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkStringArray: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkArray(val, param, context)) return;
            val.forEach(function(v, i) {
                SATBUT.checkFuncs.checkString(
                        v, param + " " + i + "th elem", context);
            });
        }, // checkStringArray

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkSwitchVar: function(val, param, context) {
            SATBUT.checkFuncs.checkVal(val, param, ["switch", "var"], context);
        }, // checkSwitchVar

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[*]} vals - The list of valid values
         * @param {{*}} context - The context of the failed test
         */
        checkVal: function(val, param, vals, context) {
            if (vals.contains(val)) return;
            SATBUT.showFailMsg(
                    val, param, "It should be within " + vals + "!", context);
        }, // checkVal

        /**
         * Hotspot/No-op
         * @since v0.00a @version v0.00a
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {{*}} context - The context of the failed test
         */
        checkVarName: function(val, param, context) {
            if (!SATBUT.checkFuncs.checkString(val, param, context)) return;
            if (!val) return SATBUT.showFailMsg(
                    val, param, "It should be a non empty String!", context);
            if (!val[0].match(/[A-Za-z_]/) || !val.slice(1).match(/^\w*$/)) {
                SATBUT.showFailMsg(val, param, "It should be a String having" +
                        " alphanumeric characters only" +
                        "(The 1st one can't be a number)!", context);
            }
        }, // checkVarName

    }; // SATBUT.checkFuncs
    //

})(DoubleX_RMMV.SATB.Unit_Tests);

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
                id, "_DM.updateSATBNoteScriptInVar id", {});
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
        SATBUT.checkFuncs.checkString(funcContent,
                "DM.new._checkFuncContentNoteType funcContent", {});
        SATBUT.checkFuncs.checkNoteType(
                noteType, "DM.new._checkFuncContentNoteType noteType", {});
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
        SATBUT.checkFuncs.checkNoteType(noteType,
                "DM.new._checkNoteTypeSwitchVarIdDataTypes noteType", {});
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(switchVar_,
                "DM.new._checkNoteTypeSwitchVarIdDataTypes switchVar_", {});
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "DM.new._checkNoteTypeSwitchVarIdDataTypes id_", {});
        if (!dataTypes_) return;
        // _SATB._updateAllSwitchVarIds sets dataTypes_ as ["result"] correctly
        var dataTypes = dataTypes_.filter(function(dataType) {
            return dataType !== "result";
        });
        //
        SATBUT.checkFuncs.checkArrayDataType(dataTypes,
                "DM.new._checkNoteTypeSwitchVarIdDataTypes dataTypes_", {});
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
            "<satb coreMax val: -102.4>",
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
                    "It should be able to read coreMax notetags!", {});
        } else {
            var firstCoreMax = coreMax[0];
            if (firstCoreMax.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreMax notetag should be cfg!",
                        {});
            }
            if (firstCoreMax.entry1 !== "CMATB_MAX") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 1st coreMax notetag should be " +
                        "CMATB_MAX!", {});
            }
            var secondCoreMax = coreMax[1];
            if (secondCoreMax.suffix1 !== "val") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 2nd coreMax notetag should be val!",
                        {});
            }
            if (secondCoreMax.entry1 !== "-102.4") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 2nd coreMax notetag should be 100!",
                        {});
            }
            var thirdCoreMax = coreMax[2];
            if (thirdCoreMax.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 3rd coreMax notetag should be " +
                        "eval!", {});
            }
            if (thirdCoreMax.entry1 !== "return 999.0 / this.agi;") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 3rd coreMax notetag should be " +
                        "return 999.0 / this.agi;!", {});
            }
            if (coreMax[3]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 3 coreMax notetags!", {});
            }
        }
        var coreActsState = satb.coreActsState;
        if (!coreActsState) {
            SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                    "It should be able to read coreActsState notetags" +
                    "(even if it's invalid)!", {});
        } else {
            var firstCoreActsState = coreActsState[0];
            if (firstCoreActsState.suffix1 !== "cfg") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreActsState notetag should " +
                        "be cfg!", {});
            }
            if (firstCoreActsState.entry1 !== "CASX_FALSE") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The entry of the 1st coreActsState notetag should " +
                        "be CASX_FALSE(even if no such NOTEX exists)!", {});
            }
            if (coreActsState[1]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 1 coreActsState " +
                        "notetag!", {});
            }
        }
        var coreActState = satb.coreActState;
        if (!coreActState) {
            SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                    "It should be able to read coreActState notetags!", {});
        } else {
            var firstCoreActState = coreActState[0];
            if (firstCoreActState.suffix1 !== "eval") {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "The suffix of the 1st coreActState notetag should " +
                        "be eval!", {});
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
                        ].join("\n"), {});
            }
            if (coreActState[1]) {
                SATBUT.showFailMsg(satbLines, "SATB.DataManager.new._readNote",
                        "There shouldn't be more than 1 coreActState notetag!",
                        {});
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
                    "_SATB.switchIds should've the game switch with id 1!", {});
        } else {
            var coreActState = switchId1.coreActState;
            if (!coreActState) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 1 should've mapped to " +
                        "the notetag type coreActState in _SATB.switchIds!",
                        {});
            } else {
                // switch only changes the cached notetag value but not the list
                if (coreActState[0] !== "result") {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote", "The 1st data " +
                            "type of the notetag type coreActState mapped by" +
                            " the game switch with id 1 in _SATB.switchIds " +
                            "should be result!", {});
                }
                //
                if (coreActState.length > 1) {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreActState mapped by the " +
                            "game switch with id 1 in _SATB.switchIds!", {});
                }
            }
            if (Object.keys(switchId1).length > 1) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 1 shouldn't have mapped to " +
                        "more than 1 notetag types in _SATB.switchIds!", {});
            }
        }
        var switchId2 = _SATB.switchIds["2"];
        if (!switchId2) {
            SATBUT.showFailMsg(switchIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.switchIds should've the game switch with id 2!", {});
        } else {
            var coreActState = switchId2.coreActState;
            if (!coreActState) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 2 should've mapped to " +
                        "the notetag type coreActState in _SATB.switchIds!",
                        {});
            } else {
                // switch only changes the cached notetag value but not the list
                if (coreActState[0] !== "result") {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type " +
                            "coreActState mapped by the game switch with id " +
                            "2 in _SATB.switchIds should be result!", {});
                }
                //
                if (coreActState.length > 1) {
                    SATBUT.showFailMsg(switchIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreActState mapped by the " +
                            "game switch with id 2 in _SATB.switchIds!", {});
                }
            }
            if (Object.keys(switchId2).length > 1) {
                SATBUT.showFailMsg(switchIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game switch with id 2 shouldn't have mapped to " +
                        "more than 1 notetag types in _SATB.switchIds!", {});
            }
        }
        if (Object.keys(_SATB.switchIds).length > 2) {
            SATBUT.showFailMsg(switchIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.switchIds shouldn't have more than 2 game " +
                    "switches!", {});
        }
        var varId1 = _SATB.varIds["1"];
        if (!varId1) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 1!", {});
        } else {
            var coreMax = varId1.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 1 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!", {});
            } else {
                // var only changes the cached notetag value but not the list
                if (coreMax[0] !== "result") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 1 in " +
                            "_SATB.varIds should be result!", {});
                }
                //
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 1 in _SATB.varIds!", {});
                }
            }
            if (Object.keys(varId1).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 1 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!", {});
            }
        }
        var varId2 = _SATB.varIds["2"];
        if (!varId2) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 2!", {});
        } else {
            var coreMax = varId2.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 2 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!", {});
            } else {
                if (coreMax[0] !== "skills") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 2 in " +
                            "_SATB.varIds should be skills!", {});
                }
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 2 in _SATB.varIds!", {});
                }
            }
            if (Object.keys(varId2).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 2 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!", {});
            }
        }
        var varId3 = _SATB.varIds["3"];
        if (!varId3) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds should've the game variable with id 3!", {});
        } else {
            var coreMax = varId3.coreMax;
            if (!coreMax) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 3 should've mapped to the" +
                        " notetag type coreMax in _SATB.varIds!", {});
            } else {
                if (coreMax[0] !== "result") {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "The 1st data type of the notetag type coreMax " +
                            "mapped by the game variable with id 3 in " +
                            "_SATB.varIds should be skills!", {});
                }
                if (coreMax.length > 1) {
                    SATBUT.showFailMsg(varIdLines,
                            "SATB.DataManager.new._readNote",
                            "There shouldn't be more than 1 data types of " +
                            "the notetag type coreMax mapped by the game " +
                            "variable with id 3 in _SATB.varIds!", {});
                }
            }
            if (Object.keys(varId3).length > 1) {
                SATBUT.showFailMsg(varIdLines,
                        "SATB.DataManager.new._readNote",
                        "The game variable with id 3 shouldn't have mapped " +
                        "to more than 1 notetag types in _SATB.varIds!", {});
            }
        }
        if (Object.keys(_SATB.varIds).length > 3) {
            SATBUT.showFailMsg(varIdLines, "SATB.DataManager.new._readNote",
                    "_SATB.varIds shouldn't have more than 3 game " +
                    "variables!", {});
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
        SATBUT.checkFuncs.checkObjType(actor, "_BM.addSATBInputableActor " +
                "actor " + actor.name(), Game_Actor, {});
        //
    }; // BattleManager.addSATBInputableActor

    _BM.addSATBActBattler = BattleManager.addSATBActBattler;
    _UT.addSATBActBattler = BattleManager.addSATBActBattler = function(battler) {
    // v0.00a - v0.00a; Extended
        _BM.addSATBActBattler.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(
                battler, "_BM.addSATBActBattler battler", Game_Battler, {});
        //
    }; // BattleManager.addSATBActBattler

    _BM.eraseSATBInputableActor = BattleManager.eraseSATBInputableActor;
    _UT.eraseSATBInputableActor = BattleManager.eraseSATBInputableActor = function(actor) {
    // v0.00a - v0.00a; Extended
        _BM.eraseSATBInputableActor.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(actor, "_BM.eraseSATBInputableActor " +
                "actor " + actor.name(), Game_Actor, {});
        //
    }; // BattleManager.eraseSATBInputableActor

    _BM.eraseSATBActBattler = BattleManager.eraseSATBActBattler;
    _UT.eraseSATBActBattler = BattleManager.eraseSATBActBattler = function(battler) {
    // v0.00a - v0.00a; Extended
        _BM.eraseSATBActBattler.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkObjType(
                battler, "_BM.eraseSATBActBattler battler", Game_Battler, {});
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
                "_BM.raiseRefreshedSATBMemChangeFactors noteFactors", {});
        //
    }; // BattleManager.raiseRefreshedSATBMemChangeFactors

    _BM.isUnselectedSATBInputableActor = BattleManager.isUnselectedSATBInputableActor;
    _UT.isUnselectedSATBInputableActor = BattleManager.isUnselectedSATBInputableActor = function(actor_) {
    // v0.04a - v0.04a; Extended
        var result = _BM.isUnselectedSATBInputableActor.apply(this, arguments);
        // Added to check the argument and result of this public api
        SATBUT.checkFuncs.checkObjType(actor_,
                "_BM.isUnselectedSATBInputableActor actor_", Game_Actor, {});
        // Checking result as well would be tautological
        return result;
    }; // BattleManager.isUnselectedSATBInputableActor

    _BM.canInputSATB = BattleManager.canInputSATB;
    _UT.canInputSATB = BattleManager.canInputSATB = function(actor) {
    // v0.04a - v0.04a; Extended
        var canInput = _BM.canInputSATB.apply(this, arguments);
        // Added to check the argument and result of this public api
        SATBUT.checkFuncs.checkObjType(
                actor, "_BM.canInputSATB actor", Game_Actor, {});
        // Checking canInput as well would be tautological
        return canInput;
    }; // BattleManager.canInputSATB

    _BM._sortActBattlers = _SATB._sortActBattlers;
    _UT._sortActBattlers = _SATB._sortActBattlers = function() {
    // v0.00a - v0.00a; Extended
        _BM._sortActBattlers.apply(this, arguments);
        // Added to check whether the battlers in this queue's properly sorted
        _UT._checkSortActBattlers.call(this);
        //
    }; // _SATB._sortActBattlers

    /**
     * The this pointer is BattleManager
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    _UT._checkNoteFactors = function(note, factors) {
        SATBUT.checkFuncs.checkNoteType(
                note, "BM.new._checkNoteFactors note", {});
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "BM.new._checkNoteFactors factors", {});
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
            if (prev.latestSATBItem_.speed < battler.latestSATBItem_.speed) {
                SATBUT.showFailMsg(prev.name() + " " + battler.name(),
                        "BM.new._checkSortActBattlers prev battler",
                        "The action execution queue should be sorted " +
                        "descendingly by the battler action speed!", {
                            _actionBattlers: this._actionBattlers
                        });
            }
            //
        });
    }; // _UT._checkSortActBattlers

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // BattleManager

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: SATBTurnManager
 *      - Tests all SATBTurnManager preconds, postconds and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var SATBTM = SATB.SATBTurnManager.unitTests = { orig: {}, new: {} };
    var _SATBTM = SATBTM.orig, _UT = SATBTM.new;

    _SATBTM.multiplyTurnClockAct = SATBTurnManager.multiplyTurnClockAct;
    _UT.multiplyTurnClockAct = SATBTurnManager.multiplyTurnClockAct = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _SATBTM.multiplyTurnClockAct.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_SATBTM.multiplyTurnClockAct multiplier", {});
        //
    }; // SATBTurnManager.multiplyTurnClockAct

    _SATBTM.multiplyTurnClockFrame = SATBTurnManager.multiplyTurnClockFrame;
    _UT.multiplyTurnClockFrame = SATBTurnManager.multiplyTurnClockFrame = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _SATBTM.multiplyTurnClockFrame.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_SATBTM.multiplyTurnClockFrame multiplier", {});
        //
    }; // SATBTurnManager.multiplyTurnClockFrame

    _SATBTM.multiplyTurnClockSec = SATBTurnManager.multiplyTurnClockSec;
    _UT.multiplyTurnClockSec = SATBTurnManager.multiplyTurnClockSec = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _SATBTM.multiplyTurnClockSec.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_SATBTM.multiplyTurnClockSec multiplier", {});
        //
    }; // SATBTurnManager.multiplyTurnClockSec

    _SATBTM.setTurnClockAct = SATBTurnManager.setTurnClockAct;
    _UT.setTurnClockAct = SATBTurnManager.setTurnClockAct = function(act) {
    // v0.04a - v0.04a; Extended
        _SATBTM.setTurnClockAct.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkInt(act, "_SATBTM.setTurnClockAct act", {});
        //
    }; // SATBTurnManager.setTurnClockAct

    _SATBTM.setTurnClockFrame = SATBTurnManager.setTurnClockFrame;
    _UT.setTurnClockFrame = SATBTurnManager.setTurnClockFrame = function(frame) {
    // v0.04a - v0.04a; Extended
        _SATBTM.setTurnClockFrame.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkInt(
                frame, "_SATBTM.setTurnClockFrame frame", {});
        //
    }; // SATBTurnManager.setTurnClockFrame

    _SATBTM.setTurnClockSec = SATBTurnManager.setTurnClockSec;
    _UT.setTurnClockSec = SATBTurnManager.setTurnClockSec = function(sec) {
    // v0.04a - v0.04a; Extended
        _SATBTM.setTurnClockSec.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(sec, "_SATBTM.setTurnClockSec sec", {});
        //
    }; // SATBTurnManager.setTurnClockSec

    _SATBTM.addCoreTurnClockAct = SATBTurnManager.addCoreTurnClockAct;
    _UT.addCoreTurnClockAct = SATBTurnManager.addCoreTurnClockAct = function(increment) {
    // v0.04a - v0.04a; Extended
        _SATBTM.addCoreTurnClockAct.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_SATBTM.addCoreTurnClockAct increment", {});
        // checkNum should be used over checkInt due to possibly Num multiplier
    }; // SATBTurnManager.addCoreTurnClockAct

    _SATBTM.addCoreTurnClockFrame = SATBTurnManager.addCoreTurnClockFrame;
    _UT.addCoreTurnClockFrame = SATBTurnManager.addCoreTurnClockFrame = function(increment) {
    // v0.04a - v0.04a; Extended
        _SATBTM.addCoreTurnClockFrame.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_SATBTM.addCoreTurnClockFrame increment", {});
        // checkNum should be used over checkInt due to possibly Num multiplier
    }; // SATBTurnManager.addCoreTurnClockFrame

    _SATBTM.addCoreTurnClockSec = SATBTurnManager.addCoreTurnClockSec;
    _UT.addCoreTurnClockSec = SATBTurnManager.addCoreTurnClockSec = function(increment) {
    // v0.04a - v0.04a; Extended
        _SATBTM.addCoreTurnClockSec.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_SATBTM.addCoreTurnClockSec increment", {});
        //
    }; // SATBTurnManager.addCoreTurnClockSec

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // BattleManager

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: SATBManager
 *      - Tests all SATBManager preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var SATBM = SATB.SATBManager.unitTests = { orig: {}, new: {} };
    var _SATBM = SATBM.orig, _UT = SATBM.new;

    _SATBM.areModulesEnabled = SATBManager.areModulesEnabled;
    _UT.areModulesEnabled = SATBManager.areModulesEnabled = function(modules) {
    // v0.04a - v0.04a; Extended
        var areEnabled = _SATBM.areModulesEnabled.apply(this, arguments);
        // Added to check the argument of this public api
        modules.forEach(function(module) {
            SATBUT.checkFuncs.checkModule(
                    module, "SATBM.new._checkAreModulesEnabled module", {});
        });
        // Check areEnabled as well would be tautological
        return areEnabled;
    }; // SATBManager.areModulesEnabled

    _SATBM.updateNoteDefault = SATBManager.updateNoteDefault;
    _UT.updateNoteDefault = SATBManager.updateNoteDefault = function(note, switchVar_, id_, dataTypes_) {
    // v0.04a - v0.04a; Extended
        _SATBM.updateNoteDefault.apply(this, arguments);
        // Added to check the arguments of this public api
        _UT._checkUpdateNoteDefault.call(
                this, note, switchVar_, id_, dataTypes_);
        //
    }; // SATBManager.updateNoteDefault

    _SATBM.updateNoteChainingRule = SATBManager.updateNoteChainingRule;
    _UT.updateNoteChainingRule = SATBManager.updateNoteChainingRule = function(note) {
    // v0.04a - v0.04a; Extended
        _SATBM.updateNoteChainingRule.apply(this, arguments);
        // Added to check the argument of this public api
            SATBUT.checkFuncs.checkNoteType(
                    note, "_SATBM.updateNoteChainingRule note", {});
        //
     }; // SATBManager.updateNoteChainingRule

    _SATBM.updateNotePriorities = SATBManager.updateNotePriorities;
    _UT.updateNotePriorities = SATBManager.updateNotePriorities = function(note) {
    // v0.04a - v0.04a; Extended
        _SATBM.updateNotePriorities.apply(this, arguments);
        // Added to check the argument of this public api
            SATBUT.checkFuncs.checkNoteType(
                    note, "_SATBM.updateNotePriorities note", {});
        //
    }; // SATBManager.updateNotePriorities

    _SATBM.canSelectPrevNextActor = SATBManager.canSelectPrevNextActor;
    _UT.canSelectPrevNextActor = SATBManager.canSelectPrevNextActor = function(inputableIndices) {
    // v0.04a - v0.04a; Extended
        var canSelect = _SATBM.canSelectPrevNextActor.apply(this, arguments);
        // Added to check the argument of this public api
        inputableIndices.forEach(function(i) {
            SATBUT.checkFuncs.checkNonnegativeInt(
                    i, "_SATBM._checkCanSelectPrevNextActor i", {});
        });
        // There's no meaningful check for canSelect
        return canSelect;
     }; // SATBManager.canSelectPrevNextActor

    _SATBM.newInputableActorIndex = SATBManager.newInputableActorIndex;
    _UT.newInputableActorIndex = SATBManager.newInputableActorIndex = function(sign, inputableIndices) {
    // v0.04a - v0.04a; Extended
        var i = _SATBM.newInputableActorIndex.apply(this, arguments);
        // Added to check the argument of this public api
        _UT._checkNewInputableActorIndex.call(this, sign, inputableIndices, i);
        //
        return i;
    }; // SATBManager.newInputableActorIndex

    /**
     * The this pointer is SATBManager
     * No-op
     * @interface @since v0.04a @version v0.04a
     * @param {NoteType} note - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _UT._checkUpdateNoteDefault = function(note, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkNoteType(
                note, "SATBM.new._checkUpdateNoteDefault note", {});
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(
                switchVar_, "SATBM.new._checkUpdateNoteDefault switchVar_", {});
        if (id_) SATBUT.checkFuncs.checkNonnegativeInt(
                id_, "SATBM.new._checkUpdateNoteDefault id_", {});
        if (dataTypes_) SATBUT.checkFuncs.checkArrayDataType(
                dataTypes_, "SATBM.new._checkUpdateNoteDefault dataTypes_", {});
    }; // SATBManager.updateNoteDefault

    /**
     * The this pointer is SATBManager
     * Potential Hotspot/No-op
     * @interface @since v0.04a @version v0.04a
     * @enum @param {Integer} sign - The selection iteration direction(1/-1)
     * @param {[Index]} inputableIndices - The inputable actor indices
     * @param {Index} i - The index of the new inputable actor to input actions
     */
    _UT._checkNewInputableActorIndex = function(sign, inputableIndices, i) {
        if (sign !== 1 && sign !== -1) SATBUT.showFailMsg(sign,
                "_SATBM._checkNewInputableActorIndex sign",
                "sign should be either 1 or -1!", {});
        inputableIndices.forEach(function(i) {
            SATBUT.checkFuncs.checkNonnegativeInt(
                    i, "_SATBM._checkNewInputableActorIndex i", {});
        });
        SATBUT.checkFuncs.checkNonnegativeInt(
                i, "_SATBM._checkNewInputableActorIndex index", {});
    }; // _UT._checkNewInputableActorIndex

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // SATBManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Tests the stored parameter and notetag values
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var GS = SATB.Game_System.unitTests = { orig: {}, new: {} };
    var _SATB = SATB.Game_System.new, $ = Game_System.prototype;
    var _GS = GS.orig, _UT = GS.new;

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
        // Added to check the arguments of this public api
        _UT._checkSetSATBParam(param, funcContent, switchVar_, id_, dataTypes_);
        //
    }; // $.setSATBParam

    _GS.satbNote = $.satbNote;
    _UT.satbNote = $.satbNote = function(noteType, name) {
    // v0.00a - v0.00a; Extended
        var funcContent = _GS.satbNote.apply(this, arguments);
        // Added to check the validity of this raw parameter value
        _UT._checkNoteTypeNameFuncContent.call(
                this, noteType, name, funcContent);
        //
        return funcContent;
    }; // $.satbNote

    _GS.setSATBNote = $.setSATBNote;
    _UT.setSATBNote = $.setSATBNote = function(noteType, name, funcContent, switchVar_, id_, dataTypes_) {
     // v0.04a - v0.04a; Extended
        _GS.setSATBNote.apply(this, arguments);
        // Added to check the arguments of this public api
        _UT._checkSetSATBNote(
                noteType, name, funcContent, switchVar_, id_, dataTypes_);
        //
    }; // $.setSATBNote

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
        SATBUT.checkFuncs.checkParam(module, param, {});
        //
        if (!_SATB._IS_FUNC_PARAM(param)) {
            SATBUT.showFailMsg(param, "GS.new._checkParamFunc param", "Only " +
                    "parameters storing function contents as their values " +
                    "should call satbParamFunc!", {});
        }
        SATBUT.checkFuncs.checkParamFunc(func, module, param, {});
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
        SATBUT.checkFuncs.checkParam(module, param, {});
        //
        var name = "params." + module + "." + param;
        SATBUT.checkFuncs[SATBUT.unitTests.params[module][param]](
                val, name, {});
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
    _UT._checkSetSATBParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkParam(_SATB._PARAM_MODULES[param], param, {});
        if (_SATB._IS_FUNC_PARAM(param)) SATBUT.checkFuncs.checkString(
                funcContent, "GS.new._checkSetSATBParam funcContent", {});
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(
                switchVar_, "GS.new._checkSetSATBParam switchVar_", {});
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "GS.new._checkSetSATBParam id_", {});
        if (dataTypes_) SATBUT.checkFuncs.checkArrayDataType(
                dataTypes_, "GS.new._checkSetSATBParam dataTypes_", {});
    }; // _UT._checkSetSATBParam

    /**
     * The this pointer is Game_System.prototype
     * No-op
     * @since v0.04a @version v0.04a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _UT._checkSetSATBNote = function(noteType, name, funcContent, switchVar_, id_, dataTypes_) {
        SATBUT.checkFuncs.checkNoteType(
                noteType, "GS.new._checkSetSATBNote noteType", {});
        SATBUT.checkFuncs.checkString(
                name, "GS.new._checkSetSATBNote name", {});
        SATBUT.checkFuncs.checkString(
                funcContent, "GS.new._checkSetSATBNote funcContent", {});
        if (switchVar_) SATBUT.checkFuncs.checkSwitchVar(
                switchVar_, "GS.new._checkSetSATBNote switchVar_", {});
        if (id_) SATBUT.checkFuncs.checkNaturalNum(
                id_, "GS.new._checkSetSATBParam id_", {});
        if (dataTypes_) SATBUT.checkFuncs.checkArrayDataType(
                dataTypes_, "GS.new._checkSetSATBNote dataTypes_", {});
    }; // _UT._checkSetSATBNote

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
                noteType, "GS.new._checkNoteTypeNameFuncContent noteType", {});
        SATBUT.checkFuncs.checkVarName(
                name, "GS.new._checkNoteTypeNameFuncContent name", {});
        SATBUT.checkFuncs.checkString(funcContent,
                "GS.new._checkNoteTypeNameFuncContent funcContent", {});
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
        ], {});
        //
    }; // $.updateSATBStateTurns

    _GBB.eraseCoreSATBActs = $.eraseCoreSATBActs;
    _UT.eraseCoreSATBActs = $.eraseCoreSATBActs = function() {
    // v0.04a - v0.04a; Extended
        _GBB.eraseCoreSATBActs.apply(this, arguments);
        // Added to ensure this battler won't be inputable nor able to exec act
        _UT._checkOnNoFullATB.call(this);
        // This must be placed here or the check will be all wrong
    }; // $.eraseCoreSATBActs

    _GBB.onToggleAutoInputSATBActs = $.onToggleAutoInputSATBActs;
    _UT.onToggleAutoInputSATBActs = $.onToggleAutoInputSATBActs = function() {
    // v0.00a - v0.00a; Extended
        _GBB.onToggleAutoInputSATBActs.apply(this, arguments);
        // Added to ensure this battler won't be inputable nor able to exec act
        _UT._checkOnNoFullATB.call(this);
        // This must be placed here or the check will be all wrong
    }; // $.onToggleAutoInputSATBActs

    /**
     * The this pointer is Game_BattlerBase.prototype
     * No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkOnNoFullATB = function() {
        if (BattleManager._satb.inputableActors.contains(this)) {
            SATBUT.showFailMsg(this.name(),
                    "GBB.new._checkOnToggleAutoInputSATBActs",
                    "A battler right after not having full ATB shouldn't be " +
                    "inputable!", {
                        coreSATB: this.coreSATB(),
                        coreMaxSATB: this.coreMaxSATB(),
                        isSATBFill: this.isSATBFill(),
                        chargeSATB: this.chargeSATB(),
                        chargeMaxSATB: this.chargeMaxSATB(),
                        isSATBCharge: this.isSATBCharge(),
                        cooldownSATB: this.cooldownSATB(),
                        cooldownMaxSATB: this.cooldownMaxSATB(),
                        isSATBCooldown: this.isSATBCooldown(),
                        satbActTimes: this.satbActTimes(),
                        currentAction: this.currentAction(),
                        latestSATBItem_: this.latestSATBItem_
                    });
        }
        if (!BattleManager._actionBattlers.contains(this)) return;
        SATBUT.showFailMsg(this.name(),
                "GBB.new._checkOnToggleAutoInputSATBActs",
                "A battler right after not having full ATB shouldn't be able" +
                " to execute actions!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    isSATBFill: this.isSATBFill(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    isSATBCharge: this.isSATBCharge(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    isSATBCooldown: this.isSATBCooldown(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction(),
                    latestSATBItem_: this.latestSATBItem_
                });
    }; // _UT._checkOnNoFullATB

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
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNoteFactors(noteFactors,
                "_GB.raiseSATBChangeFactorsWithRefresh noteFactors", {});
        //
    }; // $.raiseSATBChangeFactorsWithRefresh

    _GB.setStartSATB = $.setStartSATB;
    _UT.setStartSATB = $.setStartSATB = function(val) {
    // v0.00a - v0.00a; Extended
        _GB.setStartSATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(val, "_GB.setStartSATB val", {});
        //
    }; // $.setStartSATB

    _GB.fillSATB = $.fillSATB;
    _UT.fillSATB = $.fillSATB = function(fillRate) {
    // v0.00a - v0.00a; Extended
        _GB.fillSATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(fillRate, "_GB.fillSATB fillRate", {});
        //
    }; // $.fillSATB

    _GB.baseCoreMaxSATB = $.baseCoreMaxSATB;
    _UT.baseCoreMaxSATB = $.baseCoreMaxSATB = function() {
    // v0.00a - v0.00a; Extended
        var baseCoreMax = _GB.baseCoreMaxSATB.apply(this, arguments);
        // Added to test the validity of returned maximum ATB value of battler
        SATBUT.checkFuncs[SATBUT.unitTests.params.core.coreMaxATBVal](
                baseCoreMax, "_GB.baseCoreMaxSATB baseCoreMax", {});
        // Functions with contexts can only be tested on the call sites
        return baseCoreMax;
    }; // $.baseCoreMaxSATB

    _GB.baseChargeMaxSATB = $.baseChargeMaxSATB;
    _UT.baseChargeMaxSATB = $.baseChargeMaxSATB = function() {
    // v0.04a - v0.04a; Extended
        var baseChargeMax = _GB.baseChargeMaxSATB.apply(this, arguments);
        // Added to test the validity of returned maximum ATB value of battler
        SATBUT.checkFuncs[SATBUT.unitTests.params.charge.chargeMaxATBVal](
                baseChargeMax, "_GB.baseChargeMaxSATB baseChargeMax", {});
        // Functions with contexts can only be tested on the call sites
        return baseChargeMax;
    }; // $.baseChargeMaxSATB

    _GB.baseCooldownMaxSATB = $.baseCooldownMaxSATB;
    _UT.baseCooldownMaxSATB = $.baseCooldownMaxSATB = function() {
    // v0.05a - v0.05a; Extended
        var baseCooldownMax = _GB.baseCooldownMaxSATB.apply(this, arguments);
        // Added to test the validity of returned maximum ATB value of battler
        SATBUT.checkFuncs[SATBUT.unitTests.params.cooldown.cooldownMaxATBVal](
                baseCooldownMax, "_GB.baseCooldownMaxSATB baseCooldownMax", {});
        // Functions with contexts can only be tested on the call sites
        return baseCooldownMax;
    }; // $.baseCooldownMaxSATB

    _GB.didSATBInput = $.didSATBInput;
    _UT.didSATBInput = $.didSATBInput = function() {
    // v0.05a - v0.05a; Extended
        // Added to test whether the battler's not charging nor cooling down ATB
        _UT._checkWillSATBInput.call(this);
        //
        _GB.didSATBInput.apply(this, arguments);
    }; // $.didSATBInput

    _GB.onBecomeSATBActable = $.onBecomeSATBActable;
    _UT.onBecomeSATBActable = $.onBecomeSATBActable = function() {
    // v0.00a - v0.00a; Extended
        _GB.onBecomeSATBActable.apply(this, arguments);
        _UT._checkLatestItem.call(this);
    }; // $.onBecomeSATBActable

    _GB.onAllSATBActsEnd = $.onAllSATBActsEnd;
    _UT.onAllSATBActsEnd = $.onAllSATBActsEnd = function() {
    // v0.05a - v0.05a; Extended
        // Added to test whether the battler's charging ATB
        _UT._checkWillAllSATBActsEnd.call(this);
        //
        _GB.onAllSATBActsEnd.apply(this, arguments);
        // Added to test whether the battler's cooling down ATB
        _UT._checkDidAllSATBActsEnd.call(this);
        //
    }; // $.onAllSATBActsEnd

    _GB.initCoreSATBActs = $.initCoreSATBActs;
    _UT.initCoreSATBActs = $.initCoreSATBActs = function(atbVal) {
    // v0.00a - v0.00a; Extended
        _GB.initCoreSATBActs.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(atbVal, "_GB.initCoreSATBActs atbVal", {});
        //
    }; // $.initCoreSATBActs

    _GB.addSATBActTimes = $.addSATBActTimes;
    _UT.addSATBActTimes = $.addSATBActTimes = function(increment) {
    // v0.04a - v0.04a; Extended
        _GB.addSATBActTimes.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkInt(
                increment, "_GB.addSATBActTimes increment", {});
        //
    }; // $.addSATBActTimes

    _GB.multiplySATBActTimes = $.multiplySATBActTimes;
    _UT.multiplySATBActTimes = $.multiplySATBActTimes = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _GB.multiplySATBActTimes.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkInt(
                multiplier, "_GB.multiplySATBActTimes multiplier", {});
        //
    }; // $.multiplySATBActTimes

    _GB.setSATBActTimes = $.setSATBActTimes;
    _UT.setSATBActTimes = $.setSATBActTimes = function(actTimes) {
    // v0.04a - v0.04a; Extended
        _GB.setSATBActTimes.apply(this, arguments);
        // Added to check the argument of this public api
        SATBUT.checkFuncs.checkInt(
                actTimes, "_GB.setSATBActTimes actTimes", {});
        //
    }; // $.setSATBActTimes

    _GB.onCancelSATBCharge = $.onCancelSATBCharge;
    _UT.onCancelSATBCharge = $.onCancelSATBCharge = function() {
    // v0.04a - v0.04a; Extended
        _GB.onCancelSATBCharge.apply(this, arguments);
        // Added to ensure this battler won't be inputable nor able to exec act
        _UT._checkOnCancelSATBCharge.call(this);
        // This must be placed here or the check will be all wrong
    }; // $.onCancelSATBCharge

    /**
     * The this pointer is Game_Battler.prototype
     * No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkWillSATBInput = function() {
        if (this.isSATBFill()) return;
        SATBUT.showFailMsg(this.name(), "GB.new._checkWillSATBInput",
                "A battler right before finishing inputting actions " +
                "shouldn't be charging nor cooling down ATB!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    isSATBCharge: this.isSATBCharge(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    isSATBCooldown: this.isSATBCooldown(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction(),
                    latestSATBItem_: this.latestSATBItem_
                });
    }; // _UT._checkWillSATBInput

    /**
     * The this pointer is Game_Battler.prototype
     * No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkLatestItem = function() {
        if (this.latestSATBItem_) return;
        SATBUT.showFailMsg(this.name(), "GB.new._checkLatestItem",
                "A battler becoming actable should have an action to be " +
                "exeucted!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    isSATBFill: this.isSATBFill(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    isSATBCharge: this.isSATBCharge(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    isSATBCooldown: this.isSATBCooldown(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction()
                });
    }; // _UT._checkLatestItem

    /**
     * The this pointer is Game_Battler.prototype
     * No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkWillAllSATBActsEnd = function() {
        if (this.isSATBCharge()) return;
        SATBUT.showFailMsg(this.name(), "GB.new._checkWillSATBInput",
                "A battler right before finishing executing actions " +
                "should be charging ATB!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    isSATBFill: this.isSATBFill(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    isSATBCooldown: this.isSATBCooldown(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction(),
                    latestSATBItem_: this.latestSATBItem_
                });
    }; // _UT._checkWillAllSATBActsEnd

    /**
     * The this pointer is Game_Battler.prototype
     * No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkDidAllSATBActsEnd = function() {
        if (this.isSATBCooldown()) return;
        SATBUT.showFailMsg(this.name(), "GB.new._checkWillSATBInput",
                "A battler right before finishing inputting actions " +
                "shouldn't be charging nor cooling down ATB!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    isSATBFill: this.isSATBFill(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    isSATBCharge: this.isSATBCharge(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction(),
                    latestSATBItem_: this.latestSATBItem_
                });
    }; // _UT._checkDidAllSATBActsEnd

    /**
     * The this pointer is Game_Battler.prototype
     * No-op
     * @since v0.04a @version v0.04a
     */
    _UT._checkOnCancelSATBCharge = function() {
        if (BattleManager._satb.inputableActors.contains(this)) {
            SATBUT.showFailMsg(this.name(),
                    "GB.new._checkOnCancelSATBCharge",
                    "A battler right after cancelling ATB charge shouldn't " +
                    "be inputable!", {
                        coreSATB: this.coreSATB(),
                        coreMaxSATB: this.coreMaxSATB(),
                        isSATBFill: this.isSATBFill(),
                        chargeSATB: this.chargeSATB(),
                        chargeMaxSATB: this.chargeMaxSATB(),
                        isSATBCharge: this.isSATBCharge(),
                        cooldownSATB: this.cooldownSATB(),
                        cooldownMaxSATB: this.cooldownMaxSATB(),
                        isSATBCooldown: this.isSATBCooldown(),
                        satbActTimes: this.satbActTimes(),
                        currentAction: this.currentAction(),
                        latestSATBItem_: this.latestSATBItem_
                    });
        }
        if (!BattleManager._actionBattlers.contains(this)) return;
        SATBUT.showFailMsg(this.name(),
                "GB.new._checkOnCancelSATBCharge",
                "A battler right after cancelling ATB charge shouldn't be " +
                "able to execute actions!", {
                    coreSATB: this.coreSATB(),
                    coreMaxSATB: this.coreMaxSATB(),
                    isSATBFill: this.isSATBFill(),
                    chargeSATB: this.chargeSATB(),
                    chargeMaxSATB: this.chargeMaxSATB(),
                    isSATBCharge: this.isSATBCharge(),
                    cooldownSATB: this.cooldownSATB(),
                    cooldownMaxSATB: this.cooldownMaxSATB(),
                    isSATBCooldown: this.isSATBCooldown(),
                    satbActTimes: this.satbActTimes(),
                    currentAction: this.currentAction(),
                    latestSATBItem_: this.latestSATBItem_
                });
    }; // _UT._checkOnCancelSATBCharge

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
    _UT.initialize = $.initialize = function(battler) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkObjType(
                battler, "_GSATBPT.initialize battler", Game_Battler, {});
        //
    }; // $.initialize

    _GSATBPT.addCurATBProportion = $.addCurATBProportion;
    _UT.addCurATBProportion = $.addCurATBProportion = function(increment) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.addCurATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCurATBProportion increment", {});
        //
    }; // $.addCurATBProportion

    _GSATBPT.addCurATB = $.addCurATB;
    _UT.addCurATB = $.addCurATB = function(increment) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.addCurATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCurATB increment", {});
        //
    }; // $.addCurATB

    _GSATBPT.multiplyCurATB = $.multiplyCurATB;
    _UT.multiplyCurATB = $.multiplyCurATB = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.multiplyCurATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_GSATBPT.multiplyCurATB multiplier", {});
        //
    }; // $.multiplyCurATB

    _GSATBPT.setCurATBProportion = $.setCurATBProportion;
    _UT.setCurATBProportion = $.setCurATBProportion = function(proportion) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.setCurATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setCurATBProportion proportion", {});
        //
    }; // $.setCurATBProportion

    _GSATBPT.addCoreATBProportion = $.addCoreATBProportion;
    _UT.addCoreATBProportion = $.addCoreATBProportion = function(increment) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addCoreATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCoreATBProportion increment", {});
        //
    }; // $.addCoreATBProportion

    _GSATBPT.addCoreATB = $.addCoreATB;
    _UT.addCoreATB = $.addCoreATB = function(increment) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addCoreATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCoreATB increment", {});
        //
    }; // $.addCoreATB

    _GSATBPT.setCoreATBProportion = $.setCoreATBProportion;
    _UT.setCoreATBProportion = $.setCoreATBProportion = function(proportion) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.setCoreATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setCoreATBProportion proportion", {});
        //
    }; // $.setCoreATB

    _GSATBPT.multiplyCoreATB = $.multiplyCoreATB;
    _UT.multiplyCoreATB = $.multiplyCoreATB = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.multiplyCoreATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_GSATBPT.multiplyCoreATB multiplier", {});
        //
    }; // $.multiplyCoreATB

    _GSATBPT.setCoreATBProportion = $.setCoreATBProportion;
    _UT.setCoreATBProportion = $.setCoreATBProportion = function(proportion) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.setCoreATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setCoreATBProportion proportion", {});
        //
    }; // $.setCoreATBProportion

    _GSATBPT.addChargeATBProportion = $.addChargeATBProportion;
    _UT.addChargeATBProportion = $.addChargeATBProportion = function(increment) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.addChargeATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addChargeATBProportion increment", {});
        //
    }; // $.addChargeATBProportion

    _GSATBPT.addChargeATB = $.addChargeATB;
    _UT.addChargeATB = $.addChargeATB = function(increment) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.addChargeATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addChargeATB increment", {});
        //
    }; // $.addChargeATB

    _GSATBPT.multiplyChargeATB = $.multiplyChargeATB;
    _UT.multiplyChargeATB = $.multiplyChargeATB = function(multiplier) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.multiplyChargeATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_GSATBPT.multiplyChargeATB multiplier", {});
        //
    }; // $.multiplyChargeATB

    _GSATBPT.setChargeATBProportion = $.setChargeATBProportion;
    _UT.setChargeATBProportion = $.setChargeATBProportion = function(proportion) {
    // v0.04a - v0.04a; Extended
        _GSATBPT.setChargeATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setChargeATBProportion proportion", {});
        //
    }; // $.setChargeATBProportion

    _GSATBPT.addCooldownATBProportion = $.addCooldownATBProportion;
    _UT.addCooldownATBProportion = $.addCooldownATBProportion = function(increment) {
    // v0.05a - v0.05a; Extended
        _GSATBPT.addCooldownATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCooldownATBProportion increment", {});
        //
    }; // $.addCooldownATBProportion

    _GSATBPT.addCooldownATB = $.addCooldownATB;
    _UT.addCooldownATB = $.addCooldownATB = function(increment) {
    // v0.05a - v0.05a; Extended
        _GSATBPT.addCooldownATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                increment, "_GSATBPT.addCooldownATB increment", {});
        //
    }; // $.addCooldownATB

    _GSATBPT.multiplyCooldownATB = $.multiplyCooldownATB;
    _UT.multiplyCooldownATB = $.multiplyCooldownATB = function(multiplier) {
    // v0.05a - v0.05a; Extended
        _GSATBPT.multiplyCooldownATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                multiplier, "_GSATBPT.multiplyCooldownATB multiplier", {});
        //
    }; // $.multiplyCooldownATB

    _GSATBPT.setCooldownATBProportion = $.setCooldownATBProportion;
    _UT.setCooldownATBProportion = $.setCooldownATBProportion = function(proportion) {
    // v0.05a - v0.05a; Extended
        _GSATBPT.setCooldownATBProportion.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(
                proportion, "_GSATBPT.setCooldownATBProportion proportion", {});
        //
    }; // $.setCooldownATBProportion

    _GSATBPT.clearChargeATB = $.clearChargeATB;
    _UT.clearChargeATB = $.clearChargeATB = function() {
    // v0.04a - v0.04a; Extended
        _GSATBPT.clearChargeATB.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeNotFull.call(this);
        // There's nothing to check right before this listener callback triggers
    }; // clearChargeATB

    _GSATBPT.setCurATB = $.setCurATB;
    _UT.setCurATB = $.setCurATB = function(val) { // v0.04a - v0.04a; Extended
        _GSATBPT.setCurATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(val, "_GSATBPT.setCurATB val", {});
        //
    }; // $.setCurATB

    _GSATBPT.setCoreATB = $.setCoreATB;
    _UT.setCoreATB = $.setCoreATB = function(val) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.setCoreATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(val, "_GSATBPT.setCoreATB val", {});
        //
    }; // $.setCoreATB

    _GSATBPT.setChargeATB = $.setChargeATB;
    _UT.setChargeATB = $.setChargeATB = function(val) {
    // v0.04a - v0.05a; Extended
        _GSATBPT.setChargeATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(val, "_GSATBPT.setChargeATB val", {});
        //
    }; // $.setChargeATB

    _GSATBPT.setCooldownATB = $.setCooldownATB;
    _UT.setCooldownATB = $.setCooldownATB = function(val) {
    // v0.05a - v0.05a; Extended
        _GSATBPT.setCooldownATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(val, "_GSATBPT.setCooldownATB val", {});
        //
    }; // $.setCooldownATB

    _GSATBPT.curATB = $.curATB;
    _UT.curATB = $.curATB = function() { // v0.04a - v0.04a; Extended
        var current = _GSATBPT.curATB.apply(this, arguments);
        // Added to check the validity of the returned resul
        SATBUT.checkFuncs.checkNum(current, "_GSATBPT.curATB", {});
        //
        return current;
    }; // $.curATB

    _GSATBPT.coreATB = $.coreATB;
    _UT.coreATB = $.coreATB = function() { // v0.00a - v0.00a; Extended
        var current = _GSATBPT.coreATB.apply(this, arguments);
        // Added to check the validity of the returned resul
        SATBUT.checkFuncs.checkNum(current, "_GSATBPT.coreATB", {});
        //
        return current;
    }; // $.coreATB

    _GSATBPT.chargeATB = $.chargeATB;
    _UT.chargeATB = $.chargeATB = function() { // v0.04a - v0.04a; Extended
        var current = _GSATBPT.chargeATB.apply(this, arguments);
        // Added to check the validity of the returned resul
        SATBUT.checkFuncs.checkNum(current, "_GSATBPT.chargeATB", {});
        //
        return current;
    }; // $.chargeATB

    _GSATBPT.cooldownATB = $.cooldownATB;
    _UT.cooldownATB = $.cooldownATB = function() { // v0.05a - v0.05a; Extended
        var current = _GSATBPT.cooldownATB.apply(this, arguments);
        // Added to check the validity of the returned result
        SATBUT.checkFuncs.checkNum(current, "_GSATBPT.cooldownATB", {});
        //
        return current;
    }; // $.cooldownATB

    _GSATBPT.fillATB = $.fillATB;
    _UT.fillATB = $.fillATB = function(fillRate) {
    // v0.00a - v0.00a; Extended
        _GSATBPT.fillATB.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNum(fillRate, "_GSATBPT.fillATB fillRate", {});
        //
    }; // $.fillATB

    _GSATBPT.onStartCharge = $.onStartCharge;
    _UT.onStartCharge = $.onStartCharge = function() {
    // v0.05a - v0.05a; Extended
        _GSATBPT.onStartCharge.apply(this, arguments);
        // Added to test the assumptions of this public api
        _UT._checkChargeATB.call(this);
        //
    }; // $.onStartCharge

    _GSATBPT.onCancelCharge = $.onCancelCharge;
    _UT.onCancelCharge = $.onCancelCharge = function() {
    // v0.05a - v0.05a; Extended
        // Added to test the assumptions of this public api
        _UT._checkChargeATB.call(this);
        // It must be placed here to have meaningful checks
        _GSATBPT.onCancelCharge.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeNotFull.call(this);
        //
    }; // $.onCancelCharge

    _GSATBPT.onStartForceCharge = $.onStartForceCharge;
    _UT.onStartForceCharge = $.onStartForceCharge = function() {
    // v0.05a - v0.05a; Extended
        _GSATBPT.onStartForceCharge.apply(this, arguments);
        // Added to test the assumptions of this public api
        _UT._checkChargeATB.call(this);
        //
    }; // $.onStartForceCharge

    _GSATBPT.onEndForceCharge = $.onEndForceCharge;
    _UT.onEndForceCharge = $.onEndForceCharge = function() {
    // v0.05a - v0.05a; Extended
        _GSATBPT.onEndForceCharge.apply(this, arguments);
        // Added to test the assumptions of this public api
        _UT._checkChargeATB.call(this);
        //
    }; // $.onEndForceCharge

    _GSATBPT.onStartCooldown = $.onStartCooldown;
    _UT.onStartCooldown = $.onStartCooldown = function() {
    // v0.05a - v0.05a; Extended
        _GSATBPT.onStartCooldown.apply(this, arguments);
        // Added to test the assumptions of this public api
        _UT._checkOnStartCooldown.call(this);
        //
    }; // $.onStartCooldown

    _GSATBPT.onEndCooldown = $.onEndCooldown;
    _UT.onEndCooldown = $.onEndCooldown = function() {
    // v0.05a - v0.05a; Extended
        // Added to test the assumptions of this public api
        _UT._checkCooldownATB.call(this);
        // It must be placed here to avoid false fail messages
        _GSATBPT.onEndCooldown.apply(this, arguments);
    }; // $.onEndCooldown

    _GSATBPT.onCancelCooldown = $.onCancelCooldown;
    _UT.onCancelCooldown = $.onCancelCooldown = function() {
    // v0.05a - v0.05a; Extended
        // Added to test the assumptions of this public api
        _UT._checkCooldownATB.call(this);
        // It must be placed here to have meaningful checks
        _GSATBPT.onCancelCooldown.apply(this, arguments);
    }; // $.onCancelCooldown

    _GSATBPT.addSmallestCoreSATBDecrement = $.addSmallestCoreSATBDecrement;
    _UT.addSmallestCoreSATBDecrement = $.addSmallestCoreSATBDecrement = function() {
    // v0.00a - v0.00a; Extended
        _GSATBPT.addSmallestCoreSATBDecrement.apply(this, arguments);
        // Added to ensure the current ATB value's indeed smaller than the max
        _UT._checkAddSmallestCoreSATBDecrement.call(this);
        // This is far from being tautological due to the IEEE-754 precisions
    }; // $.addSmallestCoreSATBDecrement

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

    _GSATBPT._onChargeATBBecomeFull = $._onChargeATBBecomeFull;
    _UT._onChargeATBBecomeFull = $._onChargeATBBecomeFull = function() {
    // v0.05a - v0.05a; Extended
        // Added to test the assumptions of this public api
        _UT._checkChargeATB.call(this);
        // It must be placed here to have meaningful checks
        _GSATBPT._onChargeATBBecomeFull.apply(this, arguments);
    }; // $._onChargeATBBecomeFull

    _GSATBPT._onCooldownATBBecomeFull = $._onCooldownATBBecomeFull;
    _UT._onCooldownATBBecomeFull = $._onCooldownATBBecomeFull = function() {
    // v0.05a - v0.05a; Extended
        // Added to test the assumptions of this public api
        _UT._checkCooldownATB.call(this);
        // It must be placed here to have meaningful checks
        _GSATBPT._onCooldownATBBecomeFull.apply(this, arguments);
    }; // $._onCooldownATBBecomeFull

    _GSATBPT._onCoreATBBecomeNotFull = $._onCoreATBBecomeNotFull;
    _UT._onCoreATBBecomeNotFull = $._onCoreATBBecomeNotFull = function() {
    // v0.00a - v0.00a; Extended
        _GSATBPT._onCoreATBBecomeNotFull.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeNotFull.call(this);
        // There's nothing to check right before this listener callback triggers
    }; // $._onCoreATBBecomeNotFull

    _GSATBPT._onChargeATBBecomeNotFull = $._onChargeATBBecomeNotFull;
    _UT._onChargeATBBecomeNotFull = $._onChargeATBBecomeNotFull = function() {
    // v0.05a - v0.05a; Extended
        _GSATBPT._onChargeATBBecomeNotFull.apply(this, arguments);
        // Added to test the inputability/actability invariants of this battler
        _UT._checkDidCoreATBBecomeNotFull.call(this);
        // There's nothing to check right before this listener callback triggers
    }; // $._onChargeATBBecomeNotFull

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
      * No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkAddSmallestCoreSATBDecrement = function() {
        // Not using _battler.coreMaxSATB() - coreATB() > 0 is due to IEEE-754
        var current = this.coreATB(), max = this._battler.coreMaxSATB();
        if (current >= max) SATBUT.showFailMsg(max - current,
                "GSATBPT.new._checkAddSmallestCoreSATBDecrement " +
                this._battler.name(),
                "The current ATB value should be smaller than the maximum!",
                {});
        //
        _UT._checkDidCoreATBBecomeNotFull.call(this);
    }; // _UT._checkAddSmallestCoreSATBDecrement

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkWillCoreATBBecomeFull = function() {
        _UT._checkNoLatestItem.call(this);
        _UT._checkNoInputableActor.call(this);
        _UT._checkNoActBattler.call(this);
        _UT._checkNoSubject.call(this);
    }; // _UT._checkWillCoreATBBecomeFull

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkNoLatestItem = function() {
        if (!this._battler.latestSATBItem_) return;
        SATBUT.showFailMsg(this._battler.latestSATBItem_,
                "GSATBPT.new._checkNoLatestItem " + this._battler.name(),
                "A battler shouldn't have a skill/item when not charging nor" +
                " cooling down!", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    isSATBCharge: this._battler.isSATBCharge(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    satbActTimes: this._battler.satbActTimes(),
                    currentAction: this._battler.currentAction()
                });
    }; // _UT._checkNoLatestItem

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.04a
     */
    _UT._checkDidCoreATBBecomeFull = function() {
        if (!$gameParty.inBattle() || !this._battler.canMove()) return;
        var isInputable =
                BattleManager._satb.inputableActors.contains(this._battler);
        var isActable = BattleManager._actionBattlers.contains(this._battler);
        var isSATBCharge = this._battler.isSATBCharge();
        var hasAct = this._battler.canMakeSATBCmds();
        // Actually the battler should'nt be actable either but that's trivial
        if ((isInputable || isActable || isSATBCharge) && hasAct) return;
        //
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkDidCoreATBBecomeFull",
                "A battler right after having full ATB value should be " +
                "either inputable, able to execute actions or is charging a " +
                "skill/item!", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    isSATBCharge: this._battler.isSATBCharge(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    satbActTimes: this._battler.satbActTimes(),
                    currentAction: this._battler.currentAction(),
                    latestSATBItem_: this._battler.latestSATBItem_
                });
    }; // _UT._checkDidCoreATBBecomeFull

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkChargeATB = function() {
        _UT._checkLatestItem.call(this);
        _UT._checkNoInputableActor.call(this);
        if (this._battler.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkChargeATB", "A battler charging ATB " +
                "should have at least 1 virtual action slots! ", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    isSATBCharge: this._battler.isSATBCharge(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    currentAction: this._battler.currentAction(),
                    latestSATBItem_: this._battler.latestSATBItem_
                });
    }; // _UT._checkChargeATB

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkCooldownATB = function() {
        _UT._checkOnStartCooldown.call(this);
        _UT._checkNoSubject.call(this);
    }; // _UT._checkCooldownATB

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkOnStartCooldown = function() {
        _UT._checkLatestItem.call(this);
        _UT._checkNoInputableActor.call(this);
        _UT._checkNoActBattler.call(this);
    }; // _UT._checkOnStartCooldown

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkLatestItem = function() {
        if (this._battler.latestSATBItem_) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkLatestItem", "A battler should have a " +
                "skill/item when charging or cooling down!", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    isSATBCharge: this._battler.isSATBCharge(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    satbActTimes: this._battler.satbActTimes(),
                    currentAction: this._battler.currentAction()
                });
    }; // _UT._checkLatestItem

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkNoSubject = function() {
      // Failing this check doesn't always mean immediate severe issues
      if (BattleManager._subject !== this._battler) return;
      SATBUT.showFailMsg(this._battler.name(),
              "GSATBPT.new._checkNoSubject",
              "A battler not having full charge ATB value shouldn't be the " +
              "action execution subject!", {
                  coreATB: this.coreATB(),
                  coreMaxSATB: this._battler.coreMaxSATB(),
                  isSATBFill: this._battler.isSATBFill(),
                  chargeATB: this.chargeATB(),
                  chargeMaxSATB: this._battler.chargeMaxSATB(),
                  isSATBCharge: this._battler.isSATBCharge(),
                  cooldownATB: this.cooldownATB(),
                  cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                  isSATBCooldown: this._battler.isSATBCooldown(),
                  satbActTimes: this._battler.satbActTimes(),
                  currentAction: this._battler.currentAction(),
                  latestSATBItem_: this._battler.latestSATBItem_
              });
      //
    }; // _UT._checkNoSubject

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.04a
     */
    _UT._checkDidCoreATBBecomeNotFull = function() {
        _UT._checkNoATBCharge.call(this);
        _UT._checkNoInputableActor.call(this);
        _UT._checkNoActBattler.call(this);
    }; // _UT._checkDidCoreATBBecomeNotFull

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.04a
     */
    _UT._checkNoATBCharge = function() {
        if (!this._battler.isSATBCharge()) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkDidCoreATBBecomeNotFull",
                "A battler not having full ATB value shouldn't be charging " +
                "a skill/item!", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    satbActTimes: this._battler.satbActTimes(),
                    currentAction: this._battler.currentAction(),
                    latestSATBItem_: this._battler.latestSATBItem_
                });
    }; // _UT._checkNoATBCharge

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkNoInputableActor = function() {
        if (!$gameParty.inBattle()) return;
        if (BattleManager._satb.inputableActors.contains(this._battler)) {
            SATBUT.showFailMsg(this._battler.name(),
                    "GSATBPT.new._checkNoInputableActor", "A battler not " +
                    "having full ATB value or having ATB charge shouldn't be" +
                    " inputable!", {
                        coreATB: this.coreATB(),
                        coreMaxSATB: this._battler.coreMaxSATB(),
                        isSATBFill: this._battler.isSATBFill(),
                        chargeATB: this.chargeATB(),
                        chargeMaxSATB: this._battler.chargeMaxSATB(),
                        isSATBCharge: this._battler.isSATBCharge(),
                        cooldownATB: this.cooldownATB(),
                        cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                        isSATBCooldown: this._battler.isSATBCooldown(),
                        satbActTimes: this._battler.satbActTimes(),
                        currentAction: this._battler.currentAction(),
                        latestSATBItem_: this._battler.latestSATBItem_
                    });
        }
    }; // _UT._checkNoInputableActor

    /**
     * The this pointer is Game_SATBPhaseTypes.prototype
     * Hotspot/No-op
     * @since v0.05a @version v0.05a
     */
    _UT._checkNoActBattler = function() {
        if (!$gameParty.inBattle()) return;
        if (!BattleManager._actionBattlers.contains(this._battler)) return;
        SATBUT.showFailMsg(this._battler.name(),
                "GSATBPT.new._checkNoActBattler", "A battler not having full" +
                " charge ATB value shouldn't be able to exec actions!", {
                    coreATB: this.coreATB(),
                    coreMaxSATB: this._battler.coreMaxSATB(),
                    isSATBFill: this._battler.isSATBFill(),
                    chargeATB: this.chargeATB(),
                    chargeMaxSATB: this._battler.chargeMaxSATB(),
                    isSATBCharge: this._battler.isSATBCharge(),
                    cooldownATB: this.cooldownATB(),
                    cooldownMaxSATB: this._battler.cooldownMaxSATB(),
                    isSATBCooldown: this._battler.isSATBCooldown(),
                    satbActTimes: this._battler.satbActTimes(),
                    currentAction: this._battler.currentAction(),
                    latestSATBItem_: this._battler.latestSATBItem_
                });
    }; // _UT._checkNoActBattler

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
                battler, "GSATBN.new._checkInit battler", Game_Battler, {});
        if (cache_) SATBUT.checkFuncs.checkObjType(
                cache_, "GSATBN.new._checkInit cache_", Game_SATBCache, {});
        if (pairs_) SATBUT.checkFuncs.checkObjType(
                pairs_, "GSATBN.new._checkInit pairs_", Game_SATBPairs, {});
        if (rules_) SATBUT.checkFuncs.checkObjType(
                rules_, "GSATBN.new._checkInit rules_", Game_SATBRules, {});
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
                SATB.Game_SATBCache._NOTES, {});
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBN.new._checkRunResult " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note], {});
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
        if (chainedFunc) SATBUT.checkFuncs[chainedFunc](result_,
                "GSATBN.new._checkUncachedResult_ result_ " + note, {});
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
                !isCached + "!", {});
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
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "_GSATBC.markChangeFactors factors", {});
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
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkNoteType(note, "_GSATBC.pairFuncList note", {});
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
     * The this pointer is Game_SATBCache.prototype
     * No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to having its change factor
     * @param {[Factor]} factors - The change factors to be marked/raised
     */
    _UT._checkNoteChangeFactors = function(note, factors) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteChangeFactors note", {});
        SATBUT.checkFuncs.checkArrayFactor(
                factors, "GSATBC.new._checkNoteChangeFactors factors", {});
    }; // _UT._checkNoteChangeFactors

    /**
     * The this pointer is Game_SATBCache.prototype
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
                " should be invalidated!", {});
        //
    }; // _UT._checkInvalidateResultCache

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its part cache invalidated
     * @param {Factor} factor - The change factor as the note to invalidate
     */
    _UT._checkNoteFactor = function(note, factor) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteFactor note", {});
        SATBUT.checkFuncs.checkFactor(
                factor, "GSATBC.new._checkNoteFactor factor", {});
    }; // _UT._checkNoteFactor

    /**
     * The this pointer is Game_SATBCache.prototype
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
                "GSATBC.new._checkNoteArgObjPartResult result " + note, {});
    }; // _UT._checkNoteArgObjPartResult

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result
     */
    _UT._checkNoteArgObjPart = function(note, argObj_, part) {
        _UT._checkNoteArgObj.call(this, note, argObj_);
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkNoteArgObjPart part", {});
    }; // _UT._checkNoteArgObjPart

    /**
     * The this pointer is Game_SATBCache.prototype
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
                result, "GSATBC.new._checkNoteArgObjResult result " + note, {});
    }; // _UT._checkNoteArgObjResult

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    _UT._checkNoteArgObj = function(note, argObj_) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNoteArgObj note", {});
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBC.new._checkNoteArgObj " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note], {});
    }; // _UT._checkNoteArgObj

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {DatumType} part - The note part to have its part result
     */
    _UT._checkNotePart = function(note, part) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNotePart note", {});
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkNotePart part", {});
    }; // _UT._checkNotePart

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {[Datum]} data - List of data having effective notetags involved
     */
    _UT._checkPartListData = function(part, battler, data) {
        // argObj_ can't be checked as it needs note which is absent here
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkPartListData part", {});
        SATBUT.checkFuncs.checkObjType(battler,
                "GSATBC.new._checkPartListData battler", Game_Battler, {});
        data.forEach(function(datum_) {
            // Missing data will be filtered out before they're used anyway
            if (datum_) SATBUT.checkFuncs.checkDataMeta(
                    datum_, "GSATBC.new._checkPartListData datum", part, {});
            //
        });
        //
    }; // _UT._checkPartListData

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {[PairFunc]} list = List of functions of the effective notetags
     */
    _UT._checkNotePartPairFuncList = function(note, part, list) {
        SATBUT.checkFuncs.checkDataType(
                part, "GSATBC.new._checkPartListData part", {});
        _UT._checkNotePairFuncList.call(this, note, list);
    }; // _UT._checkNotePartPairFuncList

    /**
     * The this pointer is Game_SATBCache.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its cached result
     * @param {[PairFunc]} list = List of functions of the effective notetags
     */
    _UT._checkNotePairFuncList = function(note, list) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBC.new._checkNotePairFuncList note", {});
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBC.new._checkNotePairFuncList list", {});
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
                    "The coreMax PairFunc list should have 2 PairFunc!", {});
        } else {
            if (coreMaxPairFunc0.canBind) SATBUT.showFailMsg(coreMaxPairFunc0,
                    "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                    "The canBind field of the 1st coreMax PairFunc should be" +
                    " false!", {});
            if (coreMaxPairFunc0.datum !== datum) {
                SATBUT.showFailMsg(coreMaxPairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The datum field of the 1st coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!",
                        {});
            }
            var unboundFunc = coreMaxPairFunc0.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 1st unboundFunc", {})) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== 1) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The result of the 1st coreMax PairFunc should be 1!",
                        {});
            }
        }
        if (!coreMaxPairFunc1) {
            SATBUT.showFailMsg(coreMaxDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreMax PairFunc list should have 2 PairFunc!", {});
        } else {
            if (!coreMaxPairFunc1.canBind) SATBUT.showFailMsg(coreMaxPairFunc1,
                    "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                    "The canBind field of the 2nd coreMax PairFunc should be" +
                    " true!", {});
            if (coreMaxPairFunc1.datum !== datum) {
                SATBUT.showFailMsg(coreMaxPairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The datum field of the 2nd coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!",
                        {});
            }
            var unboundFunc = coreMaxPairFunc1.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 2nd unboundFunc", {})) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== 2) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " + coreMaxDatum,
                        "The result of the 2nd coreMax PairFunc should be 2!",
                        {});
            }
        }
        if (coreMaxPairFuncs.length > 2) SATBUT.showFailMsg(coreMaxDatum,
                "Game_SATBPairs.prototype.pairFuncs",
                "The coreMax PairFunc list shouldn't have more than 2 " +
                "PairFunc!", {});
        var coreActStatePairFuncs = pairs.pairFuncs("coreActState", datum);
        var coreActStatePairFunc0 = coreActStatePairFuncs[0];
        var coreActStatePairFunc1 = coreActStatePairFuncs[1];
        if (!coreActStatePairFunc0) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list should have 2 PairFunc!",
                    {});
        } else {
            if (coreActStatePairFunc0.canBind) {
                SATBUT.showFailMsg(coreActStatePairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The canBind field of the 1st coreMax PairFunc " +
                        "should be false!", {});
            }
            if (coreActStatePairFunc0.datum !== datum) {
                SATBUT.showFailMsg(coreActStatePairFunc0,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The datum field of the 1st coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!",
                        {});
            }
            var unboundFunc = coreActStatePairFunc0.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 1st unboundFunc", {})) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== true) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The result of the 1st coreActState PairFunc should " +
                        "be true!", {});
            }
        }
        if (!coreActStatePairFunc1) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list should have 2 PairFunc!",
                    {});
        } else {
            if (!coreActStatePairFunc1.canBind) {
                SATBUT.showFailMsg(coreActStatePairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The canBind field of the 2nd coreMax PairFunc " +
                        "should be true!", {});
            }
            if (coreActStatePairFunc1.datum !== datum) {
                SATBUT.showFailMsg(coreActStatePairFunc1,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The datum field of the 2nd coreMax PairFunc should " +
                        "be the original datum having the coreMax notetag!",
                        {});
            }
            var unboundFunc = coreActStatePairFunc1.unboundFunc;
            if (SATBUT.checkFuncs.checkFunc(unboundFunc,
                    "Game_SATBPairs.prototype.pairFuncs 2nd unboundFunc", {})) {
                var result = unboundFunc(datum, datum.meta.satb.datumType, 4);
                if (result !== false) SATBUT.showFailMsg(result,
                        "Game_SATBPairs.prototype.pairFuncs " +
                        coreActStateDatum,
                        "The result of the 2nd coreActState PairFunc should " +
                        "be false!", {});
            }
        }
        if (coreActStatePairFuncs.length > 2) {
            SATBUT.showFailMsg(coreActStateDatum,
                    "Game_SATBPairs.prototype.pairFuncs",
                    "The coreActState PairFunc list shouldn't have more than" +
                    " 2 PairFunc!", {});
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
                battler, "_GSATBP.initialize battler", Game_Battler, {});
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
     * The this pointer is Game_SATBPairs.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} defaultVal - The default result of the note
     */
    _UT._checkDefault = function(note, argObj_, defaultVal) {
        _UT._checkArgObjNote.call(this, argObj_, note);
        SATBUT.checkFuncs[SATBUT.unitTests.defaultNoteTypes[note]](
                defaultVal, "_GSATBP._checkDefault default " + note, {});
    }; // _UT._checkDefault

    /**
     * The this pointer is Game_SATBPairs.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @param {[PairFunc]} pairFuncs - List of unbound funcs of note involved
     */
    _UT._checkPairFuncs = function(note, datum_, pairFuncs) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBP.new._checkPairFuncs note", {});
        if (datum_) SATBUT.checkFuncs.checkData(
                datum_, "GSATBP.new._checkPairFuncs datum_", {});
        SATBUT.checkFuncs.checkPairFuncList(
                pairFuncs, "GSATBP.new._checkPairFuncs pairFuncs", {});
    }; // $._checkPairFuncs

    /**
     * The this pointer is Game_SATBPairs.prototype
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
                pairFunc, "GSATBP.new._checkRun_ pairFunc", {});
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (latestChainedResult_ && chainedFunc) {
            SATBUT.checkFuncs[chainedFunc](latestChainedResult_,
                    "GSATBP.new._checkRun_ latestChainedResult_ " + note, {});
        }
        var checkFunc = SATBUT.unitTests.noteTypes[note];
        // Some notes don't return any result
        if (!checkFunc || !result_) return;
        //
        // Checking the cached result as well will be unnecessarily wasting time
        SATBUT.checkFuncs[checkFunc](
                result_, "GSATBP.new._checkRun_ " + note, {});
        //
    }; // _UT._checkRun_

    /**
     * The this pointer is Game_SATBPairs.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     */
    _UT._checkArgObjNote = function(argObj_, note) {
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBP.new._checkArgObjNote " + note + " argObj_",
                SATBUT.unitTests.noteArgObjs[note], {});
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBP.new._checkArgObjNote note", {});
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
                pairs, "_GSATBR.initialize pairs", Game_SATBPairs, {});
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

    _GSATBR.chainedPartResult_ = $.chainedPartResult_;
    _UT.chainedPartResult_ = $.chainedPartResult_ = function(list, note, argObj_, initVal_) {
    // v0.00a - v0.00a; Extended
        var chainedResult_ = _GSATBR.chainedPartResult_.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkChainedPartResult.call(
                this, list, note, argObj_, initVal_, chainedResult_);
        //
        return chainedResult_;
    }; // $.chainedPartResult_

    _GSATBR.chainedAssociativeResult_ = $.chainedAssociativeResult_;
    _UT.chainedAssociativeResult_ = $.chainedAssociativeResult_ = function(list, note, argObj_, initVal_) {
    // v0.00a - v0.00a; Extended
        var chainedResult_ =
                _GSATBR.chainedAssociativeResult_.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkChainedAssociativeResult.call(
                this, list, note, argObj_, initVal_, chainedResult_);
        //
        return chainedResult_;
    }; // $.chainedAssociativeResult_

    _GSATBR.chainedNonAssociativeResult_ = $.chainedNonAssociativeResult_;
    _UT.chainedNonAssociativeResult_ = $.chainedNonAssociativeResult_ = function(list, note, argObj_, initVal_) {
    // v0.04a - v0.04a; Extended
        var chainedPartResult_ = _GSATBR.chainedNonAssociativeResult_.apply(this, arguments);
        // Added to test whether the result's valid
        _UT._checkChainedNonAssociativeResult.call(
                this, list, note, argObj_, initVal_, chainedPartResult_);
        //
        return chainedPartResult_;
    }; // $.chainedNonAssociativeResult_

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
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective results chained
     * @param {Boolean} isAssociative - The check result
     */
    _UT._checkIsAssociative = function(note, isAssociative) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkIsAssociative note", {});
        SATBUT.checkFuncs.checkBool(isAssociative,
                "GSATBR.new._checkIsAssociative isAssociative", {});
    }; // _UT._checkIsAssociative

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @param {*?} chainedResult - Chained result from note list of note involved
     */
    _UT._checkChainedPartResult = function(list, note, argObj_, initVal_, chainedResult_) {
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBR.new._checkChainedPartResult list", {});
        _UT._checkNoteArgObjInitValChainedResult.call(
                this, note, argObj_, initVal_, chainedResult_);
    }; // _UT._checkChainedPartResult

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[<T>]} list - The effective notetag results to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {<T>?} initVal_ - The initial result to chain the notetag list
     * @param {<T>?} chainedResult_ - Chained result from the note list involved
     */
    _UT._checkChainedAssociativeResult = function(list, note, argObj_, initVal_, chainedResult_) {
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (chainedFunc) list.forEach(function(val, i) {
            SATBUT.checkFuncs[chainedFunc](val,
                    "GSATBR.new._checkChainedAssociativeResult " +
                    "chainedResult " + i + "th " + note + " value", {});
        });
        _UT._checkNoteArgObjInitValChainedResult.call(
                this, note, argObj_, initVal_, chainedResult_);
    }; // _UT._checkChainedAssociativeResult

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.04a @version v0.04a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @param {*?} chainedResult_ - Chained result from note list of note involved
     */
    _UT._checkChainedNonAssociativeResult = function(list, note, argObj_, initVal_, chainedResult_) {
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBR.new._checkChainedNonAssociativeResult list", {});
        _UT._checkNoteArgObjInitValChainedResult.call(
                this, note, argObj_, initVal_, chainedResult_);
    }; // _UT._checkChainedNonAssociativeResult

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @param {*} chainedResult - Chained result from note list of note involved
     */
    _UT._checkNoteArgObjInitValChainedResult = function(note, argObj_, initVal_, chainedResult) {
        SATBUT.checkFuncs.checkNoteType(note,
                "GSATBR.new._checkNoteArgObjInitValChainedResult note", {});
        SATBUT.checkFuncs.checkObjVals(argObj_,
                "GSATBR.new._checkNoteArgObjInitValChainedResult " + note +
                " argObj_", SATBUT.unitTests.noteArgObjs[note], {});
        var chainedFunc = SATBUT.unitTests.chainedNoteTypes[note];
        if (!chainedFunc) return;
        if (initVal_) SATBUT.checkFuncs[chainedFunc](initVal_,
                "GSATBR.new._checkNoteArgObjInitValChainedResult initVal_ " +
                note, {});
        SATBUT.checkFuncs[chainedFunc](chainedResult,
                "GSATBR.new._checkNoteArgObjInitValChainedResult " +
                "chainedResult " + note, {});
    }; // _UT._checkNoteArgObjInitValChainedResult

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its effective results chained
     * @param {([PairFunc]) -> [PairFunc]} chainFunc - The function chaining the
     *                                                 note list
     */
    _UT._checkChainedRunList = function(list, note, chainFunc) {
        SATBUT.checkFuncs.checkPairFuncList(
                list, "GSATBR.new._checkChainedRunList list", {});
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkChainedRunList note", {});
        SATBUT.checkFuncs.checkFunc(
                chainFunc, "GSATBR.new._checkChainedRunList chainFunc", {});
    }; // _UT._checkChainedRunList

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {[String]} priorities - Data type priority queue parameter value
     */
    _UT._checkPriorities = function(note, priorities) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkPriorities note", {});
        SATBUT.checkFuncs.checkArrayDataType(
                priorities, "GSATBR.new._checkPriorities priorities", {});
    }; // _UT._checkPriorities

    /**
     * The this pointer is Game_SATBRules.prototype
     * Potential Hotspot/No-op
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @param {ChainRule} chainingRule - The effective notetag chaining rule
     *                                   parameter value
     */
    _UT._checkChainingRule = function(note, chainingRule) {
        SATBUT.checkFuncs.checkNoteType(
                note, "GSATBR.new._checkChainingRule note", {});
        SATBUT.checkFuncs[SATBUT.unitTests.noteChainingRules[note]](
                chainingRule, "GSATBR.new._checkChainingRule chainingRule", {});
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
                Object.keys(_SATB._TARGET_GROUPS), {});
        targets.forEach(function(target, i) {
            SATBUT.checkFuncs.checkString(
                    target, "GI.new._CHECK_FILTERED_TARGETS target " + i, {});
            if (!isNaN(target)) SATBUT.checkFuncs.checkNonnegativeInt(
                    +target, "GI.new._CHECK_FILTERED_TARGETS target " + i, {});
        });
        targetGroup.forEach(function(target, i) {
            SATBUT.checkFuncs.checkObjType(target,
                    "GI.new._CHECK_FILTERED_TARGETS target " + i, Game_Battler,
                    {});
        });
        filteredTargets.forEach(function(target, i) {
            SATBUT.checkFuncs.checkObjType(target,
                    "GI.new._CHECK_FILTERED_TARGETS target " + i, Game_Battler,
                    {});
        });
    }; // _UT._CHECK_FILTERED_TARGETS

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Game_Interpreter

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_SATBBar
 *      - Tests Window_SATBBar preconditions, postconditionss and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Window_SATBBar = SATB.Window_SATBBar || {};
    var WSATBB = SATB.Window_SATBBar.unitTests = { orig: {}, new: {} };
    var $ = Window_SATBBar.prototype;
    var _WSATBB = WSATBB.orig, _UT = WSATBB.new;

    _WSATBB.initialize = $.initialize;
    _UT.initialize = $.initialize = function(battler) {
    // v0.03a - v0.03a; Extended
        _WSATBB.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkObjType(
                battler, "_WSATBB.initialize battler", Game_Battler, {});
        //
    }; // $.initialize

    _WSATBB.lineHeight = $.lineHeight;
    _UT.lineHeight = $.lineHeight = function() { // v0.04a - v0.04a; Extended
        var lineH = _WSATBB.lineHeight.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarLineH](
                lineH, "_WSATBB.lineHeight lineH", {});
        //
        return lineH;
    }; // $.lineHeight

    _WSATBB.standardFontSize = $.standardFontSize;
    _UT.standardFontSize = $.standardFontSize = function() {
    // v0.04a - v0.04a; Extended
        var textSize = _WSATBB.standardFontSize.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarTextSize](
                textSize, "_WSATBB.standardFontSize textSize", {});
        //
        return textSize;
    }; // $.standardFontSize

    _WSATBB.textPadding = $.textPadding;
    _UT.textPadding = $.textPadding = function() { // v0.04a - v0.04a; Extended
        var textPadding = _WSATBB.textPadding.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarTextPadding](
                textPadding, "_WSATBB.textPadding textPadding", {});
        //
        return textPadding;
    }; // $.textPadding

    _WSATBB.standardBackOpacity = $.standardBackOpacity;
    _UT.standardBackOpacity = $.standardBackOpacity = function() {
    // v0.04a - v0.04a; Extended
        var opacity = _WSATBB.standardBackOpacity.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarBackOpacity](
                opacity, "_WSATBB.standardBackOpacity opacity", {});
        //
        return opacity;
    }; // $.standardBackOpacity

    _WSATBB.gaugeBackColor = $.gaugeBackColor;
    _UT.gaugeBackColor = $.gaugeBackColor = function() {
    // v0.04a - v0.04a; Extended
        var backColor = _WSATBB.gaugeBackColor.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarBackColor](
                backColor, "_WSATBB.gaugeBackColor backColor", {});
        //
        return backColor;
    }; // $.gaugeBackColor

    _WSATBB.setBattler = $.setBattler;
    _UT.setBattler = $.setBattler = function(battler) {
    // v0.03a - v0.03a; Extended
        _WSATBB.setBattler.apply(this, arguments);
        // Added to test the argument of this public api
        SATBUT.checkFuncs.checkObjType(
                battler, "_WSATBB.initialize battler", Game_Battler, {});
        //
    }; // $.setBattler

    _WSATBB._isVisible = $._isVisible;
    _UT._isVisible = $._isVisible = function() { // v0.04a - v0.04a; Extended
        var isVisible = _WSATBB._isVisible.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.isShowATBBar](
                isVisible, "_WSATBB._isVisible isVisible", {});
        //
        return isVisible;
    }; // $._isVisible

    _WSATBB._x = $._x;
    _UT._x = $._x = function() { // v0.04a - v0.04a; Extended
        var x = _WSATBB._x.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarXOffset](
                x, "_WSATBB._x x", {});
        //
        return x;
    }; // $._x

    _WSATBB._y = $._y;
    _UT._y = $._y = function() { // v0.04a - v0.04a; Extended
        var y = _WSATBB._y.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarYOffset](
                y, "_WSATBB._y y", {});
        //
        return y;
    }; // $._y

    _WSATBB._w = $._w;
    _UT._w = $._w = function() { // v0.04a - v0.04a; Extended
        var w = _WSATBB._w.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarW](
                w, "_WSATBB._w w", {});
        //
        return w;
    }; // $._w

    _WSATBB._h = $._h;
    _UT._h = $._h = function() { // v0.04a - v0.04a; Extended
        var h = _WSATBB._h.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarH](
                h, "_WSATBB._h h", {});
        //
        return h;
    }; // $._h

    _WSATBB._fillProportion = $._fillProportion;
    _UT._fillProportion = $._fillProportion = function() {
    // v0.03a - v0.03a; Extended
        var fillProportion = _WSATBB._fillProportion.apply(this, arguments);
        // Added to check whether the returned result's valid
        _UT._checkFillProportion.call(this, fillProportion);
        //
        return fillProportion;
    }; // $._fillProportion

    _WSATBB._barColor1 = $._barColor1;
    _UT._barColor1 = $._barColor1 = function() { // v0.04a - v0.04a; Extended
        var barColor1 = _WSATBB._barColor1.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarColor1](
                barColor1, "_WSATBB._barColor1 barColor1", {});
        //
        return barColor1;
    }; // $._barColor1

    _WSATBB._barColor2 = $._barColor2;
    _UT._barColor2 = $._barColor2 = function() { // v0.04a - v0.04a; Extended
        var barColor2 = _WSATBB._barColor2.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarColor2](
                barColor2, "_WSATBB._barColor2 barColor2", {});
        //
        return barColor2;
    }; // $._barColor2

    _WSATBB._atbTextColor = $._atbTextColor;
    _UT._atbTextColor = $._atbTextColor = function() {
    // v0.04a - v0.04a; Extended
        var textColor = _WSATBB._atbTextColor.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarTextColor](
                textColor, "_WSATBB._atbTextColor textColor", {});
        //
        return textColor;
    }; // $._atbTextColor

    _WSATBB._textXOffset = $._textXOffset;
    _UT._textXOffset = $._textXOffset = function() {
    // v0.04a - v0.04a; Extended
        var textX = _WSATBB._textXOffset.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarTextXOffset](
                textX, "_WSATBB._textXOffset textX", {});
        //
        return textX;
    }; // $._textXOffset

    _WSATBB._textYOffset = $._textYOffset;
    _UT._textYOffset = $._textYOffset = function() {
    // v0.04a - v0.04a; Extended
        var textY = _WSATBB._textYOffset.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarTextYOffset](
                textY, "_WSATBB._textYOffset textY", {});
        //
        return textY;
    }; // $._textYOffset

    _WSATBB._formattedText = $._formattedText;
    _UT._formattedText = $._formattedText = function() {
    // v0.04a - v0.04a; Extended
        var text = _WSATBB._formattedText.apply(this, arguments);
        // Added to check the return result on the call site directly
        SATBUT.checkFuncs[SATBUT.unitTests.params.bar.atbBarText](
                text, "_WSATBB._formattedText text", {});
        //
        return text;
    }; // $._formattedText

    /**
     * The this pointer is Window_SATBBar.prototype
     * Hotspot/No-op
     * @since v0.04a @version v0.05a
     * @param {Number} fillProportion - The ATB bar fill proportion
     * @todo Adds useful contexts to the shown fail messages
     */
    _UT._checkFillProportion = function(fillProportion) {
        // It's possible for the battler charge and cooldown to be beyond max
        if (this._battler.isSATBCharge()) {
            if (fillProportion < 0) SATBUT.showFailMsg(fillProportion,
                    "WSATBB.new._checkFillProportion fillProportion",
                    "The battler charge ATB value should never be negative!",
                    {});
        } else if (this._battler.isSATBCooldown()) {
            if (fillProportion < 0) SATBUT.showFailMsg(fillProportion,
                    "WSATBB.new._checkFillProportion fillProportion",
                    "The battler cooldown ATB value should never be negative!",
                    {});
        } else {
            // It's possible for the battler ATB value to be negative
            if (fillProportion > 1) SATBUT.showFailMsg(fillProportion,
                    "WSATBB.new._checkFillProportion fillProportion",
                    "The battler ATB value should never exceed its maximum!",
                    {});
            //
        }
    }; // _UT._checkFillProportion

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Window_SATBBar

/*----------------------------------------------------------------------------
 *    # (v0.04a+)New class: Window_SATBBase
 *      - Test Window_SATBBase preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Window_SATBBase = SATB.Window_SATBBase || {};
    SATB.Window_SATBBase.unitTests = { orig: {}, new: {} };
    var WSATBB = SATB.Window_SATBBase.unitTests;
    var $ = Window_SATBBase.prototype, _WSATBB = WSATBB.orig, _UT = WSATBB.new;

    _WSATBB.setIsEnabled = $.setIsEnabled;
    _UT.setIsEnabled = $.setIsEnabled = function(isEnabled) {
    // v0.04a - v0.04a; Extended
        _WSATBB.setIsEnabled.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkBool(
                isEnabled, "_WSATBB.setIsEnabled isEnabled", {});
        //
    }; // $.setIsEnabled

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Window_SATBBase

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_SATBForceRunCmd
 *      - Test Window_SATBForceStopCmd preconds, postconds and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Window_SATBForceRunCmd = SATB.Window_SATBForceRunCmd || {};
    SATB.Window_SATBForceRunCmd.unitTests = { orig: {}, new: {} };
    var WSATBFRC = SATB.Window_SATBForceRunCmd.unitTests;
    var $ = Window_SATBForceRunCmd.prototype;
    var _WSATBFRC = WSATBFRC.orig, _UT = WSATBFRC.new;

    _WSATBFRC.initialize = $.initialize;
    _UT.initialize = $.initialize = function(onForceRun) {
    // v0.03a - v0.03a; Extended
        _WSATBFRC.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkFunc(
                onForceRun, "_WSATBFRC.initialize onForceRun", {});
        //
    }; // $.initialize

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Window_SATBForceRunCmd

/*----------------------------------------------------------------------------
 *    # (v0.03a+)New class: Window_SATBForceStopCmd
 *      - Test Window_SATBForceStopCmd preconds, postconds and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    SATB.Window_SATBForceStopCmd = SATB.Window_SATBForceStopCmd || {};
    SATB.Window_SATBForceStopCmd.unitTests = { orig: {}, new: {} };
    var WSATBFSC = SATB.Window_SATBForceStopCmd.unitTests;
    var $ = Window_SATBForceStopCmd.prototype;
    var _WSATBFSC = WSATBFSC.orig, _UT = WSATBFSC.new;

    _WSATBFSC.initialize = $.initialize;
    _UT.initialize = $.initialize = function(onForceStop) {
    // v0.03a - v0.03a; Extended
        _WSATBFSC.initialize.apply(this, arguments);
        // Added to test the argument of this constructor
        SATBUT.checkFuncs.checkFunc(
                onForceStop, "_WSATBFSC.initialize onForceStop", {});
        //
    }; // $.initialize

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Window_SATBForceStopCmd

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Tests all Scene_Battle preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var SB = SATB.Scene_Battle.unitTests = { orig: {}, new: {} };
    var $ = Scene_Battle.prototype, _SATB = SATB.Scene_Battle.new;
    var _SB = SB.orig, _UT = SB.new;

    _SB._updateBattleProc = _SATB._updateBattleProc;
    _UT._updateBattleProc = _SATB._updateBattleProc = function() {
    // v0.00a - v0.00a; Extended
        _SB._updateBattleProc.apply(this, arguments);
        // Added to check if combinations of different window states are valid
        _UT._checkInputWinStates.call(this);
        // It's a very useful check that must be run per frame
    }; // _SATB._updateBattleProc

    _SB.isRunSATBFrameUpdate = $.isRunSATBFrameUpdate;
    _UT.isRunSATBFrameUpdate = $.isRunSATBFrameUpdate = function() {
    // v0.02a - v0.02a; Extended
        var isRunATBFrame = _SB.isRunSATBFrameUpdate.apply(this, arguments);
        // Added to test the validity of the returned ATB wait condition check
        SATBUT.checkFuncs[SATBUT.unitTests.params.wait.isATBWaitCondMet](
                isRunATBFrame, "_SB.isRunSATBFrameUpdate isRunATBFrame", {});
        // Functions with contexts can only be tested on the call sites
        return isRunATBFrame;
    }; // $.isRunSATBFrameUpdate

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
                "At most 1 command window can be active at a time!", {});
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
                "At most 1 selection window can be active at a time!", {});
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
                    "An active command window must be visible!", {});
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
                    "An active selection window must be visible!", {});
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
                "At most 1 command window can be open at a time!", {});
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
                "At most 1 selection window can be visible at a time!", {});
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
                    "A visible selection window must be active!", {});
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
                "command window's active!", {});
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
                "command window's active!", {});
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
                "inputting actor!", {});
    }; // _UT._checkInputtingActorStatusWinI

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Scene_Battle

/*----------------------------------------------------------------------------*/

} else {
    alert("DoubleX RMMV Superlative ATB Implementations should be above " +
            "DoubleX RMMV Superlative ATB Unit Tests");
} // if (DoubleX_RMMV["Superlative ATB Implementations"])

/*============================================================================*/
