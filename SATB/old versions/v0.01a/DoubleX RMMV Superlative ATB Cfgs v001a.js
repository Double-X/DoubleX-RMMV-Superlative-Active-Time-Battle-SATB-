// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.01a";
//

/*:
 * @plugindesc The configuration plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 *
 * Plugins Ordering:
 * DoubleX RMMV Superlative ATB Parameters(Mandatory as not all parameters have the configuration counterparts)
 * DoubleX RMMV Superlative ATB Configurations(Mandatory even if you never access the configurations yourselves)
 * DoubleX RMMV Superlative ATB Implementations(Mandatory)
 * DoubleX RMMV Superlative ATB Unit Tests(Optional but useful when debugging by validating parameters/configuration/notetag values and script call/plugin command arguments)
 * DoubleX RMMV Superlative ATB Compatibilities(Optional but should be placed below all addressed plugins when needed)
 * DoubleX RMMV Superlative ATB Compatibility Tests(Optional but useful when the unit test plugin's also enabled)
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

(function(SATB) {

    "use strict";

    /**
     * Setups everything that has to be setup for this plugin in battle test
     * It's very useful when some parameters/notetags use switches/variables
     * @since v0.00a @version v0.00a
     */
    SATB.onSetupBattleTest = function() {
        // These game switches and variables are used in the default SATB demo
        $gameSwitches.setValue(5, true);
        $gameVariables.setValue(2, 2);
        $gameVariables.setValue(3, "return 1.25;");
        $gameVariables.setValue(4, "1.6");
        $gameVariables.setValue(5, 1);
        //
        // Sets game loop fps to be 120, being the same as that of render loop
        SceneManager._deltaTime = 1.0 / 120.0;
        //
        // This game switch's used in the unit test plugin
        setTimeout(function() { $gameSwitches.setValue(6, true); }, 500);
        //
    }; // SATB.onSetupBattleTest

    /*------------------------------------------------------------------------
     *    # Parameter counterparts
     *    - These configurations are only used when their counterparts' empty
     *------------------------------------------------------------------------*/

    SATB.params = {

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
             * Sets base number of ATB frames needed to fill up the ATB value
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Number} The number of ATB frames
             */
            coreBaseFillATBFrame: function() { return 600; },

            /**
             * Sets base number of ATB seconds needed to fill up the ATB value
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The number of ATB seconds
             */
            coreBaseFillATBSec: function() { return 5.0; },

            /**
             * Sets the amount of ATB time elapsed constituting a battle turn
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @enum @param {+ve Number} baseFillATB - coreBaseFillATBFrame
             *                                         coreBaseFillATBSec
             * @returns {+ve Number} The turn time duration
             */
            coreTurnATBTime: function(baseFillATB) {
                // coreBaseFillATBFrame or coreBaseFillATBSec * 2.0 = turn time
                return baseFillATB * 2.0 * +$gameVariables.value(5);
                // multiplied by the value of the game variable with id 5
            }, // coreTurnATBTime

            /**
             * Sets the number of actions constituting a battle turn
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Number} The number of actions making a turn
             */
            coreTurnATBAct: function() {
                // The number of all battlers in battle
                return BattleManager.allBattleMembers().length *
                        +$gameVariables.value(5);
                // multiplied by the value of the game variable with id 5
            }, // coreTurnATBAct

            /**
             * Sets whether battle turn clock counter can overflow to next turn
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            canCoreTurnOverflow: function() { return false; },

            /**
             * The this pointer refers to the battler involved
             * Sets the base maximum ATB value of the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The maximum ATB value of the battler
             */
            coreMaxATBVal: function() { return 100.0; }

        }, // core

        /*--------------------------------------------------------------------
         *    (v0.01a+)Hotkey Module
         *    - Lets players change which inputable actors to input actions
         *--------------------------------------------------------------------*/
        hotkey: {

            /**
             * Sets whether the Hotkey Module will be enabled
             * Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {Boolean} The check result
             */
            IsHotkeyEnabled: function() {
                return true; // Always enable the Hotkey Module
            }, // IsHotkeyEnabled

            /**
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {KeyMap} Mapping of hotkey selecting prev input actor
             */
            prevInputableActorKey: function() {
                // Hotkey whose mapping is 'left' will select prior input actor
                return 'left';
                //
            }, // prevInputableActorKey

            /**
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {KeyMap} Mapping of hotkey selecting next input actor
               */
            nextInputableActorKey: function() {
                // Hotkey whose mapping is 'right' will select next input actor
                return 'right';
                //
            }, // nextInputableActorKey

            /**
             * Sets whether this plugin will be enabled
             * Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {[KeyMap]} List of mappings of hotkey selecting ith mem
             */
            inputableActorKeys: function(baseFillATB) {
                // Returns a list of hotkey mappings corresponding to hotkeys
                return [
                    '#1', // Tries to select the 1st party member to input
                    '#2', // Tries to select the 2nd party member to input
                    '#3', // Tries to select the 3rd party member to input
                    '#4', // Tries to select the 4th party member to input
                    '#5', // Tries to select the 5th party member to input
                    '#6', // Tries to select the 6th party member to input
                    '#7', // Tries to select the 7th party member to input
                    '#8', // Tries to select the 8th party member to input
                    '#9', // Tries to select the 9th party member to input
                    '#10' // Tries to select the 10th party member to input
                ];
                //
            }, // inputableActorKeys

      }, // hotkey

    }; // SATB.params

    /*------------------------------------------------------------------------
     *    # Notetag values
     *    - These functions are used by notetags using function name as values
     *------------------------------------------------------------------------*/

    SATB.notes = {

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
            CMATB_AGI: function(datum, datumType, latestMax) {
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
            CMATB_VAR: function(datum, datumType, latestMax) {
                // Returns the Number value in the game variable with id 4
                return +$gameVariables.value(4);
                // Numbers with decimals should be stored in the String form
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

    }; // SATB.notes

})(DoubleX_RMMV.SATB = {});
