// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Compatibilities"] = "v0.05a";
//

/*:
 * @plugindesc The compatibility plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 *
 * IMPORTANT: THE COMPATIBILITY PLUGIN WILL NEVER ADDRESS ANY COMPATIBILITY
 * ISSUE WITH ANY PLUGIN THAT ARE SUPPOSED TO HAVE RESTRICTED ACCESSES
 * CURRENTLY(ESPECIALLY COMMERCIAL PLUGINS) WITHOUT THE DEMONSTRABLY EXPLICIT
 * CONSENTS FROM THEIR RESPECTIVE AUTHORS TO AVOID VIOLATING THEIR TERMS OF
 * USE
 *
 *============================================================================
 *    ## Action Sequences(Yanfly Engine Plugins - Battle Engine Core)
 *       Reference tag: YEP_BattleEngineCore_ActionSequences
 *----------------------------------------------------------------------------
 *    # Core Module
 *      1. set core satb: Target Typing, val
 *         - Applies the script call setCoreSATB(val) to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      2. set core satb proportion: Target Typing, proportion
 *         - Applies the script call setCoreSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      3. add core satb: Target Typing, val
 *         - Applies the script call addCoreSATB(val) to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      4. add core satb %: Target Typing, proportion
 *         - Applies the script call addCoreSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      5. multiply core satb: Target Typing, multiplier
 *         - Applies the script call multiplyCoreSATB(multiplier) to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      6. fill up core satb: Target Typing
 *         - Applies the script call fillUpCoreSATB() to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      7. clear core satb: Target Typing
 *         - Applies the script call clearCoreSATB() to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      8. set satb act times: Target Typing, actTimes
 *         - Applies the script call setSATBActTimes(actTimes) to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      9. add satb act times: Target Typing, increment
 *         - Applies the script call addSATBActTimes(increment) to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      10. multiply satb act times: Target Typing, multiplier
 *         - Applies the script call multiplySATBActTimes(multiplier) to
 *           targets included by Target Typing, which can be any Target
 *           Typing supported by Action Sequences
 *    # (v0.02a+)Charge Module
 *      1. set charge satb: Target Typing, val
 *         - Applies the script call setChargeSATB(val) to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      2. set charge satb proportion: Target Typing, proportion
 *         - Applies the script call setChargeSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      3. add charge satb: Target Typing, val
 *         - Applies the script call addChargeSATB(val) to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      4. add charge satb %: Target Typing, proportion
 *         - Applies the script call addChargeSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      5. multiply charge satb: Target Typing, multiplier
 *         - Applies the script call multiplyChargeSATB(multiplier) to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      6. fill up charge satb: Target Typing
 *         - Applies the script call fillUpChargeSATB() to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      7. clear charge satb: Target Typing
 *         - Applies the script call clearChargeSATB() to targets included by
 *           Target Typing, which can be any Target Typing supported by Action
 *           Sequences
 *      8. cancel charge satb: Target Typing
 *         - Applies the script call onCancelSATBCharge() to targets included
 *           by Target Typing, which can be any Target Typing supported by
 *           Action Sequences
 *      9. start force charge satb: Target Typing
 *         - Applies the script call onStartForceSATBCharge() to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      10. end force charge satb: Target Typing
 *         - Applies the script call onEndForceSATBCharge() to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *    # (v0.03a+)Cooldown Module
 *      1. set cooldown satb: Target Typing, val
 *         - Applies the script call setCooldownSATB(val) to targets included
 *           by Target Typing, which can be any Target Typing supported by
 *           Action Sequences
 *      2. set cooldown satb proportion: Target Typing, proportion
 *         - Applies the script call setCooldownSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      3. add cooldown satb: Target Typing, val
 *         - Applies the script call addCooldownSATB(val) to targets included
 *           by Target Typing, which can be any Target Typing supported by
 *           Action Sequences
 *      4. add cooldown satb %: Target Typing, proportion
 *         - Applies the script call addCooldownSATBProportion(proportion) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      5. multiply cooldown satb: Target Typing, multiplier
 *         - Applies the script call multiplyCooldownSATB(multiplier) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      6. fill up cooldown satb: Target Typing
 *         - Applies the script call fillUpCooldownSATB() to targets included
 *           by Target Typing, which can be any Target Typing supported by
 *           Action Sequences
 *      7. cancel cooldown satb: Target Typing
 *         - Applies the script call onCancelSATBCooldown() to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *    # (v0.05a+)Delay Module
 *      1. set satb delay sec counter: Target Typing, delay
 *         - Applies the script call setSATBDelaySecCounter(delay) to targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      2. add satb delay sec counter: Target Typing, increment
 *         - Applies the script call addSATBDelaySecCounter(increment) to
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *      3. multiply satb delay sec counter: Target Typing, multiplier
 *         - Applies the script call multiplySATBDelaySecCounter(multiplier)
 *           to targets included by Target Typing, which can be any Target
 *           Typing supported by Action Sequences
 *============================================================================
 *    ## Addressed Foreign Plugins
 *----------------------------------------------------------------------------
 *    # MOG_BattleHud:
 *      In general, this plugin should be placed above the SATB implementation
 *      plugin unless actual test results prove the otherwise
 *      1. The ATB bar doesn't gather any DoubleX RMMV Superlative ATB data
 *         - Reference tag: MOG_BattleHud_SATBData
 *         - Extended Battle_Hud.prototype.at and Battle_Hud.prototype.max_at
 *           to support the current and maximum ATB values of battlers
 *         - Disabled Battle_Hud.is_casting without the Charge Module enabled
 *         - (v0.03a+)Edited Battle_Hud.prototype.update_at to show the
 *           ATB cooldown ATB as well
 *         - (v0.03a+)Added Battle_Hud.prototype.is_cooldown to check if the
 *           battler's cooling down
 *      2. The original status window will be shown when the current inputable
 *         actor becomes not inputable
 *         - Reference tag: MOG_BattleHud_StopShowingStatusWindow
 *         - Extended
 *           DoubleX_RMMV.SATB.Scene_Battle.new._deselectOpenStatusWin to stop
 *           showing the status window upon the aforementioned event
 *      3. The actor window isn't fully shown
 *         - Reference tag: MOG_BattleHud_Actor_Window
 *         - Removed DoubleX_RMMV.SATB.Scene_Battle.new._updateActorWinPos to
 *           let MOG_BattleHud handle the actor window position
 *    # (v0.04a+)SEK_ChangeActor:
 *      In general, this plugin should be placed just above the SATB
 *      compatibility plugin unless actual test results prove the otherwise
 *      1. The ATB of all actors are reset when swapping actors and the actor
 *         input window won't update properly after swapping actors
 *         - Reference tag: SEK_ChangeActor_StopRemoveAddAllPartyMems
 *         - Rewritten Game_Party.prototype.swap to stop removing/adding
 *           actors that aren't involving in the swapping
 *      2. The actor being swapped in starts charging instantly without
 *         inputting an action first
 *         - Reference tag: SEK_ChangeActor_StopJumpNextCmd
 *         - Disabled Scene_Battle.prototype.jumpNextCommand when this
 *           plugin's enabled
 *      3. The party command window doesn't show when upon cancel changing
 *         actors after displaying a game message
 *         - Reference tag: SEK_ChangeActor_SetupPartyCmdWin
 *         - Extended Scene_Battle.onChangeCancel to setup the party command
 *           window instead of just activating it
 *      4. The change window corrupts the selection index whenever a battler
 *         refreshes(execute actions, be hit, have states removed, etc)
 *         - Reference tag: SEK_ChangeActor_FixDirectIndexSet0
 *         - Extended Window_ChangeList.prototype.drawItem to restores the
 *           selection before being corrupted
 *      5. The input windows including the changing window don't refresh, hide
 *         or show as expected when the ATB frame update isn't full wait
 *         - Reference tag: SEK_ChangeActor_RefreshInputWins
 *         - Extended Scene_Battle.prototype.refreshSATBInputWins,
 *           Scene_Battle.prototype.onChangeOk,
 *           DoubleX_RMMV.SATB.Scene_Battle.new._isWinWithNoInputtingActorActive,
 *           DoubleX_RMMV.SATB.Scene_Battle.new._closeDeactivatePartyCmdWin,
 *           DoubleX_RMMV.SATB.Scene_Battle.new._displayWinWithNoInputtingActor
 *           and DoubleX_RMMV.SATB.Scene_Battle.new._hideSelectionWins to
 *           refresh, hide and show the right input windows at the right time
 *    # Yanfly Engine Plugins - Battle Engine Core:
 *      In general, this plugin should be placed above the SATB implementation
 *      plugin unless actual test results prove the otherwise
 *      1. No actions can be executed in the 1st turn
 *         - Reference tag: YEP_BattleEngineCore_Stop1stTurnCheck
 *         - Extended BattleManager.getNextSubject to remove the turn count
 *           check
 *      2. Valid actions don't execute at all
 *         - Reference tag: YEP_BattleEngineCore_HandleNewPhases
 *         - Extended BattleManager.updateSATBAct to handle new action
 *           sequence phases added by
 *           Yanfly Engine Plugins - Battle Engine Core
 *      3. Actors with more than 1 virtual action slots can only act once
 *         - Reference tag: YEP_BattleEngineCore_AddNewActPhases
 *         - Extended BattleManager.endAction to stop calling onAllActionsEnd
 *           for the action execution subject
 *         - Extended DoubleX_RMMV.SATB.BattleManager.new._isActPhase to
 *           regard new action sequence phases as action phase
 *      4. All battler actions are recreated upon starting actor inputs
 *         - Reference tag: YEP_BattleEngineCore_StopRecreateAction
 *         - Stopped calling BattleManager.createActions when SATB's effective
 *      5. The sprite of the currently inputable actor will return to its home
 *         position when any action performs its finish sequence
 *         - Reference tag: YEP_BattleEngineCore_StopInputableActorReturnHome
 *         - Extended Game_Battler.prototype.spriteReturnHome to disable this
 *           function for the currently inputable actor
 *      6. (v0.01a+)New inputting actors can't be selected by touching the
 *         actor sprite unlike what happens when selecting actor or enemy
 *         targets
 *         - Reference tag: YEP_BattleEngineCore_TouchActorChangeSelected
 *         - Extended startPartyCommandSelection to fallback to the default
 *           rather than the extended YEP_BattleEngineCore version
 *         - Both Mouse Over and Visual Actor Select should be on to have this
 *           new inputable actor selection effect
 *      7. The inputting actor has the wrong pose during party escape attempts
 *         - Reference tag: YEP_BattleEngineCore_PartyCmdSelectStopNextCmd
 *         - Extended startPartyCommandSelection to fallback to the default
 *           rather than the extended YEP_BattleEngineCore version
 *      8. The selection and help window lost info after refresh
 *         - Reference tag: YEP_BattleEngineCore_UpdateSelectionHelpWindow
 *         - Extended refreshSATBInputWins to reselect the selection windows
 *           and update their respective help windows
 *      9. The target help window remains when the actor's dead
 *         - Reference tag: YEP_BattleEngineCore_CloseInvalidTargetHelpWindow
 *         - Extended
 *           DoubleX_RMMV.SATB.Scene_Battle.new._deactivateHideSelectionWins
 *           to close the stale help window
 *      10.(v0.02a+) The targets are wrongly shown as selected after inputting
 *          a skill selecting all targets
 *          - Reference tag: YEP_BattleEngineCore_ClearTargetSelections
 *          - Extended DoubleX_RMMV.SATB.Scene_Battle.new._selectNextCmd to
 *            clear the stale target selections
 *============================================================================
 */

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of what the implementations of
 *           DoubleX RMMV Superlative ATB and each of the addressed plugins
 *           does in general
 *         - Some Javascript coding proficiency to fully comprehend this
 *           compatibility plugin
 *           (Basic knowledge on what RMMV plugin development does in general
 *           with several easy, simple and small plugins written without
 *           nontrivial bugs up to 1000 LoC scale but still being
 *           inexperienced)
 *      2. All reference tags are to have clear references between the
 *         Plugin Info and Plugin Implementations by searching them
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV.SATB && DoubleX_RMMV["Superlative ATB Implementations"]) {

/*----------------------------------------------------------------------------*/

DoubleX_RMMV.SATB.Compatibilities = {};

var Imported = Imported || {};

if (Imported.MOG_BattleHud) {

DoubleX_RMMV.SATB.Compatibilities.Battle_Hud = {};

/*----------------------------------------------------------------------------
 *    # Edit class: Battle_Hud
 *      - Shows the ATB values of all actors
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Battle_Hud = { orig: {}, new: {} };
    var $ = Battle_Hud.prototype;
    var _BH = SATBC.Battle_Hud.orig, _SATBC = SATBC.Battle_Hud.new;

    _BH.update_at = $.update_at;
    _SATBC.update_at = $.update_at = function() { // v0.03a - v0.03a; Rewritten
        // Rewritten to update the cooldown ATB as well
        if (!this._at_meter) return;
        if (this.at() === -1) return this._at_meter.visible = false;
        this._at_meter.visible = true;
        if (!this._at_flow[0]) return _SATBC._updateAT.call(this);
        _SATBC._updateATGradientAnimation.call(this);
        // MOG_BattleHud_SATBData
    }; // $.update_at

    _BH.at = $.at;
    _SATBC.at = $.at = function() { // v0.00a - v0.00a; Extended
        // Added to use the ATB value from SATB only if it's active
        if (SATBManager.isEnabled()) return this._battler.coreSATB();
        // MOG_BattleHud_SATBData
        return _BH.at.apply(this, arguments);
    }; // $.at

    _BH.max_at = $.max_at;
    _SATBC.max_at = $.max_at = function() { // v0.00a - v0.00a; Extended
        // Added to use the maximum ATB value from SATB only if it's active
        if (SATBManager.isEnabled()) return this._battler.coreMaxSATB();
        // MOG_BattleHud_SATBData
        return _BH.max_at.apply(this, arguments);
    }; // $.max_at

    _BH.cast_at = $.cast_at;
    _SATBC.cast_at = $.cast_at = function() { // v0.02a - v0.02a; Extended
        // Added to use the charge ATB value from SATB only if it's active
        if (SATBManager.isEnabled()) return this._battler.chargeSATB();
        // MOG_BattleHud_SATBData
        return _BH.cast_at.apply(this, arguments);
    }; // $.cast_at

    _BH.cast_max_at = $.cast_max_at;
    _SATBC.cast_max_at = $.cast_max_at = function() {
    // v0.02a - v0.02a; Extended
        // Added to use the charge max ATB value from SATB only if it's active
        if (SATBManager.isEnabled()) return this._battler.chargeMaxSATB();
        // MOG_BattleHud_SATBData
        return _BH.cast_max_at.apply(this, arguments);
    }; // $.cast_max_at

    _BH.is_casting = $.is_casting;
    _SATBC.is_casting = $.is_casting = function() { // v0.00a - v0.02a; Extended
        // Added to use enable charging when using SATB
        if (SATBManager.isEnabled()) return this._battler.isSATBCharge();
        // MOG_BattleHud_SATBData
        return _BH.is_casting.apply(this, arguments);
    }; // $.is_casting

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    _SATBC._updateAT = function() {
        if (_SATBC._isCooldown.call(this)) {
            return _SATBC._updateCooldownAT.call(this);
        } else if (this.is_casting()) return _SATBC._updateChargeAT.call(this);
        var type = this.is_max_at() ? 1 : 0;
        this.refresh_at_meter(this._at_meter, this.at(), this.max_at(), type);
    }; // _SATBC._updateAT

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATBC._updateCooldownAT = function() {
        var at = _SATBC._cooldownAT.call(this);
        var maxAT = _SATBC._cooldownMaxAT.call(this);
        var type = _SATBC._isMaxCooldown.call(this) ? 3 : 2;
        this.refresh_at_meter(this._at_meter, at, maxAT, type);
    }; // _SATBC._updateCooldownAT

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATBC._updateChargeAT = function() {
        var at = this.cast_at(), type = this.is_max_cast() ? 3 : 2;
        this.refresh_at_meter(this._at_meter, at, this.cast_max_at(), type);
    }; // _SATBC._updateChargeAT

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATBC._updateATGradientAnimation = function() {
        _SATBC._refreshATMeterFlow.call(this);
        _SATBC._updateATFlow.call(this);
    }; // _SATBC._updateATGradientAnimation

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    _SATBC._refreshATMeterFlow = function() {
        if (_SATBC._isCooldown.call(this)) {
            return _SATBC._refreshCooldownATMeterFlow.call(this);
        } else if (this.is_casting()) {
            return _SATBC._refreshChargeATMeterFlow.call(this);
        }
        this.refresh_at_meter_flow(this._at_meter, this.at(), this.max_at(),
                this.is_max_at() ? 1 : 0, this._at_flow[1]);
    }; // _SATBC._refreshATMeterFlow

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    _SATBC._refreshCooldownATMeterFlow = function() {
        var at = _SATBC._cooldownAT.call(this);
        var maxAT = _SATBC._cooldownMaxAT.call(this);
        var type = _SATBC._isMaxCooldown.call(this) ? 3 : 2;
        this.refresh_at_meter_flow(
                this._at_meter, at, maxAT, type, this._at_flow[1]);
    }; // _SATBC._refreshCooldownATMeterFlow

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Idempotent
     * @since v0.03a @version v0.03a
     */
    _SATBC._refreshChargeATMeterFlow = function() {
        var at = this.cast_at(), type = this.is_max_cast() ? 3 : 2;
        this.refresh_at_meter_flow(
                this._at_meter, at, this.cast_max_at(), type, this._at_flow[1]);
    }; // _SATBC._refreshChargeATMeterFlow

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.04a
     * @returns {Boolean} The check result
     */
    _SATBC._isCooldown = function() {
        // It's better to play safe even when not checking isEnabled still works
        return SATBManager.isEnabled() && this._battler.isSATBCooldown();
        //
    }; // _SATBC._isCooldown

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Num} The current battler cooldown ATB value
     */
    _SATBC._cooldownAT = function() { return this._battler.cooldownSATB(); };

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Num} The maximum battler cooldown ATB value
     */
    _SATBC._cooldownMaxAT = function() {
        return this._battler.cooldownMaxSATB();
    }; // _SATBC._cooldownMaxAt

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot/Nullipotent
     * @since v0.03a @version v0.03a
     * @returns {Boolean} The check result
     */
    _SATBC._isMaxCooldown = function() {
        var at = _SATBC._cooldownAT.call(this);
      	return at >= _SATBC._cooldownMaxAT.call(this);
    }; // _SATBC._isMaxCooldown

    /**
     * The this pointer is Battle_Hud.prototype
     * Hotspot
     * @since v0.03a @version v0.03a
     */
    _SATBC._updateATFlow = function() {
        this._at_flow[1] += 1.5;
        if (this._at_flow[1] > this._at_flow[3]) this._at_flow[1] = 0;
    }; // _SATBC._updateATFlow

})(DoubleX_RMMV.SATB.Compatibilities.Battle_Hud); // Battle_Hud

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Shows the ATB values of all actors
 *----------------------------------------------------------------------------*/

(function(SATB, SATBC) {

    "use strict";

    SATBC.Scene_Battle = { orig: {}, new: {} };
    var _SATB = SATB.Scene_Battle.new;
    var _SB = SATBC.Scene_Battle.orig, _SATBC = SATBC.Scene_Battle.new;

    _SB._deselectOpenStatusWin = _SATB._deselectOpenStatusWin;
    _SATBC._deselectOpenStatusWin = _SATB._deselectOpenStatusWin = function() {
    // v0.00a - v0.00a; Extended
        _SB._deselectOpenStatusWin.apply(this, arguments);
        // Added to stop showing the status window
        this._statusWindow.close();
        // MOG_BattleHud_StopShowingStatusWindow
    }; // _SATB._deselectOpenStatusWin

    _SB._updateActorWinPos = _SATB._updateActorWinPos;
    _SATBC._updateActorWinPos = _SATB._updateActorWinPos = function() {
    // v0.00a - v0.00a; Extended
        // Removed to let MOG_BattleHud handle the actor window positions
        // MOG_BattleHud_Actor_Window
    }; // _SATB._updateActorWinPos

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Compatibilities.Battle_Hud);
// Scene_Battle

} // if (Imported.MOG_BattleHud)

/*----------------------------------------------------------------------------*/

if (Object.keys(PluginManager.parameters('SEK_ChangeActor')).length > 0) {

DoubleX_RMMV.SATB.Compatibilities.SEK_ChangeActor = {};

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: Game_Party
 *      - Just swaps the involved actors instead of touching the whole party
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Game_Party = { orig: {}, new: {} };
    var $ = Game_Party.prototype;
    var _GP = SATBC.Game_Party.orig, _SATBC = SATBC.Game_Party.new;

    _GP.swap = $.swap;
    _SATBC.swap = $.swap = function(x, y) { // v0.04a - v0.04a; Extended
        // Added to stop touching the whole party when using this plugin
        if (BattleManager.isSATBBattle()) return _SATBC._swap.call(this, x, y);
        // SEK_ChangeActor_StopRemoveAddAllPartyMems
        _GP.swap.apply(this, arguments);
    }; // $.swap

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     * @param {Index} oldPartyMemI - The old party member index
     * @param {Index} newPartyMemI - The new party member index
     * @todo Considers calling _eraseVirtualActSlot to conform with that plugin
     */
    _SATBC._swap = function(oldPartyMemI, newPartyMemI) {
        _SATBC._cleanupOldPartyMem.call(this, oldPartyMemI);
        this.swapOrder(oldPartyMemI, newPartyMemI);
        _SATBC._setupNewPartyMem.call(this, oldPartyMemI);
    }; // _SATBC._swap

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     * @param {Index} oldPartyMemI - The old party member index
     */
    _SATBC._cleanupOldPartyMem = function(oldPartyMemI) {
        // Ensures the battler won't be in invalid state upon coming back
        var oldPartyMem = this.allMembers()[oldPartyMemI];
        oldPartyMem.hide(); // Otherwise actions can still hit this battler
        oldPartyMem.clearCoreSATBActs();
        //
    }; // _SATBC._cleanupOldPartyMem

    /**
     * The this pointer is Game_Party.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     * @param {Index} oldPartyMemI - The old party member index
     */
    _SATBC._setupNewPartyMem = function(oldPartyMemI) {
        // The new party member now takes over the old member position
        var newPartyMem = this.allMembers()[oldPartyMemI];
        //
        // Otherwise this battler will remain hidden if swapped out before
        newPartyMem.appear();
        //
        // Ensures the new party member have the right cached values
        newPartyMem.refresh();
        //
        // Otherwise the actor input window won't be updated at all
        SATBManager.procScene_("updateSATBActorSelect");
        //
    }; // _SATBC._setupNewPartyMem

})(DoubleX_RMMV.SATB.Compatibilities.SEK_ChangeActor); // Game_Party

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: Window_ChangeList
 *      - Stops selecting the index to 0 upon drawing the window items
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Window_ChangeList = { orig: {}, new: {} };
    var $ = Window_ChangeList.prototype, _WCL = SATBC.Window_ChangeList.orig;
    var _SATBC = SATBC.Window_ChangeList.new;

    _WCL.drawItem = $.drawItem;
    _SATBC.drawItem = $.drawItem = function(index) {
    // v0.04a - v0.04a; Extended
        // Added to stop selecting the index to 0 upon drawing the window items
        if (SATBManager.isEnabled()) return _SATBC._drawItem.call(this, index);
        // SEK_ChangeActor_FixDirectIndexSet0
        _WCL.drawItem.apply(this, arguments);
    }; // $.drawItem

    _SATBC._drawItem = function(index) {
        // Store the index before being overriden by 0 bypassing selects
        var lastIndex = this.index();
        //
        _WCL.drawItem.apply(this, arguments);
        // Reverts the direct setting of _index = 0 bypassing select
        this.select(Math.min(lastIndex, this.maxItems() - 1)); // To play safe
        //
    }; // _SATBC._drawItem

})(DoubleX_RMMV.SATB.Compatibilities.SEK_ChangeActor); // Window_ChangeList

/*----------------------------------------------------------------------------
 *    # (v0.04a+)Edit class: Scene_Battle
 *      - Refreshes the input windows and stops falsely charing swapped actor
 *----------------------------------------------------------------------------*/

(function(SATB, SATBC) {

    "use strict";

    SATBC.Scene_Battle = { orig: {}, new: {} };
    var $ = Scene_Battle.prototype, _SATB = SATB.Scene_Battle.new;
    var _SB = SATBC.Scene_Battle.orig, _SATBC = SATBC.Scene_Battle.new;

    _SB.refreshSATBInputWins = $.refreshSATBInputWins;
    _SATBC.refreshSATBInputWins = $.refreshSATBInputWins = function() {
    // v0.04a - v0.04a; Extended
        _SB.refreshSATBInputWins.apply(this, arguments);
        // Added to refresh the change window as well
        this._changeWindow.refresh();
        // SEK_ChangeActor_RefreshInputWins
    }; // $.refreshSATBInputWins

    _SB.onChangeOk = $.onChangeOk;
    _SATBC.onChangeOk = $.onChangeOk = function() { // v0.04a - v0.04a; Extended
        _SB.onChangeOk.apply(this, arguments);
        // Added to refresh the other input and the status windows
        BattleManager.onSATBBattlerRefresh(BattleManager.satbMems());
        // SEK_ChangeActor_RefreshInputWins
    }; // $.onChangeOk

    _SB.jumpNextCommand = $.jumpNextCommand;
    _SATBC.jumpNextCommand = $.jumpNextCommand = function() {
    // v0.04a - v0.04a; Extended
        // Added to stop jumping to the next command when this plugin's enabled
        if (BattleManager.isSATBBattle()) return;
        // SEK_ChangeActor_StopJumpNextCmd
        _SB.jumpNextCommand.apply(this, arguments);
    }; // $.jumpNextCommand

    _SB.onChangeCancel = $.onChangeCancel;
    _SATBC.onChangeCancel = $.onChangeCancel = function() {
    // v0.04a - v0.04a; Extended
        _SB.onChangeCancel.apply(this, arguments);
        // Added to setup the party command window instead of just activating
        this._partyCommandWindow.setup();
        // SEK_ChangeActor_SetupPartyCmdWin
    }; // $.onChangeCancel

    _SB._isWinWithNoInputtingActorActive =
            _SATB._isWinWithNoInputtingActorActive;
    _SATB._isWinWithNoInputtingActorActive = function() {
        // v0.04a - v0.04a; Extended
        // Added to count the change window as one such window as well
        if (this._changeWindow.active) return true;
        // SEK_ChangeActor_RefreshInputWins
        return _SB._isWinWithNoInputtingActorActive.apply(this, arguments);
    }; // _SATB._isWinWithNoInputtingActorActive
    _SATBC._isWinWithNoInputtingActorActive =
            _SATB._isWinWithNoInputtingActorActive;

    _SB._closeDeactivatePartyCmdWin = _SATB._closeDeactivatePartyCmdWin;
    _SATB._closeDeactivatePartyCmdWin = function() {
    // v0.04a - v0.04a; Extended
        _SB._closeDeactivatePartyCmdWin.apply(this, arguments);
        // Added to hide the change window as well
        this._changeWindow.hide();
        // SEK_ChangeActor_RefreshInputWins
    }; // _SATB._closeDeactivatePartyCmdWin
    _SATBC._closeDeactivatePartyCmdWin = _SATB._closeDeactivatePartyCmdWin;

    _SB._displayWinWithNoInputtingActor = _SATB._displayWinWithNoInputtingActor;
    _SATB._displayWinWithNoInputtingActor = function() {
    // v0.04a - v0.04a; Extended
        _SB._displayWinWithNoInputtingActor.apply(this, arguments);
        // Added to show the change window if it's active as well
        _SATBC._displayChangeWin.call(this);
        // SEK_ChangeActor_RefreshInputWins
    }; // _SATB._displayWinWithNoInputtingActor
    _SATBC._displayWinWithNoInputtingActor =
            _SATB._displayWinWithNoInputtingActor;

    _SB._hideSelectionWins = _SATB._hideSelectionWins;
    _SATBC._hideSelectionWins = _SATB._hideSelectionWins = function() {
    // v0.04a - v0.04a; Extended
        _SB._hideSelectionWins.apply(this, arguments);
        // Added to hide the change window as well
        _SATB._hideSelectionWin.call(this, "_changeWindow");
        // SEK_ChangeActor_RefreshInputWins
    }; // _SATB._hideSelectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.04a @version v0.04a
     */
    _SATBC._displayChangeWin = function() {
      if (this._satb.wasWinActive._changeWindow) this.commandChange();
    }; // _SATBC._displayChangeWin

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Compatibilities.SEK_ChangeActor);
// Scene_Battle

} // if (Object.keys(PluginManager.parameters('SEK_ChangeActor')).length > 0)

/*----------------------------------------------------------------------------*/

if (Imported.YEP_BattleEngineCore) {

DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore = {};

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Implements all action sequences from the SATB plugin
 *----------------------------------------------------------------------------*/

(function(SATB, SATBC) {

    "use strict";

    SATBC.BattleManager = { orig: {}, new: {} };
    var _SATB = SATB.BattleManager.new;
    var _BM = SATBC.BattleManager.orig, _SATBC = SATBC.BattleManager.new;

    _SATBC._ACT_SEQ_0_ARG = function(func, targets) { // v0.04a+
        targets.forEach(function(target) { target[func](); });
    }; // _SATBC._ACT_SEQ_0_ARG
    _SATBC._ACT_SEQ_1_ARG = function(func, targets) { // v0.02a+
        var arg = +RegExp.$1;
        targets.forEach(function(target) { target[func](arg); });
    }; // _SATBC._ACT_SEQ_1_ARG

    _SATBC._ACT_SEQS = {
        // Core Module
        'SET CORE SATB': _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setCoreSATB"),
        'SET CORE SATB PROPORTION':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setCoreSATBProportion"),
        'ADD CORE SATB': _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addCoreSATB"),
        'ADD CORE SATB PROPORTION':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addCoreSATBProportion"),
        'MULTIPLY CORE SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "multiplyCoreSATB"),
        'FILL UP CORE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "fillUpCoreSATB"),
        'CLEAR CORE SATB': _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "clearCoreSATB"),
        'SET SATB ACT TIMES':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setSATBActTimes"),
        'ADD SATB ACT TIMES':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addSATBActTimes"),
        'MULTIPLY SATB ACT TIMES':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "multiplySATBActTimes"),
        //
        // (v0.02a+)Charge Module
        'SET CHARGE SATB': _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setChargeSATB"),
        'SET CHARGE SATB PROPORTION':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setChargeSATBProportion"),
        'ADD CHARGE SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addChargeSATB"),
        'ADD CHARGE SATB PROPORTION':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addChargeSATBProportion"),
        'MULTIPLY CHARGE SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "multiplyChargeSATB"),
        'FILL UP CHARGE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "fillUpChargeSATB"),
        'CLEAR CHARGE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "clearChargeSATB"),
        'CANCEL CHARGE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "onCancelSATBCharge"),
        'START FORCE CHARGE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "onStartForceSATBCharge"),
        'END FORCE CHARGE SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "onEndForceSATBCharge"),
        //
        // (v0.03a+)Cooldown Module
        'SET COOLDOWN SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setCooldownSATB"),
        'SET COOLDOWN SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG.bind(
                _SATBC, "setCooldownSATBProportion"),
        'ADD COOLDOWN SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addCooldownSATB"),
        'ADD COOLDOWN SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG.bind(
                _SATBC, "addCooldownSATBProportion"),
        'MULTIPLY COOLDOWN SATB':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "multiplyCooldownSATB"),
        'FILL UP COOLDOWN SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "fillUpCooldownSATB"),
        'CANCEL COOLDOWN SATB':
                _SATBC._ACT_SEQ_0_ARG.bind(_SATBC, "onCancelSATBCooldown"),
        //
        // (v0.05a+)Delay Module
        'SET SATB DELAY SEC COUNTER':
                _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "setSATBDelaySecCounter"),
        'ADD SATB DELAY SEC COUNTER':
               _SATBC._ACT_SEQ_1_ARG.bind(_SATBC, "addSATBDelaySecCounter"),
        'MULTIPLY SATB DELAY SEC COUNTER': _SATBC._ACT_SEQ_1_ARG.bind(
                _SATBC, "multiplySATBDelaySecCounter")
        //
    }, _SATBC._ALL_ACT_SEQS = Object.keys(_SATBC._ACT_SEQS);
    _SATBC._ACT_SEQ_0_ARG_REGEX = / */i;
    _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX = / *([\d\.-]+) */i;
    _SATBC._ACT_SEQ_1_ARG_INT_REGEX = / *([\d-]+) */i;
    _SATBC._ACT_SEQ_1_ARG_NON_NEGATIVE_FLOAT_REGEX = / *([\d\.]+) */i;
    _SATBC._ACT_SEQ_1_ARG_NON_NEGATIVE_INT_REGEX = / *(\d+) */i;
    _SATBC._ACT_SEQ_REGEXES = {
        // Core Module
        'SET CORE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'SET CORE SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD CORE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD CORE SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'MULTIPLY CORE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'FILL UP CORE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'CLEAR CORE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'SET SATB ACT TIMES': _SATBC._ACT_SEQ_1_ARG_NON_NEGATIVE_INT_REGEX,
        'ADD SATB ACT TIMES': _SATBC._ACT_SEQ_1_ARG_INT_REGEX,
        'MULTIPLY SATB ACT TIMES':
                _SATBC._ACT_SEQ_1_ARG_NON_NEGATIVE_FLOAT_REGEX,
        //
        // (v0.02a+)Charge Module
        'SET CHARGE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'SET CHARGE SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD CHARGE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD CHARGE SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'MULTIPLY CHARGE SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'FILL UP CHARGE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'CLEAR CHARGE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'CANCEL CHARGE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'START FORCE CHARGE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'END FORCE CHARGE SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        //
        // (v0.03a+)Charge Module
        'SET COOLDOWN SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'SET COOLDOWN SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD COOLDOWN SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD COOLDOWN SATB PROPORTION': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'MULTIPLY COOLDOWN SATB': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'FILL UP COOLDOWN SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        'CANCEL COOLDOWN SATB': _SATBC._ACT_SEQ_0_ARG_REGEX,
        //
        // (v0.05a+)Delay Module
        'SET SATB DELAY SEC COUNTER': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'ADD SATB DELAY SEC COUNTER': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX,
        'MULTIPLY SATB DELAY SEC COUNTER': _SATBC._ACT_SEQ_1_ARG_FLOAT_REGEX
        //
    }; // _SATBC._ACT_SEQ_REGEXES

    _BM.getNextSubject = BattleManager.getNextSubject;
    _SATBC.getNextSubject = BattleManager.getNextSubject = function() {
    // v0.00a - v0.00a; Extended
        // Added to get the next subject in the 1st turn as well
        if (SATBManager.isEnabled()) return _SATBC._getNextSubject_.call(this);
        // YEP_BattleEngineCore_Stop1stTurnCheck
        return _BM.getNextSubject.apply(this, arguments);
    }; // BattleManager.getNextSubject

    _BM.endAction = BattleManager.endAction;
    _SATBC.endAction = BattleManager.endAction = function() {
    // v0.00a - v0.00a; Extended
        // Added to stop calling onAllActionsEnd for action execution subject
        if (SATBManager.isEnabled()) return _SATBC._endAct.call(this);
        // YEP_BattleEngineCore_HandleNewPhases
        _BM.endAction.apply(this, arguments);
    }; // BattleManager.endAction

    _BM._isActPhase = BattleManager.isSATBActPhase;
    _SATBC._isActPhase = BattleManager.isSATBActPhase = function() {
    // v0.00a - v0.00a; Extended
        // Added to include the new action phases in YEP_BattleEngineCore
        if (_SATBC._isActSeqPhase.call(this)) return true;
        // YEP_BattleEngineCore_AddNewActPhases
        return _BM._isActPhase.apply(this, arguments);
      }; // BattleManager.isSATBActPhase

    _BM.addSATBActBattler = BattleManager.addSATBActBattler;
    BattleManager.addSATBActBattler = function(battler) {
    // v0.00a - v0.00a; Extended
        // Added to ensure those currently executing actions won't be added here
        if (this._performedBattlers.contains(battler)) return;
        // YEP_BattleEngineCore_Stop1stTurnCheck
        _BM.addSATBActBattler.apply(this, arguments);
    }; // BattleManager.addSATBActBattler
    _SATBC.addSATBActBattler = BattleManager.addSATBActBattler;

    _BM.addSATBInputableActor = BattleManager.addSATBInputableActor;
    BattleManager.addSATBInputableActor = function(actor) {
    // v0.00a - v0.00a; Extended
        // Added to ensure the inputable actor can execute actions later on
        if (!this.canActSATB(actor)) this._performedBattlers.eraseElem(actor);
        // YEP_BattleEngineCore_HandleNewPhases
        _BM.addSATBInputableActor.apply(this, arguments);
    }; // BattleManager.addSATBInputableActor
    _SATBC.addSATBInputableActor = BattleManager.addSATBInputableActor;

    _BM.processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function(actionName, actionArgs) {
    // v0.00a - v0.00a; Extended
        // Added to process new action sequences mimicking satb script calls
        if (_SATBC._isActSeq.call(this, actionName)) {
            return _SATBC._procActSeq.call(this, actionName, actionArgs);
        }
        // YEP_BattleEngineCore_ActionSequences
        return _BM.processActionSequence.apply(this, arguments);
    }; // BattleManager.processActionSequence
    _SATBC.processActionSequence = BattleManager.processActionSequence;

    _BM.createActions = BattleManager.createActions;
    _SATBC.createActions = BattleManager.createActions = function() {
    // v0.00a - v0.00a; Extended
        // Rewritten to stop recreating battler acts when starting actor inputs
        if (!SATBManager.isEnabled()) _BM.createActions.apply(this, arguments);
        // YEP_BattleEngineCore_StopRecreateAction
    }; // BattleManager.createActions

    _BM._init = _SATB._init;
    _SATBC._init = _SATB._init = function() { // v0.00a - v0.00a; Extended
        _BM._init.call(this);
        // Added to stop using the lazy contruct to boost performance
        this._performedBattlers = [];
        // YEP_BattleEngineCore_Stop1stTurnCheck
    }; // _SATB._init

    _BM._updateAct = _SATB._updateAct;
    _SATBC._updateAct = _SATB._updateAct = function() {
    // v0.00a - v0.00a; Extended
        _BM._updateAct.apply(this, arguments);
        // Added to update action executions for the new action sequence phases
        _SATBC._updateActSeq.call(this);
        // YEP_BattleEngineCore_HandleNewPhases
    }; // _SATB._updateAct

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @returns {Game_Battler?} The battler to be the action execution subject
     */
    _SATBC._getNextSubject_ = function() {
        for (;;) {
            var battler = this._actionBattlers.shift();
            if (!battler) return null;
            if (!battler.isBattleMember() || !battler.isAlive()) continue;
            this.pushPerformedBattler(battler);
            return battler;
        }
    }; // _SATBC._getNextSubject_

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATBC._endAct = function() {
        // Otherwise no battler can ever execute actions again
        this._performedBattlers.eraseElem(this._subject);
        /** @todo Checks for other places erasing the performed battlers */
        if (this._processingForcedAction) {
            this._subject.removeCurrentAction();
            this._phase = this._preForcePhase;
        }
        this._processingForcedAction = false;
        if (this.loadPreForceActionSettings()) return;
        Yanfly.BEC.BattleManager_endAction.call(this);
        // Otherwise the battle turn clock action counter unit won't update
        _SATB._endAct.call(this);
        // Forced actions shouldn't be counted
    }; // _SATBC._endAct

    /**
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATBC._updateActSeq = function() {
        if (!this.isBusy()) switch (this._phase) {
            case 'phaseChange': return this.updatePhase();
            case 'actionList': return this.updateActionList();
            case 'actionTargetList': return this.updateActionTargetList();
        }
    }; // _SATB._updateActSeq

    /**
     * The this pointer is BattleManager
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} actName - The action sequence tag name
     * @returns {Boolean} The check result
     */
    _SATBC._isActSeq = function(actName) {
        if (!SATBManager.isEnabled()) return false;
        return _SATBC._ALL_ACT_SEQS.contains(actName);
    }; // _SATBC._isActSeq

    /**
     * The this pointer is BattleManager
     * Potential Hotspot
     * @since v0.00a @version v0.00a
     * @enum @param {String} actName - The action sequence tag name
     * @param {[*]} actArgs - The action sequence tag parameter values
     */
    _SATBC._procActSeq = function(actName, actArgs) {
        var targets = this.makeActionTargets(actArgs[0]);
        if (targets.length <= 0) return true;
        var cmd = actArgs[1];
        // Returning false means that it's an invalid action sequence
        if (typeof cmd !== "string" && !(cmd instanceof String)) return false;
        if (!cmd.match(_SATBC._ACT_SEQ_REGEXES[actName])) return false;
        // It's possible for cmd to be an empty String so !cmd can't be used
        _SATBC._ACT_SEQS[actName](targets);
        return true;
    }; // _SATBC._procActSeq

    /**
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATBC._isActSeqPhase = function() {
    // v0.00a - v0.00a; Extended
        if (this._phase === 'actionTargetList') return true;
        return this._phase === 'actionList' || this._phase === 'phaseChange';
    }; // _SATB._isActSeqPhase

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore);
// BattleManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      - Fixes the sprite of the currently inputable actor wrongly returning
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Game_Battler = { orig: {}, new: {} };
    var $ = Game_Battler.prototype;
    var _GB = SATBC.Game_Battler.orig, _SATBC = SATBC.Game_Battler.new;

    _GB.spriteReturnHome = $.spriteReturnHome;
    _SATBC.spriteReturnHome = $.spriteReturnHome = function() {
    // v0.00a - v0.00a; Extended
        // Added to stop returning home for sprite of the currently inpuable one
        if (SATBManager.isEnabled() && BattleManager.actor() === this) return;
        // YEP_BattleEngineCore_StopInputableActorReturnHome
        _GB.spriteReturnHome.apply(this, arguments);
    }; // $.spriteReturnHome

})(DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore); // Game_Battler

/*----------------------------------------------------------------------------
 *    # (v0.05a+)Edit class: Window_BattleStatus
 *      - Implements force charge and cancel charge cooldown by mouse/touch
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Window_BattleStatus = { orig: {}, new: {} };
    var $ = Window_BattleStatus.prototype, $$ = Window_Selectable.prototype;
    var WBA = Window_BattleActor.prototype;
    var _WBS = SATBC.Window_BattleStatus.orig;
    var _SATBC = SATBC.Window_BattleStatus.new;

    // It's to prevent unknowningly overriding that from other plugins
    if ($.processTouch) {
        _WBS.processTouch = $.processTouch;
        _SATBC.processTouch = $.processTouch = function() {
        // v0.05a - v0.05a; Extended
            // Added to orce charge and cancel charge cooldown by mouse/touch
            _SATBC._procHotkeyTouchTrigger.call(this);
            //
            _WBS.processTouch.apply(this, arguments);
        }; // $.processTouch
    } else {
        /**
         * Hotspot/Idempotent
         * @interface @override @since v0.05a @version v0.05a
         */
        $.processTouch = function() {
            _SATBC._procHotkeyTouchTrigger.call(this);
            $$.processTouch.call(this);
        }; // $.processTouch
    }
    //

    /**
     * The this pointer is Window_BattleStatus.prototype
     * Hotspot/Idempotent
     * @since v0.05a @version v0.05a
     */
    _SATBC._procHotkeyTouchTrigger = function() {
        if (!Yanfly.Param.BECActorSelect) return;
        if (!TouchInput.isTriggered() || this.isTouchedInsideFrame()) return;
        var i = this.getClickedActor();
        if (i < 0) return;
        var actor = $gameParty.members()[i];
        actor.onCancelSATBCharge();
        actor.onCancelSATBCooldown();
    }; // _SATBC._procHotkeyTouchTrigger

    // It's safe to do so as they should be new methods of YEP_BattleEngineCore
    $.getClickedActor = WBA.getClickedActor;
    $.isClickedActor = WBA.isClickedActor;
    //

})(DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore);
// Window_BattleStatus

/*----------------------------------------------------------------------------
 *    # (v0.01a+)Edit class: Window_ActorCommand
 *      - Fixes the sprite of the currently inputable actor wrongly returning
 *----------------------------------------------------------------------------*/

(function(SATBC) {

    "use strict";

    SATBC.Window_ActorCommand = { orig: {}, new: {} };
    var $ = Window_ActorCommand.prototype, $$ = Window_Selectable.prototype;
    var WBA = Window_BattleActor.prototype;
    var _WAC = SATBC.Window_ActorCommand.orig;
    var _SATBC = SATBC.Window_ActorCommand.new;

    // It's to prevent unknowningly overriding that from other plugins
    if ($.processTouch) {
        _WAC.processTouch = $.processTouch;
        _SATBC.processTouch = $.processTouch = function() {
        // v0.01a - v0.01a; Extended
            // Added to change inputable actors by touching the actor sprites
            _SATBC._procHotkeyTouch.call(this);
            // YEP_BattleEngineCore_TouchActorChangeSelected
            _WAC.processTouch.apply(this, arguments);
        }; // $.processTouch
    } else {
        /**
         * Hotspot/Idempotent
         * @interface @override @since v0.01a @version v0.01a
         */
        $.processTouch = function() {
            _SATBC._procHotkeyTouch.call(this);
            $$.processTouch.call(this);
        }; // $.processTouch
    }
    //

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.02a
     */
    _SATBC._procHotkeyTouch = function() {
        if (!SATBManager.areModulesEnabled(["IsHotkeyEnabled"])) return;
        if (!this.isOpenAndActive()) return;
        _SATBC._procHotkeyTouchSelect.call(this);
        _SATBC._procHotkeyTouchTrigger.call(this);
    }; // _SATBC._procHotkeyTouch

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     */
    _SATBC._procHotkeyTouchSelect = function() {
        if (!Yanfly.Param.BECSelectMouseOver) return;
        var i = this.getMouseOverActor();
        if (i < 0) return;
        var mem = $gameParty.members()[i];
        if (mem.isSelected()) return;
        SoundManager.playCursor();
        $gameParty.select(mem);
    }; // _SATBC._procHotkeyTouchSelect

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @since v0.01a @version v0.01a
     */
    _SATBC._procHotkeyTouchTrigger = function() {
        if (!Yanfly.Param.BECActorSelect) return;
        if (!TouchInput.isTriggered() || this.isTouchedInsideFrame()) return;
        var i = this.getClickedActor();
        if (i < 0) return;
        var indiceKeys = $gameSystem.satbParamFunc("inputableActorKeys")();
        this.callHandler(indiceKeys[i]);
    }; // _SATBC._procHotkeyTouchTrigger

    // It's safe to do so as they should be new methods of YEP_BattleEngineCore
    $.getClickedActor = WBA.getClickedActor;
    $.isClickedActor = WBA.isClickedActor;
    $.getMouseOverActor = WBA.getMouseOverActor;
    $.isMouseOverActor = WBA.isMouseOverActor;
    //

})(DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore);
// Window_ActorCommand

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Fixes the various battle help windows not opening/being up to date
 *----------------------------------------------------------------------------*/

(function(SATB, SATBC) {

    "use strict";

    SATBC.Scene_Battle = { orig: {}, new: {} };
    var $ = Scene_Battle.prototype, _SATB = SATB.Scene_Battle.new;
    var _SB = SATBC.Scene_Battle.orig, _SATBC = SATBC.Scene_Battle.new;

    _SATBC._REFRESH_TARGET_WIN = function(win) {
        if (!win.visible) return;
        win.reselect();
        win.updateHelp();
    }; // _SATBC._REFRESH_TARGET_WIN

    _SB.startPartyCommandSelection = $.startPartyCommandSelection;
    $.startPartyCommandSelection = function() {
    // v0.00a - v0.00a; Extended
        // Added to use the default startPartyCommandSelection for SATB
        if (SATBManager.isEnabled()) {
            return Yanfly.BEC.Scene_Battle_startPartyCommandSelection.apply(
                    this, arguments);
        }
        // YEP_BattleEngineCore_PartyCmdSelectStopNextCmd
        _SB.startPartyCommandSelection.apply(this, arguments);
    }; // $.startPartyCommandSelection
    _SATBC.startPartyCommandSelection = $.startPartyCommandSelection;

    _SB.refreshSATBInputWins = $.refreshSATBInputWins;
    _SATBC.refreshSATBInputWins = $.refreshSATBInputWins = function() {
    // v0.00a - v0.00a; Extended
        _SB.refreshSATBInputWins.apply(this, arguments);
        // Added to refresh the target help window as well
        _SATBC._refreshTargetWins.call(this);
        // YEP_BattleEngineCore_UpdateSelectionHelpWindow
    }; // $.refreshSATBInputWins

    _SB._deactivateHideSelectionWins = _SATB._deactivateHideSelectionWins;
    _SATB._deactivateHideSelectionWins = function() {
    // v0.00a - v0.00a; Extended
        _SB._deactivateHideSelectionWins.call(this, arguments);
        // Added to close the help window as well
        _SATBC._hideClearHelpWin.call(this);
        // YEP_BattleEngineCore_CloseInvalidTargetHelpWindow
    }; // _SATB._deactivateHideSelectionWins
    _SATBC._deactivateHideSelectionWins = _SATB._deactivateHideSelectionWins;

    _SB._hideSelectionWins = _SATB._hideSelectionWins;
    _SATBC._hideSelectionWins = _SATB._hideSelectionWins = function() {
    // v0.00a - v0.00a; Extended
        _SB._hideSelectionWins.call(this, arguments);
        // Added to close the help window as well
        _SATBC._hideClearHelpWin.call(this);
        // YEP_BattleEngineCore_CloseInvalidTargetHelpWindow
    }; // _SATB._hideSelectionWins

    _SB._selectNextCmd = _SATB._selectNextCmd;
    _SATBC._selectNextCmd = _SATB._selectNextCmd = function() {
    // v0.02a - v0.02a; Extended
        _SB._selectNextCmd.apply(this, arguments);
        // Added to stop wrongly showing that all targets are selected afterward
        _SATBC._clearTargetSelections.call(this);
        // YEP_BattleEngineCore_ClearTargetSelections
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATBC._refreshTargetWins = function() {
        [
            this._actorWindow,
            this._enemyWindow
        ].forEach(_SATBC._REFRESH_TARGET_WIN);
    }; // _SATBC._refreshTargetWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATBC._hideClearHelpWin = function() {
        if (Yanfly.Param.BECSelectHelp) this._helpWindow.hide();
        this._helpWindow.clear();
    }; // _SATBC._hideClearHelpWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.02a @version v0.02a
     */
    _SATBC._clearTargetSelections = function() {
        this._helpWindow.clear();
        BattleManager.stopAllSelection();
    }; // _SATBC._clearTargetSelections

})(DoubleX_RMMV.SATB, DoubleX_RMMV.SATB.Compatibilities.YEP_BattleEngineCore);
// Scene_Battle

} // if (Imported.YEP_BattleEngineCore)

/*----------------------------------------------------------------------------*/

} else {
    alert("DoubleX RMMV Superlative ATB Implementations should be above " +
            "DoubleX RMMV Superlative ATB Compatibilities");
} // if (DoubleX_RMMV["Superlative ATB Implementations"])

/*============================================================================*/
