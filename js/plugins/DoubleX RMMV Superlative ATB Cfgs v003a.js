// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.03a";
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
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            IsCoreEnabled: function() {
                return true; // Always enable this plugin
            }, // IsCoreEnabled

            /**
             * Sets base number of ATB frames needed to fill up the ATB value
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Number} The number of ATB frames
             */
            coreBaseFillATBFrame: function() { return 600; },

            /**
             * Sets base number of ATB seconds needed to fill up the ATB value
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The number of ATB seconds
             */
            coreBaseFillATBSec: function() { return 5.0; },

            /**
             * Sets the amount of ATB time elapsed constituting a battle turn
             * Hotspot/Nullipotent
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
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Number} The maximum ATB value of the battler
             */
            coreMaxATBVal: function() { return 100.0; }

        }, // core

        /*--------------------------------------------------------------------
         *    (v0.03a+)Bar Module
         *    - Lets you attach battler ATB value bars to the battler sprites
         *--------------------------------------------------------------------*/
        bar: {

            /**
             * Sets whether the Bar Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Boolean} The check result
             */
            IsBarEnabled: function() {
                return true; // Always enable the Bar Module
            }, // IsBarEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler ATB value bar will be shown
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Boolean} The check result
             */
            isShowATBBar: function() {
                // Checks whether the battler's actor or has state with id 13
                return this.isActor() || this.isStateAffected(13);
                //
            }, // isShowATBBar

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler ATB value bar will be shown
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {String} The battler ATB value bar text
             */
            atbBarText: function() {
                var cur = Math.floor(this.coreSATB()); // The current ATB value
                var max = Math.floor(this.coreMaxSATB()); // The max ATB value
                // The number of virtual action slots
                var actTimes = this.satbActTimes();
                //
                // current ATB value/max ATB value : virtual action slot count
                return cur + '/' + max + ' : ' + actTimes;
                //
            }, // atbBarText

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB value bar x offset relative to the battler sprite
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Number} The battler ATB value bar x offset
             */
            atbBarXOffset: function() { return -40; },

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB value bar y offset relative to the battler sprite
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Number} The battler ATB value bar y offset
             */
            atbBarYOffset: function() { return 10; },

            /**
             * The this pointer refers to the battler involved
             * Sets the width of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Number} The battler ATB value bar width
             */
            atbBarW: function() { return 80; },

            /**
             * The this pointer refers to the battler involved
             * Sets the height of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Number} The battler ATB value bar height
             */
            atbBarH: function() { return 20; },

            /**
             * The this pointer refers to the battler involved
             * Sets the size of the text showing the battler ATB values
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Number} The battler ATB value bar text size
             */
            atbBarTextSize: function() { return 12; },

            /**
             * The this pointer refers to the battler involved
             * Sets the line height of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar line height
             */
            atbBarLineH: function() { return 12; },

            /**
             * The this pointer refers to the battler involved
             * Sets the battler ATB value bar text padding
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text padding
             */
            atbBarTextPadding: function() { return 4; },

            /**
             * The this pointer refers to the battler involved
             * Sets the background opacity of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar background opacity
             */
            atbBarBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the battler involved
             * Sets the x offset of the text showing the battler ATB values
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text x offset
             */
            atbBarTextXOffset: function() { return 4; },

            /**
             * The this pointer refers to the battler involved
             * Sets the y offset of the text showing the battler ATB values
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text y offset
             */
            atbBarTextYOffset: function() { return 4; },

            /**
             * The this pointer refers to the battler involved
             * Sets the color of the text showing the battler ATB values
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @param {Window_SATBBar} bar - The battler ATB value bar
             * @returns {Color} The battler ATB value bar text color
             */
            atbBarTextColor: function(bar) {
                return bar.textColor(0); // The text color with color code 0
            }, // atbBarTextColor

            /**
             * The this pointer refers to the battler involved
             * Sets the left gradient color of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @param {Window_SATBBar} bar - The battler ATB value bar
             * @returns {Color} The battler ATB value bar left gradient color
             */
            atbBarColor1: function(bar) {
                return bar.textColor(8); // The text color with color code 8
            }, // atbBarColor1

            /**
             * The this pointer refers to the battler involved
             * Sets the right gradient color of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @param {Window_SATBBar} bar - The battler ATB value bar
             * @returns {Color} The battler ATB value bar right gradient color
             */
            atbBarColor2: function(bar) {
                return bar.textColor(7); // The text color with color code 7
            }, // atbBarColor1

            /**
             * The this pointer refers to the battler involved
             * Sets the background color of the battler ATB value bar
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @param {Window_SATBBar} bar - The battler ATB value bar
             * @returns {Color} The battler ATB value bar background color
             */
            atbBarBackColor: function(bar) {
                return bar.textColor(15); // The text color with color code 15
            }, // atbBarBackColor

        }, // bar

        /*--------------------------------------------------------------------
         *    (v0.01a+)Hotkey Module
         *    - Lets players change which inputable actors to input actions
         *--------------------------------------------------------------------*/
        hotkey: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Hotkey Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {Boolean} The check result
             */
            IsHotkeyEnabled: function() {
                return true; // Always enable the Hotkey Module
            }, // IsHotkeyEnabled

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping trying to select the prior inputable actor
             * Potential Hotspot/Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {KeyMap} Mapping of hotkey selecting prev input actor
             */
            prevInputableActorKey: function() {
                // Hotkey whose mapping is 'left' will select prior input actor
                return 'left';
                //
            }, // prevInputableActorKey

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping trying to select the next inputable actor
             * Potential Hotspot/Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {KeyMap} Mapping of hotkey selecting next input actor
             */
            nextInputableActorKey: function() {
                // Hotkey whose mapping is 'right' will select next input actor
                return 'right';
                //
            }, // nextInputableActorKey

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping list to select the actor with given index
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
            } // inputableActorKeys

        }, // hotkey

        /*--------------------------------------------------------------------
         *    (v0.02a+)Wait Module
         *    - Lets players change the ATB frame update wait conditions
         *--------------------------------------------------------------------*/
        wait: {

            /**
             * Sets whether the Wait Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Boolean} The check result
             */
            IsWaitEnabled: function() {
                return true; // Always enable the Wait Module
            }, // IsWaitEnabled

            /**
             * (Advanced)The this pointer refers to Scene_Battle.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the ATB frame update wait conditions will be met
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Boolean} The check result
             */
            isATBWaitCondMet: function() {
                // Checks if any action's executing
                if (BattleManager.isSATBActPhase()) return true;
                //
                // Checks if the actor targets' being selected
                if (this._actorWindow.active) return true;
                //
                // Checks if the enemy targets' being selected
                if (this._enemyWindow.active) return true;
                //
                // Checks if the skills' being selected
                if (this._skillWindow.active) return true;
                //
                // Check if the items' being selected
                if (this._itemWindow.active) return true;
                //
                // Check if the actor commands' being selected
                if (this._actorCommandWindow.active) return true;
                //
                // Check if the party commands' being selected
                return this._partyCommandWindow.active;
                //
            }, // isATBWaitCondMet

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the keyboard mapping forcibly running the ATB frame updates
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {KeyMap} Mapping of hotkey forcibly running ATB frame
             */
            forceRunATBKey: function() {
                // Hotkey whose mapping is '#shift' will forcibly run ATB frame
                return '#shift';
                //
            }, // forceRunATBKey

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the keyboard mapping forcibly stopping the ATB frame updates
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {KeyMap} Mapping of hotkey forcibly stopping ATB frame
             */
            forceStopATBKey: function() {
                // Hotkey whose mapping's '#ctrl' will forcibly stop ATB frame
                return '#ctrl';
                //
            }, // forceStopATBKey

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the force ATB update status window will be shown
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Boolean} The check result
             */
            isShowForceATBStatWin: function() {
                return true; // Always show the force ATB status window
            }, // isShowForceATBStatWin

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the text showing the ATB frame update isn't forced
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame isn't forced
             */
            noForceATBText: function() { return 'Not Forcing ATB'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the text showing the ATB frame update's forced to run
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to run
             */
            forceRunATBStatText: function() { return 'Forcibly Running ATB'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the text showing the ATB frame update's forced to stop
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to stop
             */
            forceStopATBStatText: function() {
                return 'Forcibly Stopping ATB';
            }, // forceStopATBStatText

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB status window x position
             */
            forceATBStatWinX: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB status window y position
             */
            forceATBStatWinY: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the width of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB status window width
             */
            forceATBStatWinW: function() { return 160; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the height of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB status window height
             */
            forceATBStatWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the size of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB status description text size
             */
            forceATBStatTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the line height of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the text showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the back opacity of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window background opacity
             */
            forceATBStatBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text x offset
             */
            forceATBStatTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatTextYOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the force run ATB command window will be shown
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Boolean} The check result
             */
            isShowForceATBRunCmdWin: function() {
                return true; // Always show the force run ATB command window
            }, // isShowForceATBRunCmdWin

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the text of the force run ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to stop
             */
            forceRunATBCmdText: function() {
                return 'Force Run';
            }, // forceRunATBCmdText

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB run command window x position
             */
            forceATBRunCmdWinX: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB run command window y position
             */
            forceATBRunCmdWinY: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the width of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB run command window width
             */
            forceATBRunCmdWinW: function() { return 80; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB run command window height
             */
            forceATBRunCmdWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the size of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} Force ATB run command description text size
             */
            forceATBRunCmdTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the line height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the back opacity of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window back opacity
             */
            forceATBRunCmdBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text x offset
             */
            forceATBRunCmdTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdTextYOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the force stop ATB command window will be shown
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Boolean} The check result
             */
            isShowForceATBStopCmdWin: function() {
                return true; // Always show the force stop ATB command window
            }, // isShowForceATBStopCmdWin

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the text of the force stop ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to stop
             */
            forceStopATBCmdText: function() {
                return 'Force Stop';
            }, // forceStopATBCmdText

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} Force ATB stop command window x position
             */
            forceATBStopCmdWinX: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} Force ATB stop command window y position
             */
            forceATBStopCmdWinY: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the width of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB stop command window width
             */
            forceATBStopCmdWinW: function() { return 80; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} The force ATB stop command window height
             */
            forceATBStopCmdWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the size of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Number} Force ATB stop command desc text size
             */
            forceATBStopCmdTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the line height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text y offset
             */
            forceATBStopCmdWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text y offset
             */
            forceATBStopCmdWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the padding of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text y offset
             */
            forceATBStopCmdTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the back opacity of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window back opacity
             */
            forceATBStopCmdBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the x offset of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text x offset
             */
            forceATBStopCmdTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets the y offset of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text y offset
             */
            forceATBStopCmdTextYOffset: function() { return 4; }

        }, // wait

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
