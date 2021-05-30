// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Parameters"] = "v0.16a";
//

(function() {

    "use strict";

    var src = document.currentScript.src;
    var name = src.split("/").slice(-1)[0].split(".")[0].replace(/%20/g, " ");
    DoubleX_RMMV.Superlative_ATB_Parameters_File = name;

})();

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
 * @default true
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
 * @desc (Advanced)Please refer to _alwaysRecacheAllSwitchVars in the
 * help section of this parameter plugin
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default "var cur = Math.floor(this._battler.curSATB());\nvar max = Math.floor(this._battler.curMaxSATB());\nvar actTimes = this._battler.satbActTimes();\nif (!this._battler.isSATBFill()) {\n    var items = this._battler.latestSATBItems;\n    var itemCount = items.length;\n    if (itemCount > 1) {\n        return cur + '/' + max + ' : ' + actTimes + ' ' + itemCount + ' actions';\n    }\n    var itemName = items[0].item.name;\n    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;\n}\nreturn cur + '/' + max + ' : ' + actTimes;"
 *
 * @param atbBarXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar x offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this._battler.isSATBFill() ? -40 : -80;"
 *
 * @param atbBarYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar y offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 10;"
 *
 * @param atbBarFrameOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the frame opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Opacity
 * @default "return 0;"
 *
 * @param atbBarW
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the width of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return this._battler.isSATBFill() ? 80 : 160;"
 *
 * @param atbBarH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the height of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 20;"
 *
 * @param atbBarFontFace
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the font face of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
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
 * @param atbBarPadding
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the padding of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param atbBarBackOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the back opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param atbBarWinskinPath
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin file path of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param atbBarWinskinFile
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin file name of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param atbBarWinskinHue
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin hue of the battler ATB value bar
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param atbBarWinskinSmooth
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin smooth of the battler ATB value bar
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param atbBarTextAlign
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the text alignment of the battler ATB value bar
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
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
 * @default "return this.textColor(0);"
 *
 * @param atbBarColor1
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the left gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this._battler.isSATBCharge()) return this.textColor(26);\nif (this._battler.isSATBCooldown()) return this.textColor(30);\nreturn this.textColor(8);"
 *
 * @param atbBarColor2
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the right gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this._battler.isSATBCharge()) return this.textColor(27);\nif (this._battler.isSATBCooldown()) return this.textColor(31);\nreturn this.textColor(7);"
 *
 * @param atbBarBackColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the background color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(15);"
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @param isShowStatusATBBar
 * @parent IsBarEnabled
 * @type note
 * @desc Sets if the status window ATB value bar will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return this.isActor() || this.isStateAffected(13);"
 *
 * @param statusATBBarText
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the text showing the battler ATB values
 * It'll be the contents of a function returning a String
 * @default "var cur = Math.floor(this._battler.curSATB());\nvar max = Math.floor(this._battler.curMaxSATB());\nvar actTimes = this._battler.satbActTimes();\nif (!this._battler.isSATBFill()) {\n    var items = this._battler.latestSATBItems;\n    var itemCount = items.length;\n    if (itemCount > 1) {\n        return cur + '/' + max + ' : ' + actTimes + ' ' + itemCount + ' actions';\n    }\n    var itemName = items[0].item.name;\n    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;\n}\nreturn cur + '/' + max + ' : ' + actTimes;"
 *
 * @param statusATBBarXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar x offset relative to the status window
 * It'll be the contents of a function returning an Integer
 * @default "return this._battler.index() * this.width;"
 *
 * @param statusATBBarYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar y offset relative to the status window
 * It'll be the contents of a function returning an Integer
 * @default "return -28;"
 *
 * @param statusATBBarFrameOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the frame opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Opacity
 * @default "return 255;"
 *
 * @param statusATBBarW
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the width of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "var statusWindowW = Graphics.boxWidth - 192;\nreturn statusWindowW / $gameParty.battleMembers().length;"
 *
 * @param statusATBBarH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the height of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 28;"
 *
 * @param statusATBBarFontFace
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the font face of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
 *
 * @param statusATBBarTextSize
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the size of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param statusATBBarLineH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the line height of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param statusATBBarPadding
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the padding of the status window battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param statusATBBarBackOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the back opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param statusATBBarWinskinPath
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin file path of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param statusATBBarWinskinFile
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin file name of the battler ATB value bar
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param statusATBBarWinskinHue
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin hue of the battler ATB value bar
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param statusATBBarWinskinSmooth
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the windowskin smooth of the battler ATB value bar
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param statusATBBarTextAlign
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the text alignment of the battler ATB value bar
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param statusATBBarTextXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the x offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param statusATBBarTextYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the y offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param statusATBBarTextColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the color of the text showing the battler ATB values
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(0);"
 *
 * @param statusATBBarColor1
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the left gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this._battler.isSATBCharge()) return this.textColor(26);\nif (this._battler.isSATBCooldown()) return this.textColor(30);\nreturn this.textColor(8);"
 *
 * @param statusATBBarColor2
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the right gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this._battler.isSATBCharge()) return this.textColor(27);\nif (this._battler.isSATBCooldown()) return this.textColor(31);\nreturn this.textColor(7);"
 *
 * @param statusATBBarBackColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the background color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(15);"
 *
 * @param _isStatusBarVisibleNoteChainingRule
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
 * @desc Sets how to use multiple isStatusBarVisible notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _isStatusBarVisibleNotePriorities
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of isStatusBarVisible notetags
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
 * @default "if (BattleManager.isSATBActPhase()) return true;\nif (this._actorWindow.active) return true;\nif (this._enemyWindow.active) return true;\nif (this._skillWindow.active) return true;\nif (this._itemWindow.active) return true;\nif (this._actorCommandWindow.active) return true;\nif (this._partyCommandWindow.active) return true;\nreturn this._changeWindow && this._changeWindow.active;"
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
 * @param forceATBStatOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the opacity of the force ATB status window
 * It'll be the contents of a function returning an Opacity
 * @default "return 255;"
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
 * @param forceATBStatFontFace
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the font face of the force ATB status window
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
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
 * @param forceATBStatBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force ATB status window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param forceATBStatWinskinPath
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file path of the force ATB status window
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param forceATBStatWinskinFile
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file name of the force ATB status window
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param forceATBStatWinskinHue
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin hue of the force ATB status window
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param forceATBStatWinskinSmooth
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin smooth of the force ATB status window
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param forceATBStatTextColor
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text color of the force ATB status window
 * It'll be the contents of a function returning a Color
 * @default "return this.normalColor();"
 *
 * @param forceATBStatTextAlign
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text alignment of the force ATB status window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
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
 * It'll be the contents of a function returning an Opacity
 * @default "return 40;"
 *
 * @param forceATBRunCmdOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the opacity of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 255;"
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
 * @param forceATBRunCmdFontFace
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the font face of the force run ATB command
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
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
 * @param forceATBRunCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force run ATB command window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param forceATBRunCmdWinskinPath
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file path of the force run ATB command
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param forceATBRunCmdWinskinFile
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file name of the force run ATB command
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param forceATBRunCmdWinskinHue
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin hue of the force run ATB command
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param forceATBRunCmdWinskinSmooth
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin smooth of the force run ATB command
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param forceATBRunCmdTextColor
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text color of the force run ATB command
 * It'll be the contents of a function returning a Color
 * @default "return this.normalColor();"
 *
 * @param forceATBRunCmdTextAlign
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text alignment of the force run ATB command
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
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
 * @param forceATBStopCmdOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the opacity of the force stop ATB command window
 * It'll be the contents of a function returning an Opacity
 * @default "return 255;"
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
 * @param forceATBStopCmdFontFace
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the font face of the force stop ATB command
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
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
 * @param forceATBStopCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force stop ATB command window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param forceATBStopCmdWinskinPath
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file path of the force stop ATB command
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param forceATBStopCmdWinskinFile
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin file name of the force stop ATB command
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param forceATBStopCmdWinskinHue
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin hue of the force stop ATB command
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param forceATBStopCmdWinskinSmooth
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the windowskin smooth of the force stop ATB command
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param forceATBStopCmdTextColor
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text color of the force stop ATB command
 * It'll be the contents of a function returning a Color
 * @default "return this.normalColor();"
 *
 * @param forceATBStopCmdTextAlign
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text alignment of the force stop ATB command
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
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
 * @param IsActEnabled
 * @type note
 * @desc Sets whether the Action Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param _actCostNoteChainingRule
 * @parent IsActEnabled
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
 * @desc Sets how to use multiple actCost notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _actCostNotePriorities
 * @parent IsActEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of actCost notetags
 * You can use script calls to change this list later in game
 * @default ["latestSkillItems","states","armors","weapons","class","actor","enemy"]
 *
 * @param actMode
 * @parent IsActEnabled
 * @type note
 * @desc Sets the action mode when there's no action mode notetags
 * It'll be contents of a function returning a String
 * @default "return 'batch';"
 *
 * @param _actModeNoteChainingRule
 * @parent IsActEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value last
 * @desc Sets how to use multiple actMode notetags
 * You can use script calls to change this choice later in game
 * @default first
 *
 * @param _actModeNotePriorities
 * @parent IsActEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of actMode notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param IsCountdownEnabled
 * @type note
 * @desc Sets whether the Countdown Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param _countdownNoteChainingRule
 * @parent IsCountdownEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value firstTruthy
 * @option Uses the last effective notetag value only
 * @value lastTruthy
 * @desc Sets how to use multiple countdown notetags
 * You can use script calls to change this choice later in game
 * @default firstTruthy
 *
 * @param IsCTBEnabled
 * @type note
 * @desc Sets whether the CTB Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return Input.isPressed('#alt');"
 *
 * @param isShowCTBWin
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets if the CTB window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param ctbWinText
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the CTB window text
 * It'll be the contents of a function returning a String
 * @default "var isCTB = SATBManager.areModulesEnabled(['IsCTBEnabled']);\nreturn isCTB ? 'Charge Turn Battle' : 'Active Time Battle';"
 *
 * @param ctbWinX
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the x position of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param ctbWinY
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the y position of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param ctbWinOpacity
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the opacity of the CTB window
 * It'll be the contents of a function returning an Opacity
 * @default "return 255;"
 *
 * @param ctbWinW
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the width of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param ctbWinH
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the height of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param ctbWinFontFace
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the font face of the CTB window
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
 *
 * @param ctbWinTextSize
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the text size of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param ctbWinLineH
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the line height of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param ctbWinPadding
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the padding of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param ctbWinBackOpacity
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the back opacity of the CTB window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param ctbWinskinPath
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the windowskin file path of the CTB window
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param ctbWinskinFile
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the windowskin file name of the CTB window
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param ctbWinskinHue
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the windowskin hue of the CTB window
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param ctbWinskinSmooth
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the windowskin smooth of the CTB window
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param ctbWinTextColor
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the text color of the CTB window
 * It'll be the contents of a function returning a Color
 * @default "return this.normalColor();"
 *
 * @param ctbWinTextAlign
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the text alignment of the CTB window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param ctbWinTextXOffset
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the text x offset of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param ctbWinTextYOffset
 * @parent IsCTBEnabled
 * @type note
 * @desc Sets the text y offset of the CTB window
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param IsDelayEnabled
 * @type note
 * @desc Sets whether the Delay Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param delaySecs
 * @parent IsDelayEnabled
 * @type note
 * @desc Sets the number of seconds for battlers to delay input
 * It'll be the contents of a function returning a Number
 * @default "if (this.isEnemy()) return 0.5;\nreturn this.isAutoBattle() || this.isConfused() ? 0.5 : 0;"
 *
 * @param _delayNoteChainingRule
 * @parent IsDelayEnabled
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
 * @desc Sets how to use multiple delay notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _delayNotePriorities
 * @parent IsDelayEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of delay notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param IsEventEnabled
 * @type note
 * @desc Sets whether the Event Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param didFinishInput
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when a battler just finishes input
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didFinishInputNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didFinishInput notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didFinishInputNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of didFinishInput notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didBecomeActable
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when a battler becomes able to act
 * It'll be the contents of a function returning nothing
 * @default "AudioManager.playStaticSe({ name: 'Decision2', volume: 90, pitch: 100, pan: 0 });"
 *
 * @param _didBecomeActableNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didBecomeActable notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didBecomeActableNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of didBecomeActable notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param didSetActTimes
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when the virtual action slot's set
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didSetActTimesNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didSetActTimes notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didSetActTimesNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of didSetActTimes notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didSetMaxActTimes
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when max virtual action slot's set
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didSetMaxActTimesNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didSetMaxActTimes notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didSetMaxActTimesNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of didSetMaxActTimes notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didStartATBFill
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB becomes not charge/cooldown
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didStartATBFillNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didStartATBFill notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didStartATBFillNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of didStartATBFill notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param willCancelCharge
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB charge becomes cancelled
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _willCancelChargeNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple willCancelCharge notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _willCancelChargeNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of willCancelCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param didStartForceCharge
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB charge starts being forced
 * It'll be the contents of a function returning nothing
 * @default "SoundManager.playOk();"
 *
 * @param _didStartForceChargeNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didStartForceCharge notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didStartForceChargeNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets data type priorities of didStartForceCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param willCancelCooldown
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB cooldown becomes cancelled
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _willCancelCooldownNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple willCancelCooldown notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _willCancelCooldownNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of willCancelCooldown notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param didCoreATBBecomeFull
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB becomes full
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didCoreATBBecomeFullNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didCoreATBBecomeFull notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didCoreATBBecomeFullNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets data type priorities of didCoreATBBecomeFull notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didCoreATBBecomeNotFull
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB becomes not full
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didCoreATBBecomeNotFullNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didCoreATBBecomeNotFull notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didCoreATBBecomeNotFullNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets data type priority of didCoreATBBecomeNotFull notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didChargeATBBecomeNotFull
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when ATB charge becomes not full
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didChargeATBBecomeNotFullNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didChargeATBBecomeNotFull notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didChargeATBBecomeNotFullNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets data type priority of didChargeATBBecomeNotFull notes
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param didAddInputableActor
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when actor becomes inputable
 * It'll be the contents of a function returning nothing
 * @default "AudioManager.playStaticSe({ name: 'Bell3', volume: 90, pitch: 100, pan: 0 });"
 *
 * @param _didAddInputableActorNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didAddInputableActor notetags
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didAddInputableActorNotePriorities
 * @parent IsEventEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets data type priorities of didAddInputableActor notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didDecreaseCountdownStateTurn
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when a countdown state decreases turn
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didDecreaseCountdownStateTurnNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didDecreaseCountdownStateTurn notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didDecreaseCountdownStateTurnNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via decreasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didDecreaseCountdownStateTurn notes data type priority
 * You can use script calls to change this list later in game
 * @default ["thisState"]
 *
 * @param didIncreaseCountdownStateTurn
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events when a countdown state increases turn
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didIncreaseCountdownStateTurnNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didIncreaseCountdownStateTurn notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didIncreaseCountdownStateTurnNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via increasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didIncreaseCountdownStateTurn notes data type priority
 * You can use script calls to change this list later in game
 * @default ["thisState"]
 *
 * @param didFillCoreATB
 * @parent IsEventEnabled
 * @type note
 * @desc Runs extra events upon filling ATB without charge/cooldown
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didFillCoreATBNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didFillCoreATB notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didFillCoreATBNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via increasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didFillCoreATB notes data type priority
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didFillChargeATB
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events upon filling charge ATB
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didFillChargeATBNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didFillChargeATB notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didFillChargeATBNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via increasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didFillChargeATB notes data type priority
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didFillCooldownATB
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events upon filling cooldown ATB
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didFillCooldownATBNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didFillCooldownATB notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didFillCooldownATBNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via increasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didFillCooldownATB notes data type priority
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param didDelayCounterEnd
 * @parent IsEventEnabled
 * @type note
 * @desc Runs additional events upon ending the delay counter
 * It'll be the contents of a function returning nothing
 * @default " "
 *
 * @param _didDelayCounterEndNoteChainingRule
 * @parent IsEventEnabled
 * @type select
 * @option Runs the 1st effective notetag only
 * @value first
 * @option Runs every effective notetag
 * @value every
 * @option Runs the last effective notetag only
 * @value last
 * @desc Sets how to use multiple didDelayCounterEnd notes
 * You can use script calls to change this choice later in game
 * @default every
 *
 * @param _didDelayCounterEndNotePriorities
 * @parent IsEventEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of the countdown state triggering this event via increasing turn
 * @value thisState
 * @option Data of the countdown state triggering this event
 * @value latestSkillItems
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets didDelayCounterEnd notes data type priority
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param IsOrderEnabled
 * @type note
 * @desc Sets whether the Order Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param isShowContinuousOrderWin
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets if the continuous order window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return !SATBManager.areModulesEnabled(['IsCTBEnabled']);"
 *
 * @param continuousOrderWinX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the x position of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 320;"
 *
 * @param continuousOrderWinY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the y position of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param continuousOrderOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 255;"
 *
 * @param continuousOrderWinW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the width of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return Graphics.width - 320;"
 *
 * @param continuousOrderWinH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the height of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param continuousOrderFontFace
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the font face of the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
 *
 * @param continuousOrderTextSize
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the text size of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param continuousOrderLineH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the line height of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param continuousOrderPadding
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the padding of the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param continuousOrderBackOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the back opacity of the continuous order window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param continuousOrderWinskinPath
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin file path of the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param continuousOrderWinskinFile
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin file name of the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param continuousOrderWinskinHue
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin hue of the continuous order window
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param continuousOrderWinskinSmooth
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin smooth of continuous order window
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param continuousOrderCooldownBarX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar x position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param continuousOrderCooldownBarY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar y position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 24;"
 *
 * @param continuousOrderCooldownBarW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar width in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return (this.width - 16) / 3;"
 *
 * @param continuousOrderCooldownBarH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar height in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 16;"
 *
 * @param continuousOrderCooldownBarColor1
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar 1st color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(30);"
 *
 * @param continuousOrderCooldownBarColor2
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar 2nd color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(31);"
 *
 * @param continuousOrderCooldownTextColor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar text color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(0);"
 *
 * @param continuousOrderCooldownText
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the cooldown bar text in the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return 'Cooldown';"
 *
 * @param continuousOrderCooldownTextX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar text x position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return this.width * 0.11;"
 *
 * @param continuousOrderCooldownTextY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets cooldown bar text y position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param continuousOrderCooldownTextAlign
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the cooldown bar text align in continuous order window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param continuousOrderCoreBarX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar x position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return (this.width - 16) / 3;"
 *
 * @param continuousOrderCoreBarY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar y position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 24;"
 *
 * @param continuousOrderCoreBarW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar width in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return (this.width - 16) / 3;"
 *
 * @param continuousOrderCoreBarH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar height in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 16;"
 *
 * @param continuousOrderCoreBarColor1
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar 1st color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(8);"
 *
 * @param continuousOrderCoreBarColor2
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar 2nd color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(7);"
 *
 * @param continuousOrderCoreTextColor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar text color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(0);"
 *
 * @param continuousOrderCoreText
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the core bar text in the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return 'Core';"
 *
 * @param continuousOrderCoreTextX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar text x position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return this.width * 0.46;"
 *
 * @param continuousOrderCoreTextY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets core bar text y position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 26;"
 *
 * @param continuousOrderCoreTextAlign
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the core bar text align in continuous order window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param continuousOrderChargeBarX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar x position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return (this.width - 16) * 2 / 3;"
 *
 * @param continuousOrderChargeBarY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar y position in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 24;"
 *
 * @param continuousOrderChargeBarW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar width in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return (this.width - 16) / 3;"
 *
 * @param continuousOrderChargeBarH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar height in the continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 16;"
 *
 * @param continuousOrderChargeBarColor1
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar 1st color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(26);"
 *
 * @param continuousOrderChargeBarColor2
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar 2nd color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(27);"
 *
 * @param continuousOrderChargeTextColor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar text color in the continuous order window
 * It'll be the contents of a function returning a Color
 * @default "return this.textColor(0);"
 *
 * @param continuousOrderChargeText
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the charge bar text in the continuous order window
 * It'll be the contents of a function returning a String
 * @default "return 'Charge';"
 *
 * @param continuousOrderChargeTextX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar text x position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return this.width * 0.77;"
 *
 * @param continuousOrderChargeTextY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets charge bar text y position in continuous order window
 * It'll be the contents of a function returning an Integer
 * @default "return 26;"
 *
 * @param continuousOrderChargeTextAlign
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the charge bar text align in continuous order window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param continuousOrderSpriteOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of the continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this.canMakeSATBCmds() ? 255 : 160;"
 *
 * @param continuousOrderSpriteIconFolder
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the icon folder of the continuous order battler sprite
 * It'll be the contents of a function returning a String
 * @default "return 'img/characters/';"
 *
 * @param continuousOrderSpriteIconFilename
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon filename of the continuous order battler sprite
 * It'll be the contents of a function returning a String
 * @default "return '';"
 *
 * @param continuousOrderSpriteIconHue
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the hue of the continuous order battler sprite
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param continuousOrderSpriteIconSmooth
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the smooth of the continuous order battler sprite
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param continuousOrderSpriteIconXCoor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon x coordinate of continuous order battler sprite
 * It'll be the contents of a function returning an Object
 * @default "return 0;"
 *
 * @param continuousOrderSpriteIconYCoor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon y coordinate of continuous order battler sprite
 * It'll be the contents of a function returning an Object
 * @default "return 0;"
 *
 * @param continuousOrderSpriteIconSourceW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon source width of continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param continuousOrderSpriteIconSourceH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon source height of continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param continuousOrderSpriteIconW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon width of continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 24;"
 *
 * @param continuousOrderSpriteIconH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon height of continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 24;"
 *
 * @param continuousOrderSpriteY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon y position of continuous order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this.isActor() ? 48 : 8;"
 *
 * @param isShowDiscreteOrderWin
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets if the continuous order window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return SATBManager.areModulesEnabled(['IsCTBEnabled']);"
 *
 * @param discreteOrderWinX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the x position of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return 320;"
 *
 * @param discreteOrderWinY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the y position of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param discreteOrderOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return 255;"
 *
 * @param discreteOrderWinW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the width of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return Graphics.width - 320;"
 *
 * @param discreteOrderWinH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the height of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param discreteOrderPadding
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the padding of the discrete order window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param discreteOrderBackOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the back opacity of the discrete order window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param discreteOrderWinskinPath
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin file path of the discrete order window
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param discreteOrderWinskinFile
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin file name of the discrete order window
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param discreteOrderWinskinHue
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin hue of the discrete order window
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param discreteOrderWinskinSmooth
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the windowskin smooth of discrete order window
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param showingDiscreteOrderBattlerSpriteOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of a showing discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "var target = this.targetOpacity;\nreturn Math.min(target, this.opacity + target / 60.0);"
 *
 * @param hidingDiscreteOrderBattlerSpriteOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of a hiding discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return Math.max(0, this.opacity - this.targetOpacity / 60.0);"
 *
 * @param discreteOrderSpriteX
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon x position of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "var cur = this.x, target = this._targetX;\nvar rate = (target - this._lastTargetX) / 60.0;\nif (cur < target) return Math.min(target, cur + rate);\nif (cur > target) return Math.max(target, cur + rate);\nreturn cur;"
 *
 * @param discreteOrderSpriteY
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon y position of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "var baseY = 16, cur = this.x;\nvar last = this._lastTargetX, target = this._targetX;\nvar curDiff = this.x - last;\nif (curDiff === 0) return baseY;\nvar targetDiffSq = Math.pow(this._targetX - last, 2);\nvar absY = 50 * curDiff * (target - cur) / targetDiffSq;\nreturn baseY + (curDiff > 0 ? -1 : 1) * absY;"
 *
 * @param discreteOrderSpriteTargetOpacity
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the opacity of the discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this.canMakeSATBCmds() ? 255 : 160;"
 *
 * @param discreteOrderSpriteIconFolder
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the icon folder of the discrete order battler sprite
 * It'll be the contents of a function returning a String
 * @default "return 'img/characters/';"
 *
 * @param discreteOrderSpriteIconFilename
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon filename of the discrete order battler sprite
 * It'll be the contents of a function returning a String
 * @default "return '';"
 *
 * @param discreteOrderSpriteIconHue
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the hue of the discrete order battler sprite
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param discreteOrderSpriteIconSmooth
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets the smooth of the discrete order battler sprite
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param discreteOrderSpriteIconXCoor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon x coordinate of discrete order battler sprite
 * It'll be the contents of a function returning an Object
 * @default "return 0;"
 *
 * @param discreteOrderSpriteIconYCoor
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon y coordinate of discrete order battler sprite
 * It'll be the contents of a function returning an Object
 * @default "return 0;"
 *
 * @param discreteOrderSpriteIconSourceW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon source width of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param discreteOrderSpriteIconSourceH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon source height of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param discreteOrderSpriteIconW
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon width of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param discreteOrderSpriteIconH
 * @parent IsOrderEnabled
 * @type note
 * @desc Sets icon height of discrete order battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 48;"
 *
 * @param IsRateEnabled
 * @type note
 * @desc Sets whether the Rate Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param coreATBRate
 * @parent IsRateEnabled
 * @type note
 * @desc Sets the battler ATB fill rate without charge/cooldown
 * It'll be contents of a function returning a Number
 * @default "var baseFillRate = BattleManager.coreBaseSATBFillRate();\nvar baseMax = this.baseCoreMaxSATB();\nvar avgAgi = BattleManager.satbAvgAgi;\nreturn baseFillRate * this.agi * baseMax * 1.0 / avgAgi;"
 *
 * @param _coreATBRateNoteChainingRule
 * @parent IsRateEnabled
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
 * @desc Sets how to use multiple coreATBRate notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _coreATBRateNotePriorities
 * @parent IsRateEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of coreATBRate notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param chargeATBRate
 * @parent IsRateEnabled
 * @type note
 * @desc Sets the battler ATB charge rate
 * It'll be contents of a function returning a Number
 * @default "return this.coreSATBRate();"
 *
 * @param _chargeATBRateNoteChainingRule
 * @parent IsRateEnabled
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
 * @desc Sets how to use multiple chargeATBRate notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _chargeATBRateNotePriorities
 * @parent IsRateEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of chargeATBRate notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param cooldownATBRate
 * @parent IsRateEnabled
 * @type note
 * @desc Sets the battler ATB cooldown rate
 * It'll be contents of a function returning a Number
 * @default "return this.coreSATBRate();"
 *
 * @param _cooldownATBRateNoteChainingRule
 * @parent IsRateEnabled
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
 * @desc Sets how to use multiple cooldownATBRate notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _cooldownATBRateNotePriorities
 * @parent IsRateEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of cooldownATBRate notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param IsResetEnabled
 * @type note
 * @desc Sets whether the Reset Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param resetATBVal
 * @parent IsResetEnabled
 * @type note
 * @desc Sets the ATB value right after ATB cooldown for each battler
 * It'll be contents of a function returning a Number
 * @default "return 0;"
 *
 * @param _resetATBValNoteChainingRule
 * @parent IsResetEnabled
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
 * @desc Sets how to use multiple resetATBVal notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _resetATBValNotePriorities
 * @parent IsResetEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of resetATBVal notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param IsSpeedEnabled
 * @type note
 * @desc Sets whether the Speed Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param updateActSpeeds
 * @parent IsSpeedEnabled
 * @type note
 * @desc Sets how to update the action speed for each battler
 * It'll be contents of a function returning a Number
 * @default "var speedIncrement = 2000.0 / this._actionBattlers.length;\nthis._actionBattlers.forEach(function(battler) {\n    battler.latestSATBItems.forEach(function(item) {\n        item.speed = Math.min(item.speed + speedIncrement, 2000);\n    });\n});\n"
 *
 * @param actSpeed
 * @parent IsSpeedEnabled
 * @type note
 * @desc Sets the speed of the inputted action for each battler
 * It'll be contents of a function returning a Number
 * @default "return this.latestSATBItems.reduce(function(speed, item) {\n    return speed + item.speed;\n}, 0);"
 *
 * @param _actSpeedNoteChainingRule
 * @parent IsSpeedEnabled
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
 * @desc Sets how to use multiple actSpeed notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _actSpeedNotePriorities
 * @parent IsSpeedEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of actSpeed notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy","latestSkillItems"]
 *
 * @param IsStartEnabled
 * @type note
 * @desc Sets whether the Start Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param normStartATBVal
 * @parent IsStartEnabled
 * @type note
 * @desc Sets the battler ATB value upon a normal battle start
 * It'll be contents of a function returning a Number
 * @default "return this.agi / 999.0 * this.coreMaxSATB();"
 *
 * @param _normStartATBValNoteChainingRule
 * @parent IsStartEnabled
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
 * @desc Sets how to use multiple normStartATBVal notetags
 * You can use script calls to change this choice later in game
 * @default *
 *
 * @param _normStartATBValNotePriorities
 * @parent IsStartEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of normStartATBVal notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param preemptStartATBVal
 * @parent IsStartEnabled
 * @type note
 * @desc Sets the battler ATB value upon a preemptive battle start
 * It'll be contents of a function returning a Number
 * @default "return this.isActor() ? this.coreMaxSATB() : 0;"
 *
 * @param _preemptStartATBValNoteChainingRule
 * @parent IsStartEnabled
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
 * @desc Sets how to use multiple preemptStartATBVal notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _preemptStartATBValNotePriorities
 * @parent IsStartEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of preemptStartATBVal notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param surpriseStartATBVal
 * @parent IsStartEnabled
 * @type note
 * @desc Sets the battler ATB value upon a surprise battle start
 * It'll be contents of a function returning a Number
 * @default "return this.isEnemy() ? this.coreMaxSATB() : 0;"
 *
 * @param _surpriseStartATBValNoteChainingRule
 * @parent IsStartEnabled
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
 * @desc Sets how to use multiple surpriseStartATBVal notetags
 * You can use script calls to change this choice later in game
 * @default +
 *
 * @param _surpriseStartATBValNotePriorities
 * @parent IsStartEnabled
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
 * @option Data of the latest skill/items being used(Can double-count with skills/items)
 * @value latestSkillItems
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
 * @desc Sets the data type priorities of surpriseStartATBVal notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param IsTurnEnabled
 * @type note
 * @desc Sets whether the Turn Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param isShowBattleTurnClockWin
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets if the window showing battle turn clock will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param battleTurnClockText
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the text showing the battle turn clock status
 * It'll be the contents of a function returning a String
 * @default "var cur = SATBTurnManager.curTurnClock().toPrecision(4);\nvar max = SATBTurnManager.curTurnClockMax();\nvar clockUnit = SATBTurnManager.coreTurnClockUnit();\nvar turnCount = $gameTroop.turnCount();\nreturn cur + '/' + max + ' ' + clockUnit + ':' + turnCount;"
 *
 * @param battleTurnClockWinX
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the x position of the window showing battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param battleTurnClockWinY
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the y position of the window showing battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param battleTurnClockOpacity
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the opacity of the battle turn clock window
 * It'll be the contents of a function returning an Opacity
 * @default "return 255;"
 *
 * @param battleTurnClockWinW
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the width of the window showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param battleTurnClockWinH
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the height of the window showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param battleTurnClockFontFace
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the font face of the battle turn clock window
 * It'll be the contents of a function returning a String
 * @default "return Window_Base.prototype.standardFontFace.call(this);"
 *
 * @param battleTurnClockTextSize
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the size of the text showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param battleTurnClockWinLineH
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the line height of the battle turn clock window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param battleTurnClockWinPadding
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the padding of the window showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param battleTurnClockBackOpacity
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the back opacity of the battle turn clock window
 * It'll be the contents of a function returning an Opacity
 * @default "return 192;"
 *
 * @param battleTurnClockWinskinPath
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets windowskin file path of battle turn clock window
 * It'll be the contents of a function returning a String
 * @default "return 'img/system/';"
 *
 * @param battleTurnClockWinskinFile
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the windowskin file name of battle turn clock window
 * It'll be the contents of a function returning a String
 * @default "return 'Window';"
 *
 * @param battleTurnClockWinskinHue
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the windowskin hue of the battle turn clock window
 * It'll be the contents of a function returning a Hue
 * @default "return 0;"
 *
 * @param battleTurnClockWinskinSmooth
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the windowskin smooth of the battle turn clock window
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param battleTurnClockTextColor
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the text color of the battle turn clock window
 * It'll be the contents of a function returning a color
 * @default "return this.normalColor();"
 *
 * @param battleTurnClockTextAlign
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the text alignment of the battle turn clock window
 * It'll be the contents of a function returning a textAlign property
 * @default "return 'center';"
 *
 * @param battleTurnClockTextXOffset
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the x offset of the text showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param battleTurnClockTextYOffset
 * @parent IsTurnEnabled
 * @type note
 * @desc Sets the y offset of the text showing the battle turn clock
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
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
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. _isParamFuncCached
 *         Setting it on is more advnatageous when most of the parameter
 *         functions are costly to run, but more disadvantageous otherwise
 *         Setting it on can boost performance a lot with the Bar Module
 *         enabled
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
 *         None
 *      6. coreBaseFillATBFrame
 *      7. coreBaseFillATBSec
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *      8. _coreTurnUnit
 *         None
 *      9. coreTurnATBTime
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
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
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      13. _coreMaxATBValNoteChainingRule
 *      14. _coreMaxATBValNotePriorities
 *      15. _coreActStateNoteChainingRule
 *          None
 *      (v0.03a+)Bar Module:
 *      1. IsBarEnabled
 *         None
 *      2. isShowATBBar
 *         (Advanced)The context of the function used by this parameter is
 *         the battler involved(Game_Battler.prototype)
 *      3. atbBarText
 *      4. atbBarXOffset
 *      5. atbBarYOffset
 *      6.(v0.06a+) atbBarFrameOpacity
 *      7. atbBarW
 *      8. atbBarH
 *      9.(v0.14a+) atbBarFontFace
 *      10. atbBarTextSize
 *      11. atbBarLineH
 *      12.(v0.06a+) atbBarPadding
 *      13. atbBarBackOpacity
 *      14.(v0.14a+) atbBarWinskinPath
 *      15.(v0.14a+) atbBarWinskinFile
 *      16.(v0.14a+) atbBarWinskinHue
 *      17.(v0.14a+) atbBarWinskinSmooth
 *      18.(v0.14a+) atbBarTextAlign
 *      19. atbBarTextXOffset
 *      20. atbBarTextYOffset
 *      21. atbBarTextColor
 *      22. atbBarColor1
 *      23. atbBarColor2
 *      24. atbBarBackColor
 *          (Advanced)The context of the function used by this parameter is
 *          the battler sprite ATB bar involved(Window_SATBBar.prototype)
 *      25. _isBarVisibleNoteChainingRule
 *      26. _isBarVisibleNotePriorities
 *         None
 *      27.(v0.06a+) isShowStatusATBBar
 *         (Advanced)The context of the function used by this parameter is
 *         the battler involved(Game_Battler.prototype)
 *      28.(v0.06a+) statusATBBarText
 *      29.(v0.06a+) statusATBBarXOffset
 *      30.(v0.06a+) statusATBBarYOffset
 *      31.(v0.06a+) statusATBBarFrameOpacity
 *      32.(v0.06a+) statusATBBarW
 *      33.(v0.06a+) statusATBBarH
 *      34.(v0.06a+) statusATBBarTextSize
 *      35.(v0.06a+) statusATBBarLineH
 *      36.(v0.06a+) statusATBBarPadding
 *      37.(v0.06a+) statusATBBarBackOpacity
 *      38.(v0.14a+) statusATBBarFontFace
 *      39.(v0.14a+) statusATBBarWinskinPath
 *      40.(v0.14a+) statusATBBarWinskinFile
 *      41.(v0.14a+) statusATBBarWinskinHue
 *      42.(v0.14a+) statusATBBarWinskinSmooth
 *      43.(v0.14a+) statusATBBarTextAlign
 *      44.(v0.06a+) statusATBBarTextXOffset
 *      45.(v0.06a+) statusATBBarTextYOffset
 *      46.(v0.06a+) statusATBBarTextColor
 *      47.(v0.06a+) statusATBBarColor1
 *      48.(v0.06a+) statusATBBarColor2
 *      49.(v0.06a+) statusATBBarBackColor
 *          (Advanced)The context of the function used by this parameter is
 *          the status window battler ATB bar involved
 *          (Window_StatusSATBBar.prototype)
 *      50.(v0.06a+) _isStatusBarVisibleNoteChainingRule
 *      51.(v0.06a+) _isStatusBarVisibleNotePriorities
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
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         DON'T RETURN A DIFFERENT KEYBOARD MAPPING DURING THE SAME BATTLE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      3. nextInputableActorKey
 *         If the rightmost actor's reached by trying to select a new
 *         inputable actor and that actor's not inputable, the search will
 *         continue from the leftmost actor, until a new inputable actor's
 *         found or the one just at the left of the currently selected one's
 *         reached
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         DON'T RETURN A DIFFERENT KEYBOARD MAPPING DURING THE SAME BATTLE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      4. inputableActorKeys
 *         The ith element of the returned String Array is the hotkey to
 *         select the ith party member if that party member's inputable
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
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
 *         (Advanced)The context of the function used by this parameter is
 *         Scene_Battle.prototype
 *      3. forceRunATBKey
 *         It changes ther force ATB frame update status from either forcibly
 *         stop to normal or from normal to forcibly run
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      4. forceStopATBKey
 *         It changes ther force ATB frame update status from either forcibly
 *         run to normal or from normal to forcibly stop
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      5. isShowForceATBStatWin
 *         The forceRunATBKey/forceStopATBKey still works even when the
 *         window's hidden
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         force ATB status window involved(Window_SATBForceStatus.prototype)
 *      6. noForceATBText
 *      7. forceRunATBStatText
 *      8. forceStopATBStatText
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         force ATB status window involved(Window_SATBForceStatus.prototype)
 *      9. forceATBStatWinX
 *         The smaller the value, the more left the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         force ATB status window involved(Window_SATBForceStatus.prototype)
 *      10. forceATBStatWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force ATB status window involved
 *          (Window_SATBForceStatus.prototype)
 *      11.(v0.14a+) forceATBStatOpacity
 *      12. forceATBStatWinW
 *      13. forceATBStatWinH
 *      14.(v0.14a+) forceATBStatFontFace
 *      15. forceATBStatTextSize
 *      16. forceATBStatWinLineH
 *      17. forceATBStatWinPadding
 *      18. forceATBStatBackOpacity
 *      19.(v0.14a+) forceATBStatWinskinPath
 *      20.(v0.14a+) forceATBStatWinskinFile
 *      21.(v0.14a+) forceATBStatWinskinHue
 *      22.(v0.14a+) forceATBStatWinskinSmooth
 *      23.(v0.14a+) forceATBStatTextColor
 *      24.(v0.14a+) forceATBStatTextAlign
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force ATB status window involved
 *          (Window_SATBForceStatus.prototype)
 *      25. forceATBStatTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force ATB status window involved
 *          (Window_SATBForceStatus.prototype)
 *      26. forceATBStatTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force ATB status window involved
 *          (Window_SATBForceStatus.prototype)
 *      27. isShowForceATBRunCmdWin
 *          The force run ATB hotkey still works even if the force run command
 *          window's hidden
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      28. forceRunATBCmdText
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      29. forceATBRunCmdWinX
 *          The smaller the value, the more left the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      30. forceATBRunCmdWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      31.(v0.14a+) forceATBRunCmdOpacity
 *      32. forceATBRunCmdWinW
 *      33. forceATBRunCmdWinH
 *      34.(v0.14a+) forceATBRunCmdFontFace
 *      35. forceATBRunCmdTextSize
 *      36. forceATBRunCmdWinLineH
 *      37. forceATBRunCmdWinPadding
 *      38. forceATBRunCmdBackOpacity
 *      39.(v0.14a+) forceATBRunCmdWinskinPath
 *      40.(v0.14a+) forceATBRunCmdWinskinFile
 *      41.(v0.14a+) forceATBRunCmdWinskinHue
 *      42.(v0.14a+) forceATBRunCmdWinskinSmooth
 *      43.(v0.14a+) forceATBRunCmdTextColor
 *      44.(v0.14a+) forceATBRunCmdTextAlign
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      45. forceATBRunCmdTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      46. forceATBRunCmdTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force run ATB command window involved
 *          (Window_SATBForceRunCmd.prototype)
 *      47. isShowForceATBStopCmdWin
 *          The force stop ATB hotkey still works even if the force stop
 *          command window's hidden
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      48. forceStopATBCmdText
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      49. forceATBStopCmdWinX
 *          The smaller the value, the more left the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      50. forceATBStopCmdWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      51.(v0.14a+) forceATBStopCmdOpacity
 *      52. forceATBStopCmdWinW
 *      53. forceATBStopCmdWinH
 *      54.(v0.14a+) forceATBStopCmdFontFace
 *      55. forceATBStopCmdTextSize
 *      56. forceATBStopCmdWinLineH
 *      57. forceATBStopCmdWinPadding
 *      58. forceATBStopCmdBackOpacity
 *      59.(v0.14a+) forceATBStopCmdWinskinPath
 *      60.(v0.14a+) forceATBStopCmdWinskinFile
 *      61.(v0.14a+) forceATBStopCmdWinskinHue
 *      62.(v0.14a+) forceATBStopCmdWinskinSmooth
 *      63.(v0.14a+) forceATBStopCmdTextColor
 *      64.(v0.14a+) forceATBStopCmdTextAlign
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      65. forceATBStopCmdTextXOffset
 *          The offset's relative to the force ATB status window x position
 *          The smaller the value, the more left the text will be in the
 *          force ATB status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      66. forceATBStopCmdTextYOffset
 *          The offset's relative to the force ATB status window y position
 *          The smaller the value, the upper the text will be in the force ATB
 *          status window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the force stop ATB command window involved
 *          (Window_SATBForceStopCmd.prototype)
 *      (v0.16a+)Action Module:
 *      1. IsActEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. _actCostNoteChainingRule
 *      3. _actCostNotePriorities
 *         None
 *      4. actMode
 *         (Advanced)The context of the function used by this parameter is
 *         the battler involved(Game_Battler.prototype)
 *      5. _actModeNoteChainingRule
 *      6. _actModeNotePriorities
 *         None
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. chargeMaxATBVal
 *         (Advanced)The context of the function used by this parameter is
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
 *         (Advanced)The context of the function used by this parameter is
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
 *         (Advanced)The context of the function used by this parameter is
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
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      14. _canForceChargeNoteChainingRule
 *      15. _canForceChargeNotePriorities
 *          None
 *      (v0.05a+)Cooldown Module:
 *      1. IsCooldownEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. cooldownMaxATBVal
 *         (Advanced)The context of the function used by this parameter is
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
 *         (Advanced)The context of the function used by this parameter is
 *         the battler involved(Game_Battler.prototype)
 *      7. _canCancelCooldownNoteChainingRule
 *      8. _canCancelCooldownNotePriorities
 *         None
 *      (v0.12a+)Countdown Module
 *      1. IsCountdownEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         _countdownNoteChainingRule
 *         None
 *      (v0.13a+)CTB Module
 *      1. IsCTBEnabled
 *         The CTB window can still be shown even when the CTB Module's
 *         disabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         DON'T ENABLE THIS MODULE WITHOUT USING THE FULL WAIT ATB MODE
 *         UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *      2. isShowCTBWin
 *         The CTB window can still be shown even when the CTB Module's
 *         disabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         ctb window involved(Window_SATBCTB.prototype)
 *      3. ctbWinText
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         ctb window involved(Window_SATBCTB.prototype)
 *      4. ctbWinX
 *         The smaller the value, the more left the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         ctb window involved(Window_SATBCTB.prototype)
 *      5. ctbWinY
 *         The smaller the value, the upper the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         ctb window involved(Window_SATBCTB.prototype)
 *      6.(v0.14a+) ctbWinOpacity
 *      7. ctbWinW
 *      8. ctbWinH
 *      9.(v0.14a+) ctbWinFontFace
 *      10. ctbWinTextSize
 *      11. ctbWinLineH
 *      12. ctbWinPadding
 *      13. ctbWinBackOpacity
 *      14.(v0.14a+) ctbWinskinPath
 *      15.(v0.14a+) ctbWinskinFile
 *      16.(v0.14a+) ctbWinskinHue
 *      17.(v0.14a+) ctbWinskinSmooth
 *      18.(v0.14a+) ctbWinTextColor
 *      19.(v0.14a+) ctbWinTextAlign
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the ctb window involved(Window_SATBCTB.prototype)
 *      20. ctbWinTextXOffset
 *          The offset's relative to the CTB window x position
 *          The smaller the value, the more left the text will be in the CTB
 *          window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the ctb window involved(Window_SATBCTB.prototype)
 *      21. ctbWinTextYOffset
 *          The offset's relative to the CTB window y position
 *          The smaller the value, the upper the text will be in the CTB
 *          window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the ctb window involved(Window_SATBCTB.prototype)
 *      (v0.15a+)Delay Module
 *      1. IsDelayEnabled
 *         It's run right between a battler just becomes inputable and
 *         actually inputting actions
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      2. delaySecs
 *         When a battler just becomes inputable, its action inputs will be
 *         locked and a delay counter in seconds will be set, and the battler
 *         action inputs will be unlocked when that counter reaches 0
 *      3. _delayNoteChainingRule
 *      4. _delayNotePriorities
 *         None
 *      (v0.06a+)Event Module
 *      1. IsEventEnabled
 *         None
 *      2. didFinishInput
 *         It's run right after a battler has inputted an action to be
 *         executed
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *         (Advanced)It's preferred to be idempotent even though it's not
 *         required
 *      3. _didFinishInputNoteChainingRule
 *      4. _didFinishInputNotePriorities
 *         None
 *      5. didBecomeActable
 *         It's run right after a battler becomes able to execute actions
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *         (Advanced)It's preferred to be idempotent even though it's not
 *         required
 *      6. _didBecomeActableNoteChainingRule
 *      7. _didBecomeActableNotePriorities
 *         None
 *      8. didSetActTimes
 *         It's run right after the number of virtual action slot of a
 *         battler's set
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *         (Advanced)It's preferred to be idempotent even though it's not
 *         required
 *      9. _didSetActTimesNoteChainingRule
 *      10. _didSetActTimesNotePriorities
 *          None
 *      11. didSetMaxActTimes
 *          It's run right after the maximum number of virtual action slot of
 *          a battler's set
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      12. _didSetMaxActTimesNoteChainingRule
 *      13. _didSetMaxActTimesNotePriorities
 *          None
 *      11. didStartATBFill
 *          It's run right after the battler ATB becomes neither charging nor
 *          cooling down
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      12. _didStartATBFillNoteChainingRule
 *      13. _didStartATBFillNotePriorities
 *          None
 *      14. willCancelCharge
 *          It's run right before the battler ATB charge becomes cancelled
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      15. _willCancelChargeNoteChainingRule
 *      16. _willCancelChargeNotePriorities
 *          None
 *      17. didStartForceCharge
 *          It's run right after the ATB charge becomes starting to be forced
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      18. _didStartForceChargeNoteChainingRule
 *      19. _didStartForceChargeNotePriorities
 *          None
 *      20. willCancelCooldown
 *          It's run right before the battler ATB cooldown becomes cancelled
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      21. _willCancelCooldownNoteChainingRule
 *      22. _willCancelCooldownNotePriorities
 *          None
 *      23. didCoreATBBecomeFull
 *          It's run right after the battler ATB becomes full
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      24. _didCoreATBBecomeFullNoteChainingRule
 *      25. _didCoreATBBecomeFullNotePriorities
 *          None
 *      26. didCoreATBBecomeNotFull
 *          It's run right after the battler ATB becomes not full
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      27. _didCoreATBBecomeNotFullNoteChainingRule
 *      28. _didCoreATBBecomeNotFullNotePriorities
 *          None
 *      29. didChargeATBBecomeNotFull
 *          It's run right after the battler ATB charge becomes not full
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      30. _didChargeATBBecomeNotFullNoteChainingRule
 *      31. _didChargeATBBecomeNotFullNotePriorities
 *          None
 *      32. didAddInputableActor
 *          It's run right after the battler becomes able to input actions
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *          (Advanced)It's preferred to be idempotent even though it's not
 *          required
 *      33. _didAddInputableActorNoteChainingRule
 *      34. _didAddInputableActorNotePriorities
 *          None
 *      (v0.12a+)35. didDecreaseCountdownStateTurn
 *          It's run right after a countdown state has turn count decrreased
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.12a+)36. _didDecreaseCountdownStateTurnNoteChainingRule
 *      (v0.12a+)37. _didDecreaseCountdownStateTurnNotePriorities
 *          None
 *      (v0.12a+)38. didIncreaseCountdownStateTurn
 *          It's run right after a countdown state has turn count increased
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.12a+)39. _didIncreaseCountdownStateTurnNoteChainingRule
 *      (v0.12a+)40. _didIncreaseCountdownStateTurnNotePriorities
 *          None
 *      (v0.13a+)41. didFillCoreATB
 *          It's run right after the ATB fills without charge nor cooldown
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.13a+)42. _didFillCoreATBNoteChainingRule
 *      (v0.13a+)43. _didFillCoreATBNotePriorities
 *          None
 *      (v0.13a+)44. didFillChargeATB
 *          It's run right after the ATB charge fills
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.13a+)45. _didFillChargeATBNoteChainingRule
 *      (v0.13a+)46. _didFillChargeATBNotePriorities
 *          None
 *      (v0.13a+)47. didFillCooldownATB
 *          It's run right after the ATB cooldown fils
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.13a+)48. _didFillCooldownATBNoteChainingRule
 *      (v0.13a+)49. _didFillCooldownATBNotePriorities
 *          None
 *      (v0.15a+)50. didDelayCounterEnd
 *          It's run right after the delay counter that locks the action
 *          inputs has ended(and thus the action inputs will be unlocked)
 *          (Advanced)The context of the function used by this parameter is
 *          the battler involved(Game_Battler.prototype)
 *      (v0.15a+)51. _didDelayCounterEndNoteChainingRule
 *      (v0.15a+)52. _didDelayCounterEndNotePriorities
 *          None
 *      (v0.14a+)Order Module
 *      1. IsOrderEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. isShowContinuousOrderWin
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         continuous order window involved
 *         (Window_SATBContinuousOrder.prototype)
 *      3. continuousOrderWinX
 *         The smaller the value, the more left the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         continuous order window involved
 *         (Window_SATBContinuousOrder.prototype)
 *      4. continuousOrderWinY
 *         The smaller the value, the upper the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         continuous order window involved
 *         (Window_SATBContinuousOrder.prototype)
 *      5. continuousOrderOpacity
 *      6. continuousOrderWinW
 *      7. continuousOrderWinH
 *      8. continuousOrderFontFace
 *      9. continuousOrderTextSize
 *      10. continuousOrderLineH
 *      11. continuousOrderPadding
 *      12. continuousOrderBackOpacity
 *      13. continuousOrderWinskinPath
 *      14. continuousOrderWinskinFile
 *      15. continuousOrderWinskinHue
 *      16. continuousOrderWinskinSmooth
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      17. continuousOrderCooldownBarX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      18. continuousOrderCooldownBarY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      19. continuousOrderCooldownBarW
 *      20. continuousOrderCooldownBarH
 *      21. continuousOrderCooldownBarColor1
 *      22. continuousOrderCooldownBarColor2
 *      23. continuousOrderCooldownTextColor
 *      24. continuousOrderCooldownText
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      25. continuousOrderCooldownTextX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      26. continuousOrderCooldownTextY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      27. continuousOrderCooldownTextAlign
 *      28. continuousOrderCoreBarX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      29. continuousOrderCoreBarY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      30. continuousOrderCoreBarW
 *      31. continuousOrderCoreBarH
 *      32. continuousOrderCoreBarColor1
 *      33. continuousOrderCoreBarColor2
 *      34. continuousOrderCoreTextColor
 *      35. continuousOrderCoreText
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      36. continuousOrderCoreTextX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      37. continuousOrderCoreTextY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      38. continuousOrderCoreTextAlign
 *      39. continuousOrderChargeBarX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      40. continuousOrderChargeBarY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      41. continuousOrderChargeBarW
 *      42. continuousOrderChargeBarH
 *      43. continuousOrderChargeBarColor1
 *      44. continuousOrderChargeBarColor2
 *      45. continuousOrderChargeTextColor
 *      46. continuousOrderChargeText
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      47. continuousOrderChargeTextX
 *          The x position's relative to the continuous order window x
 *          position
 *          The smaller the value, the more left the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      48. continuousOrderChargeTextY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the bar will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the continuous order window involved
 *          (Window_SATBContinuousOrder.prototype)
 *      49. continuousOrderChargeTextAlign
 *      50. continuousOrderSpriteOpacity
 *      51. continuousOrderSpriteIconFolder
 *      52. continuousOrderSpriteIconFilename
 *      53. continuousOrderSpriteIconHue
 *      54. continuousOrderSpriteIconSmooth
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      55. continuousOrderSpriteIconXCoor
 *          If it returns x, it means the icon with column x + 1 in the icon
 *          sheet will be chosen
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      56. continuousOrderSpriteIconYCoor
 *          If it returns y, it means the icon with row y + 1 in the icon
 *          sheet will be chosen
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      57. continuousOrderSpriteIconSourceW
 *          It's the width of an icon in the specified icon sheet
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      58. continuousOrderSpriteIconSourceH
 *          It's the height of an icon in the specified icon sheet
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      59. continuousOrderSpriteIconW
 *          It's the width of an icon drawn on the continuous order window
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      60. continuousOrderSpriteIconH
 *          It's the height of an icon drawn on the continuous order window
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      61. continuousOrderSpriteY
 *          The y position's relative to the continuous order window y
 *          position
 *          The smaller the value, the upper the battler sprite will be in the
 *          continuous order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      62. isShowDiscreteOrderWin
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          DON'T RETURN A TRUTHY RESULT WITHOUT THE CTB MODULE ENABLED UNLESS
 *          YOU REALLY KNOW WHAT YOU'RE TRULY DOING
 *          (Advanced)The context of the function used by this parameter is
 *          the discrete order window involved
 *          (Window_SATBDiscreteOrder.prototype)
 *      63. discreteOrderWinX
 *          The smaller the value, the more left the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the discrete order window involved
 *          (Window_SATBDiscreteOrder.prototype)
 *      64. discreteOrderWinY
 *          The smaller the value, the upper the window position wil be
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the discrete order window involved
 *          (Window_SATBDiscreteOrder.prototype)
 *      65. discreteOrderOpacity
 *      66. discreteOrderWinW
 *      67. discreteOrderWinH
 *      68. discreteOrderPadding
 *      69. discreteOrderBackOpacity
 *      70. discreteOrderWinskinPath
 *      71. discreteOrderWinskinFile
 *      72. discreteOrderWinskinHue
 *      73. discreteOrderWinskinSmooth
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the discrete order window involved
 *          (Window_SATBDiscreteOrder.prototype)
 *      74. showingDiscreteOrderBattlerSpriteOpacity
 *      75. hidingDiscreteOrderBattlerSpriteOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      76. discreteOrderSpriteX
 *          The x position's relative to the discrete order window x
 *          position
 *          The smaller the value, the upper the battler sprite will be in the
 *          discrete order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      77. discreteOrderSpriteY
 *          The y position's relative to the discrete order window y
 *          position
 *          The smaller the value, the upper the battler sprite will be in the
 *          discrete order window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      78. discreteOrderSpriteTargetOpacity
 *      79. discreteOrderSpriteIconFolder
 *      80. discreteOrderSpriteIconFilename
 *      81. discreteOrderSpriteIconHue
 *      82. discreteOrderSpriteIconSmooth
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      83. discreteOrderSpriteIconXCoor
 *          If it returns x, it means the icon with column x + 1 in the icon
 *          sheet will be chosen
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      84. discreteOrderSpriteIconYCoor
 *          If it returns y, it means the icon with row y + 1 in the icon
 *          sheet will be chosen
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      85. discreteOrderSpriteIconSourceW
 *          It's the width of an icon in the specified icon sheet
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      86. discreteOrderSpriteIconSourceH
 *          It's the height of an icon in the specified icon sheet
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      87. discreteOrderSpriteIconW
 *          It's the width of an icon drawn on the discrete order window
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      88. discreteOrderSpriteIconH
 *          It's the height of an icon drawn on the discrete order window
 *          (Advanced)The context of the function used by this parameter is the
 *          battler involved(Game_Battler.prototype)
 *      (v0.10a+)Rate Module
 *      1. IsRateEnabled
 *         None
 *      2. coreATBRate
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      3. _coreATBRateNoteChainingRule
 *      4. _coreATBRateNotePriorities
 *         None
 *      5. chargeATBRate
 *         If the Charge Module's disabled, chargeATBRate will always be the
 *         same as coreATBRate
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      6. _chargeATBRateNoteChainingRule
 *      7. _chargeATBRateNotePriorities
 *         None
 *      8. cooldownATBRate
 *         If the Cooldown Module's disabled, cooldownATBRate will always be
 *         the same as coreATBRate
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      9. _cooldownATBRateNoteChainingRule
 *      10. _cooldownATBRateNotePriorities
 *          None
 *      (v0.07a+)Reset Module
 *      1. IsResetEnabled
 *         None
 *      2. resetATBVal
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      3. _resetATBValNoteChainingRule
 *      4. _resetATBValNotePriorities
 *         None
 *      (v0.08a+)Speed Module
 *      1. IsSpeedEnabled
 *         None
 *      2. updateActSpeeds
 *         The action speed of all battlers will be updated whenever a battler
 *         becomes able to execute actions
 *         (Advanced)The context of the function used by this parameter is the
 *         BattleManager
 *      3. actSpeed
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      4. _actSpeedNoteChainingRule
 *      5. _actSpeedNotePriorities
 *         None
 *      (v0.09a+)Start Module
 *      1. IsStartEnabled
 *         None
 *      2. normStartATBVal
 *         It's called upon a normal battle start(not preemptive nor surprise)
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      3. _normStartATBValNoteChainingRule
 *      4. _normStartATBValNotePriorities
 *         None
 *      5. preemptStartATBVal
 *         It's called upon a preemptive battle start
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      6. _preemptStartATBValNoteChainingRule
 *      7. _preemptStartATBValNotePriorities
 *         None
 *      8. surpriseStartATBVal
 *         It's called upon a surprise battle start
 *         (Advanced)The context of the function used by this parameter is the
 *         battler involved(Game_Battler.prototype)
 *      9. _surpriseStartATBValNoteChainingRule
 *      10. _surpriseStartATBValNotePriorities
 *          None
 *      (v0.11a+)Turn Module
 *      1. IsTurnEnabled
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *      2. isShowBattleTurnClockWin
 *      3. battleTurnClockText
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND SMALL
 *         UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         battle turn clock window involved(Window_SATBTurnClock.prototype)
 *      4. battleTurnClockWinX
 *         The smaller the value, the more left the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         battle turn clock window involved(Window_SATBTurnClock.prototype)
 *      5. battleTurnClockWinY
 *         The smaller the value, the upper the window position wil be
 *         You'll likely have to experimenet this yourselves to find values
 *         that suit your needs
 *         THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *         BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *         SMALL UNLESS _isParamFuncCached IS ON
 *         (Advanced)The context of the function used by this parameter is the
 *         battle turn clock window involved(Window_SATBTurnClock.prototype)
 *      6.(v0.14a+) battleTurnClockOpacity
 *      7. battleTurnClockWinW
 *      8. battleTurnClockWinH
 *      9.(v0.14a+) battleTurnClockFontFace
 *      10. battleTurnClockTextSize
 *      11. battleTurnClockWinLineH
 *      12. battleTurnClockWinPadding
 *      13. battleTurnClockBackOpacity
 *      14.(v0.14a+) battleTurnClockWinskinPath
 *      15.(v0.14a+) battleTurnClockWinskinFile
 *      16.(v0.14a+) battleTurnClockWinskinHue
 *      17.(v0.14a+) battleTurnClockWinskinSmooth
 *      19.(v0.14a+) battleTurnClockTextColor
 *      20.(v0.14a+) battleTurnClockTextAlign
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the battle turn clock window involved
 *          (Window_SATBTurnClock.prototype)
 *      21. battleTurnClockTextXOffset
 *          The offset's relative to the battle turn clock window x position
 *          The smaller the value, the more left the text will be in the
 *          battle turn clock window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the battle turn clock window involved
 *          (Window_SATBTurnClock.prototype)
 *      22. battleTurnClockTextYOffset
 *          The offset's relative to the battle turn clock window y position
 *          The smaller the value, the upper the text will be in the battle
 *          turn clock window
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *          THE FUNCTION USED BY THIS PARAMETER SHOULD BE PERFORMANT ENOUGH TO
 *          BE RUN PER FRAME SO THIS PARAMETER SHOULD BE EASY, SIMPLE AND
 *          SMALL UNLESS _isParamFuncCached IS ON
 *          (Advanced)The context of the function used by this parameter is
 *          the battle turn clock window involved
 *          (Window_SATBTurnClock.prototype)
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
 *      6.(v0.06a+) atbBarFrameOpacity
 *      7. atbBarW
 *      8. atbBarH
 *      9.(v0.14a+) atbBarFontFace
 *      10. atbBarTextSize
 *      11. atbBarLineH
 *      12.(v0.06a+) atbBarPadding
 *      13. atbBarBackOpacity
 *      14.(v0.14a+) atbBarWinskinPath
 *      15.(v0.14a+) atbBarWinskinFile
 *      16.(v0.14a+) atbBarWinskinHue
 *      17.(v0.14a+) atbBarWinskinSmooth
 *      18.(v0.14a+) atbBarTextAlign
 *      19. atbBarTextXOffset
 *      20. atbBarTextYOffset
 *      21. atbBarTextColor
 *      22. atbBarColor1
 *      23. atbBarColor2
 *      24. atbBarBackColor
 *      25.(v0.06a+) isShowStatusATBBar
 *      26.(v0.06a+) statusATBBarText
 *      27.(v0.06a+) statusATBBarXOffset
 *      28.(v0.06a+) statusATBBarYOffset
 *      29.(v0.06a+) statusATBBarFrameOpacity
 *      30.(v0.06a+) statusATBBarW
 *      31.(v0.06a+) statusATBBarH
 *      32.(v0.14a+) statusATBBarFontFace
 *      33.(v0.06a+) statusATBBarTextSize
 *      34.(v0.06a+) statusATBBarLineH
 *      35.(v0.06a+) statusATBBarPadding
 *      36.(v0.06a+) statusATBBarBackOpacity
 *      37.(v0.14a+) statusATBBarWinskinPath
 *      38.(v0.14a+) statusATBBarWinskinFile
 *      39.(v0.14a+) statusATBBarWinskinHue
 *      40.(v0.14a+) statusATBBarWinskinSmooth
 *      41.(v0.14a+) statusATBBarTextAlign
 *      42.(v0.06a+) statusATBBarTextXOffset
 *      43.(v0.06a+) statusATBBarTextYOffset
 *      44.(v0.06a+) statusATBBarTextColor
 *      45.(v0.06a+) statusATBBarColor1
 *      46.(v0.06a+) statusATBBarColor2
 *      47.(v0.06a+) statusATBBarBackColor
 *          None
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
 *      11.(v0.14a+) forceATBStatOpacity
 *      12. forceATBStatWinW
 *      13. forceATBStatWinH
 *      14.(v0.14a+) forceATBStatFontFace
 *      15. forceATBStatTextSize
 *      16. forceATBStatWinLineH
 *      17. forceATBStatWinPadding
 *      18. forceATBStatBackOpacity
 *      19.(v0.14a+) forceATBStatWinskinPath
 *      20.(v0.14a+) forceATBStatWinskinFile
 *      21.(v0.14a+) forceATBStatWinskinHue
 *      22.(v0.14a+) forceATBStatWinskinSmooth
 *      23.(v0.14a+) forceATBStatTextColor
 *      24.(v0.14a+) forceATBStatTextAlign
 *      25. forceATBStatTextXOffset
 *      26. forceATBStatTextYOffset
 *      27. isShowForceATBRunCmdWin
 *      28. forceRunATBCmdText
 *      29. forceATBRunCmdWinX
 *      30. forceATBRunCmdWinY
 *      31.(v0.14a+) forceATBRunCmdOpacity
 *      32. forceATBRunCmdWinW
 *      33. forceATBRunCmdWinH
 *      34.(v0.14a+) forceATBRunCmdFontFace
 *      35. forceATBRunCmdTextSize
 *      36. forceATBRunCmdWinLineH
 *      37. forceATBRunCmdWinPadding
 *      38. forceATBRunCmdBackOpacity
 *      39.(v0.14a+) forceATBRunCmdWinskinPath
 *      40.(v0.14a+) forceATBRunCmdWinskinFile
 *      41.(v0.14a+) forceATBRunCmdWinskinHue
 *      42.(v0.14a+) forceATBRunCmdWinskinSmooth
 *      43.(v0.14a+) forceATBRunCmdTextColor
 *      44.(v0.14a+) forceATBRunCmdTextAlign
 *      45. forceATBRunCmdTextXOffset
 *      46. forceATBRunCmdTextYOffset
 *      47. isShowForceATBStopCmdWin
 *      48. forceStopATBCmdText
 *      49. forceATBStopCmdWinX
 *      50. forceATBStopCmdWinY
 *      51.(v0.14a+) forceATBStopCmdOpacity
 *      52. forceATBStopCmdWinW
 *      53. forceATBStopCmdWinH
 *      54.(v0.14a+) forceATBStopFontFace
 *      55. forceATBStopCmdTextSize
 *      56. forceATBStopCmdWinLineH
 *      57. forceATBStopCmdWinPadding
 *      58. forceATBStopCmdBackOpacity
 *      59.(v0.14a+) forceATBStopCmdWinskinPath
 *      60.(v0.14a+) forceATBStopCmdWinskinFile
 *      61.(v0.14a+) forceATBStopCmdWinskinHue
 *      62.(v0.14a+) forceATBStopCmdWinskinSmooth
 *      63.(v0.14a+) forceATBStopCmdTextColor
 *      64.(v0.14a+) forceATBStopCmdTextAlign
 *      65. forceATBStopCmdTextXOffset
 *      66. forceATBStopCmdTextYOffset
 *          None
 *      (v0.16a+)Action Module:
 *      1. IsActEnabled
 *      2. actMode
 *         None
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
 *      (v0.12a+)Countdown Module
 *      1. IsCountdownEnabled
 *         None
 *      (v0.13a+)CTB Module
 *      1. IsCTBEnabled
 *      2. isShowCTBWin
 *      3. ctbWinText
 *      4. ctbWinX
 *      5. ctbWinY
 *      6.(v0.14a+) ctbWinOpacity
 *      7. ctbWinW
 *      8. ctbWinH
 *      9.(v0.14a+) ctbWinFontFace
 *      10. ctbWinTextSize
 *      11. ctbWinLineH
 *      12. ctbWinPadding
 *      13. ctbWinBackOpacity
 *      14.(v0.14a+) ctbWinskinPath
 *      15.(v0.14a+) ctbWinskinFile
 *      16.(v0.14a+) ctbWinskinHue
 *      17.(v0.14a+) ctbWinskinSmooth
 *      18.(v0.14a+) ctbWinTextColor
 *      19.(v0.14a+) ctbWinTextAlign
 *      20. ctbWinTextXOffset
 *      21. ctbWinTextYOffset
 *          None
 *      (v0.15a+)Delay Module
 *      1. IsDelayEnabled
 *      2. delaySecs
 *         None
 *      (v0.06a+)Event Module
 *      1. IsEventEnabled
 *      2. didFinishInput
 *      3. didBecomeActable
 *      4. didSetActTimes
 *      5. didSetMaxActTimes
 *      6. didStartATBFill
 *      7. willCancelCharge
 *      8. didStartForceCharge
 *      9. willCancelCooldown
 *      10. didCoreATBBecomeFull
 *      11. didCoreATBBecomeNotFull
 *      12. didChargeATBBecomeNotFull
 *      13. didAddInputableActor
 *          None
 *      (v0.12a+)13. didDecreaseCountdownStateTurn
 *      (v0.12a+)14. didIncreaseCountdownStateTurn
 *          stateId - The id of countdown state having its turn count updated
 *      (v0.13a+)15. didFillCoreATB
 *      (v0.13a+)16. didFillChargeATB
 *      (v0.13a+)17. didFillCooldownATB
 *      (v0.15a+)18. didDelayCounterEnd
 *          None
 *      (v0.14a+)Order Module
 *      1. IsOrderEnabled
 *      2. isShowContinuousOrderWin
 *      3. continuousOrderWinX
 *      4. continuousOrderWinY
 *      5. continuousOrderOpacity
 *      6. continuousOrderWinW
 *      7. continuousOrderWinH
 *      8. continuousOrderFontFace
 *      9. continuousOrderTextSize
 *      10. continuousOrderLineH
 *      11. continuousOrderPadding
 *      12. continuousOrderBackOpacity
 *      13. continuousOrderWinskinPath
 *      14. continuousOrderWinskinFile
 *      15. continuousOrderWinskinHue
 *      16. continuousOrderWinskinSmooth
 *      17. continuousOrderCooldownBarX
 *      18. continuousOrderCooldownBarY
 *      19. continuousOrderCooldownBarW
 *      20. continuousOrderCooldownBarH
 *      21. continuousOrderCooldownBarColor1
 *      22. continuousOrderCooldownBarColor2
 *      23. continuousOrderCooldownTextColor
 *      24. continuousOrderCooldownText
 *      25. continuousOrderCooldownTextX
 *      26. continuousOrderCooldownTextY
 *      27. continuousOrderCooldownTextAlign
 *      28. continuousOrderCoreBarX
 *      29. continuousOrderCoreBarY
 *      30. continuousOrderCoreBarW
 *      31. continuousOrderCoreBarH
 *      32. continuousOrderCoreBarColor1
 *      33. continuousOrderCoreBarColor2
 *      34. continuousOrderCoreTextColor
 *      35. continuousOrderCoreText
 *      36. continuousOrderCoreTextX
 *      37. continuousOrderCoreTextY
 *      38. continuousOrderCoreTextAlign
 *      39. continuousOrderChargeBarX
 *      40. continuousOrderChargeBarY
 *      41. continuousOrderChargeBarW
 *      42. continuousOrderChargeBarH
 *      43. continuousOrderChargeBarColor1
 *      44. continuousOrderChargeBarColor2
 *      45. continuousOrderChargeTextColor
 *      46. continuousOrderChargeText
 *      47. continuousOrderChargeTextX
 *      48. continuousOrderChargeTextY
 *      49. continuousOrderChargeTextAlign
 *          None
 *      50. continuousOrderSpriteOpacity
 *      51. continuousOrderSpriteIconFolder
 *      52. continuousOrderSpriteIconFilename
 *      53. continuousOrderSpriteIconHue
 *      54. continuousOrderSpriteIconSmooth
 *      55. continuousOrderSpriteIconXCoor
 *      56. continuousOrderSpriteIconYCoor
 *      57. continuousOrderSpriteIconSourceW
 *      58. continuousOrderSpriteIconSourceH
 *      59. continuousOrderSpriteIconW
 *      60. continuousOrderSpriteIconH
 *      61. continuousOrderSpriteY
 *          continuousOrderSprite - The continuous order battler sprite icon
 *      62. isShowDiscreteOrderWin
 *      63. discreteOrderWinX
 *      64. discreteOrderWinY
 *      65. discreteOrderOpacity
 *      66. discreteOrderWinW
 *      67. discreteOrderWinH
 *      68. discreteOrderPadding
 *      69. discreteOrderBackOpacity
 *      70. discreteOrderWinskinPath
 *      71. discreteOrderWinskinFile
 *      72. discreteOrderWinskinHue
 *      73. discreteOrderWinskinSmooth
 *          None
 *      74. showingDiscreteOrderBattlerSpriteOpacity
 *      75. hidingDiscreteOrderBattlerSpriteOpacity
 *      76. discreteOrderSpriteX
 *      77. discreteOrderSpriteY
 *      78. discreteOrderSpriteTargetOpacity
 *      79. discreteOrderSpriteIconFolder
 *      80. discreteOrderSpriteIconFilename
 *      81. discreteOrderSpriteIconHue
 *      82. discreteOrderSpriteIconSmooth
 *      83. discreteOrderSpriteIconXCoor
 *      84. discreteOrderSpriteIconYCoor
 *      85. discreteOrderSpriteIconSourceW
 *      86. discreteOrderSpriteIconSourceH
 *      87. discreteOrderSpriteIconW
 *      88. discreteOrderSpriteIconH
 *          discreteOrderSprite - The discrete order battler sprite icon
 *      (v0.10a+)Start Module
 *      1. IsRateEnabled
 *      2. coreATBRate
 *      3. chargeATBRate
 *      4. cooldownATBRate
 *         None
 *      (v0.07a+)Reset Module
 *      1. IsResetEnabled
 *         None
 *      2. resetATBVal
 *         latestResetATBVal - The reset ATB value right after executing the
 *                             last action
 *      (v0.08a+)Speed Module
 *      1. IsSpeedEnabled
 *      2. updateActSpeeds
 *      3. actSpeed
 *         None
 *      (v0.09a+)Start Module
 *      1. IsStartEnabled
 *      2. normStartATBVal
 *      3. preemptStartATBVal
 *      4. surpriseStartATBVal
 *         None
 *      (v0.11a+)Turn Module
 *      1. IsTurnEnabled
 *      2. isShowBattleTurnClockWin
 *      3. battleTurnClockText
 *      4. battleTurnClockWinX
 *      5. battleTurnClockWinY
 *      6.(v0.14a+) battleTurnClockOpacity
 *      7. battleTurnClockWinW
 *      8. battleTurnClockWinH
 *      9.(v0.14a+) battleTurnClockFontFace
 *      10. battleTurnClockTextSize
 *      11. battleTurnClockWinLineH
 *      12. battleTurnClockWinPadding
 *      13. battleTurnClockBackOpacity
 *      14.(v0.14a+) battleTurnClockWinskinPath
 *      15.(v0.14a+) battleTurnClockWinskinFile
 *      16.(v0.14a+) battleTurnClockWinskinHue
 *      17.(v0.14a+) battleTurnClockWinskinSmooth
 *      18.(v0.14a+) battleTurnClockTextColor
 *      19.(v0.14a+) battleTurnClockTextAlign
 *      20. battleTurnClockTextXOffset
 *      21. battleTurnClockTextYOffset
 *          None
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
 *      6.(v0.06a+) atbBarFrameOpacity
 *         Any valid Javascript returning an Integer ranging from 0 to 255
 *         inclusive
 *      7. atbBarW
 *      8. atbBarH
 *      9.(v0.14a+) atbBarFontFace
 *          Any valid Javascript returning a String
 *      10. atbBarTextSize
 *      11. atbBarLineH
 *           Any valid Javascript returning a Natural Number
 *      12.(v0.06a+) atbBarPadding
 *      13. atbBarBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      14.(v0.14a+) atbBarWinskinPath
 *          Any valid Javascript returning a String
 *      15.(v0.14a+) atbBarkWinskinFile
 *          Any valid Javascript returning a String
 *      16.(v0.14a+) atbBarkWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      17.(v0.14a+) battleTurnClockWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      18.(v0.14a+) battleTurnClockTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      19. atbBarTextXOffset
 *      20. atbBarTextYOffset
 *          Any valid Javascript returning an Integer
 *      21. atbBarTextColor
 *      22. atbBarColor1
 *      23. atbBarColor2
 *      24. atbBarBackColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      25.(v0.06a+) isShowStatusATBBar
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      26.(v0.06a+) statusATBBarText
 *          Any valid Javascript returning a String
 *      27.(v0.06a+) statusATBBarXOffset
 *      28.(v0.06a+) statusATBBarYOffset
 *          Any valid Javascript returning an Integer
 *      29.(v0.06a+) statusATBBarFrameOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      30.(v0.06a+) statusATBBarW
 *      31.(v0.06a+) statusATBBarH
 *      32.(v0.14a+) statusATBBarFontFace
 *          Any valid Javascript returning a String
 *      33.(v0.06a+) statusATBBarTextSize
 *      34.(v0.06a+) statusATBBarLineH
 *          Any valid Javascript returning a Natural Number
 *      35.(v0.06a+) statusATBBarPadding
 *      36.(v0.06a+) statusATBBarBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      37.(v0.14a+) statusATBBarWinskinPath
 *          Any valid Javascript returning a String
 *      38.(v0.14a+) statusATBBarWinskinFile
 *          Any valid Javascript returning a String
 *      39.(v0.14a+) statusATBBarWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      40.(v0.14a+) statusATBBarWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      41.(v0.14a+) statusATBBarTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      42.(v0.06a+) statusATBBarTextXOffset
 *      43.(v0.06a+) statusATBBarTextYOffset
 *          Any valid Javascript returning an Integer
 *      44.(v0.06a+) statusATBBarTextColor
 *      45.(v0.06a+) statusATBBarColor1
 *      46.(v0.06a+) statusATBBarColor2
 *      47.(v0.06a+) statusATBBarBackColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
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
 *      11.(v0.14a+) forceATBStatOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      12. forceATBStatWinW
 *      13. forceATBStatWinH
 *      14.(v0.14a+) forceATBStatFontFace
 *          Any valid Javascript returning a String
 *      15. forceATBStatTextSize
 *      16. forceATBStatWinLineH
 *          Any valid Javascript returning a Natural Number
 *      17. forceATBStatWinPadding
 *      18. forceATBStatBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      19.(v0.14a+) forceATBStatWinskinPath
 *          Any valid Javascript returning a String
 *      20.(v0.14a+) forceATBStatWinskinFile
 *          Any valid Javascript returning a String
 *      21.(v0.14a+) forceATBStatWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      22.(v0.14a+) forceATBStatskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      23.(v0.14a+) forceATBStatTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      24.(v0.14a+) forceATBStatTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      25. forceATBStatTextXOffset
 *      26. forceATBStatTextYOffset
 *          Any valid Javascript returning an Integer
 *      27. isShowForceATBRunCmdWin
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      28. forceRunATBCmdText
 *          Any valid Javascript returning a String
 *      29. forceATBRunCmdWinX
 *      30. forceATBRunCmdWinY
 *          Any valid Javascript returning a Nonnegative Integer
 *      31.(v0.14a+) forceATBRunCmdOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      32. forceATBRunCmdWinW
 *      33. forceATBRunCmdWinH
 *      34.(v0.14a+) forceATBRunCmdFontFace
 *          Any valid Javascript returning a String
 *      35. forceATBRunCmdTextSize
 *      36. forceATBRunCmdWinLineH
 *          Any valid Javascript returning a Natural Number
 *      37. forceATBRunCmdWinPadding
 *      38. forceATBRunCmdBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      39.(v0.14a+) forceATBRunCmdWinskinPath
 *          Any valid Javascript returning a String
 *      40.(v0.14a+) forceATBRunCmdWinskinFile
 *          Any valid Javascript returning a String
 *      41.(v0.14a+) forceATBRunCmdWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      42.(v0.14a+) forceATBRunCmdWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      43.(v0.14a+) forceATBRunCmdTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      44.(v0.14a+) forceATBRunCmdTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      45. forceATBRunCmdTextXOffset
 *      46. forceATBRunCmdTextYOffset
 *          Any valid Javascript returning an Integer
 *      47. isShowForceATBStopCmdWin
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      48. forceStopATBCmdText
 *          Any valid Javascript returning a String
 *      49. forceATBStopCmdWinX
 *      50. forceATBStopCmdWinY
 *          Any valid Javascript returning a Nonnegative Integer
 *      51.(v0.14a+) forceATBStopCmdOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      52. forceATBStopCmdWinW
 *      53. forceATBStopCmdWinH
 *      54.(v0.14a+) forceATBStopCmdFontFace
 *          Any valid Javascript returning a String
 *      55. forceATBStopCmdTextSize
 *      56. forceATBStopCmdWinLineH
 *          Any valid Javascript returning a Natural Number
 *      57. forceATBStopCmdWinPadding
 *      58. forceATBStopCmdBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      59.(v0.14a+) forceATBStopCmdWinskinPath
 *          Any valid Javascript returning a String
 *      60.(v0.14a+) forceATBStopCmdWinskinFile
 *          Any valid Javascript returning a String
 *      61.(v0.14a+) forceATBStopCmdWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      62.(v0.14a+) forceATBStopCmdWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      63.(v0.14a+) forceATBStopCmdTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      64.(v0.14a+) forceATBStopCmdTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      65. forceATBStopCmdTextXOffset
 *      66. forceATBStopCmdTextYOffset
 *          Any valid Javascript returning an Integer
 *      (v0.16a+)Action Module:
 *      1. IsActEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. actMode
 *         bundle/batch/discrete/continuous
 *         Please refer to Action Mode Explanations in the documentation
 *         plugin
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
 *      (v0.12a+)Countdown Module
 *      1. IsCountdownEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      (v0.13a+)CTB Module
 *      1. IsCTBEnabled
 *      2. isShowCTBWin
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      3. ctbWinText
 *         Any valid Javascript returning a String
 *      4. ctbWinX
 *      5. ctbWinY
 *         Any valid Javascript returning a non-negative Integer
 *      6.(v0.14a+) ctbWinOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      7. ctbWinW
 *      8. ctbWinH
 *      9.(v0.14a+) ctbWinFontFace
 *         Any valid Javascript returning a String
 *      10. ctbWinTextSize
 *      11. ctbWinLineH
 *          Any valid Javascript returning a Natural Number
 *      12. ctbWinPadding
 *      13. ctbWinBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      14.(v0.14a+) ctbWinskinPath
 *          Any valid Javascript returning a String
 *      15.(v0.14a+) ctbWinskinFile
 *          Any valid Javascript returning a String
 *      16.(v0.14a+) ctbWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      17.(v0.14a+) ctbWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      18.(v0.14a+) ctbWinTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      19.(v0.14a+) ctbWinTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      20. ctbWinTextXOffset
 *      21. ctbWinTextYOffset
 *          Any valid Javascript returning an Integer
 *      (v0.15a+)Delay Module
 *      1. IsDelayEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. delaySecs
 *         Any valid Javascript returning a Nonnegative Number
 *      (v0.06a+)Event Module
 *      1. IsEventEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. didFinishInput
 *      3. didBecomeActable
 *      4. didSetActTimes
 *      5. didSetMaxActTimes
 *      6. didStartATBFill
 *      7. willCancelCharge
 *      8. didStartForceCharge
 *      9. willCancelCooldown
 *      10. didCoreATBBecomeFull
 *      11. didCoreATBBecomeNotFull
 *      12. didChargeATBBecomeNotFull
 *      13. didAddInputableActor
 *      (v0.12a+)13. didDecreaseCountdownStateTurn
 *      (v0.12a+)14. didIncreaseCountdownStateTurn
 *      (v0.13a+)15. didFillCoreATB
 *      (v0.13a+)16. didFillChargeATB
 *      (v0.13a+)17. didFillCooldownATB
 *      (v0.15a+)18. didDelayCounterEnd
 *          Any valid Javascript
 *      (v0.14a+)Order Module
 *      1. IsOrderEnabled
 *      2. isShowContinuousOrderWin
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      3. continuousOrderWinX
 *      4. continuousOrderWinY
 *         Any valid Javascript returning a non-negative Integer
 *      5. continuousOrderOpacity
 *         Any valid Javascript returning an Integer ranging from 0 to 255
 *         inclusive
 *      6. continuousOrderWinW
 *      7. continuousOrderWinH
 *         Any valid Javascript returning a Natural Number
 *      8. continuousOrderFontFace
 *         Any valid Javascript returning a String
 *      9. continuousOrderTextSize
 *      10. continuousOrderLineH
 *          Any valid Javascript returning a Natural Number
 *      11. continuousOrderPadding
 *          Any valid Javascript returning a non-negative Integer
 *      12. continuousOrderBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      13. continuousOrderWinskinPath
 *      14. continuousOrderWinskinFile
 *          Any valid Javascript returning a String
 *      15. continuousOrderWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      16. continuousOrderWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      17. continuousOrderCooldownBarX
 *      18. continuousOrderCooldownBarY
 *          Any valid Javascript returning a non-negative Integer
 *      19. continuousOrderCooldownBarW
 *      20. continuousOrderCooldownBarH
 *          Any valid Javascript returning a Natural Number
 *      21. continuousOrderCooldownBarColor1
 *      22. continuousOrderCooldownBarColor2
 *      23. continuousOrderCooldownTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      24. continuousOrderCooldownText
 *          Any valid Javascript returning a String
 *      25. continuousOrderCooldownTextX
 *      26. continuousOrderCooldownTextY
 *          Any valid Javascript returning a non-negative Integer
 *      27. continuousOrderCooldownTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      28. continuousOrderCoreBarX
 *      29. continuousOrderCoreBarY
 *          Any valid Javascript returning a non-negative Integer
 *      30. continuousOrderCoreBarW
 *      31. continuousOrderCoreBarH
 *          Any valid Javascript returning a Natural Number
 *      32. continuousOrderCoreBarColor1
 *      33. continuousOrderCoreBarColor2
 *      34. continuousOrderCoreTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      35. continuousOrderCoreText
 *          Any valid Javascript returning a String
 *      36. continuousOrderCoreTextX
 *      37. continuousOrderCoreTextY
 *          Any valid Javascript returning a non-negative Integer
 *      38. continuousOrderCoreTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      39. continuousOrderChargeBarX
 *      40. continuousOrderChargeBarY
 *          Any valid Javascript returning a non-negative Integer
 *      41. continuousOrderChargeBarW
 *      42. continuousOrderChargeBarH
 *          Any valid Javascript returning a Natural Number
 *      43. continuousOrderChargeBarColor1
 *      44. continuousOrderChargeBarColor2
 *      45. continuousOrderChargeTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      46. continuousOrderChargeText
 *          Any valid Javascript returning a String
 *      47. continuousOrderChargeTextX
 *      48. continuousOrderChargeTextY
 *          Any valid Javascript returning a non-negative Integer
 *      49. continuousOrderChargeTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      50. continuousOrderSpriteOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      51. continuousOrderSpriteIconFolder
 *      52. continuousOrderSpriteIconFilename
 *          Any valid Javascript returning a String
 *      53. continuousOrderSpriteIconHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      54. continuousOrderSpriteIconSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      55. continuousOrderSpriteIconXCoor
 *      56. continuousOrderSpriteIconYCoor
 *          Any valid Javascript returning a non-negative Integer
 *      57. continuousOrderSpriteIconSourceW
 *      58. continuousOrderSpriteIconSourceH
 *      59. continuousOrderSpriteIconW
 *      60. continuousOrderSpriteIconH
 *          Any valid Javascript returning a Natural Number
 *      61. continuousOrderSpriteY
 *          Any valid Javascript returning a non-negative Integer
 *      62. isShowDiscreteOrderWin
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      63. discreteOrderWinX
 *      64. discreteOrderWinY
 *          Any valid Javascript returning a non-negative Integer
 *      65. discreteOrderOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      66. discreteOrderWinW
 *      67. discreteOrderWinH
 *      68. discreteOrderPadding
 *          Any valid Javascript returning a Natural Number
 *      69. discreteOrderBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      70. discreteOrderWinskinPath
 *      71. discreteOrderWinskinFile
 *          Any valid Javascript returning a String
 *      72. discreteOrderWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *      73. discreteOrderWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      74. showingDiscreteOrderBattlerSpriteOpacity
 *      75. hidingDiscreteOrderBattlerSpriteOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      76. discreteOrderSpriteX
 *      77. discreteOrderSpriteY
 *          Any valid Javascript returning a non-negative Integer
 *      78. discreteOrderSpriteTargetOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      79. discreteOrderSpriteIconFolder
 *      80. discreteOrderSpriteIconFilename
 *          Any valid Javascript returning a String
 *      81. discreteOrderSpriteIconHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *      82. discreteOrderSpriteIconSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      83. discreteOrderSpriteIconXCoor
 *      84. discreteOrderSpriteIconYCoor
 *          Any valid Javascript returning a non-negative Integer
 *      85. discreteOrderSpriteIconSourceW
 *      86. discreteOrderSpriteIconSourceH
 *      87. discreteOrderSpriteIconW
 *      88. discreteOrderSpriteIconH
 *          Any valid Javascript returning a Natural Number
 *      (v0.10a+)Rate Module
 *      1. IsRateEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. coreATBRate
 *      3. chargeATBRate
 *      4. cooldownATBRate
 *         Any valid Javascript returning a Number
 *      (v0.07a+)Reset Module
 *      1. IsResetEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. resetATBVal
 *         Any valid Javascript returning a Number
 *      (v0.08a+)Speed Module
 *      1. IsSpeedEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. updateActSpeeds
 *         Any valid Javascript
 *      3. actSpeed
 *         Any valid Javascript returning a Number
 *      (v0.09a+)Start Module
 *      1. IsStartEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      2. normStartATBVal
 *      3. preemptStartATBVal
 *      4. surpriseStartATBVal
 *         Any valid Javascript returning a Number
 *      (v0.11a+)Turn Module
 *      1. IsTurnEnabled
 *      2. isShowBattleTurnClockWin
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      3. battleTurnClockText
 *         Any valid Javascript returning a String
 *      4. battleTurnClockWinX
 *      5. battleTurnClockWinY
 *         Any valid Javascript returning a non-negative Integer
 *      6. battleTurnClockOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      7. battleTurnClockWinW
 *      8. battleTurnClockWinH
 *      9.(v0.14a+) battleTurnClockFontFace
 *          Any valid Javascript returning a String
 *      10. battleTurnClockTextSize
 *      11. battleTurnClockWinLineH
 *         Any valid Javascript returning a Natural Number
 *      12. battleTurnClockWinPadding
 *      13. battleTurnClockBackOpacity
 *          Any valid Javascript returning an Integer ranging from 0 to 255
 *          inclusive
 *      14.(v0.14a+) battleTurnClockWinskinPath
 *          Any valid Javascript returning a String
 *      15.(v0.14a+) battleTurnClockWinskinFile
 *          Any valid Javascript returning a String
 *      16.(v0.14a+) battleTurnClockWinskinHue
 *          Any valid Javascript returning an Integer ranging from 0 to 360
 *          inclusive
 *      17.(v0.14a+) battleTurnClockWinskinSmooth
 *          Any valid Javascript(It'll always be regarded as truthy/falsy)
 *      18.(v0.14a+) battleTurnClockTextColor
 *          Any valid Javascript returning a Color
 *          Use this.textColor(colorCode), where colorCode ranges from 0 to 31
 *          inclusive, if you don't know how to setup a custom color
 *          yourselves
 *      19.(v0.14a+) battleTurnClockTextAlign
 *          Any valid Javascript returning a valid textAlign property
 *      20. battleTurnClockTextXOffset
 *      21. battleTurnClockTextYOffset
 *          Any valid Javascript returning an Integer
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
 *      6.(v0.06a+) atbBarFrameOpacity
 *      7. atbBarW
 *      8. atbBarH
 *      9.(v0.14a+) atbBarFontFace
 *         Setting atbBarFontFace as
 *         return Window_Base.prototype.standardFontFace.call(this); will use
 *         the default font face
 *      10. atbBarTextSize
 *      11. atbBarLineH
 *      12.(v0.06a+) atbBarPadding
 *      13. atbBarBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      14.(v0.14a+) atbBarWinskinPath
 *          Setting atbBarWinskinPath as return 'img/system/'; will use the
 *          windowskin file in the system image folder
 *      15.(v0.14a+) atbBarWinskinFile
 *          Setting atbBarWinskinFile as return 'Window'; will use the
 *          windowskin file named Window
 *      16.(v0.14a+) atbBarWinskinHue
 *          Setting atbBarWinskinHue as return 0; will set the ATB bar
 *          windowskin to have no hue adjustments
 *      17.(v0.14a+) atbBarWinskinSmooth
 *          Setting atbBarWinskinSmooth as return true; will set the ATB bar
 *          windowskin to have its smooth enabled
 *      18.(v0.14a+) atbBarTextAlign
 *          Setting atbBarTextColor as return 'center'; will set the ATB bar
 *          text to be aligned to the center
 *      19. atbBarTextXOffset
 *      20. atbBarTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      21. atbBarTextColor
 *          Setting atbBarTextColor as return this.textColor(0); will set the
 *          ATB bar text color as text color with color code 0
 *      22. atbBarColor1
 *          Setting atbBarBackColor as return '#00ff00'; will set the
 *          ATB bar left gradient color as purely green color
 *      23. atbBarColor2
 *          Setting atbBarBackColor as return '#00ffff'; will set the
 *          ATB bar right gradient color as purely cyan color
 *      24. atbBarBackColor
 *          Setting atbBarBackColor as return this.textColor(15); will set the
 *          ATB bar background color as text color with color code 15
 *      25.(v0.06a+) isShowStatusATBBar
 *          Setting isShowStatusATBBar as
 *          return this.isActor() || this.isStateAffected(13); will show the
 *          ATB bar for actors or battlers with the state with id 13(that
 *          state can be useful as an enemy info scanning mechanism)
 *      26.(v0.06a+) statusATBBarText
 *          Setting statusATBBarText as
 *          return this.coreSATB() + '/' + this.coreMaxSATB() + ' : ' + this.satbActTimes();
 *          will setup the ATB bar text as c/m : a, where c is the current ATB
 *          value, m is the maximum ATB value, and a is the number of virtual
 *          action slots
 *      27.(v0.06a+) statusATBBarXOffset
 *      28.(v0.06a+) statusATBBarYOffset
 *      29.(v0.06a+) statusATBBarFrameOpacity
 *      30.(v0.06a+) statusATBBarW
 *      31.(v0.06a+) statusATBBarH
 *      32.(v0.14a+) statusATBFontFace
 *          Setting statusATBFontFace as
 *          return Window_Base.prototype.standardFontFace.call(this); will use
 *          the default font face
 *      33.(v0.06a+) statusATBBarTextSize
 *      34.(v0.06a+) statusATBBarLineH
 *      35.(v0.06a+) statusATBBarPadding
 *      36.(v0.06a+) statusATBBarBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      37.(v0.14a+) statusATBBarWinskinPath
 *          Setting statusATBBarWinskinPath as return 'img/system/'; will use
 *          the windowskin file in the system image folder
 *      38.(v0.14a+) statusATBBarWinskinFile
 *          Setting statusATBBarWinskinFile as return 'Window'; will use the
 *          windowskin file named Window
 *      39.(v0.14a+) statusATBBarWinskinHue
 *          Setting statusATBBarWinskinHue as return 0; will set the ATB bar
 *          windowskin to have no hue adjustments
 *      40.(v0.14a+) statusATBBarWinskinSmooth
 *          Setting statusATBBarWinskinSmooth as return true; will set the ATB
 *          bar windowskin to have its smooth enabled
 *      41.(v0.14a+) statusATBBarTextAlign
 *          Setting statusATBBarTextColor as return 'center'; will set the ATB
 *          bar text to be aligned to the center
 *      42.(v0.06a+) statusATBBarTextXOffset
 *      43.(v0.06a+) statusATBBarTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      44.(v0.06a+) statusATBBarTextColor
 *          Setting statusATBBarTextColor as return this.textColor(0); will set
 *          the ATB bar text color as text color with color code 0
 *      45.(v0.06a+) statusATBBarColor1
 *          Setting statusATBBarBackColor as return '#00ff00'; will set the
 *          ATB bar left gradient color as purely green color
 *      46.(v0.06a+) statusATBBarColor2
 *          Setting statusATBBarBackColor as return '#00ffff'; will set the
 *          ATB bar right gradient color as purely cyan color
 *      47.(v0.06a+) statusATBBarBackColor
 *          Setting statusATBBarBackColor as return this.textColor(15); will
 *          set the ATB bar background color as text color with color code 15
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
 *      11.(v0.14a+) forceATBStatOpacity
 *      12. forceATBStatWinW
 *      13. forceATBStatWinH
 *      14.(v0.14a+) forceATBStatFontFace
 *          Setting forceATBStatFontFace as
 *          return Window_Base.prototype.standardFontFace.call(this); will use
 *          the default font face
 *      15. forceATBStatTextSize
 *      16. forceATBStatWinLineH
 *      17. forceATBStatWinPadding
 *      18. forceATBStatBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      19.(v0.14a+) forceATBStatWinskinPath
 *          Setting forceATBStatWinskinPath as return 'img/system/'; will use
 *          the windowskin file in the system image folder
 *      20.(v0.14a+) forceATBStatWinskinFile
 *          Setting forceATBStatWinskinFile as return 'Window'; will use the
 *          windowskin file named Window
 *      21.(v0.14a+) forceATBStatWinskinHue
 *          Setting forceATBStatWinskinHue as return 0; will set the force ATB
 *          status windowskin to have no hue adjustments
 *      22.(v0.14a+) forceATBStatWinskinSmooth
 *          Setting forceATBStatWinskinSmooth as return true; will set the
 *          force ATB status windowskin to have its smooth enabled
 *      23.(v0.14a+) forceATBStatTextColor
 *          Setting forceATBStatTextColor as return this.textColor(0); will
 *          set the force ATB status window text color as text color with
 *          color code 0
 *      24.(v0.14a+) forceATBStatTextAlign
 *          Setting forceATBStatTextColor as return 'center'; will set the
 *          battle turn clock text to be aligned to the center
 *      25. forceATBStatTextXOffset
 *      26. forceATBStatTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      27. isShowForceATBRunCmdWin
 *          Setting isShowForceATBRunCmdWin as return false; will always hide
 *          the force run ATB command window but the function can still be
 *          used by pressing the force run hotkey
 *      28. forceRunATBCmdText
 *         Setting forceRunATBCmdText as return 'Force Run'; will set the
 *         text showing the ATB frame update's forcibly run as Force Run
 *      29. forceATBRunCmdWinX
 *      30. forceATBRunCmdWinY
 *      31.(v0.14a+) forceATBRunCmdOpacity
 *      32. forceATBRunCmdWinW
 *      33. forceATBRunCmdWinH
 *      34.(v0.14a+) forceATBRunCmdFontFace
 *          Setting forceATBRunCmdFontFace as
 *          return Window_Base.prototype.standardFontFace.call(this); will use
 *          the default font face
 *      35. forceATBRunCmdTextSize
 *      36. forceATBRunCmdWinLineH
 *      37. forceATBRunCmdWinPadding
 *      38. forceATBRunCmdBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      39.(v0.14a+) forceATBRunCmdWinskinPath
 *          Setting forceATBRunCmdWinskinPath as return 'img/system/'; will
 *          use the windowskin file in the system image folder
 *      40.(v0.14a+) forceATBRunCmdWinskinFile
 *          Setting forceATBRunCmdWinskinFile as return 'Window'; will use the
 *          windowskin file named Window
 *      41.(v0.14a+) forceATBRunCmdWinskinHue
 *          Setting forceATBRunCmdWinskinHue as return 0; will set the force
 *          run ATB command windowskin to have no hue adjustments
 *      42.(v0.14a+) forceATBRunCmdWinskinSmooth
 *          Setting forceATBRunCmdWinskinSmooth as return true; will set the
 *          force run ATB command windowskin to have its smooth enabled
 *      43.(v0.14a+) forceATBRunCmdTextColor
 *          Setting forceATBRunCmdTextColor as return this.textColor(0); will
 *          set the force run ATB command window text color as text color with
 *          color code 0
 *      44.(v0.14a+) forceATBRunCmdTextAlign
 *          Setting forceATBRunCmdTextColor as return 'center'; will set the
 *          force run ATB command window text to be aligned to the center
 *      45. forceATBRunCmdTextXOffset
 *      46. forceATBRunCmdTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      47. isShowForceATBStopCmdWin
 *          Setting isShowForceATBStopCmdWin as return false; will always hide
 *          the force stop ATB command window but the function can still be
 *          used by pressing the force stop hotkey
 *      48. forceStopATBCmdText
 *         Setting forceStopATBCmdText as return 'Force Stop'; will set the
 *         text showing the ATB frame update's forcibly run as Force Stop
 *      49. forceATBStopCmdWinX
 *      50. forceATBStopCmdWinY
 *      51.(v0.14a+) forceATBStopCmdOpacity
 *      52. forceATBStopCmdWinW
 *      53. forceATBStopCmdWinH
 *      54.(v0.14a+) forceATBStopCmdFontFace
 *          Setting forceATBStopCmdFontFace as
 *          return Window_Base.prototype.standardFontFace.call(this); will use
 *          the default font face
 *      55. forceATBStopCmdTextSize
 *      56. forceATBStopCmdWinLineH
 *      57. forceATBStopCmdWinPadding
 *      58. forceATBStopCmdBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      59.(v0.14a+) forceATBStopCmdWinskinPath
 *          Setting forceATBStopCmdWinskinPath as return 'img/system/'; will
 *          use the windowskin file in the system image folder
 *          the windowskin file named Window
 *      60.(v0.14a+) forceATBStopCmdWinskinFile
 *          Setting forceATBStopCmdWinskinFile as return 'Window'; will use
 *          the windowskin file named Window
 *      61.(v0.14a+) forceATBStopCmdWinskinHue
 *          Setting forceATBStopCmdWinskinHue as return 0; will set the force
 *          stop ATB command windowskin to have no hue adjustments
 *      62.(v0.14a+) forceATBStopCmdWinskinSmooth
 *          Setting forceATBStopCmdWinskinSmooth as return true; will set the
 *          force stop ATB command windowskin to have its smooth enabled
 *      63.(v0.14a+) forceATBStopCmdTextColor
 *          Setting forceATBStopCmdTextColor as return this.textColor(0); will
 *          set the force stop ATB command window text color as text color
 *          with color code 0
 *      64.(v0.14a+) forceATBStopCmdTextAlign
 *          Setting forceATBStopCmdTextColor as return 'center'; will set the
 *          force stop ATB command window text to be aligned to the center
 *      65. forceATBStopCmdTextXOffset
 *      66. forceATBStopCmdTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      (v0.16a+)Action Module:
 *      1. IsActEnabled
 *         Setting IsActEnabled as return false; will disable the Action
 *         Module
 *      2. actMode
 *         bundle/batch/discrete/continuous
 *         Setting IsActEnabled as return "batch"; will change the action mode
 *         to batch
 *         Please refer to Action Mode Explanations in the documentation
 *         plugin
 *      (v0.04a+)Charge Module:
 *      1. IsChargeEnabled
 *         Setting IsChargeEnabled as return false; will disable the Charge
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
 *         Setting IsCooldownEnabled as return false; will disable the
 *         Cooldown Module
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
 *      (v0.12a+)Countdown Module
 *      1. IsCountdownEnabled
 *         Setting IsCountdownEnabled as return true; will enable the
 *         Countdown Module
 *      (v0.13a+)CTB Module
 *      1. IsCTBEnabled
 *         Setting IsCTBEnabled as return Input.isPressed("#alt"); will enable
 *         the CTB Module as long as the alt key's pressed  but the CTB window
 *         will still be shown if isShowCTBWin returns a truthy result
 *         regardless of whether IsCTBEnabled is truthy or not
 *      2. isShowCTBWin
 *         Setting isShowCTBWin as return true; will always show the CTB
 *         window even if the CTB Module's disabled
 *      3. ctbWinText
 *         Setting ctbWinText as
 *         return SATBManager.areModulesEnabled(["IsCTBEnabled"]) ? 'Charge Turn Battle' : 'Active Time Battle';
 *         will set the text to be shown in the CTB window as
 *         'Charge Turn Battle' and 'Active Time Battle' if the CTB Module's
 *         enabled and disabled respectively
 *      4. ctbWinX
 *      5. ctbWinY
 *      6.(v0.14a+) ctbWinOpacity
 *      7. ctbWinW
 *      8. ctbWinH
 *      9.(v0.14a+) battleTurnClockFontFace
 *         Setting battleTurnClockFontFace as
 *         return Window_Base.prototype.standardFontFace.call(this); will use
 *         the default font face
 *      10. ctbWinTextSize
 *      11. ctbWinLineH
 *      12. ctbWinPadding
 *      13. ctbWinBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      14.(v0.14a+) ctbWinskinPath
 *          Setting ctbWinskinPath as return 'img/system/'; will use the
 *          windowskin file in the system image folder
 *      15.(v0.14a+) ctbWinskinFile
 *          Setting ctbWinskinFile as return 'Window'; will use the windowskin
 *          file named Window
 *      16.(v0.14a+) ctbWinskinHue
 *          Setting ctbWinskinHue as return 0; will set the ctb windowskin to
 *          have no hue adjustments
 *      17.(v0.14a+) ctbWinskinSmooth
 *          Setting ctbWinskinSmooth as return true; will set the ctb
 *          windowskin to have its smooth enabled
 *      18.(v0.14a+) ctbWinTextColor
 *          Setting ctbWinTextColor as return this.textColor(0); will set the
 *          ctb window text color as text color with color code 0
 *      19.(v0.14a+) ctbWinTextAlign
 *          Setting ctbWinTextColor as return 'center'; will set the ctb
 *          window text to be aligned to the center
 *      20. ctbWinTextXOffset
 *      21. ctbWinTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      (v0.15a+)Delay Module
 *      1. IsDelayEnabled
 *         Setting IsDelayEnabled as return true; will enable the Delay Module
 *      2. delaySecs
 *         Setting delaySecs as
 *         return this.isEnemy() || this.isAutoBattle() || this.isConfused() ? 0.5 : 0;
 *         will set the delay counter locking action inputs as 0.5 seconds
 *      (v0.06a+)Event Module
 *      1. IsEventEnabled
 *         Setting IsEventEnabled as return true; will enable the Event Module
 *      2. didFinishInput
 *         Setting didFinishInput as this.addState(x) will add state with id x
 *         to the battler involved right after that battler has finished
 *         inputting actions to be executed
 *      3. didBecomeActable
 *         Setting didBecomeActable as this.currentAction().setSkill(x);
 *         will change the action to be executed as the skill with id x for
 *         the battler involved right after that battler becomes able to
 *         execute actions
 *      4. didSetActTimes
 *         Setting didSetActTimes as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      5. didSetMaxActTimes
 *         Setting didSetMaxActTimes as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      5. didStartATBFill
 *         Setting didStartATBFill as $gameTemp.reserveCommonEvent(x) will
 *         cause the common event with id x to be run when able to run after
 *         the battler ATB becomes neither charge nor cooldown
 *      6. willCancelCharge
 *         Setting willCancelCharge as this.removeState(x) will add state with
 *         id x to the battler involved right after that battler becomes able
 *         to execute actions
 *      7. didStartForceCharge
 *         Setting didAddInputableActor as
 *         AudioManager.playStaticSe({ name: 'Decision2', volume: 90, pitch: 100, pan: 0 });
 *         will play the SE named Decision2 with volume 90, pitch 100 ann pan
 *         0 when a battler ATB becomes full
 *      8. willCancelCooldown
 *         Setting willCancelCooldown as this.paySkillCost($dataSkills[x])
 *         will pay the skill cost of the skill with id x for the battler
 *         involved right before that battler cancels cooldown
 *      9. didCoreATBBecomeFull
 *         Setting didCoreATBBecomeFull as $gameSwitches.setValue(x, true)
 *         will set the game switch with id x to be on right after a battler
 *         ATB becomes full
 *      10. didCoreATBBecomeNotFull
 *          Setting didCoreATBBecomeFull as $gameVariables.setValue(x, y) will
 *          set the value of the game variable with id x to be y right after a
 *          battler ATB becomes not full
 *      11. didChargeATBBecomeNotFull
 *          Setting didChargeATBBecomeNotFull as nothing will use the
 *          configuration counterpart
 *      12. didAddInputableActor
 *          Setting didAddInputableActor as
 *          AudioManager.playStaticSe({ name: 'Bell3', volume: 90, pitch: 100, pan: 0 });
 *          will play the SE named Bell3 with volume 90, pitch 100 and pan 0
 *          when a battler ATB becomes full
 *      (v0.12a+)13. didDecreaseCountdownStateTurn
 *          Setting didDecreaseCountdownStateTurn as
 *          this.gainHp(-this.mhp * 0.02);
 *          will reduce the hp of the battler by 2% of the mhp whenver any
 *          countdown state has its turn counter decreased
 *      (v0.12a+)14. didIncreaseCountdownStateTurn
 *          Setting didIncreaseCountdownStateTurn as
 *          this.gainMp(-this.mmp * 0.02);
 *          will reduce the mp of the battler by 2% of the mmp whenver any
 *          countdown state has its turn counter increased
 *      (v0.13a+)15. didFillCoreATB
 *         Setting didFillCoreATB as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      (v0.13a+)16. didFillChargeATB
 *         Setting didFillChargeATB as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      (v0.13a+)17. didFillCooldownATB
 *         Setting didFillCooldownATB as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      (v0.15a+)18. didDelayCounterEnd
 *         Setting didDelayCounterEnd as empty spaces will do nothing extra
 *         (Leaving it as blank instead would use the configuration
 *         counterpart rather than doing nothing)
 *      (v0.14a+)Order Module
 *      1. IsOrderEnabled
 *         Setting IsOrderEnabled as return false; will disable the
 *         Order Module
 *      2. isShowContinuousOrderWin
 *         Setting isShowContinuousOrderWin as
 *         return !SATBManager.areModulesEnabled(['IsCTBEnabled']);
 *         will show the continuous order window when the Order Module's
 *         enabled but the CTB Module's disabled
 *      3. continuousOrderWinX
 *      4. continuousOrderWinY
 *      5. continuousOrderOpacity
 *      6. continuousOrderWinW
 *      7. continuousOrderWinH
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      8. continuousOrderFontFace
 *         Setting continuousOrderFontFace as
 *         return Window_Base.prototype.standardFontFace.call(this); will use
 *         the default font face
 *      9. continuousOrderTextSize
 *      10. continuousOrderLineH
 *      11. continuousOrderPadding
 *      12. continuousOrderBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      13. continuousOrderWinskinPath
 *          Setting continuousOrderWinskinPath as return 'img/system/'; will
 *          use the windowskin file in the system image folder
 *      14. continuousOrderWinskinFile
 *          Setting continuousOrderWinskinFile as return 'Window'; will use
 *          the windowskin file named Window
 *      15. continuousOrderWinskinHue
 *          Setting continuousOrderWinskinHue as return 0; will set the
 *          continuous order windowskin to have no hue adjustments
 *      16. continuousOrderWinskinSmooth
 *          Setting continuousOrderWinskinSmooth as return true; will set the
 *          continuous order windowskin to have its smooth enabled
 *      17. continuousOrderCooldownBarX
 *      18. continuousOrderCooldownBarY
 *      19. continuousOrderCooldownBarW
 *      20. continuousOrderCooldownBarH
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      21. continuousOrderCooldownBarColor1
 *          Setting continuousOrderCooldownBarColor2 as
 *          return this.textColor(30);
 *          will set the 1st continuous order window cooldown bar color as
 *          text color with color code 30
 *      22. continuousOrderCooldownBarColor2
 *          Setting continuousOrderCooldownBarColor2 as
 *          return this.textColor(31);
 *          will set the 2nd continuous order window cooldown bar color as
 *          text color with color code 31
 *      23. continuousOrderCooldownTextColor
 *          Setting continuousOrderCooldownText as
 *          return this.normalColor();
 *          will use the default window text color
 *      24. continuousOrderCooldownText
 *      25. continuousOrderCooldownTextX
 *      26. continuousOrderCooldownTextY
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      27. continuousOrderCooldownTextAlign
 *          Setting continuousOrderCooldownTextAlign as return 'center'; will
 *          set the continuous order cooldown bar text to be aligned to the
 *          center
 *      28. continuousOrderCoreBarX
 *      29. continuousOrderCoreBarY
 *      30. continuousOrderCoreBarW
 *      31. continuousOrderCoreBarH
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      32. continuousOrderCoreBarColor1
 *          Setting continuousOrderCoreBarColor1 as
 *          return this.textColor(8);
 *          will set the 1st continuous order window core bar color as text
 *          color with color code 8
 *      33. continuousOrderCoreBarColor2
 *          Setting continuousOrderCoreBarColor2 as
 *          return this.textColor(7);
 *          will set the 2nd continuous order window core bar color as text
 *          color with color code 7
 *      34. continuousOrderCoreTextColor
 *          Setting continuousOrderCoreTextColor as
 *          return this.normalColor();
 *          will use the default window text color
 *      35. continuousOrderCoreText
 *      36. continuousOrderCoreTextX
 *      37. continuousOrderCoreTextY
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      38. continuousOrderCoreTextAlign
 *          Setting continuousOrderCoreTextAlign as return 'center'; will set
 *          the continuous order core bar text to be aligned to the center
 *      39. continuousOrderChargeBarX
 *      40. continuousOrderChargeBarY
 *      41. continuousOrderChargeBarW
 *      42. continuousOrderChargeBarH
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      43. continuousOrderChargeBarColor1
 *          Setting continuousOrderChargeBarColor1 as
 *          return this.textColor(26);
 *          will set the 1st continuous order window charge bar color as
 *          text color with color code 26
 *      44. continuousOrderChargeBarColor2
 *          Setting continuousOrderChargeBarColor2 as
 *          return this.textColor(27);
 *          will set the 2nd continuous order window charge bar color as
 *          text color with color code 27
 *      45. continuousOrderChargeTextColor
 *          Setting continuousOrderChargeTextColor as
 *          return this.normalColor();
 *          will use the default window text color
 *      46. continuousOrderChargeText
 *      47. continuousOrderChargeTextX
 *      48. continuousOrderChargeTextY
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      49. continuousOrderChargeTextAlign
 *          Setting continuousOrderChargeTextAlign as return 'center'; will
 *          set the continuous order charge bar text to be aligned to the
 *          center
 *      50. continuousOrderSpriteOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      51. continuousOrderSpriteIconFolder
 *          Setting continuousOrderSpriteIconFolder as
 *          return 'img/characters/';
 *          will use the icon sheet file in the character image folder
 *      52. continuousOrderSpriteIconFilename
 *          Setting continuousOrderSpriteIconFilename as return 'Actor1'; will
 *          use the icon sheet named Actor1
 *      53. continuousOrderSpriteIconHue
 *          Setting continuousOrderSpriteIconHue as return 0; will set the
 *          continuous order battler sprite to have no hue adjustments
 *      54. continuousOrderSpriteIconSmooth
 *          Setting continuousOrderSpriteIconSmooth as return true; will set
 *          the continuous order battler sprite to have its smooth enabled
 *      55. continuousOrderSpriteIconXCoor
 *      56. continuousOrderSpriteIconYCoor
 *      57. continuousOrderSpriteIconSourceW
 *      58. continuousOrderSpriteIconSourceH
 *      59. continuousOrderSpriteIconW
 *      60. continuousOrderSpriteIconH
 *      61. continuousOrderSpriteY
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      62. isShowDiscreteOrderWin
 *          Setting isShowContinuousOrderWin as
 *          return SATBManager.areModulesEnabled(['IsCTBEnabled']);
 *          will show the discrete order window when the Order Module's
 *          enabled but the CTB Module's enabled
 *      63. discreteOrderWinX
 *      64. discreteOrderWinY
 *      65. discreteOrderOpacity
 *      66. discreteOrderWinW
 *      67. discreteOrderWinH
 *      68. discreteOrderPadding
 *      69. discreteOrderBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      70. discreteOrderWinskinPath
 *          Setting discreteOrderWinskinPath as return 'img/system/'; will
 *          use the windowskin file in the system image folder
 *      71. discreteOrderWinskinFile
 *          Setting discreteOrderWinskinFile as return 'Window'; will use
 *          the windowskin file named Window
 *      72. discreteOrderWinskinHue
 *          Setting discreteOrderWinskinHue as return 0; will set the
 *          discrete order windowskin to have no hue adjustments
 *      73. discreteOrderWinskinSmooth
 *          Setting discreteOrderWinskinSmooth as return true; will set the
 *          discrete order windowskin to have its smooth enabled
 *      74. showingDiscreteOrderBattlerSpriteOpacity
 *      75. hidingDiscreteOrderBattlerSpriteOpacity
 *      76. discreteOrderSpriteX
 *      77. discreteOrderSpriteY
 *      78. discreteOrderSpriteTargetOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      79. discreteOrderSpriteIconFolder
 *          Setting discreteOrderSpriteIconFolder as return 'img/characters/';
 *          will use the icon sheet file in the character image folder
 *      80. discreteOrderSpriteIconFilename
 *          Setting discreteOrderSpriteIconFilename as return 'Actor1'; will
 *          use the icon sheet named Actor1
 *      81. discreteOrderSpriteIconHue
 *          Setting discreteOrderSpriteIconHue as return 0; will set the
 *          discrete order battler sprite to have no hue adjustments
 *      82. discreteOrderSpriteIconSmooth
 *          Setting discreteOrderSpriteIconSmooth as return true; will set
 *          the discrete order battler sprite to have its smooth enabled
 *      83. discreteOrderSpriteIconXCoor
 *      84. discreteOrderSpriteIconYCoor
 *      85. discreteOrderSpriteIconSourceW
 *      86. discreteOrderSpriteIconSourceH
 *      87. discreteOrderSpriteIconW
 *      88. discreteOrderSpriteIconH
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      (v0.10a+)Rate Module
 *      1. IsRateEnabled
 *         Setting IsRateEnabled as return false; will disable the Rate Module
 *      2. coreATBRate
 *         Setting coreATBRate as
 *         return BattleManager.coreBaseSATBFillRate() * this.agi * 1.0 / BattleManager.satbAvgAgi;
 *         will set the ATB fill rate without charge nor cooldown for the
 *         battler involved to be the base ATB fill rate multiplied by the
 *         battler's agi divided by the average agi of all battlers in battles
 *      3. chargeATBRate
 *         Setting chargeATBRate as return this.coreSATBRate(); will set the
 *         ATB charge rate for the battler involved to be the same as the
 *         ATB fill rate without charge nor cooldown
 *      4. cooldownATBRate
 *         Setting cooldownATBRate as return this.coreSATBRate(); will set the
 *         ATB cooldown rate for the battler involved to be the same as the
 *         ATB fill rate without charge nor cooldown
 *      (v0.07a+)Reset Module
 *      1. IsResetEnabled
 *         Setting IsResetEnabled as return true; will enable the Reset Module
 *      2. resetATBVal
 *         Setting resetATBVal as return 0; will set the battler ATB right
 *         after cooldown as 0, which is the same as the default behavior when
 *         the Reset Module's disabled
 *      (v0.08a+)Speed Module
 *      1. IsSpeedEnabled
 *         Setting IsSpeedEnabled as return true; will enable the Speed Module
 *      2. updateActSpeeds
 *         Setting updateActSpeeds as
 *         var speedIncrement = 2000.0 / this._actionBattlers.length;
 *         this._actionBattlers.forEach(function(battler) {
 *             battler.latestSATBItems.forEach(function(item) {
 *                 item.speed = Math.min(item.speed + speedIncrement, 2000);
 *             });
 *         });
 *         will add the action speed for all battlers being able to execute
 *         actions by 2000 divided by the number of such battlers to prevent
 *         battlers with actions having skill/items with very slow invocation
 *         speed to never be able to execute those actions
 *      3. actSpeed
 *         Setting actSpeed as
 *         return this.latestSATBItems.reduce(function(speed, item) {
 *              return speed + item.speed;
 *         }, 0);; will set the action speed for the battler involved to be
 *         the original skill/item invocation speed
 *      (v0.09a+)Start Module
 *      1. IsStartEnabled
 *         Setting IsStartEnabled as return false; will disable the Start
 *         Module
 *      2. normStartATBVal
 *         Setting normStartATBVal as
 *         return this.agi / 999.0 * this.coreMaxSATB();
 *         will set the ATB value upon a normal battle start as the battler's
 *         agi divided by 999.0 then multipled by the maximum ATB value
 *      3. preemptStartATBVal
 *         Setting preemptStartATBVal as
 *         return this.isActor() ? this.coreMaxSATB() : 0;
 *         will set the ATB value upon a preemptive battle start as the
 *         maximum ATB value and 0 if the battler's and isn't an actor
 *         respectively
 *      4. surpriseStartATBVal
 *         Setting surpriseStartATBVal as
 *         return this.isEnemy() ? this.coreMaxSATB() : 0;
 *         will set the ATB value upon a preemptive battle start as the
 *         maximum ATB value and 0 if the battler's and isn't an enemy
 *         respectively
 *      (v0.11a+)Turn Module
 *      1. IsTurnEnabled
 *         Setting IsTurnEnabled as return true; will enable the Turn Module
 *      2. isShowBattleTurnClockWin
 *         Setting isShowBattleTurnClockWin as return true; will always show
 *         the battle turn clock window
 *      3. battleTurnClockText
 *         Setting battleTurnClockText as
 *         var cur = SATBTurnManager.curTurnClock();
 *         var max = SATBTurnManager.curTurnClockMax();
 *         var clockUnit = SATBTurnManager.coreTurnClockUnit();
 *         var turnCount = $gameTroop.turnCount();
 *         return cur + '/' + max + ' ' + clockUnit + ':' + turnCount;
 *         will show the battle turn clock status in the form of
 *         current clock count/max clock count clock unit:battle turn count
 *      4. battleTurnClockWinX
 *      5. battleTurnClockWinY
 *      6.(v0.14a+) battleTurnClockOpacity
 *      7. battleTurnClockWinW
 *      8. battleTurnClockWinH
 *      9.(v0.14a+) battleTurnClockFontFace
 *         Setting battleTurnClockFontFace as
 *         return Window_Base.prototype.standardFontFace.call(this); will use
 *         the default font face
 *      10. battleTurnClockTextSize
 *      11. battleTurnClockWinLineH
 *      12. battleTurnClockWinPadding
 *      13. battleTurnClockBackOpacity
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 *      14.(v0.14a+) battleTurnClockWinskinPath
 *          Setting battleTurnClockWinskinPath as return 'img/system/'; will
 *          use the windowskin file in the system image folder
 *      15.(v0.14a+) battleTurnClockWinskinFile
 *          Setting battleTurnClockWinskinFile as return 'Window'; will use
 *          the windowskin file named Window
 *      16.(v0.14a+) battleTurnClockWinskinHue
 *          Setting battleTurnClockWinskinHue as return 0; will set the battle
 *          turn clock windowskin to have no hue adjustments
 *      17.(v0.14a+) battleTurnClockWinskinSmooth
 *          Setting battleTurnClockWinskinSmooth as return true; will set the
 *          battle turn clock windowskin to have its smooth enabled
 *      18.(v0.14a+) battleTurnClockTextColor
 *          Setting battleTurnClockTextColor as return this.textColor(0); will
 *          set the battle turn clock text color as text color with color code
 *          0
 *      19.(v0.14a+) battleTurnClockTextAlign
 *          Setting battleTurnClockTextColor as return 'center'; will set the
 *          battle turn clock text to be aligned to the center
 *      20. battleTurnClockTextXOffset
 *      21. battleTurnClockTextYOffset
 *          You'll likely have to experimenet this yourselves to find values
 *          that suit your needs
 */
