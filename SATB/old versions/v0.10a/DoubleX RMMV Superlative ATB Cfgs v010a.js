// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.10a";
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
        // Shows the number of ms elapsed per frame
        Graphics._switchFPSMeter();
        Graphics._switchFPSMeter();
        //
        // This game switch's used in the unit test plugin
        setTimeout(function() { $gameSwitches.setValue(6, true); }, 500);
        // A delay's needed or some tests would falsely fail
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
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether this plugin will be enabled
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            IsCoreEnabled: function() {
                return true; // Always enables this plugin
            }, // IsCoreEnabled

            /**
             * Sets base number of ATB frames needed to fill up the ATB value
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Natural Num} The number of ATB frames
             */
            coreBaseFillATBFrame: function() { return 600; },

            /**
             * Sets base number of ATB seconds needed to fill up the ATB value
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Num} The number of ATB seconds
             */
            coreBaseFillATBSec: function() { return 5.0; },

            /**
             * Sets the amount of ATB time elapsed constituting a battle turn
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @enum @param {+ve Num} baseFillATB - coreBaseFillATBFrame
             *                                      coreBaseFillATBSec
             * @returns {+ve Num} The turn time duration
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
             * @returns {Natural Num} The number of actions making a turn
             */
            coreTurnATBAct: function() {
                // The number of all battlers in battle
                var memNum = BattleManager.allBattleMembers().length;
                //
                // multiplied by the 2x the value of the game variable with id 5
                return memNum * 2 * +$gameVariables.value(5);
                //
            }, // coreTurnATBAct

            /**
             * Sets whether battle turn clock counter can overflow to next turn
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {Boolean} The check result
             */
            canCoreTurnClockOverflow: function() { return false; },

            /**
             * The this pointer refers to the battler involved
             * Sets the base maximum ATB value of the battler involved
             * Hotspot/Nullipotent
             * @since v0.00a @version v0.00a
             * @returns {+ve Num} The maximum ATB value of the battler
             */
            coreMaxATBVal: function() { return 100.0; }

        }, // core

        /*--------------------------------------------------------------------
         *    (v0.03a+)Bar Module
         *    - Lets you attach battler ATB value bars to the battler sprites
         *--------------------------------------------------------------------*/
        bar: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Bar Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Boolean} The check result
             */
            IsBarEnabled: function() {
                return true; // Always enables the Bar Module
            }, // IsBarEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler ATB value bar will be shown
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Boolean} The check result
             */
            isShowATBBar: function() {
                // Checks whether the battler's actor or has state with id 13
                return this.isActor() || this.isStateAffected(13);
                //
            }, // isShowATBBar

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets whether the battler ATB value bar will be shown
             * Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {String} The battler ATB value bar text
             */
            atbBarText: function() {
                // The current ATB value
                var cur = Math.floor(this._battler.curSATB());
                //
                // The maximum ATB value
                var max = Math.floor(this._battler.curMaxSATB());
                //
                // The number of virtual action slots
                var actTimes = this._battler.satbActTimes();
                //
                // Checks if the battler ATB's charging or coolng down
                if (!this._battler.isSATBFill()) {
                    // The name of the currently charging skill/item
                    var itemName = this._battler.latestSATBItem_.item.name;
                    // It can't be placed outside here or the game can crash
                    // cur ATB value/max ATB value : virtual act slot item name
                    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;
                    //
                }
                //
                // current ATB value/max ATB value : virtual action slot num
                return cur + '/' + max + ' : ' + actTimes;
                //
            }, // atbBarText

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the ATB value bar x offset relative to the battler sprite
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Num} The battler ATB value bar x offset
             */
            atbBarXOffset: function() {
                // Returns -80 if the battler's charging or cooling down ATB
                return this._battler.isSATBFill() ? -40 : -80;
                // and returns -40 if nethier applies
            }, // atbBarXOffset

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the ATB value bar y offset relative to the battler sprite
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Num} The battler ATB value bar y offset
             */
            atbBarYOffset: function() { return 10; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the window frame opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar window frame opacity
             */
            atbBarFrameOpacity: function() { return 0; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the width of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Num} The battler ATB value bar width
             */
            atbBarW: function() {
                // Returns 160 if the battler's charging or cooling down ATB
                return this._battler.isSATBFill() ? 80 : 160;
                // and returns 80 if nethier applies
            }, // atbBarW

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the height of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Num} The battler ATB value bar height
             */
            atbBarH: function() { return 20; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the size of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {+ve Num} The battler ATB value bar text size
             */
            atbBarTextSize: function() { return 12; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the line height of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar line height
             */
            atbBarLineH: function() { return 12; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the battler ATB value bar padding
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar padding
             */
            atbBarPadding: function() { return 0; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the battler ATB value bar text padding
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text padding
             */
            atbBarTextPadding: function() { return 4; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the background opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar background opacity
             */
            atbBarBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the x offset of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text x offset
             */
            atbBarTextXOffset: function() { return 4; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the y offset of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Number} The battler ATB value bar text y offset
             */
            atbBarTextYOffset: function() { return 4; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the color of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Color} The battler ATB value bar text color
             */
            atbBarTextColor: function() {
                return this.textColor(0); // The text color with color code 0
            }, // atbBarTextColor

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the left gradient color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Color} The battler ATB value bar left gradient color
             */
            atbBarColor1: function() {
                // The text color with color code 26 if the battler's charging
                if (this._battler.isSATBCharge()) return this.textColor(26);
                //
                // The text color with color code 30 if battler's cooling down
                if (this._battler.isSATBCooldown()) return this.textColor(30);
                //
                return this.textColor(8); // The text color with color code 8
            }, // atbBarColor1

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the right gradient color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Color} The battler ATB value bar right gradient color
             */
            atbBarColor2: function() {
                // The text color with color code 27 if the battler's charging
                if (this._battler.isSATBCharge()) return this.textColor(27);
                //
                // The text color with color code 31 if battler's cooling down
                if (this._battler.isSATBCooldown()) return this.textColor(31);
                //
                return this.textColor(8); // The text color with color code 7
            }, // atbBarColor2

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the background color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Color} The battler ATB value bar background color
             */
            atbBarBackColor: function() {
                return this.textColor(15); // The text color with color code 15
            }, // atbBarBackColor

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler ATB value bar will be shown
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Boolean} The check result
             */
            isShowStatusATBBar: function() {
                // Checks whether the battler's actor or has state with id 13
                return this.isActor() || this.isStateAffected(13);
                //
            }, // isShowStatusATBBar

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * The this pointer refers to the status window ATB bar involved
             * Sets whether the battler ATB value bar will be shown
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {String} The battler ATB value bar text
             */
            statusATBBarText: function() {
                // The current ATB value
                var cur = Math.floor(this._battler.curSATB());
                //
                // The maximum ATB value
                var max = Math.floor(this._battler.curMaxSATB());
                //
                // The number of virtual action slots
                var actTimes = this._battler.satbActTimes();
                //
                // Checks if the battler ATB's charging or coolng down
                if (!this._battler.isSATBFill()) {
                    // The name of the currently charging skill/item
                    var itemName = this._battler.latestSATBItem_.item.name;
                    // It can't be placed outside here or the game can crash
                    // cur ATB value/max ATB value : virtual act slot item name
                    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;
                    //
                }
                //
                // current ATB value/max ATB value : virtual action slot num
                return cur + '/' + max + ' : ' + actTimes;
                //
            }, // statusATBBarText

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the ATB value bar x offset relative to the battler sprite
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {+ve Num} The battler ATB value bar x offset
             */
            statusATBBarXOffset: function() {
                // Returns the party member index multiplied by the bar width
                return this._battler.index() * this.width;
                //
            }, // statusATBBarXOffset

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the ATB value bar y offset relative to the battler sprite
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {+ve Num} The battler ATB value bar y offset
             */
            statusATBBarYOffset: function() { return -28; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the window frame opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar window frame opacity
             */
            statusATBBarFrameOpacity: function() { return 255; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the width of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {+ve Num} The battler ATB value bar width
             */
            statusATBBarW: function() {
                // Returns the status window width divided by party member num
                var statusWindowW = Graphics.boxWidth - 192;
                return statusWindowW / $gameParty.battleMembers().length;
                //
            }, // statusATBBarW

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the height of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {+ve Num} The battler ATB value bar height
             */
            statusATBBarH: function() { return 28; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the size of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {+ve Num} The battler ATB value bar text size
             */
            statusATBBarTextSize: function() { return 12; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the line height of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar line height
             */
            statusATBBarLineH: function() { return 12; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the battler ATB value bar padding
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar padding
             */
            statusATBBarPadding: function() { return 4; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the battler ATB value bar text padding
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar text padding
             */
            statusATBBarTextPadding: function() { return 4; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the background opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar background opacity
             */
            statusATBBarBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the x offset of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar text x offset
             */
            statusATBBarTextXOffset: function() { return 4; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the y offset of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Number} The battler ATB value bar text y offset
             */
            statusATBBarTextYOffset: function() { return 4; },

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the color of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Color} The battler ATB value bar text color
             */
            statusATBBarTextColor: function() {
                return this.textColor(0); // The text color with color code 0
            }, // statusATBBarTextColor

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the left gradient color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Color} The battler ATB value bar left gradient color
             */
            statusATBBarColor1: function() {
                // The text color with color code 26 if the battler's charging
                if (this._battler.isSATBCharge()) return this.textColor(26);
                //
                // The text color with color code 30 if battler's cooling down
                if (this._battler.isSATBCooldown()) return this.textColor(30);
                //
                return this.textColor(8); // The text color with color code 8
            }, // statusATBBarColor1

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the right gradient color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Color} The battler ATB value bar right gradient color
             */
            statusATBBarColor2: function() {
                // The text color with color code 27 if the battler's charging
                if (this._battler.isSATBCharge()) return this.textColor(27);
                //
                // The text color with color code 31 if battler's cooling down
                if (this._battler.isSATBCooldown()) return this.textColor(31);
                //
                return this.textColor(8); // The text color with color code 7
            }, // statusATBBarColor2

            /**
             * The this pointer refers to the status window ATB bar involved
             * Sets the background color of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Color} The battler ATB value bar background color
             */
            statusATBBarBackColor: function() {
                return this.textColor(15); // The text color with color code 15
            } // statusATBBarBackColor

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
                return true; // Always enables the Hotkey Module
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
                return '#left';
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
                return '#right';
                //
            }, // nextInputableActorKey

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping list to select the actor with given index
             * Nullipotent
             * @since v0.01a @version v0.01a
             * @returns {[KeyMap]} List of mappings of hotkey selecting ith mem
             */
            inputableActorKeys: function() {
                // Returns a list of hotkey mappings corresponding to hotkeys
                return [
                    '#num1', // Tries to select the 1st party member to input
                    '#num2', // Tries to select the 2nd party member to input
                    '#num3', // Tries to select the 3rd party member to input
                    '#num4' // Tries to select the 4th party member to input
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
                return true; // Always enables the Wait Module
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
                // Checks if the items' being selected
                if (this._itemWindow.active) return true;
                //
                // Checks if the actor commands' being selected
                if (this._actorCommandWindow.active) return true;
                //
                // Checks if the party commands' being selected
                if (this._partyCommandWindow.active) return true;
                //
                // Checks if the SEK_ChangeActor change commands' being selected
                return this._changeWindow && this._changeWindow.active;
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
             * UNLESS _isParamFuncCached IS ON
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
             * UNLESS _isParamFuncCached IS ON
             * Sets the text showing the ATB frame update isn't forced
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame isn't forced
             */
            noForceATBText: function() { return 'Not Forcing ATB'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text showing the ATB frame update's forced to run
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to run
             */
            forceRunATBStatText: function() { return 'Forcibly Running ATB'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
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
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window x position
             */
            forceATBStatWinX: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window y position
             */
            forceATBStatWinY: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window width
             */
            forceATBStatWinW: function() { return 160; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window height
             */
            forceATBStatWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status description text size
             */
            forceATBStatTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window line height
             */
            forceATBStatWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window padding
             */
            forceATBStatWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the text showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text padding
             */
            forceATBStatTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window background opacity
             */
            forceATBStatBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text x offset
             */
            forceATBStatTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatTextYOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
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
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the force run ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to run
             */
            forceRunATBCmdText: function() { return 'Force Run'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window x position
             */
            forceATBRunCmdWinX: function() { return 0; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window y position
             */
            forceATBRunCmdWinY: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window width
             */
            forceATBRunCmdWinW: function() { return 80; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window height
             */
            forceATBRunCmdWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB run command description text size
             */
            forceATBRunCmdTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window line height
             */
            forceATBRunCmdWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window padding
             */
            forceATBRunCmdWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text padding
             */
            forceATBRunCmdTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window back opacity
             */
            forceATBRunCmdBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text x offset
             */
            forceATBRunCmdTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdTextYOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
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
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the force stop ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to stop
             */
            forceStopATBCmdText: function() { return 'Force Stop'; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command window x position
             */
            forceATBStopCmdWinX: function() { return 80; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command window y position
             */
            forceATBStopCmdWinY: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB stop command window width
             */
            forceATBStopCmdWinW: function() { return 80; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB stop command window height
             */
            forceATBStopCmdWinH: function() { return 40; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command desc text size
             */
            forceATBStopCmdTextSize: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window line height
             */
            forceATBStopCmdWinLineH: function() { return 12; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window padding
             */
            forceATBStopCmdWinPadding: function() { return 8; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text padding
             */
            forceATBStopCmdTextPadding: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window back opacity
             */
            forceATBStopCmdBackOpacity: function() { return 192; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text x offset
             */
            forceATBStopCmdTextXOffset: function() { return 4; },

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text y offset
             */
            forceATBStopCmdTextYOffset: function() { return 4; }

        }, // wait

        /*--------------------------------------------------------------------
         *    (v0.04a+)Charge Module
         *    - Lets you set some skills/items to need to be charged first
         *--------------------------------------------------------------------*/
        charge: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Charge Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {Boolean} The check result
             */
            IsChargeEnabled: function() {
                return false; // Always disables the Charge Module
            }, // IsChargeEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets the default maximum charge ATB value of the battler involved
             * Potential Hotspot/Nullipotent
             * @since v0.04a @version v0.04a
             * @param {+ve Num} coreMax - The maximum ATB value of the battler
             * @returns {+ve Num} The maximum charge ATB value of the battler
             */
            chargeMaxATBVal: function(coreMax) {
                // Sets the default charge ATB max to be the battler ATB max
                return coreMax;
                //
            }, // chargeMaxATBVal

            /**
             * The this pointer refers to the battler involved
             * Sets whether the skill/item cost's paid before executing it
             * Potential Hotspot/Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {Boolean} The check result
             */
            isPayBeforeExecCharge: function() {
                // Always pays the skill/item cost right after executing them
                return false;
                //
            }, // isPayBeforeExecCharge

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping list to select the actor with given index
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {[KeyMap]} List of mappings of hotkey selecting ith mem
             */
            cancelChargeATBKeys: function() {
                // Returns a list of hotkey mappings corresponding to hotkeys
                return [
                    '#num1', // Tries to cancel the 1st party member ATB charge
                    '#num2', // Tries to cancel the 2nd party member ATB charge
                    '#num3', // Tries to cancel the 3rd party member ATB charge
                    '#num4' // Tries to cancel the 4th party member ATB charge
                ];
                //
            }, // cancelChargeATBKeys

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler skill/item ATB charge can be cancelled
             * Potential Hotspot/Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {Boolean} The check result
             */
            canCancelCharge: function() {
                // Always lets players cancel the battler skill/item ATB charge
                return true;
                //
            }, // canCancelCharge

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping list to select the actor with given index
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {[KeyMap]} List of mappings of hotkey selecting ith mem
             */
            forceChargeATBKeys: function() {
                // Returns a list of hotkey mappings corresponding to hotkeys
                return [
                    '#num5', // Tries to force the 5th party member ATB charge
                    '#num6', // Tries to force the 6th party member ATB charge
                    '#num7', // Tries to force the 7th party member ATB charge
                    '#num8' // Tries to force the 8th party member ATB charge
                ];
                //
            }, // forceChargeATBKeys

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler skill/item ATB charge can be forced
             * Potential Hotspot/Nullipotent
             * @since v0.04a @version v0.04a
             * @returns {Boolean} The check result
             */
            canForceCharge: function() {
                // Always lets players force the battler skill/item ATB charge
                return true;
                //
            } // canForceCharge

        }, // charge

        /*--------------------------------------------------------------------
         *    (v0.05a+)Cooldown Module
         *    - Lets you set some skills/items to need to cooldown after exec
         *--------------------------------------------------------------------*/
        cooldown: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Cooldown Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.05a @version v0.05a
             * @returns {Boolean} The check result
             */
            IsCooldownEnabled: function() {
                return false; // Always disables the Cooldown Module
            }, // IsCooldownEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets the default max cooldown ATB value of the battler involved
             * Potential Hotspot/Nullipotent
             * @since v0.05a @version v0.05a
             * @param {+ve Num} coreMax - The maximum ATB value of the battler
             * @returns {+ve Num} The maximum cooldown ATB value of the battler
             */
            cooldownMaxATBVal: function(coreMax) {
                // Sets the default cooldown ATB max to be the battler ATB max
                return coreMax;
                //
            }, // cooldownMaxATBVal

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets keyboard mapping list to select the actor with given index
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @returns {[KeyMap]} List of mappings of hotkey selecting ith mem
             */
            cancelCooldownATBKeys: function() {
                // Returns a list of hotkey mappings corresponding to hotkeys
                return [
                    '#num1', // Tries to cancel 1st party member ATB cooldown
                    '#num2', // Tries to cancel 2nd party member ATB cooldown
                    '#num3', // Tries to cancel 3rd party member ATB cooldown
                    '#num4' // Tries to cancel 4th party member ATB cooldown
                ];
                //
            }, // cancelCooldownATBKeys

            /**
             * The this pointer refers to the battler involved
             * Sets whether the battler skill/item ATB cooldown can be cancelled
             * Potential Hotspot/Nullipotent
             * @since v0.05a @version v0.05a
             * @returns {Boolean} The check result
             */
            canCancelCooldown: function() {
                // Always lets players cancel battler skill/item ATB cooldown
                return true;
                //
            } // canCancelCooldown

        }, // cooldown

        /*--------------------------------------------------------------------
         *    (v0.06a+)Event Module
         *    - Lets users add addtional events to happen to specified timings
         *--------------------------------------------------------------------*/
        event: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Event Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Boolean} The check result
             */
            IsEventEnabled: function() {
                return true; // Always enables the Event Module
            }, // IsEventEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after finishing inputting actions
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didFinishInput: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after becoming able to exec acts
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didBecomeActable: function() {
                // Plays SE named Decision2 with volume 90, pitch 100 and pan 0
                AudioManager.playStaticSe({
                    name: "Decision2",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                //
            }, // didBecomeActable

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after setting number of act slots
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didSetActTimes: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becoming not
             * charging nor cooling down
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didStartATBFill: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right before cancelling the ATB charge
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            willCancelCharge: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after starting to force charging
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didStartForceCharge: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right before cancelling ATB cooldown
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            willCancelCooldown: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becomes full
             * charging nor cooling down
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didCoreATBBecomeFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becomes not full
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didCoreATBBecomeNotFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after charge ATB becomes not full
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didChargeATBBecomeNotFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after an actor becomes inputable
             * charging nor cooling down
             * Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             */
            didAddInputableActor: function() {
                // Plays SE named Bell3 with volume 90, pitch 100 and pan 0
                AudioManager.playStaticSe({
                    name: "Decision2",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                //
            } // didAddInputableActor

        }, // event

        /*--------------------------------------------------------------------
         *    (v0.10a+)Rate Module
         *    - Lets you set the ATB fill rates for each battler
         *--------------------------------------------------------------------*/
        rate: {

            /**
             * Sets whether the Rate Module will be enabled
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @returns {Boolean} The check result
             */
            IsRateEnabled: function() {
                return false; // Always disables the Rate Module
            }, // IsRateEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB fill rate without charge nor cooldown
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @returns {Number} The ATB fill rate without charge nor cooldown
             */
            coreATBRate: function() {
                // Base fill rate * battler agi * base max ATB / battler avg agi
                var baseFillRate = BattleManager.coreBaseSATBFillRate();
                var baseMax = this.baseCoreMaxSATB();
                var avgAgi = BattleManager.satbAvgAgi;
                return baseFillRate * this.agi * baseMax * 1.0 / avgAgi;
                //
            }, // coreATBRate

            /**
             * The this pointer refers to the battler involved
             * If the Charge Module's disabled, chargeATBRate will be the same
             * as coreATBRate
             * Sets the ATB charge fill rate
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @returns {Number} The ATB charge fill rate
             */
            chargeATBRate: function() {
                return this.coreSATBRate(); // The same as the coreATBRate
            }, // chargeATBRate

            /**
             * The this pointer refers to the battler involved
             * If the Cooldown Module's disabled, cooldownATBRate will be the
             * same as coreATBRate
             * Sets the ATB cooldown fill rate
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @returns {Number} The ATB cooldown fill rate
             */
            cooldownATBRate: function() {
                return this.coreSATBRate(); // The same as the coreATBRate
            } // cooldownATBRate

        }, // rate

        /*--------------------------------------------------------------------
         *    (v0.07a+)Reset Module
         *    - Lets you set some skills to set the ATB value after cooldown
         *--------------------------------------------------------------------*/
        reset: {

            /**
             * Sets whether the Reset Module will be enabled
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @returns {Boolean} The check result
             */
            IsResetEnabled: function() {
                return false; // Always disables the Reset Module
            }, // IsResetEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets the default ATB value of battler right after cooldown
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @param {Number} latestResetATBVal - The reset ATB value right
             *                                     after executing the last
             *                                     action
             * @returns {Number} The ATB value of battler right after cooldown
             */
            resetATBVal: function(latestResetATBVal) {
                // Accumulates the reset ATB value from all executed actions
                return latestResetATBVal;
                //
            } // resetATBVal

        }, // reset

        /*--------------------------------------------------------------------
         *    (v0.08a+)Speed Module
         *    - Lets you set the action speed for each battler
         *--------------------------------------------------------------------*/
        speed: {

            /**
             * Sets whether the Speed Module will be enabled
             * Nullipotent
             * @since v0.08a @version v0.08a
             * @returns {Boolean} The check result
             */
            IsSpeedEnabled: function() {
                return false; // Always disables the Speed Module
            }, // IsSpeedEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets how the action speeds for all battlers are updated
             * Nullipotent
             * @since v0.07a @version v0.07a
             */
            updateActSpeeds: function() {
                // 2000 is divided by the number of battlers who can exec acts
                var speedIncrement = 2000.0 / this._actionBattlers.length;
                //
                // Updates the speed for each battler who can execute actions
                this._actionBattlers.forEach(function(battler) {
                    // The skill/item to be executed for the battler involved
                    var item = battler.latestSATBItem_;
                    //
                    // Applies the speed increment but caps the speed to 2000
                    item.speed = Math.min(item.speed + speedIncrement, 2000);
                    //
                });
                //
            }, // updateActSpeeds

            /**
             * The this pointer refers to the battler involved
             * Sets the default ATB value of battler right after cooldown
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @returns {Number} The ATB value of battler right after cooldown
             */
            actSpeed: function() {
                // Uses the original skill/item invocation speed
                return this.latestSATBItem_.speed;
                //
            } // actSpeed

        }, // speed

        /*--------------------------------------------------------------------
         *    (v0.09a+)Start Module
         *    - Lets you set the ATB value upon all battle start types
         *--------------------------------------------------------------------*/
        start: {

            /**
             * Sets whether the Start Module will be enabled
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @returns {Boolean} The check result
             */
            IsStartEnabled: function() {
                return false; // Always disables the Start Module
            }, // IsStartEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB value upon a normal battle start
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @returns {Number} The ATB value upon a normal battle start
             */
            normStartATBVal: function() {
                // Battler agi divided by 999.0 multipled by maximum ATB value
                return this.agi / 999.0 * this.coreMaxSATB();
                //
            }, // normStartATBVal

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB value upon a preemptive battle start
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @returns {Number} The ATB value upon a preemptive battle start
             */
            preemptStartATBVal: function() {
                // Full ATB value for actors and 0 otherwise
                return this.isActor() ? this.coreMaxSATB() : 0;
                //
            }, // preemptStartATBVal

            /**
             * The this pointer refers to the battler involved
             * Sets the ATB value upon a surprise battle start
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @returns {Number} The ATB value upon a surprise battle start
             */
            surpriseStartATBVal: function() {
                // Full ATB value for enemies and 0 otherwise
                return this.isEnemy() ? this.coreMaxSATB() : 0;
                //
            } // surpriseStartATBVal

        } // start

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
         * really know what you're truly doing
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
             * @param {+ve Num} latestMax - Max ATB value up to latest note
             *                              DON'T USE IT IF THE CHAINING RULE
             *                              IS AN ASSOCIATIVE OPERATOR
             *                              Refer to reference tag
             *                              ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum ATB value(Which should be
             *                    positive) for the battler involved
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
             * @param {+ve Num} latestMax - Max ATB value up to latest note
             *                              DON'T USE IT IF THE CHAINING RULE
             *                              IS AN ASSOCIATIVE OPERATOR
             *                              Refer to reference tag
             *                              ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum ATB value(Which should be
             *                    positive) for the battler involved
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
             * @param {+ve Num} latestMax - Max ATB value up to latest note
             *                              DON'T USE IT IF THE CHAINING RULE
             *                              IS AN ASSOCIATIVE OPERATOR
             *                              Refer to reference tag
             *                              ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum ATB value(Which should be
             *                    positive) for the battler involved
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
         * really know what you're truly doing
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
            CAS_TRUE: function(datum, datumType) {
                // Always sets the state as an action state
                return true;
                //
            }, // CAS_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CAS_BATTLER_NAME: function(datum, datumType) {
                // Sets the state as an action state if the battler name is Test
                return this.name() === "Test";
                //
            }, // CAS_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.00a @version v0.00a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CAS_SWITCH: function(datum, datumType) {
                // Sets the state as an action state if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CAS_SWITCH

            // Adds new CASX here


        }, // coreActState

        /*--------------------------------------------------------------------
         *    (v0.04a+)Is Bar Visible Functions
         *    - Setups IBVX used by this plugin's isBarVisible notetags
         *--------------------------------------------------------------------*/
        /* IBVX names can only use alphanumeric characters
         * The 1st character of IBVX can't be a number
         * The below IBVX are examples added to help you set your IBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)IBVX can be used on notetags other than isBarVisible if you
         * really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular IBVX
         */
        isBarVisible: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IBV_TRUE: function(datum, datumType) {
                // Always shows the ATB bar attached to the battler sprite
                return true;
                //
            }, // IBV_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IBV_BATTLER_NAME: function(datum, datumType) {
                // Shows the battler sprite ATB bar if the battler name is Test
                return this.name() === "Test";
                //
            }, // IBV_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IBV_SWITCH: function(datum, datumType) {
                // Shows the battler sprite ATB bar if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // IBV_SWITCH

            // Adds new IBVX here


        }, // isBarVisible

        /*--------------------------------------------------------------------
         *    (v0.04a+)Is Status Bar Visible Functions
         *    - Setups ISBVX used by this plugin's isStatusBarVisible notetags
         *--------------------------------------------------------------------*/
        /* ISBVX names can only use alphanumeric characters
         * The 1st character of ISBVX can't be a number
         * The below ISBVX are examples added to help you set your ISBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)ISBVX can be used on notetags other than isStatusBarVisible
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular ISBVX
         */
        isStatusBarVisible: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            ISBV_TRUE: function(datum, datumType) {
                // Always shows the ATB bar attached to the status window
                return true;
                //
            }, // ISBV_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            ISBV_BATTLER_NAME: function(datum, datumType) {
                // Shows the status window ATB bar if the battler name is Test
                return this.name() === "Test";
                //
            }, // ISBV_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            ISBV_SWITCH: function(datum, datumType) {
                // Shows the status window ATB bar if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // ISBV_SWITCH

            // Adds new IBVX here


        }, // isStatusBarVisible

        /*--------------------------------------------------------------------
         *    (v0.04a+)Charge ATB Max Functions
         *    - Setups CHMATBX used by this plugin's chargeMax notetags
         *--------------------------------------------------------------------*/
        /* CHMATBX names can only use alphanumeric characters
         * The 1st character of CHMATBX can't be a number
         * The below CHMATBX are examples added to help you set your CHMATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CHMATBX can be used on notetags other than chargeMax if you
         * really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CMATBX
         */
        chargeMax: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestChargeMax - Max charge ATB value up to
             *                                    latest note
             *                                    DON'T USE IT IF THE
             *                                    CHAINING RULE IS AN
             *                                    ASSOCIATIVE OPERATOR
             *                                    Refer to reference tag
             *                                    ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum charge ATB value(Which should be
             *                    positive) for the battler involved
             */
            CHMATB_MAX: function(datum, datumType, latestChargeMax) {
                // Returns 2 and 1 if max is greater and not greater than 100
                return latestChargeMax > 100.0 ? 2 : 1;
                //
            }, // CHMATB_MAX

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestChargeMax - Max charge ATB value up to
             *                                    latest note
             *                                    DON'T USE IT IF THE
             *                                    CHAINING RULE IS AN
             *                                    ASSOCIATIVE OPERATOR
             *                                    Refer to reference tag
             *                                    ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum charge ATB value(Which should be
             *                    positive) for the battler involved
             */
            CHMATB_AGI: function(datum, datumType, latestChargeMax) {
                return 999 - this.agi; // 999 - the battler's AGI
            }, // CHMATB_AGI

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestChargeMax - Max charge ATB value up to
             *                                    latest note
             *                                    DON'T USE IT IF THE
             *                                    CHAINING RULE IS AN
             *                                    ASSOCIATIVE OPERATOR
             *                                    Refer to reference tag
             *                                    ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum charge ATB value(Which should be
             *                    positive) for the battler involved
             */
            CHMATB_VAR: function(datum, datumType, latestChargeMax) {
                // Returns the Number value in the game variable with id 4
                return +$gameVariables.value(4);
                // Numbers with decimals should be stored in the String form
            }, // CHMATB_VAR

            // Adds new CHMATBX here


        }, // chargeMax

        /*--------------------------------------------------------------------
         *    (v0.04a+)Is Pay Before Exec Charge Functions
         *    - Setups IPBECX used by plugin's isPayBeforeExecCharge notetags
         *--------------------------------------------------------------------*/
        /* IPBECX names can only use alphanumeric characters
         * The 1st character of IPBECX can't be a number
         * The below IPBECX are examples added to help you set your IPBECX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)IPBECX can be used on notetags other than
         * isPayBeforeExecCharge if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular IPBECX
         */
        isPayBeforeExecCharge: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IPBEC_TRUE: function(datum, datumType) {
                // Always pays the skill/item cost upon finishing inputting it
                return true;
                //
            }, // IPBEC_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IPBEC_BATTLER_NAME: function(datum, datumType) {
                // Pays skill/item cost upon inputting if battler name is Test
                return this.name() === "Test";
                //
            }, // IPBEC_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            IPBEC_SWITCH: function(datum, datumType) {
                // Pays skill/item cost upon inputting if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // IPBEC_SWITCH

            // Adds new IPBECX here


        }, // isPayBeforeExecCharge

        /*--------------------------------------------------------------------
         *    (v0.04a+)Can Cancel Charge Functions
         *    - Setups CCCX used by plugin's canCancelCharge notetags
         *--------------------------------------------------------------------*/
        /* CCCX names can only use alphanumeric characters
         * The 1st character of CCCX can't be a number
         * The below CCCX are examples added to help you set your CCCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CCCX can be used on notetags other than canCancelCharge if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CCCX
         */
        canCancelCharge: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCC_TRUE: function(datum, datumType) {
                return true; // Always lets players cancel the ATB charge
            }, // CCC_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCC_BATTLER_NAME: function(datum, datumType) {
                // Lets players cancel the ATB charge for battler with name test
                return this.name() === "Test";
                //
            }, // CCC_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCC_SWITCH: function(datum, datumType) {
                // Lets players cancel ATB charge when switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CCC_SWITCH

            // Adds new CCCX here


        }, // canCancelCharge

        /*--------------------------------------------------------------------
         *    (v0.04a+)Can Force Charge Functions
         *    - Setups CFCX used by plugin's canForceCharge notetags
         *--------------------------------------------------------------------*/
        /* CFCX names can only use alphanumeric characters
         * The 1st character of CFCX can't be a number
         * The below CFCX are examples added to help you set your CFCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CFCX can be used on notetags other than canForceCharge if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CFCX
         */
        canForceCharge: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CFC_TRUE: function(datum, datumType) {
                return true; // Always lets players force the ATB charge
            }, // CFC_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CFC_HALF: function(datum, datumType) {
                // Lets players cancel the ATB charge when ATB charge's half
                return this.chargeSATBProportion() >= 0.5;
                //
            }, // CFC_HALF

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.04a @version v0.04a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CFC_SWITCH: function(datum, datumType) {
                // Lets players force ATB charge when switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CFC_SWITCH

            // Adds new CFCX here


        }, // canForceCharge

        /*--------------------------------------------------------------------
         *    (v0.05a+)Cooldown ATB Max Functions
         *    - Setups CDMATBX used by this plugin's cooldownMax notetags
         *--------------------------------------------------------------------*/
        /* CDMATBX names can only use alphanumeric characters
         * The 1st character of CDMATBX can't be a number
         * The below CDMATBX are examples added to help you set your CDMATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CDMATBX can be used on notetags other than cooldownMax if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CDMATBX
         */
        cooldownMax: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestCooldownMax - Max cooldown ATB value up to
             *                                      the latest note
             *                                      DON'T USE IT IF THE
             *                                      CHAINING RULE IS AN
             *                                      ASSOCIATIVE OPERATOR
             *                                      Refer to reference tag
             *                                      ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum cooldown ATB value(Which should be
             *                    positive) for the battler involved
             */
            CDMATB_MAX: function(datum, datumType, latestCooldownMax) {
                // Returns 2 and 1 if max is greater and not greater than 100
                return latestCooldownMax > 100.0 ? 2 : 1;
                //
            }, // CDMATB_MAX

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestCooldownMax - Max cooldown ATB value up to
             *                                      the latest note
             *                                      DON'T USE IT IF THE
             *                                      CHAINING RULE IS AN
             *                                      ASSOCIATIVE OPERATOR
             *                                      Refer to reference tag
             *                                      ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum cooldown ATB value(Which should be
             *                    positive) for the battler involved
             */
            CDMATB_AGI: function(datum, datumType, latestCooldownMax) {
                return 999 - this.agi; // 999 - the battler's AGI
            }, // CDMATB_AGI

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {+ve Num} latestCooldownMax - Max cooldown ATB value up to
             *                                      the latest note
             *                                      DON'T USE IT IF THE
             *                                      CHAINING RULE IS AN
             *                                      ASSOCIATIVE OPERATOR
             *                                      Refer to reference tag
             *                                      ASSOCIATIVE_CHAINING_RULE
             * @returns {+ve Num} The maximum cooldown ATB value(Which should be
             *                    positive) for the battler involved
             */
            CDMATB_VAR: function(datum, datumType, latestCooldownMax) {
                // Returns the Number value in the game variable with id 4
                return +$gameVariables.value(4);
                // Numbers with decimals should be stored in the String form
            }, // CDMATB_VAR

            // Adds new CDMATBX here


        }, // cooldownMax

        /*--------------------------------------------------------------------
         *    (v0.05a+)Can Cancel Cooldown Functions
         *    - Setups CCCDX used by plugin's canCancelCooldown notetags
         *--------------------------------------------------------------------*/
        /* CCCDX names can only use alphanumeric characters
         * The 1st character of CCCDX can't be a number
         * The below CCCDX are examples added to help you set your CCCDX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CCCDX can be used on notetags other than canCancelCooldown
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CCCDX
         */
        canCancelCooldown: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCCD_TRUE: function(datum, datumType) {
                return true; // Always lets players cancel the ATB cooldown
            }, // CCCD_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCCD_BATTLER_NAME: function(datum, datumType) {
                // Lets players cancel ATB cooldown for battler with name test
                return this.name() === "Test";
                //
            }, // CCCD_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CCCD_SWITCH: function(datum, datumType) {
                // Lets players cancel ATB cooldown when switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CCCD_SWITCH

            // Adds new CCCDX here


        }, // canCancelCooldown

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Finish Input Functions
         *    - Setups DFIX used by plugin's didFinishInput notetags
         *--------------------------------------------------------------------*/
        /* DFIX names can only use alphanumeric characters
         * The 1st character of DFIX can't be a number
         * The below DFIX are examples added to help you set your DFIX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DFIX can be used on notetags other than didFinishInput if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DFIX
         */
        didFinishInput: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFI_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DFI_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFI_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DFI_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFI_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DFI_VAR

            // Adds new DFIX here


        }, // didFinishInput

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Finish Input Functions
         *    - Setups DBAX used by plugin's didBecomeActable notetags
         *--------------------------------------------------------------------*/
        /* DBAX names can only use alphanumeric characters
         * The 1st character of DBAX can't be a number
         * The below DBAX are examples added to help you set your DBAX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DBAX can be used on notetags other than didBecomeActable if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DBAX
         */
        didBecomeActable: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DBA_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DBA_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DBA_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DBA_SWITCH

           /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DBA_NEO_SPARK: function(datum, datumType) {
                // The ATB charge fill proportion
                var proportion = this.chargeSATBProportion();
                //
                if (proportion > 1) {
                    // Changes the action to be executed to be Neo Spark in demo
                    this.currentAction().setSkill(14);
                    this.latestSATBItem_ = 
                            SATB.Game_Battler.new._latestItem_.call(this);
                    //
                } else if (proportion < 1) {
                    // Pays the skill/item cost one more time as extra penalty
                    this.paySkillCost(this.latestSATBItem_.item);
                    //
                    // Adds level 2 atk and mat debuffs for 5 turns as penalty
                    this.addDebuff(2, 5);
                    this.addDebuff(2, 5);
                    this.addDebuff(4, 5);
                    this.addDebuff(4, 5);
                    //
                }
            }, // DBA_NEO_SPARK

            // Adds new DBAX here


        }, // didBecomeActable

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Set Act Times Functions
         *    - Setups DSATX used by plugin's didSetActTimes notetags
         *--------------------------------------------------------------------*/
        /* DSATX names can only use alphanumeric characters
         * The 1st character of DSATX can't be a number
         * The below DSATX are examples added to help you set your DSATX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DSATX can be used on notetags other than didSetActTimes if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DSATX
         */
        didSetActTimes: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSAT_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DSAT_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSAT_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DSAT_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSAT_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DSAT_VAR

            // Adds new DSATX here


        }, // didSetActTimes

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Start ATB Fill Functions
         *    - Setups DSATBFX used by plugin's didStartATBFill notetags
         *--------------------------------------------------------------------*/
        /* DSATBFX names can only use alphanumeric characters
         * The 1st character of DSATBFX can't be a number
         * The below DSATBFX are examples added to help you set your DSATBFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DSATBFX can be used on notetags other than didStartATBFill
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DSATBFX
         */
        didStartATBFill: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSATBF_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DSATBF_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSATBF_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DSATBF_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSATBF_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DSATBF_VAR

            // Adds new DSATBFX here


        }, // didStartATBFill

        /*--------------------------------------------------------------------
         *    (v0.06a+)Will Cancel Charge Functions
         *    - Setups WCCX used by plugin's willCancelCharge notetags
         *--------------------------------------------------------------------*/
        /* WCCX names can only use alphanumeric characters
         * The 1st character of WCCX can't be a number
         * The below WCCX are examples added to help you set your WCCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)WCCX can be used on notetags other than willCancelCharge if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular WCCX
         */
        willCancelCharge: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCC_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // WCC_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCC_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // WCC_SWITCH

           /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCC_PAY_SKILL_COST: function(datum, datumType) {
                // Pays the skill/item cost one more time as extra penalty
                this.paySkillCost(this.latestSATBItem_.item);
                //
            }, // WCC_PAY_SKILL_COST

            // Adds new WCCX here


        }, // willCancelCharge

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Start Force Charge Functions
         *    - Setups DSFCX used by plugin's didStartForceCharge notetags
         *--------------------------------------------------------------------*/
        /* DSFCX names can only use alphanumeric characters
         * The 1st character of DSFCX can't be a number
         * The below DSFCX are examples added to help you set your DSFCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DSFCX can be used on notetags other than
         * didStartForceCharge if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DSFCX
         */
        didStartForceCharge: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSFC_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DSFC_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSFC_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DSFC_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DSFC_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DSFC_VAR

            // Adds new DSFCX here


        }, // didStartForceCharge

        /*--------------------------------------------------------------------
         *    (v0.06a+)Will Cancel Cooldown Functions
         *    - Setups WCCDX used by plugin's willCancelCooldown notetags
         *--------------------------------------------------------------------*/
        /* WCCDX names can only use alphanumeric characters
         * The 1st character of WCCDX can't be a number
         * The below WCCDX are examples added to help you set your WCCDX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)WCCDX can be used on notetags other than willCancelCooldown
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular WCCDX
         */
        willCancelCooldown: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCCD_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // WCCD_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCCD_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // WCCD_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            WCCD_PAY_SKILL_COST: function(datum, datumType) {
                // Pays the skill/item cost one more time as extra penalty
                this.paySkillCost(this.latestSATBItem_.item);
                //
            }, // WCCD_PAY_SKILL_COST

            // Adds new WCCDX here


        }, // willCancelCooldown

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Core ATB Become Full Functions
         *    - Setups DCATBBFX used by plugin's didCoreATBBecomeFull notetags
         *--------------------------------------------------------------------*/
        /* DCATBBFX names can only use alphanumeric characters
         * The 1st character of DCATBBFX can't be a number
         * The below DCATBBFX are examples added to help you set your DCATBBFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DCATBBFX can be used on notetags other than
         * didCoreATBBecomeFull if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DCATBBFX
         */
        didCoreATBBecomeFull: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBF_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DCATBBF_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBF_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DCATBBF_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBF_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DCATBBF_VAR

            // Adds new DCATBBFX here


        }, // didCoreATBBecomeFull

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Core ATB Become Not Full Functions
         *    - Setups DCATBBNFX used by didCoreATBBecomeNotFull notetags
         *--------------------------------------------------------------------*/
        /* DCATBBNFX names can only use alphanumeric characters
         * The 1st character of DCATBBFX can't be a number
         * The below DCATBBNFX are examples added to help you set your DCATBBNFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DCATBBNFX can be used on notetags other than
         * didCoreATBBecomeNotFull if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular
         * DCATBBNFX
         */
        didCoreATBBecomeNotFull: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBNF_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DCATBBNF_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBNF_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DCATBBNF_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCATBBNF_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DCATBBNF_VAR

            // Adds new DCATBBNFX here


        }, // didCoreATBBecomeNotFull

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Charge ATB Become Not Full Functions
         *    - Setups DCHATBBNFX used by didChargeATBBecomeNotFull notetags
         *--------------------------------------------------------------------*/
        /* DCHATBBNFX names can only use alphanumeric characters
         * The 1st character of DCHATBBNFX can't be a number
         * The below DCHATBBNFX are examples added to help you set your
         * DCHATBBNFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DCHATBBNFX can be used on notetags other than
         * didChargeATBBecomeNotFull if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular
         * DCHATBBNFX
         */
        didChargeATBBecomeNotFull: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCHATBBNF_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DCHATBBNF_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCHATBBNF_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DCHATBBNF_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DCHATBBNF_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                  //
            }, // DCHATBBNF_VAR

            // Adds new DCHATBBNFX here


        }, // didChargeATBBecomeNotFull

        /*--------------------------------------------------------------------
         *    (v0.06a+)Did Add Inputable Actor Functions
         *    - Setups DAIAX used by didAddInputableActor notetags
         *--------------------------------------------------------------------*/
        /* DAIAX names can only use alphanumeric characters
         * The 1st character of DAIAX can't be a number
         * The below DAIAX are examples added to help you set your DAIAX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DAIAX can be used on notetags other than
         * didAddInputableActor if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular DAIAX
         */
        didAddInputableActor: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DAIA_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DAIA_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DAIA_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DAIA_SWITCH

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.06a @version v0.06a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DAIA_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                  //
            }, // DAIA_VAR

            // Adds new DAIAX here


        }, // didAddInputableActor

        /*--------------------------------------------------------------------
         *    (v0.10a+)Core ATB Rate Functions
         *    - Setups CATBRX used by this plugin's coreATBRate notetags
         *--------------------------------------------------------------------*/
        /* CATBRX names can only use alphanumeric characters
         * The 1st character of CATBRX can't be a number
         * The below CATBRX are examples added to help you set your CATBRX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CATBRX can be used on notetags other than coreATBRate
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CATBRX
         */
        coreATBRate: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCoreATBRate - The ATB fill rate up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB fill rate without charge nor cooldown
             */
            CATBR_2: function(datum, datumType, latestCoreATBRate) {
                return 2; // Always returns 2
            }, // CATBR_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCoreATBRate - The ATB fill rate up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB fill rate without charge nor cooldown
             */
            CATBR_ACTOR: function(datum, datumType, latestCoreATBRate) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 1 : 0.5; 
                //
            }, // CATBR_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCoreATBRate - The ATB fill rate up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB fill rate without charge nor cooldown
             */
            CATBR_VAR: function(datum, datumType, latestCoreATBRate) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // CATBR_VAR

            // Adds new CATBRX here


        }, // coreATBRate

        /*--------------------------------------------------------------------
         *    (v0.10a+)Charge ATB Rate Functions
         *    - Setups CHATBRX used by plugin's chargeATBRate notetags
         *--------------------------------------------------------------------*/
        /* CHATBRX names can only use alphanumeric characters
         * The 1st character of CHATBRX can't be a number
         * The below CHATBRX are examples added to help you set your CHATBRX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CHATBRX can be used on notetags other than chargeATBRate
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CHATBRX
         */
        chargeATBRate: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestChargeATBRate - The ATB charge rate up to
             *                                       the latest note
             *                                       DON'T USE IT IF THE
             *                                       CHAINING RULE IS AN
             *                                       ASSOCIATIVE OPERATOR
             *                                       Refer to reference tag
             *                                       ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB charge rate
             */
            CHATBR_2: function(datum, datumType, latestChargeATBRate) {
                return 2; // Always returns 2
            }, // CHATBR_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestChargeATBRate - The ATB charge rate up to
             *                                       the latest note
             *                                       DON'T USE IT IF THE
             *                                       CHAINING RULE IS AN
             *                                       ASSOCIATIVE OPERATOR
             *                                       Refer to reference tag
             *                                       ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB charge rate
             */
            CHATBR_ACTOR: function(datum, datumType, latestChargeATBRate) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 1 : 0.5; 
                //
            }, // CHATBR_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestChargeATBRate - The ATB charge rate up to
             *                                       the latest note
             *                                       DON'T USE IT IF THE
             *                                       CHAINING RULE IS AN
             *                                       ASSOCIATIVE OPERATOR
             *                                       Refer to reference tag
             *                                       ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB charge rate
             */
            CHATBR_VAR: function(datum, datumType, latestChargeATBRate) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            } // CHATBR_VAR

            // Adds new CHATBRX here


        }, // chargeATBRate

        /*--------------------------------------------------------------------
         *    (v0.10a+)Cooldown ATB Rate Functions
         *    - Setups CDATBRX used by plugin's cooldownATBRate notetags
         *--------------------------------------------------------------------*/
        /* CDATBRX names can only use alphanumeric characters
         * The 1st character of CDATBRX can't be a number
         * The below CDATBRX are examples added to help you set your CDATBRX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)CDATBRX can be used on notetags other than cooldownATBRate
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular CDATBRX
         */
        cooldownATBRate: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCooldownATBRate - The ATB charge rate up to
             *                                         the latest note
             *                                         DON'T USE IT IF THE
             *                                         CHAINING RULE IS AN
             *                                         ASSOCIATIVE OPERATOR
             *                                         Refer to reference tag
             *                                         ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB cooldown rate
             */
            CDATBR_2: function(datum, datumType, latestCooldownATBRate) {
                return 2; // Always returns 2
            }, // CDATBR_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCooldownATBRate - The ATB charge rate up to
             *                                         the latest note
             *                                         DON'T USE IT IF THE
             *                                         CHAINING RULE IS AN
             *                                         ASSOCIATIVE OPERATOR
             *                                         Refer to reference tag
             *                                         ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB cooldown rate
             */
            CDATBR_ACTOR: function(datum, datumType, latestCooldownATBRate) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 1 : 0.5; 
                //
            }, // CDATBR_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.10a @version v0.10a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestCooldownATBRate - The ATB charge rate up to
             *                                         the latest note
             *                                         DON'T USE IT IF THE
             *                                         CHAINING RULE IS AN
             *                                         ASSOCIATIVE OPERATOR
             *                                         Refer to reference tag
             *                                         ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB cooldown rate
             */
            CDATBR_VAR: function(datum, datumType, latestCooldownATBRate) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            } // CDATBR_VAR

            // Adds new CDATBRX here


        }, // cooldownATBRate

        /*--------------------------------------------------------------------
         *    (v0.07a+)Reset ATB Value Functions
         *    - Setups RATBVX used by this plugin's resetATBVal notetags
         *--------------------------------------------------------------------*/
        /* RATBVX names can only use alphanumeric characters
         * The 1st character of RATBVX can't be a number
         * The below RATBVX are examples added to help you set your RATBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)RATBVX can be used on notetags other than resetATBVal if
         * you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular RATBVX
         */
        resetATBVal: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestResetATBVal - The reset ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value right after cooldown for the
             *                   battler involved
             */
            RATBV_25: function(datum, datumType, latestResetATBVal) {
                return 25; // Always returns 25
            }, // RATBV_25

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestResetATBVal - The reset ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value right after cooldown for the
             *                   battler involved
             */
            RATBV_QUARTER: function(datum, datumType, latestResetATBVal) {
                // Returns a quarter of the maximum ATB value of the battler
                return this.coreMaxSATB() / 4.0;
                //
            }, // RATBV_QUARTER

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestResetATBVal - The reset ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value right after cooldown for the
             *                   battler involved
             */
            RATBV_VAR: function(datum, datumType, latestResetATBVal) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // RATBV_VAR

            // Adds new RATBVX here


        }, // resetATBVal

        /*--------------------------------------------------------------------
         *    (v0.08a+)Action Speed Functions
         *    - Setups ASX used by this plugin's actSpeed notetags
         *--------------------------------------------------------------------*/
        /* ASX names can only use alphanumeric characters
         * The 1st character of ASX can't be a number
         * The below ASX are examples added to help you set your ASX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)ASX can be used on notetags other than actSpeed if you
         * really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular ASX
         */
        actSpeed: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.08a @version v0.08a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestActSpeed - The action speed up to the
             *                                  latest note
             *                                  DON'T USE IT IF THE CHAINING
             *                                  RULE IS AN ASSOCIATIVE OPERATOR
             *                                  Refer to reference tag
             *                                  ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The action speed of the battler involved
             */
            AS_2000: function(datum, datumType, latestActSpeed) {
                return 2000; // Always returns 2000
            }, // AS_200

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.08a @version v0.08a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestActSpeed - The action speed up to the
             *                                  latest note
             *                                  DON'T USE IT IF THE CHAINING
             *                                  RULE IS AN ASSOCIATIVE OPERATOR
             *                                  Refer to reference tag
             *                                  ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The action speed of the battler involved
             */
            AS_NEGATIVE_2000: function(datum, datumType, latestActSpeed) {
                return -2000; // Always returns -2000
            }, // AS_NEGATIVE_2000

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.08a @version v0.08a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestActSpeed - The action speed up to the
             *                                  latest note
             *                                  DON'T USE IT IF THE CHAINING
             *                                  RULE IS AN ASSOCIATIVE OPERATOR
             *                                  Refer to reference tag
             *                                  ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The action speed of the battler involved
             */
            AS_VAR: function(datum, datumType, latestActSpeed) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // AS_VAR
        
            // Adds new ASX here
            

        }, // actSpeed

        /*--------------------------------------------------------------------
         *    (v0.09a+)Normal Start ATB Value Functions
         *    - Setups NSATBVX used by this plugin's normStartATBVal notetags
         *--------------------------------------------------------------------*/
        /* NSATBVX names can only use alphanumeric characters
         * The 1st character of NSATBVX can't be a number
         * The below NSATBVX are examples added to help you set your NSATBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)NSATBVX can be used on notetags other than normStartATBVal
         * if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular NSATBVX
         */
        normStartATBVal: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a normal battle start
             */
            NSATBV_2: function(datum, datumType, latestStartATBVal) {
                return 2; // Always returns 2
            }, // NSATBV_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a normal battle start
             */
            NSATBV_HALF: function(datum, datumType, latestStartATBVal) {
                // Returns half of the maximum ATB value of the battler
                return this.coreMaxSATB() / 2.0;
                //
            }, // NSATBV_HALF

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a normal battle start
             */
            NSATBV_VAR: function(datum, datumType, latestStartATBVal) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // NSATBV_VAR

            // Adds new NSATBVX here


        }, // normStartATBVal

        /*--------------------------------------------------------------------
         *    (v0.09a+)Preemptive Start ATB Value Functions
         *    - Setups PSATBVX used by plugin's preemptStartATBVal notetags
         *--------------------------------------------------------------------*/
        /* PSATBVX names can only use alphanumeric characters
         * The 1st character of PSATBVX can't be a number
         * The below PSATBVX are examples added to help you set your PSATBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)PSATBVX can be used on notetags other than
         * preemptStartATBVal if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular PSATBVX
         */
        preemptStartATBVal: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a preemptive battle start
             */
            PSATBV_2: function(datum, datumType, latestStartATBVal) {
                return 2; // Always returns 2
            }, // PSATBV_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a preemptive battle start
             */
            PSATBV_HALF: function(datum, datumType, latestStartATBVal) {
                // Returns half of the maximum ATB value of the battler
                return this.coreMaxSATB() / 2.0;
                //
            }, // PSATBV_HALF

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a preemptive battle start
             */
            PSATBV_VAR: function(datum, datumType, latestStartATBVal) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // PSATBV_VAR

            // Adds new PSATBVX here


        }, // preemptStartATBVal

        /*--------------------------------------------------------------------
         *    (v0.09a+)Surprise Start ATB Value Functions
         *    - Setups SSATBVX used by plugin's surpriseStartATBVal notetags
         *--------------------------------------------------------------------*/
        /* SSATBVX names can only use alphanumeric characters
         * The 1st character of SSATBVX can't be a number
         * The below SSATBVX are examples added to help you set your SSATBVX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)SSATBVX can be used on notetags other than
         * surpriseStartATBVal if you really know what you're truly doing
         * (Advanced)You're encouraged and recommended to write modular SSATBVX
         */
        surpriseStartATBVal: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a surprise battle start
             */
            SSATBV_2: function(datum, datumType, latestStartATBVal) {
                return 2; // Always returns 2
            }, // SSATBV_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a surprise battle start
             */
            SSATBV_HALF: function(datum, datumType, latestStartATBVal) {
                // Returns half of the maximum ATB value of the battler
                return this.coreMaxSATB() / 2.0;
                //
            }, // SSATBV_HALF

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.09a @version v0.09a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Number} latestStartATBVal - The start ATB value up to the
             *                                     latest note
             *                                     DON'T USE IT IF THE CHAINING
             *                                     RULE IS AN ASSOCIATIVE
             *                                     OPERATOR
             *                                     Refer to reference tag
             *                                     ASSOCIATIVE_CHAINING_RULE
             * @returns {Number} The ATB value upon a surprise battle start
             */
            SSATBV_VAR: function(datum, datumType, latestStartATBVal) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // SSATBV_VAR

            // Adds new SSATBVX here


        } // surpriseStartATBVal

    }; // SATB.notes

})(DoubleX_RMMV.SATB = {});
