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
 *      2. The configuration region is generally for more advanced uses, as
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
 *      6. You might have to read some new variables/functions to have a basic
 *         knowledge on what they do in order to realize some intended cases
 *      7. You might have to dig into the mechanisms of some new
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
 *      1.
 *      Videos:
 *      1.
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open this js file to access its configuration region
 *      2. The default plugin parameters file name is
 *         DoubleX RMMV Superlative ATB Params v100a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Superlative_ATB_Params_File, which must be done via
 *         opening the parameters plugin js file directly
 *      3. If you wish to use DoubleX RMMV Superlative ATB Unit Test, place it
 *         right below DoubleX RMMV Superlative ATB Implementation
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      Documentations:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *      Parameters:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *      Configurations:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *      Implementations:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *      Unit Test:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *      Compatibility:
 *      - v1.00a(GMT 0400 13-Nov-2019)
 *        1. 1st version of this plugin finished
 *----------------------------------------------------------------------------
 *    # Todo
 *      1.
 *============================================================================*/
/*:
 * @plugindesc To be the most flexible, performant and powerful RMMV ATB system
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
 *          - <doublex rmmv skill progress contents>
 *          - <skill progress contents>
 *          (Reference tag: NOTE_STRUCTURE)
 *          Where contents are in the form of type suffixes: entries
 *          Either of the above can be used, but the 1st one reduce the chance
 *          of causing other plugins to treat the notetags of this plugin as
 *          theirs, while the 2nd one is more user-friendly
 *          - type is one of the following:
 *            cond(related to condNotePriority and condNoteChainingRule)
 *            max(related to maxNotePriority and maxNoteChainingRule)
 *            useGain(related to useGainNotePriority and
 *                    useGainNoteChainingRule)
 *            hitGain(related to hitGainNotePriority and
 *                     hitGainNoteChainingRule)
 *            next(related to nextNotePriority and nextNoteChainingRule)
 *            keepCurrent(related to keepCurrentNotePriority and
 *                        keepCurrentNoteChainingRule)
 *            willEnd(related to willEndNotePriority and
 *                    willEndNoteChainingRule)
 *            didEnd(related to didEndNotePriority and didEndNoteChainingRule)
 *            (Reference tag: NOTE_TYPE)
 *          - suffixes is the list of suffixes in the form of:
 *            suffix1 suffix2 suffix3 ... suffixn
 *            Where each suffix is either of the following:
 *            cfg(The notetag value will be the corresponding NOTEX in the
 *                configuration region, which is inside this plugin js file)
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
 *          - entries is the list of entries in the form of:
 *            entry1, entry2, entry3, ..., entryn
 *            Where entryi must conform with the suffixi specifications
 *          - (Advanced)Each content type has a corresponding eval variant:
 *            <skill progress type>
 *            function content
 *            </skill progress type>
 *            and this counterpart:
 *            <doublex rmmv skill progress type>
 *            function content
 *            </doublex rmmv skill progress type>
 *            The functions arguments are exactly the same as the counterpart
 *            with the cfg suffix
 *            This eval variant only applies to notetags having only 1 suffix
 *       4. (Advanced)The notetag results are cached as follows:
 *          - The effective notetag list's divided into these parts:
 *            Effective actor notetag list
 *            Effective class notetag list
 *            Effective weapon notetag list
 *            Effective armor notetag list
 *            Effective state notetag list
 *            Effective skill notetag list
 *            They'll be sorted according to the corresponding note priority
 *            and their results will be chained according to the corresponding
 *            note chaining rule
 *            (Reference tag: NOTE_LIST_PART)
 *          - Each of the above parts have its own effective notetag list
 *            cache, which will be recached if it's possible that the
 *            effective notetag list might have changed due to changing
 *            weapons/armors/states/etc, which will automatically raise the
 *            coresponding note change factor for the corresponding note
 *            (Reference tag: NOTE_LIST_CACHE)
 *          - Each of the above parts has its own intermediate result cache
 *            based on the result chained from the effective notetags with
 *            higher priorities, and this intermediate result cache will be
 *            recached if the effective notetag list of that part or any of
 *            those having higher priorities have their intermediate result
 *            cache recached, or if the corresponding note priority/chain rule
 *            has changed(this change should raise the priority/chain rule
 *            factor manually)
 *            (Reference tag: NOTE_RESULT_CACHE)
 *          - If the actor's refreshed due to changes other than class,
 *            weapons, armors, states and last used skill, all note change
 *            factors for all notes will be automatically raised
 *            (Reference tag: ACTOR_REFRESH_RECACHE_NOTE)
 *          - If users changes some notetags from some data manually, then
 *            the corresponding note change factor should be raised
 *            immediately afterwards
 *          - If the users are sure that the effective notetag list of a part
 *            remains intact but its intermediate result cache might be
 *            invalid, then the result factor of the corresponding note should
 *            be raised immediately
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/State/Skill Notetag contents:
 *      1. cond suffix1 suffix2: entry1, entry2
 *         - Sets a prerequisite to be met for the skill to be progressed with
 *           descriptions to be shown
 *         - suffix1 and suffix2 can be cfg, val, switch, var or script
 *         - (Advanced)Please refer to Cond Functions in the configuration
 *           region for using cfg or script suffixes
 *         - The result of entry1 can be anything as it's used as truthy/falsy
 *           to check whether the prerequisite's met
 *         - The result of entry2 can be any String as the condition
 *           descriptions
 *         - If the result of entry2 is falsy, the result of entry1 will also
 *           be treated as falsy
 *           (Reference tag: INVALID_COND_DESC)
 *         - If there's no such effective notetag, the skill involved won't
 *           progress
 *         - E.g.:
 *           <skill progress cond switch var: 1, 2> will set a prerequisite
 *           for the skill to be progressed as the value of the game switch
 *           with id 1, with descriptions to be shown as the value of the game
 *           variable with id 2, provided that that variable stores a String
 *      Core Module:
 *      1. is fill core atb suffix: entry
 *         - Sets whether the atb bar for the battler involved will be filled
 *           as the value returned by function with name IF_ATB_CORE_X, which
 *           can only be edited in the configuration region, which is inside
 *           this plugin js file contents, directly
 *         - E.g.:
 *           <is fill satb core: IF_ATB_CORE_1> causes the atb bar for the
 *           battler involved to be always filled
 *============================================================================
 *    ## Script Call Info
 *----------------------------------------------------------------------------
 *    # (Advanced)Configuration manipulations
 *      1. $gameSystem.skillProgress.params.param
 *         - Returns the stored value of param listed in the plugin manager or
 *           their configuration counterparts
 *         - E.g.:
 *           $gameSystem.skillProgress.params.isEnabled will return the
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *      2. $gameSystem.skillProgress.params.param = funcContents
 *         - Sets the stored value of param listed in the plugin manager or
 *           their configuration counterpart as funcContents, which is the
 *           contents of a function
 *         - E.g.:
 *           $gameSystem.skillProgress.params.isEnabled = "return false;" will
 *           set the stored value of parameter isEnabled shown on the plugin
 *           manager or its configuration counterpart as "return false;",
 *           causing the corresponding function to always return false, thus
 *           always disabling this plugin
 *         - $gameSystem.skillProgress.params.param changes will be saved
 *         - DoubleX_RMMV.Skill_Progress.params.param = func, where func is
 *           the corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      3. $gameSystem.skillProgress.cfgs.cfg
 *         - Basically the same as $gameSystem.skillProgress.params.param,
 *           except that this script call applies to configurations found in
 *           the configuration region only
 *      4. $gameSystem.skillProgress.cfgs.cfg = funcContents
 *         - Basically the same as
 *           $gameSystem.skillProgress.params.param = funcContents, except that
 *           this script call applies to configurations found in the
 *           configuration region only
 *         - DoubleX_RMMV.Skill_Progress.cfgs.cfg = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      5. $gameSystem.skillProgress.notes.note
 *         - Basically the same as $gameSystem.skillProgress.params.param,
 *           except that this script call applies to notetag values found in
 *           the configuration region
 *      6. $gameSystem.skillProgress.notes.note = funcContents
 *         - Basically the same as
 *           $gameSystem.skillProgress.params.param = funcContents, except
 *           that this script call applies to notetag values found in the
 *           configuration region
 *         - DoubleX_RMMV.Skill_Progress.notes.note = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *    # (Advanced)Actor/Class/Weapon/Armor/State/Skill notetag manipulations
 *      All meta.skillProgress changes can be saved if
 *      DoubleX RMMV Dynamic Data is used
 *      1. meta.skillProgress.note
 *         - note is either of the following:
 *           cond(corresponds to notetag content
 *                cond suffix1 suffix2: entry1, entry2)
 *           max(corresponds to notetag content max suffix1: entry1)
 *           useGain(corresponds to notetag content useGain suffix1: entry1)
 *           hitGain(corresponds to notetag content hitGain suffix1: entry1)
 *           next(corresponds to notetag content next suffix1: entry1)
 *           keepCurrent(corresponds to notetag content
 *                      keepCurrent suffix1: entry1)
 *           willEnd(corresponds to notetag content willEnd suffix1: entry1)
 *           didEnd(corresponds to notetag content didEnd suffix1: entry1)
 *         - Returns the Array of Objects in this form:
 *           { suffixi: suffixi, entryi: entryi }
 *           Which corresponds to <skill progress note suffixi: entryi>
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - E.g.:
 *           $dataWeapons[3].meta.skillProgress.cond will return the Array of
 *           Object
 *           [{ suffix1: "switch", entry1: "1", suffix2: "var", entry2: "2" }]
 *           if the effective notetag of  weapon with id 3 is
 *           <skill progress cond switch var: 1, 2>
 *      2. meta.skillProgress.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is either of the following:
 *           cond(corresponds to notetag content
 *                cond suffix1 suffix2: entry1, entry2)
 *           max(corresponds to notetag content max suffix1: entry1)
 *           useGain(corresponds to notetag content useGain suffix1: entry1)
 *           hitGain(corresponds to notetag content hitGain suffix1: entry1)
 *           next(corresponds to notetag content next suffix1: entry1)
 *           keepCurrent(corresponds to notetag content
 *                       keepCurrent suffix1: entry1)
 *           willEnd(corresponds to notetag content willEnd suffix1: entry1)
 *           didEnd(corresponds to notetag content didEnd suffix1: entry1)
 *         - Sets the notetag to be the same as
 *           <skill progress note suffixi: entryi>
 *         - E.g.:
 *           $dataArmors[4].meta.skillProgress.cond =
 *           [{ suffix1: "switch", entry1: "1", suffix2: "var", entry2: "2" }]
 *           will set the max notetag of the armor with id 4 to be the same as
 *           <skill progress cond switch var: 1, 2>
 *    # Actor manipulations
 *      1. skillProgressCondDesc(skillId)
 *         - Returns the mapping with the condition descriptions as the keys
 *           and their statuses as the values for the skill with id skillId to
 *           progress for the actor involved
 *         - The mapping being empty means that the skill involved won't
 *           progress due to having no effective cond notetags and is thus
 *           treated as a normal skill
 *           (Reference tag: SKILL_COND_DESCS)
 *         - The mapping having only truthy values means that the prerequisites
 *           are met under the cond notetag chaining rule
 *           (Reference tag: SKILL_COND_DESCS)
 *         - (Advanced)It's supposed to return an Object
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].skillProgressCondDesc(3) will return
 *           the mapping with the condition descriptions as the keys and their
 *           statuses as the values for the skill with id 3 to progress for
 *           the 1st alive party member
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      2. maxSkillProgress(skillId)
 *         - Returns the maximum experience needed to end progressing the
 *           skill with id skillId for the actor involved
 *         - (Advanced)It's supposed to return a positive Number
 *         - E.g.:
 *           If the maximum experience needed to end progressing the skill
 *           with id 3 is 400 for the 1st alive party member, then
 *           $gameParty.aliveMembers()[0].maxSkillProgress(3) will return 400
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      3. useGainSkillProgress(skillId)
 *         - Returns the experience gain of the skill with id skillId to be
 *           progressed upon use for the actor involved
 *         - (Advanced)It's supposed to return a Number
 *         - E.g.:
 *           If the experience gain of the skill with id 4 to be progressed
 *           upon use for the actor with id 1 is 100, then
 *           $gameActors.actor(1).useGainSkillProgress(4) will return 100
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      4. hitGainSkillProgress(skillId, target, value)
 *         - Returns the experience gain of the skill with id skillId to be
 *           progressed upon hitting target target with damage value for the
 *           actor involved
 *         - (Advanced)It's supposed to return a Number
 *         - E.g.:
 *           If the experience gain of the skill with id 5 to be progressed
 *           upon hitting the 1st enemy with 400 damage for the actor with id
 *           2 is 100, then
 *           $gameActors.actor(2).hitGainSkillProgress(
 *           5, $gameTroop.aliveMembers()[0], 400) will return 100
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      5. nextSkillProgress(skillId)
 *         - Returns the list of skill ids to be learned upon ending
 *           progressing that with id skillId for the actor involved
 *         - (Advanced)It's supposed to return a list of valid skill ids
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *           nextSkillProgress(6) will return the list of skill ids to be
 *           learnt upon ending progressing that with id 6 for the last alive
 *           party member
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      6. isKeepSkillProgress(skillId)
 *         - Returns whether the skill with id skillId will be kept or
 *           forgotten upon ending its progression for the actor involved
 *         - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *           isKeepSkillProgress(4) will return whether the skill with id 4
 *           will be kept or forgotten upon ending its progression for the
 *           last alive party member
 *      7. currentSkillProgress(skillId)
 *         - Returns the current experience of the skill with id skillId to be
 *           progressed for the actor involved
 *         - (Advanced)It's supposed to return a nonnegative Number that is
 *           not greater than the maximum experience of the same skill
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].currentSkillProgress(3) returns the
 *           current experience of the skill with id 3 to be progressed for
 *           the 1st alive party member
 *         - (Advanced)It's supposed to be Nullipotent
 *      8. setCurrentSkillProgress(skillId, value)
 *         - Sets the current experience of the skill with id skillId to be
 *           progressed for the actor involved as value
 *         - (Advanced)value is supposed to be a nonnegative Number that is
 *           not greater than the maximum experience of the same skill, so
 *           it'll be clamped if it's out of range and discarded if it's not
 *           a Number
 *           (Reference tag: CURRENT_EXP_RANGE)
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].setCurrentSkillProgress(3, 100) sets
 *           the current experience of the skill with id 3 to be progressed
 *           for the 1st alive party member as 100
 *         - (Advanced)It's supposed to be Idempotent
 *      9. (Advanced)raiseAllSkillProgressNoteChangeFactors()
 *         - Applies the script call
 *           raiseSkillProgressNoteChangeFactor(note, factor) to all notes and
 *           factors
 *      10. (Advanced)raiseSkillProgressNoteChangeFactor(note, factor)
 *         - Notifies that the notetag note might need to be recached due to
 *           potential changes in factor factor
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - factor is either of the following:
 *           "states"(Changes in state notetags)
 *           "armors"(Changes in armor notetags)
 *           "weapons"(Changes in weapon notetags)
 *           "currentClass"(Changes in class notetags)
 *           "actor"(Changes in actor notetags)
 *           "priority"(Changes in the corresponding note priorities)
 *           "chainingRule"(Changes in the corresponding note chaining rules)
 *           "result"(Changes in all intermediate results for the note)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].raiseSkillProgressNoteChangeFactor(
 *           "cond", "states") will notify the 1st alive party member that the
 *           cond notetags might need to be recached due to potential changes
 *           in the states or their cond notetags
 *      11. (Advanced)skillProgressNoteResult(note, part)
 *         - Returns the cached intermediate result of part part in note note
 *           for the actor involved
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *         - It's supposed to be Nullipotent other than possible recaching
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].skillProgressNoteResult(
 *           "cond", "states") will return the cached intermediate result of
 *           all effective cond notetags in states for the 1t alive party
 *           member
 *      12. (Advanced)invalidateSkillProgressNoteResult(note, part)
 *         - Invalidates the cached intermediate result of part part in note
 *           note for the actor involved
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSkillProgressNoteResult(
 *           "cond", "states") will invalidate the cached intermediate result
 *           of all effective cond notetags in states for the 1t alive party
 *           member
 *============================================================================
 *    ## Plugin Command Info
 *       Don't use this plugin command for actors that don't exist yet unless
 *       you really know what you're truly doing
 *----------------------------------------------------------------------------
 *      1. skillProgressCondDesc actorId skillId
 *         - The same as the script call skillProgressCondDesc(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      2. maxSkillProgress actorId skillId
 *         - The same as the script call maxSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      3. useGainSkillProgress actorId skillId
 *         - The same as the script call useGainSkillProgress(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      4. hitGainSkillProgress actorId skillId target value
 *         - The same as the script call
 *           hitGainSkillProgress(skillId, target, value) in Actor
 *           manipulations for the actor with id actorId
 *      5. nextSkillProgress actorId skillId
 *         - The same as the script call nextSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      6. isKeepSkillProgress actorId skillId
 *         - The same as the script call isKeepSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      7. currentSkillProgress actorId skillId
 *         - The same as the script call currentSkillProgress(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      8. setCurrentSkillProgress actorId skillId value
 *         - The same as the script call
 *           setCurrentSkillProgress(skillId, value) in Actor manipulations
 *           for the actor with id actorId
 *      9. (Advanced)raiseAllSkillProgressNoteChangeFactors actorId
 *         - The same as the script call
 *           raiseAllSkillProgressNoteChangeFactors() in Actor manipulations
 *           for the actor with id actorId
 *      10. (Advanced)raiseSkillProgressNoteChangeFactor actorId note factor
 *         - The same as the script call
 *           raiseSkillProgressNoteChangeFactor(note, factor) in Actor
 *           manipulations for the actor with id actorId
 *      11. (Advanced)skillProgressNoteResult actorId note part
 *         - The same as the script call skillProgressNoteResult(note, part)
 *           in Actor manipulations for the actor with id actorId
 *      12. (Advanced)invalidateSkillProgressNoteResult actorId note part
 *         - The same as the script call
 *           invalidateSkillProgressNoteResult(note, part) in Actor
 *           manipulations for the actor with id actorId
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB"] = "v1.00a";
