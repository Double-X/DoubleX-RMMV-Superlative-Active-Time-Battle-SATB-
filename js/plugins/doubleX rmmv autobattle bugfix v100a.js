/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Autobattle Bugfix
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. In the default RMMV battle system, doing anything other than
 *       calculating the skill/item damage in its damage formula can lead to
 *       those side effects unintentionally applied to all possible targets of
 *       that skill/item if the actor having it is in autobattle mode as its
 *       damage formula will be run to have the evaluated damage value for
 *       each target in order to determine which usable skill/item should be
 *       used to which possible target
 *    2. This plugin lets you specify a regular expression to use only the
 *       desired portions of the damage formula when running the
 *       aforementioned evaluation, while still preserving the damage formula
 *       as-is when actually executing the action
 *    3. You should try to standardize the damage formula structure so you can
 *       write an easy, simple and small regular expression that can always
 *       separate the side effects parts from the damage calculation parts
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. If you repost this plugin directly(rather than just linking back),
 *         you shall inform me of these direct repostings. I always reserve
 *         the right to request you to edit those direct repostings.
 *      5. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions not needing follow so.
 *      6. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Little RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *      Regular Expression Learning Sites:
 *      1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *      2. https://regex101.com/
 *      Javascript Sandbox:
 *      1. https://playcode.io/
 *----------------------------------------------------------------------------
 *    # Links
 *      This Plugin:
 *      1. https://pastebin.com/kkPFFX4v
 *      Videos:
 *      1. https://www.youtube.com/watch?v=XED7XxK6ad8
 *      Posts:
 *      1. https://forums.rpgmakerweb.com/index.php?threads/doublex-rmmv-autobattle-bugfix.122548/
 *      2. https://www.rpgmakercentral.com/topic/42459-doublex-rmmv-autobattle-bugfix/
 *      3. https://rpgmaker.net/scripts/786/
 *      4. http://www.hbgames.org/forums/viewtopic.php?f=332&p=944734
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. The default plugin parameters file name is
 *         doubleX rmmv autobattle bugfix v100a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Autobattle_Bugfix_File, which must be done via opening
 *         this plugin js file directly
 *----------------------------------------------------------------------------
 *    # Contributors
 *      Authors:
 *      1. DoubleX
 *      Plugin Development Collaborators:
 *      - None So Far
 *      Bug Reporters:
 *      - None So Far
 *      Compatibility Issue Raisers:
 *      - None So Far
 *      Feature Requesters:
 *      - None So Far
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0400 7-Jun-2020)
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you fixes leaked side effects bugs when an autobattle
 * actor has skills/items with damage formulae having side effects
 * @author DoubleX
 *
 * @param isEnabled
 * @type note
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param sideEffectFreeDmgFormula
 * @type note
 * @desc Sets how to pick which damage formula part to use
 * It'll be the contents of a function returning a String
 * @default "return dmgFormula.replace(new RegExp('.*[};] *', 'gim'), '');"
 *
 * @help
 *============================================================================
 *    ## Parameter Info
 *----------------------------------------------------------------------------
 *    # Function arguments
 *      1. isEnabled
 *         None
 *      2. sideEffectFreeDmgFormula
 *         dmgFormula - The original damage formula of the skill/item to be
 *                      evaluated when the actor in the autobattle mode
 *                      evaluates which skill/item to be used on which target
 *    # Valid values
 *      1. isEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. sideEffectFreeDmgFormula
 *         Any valid Javascript returning the damage formula which returns a
 *         Number and has no unintended side effects
 *    # Examples
 *      1. isEnabled
 *         Setting isEnabled as
 *         return $gameSwitches.value(1);
 *         will enable this plugin only if the game switch with id 1 is on
 *      2. sideEffectFreeDmgFormula
 *         Setting sideEffectFreeDmgFormula as
 *         return dmgFormula.replace(new RegExp(.*[};] *, 'gim'), "");
 *         will only use the damage formula portion after the last } or ;
 *         - The following original damage formula:
 *           if ($gameSwitches.value(2)) { b.addState(4); } a.atk * 2 - b.def
 *           Will become:
 *           a.atk * 2 - b.def
 *           Which is a valid damage formula just returning the damage
 *         - The following original damage formula:
 *           b.addState(4); a.atk * 2 - b.def
 *           Will become:
 *           a.atk * 2 - b.def
 *           Which is a valid damage formula just returning the damage
 *         - The following original damage formula:
 *           $gameSwitches.value(2)?(b.addState(4);a.atk*4-b.def*2):a.atk*2-b.def
 *           Will become:
 *           a.atk*4-b.def*2):a.atk*2-b.def
 *           Which is syntactically invalid so the new formula won't be run
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Autobattle Bugfix"] = "v1.00a";

// The plugin file name must be the same as DoubleX_RMMV.Skill_Progress_File
DoubleX_RMMV.Autobattle_Bugfix_File = "doubleX rmmv autobattle bugfix v100a";
//

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what a particular regular expression does
 *         - Some RMMV plugin development proficiency to fully comprehend
 *           this plugin
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Autobattle_Bugfix = {

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} param - The name of the parameter content to be converted
     * @param {String} val - The parameter content to be converted to JSON
     */
    tryJSONParam: function(param, val) {
        "use strict";
        if (!val) return val;
        // It's possible for users to input raw parameter values directly
        try {
            return DoubleX_RMMV.Autobattle_Bugfix.jsonParam(JSON.parse(val));
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
    }, // tryJSONParam

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} val - The parameter content to be converted to JSON
     */
    jsonParam: function(val) {
        "use strict";
        // Some parameters written in notes may need to be parsed multiple times
        try {
            return DoubleX_RMMV.Autobattle_Bugfix.jsonParam(JSON.parse(val));
        } catch (err) { return val; }
        //
    }, // jsonParam

    /**
     * No-op
     * @since v1.00a @version v1.00a
     * @param {String} dmgFormula - The original damage formula to be evaluated
     * @param {String} sideEffectFreeFormula - The new side effect side version
     */
    onSideEffectFreeFormulaErr: function(dmgFormula, sideEffectFreeFormula, e) {
        "use strict";
        console.warn([
            "DoubleX RMMV Autobattle Bugfix failed to convert formula from:",
            dmgFormula,
            "to a valid side effect free one as the converted version failed:",
            sideEffectFreeFormula,
            "which is converted using this function:",
            DoubleX_RMMV.Autobattle_Bugfix.sideEffectFreeDmgFormula,
            "The following's the relevant error stacktrace:",
            e.stack
        ].join("\n"));
    } // onSideEffectFreeFormulaErr

}; // DoubleX_RMMV.Autobattle_Bugfix

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Clears actor notetag before save and inits them afterwards/upon load
 *----------------------------------------------------------------------------*/

(function(AB) {

    "use strict";

    AB.Game_System = { orig: {}, new: {} };
    var _GS = AB.Game_System.orig, _AB = AB.Game_System.new;
    var $ = Game_System.prototype;

    _GS.initialize = $.initialize;
    _AB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _GS.initialize.apply(this, arguments);
        // Added to convert all parameter function contents to working functions
        _AB._loadParamFuncs.call(this);
        //
    }; // $.initialize

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AB._loadParamFuncs = function(target) {
        var params =
                PluginManager.parameters(DoubleX_RMMV.Autobattle_Bugfix_File);
        var isEnabled = AB.tryJSONParam("isEnabled", params.isEnabled);
        AB.isEnabled = new Function(isEnabled);
        var sideEffectFreeDmgFormula = AB.tryJSONParam(
                "sideEffectFreeDmgFormula", params.sideEffectFreeDmgFormula);
        AB.sideEffectFreeDmgFormula =
                new Function("dmgFormula", sideEffectFreeDmgFormula);
    }; // _AB._loadParamFuncs

})(DoubleX_RMMV.Autobattle_Bugfix); // Game_System

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Action
 *      - Uses Just The Returning Damage Part Of The Formula Upoon Evaluation
 *----------------------------------------------------------------------------*/

(function(AB) {

    "use strict";

    AB.Game_Action = { orig: {}, new: {} };
    var _GA = AB.Game_Action.orig, _AB = AB.Game_Action.new;
    var $ = Game_Action.prototype;

    _GA.evaluateWithTarget = $.evaluateWithTarget;
    _AB.evaluateWithTarget = $.evaluateWithTarget = function(target) {
    // v1.00a - v1.00a; Extended
        // Added to separate target evaluation cases from executing action cases
        if (AB.isEnabled()) return _AB._evalWithTarget.call(this, target);
        //
        _GA.evaluateWithTarget.apply(this, arguments);
    };

    /**
     * The this pointer is Game_Action.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Game_Battler} target - The target hit by the skill involved
     * @returns {Number} The end evaluated damage towards the target
     */
    _AB._evalWithTarget = function(target) {
        if (!this.isHpEffect()) return;
        var val = _AB._evalDmgValWithoutCri.call(this, target);
        if (this.isForOpponent()) return val / Math.max(target.hp, 1);
        return Math.min(-val, target.mhp - target.hp) / target.mhp;
    }; // _AB._evalWithTarget

    /**
     * The this pointer is Game_Action.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Game_Battler} target - The target hit by the skill involved
     * @returns {Number} The raw evaluated damage towards the target
     */
    _AB._evalDmgValWithoutCri = function(target) {
        var baseVal = _AB._evalDmgFormulaWithoutSideEffects.call(this, target);
        var val = baseVal * this.calcElementRate(target);
        if (this.isPhysical()) val *= target.pdr;
        if (this.isMagical()) val *= target.mdr;
        if (baseVal < 0) val *= target.rec;
        val = this.applyVariance(val, this.item().damage.variance);
        return Math.round(this.applyGuard(val, target));
    }; // _AB._evalDmgValWithoutCri

    /**
     * The this pointer is Game_Action.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Game_Battler} target - The target hit by the skill involved
     * @returns {Number} Damage returned by new side-effect free damage formula
     */
    _AB._evalDmgFormulaWithoutSideEffects = function(target) {
        try {
            var item = this.item();
            var a = this.subject(), b = target, v = $gameVariables._data;
            var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            var dmgFormula = item.damage.formula;
            var sideEffectFreeFormula = AB.sideEffectFreeDmgFormula(dmgFormula);
            var val = Math.max(eval(sideEffectFreeFormula), 0) * sign;
    	    	if (isNaN(val)) val = 0;
    	    	return val;
        } catch (e) {
            AB.onSideEffectFreeFormulaErr(dmgFormula, sideEffectFreeFormula, e);
            return 0;
        }
    }; // _AB._evalDmgFormulaWithoutSideEffects

})(DoubleX_RMMV.Autobattle_Bugfix); // Game_Action
