/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Superlative ATB
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. This plugin aims to be the most flexible, performant and powerful
 *       ATB system with the greatest amount of freedom for users to fulfill
 *       as many functional needs as they want in as many ways as they want
 *    2. You may want to treat this as a nano ATB framework as part of the
 *       system's written by you via parameters/configurations/notetags/calls
 *    3. Almost every parameters and notetags can be written as direct
 *       JavaScript, thus giving you the maximum amount of control over them
 *    4. (VERY ADVANCED)You can even change most of those JavaScript codes
 *       written by you on the fly(and let your players do so with a system
 *       settings plugin), but you should only do so if you really know what
 *       you're truly doing
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep the documentation plugin intact.
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
 *      1. Nothing special for most ordinary cases
 *         (No capability on Javascript ES5 experience but can still make
 *         reasonable guesses on readable novice codes up to 100 LoC scale)
 *      2. Little RMMV plugin development proficiency for more advanced uses
 *         (Elementary Javascript ES5 exposures being able to write beginner
 *         codes up to 300LoC scale)
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *         (Basic knowledge on what RMMV plugin development does in general
 *         with several easy, simple and small plugins written without
 *         nontrivial bugs up to 1000 LoC scale but still being inexperienced)
 *      4. Decent RMMV plugin development proficiency to fully utilize this
 *         plugin with creative and unintended uses
 *         (Solid understanding on how RMMV plugin development works on its
 *         own in details with dozens of tolerable quality plugins written
 *         without nontrivial bugs with some up to 3000 LoC scale and being
 *         experienced)
 *      Knowledge:
 *      1. Basic knowledge on what the default RMMV editor does in general
 *      2. Basic knowledge on what the default RMMV battle system does in
 *         general on the user level
 *      3. Basic knowledge on what an ATB system does in general
 *----------------------------------------------------------------------------
 *    # Inherited Behaviors From The Default RMMV Battle System
 *      Action Speed:
 *      1. The battlers that are ready to execute actions will be pushed into
 *         the First-In-First-Out action execution queue, which is sorted by
 *         the speed of the action to be executed by the battlers descendingly
 *      2. To ensure battlers with extremely slow actions can still execute
 *         them, the action speed of all battlers in the action execution
 *         queue will be added by the 2000(the maximum action speed in the
 *         default RMMV editor) divided by the number of battlers in that
 *         queue, meaning that the longer the battler's in the queue, the more
 *         such action speed bonuses will be received by that battler, so that
 *         battler will be placed more and more up front in the queue
 *      3. All these can be changed in the Speed Module
 *      Action Times+(Not fully applicable with the Action Module enabled):
 *      1. Every battler always has at most 1 real action slot, meaning that
 *         each battler can only input 1 action at a time
 *      2. A battler also has at most the number of virtual action slots equal
 *         to the number of action slots with Action Times+ in the default
 *         RMMV battle system
 *      3. When a battler's no virtual action slot and becomes able to input
 *         actions, Action Times+ will be used to determine the new number of
 *         virtual action slots
 *      4. When a battler has finished executing an action, the number of
 *         virtual action slot will be reduced by 1. If that battler still has
 *         virtual action slots, then the ATB value of that battler won't be
 *         reduced(technically, it's reduced by an extremely small amount) and
 *         can immediately input actions again(unless the ATB value's changed
 *         by some other reasons like battler script calls); If that battler
 *         has no more virtual action slots, then the ATB value of that
 *         battler will be cleared to become 0 or remain unchanged if it was
 *         negative
 *      Party Escape(Not fully applicable with the Action and/or Escape Module
 *      enabled):
 *      1. Each actor will have his/her/its virtual action slot reduced by 1
 *         upon a failed party escape attempt, as if it were just another
 *         normnal action costing 1 virtual action slot
 *      2. However, failed escape attempts won't increase the battle turn
 *         clock counter even if its unit is the number of actions executed
 *      Agility(Not fully applicable with the Rate Module enabled):
 *      1. The fill rate of the battler ATB value will be multiplied by the
 *         agility of that battler divided by the average of those of all
 *         battlers in the battle
 *      States With Removal Timing As Action End(Not fully applicable with the
 *      Countdown Module enabled):
 *      1. The turn counter of such states will be reduced by 1 when the
 *         battler owning these states have just finished executing an action
 *      States With Removal Timing As Turn End(Not fully applicable with the
 *      Countdown Module enabled):
 *      1. The turn counter of such states will be reduced by 1 when the
 *         battle turn counter increases by 1(i.e., the current turn ends)
 *      Buff Turns Are Updated Upon Turn End Rather Than Action End
 *      Battler ATB Value With Preemptive Battle Start(Not fully applicable
 *      with the Start Module enabled):
 *      1. The actor ATB value will be immediately fully filled while those of
 *         enemies will be immediately empty
 *      Battler ATB Value With Surprise Battle Start(Not fully applicable with
 *      the Start Module enabled):
 *      1. The enemy ATB value will be immediately fully filled while those of
 *         actors will be immediately empty
 *      Battler ATB Value With Normal Battle Start(Not fully applicable with
 *      the Start Module enabled):
 *      1. The ATB value of all battlers will be immediately empty
 *      Battlers Becoming Hidden/Unmovable
 *      1. Their ATB values will be reset to 0 if they're not negative before
 *      2. Their number of virtual action slots will be reset to 0
 *----------------------------------------------------------------------------
 *    # Current Technical Limitations
 *      1. The ATB frame update can never be run when either of the following
 *         conditions are met:
 *         - The battle's starting, aborting or ending
 *         - The game message's showing in the battle
 *         - The battle event's running
 *         Violating any of these conditions might outright crash the game
 *      2. Party escape's always disabled when either of the following
 *         conditions are met:
 *         - The battler sprites/action animations are animating/playing
 *         - The log window's displaying messages
 *         - Battlers are executing actions
 *         - The game message's showing in the battle
 *         Violating any of these conditions might outright crash the game
 *         (Actually it should also be disabled when battle event's running
 *         but trying to enforce this's itself a current technical limitation)
 *      3. Only 1 actor can input actions at a time
 *         - Violating this, if possible to be compatible with this plugin,
 *           would be implemented with a separate plugin
 *      4. Only 1 battler can execute actions at a time
 *         - Violating this, if possible to be compatible with this plugin,
 *           would be implemented with a separate plugin
 *      5. A battler can only execute 1 action at a time
 *         - Violating this, if possible to be compatible with this plugin,
 *           would be implemented with a separate plugin
 *      6. Having too many effective notetags full of nondeterministic results
 *         will lead to severe performance issues especially on android device
 *      7. Having too many effective notetags calling extremely long functions
 *         will lead to the save files being too big
 *      8. In extremely rare cases, the actor action inputting commands might
 *         be temporarily unresponsive for a very short time(It's to prevent
 *         crashing the game instead in really weird cases I've truly faced)
 *      9. Projects using this plugin with full active ATB mode and Bar Module
 *         enabled can be hard to maintain 60FPS on mobile phones that aren't
 *         especially powerful
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. DoubleX RMMV Superlative ATB aims to give extreme control and
 *         freedom to users by making it as flexible as I can with as little
 *         damage to user-friendliness as I can
 *      2. The configuration plugin is generally for more advanced uses, as
 *         most ordinary cases should be covered by parameters and notetags
 *      3. This is an advanced complex plugin, meaning that you're expected to
 *         use the default parameters and configuration values first to be
 *         familiar with playing the demo of this plugin before changing any
 *         of those values and/or using any notetags
 *      4. You might have to use some script calls in RMMV and some of those
 *         provided by this plugin to realize some of the more advanced uses
 *      5. If you want to keep things easy, simple and small, you may want to
 *         use DoubleX RMMV Popularized ATB instead
 *      6. If you want to run battle tests, you must open the configuration
 *         plugin js file directly to setup everything that has to be setup
 *         upon battle test start by changing the contents of the function
 *         SATB.onSetupBattleTest
 *         (It's especially useful when some parameters/notetags use some
 *         game switches/variables which must all have their corresponding
 *         values manually assigned first)
 *      7. (Advanced)You might have to have a basic knowledge on what the
 *         implementation plugin does in general to fully utilize this plugin
 *         in intended ways and solid understanding on how this implementation
 *         plugin works in details to fully utilize this plugin with creative
 *         and unintended uses
 *      8. (Advanced)You might have to read some new variables/functions to
 *         have a basic knowledge on what they do in general in order to
 *         realize some intended cases
 *      9. (Advanced)You might have to dig into the mechanisms of some new
 *         variables/functions to have a solid underatanding on how they work
 *         alone in details in order to realize some unintended usages
 *----------------------------------------------------------------------------
 *    # FAQ
 *    Q1. What's the main differences between DoubleX RMMV Popularized ATB and
 *        this plugin?
 *    A1. There are at least 2 main differences:
 *        - The former uses the core addon approach, meaning that the core
 *          plugin, which is mandatory, will only have all the essential
 *          features, and each addon plugin, which is optional, will only have
 *          each set of extra features. This is useful when many users only
 *          use a small amount of the feature set provided by
 *          DoubleX RMMV Popularized ATB.
 *          On the other hand, the latter uses the single plugin approach,
 *          meaning that all the feature implementations will be included in a
 *          single plugin, even though unit tests and compatibility fixes will
 *          still be separate plugins. This is useful when many users use a
 *          large amount of the feature set provided by this plugin.
 *        - The former aims to be easy, simple and small while still being
 *          reasonably powerful for both users and ATB system plugin
 *          learners, while the latter aims to be the most flexible and
 *          powerful ATB system plugin ever by giving users the deepest and
 *          widest amount of control and freedom ever, thus making it much,
 *          much more demanding for both users and ATB system plugin learners.
 *    Q2. May you please make this plugin less demanding? The sheer number of
 *        parameters/configurations/notetags, most demanding Javascript
 *        function contents as values, are extremely overwhelming for less
 *        capable users. It's just far from being user-friendly enough.
 *    A2. While it's clearly my fault that makes this plugin so hard to use,
 *        I've already tried my best while still preserving the flexibility
 *        and power of thie plugin by maintaining the depth and width of
 *        control and freedom available for users.
 *        As for the sheer number of parameters/configurations/notetags, this
 *        plugin aims to include everything in a single plugin, which is
 *        preferred for some users.
 *        In case this plugin's really too hostile, you may want to use
 *        DoubleX RMMV Popularized ATB, which is much easier, simpler and
 *        smaller while still being reasonably powerful, instead. Also, it
 *        breaks each set of features into 1 plugin, meaning that you won't
 *        have to face a sheer number of parameters/configurations/notetags
 *        there.
 *        Alternatively, you can ask for help if you still want to use this
 *        plugin, if the demo doesn't provide enough help already.
 *    Q3. Why the Core Module itself doesn't show the ATB value of any
 *        battler and why doesn't it let players change among inputable
 *        actors? All these are essential UX features. Without them, using
 *        just the Core Module can only result in a fully broken ATB system.
 *        (Well, not being able to change the ATB wait conditions sucks too)
 *    A3. It's because these features aren't technically essential to run an
 *        ATB system plugin, nor they're behaviors inherited from the default
 *        RMMV battle system(It doesn't let you change the input sequence nor
 *        show the actual action execution sequence). All these features that
 *        are missing in the Core Module are covered in the Bar Module and
 *        Hotkey Module(The similar logic applies to the Wait Module). That's
 *        why only these 3 optional modules are enabled by default(All the
 *        other optional modules are disabled so you don't have to deal with
 *        so many modules all at once before being familiar with this plugin).
 *    Q4. Why the Bar Module doesn't use notetags? Isn't it going against the
 *        very goal of this plugin?
 *    A4. It's because it's very unlikely that anyone will need to use such
 *        notetags. If I added them anyway, the sheer number of notetags that
 *        almost no one's going to use would be too much of a nuance and
 *        clutter for users to access the functionalities that they really
 *        want. In case such notetags are indeed needed, I'll implement the
 *        needed ones, and perhaps one day all those notetags would be done.
 *    Q5. (Advanced)Why the caching mechanism's so complicated and convoluted
 *        in this plugin? It's extremely costly and troublesome to work around
 *        when I've some unintended and creative uses of this plugin.
 *    A5. It's because this plugin explicitly allows many effective notetags
 *        to be used in the same frame, which can cause significant lag and
 *        fps drop if the end result's not cached, epsecially when the
 *        functions called by those notetags are computationally expensive.
 *        This plugin's to balance among multiple key aspects, so I'm sorry
 *        that your use cases have to be at least slightly sacrificed for
 *        performance stability and ease of use for intended and ordinary use
 *        cases, which are likely much more common and important. That's the
 *        main reason why decent RMMV plugin development proficiency is needed
 *        to fully utilize this plugin with creative and unintended uses.
 *----------------------------------------------------------------------------
 *    # Links
 *      Demo:
 *      1. https://github.com/Double-X/DoubleX-RMMV-Superlative-Active-Time-Battle-SATB-
 *      Videos:
 *      1. DoubleX RMMV Superlative ATB(Core Module Only)
 *         - https://www.youtube.com/watch?v=ZmW8ZGVwfy0
 *      2. DoubleX RMMV Superlative ATB Compatibility(With MOG_BattleHud Only)
 *         - https://www.youtube.com/watch?v=0_v0KzU733E
 *      3. DoubleX RMMV Superlative ATB Compatibility(With Yanfly Engine Plugins - Battle Engine Core Only)
 *         - https://www.youtube.com/watch?v=c6ZSvDVj0WM
 *      4. (v0.01a+) DoubleX RMMV Superlative ATB(Core And Hotkey Module Only)
 *         - https://www.youtube.com/watch?v=4YyBFcj-nP0
 *      5. (v0.02a+) DoubleX RMMV Superlative ATB(Core And Wait Module Only)
 *         - https://www.youtube.com/watch?v=8EfYexx8gVU
 *      6. (v0.03a+) DoubleX RMMV Superlative ATB(Core And Bar Module Only)
 *         - https://www.youtube.com/watch?v=20UXh_qctNE
 *      7. (v0.04a+)DoubleX RMMV Superlative ATB(Core And Charge Module Only)
 *         - https://www.youtube.com/watch?v=kkvGK2AoOY8
 *      8. (v0.05a+)DoubleX RMMV Superlative ATB(Core And Cooldown Module Only)
 *         - https://www.youtube.com/watch?v=H3B4TU8cs2U
 *      9. (v0.05b+)DoubleX RMMV Superlative ATB Compatibility(With SEK_ChangeActor Only)
 *         - https://www.youtube.com/watch?v=dgx51xE5Svw
 *      10. (v0.06a+)DoubleX RMMV Superlative ATB(Core And Event Module Only)
 *         - https://www.youtube.com/watch?v=RVeEoSa-IdY
 *      11. (v0.07a+)DoubleX RMMV Superlative ATB(Core And Reset Module Only)
 *          - https://www.youtube.com/watch?v=3KRIllS_rWc
 *      12. (v0.08a+)DoubleX RMMV Superlative ATB(Core And Speed Module Only)
 *          - https://www.youtube.com/watch?v=r3g6H4r8ws0
 *      13. (v0.09a+)DoubleX RMMV Superlative ATB(Core And Start Module Only)
 *          - https://www.youtube.com/watch?v=zOpBlz6G0YA
 *      14. (v0.10a)DoubleX RMMV Superlative ATB(Core And Rate Module Only)
 *          - https://www.youtube.com/watch?v=kvrxnhagO4I
 *      15. (v0.11a+)DoubleX RMMV Superlative ATB(Core And Turn Module Only)
 *          - https://www.youtube.com/watch?v=Nv1bEQAl3ik
 *      16. (v0.12a+)DoubleX RMMV Superlative ATB(Core And Countdown Module Only)
 *          - https://www.youtube.com/watch?v=yw5UgvzTAIw
 *      17. (v0.13a+)DoubleX RMMV Superlative ATB(Core And CTB Module Only)
 *          - https://www.youtube.com/watch?v=HaUuQnOlgfs
 *      18. (v0.14a+)DoubleX RMMV Superlative ATB(Core And Order Module Only)
 *          - https://www.youtube.com/watch?v=5D8HR-sNH_w
 *      19. (v0.15a+)DoubleX RMMV Superlative ATB(Core And Delay Module Only)
 *          - https://www.youtube.com/watch?v=WaPU38sIV2I
 *      19. (v0.16a+)DoubleX RMMV Superlative ATB(Core And Action Module Only)
 *          -
 *      Posts:
 *      1. https://forums.rpgmakerweb.com/index.php?threads/doublex-rmmv-superlative-atb.126495/
 *      2. https://www.rpgmakercentral.com/topic/42566-doublex-rmmv-superlative-atb/
 *      3. https://rpgmaker.net/scripts/791/
 *      4. https://www.save-point.org/thread-8157.html
 *      5. https://gdu.one/forums/topic/13622-doublex-rmmv-superlative-atb/
 *      6. http://www.hbgames.org/forums/viewtopic.php?f=332&t=80302
 *      7. https://www.xyphien.com/forums/resources/doublex-rmmv-superlative-atb.1695/
 *      8. https://forum.chaos-project.com/index.php/topic,16071.new.html
 *      9. https://doublexrpgmaker.wordpress.com/2020/08/19/doublex-rmmv-superlative-atb/
 *      10. https://www.patreon.com/doublex?filters[tag]=SATB
 *      11. https://www.makerdevs.com/plugin/doublex-rmmv-superlative-atb
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open the configuration plugin js file to access those
 *         configurations
 *      2. If you want to keep the current parameter values in the plugin
 *         manager upon using a newer parameter plugin version, you can rename
 *         the newer one of the parameter plugin to be that of the older one
 *      3. If you wish to use DoubleX RMMV Superlative ATB Unit Test, place it
 *         right below DoubleX RMMV Superlative ATB Implementation
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
 *      Parameters:
 *      - v0.16a(GMT 1500 6-Apr-2020):
 *        1. Finished the Action module
 *        2. latestSATBItem_ has changed to latestSATBItems, which is an array
 *           of the old latestSATBItem_
 *        3. The notetag priority latestSkillItem has been renamed as
 *           latestSkillItems
 *      - v0.15b(GMT 1400 3-Dec-2020):
 *        1. You no longer have to edit the value of
 *           DoubleX_RMMZ.Superlative_ATB_Parameters_File when changing the
 *           parameter plugin file name
 *      - v0.15a(GMT 0700 18-Aug-2020):
 *        1. Finished the Delay Module
 *        2. Added didDelayCounterEnd
 *      - v0.14a(GMT 1400 17-Aug-2020):
 *        1. Finished the Order Module
 *        2. Lets you set the font face, text color and align, opacity and
 *           windowskin for all news windows in this plugin
 *        3. Removed all useless text padding parameters for all new windows
 *           in this plugin
 *      - v0.13a(GMT 1400 26-Jul-2020):
 *        1. Finished the CTB module
 *        2. Added didFillCoreATB, didFillChargeATB and didFillCooldownATB
 *      - v0.12a(GMT 1400 25-Jul-2020):
 *        1. Finished the countdown module
 *        2. Added didDecreaseCountdownStateTurn and
 *           didIncreaseCountdownStateTurn in the event module
 *      - v0.11a(GMT 1300 23-Jul-2020):
 *        1. Finished the turn module
 *      - v0.10a(GMT 0900 23-Jul-2020):
 *        1. Finished the rate module
 *      - v0.09a(GMT 1400 22-Jul-2020):
 *        1. Finished the start module
 *      - v0.08a(GMT 0900 21-Jul-2020):
 *        1. Finished the speed module
 *      - v0.07a(GMT 1400 20-Jul-2020):
 *        1. Finished the reset module
 *      - v0.06a(GMT 0700 19-Jul-2020):
 *        1. Finished the event module
 *        2. Added more parameters for attaching actor ATB bars to the status
 *           window in the bar module
 *      - v0.05a(GMT 1000 27-Jun-2020):
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020):
 *        1. Finished the charge module
 *        2. Added _isBarVisibleNoteChainingRule and
 *           _isBarVisibleNotePriorities parameters in the bar module
 *      - v0.03a(GMT 1400 15-Jun-2020):
 *        1. Finished the bar module
 *      - v0.02a(GMT 1200 14-Jun-2020):
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Configurations:
 *      - v0.16a(GMT 1500 6-Apr-2020):
 *        1. Finished the Action module
 *        2. latestSATBItem_ has changed to latestSATBItems, which is an array
 *           of the old latestSATBItem_
 *      - v0.15a(GMT 0700 18-Aug-2020):
 *        1. Finished the Delay Module
 *        2. Added didDelayCounterEnd
 *      - v0.14a(GMT 1400 17-Aug-2020):
 *        1. Finished the Order Module
 *        2. Lets you set the font face, text color and align, opacity and
 *           windowskin for all news windows in this plugin
 *        3. Removed all useless text padding parameters for all new windows
 *           in this plugin
 *      - v0.13a(GMT 1400 26-Jul-2020):
 *        1. Finished the CTB module
 *        2. Added didFillCoreATB, didFillChargeATB and didFillCooldownATB
 *      - v0.12a(GMT 1400 25-Jul-2020):
 *        1. Finished the countdown module
 *        2. Added didDecreaseCountdownStateTurn and
 *           didIncreaseCountdownStateTurn in the event module
 *      - v0.11a(GMT 1300 23-Jul-2020):
 *        1. Finished the turn module
 *      - v0.10a(GMT 0900 23-Jul-2020):
 *        1. Finished the rate module
 *      - v0.09a(GMT 1400 22-Jul-2020):
 *        1. Finished the start module
 *      - v0.08a(GMT 0900 21-Jul-2020):
 *        1. Finished the speed module
 *      - v0.07a(GMT 1400 20-Jul-2020):
 *        1. Finished the reset module
 *      - v0.06a(GMT 0700 19-Jul-2020):
 *        1. Finished the event module
 *        2. Added more parameters for attaching actor ATB bars to the status
 *           window in the bar module
 *      - v0.05b(GMT 0200 13-Jul-2020):
 *        1. Corrected the documentations of thie configuration plugin
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020):
 *        1. Finished the charge module
 *      - v0.03a(GMT 1400 15-Jun-2020):
 *        1. Finished the bar module
 *        2. Corrected the documentations of the Wait Module parameters
 *      - v0.02a(GMT 1200 14-Jun-2020):
 *        1. Finished the wait module
 *        2. Corrected the documentations of the Hotkey Module parameters
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *        2. Corrected the documentations of the Core Module parameters
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Implementations:
 *      - v0.16a(GMT 1500 6-Apr-2020):
 *        1. Finished the Action module
 *        2. latestSATBItem_ has changed to latestSATBItems, which is an array
 *           of the old latestSATBItem_
 *        3. The notetag priority latestSkillItem has been renamed as
 *           latestSkillItems
 *        4. Fixed the bug of not updating the x positions of the battler
 *           sprites in the discrete order window when there are new alive
 *           battlers
 *        5. Fixed the possible bug of not updating possible skill/item
 *           notetag value changes on time
 *      - v0.15b(GMT 0300 7-Dec-2020):
 *        1. Fixed the wrong this of the following Array prototype methods:
 *           i. fastFilter
 *           ii. fastMap
 *           iii. filterMap
 *           iv. mapFilter
 *           v. mapReduce
 *           vi. mapSome
 *        2. Fixed the x and y positions and opacity update bugs for discrete
 *           order battler sprites
 *      - v0.15a(GMT 0700 18-Aug-2020):
 *        1. Finished the Delay Module
 *        2. Added didDelayCounterEnd
 *      - v0.14a(GMT 1400 17-Aug-2020):
 *        1. Finished the Order Module
 *        2. Lets you set the font face, text color and align, opacity and
 *           windowskin for all news windows in this plugin
 *        3. Removed all useless text padding parameters for all new windows
 *           in this plugin
 *        4. Fixed mono chaining rules not working bug
 *      - v0.13a(GMT 1400 26-Jul-2020):
 *        1. Finished the CTB module
 *        2. Added didFillCoreATB, didFillChargeATB and didFillCooldownATB
 *      - v0.12a(GMT 1400 25-Jul-2020):
 *        1. Finished the countdown module
 *        2. Added didDecreaseCountdownStateTurn and
 *           didIncreaseCountdownStateTurn in the event module
 *        3. Battle turn clock second unit counter's stored in seconds instead
 *           of milliseconds
 *      - v0.11a(GMT 1300 23-Jul-2020):
 *        1. Finished the turn module
 *      - v0.10a(GMT 0900 23-Jul-2020):
 *        1. Finished the rate module
 *      - v0.09a(GMT 1400 22-Jul-2020):
 *        1. Finished the start module
 *      - v0.08a(GMT 0900 21-Jul-2020):
 *        1. Finished the speed module
 *      - v0.07a(GMT 1400 20-Jul-2020):
 *        1. Finished the reset module
 *        2. Fixed the corrupt notetag cache bug involving latestSkillItem
 *        3. Fixed the notetag cache invalidation not working at all bug
 *      - v0.06a(GMT 0700 19-Jul-2020):
 *        1. Finished the event module
 *        2. Added more parameters for attaching actor ATB bars to the status
 *           window in the bar module
 *        3. Plugin commands now support battler names with spaces
 *      - v0.05b(GMT 0200 13-Jul-2020):
 *        1. Added the ok SE upon successfully starting and ending a forced
 *           ATB charge
 *        2. Fixed the battle turn clock overflow crashing the game bug
 *        3. Fixed removing an actor not clearing the ATB states bug
 *        4. Fixed the cached battle turn clock parameters crashing the game
 *           bug
 *        5. Fixed not cancelling charges with skills banning cancel charge
 *           even when the charge ATB becomes negative bug
 *        6. Fixed a battler using a skill/item to add/remove restrictions on
 *           that battler not having item for cooldown bug
 *        7. Fixed a battler with more than 1 virtual action slots using a
 *           skill/item to cause that battler to become auto input still
 *           showing the actor command window in full ATB wait mode bug
 *        8. Fixed the notetag cache not detecting ATB phase change bug
 *        9. Fixed cooldown being instantly finished when the battler's
 *           refreshed bug
 *        10. Fixed game crashing upon changing actor equip bug
 *        11. Fixed a very severe memory leak in the notetag cache, ATB bars
 *            and force ATB frame update command and status windows
 *        12. Fixed some plugin commands not executing anything bug
 *        13. Fixed non actor plugin commands not executing anything bug
 *        14. Fixed plugin command expecting Number arguments having String
 *            counterparts instead bug
 *        15. Extracted the inputable actor business logic to Game_Party from
 *            BattleManager
 *        16. Increased the effectiveness and efficiency of the ATB bars
 *        17. Increased the effectiveness and efficiency of updating actor
 *            selections
 *      - v0.05a(GMT 1000 27-Jun-2020):
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020):
 *        1. Finished the charge module
 *        2. Added isBarVisible suffix: entry notetag in the bar module
 *        3. Documented what registration works need to be done when adding
 *           new parameters and notetags
 *        4. Fixed the force run/stop command window not being shown as
 *           disabled after pressing respectively hotkeys bug
 *        5. Increased the performance of ATB force status and command windows
 *           with _isParamFuncCached being on, especially for corresponding
 *           parameters being costly to run
 *      - v0.03a(GMT 1400 15-Jun-2020):
 *        1. Finished the bar module
 *        2. Added battler manipulation script call satbActTimes() and
 *           canMakeSATBCmds()
 *        3. Added sound feedbacks when using force ATB run/stop hoktey and
 *           command windows
 *        4. Added more visual feedbacks when using force ATB run/stop command
 *           windows
 *        5. Fixed the force ATB run/stop hotkey still working even when the
 *           Wait Module's disabled bug
 *        6. Fixed the ATB frame update wait conditions still working even
 *           when the Wait Module's disabled bug
 *      - v0.02a(GMT 1200 14-Jun-2020):
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *        2. Added battler maniuplation script call fillUpCoreSATB() and
 *           coreSATBProportion()
 *        3. Fixed the battle turn clock always using all units to end the
 *           turn bug
 *        4. Fixed the base fill ATB rate and battle turn clock time counter
 *           using the render loop fps rather than the game loop fps bug
 *           (Graphics._fpsMeter.fps vs SceneManager._deltaTime)
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Unit Tests:
 *      - v0.16a(GMT 1500 6-Apr-2020):
 *        1. latestSATBItem_ has changed to latestSATBItems, which is an array
 *           of the old latestSATBItem_
 *        2. The notetag priority latestSkillItem has been renamed as
 *           latestSkillItems
 *      - v0.15b(GMT 0400 7-Dec-2020):
 *        1. Fixed wrong unit test check conditions for the x and y positions
 *           and opacity for discrete order battler sprites
 *      - v0.15a(GMT 0700 18-Aug-2020):
 *        1. Finished the Delay Module
 *        2. Added didDelayCounterEnd
 *      - v0.14a(GMT 1400 17-Aug-2020):
 *        1. Finished the Order Module
 *        2. Lets you set the font face, text color and align, opacity and
 *           windowskin for all news windows in this plugin
 *        3. Removed all useless text padding parameters for all new windows
 *           in this plugin
 *      - v0.13a(GMT 1400 26-Jul-2020):
 *        1. Finished the CTB module
 *        2. Added didFillCoreATB, didFillChargeATB and didFillCooldownATB
 *      - v0.12a(GMT 1400 25-Jul-2020):
 *        1. Finished the countdown module
 *        2. Added didDecreaseCountdownStateTurn and
 *           didIncreaseCountdownStateTurn in the event module
 *        3. Battle turn clock second unit counter's stored in seconds instead
 *           of milliseconds
 *      - v0.11a(GMT 1300 23-Jul-2020):
 *        1. Finished the turn module
 *      - v0.10a(GMT 0900 23-Jul-2020):
 *        1. Finished the rate module
 *        2. Removed some unit tests becoming redundant in this latest version
 *      - v0.09a(GMT 1400 22-Jul-2020):
 *        1. Finished the start module
 *      - v0.08a(GMT 0900 21-Jul-2020):
 *        1. Finished the speed module
 *        2. Removed a unit test that becomes tautological in latest version
 *      - v0.07a(GMT 1400 20-Jul-2020):
 *        1. Finished the reset module
 *      - v0.06a(GMT 0700 19-Jul-2020):
 *        1. Finished the event module
 *        2. Added more unit tests in the bar module
 *      - v0.05b(GMT 0200 13-Jul-2020):
 *        1. Added a test suite that can be executed as a script call
 *        2. Added logs with useful information at important timings
 *        3. Fixing failed integer checks falsely reported as failed
 *           nonnegative integer checks
 *        4. In sync with the latest implementation plugin version
 *      - v0.05a(GMT 1000 27-Jun-2020):
 *        1. Finished the cooldown module
 *        2. More useful contents are included in the failed test messages
 *      - v0.04a(GMT 1500 19-Jun-2020):
 *        1. Finished the charge module
 *        2. In sync with the latest implementation plugin version
 *      - v0.03a(GMT 1400 15-Jun-2020):
 *        1. Finished the bar module
 *        2. Added more tests for the wait module
 *      - v0.02a(GMT 1200 14-Jun-2020):
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Compatibilities:
 *      - v0.05a(GMT 0700 11-Dec-2020):
 *        1. Finished the delay module
 *        2. Lets players cancels actor cooldown by clicking the actor sprite
 *        3. Lets players cancels actor charge by clicking the actor sprite
 *      - v0.04a(GMT 0200 13-Jul-2020):
 *        1. Addressed compatibility issues with SEK_ChangeActor
 *        2. Added more Charge and Cooldown Module action sequences in
 *           YEP_BattleEngineCore
 *        3. Fixed the Cooldown Module action sequences not implemented in
 *           YEP_BattleEngineCore bug
 *      - v0.03a(GMT 1000 27-Jun-2020):
 *        1. Finished the cooldown module
 *        2. Added action sequences from charge module in YEP_BattleEngineCore
 *      - v0.02a(GMT 1500 19-Jun-2020):
 *        1. Finished the wait module(No nontrivial change has taken place)
 *        2. Finished the bar module(No nontrivial change has taken place)
 *        3. Finished the charge module
 *        4. Added action sequences from charge module in YEP_BattleEngineCore
 *        5. Addressed more compatibility issues with YEP_BattleEngineCore
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *        2. Fixed the battle turn clock action counter won't update bug when
 *           addressing compatibility issues with
 *           Yanfly Engine Plugins - Battle Engine Core
 *        3. New inputable actors can be selected by touching those actor
 *           sprites
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Compatibility Tests:
 *      - v0.01a(GMT 0200 13-Jul-2020):
 *        1. Finished the hotkey module(No nontrivial change has taken place)
 *        2. Finished the wait module(No nontrivial change has taken place)
 *        3. Finished the bar module(No nontrivial change has taken place)
 *        4. Finished the charge module(No nontrivial change has taken place)
 *        5. Finished the cooldown module(No nontrivial change has taken place)
 *        6. Added compatibility tests for
 *           Yanfly Engine Plugins - Battle Engine Core
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *      Documentations:
 *      - v0.16a(GMT 1500 6-Apr-2020):
 *        1. Finished the Action module
 *        2. latestSATBItem_ has changed to latestSATBItems, which is an array
 *           of the old latestSATBItem_
 *        3. The notetag priority latestSkillItem has been renamed as
 *           latestSkillItems
 *        4. Fixed the bug of not updating the x positions of the battler
 *           sprites in the discrete order window when there are new alive
 *           battlers
 *        5. Fixed the possible bug of not updating possible skill/item
 *           notetag value changes on time
 *      - v0.15c(GMT 0700 11-Dec-2020):
 *        1. Fixed the following wrong documentations:
 *           Battler manipulations -
 *           i. setDelaySecCounter should be setSATBDelaySecCounter
 *           ii. addDelaySecCounter should be addSATBDelaySecCounter
 *           iii. multiplyDelaySecCounter should be
 *                multiplySATBDelaySecCounter
 *           iv. delaySecCounter should be satbDelaySecCounter
 *        2. Added the action sequence for the Delay Module in
 *           Yanfly Engine Plugins - Battle Engine Core
 *        3. Lets players cancels actor cooldown by clicking the actor sprite
 *        4. Lets players cancels actor charge by clicking the actor sprite
 *      - v0.15b(GMT 0400 7-Dec-2020):
 *        1. You no longer have to edit the value of
 *           DoubleX_RMMZ.Superlative_ATB_Parameters_File when changing the
 *           parameter plugin file name
 *        2. Fixed the wrong this of the following Array prototype methods:
 *           i. fastFilter
 *           ii. fastMap
 *           iii. filterMap
 *           iv. mapFilter
 *           v. mapReduce
 *           vi. mapSome
 *        3. Fixed the x and y positions and opacity update bugs for discrete
 *           order battler sprites
 *        4. Fixed wrong unit test check conditions for the x and y positions
 *           and opacity for discrete order battler sprites
 *      - v0.15a(GMT 0700 18-Aug-2020):
 *        1. Finished the Delay Module
 *        2. Added didDelayCounterEnd
 *      - v0.14a(GMT 1400 17-Aug-2020):
 *        1. Finished the Order Module
 *        2. Lets you set the font face, text color and align, opacity and
 *           windowskin for all news windows in this plugin
 *        3. Removed all useless text padding parameters for all new windows
 *           in this plugin
 *      - v0.13a(GMT 1400 26-Jul-2020):
 *        1. Finished the CTB module
 *        2. Added didFillCoreATB, didFillChargeATB and didFillCooldownATB
 *      - v0.12a(GMT 1400 25-Jul-2020):
 *        1. Finished the countdown module
 *        2. Added didDecreaseCountdownStateTurn and
 *           didIncreaseCountdownStateTurn in the event module
 *        3. Battle turn clock second unit counter's stored in seconds instead
 *           of milliseconds
 *      - v0.11a(GMT 1300 23-Jul-2020):
 *        1. Finished the turn module
 *      - v0.10a(GMT 0900 23-Jul-2020):
 *        1. Finished the rate module
 *        2. Removed some unit tests becoming redundant in this latest version
 *      - v0.09a(GMT 1400 22-Jul-2020):
 *        1. Finished the start module
 *      - v0.08a(GMT 0900 21-Jul-2020):
 *        1. Finished the speed module
 *        2. Removed a unit test that becomes tautological in latest version
 *      - v0.07a(GMT 1400 20-Jul-2020):
 *        1. Finished the reset module
 *      - v0.06a(GMT 0700 19-Jul-2020):
 *        1. Finished the event module
 *        2. Added more parameters for attaching actor ATB bars to the status
 *           window in the bar module
 *        3. Plugin commands now support battler names with spaces
 *      - v0.05b(GMT 0200 13-Jul-2020):
 *        1. Addressed compatibility issues with SEK_ChangeActor
 *      - v0.05a(GMT 1000 27-Jun-2020):
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020):
 *        1. Finished the charge module
 *        2. Added isBarVisible suffix: entry notetag in the bar module
 *        3. Added battler manipulation script calls to manipulate the battle
 *           turn clock counters
 *      - v0.03a(GMT 1400 15-Jun-2020):
 *        1. Finished the bar module
 *      - v0.02a(GMT 1200 14-Jun-2020):
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020):
 *        1. Finished the hotkey module
 *        2. Added battler maniuplation script call coreSATBProportion()
 *      - v0.00a(GMT 1500 12-Jun-2020):
 *        1. Finished the core module
 *----------------------------------------------------------------------------
 *    # Finished Modules
 *      1. Core Module
 *         - Lets you enable and disable this plugin on the fly
 *         - Lets you define the battle turn in terms of number of actions
 *           executed, or frames/seconds elapsed
 *         - Lets you set the maximum ATB value of each battler
 *         - Lets you set some states to have their turn counts updated right
 *           before the battler involved executes actions
 *      2. (v0.03a+)Bar Module
 *         - Lets you show the battler ATB bars on the battler sprites
 *         - Lets you show the actor ATB bars attached to the status window
 *      3. (v0.01a+)Hotkey Module
 *         - Lets you set some hotkeys to change the currently selected
 *           inputable actors
 *      4. (v0.02a+)Wait Module
 *         - Lets you set the ATB frame update wait conditions
 *         - Lets you show the ATB frame update force status
 *         - Lets you set some hotkeys to forcibly run/stop the ATB frame
 *           updates
 *         - Lets you show some clickable command windows behaving like the
 *           aforementioned hotkeys
 *      5. (v0.16a+)Action Module
 *         - Lets you set the number of virtual action slots needed for
 *           skills/items
 *         - Lets you demands players to input all the virtual action slots at
 *           once before executing them all as a batch
 *         - Lets you set how the virtual action slots are gained(gain all
 *           upon a single full ATB or gain 1 upon each full ATB then empties
 *           the ATB afterwards until the number of virtual action slots
 *           reaches the limited specified by Action Times+)
 *         - Lets you abandon the concept of virtual action slots altogether
 *           and base the action cost in the form of subtracting the battler
 *           ATB value
 *      6. (v0.04a+)Charge Module
 *         - Lets you set some skills/items to need to be charged before being
 *           executed
 *         - Lets you set some hotkeys to cancel the action being charged(this
 *           applies to those not needing charging as well if the players
 *           cancel fast enough)
 *         - Lets you set some hotkeys to force the action charge so it can be
 *           executed before the charge's full or overcharged beyond the
 *           maximum charge value
 *      7. (v0.05a+)Cooldown Module
 *         - Lets you set some skills/items to cause the battler involved need
 *           to be cooled down after executing those skills/items
 *         - Lets you set some hotkeys to cancel the the battler cooldown
 *      8. (v0.12a+)Countdown Module
 *          - Lets you set some states to have their turn count updated based
 *            on the number of frames/seconds elapsed, with additional effects
 *            triggered upon each turn count update
 *      9. (v0.13a+)CTB Module
 *          - Lets you change toggle the battle system between ATB and CTB on
 *            the fly and even during the same battle(you can actually set a
 *            hotkey to do that in battle)
 *      10. (v0.15a+)Delay Module
 *          - Lets you set the amount of delay between becoming able to input
 *            actions and actually inputting them for battlers can't have
 *            their actions inputted by the player(enemies and actors with
 *            auto battle or confusion)
 *      11. (v0.06a+)Event Module
 *          - Lets you set some additional events to be triggered upon
 *            important timings inthe ATB system
 *      12. (v0.14a+)Order Module
 *         - Lets you show the ATB values of all battlers in the same ATB bar
 *         - Lets you show the battler action ordering in the CTB system style
 *           (You should only use this with the full wait mode unless you
 *           really know what you're truly doing)
 *      13. (v0.10a)Rate Module
 *          - Lets you set the ATB, charge and cooldown fill rate for each
 *            battler
 *      14. (v0.07a+)Reset Module
 *          - Lets you set the ATB value of each battler right after that
 *            battler has executed an action and becomes out of virtual action
 *            slots
 *      15. (v0.08a+)Speed Module
 *          - Lets you set the action execution priority among all battlers
 *            being able to execute actions(it likely means next to nothing in
 *            the full wait mode)
 *      16. (v0.09a+)Start Module
 *          - Lets you set the starting ATB value upon normal, preemptive and
 *            surprise battle starts
 *      17. (v0.11a+)Turn Module
 *          - Lets you show the progress of the current battle turn
 *----------------------------------------------------------------------------
 *    # Upcoming Modules
 *      1. Exchange Module
 *         - Lets you set some skills/items to exchange the charging
 *           skill/item of the targets with the cooldown of the action
 *           exeuction subject triggering the exchange
 *         - This can apply to skills/items with multiple targets but the
 *           setup can be very complicated and convoluted this way
 *      2. Status Module
 *         - Shows the charge, cooldown, action cost and ATB reset settings
 *           for each skill/item in battle and outside battle
 *         - Shows the ATB statues for each actor in the actor status window
 *           outside battle
 *      4. Combo Module
 *         - Lets you set some charging skills/items made by different
 *           battlers to form a new combo skills under certain conditions
 *      5. Escape Module
 *         - Lets you set the charging requirements for the party escape
 *           attempt
 *         - Lets you set the cooldown requirements for the failed party
 *           escape attempt
 *         - Lets you set the cost for failed party escape attempts
 *      6. Overload Module
 *         - Lets you sets the ATB value of battlers to be beyond their
 *           maximum, but it'll slowly drop until it's dropped to its maximum
 *         - This should only work whwn the Action Module doesn't use virtual
 *           action slots at all
 *      7. Pool Module
 *         - Lets you bind some battlers to share the same ATB pool
 *      8. Unison Module
 *         - Lets you set some skills/items to be unison ones
 *----------------------------------------------------------------------------
 *    # Possibly Upcoming Modules
 *      1. Type Module
 *         - Lets you have multiple ATB bars for each battler
 *         - THIS MODULE MUST BE THE LAST MODULE TO BE DONE AS IT'LL CHANGE
 *           JUST ABOUT EVERYTHING IN THIS PLUGIN AND THUS AFFECTS ALMOST
 *           EVERYTHING IN EVERY OTHER MODULE
 *----------------------------------------------------------------------------
 *    # Todo
 *      1. Adds _isSaveParamNotes
 *      2. Allows party escape attempts when executing actions
 *      3. Lets players forces actor charge by long pressing the actor sprite
 *      4. Lets you set some skills to demand a set period to charge up before
 *         they become usable actions that can be inputted by battlers
 *      5. Lets you set some skills to demand a set period to cool down before
 *         they become usable actions that can be inputted by battlers again
 *      6. Adds a parameter for each sprite/window class to be called per
 *         frame so you can control which parameter cache to be
 *         enabled/disabled
 *      7. Fixes the actor command window not selecting the last command when
 *         it becomes able to be shown again bug
 *      8. Fixes the autobattle actor freezed charge/cooldown with the Delay
 *         module enabled
 *      9. Fixes the compatibility issues/bugs when the CTB Module interacts
 *         with SEK_ChangeActor
 *============================================================================*/
/*:
 * @plugindesc To be the most flexible, performant and powerful ATB system
 * framework with the greatest amount of freedom while being user-friendly
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## (v0.16a+)Action Mode Explanations
 *       1. The action mode must be either of the following:
 *          bundle - If a battler has x action slots, all those action slots
 *                   will be accquired at once, and that battler will input
 *                   all those actions consectively
 *                 - Once all those actions are inputted, they will first be
 *                   charged as if they were a single action, then executed
 *                   consecutively without changing action execution subjects,
 *                   and finally cooled down as if they were a single action
 *                 - After that, that battler will run out of action slots
 *          batch - If a battler has x action slots, all those action slots
 *                  will be accquired at once, and that battler will input
 *                  an action at a time
 *                - Once an action is inputted, it'll first be charged, then
 *                  executed, and finally cooled down
 *                - After that, that battler will consume the number of action
 *                  slots specified by the action cost of the executed action
 *                  This process repeats until the battler runs out of action
 *                  slots
 *          discrete - If a battler has x action slots, an action slot will be
 *                     accquired at a time, and that battler will continue to
 *                     have the ATB bar filled until all the action slots are
 *                     accquired
 *                   - As long as that battler has accquired at least 1 action
 *                     slot, that battler can input an action at a time
 *                     Once an action is inputted, it'll first be charged,
 *                     then executed, and finally cooled down
 *                   - After that, that battler will consume the number of
 *                     action slots specified by the action cost of the
 *                     executed action
 *                   - This process repeats until the battler runs out of
 *                     action slots
 *          continuous - The whole concept of action slots will be abandoned
 *                       and an action will demand a specified portion of the
 *                       ATB bar of the battler
 *                     - As long as that the minimum action cost among all
 *                       usable actions of that battler is at least the same
 *                       as the ATB bar of that battler, that battler can
 *                       input an action at a time
 *                     - Once an action is inputted, it'll first be charged,
 *                       then executed, and finally cooled down
 *                     - After that, the ATB bar of that battler will be
 *                       reduced by the portion specified by the action cost
 *                       of the executed action
 *                     - ALL ACTIONS MUST HAVE POSITIVE ACTION COSTS UNLESS
 *                       YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *       2. DON'T CHANGE THE ACTION MODE OF ANY BATTLER INSIDE BATTLES UNLESS
 *          YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *       3. (Advanced)The transitions from an action mode to another are as
 *          follows:
 *          bundle to batch - If a battler hasn't inputted any action and
 *                            isn't able to input any yet, then nothing
 *                            changes at that moment, and the batch action
 *                            mode behaviors will be applied when that battler
 *                            becomes able to input actions
 *                          - If a battler hasn't inputted any action and can
 *                            input actions now, then the batch action mode
 *                            behaviors will be applied right at that moment
 *                          - If a battler has inputted some but not all
 *                            actions, then the already inputted ones will
 *                            still behave as a bundle, and the battler will
 *                            immediately become able to input actions again
 *                            right after finishing the cooldown of the
 *                            executed ones as a bundle, with the remaining
 *                            number of action slots behaving as a batch
 *                          - If a battler has inputted all actions, then
 *                            those actions will still behave as a bundle, and
 *                            the batch action mode behaviors will only be
 *                            applied when that battler becomes able to input
 *                            actions again
 *          bundle to discrete - If a battler hasn't inputted any action and
 *                               isn't able to input any yet, then nothing
 *                               changes at that moment, and the discrete
 *                               action mode behaviors will be applied when
 *                               that battler becomes able to input actions
 *                             - If a battler hasn't inputted any action and
 *                               can input actions now, then the discrete
 *                               action mode behaviors will be applied right
 *                               at that moment
 *                             - If a battler has inputted some but not all
 *                               actions, then the already inputted ones will
 *                               still behave as a bundle, and the battler
 *                               will immediately become able to input actions
 *                               again right after finishing the cooldown of
 *                               the executed ones as a bundle, with the
 *                               remaining number of action slots behaving as
 *                               discrete ones
 *                             - If a battler has inputted all actions, then
 *                               those actions will still behave as a bundle,
 *                               and the discrete action mode behaviors will
 *                               only be applied when that battler becomes
 *                               able to input actions again
 *          bundle to continuous - If a battler hasn't inputted any action and
 *                                 isn't able to input any yet, then nothing
 *                                 changes at that moment, and the continuous
 *                                 action mode behaviors will be applied when
 *                                 that battler becomes able to input actions
 *                               - If a battler hasn't inputted any action and
 *                                 can input actions now, then the continuous
 *                                 action mode behaviors will be applied right
 *                                 at that moment
 *                               - If a battler has inputted some but not all
 *                                 actions, then the already inputted ones
 *                                 will still behave as a bundle, and the
 *                                 battler will immediately become able to
 *                                 input actions again right after finishing
 *                                 the cooldown of the executed ones as a
 *                                 bundle, with the remaining number of action
 *                                 slots behaving as continuous ones
 *                               - If a battler has inputted all actions, then
 *                                 those actions will still behave as a
 *                                 bundle, and the continuous action mode
 *                                 behaviors will only be applied when that
 *                                 battler becomes able to input actions again
 *          batch to bundle - If a battler hasn't inputted any action and
 *                            isn't able to input any yet, then nothing
 *                            changes at that moment, and the bundle action
 *                            mode behaviors will be applied when that battler
 *                            becomes able to input actions
 *                          - If a battler hasn't inputted any action and can
 *                            input actions now, then the bundle action mode
 *                            behaviors will be applied right at that moment
 *                          - If a battler has inputted an action but still
 *                            has action slots left, then the bundle action
 *                            mode behaviors will only be applied when that
 *                            battler becomes able to input actions again,
 *                            which should be right after finishing cooldown
 *                            of the executed one, with those remaining action
 *                            slots as a bundle, meaning that new action slots
 *                            won't be accquired at that moment in this case
 *                          - If a battler has inputted an action and has no
 *                            action slots left, then the bundle action
 *                            mode behaviors will only be applied when that
 *                            battler becomes able to input actions again
 *          batch to discrete - If a battler hasn't inputted any action and
 *                              isn't able to input any yet, then nothing
 *                              changes at that moment, and the discrete
 *                              action mode behaviors will be applied when
 *                              that battler becomes able to input actions
 *                            - If a battler hasn't inputted any action and
 *                              can input actions now, then the discrete
 *                              action mode behaviors will be applied right at
 *                              that moment
 *                            - If a battler has inputted an action but still
 *                              has action slots left, then the discrete
 *                              action mode behaviors will only be applied
 *                              when that battler becomes able to input
 *                              actions again, which should be right after
 *                              finishing cooldown of the executed one, with
 *                              those remaining action slots as discrete ones,
 *                              meaning that the number of action slots won't
 *                              be always reduced to just 1 in this case
 *                            - If a battler has inputted an action and has no
 *                              action slots left, then the discrete action
 *                              mode behaviors will only be applied when that
 *                              battler becomes able to input actions again
 *          batch to continuous - If a battler hasn't inputted any action and
 *                                isn't able to input any yet, then nothing
 *                                changes at that moment, and the continuous
 *                                action mode behaviors will be applied when
 *                                that battler becomes able to input actions
 *                              - If a battler hasn't inputted any action and
 *                                can input actions now, then the continuous
 *                                action mode behaviors will be applied right
 *                                at that moment
 *                              - If a battler has inputted an action but
 *                                still has action slots left, then the
 *                                continuous action mode behaviors will only
 *                                be applied when that battler becomes able
 *                                to input actions again, which should be
 *                                right after finishing cooldown of the
 *                                executed one, with the ATB bar always being
 *                                full, meaning that the number of remaining
 *                                action slots doesn't matter in this case
 *                              - If a battler has inputted an action and has
 *                                no action slots left, then the continuous
 *                                action mode behaviors will only be applied
 *                                when that battler becomes able to input
 *                                actions again
 *          discrete to bundle - If a battler hasn't inputted any action and
 *                               isn't able to input any yet, then nothing
 *                               changes at that moment, and the bundle action
 *                               mode behaviors will be applied when that
 *                               battler becomes able to input actions
 *                             - If a battler hasn't inputted any action and
 *                               can input actions now, then the bundle action
 *                               mode behaviors will be applied right at that
 *                               moment
 *                             - If a battler has inputted an action but still
 *                               has action slots left, then the bundle action
 *                               mode behaviors will only be applied when that
 *                               battler becomes able to input actions again,
 *                               which should be right after finishing
 *                               cooldown of the executed one, with those
 *                               remaining action slots as a bundle, meaning
 *                               that new action slots won't be accquired at
 *                               that moment in this case
 *                             - If a battler has inputted an action and has
 *                               no action slots left, then the bundle action
 *                               mode behaviors will only be applied when that
 *                               battler becomes able to input actions again
 *          discrete to batch - If a battler hasn't inputted any action and
 *                              isn't able to input any yet, then nothing
 *                              changes at that moment, and the batch action
 *                              mode behaviors will be applied when that
 *                              battler becomes able to input actions
 *                            - If a battler hasn't inputted any action and
 *                              can input actions now, then the batch action
 *                              mode behaviors will be applied right at that
 *                              moment
 *                            - If a battler has inputted an action but still
 *                              has action slots left, then the batch action
 *                              mode behaviors will only be applied when that
 *                              battler becomes able to input actions again,
 *                              which should be right after finishing cooldown
 *                              of the executed one, with those remaining
 *                              action slots as batch ones, meaning that the
 *                              number of action slots won't be always reduced
 *                              to just 1 in this case
 *                            - If a battler has inputted an action and has no
 *                              action slots left, then the batch action mode
 *                              behaviors will only be applied when that
 *                              battler becomes able to input actions again
 *          discrete to continuous - If a battler hasn't inputted any action
 *                                   and isn't able to input any yet, then
 *                                   nothing changes at that moment, and the
 *                                   continuous action mode behaviors will be
 *                                   applied when that battler becomes able to
 *                                   input actions
 *                                 - If a battler hasn't inputted any action
 *                                   and can input actions now, then the
 *                                   continuous action mode behaviors will be
 *                                   applied right at that moment
 *                                 - If a battler has inputted an action but
 *                                   still has action slots left, then the
 *                                   continuous action mode behaviors will
 *                                   only be applied when that battler becomes
 *                                   able to input actions again, which should
 *                                   be right after finishing cooldown of the
 *                                   executed one, with the ATB bar always
 *                                   being full, meaning that the number of
 *                                   remaining action slots doesn't matter in
 *                                   this case
 *                                 - If a battler has inputted an action and
 *                                   has no action slots left, then the
 *                                   continuous action mode behaviors will
 *                                   only be applied when that battler becomes
 *                                   able to input actions again
 *          continuous to bundle - If a battler hasn't inputted any action and
 *                                 isn't able to input any yet, then nothing
 *                                 changes at that moment, and the bundle
 *                                 action mode behaviors will be applied when
 *                                 that battler becomes able to input actions
 *                               - If a battler hasn't inputted any action and
 *                                 can input actions now, then the bundle
 *                                 action mode behaviors will be applied right
 *                                 at that moment if the ATB bar is already
 *                                 full, otherwise it'll be applied when the
 *                                 ATB bar becomes full
 *                               - If a battler has inputted an action with
 *                                 the ATB bar being full after its execution,
 *                                 then the bundle action mode behaviors will
 *                                 be applied right after finishing cooldown
 *                                 of the executed one, with newly accquired
 *                                 action slots as a bundle
 *                               - If a battler has inputted an action with
 *                                 the ATB bar not being full after its
 *                                 execution, no action slots left, then the
 *                                 bundle action mode behaviors will only be
 *                                 applied when that battler becomes able to
 *                                 input actions again
 *          continuous to batch - If a battler hasn't inputted any action and
 *                                isn't able to input any yet, then nothing
 *                                changes at that moment, and the batch action
 *                                mode behaviors will be applied when that
 *                                battler becomes able to input actions
 *                              - If a battler hasn't inputted any action and
 *                                can input actions now, then the batch action
 *                                mode behaviors will be applied right at that
 *                                moment if the ATB bar is already full,
 *                                otherwise it'll be applied when the ATB bar
 *                                becomes full
 *                              - If a battler has inputted an action but still
 *                                has action slots left, then the batch action
 *                                mode behaviors will only be applied when that
 *                                battler becomes able to input actions again,
 *                                which should be right after finishing cooldown
 *                                of the executed one, with those remaining
 *                                action slots as batch ones, meaning that the
 *                                number of action slots won't be always reduced
 *                                to just 1 in this case
 *                              - If a battler has inputted an action and has no
 *                                action slots left, then the batch action mode
 *                                behaviors will only be applied when that
 *                                battler becomes able to input actions again
 *          continuous to discrete - If a battler hasn't inputted any action
 *                                   and isn't able to input any yet, then
 *                                   nothing changes at that moment, and the
 *                                   continuous action mode behaviors will be
 *                                   applied when that battler becomes able to
 *                                   input actions
 *                                 - If a battler hasn't inputted any action
 *                                   and can input actions now, then the
 *                                   continuous action mode behaviors will be
 *                                   applied right at that moment
 *                                 - If a battler has inputted an action but
 *                                   still has action slots left, then the
 *                                   continuous action mode behaviors will
 *                                   only be applied when that battler becomes
 *                                   able to input actions again, which should
 *                                   be right after finishing cooldown of the
 *                                   executed one, with the ATB bar always
 *                                   being full, meaning that the number of
 *                                   remaining action slots doesn't matter in
 *                                   this case
 *                                 - If a battler has inputted an action and
 *                                   has no action slots left, then the
 *                                   continuous action mode behaviors will
 *                                   only be applied when that battler becomes
 *                                   able to input actions again
 *============================================================================
 *    ## Notetag Info
 *       1. Among all the same notetag types in the same data, all can be
 *          effective(Reference tag: NOTETAG_MULTI)
 *       2. Each line can only have at most 1 notetag
 *          (Reference tag: LINE_MONO)
 *       3. The following is the structure of all notetags in this plugin:
 *          - <doublex rmmv satb contents>
 *          - <satb contents>
 *          (Reference tag: NOTE_STRUCTURE)
 *          Where contents are in the form of type suffixes: entries
 *          Either of the above can be used, but the 1st one reduce the chance
 *          of causing other plugins to treat the notetags of this plugin as
 *          theirs, while the 2nd one is more user-friendly
 *          - type is one of the following:
 *            Core module -
 *            1. coreMax(related to coreMaxATBVal,
 *               _coreMaxATBValNoteChainingRule and
 *               _coreMaxATBValNotePriorities)
 *            2. coreActState(related to _coreActStateNoteChainingRule)
 *            (v0.16a+)Action module -
 *            1. actCost(related to _actCostNoteChainingRule and
 *               _actCostNotePriorities)
 *            2. actCost(related to actMode, _actModeNoteChainingRule and
 *               _actModeNotePriorities)
 *            (v0.03a+)Bar module -
 *            1. isBarVisible(related to isShowATBBar,
 *               _isBarVisibleNoteChainingRule and
 *               _isBarVisibleNotePriorities)
 *            (v0.04a+)Charge module -
 *            1. chargeMax(related to chargeMaxATBVal,
 *               _chargeMaxATBValNoteChainingRule and
 *               _chargeMaxATBValNotePriorities)
 *            2. isPayBeforeExecCharge(related to isPayBeforeExecCharge,
 *               _isPayBeforeExecChargeNoteChainingRule and
 *               _isPayBeforeExecChargeNotePriorities)
 *            3. canCancelCharge(related to canCancelCharge,
 *               _canCancelChargeNoteChainingRule and
 *               _canCancelChargeNotePriorities)
 *            4. canForceCharge(related to canForceCharge,
 *               _canForceChargeNoteChainingRule and
 *               _canForceChargeNotePriorities)
 *            (v0.05a+)Cooldown module -
 *            1. cooldownMax(related to cooldownMaxATBVal,
 *               _cooldownMaxATBValNoteChainingRule and
 *               _cooldownMaxATBValNotePriorities)
 *            2. canCancelCooldown(related to canCancelCooldown,
 *               _canCancelCooldownNoteChainingRule and
 *               _canCancelCooldownNotePriorities)
 *            (v0.12a+)Countdown Module:
 *            1. countdown(related to _countdownNoteChainingRule and
 *               _countdownNotePriorities)
 *            (v0.15a+)Delay Module:
 *            1. delay(related to delaySecs, _delayNoteChainingRule and
 *               _delayNotePriorities)
 *            (v0.06a+)Event Module:
 *            1. didFinishInput(related to didFinishInput,
 *               _didFinishInputNoteChainingRule and
 *               _didFinishInputNotePriorities)
 *            2. didBecomeActable(related to didBecomeActable,
 *               _didBecomeActableNoteChainingRule and
 *               _didBecomeActableNotePriorities)
 *            3. didSetActTimes(related to didSetActTimes,
 *               _didSetActTimesNoteChainingRule and
 *               _didSetActTimesNotePriorities)
 *            (v0.16a+)4. didSetMaxActTimes(related to didSetMaxActTimes,
 *                        _didSetMaxActTimesNoteChainingRule and
 *                        _didSetMaxActTimesNotePriorities)
 *            5. didStartATBFill(related to didStartATBFill,
 *               _didStartATBFillNoteChainingRule and
 *               _didStartATBFillNotePriorities)
 *            6. willCancelCharge(related to willCancelCharge,
 *               _willCancelChargeNoteChainingRule and
 *               _delayNotePriorities)
 *            7. didStartForceCharge(related to didStartForceCharge,
 *               _didStartForceChargeNoteChainingRule and
 *               _didStartForceChargeNotePriorities)
 *            8. willCancelCooldown(related to willCancelCooldown,
 *               _willCancelCooldownNoteChainingRule and
 *               _willCancelCooldownNotePriorities)
 *            9. didCoreATBBecomeFull(related to didCoreATBBecomeFull,
 *               _didCoreATBBecomeFullNoteChainingRule and
 *               _didCoreATBBecomeFullNotePriorities)
 *            10. didCoreATBBecomeNotFull(related to didCoreATBBecomeNotFull,
 *                _didCoreATBBecomeNotFullNoteChainingRule and
 *                _didCoreATBBecomeNotFullNotePriorities)
 *            11. didChargeATBBecomeNotFull(related to
 *                didChargeATBBecomeNotFull,
 *                _didChargeATBBecomeNotFullNoteChainingRule and
 *                _didChargeATBBecomeNotFullNotePriorities)
 *            12. didAddInputableActor(related to didAddInputableActor,
 *                _didAddInputableActorNoteChainingRule and
 *                _didAddInputableActorNotePriorities)
 *            (v0.12a+)12. didDecreaseCountdownStateTurn(related to
 *                         didDecreaseCountdownStateTurn,
 *                         _didDecreaseCountdownStateTurnNoteChainingRule and
 *                         _didDecreaseCountdownStateTurnNotePriorities)
 *            (v0.12a+)13. didIncreaseCountdownStateTurn(related to
 *                         didIncreaseCountdownStateTurn,
 *                         _didIncreaseCountdownStateTurnNoteChainingRule and
 *                         _didIncreaseCountdownStateTurnNotePriorities)
 *            (v0.15a+)14. didDelayCounterEnd(related to didDelayCounterEnd,
 *                         _didDelayCounterEndNoteChainingRule and
 *                         _didDelayCounterEndNotePriorities)
 *            (v0.14a+)Order Module:
 *            1. continuousOrderSpriteOpacity(related to
 *               continuousOrderSpriteOpacity,
 *               _continuousOrderSpriteOpacityoteChainingRule and
 *               _continuousOrderSpriteOpacityNotePriorities)
 *            2. continuousOrderSpriteIconFolder(related to
 *               continuousOrderSpriteIconFolder,
 *               _continuousOrderSpriteIconFolderNoteChainingRule and
 *               _continuousOrderSpriteIconFolderNotePriorities)
 *            3. continuousOrderSpriteIconFilename(related to
 *               continuousOrderSpriteIconFilename,
 *               _continuousOrderSpriteIconFilenameNoteChainingRule and
 *               _continuousOrderSpriteIconFilenameNotePriorities)
 *            4. continuousOrderSpriteIconHue(related to
 *               continuousOrderSpriteIconHue,
 *               _continuousOrderSpriteIconHueNoteChainingRule and
 *               _continuousOrderSpriteIconHueNotePriorities)
 *            5. continuousOrderSpriteIconSmooth(related to
 *               continuousOrderSpriteIconSmooth,
 *               _continuousOrderSpriteIconSmoothNoteChainingRule and
 *               _continuousOrderSpriteIconSmoothNotePriorities)
 *            6. continuousOrderSpriteIconXCoor(related to
 *               continuousOrderSpriteIconXCoor,
 *               _continuousOrderSpriteIconXCoorNoteChainingRule and
 *               _continuousOrderSpriteIconXCoorNotePriorities)
 *            7. continuousOrderSpriteIconYCoor(related to
 *               continuousOrderSpriteIconYCoor,
 *               _continuousOrderSpriteIconYCoorNoteChainingRule and
 *               _continuousOrderSpriteIconYCoorNotePriorities)
 *            8. continuousOrderSpriteIconSourceW(related to
 *               continuousOrderSpriteIconSourceW,
 *               _continuousOrderSpriteIconSourceWNoteChainingRule and
 *               _continuousOrderSpriteIconSourceWNotePriorities)
 *            9. continuousOrderSpriteIconSourceH(related to
 *               continuousOrderSpriteIconSourceH,
 *               _continuousOrderSpriteIconSourceHNoteChainingRule and
 *               _continuousOrderSpriteIconSourceHNotePriorities)
 *            10. continuousOrderSpriteIconW(related to
 *                continuousOrderSpriteIconW,
 *                _continuousOrderSpriteIconWNoteChainingRule and
 *                _continuousOrderSpriteIconWNotePriorities)
 *            11. continuousOrderSpriteIconH(related to
 *                continuousOrderSpriteIconH,
 *                _continuousOrderSpriteIconHNoteChainingRule and
 *                _continuousOrderSpriteIconHNotePriorities)
 *            12. continuousOrderSpriteY(related to
 *                continuousOrderSpriteY,
 *                _continuousOrderSpriteYNoteChainingRule and
 *                _continuousOrderSpriteYNotePriorities)
 *            13. discreteOrderSpriteTargetOpacity(related to
 *                discreteOrderSpriteTargetOpacity,
 *                _discreteOrderSpriteTargetOpacityNoteChainingRule and
 *                _discreteOrderSpriteTargetOpacityNotePriorities)
 *            14. discreteOrderSpriteIconFolder(related to
 *                discreteOrderSpriteIconFolder,
 *                _discreteOrderSpriteIconFolderNoteChainingRule and
 *                _discreteOrderSpriteIconFolderNotePriorities)
 *            15. discreteOrderSpriteIconFilename(related to
 *                discreteOrderSpriteIconFilename,
 *                _discreteOrderSpriteIconFilenameNoteChainingRule and
 *                _discreteOrderSpriteIconFilenameNotePriorities)
 *            16. discreteOrderSpriteIconHue(related to
 *                discreteOrderSpriteIconHue,
 *                _discreteOrderSpriteIconHueNoteChainingRule and
 *                _discreteOrderSpriteIconHueNotePriorities)
 *            17. discreteOrderSpriteIconSmooth(related to
 *                discreteOrderSpriteIconSmooth,
 *                _discreteOrderSpriteIconSmoothNoteChainingRule and
 *                _discreteOrderSpriteIconSmoothNotePriorities)
 *            18. discreteOrderSpriteIconXCoor(related to
 *                discreteOrderSpriteIconXCoor,
 *                _discreteOrderSpriteIconXCoorNoteChainingRule and
 *                _discreteOrderSpriteIconXCoorNotePriorities)
 *            19. discreteOrderSpriteIconYCoor(related to
 *                discreteOrderSpriteIconYCoor,
 *                _discreteOrderSpriteIconYCoorNoteChainingRule and
 *                _discreteOrderSpriteIconYCoorNotePriorities)
 *            20. discreteOrderSpriteIconSourceW(related to
 *                discreteOrderSpriteIconSourceW,
 *                _discreteOrderSpriteIconSourceWNoteChainingRule and
 *                _discreteOrderSpriteIconSourceWNotePriorities)
 *            21. discreteOrderSpriteIconSourceH(related to
 *                discreteOrderSpriteIconSourceH,
 *                _discreteOrderSpriteIconSourceHNoteChainingRule and
 *                _discreteOrderSpriteIconSourceHNotePriorities)
 *            22. discreteOrderSpriteIconW(related to
 *                discreteOrderSpriteIconW,
 *                _discreteOrderSpriteIconWNoteChainingRule and
 *                _discreteOrderSpriteIconWNotePriorities)
 *            23. discreteOrderSpriteIconH(related to
 *                discreteOrderSpriteIconH,
 *                _discreteOrderSpriteIconHNoteChainingRule and
 *                _discreteOrderSpriteIconHNotePriorities)
 *            (v0.10a+)Rate Module:
 *            1. coreATBRate(related to coreATBRate,
 *                           _coreATBRateNoteChainingRule and
 *                           _coreATBRateNotePriorities)
 *            2. chargeATBRate(related to chargeATBRate,
 *                             _chargeATBRateNoteChainingRule and
 *                             _chargeATBRateNotePriorities)
 *            3. cooldownATBRate(related to cooldownATBRate,
 *                              _cooldownATBRateNoteChainingRule and
 *                              _cooldownATBRateNotePriorities)
 *            (v0.07a+)Reset Module:
 *            1. resetATBVal(related to resetATBVal,
 *               _resetATBValNoteChainingRule and _resetATBValNotePriorities)
 *            (v0.08a+)Speed Module:
 *            1. actSpeed(related to actSpeed, _actSpeedlNoteChainingRule and
 *                       _actSpeedNotePriorities)
 *            (v0.09a+)Start Module:
 *            1. normStartATBVal(related to normStartATBVal,
 *                               _normStartATBValNoteChainingRule and
 *                               _normStartATBValNotePriorities)
 *            2. preemptStartATBVal(related to preemptStartATBVal,
 *                                 _preemptStartATBValNoteChainingRule and
 *                                 _preemptStartATBValNotePriorities)
 *            3. surpriseStartATBVal(related to surpriseStartATBVal,
 *                                  _surpriseStartATBValNoteChainingRule and
 *                                  _surpriseStartATBValNotePriorities)
 *            (Reference tag: NOTE_TYPE)
 *          - suffixes is the list of suffixes in the form of:
 *            suffix1 suffix2 suffix3 ... suffixn
 *            Where each suffix is either of the following:
 *            cfg(The notetag value will be the corresponding NOTEX in the
 *                configuration plugin js file when opened directly)
 *            val(The notetag value will be used as-is)
 *            switch(The value of the game switch with id as the notetag value
 *                   will be used)
 *            event(The common event with id as the notetag value will be
 *                  reserved upon using the notetag)
 *            var(The value of the game variable with id as the notetag value
 *                will be used)
 *            (Advanced)script(The value of the game variable with id as the
 *                            notetag value will be used as the contents of
 *                            the functions to be called upon using the
 *                            notetag, so the function arguments are exactly
 *                            the same as the cfg counterpart)
 *            (Reference tag: NOTE_SUFFIX)
 *            USING eval AND script suffixes WITHOUT SETTING _isNoteCached on
 *            CAN LEAD TO SEVERE LAG AND FPS DROP
 *            It's highly encouraged and recommended not to change from using
 *            a switch/variable to using another, nor from not using one to
 *            using one or vice versa in the game, as the script calls needed
 *            to do so can be complicated and convoluted in some edge cases
 *          - entries is the list of entries in the form of:
 *            entry1, entry2, entry3, ..., entryn
 *            Where entryi must conform with the suffixi specifications
 *          - (Advanced)Each content type has a corresponding eval variant:
 *            <doublex rmmv satb type>
 *            function content
 *            </doublex rmmv satb type>
 *            and this counterpart:
 *            <satb type>
 *            function content
 *            </satb type>
 *            The functions arguments are exactly the same as the counterpart
 *            with the cfg suffix
 *            This eval variant only applies to notetags having only 1 suffix
 *          - If an entry corresponds to the cfg, script or eval suffix and
 *            the referred contents of the function uses switches/variablees,
 *            all those switches/variables must be explicitly written as
 *            $gameSwitches.value(x) or $gameVariables.value(x), where x must
 *            be a Number literal instead of a variable, unless
 *            _isAlwaysRecacheAllSwitchVars is ON
 *            (Reference tag: SWITCH_VAR)
 *       4. (Advanced)The notetag results are cached as follows:
 *          - The effective notetag list's divided into these parts:
 *            Effective actor notetag list
 *            Effective enemy notetag list
 *            Effective class notetag list
 *            Effective weapon notetag list
 *            Effective armor notetag list
 *            Effective state notetag list
 *            Effective skill notetag list
 *            Effective item notetag list
 *            They'll be sorted according to the corresponding note priorities
 *            and their results will be chained according to the corresponding
 *            note chaining rule
 *            (Reference tag: NOTE_LIST_PART)
 *          - Each of the above parts have its own effective notetag list
 *            cache, which will be recached if it's possible that the
 *            effective notetag list might have changed due to changing
 *            classes/weapons/armors/states/etc, which will automatically
 *            raise coresponding note change factor for the corresponding note
 *            (Reference tag: NOTE_LIST_CACHE)
 *          - Each of the above parts has its own intermediate result cache
 *            based on the result chained from the effective notetags with
 *            higher priorities, and this intermediate result cache will be
 *            recached if the effective notetag list of that part or any of
 *            those having higher priorities have their intermediate result
 *            cache recached, or if the corresponding note priorities/chain
 *            rule has changed
 *            (Reference tag: NOTE_RESULT_CACHE)
 *          - If the battler's refreshed due to changes other than class,
 *            weapons, armors, states and last used skill, all note change
 *            factors for all notes will be automatically raised
 *            (Reference tag: BATTLER_REFRESH_RECACHE_NOTE)
 *          - If users changes some notetags from some data manually, then
 *            the corresponding note change factor should be raised
 *            immediately afterwards(but it's highly encouraged and
 *            recommended not to change any notetag data on the fly directly)
 *          - If the users are sure that the effective notetag list of a part
 *            remains intact but its intermediate result cache might be
 *            invalid, then the result factor of the corresponding note should
 *            be raised immediately
 *----------------------------------------------------------------------------
 *    # Actor/Enemy/Class/Weapon/Armor/State/Skill/Item Notetag contents:
 *      Core Module:
 *      1. coreMax suffix: entry
 *         - Sets the maximum ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Core ATB Max Functions in the core
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any positive number
 *         - If the end result of the maximum ATB value of the battler's
 *           larger/smaller than the default value of all battlers, then the
 *           ATB value of that battler will take more/less time to fill from
 *           empty to full
 *         - If the maximum ATB value of the battler decreases to become not
 *           greater than the inputability threshold, the battler will become
 *           inputable if that battler can be inputable
 *           (Reference tag: DECREASED_MAX_CORE_ATB_INPUTABLE)
 *         - If the maximum ATB value of the battler increases to become
 *           greater than the inputability threshold, the battler will become
 *           not inputable
 *           (Reference tag: INCREASED_MAX_CORE_ATB_NOT_INPUTABLE)
 *         - (Advanced) The maximum ATB value of the battler must be much,
 *           much larger than 2 ^ -32, but much, much smaller than 2 ^ 32
 *           (Reference tag: SMALLEST_ATB_VAL_INCREMENT)
 *         - E.g.:
 *           If _coreMaxATBValNoteChainingRule is set as *, and the only
 *           coreMax notetag is <satb coreMax var: 1>, then this notetag will
 *           set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1
 *      (v0.04a+)Bar Module:
 *      1. isBarVisible suffix: entry
 *         - Sets whether the ATB value bar of the battler involved is visible
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Is Bar Visible Functions in the bar
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _isBarVisibleNoteChainingRule is set as some, and the only
 *           isBarVisible notetag is <satb isBarVisible switch: 1>, then the
 *           ATB value bar of the battler involved will be visible if and only
 *           if the game switch with id 1 is on
 *      2.(v0.06a+) isStatusBarVisible suffix: entry
 *         - Sets whether the ATB value bar of the battler involved attached
 *           to the status window is visible
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Is Bar Visible Functions in the bar
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _isStatusBarVisibleNoteChainingRule is set as some, and the
 *           only isStatusBarVisible notetag is
 *           <satb isStatusBarVisible switch: 1>, then the ATB value bar of
 *           the battler involved attached to the status window will be
 *           visible if and only if the game switch with id 1 is on
 *      (v0.16a+)Action Module:
 *      1. actCost suffix: entry
 *         - Sets the action cost of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to ATB Action Cost Functions in the action
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any number
 *         - If the action mode of the battler involved isn't continuous, the
 *           action cost will be rounded up to the integer just larger
 *           than or equal to the original action cost
 *           (Reference tag: NON_CONTINUOUS_INTEGER_ACT_COST)
 *         - The default action cost without this notetag is 1
 *           (Reference tag: DEFAULT_ACT_COST_1)
 *         - Even if the action cost of a skill/item is less than 1, the
 *           battler involved still needs to have action slots to use that
 *           skill/item
 *         - THE ACTION COST OF ATTACK(SKILL ID 1) AND DEFEND(SKILL ID 2)
 *           SHOULDN'T BE ABOVE 1 UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY
 *           DOING
 *         - E.g.:
 *           If _actCostNoteChainingRule is set as +, and the only actCost
 *           notetag is <satb actCost var: 1>, then this notetag will set the
 *           action cost of the battler involved to be added by the value of
 *           the game variable with id 1
 *      2. actMode suffix: entry
 *         - Sets the action cost of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to ATB Action Mode Functions in the action
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry must be either of the following:
 *           i. bundle
 *           ii. batch
 *           iii. discrete
 *           iv. continuous
 *           Please refer to Action Mode Explanations for details
 *         - E.g.:
 *           If _actModeNoteChainingRule is set as last, and the last actMode
 *           notetag is <satb actMode var: 1>, then this notetag will set the
 *           action mode of the battler involved to be the value of the game
 *           variable with id 1
 *      (v0.04a+)Charge Module:
 *      1. chargeMax suffix: entry
 *         - Sets the maximum charge ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Charge ATB Max Functions in the charge
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any nonnegative number
 *         - If the skill/item to be charged doesn't have this notetag, then
 *           that skill/item will always be instantly charged to full within 1
 *           frame
 *           (Reference tag: NON_CHARGING_SKILL_ITEM_INSTANT_CHARGE)
 *         - If the end result of the maximum charge ATB value of the
 *           battler's larger/smaller than the default value of all battlers,
 *           then the charge ATB value of that battler will take more/less
 *           time to fill from empty to full
 *         - If the maximum charge ATB value of the battler decreases to
 *           become not greater than the current charge ATB value, the battler
 *           will become able to execute actions immediately
 *           (Reference tag: DECREASED_MAX_CHARGE_ATB_ACTABLE)
 *         - If the maximum charge ATB value of the battler increases to
 *           become greater than the current charge ATB value, the battler
 *           will become not able to execute actions
 *           (Reference tag: INCREASED_MAX_CHARGE_ATB_NOT_ACTABLE)
 *         - If the current charge ATB value becomes negative, then the charge
 *           will become forcibly cancelled
 *           (Reference tag: NEGATIVE_CHARGE_ATB_VAL_CANCEL_CHARGE)
 *         - (Advanced) The maximum charge ATB value of the battler must be
 *           much, much larger than 2 ^ -32, but much, much smaller than
 *           2 ^ 32
 *           (Reference tag: SMALLEST_ATB_VAL_INCREMENT)
 *         - E.g.:
 *           If _chargeMaxATBValNoteChainingRule is set as *, and the only
 *           chargeMax notetag is <satb chargeMax var: 1>, then this notetag
 *           will set the maximum charge ATB value of the battler involved to
 *           be multiplied by the value of the game variable with id 1
 *      2. isPayBeforeExecCharge suffix: entry
 *         - Sets whether the skill/item cost's paid upon finishing inputting
 *           actions instead of upon finishing exexuting actions
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Is Pay Before Exec Charge Functions in
 *           the charge module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _isPayBeforeExecChargeNoteChainingRule is set as every, and
 *           the only isBarVisible notetag is
 *           <satb isPayBeforeExecCharge switch: 1>, then the skill/item cost
 *           will be paid by the battler involved upon finishing executing the
 *           skill/item if the game switch with id 1 is off, even when the
 *           default suggests otherwise
 *      3. canCancelCharge suffix: entry
 *         - Sets whether the skill/item's ATB charging can be cancelled
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Cancel Charge Functions in the
 *           charge module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _canCancelChargeNoteChainingRule is set as first, and there
 *           are multiple effective canCancelCharge suffix: entry notetags,
 *           then only the 1st one will be used, meaning that even the default
 *           will be ignored in this case
 *      4. canForceCharge suffix: entry
 *         - Sets whether the skill/item's ATB charging can be forced
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Force Charge Functions in the
 *           charge module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - If a skill/item's charged becomes not forceable during force
 *           charge, the force charge will be cancelled and becomes back to a
 *           normal charge
 *           (Reference tag: MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM)
 *         - E.g.:
 *           If _canForceChargeNoteChainingRule is set as last, and there
 *           are multiple effective canForceCharge suffix: entry notetags,
 *           then only the last one will be used, meaning that even the
 *           default will be ignored in this case
 *      (v0.05a+)Cooldown Module:
 *      1. cooldownMax suffix: entry
 *         - Sets the maximum cooldown ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Cooldown ATB Max Functions in the
 *           cooldown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be any nonnegative number
 *         - If the skill/item to be cooldownd doesn't have this notetag, then
 *           that skill/item will always be instantly cooldownd to full within
 *           1 frame
 *           (Reference tag: NON_COOLDOWN_SKILL_ITEM_INSTANT_COOLDOWN)
 *         - If the end result of the maximum cooldown ATB value of the
 *           battler's larger/smaller than the default value of all battlers,
 *           then the cooldown ATB value of that battler will take more/less
 *           time to become empty from full
 *         - If the current cooldown ATB value becomes nonpositive, then the
 *           cooldown will become finished
 *         - (Advanced) The maximum cooldown ATB value of the battler must be
 *           much, much larger than 2 ^ -32, but much, much smaller than
 *           2 ^ 32
 *           (Reference tag: SMALLEST_ATB_VAL_INCREMENT)
 *         - E.g.:
 *           If _cooldownMaxATBValNoteChainingRule is set as *, and the only
 *           cooldownMax notetag is <satb cooldownMax var: 1>, then this
 *           notetag will set the maximum ATB value of the battler involved to
 *           be multiplied by the value of the game variable with id 1
 *      2. canCancelCooldown suffix: entry
 *         - Sets whether the skill/item's ATB cooldown can be cancelled
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Cancel Cooldown Functions in the
 *           cooldown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _canCancelCooldownNoteChainingRule is set as first, and there
 *           are multiple effective canCancelCooldown suffix: entry notetags,
 *           then only the 1st one will be used, meaning that even the default
 *           will be ignored in this case
 *      (v0.15a+)Delay Module:
 *      1. delay condSuffix counterSuffix: condEntry, counterEntry
 *         - Sets the delay counter of the battler involved in seconds if
 *           condEntry is truthy
 *         - condEntry can be cfg, val, switch or script
 *         - counterEntry can be cfg, val, var or script
 *         - (Advanced)Please refer to Delay Condition Functions in the delay
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant for the condEntry
 *         - (Advanced)Please refer to Delay Counter Functions in the delay
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant for the intervalEntry
 *         - The result of condEntry can be anything as it only checks whether
 *           it's truthy or falsy
 *         - The result of counterEntry can be any nonnegative Number
 *         - Only notetags with a truthy condEntry can be effective
 *         - E.g.:
 *           If _delayNoteChainingRule is set as first, and the 1st delay
 *           notetag is <satb delay switch val: 1, 0.5>, then this notetag
 *           will set the delay counter of the battler involved to be 0.5
 *           seconds if the game switch with id 1 is on
 *      (v0.06a+)Event Module:
 *      1. didFinishInput suffix: entry
 *         - Sets additional events to happen right after the battler involved
 *           finishes inputting actions
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didFinishInputNoteChainingRule is set as last, and the only
 *           didFinishInput notetag is <satb didFinishInput event: 1>, then
 *           this notetag will cause the default didFinishInput parameter to
 *           be ignored and the common event with id 1 to be run when common
 *           events can be run
 *      2. didBecomeActable suffix: entry
 *         - Sets additional events to happen right after the battler involved
 *           becomes able to execute actions
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didBecomeActableNoteChainingRule is set as last, and the only
 *           didBecomeActable notetag is <satb didBecomeActable event: 1>,
 *           then this notetag will cause the default didBecomeActable
 *           parameter to be ignored and the common event with id 1 to be run
 *           when common events can be run
 *      3. didSetActTimes suffix: entry
 *         - Sets additional events to happen right after the number of
 *           virtual action slots of the battler involved is set
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didSetActTimesNoteChainingRule is set as last, and the only
 *           didSetActTimes notetag is <satb didSetActTimes event: 1>, then
 *           this notetag will cause the default didSetActTimes parameter to
 *           be ignored and the common event with id 1 to be run when common
 *           events can be run
 *      (v0.16a+)4. didSetMaxActTimes suffix: entry
 *         - Sets additional events to happen right after the maximum number
 *           of virtual action slots of the battler involved is set
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didSetMaxActTimesNoteChainingRule is set as last, and the
 *           only didSetMaxActTimes notetag is
 *           <satb didSetMaxActTimes event: 1>, then this notetag will cause
 *           the default didSetMaxActTimes parameter to be ignored and the
 *           common event with id 1 to be run when common events can be run
 *      5. didStartATBFill suffix: entry
 *         - Sets additional events to happen right after the battler involved
 *           becomes neither charging nor cooling down
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didStartATBFillNoteChainingRule is set as last, and the only
 *           didStartATBFill notetag is <satb didStartATBFill event: 1>, then
 *           this notetag will cause the default didStartATBFill parameter to
 *           be ignored and the common event with id 1 to be run when common
 *           events can be run
 *      6. willCancelCharge suffix: entry
 *         - Sets additional events to happen right before the battler
 *           involved cancels the ATB charge
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _willCancelChargeNoteChainingRule is set as last, and the only
 *           willCancelCharge notetag is <satb willCancelCharge event: 1>,
 *           then this notetag will cause the default willCancelCharge
 *           parameter to be ignored and the common event with id 1 to be run
 *           when common events can be run
 *      7. didStartForceCharge suffix: entry
 *         - Sets additional events to happen right after the battler involved
 *           becomes starting to force the ATB charge
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didStartForceChargeNoteChainingRule is set as last, and the
 *           only didStartForceCharge notetag is
 *           <satb didStartForceCharge event: 1>, then this notetag will cause
 *           the default didStartForceCharge parameter to be ignored and the
 *           common event with id 1 to be run when common events can be run
 *      8. willCancelCooldown suffix: entry
 *         - Sets additional events to happen right before the battler
 *           involved cancels the ATB charge
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _willCancelCooldownNoteChainingRule is set as last, and the
 *           only willCancelCooldown notetag is
 *           <satb willCancelCooldown event: 1>, then this notetag will cause
 *           the default willCancelCooldown parameter to be ignored and the
 *           common event with id 1 to be run when common events can be run
 *      9. didCoreATBBecomeFull suffix: entry
 *         - Sets additional events to happen right after the ATB value of the
 *           battler involved becomes full
 *         - suffix can be cfg, event or script
 *         - (Advanced)Please refer to Did Finish Input Functions in the event
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - E.g.:
 *           If _didCoreATBBecomeFullNoteChainingRule is set as last, and the
 *           only didCoreATBBecomeFull notetag is
 *           <satb didCoreATBBecomeFull event: 1>, then this notetag will
 *           cause the default didCoreATBBecomeFull parameter to be ignored
 *           and the common event with id 1 to be run when common events can
 *           be run
 *      10. didCoreATBBecomeNotFull suffix: entry
 *          - Sets additional events to happen right after the ATB value of
 *            the battler involved becomes not full
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to Did Finish Input Functions in the
 *            event module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - E.g.:
 *            If _didCoreATBBecomeNotFullNoteChainingRule is set as last, and
 *            the only didCoreATBBecomeNotFull notetag is
 *            <satb didCoreATBBecomeNotFull event: 1>, then this notetag will
 *            cause the default didCoreATBBecomeNotFull parameter to be
 *            ignored and the common event with id 1 to be run when common
 *            events can be run
 *      11. didChargeATBBecomeNotFull suffix: entry
 *          - Sets additional events to happen right after the ATB charge
 *            value of the battler involved becomes not full
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to Did Finish Input Functions in the event
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - E.g.:
 *            If _didChargeATBBecomeNotFullNoteChainingRule is set as last,
 *            and the only didChargeATBBecomeNotFull notetag is
 *            <satb didChargeATBBecomeNotFull event: 1>, then this notetag
 *            will cause the default didFinishInput parameter to be ignored
 *            and the common event with id 1 to be run when common events can
 *            be run
 *      12. didAddInputableActor suffix: entry
 *          - Sets additional events to happen right after the battler
 *            involved becomes able to input actions
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to Did Finish Input Functions in the event
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - E.g.:
 *            If _didAddInputableActorNoteChainingRule is set as last, and the
 *            only didAddInputableActor notetag is
 *            <satb didAddInputableActor event: 1>, then this notetag will
 *            cause the default didAddInputableActor parameter to be ignored
 *            and the common event with id 1 to be run when common events can
 *            be run
 *      (v0.12a+)12. didDecreaseCountdownStateTurn suffix: entry
 *          - Sets additional events to happen right after the battler
 *            involved has a countdown state with its turn counter decreased
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to
 *            Did Decrease Countdown State Turn Functions in the event module
 *            of the configuration plugin for using cfg or script suffixes, or
 *            the eval variant
 *          - E.g.:
 *            If _didDecreaseCountdownStateTurnNoteChainingRule is set as
 *            last, and the only didDecreaseCountdownStateTurn notetag is
 *            <satb didDecreaseCountdownStateTurn event: 1>, then this notetag
 *            will cause the default didDecreaseCountdownStateTurn parameter
 *            to be ignored and the common event with id 1 to be run when
 *            common events can be run
 *      (v0.12a+)13. didIncreaseCountdownStateTurn suffix: entry
 *          - Sets additional events to happen right after the battler
 *            involved has a countdown state with its turn counter increased
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to
 *            Did Increase Countdown State Turn Functions in the event module
 *            of the configuration plugin for using cfg or script suffixes, or
 *            the eval variant
 *          - E.g.:
 *            If _didIncreaseCountdownStateTurnNoteChainingRule is set as
 *            last, and the only didIncreaseCountdownStateTurn notetag is
 *            <satb didIncreaseCountdownStateTurn event: 1>, then this notetag
 *            will cause the default didIncreaseCountdownStateTurn parameter
 *            to be ignored and the common event with id 1 to be run when
 *            common events can be run
 *      (v0.15a+)14. didDelayCounterEnd suffix: entry
 *          - Sets additional events to happen right after the battler
 *            involved has the delay counter being empty and thus the action
 *            inputs unlocked
 *          - suffix can be cfg, event or script
 *          - (Advanced)Please refer to Did Delay Counter End Functions in the
 *            event module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - E.g.:
 *            If _didDelayCounterEndNoteChainingRule is set as last, and the
 *            only didDelayCounterEnd notetag is
 *            <satb didDelayCounterEnd event: 1>, then this notetag will cause
 *            the default didDelayCounterEnd parameter to be ignored and the
 *            common event with id 1 to be run when common events can be run
 *      (v0.10a+)Rate Module:
 *      1. coreATBRate suffix: entry
 *         - Sets the ATB fill rate without charge nor cooldown for the
 *           battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Core ATB Rate Functions in the rate
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _coreATBRateNoteChainingRule is set as *, and the only
 *           coreATBRate notetag is <satb coreATBRate var: 1>, then this
 *           notetag will set the ATB fill rate without charge nor cooldown
 *           for the battler involved to be multiplied by the value of the
 *           game variable with id 1
 *      2. chargeATBRate suffix: entry
 *         - Sets the ATB charge rate for the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Charge ATB Rate Functions in the rate
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _chargeATBRateNoteChainingRule is set as *, and the only
 *           chargeATBRate notetag is <satb chargeATBRate var: 1>, then this
 *           notetag will set the ATB charge rate for the battler involved to
 *           be multiplied by the value of the game variable with id 1
 *      3. cooldownATBRate suffix: entry
 *         - Sets the ATB cooldown rate for the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Cooldown ATB Rate Functions in the rate
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _cooldownATBRateNoteChainingRule is set as *, and the only
 *           cooldownATBRate notetag is <satb cooldownATBRate var: 1>, then
 *           this notetag will set the ATB cooldown rate for the battler
 *           involved to be multiplied by the value of the game variable with
 *           id 1
 *      (v0.07a+)Reset Module:
 *      1. resetATBVal suffix: entry
 *         - Sets the ATB value right after cooldown for the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Reset ATB Value Functions in the reset
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _resetATBValNoteChainingRule is set as *, and the only
 *           resetATBVal notetag is <satb resetATBVal var: 1>, then this
 *           notetag will set the ATB value right after cooldown of the
 *           battler involved to be multiplied by the value of the game
 *           variable with id 1
 *      (v0.08a+)Speed Module:
 *      1. actSpeed suffix: entry
 *         - Sets the action speed for the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Action Speed Functions in the speed
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _actSpeedNoteChainingRule is set as *, and the only actSpeed
 *           notetag is <satb actSpeed var: 1>, then this notetag will set the
 *           action speed of the battler involved to be multiplied by the
 *           value of the game variable with id 1
 *      (v0.09a+)Start Module:
 *      1. normStartATBVal suffix: entry
 *         - Sets the ATB value of the battle involved upon a normal battle
 *           start
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Normal Start ATB Value Functions in the
 *           start module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _normStartATBValNoteChainingRule is set as *, and the only
 *           normStartATBVal notetag is <satb normStartATBVal var: 1>, then
 *           this notetag will set the ATB value of the battler involved upon
 *           a normal battle turn to be multiplied by the value of the game
 *           variable with id 1
 *      2. preemptStartATBVal suffix: entry
 *         - Sets the ATB value of the battle involved upon a preemptive
 *           battle start
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Preemptive Start ATB Value Functions in
 *           the start module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _preemptStartATBValNoteChainingRule is set as *, and the only
 *           preemptStartATBVal notetag is <satb preemptStartATBVal var: 1>,
 *           then this notetag will set the ATB value of the battler involved
 *           upon a preemptive battle turn to be multiplied by the value of
 *           the game variable with id 1
 *      3. surpriseStartATBVal suffix: entry
 *         - Sets the ATB value of the battle involved upon a surprise battle
 *           start
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Surprise Start ATB Value Functions in
 *           the start module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be any Number
 *         - E.g.:
 *           If _surpriseStartATBValNoteChainingRule is set as *, and the only
 *           surpriseStartATBVal notetag is <satb surpriseStartATBVal var: 1>,
 *           then this notetag will set the ATB value of the battler involved
 *           upon a surprise battle turn to be multiplied by the value of the
 *           game variable with id 1
 *----------------------------------------------------------------------------
 *    # State Notetag contents:
 *      Core Module:
 *      1. coreActState suffix: entry
 *         - Sets the state to be an action state, which will have its turn
 *           updated when the battler having this state prepares to execute
 *           actions(this includes charging but not inputting actions) rather
 *           than upon turn end or action end
 *           (Reference tag: ACT_STATE)
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Act State Functions in the core module
 *           of the configuration plugin for using cfg or script suffixes, or
 *           the eval variant
 *         - The result of entry can be anything as it only checks whether
 *           it's truthy or falsy
 *         - If the end result chaining all entries are truthy, then the state
 *           will be an action state, otherwise it'll be a normal state
 *         - It's highly encouraged and recommended to use a plugin showing
 *           the icons of effective states to make action states more clear
 *         - E.g.:
 *           If _coreActStateNoteChainingRule is set as some, and the only
 *           coreActState notetag is <satb coreActState switch: 1> and
 *           <satb coreActState switch: 2>, then this notetag will set this
 *           state as an action state if at least either of the game switch
 *           with id 1 or 2 is on
 *           In the case of the guard state from the guard action, the state
 *           won't be erased even when the actor becomes inputable with the
 *           guard pose removed, thus having inconsistencies between the
 *           existence of the guard state and the absence of the guard pose
 *           (It's an intentional compromise between making the guard state
 *           and other action state useful enough by not removing them upon
 *           becoming inputable, and changing the pose upon becoming inputable
 *           to make it more clear that the actor becomes inputable)
 *      (v0.12a+)Countdown Module:
 *      1. countdown condSuffix unitSuffix intervalSuffix: condEntry, unitEntry, intervalEntry
 *         - Sets the state to be a countdown state if condEntry is truthy
 *         - A countdown state will have its turn count updated based on the
 *           interval specified by intervalEntry whose unit is specified by
 *           unitEntry
 *         - condEntry can be cfg, val, switch or script
 *         - unitEntry and intervalEntry can be cfg, val, var or script
 *         - (Advanced)Please refer to Countdown Condition Functions in the
 *           countdown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant for the condEntry
 *         - (Advanced)Please refer to Countdown Unit Functions in the
 *           countdown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant for the unitEntry
 *         - (Advanced)Please refer to Countdown Interval Functions in the
 *           countdown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant for the intervalEntry
 *         - The result of condEntry can be anything as it only checks whether
 *           it's truthy or falsy
 *         - The result of unitEntry must be either frame or sec, referring to
 *           setting the interval as the number of frames or seconds
 *           respectively
 *         - The regeneration effects will be ignored when a state's a
 *           countdown state
 *         - The result of intervalEntry can be any Number but with the
 *           following meaning:
 *           i. Positive - The state turn counter will decrease by 1 upon each
 *                         countdown interval
 *           i. Negative - The state turn counter will increase by 1 upon each
 *                         countdown interval
 *           i. 0 - The state turn counter will be frozen
 *         - Only notetags with a truthy condEntry can be effective
 *         - It's highly encouraged and recommended to enable the Event Module
 *           as well to make this notetag even more useful
 *         - E.g.:
 *           If _countdownNoteChainingRule is set as first, and the 1st
 *           countdown notetag is <satb countdown switch var cfg: 1, 2, CIX>,
 *           then this notetag will set this state as a countdown state with
 *           interval as specified by CIX whose unit's specified by the game
 *           variable with id 2 if the game switch with id 1 is on
 *----------------------------------------------------------------------------
 *    # (v0.14a+)Actor/Enemy Notetag contents:
 *      Order Module:
 *      1. continuousOrderSpriteOpacity suffix: entry
 *         - Sets the opacity of the continuous order sprite icon of the
 *           battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Opacity Functions in the order module
 *           of the configuration plugin for using cfg or script suffixes, or
 *           the eval variant
 *         - The result of entry can be any integer ranging from 0 to 255
 *           inclusive
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteOpacity notetag
 *           <satb continuousOrderSpriteOpacity val: 255> will set the opacity
 *           of the continuous order sprite icon of the battler involved to be
 *           255
 *      2. continuousOrderSpriteIconFolder suffix: entry
 *         - Sets the sheet folder path of the continuous order sprite icon of
 *           the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon Folder Functions in the order module
 *           of the configuration plugin for using cfg or script suffixes, or
 *           the eval variant
 *         - The result of entry can be any String
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconFolder notetag
 *           <satb continuousOrderSpriteIconFolder val: img/characters> will
 *           set the sheet folder path of the continuous order sprite icon of
 *           the battler involved to be character image folder
 *      3. continuousOrderSpriteIconFilename suffix: entry
 *         - Sets the sheet filename of the continuous order sprite icon of
 *           the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon Filename Functions in the order
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any String
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconFilename notetag
 *           <satb continuousOrderSpriteIconFilename val: Actor1> will set the
 *           sheet filename of the continuous order sprite icon of the battler
 *           involved to be Actor1
 *      4. continuousOrderSpriteIconHue suffix: entry
 *         - Sets the sheet hue of the continuous order sprite icon of the
 *           battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Continuous Order Sprite Hue Functions
 *           in the order module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be any integer ranging from 0 to 360
 *           inclusive
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconHue notetag
 *           <satb continuousOrderSpriteIconHue val: 0> will set the sheet hue
 *           of the continuous order sprite icon of the battler involved to be
 *           0
 *      5. continuousOrderSpriteIconSmooth suffix: entry
 *         - Sets the sheet smooth of the continuous order sprite icon of the
 *           battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Smooth Functions in the order module of
 *           the configuration plugin for using cfg or script suffixes, or the
 *           eval variant
 *         - The result of entry can be anything as it only checks whether
 *           it's truthy or falsy
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconSmooth notetag
 *           <satb continuousOrderSpriteIconSmooth val: false> will set the
 *           sheet smooth of the continuous order sprite icon of the battler
 *           involved to be false
 *      6. continuousOrderSpriteIconXCoor suffix: entry
 *         - Sets the sheet x coordinate of the continuous order sprite icon
 *           of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon X Coordinate Functions in the order
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any number ranging from 0 to the
 *           maximum x Coordinate supported by the icon sheet
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconXCoor notetag
 *           <satb continuousOrderSpriteIconXCoor val: 0> will select the icon
 *           in the 1st column from the sheet as the continuous order sprite
 *           icon of the battler involved
 *      7. continuousOrderSpriteIconYCoor suffix: entry
 *         - Sets the sheet y coordinate of the continuous order sprite icon
 *           of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon Y Coordinate Functions in the order
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any number ranging from 0 to the
 *           maximum x Coordinate supported by the icon sheet
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconYCoor notetag
 *           <satb continuousOrderSpriteIconYCoor val: 0> will select the icon
 *           in the 1st row from the sheet as the continuous order sprite
 *           icon of the battler involved
 *      8. continuousOrderSpriteIconSourceW suffix: entry
 *         - Sets the width of the continuous order sprite icon of the battler
 *           involved in the sheet file
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon Source Width Functions in the order
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any width matching the icon sheet
 *           width specifications
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconSourceW notetag
 *           <satb continuousOrderSpriteIconSourceW val: 48> sets the width of
 *           the continuous order sprite icon of the battler involved in the
 *           sheet file to be 48, provided that the width of each element in
 *           the sheet is indeed 48
 *      9. continuousOrderSpriteIconSourceH suffix: entry
 *         - Sets the height of the continuous order sprite icon of the
 *           battler involved in the sheet file
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to
 *           Continuous Order Sprite Icon Source Height Functions in the order
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any height matching the icon sheet
 *           height specifications
 *         - Only the 1st effective notetag will be used, and having any
 *           effective notetag will cause the default to be ignored
 *         - E.g.:
 *           The continuousOrderSpriteIconSourceH notetag
 *           <satb continuousOrderSpriteIconSourceH val: 48> sets the height
 *           of the continuous order sprite icon of the battler involved in
 *           the sheet file to be 48, provided that the height of each element
 *           in the sheet is indeed 48
 *      10. continuousOrderSpriteIconW suffix: entry
 *          - Sets the width of the continuous order sprite icon of the
 *            battler involved in the continuous order window
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Continuous Order Sprite Icon Width Functions in the order module
 *            of the configuration plugin for using cfg or script suffixes,
 *            or the eval variant
 *          - The result of entry can be any natural number
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The continuousOrderSpriteIconW notetag
 *            <satb continuousOrderSpriteIconW val: 30> sets the width of the
 *            continuous order sprite icon of the battler involved in the
 *            continuous order window to be 30
 *      11. continuousOrderSpriteIconH suffix: entry
 *          - Sets the height of the continuous order sprite icon of the
 *            battler involved in the continuous order window
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Continuous Order Sprite Icon Height Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any natural number
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The continuousOrderSpriteIconH notetag
 *            <satb continuousOrderSpriteIconH val: 30> sets the height of the
 *            continuous order sprite icon of the battler involved in the
 *            continuous order window to be 30
 *      12. continuousOrderSpriteY suffix: entry
 *          - Sets the y position of the continuous order sprite icon of the
 *            battler involved in the continuous order window
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to Continuous Order Sprite Y Functions in
 *            the order module of the configuration plugin for using cfg or
 *            script suffixes, or the eval variant
 *          - The result of entry can be any number
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The continuousOrderSpriteY notetag
 *            <satb continuousOrderSpriteY>
 *            return this.isActor() ? 50 : 0;
 *            </satb continuousOrderSpriteY>
 *            sets the y position of the continuous order sprite icon of the
 *            battler involved in the continuous order window to be 0 and 50
 *            if it's an actor and not respectively
 *      13. discreteOrderSpriteTargetOpacity suffix: entry
 *          - Sets the opacity of the discrete order sprite icon of the
 *            battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Target Opacity Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any integer ranging from 0 to 255
 *            inclusive
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteTargetOpacity notetag
 *            <satb discreteOrderSpriteTargetOpacity val: 255> will set the
 *            opacity of the discrete order sprite icon of the battler
 *            involved to be 255
 *      14. discreteOrderSpriteIconFolder suffix: entry
 *          - Sets the sheet folder path of the discrete order sprite icon of
 *            the battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Folder Functions in the order module
 *            of the configuration plugin for using cfg or script suffixes, or
 *            the eval variant
 *          - The result of entry can be any String
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconFolder notetag
 *            <satb discreteOrderSpriteIconFolder val: img/characters> will
 *            set the sheet folder path of the discrete order sprite icon of
 *            the battler involved to be character image folder
 *      15. discreteOrderSpriteIconFilename suffix: entry
 *          - Sets the sheet filename of the discrete order sprite icon of
 *            the battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Filename Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any String
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconFilename notetag
 *            <satb discreteOrderSpriteIconFilename val: Actor1> will set the
 *            sheet filename of the discrete order sprite icon of the battler
 *            involved to be Actor1
 *      16. discreteOrderSpriteIconHue suffix: entry
 *          - Sets the sheet hue of the discrete order sprite icon of the
 *            battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to Discrete Order Sprite Hue Functions in
 *            the order module of the configuration plugin for using cfg or
 *            script suffixes, or the eval variant
 *          - The result of entry can be any integer ranging from 0 to 360
 *            inclusive
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconHue notetag
 *            <satb discreteOrderSpriteIconHue val: 0> will set the sheet hue
 *            of the discrete order sprite icon of the battler involved to be
 *            0
 *      17. discreteOrderSpriteIconSmooth suffix: entry
 *          - Sets the sheet smooth of the discrete order sprite icon of the
 *            battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to Discrete Order Sprite Smooth Functions
 *            in the order module of the configuration plugin for using cfg or
 *            script suffixes, or the eval variant
 *          - The result of entry can be anything as it only checks whether
 *            it's truthy or falsy
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconSmooth notetag
 *            <satb discreteOrderSpriteIconSmooth val: false> will set the
 *            sheet smooth of the discrete order sprite icon of the battler
 *            involved to be false
 *      18. discreteOrderSpriteIconXCoor suffix: entry
 *          - Sets the sheet x coordinate of the discrete order sprite icon of
 *            the battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon X Coordinate Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any number ranging from 0 to the
 *            maximum x Coordinate supported by the icon sheet
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconXCoor notetag
 *            <satb discreteOrderSpriteIconXCoor val: 0> will select the icon
 *            in the 1st column from the sheet as the discrete order sprite
 *            icon of the battler involved
 *      19. discreteOrderSpriteIconYCoor suffix: entry
 *          - Sets the sheet y coordinate of the discrete order sprite icon
 *            of the battler involved
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Y Coordinate Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any number ranging from 0 to the
 *            maximum x Coordinate supported by the icon sheet
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconYCoor notetag
 *            <satb discreteOrderSpriteIconYCoor val: 0> will select the icon
 *            in the 1st row from the sheet as the discrete order sprite icon
 *            of the battler involved
 *      20. discreteOrderSpriteIconSourceW suffix: entry
 *          - Sets the width of the discrete order sprite icon of the battler
 *            involved in the sheet file
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Source Width Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any width matching the icon sheet
 *            width specifications
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconSourceW notetag
 *            <satb discreteOrderSpriteIconSourceW val: 48> sets the width of
 *            the discrete order sprite icon of the battler involved in the
 *            sheet file to be 48, provided that the width of each element in
 *            the sheet is indeed 48
 *      21. discreteOrderSpriteIconSourceH suffix: entry
 *          - Sets the height of the discrete order sprite icon of the battler
 *            involved in the sheet file
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Source Height Functions in the order
 *            module of the configuration plugin for using cfg or script
 *            suffixes, or the eval variant
 *          - The result of entry can be any height matching the icon sheet
 *            height specifications
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconSourceH notetag
 *            <satb discreteOrderSpriteIconSourceH val: 48> sets the height
 *            of the discrete order sprite icon of the battler involved in
 *            the sheet file to be 48, provided that the height of each
 *            element in the sheet is indeed 48
 *      22. discreteOrderSpriteIconW suffix: entry
 *          - Sets the width of the discrete order sprite icon of the battler
 *            involved in the discrete order window
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Width Functions in the order module
 *            of the configuration plugin for using cfg or script suffixes, or
 *            the eval variant
 *          - The result of entry can be any natural number
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconW notetag
 *            <satb discreteOrderSpriteIconW val: 30> sets the width of the
 *            discrete order sprite icon of the battler involved in the
 *            discrete order window to be 30
 *      23. discreteOrderSpriteIconH suffix: entry
 *          - Sets the height of the discrete order sprite icon of the battler
 *            involved in the discrete order window
 *          - suffix can be cfg, val, var or script
 *          - (Advanced)Please refer to
 *            Discrete Order Sprite Icon Height Functions in the order module
 *            of the configuration plugin for using cfg or script suffixes, or
 *            the eval variant
 *          - The result of entry can be any natural number
 *          - Only the 1st effective notetag will be used, and having any
 *            effective notetag will cause the default to be ignored
 *          - E.g.:
 *            The discreteOrderSpriteIconH notetag
 *            <satb discreteOrderSpriteIconH val: 30> sets the height of the
 *            discrete order sprite icon of the battler involved in the
 *            discrete order window to be 30
 *============================================================================
 *    ## Script Call Info
 *----------------------------------------------------------------------------
 *    # (Advanced)Configuration manipulations
 *      Core Module:
 *      1. $gameSystem.satbParamFunc(param)
 *         - Returns the function of param listed in the parameter plugin
 *         - The name of param mustn't start with an underscore
 *         - Please check the configuration counterparts in the configuration
 *           plugin to know how to pass the param function arguments with
 *           what contexts
 *         - E.g.:
 *           $gameSystem.satbParamFunc("isCoreEnabled")() will return whether
 *           this plugin's enabled
 *      2. $gameSystem.satbParam(param)
 *         - Returns the stored value of param listed in the parameter plugin
 *           or their configuration counterparts in the configuration plugin
 *           if such counterparts exist
 *         - E.g.:
 *           $gameSystem.satbParam("IsCoreEnabled") will return the String
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *           $gameSystem.satbParam("_isNoteCached") will return the Boolean
 *           value indicating whether the effective notetag lists and values
 *           will be cached
 *      3. $gameSystem.setSATBParam(param, funcContent, switchVar, id, factors)
 *         - Sets the stored value of param listed in the parameter plugin or
 *           their configuration counterpart in the configuration plugin as
 *           funcContents, which is the String contents of a function
 *         - If the name of the parameter starts with an underscore, then that
 *           parameter doesn't use functions so funcContent becomes the raw
 *           parameter value that's used directly rather than being function
 *           contents
 *         - (Advanced)switchVar, id and factors are all optional, and should
 *           only be used if the parameter changes from using some
 *           switches/variables to using some others or from not using those
 *           to using those or vice versa
 *         - (Advanced)If funcContent uses switches, switchVar must be
 *           "switch", id must be the switch id and factors must be the list
 *           of types of data using NOTEX, unless all those switches involved
 *           are explicitly written in the form of $gameSwitches.value(x),
 *           where x is a Number literal instead of a variable, or
 *           _isAlwaysRecacheAllSwitchVars is ON
 *           (Reference tag: SWITCH_VAR)
 *         - (Advanced)If funcContent uses variables, switchVar must be "var",
 *           id must be the variable id and factors must be the list of types
 *           of data using NOTEX, unless all those variables involved are
 *           explicitly written in the form of $gameVariables.value(x), where
 *           x is a Number literal instead of a variable, or
 *           _isAlwaysRecacheAllSwitchVars is ON
 *           (Reference tag: SWITCH_VAR)
 *         - (Advanced)factors being an empty Array means the switch/variable
 *           id becomes no longer used by any NOTEX of the specified type
 *         - (Advanced)To ensure this script call won't be too hard to use in
 *           most cases, those changing from using a switch/variable to using
 *           another one will have to call this script call twice, to
 *           register a new switch/variable and deregister an old one
 *           respectively
 *         - E.g.:
 *           $gameSystem.setSATBParam("IsCoreEnabled", "return false;") will
 *           set the stored value of parameter IsCoreEnabled shown on the
 *           parameter plugin or its configuration counterpart in the
 *           configuration plugin as "return false;", causing corresponding
 *           function to always return false, thus always disabling the plugin
 *         - Such function content changes will be saved in save files
 *      4. $gameSystem.satbNote(type, NOTEX)
 *         - Basically the same as $gameSystem.satbParam(param), except that
 *           this script call applies to notetag values of NOTEX of the
 *           notetag type found in the configuration plugin
 *         - E.g.:
 *           $gameSystem.satbNote("coreMax", "CMATB_MAX") will return the
 *           String contents of function CATBM_MAX of the coreMax notetag type
 *      5. $gameSystem.setSATBNote(type, NOTEX, funcContent, switchVar, id, factors)
 *         - Basically the same as
 *           $gameSystem.setSATBParam(param, funcContent, switchVar, id, factors),
 *           except that this script call applies to notetag values of NOTEX
 *           of the notetag type found in the configuration plugin
 *         - E.g.:
 *           $gameSystem.satbNote("coreMax", "CMATB_MAX", "return $gameVariables.value(1);", "var", 1, ["states"])
 *           will set the function content of CMATB_MAX as
 *           return $gameVariables.value(1);, with changes of the value of the
 *           variable with id 1 being notified to the coreMax notetags as long
 *           as only coreMax notetags in states data uses this variable
 *    # (Advanced)Actor/Enemy/Class/Weapon/Armor/State/Skill notetag manipulations
 *      All meta.satb changes can be saved if DoubleX RMMV Dynamic Data is
 *      used
 *      Core Module:
 *      1. meta.satb.note
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *           2. coreActState(corresponds to notetag content
 *                          coreActState suffix: entry)
 *           (v0.04a+)Bar Module -
 *           1. isBarVisible(corresponds to notetag content
 *                          isBarVisible suffix: entry)
 *           (v0.16a+)Action Module -
 *           1. actCost(corresponds to notetag content actCost suffix: entry)
 *           2. actMode(corresponds to notetag content actMode suffix: entry)
 *           (v0.04a+)Charge Module -
 *           1. chargeMax(corresponds to notetag content
 *                       chargeMax suffix: entry)
 *           2. isPayBeforeExecCharge(corresponds to notetag content
 *                                   isPayBeforeExecCharge suffix: entry)
 *           3. canCancelCharge(corresponds to notetag content
 *                             canCancelCharge suffix: entry)
 *           4. canForceCharge(corresponds to notetag content
 *                            canForceCharge suffix: entry)
 *           (v0.05a+)Cooldown Module -
 *           1.cooldownMax(corresponds to notetag content
 *                        cooldownMax suffix: entry)
 *           2.canCancelCooldown(corresponds to notetag content
 *                              canCancelCooldown suffix: entry)
 *           (v0.12a+)Countdown Module:
 *           1. countdown(corresponds to notetag content
 *                       countdown condSuffix unitSuffix intervalSuffix: condEntry, unitEntry, intervalEntry)
 *           (v0.15a+)Delay Module:
 *           1. delay(corresponds to notetag content delay suffix: entry)
 *           (v0.06a+)Event Module:
 *           1. didFinishInput(corresponds to notetag content
 *                            didFinishInput suffix: entry)
 *           2. didBecomeActable(corresponds to notetag content
 *                              didBecomeActable suffix: entry)
 *           3. didSetActTimes(corresponds to notetag content
 *                            didSetActTimes suffix: entry)
 *            (v0.16a+)4. didSetMaxActTimes(related to didSetMaxActTimes,
 *                        _didSetMaxActTimesNoteChainingRule and
 *                        _didSetMaxActTimesNotePriorities)
 *            5. didStartATBFill(related to didStartATBFill,
 *               _didStartATBFillNoteChainingRule and
 *               _didStartATBFillNotePriorities)
 *            6. willCancelCharge(related to willCancelCharge,
 *               _willCancelChargeNoteChainingRule and
 *               _delayNotePriorities)
 *            7. didStartForceCharge(related to didStartForceCharge,
 *               _didStartForceChargeNoteChainingRule and
 *               _didStartForceChargeNotePriorities)
 *            8. willCancelCooldown(related to willCancelCooldown,
 *               _willCancelCooldownNoteChainingRule and
 *               _willCancelCooldownNotePriorities)
 *            9. didCoreATBBecomeFull(related to didCoreATBBecomeFull,
 *               _didCoreATBBecomeFullNoteChainingRule and
 *               _didCoreATBBecomeFullNotePriorities)
 *            10. didCoreATBBecomeNotFull(related to didCoreATBBecomeNotFull,
 *                _didCoreATBBecomeNotFullNoteChainingRule and
 *                _didCoreATBBecomeNotFullNotePriorities)
 *            11. didChargeATBBecomeNotFull(related to didChargeATBBecomeNotFull,
 *                _didChargeATBBecomeNotFullNoteChainingRule and
 *                _didChargeATBBecomeNotFullNotePriorities)
 *            12. didAddInputableActor(related to didAddInputableActor,
 *                _didAddInputableActorNoteChainingRule and
 *                _didAddInputableActorNotePriorities)
 *           (v0.12a+)12. didDecreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didDecreaseCountdownStateTurn suffix: entry)
 *           (v0.12a+)13. didIncreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didIncreaseCountdownStateTurn suffix: entry)
 *           (v0.15a+)14. didDelayCounterEnd(corresponds to notetag content
 *                            didDelayCounterEnd suffix: entry)
 *           (v0.14a+)Order Module:
 *           1. continuousOrderSpriteOpacity(corresponds to notetag content
 *              continuousOrderSpriteOpacity suffix: entry)
 *           2. continuousOrderSpriteIconFolder(corresponds to notetag content
 *              continuousOrderSpriteIconFolder suffix: entry)
 *           3. continuousOrderSpriteIconFilename(corresponds to notetag
 *              content continuousOrderSpriteIconFilename suffix: entry)
 *           4. continuousOrderSpriteIconHue(corresponds to notetag content
 *              continuousOrderSpriteIconHue suffix: entry)
 *           5. continuousOrderSpriteIconSmooth(corresponds to notetag content
 *              continuousOrderSpriteIconSmooth suffix: entry)
 *           6. continuousOrderSpriteIconXCoor(corresponds to notetag content
 *              continuousOrderSpriteIconXCoor suffix: entry)
 *           7. continuousOrderSpriteIconYCoor(corresponds to notetag content
 *              continuousOrderSpriteIconYCoor suffix: entry)
 *           8. continuousOrderSpriteIconSourceW(corresponds to notetag
 *              content continuousOrderSpriteIconSourceW suffix: entry)
 *           9. continuousOrderSpriteIconSourceH(corresponds to notetag
 *              content continuousOrderSpriteIconSourceH suffix: entry)
 *           10. continuousOrderSpriteIconW(corresponds to notetag content
 *               continuousOrderSpriteIconW suffix: entry)
 *           11. continuousOrderSpriteIconH(corresponds to notetag content
 *               continuousOrderSpriteIconH suffix: entry)
 *           12. continuousOrderSpriteY(corresponds to notetag content
 *               continuousOrderSpriteY suffix: entry)
 *           13. discreteOrderSpriteTargetOpacity(corresponds to notetag
 *               content discreteOrderSpriteTargetOpacity suffix: entry)
 *           14. discreteOrderSpriteIconFolder(corresponds to notetag content
 *               discreteOrderSpriteIconFolder suffix: entry)
 *           15. discreteOrderSpriteIconFilename(corresponds to notetag content
 *               discreteOrderSpriteIconFilename suffix: entry)
 *           16. discreteOrderSpriteIconHue(corresponds to notetag content
 *               discreteOrderSpriteIconHue suffix: entry)
 *           17. discreteOrderSpriteIconSmooth(corresponds to notetag content
 *               discreteOrderSpriteIconSmooth suffix: entry)
 *           18. discreteOrderSpriteIconXCoor(corresponds to notetag content
 *               discreteOrderSpriteIconXCoor suffix: entry)
 *           19. discreteOrderSpriteIconYCoor(corresponds to notetag content
 *               discreteOrderSpriteIconYCoor suffix: entry)
 *           20. discreteOrderSpriteIconSourceW(corresponds to notetag content
 *               discreteOrderSpriteIconSourceW suffix: entry)
 *           21. discreteOrderSpriteIconSourceH(corresponds to notetag content
 *               discreteOrderSpriteIconSourceH suffix: entry)
 *           22. discreteOrderSpriteIconW(corresponds to notetag content
 *               discreteOrderSpriteIconW suffix: entry)
 *           23. discreteOrderSpriteIconH(corresponds to notetag content
 *               discreteOrderSpriteIconH suffix: entry)
 *           (v0.10a+)Rate Module:
 *           1. coreATBRate(corresponds to notetag content
 *                         coreATBRate suffix: entry)
 *           2. chargeATBRate(corresponds to notetag content
 *                           chargeATBRate suffix: entry)
 *           3. cooldownATBRate(corresponds to notetag content
 *                             cooldownATBRate suffix: entry)
 *           (v0.07a+)Reset Module:
 *           1. resetATBVal(corresponds to notetag content
 *                         resetATBVal suffix: entry)
 *           (v0.08a+)Speed Module:
 *           1. actSpeed(corresponds to notetag content
 *                      actSpeed suffix: entry)
 *           (v0.09a+)Start Module:
 *           1. normStartATBVal(corresponds to notetag content
 *                             normStartATBVal suffix: entry)
 *           2. preemptStartATBVal(corresponds to notetag content
 *                                preemptStartATBVal suffix: entry)
 *           3. surpriseStartATBVal(corresponds to notetag content
 *                                 surpriseStartATBVal suffix: entry)
 *         - Returns the Array of Objects in this form:
 *           { suffixi: suffixi, entryi: entryi }
 *           Which corresponds to <satb note suffixi: entryi>
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - E.g.:
 *           $dataWeapons[3].meta.satb.coreMax will return the Array of Object
 *           [{ suffix: "var", entry: "1" }] if the effective notetag of
 *           weapon with id 3 is <satb coreMax var: 1>
 *      2.(VERY ADVANCED) meta.satb.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is the same as that of meta.satb.note
 *         - Sets the notetag to be the same as <satb note suffixi: entryi>
 *         - YOU'RE HIGHLY ENCOURAGED AND RECOMMENDED NOT TO USE THIS SCRIPT
 *           CALL UNLESS YOU'VE AT LEAST DECENT RMMV PLUGIN DEVELOPMENT
 *           PROCIFIENCY AS YOU'VE TO HAVE A SOLID UNDERSTANDING ON HOW GAME
 *           VARIABLES AND SWITCHES CHANGE DETECTIONS IN THIS PLUGIN WORKS IN
 *           DETAILS(NOT DETECTING SUCH CHANGES CAN PROPERLY LEAD TO THE
 *           NOTETAG CACHES FAILING TO INVALIDATE PROPERLY, THUS RETURNING
 *           STALE CACHED RESULTS AND CAUSING THE NOTETAG VALUES TO BE WRONG)
 *         - E.g.:
 *           $dataArmors[4].meta.satb.coreMax =
 *           [{ suffix: "var", entry: "2" }] will set the coreMax notetag of
 *           the armor with id 4 to be the same as <satb coreMax var: 1, 2>
 *         - If the notetag uses switches or variables(either via the
 *           switch/var suffix or via getting switch/variable values in
 *           the function called by the notetag), you must update
 *           $gameSystem._satb.switchIds or $gameSystem._satb.varIds manually
 *           $gameSystem._satb.switchIds is the same object as _SATB.switchIds
 *           in DataManager
 *           $gameSystem._satb.varIds is the same object as _SATB.varIds in
 *           DataManager
 *           This applies only with _isAlwaysRecacheAllSwitchVars being off
 *           (You can check the method _SATB._UPDATE_IDS in DataManager)
 *         - As using DoubleX RMMV Dynamic Data will probably increase the
 *           save file size drastically, which is unlikely to be favored by
 *           players playing games using this plugin, I've decided not to
 *           develop a much more convenient script call to facilitate changing
 *           which data have what notetags, to ensure that you'll only do so
 *           when absolutely necessary. THIS IS A CONSCIOUS PLUGIN DESIGN
 *           DECISION THAT AIMS TO BALANCE FOR THE PLAYER NEEDS AND EMPHASIZE
 *           THE PROBABLE HARMS OF CHANGING DATA ON THE FLY(Unless you're
 *           already doing so for some other totally different reasons, in
 *           this case you're likely already good enough to use this primirive
 *           script call while still really knowing what you're truly doing)
 *    # Battle manipulations
 *      Core Module:
 *      1. BattleManager.isSATB()
 *         - Returns whether this plugin's enabled
 *         - (Advanced)It's supposed to be Nullipotent
 *      2.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockAct(multiplier)
 *         - Multiplies the battle turn clock action counter by multiplier
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      3.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockFrame(multiplier)
 *         - Multiplies the battle turn clock frame counter by multiplier
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      4.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockSec(multiplier)
 *         - Multiplies the battle turn clock second counter by multiplier
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      5.(v0.04a+) SATBTurnManager.setCoreTurnClockAct(act)
 *         - Sets the battle turn clock action counter to be act
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      6.(v0.04a+) SATBTurnManager.setCoreTurnClockFrame(frame)
 *         - Sets the battle turn clock frame counter to be frame
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      7.(v0.04a+) SATBTurnManager.setCoreTurnClockSec(sec)
 *         - Sets the battle turn clock second counter to be sec
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      8.(v0.04a+) SATBTurnManager.addCoreTurnClockAct(increment)
 *         - Adds the battle turn clock action counter by increment
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      9.(v0.04a+) SATBTurnManager.addCoreTurnClockFrame(increment)
 *         - Adds the battle turn clock frame counter by increment
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      10.(v0.04a+) SATBTurnManager.addCoreTurnClockSec(increment)
 *         - Adds the battle turn clock second counter by increment
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      11. (v0.04a+) SATBTurnManager.coreTurnActClock()
 *          - Returns the number of actions executed in the current turn
 *      12. (v0.04a+) SATBTurnManager.coreTurnFrameClock()
 *          - Returns the number of frames elapsed in the current battle turn
 *      13. (v0.04a+) SATBTurnManager.coreTurnSecClock()
 *          - Returns the number of seconds elapsed in the current turn
 *      14. (v0.04a+) SATBTurnManager.coreTurnActClockMax()
 *          - Returns the number of actions constituting the current turn
 *      15. (v0.04a+) SATBTurnManager.coreTurnFrameClockMax()
 *          - Returns the number of frames constituting the current turn
 *      16. (v0.04a+) SATBTurnManager.coreTurnSecClockMax()
 *          - Returns the number of seconds constituting the current turn
 *      (v0.11a+)Turn Module:
 *      1. SATBTurnManager.curTurnClockSpeed()
 *         - Returns the current turn clock unit counter increment multiplier
 *      2. SATBTurnManager.coreTurnActClockSpeed()
 *         - Returns the turn clock action unit counter increment multiplier
 *      3. SATBTurnManager.coreTurnFrameClockSpeed()
 *         - Returns the turn clock frame unit counter increment multiplier
 *      4. SATBTurnManager.coreTurnSecClockSpeed()
 *         - Returns the turn clock second unit counter increment multiplier
 *      5. SATBTurnManager.curTurnClock()
 *         - Returns the current turn clock unit counter
 *      6. SATBTurnManager.curTurnClockMax()
 *         - Returns the current turn clock unit maximum counter
 *      7. SATBTurnManager.setCurTurnClockSpeed(multiplier)
 *         - Sets the current turn clock unit counter increment multiplier as
 *           multiplier
 *         - The battle turn number will never decrease due to decreasing the
 *           battle turn clock counter to become negative
 *         - (Advanced)multiplier is supposed to be an Integer
 *      8. SATBTurnManager.setCoreTurnClockActSpeed(multiplier)
 *         - Sets the turn clock action unit counter increment multiplier as
 *           multiplier
 *         - The battle turn number will never decrease due to decreasing the
 *           battle turn clock counter to become negative
 *         - (Advanced)multiplier is supposed to be an Integer
 *      9. SATBTurnManager.setCoreTurnClockFrameSpeed(multiplier)
 *         - Sets the turn clock frame unit counter increment multiplier as
 *           multiplier
 *         - The battle turn number will never decrease due to decreasing the
 *           battle turn clock counter to become negative
 *         - (Advanced)multiplier is supposed to be an Integer
 *      10. SATBTurnManager.setCoreTurnClockSecSpeed(multiplier)
 *         - Sets the turn clock second unit counter increment multiplier as
 *           multiplier
 *         - The battle turn number will never decrease due to decreasing the
 *           battle turn clock counter to become negative
 *         - (Advanced)multiplier is supposed to be a Number
 *    # Battler manipulations
 *      Core Module:
 *      1. setCoreSATB(val)
 *         - Sets the new current ATB value of the battler involved as val
 *         - (Advanced)val is supposed to be a Number
 *         - E.g.:
 *           $gameParty.members()[1].setCoreSATB(0) will set the new current
 *           ATB value of the 2nd party member as 0
 *         - (Advanced)It's supposed to be Idempotent
 *      2. setCoreSATBProportion(proportion)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the proportion of the new current ATB value of the
 *           battler involved relative to the maximum counterpart as
 *           proportion
 *         - E.g.:
 *           $gameParty.members()[1].setCoreSATBProportion(1) will set the new
 *           current ATB value of the 2nd party member as 100% of the max ATB
 *      3. addCoreSATB(increment)
 *         - Adds the current ATB value of the battler involved by increment
 *         - (Advanced)increment is supposed to be a Number
 *         - E.g.:
 *           $gameTroop.members()[0].addCoreSATB(-100) will subtract the
 *           current ATB value of the 1st troop member by 100
 *      4. addCoreSATBProportion(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one adds the current ATB value of the battler involved by
 *           the amount in which its proportion relative to the maximum
 *           counterpart is proportion
 *         - E.g.:
 *           $gameTroop.members()[0].addCoreSATBProportion(-1) will subtract
 *           the current ATB value of the 1st troop member by 100% of max ATB
 *      5. multiplyCoreSATB(multiplier)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one multiplies the current ATB value of the battler involved
 *           by multiplier
 *      6.(v0.01a+) fillUpCoreSATB()
 *         - The same as the script call setCoreSATB(val) except that this one
 *           uses the maximum ATB value of the battler instead of val
 *      7. clearCoreSATB()
 *         - Sets the new current ATB value of the battler involved as 0 if
 *           it was positive(otherwise it'll remain unchanged)
 *         - E.g.:
 *           $gameTroop.deadMembers()[1].clearCoreSATB() won't have any effect
 *           if the current ATB value of the 2nd dead troop member is negative
 *         - (Advanced)It's supposed to be Idempotent
 *      8. setSATBActTimes(actTimes)
 *         - Sets the number of virtual action slots of the battler involved
 *           as actTimes
 *         - If the number of virtual action slots becomes greater than 0,
 *           then the ATB value of that battler will immediately become full
 *         - If the number of virtual action slots becomes not greater than 0,
 *           then the ATB value of that battler will be minused by an
 *           extremely small decrement to ensure that it won't be full
 *         - Bear in mind that the number of virtual action slots will be
 *           reduced by 1(without changes from the Action Module) when a
 *           battler just finished executing an action
 *         - (v0.16a+)If the action mode is discrete and the maximum number of
 *           virtual action slot is smaller than actTimes, the former will
 *           become actTimes
 *         - (Advanced)actTimes is supposed to be a nonnegative integer
 *         - E.g.:
 *           $gameActors.actor(1).setSATBActTimes(2) will set the number of
 *           virtual action slot of the game actor with id 1 as 2
 *           The ATB value of that actor will immediately become full
 *         - (Advanced)It's supposed to be Idempotent
 *      9. addSATBActTimes(increment)
 *         - Adds the number of virtual action slots of the battler involved
 *           by increment
 *         - Otherwise it's the same as the script call
 *           setSATBActTimes(actTimes)
 *         - The resulting number virtual action slots will never be negative
 *         - (Advanced)increment is supposed to be an Integer
 *         - (Advanced)This script call isn't supposed to be idempotent
 *      10. multiplySATBActTimes(multiplier)
 *          - The same as the script call addSATBActTimes(increment) except
 *            that this one multiplies the number of virtual action slots of
 *            the battler involved by multiplier
 *         - (Advanced)multiplier is supposed to be an nonnegative Number
 *      11.(v0.03a+) satbActTimes()
 *          - Returns the current number of virtual action slots of the
 *            battler involved
 *          - (Advanced)It's supposed to return a nonnegative integer
 *          - E.g.:
 *            $gameTroop.members(0).satbActTimes() will return the current
 *            number of virtual action slots of the 1st troop member
 *      12.(v0.03a+) canMakeSATBCmds()
 *          - Returns the battler involved can input, charge or execute
 *            actions
 *          - E.g.:
 *            $gameTroop.aliveMembers(0).canMakeSATBCmds() will return whether
 *            the 1st alive troop member can input, charge or execute actions
 *      13. coreSATB()
 *          - Returns the current ATB value of the battler involved
 *          - (Advanced)It's supposed to return a Number
 *          - E.g.:
 *            $gameActors.actor(0).coreSATB() will return the current value
 *            of the 1st actor
 *          - (Advanced)It's supposed to be Nullipotent
 *      14. coreMaxSATB()
 *          - Returns the maximum ATB value of the battler involved
 *          - (Advanced)It's supposed to return a positive number
 *          - E.g.:
 *            $gameParty.aliveMembers()[0].coreMaxSATB() will return the
 *            maximum value of the 1st alive party member
 *          - (Advanced)Using this script call might recache the return value
 *          - (Advanced)It's supposed to be Nullipotent other than possibly
 *            recaching the return value
 *      15.(v0.01a+) coreSATBProportion()
 *          - The same as the result of the script call coreSATB() divided by
 *            the result of the script call coreMaxSATB()
 *          - (Advanced)This script call ensures that integer division won't
 *            be used
 *      16.(v0.05a+) isSATBFill()
 *          - Checks whether the battler invovled's not charging skills/itens
 *            nor cooling down
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBFill() will return whether
 *           the 2nd alive party member's not charging skills/itens nor
 *           cooling down
 *      17. (Advanced)raiseAllSATBNoteChangeFactors()
 *          - Applies the script call
 *            raiseSATBNoteChangeFactors(note, factors) to all notes
 *          - You should probably use refresh() instead of this script call as
 *            refresh() will have all the effects this script call has, and
 *            also immediately recache values that are no longer valid
 *      18. (Advanced)raiseSATBNoteChangeFactors(note, factors)
 *         - Notifies that the notetag note might need to be recached due to
 *           potential changes in factors factors
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *           2. coreActState(corresponds to notetag content
 *                          coreActState suffix: entry)
 *           (v0.04a+)Bar Module -
 *           1. isBarVisible(corresponds to notetag content
 *                          isBarVisible suffix: entry)
 *           (v0.16a+)Action Module -
 *           1. actCost(corresponds to notetag content actCost suffix: entry)
 *           2. actMode(corresponds to notetag content actMode suffix: entry)
 *           (v0.04a+)Charge Module -
 *           1. chargeMax(corresponds to notetag content
 *                       chargeMax suffix: entry)
 *           2. isPayBeforeExecCharge(corresponds to notetag content
 *                                   isPayBeforeExecCharge suffix: entry)
 *           3. canCancelCharge(corresponds to notetag content
 *                             canCancelCharge suffix: entry)
 *           4. canForceCharge(corresponds to notetag content
 *                            canForceCharge suffix: entry)
 *           (v0.05a+)Cooldown Module -
 *           1.cooldownMax(corresponds to notetag content
 *                        cooldownMax suffix: entry)
 *           2.canCancelCooldown(corresponds to notetag content
 *                              canCancelCooldown suffix: entry)
 *           (v0.12a+)Countdown Module:
 *           1. countdown(corresponds to notetag content
 *                       countdown condSuffix unitSuffix intervalSuffix: condEntry, unitEntry, intervalEntry)
 *           (v0.15a+)Delay Module:
 *           1. delay(corresponds to notetag content delay suffix: entry)
 *           (v0.06a+)Event Module:
 *           1. didFinishInput(corresponds to notetag content
 *                            didFinishInput suffix: entry)
 *           2. didBecomeActable(corresponds to notetag content
 *                              didBecomeActable suffix: entry)
 *           3. didSetActTimes(corresponds to notetag content
 *                            didSetActTimes suffix: entry)
 *           (v0.16a+)4. didSetMaxActTimes(related to didSetMaxActTimes,
 *                       _didSetMaxActTimesNoteChainingRule and
 *                       _didSetMaxActTimesNotePriorities)
 *           5. didStartATBFill(related to didStartATBFill,
 *              _didStartATBFillNoteChainingRule and
 *              _didStartATBFillNotePriorities)
 *           6. willCancelCharge(related to willCancelCharge,
 *              _willCancelChargeNoteChainingRule and
 *              _delayNotePriorities)
 *           7. didStartForceCharge(related to didStartForceCharge,
 *              _didStartForceChargeNoteChainingRule and
 *              _didStartForceChargeNotePriorities)
 *           8. willCancelCooldown(related to willCancelCooldown,
 *              _willCancelCooldownNoteChainingRule and
 *              _willCancelCooldownNotePriorities)
 *           9. didCoreATBBecomeFull(related to didCoreATBBecomeFull,
 *              _didCoreATBBecomeFullNoteChainingRule and
 *              _didCoreATBBecomeFullNotePriorities)
 *           10. didCoreATBBecomeNotFull(related to didCoreATBBecomeNotFull,
 *               _didCoreATBBecomeNotFullNoteChainingRule and
 *               _didCoreATBBecomeNotFullNotePriorities)
 *           11. didChargeATBBecomeNotFull(related to
 *               didChargeATBBecomeNotFull,
 *               _didChargeATBBecomeNotFullNoteChainingRule and
 *               _didChargeATBBecomeNotFullNotePriorities)
 *           12. didAddInputableActor(related to didAddInputableActor,
 *               _didAddInputableActorNoteChainingRule and
 *               _didAddInputableActorNotePriorities)
 *           (v0.12a+)12. didDecreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didDecreaseCountdownStateTurn suffix: entry)
 *           (v0.12a+)13. didIncreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didIncreaseCountdownStateTurn suffix: entry)
 *           (v0.15a+)14. didDelayCounterEnd(corresponds to notetag content
 *                            didDelayCounterEnd suffix: entry)
 *           (v0.14a+)Order Module:
 *           1. continuousOrderSpriteOpacity(corresponds to notetag content
 *              continuousOrderSpriteOpacity suffix: entry)
 *           2. continuousOrderSpriteIconFolder(corresponds to notetag content
 *              continuousOrderSpriteIconFolder suffix: entry)
 *           3. continuousOrderSpriteIconFilename(corresponds to notetag
 *              content continuousOrderSpriteIconFilename suffix: entry)
 *           4. continuousOrderSpriteIconHue(corresponds to notetag content
 *              continuousOrderSpriteIconHue suffix: entry)
 *           5. continuousOrderSpriteIconSmooth(corresponds to notetag content
 *              continuousOrderSpriteIconSmooth suffix: entry)
 *           6. continuousOrderSpriteIconXCoor(corresponds to notetag content
 *              continuousOrderSpriteIconXCoor suffix: entry)
 *           7. continuousOrderSpriteIconYCoor(corresponds to notetag content
 *              continuousOrderSpriteIconYCoor suffix: entry)
 *           8. continuousOrderSpriteIconSourceW(corresponds to notetag
 *              content continuousOrderSpriteIconSourceW suffix: entry)
 *           9. continuousOrderSpriteIconSourceH(corresponds to notetag
 *              content continuousOrderSpriteIconSourceH suffix: entry)
 *           10. continuousOrderSpriteIconW(corresponds to notetag content
 *               continuousOrderSpriteIconW suffix: entry)
 *           11. continuousOrderSpriteIconH(corresponds to notetag content
 *               continuousOrderSpriteIconH suffix: entry)
 *           12. continuousOrderSpriteY(corresponds to notetag content
 *               continuousOrderSpriteY suffix: entry)
 *           13. discreteOrderSpriteTargetOpacity(corresponds to notetag
 *               content discreteOrderSpriteTargetOpacity suffix: entry)
 *           14. discreteOrderSpriteIconFolder(corresponds to notetag content
 *               discreteOrderSpriteIconFolder suffix: entry)
 *           15. discreteOrderSpriteIconFilename(corresponds to notetag content
 *               discreteOrderSpriteIconFilename suffix: entry)
 *           16. discreteOrderSpriteIconHue(corresponds to notetag content
 *               discreteOrderSpriteIconHue suffix: entry)
 *           17. discreteOrderSpriteIconSmooth(corresponds to notetag content
 *               discreteOrderSpriteIconSmooth suffix: entry)
 *           18. discreteOrderSpriteIconXCoor(corresponds to notetag content
 *               discreteOrderSpriteIconXCoor suffix: entry)
 *           19. discreteOrderSpriteIconYCoor(corresponds to notetag content
 *               discreteOrderSpriteIconYCoor suffix: entry)
 *           20. discreteOrderSpriteIconSourceW(corresponds to notetag content
 *               discreteOrderSpriteIconSourceW suffix: entry)
 *           21. discreteOrderSpriteIconSourceH(corresponds to notetag content
 *               discreteOrderSpriteIconSourceH suffix: entry)
 *           22. discreteOrderSpriteIconW(corresponds to notetag content
 *               discreteOrderSpriteIconW suffix: entry)
 *           23. discreteOrderSpriteIconH(corresponds to notetag content
 *               discreteOrderSpriteIconH suffix: entry)
 *           (v0.10a+)Rate Module:
 *           1. coreATBRate(corresponds to notetag content
 *                         coreATBRate suffix: entry)
 *           2. chargeATBRate(corresponds to notetag content
 *                           chargeATBRate suffix: entry)
 *           3. cooldownATBRate(corresponds to notetag content
 *                             cooldownATBRate suffix: entry)
 *           (v0.07a+)Reset Module:
 *           1. resetATBVal(corresponds to notetag content
 *                         resetATBVal suffix: entry)
 *           (v0.08a+)Speed Module:
 *           1. actSpeed(corresponds to notetag content
 *                      actSpeed suffix: entry)
 *           (v0.09a+)Start Module:
 *           1. normStartATBVal(corresponds to notetag content
 *                             normStartATBVal suffix: entry)
 *           2. preemptStartATBVal(corresponds to notetag content
 *                                preemptStartATBVal suffix: entry)
 *           3. surpriseStartATBVal(corresponds to notetag content
 *                                 surpriseStartATBVal suffix: entry)
 *         - factors is the list whose elements are either of the following:
 *           "states"(Changes in state notetags)
 *           "skills"(Changes in skill notetags)
 *           "items"(Changes in item notetags)
 *           "armors"(Changes in armor notetags)
 *           "weapons"(Changes in weapon notetags)
 *           "class"(Changes in class notetags)
 *           "actor"(Changes in actor notetags)
 *           "enemy"(Changes in enemy notetags)
 *           "priority"(Changes in the corresponding note priorities)
 *           "chainingRule"(Changes in the corresponding note chaining rules)
 *           "result"(Changes in all intermediate results for the note)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].raiseSATBNoteChangeFactors("coreMax", ["states", "skills"])
 *           will notify the 1st alive party member that the coreMax notetags
 *           might need to be recached due to potential changes in the states
 *           and skills or their coreMax notetags
 *      19. (Advanced)invalidateSATBNoteResult(note, part)
 *         - Invalidates the cached intermediate result of part part in note
 *           note for the actor involved
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *           2. coreActState(corresponds to notetag content
 *                          coreActState suffix: entry)
 *           (v0.04a+)Bar Module -
 *           1. isBarVisible(corresponds to notetag content
 *                          isBarVisible suffix: entry)
 *           (v0.16a+)Action Module -
 *           1. actCost(corresponds to notetag content actCost suffix: entry)
 *           2. actMode(corresponds to notetag content actMode suffix: entry)
 *           (v0.04a+)Charge Module -
 *           1. chargeMax(corresponds to notetag content
 *                       chargeMax suffix: entry)
 *           2. isPayBeforeExecCharge(corresponds to notetag content
 *                                   isPayBeforeExecCharge suffix: entry)
 *           3. canCancelCharge(corresponds to notetag content
 *                             canCancelCharge suffix: entry)
 *           4. canForceCharge(corresponds to notetag content
 *                            canForceCharge suffix: entry)
 *           (v0.05a+)Cooldown Module -
 *           1.cooldownMax(corresponds to notetag content
 *                        cooldownMax suffix: entry)
 *           2.canCancelCooldown(corresponds to notetag content
 *                              canCancelCooldown suffix: entry)
 *           (v0.12a+)Countdown Module:
 *           1. countdown(corresponds to notetag content
 *                       countdown condSuffix unitSuffix intervalSuffix: condEntry, unitEntry, intervalEntry)
 *           (v0.15a+)Delay Module:
 *           1. delay(corresponds to notetag content delay suffix: entry)
 *           (v0.06a+)Event Module:
 *           1. didFinishInput(corresponds to notetag content
 *                            didFinishInput suffix: entry)
 *           2. didBecomeActable(corresponds to notetag content
 *                              didBecomeActable suffix: entry)
 *           3. didSetActTimes(corresponds to notetag content
 *                            didSetActTimes suffix: entry)
 *           (v0.16a+)4. didSetMaxActTimes(related to didSetMaxActTimes,
 *                       _didSetMaxActTimesNoteChainingRule and
 *                       _didSetMaxActTimesNotePriorities)
 *           5. didStartATBFill(related to didStartATBFill,
 *              _didStartATBFillNoteChainingRule and
 *              _didStartATBFillNotePriorities)
 *           6. willCancelCharge(related to willCancelCharge,
 *              _willCancelChargeNoteChainingRule and
 *              _delayNotePriorities)
 *           7. didStartForceCharge(related to didStartForceCharge,
 *              _didStartForceChargeNoteChainingRule and
 *              _didStartForceChargeNotePriorities)
 *           8. willCancelCooldown(related to willCancelCooldown,
 *              _willCancelCooldownNoteChainingRule and
 *              _willCancelCooldownNotePriorities)
 *           9. didCoreATBBecomeFull(related to didCoreATBBecomeFull,
 *              _didCoreATBBecomeFullNoteChainingRule and
 *              _didCoreATBBecomeFullNotePriorities)
 *           10. didCoreATBBecomeNotFull(related to didCoreATBBecomeNotFull,
 *               _didCoreATBBecomeNotFullNoteChainingRule and
 *               _didCoreATBBecomeNotFullNotePriorities)
 *           11. didChargeATBBecomeNotFull(related to
 *               didChargeATBBecomeNotFull,
 *               _didChargeATBBecomeNotFullNoteChainingRule and
 *               _didChargeATBBecomeNotFullNotePriorities)
 *           12. didAddInputableActor(related to didAddInputableActor,
 *               _didAddInputableActorNoteChainingRule and
 *               _didAddInputableActorNotePriorities)
 *           (v0.12a+)12. didDecreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didDecreaseCountdownStateTurn suffix: entry)
 *           (v0.12a+)13. didIncreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didIncreaseCountdownStateTurn suffix: entry)
 *           (v0.15a+)14. didDelayCounterEnd(corresponds to notetag content
 *                            didDelayCounterEnd suffix: entry)
 *           (v0.14a+)Order Module:
 *           1. continuousOrderSpriteOpacity(corresponds to notetag content
 *              continuousOrderSpriteOpacity suffix: entry)
 *           2. continuousOrderSpriteIconFolder(corresponds to notetag content
 *              continuousOrderSpriteIconFolder suffix: entry)
 *           3. continuousOrderSpriteIconFilename(corresponds to notetag
 *              content continuousOrderSpriteIconFilename suffix: entry)
 *           4. continuousOrderSpriteIconHue(corresponds to notetag content
 *              continuousOrderSpriteIconHue suffix: entry)
 *           5. continuousOrderSpriteIconSmooth(corresponds to notetag content
 *              continuousOrderSpriteIconSmooth suffix: entry)
 *           6. continuousOrderSpriteIconXCoor(corresponds to notetag content
 *              continuousOrderSpriteIconXCoor suffix: entry)
 *           7. continuousOrderSpriteIconYCoor(corresponds to notetag content
 *              continuousOrderSpriteIconYCoor suffix: entry)
 *           8. continuousOrderSpriteIconSourceW(corresponds to notetag
 *              content continuousOrderSpriteIconSourceW suffix: entry)
 *           9. continuousOrderSpriteIconSourceH(corresponds to notetag
 *              content continuousOrderSpriteIconSourceH suffix: entry)
 *           10. continuousOrderSpriteIconW(corresponds to notetag content
 *               continuousOrderSpriteIconW suffix: entry)
 *           11. continuousOrderSpriteIconH(corresponds to notetag content
 *               continuousOrderSpriteIconH suffix: entry)
 *           12. continuousOrderSpriteY(corresponds to notetag content
 *               continuousOrderSpriteY suffix: entry)
 *           13. discreteOrderSpriteTargetOpacity(corresponds to notetag
 *               content discreteOrderSpriteTargetOpacity suffix: entry)
 *           14. discreteOrderSpriteIconFolder(corresponds to notetag content
 *               discreteOrderSpriteIconFolder suffix: entry)
 *           15. discreteOrderSpriteIconFilename(corresponds to notetag content
 *               discreteOrderSpriteIconFilename suffix: entry)
 *           16. discreteOrderSpriteIconHue(corresponds to notetag content
 *               discreteOrderSpriteIconHue suffix: entry)
 *           17. discreteOrderSpriteIconSmooth(corresponds to notetag content
 *               discreteOrderSpriteIconSmooth suffix: entry)
 *           18. discreteOrderSpriteIconXCoor(corresponds to notetag content
 *               discreteOrderSpriteIconXCoor suffix: entry)
 *           19. discreteOrderSpriteIconYCoor(corresponds to notetag content
 *               discreteOrderSpriteIconYCoor suffix: entry)
 *           20. discreteOrderSpriteIconSourceW(corresponds to notetag content
 *               discreteOrderSpriteIconSourceW suffix: entry)
 *           21. discreteOrderSpriteIconSourceH(corresponds to notetag content
 *               discreteOrderSpriteIconSourceH suffix: entry)
 *           22. discreteOrderSpriteIconW(corresponds to notetag content
 *               discreteOrderSpriteIconW suffix: entry)
 *           23. discreteOrderSpriteIconH(corresponds to notetag content
 *               discreteOrderSpriteIconH suffix: entry)
 *           (v0.10a+)Rate Module:
 *           1. coreATBRate(corresponds to notetag content
 *                         coreATBRate suffix: entry)
 *           2. chargeATBRate(corresponds to notetag content
 *                           chargeATBRate suffix: entry)
 *           3. cooldownATBRate(corresponds to notetag content
 *                             cooldownATBRate suffix: entry)
 *           (v0.07a+)Reset Module:
 *           1. resetATBVal(corresponds to notetag content
 *                         resetATBVal suffix: entry)
 *           (v0.08a+)Speed Module:
 *           1. actSpeed(corresponds to notetag content
 *                      actSpeed suffix: entry)
 *           (v0.09a+)Start Module:
 *           1. normStartATBVal(corresponds to notetag content
 *                             normStartATBVal suffix: entry)
 *           2. preemptStartATBVal(corresponds to notetag content
 *                                preemptStartATBVal suffix: entry)
 *           3. surpriseStartATBVal(corresponds to notetag content
 *                                 surpriseStartATBVal suffix: entry)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "skills"(All effective skill notetags)
 *           "items"(All effective item notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *           "enemy"(All effective in enemy notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSATBNoteResult("coreMax", "states")
 *           will invalidate the cached intermediate result of all effective
 *           coreMax notetags in states for the 1st alive party member
 *      20. (Advanced)invalidateSATBNoteList(note, part)
 *         - Invalidates the cached notetag list of part part in note note for
 *           the actor involved
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *           2. coreActState(corresponds to notetag content
 *                          coreActState suffix: entry)
 *           (v0.04a+)Bar Module -
 *           1. isBarVisible(corresponds to notetag content
 *                          isBarVisible suffix: entry)
 *           (v0.16a+)Action Module -
 *           1. actCost(corresponds to notetag content actCost suffix: entry)
 *           2. actMode(corresponds to notetag content actMode suffix: entry)
 *           (v0.04a+)Charge Module -
 *           1. chargeMax(corresponds to notetag content
 *                       chargeMax suffix: entry)
 *           2. isPayBeforeExecCharge(corresponds to notetag content
 *                                   isPayBeforeExecCharge suffix: entry)
 *           3. canCancelCharge(corresponds to notetag content
 *                             canCancelCharge suffix: entry)
 *           4. canForceCharge(corresponds to notetag content
 *                            canForceCharge suffix: entry)
 *           (v0.05a+)Cooldown Module -
 *           1.cooldownMax(corresponds to notetag content
 *                        cooldownMax suffix: entry)
 *           2.canCancelCooldown(corresponds to notetag content
 *                              canCancelCooldown suffix: entry)
 *           (v0.12a+)Countdown Module:
 *           1. countdown(corresponds to notetag content
 *                       countdown condSuffix unitSuffix intervalSuffix: condEntry, unitEntry, intervalEntry)
 *           (v0.15a+)Delay Module:
 *           1. delay(corresponds to notetag content delay suffix: entry)
 *           (v0.06a+)Event Module:
 *           1. didFinishInput(corresponds to notetag content
 *                            didFinishInput suffix: entry)
 *           2. didBecomeActable(corresponds to notetag content
 *                              didBecomeActable suffix: entry)
 *           3. didSetActTimes(corresponds to notetag content
 *                            didSetActTimes suffix: entry)
 *           (v0.16a+)4. didSetMaxActTimes(related to didSetMaxActTimes,
 *                       _didSetMaxActTimesNoteChainingRule and
 *                       _didSetMaxActTimesNotePriorities)
 *           5. didStartATBFill(related to didStartATBFill,
 *              _didStartATBFillNoteChainingRule and
 *              _didStartATBFillNotePriorities)
 *           6. willCancelCharge(related to willCancelCharge,
 *              _willCancelChargeNoteChainingRule and
 *              _delayNotePriorities)
 *           7. didStartForceCharge(related to didStartForceCharge,
 *              _didStartForceChargeNoteChainingRule and
 *              _didStartForceChargeNotePriorities)
 *           8. willCancelCooldown(related to willCancelCooldown,
 *              _willCancelCooldownNoteChainingRule and
 *              _willCancelCooldownNotePriorities)
 *           9. didCoreATBBecomeFull(related to didCoreATBBecomeFull,
 *              _didCoreATBBecomeFullNoteChainingRule and
 *              _didCoreATBBecomeFullNotePriorities)
 *           10. didCoreATBBecomeNotFull(related to didCoreATBBecomeNotFull,
 *               _didCoreATBBecomeNotFullNoteChainingRule and
 *               _didCoreATBBecomeNotFullNotePriorities)
 *           11. didChargeATBBecomeNotFull(related to
 *               didChargeATBBecomeNotFull,
 *               _didChargeATBBecomeNotFullNoteChainingRule and
 *               _didChargeATBBecomeNotFullNotePriorities)
 *           12. didAddInputableActor(related to didAddInputableActor,
 *               _didAddInputableActorNoteChainingRule and
 *               _didAddInputableActorNotePriorities)
 *           (v0.12a+)12. didDecreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didDecreaseCountdownStateTurn suffix: entry)
 *           (v0.12a+)13. didIncreaseCountdownStateTurn(corresponds to
 *                        notetags content
 *                        didIncreaseCountdownStateTurn suffix: entry)
 *           (v0.15a+)14. didDelayCounterEnd(corresponds to notetag content
 *                            didDelayCounterEnd suffix: entry)
 *           (v0.14a+)Order Module:
 *           1. continuousOrderSpriteOpacity(corresponds to notetag content
 *              continuousOrderSpriteOpacity suffix: entry)
 *           2. continuousOrderSpriteIconFolder(corresponds to notetag content
 *              continuousOrderSpriteIconFolder suffix: entry)
 *           3. continuousOrderSpriteIconFilename(corresponds to notetag
 *              content continuousOrderSpriteIconFilename suffix: entry)
 *           4. continuousOrderSpriteIconHue(corresponds to notetag content
 *              continuousOrderSpriteIconHue suffix: entry)
 *           5. continuousOrderSpriteIconSmooth(corresponds to notetag content
 *              continuousOrderSpriteIconSmooth suffix: entry)
 *           6. continuousOrderSpriteIconXCoor(corresponds to notetag content
 *              continuousOrderSpriteIconXCoor suffix: entry)
 *           7. continuousOrderSpriteIconYCoor(corresponds to notetag content
 *              continuousOrderSpriteIconYCoor suffix: entry)
 *           8. continuousOrderSpriteIconSourceW(corresponds to notetag
 *              content continuousOrderSpriteIconSourceW suffix: entry)
 *           9. continuousOrderSpriteIconSourceH(corresponds to notetag
 *              content continuousOrderSpriteIconSourceH suffix: entry)
 *           10. continuousOrderSpriteIconW(corresponds to notetag content
 *               continuousOrderSpriteIconW suffix: entry)
 *           11. continuousOrderSpriteIconH(corresponds to notetag content
 *               continuousOrderSpriteIconH suffix: entry)
 *           12. continuousOrderSpriteY(corresponds to notetag content
 *               continuousOrderSpriteY suffix: entry)
 *           13. discreteOrderSpriteTargetOpacity(corresponds to notetag
 *               content discreteOrderSpriteTargetOpacity suffix: entry)
 *           14. discreteOrderSpriteIconFolder(corresponds to notetag content
 *               discreteOrderSpriteIconFolder suffix: entry)
 *           15. discreteOrderSpriteIconFilename(corresponds to notetag content
 *               discreteOrderSpriteIconFilename suffix: entry)
 *           16. discreteOrderSpriteIconHue(corresponds to notetag content
 *               discreteOrderSpriteIconHue suffix: entry)
 *           17. discreteOrderSpriteIconSmooth(corresponds to notetag content
 *               discreteOrderSpriteIconSmooth suffix: entry)
 *           18. discreteOrderSpriteIconXCoor(corresponds to notetag content
 *               discreteOrderSpriteIconXCoor suffix: entry)
 *           19. discreteOrderSpriteIconYCoor(corresponds to notetag content
 *               discreteOrderSpriteIconYCoor suffix: entry)
 *           20. discreteOrderSpriteIconSourceW(corresponds to notetag content
 *               discreteOrderSpriteIconSourceW suffix: entry)
 *           21. discreteOrderSpriteIconSourceH(corresponds to notetag content
 *               discreteOrderSpriteIconSourceH suffix: entry)
 *           22. discreteOrderSpriteIconW(corresponds to notetag content
 *               discreteOrderSpriteIconW suffix: entry)
 *           23. discreteOrderSpriteIconH(corresponds to notetag content
 *               discreteOrderSpriteIconH suffix: entry)
 *           (v0.10a+)Rate Module:
 *           1. coreATBRate(corresponds to notetag content
 *                         coreATBRate suffix: entry)
 *           2. chargeATBRate(corresponds to notetag content
 *                           chargeATBRate suffix: entry)
 *           3. cooldownATBRate(corresponds to notetag content
 *                             cooldownATBRate suffix: entry)
 *           (v0.07a+)Reset Module:
 *           1. resetATBVal(corresponds to notetag content
 *                         resetATBVal suffix: entry)
 *           (v0.08a+)Speed Module:
 *           1. actSpeed(corresponds to notetag content
 *                      actSpeed suffix: entry)
 *           (v0.09a+)Start Module:
 *           1. normStartATBVal(corresponds to notetag content
 *                             normStartATBVal suffix: entry)
 *           2. preemptStartATBVal(corresponds to notetag content
 *                                preemptStartATBVal suffix: entry)
 *           3. surpriseStartATBVal(corresponds to notetag content
 *                                 surpriseStartATBVal suffix: entry)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "skills"(All effective skill notetags)
 *           "items"(All effective item notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *           "enemy"(All effective in enemy notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSATBNoteList("coreMax", "states")
 *           will invalidate the cached notetag list of coreMax notetags in
 *           states for the 1st alive party member
 *      (v0.16a_)Action Module:
 *      1. maxSATBActTimes()
 *         - The same as the script call satbActTimes() except that this one
 *           returns the maximum number of virtual action slots that can be
 *           accumulated by the battler involved
 *      2. setMaxSATBActTimes(maxActTimes)
 *         - Sets the maximum number of virtual action slots of the battler
 *           involved as maxActTimes
 *         - If the current number of virtual action slots are larger than
 *           maxActTimes, the former will be capped to maxActTimes
 *         - This script call has virtually no practical effect on any action
 *           mode other than discrete
 *         - (Advanced)actTimes is supposed to be a nonnegative integer
 *         - E.g.:
 *           $gameActors.actor(1).setMaxSATBActTimes(2) will set the maximum
 *           number of virtual action slot of the game actor with id 1 as 2
 *         - (Advanced)It's supposed to be Idempotent
 *      3. addMaxSATBActTimes(increment)
 *         - Adds the maximum number of virtual action slots of the battler
 *           involved by increment
 *         - Otherwise it's the same as the script call
 *           setMaxSATBActTimes(actTimes)
 *         - The resulting maximum number virtual action slots will never be
 *           negative
 *         - (Advanced)increment is supposed to be an Integer
 *         - (Advanced)This script call isn't supposed to be idempotent
 *      4. multiplyMaxSATBActTimes(multiplier)
 *          - The same as the script call addMaxSATBActTimes(increment) except
 *            that this one multiplies the maximum number of virtual action
 *            slots of the battler involved by multiplier
 *         - (Advanced)multiplier is supposed to be an nonnegative Number
 *      (v0.04a+)Charge Module:
 *      1. setChargeSATB(val)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the charge ATB instead
 *      2. setChargeSATBProportion(proportion)
 *         - The same as the script call setCoreSATBProportion(proportion)
 *           except that this one sets the charge ATB instead
 *      3. addChargeSATB(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one sets the charge ATB instead
 *      4. addChargeSATBProportion(increment)
 *         - The same as the script call addCoreSATBProportion(increment)
 *           except that this one sets the charge ATB instead
 *      5. multiplyChargeSATB(multiplier)
 *         - The same as the script call multiplyCoreSATB(multiplier) except
 *           that this one sets the charge ATB instead
 *      6. fillUpChargeSATB()
 *         - The same as the script call fillUpCoreSATB() except that this one
 *           sets the charge ATB instead
 *      7. clearChargeSATB()
 *         - The same as the script call clearCoreSATB() except that this one
 *           sets the charge ATB instead
 *      8. chargeSATB()
 *         - The same as the script call coreSATB() except that this one
 *           returns the charge ATB instead
 *      9. chargeMaxSATB()
 *         - The same as the script call coreMaxSATB() except that this one
 *           returns the charge ATB instead
 *      10. chargeSATBProportion()
 *          - The same as the script call coreSATBProportion() except that
 *            this one returns the charge ATB instead
 *      11. isSATBCharge()
 *          - Checks whether the battler invovled's charging a skill/item
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBCharge() will return whether
 *           the 2nd alive party member's charging a skill/item
 *      12. onCancelSATBCharge()
 *          - Forcibly cancels the skill/item charging of the battler involved
 *            if the skill/item charging can be cancelled in this case
 *          - (Advanced)It's supposed to be Idempotent in practice but not in
 *            theory(so calling it extremely many times can have undesired
 *            side effects)
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].onCancelSATBCharge() will forcibly
 *           cancel the skill/item charging of the 2nd alive party member if
 *           the skill/item charging can be cancelled in this case
 *      13. onStartForceSATBCharge()
 *          - Marks that the skill/item becomes forcibly charged for the
 *            battler involved if the skill/item charging can be forced in
 *            this case
 *          - (Advanced)It's supposed to be Idempotent
 *          - E.g.:
 *            $gameParty.aliveMembers()[1].onStartForceSATBCharge() will mark
 *            that the skill/item becomes forcibly charged for the 2nd alive
 *            party member if the skill/item charging can be forced in this
 *            case
 *      14. onEndForceSATBCharge()
 *          - Marks that the skill/item charging becomes forcibly ended for
 *            the battler involved if the skill/item charging can be forced in
 *            this case and the script call onStartForceSATBCharge() is used
 *            for the same battler when charging the same skill/item before
 *            using this script call
 *          - The battler involved will become able to exeucte actions
 *            regardless of the current ATB charge value
 *          - (Advanced)It's supposed to be Idempotent
 *          - E.g.:
 *            $gameParty.aliveMembers()[1].onEndForceSATBCharge() will cause
 *            the battler to be able to execute actions regardless of the
 *            current ATB charge value as the script call
 *            onStartForceSATBCharge() is used for the same chrage beforehand
 *      (v0.05a+)Cooldown Module:
 *      1. setCooldownSATB(val)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the cooldown ATB instead
 *      2. setCooldownSATBProportion(proportion)
 *         - The same as the script call setCoreSATBProportion(proportion)
 *           except that this one sets the cooldown ATB instead
 *      3. addCooldownSATB(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one sets the cooldown ATB instead
 *      4. addCooldownSATBProportion(increment)
 *         - The same as the script call addCoreSATBProportion(increment)
 *           except that this one sets the cooldown ATB instead
 *      5. multiplyCooldownSATB(multiplier)
 *         - The same as the script call multiplyCoreSATB(multiplier) except
 *           that this one sets the cooldown ATB instead
 *      6. fillUpCooldownSATB()
 *         - The same as the script call fillUpCoreSATB() except that this one
 *           sets the cooldown ATB instead
 *      7. cooldownSATB()
 *         - The same as the script call coreSATB() except that this one
 *           returns the cooldown ATB instead
 *      8. cooldownMaxSATB()
 *         - The same as the script call coreMaxSATB() except that this one
 *           returns the cooldown ATB instead
 *      9. cooldownSATBProportion()
 *         - The same as the script call coreSATBProportion() except that this
 *           one returns the cooldown ATB instead
 *      10. isSATBCooldown()
 *          - Checks whether the battler invovled's cooling down a skill/item
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBCooldown() will return whether
 *           the 2nd alive party member's charging a skill/item
 *      11. onCancelSATBCooldown()
 *          - Forcibly cancels the skill/item cooldown of the battler involved
 *            if the skill/item charging can be cancelled in this case
 *          - (Advanced)It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].onCancelSATBCooldown() will forcibly
 *           cancel the skill/item cooldown of the 2nd alive party member if
 *           the skill/item charging can be cancelled in this case
 *      (v0.15a+)Delay Module:
 *      1. setSATBDelaySecCounter(delay)
 *         - Sets the delay counter locking the action inputs of the battler
 *           involved as delay seconds
 *         - This only works if the delay counter's already positive before
 *           using this script call
 *         - E.g.:
 *           $gameTroop.aliveMembers()[1].setSATBDelaySecCounter(0.5) will set
 *           the delay counter locking the action inputs of the 1st alive
 *           troop member as 0.5 seconds
 *      2. addSATBDelaySecCounter(increment)
 *         - The same as the script call setSATBDelaySecCounter(delay) except
 *           that this one adds the delay counter instead
 *      3. multiplySATBDelaySecCounter(multiplier)
 *         - The same as the script call setSATBDelaySecCounter(delay) except
 *           that this multiplies the delay counter instead
 *      4. satbDelaySecCounter()
 *         - Returns the delay counter locking the action inputs of the
 *           battler involved
 *         - E.g.:
 *           $gameTroop.aliveMembers()[1].satbDelaySecCounter() will return
 *           the delay counter locking the action inputs of the 1st alive
 *           troop member
 *      (v0.05a+)Rate Module:
 *      1. coreSATBRate()
 *         - Returns the ATB fill rate without charge nor cooldown for the
 *           battler involved
 *         - (Advanced)It's supposed to return a Number
 *         - (Advanced)It's supposed to be Nullipotent
 *         - E.g.:
 *           $gameTroop.aliveMembers()[1].coreSATBRate() will return the ATB
 *           fill rate without charge nor cooldown for the 1st alive troop
 *           member
 *      2. chargeSATBRate()
 *         - The same as the script call coreSATBRate() except that this one
 *           returns the charge counterpart instead
 *      3. cooldownSATBRate()
 *         - The same as the script call coreSATBRate() except that this one
 *           returns the cooldown counterpart instead
 *============================================================================
 *    ## Plugin Command Info
 *       Don't use this plugin command for actors that don't exist yet unless
 *       you really know what you're truly doing
 *       1. targetType is combined by one of the following filter as prefix:
 *          all - All battlers in the designated group
 *          alive - All alive battlers in the designated group
 *          dead - All dead battlers in the designated group
 *          movable - All movable battlers in the designated group
 *          with one of the following designated group as the suffix:
 *          Party - Party members(Must be in battle)
 *          Troop - Troop members(Don't use this outside battle)
 *          Actors - Actors(possibly including those not in battle)
 *          E.g.:
 *          Setting targetType as aliveTroop means only alive troop members
 *          can be targets
 *          The plugin command won't be effective with an invalid targetType
 *       (Reference tag: PLUGIN_CMD_TARGET_TYPE)
 *       2. targets is the list of target, each meaning one of the following:
 *          targetType has Party/Troop as suffix - target can be either the
 *                                                 list of indices of the
 *                                                 designated party/troop
 *                                                 members or the party/troop
 *                                                 members whose names matches
 *                                                 at least 1 of those in the
 *                                                 target list
 *          targetType has Actors as suffix - target can be either the list of
 *                                            id of the actors or actors whose
 *                                            names matches at least 1 of
 *                                            those in the target list
 *          If there's no specified target, all targets in targetType will
 *          have the plugin command applied
 *          target should be either a list of indices, id or names, meaning
 *          that mixing indices, id and names in the same list can cause the
 *          plugin command to fail very badly
 *          E.g.:
 *          - Setting target as "Slime",3 with targetType as allTroop will
 *            apply the plugin command to all enemies whose names are Silme or
 *            indices in the troop are 3
 *            Note that battler names must be quoted by "" or ''
 *          - Setting target as 0,2 with targetType as aliveParty will apply
 *            the plugin command to the 1st and 3rd alive party member
 *            Note that no space's allowed in target
 *          - Setting target as 1 with targetType as movableActors will apply
 *            the plugin command to the actor with id 1 as long as that actor
 *            is movable
 *       (Reference tag: PLUGIN_CMD_TARGET)
 *----------------------------------------------------------------------------
 *      Core Module:
 *      1. setCoreSATB targetType targets val
 *          - The same as the script call setCoreSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setCoreSATBProportion targetType targets proportion
 *          - The same as the script call setCoreSATBProportion(proportion) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      3. addCoreSATB targetType targets increment
 *          - The same as the script call addCoreSATB(increment) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      4. addCoreSATBProportion targetType targets increment
 *          - The same as the script call addCoreSATBProportion(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyCoreSATB targetType targets multiplier
 *          - The same as the script call multiplyCoreSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6.(v0.01a+) fillUpCoreSATB targetType targets
 *          - The same as the script call fillUpCoreSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. clearCoreSATB targetType targets
 *          - The same as the script call clearCoreSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      8. setSATBActTimes targetType targets actTimes
 *          - The same as the script call setSATBActTimes(actTimes) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      9. addSATBActTimes targetType targets increment
 *          - The same as the script call addSATBActTimes(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      10. multiplySATBActTimes targetType targets multiplier
 *           - The same as the script call multiplySATBActTimes(multiplier) in
 *             Battler manipulations with the designated targets in the
 *             designated targetType
 *      11. raiseAllSATBNoteChangeFactors targetType targets
 *          - The same as the script call raiseAllSATBNoteChangeFactors() in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      12. raiseSATBNoteChangeFactors targetType targets note factors
 *          - The same as the script call coreMaxSATB(note, factors) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      13. invalidateSATBNoteResult targetType targets note part
 *          - The same as the script call invalidateSATBNoteResult(note, part)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      14. invalidateSATBNoteList targetType targets note part
 *          - The same as the script call invalidateSATBNoteList(note, part)in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      (v0.04a+)Charge Module:
 *      1. setChargeSATB targetType targets val
 *          - The same as the script call setChargeSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setChargeSATBProportion targetType targets proportion
 *          - The same as the script call setChargeSATBProportion(proportion)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      3. addChargeSATB targetType targets increment
 *          - The same as the script call addChargeSATB(increment) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      4. addChargeSATBProportion targetType targets increment
 *          - The same as the script call addChargeSATBProportion(increment)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyChargeSATB targetType targets multiplier
 *          - The same as the script call multiplyChargeSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6. fillUpChargeSATB targetType targets
 *          - The same as the script call fillUpChargeSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. clearChargeSATB targetType targets
 *          - The same as the script call clearChargeSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      8. onCancelSATBCharge targetType targets
 *          - The same as the script call onCancelSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      9. onStartForceSATBCharge targetType targets
 *          - The same as the script call onStartForceSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      10. onEndForceSATBCharge targetType targets
 *          - The same as the script call onEndForceSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      (v0.05a+)Cooldown Module:
 *      1. setCooldownSATB targetType targets val
 *          - The same as the script call setCooldownSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setCooldownSATBProportion targetType targets proportion
 *          - The same as the script call
 *            setCooldownSATBProportion(proportion) in Battler manipulations
 *            with the designated targets in the designated targetType
 *      3. addCooldownSATB targetType targets increment
 *          - The same as the script call addCooldownSATB(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      4. addCooldownSATBProportion targetType targets increment
 *          - The same as the script call addCooldownSATBProportion(increment)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyCooldownSATB targetType targets multiplier
 *          - The same as the script call multiplyCooldownSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6. fillUpCooldownSATB targetType targets
 *          - The same as the script call fillUpCooldownSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. onCancelSATBCooldown targetType targets
 *          - The same as the script call onCancelSATBCooldown() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *============================================================================
 */

// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Documentations"] = "v0.16a";
//

// Ensures that all plugins are of the latest version
DoubleX_RMMV.SATB_VERS = {
    Parameters: "v0.16a",
    Configurations: "v0.16a",
    Implementations: "v0.16a",
    "Unit Tests": "v0.15b",
    Compatibilities: "v0.05a",
    "Compatibility Tests": "v0.01a"
}; // DoubleX_RMMV.SATB_VERS
Object.keys(DoubleX_RMMV.SATB_VERS).forEach(function(plugin) {
    "use strict";
    var cur = DoubleX_RMMV["Superlative ATB " + plugin];
    // console.warn should be used instead of alert as some of them are optional
    if (!cur) return console.warn("DoubleX RMMV Superlative ATB " + plugin +
            " should be above DoubleX RMMV Superlative ATB Documentations");
    var latest = DoubleX_RMMV.SATB_VERS[plugin];
    if (cur === latest) return;
    console.warn("The version of DoubleX RMMV Superlative ATB " + plugin +
            " should be " + latest + " but is " + cur);
    //
});
// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
