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
 *         - Solid understanding on the implementation plugin and those of the
 *           plugins addressed by the compatibility plugin to fully comprehend
 *           this unit test plugin
 *----------------------------------------------------------------------------*/

if (Imported.MOG_BattleHud) {

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Tests all Scene_Battle preconditions, postconditions and invariants
 *----------------------------------------------------------------------------*/

(function(SATB, SATBUT) {

    "use strict";

    var _UT = SATB.Scene_Battle.unitTests.new;

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/No-op
     * @since v0.00a @version v0.00a
     */
    _UT._checkDisplayableActiveVisibleCmdWins = function() {
        // Rewritten to check the party command window only
        var partyCmdWin = this._partyCommandWindow;
        if (!partyCmdWin.active) return;
        if (!partyCmdWin.visible) SATBUT.showFailMsg("partyCmdWin",
                "SB.new._checkDisplayableActiveVisibleCmdWins",
                "The active party command window must be visible!");
        /** @todo Checks why the same doesn't apply to actor command window */
    }; // _UT._checkDisplayableActiveVisibleCmdWins

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Unit_Tests); // Scene_Battle

} // if (Imported.MOG_BattleHud)

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
