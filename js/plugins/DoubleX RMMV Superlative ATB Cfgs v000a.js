// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.00a";
//

/*:
 * @plugindesc The configuration plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 */

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.SATB = {

/*----------------------------------------------------------------------------
 *    # Parameter counterparts
 *    - These configurations will only be used when their counterparts' empty
 *----------------------------------------------------------------------------*/

    params: {

        /*--------------------------------------------------------------------
         *    Core Module
         *    - The bare essentials of this plugin
         *--------------------------------------------------------------------*/
        core: {

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            IsCoreEnabled: function() {
                return true; // Always enable this plugin
            }, // IsCoreEnabled

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The number of ATB frames
             */
            coreBaseFillATBFrame: function() { return 600; },

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The number of ATB seconds
             */
            coreBaseFillATBSec: function() { return 5.0; },

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @enum @param {+ve Number} baseFillATB - coreBaseFillATBFrame
             *                                         coreBaseFillATBSec
             * @returns {+ve Number} The turn time duration
             */
            coreTurnATBTime: function(baseFillATB) {
                // coreBaseFillATBFrame or coreBaseFillATBSec * 2.0 = turn time
                return baseFillATB * 2.0;
                //
            }, // coreTurnATBTime

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Number} The number of actions making a turn
             */
            coreTurnATBAct: function() {
                // The number of all battlers in battle
                return BattleManager.allBattleMembers().length;
                //
            }, // coreTurnATBAct

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            canCoreTurnOverflow: function() { return false; },

            /**
             * The this pointer refers to the actor involved
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The maximum ATB value of the battler
             */
            coreMaxATBVal: function() { return 100.0; }

        }, // core

    }, // params

/*----------------------------------------------------------------------------
 *    # Notetag values
 *    - These functions are used by notetags using function name as values
 *----------------------------------------------------------------------------*/

    notes: {

        /*--------------------------------------------------------------------
         *    Core ATB Max Functions
         *    - Setups CMATBX used by this plugin's coreMax notetags
         *--------------------------------------------------------------------*/
        /* CMATBX names can only use alphanumeric characters
         * The 1st character of CMATBX can't be a number
         * The below CMATBX are examples added to help you set your CMATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CMATBX can be used on notetags other than coreMax if you
         * know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CMATBX
         */
        coreMax: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {{*}} datum - The datum having this notetag
             * @enum @param {String} datumType - Refers to reference tag
             *                                   NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             * @returns {+ve Number} The maximum ATB value(Which should be
             *                       positive) for the battler involved
             */
            CMATB_MAX: function(datum, datumType, latestMax) {
                // Returns 2 and 1 if max is greater and not greater than 100
                return max > 100.0 ? 2 : 1;
                //
            }, // CMATB_MAX

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {{*}} datum - The datum having this notetag
             * @enum @param {String} datumType - Refers to reference tag
             *                                   NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             * @returns {+ve Number} The maximum ATB value(Which should be
             *                       positive) for the battler involved
             */
            CMATB_MAX: function(datum, datumType, latestMax) {
                return 999 - this.agi; // 999 - the battler's AGI
            }, // CMATB_AGI

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {{*}} datum - The datum having this notetag
             * @enum @param {String} datumType - Refers to reference tag
             *                                   NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             * @returns {+ve Number} The maximum ATB value(Which should be
             *                       positive) for the battler involved
             */
            CMATB_MAX: function(datum, datumType, latestMax) {
                // Returns the value in the game variable with id x
                return $gameVariables.value(x);
                //
            }, // CMATB_VAR

            // Adds new CMATBX here


        }, // coreMax

    } // notes

}; // DoubleX_RMMV.SATB
