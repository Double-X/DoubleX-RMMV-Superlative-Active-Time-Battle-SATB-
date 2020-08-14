/*============================================================================
 *    ## Plugin Info                                                          
 *----------------------------------------------------------------------------
 *    # Plugin Name                                                           
 *      DoubleX RMMV Targeting Hotkeys                                        
 *----------------------------------------------------------------------------
 *    # Terms Of Use                                                          
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.   
 *      3. You shalln't claim that this plugin's written by anyone other than 
 *         DoubleX or my aliases. I always reserve the right to deny you from 
 *         using any of my plugins anymore if you've violated this.           
 *      4. CC BY 4.0, except those conflicting with any of the above, applies 
 *         to this plugin, unless you've my permissions not needing follow so.
 *      5. I always reserve the right to deny you from using this plugin      
 *         anymore if you've violated any of the above.                       
 *----------------------------------------------------------------------------
 *    # Prerequisites                                                         
 *      Abilities:                                                            
 *      1. Nothing special for most ordinary use cases                        
 *      2. Little Javascript coding proficiency to fully utilize this plugin  
 *----------------------------------------------------------------------------
 *    # Links                                                                 
 *      This plugin:                                                          
 *      1. http://pastebin.com/9X4H8K8A                                       
 *----------------------------------------------------------------------------
 *    # Author                                                                
 *      DoubleX                                                               
 *----------------------------------------------------------------------------
 *    # Changelog                                                             
 *      v1.00a(GMT 0900 14-8-2016):                                           
 *      1. 1st version of this plugin finished                                
 *============================================================================*/
/*:
 * @plugindesc Lets you set some hotkeys selecting actor/enemy target by index
 * @author DoubleX
 *
 * @help
 * You're supposed to edit this plugin js file directly
 *============================================================================
 *    ## Plugin Call Info                                                     
 *----------------------------------------------------------------------------
 *    # Configuration manipulations                                           
 *      1. $gameSystem.targetingHotkeys[index]                                
 *         - Returns the keyboard mapping of hotkey selecting the actor/enemy 
 *           with the specified member index as the target                    
 *      2. $gameSystem.targetingHotkeys[index] = keyboardMapping              
 *         - Sets the keyboard mapping of hotkey selecting the actor/enemy    
 *           with the specified member index as the target as keyboardMapping 
 *         - All $gameSystem.targetingHotkeys[index] changes will be saved    
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Targeting Hotkeys'] = 'v1.00a';

DoubleX_RMMV.Targeting_Hotkeys = {

    /* Sets hotkeys selecting the actor/enemy target with the specified index
     * None of these hotkeys are supposed to be changed during the same battle
     * Each hotkey will be referenced by $gameSystem.targetingHotkeys[index], 
     * where index is the index of the hotkey
     * The ith hotkey will try to select the actor/enemy target with index i - 1
     * Each of these hotkey must be a String
     * Using a keyboard mapping plugin, like Quasi Input, can be useful here
     */
    hotkeys: [
        "#1", // Referenced by $gameSystem.targetingHotkeys[0]
        "#2", // Referenced by $gameSystem.targetingHotkeys[1]
        "#3", // Referenced by $gameSystem.targetingHotkeys[2]
        "#4", // Referenced by $gameSystem.targetingHotkeys[3]
        "#5", // Referenced by $gameSystem.targetingHotkeys[4]
        "#6", // Referenced by $gameSystem.targetingHotkeys[5]
        "#7", // Referenced by $gameSystem.targetingHotkeys[6]
        "#8", // Referenced by $gameSystem.targetingHotkeys[7]
        "#9", // Referenced by $gameSystem.targetingHotkeys[8]
        "#0" // Referenced by $gameSystem.targetingHotkeys[9]
    ]

}; // DoubleX_RMMV.Targeting_Hotkeys

/*============================================================================
 *    ## Plugin Implementations                                               
 *       You need not edit this part as it's about how this plugin works      
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:                                                  
 *      1. Prerequisites                                                      
 *         - Little plugin development proficiency to fully comprehend this   
 *           plugin                                                           
 *----------------------------------------------------------------------------*/

(function(TH) {

    'use strict';

    TH.Game_System = {};
    var GS = TH.Game_System;

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() { // v1.00a - v1.00a
        GS.initialize.apply(this, arguments);
        GS.initializeTargetingHotkeys.call(this); // Added
    }; // Game_System.prototype.initialize

    /* Initializes the hotkey mappings that will be stored in save files
     * Functional cohesion/Message coupling/Idempotent
     */
    GS.initializeTargetingHotkeys = function() { // v1.00a - v1.00a
        this.targetingHotkeys = TH.hotkeys;
    }; // GS.initializeTargetingHotkeys

    /* Selects the ith actor/enemy target when the (i - 1)th hotkey's pressed
     * Functional cohesion/Message coupling/Idempotent
     */
    var windows = [Window_BattleActor.prototype, Window_BattleEnemy.prototype];
    windows.forEach(function(window) {
        window.processHandling = function() { // v1.00a - v1.00a
            Window_Selectable.prototype.processHandling.call(this);
            if (!this.isOpenAndActive()) { return; }
            var hotkeys = $gameSystem.targetingHotkeys;
            for (var i = 0, length = hotkeys.length; i < length; i++) {
                if (Input.isTriggered(hotkeys[i])) { this.select([i]); };
            }
        }; // Window_ActorCommand.prototype.processHandling
    });

})(DoubleX_RMMV.Targeting_Hotkeys);

/*============================================================================*/