// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.00a";
//

/*:
 * @plugindesc The configuration plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 *
 * Plugins Ordering:
 * DoubleX RMMV Superlative ATB Parameters(Optional but highly recommended to make this plugin easier to use)
 * DoubleX RMMV Superlative ATB Configurations(Mandatory even if you never access the configurations yourselves)
 * DoubleX RMMV Superlative ATB Implementations(Mandatory)
 * DoubleX RMMV Superlative ATB Unit Test(Optional but useful when debugging by validating parameters/configuration/notetag values and script call/plugin command arguments)
 * DoubleX RMMV Superlative ATB Compatibility(Optional but should be placed below all addressed plugins when needed)
 * DoubleX RMMV Superlative ATB Documentations(Optional but highly recommended to check plugin versions and make reading documentations easier)
 *
 * Getting Started:
 * Only the core, bar and hotkey modules should be enabled when you first experience SATB
 * Play the demo to be familiar with the essential features and the demo first
 * Enable other modules of interest one at a time to be familiar with them one by one by playing the demo
 * Enable other compatible plugins to determine whether SATB suits your needs with those plugins
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
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            IsCoreEnabled: function() {
                return true; // Always enable this plugin
            }, // IsCoreEnabled

            /**
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Number} The number of ATB frames
             */
            coreBaseFillATBFrame: function() { return 600; },

            /**
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The number of ATB seconds
             */
            coreBaseFillATBSec: function() { return 5.0; },

            /**
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
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            canCoreTurnOverflow: function() { return false; },

            /**
             * The this pointer refers to the battler involved
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
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             *                                 DON'T USE IT IF THE CHAINING RULE
             *                                 IS AN ASSOCIATIVE OPERATOR
             *                                 Refer to reference tag
             *                                 ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Number} The maximum ATB value(Which should be
             *                       positive) for the battler involved
             */
            CMATB_MAX: function(datum, datumType, latestMax) {
                // Returns 2 and 1 if max is greater and not greater than 100
                return latestMax > 100.0 ? 2 : 1;
                //
            }, // CMATB_MAX

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             *                                 DON'T USE IT IF THE CHAINING RULE
             *                                 IS AN ASSOCIATIVE OPERATOR
             *                                 Refer to reference tag
             *                                 ASSOCIATIVE_CHAINING_RULE
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
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Number} latestMax - Max ATB value up to latest note
             *                                 DON'T USE IT IF THE CHAINING RULE
             *                                 IS AN ASSOCIATIVE OPERATOR
             *                                 Refer to reference tag
             *                                 ASSOCIATIVE_CHAINING_RULE
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

        /*--------------------------------------------------------------------
         *    Core Act State Functions
         *    - Setups CASX used by this plugin's coreActState notetags
         *--------------------------------------------------------------------*/
        /* CASX names can only use alphanumeric characters
         * The 1st character of CASX can't be a number
         * The below CASX are examples added to help you set your CASX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CASX can be used on notetags other than coreActState if you
         * know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CASX
         */
        coreActState: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CASX_TRUE: function(datum, datumType) {
                // Always set the state as an action state
                return true;
                //
            }, // CASX_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CASX_BATTLER_NAME: function(datum, datumType) {
                // Set the state as an action state if the battler name is Test
                return this.name() === "Test";
                //
            }, // CASX_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CASX_SWITCH: function(datum, datumType) {
                // Set the state as an action state if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CASX_SWITCH

            // Adds new CASX here


        }, // coreActState

    } // notes

}; // DoubleX_RMMV.SATB
