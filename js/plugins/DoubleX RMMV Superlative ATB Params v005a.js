// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Parameters"] = "v0.05a";
//

// Edit this to be the same of the name of this parameter plugin file
DoubleX_RMMV.Superlative_ATB_Parameters_File =
        "DoubleX RMMV Superlative ATB Params v005a";
//

/*:
 *
 * @plugindesc The parameter plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 *
 * @param IsCoreEnabled
 * @type note
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _isParamFuncCached
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Sets whether function parameters will be cached
 * Sets this off if at least some of those results' random
 * @default false
 *
 * @param _isNoteCached
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Sets whether notetag lists/results will be cached
 * Sets this off if at least some of those results' random
 * @default true
 *
 * @param _isAlwaysRecacheAllSwitchVars
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Please refer to _alwaysRecacheAllSwitchVars
 * in the help section of this parameter plugin
 * @default false

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
 * It'll be contents of a function returning a Natural Number
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
 * @default "return baseFillATB * 2.0 * +$gameVariables.value(5);"
 *
 * @param coreTurnATBAct
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the number of actions constituting a turn
 * It'll be contents of a function returning a Natural Number
 * @default "var memNum = BattleManager.allBattleMembers().length;\nreturn memNum * 2 * +$gameVariables.value(5);"
 *
 * @param canCoreTurnClockOverflow
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
 * @param _coreMaxATBValNoteChainingRule
 * @parent IsCoreEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple coreMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _coreMaxATBValNotePriorities
 * @parent IsCoreEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of coreMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param _coreActStateNoteChainingRule
 * @parent IsCoreEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple coreActState notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param IsBarEnabled
 * @type note
 * @desc Sets whether the Bar Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param isShowATBBar
 * @parent IsBarEnabled
 * @type note
 * @desc Sets if the battler sprite ATB value bar will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return this.isActor() || this.isStateAffected(13);"
 *
 * @param atbBarText
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the text showing the battler ATB values
 * It'll be the contents of a function returning a String
 * @default "var cur = Math.floor(this.curSATB());\nvar max = Math.floor(this.curMaxSATB());\nvar actTimes = this.satbActTimes();\nif (!this.isSATBFill()) {\n    var itemName = this.latestSATBItem_.item.name;\n    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;\n}\nreturn cur + '/' + max + ' : ' + actTimes;"
 *
 * @param atbBarXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar x offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this.isSATBFill() ? -40 : -80;"
 *
 * @param atbBarYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar y offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 10;"
 *
 * @param atbBarW
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the width of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return this.isSATBFill() ? 80 : 160;"
 *
 * @param atbBarH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the height of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 20;"
 *
 * @param atbBarTextSize
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the size of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param atbBarLineH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the line height of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param atbBarTextPadding
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the padding of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarBackOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the back opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param atbBarTextXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the x offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarTextYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the y offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarTextColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the color of the text showing the battler ATB values
 * It'll be the contents of a function returning a Color
 * @default "return bar.textColor(0);"
 *
 * @param atbBarColor1
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the left gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this.isSATBCharge()) return bar.textColor(26);\nif (this.isSATBCooldown()) return bar.textColor(30);\nreturn bar.textColor(8);"
 *
 * @param atbBarColor2
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the right gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this.isSATBCharge()) return bar.textColor(27);\nif (this.isSATBCooldown()) return bar.textColor(31);\nreturn bar.textColor(7);"
 *
 * @param atbBarBackColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the background color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "return bar.textColor(15);"
 *
 * @param _isBarVisibleNoteChainingRule
 * @parent IsBarEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple isBarVisible notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _isBarVisibleNotePriorities
 * @parent IsBarEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of isBarVisible notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param IsHotkeyEnabled
 * @type note
 * @desc Sets whether the Hotkey Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param prevInputableActorKey
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select the inputable actor at the left
 * It'll be the contents of a function returning a String
 * @default "return '#left';"
 *
 * @param nextInputableActorKey
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select the inputable actor at the right
 * It'll be the contents of a function returning a String
 * @default "return '#right';"
 *
 * @param inputableActorKeys
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select inputable actor by party member index
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param IsWaitEnabled
 * @type note
 * @desc Sets whether the Wait Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param isATBWaitCondMet
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the ATB frame wait conditions to be met
 * It'll be the contents of a function returning a Boolean
 * @default "// Checks if any action's executing\nif (BattleManager.isSATBActPhase()) return true;\n//\n// Checks if the actor targets' being selected\nif (this._actorWindow.active) return true;\n//\n// Checks if the enemy targets' being selected\nif (this._enemyWindow.active) return true;\n//\n// Checks if the skills' being selected\nif (this._skillWindow.active) return true;\n//\n// Check if the items' being selected\nif (this._itemWindow.active) return true;\n//\n// Check if the actor commands' being selected\nif (this._actorCommandWindow.active) return true;\n//\n// Check if the party commands' being selected\nreturn this._partyCommandWindow.active;\n//"
 *
 * @param forceRunATBKey
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the key to forcibly run the ATB frame updates
 * It'll be the contents of a function returning a String
 * @default "return '#shift';"
 *
 * @param forceStopATBKey
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the key to forcibly stop the ATB frame updates
 * It'll be the contents of a function returning a String
 * @default "return '#ctrl';"
 *
 * @param isShowForceATBStatWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the window showing force ATB status will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param noForceATBText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update isn't forced
 * It'll be the contents of a function returning a String
 * @default "return 'Not Forcing ATB';"
 *
 * @param forceRunATBStatText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update's forced to run
 * It'll be the contents of a function returning a String
 * @default "return 'Forcibly Running ATB';"
 *
 * @param forceStopATBStatText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update's forced to stop
 * It'll be the contents of a function returning a String
 * @default "return 'Forcibly Stopping ATB';"
 *
 * @param forceATBStatWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the window showing force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBStatWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the window showing force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBStatWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param forceATBStatWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStatTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStatWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force ATB status window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStatWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBStatTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStatBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force ATB status window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBStatTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStatTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param isShowForceATBRunCmdWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the force run ATB command window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param forceRunATBCmdText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text of the force run ATB frame update command
 * It'll be the contents of a function returning a String
 * @default "return 'Force Run';"
 *
 * @param forceATBRunCmdWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBRunCmdWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBRunCmdWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBRunCmdWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBRunCmdTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBRunCmdWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBRunCmdWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBRunCmdTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBRunCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBRunCmdTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBRunCmdTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param isShowForceATBStopCmdWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the force stop ATB command window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param forceStopATBCmdText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text of the force stop ATB frame update command
 * It'll be the contents of a function returning a String
 * @default "return 'Force Stop';"
 *
 * @param forceATBStopCmdWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBStopCmdWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStopCmdWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBStopCmdWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStopCmdTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStopCmdWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStopCmdWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBStopCmdTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStopCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBStopCmdTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStopCmdTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param IsChargeEnabled
 * @type note
 * @desc Sets whether the Charge Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param chargeMaxATBVal
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the base maximum ATB charge value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return coreMax;"
 *
 * @param _chargeMaxATBValNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple chargeMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _chargeMaxATBValNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of chargeMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param isPayBeforeExecCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item costs are paid upon inputting them
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"

 * @param _isPayBeforeExecChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple isPayBeforeExecCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _isPayBeforeExecChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets data type priorities of isPayBeforeExecCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param cancelChargeATBKeys
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the key to cancel the ATB charge
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param canCancelCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item ATB charge can be cancelled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canCancelChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canCancelCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canCancelChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canCancelCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param forceChargeATBKeys
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the key to forcibly extend/finish the ATB charge
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num5', '#num6', '#num7', '#num8'];"
 *
 * @param canForceCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item ATB charge can be forced
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canForceChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canForceCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canForceChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canForceCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]

 * @param IsCooldownEnabled
 * @type note
 * @desc Sets whether the Cooldown Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param cooldownMaxATBVal
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets the base maximum ATB cooldown value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return coreMax;"
 *
 * @param _cooldownMaxATBValNoteChainingRule
 * @parent IsCooldownEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple cooldownMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _cooldownMaxATBValNotePriorities
 * @parent IsCooldownEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of cooldownMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param cancelCooldownATBKeys
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets the key to cancel the ATB cooldown
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param canCancelCooldown
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets whether skill/item ATB cooldown can be cancelled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canCancelCooldownNoteChainingRule
 * @parent IsCooldownEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canCancelCooldown notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canCancelCooldownNotePriorities
 * @parent IsCooldownEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canCancelCooldown notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
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
 *                 configuration IsCoreEnabled will be used instead
 *      2. Operators + and - are associative chaining rules, whereas *, /, %
 *         and = aren't
 *         Associative operators run faster(higher and more stable FPS) but
 *         only non associative ones support the last arguments of NOTEX in
 *         the configuration plugin
 *         (Reference tag: ASSOCIATIVE_CHAINING_RULE)
 *      3. If the value of a parameter is the contents of a function using
 *         switches/variablees, all those switches/variables must be
 *         explicitly written as $gameSwitches.value(x) or
 *         $gameVariables.value(x), where x must be a Number literal instead
 *         of a variable, unless _isAlwaysRecacheAllSwitchVars is ON
 *         (Reference tag: SWITCH_VAR)
 *      4. If a notetag chaining rule is invalid, it'll default to "first"
 *         (Reference tag: DEFAULT_CHAINING_RULE_FIRST)
 *      5. (Advanced)The this pointer referring to the battler involved as the
 *         function contexts are Game_Battler.prototype
 *         (Reference tag: THIS_GAME_BATTLER)
 *      6. (Advanced)Don't change the name nor the ordering of any function
 *         arguments unless you really know what you're truly doing
 *      7. (Advanced)The functions supposedly to return a value should be
 *         Nullipotent
 *      8. (Advanced)Returning highly nondeterministic values like random ones
 *         will have to manually invalidate the corresponding cache first or
 *         those values might be ignored due to the cached ones being used
 *         (Setting _isNoteCached on will free you from doing this, but can
 *         have very severe performance penalties if you use lots of notetags)
 *         This includes frequently changing the states of the game switches
 *         and the values of the game variables used by the notetags
 *         The similar issues present for some of the parameters storing
 *         function contents with _isParamFuncCached, even though the
 *         following are never cached regardless of the values of
 *         _isParamFuncCached:
 *        - Any parameter enabling/disabling a module/the whole plugin
 *          (NONE OF THEM SHOULD BE CHANGED DURING THE SAME BATTLE AFTER ALL)
 *      9. (Advanced)_alwaysRecacheAllSwitchVars should be set on only if you
 *         change from using some switch/variables to using some others or
 *         from not using those to using those or vice versa, without wanting
 *         to explicitly update the switch/variable note factor mapping
 *         yourselves(setting this on might have performance penalties)
 *    # Additional Descriptions
 *      Core Module:
 *      1. IsCoreEnabled
 *         None
 *      2. _isParamFuncCached
 *         Setting it on is more advnatageous when most of the parameter
 *         functions are costly to run, but more disadvantageous otherwise
 *      3. _isNoteCached
 *         This should be set on in general, especially when many script/eval
 *         notetags are used, but can be set off if only a few notetags are
 *         used, all being val, switch, var or cfg with simple functions
 *      4. _isAlwaysRecacheAllSwitchVars
 *         This should be set off in general, unless you want to change data
 *         on the fly or don't write game swtiches/variables in the form of
 *         $gameSwitches.values(x)/$gameVariables.values(y), where x an y are
 *         Number literals rather than variables
 *      5. _coreBaseFillUnit
 *      6. coreBaseFillATBFrame
 *      7. coreBaseFillATBSec
 *      8. _coreTurnUnit
 *      9. coreTurnATBTime
 *         None
 *      10. coreTurnATBAct
 *          Forced actions won't update the battle turn clock action counter
 *      11. canCoreTurnClockOverflow
 *          The battle turn clock consists of 3 units:
 *          - Number of actions executed
 *          - Number of frames elapsed
 *          - Number of seconds elapsed
 *          While only 1 of those units will determine whether the turn's
 *          ended, all these units are always updated, so it's possible that
 *          changing the battle turn clock unit during the same battle can
 *          lead to using the new unit counter way exceeding its maximum
 *          If canCoreTurnClockOverflow returns a truthy result, the
 *          proportion of that amount exceeding the maximum relative to that
 *          maximum will become the progress of the new battle turn
 *          E.g.:
 *          - If the frame unit counter exceeded the maximum by 50%, then the
 *            next turn will be 50% shorter than normal in this case
 *      12. coreMaxATBVal
 *          (Advanced)The context of the function used by this function is
 *          the battler involved(Game_Battler.prototype)
 *      13. _coreMaxATBValNoteChainingRule
 *      14. _coreMaxATBValNotePriorities
 *      15. _coreActStateNoteChainingRule
 *          None
 *      (v0.03a+)Bar Module:
 *      1. IsBarEnabled
 *         None
 *      2. isShowATBBar
 *      3. atbBarText
 *      4. atbBarXOffset
 *      5. atbBarYOffset
 *      6. atbBarW
 *      7. atbBarH
 *      8. atbBarTextSize
 *      9. atbBarLineH
 *      10. atbBarTextPadding
 *      11. atbBarBackOpacity
 *      12. atbBarTextXOffset
 *      13. atbBarTextYOffset
 *      14. atbBarTextColor
 *      15. atbBarColor1
 *      16. atbBarColor2
 *      17. atbBarBackColor
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      18. _isBarVisibleNoteChainingRule
 *      19. _isBarVisibleNotePriorities
 *         None
 *      (v0.01a+)Hotkey Module:
 *      1. IsHotkeyEnabled
 *         None
 *      2. prevInputableActorKey
 *         If the leftmost actor's reached by trying to select a new inputable
 *         actor and that actor's not inputable, the search will continue from
 *         the rightmost actor, until a new inputable actor's found or the one
 *         just at the right of the currently selected one's reached
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         DON'T RETURN A DIFFERENT KEYBOARD MAPPING DURING THE SAME BATTLE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      3. nextInputableActorKey
 *         If the rightmost actor's reached by trying to select a new
 *         inputable actor and that actor's not inputable, the search will
 *         continue from the leftmost actor, until a new inputable actor's
 *         found or the one just at the left of the currently selected one's
 *         reached
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         DON'T RETURN A DIFFERENT KEYBOARD MAPPING DURING THE SAME BATTLE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      4. inputableActorKeys
 *         The ith element of the returned String Array is the hotkey to
 *         select the ith party member if that party member's inputable
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         DON'T RETURN A DIFFERENT KEYBOARD MAPPING LIST DURING THE SAME
 *         BATTLE UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      (v0.02a+)Wait Module:
 *      1. IsWaitEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. isATBWaitCondMet
 *         The ATB frame update still won't be run if it can't be run due to
 *         technical limitations
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         (Advanced)The context of the function used by this function is
 *         Scene_Battle.prototype
 *      3. forceRunATBKey
 *         It changes ther force ATB frame update status from either forcibly
 *         stop to normal or from normal to forcibly run
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      4. forceStopATBKey
 *         It changes ther force ATB frame update status from either forcibly
 *         run to normal or from normal to forcibly stop
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      5. isShowForceATBStatWin
 *         The forceRunATBKey/forceStopATBKey still works even when the
 *         window's hidden
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      6. noForceATBText
 *      7. forceRunATBStatText
 *      8. forceStopATBStatText
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      9. forceATBStatWinX
 *         The smaller the value, the more left the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      10. forceATBStatWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      11. forceATBStatWinW
 *      12. forceATBStatWinH
 *      13. forceATBStatTextSize
 *      14. forceATBStatWinLineH
 *      15. forceATBStatWinPadding
 *      16. forceATBStatTextPadding
 *      17. forceATBStatBackOpacity
 *      18. forceATBStatTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      19. forceATBStatTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      20. isShowForceATBRunCmdWin
 *          The force run ATB hotkey still works even if the force run command
 *          window's hidden
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      21. forceRunATBCmdText
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      22. forceATBRunCmdWinX
 *          The smaller the value, the more left the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      23. forceATBRunCmdWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      24. forceATBRunCmdWinW
 *      25. forceATBRunCmdWinH
 *      26. forceATBRunCmdTextSize
 *      27. forceATBRunCmdWinLineH
 *      28. forceATBRunCmdWinPadding
 *      29. forceATBRunCmdTextPadding
 *      30. forceATBRunCmdBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      31. forceATBRunCmdTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      32. forceATBRunCmdTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      33. isShowForceATBStopCmdWin
 *          The force stop ATB hotkey still works even if the force stop
 *          command window's hidden
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      34. forceStopATBCmdText
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      35. forceATBStopCmdWinX
 *          The smaller the value, the more left the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      36. forceATBStopCmdWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      37. forceATBStopCmdWinW
 *      38. forceATBStopCmdWinH
 *      39. forceATBStopCmdTextSize
 *      40. forceATBStopCmdWinLineH
 *      41. forceATBStopCmdWinPadding
 *      42. forceATBStopCmdTextPadding
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      43. forceATBStopCmdBackOpacity
 *      44. forceATBStopCmdTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      45. forceATBStopCmdTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. chargeMaxATBVal
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      3. _chargeMaxATBValNoteChainingRule
 *      4. _chargeMaxATBValNotePriorities
 *          None
 *      5. isPayBeforeExecCharge
 *         Setting it as true can be useful to prevent the battler failing to
 *         execute the actions due to not being able to pay their costs upon
 *         execution
 *         Setting it as false can be useful to cancel the charge without
 *         paying any cost
 *         The function of this parameter's called upon finishing inputting
 *         a skill/item, and upon finishing executing that skill/item, so
 *         changing the check result for the same skill/item of the same
 *         battler between these 2 moments can lead to the skill/item cost not
 *         being paid or being paid twice
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      6. _isPayBeforeExecChargeNoteChainingRule
 *      7. _isPayBeforeExecChargeNotePriorities
 *         None
 *      8. cancelChargeATBKeys
 *         The ith element of the returned String Array is the hotkey to
 *         cancel the ATB charge of the ith party member
 *         None of the cancel charge ATB keys should overlap with any of the
 *         force charge ATB keys
 *         This can be even more useful with onCancelChargeATB in the
 *         Event Module
 *      9. canCancelCharge
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      10. _canCancelChargeNoteChainingRule
 *      11. _canCancelChargeNotePriorities
 *          None
 *      12. forceChargeATBKeys
 *          The ith element of the returned String Array is the hotkey to
 *          force the ATB charge of the ith party member
 *          None of the force charge ATB keys should overlap with any of the
 *          cancel charge ATB keys
 *          Releasing the force charge ATB key will forcibly end the charge
 *          and call the events on onForceChargeATB, even when the charge
 *          isn't finished
 *          Holding the force charge ATB key will forcibly continue the charge
 *          and increasing the charge ATB beyond its maximum even when the
 *          charge's already finished
 *          If a skill becomes can't be forcibly charged during force charging,
 *          the charge will become back to a normal charge
 *          (Reference tag: MID_DISABLE_FORCE_CHARGE_BACK_TO_NORM)
 *          This should always be used with onForcelChargeATB, willExecAct and
 *          didExecAct in the Event Module
 *      13. canForceCharge
 *          (Advanced)The context of the function used by this function is
 *          the battler involved(Game_Battler.prototype)
 *      14. _canForceChargeNoteChainingRule
 *      15. _canForceChargeNotePriorities
 *          None
 *      (v0.05a+)Cooldown Module:
 *      1. IsCooldownEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. cooldownMaxATBVal
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      3. _cooldownMaxATBValNoteChainingRule
 *      4. _cooldownMaxATBValNotePriorities
 *          None
 *      5. cancelCooldownATBKeys
 *         The ith element of the returned String Array is the hotkey to
 *         cancel the ATB cooldown of the ith party member
 *         This can be even more useful with onCancelCooldownATB in the
 *         Event Module
 *      6. canCancelCooldown
 *         (Advanced)The context of the function used by this function is
 *         the battler involved(Game_Battler.prototype)
 *      7. _canCancelCooldownNoteChainingRule
 *      8. _canCancelCooldownNotePriorities
 *         None
 *    # Function arguments
 *      Core Module:
 *      1. IsCoreEnabled
 *      2. coreBaseFillATBFrame
 *      3. coreBaseFillATBSec
 *         None
 *      4. coreTurnATBTime
 *         baseFillATB - The value returned by coreBaseFillATBFrame or
 *                       coreBaseFillATBSec, depending on the value of
 *                       _coreBaseFillUnit
 *      5. coreTurnATBAct
 *      6. canCoreTurnClockOverflow
 *      7. coreMaxATBVal
 *         None
 *      (v0.03a+)Bar Module
 *      1. IsBarEnabled
 *      2. isShowATBBar
 *      3. atbBarText
 *      4. atbBarXOffset
 *      5. atbBarYOffset
 *      6. atbBarW
 *      7. atbBarH
 *      8. atbBarTextSize
 *      9. atbBarLineH
 *      10. atbBarTextPadding
 *      11. atbBarBackOpacity
 *      12. atbBarTextXOffset
 *      13. atbBarTextYOffset
 *          None
 *      14. atbBarTextColor
 *      15. atbBarColor1
 *      16. atbBarColor2
 *      17. atbBarBackColor
 *          bar - The battler ATB value bar
 *                (Advanced)Its class is Window_SATBBar, a direct parent of
 *                Window_Base
 *      (v0.01a+)Hotkey Module:
 *      1. IsHotkeyEnabled
 *      2. prevInputableActorKey
 *      3. nextInputableActorKey
 *      4. inputableActorKeys
 *         None
 *      (v0.02a+)Wait Module:
 *      1. IsWaitEnabled
 *      2. isATBWaitCondMet
 *      3. forceRunATBKey
 *      4. forceStopATBKey
 *      5. isShowForceATBStatWin
 *      6. noForceATBText
 *      7. forceRunATBStatText
 *      8. forceStopATBStatText
 *      9. forceATBStatWinX
 *      10. forceATBStatWinY
 *      11. forceATBStatWinW
 *      12. forceATBStatWinH
 *      13. forceATBStatTextSize
 *      14. forceATBStatWinLineH
 *      15. forceATBStatWinPadding
 *      16. forceATBStatTextPadding
 *      17. forceATBStatBackOpacity
 *      18. forceATBStatTextXOffset
 *      19. forceATBStatTextYOffset
 *      20. isShowForceATBRunCmdWin
 *      21. forceRunATBCmdText
 *      22. forceATBRunCmdWinX
 *      23. forceATBRunCmdWinY
 *      24. forceATBRunCmdWinW
 *      25. forceATBRunCmdWinH
 *      26. forceATBRunCmdTextSize
 *      27. forceATBRunCmdWinLineH
 *      28. forceATBRunCmdWinPadding
 *      29. forceATBRunCmdTextPadding
 *      30. forceATBRunCmdBackOpacity
 *      31. forceATBRunCmdTextXOffset
 *      32. forceATBRunCmdTextYOffset
 *      33. isShowForceATBStopCmdWin
 *      34. forceStopATBCmdText
 *      35. forceATBStopCmdWinX
 *      36. forceATBStopCmdWinY
 *      37. forceATBStopCmdWinW
 *      38. forceATBStopCmdWinH
 *      39. forceATBStopCmdTextSize
 *      40. forceATBStopCmdWinLineH
 *      41. forceATBStopCmdWinPadding
 *      42. forceATBStopCmdTextPadding
 *      43. forceATBStopCmdBackOpacity
 *      44. forceATBStopCmdTextXOffset
 *      45. forceATBStopCmdTextYOffset
 *          None
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *      2. chargeMaxATBVal
 *         coreMax - The maximum ATB value of the battler involved
 *      3. isPayBeforeExecCharge
 *      4. cancelChargeATBKeys
 *      5. canCancelCharge
 *      6. forceChargeATBKeys
 *      7. canForceCharge
 *         None
 *      (v0.05a+)Cooldown Module:
 *      1. IsCooldownEnabled
 *      2. cooldownMaxATBVal
 *         coreMax - The maximum ATB value of the battler involved
 *      3. cancelCooldownATBKeys
 *      4. canCancelCooldown
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
 *      6. canCoreTurnClockOverflow
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      7. coreMaxATBVal
 *         Any valid Javascript returning a positive Number
 *         (Advanced)It must return a Number much larger than Number.EPSILON
 *      (v0.03a+)Bar Module
 *      1. IsBarEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. isShowATBBar
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      3. atbBarText
 *         Any valid Javascript returning a String
 *      4. atbBarXOffset
 *      5. atbBarYOffset
 *         Any valid Javascript returning an Integer
 *      6. atbBarW
 *      7. atbBarH
 *      8. atbBarTextSize
 *      9. atbBarLineH
 *          Any valid Javascript returning a Natural Number
 *      10. atbBarTextPadding
 *          Any valid Javascript returning a Nonnegative Integer
 *      11. atbBarBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      12. atbBarTextXOffset
 *      13. atbBarTextYOffset
 *          Any valid Javascript returning an Integer
 *      14. atbBarTextColor
 *      15. atbBarColor1
 *      16. atbBarColor2
 *      17. atbBarBackColor
 *          Any valid Javascript returning a Color
 *          Use bar.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      (v0.01a+)Hotkey Module:
 *      1. IsHotkeyEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. prevInputableActorKey
 *      3. nextInputableActorKey
 *         Any valid keyboard mapping, which can be enriched by a keyboard
 *         mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      4. inputableActorKeys
 *         Any String Array whose ith element being a valid keyboard mapping,
 *         which can be enriched by a keyboard mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      (v0.02a+)Wait Module:
 *      1. IsWaitEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. isATBWaitCondMet
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      3. forceRunATBKey
 *      4. forceStopATBKey
 *         Any valid keyboard mapping, which can be enriched by a keyboard
 *         mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      5. isShowForceATBStatWin
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      6. noForceATBText
 *      7. forceRunATBStatText
 *      8. forceStopATBStatText
 *         Any valid Javascript returning a String
 *      9. forceATBStatWinX
 *      10. forceATBStatWinY
 *          Any valid Javascript returning a Nonnegative Integer
 *      11. forceATBStatWinW
 *      12. forceATBStatWinH
 *      13. forceATBStatTextSize
 *      14. forceATBStatWinLineH
 *          Any valid Javascript returning a Natural Number
 *      15. forceATBStatWinPadding
 *      16. forceATBStatTextPadding
 *          Any valid Javascript returning a Nonnegative Integer
 *      17. forceATBStatBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      18. forceATBStatTextXOffset
 *      19. forceATBStatTextYOffset
 *          Any valid Javascript returning an Integer
 *      20. isShowForceATBRunCmdWin
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      21. forceRunATBCmdText
 *          Any valid Javascript returning a String
 *      22. forceATBRunCmdWinX
 *      23. forceATBRunCmdWinY
 *          Any valid Javascript returning a Nonnegative Integer
 *      24. forceATBRunCmdWinW
 *      25. forceATBRunCmdWinH
 *      26. forceATBRunCmdTextSize
 *      27. forceATBRunCmdWinLineH
 *          Any valid Javascript returning a Natural Number
 *      28. forceATBRunCmdWinPadding
 *      29. forceATBRunCmdTextPadding
 *          Any valid Javascript returning a Nonnegative Integer
 *      30. forceATBRunCmdBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      31. forceATBRunCmdTextXOffset
 *      32. forceATBRunCmdTextYOffset
 *          Any valid Javascript returning an Integer
 *      33. isShowForceATBStopCmdWin
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      34. forceStopATBCmdText
 *          Any valid Javascript returning a String
 *      35. forceATBStopCmdWinX
 *      36. forceATBStopCmdWinY
 *          Any valid Javascript returning a Nonnegative Integer
 *      37. forceATBStopCmdWinW
 *      38. forceATBStopCmdWinH
 *      39. forceATBStopCmdTextSize
 *      40. forceATBStopCmdWinLineH
 *          Any valid Javascript returning a Natural Number
 *      41. forceATBStopCmdWinPadding
 *      42. forceATBStopCmdTextPadding
 *          Any valid Javascript returning a Nonnegative Integer
 *      43. forceATBStopCmdBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      44. forceATBStopCmdTextXOffset
 *      45. forceATBStopCmdTextYOffset
 *          Any valid Javascript returning an Integer
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. chargeMaxATBVal
 *         Any valid Javascript returning a positive Number
 *      3. isPayBeforeExecCharge
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      4. cancelChargeATBKeys
 *         Any String Array whose ith element being a valid keyboard mapping,
 *         which can be enriched by a keyboard mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      5. canCancelCharge
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      6. forceChargeATBKeys
 *         Any String Array whose ith element being a valid keyboard mapping,
 *         which can be enriched by a keyboard mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      7. canForceCharge
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      (v0.05a+)Cooldown Module:
 *      1. IsCooldownEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. cooldownMaxATBVal
 *         Any valid Javascript returning a positive Number
 *      3. cancelCooldownATBKeys
 *         Any String Array whose ith element being a valid keyboard mapping,
 *         which can be enriched by a keyboard mapping plugin like QInput:
 *         - https://quxios.github.io/plugins/QInput
 *      4. canCancelCooldown
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
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
 *         coreTurnATBTime as return baseFillATB * 1.5; will set the turn
 *         duration as 600 * 1.5 = 900 ATB frames
 *      5. coreTurnATBAct
 *         Setting coreTurnATBAct as
 *         return BattleManager.allBattleMembers().length; will cause the
 *         turn to consist of the number of turns equal to that of all battler
 *      6. canCoreTurnClockOverflow
 *         Setting canCoreTurnClockOverflow as return true; will cause the
 *         current turn progress clock based on time/action to overflow to
 *         next turn(If the counter and max was 15 and 10 respectively, then
 *         new turn will immediately come with the current turn/action
 *         counter becoming roughly 15 - 10 = 5)
 *      7. coreMaxATBVal
 *         Setting coreMaxATBVal as return 200.0; will cause the maximum ATB
 *         value of each battler to be 200.0
 *      (v0.03a+)Bar Module
 *      1. IsBarEnabled
 *         Setting IsBarEnabled as return true; will enable the Bar Module if
 *         the Core Module's also enabled
 *      2. isShowATBBar
 *         Setting isShowATBBar as
 *         return this.isActor() || this.isStateAffected(13); will show the
 *         ATB bar for actors or battlers with the state with id 13(that state
 *         can be useful as an enemy info scanning mechanism)
 *      3. atbBarText
 *         Setting atbBarText as
 *         return this.coreSATB() + '/' + this.coreMaxSATB() + ' : ' + this.satbActTimes();
 *         will setup the ATB bar text as c/m : a, where c is the current ATB
 *         value, m is the maximum ATB value, and a is the number of virtual
 *         action slots
 *      4. atbBarXOffset
 *      5. atbBarYOffset
 *      6. atbBarW
 *      7. atbBarH
 *      8. atbBarTextSize
 *      9. atbBarLineH
 *      10. atbBarTextPadding
 *      11. atbBarBackOpacity
 *      12. atbBarTextXOffset
 *      13. atbBarTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      14. atbBarTextColor
 *          Setting atbBarTextColor as return bar.textColor(0); will set the
 *          ATB bar text color as text color with color code 0
 *      15. atbBarColor1
 *          Setting atbBarBackColor as return '#00ff00'; will set the
 *          ATB bar left gradient color as purely green color
 *      16. atbBarColor2
 *          Setting atbBarBackColor as return '#00ffff'; will set the
 *          ATB bar right gradient color as purely cyan color
 *      17. atbBarBackColor
 *          Setting atbBarBackColor as return bar.textColor(15); will set the
 *          ATB bar background color as text color with color code 15
 *      (v0.01a+)Hotkey Module:
 *      1. IsHotkeyEnabled
 *         Setting IsHotkeyEnabled as return true; will enable the Hotkey
 *         Module if the Core Module's also enabled
 *      2. prevInputableActorKey
 *         Setting prevUnputableActorKey as return 'left'; will set the
 *         key whose mapping is 'left' to be the hotkey for selecting the
 *         inputable actor whose party index's just smaller than the currently
 *         selected one(the search will continue until the one whose party
 *         index's just larger than the currently selected one's checked)
 *      3. nextInputableActorKey
 *         Setting prevUnputableActorKey as return 'right'; will set the
 *         key whose mapping is 'right' to be the hotkey for selecting the
 *         inputable actor whose party index's just larger than the currently
 *         selected one(the search will continue until the one whose party
 *         index's just smaller than the currently selected one's checked)
 *      4. inputableActorKeys
 *         Setting inputableActorKeys as
 *         return ['#num1', '#num2', '#num3', '#num4'];
 *         will set the key whose mapping is '#numi' to be the hotkey for
 *         selecting the ith party member if that actor's inputable
 *      (v0.02a+)Wait Module:
 *      1. IsWaitEnabled
 *         Setting IsWaitEnabled as return false; will disable the Wait Module
 *      2. isATBWaitCondMet
 *         Setting isATBWaitCondMet as return true; will always run the ATB
 *         frame update as long as it can be technically run
 *      3. forceRunATBKey
 *         Setting forceRunATBKey as return '#shift'; will set the key whose
 *         mapping is '#shift' to be the hotkey for forcibly running the ATB
 *         frame update
 *      4. forceStopATBKey
 *         Setting forceRunATBKey as return '#ctrl'; will set the key whose
 *         mapping is '#ctrl' to be the hotkey for forcibly stopping the ATB
 *         frame update
 *      5. isShowForceATBStatWin
 *         Setting isShowForceATBStatWin as return true; will always show the
 *         force ATB status window in battles
 *      6. noForceATBText
 *         Setting noForceATBText as return 'Not Forcing ATB'; will set the
 *         text showing the ATB frame update isn't forced as Not Forcing ATB
 *      7. forceRunATBStatText
 *         Setting forceRunATBStatText as return 'Forcibly Running ATB'; will
 *         set the text showing the ATB frame update's forcibly run as
 *         Forcibly Running ATB
 *      8. forceStopATBStatText
 *         Setting forceStopATBStatText as return 'Forcibly Stopping ATB'; will
 *         set the text showing the ATB frame update's forcibly run as
 *         Forcibly Stopping ATB
 *      9. forceATBStatWinX
 *      10. forceATBStatWinY
 *      11. forceATBStatWinW
 *      12. forceATBStatWinH
 *      13. forceATBStatTextSize
 *      14. forceATBStatWinLineH
 *      15. forceATBStatWinPadding
 *      16. forceATBStatTextPadding
 *      17. forceATBStatBackOpacity
 *      18. forceATBStatTextXOffset
 *      19. forceATBStatTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      20. isShowForceATBRunCmdWin
 *          Setting isShowForceATBRunCmdWin as return false; will always hide
 *          the force run ATB command window but the function can still be
 *          used by pressing the force run hotkey
 *      21. forceRunATBCmdText
 *         Setting forceRunATBCmdText as return 'Force Run'; will set the
 *         text showing the ATB frame update's forcibly run as Force Run
 *      22. forceATBRunCmdWinX
 *      23. forceATBRunCmdWinY
 *      24. forceATBRunCmdWinW
 *      25. forceATBRunCmdWinH
 *      26. forceATBRunCmdTextSize
 *      27. forceATBRunCmdWinLineH
 *      28. forceATBRunCmdWinPadding
 *      29. forceATBRunCmdTextPadding
 *      30. forceATBRunCmdBackOpacity
 *      31. forceATBRunCmdTextXOffset
 *      32. forceATBRunCmdTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      33. isShowForceATBStopCmdWin
 *          Setting isShowForceATBStopCmdWin as return false; will always hide
 *          the force stop ATB command window but the function can still be
 *          used by pressing the force stop hotkey
 *      34. forceStopATBCmdText
 *         Setting forceStopATBCmdText as return 'Force Stop'; will set the
 *         text showing the ATB frame update's forcibly run as Force Stop
 *      35. forceATBStopCmdWinX
 *      36. forceATBStopCmdWinY
 *      37. forceATBStopCmdWinW
 *      38. forceATBStopCmdWinH
 *      39. forceATBStopCmdTextSize
 *      40. forceATBStopCmdWinLineH
 *      41. forceATBStopCmdWinPadding
 *      42. forceATBStopCmdTextPadding
 *      43. forceATBStopCmdBackOpacity
 *      44. forceATBStopCmdTextXOffset
 *      45. forceATBStopCmdTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *         Setting IsWaitEnabled as return false; will disable the Charge
 *         Module
 *      2. chargeMaxATBVal
 *         Setting chargeMaxATBVal as return coreMax / 2.0; will cause all
 *         skill/item needing to charge to take half the time the battler ATB
 *         needs to fill up from empty to full
 *      3. isPayBeforeExecCharge
 *         Setting isPayBeforeExecCharge as return true; will cause battlers to
 *         pay the skill/item cost upon finishing inputting them instead of
 *         upon finishing executing that skill/item
 *      4. cancelChargeATBKeys
 *         Setting cancelChargeATBKeys as
 *         return ['#num1', '#num2', '#num3', '#num4'];
 *         will set the key whose mapping is '#numi' to be the hotkey for
 *         cancelling the ATB charge of the ith party member
 *      5. canCancelChrage
 *         Setting canCancelChrage as return true; will cause the battler ATB
 *         charge to be cancelled upon pressing the corresponding cancel
 *         charge hotkey
 *      6. forceChargeATBKeys
 *         Setting forceChargeATBKeys as
 *         return ['#num1', '#num2', '#num3', '#num4'];
 *         will set the key whose mapping is '#numi' to be the hotkey for
 *         forcing the ATB charge of the ith party member
 *      7. canForceChrage
 *         Setting canCancelChrage as return false; will cause the battler ATB
 *         charge to continue to act normally even when the corresponding
 *         force charge hotkey' pressed
 *      (v0.05a+)Cooldown Module:
 *      1. IsCooldownEnabled
 *         Setting IsWaitEnabled as return false; will disable the Cooldown
 *         Module
 *      2. cooldownMaxATBVal
 *         Setting cooldownMaxATBVal as return coreMax / 2.0; will cause all
 *         skill/item needing to cooldown to take half the time the battler
 *         ATB needs to fill up from empty to full
 *      3. cancelCooldownATBKeys
 *         Setting cancelCooldownATBKeys as
 *         return ['#num1', '#num2', '#num3', '#num4'];
 *         will set the key whose mapping is '#numi' to be the hotkey for
 *         cancelling the ATB cooldown of the ith party member
 *      4. canCancelChrage
 *         Setting canCancelChrage as return true; will cause the battler ATB
 *         cooldown to be cancelled upon pressing the corresponding cancel
 *         cooldown hotkey
 */
