/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Skill Hotkeys
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. When the party's out of battles, an actor can bind hotkeys to his/her
 *       currently usable/unusable skills in the skill menu, unless the result
 *       of the relevant notetags indicates otherwise
 *       All these bindings will be saved
 *    2. When the party's inside battles, an actor having nonempty hotkey slot
 *       can use hotkeys to use their corresponding usable skills directly,
 *       unless the result of the relevant notetags indicates otherwise
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
 *      1. Nothing special for most ordinary cases
 *      2. Little RMMV plugin development proficiency for more advanced uses
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. DoubleX RMMV Skill Hotkeys aims to give extreme control and freedom
 *         to users by making it as flexible as I can with as little damage to
 *         user-friendliness as I can
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. https://pastebin.com/iEfRMhf3
 *      Video:
 *      1. https://www.youtube.com/watch?v=iBaFP_cN5yE
 *      DoubleX RMMV Skill Hotkeys Unit Test:
 *      1. https://pastebin.com/iHh5frL3
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open this js file to access its configuration region
 *         Some settings, like the hotkey mappings, are only available as
 *         configurations
 *      2. The default plugin file name is DoubleX RMMV Skill Hotkeys v101a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Skill_Hotkeys_File, which must be done via opening
 *         this plugin js file directly
 *      3. If you wish to use DoubleX RMMV Skill Hotkeys Unit Test, place it
 *         right below this plugin
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01a(GMT 1400 17-7-2019):
 *      1. Lets you show skill names instead of icons in the hotkey list
 *      2. Lets you show hotkey icons instead of names in the hotkey list
 *      (v1.01a+ will be incompatible with v1.00a due to hotkeyNames changes)
 *      v1.00a(GMT 0900 8-9-2017):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you bind hotkeys to skills for actors outside
 * battles, and use them to select usable skills for actors inside battles
 * @author DoubleX
 *
 * @param isEnabled
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default return true;
 *
 * @param bindNotePriority
 * @desc Sets the data type priority of <bind skill hotkey: BSHX>
 * It'll be the contents of a function returning an Array of Strings
 * @default return ["states", "armors", "weapons", "classes", "actors"];
 *
 * @param useNotePriority
 * @desc Sets the data type priority of <use skill hotkey: USHX>
 * It'll be the contents of a function returning an Array of Strings
 * @default return ["states", "armors", "weapons", "classes", "actors"];
 *
 * @param bindNoteChainingRule
 * @desc Sets how to use multiple <bind skill hotkey: BSHX> notetags
 * It'll be the contents of a function returning a String
 * @default return "first";
 *
 * @param useNoteChainingRule
 * @desc Sets how to use multiple <use skill hotkey: USHX> notetags
 * It'll be the contents of a function returning a String
 * @default return "first";
 *
 * @param bindHotkeyText
 * @desc Sets the bind hotkey text for skills without hotkeys
 * It'll be the contents of a function returning a String
 * @default return "Bind Hotkey";
 *
 * @param useSkillText
 * @desc Sets the use skill text when showing the bind hotkey texts
 * It'll be the contents of a function returning a String
 * @default return "Use";
 *
 * @param unusableSkillCoverIconPath
 * @desc Sets the path of the icon masking that of unusable skills
 * It'll be the contents of a function returning a String
 * @default return "img/pictures/";
 *
 * @param unusableSkillCoverIconName
 * @desc Sets the name of the icon masking that of unusable skills
 * It'll be the contents of a function returning a String
 * @default return "UnusableSkill";
 *
 * @param unusableSkillCoverIconHue
 * @desc Sets the hue of the icon masking that of unusable skills
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param unusableSkillCoverIconSmooth
 * @desc Sets the smooth of the icon masking that of unusable skills
 * It'll be the contents of a function returning a Boolean
 * @default return true;
 *
 * @param hotkeyCmdWindowW
 * @desc Sets the width of the window for binding hotkeys to skills
 * It'll be the contents of a function returning a Number
 * @default return Window_SkillHotkeyBase.prototype.windowWidth.call(this);
 *
 * @param hotkeyCmdWindowH
 * @desc Sets the height of the window for binding hotkeys to skills
 * It'll be the contents of a function returning a Number
 * @default return Window_SkillHotkeyBase.prototype.windowHeight.call(this);
 *
 * @param hotkeyCmdWindowX
 * @desc Sets the x position of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param hotkeyCmdWindowY
 * @desc Sets the y position of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param hotkeyCmdLineH
 * @desc Sets the line height of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 36;
 *
 * @param hotkeyCmdFontSize
 * @desc Sets the font size of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 28;
 *
 * @param hotkeyCmdPadding
 * @desc Sets the standard padding of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 18;
 *
 * @param hotkeyCmdTextPadding
 * @desc Sets the text padding of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 6;
 *
 * @param hotkeyCmdBackOpacity
 * @desc Sets the back opacity of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 192;
 *
 * @param hotkeyCmdTranslucentOpacity
 * @desc Sets the translucent opacity of the hotkey binding window
 * It'll be the contents of a function returning a Number
 * @default return 160;
 *
 * @param hotkeyCmdSpacing
 * @desc Sets the spacing of the window for binding hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 12;
 *
 * @param hotkeyListWindowW
 * @desc Sets the width of the window listing the actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth;
 *
 * @param hotkeyListWindowH
 * @desc Sets the height of the window listing the actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return this.fittingHeight(2);
 *
 * @param hotkeyListWindowX
 * @desc Sets the x position of the window listing actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param hotkeyListWindowY
 * @desc Sets the y position of the window listing actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param hotkeyListLineH
 * @desc Sets the line height of the window listing actor hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 36;
 *
 * @param hotkeyListFontSize
 * @desc Sets the font size of the window listing actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return 28;
 *
 * @param hotkeyListPadding
 * @desc Sets the padding of the window listing actor hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 18;
 *
 * @param hotkeyListTextPadding
 * @desc Sets the text padding of the window listing actor hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 6;
 *
 * @param hotkeyListBackOpacity
 * @desc Sets the back opacity of the window listing actor hotkeys
 * It'll be the contents of a function returning a Number
 * @default return 192;
 *
 * @param hotkeyListTranslucentOpacity
 * @desc Sets the translucent opacity of the actor hotkey list window
 * It'll be the contents of a function returning a Number
 * @default return 160;
 *
 * @param hotkeyListSpacing
 * @desc Sets the spacing of the window listing actor hotkey slots
 * It'll be the contents of a function returning a Number
 * @default return 12;
 *
 * @param hotkeyCmdListWindowW
 * @desc Sets the width of the window listing the hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth;
 *
 * @param hotkeyCmdListWindowH
 * @desc Sets the height of the window listing the hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return this.fittingHeight(2);
 *
 * @param hotkeyCmdListWindowX
 * @desc Sets the x position of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param hotkeyCmdListWindowY
 * @desc Sets the y position of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxHeight - this.fittingHeight(4) - this.windowHeight();
 *
 * @param hotkeyCmdListLineH
 * @desc Sets the line height of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return 36;
 *
 * @param hotkeyCmdListFontSize
 * @desc Sets the font size of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return 28;
 *
 * @param hotkeyCmdListPadding
 * @desc Sets the padding of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return 18;
 *
 * @param hotkeyCmdListTextPadding
 * @desc Sets the text padding of the hotkey window in battle
 * It'll be the contents of a function returning a Number
 * @default return 6;
 *
 * @param hotkeyCmdListBackOpacity
 * @desc Sets the back opacity of the hotkey window in battle
 * It'll be the contents of a function returning a Number
 * @default return 192;
 *
 * @param hotkeyCmdListTranslucentOpacity
 * @desc Sets the translucent opacity of the hotkey window in battle
 * It'll be the contents of a function returning a Number
 * @default return 160;
 *
 * @param hotkeyCmdListSpacing
 * @desc Sets the spacing of the window listing hotkeys in battle
 * It'll be the contents of a function returning a Number
 * @default return 12;
 *
 * @help
 *============================================================================
 *    ## Parameter/Configurations Info
 *----------------------------------------------------------------------------
 *    # General
 *      The below points apply to all parameters/configurations unless stated
 *      otherwise:
 *      1. If the value of a parameter's empty, its configuration counterpart
 *         will be used instead(Reference tag: PARAMETERS_CONFIGURATIONS)
 *         - E.g.: Setting the parameter isEnabled as empty means that the
 *                 configuration isEnabled will be used instead
 *      2. The this pointer refers to the actor involved as the function
 *         contexts are Game_Actor.prototype
 *      3. The value of all parameters are contents of functions taking
 *         skillId - The id of the skill involved as the arguments
 *      4. Don't change the name nor the ordering of any function arguments
 *         unless you really know what you're truly doing
 *    # Function arguments
 *      1. isEnabled
 *         None
 *      2. bindNotePriority
 *         Same as those mentioned in # General
 *      3. useNotePriority
 *         Same as those mentioned in # General
 *      4. bindNoteChainingRule
 *         Same as those mentioned in # General
 *      5. useNoteChainingRule
 *         Same as those mentioned in # General
 *      6. bindHotkeyText
 *         None
 *      7. useSkillText
 *         Same as those mentioned in # General
 *      8. unusableSkillCoverIconPath
 *         None
 *      9. unusableSkillCoverIconName
 *         None
 *      10. unusableSkillCoverIconHue
 *         None
 *      11. unusableSkillCoverIconSmooth
 *         None
 *      12. hotkeyCmdWindowW
 *         None
 *      13. hotkeyCmdWindowH
 *         None
 *      14. hotkeyCmdWindowX
 *         None
 *      15. hotkeyCmdWindowY
 *         None
 *      16. hotkeyCmdLineH
 *         None
 *      17. hotkeyCmdFontSize
 *         None
 *      18. hotkeyCmdPadding
 *         None
 *      19. hotkeyCmdTextPadding
 *         None
 *      20. hotkeyCmdBackOpacity
 *         None
 *      21. hotkeyCmdTranslucentOpacity
 *         None
 *      22. hotkeyCmdWindowSpacing
 *         None
 *      23. hotkeyListWindowW
 *         None
 *      24. hotkeyListWindowH
 *         None
 *      25. hotkeyListWindowX
 *         None
 *      26. hotkeyListWindowY
 *         None
 *      27. hotkeyListLineH
 *         None
 *      28. hotkeyListFontSize
 *         None
 *      29. hotkeyListPadding
 *         None
 *      30. hotkeyListTextPadding
 *         None
 *      31. hotkeyListBackOpacity
 *         None
 *      32. hotkeyListTranslucentOpacity
 *         None
 *      33. hotkeyListSpacing
 *         None
 *      34. hotkeyCmdListWindowW
 *         None
 *      35. hotkeyCmdListWindowH
 *         None
 *      36. hotkeyCmdListWindowX
 *         None
 *      37. hotkeyCmdListWindowY
 *         None
 *      38. hotkeyCmdListLineH
 *         None
 *      39. hotkeyCmdListFontSize
 *         None
 *      40. hotkeyCmdListPadding
 *         None
 *      41. hotkeyCmdListTextPadding
 *         None
 *      42. hotkeyCmdListBackOpacity
 *         None
 *      43. hotkeyCmdListTranslucentOpacity
 *         None
 *      44. hotkeyCmdListSpacing
 *         None
 *    # Valid values
 *      1. isEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *         It'll only be used as a prerequisite when checking whether the
 *         actor inolved can bind/use hotkeys for the skill involved
 *      2. bindNotePriority
 *         Note that skills always have the highest priority
 *         Any valid Javascript returning any Array having the below String:
 *         - "states" States in the States category
 *         - "armors" Armors in the Armors category
 *         - "weapons" Weapons in the Weapons category
 *         - "classes" Classes in the Classes category
 *         - "actors" Actors in the Actors category
 *         (Reference tag: NOTE_DATA_TYPES)
 *         The effective notetag priority among data types are sorted
 *         ascendingly in the array
 *         The effective notetag priority among the same data type are the
 *         same as the other priorities among there
 *         Notetags of data belonging types not included in the array won't be
 *         effective
 *      3. useNotePriority
 *         Note that skills always have the highest priority
 *         Any valid Javascript returning any Array having the below String:
 *         - "states" States in the States category
 *         - "armors" Armors in the Armors category
 *         - "weapons" Weapons in the Weapons category
 *         - "classes" Classes in the Classes category
 *         - "actors" Actors in the Actors category
 *         (Reference tag: NOTE_DATA_TYPES)
 *         The effective notetag priority among data types are sorted
 *         ascendingly in the array
 *         The effective notetag priority among the same data type are the
 *         same as the other priorities among there
 *         Notetags of data belonging types not included in the array won't be
 *         effective
 *      4. bindNoteChainingRule
 *         Any valid Javascript returning any of the below String:
 *         - "first"(Only the notetag of the involved skill will be used)
 *         - "every"(All effective notetags must return truthy to be regarded
 *                   as truthy)
 *         - "some"(All effective notetags must return falsy to be regarded as
 *                 falsy)
 *         All invalid values will be regarded as "first"
 *         (Reference tag: DEFAULT_FIRST)
 *      5. useNoteChainingRule
 *         Any valid Javascript returning any of the below String:
 *         - "first"(Only the notetag of the involved skill will be used)
 *         - "every"(All effective notetags must return truthy to be regarded
 *                   as truthy)
 *         - "some"(All effective notetags must return falsy to be regarded as
 *                 falsy)
 *         All invalid values will be regarded as "first"
 *         (Reference tag: DEFAULT_FIRST)
 *      6. bindHotkeyText
 *         Any valid Javascript returning any String
 *      7. useSkillText
 *         Any valid Javascript returning any String
 *      8. unusableSkillCoverIconPath
 *         Any valid Javascript returning any String as the path of an image
 *         file in the project directory
 *         Returning random values would lead to heavy performance penalties
 *      9. unusableSkillCoverIconName
 *         Any valid Javascript returning any String as the name of an image
 *         file in the project directory
 *         Returning random values would lead to heavy performance penalties
 *      10. unusableSkillCoverIconHue
 *         Any valid Javascript returning any Number as the hue of an image
 *         file in the project directory
 *         Returning random values would lead to heavy performance penalties
 *      11. unusableSkillCoverIconSmooth
 *         Any valid Javascript returning any Boolean as the smooth flag of an
 *         image file in the project directory
 *         Returning random values would lead to heavy performance penalties
 *      12. hotkeyCmdWindowW
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      13. hotkeyCmdWindowH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      14. hotkeyCmdWindowX
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      15. hotkeyCmdWindowY
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      16. hotkeyCmdLineH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      17. hotkeyCmdFontSize
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      18. hotkeyCmdPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      19. hotkeyCmdTextPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      20. hotkeyCmdBackOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      21. hotkeyCmdTranslucentOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      22. hotkeyCmdSpacing
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      23. hotkeyListWindowW
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      24. hotkeyListWindowH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      25. hotkeyListWindowX
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      26. hotkeyListWindowY
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      27. hotkeyListLineH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      28. hotkeyListFontSize
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      29. hotkeyListPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      30. hotkeyListTextPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      31. hotkeyListBackOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      32. hotkeyListTranslucentOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      33. hotkeyListSpacing
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      34. hotkeyCmdListWindowW
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      35. hotkeyCmdListWindowH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      36. hotkeyCmdListWindowX
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      37. hotkeyCmdListWindowY
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      38. hotkeyCmdListLineH
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      39. hotkeyCmdListFontSize
 *         Any valid Javascript returning any positive Number
 *         Returning random values would lead to heavy performance penalties
 *      40. hotkeyCmdListPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      41. hotkeyCmdListTextPadding
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *      42. hotkeyCmdListBackOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      43. hotkeyCmdListTranslucentOpacity
 *         Any valid Javascript returning any Number ranging from 0 to 255
 *         Returning random values would lead to heavy performance penalties
 *      44. hotkeyCmdListSpacing
 *         Any valid Javascript returning any non negative Number
 *         Returning random values would lead to heavy performance penalties
 *    # Examples
 *      1. isEnabled
 *          Setting isEnabled as return false; will disable this plugin
 *      2. bindNotePriority
 *         Aside from the skills, which always have the highest priority,
 *         setting bindNotePriority as
 *         return ["states", "armors", "weapons", "classes"];
 *         will cause the <bind skill hotkey: BSHX> notetags in the States
 *         category to have the highest priorities, followed by the Armors,
 *         Weapons and Classes categories, whereas no notetags in the Actors
 *         categories will be effective
 *      3. useNotePriority
 *         Aside from the skills, which always have the highest priority,
 *         setting useNotePriority as
 *         return ["states", "armors", "weapons", "classes"];
 *         will cause the <use skill hotkey: USHX> notetags in the States
 *         category to have the highest priorities, followed by the Armors,
 *         Weapons and Classes categories, whereas no notetags in the Actors
 *         categories will be effective
 *      4. bindNoteChainingRule
 *         Setting bindNoteChainingRule as return "every"; will cause the
 *         result to be truthy if and only if all effective
 *         <bind skill hotkey: BSHX> notetags return truthy
 *      5. useNoteChainingRule
 *         Setting useNoteChainingRule as return "every"; will cause the
 *         result to be truthy if and only if all effective
 *         <use skill hotkey: USHX> notetags return truthy
 *      6. bindHotkeyText
 *         Setting bindHotkeyText as return "Set Hotkey"; will set the bind
 *         hotkey text for skills without hotkeys as Set Hotkey
 *      7. useSkillText
 *         Setting useSkillText as return "Use"; will set the use skill text
 *         when showing the bind hotkey texts as Use
 *      8. unusableSkillCoverIconPath
 *         Setting unusableSkillCoverIconPath as return "img/pictures/"; will
 *         set the path of the icon covering theicon of unusable skills with
 *         hotkeys as thefolder pictures which is in the folder img
 *      9. unusableSkillCoverIconName
 *         Setting unusableSkillCoverIconName as return "UnusableSkill"; will
 *         set the name of the icon covering the icon of unusable skills with
 *         hotkeys as UnusableSkill.png
 *      10. unusableSkillCoverIconHue
 *         Setting unusableSkillCoverIconHue as return 0; will set the name of
 *         the icon covering the icon of unusable skills with hotkeys as 0
 *      11. unusableSkillCoverIconSmooth
 *         Setting unusableSkillCoverIconSmooth as return true; will set the
 *         smooth flag of the icon covering the icon of unusable skills with
 *         hotkeys as true
 *      12. hotkeyCmdWindowW
 *         Setting hotkeyCmdWindowW as
 *         return Window_Command.prototype.windowWidth.call(this); will set
 *         the width of the window for binding hotkeys to skills as that of
 *         an ordinary command window
 *      13. hotkeyCmdWindowH
 *         Setting hotkeyCmdWindowH as
 *         return Window_Command.prototype.windowHeight.call(this); will set
 *         the height of the window for binding hotkeys to skills as that of
 *         an ordinary command window
 *      14. hotkeyCmdWindowX
 *         Setting hotkeyCmdWindowX as return 0; will set the x position of
 *         the window for binding hotkeys to skills as 0 pixel from the game
 *         screen
 *      15. hotkeyCmdWindowY
 *         Setting hotkeyCmdWindowY as return 0; will set the y position of
 *         the window for binding hotkeys to skills as 0 pixel from the game
 *         screen
 *      16. hotkeyCmdLineH
 *         Setting hotkeyCmdLineH as return 36; will set the line height of
 *         the window for binding hotkeys to skills as 36 pixels
 *      17. hotkeyCmdFontSize
 *         Setting hotkeyCmdFontSize as return 28; will set the standard font
 *         size of the window for binding hotkeys to skills as 28 pixels
 *      18. hotkeyCmdPadding
 *         Setting hotkeyCmdPadding as return 18; will set the standard
 *         padding of the window for binding hotkeys to skills as 18 pixels
 *      19. hotkeyCmdTextPadding
 *         Setting hotkeyCmdTextPadding as return 6; will set the text padding
 *         of the window for binding hotkeys to skills as 6 pixels
 *      20. hotkeyCmdBackOpacity
 *         Setting hotkeyCmdBackOpacity as return 192; will set the standard
 *         back opacity of the window for binding hotkeys to skills as 192
 *      21. hotkeyCmdTranslucentOpacity
 *         Setting hotkeyCmdTranslucentOpacity as return 160; will set the
 *         translucent opacity opacity of the window for binding hotkeys to
 *         skills as 160
 *      22. hotkeyCmdSpacing
 *         Setting hotkeyCmdSpacing as return 12; will set the selectable
 *         spacing of the window for binding hotkeys to skills as 12
 *      23. hotkeyListWindowW
 *         Setting hotkeyListWindowW as return Graphics.boxWidth; will set the
 *         width of the window listing the actor hotkey slots as that of the
 *         game screen
 *      24. hotkeyListWindowH
 *         Setting hotkeyListWindowH as this.fittingHeight(2); will set the
 *         height of the window listing the actor hotkey slots as that of an
 *         ordinary window having 2 line contents
 *      25. hotkeyListWindowX
 *         Setting hotkeyListWindowX as return 0; will set the x position of
 *         the window listing the actor hotkey slots as 0 pixel from the game
 *         screen
 *      26. hotkeyListWindowY
 *         Setting hotkeyListWindowY as return 0; will set the y position of
 *         the window listing the actor hotkey slots as 0 pixel from the game
 *         screen
 *      27. hotkeyListLineH
 *         Setting hotkeyListLineH as return 36; will set the line height of
 *         the window listing the actor hotkey slots as 36 pixels
 *      28. hotkeyListFontSize
 *         Setting hotkeyListFontSize as return 28; will set the standard font
 *         size of the window listing the actor hotkey slots as 28 pixels
 *      29. hotkeyListPadding
 *         Setting hotkeyListPadding as return 18; will set the standard
 *         padding of the window listing the actor hotkey slots as 18 pixels
 *      30. hotkeyListTextPadding
 *         Setting hotkeyListTextPadding as return 6; will set the text
 *         padding of the window listing the actor hotkey slots as 6 pixels
 *      31. hotkeyListBackOpacity
 *         Setting hotkeyListBackOpacity as return 192; will set the standard
 *         back opacity of the window listing the actor hotkey slots as 192
 *      32. hotkeyListTranslucentOpacity
 *         Setting hotkeyListTranslucentOpacity as return 160; will set the
 *         translucent opacity of the window listing the actor hotkey slots as
 *         160
 *      33. hotkeyListSpacing
 *         Setting hotkeyListSpacing as return 12; will set the selectable
 *         spacing of the window listing the actor hotkey slots as 12
 *      34. hotkeyCmdListWindowW
 *         Setting hotkeyCmdListWindowW as return Graphics.boxWidth; will set
 *         the width of the window listing the hotkeys in battle as that of
 *         the game screen
 *      35. hotkeyCmdListWindowH
 *         Setting hotkeyListWindowH as this.fittingHeight(2); will set the
 *         height of the window listing the hotkeys in battle as that of an
 *         ordinary window having 2 line contents
 *      36. hotkeyCmdListWindowX
 *         Setting hotkeyCmdListWindowX as return 0; will set the x position
 *         of the window listing the hotkeys in battle as 0 pixel from the
 *         game screen
 *      37. hotkeyCmdListWindowY
 *         Setting hotkeyCmdListWindowY as
 *         return Graphics.boxHeight - this.fittingHeight(4) - this.windowHeight();
 *         will set the window listing the hotkeys in battle to be placed
 *         right above the status window
 *      38. hotkeyListLineH
 *         Setting hotkeyCmdListLineH as return 36; will set the line height
 *         of the window listing the hotkeys in battle as 36 pixels
 *      39. hotkeyListFontSize
 *         Setting hotkeyCmdListFontSize as return 28; will set the standard
 *         font size of the window listing the hotkeys in battle as 28 pixels
 *      40. hotkeyListPadding
 *         Setting hotkeyCmdListPadding as return 18; will set the standard
 *         padding of the window listing the hotkeys in battle as 18 pixels
 *      41. hotkeyListTextPadding
 *         Setting hotkeyCmdListTextPadding as return 6; will set the text
 *         padding of the window listing the hotkeys in battle as 6 pixels
 *      42. hotkeyListBackOpacity
 *         Setting hotkeyCmdListBackOpacity as return 192; will set the
 *         standard back opacity of the window listing the hotkeys in battle
 *         as 192
 *      43. hotkeyListTranslucentOpacity
 *         Setting hotkeyCmdListTranslucentOpacity as return 160; will set the
 *         translucent opacity of the window listing the hotkeys in battle as
 *         160
 *      44. hotkeyListSpacing
 *         Setting hotkeyCmdListSpacing as return 12; will set the selectable
 *         spacing of the window listing the hotkeys in battle as 12
 *============================================================================
 *    ## Notetag Info
 *       Among all the same notetag types in the same data, only the 1st one
 *       can be effective(Reference tag: NOTETAG_MONO)
 *       Each line can only have at most 1 notetag(Reference tag: LINE_MONO)
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/State/Skill Notetags:
 *      Having no effective notetag means the actors can bind hotkeys
 *      to the skills(Reference tag: DEFAULT_TRUE)
 *      1. <bind skill hotkey: BSHX>
 *         - Sets whether the actor can bind hotkeys for the skill as the
 *           value returned by function with name BSHX, which can only be
 *           edited in the configuration region, which is inside this plugin
 *           js file contents, directly
 *         - E.g.:
 *           <bind skill hotkey: BSH1> will set the actor to always be able to
 *           bind the skill due to BSH1, which is the name of a function in
 *           the configuration region, always returning true
 *    # Actor/Class/Weapon/Armor/State Notetags:
 *      Having no effective notetag means the actors can use hotkeys
 *      1. <use skill hotkey: USHX>
 *         - Sets whether the actor can use hotkeys as the value returned by
 *           function with name USHX, which can only be edited in the
 *           configuration region, which is inside this plugin js file
 *           contents, directly
 *         - E.g.:
 *           <use skill hotkey: USH1> will set the actor to always be able to
 *           use the skill due to USH1, which is the name of a function in the
 *           configuration region, always returning true
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.skillHotkeys.params.param
 *         - Returns the stored value of param listed in the plugin manager or
 *           their configuration counterpart
 *         - E.g.:
 *           $gameSystem.skillHotkeys.params.isEnabled will return the
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *      2. $gameSystem.skillHotkeys.params.param = funcContents
 *         - Sets the stored value of param listed in the plugin manager or
 *           their configuration counterpart as funcContents, which is the
 *           contents of a function
 *         - E.g.:
 *           $gameSystem.skillHotkeys.params.isEnabled = return false; will
 *           set the stored value of parameter isEnabled shown on the plugin
 *           manager or its configuration counterpart as return false;,
 *           causing the corresponding function to always return false, thus
 *           always disabling this plugin
 *         - $gameSystem.skillHotkeys.params.param changes will be saved
 *         - DoubleX_RMMV.Skill_Hotkeys.params.param = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      3. $gameSystem.skillHotkeys.cfgs.cfg
 *         - Basically the same as $gameSystem.skillHotkeys.params.param,
 *           except that this plugin call applies to configurations found in
 *           the configuration region only
 *      4. $gameSystem.skillHotkeys.cfgs.cfg = funcContents
 *         - Basically the same as
 *           $gameSystem.skillHotkeys.params.param = funcContents, except that
 *           this plugin call applies to configurations found in the
 *           configuration region only
 *         - DoubleX_RMMV.Skill_Hotkeys.cfgs.cfg = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      5. $gameSystem.skillHotkeys.notes.note
 *         - Basically the same as $gameSystem.skillHotkeys.params.param,
 *           except that this plugin call applies to notetag values found in
 *           the configuration region
 *      6. $gameSystem.skillHotkeys.notes.note = funcContents
 *         - Basically the same as
 *           $gameSystem.skillHotkeys.params.param = funcContents, except that
 *           this plugin call applies to notetag values found in the
 *           configuration region
 *         - DoubleX_RMMV.Skill_Hotkeys.notes.note = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *    # Actor/Class/Weapon/Armor/State/Skill notetag manipulations
 *      1. meta.skillHotkeys.canBind
 *         - Returns the function name BSHX, which is a String, in
 *           <bind skill hotkey: BSHX>
 *         - E.g.:
 *           $dataStates[1].meta.skillHotkeys.canBind will return the function
 *           name BSH1, which is a String, in <bind skill hotkey: BSH1>
 *           notetag of state with id 1
 *      2. meta.skillHotkeys.canBind = BSHX
 *         - Sets the <bind skill hotkey: BSHX> notetag to use the function
 *           with name BSHX, which is a String
 *         - E.g.:
 *           $dataActors[2].meta.skillHotkeys.canBind = BSH1 will set the
 *           <bind skill hotkey: BSHX> notetag of actor with id 2 to use the
 *           function with name BSH1, with is a String
 *         - The function name must be one of the notetag values in the
 *           configuration region
 *         - All meta.statusBars changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.skillHotkeys.canUse
 *         - Basically the same as meta.skillHotkeys.canBind, except that this
 *           plugin call works with <use skill hotkey: USHX>
 *      4. meta.skillHotkeys.canUse = USHX
 *         - Basically the same as meta.skillHotkeys.canBind = BSHX, except
 *           that this plugin call works with <use skill hotkey: USHX>
 *    # Actor manipulations
 *      1. bindSkillHotkey(skillId, hotkey)
 *         - Binds the hotkey with symbol hotkey to the skill with id skillId
 *           for the actor involved, bypassing all <bind skill hotkey: BSHX>
 *           notetags
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].bindSkillHotkey(1, #1) will bind the
 *           hotkey with symbol #1 to the skill with id 1 for the 1st alive
 *           party member
 *         - Don't use this plugin call when players are
 *           binding/using hotkeys unless you really know what you're truly
 *           doing
 *      2. canBindSkillHotkey(skillId)
 *         - Returns whether the actor involved can bind hotkeys for the skill
 *           with id skillId
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].canBindSkillHotkey(1) will return
 *           whether the 1st alive party member can bind hotkeys for the skill
 *           with id 1
 *      3. canUseSkillHotkey(skillId)
 *         - Returns whether the actor involved can use the hotkey bound to
 *           the skill with id skillId
 *         - E.g.:
 *           $gameActors.actor(1).canUseSkillHotkey(1) will return whether the
 *           actor with id 1 can use the hotkey bound to the skill with id 1
 *      4. isSkillHotkeysBound(skillId)
 *         - Returns whether the actor has bound a hotkey for the skill with
 *           id skillId
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *                   isSkillHotkeysBound(1) will return whether the last alive
 *           party member has bound a hotkey for the skill with id 1
 *      5. boundSkillHotkeys(skillId)
 *         - Returns the list of symbols of hotkeys bound to the skill with id
 *           skillId
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *                   boundSkillHotkeys(1) will return the list of symbols of
 *           hotkeys bound to the skill with id 1
 *      6. hotkeys()
 *         - Returns the list of symbols of hotkeys bound to skills
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *                   hotkeys() will return the list of symbols of hotkeys
 *           bound to the skills
 *      7. raiseSkillHotkeyNoteChangeFactors()
 *         - Notifys that all notetags might need to be reevaluated due to
 *           potential data source changes or changes in the actor involved
 *         - This plugin call should be called whenever there are potential
 *           changes in the bindNoteChainingRule/useNoteChainingRule
 *           parameter/configuration
 *         - E.g.:
 *           $gameActors.actor(1).raiseSkillHotkeyNoteChangeFactors() will
 *           notify the actor with id 1 that all notetags might need to be
 *           reevaluated due to potential data source changes or changes in
 *           the actor involved
 *      8. skillHotkeys.hotkeyMapping
 *         - Access the mapping from the hotkey symbols to the skill ids where
 *           the hotkey represented by the formers' bound to the skill
 *           referred by the latters
 *         - E.g.:
 *           $gameActors.actor(1).skillHotkeys.hotkeyMapping will access the
 *           mapping from the hotkey symbols to the skill ids where the hotkey
 *           represented by the formers' bound to the skill referred by the
 *           latters for the actor with id 1
 *      9. skillHotkeys.noteChangeFactors[note][factor] = true
 *         - Notifys that the notetag note might need to be reevaluated due to
 *           potential changes in factor factor
 *         - note is either "canBind", referring to the notetag
 *           <bind skill hotkey: BSHX>, or 'canUse", referring to the notetag
 *           <use skill hotkey: USHX>
 *         - factor is either "states", meaning the changes in state notetags,
 *           "armors", meaning the changes in armor notetags, "weapons",
 *           meaning the changes in weapon notetags, "classes", meaning the
 *           changes in classes notetags, "actors", meaning the changes in
 *           actors notetags, or "priority", meaning the changes in the
 *           bindNotePriority/useNotePriority parameter/configuration
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *                   skillHotkeys. noteChangeFactors[canBind][priority] = true
 *           will notify the last alive party member that the
 *           <bind skill hotkey: BSHX> notetag might need to be reevaluated
 *           due to potential changes in the bindNotePriority
 *           parameter/configuration
 *           (The counterpart for <use skill hotkey: USHX> is useNotePriority)
 *============================================================================
 *    ## Plugin Command Info
 *----------------------------------------------------------------------------
 *      1. bindSkillHotkey actorId skillId hotkey
 *         - The same as the plugin call bindSkillHotkey(skillId, hotkey) in
 *           Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      2. canBindSkillHotkey actorId skillId
 *         - The same as the plugin call canBindSkillHotkey(skillId) in
 *           Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      3. canUseSkillHotkey actorId skillId
 *         - The same as the plugin call canUseSkillHotkey(skillId) in
 *           Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      4. isSkillHotkeysBound actorId skillId
 *         - The same as the plugin call isSkillHotkeysBound(skillId) in
 *           Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      5. boundSkillHotkeys actorId skillId
 *         - The same as the plugin call boundSkillHotkeys(skillId) in
 *           Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      6. hotkeys actorId
 *         - The same as the plugin call hotkeys() in Actor manipulations for
 *           the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *      7. raiseSkillHotkeyNoteChangeFactors actorId
 *         - The same as the plugin call raiseSkillHotkeyNoteChangeFactors()
 *           in Actor manipulations for the actor with id actorId
 *         - Don't use this plugin command for actors that don't exist yet
 *           unless you really know what you're truly doing
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Hotkeys"] = "v1.01a";

// The plugin file name must be the same as DoubleX_RMMV.Skill_Hotkeys_File
DoubleX_RMMV.Skill_Hotkeys_File = "DoubleX RMMV Skill Hotkeys v101a";
//

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Skill_Hotkeys = {

/*----------------------------------------------------------------------------
 *    Parameter counterparts
 *    - These configurations will only be used when their counterparts' empty
 *----------------------------------------------------------------------------*/

    params: {

        /**
         * The this pointer refers to the actor involved
         * Sets whether this plugin will be enabled
         * Hotspot/Nullipotent
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        isEnabled: function() { return true; /* Always enable this plugin */ },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective <bind skill hotkey: BSHX> notetags
         * among all data types
         * Potential Hotspot/Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @returns {Array[String]} The requested data type priority queue
         * @since v1.00a
         * @version v1.00a
         */
        bindNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "classes",
                "actors"
            ];
            //
        }, // bindNotePriority

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective <use skill hotkey: USHX> notetags
         * among all data types
         * Potential Hotspot/Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @returns {Array[String]} The requested data type priority queue
         * @since v1.00a
         * @version v1.00a
         */
        useNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "classes",
                "actors"
            ];
            //
        }, // useNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the priority of effective <bind skill hotkey: BSHX> notetags
         * among all data types
         * Potential Hotspot/Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         * @since v1.00a
         * @version v1.00a
         */
        bindNoteChainingRule: function(skillId) {
            return "first"; // Only the 1st effective notetag will be used
        }, // bindNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the priority of effective <use skill hotkey: USHX> notetags
         * among all data types
         * Potential Hotspot/Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         * @since v1.00a
         * @version v1.00a
         */
        useNoteChainingRule: function(skillId) {
            return "first"; // Only the 1st effective notetag will be used
        }, // useNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the bind hotkey text for skills without hotkeys
         * Nullipotent
         * @returns {String} The requested bind hotkey text
         * @since v1.00a
         * @version v1.00a
         */
        bindHotkeyText: function() {
            return "Bind Hotkey"; // The bind hotkey text will be Bind Hotkey
        }, // bindHotkeyText

        /**
         * The this pointer refers to the actor involved
         * Sets the use skill text when showing the bind hotkey texts
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @returns {String} The requested use skill text
         * @since v1.00a
         * @version v1.00a
         */
        useSkillText: function(skillId) {
            return "Use"; // The use skill text will be Use
        }, // useSkillText

        /**
         * The this pointer refers to the actor involved
         * Sets the path of the icon covering the icon of unusable skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {String} The requested cover icon path
         * @since v1.00a
         * @version v1.00a
         */
        unusableSkillCoverIconPath: function() {
            // The path of the icon will be in pictures which is in img
            return "img/pictures/";
            //
        }, // unusableSkillCoverIconPath

        /**
         * The this pointer refers to the actor involved
         * Sets the name of the icon covering the icon of unusable skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {String} The requested cover icon name
         * @since v1.00a
         * @version v1.00a
         */
        unusableSkillCoverIconName: function() {
            // The name of the icon will be UnusableSkill.png
            return "UnusableSkill";
            //
        }, // unusableSkillCoverIconName

        /**
         * The this pointer refers to the actor involved
         * Sets the hue of the icon covering the icon of unusable skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested cover icon hue
         * @since v1.00a
         * @version v1.00a
         */
        unusableSkillCoverIconHue: function() {
            return 0; // The hue of the icon will be 0
        }, // unusableSkillCoverIconName

        /**
         * The this pointer refers to the actor involved
         * Sets the smooth flag of the icon covering the icon of unusable skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Boolean} The requested cover icon smooth flag
         * @since v1.00a
         * @version v1.00a
         */
        unusableSkillCoverIconSmooth: function() {
            return true; // The smooth flag of the icon will be true
        }, // unusableSkillCoverIconSmooth

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the width of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window width
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdWindowW: function() {
            // The width will be that of an ordinary command window
            return Window_SkillHotkeyBase.prototype.windowWidth.call(this);
            //
        }, // hotkeyCmdWindowW

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the height of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdWindowH: function() {
            // The height will be that of an ordinary command window
            return Window_SkillHotkeyBase.prototype.windowHeight.call(this);
            //
        }, // hotkeyCmdWindowH

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the x position of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window x position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdWindowX: function() {
            return 0; // The x position will be 0 pixel from the game screen
        }, // hotkeyCmdWindowX

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the y position of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window y position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdWindowY: function() {
            return 0; // The y position will be 0 pixel from the game screen
        }, // hotkeyCmdWindowY

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the line height of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window line height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdLineH: function() {
            return 36; // The line height will be 36 pixels
        }, // hotkeyCmdLineH

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the standard font size of the window for binding hotkeys to
         * skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard font size
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdFontSize: function() {
            return 28; // The standard font size will be 28 pixels
        }, // hotkeyCmdFontSize

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the standard padding of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdPadding: function() {
            return 18; // The standard padding will be 18 pixels
        }, // hotkeyCmdPadding

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the text padding of the window for binding hotkeys to skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window text padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdTextPadding: function() {
            return 6; // The text padding will be 6 pixels
        }, // hotkeyCmdTextPadding

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the standard back opacity of the window for binding hotkeys to
         * skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard back opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdBackOpacity: function() {
            return 192; // The standard back opacity will be 192
        }, // hotkeyCmdBackOpacity

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the translucent opacity of the window for binding hotkeys to
         * skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window translucent opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdTranslucentOpacity: function() {
            return 160; // The translucent opacity will be 160
        }, // hotkeyCmdTranslucentOpacity

        /**
         * The this pointer refers to the window(Window_SkillHotkeyCmd) involved
         * Sets the selectable spacing of the window for binding hotkeys to
         * skills
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window selectable spacing
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdSpacing: function() {
            return 12; // The selectable spacing will be 12 pixels
        }, // hotkeyCmdSpacing

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the width of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window width
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListWindowW: function() {
            // The width will be that of the game screen
            return Graphics.boxWidth;
            //
        }, // hotkeyListWindowW

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the height of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListWindowH: function() {
            // The height will be that of ordinary window having 2 line contents
            return this.fittingHeight(2);
            //
        }, // hotkeyListWindowH

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the x position of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window x position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListWindowX: function() {
            return 0; // The x position will be 0 pixel from the game screen
        }, // hotkeyListWindowX

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the y position of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window y position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListWindowY: function() {
            return 0; // The y position will be 0 pixel from the game screen
        }, // hotkeyListWindowY

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the line height of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window line height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListLineH: function() {
            return 36; // The line height will be 36 pixels
        }, // hotkeyListLineH

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the standard font size of the window listing skill hotkeys for
         * binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard font size
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListFontSize: function() {
            return 28; // The standard font size will be 28 pixels
        }, // hotkeyListFontSize

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the standard padding of the window listing skill hotkeys for
         * binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListPadding: function() {
            return 18; // The standard padding will be 18 pixels
        }, // hotkeyListPadding

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the text padding of the window listing skill hotkeys for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window text padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListTextPadding: function() {
            return 6; // The text padding will be 6 pixels
        }, // hotkeyListTextPadding

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the standard back opacity of the window listing skill hotkeys
         * for binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard back opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListBackOpacity: function() {
            return 192; // The standard back opacity will be 192
        }, // hotkeyListBackOpacity

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the translucent opacity of the window listing skill hotkeys for
         * binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window translucent opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListTranslucentOpacity: function() {
            return 160; // The translucent opacity will be 160
        }, // hotkeyListTranslucentOpacity

        /**
         * The this pointer refers to the window(Window_SkillHotkeyList)
         * involved
         * Sets the selectable spacing of the window listing skill hotkeys for
         * binding
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window selectable spacing
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyListSpacing: function() {
            return 12; // The selectable spacing will be 12 pixels
        }, // hotkeyListSpacing

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the width of the window listing actor skill hotkeys in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window width
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListWindowW: function() {
            // The width will be that of the game screen
            return Graphics.boxWidth;
            //
        }, // hotkeyCmdListWindowW

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the height of the window listing actor skill hotkeys in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListWindowH: function() {
            // The height will be that of ordinary window having 2 line contents
            return this.fittingHeight(2);
            //
        }, // hotkeyCmdListWindowH

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the x position of the window listing actor skill hotkeys in
         * battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window x position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListWindowX: function() {
            return 0; // The x position will be 0 pixel from the game screen
        }, // hotkeyCmdListWindowX

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the y position of the window listing actor skill hotkeys in
         * battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window y position
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListWindowY: function() {
            // The window will be placed right above the status window
            return Graphics.boxHeight - this.fittingHeight(4) -
                    this.windowHeight();
            //
        }, // hotkeyCmdListWindowY

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the line height of the window listing actor skill hotkeys in
         * battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window line height
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListLineH: function() {
            return 36; // The line height will be 36 pixels
        }, // hotkeyCmdListLineH

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the standard font size of the window listing actor skill hotkeys
         * in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard font size
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListFontSize: function() {
            return 28; // The standard font size will be 28 pixels
        }, // hotkeyCmdListFontSize

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the standard padding of the window listing actor skill hotkeys
         * in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListPadding: function() {
            return 18; // The standard padding will be 18 pixels
        }, // hotkeyCmdListPadding

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the text padding of the window listing actor skill hotkeys in
         * battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window text padding
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListTextPadding: function() {
            return 6; // The text padding will be 6 pixels
        }, // hotkeyCmdListTextPadding

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the standard back opacity of the window listing actor skill
         * hotkeys in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window standard back opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListBackOpacity: function() {
            return 192; // The standard back opacity will be 192
        }, // hotkeyCmdListBackOpacity

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the translucent opacity of the window listing actor skill
         * hotkeys in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window translucent opacity
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListTranslucentOpacity: function() {
            return 160; // The translucent opacity will be 160
        }, // hotkeyCmdListTranslucentOpacity

        /**
         * The this pointer refers to the window(Window_BattleSkillHotkeys)
         * involved
         * Sets the selectable spacing of the window listing actor skill hotkeys
         * in battle
         * Returning random values would lead to heavy performance penalties
         * Hotspot/Nullipotent
         * @returns {Number} The requested window selectable spacing
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyCmdListSpacing: function() {
            return 12; // The selectable spacing will be 12 pixels
        } // hotkeyCmdListSpacing

    }, // params

/*----------------------------------------------------------------------------
 *    Configurations
 *    - These configurations don't have any parameter counterparts
 *----------------------------------------------------------------------------*/

    cfgs: {

        /**
         * The this pointer refers to the actor involved
         * Sets the list of hotkeys mapped with their corresponding names
         * None of the hotkeys are supposed to be changed during the same battle
         * Using a keyboard mapping plugin, like Quasi Input, can be useful here
         * Ensure it won't return different values when binding/using hotkeys
         * unless you really know what you're truly doing
         * (v1.01a+)Skill name and icon shouldn't be shown at the same time
         * unless you really know what you're truly doing
         * (v1.01a+)Hotkey name and icon shouldn't be shown at the same time
         * unless you really know what you're truly doing
         * Potential Hotspot/Nullipotent
         * @returns {Object[String, Object]} The requested hotkey-name mapping
         * @since v1.00a
         * @version v1.00a
         */
        hotkeyNames: function() {
            return {
                "#1": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "1", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#2": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "2", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#3": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "3", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#4": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "4", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#5": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "5", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#6": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "6", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#7": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "7", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#8": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "8", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#9": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "9", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                },
                "#0": {
                    isShowSkillName: false,
                    isShowSkillIcon: true,
                    hotkeyName: "0", // Uses falsy value to hide hotkey name
                    hotkeyIconIndex: 0, // Uses falsy value to hide hotkey icon
                }
            };
        } // hotkeyNames

    }, // cfgs

/*----------------------------------------------------------------------------
 *    Notetag values
 *    - These functions are used by notetags using function name as values
 *----------------------------------------------------------------------------*/

    notes: {

        /*--------------------------------------------------------------------
         *    Bind Skill Hotkey Functions
         *    - Setups BSHX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* BSHX names can only use alphanumeric characters
         * The 1st character of BSHX can't be a number
         * The below BSHX are examples added to help you set your BSHX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "BSH1": function(skillId, data) { return true; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "BSH2": function(skillId, data) { return false; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "BSH3": function(skillId, data) {
            // Returns the value in the game switch with id x
            return $gameSwitches.value(x);
            //
        }, // BSH3

        // Adds new BSHX here


        /*--------------------------------------------------------------------
         *    Use Skill Hotkey Functions
         *    - Setups USHX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* USHX names can only use alphanumeric characters
         * The 1st character of USHX can't be a number
         * The below USHX are examples added to help you set your USHX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "USH1": function(skillId, data) { return true; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "USH2": function(skillId, data) {
            // Returns whether the id of the actor involved's 4
            return this._actorId === 4;
            //
        }, // USH2

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @param {Number} skillId - The id of the skill involved
         * @param {Object} data - The data having this notetag
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        "USH3": function(skillId, data) {
            // Returns whether the id of the actor involved's not equal to 4
            return this._actorId !== 4;
            //
        } // USH3

        // Adds new USHX here


    } // notes

}; // DoubleX_RMMV.Skill_Hotkeys

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Solid understanding on how all those edited window and scene
 *           classes work
 *         - Decent RMMV plugin development proficiency to fully comprehend
 *           this
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the UIs for binding/using hotkeys
 *----------------------------------------------------------------------------*/

function Window_SkillHotkeyBase() { this.initialize.apply(this, arguments); };

function Window_SkillHotkeyCmd() { this.initialize.apply(this, arguments); };

function Window_SkillHotkeyList() { this.initialize.apply(this, arguments); };

function Window_BattleSkillHotkeys() { this.initialize.apply(this, arguments); };

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for binding/using hotkeys
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.DataManager = { orig: {}, new: {} };
    var _DM = SH.DataManager.orig, $ = DataManager;
    var _SH = SH.DataManager.new;
    _SH._REG_EXPS = {
        canBind: /< *bind[-_ ]+skill[-_ ]+hotkeys *: *(\w+) *>/i,
        canUse: /< *use[-_ ]+skill[-_ ]+hotkeys *: *(\w+) *>/i
    };
    _SH._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = $.isDatabaseLoaded;
    $.isDatabaseLoaded = function() { // v1.00a - v1.00a; Extended
        // Edited to read all notetags of this plugin as well
        return _DM.isDatabaseLoaded.apply(this, arguments) &&
                _SH._isDatabaseLoaded.call(this);
        //
    }; // $.isDatabaseLoaded

    _DM.extractSaveContents = $.extractSaveContents;
    $.extractSaveContents = function(contents) {
    // v1.00a - v1.00a; Extended
        _DM.extractSaveContents.apply(this, arguments);
        // Added to use the stored function contents
        _SH._extractSaveContents.call(this);
        //
    }; // $.extractSaveContents

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @author DoubleX
     * @returns {Boolean} The database loaded flag
     * @since v1.00a
     * @todo: Make this function Nullipotent to preserve the contract integrity
     * @version v1.00a
     */
    _SH._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_SH._areAllNotesLoaded) return true;
        _SH._loadAllNotes.call(this);
        _SH._areAllNotesLoaded = true;
        return _SH._areAllNotesLoaded;
        //
    }; // _SH._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadAllNotes = function() {
        _SH._dataTypes.call(this).forEach(_SH._loadDataTypeNotes, this);
    }; // _SH._loadAllNotes

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @author DoubleX
     * @returns {Array[Object]} The list of data types to have notetags loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._dataTypes = function() {
        return [
            $dataActors,
            $dataClasses,
            $dataWeapons,
            $dataArmors,
            $dataStates,
            $dataSkills
        ];
    }; // _SH._dataTypes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {Object} type - The data type to have notetags loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadDataTypeNotes = function(type) {
        type.forEach(_SH._loadDataNotes, this);
    }; // _SH._loadDataTypeNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {Object/Nullable} data - The data to have notetags loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadDataNotes = function(data) {
        if (data) _SH._loadNotes.call(this, data);
    }; // _SH._loadDataNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {Object} data - The data to have notetags loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadNotes = function(data) {
        // Plugin call/command
        data.note.split(/[\r\n]+/).forEach(
                _SH._loadLineNotes.bind(this, data.meta.skillHotkeys = {}));
        //
    }; // _SH._loadNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {Object[String, String]} skillHotkeys - The loaded notetag values
     * @param {String} line - The line being scanned for notetags to be loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadLineNotes = function(skillHotkeys, line) {
        Object.keys(_SH._REG_EXPS).forEach(
                _SH._loadNote.bind(this, skillHotkeys, line));
    }; // _SH._loadLineNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {Object[String, String]} skillHotkeys - The loaded notetag values
     * @param {String} line - The line being scanned for notetags to be loaded
     * @param {String} note - The name of the notetag to be loaded
     * @since v1.00a
     * @version v1.00a
     */
    _SH._loadNote = function(skillHotkeys, line, note) {
        // Refer to reference tag LINE_MONO
        if (line.match(_SH._REG_EXPS[note])) skillHotkeys[note] = RegExp.$1;
        if (!skillHotkeys[note]) return;
        //
    }; // _SH._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._extractSaveContents = function() {
        _SH._extractFuncContents.call(this, "params");
        _SH._extractFuncContents.call(this, "cfgs");
        _SH._extractFuncContents.call(this, "notes");
    }; // _SH._extractSaveContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {String} funcType - The parameter/configuration/notetag label
     * @since v1.00a
     * @version v1.00a
     */
    _SH._extractFuncContents = function(funcType) {
        Object.keys($gameSystem.skillHotkeys[funcType]).forEach(
                _SH._extractFuncContent.bind(this, funcType));
    }; // _SH._extractFuncContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {String} funcType - The parameter/configuration/notetag label
     * @param {String} content - The name of the stored function content
     * @since v1.00a
     * @version v1.00a
     */
    _SH._extractFuncContent = function(funcType, content) {
        SH[funcType][content] = $gameSystem.skillHotkeysFunc(
                $gameSystem.skillHotkeys[funcType][content]);
    }; // _SH._extractFuncContent

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores all params/configurations for binding/using hotkeys
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Game_System = { orig: {}, new: {} };
    var _GS = SH.Game_System.orig, $ = Game_System.prototype;
    var _SH = SH.Game_System.new;

    _GS.initialize = $.initialize;
    $.initialize = function() { // v1.00a - v1.00a; Extended
        _GS.initialize.apply(this, arguments);
        // Added to setup parameters/configurations/notetags
        _SH._init.call(this);
        //
    }; // $.initialize

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // {Object}skillHotkeys: The container of all other new variables
    // {Object}params: The container of all parameter/configuration values
    // {Object}cfgs: The container of all configuration only function contents
    // {Object}notes: The container of all notetag function contents

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {String} content - The stored function content
     * @returns {Function} The requested function with the stored content
     * @since v1.00a
     * @version v1.00a
     */
    $.skillHotkeysFunc = function(content) {
        // This argument list covers all cases so unused args' the only problem
        return new Function("skillId", "data", content);
        //
    }; // $.skillHotkeysFunc

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._init = function() {
        _SH._initContainers.call(this);
        _SH._storeParams.call(this);
        _SH._storeCfgs.call(this, "cfgs");
        _SH._storeCfgs.call(this, "notes");
    }; // _SH._init

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._initContainers = function() {
        this.skillHotkeys = { params: {}, cfgs: {}, notes: {} };
    }; // _SH._initContainers

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._storeParams = function() {
        var params = _SH._rawParams.call(this);
        Object.keys(params).forEach(_SH._storeParam.bind(this, params));
    }; // _SH._storeParams

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @author DoubleX
     * @returns {Object[String, String]} The requested name-value mapping
     * @since v1.00a
     * @version v1.00a
     */
    _SH._rawParams = function() {
        return PluginManager.parameters(DoubleX_RMMV.Skill_Hotkeys_File);
    }; // _SH._rawParams

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @param {Object[String, String]} params - The params/cfgs name-value map
     * @param {String} param - The name of the parameter/configuration
     * @since v1.00a
     * @version v1.00a
     */
    _SH._storeParam = function(params, param) {
        var contents = _SH._param.call(this, params, param);
        this.skillHotkeys.params[param] = contents;
        SH.params[param] = this.skillHotkeysFunc(contents);
    }; // _SH._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @author DoubleX
     * @param {Object[String, String]} params - The params/cfgs name-value map
     * @param {String} param - The name of the parameter/configuration
     * @retruns {String} The requested function contents as parameter values
     * @since v1.00a
     * @version v1.00a
     */
    _SH._param = function(params, param) {
        // Refer to reference tag PARAMETERS_CONFIGURATIONS
        return params[param] || _SH._cfg.call(this, SH.params[param]);
        //
    }; // _SH._param

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} cfgType - The configuration type label
     * @since v1.00a
     * @version v1.00a
     */
    _SH._storeCfgs = function(cfgType) {
        Object.keys(SH[cfgType]).forEach(_SH._storeCfg.bind(this, cfgType));
    }; // _SH._storeCfgs

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} cfgType - The configuration type label
     * @param {String} cfg - The name of the configuration
     * @since v1.00a
     * @version v1.00a
     */
    _SH._storeCfg = function(cfgType, cfg) {
        this.skillHotkeys[cfgType][cfg] = _SH._cfg.call(this, SH[cfgType][cfg]);
    }; // _SH._storeCfg

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @author DoubleX
     * @param {Function} cfg - The function as the value of the configuration
     * @returns {String} The requested parameters in the configuration region
     * @since v1.00a
     * @version v1.00a
     */
    _SH._cfg = function(cfg) {
        // Only the function contents are stored in save files
        return cfg.toString().
                replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
        //
    }; // _SH._cfg

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Uses all parameters/configurations/notetags to run plugin functions
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Game_Actor = { orig: {}, new: {} };
    var _GA = SH.Game_Actor.orig, $ = Game_Actor.prototype;
    var _SH = SH.Game_Actor.new;
    // Refer to reference tag NOTE_DATA_TYPES
    _SH._DATA_TYPE_FUNCS = {
        "actors": "actor",
        "classes": "currentClass",
        "weapons": "weapons",
        "armors": "armors",
        "states": "states"
    };
    //
    _SH._NOTE_CHAINING_RULES = ["every", "some"];
    _SH._NOTE_CHAINING_RULE_FUNCS = {
        "canBind": "bindNoteChainingRule",
        "canUse": "useNoteChainingRule"
    };
    _SH._NOTE_PRIORITIES = {
        "canBind": "bindNotePriority",
        "canUse": "useNotePriority"
    };

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // {Object}skillHotkeys: The container of all other new variables
    // {Object}hotkeyMapping: The mapping from the hotkey symbol to the skill id
    // {Object}noteChangeFactors: (Plugin Call)Map from factor to change flag

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Object}_noteResults: The mapping from the factor to the cached result

    _GA.initialize = $.initialize;
    $.initialize = function(actorId) {
        // v1.00a - v1.00a; Extended
        _SH._init.call(this); // Added to setup all internal skill hotkey states
        _GA.initialize.apply(this, arguments);
    }; // $.initialize

    _GA.refresh = $.refresh;
    $.refresh = function() { // v1.00a - v1.00a; Extended
        _GA.refresh.apply(this, arguments);
        // Added to raise the change notification flags
        this.raiseSkillHotkeyNoteChangeFactors();
        //
    }; // $.refresh

    /**
     * Plugin call/Idempotent
     * @author DoubleX
     * @interface
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @param {String} hotkey - The symbol of the hotkey to be bound
     * @since v1.00a
     * @version v1.00a
     */
    $.bindSkillHotkey = function(skillId, hotkey) {
        if (!SH.params.isEnabled.call(this)) return;
        _SH._bind.call(this, +skillId, hotkey);
    }; // $.bindSkillHotkey

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * Plugin call
     * @author DoubleX
     * @interface
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @returns {Boolean} The check result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    $.canBindSkillHotkeys = function(skillId) {
        return SH.params.isEnabled.call(this) &&
                _SH._notesResult.call(this, +skillId, "canBind");
    }; // $.canBindSkillHotkeys

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * Potential Hotspot/Plugin call
     * @author DoubleX
     * @interface
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @returns {Boolean} The check result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    $.canUseSkillHotkeys = function(skillId) {
        return SH.params.isEnabled.call(this) &&
                this.canUse($dataSkills[skillId]) &&
                this.isSkillHotkeysBound(skillId) &&
                _SH._notesResult.call(this, +skillId, "canUse");
    }; // $.canUseSkillHotkeys

    /**
     * Plugin call/Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isSkillHotkeysBound = function(skillId) {
        return this.boundSkillHotkeys(skillId).length > 0;
    }; // $.isSkillHotkeysBound

    /**
     * Plugin call/Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @returns {Array[String]} The list of smybols of hotkeys bound to skillId
     * @since v1.00a
     * @version v1.00a
     */
    $.boundSkillHotkeys = function(skillId) {
        return this.hotkeys().filter(_SH._isSameSkill.bind(this, skillId));
    }; // $.boundSkillHotkeys

    /**
     * Plugin call/Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Array[String]} The requested list of hotkey symbols
     * @since v1.00a
     * @version v1.00a
     */
    $.hotkeys = function() {
        return Object.keys(this.skillHotkeys.hotkeyMapping);
    }; // $.hotkeys

    /**
     * Plugin call/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.00a
     * @version v1.00a
     */
    $.raiseSkillHotkeyNoteChangeFactors = function() {
        this.skillHotkeys.noteChangeFactors =
                _SH._raisedNoteChangeFactors.call(this);
    }; // $.raiseSkillHotkeyNoteChangeFactors

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._init = function() {
        // These codes are easy, simple and small enough to stick together
        this.skillHotkeys = { hotkeyMapping: {}, _noteResults: {} };
        this.raiseSkillHotkeyNoteChangeFactors();
        //
    }; // _SH._init

    /**
     * The this pointer is Game_Actor.prototype
     * Pure function
     * @author DoubleX
     * @returns {Object[String, Object[String, Boolean]]} The requested factors
     * @since v1.00a
     * @version v1.00a
     */
    _SH._raisedNoteChangeFactors = function() {
        return {
            canBind: _SH._raisedNoteChangeFactor.call(this),
            canUse: _SH._raisedNoteChangeFactor.call(this)
        };
    }; // _SH._raisedNoteChangeFactors

    /**
     * The this pointer is Game_Actor.prototype
     * Pure function
     * @author DoubleX
     * @returns {Object[String, Boolean]} The requested notetag change factors
     * @since v1.00a
     * @version v1.00a
     */
    _SH._raisedNoteChangeFactor = function() {
        return {
            "actors": true,
            "classes": true,
            "weapons": true,
            "armors": true,
            "states": true,
            "priority": true // Raised when the notetag priority may be changed
        };
    }; // _SH._raisedNoteChangeFactor

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} hotkey - The symbol of the hotkey to be bound
     * @since v1.00a
     * @version v1.00a
     */
    _SH._bind = function(skillId, hotkey) {
        this.skillHotkeys.hotkeyMapping[hotkey] = skillId;
    }; // _SH._bind

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} skillId - The id of the skill to have its hotkey bound
     * @param {String} hotkey - The symbol of the hotkey to be checked
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isSameSkill = function(skillId, hotkey) {
        return this.skillHotkeys.hotkeyMapping[hotkey] === skillId;
    }; // _SH._isSameSkill

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @returns {Boolean} The notetags result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    _SH._notesResult = function(skillId, note) {
        var skillResult =
                _SH._noteResult.call(this, skillId, note, $dataSkills[skillId]);
        if (_SH._isSkillOnly.call(this, skillId, note)) return skillResult;
        return _SH._nonSkillNotesResult.call(this, skillId, note, skillResult);
    }; // _SH._notesResult

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isSkillOnly = function(skillId, note) {
        // Refer to reference tag DEFAULT_FIRST
        return _SH._NOTE_CHAINING_RULES.indexOf(
                _SH._noteChainingRule.call(this, skillId, note)) < 0;
        //
    }; // _SH._isSkillOnly

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Boolean} initResult - The result as the start of the note chain
     * @returns {Boolean} The notetags result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    _SH._nonSkillNotesResult = function(skillId, note, initResult) {
        // Changing the notetag chaining rule means _canNoteChanges returns true
        _SH._checkCanNoteChange.call(this, skillId, note, initResult);
        return _SH._noteResults.call(this, note).combined;
        //
    }; // _SH._nonSkillNotesResult

    /**
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Boolean} initResult - The result as the start of the note chain
     * @returns {Boolean} The notetags result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._checkCanNoteChange = function(skillId, note, initResult) {
        // Changing the notetag chaining rule means _canNoteChanges returns true
        if (!_SH._canNoteChange.call(this, note)) return;
        _SH._setCombinedNoteResult.call(this, skillId, note, initResult);
        //
    }; // _SH._nonSkillNotesResult

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} note - The notetag to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._canNoteChange = function(note) {
        return Object.keys(_SH._noteChangeFactors.call(this, note)).some(
                _SH._canNoteFactorChange.bind(this, note));
    }; // _SH._canNoteChange

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} note - The notetag to be checked against
     * @param {String} factor - The notetag factor to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._canNoteFactorChange = function(note, factor) {
        return _SH._noteChangeFactors.call(this, note)[factor];
    }; // _SH._canNoteFactorChange

    /**
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Boolean} initResult - The result as the start of the note chain
     * @since v1.00a
     * @version v1.00a
     */
    _SH._setCombinedNoteResult = function(skillId, note, initResult) {
        _SH._noteResults.call(this, note).combined =
                _SH._combinedNoteResult.call(this, skillId, note, initResult);
    }; // _SH._setCombinedNoteResult

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Boolean} initResult - The result as the start of the note chain
     * @returns {Boolean} The requested combined notetag result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    _SH._combinedNoteResult = function(skillId, note, initResult) {
        return _SH._noteFactors.call(this, skillId,
                note)[_SH._noteChainingRule.call(this, skillId, note)](
                _SH._noteFactorResult.bind(this, skillId, note, initResult));
    }; // _SH._combinedNoteResult

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @returns {Array[String]} The requested list of notetag factors
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteFactors = function(skillId, note) {
        // "skill" isn't really a data but just using the initial notetag result
        return ["skill"].concat(
                SH.params[_SH._NOTE_PRIORITIES[note]].call(this, skillId));
        //
    }; // _SH._noteFactors

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Boolean} initResult - The result as the start of the note chain
     * @param {String} factor - The notetag factor to have its result returned
     * @returns {Boolean} The requested notetag result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    _SH._noteFactorResult = function(skillId, note, initResult, factor) {
        return _SH._DATA_TYPE_FUNCS[factor] ? _SH._noteDataTypeResult.call(
                this, skillId, note, factor) : initResult;
    }; // _SH._noteFactorResult

    /**
     * This function isn't nullipotent as it uses change notification flags
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {String} factor - The notetag factor to have its result returned
     * @returns {Boolean} The requested notetag result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    _SH._noteDataTypeResult = function(skillId, note, factor) {
        _SH._checkNoteChangeFactor.call(this, skillId, note, factor);
        return _SH._noteResults.call(this, note)[factor];
    }; // _SH._noteDataTypeResult

    /**
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {String} factor - The notetag factor to have its result returned
     * @since v1.00a
     * @version v1.00a
     */
    _SH._checkNoteChangeFactor = function(skillId, note, factor) {
        var noteChangeFactors = _SH._noteChangeFactors.call(this, note);
        if (!noteChangeFactors[factor]) return;
        _SH._resetNoteChangeFactors.call(
                this, skillId, note, factor, noteChangeFactors);
    }; // _SH._checkNoteChangeFactor

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} note - The notetag to be checked against
     * @returns {Object[String, Boolean]} The requested notetag change factors
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteChangeFactors = function(note) {
        // Serves as a hooking point for possible future uses
        return this.skillHotkeys.noteChangeFactors[note];
        //
    }; // _SH._noteChangeFactors

    /**
     * This function isn't idempotent as functions might return random values
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {String} factor - The notetag factor to have its result returned
     * @param {Object[String, Boolean]} noteChangeFactors - The change flags
     * @since v1.00a
     * @version v1.00a
     */
    _SH._resetNoteChangeFactors = function(
            skillId, note, factor, noteChangeFactors) {
        noteChangeFactors[factor] = false;
        _SH._noteResults.call(this, note)[factor] =
                _SH._newNoteDataTypeResult.call(this, skillId, note, factor);
    }; // _SH._resetNoteChangeFactors

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} note - The notetag to be checked against
     * @returns {Object[String, Boolean]} The requested notetag result mapping
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteResults = function(note) {
        // Serves as a hooking point for possible future uses
        return this.skillHotkeys._noteResults[note];
        //
    }; // _SH._noteResults

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {String} factor - The notetag factor to have its result returned
     * @returns {Boolean} The requested notetag result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._newNoteDataTypeResult = function(skillId, note, factor) {
        return _SH._noteDataType.call(
                this, factor)[_SH._noteChainingRule.call(this, skillId, note)](
                _SH._noteResult.bind(this, skillId, note));
    }; // _SH._newNoteDataTypeResult

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} factor - The notetag factor to have its result returned
     * @returns {Array[Object]} The requested list of data to be checked against
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteDataType = function(factor) {
        // Makes sure the result is an Array of data for all data types
        return [].concat(this[_SH._DATA_TYPE_FUNCS[factor]]());
        //
    }; // _SH._noteDataType

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @returns {String} The requested name of the notetag chaining rule
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteChainingRule = function(skillId, note) {
        return SH.params[_SH._NOTE_CHAINING_RULE_FUNCS[note]].call(
                this, skillId);
    }; // _SH._noteChainingRule

    /**
     * The this pointer is Game_Actor.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} note - The notetag to be checked against
     * @param {Object/Nullable} data - The data to have its notetags checked
     * @returns {Boolean} The notetag result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._noteResult = function(skillId, note, data) {
        // Refer to reference tag DEFAULT_TRUE
        var skillHotkeys = data ? data.meta.skillHotkeys : null;
        if (!skillHotkeys) return true;
        var func = skillHotkeys ? SH.notes[skillHotkeys[note]] : null;
        return !func || func.call(this, skillId, data);
        //
    }; // _SH._noteResult

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Intercepts plugin command coming from this plugin as plugin calls
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Game_Interpreter = { orig: {}, new: {} };
    var _GI = SH.Game_Interpreter.orig, $ = Game_Interpreter.prototype;
    var _SH = SH.Game_Interpreter.new;
    _SH._CMDS = [
        "bindSkillHotkey",
        "canBindSkillHotkey",
        "canUseSkillHotkey",
        "isSkillHotkeysBound",
        "boundSkillHotkeys",
        "hotkeys",
        "raiseSkillHotkeyNoteChangeFactors"
    ];

    _GI.pluginCommand = $.pluginCommand;
    $.pluginCommand = function(command, args) {
        // v1.00a - v1.00a; Extended
        _GI.pluginCommand.apply(this, arguments);
        // Added to invoke the plugin command from this plugin
        _SH._pluginCmd.call(this, command, args);
        //
    }; // $.pluginCommand

    /**
     * The this pointer is Game_Interpreter.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} cmd - The plugin command name
     * @param {Array} args - The plugin command arguments
     * @since v1.00a
     * @version v1.00a
     */
    _SH._pluginCmd = function(cmd, args) {
        if (!_SH._isPluginCmd.call(this, cmd)) return;
        _SH._usePluginCmd.call(this, args);
    }; // _SH._pluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @author DoubleX
     * @param {String} cmd - The plugin command name
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isPluginCmd = function(cmd) { return _SH._CMDS.indexOf(cmd) >= 0; };

    /**
     * Plugin call's just another way of using plugin commands
     * The this pointer is Game_Interpreter.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} cmd - The plugin command name
     * @param {Array} args - The plugin command arguments
     * @since v1.00a
     * @version v1.00a
     */
    _SH._usePluginCmd = function(cmd, args) {
        // The 1st argument must always be the id of the actor involved
        $gameActors.actor(+args.shift())[cmd].apply(this, args);
        //
    }; // _SH._usePluginCmd

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillList
 *      - Lets players bind hotkeys for unusable skills outside battle
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Window_SkillList = { orig: {}, new: {} };
    var _WSL = SH.Window_SkillList.orig, $ = Window_SkillList.prototype;
    var _SH =  SH.Window_SkillList.new;

    _WSL.isCurrentItemEnabled = $.isCurrentItemEnabled;
    $.isCurrentItemEnabled = function() { // v1.00a - v1.00a; Extended
        // Edited to let players bind hotkeys for unusable skills outside battle
        return _WSL.isCurrentItemEnabled.call(this) ||
                _SH._isCurrentItemEnabled.call(this);
        //
    }; // $.isCurrentItemEnabled

    /**
     * The this pointer is Window_SkillList.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isCurrentItemEnabled = function() {
        var item = this.item();
        return item && this._actor.canBindSkillHotkeys(item.id);
    }; // _SH._isCurrentItemEnabled

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Window_ActorCommand
 *      - Adds skill hotkey commands for the currently inputable actor
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Window_ActorCommand = { orig: {}, new: {} };
    var _WAC = SH.Window_ActorCommand.orig, $ = Window_ActorCommand.prototype;
    var _SH = SH.Window_ActorCommand.new;

    _WAC.processHandling = $.processHandling;
    $.processHandling = function() { // New
        _WAC.processHandling.apply(this, arguments);
        // Added to process the bound skill hotkeys for the actor in battle
        _SH._processHandling.call(this);
        //
    }; // $.processHandling

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} hotkey - The symbol of the involved hotkey
     * @since v1.00a
     * @version v1.00a
     */
    $.onUseSkillHotkey = function(hotkey) {
        if (_SH._canUseHotkey.call(this, hotkey)) {
            return _SH._onCallHandler.call(this, hotkey);
        }
        this.playBuzzerSound();
    }; // $.onUseSkillHotkey

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._processHandling = function() {
        if (_SH._isProcessHotkeys.call(this)) _SH._processHotkeys.call(this);
    }; // _SH._processHandling

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isProcessHotkeys = function() {
        return this.isOpenAndActive() && SH.params.isEnabled.call(this._actor);
    }; // _SH._isProcessHotkeys

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._processHotkeys = function() {
        this._actor.hotkeys().forEach(_SH._processHotkey, this);
    }; // _SH._processHotkeys

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the involved hotkey
     * @since v1.00a
     * @version v1.00a
     */
    _SH._processHotkey = function(hotkey) {
        if (Input.isTriggered(hotkey)) this.onUseSkillHotkey(hotkey);
    }; // _SH._processHotkey

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the involved hotkey
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._canUseHotkey = function(hotkey) {
        return this._actor.canUseSkillHotkeys(
                _SH._hotkeyMapping.call(this)[hotkey]);
    }; // _SH._canUseHotkey

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Object[String, Number]} The requested hotkey mapping
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyMapping = function() {
        return this._actor.skillHotkeys.hotkeyMapping;
    }; // _SH._hotkeyMapping

    /**
     * The this pointer is Window_ActorCommand.prototype
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the involved hotkey
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onCallHandler = function(hotkey) {
        this.playOkSound();
        this.callHandler(hotkey);
    }; // _SH._onCallHandler

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Window_BattleSkill
 *      - Selects the skill bound to the used hotkey by the actor in battle
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Window_BattleSkill = { orig: {}, new: {} };
    var $ = Window_BattleSkill.prototype, _SH = SH.Window_BattleSkill.new;

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} hotkey - The symbol of ther hotkey involved
     * @since v1.00a
     * @version v1.00a
     */
    $.selectHotkeySkill = function(hotkey) {
        var skill = _SH._hotkeySkill.call(this, hotkey);
        // Otherwise there would have no skill to be selected
        this.setStypeId(skill.stypeId);
        this.refresh();
        //
        this.select(_SH._hotkeySkillIndex.call(this, skill));
    }; // $.selectHotkeySkill

    /**
     * The this pointer is Window_BattleSkill.prototype
     * Nullipotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of ther hotkey involved
     * @returns {Object} The requested skill bound to the hotkey
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeySkill = function(hotkey) {
        return $dataSkills[_SH._hotkeyMapping.call(this)[hotkey]];
    }; // _SH._hotkeySkill

    /**
     * The this pointer is Window_BattleSkill.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Object[String, Number]} The requested hotkey mapping
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyMapping = function() {
        return this._actor.skillHotkeys.hotkeyMapping;
    }; // _SH._hotkeyMapping

    /**
     * The this pointer is Window_BattleSkill.prototype
     * Nullipotent
     * @author DoubleX
     * @param {Object} skill - The skill bound to the hokey
     * @returns {Number} The requested index of the skill bound to the hotkey
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeySkillIndex = function(skill) {
        return this._data.indexOf(skill);
    }; // _SH._hotkeySkillIndex

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillHotkeyBase
 *      - Be the abstract base class for all the new hotkey window classes
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    var $ = Window_SkillHotkeyBase.prototype =
            Object.create(Window_Command.prototype);
    $.constructor = Window_SkillHotkeyBase;

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Number}_lineH: The cached window line height
    // {Number}_fontSize: The cached window font size
    // {Number}_padding: The cached window padding
    // {Number}_textPadding: The cached window text padding
    // {Number}_backOpacity: The cached window back opacity
    // {Number}_spacing: The cached selectable window spacing

    $.update = function() {
        Window_Command.prototype.update.call(this);
        this._update();
    }; // $.update

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._update = function() {
        this._updateWithoutRefreshes();
        this._updateWithRefreshes();
        this._onRefresh();
    }; // $._update

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._updateWithoutRefreshes = function() {
        this._updateWithoutRefresh("width", this.windowWidth());
        this._updateWithoutRefresh("height", this.windowHeight());
        this._updateWithoutRefresh("x", this.windowX());
        this._updateWithoutRefresh("y", this.windowY());
    }; // $._updateWithoutRefreshes

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {String} valName - The name of the variable to be updated
     * @param {Number} newVal - The new value of the variable to be updated
     * @since v1.00a
     * @version v1.00a
     */
    $._updateWithoutRefresh = function(valName, newVal) {
        if (this[valName] !== newVal) this[valName] = newVal;
    }; // $._updateWithoutRefresh

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._updateWithRefreshes = function() {
        this._updateWithRefresh("_lineH", this.lineHeight());
        this._updateWithRefresh("_fontSize", this.standardFontSize());
        this._updateWithRefresh("_padding", this.standardPadding());
        this._updateWithRefresh("_textPadding", this.textPadding());
        this._updateWithRefresh("_backOpacity", this.standardBackOpacity());
        this._updateWithRefresh(
                "_translucentOpacity", this.translucentOpacity());
        this._updateWithRefresh("_spacing", this.spacing());
    }; // $._updateWithRefreshes

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {String} valName - The name of the variable to be updated
     * @param {Number} newVal - The new value of the variable to be updated
     * @since v1.00a
     * @version v1.00a
     */
    $._updateWithRefresh = function(valName, newVal) {
        this._isRefresh = this[valName] !== newVal;
        if (this._isRefresh) this[valName] = newVal;
    }; // $._updateWithRefresh

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._onRefresh = function() {
        if (!this._isRefresh) return;
        this._isRefresh = false;
        this.refresh();
    }; // $._onRefresh

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillHotkeyCmd
 *      - Lets players bind hotkeys to skills for the actors involved
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    var $ = Window_SkillHotkeyCmd.prototype =
            Object.create(Window_SkillHotkeyBase.prototype);
    $.constructor = Window_SkillHotkeyCmd;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Game_Actor} actor - The actor using this window
     * @since v1.00a
     * @version v1.00a
     */
    $.initialize = function(actor) {
        // This must be run first or _makeCmdList would use a null actor
        this._actor = actor;
        //
        Window_SkillHotkeyBase.prototype.initialize.call(
                this, this.windowX(), this.windowY());
        this.openness = 0; // This must be run last or the game would crash
        // This must be run last or the parent would activate the window again
        this.deactivate();
        //
    }; // $.initialize

    $.lineHeight = function() { return SH.params.hotkeyCmdLineH.call(this); };

    $.standardFontSize = function() {
        return SH.params.hotkeyCmdFontSize.call(this);
    }; // $.standardFontSize

    $.standardPadding = function() {
        return SH.params.hotkeyCmdPadding.call(this);
    }; // $.standardPadding

    $.textPadding = function() {
        return SH.params.hotkeyCmdTextPadding.call(this);
    }; // $.textPadding

    $.standardBackOpacity = function() {
        return SH.params.hotkeyCmdBackOpacity.call(this);
    }; // $.standardBackOpacity

    $.translucentOpacity = function() {
        return SH.params.hotkeyCmdTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    $.spacing = function() { return SH.params.hotkeyCmdSpacing.call(this); };

    $.windowWidth = function() {
        return SH.params.hotkeyCmdWindowW.call(this);
    }; // $.windowWidth

    $.windowHeight = function() {
        return SH.params.hotkeyCmdWindowH.call(this);
    }; // $.windowHeight

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} skillId - The id of the skill involved
     * @since v1.00a
     * @version v1.00a
     */
    $.makeCommandList = function(skillId) {
        // It's just to play safe
        Window_SkillHotkeyBase.prototype.makeCommandList.call(this);
        //
        // Otherwise _makeCmdList would take the undefined skillId
        this._makeCmdList(skillId || this._skillId);
        //
    }; // $.makeCommandList

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} skillId - The id of the skill involved
     * @since v1.00a
     * @version v1.00a
     */
    $.setup = function(skillId) {
        // Otherwise makeCommandList would pass undefined to _makeCmdList
        this._skillId = skillId;
        //
        this.clearCommandList();
        this.makeCommandList(skillId);
        this.refresh();
        this.select(0);
        this.activate();
        this.open();
    }; // $.setup

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window x position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowX = function() { return SH.params.hotkeyCmdWindowX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window y position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowY = function() { return SH.params.hotkeyCmdWindowY.call(this); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number/Nullable} skillId - The id of the skill involved
     * @since v1.00a
     * @version v1.00a
     */
    $._makeCmdList = function(skillId) {
        // These commands must be available or this window wouldn't be setup
        this.addCommand(SH.params.bindHotkeyText.call(this._actor), 'bind');
        //
        this.addCommand(SH.params.useSkillText.call(this._actor, skillId),
                'use', this._actor.canUse($dataSkills[skillId]));
    }; // $._makeCmdList

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillHotkeyList
 *      - Shows the list of hotkey slots when binding skill hotkeys
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    var $ = Window_SkillHotkeyList.prototype =
            Object.create(Window_SkillHotkeyBase.prototype);
    $.constructor = Window_SkillHotkeyList;

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Bitmap}_unusableSkillCoverIcon: The cached unusable skill cover icon

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Game_Actor} actor - The actor using this window
     * @since v1.00a
     * @version v1.00a
     */
    $.initialize = function(actor) {
        // Otherwise this._actor would be null in the function this._skillId
        this._actor = actor, this._data = this._hotkeyMapping();
        //
        Window_SkillHotkeyBase.prototype.initialize.call(
                this, this.windowX(), this.windowY());
    }; // $.initialize

    $.lineHeight = function() { return SH.params.hotkeyListLineH.call(this); };

    $.standardFontSize = function() {
        return SH.params.hotkeyListFontSize.call(this);
    }; // $.standardFontSize

    $.standardPadding = function() {
        return SH.params.hotkeyListPadding.call(this);
    }; // $.standardPadding

    $.textPadding = function() {
        return SH.params.hotkeyListTextPadding.call(this);
    }; // $.textPadding

    $.standardBackOpacity = function() {
        return SH.params.hotkeyListBackOpacity.call(this);
    }; // $.standardBackOpacity

    $.translucentOpacity = function() {
        return SH.params.hotkeyListTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    $.spacing = function() { return SH.params.hotkeyListSpacing.call(this); };

    $.windowWidth = function() {
        return SH.params.hotkeyListWindowW.call(this);
    }; // $.windowWidth

    $.windowHeight = function() {
        return SH.params.hotkeyListWindowH.call(this);
    }; // $.windowHeight

    $.maxCols = function() { return this.maxItems(); };

    $.maxItems = function() { return this._hotkeyList().length; };

    $.itemHeight = function() {
        return this.lineHeight() + Window_Base._iconHeight + 1;
    }; // $.itemHeight

    /** @todo: Breaks this function into smaller pieces */
    $.drawItem = function(index) {
        var skillId = this._skillId(index), rect = this.itemRect(index);
        var hotkeyCfg = this._hotkeyCfg(index), y = rect.y;
        var skillIconIndex = this._skillIconIndex(skillId);
        var canUse = this._canUse(skillId);
        if (skillIconIndex && hotkeyCfg.isShowSkillIcon) {
            this.drawIcon(skillIconIndex, rect.x, y);
            if (!canUse) this._drawUnusableSkillCoverIcon(rect.x, y);
            y += Window_Base._iconHeight + 1;
        }
        var skillName = this._skillName(skillId);
        if (skillName && hotkeyCfg.isShowSkillName) {
            this.changePaintOpacity(canUse);
            this.drawText(skillName, rect.x, y);
            y += this.lineHeight() + 1;
        }
        if (hotkeyCfg.hotkeyIconIndex) {
            this.drawIcon(hotkeyCfg.hotkeyIconIndex, rect.x, y);
            y += Window_Base._iconHeight + 1;
        }
        if (!hotkeyCfg.hotkeyName) return;
        this.changePaintOpacity(true);
        this.drawText(hotkeyCfg.hotkeyName, rect.x, y);
    }; // $.drawItem

    $.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
    }; // $.refresh

    $.isCurrentItemEnabled = function() { return true; };

    $.processHandling = function() {
        Window_SkillHotkeyBase.prototype.processHandling.apply(this, arguments);
        this._processHandling(this);
    }; // $.processHandling

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window x position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowX = function() { return SH.params.hotkeyListWindowX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window y position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowY = function() { return SH.params.hotkeyListWindowY.call(this); };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._update = function() {
        Window_SkillHotkeyBase.prototype._update.call(this);
        this._updateUnusableSkillCoverIcon();
    }; // $._update

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._updateUnusableSkillCoverIcon = function() {
        if (!this._canHaveNewUnusableSkillCoverIcon()) return;
        this._onSetNewUnusableSkillCoverIcon();
    }; // $._updateUnusableSkillCoverIcon

    /**
     * This function isn't nullipotent as new values will be assigned as well
     * Hotspot/Idempotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    $._canHaveNewUnusableSkillCoverIcon = function() {
        return this._hasNewUnusableSkillCoverIcon("Path") ||
                this._hasNewUnusableSkillCoverIcon("Name") ||
                this._hasNewUnusableSkillCoverIcon("Hue") ||
                this._hasNewUnusableSkillCoverIcon("Smooth");
    }; // $._canHaveNewUnusableSkillCoverIcon

    /**
     * This function isn't nullipotent as new values will be assigned as well
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {String} part - The name of the part consituiting the cover icon
     * @returns {Boolean} The check result
     * @since v1.00a
     * @todo: Make this function Nullipotent without losing performance
     * @version v1.00a
     */
    $._hasNewUnusableSkillCoverIcon = function(part) {
        // These codes are easy, simple and small enough to stick together
        var newPart =
                SH.params["unusableSkillCoverIcon" + part].call(this._actor);
        var hasNew = this["_unusableSkillCoverIcon" + part] !== newPart;
        if (hasNew) this["_unusableSkillCoverIcon" + part] = newPart;
        return hasNew;
        //
    }; // $._hasNewUnusableSkillCoverIcon

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._onSetNewUnusableSkillCoverIcon = function() {
        this._setNewUnusableSkillCoverIcon();
        // Otherwise the new icon might not be drawn as it needs time to load
        this.refresh();
        //
    }; // $._onSetNewUnusableSkillCoverIcon

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._setNewUnusableSkillCoverIcon = function() {
        this._unusableSkillCoverIcon = this._newUnusableSkillCoverIcon();
    }; // $._setNewUnusableSkillCoverIcon

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Bitmap} The requested unusable skill ocver icon
     * @since v1.00a
     * @version v1.00a
     */
    $._newUnusableSkillCoverIcon = function() {
        return ImageManager.loadBitmap(this._unusableSkillCoverIconPath,
                this._unusableSkillCoverIconName,
                this._unusableSkillCoverIconHue,
                this._unusableSkillCoverIconSmooth);
    }; // $._newUnusableSkillCoverIcon

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number} index - The hotkey slot index
     * @returns {Object} The requested hotkey configuration object
     * @since v1.01a
     * @version v1.01a
     */
    $._hotkeyCfg = function(index) {
        return SH.cfgs.hotkeyNames.call(this._actor)[this._hotkey(index)];
    }; // $._hotkeyCfg

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number} index - The hotkey slot index
     * @returns {String} The requested hotkey symbol
     * @since v1.00a
     * @version v1.00a
     */
    $._hotkey = function(index) { return this._hotkeyList()[index]; };

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number} index - The hotkey slot index
     * @returns {Number/Nullable} The requested skill id
     * @since v1.00a
     * @version v1.00a
     */
    $._skillId = function(index) {
        return this._hotkeyMapping()[this._hotkeyList()[index]];
    }; // $._skillId

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number/Nullable} skillId - The id of the skil involved
     * @returns {Number} The requested skill icon index
     * @since v1.01a
     * @version v1.01a
     */
    $._skillIconIndex = function(skillId) {
        return skillId ? $dataSkills[skillId].iconIndex : 0;
    }; // $._skillIconIndex

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number/Nullable} skillId - The id of the skil involved
     * @returns {String} The requested skill name
     * @since v1.01a
     * @version v1.01a
     */
    $._skillName = function(skillId) {
        return skillId ? $dataSkills[skillId].name : "";
    }; // $._skillName

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Object[String, Number]} The requested hotkey mapping
     * @since v1.00a
     * @version v1.00a
     */
    $._hotkeyMapping = function() {
        return this._actor.skillHotkeys.hotkeyMapping;
    }; // $._hotkeyMapping

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number/Nullable} skillId - The id of the skil involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $._canUse = function(skillId) {
        return skillId && this._actor.canUse($dataSkills[skillId]);
    }; // $._canUse

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} x - The icon x position
     * @param {Number} y - The icon y position
     * @since v1.00a
     * @version v1.00a
     */
    $._drawUnusableSkillCoverIcon = function(x, y) {
        if (!this._unusableSkillCoverIcon) return;
        this.contents.blt(this._unusableSkillCoverIcon, 0, 0,
                Window_Base._iconWidth, Window_Base._iconHeight, x, y);
    }; // $._drawUnusableSkillCoverIcon

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._processHandling = function() {
        // Not enabling this plugin shouldn't be able to activate this window
        if (this.isOpenAndActive()) this._processHotkeys();
        //
    }; // $._processHandling

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    $._processHotkeys = function() {
        this._hotkeyList().forEach(this._processHotkey, this);
    }; // $._processHotkeys

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the involved hotkey
     * @since v1.00a
     * @version v1.00a
     */
    $._processHotkey = function(hotkey) {
        if (Input.isTriggered(hotkey)) this._useHotkey(hotkey);
    }; // $._processHotkey

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the involved hotkey
     * @since v1.00a
     * @version v1.00a
     */
    $._useHotkey = function(hotkey) {
        // Otherwise the handlers would bind the wrong hotkey to the skill
        this.select(this._hotkeyList().indexOf(hotkey));
        //
        this.playOkSound();
        this.callHandler(hotkey);
    }; // $._useHotkey

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Array[String]} The requested list of hotkey symbols
     * @since v1.00a
     * @version v1.00a
     */
    $._hotkeyList = function() {
        return Object.keys(SH.cfgs.hotkeyNames.call(this._actor));
    }; // $._hotkeyList

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # New class: Window_BattleSkillHotkeys
 *      - Shows the list of hotkeys for the currently inpuable actor in battle
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    var $ = Window_BattleSkillHotkeys.prototype =
            Object.create(Window_SkillHotkeyList.prototype);
    $.constructor = Window_BattleSkillHotkeys;

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Function(String)}_touchCallback: The function handling touched hotkey

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Game_Actor} actor - The actor using this window
     * @param {Function(String)} touchCallback - The function handling the
     *                                            touched hotkey slot
     * @since v1.00a
     * @version v1.00a
     */
    $.initialize = function(actor, touchCallback) {
        Window_SkillHotkeyList.prototype.initialize.call(this, actor);
        this._touchCallback = touchCallback;
    }; // $.initialize

    $.lineHeight = function() {
        return SH.params.hotkeyCmdListLineH.call(this);
    }; // $.lineHeight

    $.standardFontSize = function() {
        return SH.params.hotkeyCmdListFontSize.call(this);
    }; // $.standardFontSize

    $.standardPadding = function() {
        return SH.params.hotkeyCmdListPadding.call(this);
    }; // $.standardPadding

    $.textPadding = function() {
        return SH.params.hotkeyCmdListTextPadding.call(this);
    }; // $.textPadding

    $.standardBackOpacity = function() {
        return SH.params.hotkeyCmdListBackOpacity.call(this);
    }; // $.standardBackOpacity

    $.translucentOpacity = function() {
        return SH.params.hotkeyCmdListTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    $.spacing = function() {
        return SH.params.hotkeyCmdListSpacing.call(this);
    }; // $.spacing

    $.windowWidth = function() {
        return SH.params.hotkeyCmdListWindowW.call(this);
    }; // $.windowWidth

    $.windowHeight = function() {
        return SH.params.hotkeyCmdListWindowH.call(this);
    }; // $.windowHeight

    $.isCurrentItemEnabled = function() {
        return Window_SkillHotkeyBase.prototype.isCurrentItemEnabled.call(this);
    }; // $.isCurrentItemEnabled

    $.processTouch = function() {
        // Only isOpenAndActive changed to isOpen and everything else's intact
        if (!this.isOpen()) return this._touching = false;
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) this.processCancel();
        }
        if (!this._touching) return;
        TouchInput.isPressed() ? this.onTouch(false) : this._touching = false;
        //
    }; // $.processTouch

    $.onTouch = function(triggered) {
        // These codes are easy, simple and small enough to stick together
        if (!triggered) return;
        var hitIndex = this._hitIndex(), hotkey = this._hotkeyList()[hitIndex];
        if (this._isHitHotkey(hotkey)) this._touchCallback(hotkey);
        //
    }; // $.onTouch

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window x position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowX = function() {
        return SH.params.hotkeyCmdListWindowX.call(this);
    }; // $.windowX

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested window y position
     * @since v1.00a
     * @version v1.00a
     */
    $.windowY = function() {
        return SH.params.hotkeyCmdListWindowY.call(this);
    }; // $.windowY

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Number/Nullable} skillId - The id of the skil involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $._canUse = function(skillId) {
        return Window_SkillHotkeyList.prototype._canUse.call(this, skillId) ||
                skillId && this._actor.canUseSkillHotkeys(skillId);
    }; // $._canUse

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested hit selection index
     * @since v1.00a
     * @version v1.00a
     */
    $._hitIndex = function() {
        return this.hitTest(this.canvasToLocalX(TouchInput.x),
                this.canvasToLocalY(TouchInput.y));
    }; // $._hitIndex

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the hotkey involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $._isHitHotkey = function(hotkey) { return this._hotkeyMapping()[hotkey]; };

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Skill
 *      - Show the bind option when using skills that can do so
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Scene_Skill = { orig: {}, new: {} };
    var _SS = SH.Scene_Skill.orig, $ = Scene_Skill.prototype;
    var _SH = SH.Scene_Skill.new;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // {Object}skillHotkeys: The container of all other new variables

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Window_SkillHotkeyCmd}_cmdWindow: The bind skill hotkey command window
    // {Window_SkillHotkeyList}_listWindow: The skill hotkey slot command window

    _SS.create = $.create;
    $.create = function() { // v1.00a - v1.00a; Extended
        _SS.create.apply(this, arguments);
        _SH._createWindows.call(this); // Added to create the hotkey windows
    }; // $.create

    _SS.onItemOk = $.onItemOk;
    $.onItemOk = function() { // v1.00a - v1.00a; Extended
        // Added to let players choose to bind skills that can do so
        if (_SH._isSetupCmdWindow.call(this)) {
            return _SH._setupCmdWindow.call(this);
        }
        //
        _SS.onItemOk.apply(this, arguments);
    }; // $.onItemOk

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._createWindows = function() {
        this.skillHotkeys = {};
        _SH._createHotkeyCmdWindow.call(this);
        _SH._createHotkeyListWindow.call(this);
    }; // _SH._createWindows

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._createHotkeyCmdWindow = function() {
        this.skillHotkeys._cmdWindow = _SH._hotkeyCmdWindow.call(this);
        this.addWindow(this.skillHotkeys._cmdWindow);
    }; // _SH._createHotkeyCmdWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Window_SkillHotkeyCmd} The requested hotkey command window
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyCmdWindow = function() {
        var cmdWindow = new Window_SkillHotkeyCmd(this.user());
        cmdWindow.setHandler('bind', _SH._onBind.bind(this));
        cmdWindow.setHandler('use', _SH._onUse.bind(this));
        cmdWindow.setHandler('cancel', _SH._onCmdWindowCancel.bind(this));
        cmdWindow.deselect();
        return cmdWindow;
    }; // _SH._hotkeyCmdWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._createHotkeyListWindow = function() {
        this.skillHotkeys._listWindow = _SH._hotkeyListWindow.call(this);
        this.addWindow(this.skillHotkeys._listWindow);
    }; // _SH._createHotkeyListWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Window_SkillHotkeyList} The requested hotkey list window
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyListWindow = function() {
        var listWindow = new Window_SkillHotkeyList(this.user());
        listWindow.setHandler('ok', _SH._onchangeSlot.bind(this));
        listWindow.setHandler('cancel', _SH._onCancelChangeSlot.bind(this));
        _SH._hotkeyList.call(this).forEach(
                _SH._setHotkeyListHandler.bind(this, listWindow));
        _SH._closeListWindow.call(this, listWindow);
        return listWindow;
    }; // _SH._hotkeyListWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @param {Window_SkillHotkeyList} listWindow - The hotkey list window
     * @param {String} hotkey - The symbol of the hotkey involved
     * @since v1.00a
     * @version v1.00a
     */
    _SH._setHotkeyListHandler = function(listWindow, hotkey) {
        // The hotkey list window will automatically adjust the selection index
        listWindow.setHandler(hotkey, _SH._onchangeSlot.bind(this));
        //
    }; // _SH._setHotkeyListHandler

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isSetupCmdWindow = function() {
        return this.user().canBindSkillHotkeys(this.item().id);
    }; // _SH._isSetupCmdWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._setupCmdWindow = function() {
        this.skillHotkeys._cmdWindow.setup(this.item().id);
        this.showSubWindow(this.skillHotkeys._cmdWindow);
    }; //_SH._setupCmdWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onBind = function() {
        _SH._onCmdWindowCancel.call(this);
        // Otherwise the item window would be active when calling determineItem
        this._itemWindow.deactivate();
        //
        _SH._openListWindow.call(this);
    }; // _SH._onBind

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._openListWindow = function() {
        this.skillHotkeys._listWindow.refresh();
        this.skillHotkeys._listWindow.show();
        this.skillHotkeys._listWindow.activate();
        // Otherwise no selection would be made for its 1st appearance
        this.skillHotkeys._listWindow.select(0);
        //
    }; // _SH._openListWindow

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onUse = function() {
        _SH._onCmdWindowCancel.call(this);
        // Otherwise the item window would be active when calling determineItem
        this._itemWindow.deactivate();
        //
        _SS.onItemOk.call(this);
    }; // _SH._onUse

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onCmdWindowCancel = function() {
        this.hideSubWindow(this.skillHotkeys._cmdWindow);
        this.skillHotkeys._cmdWindow.close();
    }; // _SH._onCmdWindowCancel

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onchangeSlot = function() {
        _SH._changeSlot.call(this);
        _SH._onCancelChangeSlot.call(this);
        this.commandSkill();
    }; // _SH._onchangeSlot

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._changeSlot = function() {
        // If both flags are false then regard it as bind rather than error
        this.user().bindSkillHotkey(
                this.item().id, _SH._changedSlot.call(this));
        //
    }; // _SH._changeSlot

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @returns {String} The requested hotkey symbol to have its slot changed
     * @since v1.00a
     * @version v1.00a
     */
    _SH._changedSlot = function() {
        return _SH._hotkeyList.call(
                this)[this.skillHotkeys._listWindow.index()];
    }; // _SH._changedSlot

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Array[String]} Ther requested list of hotkey symbols
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyList = function() {
        return Object.keys(SH.cfgs.hotkeyNames.call(this.user()));
    }; // _SH._hotkeyList

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onCancelChangeSlot = function() {
        _SH._closeListWindow.call(this, this.skillHotkeys._listWindow);
        this.commandSkill();
    }; // _SH._onCancelChangeSlot

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @author DoubleX
     * @param {Window_SkillHotkeyList} listWindow - The hotkey list window
     * @since v1.00a
     * @version v1.00a
     */
    _SH._closeListWindow = function(listWindow) {
        listWindow.deactivate();
        listWindow.deselect();
        listWindow.hide();
    }; // _SH._closeListWindow

})(DoubleX_RMMV.Skill_Hotkeys);

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Lets players use the bound skill hotkeys for actors in battle
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    SH.Scene_Battle = { orig: {}, new: {} };
    var _SB = SH.Scene_Battle.orig, $ = Scene_Battle.prototype;
    var _SH = SH.Scene_Battle.new;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // {Object}skillHotkeys: The container of all other new variables

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Window_BattleSkillHotkeys}_hotkeyWindow: The hotkey slot command window

    _SB.stop = $.stop;
    $.stop = function() { // v1.00a - v1.00a; Extended
        _SB.stop.apply(this, arguments);
        // Added to close the hotkey window when closing actor command window
        _SH._closeHotkeyWindow.call(this);
        //
    }; // $.stop

    _SB.updateStatusWindow = $.updateStatusWindow;
    $.updateStatusWindow = function() { // v1.00a - v1.00a; Extended
        _SB.updateStatusWindow.apply(this, arguments);
        // Added to close the hotkey window when closing actor command window
        if ($gameMessage.isBusy()) _SH._closeHotkeyWindow.call(this);
        //
    }; // $.updateStatusWindow

    _SB.startPartyCommandSelection = $.startPartyCommandSelection;
    $.startPartyCommandSelection = function() { // v1.00a - v1.00a; Extended
        _SB.startPartyCommandSelection.apply(this, arguments);
        // Added to close the hotkey window when closing actor command window
        _SH._closeHotkeyWindow.call(this);
        //
    }; // $.startPartyCommandSelection

    _SB.startActorCommandSelection = $.startActorCommandSelection;
    $.startActorCommandSelection = function() { // v1.00a - v1.00a; Extended
        _SB.startActorCommandSelection.apply(this, arguments);
        // Added to add the actor skill hotkey handlers
        _SH._startActorCommandSelection.call(this);
        //
    }; // $.startActorCommandSelection

    _SB.onActorCancel = $.onActorCancel;
    $.onActorCancel = function() { // v1.00a - v1.00a; Extended
        _SB.onActorCancel.apply(this, arguments);
        // Added to go straight back to the actor command window for hotkeys
        _SH._onHotkeyCancel.call(this);
        //
    }; // $.onActorCancel

    _SB.onEnemyCancel = $.onEnemyCancel;
    $.onEnemyCancel = function() { // v1.00a - v1.00a; Extended
        _SB.onEnemyCancel.apply(this, arguments);
        // Added to go straight back to the actor command window for hotkeys
        _SH._onHotkeyCancel.call(this);
        //
    }; // $.onEnemyCancel

    _SB.endCommandSelection = $.endCommandSelection;
    $.endCommandSelection = function() { // v1.00a - v1.00a; Extended
        _SB.endCommandSelection.apply(this, arguments);
        // Added to close the hotkey window when closing actor command window
        _SH._closeHotkeyWindow.call(this);
        //
    }; // $.endCommandSelection

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @todo: Removes the performance penalty without sacrificing code qualities
     * @version v1.00a
     */
    _SH._startActorCommandSelection = function() {
        // Creating the hotkey window on the fly's clean but costs performance
        _SH._onCreateHotkeyWindow.call(this);
        //
        _SH._setHotkeyHandlers.call(this);
    }; // _SH._startActorCommandSelection

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onCreateHotkeyWindow = function() {
        var actor = BattleManager.actor();
        if (!SH.params.isEnabled.call(actor)) return;
        _SH._createHotkeyWindow.call(this, actor);
    }; //  _SH._onCreateHotkeyWindow

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @param {Game_Actor} actor - The actor involved
     * @since v1.00a
     * @version v1.00a
     */
    _SH._createHotkeyWindow = function(actor) {
        // Otherwise the old hotkey command list window would be leaked
        if (_SH._hasHotkeyWindow.call(this)) {
            this._windowLayer.removeChild(this.skillHotkeys._hotkeyWindow);
        }
        //
        this.skillHotkeys = this.skillHotkeys || {};
        this.skillHotkeys._hotkeyWindow = _SH._hotkeyWindow.call(this, actor);
        this.addWindow(this.skillHotkeys._hotkeyWindow);
    }; // _SH._createHotkeyWindow

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @author DoubleX
     * @param {Game_Actor} actor - The actor involved
     * @returns {Window_BattleSkillHotkeys} The requested hotkey window
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyWindow = function(actor) {
        var hotkeyWindow = new Window_BattleSkillHotkeys(
                actor, this._actorCommandWindow.onUseSkillHotkey.bind(
                this._actorCommandWindow));
        hotkeyWindow.refresh();
        hotkeyWindow.show();
        // This window's only for showing the list of available hotkey commands
        hotkeyWindow.deactivate();
        hotkeyWindow.deselect();
        //
        return hotkeyWindow;
    }; // _SH._hotkeyWindow

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @todo: Caching BattleManager.actor without sacrificing code qualities
     * @version v1.00a
     */
    _SH._setHotkeyHandlers = function() {
        // Caching BattleManager.actor here would lead to even more boilerplates
        _SH._hotkeyList.call(this, BattleManager.actor()).forEach(
                _SH._setHotkeyHandler, this);
        //
    }; // _SH._setHotkeyHandlers

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the hotkey involved
     * @since v1.00a
     * @version v1.00a
     */
    _SH._setHotkeyHandler = function(hotkey) {
        this._actorCommandWindow.setHandler(hotkey,
                _SH._onUseHotkey.bind(this, hotkey, BattleManager.actor()));
    }; // _SH._setHotkeyHandler

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the hotkey involved
     * @param {Game_Actor} actor - The actor involved
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onUseHotkey = function(hotkey, actor) {
        if (_SH._hasHotkeyWindow.call(this)) {
            this.skillHotkeys._hotkeyWindow.select(
                    _SH._hotkeyIndex.call(this, hotkey, actor));
        }
        // Otherwise it'd be cancelled instead of triggering on target cancel
        this._actorCommandWindow.deactivate();
        //
        // Otherwise the skill window wouldn't know which actor's using it
        this._skillWindow.setActor(actor);
        //
        this._skillWindow.selectHotkeySkill(hotkey);
        // Otherwise the target selection window won't have time to refresh
        setTimeout(this.onSkillOk.bind(this));
        //
    }; // _SH._onUseHotkey

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @author DoubleX
     * @param {String} hotkey - The symbol of the hotkey involved
     * @param {Game_Actor} actor - The actor involved
     * @returns {Number} The requested hotkey window selection index
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyIndex = function(hotkey, actor) {
        return _SH._hotkeyList.call(this, actor).indexOf(hotkey);
    }; // _SH._hotkeyIndex

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._onHotkeyCancel = function() {
        if (_SH._isHoykeyCancel.call(this)) this._actorCommandWindow.activate();
    }; // _SH._onHotkeyCancel

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._isHoykeyCancel = function() {
        return _SH._hotkeyList.call(this, BattleManager.actor()).indexOf(
                this._actorCommandWindow.currentSymbol()) >= 0;
    }; // _SH._isHoykeyCancel

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @author DoubleX
     * @param {Game_Actor} actor - The actor involved
     * @returns {Array[String]} Ther requested list of hotkey symbols
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hotkeyList = function(actor) {
        return Object.keys(SH.cfgs.hotkeyNames.call(actor));
    }; // _SH._hotkeyList

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    _SH._closeHotkeyWindow = function() {
        // Variable integrity check must always stick to the variable actions
        if (!_SH._hasHotkeyWindow.call(this)) return;
        this.skillHotkeys._hotkeyWindow.hide();
        this.skillHotkeys._hotkeyWindow.deselect();
        //
    }; // _SH._closeHotkeyWindow

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _SH._hasHotkeyWindow = function() {
        return this.skillHotkeys && this.skillHotkeys._hotkeyWindow;
    }; // _SH._hasHotkeyWindow

})(DoubleX_RMMV.Skill_Hotkeys);

/*============================================================================*/
