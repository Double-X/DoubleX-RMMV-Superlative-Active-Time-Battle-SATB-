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
 *      1.
 *      Videos:
 *      1.
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open the configuration plugin js file to access those configurations
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
 *      - v1.00a(GMT 0500 14-May-2020)
 *        1. Finished the core module
 *      Parameters:
 *      - v1.00a(GMT 0500 14-May-2020)
 *        1. Finished the core module
 *      Configurations:
 *      - v1.00a(GMT 1400 14-May-2020)
 *        1. Finished the core module
 *      Implementations:
 *      - v1.00a(GMT 1400 14-May-2020)
 *        1. Finished the core module
 *      Unit Test:
 *      - v1.00a(GMT 1400 14-May-2020)
 *        1. Finished the core module
 *      Compatibility:
 *      - v1.00a(GMT 1400 14-May-2020)
 *        1. Finished the core module
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
 *                       coreMaxATBValNoteChainingRule and
 *                       coreMaxATBValNotePriority)
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
 *            They'll be sorted according to the corresponding note priority
 *            and their results will be chained according to the corresponding
 *            note chaining rule
 *            (Reference tag: NOTE_LIST_PART)
 *          - Each of the above parts have its own effective notetag list
 *            cache, which will be recached if it's possible that the
 *            effective notetag list might have changed due to changing
 *            classes/weapons/armors/states/etc, which will automatically raise
 *            the coresponding note change factor for the corresponding note
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
 *      2. max suffix1: entry1
 *         - Sets the maximum experience of the skill to be progressed
 *         - suffix1 can be cfg, val, var or script
 *         - (Advanced)Please refer to Max Functions in the configuration
 *           plugin for using cfg or script suffixes, or the eval variant
 *         - The result of entry1 can be any positive Number as the maximum
 *           experience
 *         - Having an invalid result is the same as not meeting prerequisites
 *           (Reference tag: INVALID_MAX)
 *         - If the maximum experience of the skill to be progressed's reduced
 *           to become not greater than its current experience, the skill will
 *           be ended progressing immediately
 *           (Reference tag: REDUCED_MAX_END_SKILL_PROGRESS)
 *         - E.g.:
 *           <skill progress max var: 1> will set the maximum experience of
 *           the skill to be progressed as the value of the game variable with
 *           id 1
 *      Core Module:
 *      1. coreMax suffix: entry
 *         - Sets the maximum ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Max Functions in the core module of the
 *           configuration plugin for using cfg or script suffixes, or the eval
 *           variant
 *         - The result of entry can be any positive Number
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
 *         - E.g.:
 *           If coreMaxATBValNoteChainingRule is set as return "*";, and the
 *           only coreMax notetag is <satb coreMax var: 1>, then this notetag
 *           will set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1 as long as
 *           that value is a positive Number
 *============================================================================
 *    ## Script Call Info
 *----------------------------------------------------------------------------
 *    # (Advanced)Configuration manipulations
 *      1. $gameSystem.satbParam(param)
 *         - Returns the stored value of param listed in the parameter plugin
 *           or their configuration counterparts in the configuration plugin
 *         - E.g.:
 *           $gameSystem.satbParam("IsCoreEnabled") will return the String
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *      2. $gameSystem.setSATBParam(param, funcContents)
 *         - Sets the stored value of param listed in the parameter plugin or
 *           their configuration counterpart in the configuration plugin as
 *           funcContents, which is the String contents of a function
 *         - E.g.:
 *           $gameSystem.setSATBParam("IsCoreEnabled", "return false;") will
 *           set the stored value of parameter IsCoreEnabled shown on the
 *           parameter plugin or its configuration counterpart in the
 *           configuration plugin as "return false;", causing the corresponding
 *           function to always return false, thus always disabling this plugin
 *         - Such function content changes will be saved in save files
 *      3. $gameSystem.satbNote(NOTEX)
 *         - Basically the same as $gameSystem.satbParam(param), except that
 *           this script call applies to notetag values of NOTEX found in the
 *           configuration plugin
 *      4. $gameSystem.setSATBNote(NOTEX, funcContents)
 *         - Basically the same as
 *           $gameSystem.setSATBParam(param, funcContents), except
 *           that this script call applies to notetag values of NOTEX found in
 *           the configuration plugin
 *    # (Advanced)Actor/Class/Weapon/Armor/State/Skill notetag manipulations
 *      All meta.skillProgress changes can be saved if
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
 *           [{ suffix: "var", entry: "2" }] if the effective notetag of weapon
 *           with id 3 is <satb coreMax var: 1, 2>
 *      2. meta.skillProgress.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is the same as that of meta.satb.note
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
 *============================================================================
 *    ## Plugin Command Info
 *       Don't use this plugin command for actors that don't exist yet unless
 *       you really know what you're truly doing
 *----------------------------------------------------------------------------
 *      1. skillProgressCondDesc actorId skillId
 *         - The same as the script call skillProgressCondDesc(skillId) in
 *           Actor manipulations for the actor with id actorId
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
};
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
                  "be placed above DoubleX RMMV Superlative ATB Documentations");
    }
});
// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
