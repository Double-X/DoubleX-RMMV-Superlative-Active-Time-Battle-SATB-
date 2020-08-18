// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Configurations"] = "v0.14a";
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
 * Only read the directly related parts of the documentation plugin and the help section of the parameters plugin when you've issues using this plugin, as they're too long to be read all at once
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
             * @returns {Opacity} The battler ATB value bar window frame opacity
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
             * Sets the font face of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The battler ATB value bar text font face
             */
            atbBarFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // atbBarFontFace

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
             * Sets the background opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.03a @version v0.03a
             * @returns {Opacity} The battler ATB value bar background opacity
             */
            atbBarBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the file path of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battler sprite ATB bar windowskin file path
             */
            atbBarWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the file name of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battler sprite ATB bar windowskin file name
             */
            atbBarWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the hue of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The battler sprite ATB bar windowskin hue
             */
            atbBarWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the smooth of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battler sprite ATB bar windowskin smooth
             */
            atbBarWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the text alignment of the battler sprite ATB bar
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battler sprite ATB bar text alignment
             */
            atbBarTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // atbBarTextAlign

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
             * @returns {Opacity} The battler ATB value bar window frame opacity
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
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the font face of the text showing the battler ATB values
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The battler ATB value bar text font face
             */
            statusATBBarFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // statusATBBarFontFace

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
             * Sets the background opacity of the battler ATB value bar
             * Potential Hotspot/Nullipotent
             * @since v0.06a @version v0.06a
             * @returns {Opacity} The battler ATB value bar background opacity
             */
            statusATBBarBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the file path of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battler sprite ATB bar windowskin file path
             */
            statusATBBarWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the file name of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battler sprite ATB bar windowskin file name
             */
            statusATBBarWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the hue of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The battler sprite ATB bar windowskin hue
             */
            statusATBBarWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the smooth of the battler sprite ATB bar windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battler sprite ATB bar windowskin smooth
             */
            statusATBBarWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the battler sprite ATB bar involved
             * Sets the text alignment of the battler sprite ATB bar
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battler sprite ATB bar text alignment
             */
            statusATBBarTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // statusATBBarTextAlign

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
                return this.textColor(7); // The text color with color code 7
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
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
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
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text showing the ATB frame update isn't forced
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame isn't forced
             */
            noForceATBText: function() { return 'Not Forcing ATB'; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text showing the ATB frame update's forced to run
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to run
             */
            forceRunATBStatText: function() { return 'Forcibly Running ATB'; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
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
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window x position
             */
            forceATBStatWinX: function() { return 0; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window y position
             */
            forceATBStatWinY: function() { return 0; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The force ATB status window opacity
             */
            forceATBStatOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window width
             */
            forceATBStatWinW: function() { return 160; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status window height
             */
            forceATBStatWinH: function() { return 40; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the font face of the force ATB status window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The force ATB status window text font face
             */
            forceATBStatFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // forceATBStatFontFace

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB status description text size
             */
            forceATBStatTextSize: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window line height
             */
            forceATBStatWinLineH: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the window showing the force ATB status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status window padding
             */
            forceATBStatWinPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force ATB status window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Opacity} The force ATB status window background opacity
             */
            forceATBStatBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the file path of the force ATB status windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force ATB status windowskin file path
             */
            forceATBStatWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the file name of the force ATB status windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force ATB status windowskin file name
             */
            forceATBStatWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the hue of force ATB status windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The force ATB status windowskin hue
             */
            forceATBStatWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the smooth of the force ATB status windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force ATB status windowskin smooth
             */
            forceATBStatWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the text color of the force ATB status window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force ATB status window text color
             */
            forceATBStatTextColor: function() {
                return this.normalColor(); // The default window text color
            }, // forceATBStatTextColor

            /**
             * The this pointer refers to the Window_SATBForceStatus.prototype
             * Sets the text alignment of the force ATB status window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force ATB status window text alignment
             */
            forceATBStatTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // forceATBStatTextAlign

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text x offset
             */
            forceATBStatTextXOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceStatus.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB status text y offset
             */
            forceATBStatTextYOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
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
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the force run ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to run
             */
            forceRunATBCmdText: function() { return 'Force Run'; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window x position
             */
            forceATBRunCmdWinX: function() { return 0; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window y position
             */
            forceATBRunCmdWinY: function() { return 40; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The force ATB run command window opacity
             */
            forceATBRunCmdOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window width
             */
            forceATBRunCmdWinW: function() { return 80; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB run command window height
             */
            forceATBRunCmdWinH: function() { return 40; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the font face of the force run ATB command window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} Force run ATB command window text font face
             */
            forceATBRunCmdFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // forceATBRunCmdFontFace

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB run command description text size
             */
            forceATBRunCmdTextSize: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window line height
             */
            forceATBRunCmdWinLineH: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command window padding
             */
            forceATBRunCmdWinPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force run ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Opacity} The force ATB run command window back opacity
             */
            forceATBRunCmdBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the file path of the force run ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force run ATB command windowskin file path
             */
            forceATBRunCmdWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the file name of the force run ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force run ATB command windowskin file name
             */
            forceATBRunCmdWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the hue of force run ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The force run ATB command windowskin hue
             */
            forceATBRunCmdWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the smooth of the force run ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force run ATB command windowskin smooth
             */
            forceATBRunCmdWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the text color of the force run ATB command window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force run ATB command window text color
             */
            forceATBRunCmdTextColor: function() {
                return this.normalColor(); // The default window text color
            }, // forceATBRunCmdTextColor

            /**
             * The this pointer refers to the Window_SATBForceRunCmd.prototype
             * Sets the text alignment of the force run ATB command window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} Force run ATB command window text alignment
             */
            forceATBRunCmdTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // forceATBRunCmdTextAlign

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text x offset
             */
            forceATBRunCmdTextXOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refers to Window_SATBForceRunCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text of the force run ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB run command text y offset
             */
            forceATBRunCmdTextYOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
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
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the force stop ATB frame update command
             * Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {String} The text showing the ATB frame's forced to stop
             */
            forceStopATBCmdText: function() { return 'Force Stop'; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command window x position
             */
            forceATBStopCmdWinX: function() { return 80; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command window y position
             */
            forceATBStopCmdWinY: function() { return 40; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The force ATB stop command window opacity
             */
            forceATBStopCmdOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB stop command window width
             */
            forceATBStopCmdWinW: function() { return 80; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} The force ATB stop command window height
             */
            forceATBStopCmdWinH: function() { return 40; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the font face of the force stop ATB command window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} Force stop ATB command window text font face
             */
            forceATBStopCmdFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // forceATBStopCmdFontFace

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {+ve Num} Force ATB stop command desc text size
             */
            forceATBStopCmdTextSize: function() { return 12; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window line height
             */
            forceATBStopCmdWinLineH: function() { return 12; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command window padding
             */
            forceATBStopCmdWinPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the force stop ATB command window
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Opacity} The force ATB stop command window back opacity
             */
            forceATBStopCmdBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the file path of the force stop ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force stop ATB command windowskin file path
             */
            forceATBStopCmdWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the file name of the force stop ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The force stop ATB command windowskin file name
             */
            forceATBStopCmdWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the hue of force stop ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The force stop ATB command windowskin hue
             */
            forceATBStopCmdWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the smooth of the force stop ATB command windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force stop ATB command windowskin smooth
             */
            forceATBStopCmdWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the text color of the force stop ATB command window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The force stop ATB command window text color
             */
            forceATBStopCmdTextColor: function() {
                return this.normalColor(); // The default window text color
            }, // forceATBStopCmdTextColor

            /**
             * The this pointer refers to the Window_SATBForceStopCmd.prototype
             * Sets the text alignment of the force stop ATB command window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} Force stop ATB command window text alignment
             */
            forceATBStopCmdTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // forceATBStopCmdTextAlign

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text of the force stop ATB command
             * Hotspot/Nullipotent
             * @since v0.02a @version v0.02a
             * @returns {Number} The force ATB stop command text x offset
             */
            forceATBStopCmdTextXOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refer to Window_SATBForceStopCmd.prototype
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
         *    (v0.12a+)Countdown Module
         *    - Lets you set some states to update turns with time intervals
         *--------------------------------------------------------------------*/
        countdown: {

            /**
             * Sets whether the Countdown Module will be enabled
             * Nullipotent
             * @since v0.07a @version v0.07a
             * @returns {Boolean} The check result
             */
            IsCountdownEnabled: function() {
                return false; // Always disables the Countdown Module
            } // IsCountdownEnabled

        }, // countdown

        /*--------------------------------------------------------------------
         *    (v0.13a+)CTB Module
         *    - Lets you sets this plugin to run like a CTB system
         *--------------------------------------------------------------------*/
        ctb: {

            /**
             * Sets whether the CTB Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Boolean} The check result
             */
            IsCTBEnabled: function() {
                // Enables the CTB Module as long as the alt key's pressed down
                return Input.isPressed("#alt");
                //
            }, // IsCTBEnabled

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets whether the CTB window will be shown
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Boolean} The check result
             */
            isShowCTBWin: function() {
                return false; // Never shows the CTB window
            }, // isShowCTBWin

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the CTB window text
             * Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {String} The CTB window text
             */
            ctbWinText: function() {
                // Returns 'Charge Turn Battle' and 'Active Time Battle'
                var isCTB = SATBManager.areModulesEnabled(["IsCTBEnabled"]);
                return isCTB ? 'Charge Turn Battle' : 'Active Time Battle';
                // If the CTB Module's enabled and disabled respectively
            }, // ctbWinText

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {+ve Num} The CTB window x position
             */
            ctbWinX: function() { return 160; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {+ve Num} The CTB window y position
             */
            ctbWinY: function() { return 40; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the CTB window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The CTB window opacity
             */
            ctbWinOpacity: function() { return 255; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {+ve Num} The CTB window width
             */
            ctbWinW: function() { return 160; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {+ve Num} The CTB window height
             */
            ctbWinH: function() { return 40; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the font face of the CTB window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The CTB window text font face
             */
            ctbWinFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // ctbWinFontFace

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the CTB window text
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {+ve Num} The CTB window description text size
             */
            ctbWinTextSize: function() { return 12; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Number} The CTB window line height
             */
            ctbWinLineH: function() { return 12; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Number} The CTB window padding
             */
            ctbWinPadding: function() { return 8; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Opacity} The CTB window background opacity
             */
            ctbWinBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the file path of the CTB windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The CTB windowskin file path
             */
            ctbWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the file name of the CTB windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The CTB windowskin file name
             */
            ctbWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the hue of CTB windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The CTB windowskin hue
             */
            ctbWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the smooth of the CTB windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The CTB windowskin smooth
             */
            ctbWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the text color of the CTB window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The CTB window text color
             */
            ctbWinTextColor: function() {
                return this.normalColor(); // The default window text color
            }, // ctbWinTextColor

            /**
             * The this pointer refers to the Window_SATBCTB.prototype
             * Sets the text alignment of the CTB window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The CTB window text alignment
             */
            ctbWinTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // ctbWinTextAlign

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text x offset of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Number} The CTB window text x offset
             */
            ctbWinTextXOffset: function() { return 4; },

            /**
             * (Advanced)The this pointer refer to Window_SATBCTB.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text y offset of the CTB window
             * Hotspot/Nullipotent
             * @since v0.13a @version v0.13a
             * @returns {Number} The CTB window text y offset
             */
            ctbWinTextYOffset: function() { return 4; }

        }, // ctb

        /*--------------------------------------------------------------------
         *    (v0.06a+)Event Module
         *    - Lets users add addtional events to happen to specified timings
         *--------------------------------------------------------------------*/
        event: {

            /**
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * Sets whether the Event Module will be enabled
             * @since v0.06a @version v0.06a
             * @returns {Boolean} The check result
             */
            IsEventEnabled: function() {
                return true; // Always enables the Event Module
            }, // IsEventEnabled

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after finishing inputting actions
             * @since v0.06a @version v0.06a
             */
            didFinishInput: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after becoming able to exec acts
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
             * @since v0.06a @version v0.06a
             */
            didSetActTimes: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becoming not
             * charging nor cooling down
             * @since v0.06a @version v0.06a
             */
            didStartATBFill: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right before cancelling the ATB charge
             * @since v0.06a @version v0.06a
             */
            willCancelCharge: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after starting to force charging
             * @since v0.06a @version v0.06a
             */
            didStartForceCharge: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right before cancelling ATB cooldown
             * @since v0.06a @version v0.06a
             */
            willCancelCooldown: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becomes full
             * @since v0.06a @version v0.06a
             */
            didCoreATBBecomeFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after the ATB becomes not full
             * @since v0.06a @version v0.06a
             */
            didCoreATBBecomeNotFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after charge ATB becomes not full
             * @since v0.06a @version v0.06a
             */
            didChargeATBBecomeNotFull: function() { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after an actor becomes inputable
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
            }, // didAddInputableActor

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after a countdown state has its
             * turn counter decreased
             * @since v0.12a @version v0.12a
             * @param {Id} stateId - The id of the countdown state just updated
             */
            didDecreaseCountdownStateTurn: function(stateId) {
                // Does nothing extra
            }, // didDecreaseCountdownStateTurn

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after a countdown state has its
             * turn counter increased
             * @since v0.12a @version v0.12a
             * @param {Id} stateId - The id of the countdown state just updated
             */
            didIncreaseCountdownStateTurn: function(stateId) {
                // Does nothing extra
            }, // didIncreaseCountdownStateTurn

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after filling ATB without charge
             * nor cooldown
             * @since v0.13a @version v0.13a
             */
            didFillCoreATB: function(stateId) { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after filling charge ATB
             * @since v0.13a @version v0.13a
             */
            didFillChargeATB: function(stateId) { /* Does nothing extra */ },

            /**
             * The this pointer refers to the battler involved
             * Sets what extra to happen right after filling cooldown ATB
             * @since v0.13a @version v0.13a
             */
            didFillCooldownATB: function(stateId) { /* Does nothing extra */ }

        }, // event

        /*--------------------------------------------------------------------
         *    (v0.10a+)Order Module
         *    - Lets you show the ATB values of all battlers in the same bar
         *--------------------------------------------------------------------*/
        order: {

            /**
             * Sets whether the Order Module will be enabled
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The check result
             */
            IsOrderEnabled: function() {
                return false; // Always disables the Order Module
            }, // IsOrderEnabled

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets whether the continuous order window will be shown
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The check result
             */
            isShowContinuousOrderWin: function() {
                // Shows the continuous order window when CTB Module's disabled
                return !SATBManager.areModulesEnabled(["IsCTBEnabled"]);
                //
            }, // isShowContinuousOrderWin

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the window showing the order continuously
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order window x position
             */
            continuousOrderWinX: function() { return 320; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the window showing the order continuously
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order window y position
             */
            continuousOrderWinY: function() { return 0; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The continuous order window opacity
             */
            continuousOrderOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the window showing the order continuously
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order window width
             */
            continuousOrderWinW: function() {
                // Returns the base game screen width - 320
                return Graphics.width - 320;
                //
            }, // continuousOrderWinW

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the window showing the order continuously
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order window height
             */
            continuousOrderWinH: function() { return 80; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * Sets the font face of the continuous order window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order text font face
             */
            continuousOrderFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // battleTurnClockFontFace

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text showing the continuous order bar names
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous order bar description text size
             */
            continuousOrderTextSize: function() { return 12; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Number} The continuous order window line height
             */
            continuousOrderLineH: function() { return 12; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the window showing the order continuously
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Number} The continuous order window padding
             */
            continuousOrderPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The continuous order window background opacity
             */
            continuousOrderBackOpacity: function() { return 192; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * Sets the file path of the continuous order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The continuous order windowskin file path
             */
            continuousOrderWinskinPath: function() { return "img/system/"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * Sets the file name of the continuous order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The continuous order windowskin file name
             */
            continuousOrderWinskinFile: function() { return "Window"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * Sets the hue of the continuous order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The continuous order windowskin hue
             */
            continuousOrderWinskinHue: function() { return 0; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * Sets the smooth of the continuous order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The continuous order windowskin smooth
             */
            continuousOrderWinskinSmooth: function() { return false; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the cooldown bar relative to the
             * continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The cooldown bar x position in order window
             */
            continuousOrderCooldownBarX: function() { return 0; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the cooldown bar relative to the
             * continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The cooldown bar y position in order window
             */
            continuousOrderCooldownBarY: function() { return 24; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window cooldown bar width
             */
            continuousOrderCooldownBarW: function() {
                // Returns (the width of the continuous order window - 16) / 3
                return (this.width - 16) / 3;
                //
            }, // continuousOrderCooldownBarW

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window cooldown bar height
             */
            continuousOrderCooldownBarH: function() { return 16; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 1st gradient color of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 1st continuous window cooldown bar color
             */
            continuousOrderCooldownBarColor1: function() {
                // Returns the text color with color code 30
                return this.textColor(30);
                //
            }, // continuousOrderCooldownBarColor1

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 2nd gradient color of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 2nd continuous window cooldown bar color
             */
            continuousOrderCooldownBarColor2: function() {
                // Returns the text color with color code 31
                return this.textColor(31);
                //
            }, // continuousOrderCooldownBarColor2

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text color of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window cooldown bar text color
             */
            continuousOrderCooldownTextColor: function() {
                return this.normalColor(); // Returns the default text color
            }, // continuousOrderCooldownTextColor

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the continuous window cooldown bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window cooldown bar text
             */
            continuousOrderCooldownText: function() { return "Cooldown"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the cooldown bar text x position in continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The cooldown bar text x position in the window
             */
            continuousOrderCooldownTextX: function() {
                // Returns the width of the continuous order window * 0.11
                return this.width * 0.11;
                //
            }, // continuousOrderCooldownTextX

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the cooldown bar text y position in continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The cooldown bar text y position in the window
             */
            continuousOrderCooldownTextY: function() { return 26; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the cooldown bar text alignment in continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The cooldown bar text alignment in the window
             */
            continuousOrderCooldownTextAlign: function() {
                return "center"; // Aligns the cooldown bar text to the center
            }, // continuousOrderCooldownTextAlign

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the core bar relative to the continuous
             * order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The core bar x position in the order window
             */
            continuousOrderCoreBarX: function() {
                // Returns (the width of the continuous order window - 16) / 3
                return (this.width - 16) / 3;
                //
            }, // continuousOrderCoreBarX

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the core bar relative to the continuous
             * order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The core bar y position in the order window
             */
            continuousOrderCoreBarY: function() { return 24; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window core bar width
             */
            continuousOrderCoreBarW: function() {
                // Returns (the width of the continuous order window - 16) / 3
                return (this.width - 16) / 3;
                //
            }, // continuousOrderCoreBarW

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window core bar height
             */
            continuousOrderCoreBarH: function() { return 16; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 1st gradient color of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 1st continuous window core bar color
             */
            continuousOrderCoreBarColor1: function() {
                // Returns the text color with color code 30
                return this.textColor(30);
                //
            }, // continuousOrderCoreBarColor1

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 2nd gradient color of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 2nd continuous window core bar color
             */
            continuousOrderCoreBarColor2: function() {
                // Returns the text color with color code 31
                return this.textColor(31);
                //
            }, // continuousOrderCoreBarColor2

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text color of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window core bar text color
             */
            continuousOrderCoreTextColor: function() {
                return this.normalColor(); // Returns the default text color
            }, // continuousOrderCoreTextColor

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the continuous window core bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window core bar text
             */
            continuousOrderCoreText: function() { return "Core"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the core bar text x position in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The core bar text x position in the window
             */
            continuousOrderCoreTextX: function() {
                // Returns the width of the continuous order window * 0.46
                return this.width * 0.46;
                //
            }, // continuousOrderCoreTextX

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the core bar text y position in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The core bar text y position in the window
             */
            continuousOrderCoreTextY: function() { return 26; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the core bar text alignment in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The core bar text alignment in the window
             */
            continuousOrderCoreTextAlign: function() {
                return "center"; // Aligns the core bar text to the center
            }, // continuousOrderCoreTextAlign

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the charge bar relative to the continuous
             * order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The charge bar x position in the order window
             */
            continuousOrderChargeBarX: function() {
                // Returns (width of the continuous order window - 16) * 2 / 3
                return (this.width - 16) * 2 / 3;
                //
            }, // continuousOrderChargeBarX

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the charge bar relative to the continuous
             * order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The charge bar y position in the order window
             */
            continuousOrderChargeBarY: function() { return 24; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window charge bar width
             */
            continuousOrderChargeBarW: function() {
                // Returns (the width of the continuous order window - 16) / 3
                return (this.width - 16) / 3;
                //
            }, // continuousOrderChargeBarW

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window charge bar height
             */
            continuousOrderChargeBarH: function() { return 16; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 1st gradient color of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 1st continuous window charge bar color
             */
            continuousOrderChargeBarColor1: function() {
                // Returns the text color with color code 26
                return this.textColor(26);
                //
            }, // continuousOrderChargeBarColor1

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the 2nd gradient color of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The 2nd continuous window charge bar color
             */
            continuousOrderChargeBarColor2: function() {
                // Returns the text color with color code 27
                return this.textColor(27);
                //
            }, // continuousOrderChargeBarColor2

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text color of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window charge bar text color
             */
            continuousOrderChargeTextColor: function() {
                return this.normalColor(); // Returns the default text color
            }, // continuousOrderChargeTextColor

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text of the continuous window charge bar
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The continuous window charge bar text
             */
            continuousOrderChargeText: function() { return "Charge"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the charge bar text x position in the continuous order
             * window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The charge bar text x position in the window
             */
            continuousOrderChargeTextX: function() {
                // Returns the continuous order window width * 0.77
                return this.width * 0.77;
                //
            }, // continuousOrderChargeTextX

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the charge bar text y position in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The charge bar text y position in the window
             */
            continuousOrderChargeTextY: function() { return 26; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBContinuousOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the charge bar text alignment in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The charge bar text alignment in the window
             */
            continuousOrderChargeTextAlign: function() {
                return "center"; // Aligns the charge bar text to the center
            }, // continuousOrderChargeTextY

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the continuous order battler icon sprite
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Opacity} The continuous order battler sprite opacity
             */
            continuousOrderSpriteOpacity: function(continuousOrderSprite) {
                // Returns 255 and 160 if the battler can and can't input acts
                return this.canMakeSATBCmds() ? 255 : 160;
                //
            }, // continuousOrderSpriteOpacity

            /**
             * The this pointer refers to the battler involved
             * Sets the file path of the continuous order battler icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler icon sheet path
             */
            continuousOrderSpriteIconFolder: function(continuousOrderSprite) {
                return "img/system/";
            }, // continuousOrderSpriteIconFolder

            /**
             * The this pointer refers to the battler involved
             * Sets the file name of the continuous order battler icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler icon sheet name
             */
            continuousOrderSpriteIconFilename: function(continuousOrderSprite) {
                return "Window";
            }, // continuousOrderSpriteIconFilename

            /**
             * The this pointer refers to the battler involved
             * Sets the hue of the continuous order battler sprite icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite icon sheet hue
             */
            continuousOrderSpriteIconHue: function(continuousOrderSprite) {
                return 0;
            }, // continuousOrderSpriteIconHue

            /**
             * The this pointer refers to the battler involved
             * Sets the smooth of the continuous order battler sprite icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Boolean} The continuous order battler icon sheet smooth
             */
            continuousOrderSpriteIconSmooth: function(continuousOrderSprite) {
                return false;
            }, // continuousOrderSpriteIconSmooth

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x coodinate of the continuous order window battler
             * sprite in the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite icon sheet x coordinate
             */
            continuousOrderSpriteIconXCoor: function(continuousOrderSprite) {
                return 0;
            }, // continuousOrderSpriteIconXCoor

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y coodinate of the continuous order window battler
             * sprite in the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite icon sheet y coordinate
             */
            continuousOrderSpriteIconYCoor: function(continuousOrderSprite) {
                return 0;
            }, // continuousOrderSpriteIconYCoor

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the continuous order window battler sprite in
             * the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite width in the icon sheet
             */
            continuousOrderSpriteIconSourceW: function(continuousOrderSprite) {
                return 48;
            }, // continuousOrderSpriteIconSourceW

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the continuous order window battler sprite in
             * the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite height in the icon sheet
             */
            continuousOrderSpriteIconSourceH: function(continuousOrderSprite) {
                return 48;
            }, // continuousOrderSpriteIconSourceH

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the continuous order window battler sprite in
             * the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite width in the order window
             */
            continuousOrderSpriteIconW: function(continuousOrderSprite) {
                return 24;
            }, // continuousOrderSpriteIconW

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the continuous order window battler sprite in
             * the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite height in the order window
             */
            continuousOrderSpriteIconH: function(continuousOrderSprite) {
                return 24;
            }, // continuousOrderSpriteIconH

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the continuous order window battler sprite
             * in the continuous order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite y position in order window
             */
            continuousOrderSpriteY: function(continuousOrderSprite) {
                // Returns 48 and 8 if the battler's actor or not respectively
                return this.isActor() ? 48 : 8;
                //
            }, // continuousOrderSpriteY

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets whether the discrete order window will be shown
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The check result
             */
            isShowDiscreteOrderWin: function() {
                // Shows the discrete order window when CTB Module's enabled
                return SATBManager.areModulesEnabled(["IsCTBEnabled"]);
                //
            }, // isShowDiscreteOrderWin

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the window showing the order discretely
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The discrete order window x position
             */
            discreteOrderWinX: function() { return 320; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the window showing the order discretely
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The discrete order window y position
             */
            discreteOrderWinY: function() { return 0; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The discrete order window opacity
             */
            discreteOrderOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the window showing the order discretely
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The discrete order window width
             */
            discreteOrderWinW: function() {
                // Returns the base game screen width - 320
                return Graphics.width - 320;
                //
            }, // discreteOrderWinW

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the window showing the order discretely
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The discrete order window height
             */
            discreteOrderWinH: function() { return 80; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the window showing the order discretely
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Number} The discrete order window padding
             */
            discreteOrderPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The discrete order window background opacity
             */
            discreteOrderBackOpacity: function() { return 192; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * Sets the file path of the discrete order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The discrete order windowskin file path
             */
            discreteOrderWinskinPath: function() { return "img/system/"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * Sets the file name of the discrete order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The discrete order windowskin file name
             */
            discreteOrderWinskinFile: function() { return "Window"; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * Sets the hue of the discrete order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The discrete order windowskin hue
             */
            discreteOrderWinskinHue: function() { return 0; },

            /**
             * (Advanced)This pointer refers to
             * Window_SATBDiscreteOrder.prototype
             * Sets the smooth of the discrete order windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The discrete order windowskin smooth
             */
            discreteOrderWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the discrete order battler icon sprite when
             * it's showing
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} Showing discrete order battler sprite opacity
             */
            showingDiscreteOrderBattlerSpriteOpacity: function(discreteOrderSprite) {
                // Shows the discrete order battler sprite within 60 frames
                var target = this.targetOpacity;
                return Math.min(target, this.opacity + target / 60.0);
                //
            }, // showingDiscreteOrderBattlerSpriteOpacity

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the discrete order battler icon sprite when
             * it's hiding
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} Hiding discrete order battler sprite opacity
             */
            hidingDiscreteOrderBattlerSpriteOpacity: function(discreteOrderSprite) {
                // Hides the discrete order battler sprite within 60 frames
                return Math.max(0, this.opacity - this.targetOpacity / 60.0);
                //
            }, // hidingDiscreteOrderBattlerSpriteOpacity

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the discrete order window battler sprite
             * in the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite y position in order window
             */
            discreteOrderSpriteX: function(discreteOrderSprite) {
                // Moves discrete order battler sprite x coor within 60 frames
                var cur = this.x, target = this._targetX;
                var rate = (target - this._lastTargetX) / 60.0;
                if (cur < target) return Math.min(target, cur + rate);
                if (cur > target)return Math.max(target, cur + rate);
                return cur;
                //
            }, // discreteOrderSpriteX

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the discrete order window battler sprite
             * in the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite y position in order window
             */
            discreteOrderSpriteY: function(discreteOrderSprite) {
                // Moves discrete order battler sprite y coor within 60 frames
                var baseY = 28, cur = this.x;
                var last = this._lastTargetX, target = this._targetX;
                var curDiff = this.x - last;
                if (curDiff === 0) return baseY;
                var targetDiffSq = Math.pow(this._targetX - last, 2);
                var absY = 50 * curDiff * (target - cur) / targetDiffSq;
                return baseY + (curDiff > 0 ? -1 : 1) * absY;
                //
            }, // discreteOrderSpriteY

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the discrete order battler icon sprite
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} The discrete order battler sprite opacity
             */
            discreteOrderSpriteTargetOpacity: function(discreteOrderSprite) {
                // Returns 255 and 160 if the battler can and can't input acts
                return this.canMakeSATBCmds() ? 255 : 160;
                //
            }, // discreteOrderSpriteTargetOpacity

            /**
             * The this pointer refers to the battler involved
             * Sets the file path of the discrete order battler icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler icon sheet path
             */
            discreteOrderSpriteIconFolder: function(discreteOrderSprite) {
                return "img/system/";
            }, // discreteOrderSpriteIconFolder

            /**
             * The this pointer refers to the battler involved
             * Sets the file name of the discrete order battler icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler icon sheet name
             */
            discreteOrderSpriteIconFilename: function(discreteOrderSprite) {
                return "Window";
            }, // discreteOrderSpriteIconFilename

            /**
             * The this pointer refers to the battler involved
             * Sets the hue of the discrete order battler sprite icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite icon sheet hue
             */
            discreteOrderSpriteIconHue: function(discreteOrderSprite) {
                return 0;
            }, // discreteOrderSpriteIconHue

            /**
             * The this pointer refers to the battler involved
             * Sets the smooth of the discrete order battler sprite icon sheet
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Boolean} The discrete order battler icon sheet smooth
             */
            discreteOrderSpriteIconSmooth: function(discreteOrderSprite) {
                return false;
            }, // discreteOrderSpriteIconSmooth

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x coodinate of the discrete order window battler
             * sprite in the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite icon sheet x coordinate
             */
            discreteOrderSpriteIconXCoor: function(discreteOrderSprite) {
                return 0;
            }, // discreteOrderSpriteIconXCoor

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y coodinate of the discrete order window battler
             * sprite in the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite icon sheet y coordinate
             */
            discreteOrderSpriteIconYCoor: function(discreteOrderSprite) {
                return 0;
            }, // discreteOrderSpriteIconYCoor

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the discrete order window battler sprite in
             * the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite width in the icon sheet
             */
            discreteOrderSpriteIconSourceW: function(discreteOrderSprite) {
                return 48;
            }, // discreteOrderSpriteIconSourceW

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the discrete order window battler sprite in
             * the icon sheet
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite height in the icon sheet
             */
            discreteOrderSpriteIconSourceH: function(discreteOrderSprite) {
                return 48;
            }, // discreteOrderSpriteIconSourceH

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the discrete order window battler sprite in
             * the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite width in the order window
             */
            discreteOrderSpriteIconW: function(discreteOrderSprite) {
                return 24;
            }, // discreteOrderSpriteIconW

            /**
             * The this pointer refers to the battler involved
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the discrete order window battler sprite in
             * the discrete order window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The battler sprite height in the order window
             */
            discreteOrderSpriteIconH: function(discreteOrderSprite) {
                return 24;
            } // discreteOrderSpriteIconH

        }, // order

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

        }, // start

        /*--------------------------------------------------------------------
         *    (v0.11a+)Turn Module
         *    - Lets you show the battle turn clock status in a battle window
         *--------------------------------------------------------------------*/
        turn: {

            /**
             * Sets whether the Turn Module will be enabled
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Boolean} The check result
             */
            IsTurnEnabled: function() {
                return false; // Always disables the Turn Module
            }, // IsTurnEnabled

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets whether the battle turn clock window will be shown
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Boolean} The check result
             */
            isShowBattleTurnClockWin: function() {
                return true; // Always show the battle turn clock window
            }, // isShowBattleTurnClockWin

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the text showing the battle turn clock statuses
             * Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {String} The text showing the battle turn clock statuses
             */
            battleTurnClockText: function() {
                // The current battle turn clock count
                var cur = SATBTurnManager.curTurnClock().toPrecision(4);
                //
                // The maximum battle turn clock count
                var max = SATBTurnManager.curTurnClockMax();
                //
                // The battle turn clock unit
                var clockUnit = SATBTurnManager.coreTurnClockUnit();
                //
                var turnCount = $gameTroop.turnCount(); // The battle turn count
                // current clock/max clock battle clock unit:battle turn count
                return cur + '/' + max + ' ' + clockUnit + ':' + turnCount;
                //
            }, // battleTurnClockText

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x position of the window showing the battle turn clock
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {+ve Num} The battle turn clock window x position
             */
            battleTurnClockWinX: function() { return 160; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y position of the window showing the battle turn clock
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {+ve Num} The battle turn clock window y position
             */
            battleTurnClockWinY: function() { return 0; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the opacity of the battle turn clock window
             * Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Opacity} The battle turn clock window opacity
             */
            battleTurnClockOpacity: function() { return 255; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the width of the window showing the battle turn clock
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {+ve Num} The battle turn clock window width
             */
            battleTurnClockWinW: function() { return 160; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the height of the window showing the battle turn clock
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {+ve Num} The battle turn clock window height
             */
            battleTurnClockWinH: function() { return 40; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the font face of the battle turn clock window text
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {+ve Num} The battle turn clock window text font face
             */
            battleTurnClockFontFace: function() {
                // Uses the default window font face
                return Window_Base.prototype.standardFontFace.call(this);
                //
            }, // battleTurnClockFontFace

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the size of the text showing the battle turn clock statuses
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {+ve Num} The battle turn clock description text size
             */
            battleTurnClockTextSize: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the line height of the battle turn clock window
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Number} The battle turn clock window line height
             */
            battleTurnClockWinLineH: function() { return 12; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the padding of the window showing the battle turn clock
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Number} The battle turn clock window padding
             */
            battleTurnClockWinPadding: function() { return 8; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the back opacity of the battle turn clock window
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Opacity} The battle turn clock window background opacity
             */
            battleTurnClockBackOpacity: function() { return 192; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the file path of the battle turn clock windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battle turn clock windowskin file path
             */
            battleTurnClockWinskinPath: function() { return "img/system/"; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the file name of the battle turn clock windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {String} The battle turn clock windowskin file name
             */
            battleTurnClockWinskinFile: function() { return "Window"; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the hue of battle turn clock windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Hue} The battle turn clock windowskin hue
             */
            battleTurnClockWinskinHue: function() { return 0; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the smooth of the battle turn clock windowskin
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battle turn clock windowskin smooth
             */
            battleTurnClockWinskinSmooth: function() { return false; },

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the text color of the battle turn clock window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battle turn clock window text color
             */
            battleTurnClockTextColor: function() {
                return this.normalColor(); // The default window text color
            }, // battleTurnClockTextColor

            /**
             * The this pointer refers to the Window_SATBTurnClock.prototype
             * Sets the text alignment of the battle turn clock window
             * Potential Hotspot/Nullipotent
             * @since v0.14a @version v0.14a
             * @returns {Boolean} The battle turn clock window text alignment
             */
            battleTurnClockTextAlign: function() {
                return "center"; // Aligns the text to the center
            }, // battleTurnClockTextAlign

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the x offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Number} The battle turn clock text x offset
             */
            battleTurnClockTextXOffset: function() { return 4; },

            /**
             * (Advanced)This pointer refers to Window_SATBTurnClock.prototype
             * THIS FUNCTION SHOULD BE PERFORMANT ENOUGH TO BE RUN PER FRAME
             * UNLESS _isParamFuncCached IS ON
             * Sets the y offset of the text showing the force ATB update status
             * Hotspot/Nullipotent
             * @since v0.11a @version v0.11a
             * @returns {Number} The battle turn clock text y offset
             */
            battleTurnClockTextYOffset: function() { return 4; }

        } // turn

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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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

        countdown: {

            /*----------------------------------------------------------------
             *    (v0.12a+)Countdown Condition Functions
             *    - Setups CCX used by plugin's countdown notetags
             *----------------------------------------------------------------*/
            /* CCX names can only use alphanumeric characters
             * The 1st character of CCX can't be a number
             * The below CCX are examples added to help you set your CCX
             * You can freely use, rewrite and/or delete these examples
             * (Advanced)CCX can be used on notetags other than countdown if you
             * really know what you're truly doing
             * If you're to use them that way, you must at least ensure
             * the following:
             * 1. The function contexts are the same across different notetags
             * 2. The function argument lists(with the paraemter names being
             *    exactly the same) are the same across different notetags
             * 3. The function return types are the same across different
             *    notetags
             * (Advanced)You're encouraged and recommended to write modular CCX
             */

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CC_TRUE: function(datum, datumType) {
                return true; // Always sets the state as an countdown state
            }, // CC_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CC_BATTLER_NAME: function(datum, datumType) {
                // Sets the state as countdown state if the battler name is Test
                return this.name() === "Test";
                //
            }, // CC_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Boolean} The check result
             */
            CC_SWITCH: function(datum, datumType) {
                // Sets the state as countdown state if switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // CC_SWITCH

            // Adds new CCX here


            /*----------------------------------------------------------------
             *    (v0.12a+)Countdown Unit Functions
             *    - Setups CUX used by plugin's countdown notetags
             *----------------------------------------------------------------*/
            /* CUX names can only use alphanumeric characters
             * The 1st character of CUX can't be a number
             * The below CUX are examples added to help you set your CUX
             * You can freely use, rewrite and/or delete these examples
             * (Advanced)CUX can be used on notetags other than countdown if you
             * really know what you're truly doing
             * If you're to use them that way, you must at least ensure
             * the following:
             * 1. The function contexts are the same across different notetags
             * 2. The function argument lists(with the paraemter names being
             *    exactly the same) are the same across different notetags
             * 3. The function return types are the same across different
             *    notetags
             * (Advanced)You're encouraged and recommended to write modular CUX
             */

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @enum @returns {String} The countdown unit(frame/sec)
             */
            CU_FRAME: function(datum, datumType) {
                return "frame"; // Always use the number of frames as the unit
            }, // CU_FRAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @enum @returns {String} The countdown unit(frame/sec)
             */
            CU_SECOND: function(datum, datumType) {
                return "sec"; // Always use the number of seconds as the unit
            }, // CU_SECOND

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @enum @returns {String} The countdown unit(frame/sec)
             */
            CU_BASE_FILL_UNIT: function(datum, datumType) {
                // Returns the same time unit as that of _coreBaseFillUnit
                switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
                    case "coreBaseFillATBFrame": return "frame";
                    case "coreBaseFillATBSec": return "sec";
                    default: throw new Error("_coreBaseFillUnit is invalid!");
                }
                //
            }, // CU_BASE_FILL_UNIT

            // Adds new CUX here


            /*----------------------------------------------------------------
             *    (v0.12a+)Countdown Interval Functions
             *    - Setups CIX used by plugin's countdown notetags
             *----------------------------------------------------------------*/
            /* CIX names can only use alphanumeric characters
             * The 1st character of CIX can't be a number
             * The below CIX are examples added to help you set your CIX
             * You can freely use, rewrite and/or delete these examples
             * (Advanced)CIX can be used on notetags other than countdown if you
             * really know what you're truly doing
             * If you're to use them that way, you must at least ensure
             * the following:
             * 1. The function contexts are the same across different notetags
             * 2. The function argument lists(with the paraemter names being
             *    exactly the same) are the same across different notetags
             * 3. The function return types are the same across different
             *    notetags
             * (Advanced)You're encouraged and recommended to write modular CIX
             */

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Number} The countdown interval
             */
            CI_1: function(datum, datumType) {
                return 1; // Always set the interval as 1 countdown unit
            }, // CU_FRAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Number} The countdown interval
             */
            CI_STATE: function(datum, datumType) {
                // Returns 2 and 1 if the battler's affected with state of id x
                return this.isStateAffected(x) ? 2 : 1;
                //
            }, // CI_STATE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @returns {Number} The countdown interval
             */
            CI_VAR: function(datum, datumType) {
                // Returns the value in the game variable with id x
                return $gameVariables.value(x);
                //
            }, // CI_VAR

            // Adds new CIX here


        }, // countdown

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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DFIX
         */
        didFinishInput: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DBAX
         */
        didBecomeActable: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DSATX
         */
        didSetActTimes: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DSATBFX
         */
        didStartATBFill: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular WCCX
         */
        willCancelCharge: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DSFCX
         */
        didStartForceCharge: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular WCCDX
         */
        willCancelCooldown: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DCATBBFX
         */
        didCoreATBBecomeFull: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular
         * DCATBBNFX
         */
        didCoreATBBecomeNotFull: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular
         * DCHATBBNFX
         */
        didChargeATBBecomeNotFull: {

            /**
             * The this pointer refers to the battler involved
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DAIAX
         */
        didAddInputableActor: {

            /**
             * The this pointer refers to the battler involved
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
         *    (v0.12a+)Did Decrease Countdown State Turn Functions
         *    - Setups DDCSTX used by didDecreaseCountdownStateTurn notetags
         *--------------------------------------------------------------------*/
        /* DDCSTX names can only use alphanumeric characters
         * The 1st character of DDCSTX can't be a number
         * The below DDCSTX are examples added to help you set your DDCSTX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DDCSTX can be used on notetags other than
         * didDecreaseCountdownStateTurn if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DDCSTX
         */
        didDecreaseCountdownStateTurn: {

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DDCST_POISON: function(datum, datumType, stateId) {
                // Reduces the hp of the battler involved by 2% of the mhp
                this._result.clear();
                this._result.success = true;
                var hpLoss = this.mhp * -0.02;
                this.gainHp(hpLoss);
                this.onDamage(hpLoss);
                this.startDamagePopup();
                if (this._hp <= 0) this.performCollapse();
                //
            }, // DDCST_POISON

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DDCST_MEND: function(datum, datumType, stateId) {
                // Increases the hp of the battler involved by 2% of the mhp
                this._result.clear();
                this._result.success = true;
                var hpGain = this.mhp * 0.02;
                this.gainHp(hpGain);
                this.onDamage(hpGain);
                this.startDamagePopup();
                //
            }, // DDCST_MEND

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DDCST_MP_SAP: function(datum, datumType, stateId) {
                // Decreases the mp of the battler involved by 2% of the mmp
                this._result.clear();
                this._result.success = true;
                var mpLoss = this.mmp * -0.02;
                this.gainHp(mpLoss);
                this.onDamage(mpLoss);
                this.startDamagePopup();
                //
            }, // DDCST_MP_SAP

            // Adds new DDCSTX here


        }, // didDecreaseCountdownStateTurn

        /*--------------------------------------------------------------------
         *    (v0.12a+)Did Increase Countdown State Turn Functions
         *    - Setups DICSTX used by didIncreaseCountdownStateTurn notetags
         *--------------------------------------------------------------------*/
        /* DICSTX names can only use alphanumeric characters
         * The 1st character of DICSTX can't be a number
         * The below DICSTX are examples added to help you set your DICSTX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DICSTX can be used on notetags other than
         * didIncreaseCountdownStateTurn if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DICSTX
         */
        didIncreaseCountdownStateTurn: {

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DICST_POISON: function(datum, datumType, stateId) {
                // Reduces the hp of the battler involved by 2% of the mhp
                this._result.clear();
                this._result.success = true;
                var hpLoss = this.mhp * -0.02;
                this.gainHp(hpLoss);
                this.onDamage(hpLoss);
                this.startDamagePopup();
                if (this._hp <= 0) this.performCollapse();
                //
            }, // DICST_POISON

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DICST_MEND: function(datum, datumType, stateId) {
                // Increases the hp of the battler involved by 2% of the mhp
                this._result.clear();
                this._result.success = true;
                var hpGain = this.mhp * 0.02;
                this.gainHp(hpGain);
                this.onDamage(hpGain);
                this.startDamagePopup();
                //
            }, // DICST_MEND

            /**
             * The this pointer refers to the battler involved
             * @since v0.12a @version v0.12a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Id} stateId - The id of the state with its turn decreased
             */
            DICST_MP_SAP: function(datum, datumType, stateId) {
                // Decreases the mp of the battler involved by 2% of the mmp
                this._result.clear();
                this._result.success = true;
                var mpLoss = this.mmp * -0.02;
                this.gainHp(mpLoss);
                this.onDamage(mpLoss);
                this.startDamagePopup();
                //
            }, // DICST_MP_SAP

            // Adds new DICSTX here


        }, // didIncreaseCountdownStateTurn

        /*--------------------------------------------------------------------
         *    (v0.13a+)Did Fill Core ATB Functions
         *    - Setups DFCATBX used by didFillCoreATB notetags
         *--------------------------------------------------------------------*/
        /* DFCATBX names can only use alphanumeric characters
         * The 1st character of DFCATBX can't be a number
         * The below DFCATBX are examples added to help you set your DFCATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DFCATBX can be used on notetags other than
         * didFillCoreATB if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DFCATBX
         */
        didFillCoreATB: {

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCATB_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DFCATB_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCATB_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DFCATB_SWITCH

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCATB_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DFCATB_VAR

            // Adds new DFCATBX here


        }, // didFillCoreATB

        /*--------------------------------------------------------------------
         *    (v0.13a+)Did Fill Charge ATB Functions
         *    - Setups DFCHATBX used by didFillChargeATB notetags
         *--------------------------------------------------------------------*/
        /* DFCHATBX names can only use alphanumeric characters
         * The 1st character of DFCHATBX can't be a number
         * The below DFCHATBX are examples added to help you set your DFCHATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DFCHATBX can be used on notetags other than
         * didFillChargeATB if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DFCHATBX
         */
        didFillChargeATB: {

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCHATB_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DFCHATB_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCHATB_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DFCHATB_SWITCH

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCHATB_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DFCHATB_VAR

            // Adds new DFCHATBX here


        }, // didFillChargeATB

        /*--------------------------------------------------------------------
         *    (v0.13a+)Did Fill Cooldown ATB Functions
         *    - Setups DFCDATBX used by didFillCooldownATB notetags
         *--------------------------------------------------------------------*/
        /* DFCDATBX names can only use alphanumeric characters
         * The 1st character of DFCDATBX can't be a number
         * The below DFCDATBX are examples added to help you set your DFCDATBX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DFCDATBX can be used on notetags other than
         * didFillCooldownATB if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DFCDATBX
         */
        didFillCooldownATB: {

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCDATB_COMMON_EVENT: function(datum, datumType) {
                // Runs the common event with id x when common events can be run
                $gameTemp.reserveCommonEvent(x);
                //
            }, // DFCDATB_COMMON_EVENT

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCDATB_SWITCH: function(datum, datumType) {
                // Sets the game switch with id x to be on
                $gameSwitches.setValue(x, true);
                //
            }, // DFCDATB_SWITCH

            /**
             * The this pointer refers to the battler involved
             * @since v0.13a @version v0.13a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             */
            DFCDATB_VAR: function(datum, datumType) {
                // Sets the value of the game variable with id x to be y
                $gameVariables.setValue(x, y);
                //
            }, // DFCDATB_VAR

            // Adds new DFCDATBX here


        }, // didFillCooldownATB

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Opacity Functions
         *    - Setups COSOX used by continuousOrderSpriteOpacity notetags
         *--------------------------------------------------------------------*/
        /* COSOX names can only use alphanumeric characters
         * The 1st character of COSOX can't be a number
         * The below COSOX are examples added to help you set your COSOX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSOX can be used on notetags other than
         * continuousOrderSpriteOpacity if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSOX
         */
        continuousOrderSpriteOpacity: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Opacity} The continuous order battler sprite opacity
             */
            COSO_0: function(datum, datumType, continuousOrderSprite) {
                return 0; // Always make the sprite completely invisible
            }, // COSO_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Opacity} The continuous order battler sprite opacity
             */
            COSO_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not
                return this.isActor() ? 2 : 1;
                //
            }, // COSO_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Opacity} The continuous order battler sprite opacity
             */
            COSO_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSO_VAR

            // Adds new COSOX here


        }, // continuousOrderSpriteOpacity

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Folder Functions
         *    - Setups COSIFX used by continuousOrderSpriteIconFolder notetags
         *--------------------------------------------------------------------*/
        /* COSIFX names can only use alphanumeric characters
         * The 1st character of COSIFX can't be a number
         * The below COSIFX are examples added to help you set your COSIFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIFX can be used on notetags other than
         * continuousOrderSpriteIconFolder if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIFX
         */
        continuousOrderSpriteIconFolder: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet path
             */
            COSIF_IMG_CHAR: function(datum, datumType, continuousOrderSprite) {
                return "img/characters/"; // Always uses character image folder
            }, // COSIF_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet path
             */
            COSIF_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns img/sv_actors/ and img/sv_enemies/ for actors and not
                return this.isActor() ? "img/sv_actors/" : "img/sv_enemies/";
                //
            }, // COSIF_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet path
             */
            COSIF_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the value in the game variable with id x
                return $gameVariables.value(x);
                //
            }, // COSIF_VAR

            // Adds new COSIFX here


        }, // continuousOrderSpriteIconFolder

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Filename Functions
         *    - Setups COSIFNX used by continuousOrderSpriteIconFilename notes
         *--------------------------------------------------------------------*/
        /* COSIFNX names can only use alphanumeric characters
         * The 1st character of COSIFNX can't be a number
         * The below COSIFNX are examples added to help you set your COSIFNX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIFNX can be used on notetags other than
         * continuousOrderSpriteIconFilename if you really know what you're
         * truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIFNX
         */
        continuousOrderSpriteIconFilename: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet name
             */
            COSIFN_ACTOR1: function(datum, datumType, continuousOrderSprite) {
                return "Actor1"; // Always uses the file named Actor1
            }, // COSIFN_ACTOR1

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet name
             */
            COSIFN_ACTOR2: function(datum, datumType, continuousOrderSprite) {
                return "Actor2"; // Always uses the file named Actor2
            }, // COSIFN_ACTOR2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet name
             */
            COSIFN_ACTOR3: function(datum, datumType, continuousOrderSprite) {
                return "Actor3"; // Always uses the file named Actor3
            }, // COSIFN_ACTOR3

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {String} The continuous order battler sprite sheet name
             */
            COSIFN_MONSTER: function(datum, datumType, continuousOrderSprite) {
                return "Monster"; // Always uses the file named Monster
            }, // COSIFN_MONSTER

            // Adds new COSIFNX here


        }, // continuousOrderSpriteIconFilename

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Hue Functions
         *    - Setups COSHX used by the continuousOrderSpriteIconHue notetags
         *--------------------------------------------------------------------*/
        /* COSHX names can only use alphanumeric characters
         * The 1st character of COSHX can't be a number
         * The below COSHX are examples added to help you set your COSHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSHX can be used on notetags other than
         * continuousOrderSpriteIconHue if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSHX
         */
        continuousOrderSpriteIconHue: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
            COSH_0: function(datum, datumType, continuousOrderSprite) {
                return 0; // Always don't change the hue
            }, // COSH_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
            COSH_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not
                return this.isActor() ? 2 : 1;
                //
            }, // COSH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
            COSH_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSH_VAR

            // Adds new COSHX here


        }, // continuousOrderSpriteIconHue

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Smooth Functions
         *    - Setups COSSX used by the continuousOrderSpriteIconSmooth notes
         *--------------------------------------------------------------------*/
        /* COSSX names can only use alphanumeric characters
         * The 1st character of COSSX can't be a number
         * The below COSSX are examples added to help you set your COSSX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSSX can be used on notetags other than
         * continuousOrderSpriteIconSmooth if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSSX
         */
        continuousOrderSpriteIconSmooth: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            COSS_TRUE: function(datum, datumType, continuousOrderSprite) {
                return true; // Always enable the smooth mode for battler sprite
            }, // COSS_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            COSS_BATTLER_NAME: function(datum, datumType, continuousOrderSprite) {
                // Enables the smooth mode for sprite of battler named Test
                return this.name() === "Test";
                //
            }, // COSS_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            COSS_SWITCH: function(datum, datumType, continuousOrderSprite) {
                // Enables the smooth mode when switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // COSS_SWITCH

            // Adds new COSSX here


        }, // continuousOrderSpriteIconSmooth

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon X Coodinate Functions
         *    - Setups COSIXCX used by continuousOrderSpriteIconXCoor notetags
         *--------------------------------------------------------------------*/
        /* COSIXCX names can only use alphanumeric characters
         * The 1st character of COSIXCX can't be a number
         * The below COSIXCX are examples added to help you set your COSIXCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIXCX can be used on notetags other than
         * continuousOrderSpriteIconXCoor if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIXCX
         */
        continuousOrderSpriteIconXCoor: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
            COSH_1: function(datum, datumType, continuousOrderSprite) {
                return 1; // Always uses the 2nd column
            }, // COSH_1

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
             COSH_4: function(datum, datumType, continuousOrderSprite) {
                 return 4; // Always uses the 5th column
             }, // COSH_4

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
             COSH_7: function(datum, datumType, continuousOrderSprite) {
                 return 7; // Always uses the 8th column
             }, // COSH_7

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {Hue} The continuous order battler sprite sheet hue
             */
             COSH_10: function(datum, datumType, continuousOrderSprite) {
                 return 10; // Always uses the 11th column
             }, // COSH_10

            // Adds new COSIXCX here


        }, // continuousOrderSpriteIconXCoor

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Y Coodinate Functions
         *    - Setups COSIYCX used by continuousOrderSpriteIconYCoor notetags
         *--------------------------------------------------------------------*/
        /* COSIYCX names can only use alphanumeric characters
         * The 1st character of COSIYCX can't be a number
         * The below COSIYCX are examples added to help you set your COSIYCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIYCX can be used on notetags other than
         * continuousOrderSpriteIconYCoor if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIYCX
         */
        continuousOrderSpriteIconYCoor: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order sprite sheet y coordinate
             */
            COSIYC_0: function(datum, datumType, continuousOrderSprite) {
                return 0; // Always uses the 1st row
            }, // COSIYC_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order sprite sheet y coordinate
             */
             COSIYC_4: function(datum, datumType, continuousOrderSprite) {
                 return 4; // Always uses the 5th row
             }, // COSIYC_4

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order sprite sheet y coordinate
             */
            COSIYC_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSIYC_VAR

            // Adds new COSIYCX here


        }, // continuousOrderSpriteIconYCoor

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Source Width Functions
         *    - Setups COSISWX used by continuousOrderSpriteIconSourceW notes
         *--------------------------------------------------------------------*/
        /* COSISWX names can only use alphanumeric characters
         * The 1st character of COSISWX can't be a number
         * The below COSISWX are examples added to help you set your COSISWX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSISWX can be used on notetags other than
         * continuousOrderSpriteIconSourceW if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSISWX
         */
        continuousOrderSpriteIconSourceW: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source width
             */
            COSISW_2: function(datum, datumType, continuousOrderSprite) {
                return 2; // Always returns 2
            }, // COSISW_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source width
             */
            COSISW_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // COSISW_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source width
             */
            COSISW_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSISW_VAR

            // Adds new COSISWX here


        }, // continuousOrderSpriteIconSourceW

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Source Height Functions
         *    - Setups COSISHX used by continuousOrderSpriteIconSourceH notes
         *--------------------------------------------------------------------*/
        /* COSISHX names can only use alphanumeric characters
         * The 1st character of COSISHX can't be a number
         * The below COSISHX are examples added to help you set your COSISHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSISHX can be used on notetags other than
         * continuousOrderSpriteIconSourceH if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSISHX
         */
        continuousOrderSpriteIconSourceH: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source height
             */
            COSISH_2: function(datum, datumType, continuousOrderSprite) {
                return 2; // Always returns 2
            }, // COSISH_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source height
             */
            COSISH_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // COSISH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} Continuous order battler sprite source height
             */
            COSISH_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSISH_VAR

            // Adds new COSISHX here


        }, // continuousOrderSpriteIconSourceH

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Width Functions
         *    - Setups COSIWX used by continuousOrderSpriteIconW notes
         *--------------------------------------------------------------------*/
        /* COSIWX names can only use alphanumeric characters
         * The 1st character of COSIWX can't be a number
         * The below COSIWX are examples added to help you set your COSIWX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIWX can be used on notetags other than
         * continuousOrderSpriteIconW if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIWX
         */
        continuousOrderSpriteIconW: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite width
             */
            COSIW_2: function(datum, datumType, continuousOrderSprite) {
                return 2; // Always returns 2
            }, // COSIW_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite width
             */
            COSIW_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // COSIW_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite width
             */
            COSIW_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSIW_VAR

            // Adds new COSIWX here


        }, // continuousOrderSpriteIconW

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Icon Height Functions
         *    - Setups COSIHX used by continuousOrderSpriteIconH notes
         *--------------------------------------------------------------------*/
        /* COSIHX names can only use alphanumeric characters
         * The 1st character of COSIHX can't be a number
         * The below COSIHX are examples added to help you set your COSIHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSIHX can be used on notetags other than
         * continuousOrderSpriteIconH if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSIHX
         */
        continuousOrderSpriteIconH: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite height
             */
            COSIH_2: function(datum, datumType, continuousOrderSprite) {
                return 2; // Always returns 2
            }, // COSIH_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite height
             */
            COSIH_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // COSIH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite height
             */
            COSIH_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSIH_VAR

            // Adds new COSIHX here


        }, // continuousOrderSpriteIconH

        /*--------------------------------------------------------------------
         *    (v0.14a+)Continuous Order Sprite Y Functions
         *    - Setups COSYX used by continuousOrderSpriteY notes
         *--------------------------------------------------------------------*/
        /* COSYX names can only use alphanumeric characters
         * The 1st character of COSYX can't be a number
         * The below COSYX are examples added to help you set your COSYX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)COSYX can be used on notetags other than
         * continuousOrderSpriteY if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular COSYX
         */
        continuousOrderSpriteY: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite y position
             */
            COSY_2: function(datum, datumType, continuousOrderSprite) {
                return 2; // Always returns 2
            }, // COSY_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite y position
             */
            COSY_ACTOR: function(datum, datumType, continuousOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // COSY_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBContinuousOrderBattlerIcon} 
             * continuousOrderSprite - The battler icon sprite
             * @returns {+ve Num} The continuous order battler sprite y position
             */
            COSY_VAR: function(datum, datumType, continuousOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // COSY_VAR

            // Adds new COSYX here


        }, // continuousOrderSpriteY

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Target Opacity Functions
         *    - Setups DOSTOX used by discreteOrderSpriteTargetOpacity notes
         *--------------------------------------------------------------------*/
        /* DOSTOX names can only use alphanumeric characters
         * The 1st character of DOSTOX can't be a number
         * The below DOSTOX are examples added to help you set your DOSTOX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSTOX can be used on notetags other than
         * discreteOrderSpriteTargetOpacity if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSTOX
         */
        discreteOrderSpriteTargetOpacity: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} The discrete order battler sprite opacity
             */
            DOSTO_0: function(datum, datumType, discreteOrderSprite) {
                return 0; // Always make the sprite completely invisible
            }, // DOSTO_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} The discrete order battler sprite opacity
             */
            DOSTO_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not
                return this.isActor() ? 2 : 1;
                //
            }, // DOSTO_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Opacity} The discrete order battler sprite opacity
             */
            DOSTO_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSTO_VAR

            // Adds new DOSTOX here


        }, // discreteOrderSpriteTargetOpacity

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Folder Functions
         *    - Setups DOSIFX used by discreteOrderSpriteIconFolder notetags
         *--------------------------------------------------------------------*/
        /* DOSIFX names can only use alphanumeric characters
         * The 1st character of DOSIFX can't be a number
         * The below DOSIFX are examples added to help you set your DOSIFX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIFX can be used on notetags other than
         * discreteOrderSpriteIconFolder if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIFX
         */
        discreteOrderSpriteIconFolder: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet path
             */
            DOSIF_IMG_CHAR: function(datum, datumType, discreteOrderSprite) {
                return "img/characters/"; // Always uses character image folder
            }, // DOSIF_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet path
             */
            DOSIF_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns img/sv_actors/ and img/sv_enemies/ for actors and not
                return this.isActor() ? "img/sv_actors/" : "img/sv_enemies/";
                //
            }, // DOSIF_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet path
             */
            DOSIF_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the value in the game variable with id x
                return $gameVariables.value(x);
                //
            }, // DOSIF_VAR

            // Adds new DOSIFX here


        }, // discreteOrderSpriteIconFolder

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Filename Functions
         *    - Setups DOSIFNX used by discreteOrderSpriteIconFilename notes
         *--------------------------------------------------------------------*/
        /* DOSIFNX names can only use alphanumeric characters
         * The 1st character of DOSIFNX can't be a number
         * The below DOSIFNX are examples added to help you set your DOSIFNX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIFNX can be used on notetags other than
         * discreteOrderSpriteIconFilename if you really know what you're
         * truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIFNX
         */
        discreteOrderSpriteIconFilename: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet name
             */
            DOSIFN_ACTOR1: function(datum, datumType, discreteOrderSprite) {
                return "Actor1"; // Always uses the file named Actor1
            }, // DOSIFN_ACTOR1

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet name
             */
            DOSIFN_ACTOR2: function(datum, datumType, discreteOrderSprite) {
                return "Actor2"; // Always uses the file named Actor2
            }, // DOSIFN_ACTOR2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet name
             */
            DOSIFN_ACTOR3: function(datum, datumType, discreteOrderSprite) {
                return "Actor3"; // Always uses the file named Actor3
            }, // DOSIFN_ACTOR3

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {String} The discrete order battler sprite sheet name
             */
            DOSIFN_MONSTER: function(datum, datumType, discreteOrderSprite) {
                return "Monster"; // Always uses the file named Monster
            }, // DOSIFN_MONSTER

            // Adds new DOSIFNX here


        }, // discreteOrderSpriteIconFilename

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Hue Functions
         *    - Setups DOSHX used by the discreteOrderSpriteIconHue notetags
         *--------------------------------------------------------------------*/
        /* DOSHX names can only use alphanumeric characters
         * The 1st character of DOSHX can't be a number
         * The below DOSHX are examples added to help you set your DOSHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSHX can be used on notetags other than
         * discreteOrderSpriteIconHue if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSHX
         */
        discreteOrderSpriteIconHue: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
            DOSH_0: function(datum, datumType, discreteOrderSprite) {
                return 0; // Always don't change the hue
            }, // DOSH_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
            DOSH_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not
                return this.isActor() ? 2 : 1;
                //
            }, // DOSH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
            DOSH_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSH_VAR

            // Adds new DOSHX here


        }, // discreteOrderSpriteIconHue

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Smooth Functions
         *    - Setups DOSSX used by the discreteOrderSpriteIconSmooth notes
         *--------------------------------------------------------------------*/
        /* DOSSX names can only use alphanumeric characters
         * The 1st character of DOSSX can't be a number
         * The below DOSSX are examples added to help you set your DOSSX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSSX can be used on notetags other than
         * discreteOrderSpriteIconSmooth if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSSX
         */
        discreteOrderSpriteIconSmooth: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            DOSS_TRUE: function(datum, datumType, discreteOrderSprite) {
                return true; // Always enable the smooth mode for battler sprite
            }, // DOSS_TRUE

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            DOSS_BATTLER_NAME: function(datum, datumType, discreteOrderSprite) {
                // Enables the smooth mode for sprite of battler named Test
                return this.name() === "Test";
                //
            }, // DOSS_BATTLER_NAME

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.05a @version v0.05a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Boolean} The check result
             */
            DOSS_SWITCH: function(datum, datumType, discreteOrderSprite) {
                // Enables the smooth mode when switch with id x is on
                return $gameSwitches.value(x);
                //
            }, // DOSS_SWITCH

            // Adds new DOSSX here


        }, // discreteOrderSpriteIconSmooth

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon X Coodinate Functions
         *    - Setups DOSIXCX used by discreteOrderSpriteIconXCoor notetags
         *--------------------------------------------------------------------*/
        /* DOSIXCX names can only use alphanumeric characters
         * The 1st character of DOSIXCX can't be a number
         * The below DOSIXCX are examples added to help you set your DOSIXCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIXCX can be used on notetags other than
         * discreteOrderSpriteIconXCoor if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIXCX
         */
        discreteOrderSpriteIconXCoor: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
            DOSH_1: function(datum, datumType, discreteOrderSprite) {
                return 1; // Always uses the 2nd column
            }, // DOSH_1

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
             DOSH_4: function(datum, datumType, discreteOrderSprite) {
                 return 4; // Always uses the 5th column
             }, // DOSH_4

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
             DOSH_7: function(datum, datumType, discreteOrderSprite) {
                 return 7; // Always uses the 8th column
             }, // DOSH_7

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {Hue} The discrete order battler sprite sheet hue
             */
             DOSH_10: function(datum, datumType, discreteOrderSprite) {
                 return 10; // Always uses the 11th column
             }, // DOSH_10

            // Adds new DOSIXCX here


        }, // discreteOrderSpriteIconXCoor

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Y Coodinate Functions
         *    - Setups DOSIYCX used by discreteOrderSpriteIconYCoor notetags
         *--------------------------------------------------------------------*/
        /* DOSIYCX names can only use alphanumeric characters
         * The 1st character of DOSIYCX can't be a number
         * The below DOSIYCX are examples added to help you set your DOSIYCX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIYCX can be used on notetags other than
         * discreteOrderSpriteIconYCoor if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIYCX
         */
        discreteOrderSpriteIconYCoor: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order sprite sheet y coordinate
             */
            DOSIYC_0: function(datum, datumType, discreteOrderSprite) {
                return 0; // Always uses the 1st row
            }, // DOSIYC_0

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order sprite sheet y coordinate
             */
             DOSIYC_4: function(datum, datumType, discreteOrderSprite) {
                 return 4; // Always uses the 5th row
             }, // DOSIYC_4

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order sprite sheet y coordinate
             */
            DOSIYC_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSIYC_VAR

            // Adds new DOSIYCX here


        }, // discreteOrderSpriteIconYCoor

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Source Width Functions
         *    - Setups DOSISWX used by discreteOrderSpriteIconSourceW notes
         *--------------------------------------------------------------------*/
        /* DOSISWX names can only use alphanumeric characters
         * The 1st character of DOSISWX can't be a number
         * The below DOSISWX are examples added to help you set your DOSISWX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSISWX can be used on notetags other than
         * discreteOrderSpriteIconSourceW if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSISWX
         */
        discreteOrderSpriteIconSourceW: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source width
             */
            DOSISW_2: function(datum, datumType, discreteOrderSprite) {
                return 2; // Always returns 2
            }, // DOSISW_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source width
             */
            DOSISW_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // DOSISW_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source width
             */
            DOSISW_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSISW_VAR

            // Adds new DOSISWX here


        }, // discreteOrderSpriteIconSourceW

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Source Height Functions
         *    - Setups DOSISHX used by discreteOrderSpriteIconSourceH notes
         *--------------------------------------------------------------------*/
        /* DOSISHX names can only use alphanumeric characters
         * The 1st character of DOSISHX can't be a number
         * The below DOSISHX are examples added to help you set your DOSISHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSISHX can be used on notetags other than
         * discreteOrderSpriteIconSourceH if you really know what you're truly
         * doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSISHX
         */
        discreteOrderSpriteIconSourceH: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source height
             */
            DOSISH_2: function(datum, datumType, discreteOrderSprite) {
                return 2; // Always returns 2
            }, // DOSISH_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source height
             */
            DOSISH_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // DOSISH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} Discrete order battler sprite source height
             */
            DOSISH_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSISH_VAR

            // Adds new DOSISHX here


        }, // discreteOrderSpriteIconSourceH

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Width Functions
         *    - Setups DOSIWX used by discreteOrderSpriteIconW notes
         *--------------------------------------------------------------------*/
        /* DOSIWX names can only use alphanumeric characters
         * The 1st character of DOSIWX can't be a number
         * The below DOSIWX are examples added to help you set your DOSIWX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIWX can be used on notetags other than
         * discreteOrderSpriteIconW if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIWX
         */
        discreteOrderSpriteIconW: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite width
             */
            DOSIW_2: function(datum, datumType, discreteOrderSprite) {
                return 2; // Always returns 2
            }, // DOSIW_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite width
             */
            DOSIW_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 2 and 1 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // DOSIW_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite width
             */
            DOSIW_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSIW_VAR

            // Adds new DOSIWX here


        }, // discreteOrderSpriteIconW

        /*--------------------------------------------------------------------
         *    (v0.14a+)Discrete Order Sprite Icon Height Functions
         *    - Setups DOSIHX used by discreteOrderSpriteIconH notes
         *--------------------------------------------------------------------*/
        /* DOSIHX names can only use alphanumeric characters
         * The 1st character of DOSIHX can't be a number
         * The below DOSIHX are examples added to help you set your DOSIHX
         * You can freely use, rewrite and/or delete these examples
         * (Advanced)DOSIHX can be used on notetags other than
         * discreteOrderSpriteIconH if you really know what you're truly doing
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
         * (Advanced)You're encouraged and recommended to write modular DOSIHX
         */
        discreteOrderSpriteIconH: {

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite height
             */
            DOSIH_2: function(datum, datumType, discreteOrderSprite) {
                return 2; // Always returns 2
            }, // DOSIH_2

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite height
             */
            DOSIH_ACTOR: function(datum, datumType, discreteOrderSprite) {
                // Returns 1 and 0.5 if the battler's actor and not respectively
                return this.isActor() ? 2 : 1;
                //
            }, // DOSIH_ACTOR

            /**
             * The this pointer refers to the battler involved
             * Nullipotent
             * @since v0.14a @version v0.14a
             * @param {Datum} datum - The datum having this notetag
             * @enum @param {DatumType} datumType - Refers to reference tag
             *                                      NOTE_DATA_TYPES
             * @param {Sprite_SATBDiscreteOrderBattlerIcon} 
             * discreteOrderSprite - The battler icon sprite
             * @returns {+ve Num} The discrete order battler sprite height
             */
            DOSIH_VAR: function(datum, datumType, discreteOrderSprite) {
                // Returns the Number value in the game variable with id x
                return +$gameVariables.value(x);
                //
            }, // DOSIH_VAR

            // Adds new DOSIHX here


        }, // discreteOrderSpriteIconH

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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
         * If you're to use them that way, you must at least ensure following:
         * 1. The function contexts are the same across different notetags
         * 2. The function argument lists(with the paraemter names being exactly
         *    the same) are the same across different notetags
         * 3. The function return types are the same across different notetags
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
