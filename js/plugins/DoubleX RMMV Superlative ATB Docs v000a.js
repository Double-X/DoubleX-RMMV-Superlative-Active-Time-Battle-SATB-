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
 *      2. Little RMMV plugin development proficiency for more advanced uses
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *      4. Decent RMMV plugin development proficiency to fully utilize this
 *         plugin with creative and unintended uses
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. DoubleX RMMV Superlative ATB aims to give extreme control and
 *         freedom to users by making it as flexible as I can with as little
 *         damage to user-friendliness as I can
 *      2. The configuration plugin is generally for more advanced uses, as
 *         most ordinary cases should be covered by parameters and notetags
 *      3. (Advanced)You might have to have a basic knowledge on what this
 *         Plugin Implementation does to fully utilize this plugin in intended
 *         ways and solid understanding on how this Plugin Implementation
 *         works to fully utilize this plugin with creative and unintended
 *         uses
 *      4. This is an advanced complex plugin, meaning that you're expected to
 *         use the default parameters and configuration values first to be
 *         familiar with playing the game with this plugin before changing
 *         any of those values and/or using any notetags
 *      5. You might have to use some script calls in RMMV and some of those
 *         provided by this plugin to realize some of the more advanced uses
 *      6. (Advanced)You might have to read some new variables/functions to
 *         have a basic knowledge on what they do in order to realize some
 *         intended cases
 *      7. (Advanced)You might have to dig into the mechanisms of some new
 *         variables/functions to have a solid underatanding on how they work
 *         alone in order to realize some unintended usages
 *      8. If you want to keep things easy, simple and small, you may want to
 *         use DoubleX RMMV Popularized ATB instead
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
 *----------------------------------------------------------------------------
 *    # Links
 *      Demo:
 *      1. https://github.com/Double-X/DoubleX-RMMV-Superlative-Active-Time-Battle-SATB-
 *      Videos:
 *      1.
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open the configuration plugin js file to access those
 *         configurations
 *      2. The default plugin parameters file name is
 *         DoubleX RMMV Superlative ATB Params v100a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Superlative_ATB_Parameters_File, which must be done
 *         via opening the parameters plugin js file directly
 *      3. If you wish to use DoubleX RMMV Superlative ATB Unit Test, place it
 *         right below DoubleX RMMV Superlative ATB Implementation
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      Documentations:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *      Parameters:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *      Configurations:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *      Implementations:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *      Unit Test:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *      Compatibility:
 *      - v1.00a(GMT 0800 14-May-2020)
 *        1. Finished the core module
 *----------------------------------------------------------------------------
 *    # Todo
 *      1. Adds _isSaveParamNotes
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
 *         - Having an invalid entry value will make the notetag ineffective
 *           (Reference tag: INVALID_NOTE)
 *         - If the maximum ATB value of the battler decreases to become not
 *           greater than the inputability threshold, the battler will become
 *           inputable if that battler can be inputable
 *           (Reference tag: DECREASED_MAX_CORE_ATB_INPUTABLE)
 *         - If the maximum ATB value of the battler increases to become
 *           greater than the inputability threshold, the battler will become
 *           not inputable
 *           (Reference tag: INCREASED_MAX_CORE_ATB_NOT_INPUTABLE)
 *         - (Advanced) The maximum ATB value of the battler must be much
 *           larger than Number.EPSILON
 *         - E.g.:
 *           If _coreMaxATBValNoteChainingRule is set as *, and the only
 *           coreMax notetag is <satb coreMax var: 1>, then this notetag will
 *           set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1 as long as
 *           that value is a positive Number
 *----------------------------------------------------------------------------
 *    # State Notetag contents:
 *      Core Module:
 *      1. coreActState suffix: entry
 *         - Sets the state to be an action state, which will have its turn
 *           updated when the battler having this state prepares to execute
 *           actions(this includes charging but not inputting actions) rather
 *           than upon turn end or action end
 *           (Reference tag: ACT_STATE)
 *         - suffix can be cfg, val, var or script
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
 *         - E.g.:
 *           $gameSystem.satbParam("IsCoreEnabled") will return the String
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
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
 *      2. meta.satb.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is the same as that of meta.satb.note
 *         - Sets the notetag to be the same as <satb note suffixi: entryi>
 *         - E.g.:
 *           $dataArmors[4].meta.satb.coreMax =
 *           [{ suffix: "var", entry: "2" }] will set the coreMax notetag of
 *           the armor with id 4 to be the same as <satb coreMax var: 1, 2>
 *         - If the notetag uses switches or variables, you must update
 *           $gameSystem._satb.switchIds or $gameSystem._satb.varIds manually
 *           (You can check the method _updateIds in DataManager for help)
 *    # Battler manipulations
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
 *         - (Advanced)val is supposed to be a Number
 *         - E.g.:
 *           $gameTroop.members()[0].addCoreSATB(-100) will subtract the
 *           current ATB value of the 1st troop member by 100
 *      4. addCoreSATBProportion(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one adds the current ATB value of the battler involved by
 *           the amount in which its proportion relative to the maximum
 *           counterpart is proportion
 *      5. clearCoreSATB()
 *         - Sets the new current ATB value of the battler involved as 0 if
 *           it was positive(otherwise it'll remain unchanged)
 *         - (Advanced)val is supposed to be a Number
 *         - E.g.:
 *           $gameTroop.deadMembers()[1].clearCoreSATB() won't have any effect
 *           if the current ATB value of the 2nd dead troop member is negative
 *         - (Advanced)It's supposed to be Idempotent
 *      6. coreSATB()
 *         - Returns the current ATB value of the battler involved
 *         - (Advanced)It's supposed to return a Number
 *         - E.g.:
 *           $gameActors.actor(0).coreSATB() will return the current value of
 *           the 1st actor
 *         - (Advanced)It's supposed to be Nullipotent
 *      7. coreMaxSATB()
 *         - Returns the maximum ATB value of the battler involved
 *         - (Advanced)It's supposed to return a positive Number
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].coreMaxSATB() will return the
 *           maximum value of the 1st alive party member
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      10. (Advanced)raiseAllSATBNoteChangeFactors()
 *          - Applies the script call
 *            raiseSATBNoteChangeFactors(note, factors) to all notes
 *      11. (Advanced)raiseSATBNoteChangeFactors(note, factors)
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
 *      12. (Advanced)invalidateSATBNoteResult(note, part)
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
 *           coreMax notetags in states for the 1t alive party member
 *      13. (Advanced)invalidateSATBNoteList(note, part)
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
 *           states for the 1t alive party member
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
 *      5. clearCoreSATB targetType targets
 *          - The same as the script call clearCoreSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      10. raiseAllSATBNoteChangeFactors targetType targets
 *          - The same as the script call raiseAllSATBNoteChangeFactors() in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      11. raiseSATBNoteChangeFactors targetType targets note factors
 *          - The same as the script call coreMaxSATB(note, factors) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      12. invalidateSATBNoteResult targetType targets note part
 *          - The same as the script call invalidateSATBNoteResult(note, part)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      13. invalidateSATBNoteList targetType targets note part
 *          - The same as the script call invalidateSATBNoteList(note, part)in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *============================================================================
 */

// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Documentations"] = "v0.00a";
//

// Ensures that all plugins are of the latest version
DoubleX_RMMV.SATB_VERS = {
    Parameters: "0.00a",
    Configurations: "0.00a",
    Implementations: "0.00a",
    "Unit Test": "0.00a",
    Compatibility: "0.00a"
}; // DoubleX_RMMV.SATB_VERS
Object.keys(DoubleX_RMMV.SATB_VERS).forEach(function(plugin) {
    var current = DoubleX_RMMV["Superlative ATB " + plugin];
    if (current) {
        var latest = "v" + DoubleX_RMMV.SATB_VERS[plugin];
        if (current !== latest) {
            console.warn("The version of DoubleX RMMV Superlative ATB " +
                    plugin + " should be" + latest + " but is " + current);
        }
    } else {
          console.warn("DoubleX RMMV Superlative ATB " + plugin + " should " +
                  "be above DoubleX RMMV Superlative ATB Documentations");
    }
});
// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
