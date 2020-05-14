// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Parameters"] = "v0.00a";
//

// Edit this to be the same of the name of this parameter plugin file
DoubleX_RMMV.Superlative_ATB_Params_File =
        "DoubleX RMMV Superlative ATB Params v100a";
//

/*:
 *
 * @plugindesc The parameter plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
  *
 * @param _switchIds
 * @type switch[]
 * @desc Sets the list of game switches used by this plugin
 * You can use script calls to change this list later in game
 * @default
 *
 * @param _varIds
 * @type variable[]
 * @desc Sets the list of game variables used by this plugin
 * You can use script calls to change this list later in game
 * @default
 *
 * @param IsCoreEnabled
 * @type note
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _coreBaseFillUnit
 * @parent IsCoreEnabled
 * @type select
 * @option Frames
 * @value coreBaseFillATBFrame
 * @option Seconds
 * @value coreBaseFillATBSec
 * @desc Sets whether the ATB fill rate's based on frames or seconds
 * You can use script calls to change this choice later in game
 * @default coreBaseFillATBFrame
 *
 * @param coreBaseFillATBFrame
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base number of ATB frames to fully fill battler ATB
 * It'll be contents of a function returning a natural Number
 * @default "return 600;"
 *
 * @param coreBaseFillATBSec
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base number of ATB second to fully fill battler ATB
 * It'll be contents of a function returning a positive Number
 * @default "return 5.0;"
 *
 * @param _coreTurnUnit
 * @parent IsCoreEnabled
 * @type select
 * @option Time
 * @value coreTurnATBTime
 * @option Number Of Actions
 * @value coreTurnATBAct
 * @desc Sets whether the turn's based on time or number of actions
 * You can use script calls to change this choice later in game
 * @default coreTurnATBTime
 *
 * @param coreTurnATBTime
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the turn duration as coreBaseFillUnit * coreTurnATBTime
 * It'll be contents of a function returning a positive Number
 * @default "return 1.0;"
 *
 * @param coreTurnATBAct
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the number of actions constituting a turn
 * It'll be contents of a function returning a natural Number
 * @default return BattleManager.allBattleMembers().length;
 *
 * @param canCoreTurnOverflow
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets whether current turn progress can overflow to the next
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param coreMaxATBVal
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base maximum ATB value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return 100.0;"
 *
 * @param coreMaxATBValNoteChainingRule
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets how to use multiple coreMax notetags
 * It'll be the contents of a function returning a String
 * @default "return '*';"
 *
 * @param coreMaxATBValNotePriority
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the data type priority of coreMax notetags
 * It'll be contents of function returning an Array of Strings
 * @default "return ['states', 'skills', 'armors', 'weapons', 'classes', 'battler'];"
 *
 * @help
 *============================================================================
 *    ## Parameter/Configurations Info
 *----------------------------------------------------------------------------
 *    # General
 *      The below points apply to all parameters/configurations unless stated
 *      otherwise:
 *      1. If the value of a parameter's empty, its configuration counterpart
 *         in the configuration plugin will be used instead
 *         (Reference tag: PARAMETERS_CONFIGURATIONS)
 *         - E.g.: Setting the parameter IsCoreEnabled as empty means that the
 *                 configuration isEnabled will be used instead
 *      2. (Advanced)The this pointer referring to the battler involved as the
 *         function contexts are Game_Battler.prototype
 *         (Reference tag: THIS_GAME_BATTLER)
 *      3. (Advanced)Don't change the name nor the ordering of any function
 *         arguments unless you really know what you're truly doing
 *      4. (Advanced)The functions supposedly to return a value should be
 *         Nullipotent
 *      5. (Advanced)Returning highly nondeterministic values like random ones
 *         will have to manually invalidate the corresponding cache first or
 *         those values might be ignored due to the cached ones being used
 *    # Function arguments
 *      Core Module:
 *      1. IsCoreEnabled
 *      2. coreBaseFillATBFrame
 *      3. coreBaseFillATBSec
 *      4. coreTurnATBTime
 *      5. coreTurnATBAct
 *      6. canCoreTurnOverflow
 *      7. coreMaxATBVal
 *      8. coreMaxATBValNoteChainingRule
 *      9. coreMaxATBValNotePriority
 *         None
 *    # Valid values
 *      Core Module:
 *      1. IsCoreEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *         DON'T CHANGE THE RETURNED BOOLEAN VALUE DURING THE SAME BATTLE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      2. coreBaseFillATBFrame
 *         Any valid Javascript returning a natural Number
 *      3. coreBaseFillATBSec
 *      4. coreTurnATBTime
 *         Any valid Javascript returning a positive Number
 *      5. coreTurnATBAct
 *         Any valid Javascript returning a natural Number
 *      6. canCoreTurnOverflow
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      7. coreMaxATBVal
 *         Any valid Javascript returning a positive Number
 *      8. coreMaxATBValNoteChainingRule
 *         Any valid Javascript returning any of the below String:
 *         - "first"(Only the 1st notetag of the involved skill will be used)
 *         - "+"(The results of all effective notetags will be added)
 *         - "-"(The results of all effective notetags will be subtracted)
 *         - "*"(The results of all effective notetags will be multiplied)
 *         - "/"(The results of all effective notetags will be divided)
 *         - "%"(The results of all effective notetags will be remainders)
 *         - (Advanced)"="(The results of effective notetags with higher
 *                         priorities will be replaced by those with lower
 *                         priorities, leading to maximum flexibilities)
 *         - "last"(Only the last effective notetag will be used)
 *         ("=" and "last" are different only for more advanced/creative uses)
 *         (Reference tag: NOTE_OPERATORS)
 *         All invalid values will be regarded as "first"
 *         (Reference tag: DEFAULT_CHAINING_RULE_FIRST)
 *      9. coreMaxATBValNotePriority
 *         Any valid Javascript returning an Array having the below String:
 *         - "states" Effective states in the States category
 *         - "skills" Learnt skills in the Skills category
 *         - "armors" Current armors in the Armors category
 *         - "weapons" Current weapons in the Weapons category
 *         - "currentClass" Current class in the Classes category
 *         - "battler" Involved actor in the Actors/Enemies category
 *         (Reference tag: NOTE_DATA_TYPES)
 *         The effective notetag priority among data types are sorted
 *         ascendingly in the array
 *         The effective notetag priority among the same data type are the
 *         same as the other priorities among there
 *         Notetags of data belonging types not included in the array won't be
 *         effective
 *    # Examples
 *      Core Module:
 *      1. IsCoreEnabled
 *         Setting IsCoreEnabled as return false; will disable this plugin
 *      2. coreBaseFillATBFrame
 *         Setting coreBaseFillATBFrame as return 300; will set the base time
 *         to fully fill battler ATB values as 300 ATB frames(An ATB frame's a
 *         frame with an ATB frame update)
 *         This parameter's effective only when _coreBaseFillUnit is set as
 *         coreBaseFillATBFrame
 *      3. coreBaseFillATBSec
 *         Setting coreBaseFillATBSec as return 10; will set the base time
 *         to fully fill battler ATB values as 10 ATB seconds(An ATB second's
 *         a second combined solely from ATB frames)
 *         This parameter's effective only when _coreBaseFillUnit is set as
 *         coreBaseFillATBSec
 *      4. coreTurnATBTime
 *         If _coreBaseFillUnit is set as coreBaseFillATBFrame and
 *         coreBaseFillATBFrame is set as return 600;, then setting
 *         coreTurnATBTime as return 1.5; will set the turn duration as
 *         600 * 1.5 = 900 ATB frames
 *      5. coreTurnATBAct
 *         Setting coreTurnATBAct as
 *         return BattleManager.allBattleMembers().length; will cause the
 *         turn to consist of the number of turns equal to that of all battlers
 *      6. canCoreTurnOverflow
 *         Setting canCoreTurnOverflow as return true; will cause the current
 *         turn time/action counter to overflow to the next turn(If the counter
 *         and max was 15 and 10 respectively, then a new turn will immediately
 *         come with the current turn/action counter becoming 15 - 10 = 5)
 *      7. coreMaxATBVal
 *         Setting coreMaxATBVal as return 200.0; will cause the maximum ATB
 *         value of each battler to be 200.0
 *      8. coreMaxATBValNoteChainingRule
 *         Setting coreMaxATBValNoteChainingRule as return "="; will cause the
 *         result of effective notetags with higher priorities to be replaced
 *         by those with lower priorities(this can be useful for more advanced
 *         uses by reusing the cached values of all effective notetags with
 *         higher priorities)
 *      9. coreMaxATBValNotePriority
 *         Setting coreMaxATBValNotePriority as
 *         return ["states", "skills", "armors", "weapons", "classes"];
 *         will cause the cond notetags in the States category to have the
 *         highest priorities, followed by the Skills, Armors, Weapons and
 *         Classes categories, whereas no notetags in the Actors nor Enemies
 *         categories will be effective
 */