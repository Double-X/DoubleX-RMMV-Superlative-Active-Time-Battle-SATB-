// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Compatibility Tests"] = "v0.01a";
//

/*:
 * @plugindesc The compatibility test plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 * This compatibility test plugin needs the unit test plugin to be run
 * DON'T ENABLE THIS COMPATIBILITY TEST PLUGIN WITHOUT ENABLING THE SATB
 * PLUGIN ITSELF UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 */

if (DoubleX_RMMV.SATB && DoubleX_RMMV.SATB.Unit_Tests &&
        DoubleX_RMMV.SATB.Compatibilities) {

DoubleX_RMMV.SATB.Compatibility_Tests = {};

var Imported = Imported || {};

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what unit test does in general
 *         - Solid understanding on how the implementation plugin and those of
 *           the plugins addressed by the compatibility plugin works on their
 *           own in details to fully comprehend this compatibility test plugin
 *----------------------------------------------------------------------------*/

if (Imported.MOG_BattleHud) {

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Tests all Scene_Battle preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATBUT) {

    "use strict";

    var _UT = SATBUT.Scene_Battle.new;

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkDisplayableActiveVisibleCmdWins = function() {
        // Rewritten to check the party command window only
        if (!this._partyCommandWindow.active) return;
        if (this._partyCommandWindow.visible) return;
        SATBUT.showFailMsg("partyCmdWin",
                "SB.new._checkDisplayableActiveVisibleCmdWins",
                "The active party command window must be visible!");
        /** @todo Checks why the same doesn't apply to actor command window */
    }; // _UT._checkDisplayableActiveVisibleCmdWins

})(DoubleX_RMMV.SATB.Unit_Tests); // Scene_Battle

} // if (Imported.MOG_BattleHud)
/*----------------------------------------------------------------------------*/

if (Imported.YEP_BattleEngineCore) {

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: BattleManager
 *      - Tests all BattleManager preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    var BM = SATBCT.BattleManager = { orig: {}, new: {} };
    var _BM = BM.orig, _CT = BM.new;

    _BM.eraseSATBActBattler = BattleManager.eraseSATBActBattler;
    BattleManager.eraseSATBActBattler = function(battler) {
    // v0.01a - v0.01a; Extended
        _BM.eraseSATBActBattler.apply(this, arguments);
        // Added to check whether the battler's a performed battler as well
        _CT._checkNoPerformedBattlers.call(this, battler);
        //
    }; // BattleManager.eraseSATBActBattler
    _CT.eraseSATBActBattler = BattleManager.eraseSATBActBattler;

    /**
     * The this pointer is BattleManager
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Battler} battler - The battler to be checked against
     */
    _CT._checkNoPerformedBattlers = function(battler) {
        if (!this.isSATBBattle()) return;
        if (!this._performedBattlers.contains(battler)) return;
        SATBUT.showFailMsg(battler.name(),
                "SATBCT.BattleManager.new._checkNoPerformedBattlers",
                "A battler not being the action execution subject shouldn't " +
                "be a performed battler in YEP_BattleEngineCore!", {
                    _subject: this._subject
                });
    }; // _CT._checkNoPerformedBattlers

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);
// BattleManager

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Game_BattlerBase
 *      - Ensures the battler won't be falsely regarded as a performed battler
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    var GBB = SATBCT.Game_BattlerBase = { orig: {}, new: {} };
    var _UT = SATBUT.Game_BattlerBase.new, _GBB = GBB.orig, _CT = GBB.new;

    _GBB._checkOnNoFullATB = _UT._checkOnNoFullATB;
    _CT._checkOnNoFullATB = _UT._checkOnNoFullATB = function() {
    // v0.01a - v0.01a; Extended
        _GBB._checkOnNoFullATB.apply(this, arguments);
        // Added to ensure the battler won't be regarded as a performed battler
        _CT._checkNoPerformedBattlers.call(this);
        //
    }; // _UT._checkOnNoFullATB

    /**
     * The this pointer is Game_BattlerBase.prototype
     * No-op
     * @since v0.01a @version v0.01a
     */
    _CT._checkNoPerformedBattlers = function() {
        if (!BattleManager._performedBattlers.contains(this)) return;
        SATBUT.showFailMsg(this.name(),
                "SATBCT.Game_BattlerBase.new._checkNoPerformedBattlers",
                "A battler not being the action execution subject shouldn't " +
                "be a performed battler in YEP_BattleEngineCore!", {
                    _subject: BattleManager._subject
                });
    }; // _CT._checkNoPerformedBattlers

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);
// Game_BattlerBase

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Game_Battler
 *      - Ensures the battler won't be falsely regarded as a performed battler
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    var GB = SATBCT.Game_Battler = { orig: {}, new: {} };
    var _UT = SATBUT.Game_Battler.new, _GB = GB.orig, _CT = GB.new;

    [
        "_checkWillSATBInput",
        "_checkDidAllSATBActsEnd",
        "_checkOnCancelSATBCharge"
    ].forEach(function(func) {
        _GB[func] = _UT[func];
        _CT[func] = _UT[func] = function() { // v0.01a - v0.01a; Extended
            _GB[func].apply(this, arguments);
            // Added to ensure battler won't be regarded as a performed battler
            _CT._checkNoPerformedBattlers.call(this);
            //
        }; // _UT[func]
    });

    /**
     * The this pointer is Game_BattlerBase.prototype
     * No-op
     * @since v0.01a @version v0.01a
     */
    _CT._checkNoPerformedBattlers = function() {
        if (!BattleManager._performedBattlers.contains(this)) return;
        SATBUT.showFailMsg(this.name(),
                "SATBCT.Game_Battler.new._checkNoPerformedBattlers",
                "A battler not being the action execution subject shouldn't " +
                "be a performed battler in YEP_BattleEngineCore!", {
                    _subject: BattleManager._subject
                });
    }; // _CT._checkNoPerformedBattlers

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);
// Game_Battler

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Game_SATBPhaseTypes
 *      - Ensures the battler won't be falsely regarded as a performed battler
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    var GSATBPT = SATBCT.Game_SATBPhaseTypes = { orig: {}, new: {} };
    var _UT = SATBUT.Game_SATBPhaseTypes.new;
    var _GSATBPT = GSATBPT.orig, _CT = GSATBPT.new;

    [
        "_checkNoLatestItem",
        "_checkDidCoreATBBecomeFull",
        "_checkNoSubject",
        "_checkNoATBCharge",
        "_checkNoActBattler"
    ].forEach(function(func) {
        _GSATBPT[func] = _UT[func];
        _CT[func] = _UT[func] = function() { // v0.01a - v0.01a; Extended
            _GSATBPT[func].apply(this, arguments);
            // Added to ensure battler won't be regarded as a performed battler
            _CT._checkNoPerformedBattlers.call(this);
            //
        }; // _UT[func]
    });

    /**
     * The this pointer is Game_BattlerBase.prototype
     * No-op
     * @since v0.01a @version v0.01a
     */
    _CT._checkNoPerformedBattlers = function() {
        if (!BattleManager._performedBattlers.contains(this._battler)) return;
        SATBUT.showFailMsg(this._battler.name(),
                "SATBCT.Game_SATBPhaseTypes.new._checkNoPerformedBattlers",
                "A battler not being the action execution subject shouldn't " +
                "be a performed battler in YEP_BattleEngineCore!", {
                    _subject: BattleManager._subject
                });
    }; // _CT._checkNoPerformedBattlers

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);
// Game_SATBPhaseTypes

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Game_Party
 *      - Ensures the battler won't be falsely regarded as a performed battler
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    var GP = SATBCT.Game_Party = { orig: {}, new: {} };
    var $ = Game_Party.prototype, _GP = GP.orig, _CT = GP.new;

    _GP.eraseSATBInputableActor = $.eraseSATBInputableActor;
    _CT.eraseSATBInputableActor = $.eraseSATBInputableActor = function(actor) {
    // v0.01a - v0.01a; Extended
        _GP.eraseSATBInputableActor.apply(this, arguments);
        // Added to check whether the battler's a performed battler as well
        _CT._checkNoPerformedBattlers.call(this, actor);
        //
    }; // $.eraseSATBInputableActor

    /**
     * The this pointer is Game_Party.prototype
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} actor - The actor to be checked against
     */
    _CT._checkNoPerformedBattlers = function(actor) {
        if (!BattleManager.isSATBBattle()) return;
        if (!BattleManager._performedBattlers.contains(actor)) return;
        SATBUT.showFailMsg(actor.name(),
                "SATBCT.Game_Party.new._checkNoPerformedBattlers",
                "A battler not being the action execution subject shouldn't " +
                "be a performed battler in YEP_BattleEngineCore!", {
                    _subject: BattleManager._subject
                });
    }; // _CT._checkNoPerformedBattlers

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);
// Game_Party

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Callable Test Suite
 *      - Tests all new action sequences added to YEP_BattleEngineCore
 *----------------------------------------------------------------------------*/

(function(SATBUT, SATBCT) {

    "use strict";

    SATBCT._runTestSuite = SATBUT._runTestSuite;
    SATBUT._runTestSuite = function() { // v0.01a - v0.01a; Extended
        SATBCT._runTestSuite.apply(this, arguments);
        testActSeq(); // Added to test the action sequences as well
    }; // SATBUT._runTestSuite

    /**
     * No-op
     * @since v0.01a @version v0.01a
     */
    function testActSeq() {
        [
            // Core Module
            testSetNegativeCoreATB,
            testSetOverMaxCoreATB,
            testSetNegativeCoreATBProportion,
            testSetOverMaxCoreATBProportion,
            testAddNegativeCoreATB,
            testAddOverMaxCoreATB,
            testAddNegativeCoreATBProportion,
            testAddOverMaxCoreATBProportion,
            testMultiplyNegativeCoreATB,
            testMultiplyOverMaxCoreATB,
            testFillUpCoreATB,
            testClearNegativeCoreATB,
            testClearCoreATB,
            testSetNegativeActTimes,
            testSetActTimes,
            testAddNegativeActTimes,
            testAddActTimes,
            testMultiplyNegativeActTimes,
            testMultiplyActTimes
            //
            /** @todo Thinks of how to test the Charge and Cooldown Modules */
            /*
            // Charge Module
            testSetNegativeChargeATB,
            testSetOverMaxChargeATB,
            testSetNegativeChargeATBProportion,
            testSetOverMaxChargeATBProportion,
            testAddNegativeChargeATB,
            testAddOverMaxChargeATB,
            testAddNegativeChargeATBProportion,
            testAddOverMaxChargeATBProportion,
            testMultiplyNegativeChargeATB,
            testMultiplyOverMaxChargeATB,
            testFillUpChargeATB,
            testClearChargeATB,
            testCancelChargeATB,
            testStartForceChargeATB,
            testEndForceChargeATB,
            //
            // Cooldown Module
            testSetNegativeCooldownATB,
            testSetOverMaxCooldownATB,
            testSetNegativeCooldownATBProportion,
            testSetOverMaxCooldownATBProportion,
            testAddNegativeCooldownATB,
            testAddOverMaxCooldownATB,
            testAddNegativeCooldownATBProportion,
            testAddOverMaxCooldownATBProportion,
            testMultiplyNegativeCooldownATB,
            testMultiplyOverMaxCooldownATB,
            testFillUpCooldownATB
            //
            */
        ].forEach(SATBUT._runTest);
    } // testActSeq

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetNegativeCoreATB(firstPartyMem) {
        console.info("pre testSetNegativeCoreATB");
        var negative = -firstPartyMem.coreMaxSATB();
        BattleManager.processActionSequence('SET CORE SATB', [
            'ACTOR 0',
            negative.toString()
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== negative) SATBUT.showFailMsg(cur, "testSetNegativeCoreATB",
                "The ATB value should be " + negative + "!");
    } // testSetNegativeCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetOverMaxCoreATB(firstPartyMem) {
        console.info("pre testSetOverMaxCoreATB");
        var max = firstPartyMem.coreMaxSATB();
        BattleManager.processActionSequence('SET CORE SATB', [
            'ACTOR 0',
            (max * 2).toString()
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testSetOverMaxCoreATB",
                "The ATB value should be " + max + "!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testSetOverMaxCoreATB",
                "The battler having max ATB should have virtual action slots!");
    } // testSetOverMaxCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetNegativeCoreATBProportion(firstPartyMem) {
        console.info("pre testSetNegativeCoreATBProportion");
        BattleManager.processActionSequence('SET CORE SATB PROPORTION', [
            'ACTOR 0',
            "-1"
        ]);
        var cur = firstPartyMem.coreSATB();
        var negative = -firstPartyMem.coreMaxSATB();
        if (cur === negative) return;
        SATBUT.showFailMsg(cur, "testSetNegativeCoreATBProportion",
                "The ATB value should be " + negative + "!");
    } // testSetNegativeCoreATBProportion

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetOverMaxCoreATBProportion(firstPartyMem) {
        console.info("pre testSetOverMaxCoreATBProportion");
        BattleManager.processActionSequence('SET CORE SATB PROPORTION', [
            'ACTOR 0',
            "2"
        ]);
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur !== max) {
            SATBUT.showFailMsg(cur, "testSetOverMaxCoreATBProportion",
                    "The ATB value should be " + max + "!");
        }
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testSetOverMaxCoreATBProportion",
                "The battler having max ATB should have virtual action slots!");
    } // testSetOverMaxCoreATBProportion

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddNegativeCoreATB(firstPartyMem) {
        console.info("pre testAddNegativeCoreATB");
        firstPartyMem.fillUpCoreSATB();
        var negative = -firstPartyMem.coreMaxSATB();
        BattleManager.processActionSequence('ADD CORE SATB', [
            'ACTOR 0',
            (negative * 2).toString()
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== negative) SATBUT.showFailMsg(cur, "testAddNegativeCoreATB",
                "The ATB value should be " + negative + "!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testAddNegativeCoreATB",
                "The battler previously having virtual action slots " +
                "shouldn't not have them anymore just because of reducing " +
                "ATB value!");
    } // testAddNegativeCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddOverMaxCoreATB(firstPartyMem) {
        console.info("pre testAddOverMaxCoreATB");
        var max = firstPartyMem.coreMaxSATB();
        firstPartyMem.setCoreSATB(-max);
        BattleManager.processActionSequence('ADD CORE SATB', [
            'ACTOR 0',
            (max * 3).toString()
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testAddOverMaxCoreATB",
                "The ATB value should be " + max + "!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testAddOverMaxCoreATB",
                "The battler having max ATB should have virtual action slots!");
    } // testAddOverMaxCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddNegativeCoreATBProportion(firstPartyMem) {
        console.info("pre testAddNegativeCoreATBProportion");
        firstPartyMem.fillUpCoreSATB();
        BattleManager.processActionSequence('ADD CORE SATB PROPORTION', [
            'ACTOR 0',
            "-2"
        ]);
        var cur = firstPartyMem.coreSATB();
        var negative = -firstPartyMem.coreMaxSATB();
        if (cur !== negative) {
            SATBUT.showFailMsg(cur, "testAddNegativeCoreATBProportion",
                    "The ATB value should be " + negative + "!");
        }
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testAddNegativeCoreATBProportion",
                "The battler previously having virtual action slots " +
                "shouldn't not have them anymore just because of reducing " +
                "ATB value!");
    } // testAddNegativeCoreATBProportion

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddOverMaxCoreATBProportion(firstPartyMem) {
        console.info("pre testAddOverMaxCoreATBProportion");
        firstPartyMem.setCoreSATB(-firstPartyMem.coreMaxSATB());
        BattleManager.processActionSequence('ADD CORE SATB PROPORTION', [
            'ACTOR 0',
            "3"
        ]);
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur !== max) {
            SATBUT.showFailMsg(cur, "testAddOverMaxCoreATBProportion",
                    "The ATB value should be " + max + "!");
        }
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testAddOverMaxCoreATBProportion",
                "The battler having max ATB should have virtual action slots!");
    } // testAddOverMaxCoreATBProportion

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testMultiplyNegativeCoreATB(firstPartyMem) {
        console.info("pre testMultiplyNegativeCoreATB");
        firstPartyMem.fillUpCoreSATB();
        BattleManager.processActionSequence('MULTIPLY CORE SATB', [
            'ACTOR 0',
            "-1"
        ]);
        var cur = firstPartyMem.coreSATB();
        var negative = -firstPartyMem.coreMaxSATB();
        if (cur !== negative) {
            SATBUT.showFailMsg(cur, "testMultiplyOverMaxCoreATB",
                    "The ATB value should be " + negative + "!");
        }
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testMultiplyNegativeCoreATB",
                "The battler previously having virtual action slots " +
                "shouldn't not have them anymore just because of reducing " +
                "ATB value!");
    } // testMultiplyNegativeCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testMultiplyOverMaxCoreATB(firstPartyMem) {
        console.info("pre testMultiplyOverMaxCoreATB");
        var max = firstPartyMem.coreMaxSATB();
        firstPartyMem.fillUpCoreSATB(max / 2.0);
        BattleManager.processActionSequence('MULTIPLY CORE SATB', [
            'ACTOR 0',
            "4"
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testMultiplyOverMaxCoreATB",
                "The ATB value should be " + max + "!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testMultiplyOverMaxCoreATB",
                "The battler having max ATB should have virtual action slots!");
    } // testMultiplyOverMaxCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testFillUpCoreATB(firstPartyMem) {
        console.info("pre testFillUpCoreATB");
        BattleManager.processActionSequence('FILL UP CORE SATB', [
            'ACTOR 0',
            ""
        ]);
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testFillUpCoreATB",
                "The ATB value should be " + max + "!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testFillUpCoreATB",
                "The battler having max ATB should have virtual action slots!");
    } // testFillUpCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testClearNegativeCoreATB(firstPartyMem) {
        console.info("pre testClearNegativeCoreATB");
        var negative = -firstPartyMem.coreMaxSATB();
        firstPartyMem.setCoreSATB(negative);
        BattleManager.processActionSequence('CLEAR CORE SATB', [
            'ACTOR 0',
            ""
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur === negative) return;
        SATBUT.showFailMsg(cur, "testClearNegativeCoreATB",
                "The ATB value should be " + negative + "!");
    } // testClearNegativeCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testClearCoreATB(firstPartyMem) {
        console.info("pre testClearCoreATB");
        firstPartyMem.setCoreSATB(firstPartyMem.coreMaxSATB());
        BattleManager.processActionSequence('CLEAR CORE SATB', [
            'ACTOR 0',
            ""
        ]);
        var cur = firstPartyMem.coreSATB();
        if (cur !== 0) SATBUT.showFailMsg(cur, "testClearCoreATB",
                "The ATB value should be 0!");
        if (firstPartyMem.canMakeSATBCmds()) return;
        SATBUT.showFailMsg(firstPartyMem.satbActTimes(),
                "testClearCoreATB",
                "The battler previously having virtual action slots " +
                "shouldn't not have them anymore just because of reducing " +
                "ATB value!");
    } // testClearCoreATB

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetNegativeActTimes(firstPartyMem) {
        console.info("pre testSetNegativeActTimes");
        firstPartyMem.setSATBActTimes(1);
        BattleManager.processActionSequence('SET SATB ACT TIMES', [
            'ACTOR 0',
            "-1"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        // Negative values will be corced as positive ones which is intended
        if (actTimes !== 1) {
            SATBUT.showFailMsg(actTimes, "testSetNegativeActTimes",
                    "The number of virtual action slots should be equal to 1!");
        }
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testSetNegativeActTimes",
                "The ATB value should be " + max + "!");
        //
    } // testSetNegativeActTimes

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testSetActTimes(firstPartyMem) {
        console.info("pre testSetActTimes");
        BattleManager.processActionSequence('SET SATB ACT TIMES', [
            'ACTOR 0',
            "1"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        if (actTimes !== 1) SATBUT.showFailMsg(actTimes, "testSetActTimes",
                "The number of virtual action slots should be equal to 1!");
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur !== max) SATBUT.showFailMsg(cur, "testSetActTimes",
                "The ATB value should be " + max + "!");
    } // testSetActTimes

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddNegativeActTimes(firstPartyMem) {
        console.info("pre testAddNegativeActTimes");
        firstPartyMem.setSATBActTimes(1);
        BattleManager.processActionSequence('ADD SATB ACT TIMES', [
            'ACTOR 0',
            "-2"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        if (actTimes !== 0) {
            SATBUT.showFailMsg(actTimes, "testAddNegativeActTimes",
                    "The number of virtual action slots should be equal to 0!");
        }
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur === max) SATBUT.showFailMsg(cur, "testAddNegativeActTimes",
                "The ATB value shouldn't be " + max + "!");
    } // testAddNegativeActTimes

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testAddActTimes(firstPartyMem) {
        console.info("pre testAddActTimes");
        firstPartyMem.setSATBActTimes(1);
        BattleManager.processActionSequence('ADD SATB ACT TIMES', [
            'ACTOR 0',
            "1"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        if (actTimes !== 2) SATBUT.showFailMsg(actTimes, "testAddActTimes",
                "The number of virtual action slots should be equal to 2!");
    } // testAddActTimes

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testMultiplyNegativeActTimes(firstPartyMem) {
        console.info("pre testMultiplyNegativeActTimes");
        firstPartyMem.setSATBActTimes(1);
        BattleManager.processActionSequence('MULTIPLY SATB ACT TIMES', [
            'ACTOR 0',
            "-1"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        // Negative values will be corced as positive ones which is intended
        if (actTimes !== 1) {
            SATBUT.showFailMsg(actTimes, "testMultiplyNegativeActTimes",
                    "The number of virtual action slots should be equal to 1!");
        }
        var cur = firstPartyMem.coreSATB(), max = firstPartyMem.coreMaxSATB();
        if (cur === max) return;
        SATBUT.showFailMsg(cur, "testMultiplyNegativeActTimes",
                "The ATB value should be " + max + "!");
        //
    } // testMultiplyNegativeActTimes

    /**
     * No-op
     * @since v0.01a @version v0.01a
     * @param {Game_Actor} firstPartyMem - The 1st party member
     */
    function testMultiplyActTimes(firstPartyMem) {
        console.info("pre testMultiplyActTimes");
        firstPartyMem.setSATBActTimes(1);
        BattleManager.processActionSequence('MULTIPLY SATB ACT TIMES', [
            'ACTOR 0',
            "2"
        ]);
        var actTimes = firstPartyMem.satbActTimes();
        if (actTimes === 2) return;
        SATBUT.showFailMsg(actTimes, "testMultiplyActTimes",
                "The number of virtual action slots should be equal to 2!");
    } // testMultiplyActTimes

})(DoubleX_RMMV.SATB.Unit_Tests, DoubleX_RMMV.SATB.Compatibility_Tests);

} // if (Imported.YEP_BattleEngineCore)

/*----------------------------------------------------------------------------*/

} else {
    if (!DoubleX_RMMV.SATB || !DoubleX_RMMV.SATB.Unit_Tests) {
        alert("DoubleX RMMV Superlative ATB Unit Tests should be above " +
                "DoubleX RMMV Superlative ATB Compatibility Tests");
    }
    if (!DoubleX_RMMV.SATB || !DoubleX_RMMV.SATB.Compatibilities) {
        alert("DoubleX RMMV Superlative ATB Compatibilities should be above " +
                "DoubleX RMMV Superlative ATB Compatibility Tests");
    }
} // if (DoubleX_RMMV["Superlative ATB Implementations"])

/*============================================================================*/
