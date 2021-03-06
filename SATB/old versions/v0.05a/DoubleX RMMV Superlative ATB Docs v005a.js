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
 *      1. Nothing special for most ordinary cases
 *         (No capability on Javascript ES5 experience but can still make
 *         reasonable guesses on readable novice codes up to 100 LoC scale)
 *      2. Little RMMV plugin development proficiency for more advanced uses
 *         (Elementary Javascript ES5 exposures being able to write beginner
 *         codes up to 300LoC scale )
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *         (Basic knowledge on RMMV plugin development with several easy,
 *         simple and small plugins written without nontrivial bugs up to
 *         1000 LoC scale but still being inexperienced)
 *      4. Decent RMMV plugin development proficiency to fully utilize this
 *         plugin with creative and unintended uses
 *         (Solid understanding on RMMV plugin development with dozens of
 *         tolerable quality plugins written without nontrivial bugs up to
 *         3000 LoC scale and being experienced)
 *      Knowledge:
 *      1. Basic knowledge on what the default RMMV editor does in general
 *      2. Basic knowledge on what the default RMMV battle system does on the
 *         user level
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
 *         reduced(Technically, it's reduced by an extremely small amount) and
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
 *      2. However, failed escape attempts won't increase the turn clock
 *         counter even if its unit is the number of actions executed
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
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. DoubleX RMMV Superlative ATB aims to give extreme control and
 *         freedom to users by making it as flexible as I can with as little
 *         damage to user-friendliness as I can
 *      2. The configuration plugin is generally for more advanced uses, as
 *         most ordinary cases should be covered by parameters and notetags
 *      3. This is an advanced complex plugin, meaning that you're expected to
 *         use the default parameters and configuration values first to be
 *         familiar with playing the game with this plugin before changing
 *         any of those values and/or using any notetags
 *      4. You might have to use some script calls in RMMV and some of those
 *         provided by this plugin to realize some of the more advanced uses
 *      5. (Advanced)You might have to have a basic knowledge on what this
 *         Plugin Implementation does to fully utilize this plugin in intended
 *         ways and solid understanding on how this Plugin Implementation
 *         works to fully utilize this plugin with creative and unintended
 *         uses
 *      6. If you want to keep things easy, simple and small, you may want to
 *         use DoubleX RMMV Popularized ATB instead
 *      7. If you want to run battle tests, you use open the configuration
 *         plugin js file directly to setup everything that has to be setup
 *         upon battle test start by changing the contents of the function
 *         SATB.onSetupBattleTest
 *         (It's especially useful when some parameters/notetags use some
 *         game switches/variables which must all have their corresponding
 *         values manually assigned first)
 *      8. (Advanced)You might have to read some new variables/functions to
 *         have a basic knowledge on what they do in order to realize some
 *         intended cases
 *      9. (Advanced)You might have to dig into the mechanisms of some new
 *         variables/functions to have a solid underatanding on how they work
 *         alone in order to realize some unintended usages
 *----------------------------------------------------------------------------
 *    # FAQ
 *    Q1. What's the main differences between DoubleX RMMV Popularized ATB and
 *        this plugin?
 *    A1. There are at least 2 main differences:
 *        - The former uses the core addon approach, meaning that the core
 *          plugin, which is mandatory, will only have all the essential
 *          features, and each addon plugin, which is optional, will only have
 *          each set of extra features.
 *          On the other hand, the latter uses the single plugin approach,
 *          meaning that all the feature implementations will be included in a
 *          single plugin, even though unit tests and compatibility fixes will
 *          still be separate plugins.
 *        - The former aims to be easy, simple and small while still being
 *          reasonably powerful for both users and ATB system plugin
 *          learners, while the latter aims to be the most flexible and
 *          powerful ATB system plugin ever by giving users the deepest and
 *          widest amount of control and freedom ever, thus making it much,
 *          much more demanding for both users and ATB system plugin learners.
 *    Q2. May you please make this plugin less demanding? The sheer number of
 *        parameters/configurations/notetags, each demanding Javascript
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
 *        plugin.
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
 *    Q4. Why the Bar Module doesn't show the actor ATB value bars on the
 *        status window as well? Some games do use frontview battle systems
 *        after all.
 *    A4. It's because the status window wouldn't have enough space to show
 *        the actor ATB value bars without changing the diemnsions of other
 *        info shown there, and changing them can lead to many compatibility
 *        issues. Those wanting to have such functionality can consider using
 *        MOG_BattleHud, which can do just that and is compatible with this
 *        plugin. If there are indeed cases where such needs can't be met by
 *        using MOG_BattleHud, I'll add an option in the Bar Module to enable
 *        this functionality, even though I can't guarantee whether it'd make
 *        new compatibility issues.
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
 *      1. Core Module Only
 *      - https://www.youtube.com/watch?v=ZmW8ZGVwfy0
 *      2. Compatibility With Just MOG_BattleHud
 *      - https://www.youtube.com/watch?v=0_v0KzU733E
 *      3. Compatibility With Just Yanfly Engine Plugins - Battle Engine Core
 *      - https://www.youtube.com/watch?v=c6ZSvDVj0WM
 *      4. (v0.01a+) DoubleX RMMV Superlative ATB(Core And Hotkey Module Only)
 *      - https://www.youtube.com/watch?v=4YyBFcj-nP0
 *      5. (v0.02a+) DoubleX RMMV Superlative ATB(Core And Wait Module Only)
 *      - https://www.youtube.com/watch?v=8EfYexx8gVU
 *      6. (v0.03a+) DoubleX RMMV Superlative ATB(Core And Bar Module Only)
 *      - https://www.youtube.com/watch?v=20UXh_qctNE
 *      7. (v0.04a+)DoubleX RMMV Superlative ATB(Core And Charge Module Only)
 *      - https://www.youtube.com/watch?v=kkvGK2AoOY8
 *      8. (v0.05a+)DoubleX RMMV Superlative ATB(Core And Cooldown Module Only)
 *      - https://www.youtube.com/watch?v=H3B4TU8cs2U
 *      Posts:
 *      1.
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open the configuration plugin js file to access those
 *         configurations
 *      2. The default plugin parameters file name is
 *         DoubleX RMMV Superlative ATB Params v005a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Superlative_ATB_Parameters_File, which must be done
 *         via opening the parameters plugin js file directly
 *      3. If you wish to use DoubleX RMMV Superlative ATB Unit Test, place it
 *         right below DoubleX RMMV Superlative ATB Implementation
 *----------------------------------------------------------------------------
 *    # Contributors
 *      Authors:
 *      1. DoubleX
 *      Plugin Development Collaborators:
 *      Bug Reporters:
 *      Compatibility Issue Raisers:
 *      Feature Requesters:
 *----------------------------------------------------------------------------
 *    # Changelog
 *      Parameters:
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020)
 *        1. Finished the charge module
 *        2. Added _isBarVisibleNoteChainingRule and
 *           _isBarVisibleNotePriorities parameters in the bar module
 *      - v0.03a(GMT 1400 15-Jun-2020)
 *        1. Finished the bar module
 *      - v0.02a(GMT 1200 14-Jun-2020)
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Configurations:
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020)
 *        1. Finished the charge module
 *      - v0.03a(GMT 1400 15-Jun-2020)
 *        1. Finished the bar module
 *        2. Corrected the documentations of the Wait Module parameters
 *      - v0.02a(GMT 1200 14-Jun-2020)
 *        1. Finished the wait module
 *        2. Corrected the documentations of the Hotkey Module parameters
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *        2. Corrected the documentations of the Core Module parameters
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Implementations:
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020)
 *        1. Finished the charge module
 *        2. Added isBarVisible suffix: entry notetag in the bar module
 *        3. Documented what registration works need to be done when adding
 *           new modules, parameters and notetags
 *        4. Fixed the force run/stop command window not being shown as
 *           disabled after pressing respectively hotkeys bug
 *        5. Increased the performance of ATB force status and command windows
 *           with _isParamFuncCached being on, especially for corresponding
 *           parameters being costly to run
 *      - v0.03a(GMT 1400 15-Jun-2020)
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
 *      - v0.02a(GMT 1200 14-Jun-2020)
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *        2. Added battler maniuplation script call fillUpCoreSATB() and
 *           coreSATBProportion()
 *        3. Fixed the battle turn clock always using all units to end the
 *           turn bug
 *        4. Fixed the base fill ATB rate and battle turn clock time counter
 *           using the render loop fps rather than the game loop fps bug
 *           (Graphics._fpsMeter.fps vs SceneManager._deltaTime)
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Unit Tests:
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *        2. More useful contents are included in the failed test messages
 *      - v0.04a(GMT 1500 19-Jun-2020)
 *        1. Finished the charge module
 *        2. In sync with the implementation plugin v0.04a
 *      - v0.03a(GMT 1400 15-Jun-2020)
 *        1. Finished the bar module
 *        2. Added more tests for the wait module
 *      - v0.02a(GMT 1200 14-Jun-2020)
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Compatibilities:
 *      - v0.03a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *        2. Added action sequences from charge module in YEP_BattleEngineCore
 *      - v0.02a(GMT 1500 19-Jun-2020)
 *        1. Finished the wait module(No nontrivial change has taken place)
 *        2. Finished the bar module(No nontrivial change has taken place)
 *        3. Finished the charge module
 *        4. Added action sequences from charge module in YEP_BattleEngineCore
 *        5. Addressed more compatibility issues with YEP_BattleEngineCore
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *        2. Fixed the battle turn clock action counter won't update bug when
 *           addressing compatibility issues with
 *           Yanfly Engine Plugins - Battle Engine Core
 *        3. New inputable actors can be selected by touching those actor
 *           sprites
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Compatibility Tests:
 *      - v0.01a(GMT 1200 14-Jun-2020)
 *        1. Finished the hotkey module(No nontrivial change has taken place)
 *        2. Finished the wait module(No nontrivial change has taken place)
 *        3. Finished the bar module(No nontrivial change has taken place)
 *        4. Finished the charge module(No nontrivial change has taken place)
 *        4. Finished the cooldown module(No nontrivial change has taken place)
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *      Documentations:
 *      - v0.05a(GMT 1000 27-Jun-2020)
 *        1. Finished the cooldown module
 *      - v0.04a(GMT 1500 19-Jun-2020)
 *        1. Finished the charge module
 *        2. Added isBarVisible suffix: entry notetag in the bar module
 *        3. Added battler manipulation script calls to manipulate the battle
 *           turn clock counters
 *      - v0.03a(GMT 1400 15-Jun-2020)
 *        1. Finished the bar module
 *      - v0.02a(GMT 1200 14-Jun-2020)
 *        1. Finished the wait module
 *      - v0.01a(GMT 1500 13-Jun-2020)
 *        1. Finished the hotkey module
 *        2. Added battler maniuplation script call coreSATBProportion()
 *      - v0.00a(GMT 1500 12-Jun-2020)
 *        1. Finished the core module
 *----------------------------------------------------------------------------
 *    # Todo
 *      1. Adds _isSaveParamNotes
 *      2. Fixes the actor command window not selecting the last command when
 *         it becomes able to be shown again bug
 *      3. Allows party escape attempts when executing actions
 *============================================================================*/
/*:
 * @plugindesc To be the most flexible, performant and powerful ATB system
 * framework with the greatest amount of freedom while being user-friendly
 * @author DoubleX
 *
 * @help
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
 *                       _coreMaxATBValNoteChainingRule and
 *                       _coreMaxATBValNotePriorities)
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
 *            to do so will be complicated and convoluted
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
 *            If an entry corresponds to the cfg, script or eval suffix and
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
 *            rule has changed(this change should raise the priorities/chain
 *            rule factor manually)
 *            (Reference tag: NOTE_RESULT_CACHE)
 *          - If the battler's refreshed due to changes other than class,
 *            weapons, armors, states and last used skill, all note change
 *            factors for all notes will be automatically raised
 *            (Reference tag: BATTLER_REFRESH_RECACHE_NOTE)
 *          - If users changes some notetags from some data manually, then
 *            the corresponding note change factor should be raised
 *            immediately afterwards
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
 *         - The result of entry can be any positive Number
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
 *      (v0.04a+)Charge Module:
 *      1. chargeMax suffix: entry
 *         - Sets the maximum charge ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Charge ATB Max Functions in the charge
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any positive Number
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
 *         - The result of entry can be any positive Number
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
 *           cooldown notetag is <satb cooldownMax var: 1>, then this notetag
 *           will set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1
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
 *           becoming inputable, and chaning the pose upon becoming inputable
 *           to make it more clear that the actor becomes inputable)
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
 *      All meta.satb changes can be saved if
 *      DoubleX RMMV Dynamic Data is used
 *      Core Module:
 *      1. meta.satb.note
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *         - Returns the Array of Objects in this form:
 *           { suffixi: suffixi, entryi: entryi }
 *           Which corresponds to <satb note suffixi: entryi>
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - E.g.:
 *           $dataWeapons[3].meta.satb.coreMax will return the Array of Object
 *           [{ suffix: "var", entry: "2" }] if the effective notetag of
 *           weapon with id 3 is <satb coreMax var: 1, 2>
 *      (VERY ADVANCED)2. meta.satb.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is the same as that of meta.satb.note
 *         - Sets the notetag to be the same as <satb note suffixi: entryi>
 *         - YOU'RE HIGHLY ENCOURAGED AND RECOMMENDED NOT TO USE THIS SCRIPT
 *           CALL UNLESS YOU'VE AT LEAST DECENT RMMV PLUGIN DEVELOPMENT
 *           PROCIFIENCY AS YOU'VE TO HAVE A SOLID UNDERSTANDING ON HOW GAME
 *           VARIABLES AND SWITCHES CHANGE DETECTIONS IN THIS PLUGIN WORKS IN
 *           DETAILS(NOT DETECTING SUCH CHANGES PROPERLY CAN LEAD TO THE
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
 *      2.(v0.04a+) SATBTurnManager.multiplyTurnClockAct(multiplier)
 *         - Multiplies the battle turn clock action counter by multiplier
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      3.(v0.04a+) SATBTurnManager.multiplyTurnClockFrame(multiplier)
 *         - Multiplies the battle turn clock frame counter by multiplier
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      4.(v0.04a+) SATBTurnManager.multiplyTurnClockSec(multiplier)
 *         - Multiplies the battle turn clock second counter by multiplier
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      5.(v0.04a+) SATBTurnManager.setTurnClockAct(act)
 *         - Sets the battle turn clock action counter to be act
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      6.(v0.04a+) SATBTurnManager.setTurnClockFrame(frame)
 *         - Sets the battle turn clock frame counter to be frame
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      7.(v0.04a+) SATBTurnManager.setTurnClockSec(sec)
 *         - Sets the battle turn clock second counter to be sec
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      8.(v0.04a+) SATBTurnManager.addTurnClockAct(increment)
 *         - Adds the battle turn clock action counter by increment
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      9.(v0.04a+) SATBTurnManager.addTurnClockFrame(increment)
 *         - Adds the battle turn clock frame counter by increment
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      10.(v0.04a+) SATBTurnManager.addTurnClockSec(increment)
 *         - Adds the battle turn clock second counter by increment
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      11. (v0.04a+) SATBTurnManager.coreTurnActClock()
 *          - Returns the number of actions executed in the current turn
 *      12. (v0.04a+) SATBTurnManager.coreTurnFrameClock()
 *          - Returns the number of frames elapsed in the current battle turn
 *      13. (v0.04a+) SATBTurnManager.coreTurnSecClockInMs()
 *          - Returns the number of milliseconds elapsed in the current turn
 *      14. (v0.04a+) SATBTurnManager.coreTurnActClockMax()
 *          - Returns the number of actions constituting the current turn
 *      15. (v0.04a+) SATBTurnManager.coreTurnFrameClockMax()
 *          - Returns the number of frames constituting the current turn
 *      16. (v0.04a+) SATBTurnManager.coreTurnSecClockMaxInMs()
 *          - Returns the number of milliseconds constituting the current turn
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
 *         - (Advanced)actTimes is supposed to be a Nonnegative Integer
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
 *         - (Advanced)increment is supposed to be an Integer
 *         - (Advanced)This script call isn't supposed to be idempotent
 *      10. multiplySATBActTimes(multiplier)
 *          - The same as the script call addSATBActTimes(increment) except
 *            that this one multiplies the number of virtual action slots of
 *            the battler involved by multiplier
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
 *          - (Advanced)It's supposed to return a positive Number
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
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
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
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
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
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
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
 *            Note that no space's allowed in target so target won't work with
 *            battler names with spaces
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
DoubleX_RMMV["Superlative ATB Documentations"] = "v0.05a";
//

// Ensures that all plugins are of the latest version
DoubleX_RMMV.SATB_VERS = {
    Parameters: "0.05a",
    Configurations: "0.05a",
    Implementations: "0.05a",
    "Unit Tests": "0.05a",
    Compatibilities: "0.03a",
    "Compatibility Tests": "0.01a"
}; // DoubleX_RMMV.SATB_VERS
Object.keys(DoubleX_RMMV.SATB_VERS).forEach(function(plugin) {
    "use strict";
    var current = DoubleX_RMMV["Superlative ATB " + plugin];
    // console.warn should be used instead of alert as some of them are optional
    if (!current) {
        return console.warn("DoubleX RMMV Superlative ATB " + plugin +
                " should be above DoubleX RMMV Superlative ATB Documentations");
    }
    var latest = "v" + DoubleX_RMMV.SATB_VERS[plugin];
    if (current === latest) return;
    console.warn("The version of DoubleX RMMV Superlative ATB " + plugin +
            " should be " + latest + " but is " + current);
    //
});
// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
