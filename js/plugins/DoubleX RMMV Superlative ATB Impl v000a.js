// DON'T TOUCH THIS UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Superlative ATB Implementations"] = "v0.00a";
//

/*:
 * @plugindesc The implementation plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 * @help
 *============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Thorough comprehension on the essence of this plugin on the user
 *           level
 *         - Thorough comprehension on the essence of RMMV ATB system plugins
 *         - Advanced RMMV plugin development proficiency to fully comprehend
 *           this plugin
 *      2. All reference tags are to have clear references between the
 *         Plugin Info and Plugin Implementations by searching them
 *      3. All intentionally hidden script calls can be found by searching
 *         ADVANCED_SCRIPT_CALLS_ONLY
 *----------------------------------------------------------------------------
 */

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the note result/running helper for SATB
 *----------------------------------------------------------------------------*/

function Game_SATBPhaseTypes() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBNotes() {
    "use strict";
    this.initialize.apply(this, arguments);
}
// DON'T USE THESE DIRECTLY ON YOUR OWN UNLESS YOU REALLY KNOW WHAT YOU'RE DOING
function Game_SATBCache() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBPairs() {
    "use strict";
    this.initialize.apply(this, arguments);
}
function Game_SATBRules() {
    "use strict";
    this.initialize.apply(this, arguments);
}
//

    /*------------------------------------------------------------------------
     *    New types
     *------------------------------------------------------------------------*/
    /**
     * @enum @type {String} ChainRule - first, last, +, -, *, /, %, =, some,
     *                                  every
     * @type {{*}} Datum - The database datum
     * @enum @type {String} DatumType- Refer to reference tag NOTE_DATA_TYPES
     * @enum @type {String} Factor - Check _SATB._FACTOR_DATA in Game_SATBCache
     * @enum @type {String} Module - Refer to SATB._PARAM_MODULES in Game_System
     * @enum @type {String} NoteType - Check _SATB._NOTE_FUNCS in Game_SATBPairs
     * @enum @type {{String}} Pairs - suffix1, entry1, suffix2, entry2, ...
     * @type {{Boolean, Datum, (**) -> *?}} PairFunc - Check _PAIR_FUNC in
     *                                                 Game_SATBPairs
     * @enum @type {String} Param - Check _SATB._PARAM_MODULES in Game_System
     * @enum @type {String} PluginCmd - Check _SATB._CMDS in Game_Interpreter
     * @enum @type {[String, [String|Number], **]} PluginArgs - The plugin
     *                                                          command argument
     * @type {String, [{String}]*} SATB - The datum notetag container
     * @enum @type {String} Suffix - Refer to reference tag NOTE_SUFFIX
     * @enum @type {String} TargetType - Refer to reference tag
     *                                   PLUGIN_CMD_TARGET_TYPE
     */

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.DataManager = { orig: {}, new: {} };
    var _DM = SATB.DataManager.orig, _SATB = SATB.DataManager.new;

    _SATB.SWITCH_VARS = { switch: "switchIds", var: "varIds" };
    Object.keys(_SATB.SWITCH_VARS).forEach(function(key) {
        _SATB[_SATB.SWITCH_VARS[key]] = {};
    });

    _SATB._UPDATE_IDS = function(datumType, noteType, id, ids) {
        // Passing ids[id] as the function argument instead won't work at all
        var notes = ids[id] = ids[id] || {};
        //
        var factors = notes[noteType] = notes[noteType] || [];
        if (factors.indexOf(datumType) < 0) factors.concat(datumType);
    }; // _SATB._UPDATE_IDS

    // Refers to reference tag NOTE_STRUCTURE
    _SATB._REG_EXP_NOTE = " *(?:doublex +rmmv +)?satb +(\\w+)";
    _SATB._REG_EXP_SUFFIXES = " +(\\w+(?: +\\w+)*) *";
    _SATB._REG_EXP_ENTRIES = " +(\\w+(?: *, +\\w+)*) *";
    _SATB._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SATB._REG_EXP_NOTE + _SATB._REG_EXP_SUFFIXES +
                ":" + _SATB._REG_EXP_ENTRIES + ">", "gmi"),
        evalStart: new RegExp("<" + _SATB._REG_EXP_NOTE + " *>", "gmi"),
        evalEnd: new RegExp("< *\/" + _SATB._REG_EXP_NOTE + " *>", "gmi")
        //
    }; // _SATB._REG_EXPS
    //

    _SATB._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _SATB.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v0.00a - v0.00a; Extended
        // Edited to read all notetags of this plugin as well
        var isLoaded = _DM.isDatabaseLoaded.apply(this, arguments);
        return isLoaded && _SATB._isDatabaseLoaded.call(this);
        //
    }; // DataManager.isDatabaseLoaded

    _DM.saveGame = DataManager.saveGame;
    _SATB.saveGame = DataManager.saveGame = function(contents) {
    // v0.00a - v0.00a; Extended
        // Added to clear all actor effective notetags to simplify saving
        $gameParty.clearSATBNotes();
        //
        var success = _DM.saveGame.apply(this, arguments);
        // Added to restores all actor effective notetags
        $gameParty.initSATBNotes();
        //
        return success;
    }; // DataManager.saveGame

    _DM.extractSaveContents = DataManager.extractSaveContents;
    _SATB.extractSaveContents = DataManager.extractSaveContents = function(contents) {
    // v0.00a - v0.00a; Extended
        _DM.extractSaveContents.apply(this, arguments);
        // Added to use the stored function contents
        _SATB._extractSaveContents.call(this);
        //
    }; // DataManager.extractSaveContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @mixin @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {Suffix} suffix - The currently inspected suffix in the notetag
     * @param {String} entry - The currently inspected entry in the notetag
     * @param {DatumType} datumType - The type of the datum to be loaded
     */
    _SATB.updateSwitchVarIds = function(noteType, suffix, entry, datumType) {
        var func = _SATB._UPDATE_IDS.bind(_SATB, datumType, noteType, +entry);
        // Refer to reference tag SWITCH_VAR
        if (_SATB.SWITCH_VARS[suffix]) func(_SATB[_SATB.SWITCH_VARS[suffix]]);
        //
    }; // _SATB.updateSwitchVarIds

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The database loaded flag
     * @todo: Make this function Nullipotent to preserve the contract integrity
     */
    _SATB._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_SATB._areAllNotesLoaded) return true;
        _SATB._loadAllNotes.call(this);
        _SATB._areAllNotesLoaded = true;
        return true;
        //
    }; // _SATB._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._loadAllNotes = function() {
        // These note change factors must match those in the parameters plugin
        var allData = {
            actor: $dataActors,
            enemy: $dataEnemies,
            class: $dataClasses,
            weapons: $dataWeapons,
            armors: $dataArmors,
            states: $dataStates,
            skills: $dataSkills,
            items: $dataItems
        };
        //
        Object.keys(allData).forEach(function(datumType) {
            // The function's easy, simple and small enough to be inlined
            allData[datumType].forEach(_SATB._loadNote.bind(this, datumType));
            //
        }, this);
    }; // _SATB._loadAllNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {Datum?} datum_ - The datum to have notetags loaded
     */
    _SATB._loadNote = function(datumType, datum_) {
        if (!datum_) return;
        var lines = datum_.note.split(/[\r\n]+/);
        // Storing datumType is to streamline the notetag datum type reading
        var satb = datum_.meta.satb = { datumType: datumType };
        //
        _SATB._readNote.call(this, datumType, satb, lines);
    }; // _SATB._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {SATB} satb - The datum plugin notetag container
     * @param {[String]} lines - List of lines being read for notetags to load
     */
    _SATB._readNote = function(datumType, satb, lines) {
        // It's tolerable and more performant than any declarative counterpart
        var isEvalLine = false, noteType = "", funcLines = [];
        lines.forEach(function(line) {
            if (line.match(_SATB._REG_EXPS.evalStart)) {
                // Marks that the next lines are function contents of noteType
                isEvalLine = true, noteType = RegExp.$1;
                //
            } else if (line.match(_SATB._REG_EXPS.evalEnd)) {
                // Marks that the eval notetag function contents are fully read
                isEvalLine = false;
                _SATB._loadEvalNote.call(
                        this, datumType, satb, noteType, funcLines);
                //
            } else if (isEvalLine) {
                funcLines.push(line); // Stores eval notetag function contents
            } else _SATB._loadBaseNote.call(this, datumType, satb, line);
        }, this);
        //
    }; //  _SATB._readNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {SATB} satb - The datum plugin notetag container
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} funcLines - The lines of the notetag function content
     */
    _SATB._loadEvalNote = function(datumType, satb, noteType, funcLines) {
        // Refers to reference tag NOTETAG_MULTI
        if (noteType !== RegExp.$1) return;
        var funcContent = funcLines.join("\n");
        _SATB._loadNotePairs.call(
                this, datumType, satb, noteType, ["eval"], [funcContent]);
        //
    }; //  _SATB._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {SATB} satb - The datum plugin notetag container
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SATB._loadBaseNote = function(datumType, satb, line) {
        // Refers to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SATB._REG_EXPS.base)) return;
        var suffixes = RegExp.$2.split(/ +/);
        var entries = RegExp.$3.split(/ *, +/);
        _SATB._loadNotePairs.call(
                this, datumType, satb, RegExp.$1, suffixes, entries);
        //
    }; // _SATB._loadBaseNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {SATB} satb - The datum plugin notetag container
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     */
    _SATB._loadNotePairs = function(datumType, satb, noteType, suffixes, entries) {
        var pairs = _SATB._notePairs.call(
                this, datumType, noteType, suffixes, entries);
        satb[noteType] = (satb[noteType] || []).concat(pairs);
    }; // _SATB._loadNotePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     * @returns {Pairs} The suffix-entry pair mapping
     */
    _SATB._notePairs = function(datumType, noteType, suffixes, entries) {
        // So those excessive suffixes/entries will be discarded right here
        var l = Math.min(suffixes.length, entries.length);
        //
        // It's tolerable and more performant than any declarative counterpart
        for (var i = 0, pairs = {}; i < l; i++) {
            var count = i + 1, suffix = suffixes[i], entry = entries[i];
            // Refers to reference tag MULTI_SUFFIX_ENTRY
            pairs["suffix" + count] = suffix, pairs["entry" + count] = entry;
            //
            // Users changing the switch/var note map should update it manually
            _SATB.updateSwitchVarIds.call(
                    this, noteType, suffix, entry, datumType);
            //
        }
        return pairs;
        //
    }; // _SATB._notePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._extractSaveContents = function() {
        ["params", "notes"].forEach(
                $gameSystem.extractSATBFuncContents, $gameSystem);
        $gameParty.initSATBNotes();
    }; // _SATB._extractSaveContents

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Edits the low level battle flow implementations to run this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.BattleManager = { orig: {}, new: {} };
    var _BM = SATB.BattleManager.orig, _SATB = SATB.BattleManager.new;

    _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "act", clockMax, [{
            clockUnit: "frame",
            clockMax: this.coreTurnSATBFrameClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            clockMax: this.coreTurnSATBSecClockMax() * 1000.0,
            isInt: false
        }]);
    }; // _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "frame", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnSATBActClockMax(),
            isInt: true
        }, {
            clockUnit: "sec",
            clockMax: this.coreTurnSATBSecClockMax() * 1000.0,
            isInt: false
        }]);
    }; // _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC
    _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC = function(clockMax) {
        _SATB._onCoreTurnClockOverflow.call(this, "sec", clockMax, [{
            clockUnit: "act",
            clockMax: this.coreTurnSATBActClockMax(),
            isInt: true
        }, {
            clockUnit: "frame",
            clockMax: this.coreTurnSATBFrameClockMax(),
            isInt: true
        }]);
    }; // _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Boolean} isRefresh: Whether at least 1 battler's refreshed
    //       {[Game_Actor]} inputableActors: The list of all inputable actors
    //       {{Number}} coreTurnClock: Mapping of all turn clock unit counters

    _BM.initMembers = BattleManager.initMembers;
    _SATB.initMembers = BattleManager.initMembers = function() {
    // v0.00a - v0.00a; Extended
        _BM.initMembers.apply(this, arguments);
        // Added to initialize all the new variables as well
        _SATB._init.call(this);
        //
    }; // BattleManager.initMembers

    _BM.isInputting = BattleManager.isInputting;
    _SATB.isInputting = BattleManager.isInputting = function() {
    // v0.00a - v0.00a; Extended
        // Added to keep the input windows opened if there are inputable actors
        if (this.isSATB()) return _SATB._hasInputableActors.call(this);
        //
        return _BM.isInputting.apply(this, arguments);
    }; // BattleManager.isInputting

    _BM.canEscape = BattleManager.canEscape;
    _SATB.canEscape = BattleManager.canEscape = function() {
    // v0.00a - v0.00a; Extended
        // Edited to disable party escape command when the ATB frame can update
        return _BM.canEscape.apply(this, arguments) && this.canSATBEsc();
        //
    }; // BattleManager.canEscape

    _BM.startBattle = BattleManager.startBattle;
    _SATB.startBattle = BattleManager.startBattle = function() {
    // v0.00a - v0.00a; Extended
        _BM.startBattle.apply(this, arguments);
        // Added to set the starting atb value for all battlers as well
        _SATB._startBattle.call(this);
        //
    }; // BattleManager.startBattle

    _BM.selectNextCommand = BattleManager.selectNextCommand;
    _SATB.selectNextCommand = BattleManager.selectNextCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to change the actor from being inputable to being able to act
        _SATB._selectNextCmd.call(this);
        //
        _BM.selectNextCommand.apply(this, arguments);
    }; // BattleManager.selectNextCommand

    _BM.selectPreviousCommand = BattleManager.selectPreviousCommand;
    _SATB.selectPreviousCommand = BattleManager.selectPreviousCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to clear the currently inputable actor pose
        if (this.isSATB()) return this.clearActor();
        //
        _BM.selectPreviousCommand.apply(this, arguments);
    }; // BattleManager.selectPreviousCommand

    _BM.refreshStatus = BattleManager.refreshStatus;
    _SATB.refreshStatus = BattleManager.refreshStatus = function() {
    // v0.00a - v0.00a; Extended
        // Added to refresh all visible input windows as well
        _SATB._refreshStatus.call(this);
        //
        _BM.refreshStatus.apply(this, arguments);
    }; // BattleManager.refreshStatus

    _BM.startTurn = BattleManager.startTurn;
    _SATB.startTurn = BattleManager.startTurn = function() {
    // v0.00a - v0.00a; Extended
        // Edited to abandon the default battle system phase transitions
        if (!this.isSATB()) _BM.startTurn.apply(this, arguments);
        //
    }; // BattleManager.startTurn

    _BM.getNextSubject = BattleManager.getNextSubject;
    _SATB.getNextSubject = BattleManager.getNextSubject = function() {
    // v0.00a - v0.00a; Extended
        // Edited to abandon default battle action execution subject FIFO queue
        return this.isSATB() && _BM.getNextSubject.apply(this, arguments);
        //
    }; // BattleManager.getNextSubject

    _BM.endAction = BattleManager.endAction;
    _SATB.endAction = BattleManager.endAction = function() {
    // v0.00a - v0.00a; Extended
        _BM.endAction.apply(this, arguments);
        // Added to update the ATB turn action counter
        _SATB._endAct.call(this);
        //
    }; // BattleManager.endAction

    ["processVictory", "processDefeat"].forEach(function(func) {
        _BM[func] = BattleManager[func];
        _SATB[func] = BattleManager[func] = function() {
        // v0.00a - v0.00a; Extended
            // Added to close all active input windows as well
            _SATB._procScene.call(this, "closeSATBInputWins");
            //
            _BM[func].apply(this, arguments);
        }; // BattleManager[func]
    });

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.isSATB = function() {
        return $gameSystem.satbParamFunc("IsCoreEnabled")();
    }; // BattleManager.isSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    BattleManager.coreBaseSATBFillRate = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return _SATB._coreBaseFillFrameRate.call(this);
            } case "coreBaseFillATBSec": {
                return _SATB._coreBaseFillSecRate.call(this);
            } default: return 0; // So none of the ATB values will ever fill
            //
        }
    }; // BattleManager.coreBaseSATBFillRate

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Natural Number} The maximum number of actions a turn can have
     */
    BattleManager.coreTurnSATBActClockMax = function() {
        return $gameSystem.satbParamFunc("coreTurnATBAct")();
    }; // BattleManager.coreTurnSATBActClockMax

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Natural Number} The maximum number of frames a turn can have
     */
    BattleManager.coreTurnSATBFrameClockMax = function() {
        var baseFillFrame = $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
        return $gameSystem.satbParamFunc("coreTurnATBTime")(baseFillFrame);
    }; // BattleManager.coreTurnSATBFrameClockMax

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum number of seconds a turn can have
     */
    BattleManager.coreTurnSATBSecClockMax = function() {
        var baseFillSec = $gameSystem.satbParamFunc("coreBaseFillATBSec")();
        return $gameSystem.satbParamFunc("coreTurnATBTime")(baseFillSec);
    }; // BattleManager.coreTurnSATBSecClockMax

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canSATBEsc = function() {
        // Ensures party escape attempt won't trigger when the battle's busy
        if (!this.isSATB()) return true;
        if (!this._spriteset || !this._logWindow || this.isBusy()) return false;
        return this.canUpdateSATB() && this._phase !== 'action';
        //
    }; // BattleManager.canSATBEsc

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canUpdateSATB = function() {
        // Checks if cases always stopping global ATB frame update aren't met
        return $gameParty.inBattle() && this._phase !== 'init';
        //
    }; // BattleManager.canUpdateSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor to become inputable
     */
    BattleManager.addSATBInputableActor = function(actor) {
        // No actor should be both inputable and able to execute actions
        this.eraseSATBActBattler(actor); // It's just to play safe
        //
        // Extracting them into a new method can lead to invalid states
        if (this._satb.inputableActors.indexOf(actor) >= 0) return;
        this._satb.inputableActors.push(actor);
        //
    }; // BattleManager.addSATBInputableActor

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler to become able to exec acts
     */
    BattleManager.addSATBActBattler = function(battler) {
        if (!this.isSATB()) return;
        // No actor should be both inputable and able to execute actions
        this.eraseSATBInputableActor(battler);
        //
        // Extracting them into a new method can lead to invalid states
        if (this._actionBattlers.indexOf(battler) >= 0) return;
        battler.setLatestSATBItem();
        this._actionBattlers.push(battler);
        //
    }; // BattleManager.addSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor to become not inputable
     */
    BattleManager.eraseSATBInputableActor = function(actor) {
        var index = this._satb.inputableActors.indexOf(actor);
        if (index >= 0) this._satb.inputableActors.splice(index, 1);
        if (this.actor() === actor) this.clearActor();
    }; // BattleManager.eraseSATBInputableActor

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler to become unable to exec acts
     */
    BattleManager.eraseSATBActBattler = function(battler) {
        // _subject shouldn't be in _actionBattlers so it's safe to always erase
        var index = this._actionBattlers.indexOf(battler);
        if (index >= 0) this._actionBattlers.splice(index, 1);
        //
    }; // BattleManager.eraseSATBActBattler

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    BattleManager.raiseSATBMemNoteChangeFactors = function(note, factors) {
        if ($gameParty) this.satbMems().forEach(function(mem) {
            mem.raiseSATBNoteChangeFactors(note, factors);
        });
    }; // BattleManager.raiseSATBMemNoteChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.raiseAllSATBMemNoteChangeFactors = function() {
        this.satbMems().forEach(function(mem) {
            mem.raiseAllSATBNoteChangeFactors();
        });
    }; // BattleManager.raiseAllSATBMemNoteChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    BattleManager.raiseSATBMemChangeFactors = function(noteFactors) {
        this.satbMems().forEach(function(mem) {
            mem.raiseSATBChangeFactors(noteFactors);
        });
    }; // BattleManager.raiseSATBMemChangeFactors

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {[Game_Battler]} The list of all battlers used by this plugin
     */
    BattleManager.satbMems = function() {
        if ($gameParty.inBattle()) return this.allBattleMembers();
        return $gameParty.members();
    }; // BattleManager.satbMems

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.onSATBBattlerRefresh = function() {
        if (this._satb) this._satb.isRefreshNeeded = true;
    }; // BattleManager.onSATBBattlerRefresh

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    BattleManager.canUpdateSATBProc = function() {
        // Checks if the ATB frame update or action execution can be processed
        if (this.isAborting() || this.isBattleEnd()) {
            // There's no point in extracting these into a new method.function
            this.update();
            return false;
            //
        }
        return !$gameMessage.isBusy() && !this.updateEvent();
        //
    }; // BattleManager.canUpdateSATBProc

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.updateCoreSATB = function() {
        if (!this.canUpdateSATB()) return;
        _SATB._addCoreATB.call(this);
        _SATB._procTurn.call(this);
        _SATB._updateCoreTurnByTime.call(this);
        if (!this._satb.isRefreshNeeded) return;
        this._satb.isRefreshNeeded = false;
        _SATB._procScene.call(this, "refreshStatus");
    }; // BattleManager.updateCoreSATB

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {[Index]} The list of indices of all inputable actors
     */
    BattleManager.inputableSATBActorIndices = function() {
        return this._satb.inputableActors.map(function(actor) {
            return actor.index();
        });
    }; // BattleManager.inputableSATBActorIndices

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     */
    BattleManager.updateSATBAct = function() {
        // Updates current action when finished execution on the current target
        if (this._phase === 'action' && !this.isBusy()) this.updateAction();
        //
    }; // BattleManager.updateSATBAct

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        if (this.isSATB()) this._satb = {
            inputableActors: [],
            coreTurnClock: _SATB._coreTurnClock.call(this)
        };
    }; // _SATB._init

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._hasInputableActors = function() {
        return this._satb.inputableActors.length > 0;
    }; // _SATB._hasInputableActors

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._startBattle = function() {
        if (!this.isSATB()) return;
        this._phase = 'turn';
        var startBattleFunc = _SATB._startBattleFunc.call(this);
        this.allBattleMembers().forEach(function(m) { m[startBattleFunc](); });
    }; // _SATB._startBattle

    /**
     * The this pointer is BattleManager
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @return {String} The name of the battler function setting the start ATB
     */
    _SATB._startBattleFunc = function() {
        if (this._preemptive) return "setPreemptStartSATB";
        return this._surprise ? "setSurpriseStartSATB" : "setNormStartSATB";
    }; // _SATB._startBattleFunc

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._selectNextCmd = function() {
        if (!this.isSATB()) return;
        var actor = this.actor();
        if (!actor) return;
        // All battlers always have at most 1 action slot only
        this.addSATBActBattler(actor);
        //
        // $gameParty.size() must be used or the actor pose will be all wrong
        this.changeActor($gameParty.size(), 'waiting');
        //
    }; // _SATB._selectNextCmd

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refreshStatus = function() {
        // Not calling refreshStatus is to avoid redundant status win refresh
        _SATB._procScene.call(this, "refreshSATBInputWins");
        //
        // It doesn't hurt much to run this even when this plugin's disabled
        this._satb.isRefreshNeeded = false;
        //
    }; // _SATB._refreshStatus

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._endAct = function() {
        if (this.isSATB()) _SATB._updateCoreTurnClockByAct.call(this, 1);
    }; // _SATB._endAct

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockByAct = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnSATBActClockMax();
        //
        var overflowFunc = _BM._ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "act", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockByAct

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {String} func - Name of the function in Scene_Battle to be called
     */
    _SATB._procScene = function(func) {
        // It serves as a helper function for calling Scene_Battle functions
        if ($gameParty.inBattle()) SceneManager._scene[func]();
        //
    }; // _SATB._procScene

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillFrameRate = function() {
        return 1.0 / $gameSystem.satbParamFunc("coreBaseFillATBFrame")();
    }; // _SATB._coreBaseFillFrameRate

    /**
     * The this pointer is BattleManager
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Number} The proportion of the ATB to be filled on this frame
     */
    _SATB._coreBaseFillSecRate = function() {
        var fillMS = $gameSystem.satbParamFunc("coreBaseFillATBSec")() * 1000.0;
        return (1000.0 / Graphics._fpsMeter.fps) / fillMs;
        //
    }; // _SATB._coreBaseFillSecRate

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._addCoreATB = function() {
        var fillRate = this.coreBaseSATBFillRate();
        this.allBattleMembers().forEach(function(mem) {
            // The function's easy, simple and small enough to be inlined
            if (mem.canMove()) mem.addCoreSATBProportion(fillRate);
            //
        });
    }; // _SATB._addCoreATB

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._procTurn = function() {
        if (this._phase === 'action') return;
        this._subject = this._subject || this.getNextSubject();
        if (this._subject) this.processTurn();
    }; // _SATB._procTurn

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCoreTurnByTime = function() {
        switch ($gameSystem.satbParam("_coreBaseFillUnit")) {
            // Such invalid case will be reported in the unit test plugin
            case "coreBaseFillATBFrame": {
                return _SATB._updateCoreTurnClockByFrame.call(this, 1);
            } case "coreBaseFillATBSec": {
                var increment = 1000.0 / Graphics._fpsMeter.fps;
                return _SATB._updateCoreTurnClockBySec.call(this, increment);
            }
            //
        }
    }; // _SATB._updateCoreTurnByTime

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockByFrame = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = true, clockMax = this.coreTurnSATBFrameClockMax();
        //
        var overflowFunc = _BM._FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "frame", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockByFrame

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Number} increment - The action ATB turn clock increment
     */
    _SATB._updateCoreTurnClockBySec = function(increment) {
        // It's to make the meaning of the 2nd argument more clear
        var isInt = false, clockMax = this.coreTurnSATBSecClockMax() * 1000.0;
        //
        var overflowFunc = _BM._SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC;
        _SATB._updateCoreTurnClock.call(
                this, increment, isInt, "sec", clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClockBySec

    /**
     * The this pointer is BattleManager
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {Int} increment - The action ATB turn clock increment
     * @param {Boolean} isInt - Whether the ATB turn clock unit is an Integer
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    _SATB._updateCoreTurnClock = function(increment, isInt, clockUnit, clockMax, overflowFunc) {
        var clock = this._satb.coreTurnClock;
        clock[clockUnit] += increment;
        if (isInt) clock[clockUnit] = Math.floor(clock[clockUnit]);
        if (clock[clockUnit] < clockMax) return;
        _SATB._onMaxCoreTurnClock.call(this, clockMax, overflowFunc);
    }; // _SATB._updateCoreTurnClock

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {(Number)} overflowFunc - Function to run when turn clock overflow
     */
    _SATB._onMaxCoreTurnClock = function(clockMax, overflowFunc) {
        // It's possible to change ATB turn clock unit during the same battle
        if ($gameSystem.satbParamFunc("canCoreTurnClockOverflow")()) {
            // The other maximum ATB turn clock unit must be calculated here
            overflowFunc.call(this, clockMax);
            //
        } else {
            this._satb.coreTurnClock = _SATB._coreTurnClock.call(this);
        }
        //
        _SATB._endTurn.call(this);
    }; // _SATB._onMaxCoreTurnClock

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {String} clockUnit - The ATB turn clock unit(act/frame/sec)
     * @param {Number} clockMax - The ATB turn clock maximum value
     * @param {[{String, Number, Boolean}]} otherClockUnitData - Other clock
     *                                                           unit arguments
     */
    _SATB._onCoreTurnClockOverflow = function(clockUnit, clockMax, otherClockUnitData) {
        var clock = this._satb.coreTurnClock;
        clock[clockUnit] -= clockMax;
        // act and frame are integers but the proportion must be a real Number
        var newProportion = clock[clockUnit] * 1.0 / clockMax;
        //
        otherClockUnitData.forEach(
                _SATB._setNewCoreTurnClockProportion.bind(this, newProportion));
    }; // _SATB._onCoreTurnClockOverflow

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Number} newTurnClockProportion - The proportion of the other unit
     * @param {{String, Number, Boolean}} otherClockUnitDatum - Other clock
     *                                                          unit arguments
     */
    _SATB._setNewCoreTurnClockProportion = function(newTurnClockProportion, otherClockUnitDatum) {
        var clock = this._satb.coreTurnClock;
        var unit = otherClockUnitDatum.clockUnit;
        clock[unit] = otherClockUnitDatum.clockMax * newTurnClockProportion;
        if (unit.isInt) clock[unit] = Math.floor(clock[unit]);
    }; // _SATB._setNewCoreTurnClockProportion

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._coreTurnClock = function() {
        return { act: 0, frame: 0, sec: 0.0 };
    }; // _SATB._coreTurnClock

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     */
    _SATB._endTurn = function() {
        BattleManager.allBattleMembers().forEach(_SATB._endMemTurn.bind(this));
        // refreshStatus only need to be called once so the default's ignored
        this.refreshStatus();
        //
        $gameTroop.increaseTurn();
    }; // _SATB._endTurn

    /**
     * The this pointer is BattleManager
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} mem - The member to have his/her/its turn ended
     */
    _SATB._endMemTurn = function(mem) {
        mem.onTurnEnd();
        this._logWindow.displayAutoAffectedStatus(mem);
        this._logWindow.displayRegeneration(mem);
    }; // _SATB._endMemTurn

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores all params/configurations for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_System = { orig: {}, new: {} };
    var _GS = SATB.Game_System.orig, _SATB = SATB.Game_System.new;
    var $ = Game_System.prototype, DM = SATB.DataManager.new;

    _SATB._ERASE_SWITCH_VAR_IDS = function(type, id, ids) {
        if (ids[id]) delete ids[id][type];
    }; // _SATB._ERASE_SWITCH_VAR_IDS
    _SATB._FUNC_CONTENT = function(func) {
        var funcStart = /^[^{]*{\s*/, funcEnd = /\s*}[^}]*$/;
        // Only the function contents are stored in save files
        return func.toString().replace(funcStart, "").replace(funcEnd, "");
        //
    }; // _SATB._FUNC_CONTENT
    _SATB._IS_FUNC_PARAM = function(param) { return param[0] !== "_"; };
    _SATB._RAW_PARAMS = function() {
        // There's no need to cache it as _RAW_PARAMS should only be called once
        var fileName = DoubleX_RMMV.Superlative_ATB_Parameters_File;
        var origParams = PluginManager.parameters(fileName);
        //
        // origParams mustn't be edited or false JSON fail messages would show
        var params = JSON.parse(JSON.stringify(origParams));
        //
        Object.keys(params).forEach(function(param) {
            if (!_SATB._IS_JSON_PARAM[param]) return;
            params[param] = _SATB._TRY_JSON_PARAM(param, params[param]);
        });
        return params;
    }; // _SATB._RAW_PARAMS
    _SATB._TRY_JSON_PARAM = function(param, val) {
        if (!val) return val;
        // It's possible for users to input raw parameter values directly
        try { return JSON.parse(val); } catch (err) {
            console.warn([
                "The value of the parameter " + param + " is",
                val,
                "Which should be entered via note rather than text",
                "The relevant stacktrace of DoubleX RMMV Superlative ATB is:",
                err.stack
            ].join("\n"));
            return val;
        }
        //
    }; // _SATB._TRY_JSON_PARAM
    _SATB._UPDATE_SWITCH_VAR_IDS = function(noteType, switchVar, id, dataTypes) {
        var updateSwitchVarIds = DM.updateSwitchVarIds.bind(
                DataManager, noteType, switchVar, id);
        if (dataTypes.length > 0) return dataTypes.forEach(updateSwitchVarIds);
        var func = SATB._ERASE_SWITCH_VAR_IDS.bind(_SATB, noteType, id);
        // Refer to reference tag SWITCH_VAR
        if (DM.SWITCH_VARS[switchVar]) func(DM[DM.SWITCH_VARS[switchVar]]);
        //
    }; // _SATB._UPDATE_SWITCH_VAR_IDS

    // Using Function.bind would cause the function to have the wrong contect
    _SATB._0_ARG_FUNC = function(content) { return new Function(content); };
    //

    _SATB.PARAM_NOTE_FUNCS = {
        params: {
            IsCoreEnabled: _SATB._0_ARG_FUNC,
            coreBaseFillATBFrame: _SATB._0_ARG_FUNC,
            coreBaseFillATBSec: _SATB._0_ARG_FUNC,
            coreTurnATBTime: function(content) {
                return new Function("baseFillATB", content);
            }, // coreTurnATBTime
            coreTurnATBAct: _SATB._0_ARG_FUNC,
            canCoreTurnClockOverflow: _SATB._0_ARG_FUNC,
            coreMaxATBVal: _SATB._0_ARG_FUNC
        }, // params
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(content) {
                return new Function("max", "datum", "datumType", content);
            }
            //
        } // notes
    }; // _SATB.PARAM_NOTE_FUNCS
    _SATB._PARAM_UPDATES = {
        coreMaxATBVal: function(switchVar_, id_, dataTypes_) {
            _SATB._storeUpdatedSwitchVarIds.call(
                    this, "coreMax", switchVar_, id_, dataTypes_);
            // Only the default value might change so factor result is raised
            BattleManager.raiseSATBMemNoteChangeFactors("coreMax", ["result"]);
            //
        }, // coreMaxATBVal
        _coreMaxATBValNoteChainingRule: function() {
            BattleManager.raiseSATBMemNoteChangeFactors(
                    "coreMax", ["chainingRule"]);
        }, // _coreMaxATBValNoteChainingRule
        _coreMaxATBValNotePriorities: function() {
            BattleManager.raiseSATBMemNoteChangeFactors(
                    "coreMax", ["priority"]);
        } // _coreMaxATBValNotePriorities
    }; // _SATB._PARAM_UPDATES

    _SATB._IS_JSON_PARAM = {
        _isCached: false,
        _isAlwaysRecacheAllSwitchVars: false,
        IsCoreEnabled: true,
        _coreBaseFillUnit: false,
        coreBaseFillATBFrame: true,
        coreBaseFillATBSec: true,
        _coreTurnUnit: false,
        coreTurnATBTime: true,
        coreTurnATBAct: true,
        canCoreTurnClockOverflow: true,
        coreMaxATBVal: true,
        _coreMaxATBValNoteChainingRule: false,
        _coreMaxATBValNotePriorities: true
    }; // _SATB._IS_JSON_PARAM

    // Not parsing from the parameter names directly's just to play safe
    _SATB._PARAM_MODULES = {
        _isCached: "core",
        _isAlwaysRecacheAllSwitchVars: "core",
        IsCoreEnabled: "core",
        _coreBaseFillUnit: "core",
        coreBaseFillATBFrame: "core",
        coreBaseFillATBSec: "core",
        _coreTurnUnit: "core",
        coreTurnATBTime: "core",
        coreTurnATBAct: "core",
        canCoreTurnClockOverflow: "core",
        coreMaxATBVal: "core",
        _coreMaxATBValNoteChainingRule: "core",
        _coreMaxATBValNotePriorities: "core"
    }; // _SATB._PARAM_MODULES
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {{{String}}} params: The container of all parameter values
    //       {{{String}}} notes: The container of all notetag function contents
    //       {{[String]}} switchIds: The game switch notetag factor mapping
    //       {{[String]}} varIds: The game variable notetag factor mapping

    _GS.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _GS.initialize.apply(this, arguments);
        _SATB._init.call(this); // Added to setup parameters/notetags
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} funcType - "params", "notes"
     */
    $.extractSATBFuncContents = function(funcType) {
        // params becomes Param and notes becomes Note
        var type = funcType.charAt(0).toUpperCase() + funcType.slice(1, -1);
        //
        // _extractParamFuncContents or _extractNoteFuncContents
        Object.keys(this._satb[funcType]).forEach(
                _SATB["_extract" + type + "FuncContents"], this);
        //
    }; // $.extractSATBFuncContents

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @returns {(**) -> *?} The parameter function return result
     */
    $.satbParamFunc = function(param) {
        // It's better to explicitly state what _SATB._PARAM_MODULES[param] is
        var module = _SATB._PARAM_MODULES[param];
        return SATB.params[module][param];
        //
    }; // $.satbParamFunc

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @returns {String} The function content as the parameter value
     */
    $.satbParam = function(param) {
        // It's better to explicitly state what _SATB._PARAM_MODULES[param] is
        var module = _SATB._PARAM_MODULES[param];
        return this._satb.params[module][param];
        //
    }; // $.satbParam

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    $.setSATBParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
        var module = _SATB._PARAM_MODULES[param];
        this._satb.params[module][param] = funcContent;
        if (!_SATB._IS_FUNC_PARAM(param)) return;
        _SATB._updateParam.call(this, param, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    /**
     * Script Call/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @returns {String} The notetag function content
     */
    $.satbNote = function(noteType, name) {
        return this._satb.notes[noteType][name];
    }; // $.satbNote

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    $.setSATBNote = function(noteType, name, funcContent, switchVar_, id_, dataTypes_) {
        this._satb.notes[noteType][name] = funcContent;
        _SATB._extractNoteFuncContent.call(this, noteType, name);
        _SATB._storeUpdatedSwitchVarIds.call(
                this, noteType, switchVar_, id_, dataTypes_);
    }; // $.setSATBNote

    /**
     * The this pointer is Game_System.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        _SATB._initContainers.call(this);
        _SATB._storeParams.call(this);
        _SATB._storeNotes.call(this);
        _SATB._storeSwitchVarIds.call(this);
    }; // _SATB._init

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._initContainers = function() {
        this._satb = { params: { core: {} }, notes: { coreMax: {} } };
    }; // _SATB._initContainers

    /**
     * The this pointer is Game_System.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._storeParams = function() {
        var params = _SATB._RAW_PARAMS();
        Object.keys(params).forEach(_SATB._storeParam.bind(this, params));
    }; // _SATB._storeParams

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{String}} params - The parameter name-value map
     * @param {Param} param - The parameter name
     */
    _SATB._storeParam = function(params, param) {
        this.setSATBParam(param, _SATB._param.call(this, param, params[param]));
    }; // _SATB._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @param {String} val - The stored raw parameter value
     */
    _SATB._param = function(param, val) {
        // Refers to reference tag PARAMETERS_CONFIGURATIONS
        return val || _SATB._FUNC_CONTENT(this.satbParamFunc(param));
        //
    }; // _SATB._param
    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNotes = function() {
        Object.keys(SATB.notes).forEach(_SATB._storeNoteModule, this);
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {NoteType} type - The type of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNoteModule = function(type) {
        var note = SATB.notes[type];
        Object.keys(note).forEach(_SATB._storeNote.bind(this, type));
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {NoteType} type - The type of the note
     * @param {String} name - The name of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNote = function(type, name) {
        var noteFunc = SATB.notes[type][name];
        this._satb.notes[type][name] = _SATB._FUNC_CONTENT(noteFunc);
    }; // _SATB._storeNote

    ["Param", "Note"].forEach(function(type) {
        // Param becomes params and Note becomes notes
        var t = type.toLowerCase() + "s";
        //
        var func = "_extract" + type + "FuncContent";
        /**
         * The this pointer is Game_System.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {Module} module - The module of the stored function content
         */
        _SATB["_extract" + type + "FuncContents"] = function(module) {
            var paramNote = this._satb[t][module];
            Object.keys(paramNote).forEach(_SATB[func].bind(this, module));
        }; // _SATB["_extract" + type + "FuncContents"]
    });

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Param} param - The parameter name
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _SATB._updateParam = function(param, switchVar_, id_, dataTypes_) {
        // There's no need to call this if the parameter value hasn't changed
        var module = _SATB._PARAM_MODULES[param];
        _SATB._extractParamFuncContent.call(this, module, param);
        var func = _SATB._PARAM_UPDATES[param];
        if (func) func.call(this, switchVar_, id_, dataTypes_);
        //
    }; // _SATB._updateParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Module} module - The module of the stored function content
     * @param {Param} name - The name of the stored function content
     */
    _SATB._extractParamFuncContent = function(module, name) {
        // Converts the stored function content into a parameter function
        var func = _SATB.PARAM_NOTE_FUNCS.params[name](this.satbParam(name));
        SATB.params[module][name] = func;
        //
    }; // _SATB._extractParamFuncContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} type - The type of the stored function content
     * @param {String} name - The name of the stored function content
     */
    _SATB._extractNoteFuncContent = function(type, name) {
        // Converts the stored function content into a notetag function
        var content = this.satbNote(type, name);
        SATB.notes[type][name] = _SATB.PARAM_NOTE_FUNCS.notes[type](content);
        //
    }; // _SATB._extractNoteFuncContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @enum @param {String?} switchVar_ - Refer to reference tag SWITCH_VAR
     * @param {Id?} id_ - The switch/variable id
     * @param {[DatumType]?} dataTypes_ - The type of the data with switch/var
     */
    _SATB._storeUpdatedSwitchVarIds = function(noteType, switchVar_, id_, dataTypes_) {
        if (switchVar_ && id_ && dataTypes_) {
            _SATB._UPDATE_SWITCH_VAR_IDS(noteType, switchVar_, id_, dataTypes_);
        }
        // It's just to play safe as it's possible to de-register a switch/var
        _SATB._storeSwitchVarIds.call(this);
        //
    }; // _SATB._storeUpdatedSwitchVarIds

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._storeSwitchVarIds = function() {
        // It's better not to clone them as users can edit DM counterparts too
        this._satb.switchIds = DM.switchIds, this._satb.varIds = DM.varIds;
        //
    }; // _SATB._storeSwitchVarIds

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Switches/Game_Variables
 *      - Raises the note change factors linked to the game switches/variables
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var classes = {
        Game_Switches: { proto: Game_Switches.prototype, param: "switchIds" },
        Game_Variables: { proto: Game_Variables.prototype, param: "varIds" }
    };
    Object.keys(classes).forEach(function(klass) {

        SATB[klass] = { orig: {}, new: {} };
        var _GSV = SATB[klass].orig, _SATB = SATB[klass].new;
        var $ = classes[klass].proto, param = classes[klass].param;

        _GSV.setValue = $.setValue;
        _SATB.setValue = $.setValue = function(id, value) {
        // v0.00a - v0.00a; Extended
            _GSV.setValue.apply(this, arguments);
            // Added to raise the change factors involving this id
            _SATB._raiseChangeFactors.call(this, id);
            //
        }; // $.setValue

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseChangeFactors = function(id) {
            if ($gameSystem.satbParam("_isAlwaysRecacheAllSwitchVars")) {
                return BattleManager.raiseAllSATBMemNoteChangeFactors();
            }
            _SATB._raiseMappedChangeFactors.call(this, id);
        }; // _SATB._raiseChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {id} id - The id of the game switch/variable
         */
        _SATB._raiseMappedChangeFactors = function(id) {
            var noteFactors_ = $gameSystem.satbParam(param)[id];
            if (!noteFactors_) return;
            BattleManager.raiseSATBMemChangeFactors(noteFactors_);
        }; // _SATB._raiseMappedChangeFactors

    });

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *      - Extends all methods that should be extended in Game_BattlerBase
 *----------------------------------------------------------------------------*/

 (function(SATB) {

     "use strict";

     SATB.Game_BattlerBase = { orig: {}, new: {} };
     var _GBB = SATB.Game_BattlerBase.orig, _SATB = SATB.Game_BattlerBase.new;
     var $ = Game_BattlerBase.prototype;

    _GBB.updateStateTurns = $.updateStateTurns;
    _SATB.updateStateTurns = $.updateStateTurns = function() {
    // v0.00a - v0.00a; Extended
        // Added to update state turns with diff removal timings at diff timings
        if (BattleManager.isSATB()) return this.updateSATBStateTurns(2);
        //
        _GBB.updateStateTurns.apply(this, arguments);
    }; // $.updateStateTurns

    _GBB.hide = $.hide;
    _SATB.hide = $.hide = function() { // v0.00a - v0.00a; Extended
        _GBB.hide.apply(this, arguments);
        // Added to ensure hidden battlers won't be able to execute or input act
        this.clearCoreSATB();
        //
    }; // $.hide

    /**
     * @interface @since v0.00a @version v0.00a
     * @enum @param {Number} timing - The state auto removal timing(1/2)
     */
    $.updateSATBStateTurns = function(timing) {
        this.states().forEach(_SATB._updateStateTurn.bind(this, timing));
    }; // $.updateSATBStateTurns

    /**
     * The this pointer is Game_BattlerBase.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {Number} timing - The state auto removal timing(1/2)
     * @param {State} state - The state to have its turn updated
     */
    _SATB._updateStateTurn = function(timing, state) {
        var id = state.id;
        if (state.autoRemovalTiming === timing && this._stateTurns[id] > 0) {
            this._stateTurns[id] -= 1;
        }
    }; // _SATB._updateStateTurn

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      - Implements the ATB value, input and action logic detail for battlers
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Battler = { orig: {}, new: {} };
    var _GB = SATB.Game_Battler.orig, _SATB = SATB.Game_Battler.new;
    var $ = Game_Battler.prototype, $$ = Game_BattlerBase.prototype;

    // All these functions are battler script calls
    _SATB.NOTE_FORWARDED_FUNCS = {
       raiseAllSATBNoteChangeFactors: "raiseAllChangeFactors",
       raiseSATBNoteChangeFactors: "raiseChangeFactors",
       invalidateSATBNoteResult: "invalidateResultCache",
       invalidateSATBNoteList: "invalidatePairFuncListCache"
    }; // _SATB.NOTE_FORWARDED_FUNCS
    _SATB.PHASE_TYPE_FORWARDED_FUNCS = {
        setCoreSATB: "setCoreATB",
        setCoreSATBProportion: "setCoreATBProportion",
        addCoreSATB: "addCoreATB",
        addCoreSATBProportion: "addCoreATBProportion",
        clearCoreSATB: "clearCoreATB",
        coreSATB: "coreATB",
        coreMaxSATB: "coreMax"
    }; // _SATB.PHASE_TYPE_FORWARDED_FUNCS
    //

    /*------------------------------------------------------------------------
     *    New public instance variables
     *------------------------------------------------------------------------*/
    // {{String, {Skill|Item}}} lastSATBItem: The latest inputted skill/item

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Game_SATBNotes} notes: The notetag results
    //       {Game_SATBPhaseTypes} phaseTypes: All ATB phase/state manipulations

    _GB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function(actorId) {
    // v0.00a - v0.00a; Extended
        // This method must be called first or _SATB._refresh would crash
        _SATB._init.call(this); // Added to initialize all superlative ATB vars
        //
        _GB.initialize.apply(this, arguments);
    }; // $.initialize

    ["addState", "removeState"].forEach(function(func) {
        // It's to avoid overwriting func in Game_BattlerBase from other plugins
        _GB[func] = $[func] || $$[func];
        //
        _SATB[func] = $[func] = function(stateId) { // v0.00a - v0.00a; Extended
            // Added to mark that state notetags might have changed
            this._satb.notes.markChangeFactors(["states"]);
            //
            _GB[func].apply(this, arguments);
        }; // $[func]
    });

    _GB.clearActions = $.clearActions;
    _SATB.clearActions = $.clearActions = function() {
     // v0.00a - v0.00a; Extended
        _GB.clearActions.apply(this, arguments);
        // Added to ensures the battler won't be able to execute actions
        BattleManager.eraseSATBActBattler(this);
        //
    }; // $.clearActions

    _GB.refresh = $.refresh;
    _SATB.refresh = $.refresh = function() { // v0.00a - v0.00a; Extended
        _GB.refresh.apply(this, arguments);
        // Added to refreshes all superlative ATB notetags lists/results
        _SATB._refresh.call(this);
        //
    }; // $.refresh

    _GB.onRestrict = $.onRestrict;
    _SATB.onRestrict = $.onRestrict = function() {  // v0.00a - v0.00a; Extended
        _GB.onRestrict.apply(this, arguments);
        // Added to fix null action battlers bugs and edge cases as well
        _SATB._onRestrict.call(this);
        //
    }; // $.onRestrict

    _GB.makeActionTimes = $.makeActionTimes;
    _SATB.makeActionTimes = $.makeActionTimes = function() {
    // v0.00a - v0.00a; Extended
        return 1; // Rewritten to simplify the action input and execution logic
    }; // $.makeActionTimes

    _GB.onAllActionsEnd = $.onAllActionsEnd;
    _SATB.onAllActionsEnd = $.onAllActionsEnd = function() {
    // v0.00a - v0.00a; Extended
        _GB.onAllActionsEnd.apply(this, arguments);
        // Added to update state turn in actions and clear ATB value as well
        _SATB._onAllActsEnd.call(this);
        //
    }; // $.onAllActionsEnd

    _GB.onTurnEnd = $.onTurnEnd;
    _SATB.onTurnEnd = $.onTurnEnd = function() {  // v0.00a - v0.00a; Extended
        _GB.onTurnEnd.apply(this, arguments);
        // Added to remove buffs to be removed of this battlers as well
        _SATB._onTurnEnd.call(this);
        //
    }; // $.onTurnEnd

    _GB.onBattleEnd = $.onBattleEnd;
    _SATB.onBattleEnd = $.onBattleEnd = function() {
    // v0.00a - v0.00a; Extended
        _GB.onBattleEnd.apply(this, arguments);
        // Added to ensure all battler ATB states will be cleaned up
        this.clearCoreSATB();
        //
    }; // $.onBattleEnd

    // Refers to the Game_SATBNotes counterparts
    Object.keys(_SATB.NOTE_FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB.NOTE_FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.notes[f].apply(this._satb.notes, arguments);
        }; // $[func]
        //
    });
    //

    // Refers to the Game_SATBPhaseTypes counterparts
    Object.keys(_SATB.PHASE_TYPE_FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB.PHASE_TYPE_FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.phaseTypes[f].apply(
                    this._satb.phaseTypes, arguments);
        }; // $[func]
        //
    });
    //

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be raised
     */
    $.raiseSATBChangeFactors = function(noteFactors) {
        Object.keys(noteFactors).forEach(function(note) {
            this.raiseSATBNoteChangeFactors(note, noteFactors[note]);
        });
    }; // $.raiseSATBChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() {
        // The same notes must be shared by both the battler and phaseTypes
        this._satb.notes = new Game_SATBNotes(this);
        this._satb.phaseTypes = new Game_SATBPhaseTypes(this);
        //
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks as it's the battler as a dependency
        ["notes", "phaseTypes"].forEach(function(helper) {
            this._satb[helper].clear();
            delete this._satb[helper];
        });
        //
    }; // $.clearSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setPreemptStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setPreemptStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setSurpriseStartSATB = function() {
        // Ensures this plugin still works for battler not being actor nor enemy
        this.setNormStartSATB();
        //
    }; // $.setSurpriseStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setNormStartSATB = function() { this.clearCoreSATB(); };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} val - The starting ATB value of the battler
     */
    $.setStartSATB = function(val) {
        if (!this.canMove()) return this.clearCoreSATB();
        this.setCoreSATB(val);
    }; // $.setStartSATB

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setLatestSATBItem = function() {
        var currentAct = this.currentAction();
        if (currentAct) this.latestSATBItem = { item: currentAct.item() };
    }; // $.setLatestSATBItem

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        // The master container must be ready first before adding anything else
        this._satb = {};
        this.initSATBNotes();
        //
    }; // _SATB._init

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refresh = function() {
        BattleManager.onSATBBattlerRefresh();
        // Refers to reference tag BATTLER_REFRESH_RECACHE_NOTE
        this._satb.notes.raiseMarkedChangeFactors();
        //
        // It's just to play safe as it might clear or make actions unexpectedly
        if (BattleManager.isSATB()) this._satb.phaseTypes.checkUpdatedCoreMax();
        //
    }; // _SATB._refresh

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onRestrict = function() {
        // It doesn't hurt much to clear ATB value when this plugin's disabled
        if (!this.canMove()) this.clearCoreSATB();
        //
    }; // _SATB._onRestrict

    /**
     * The this pointer is Game_Battler.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._onAllActsEnd = function() {
        if (!BattleManager.isSATB()) return;
        this.updateSATBStateTurns(1);
        this.clearCoreSATB();
    }; // _SATB._onAllActsEnd

    /**
     * The this pointer is Game_Battler.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onTurnEnd = function() {
        if (BattleManager.isSATB()) this.removeBuffsAuto();
    }; // _SATB._onTurnEnd

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Implements the ATB value, input and action logic detail for actors
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Actor = { orig: {}, new: {} };
    var _GA = SATB.Game_Actor.orig, _SATB = SATB.Game_Actor.new;
    var $ = Game_Actor.prototype;

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables(in Game_Battler)
    //       {Boolean} isReserve: Whether the actor's added during the battle

    ["initEquips", "changeEquip", "forceChangeEquip"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            // Added to mark that weapon/armor notetags might have changed
            this._satb.notes.markChangeFactors(["weapons", "armors"]);
            //
            _GA[func].apply(this, arguments);
        }; // $[func]
        //
    });

    _GA.changeClass = $.changeClass;
    _SATB.changeClass = $.changeClass = function(classId, keepExp) {
    // v0.00a - v0.00a; Extended
        // Added to mark that class notetags might have changed
        this._satb.notes.markChangeFactors(["class"]);
        //
        _GA.changeClass.apply(this, arguments);
    }; // $.changeClass

    ["makeAutoBattleActions", "makeConfusionActions"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SATB[func] = $[func] = function() { // v0.00a - v0.00a; Extended
            _GA[func].apply(this, arguments);
            // Added to ensure that the actor will be able to execute actions
            BattleManager.addSATBActBattler(this);
            //
        }; // $[func]
        //
    });

    _GA.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GA.makeActions.apply(this, arguments);
        // Added to mark that this battler becomes inputable as well
        BattleManager.addSATBInputableActor(this);
        //
    }; // $.makeActions

    _GA.clearActions = $.clearActions;
    _SATB.clearActions = $.clearActions = function() {
     // v0.00a - v0.00a; Extended
        _GA.clearActions.apply(this, arguments);
        // Added to ensures the actor won't be able to input actions
        BattleManager.eraseSATBInputableActor(this);
        //
    }; // $.clearActions

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setPreemptStartSATB = function() {
        this.setStartSATB(this.coreMaxSATB());
    }; // $.setPreemptStartSATB

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *      - Implements the ATB value, input and action logic detail for enemies
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Enemy = { orig: {}, new: {} };
    var _GE = SATB.Game_Enemy.orig, _SATB = SATB.Game_Enemy.new;
    var $ = Game_Enemy.prototype;

    _GE.makeActions = $.makeActions;
    _SATB.makeActions = $.makeActions = function() {
    // v0.00a - v0.00a; Extended
        _GE.makeActions.apply(this, arguments);
        // Added to mark that the battler becomes able to execute action as well
        BattleManager.addSATBActBattler(this);
        //
    }; // $.makeActions

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.setSurpriseStartSATB = function() {
        this.setStartSATB(this.coreMaxSATB());
    }; // $.setSurpriseStartSATB

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBPhaseTypes
 *      - Implements all ATB business logic detail manipulations of a battler
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPhaseTypes.prototype;

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // {Game_SATBNotes} _notes: The wrapped notetag result/runner with caches
    // {Number} _coreATB: The current ATB value of the battler
    // {Number} _lastCoreATB: The last current ATB value of the battler
    // {Number} _lastCoreMax: The last maximum ATB value of the battler

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBNotes?} notes_ - The wrapped notetag result/runner
     */
    $.initialize = function(battler, notes_) {
        // notes_ must be the same as battler._satb.notes
        this._battler = battler, this._notes = notes_ || battler._satb.notes;
        //
        this._coreATB = this._lastCoreATB = 0;
        this._lastCoreMax = this.coreMax();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        delete this._notes;
        //
    }; // $.clear

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} val - The new current ATB value of the battler
     */
    $.setCoreATB = function(val) {
        // It must be here or checkUpdatedCoreMax would use wrong _coreATB val
        this._coreATB = val;
        //
        this.checkUpdatedCoreMax();
        // It must be here or checkUpdatedCoreMax would use wrong _lastCoreATB
        this._lastCoreATB = val;
        //
    }; // $.setCoreATB

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Number} proportion - New current ATB value proportion of battler
     */
    $.setCoreATBProportion = function(proportion) {
        this.setCoreATB(proportion * this.coreMax());
    }; // $.setCoreATB

    /**
     * Script Call/Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {Number} increment - Increment of current ATB value of the battler
     */
    $.addCoreATB = function(increment) {
        this.setCoreATB(this._coreATB + increment);
    }; // $.addCoreATB

    /**
     * Script Call/Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {Number} increment - Increment of current ATB value proportion
     */
    $.addCoreATBProportion = function(increment) {
        this.addCoreATB(increment * this.coreMax());
    }; // $.addCoreATBProportion

    /**
     * Script Call/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearCoreATB = function() {
        if (this._coreATB > 0) this.setCoreATB(0);
    }; // clearCoreATB

    /**
     * Script Call/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {Number} The current ATB value of the battler
     */
    $.coreATB = function() { return this._coreATB; };

    /**
     * Script Call/Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum ATB value of the battler
     */
    $.coreMax = function() { return this._notes.result("coreMax"); };

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.checkUpdatedCoreMax = function() {
        var coreMax = this.coreMax(), isFull = coreMax <= this._coreATB;
        var wasFull = this._lastCoreMax <= this._lastCoreATB;
        this._lastCoreMax = coreMax;
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        if (!wasFull && isFull) return this._onCoreATBBecomeFull(coreMax);
        //
        // Refers to reference tag INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
        if (wasFull && !isFull) this._battler.clearActions();
        //
    }; // $.checkUpdatedCoreMax

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {+ve Number} coreMax - The maximum ATB value of the battler
     */
    $._onCoreATBBecomeFull = function(coreMax) {
        // Passing coreMax instead of calling this.coreMax() is for performance
        this._coreATB = coreMax;
        if (this._battler.canMove()) this._battler.makeActions();
        //
    }; // $._onCoreATBBecomeFull

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBNotes.prototype, _SATB = SATB.Game_SATBNotes = {};

    _SATB.IS_VALID_RESULT = function(result) { // Hotspot
        // Using undefined is most memory efficient and using null's play safe
        return result !== null && result !== undefined;
        //
    }; // _SATB.IS_VALID_RESULT

    // The suffix of the names of funcions with and without the cache enabled
    _SATB._FUNC_WITH_CACHE = "WithCache";
    _SATB._FUNC_WITHOUT_CACHE = "WithoutCache";
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list
    // {Game_SATBCache} _cache: The helper caching notetag list/result
    // {Game_SATBPairs} _pairs: The helper checking/returning note pair
    // {Game_SATBRules} _rules: The helper using the rule to chain note

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBCache?} cache_ - The helper caching notetag list/result
     * @param {Game_SATBPairs?} pairs_ - The helper checking/returning note pair
     * @param {Game_SATBRules?} rules_ - The helper using the rule to chain note
     */
    $.initialize = function(battler, cache_, pairs_, rules_) {
        this._battler = battler;
        // Not making these as needed explicit dependecies' to simplify its uses
        this._cache = cache_ || new Game_SATBCache();
        this._pairs = pairs_ || new Game_SATBPairs(battler);
        this._rules = rules_ || new Game_SATBRules(this._pairs);
        //
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() {
        // Avoids memory leaks as they've the battler as their dependencies
        delete this._battler;
        this._pairs.clear(); // It's idempotent so it doesn't hurt to play safe
        this._rules.clear();
        //
    }; // $.clear

    [
        "markChangeFactors",
        "raiseMarkedChangeFactors",
        "raiseAllChangeFactors",
        "raiseChangeFactors",
        "invalidateResultCache",
        "invalidatePairFuncListCache"
    ].forEach(function(f) {
        /**
         * Idempotent
         * @interface @since v0.00a @version v0.00a
         */
        $[f] = function() { // Refers to the Game_SATBCache counterparts
            return this._cache[f].apply(this._cache, arguments);
        }; // $[f]
    });

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $.result = function(note, argObj_) {
        if ($gameSystem.satbParam("_isCached")) {
            return this._resultWithCache(note, argObj_);
        }
        // Refers to reference tag NOTE_RESULT_CACHE
        return this._uncachedResult(note, argObj_, _SATB._FUNC_WITHOUT_CACHE);
        //
    }; // $.result

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its notetag contents run
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    $.run = function(note, argObj_) {
        // Refers to reference tag RUN_DEFAULT_FIRST
        this._pairs.default(note, argObj_);
        //
        var isCached = $gameSystem.satbParam("_isCached");
        var funcNameSuffix =
                isCached ? _SATB._FUNC_WITH_CACHE : _SATB._FUNC_WITHOUT_CACHE;
        var list = this["_pairFuncList" + funcNameSuffix](note);
        var runFunc = this._pairs.run_.bind(this._pairs, argObj_, note);
        this._rules.chainedRunList(list, note).forEach(runFunc);
    }; // $.run

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._resultWithCache = function(note, argObj_) {
        var cache = this._cache.result_(note, argObj_);
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        return this._updatedResultWithCache(note, argObj_);
    }; // $._resultWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._updatedResultWithCache = function(note, argObj_) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result =
                this._uncachedResult(note, argObj_, _SATB._FUNC_WITH_CACHE);
        this._cache.updateResult(note, argObj_, result);
        return result;
        //
    }; // $._updatedResultWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*} The chained result from all effective notetags involved
     */
    $._uncachedResult = function(note, argObj_, funcNameSuffix) {
        // Only associative results can directly reuse cached part results
        if (this._rules.isAssociative(note)) {
            return this._associativeResult(note, argObj_, funcNameSuffix);
        }
        return this._nonAssociativeResult(note, argObj_, funcNameSuffix);
        //
    }; // $._uncachedResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*} The chained result from all effective notetags involved
     */
    $._associativeResult = function(note, argObj_, funcNameSuffix) {
        var partResults = this._partResults(note, argObj_, funcNameSuffix);
        var defaultResult = this._pairs.default(note, argObj_);
        // Refer to reference tag ASSOCIATIVE_CHAINING_RULE
        return this._rules.chainedResult(
                partResults, note, argObj_, defaultResult);
        //
    }; // $._associativeResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {[*]} The chained results of all effective notetags parts
     */
    $._partResults = function(note, argObj_, funcNameSuffix) {
        // Refers to reference tag NOTE_LIST_PART
        var priorities = this._rules.priorities(note);
        var funcName = "_partResult" + funcNameSuffix + "_";
        var resultFunc = this[funcName].bind(this, note, argObj_);
        return priorities.map(resultFunc).filter(_SATB.IS_VALID_RESULT);
        //
    }; // $._partResults

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._partResultWithoutCache_ = function(note, argObj_, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        return this._uncachedPartResult_(
                note, argObj_, part, _SATB._FUNC_WITHOUT_CACHE);
        //
    }; // $._partResultWithoutCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._partResultWithCache_ = function(note, argObj_, part) {
        var cache = this._cache.partResult_(note, argObj_, part);
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        return this._updatedPartResultWithCache_(note, argObj_, part);
    }; // $._partResultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._updatedPartResultWithCache_ = function(note, argObj_, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedPartResult_(
                note, argObj_, part, _SATB._FUNC_WITH_CACHE);
        this._cache.updatePartResult(note, argObj_, part, result);
        return result;
        //
    }; // $._updatedPartResultWithCache_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*?} The chained result from this effective notetags part
     */
    $._uncachedPartResult_ = function(note, argObj_, part, funcNameSuffix) {
        var list = this["_pairFuncListPart" + funcNameSuffix](note, part);
        // The 1st datum in the part list must be the initial value of the part
        if (list.length <= 0) return undefined;
        return this._rules.chainedResult(list, note, argObj_);
        // Refer to reference tag ASSOCIATIVE_CHAINING_RULE
    }; // $._uncachedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {*} The chained result from all effective notetags involved
     */
    $._nonAssociativeResult = function(note, argObj_, funcNameSuffix) {
        var list = this["_pairFuncList" + funcNameSuffix](note);
        var defaultResult = this._pairs.default(note, argObj_);
        return this._rules.chainedResult(list, note, argObj_, defaultResult);
    }; // $._nonAssociativeResult

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._pairFuncListWithoutCache = function(note) {
        return this._uncachedPairFuncList(note, _SATB._FUNC_WITHOUT_CACHE);
    }; // $._pairFuncListWithoutCache

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._pairFuncListWithCache = function(note) {
        // The functions in the list aren't bound yet so argObj_ is not needed
        var cache = this._cache.pairFuncList_(note);
        //
        // A valid list must be an Array which must be truthy
        return cache || this._updatedPairFuncListWithCache(note);
        //
    }; // $._pairFuncListWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._updatedPairFuncListWithCache = function(note) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedPairFuncList(note, _SATB._FUNC_WITH_CACHE);
        this._cache.updatePairFuncList(note, list);
        return list;
        //
    }; // $._updatedPairFuncListWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @enum @param {String} funcNameSuffix - WithoutCache/WithCache
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._uncachedPairFuncList = function(note, funcNameSuffix) {
        // Refers to reference tag NOTE_LIST_PART
        var funcName = "_pairFuncListPart" + funcNameSuffix;
        return this._rules.priorities(note).reduce(function(list, part) {
            return list.concat(this[funcName](note, part));
        }.bind(this), []);
        //
    }; // $._uncachedPairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._pairFuncListPartWithCache = function(note, part) {
        // The functions in the list aren't bound yet so argObj_ is not needed
        var cache = this._cache.pairFuncListPart_(note, part);
        //
        // A valid list must be an Array which must be truthy
        return cache || this._updatedPairFuncListPartWithCache(note, part);
        //
    }; // $._pairFuncListPartWithCache

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._updatedPairFuncListPartWithCache = function(note, part) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._pairFuncListPartWithoutCache(note, part);
        this._cache.updatePairFuncListPart(note, part, list);
        return list;
        //
    }; // $._updatedPairFuncListPartWithCache

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._pairFuncListPartWithoutCache = function(note, part) {
        var partListData = this._cache.partListData(part, this._battler);
        var func = this._pairs.pairFuncs.bind(this._pairs, note);
        return partListData.map(func).reduce(function(list, pairFuncs) {
            return list.concat(pairFuncs);
        }, []);
    }; // $._pairFuncListPartWithoutCache

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBCache
 *      - Caches the effective notetag lists and their end results
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBCache.prototype, _SATB = SATB.Game_SATBCache = {};

    _SATB._ALL_EMPTY_CONTAINERS = function() { // Potential Hotspot
        return _SATB._NOTES.reduce(function(containers, note) {
            containers[note] = {};
            return containers;
        }, {});
    }; // _SATB._ALL_EMPTY_CONTAINERS
    _SATB._MARKED_NOTE_CHANGE_FACTORS = function(marks) { // Potential Hotspot
        return Object.keys(marks).filter(function(f) { return marks[f]; });
    }; // _SATB._MARKED_NOTE_CHANGE_FACTORS
    _SATB._DEL_MASTER_KEY = function(cache, key) { // Potential Hotspot
        Object.keys(cache).forEach(function(k) {
            if (k.includes(key)) delete cache[k];
        });
    }; // _SATB._DEL_MASTER_KEY
    _SATB._NOTE_KEY = function(argObj_, note) { // Hotspot
        if (!argObj_) return note; // A valid key shouldn't be null or undefined
        // It's infeasible to cache the target so an empty key means not caching
        return argObj_.target ? undefined : note + JSON.stringify(argObj_);
        //
    }; // _SATB._NOTE_KEY

    // Refers to reference tag NOTE_DATA_TYPES
    _SATB._FACTOR_DATA = { // Potential Hotspot
        actor: function(battler) {
            return battler.isActor() ? [battler.actor()] : [];
        }, // actor
        enemy: function(battler) {
            return battler.isEnemy() ? [battler.enemy()] : [];
        }, // enemy
        class: function(battler) {
            return battler.isActor() ? [battler.currentClass()] : [];
        }, // class
        weapons: function(battler) {
            // Otherwise the game will crash upon start due to undefined _equips
            if (battler.isActor() && battler._equips) return battler.weapons();
            return [];
            //
        }, // weapons
        armors: function(battler) {
            // Otherwise the game will crash upon start due to undefined _equips
            return battler.isActor() && battler._equips ? battler.armors() : [];
            //
        }, // armors
        skills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            return battler.isEnemy() ? battler.enemy().actions.map(function(a) {
                return $dataSkills[a.skillId];
            }) : battler.isActor() ? battler.skills() : [];
            //
        }, // skills
        usableSkills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            if (battler.isActor()) return battler.usableSkills();
            if (!battler.isEnemy()) return [];
            return battler.enemy().actions.filter(function(act) {
                return battler.isActionValid(act);
            }).map(function(act) { return $dataSkills[act.skillId]; });
            //
        }, // usableSkills
        items: function(battler) {
            return battler.isActor() ? $gameParty.items() : [];
        }, // items
        usableItems: function(battler) {
            return battler.isActor() ? $gameParty.items().filter(function(i) {
                return battler.canUse(i);
            }) : [];
        }, // usableItems
        states: function(battler) {
            // Otherwise the game will crash upon start due to undefined _states
            return battler._states ? battler.states() : [];
            //
        },
        latestSkillItem: function(battler) {
            return battler.latestSATBItem ? [battler.latestSATBItem.item] : [];
        }, // latestSkillItem
        priority: function() { return []; },
        chainingRule: function() { return []; },
        result: function() { return []; }
    }; // _SATB._FACTOR_DATA
    //

    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = Object.keys(SATB.Game_System.new.PARAM_NOTE_FUNCS.notes);
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{[(**) -> *?]}} _cachedLists: Mapping from a note to its notetag func
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{[(**) -> *?]}}} _partLists: Mapping from note to list part function
    // {{{*}}} _partResults: The mapping from a note to its cached result parts
    // (Advanced){Boolean} _hasUnknownChangeFactor: ADVANCED_SCRIPT_CALLS_ONLY

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     */
    $.initialize = function() {
        this.raiseAllChangeFactors();
        // Set it as false only if you're sure this plugin's all change factors
        this._hasUnknownChangeFactor = true;
        //
    }; // $.initialize

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {[Factor]} factors - The change factors to be marked for all notes
     */
    $.markChangeFactors = function(factors) {
        factors.forEach(this._markChangeFactor, this);
    }; // $.markChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseMarkedChangeFactors = function() {
        // Not using raiseAllChangeFactors is to be flexible with creative uses
        _SATB._NOTES.forEach(this._raiseMarkedNoteChangeFactors, this);
        //
    }; // $.raiseMarkedChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseAllChangeFactors = function() {
        this._cachedLists = {};
        // They use separate containers so it must be called multiple times
        this._cachedResults = _SATB._ALL_EMPTY_CONTAINERS();
        this._partLists = _SATB._ALL_EMPTY_CONTAINERS();
        this._partResults = _SATB._ALL_EMPTY_CONTAINERS();
        this._changeFactorMarks = _SATB._ALL_EMPTY_CONTAINERS();
        //
    }; // $.raiseAllChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {[Factor]} factors - The change factors to be raised for this note
     */
    $.raiseChangeFactors = function(note, factors) {
        factors.forEach(this._raiseChangeFactor.bind(this, note));
    }; // $.raiseChangeFactors

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its part result cache invalidated
     * @param {DatumType} part - Note part to have its result cache invalidated
     */
    $.invalidateResultCache = function(note, part) {
        // All part results belonging to part must be del regardless of argObj_
        _SATB._DEL_MASTER_KEY(this._partResults[note], part);
        //
        // All end results belonging to note must be del regardless of argObj_
        _SATB._DEL_MASTER_KEY(this._cachedResults[note], note);
        //
    }; // $.invalidateResultCache

    /**
     * Script Call/Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its part list cache invalidated
     * @param {DatumType} part - Note part to have its list cache invalidated
     */
    $.invalidatePairFuncListCache = function(note, part) {
        // The cached functions aren't bound yet so the master key's not needed
        delete this._partLists[note][part];
        delete this._cachedLists[note];
        //
    }; // $.invalidatePairFuncListCache

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The cached result from all effective notetags involved
     */
    $.result_ = function(note, argObj_) {
        // An undefined key means the result shouldn't be or isn't cached
        var key = _SATB._NOTE_KEY(note, argObj_);
        return key && this._cachedResults[note][key];
        //
    }; // $.result_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The cached result from this notetag part involved
     */
    $.partResult_ = function(note, argObj_, part) {
        // An undefined key means the part result shouldn't be or isn't cached
        var key = _SATB._NOTE_KEY(argObj_, part);
        return key && this._partResults[note][key];
        //
    }; // $.partResult_

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result updated
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result updated
     * @param {*} result - The effective notetag list part result to be cached
     */
    $.updatePartResult = function(note, argObj_, part, result) {
        // An undefined key means the part result shouldn't be cached
        var key = _SATB._NOTE_KEY(argObj_, part);
        if (key) this._partResults[note][key] = result;
        //
    }; // $.updatePartResult

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result updated
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} result - The effective notetag list result to be cached
     */
    $.updateResult = function(note, argObj_, result) {
        // An undefined key means the result shouldn't be cached
        var key = _SATB._NOTE_KEY(note, argObj_);
        if (key) this._cachedResults[note][key] = result;
        //
    }; // $.updateResult

    /**
     * Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncList_ = function(note) {
        // Concatenating this._partLists[note] would need to use chaining rules
        return this._cachedLists[note];
        //
    }; // $.pairFuncList_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncListPart_ = function(note, part) {
        // The cache won't be saved in save files so it's ok to cache functions
        return this._partLists[note][part];
        //
    }; // $.pairFuncListPart_

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {DatumType} part - Note part to have its effective list returned
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @returns {[Datum]} List of data having the effective notetags involved
     */
    $.partListData = function(part, battler) {
        return _SATB._FACTOR_DATA[part](battler);
    }; // $.partListData

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {DatumType} part - Note part to have its effective list updated
     * @param {[PairFunc]} partList List of functions of  notetags involved
     */
    $.updatePairFuncListPart = function(note, part, partList) {
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][part] = partList; // partList.clone();
        //
    }; // $.updatePairFuncListPart

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list updated
     * @param {[PairFunc]} list - The list of functions of notetags involved
     */
    $.updatePairFuncList = function(note, list) {
        // list's supposed to be immutable so it's safe here
        this._cachedLists[note] = list; // list.clone();
        //
    }; // $.updatePairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {Factor} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        _SATB._NOTES.forEach(this._markNoteChangeFactor.bind(this, factor));
    }; // $._markChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {Factor} factor - The change factor to be marked for the note
     * @param {NoteType} note - The note to have its change factor marked
     */
    $._markNoteChangeFactor = function(factor, note) {
        this._changeFactorMarks[note][factor] = true;
    }; // $._markNoteChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its marked change factors raised
     */
    $._raiseMarkedNoteChangeFactors = function(note) {
        this.raiseChangeFactors(note, this._raisedNoteChangeFactors(note));
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its marked change factors raised
     * @returns {[Factor]} The note change factors to be raised
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        var factors = _SATB._MARKED_NOTE_CHANGE_FACTORS(marks);
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        var isMarkedOnly = !this._hasUnknownChangeFactor || factors.length > 0;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return isMarkedOnly ? factors : Object.keys(marks);
        //
    }; // $._raisedNoteChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its change factor raised
     * @param {Factor} factor - The change factor to be raised for the note
     */
    $._raiseChangeFactor = function(note, factor) {
        this.invalidateResultCache(note, factor);
        this.invalidatePairFuncListCache(note, factor);
        this._changeFactorMarks[note][factor] = false;
    }; // $._raiseChangeFactor

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPairs.prototype, _SATB = SATB.Game_SATBPairs = {};

    _SATB._IS_VALID_PAIR = function(note, pair_) {
        if (!pair_) return false;
        return pair_.entry1 && _SATB._IS_VALID_SUFFIX(note, pair_.suffix1);
    }; // _SATB._IS_VALID_PAIR
    _SATB._IS_VALID_SUFFIX = function(note, suffix) { // Potential Hotspot
        return _SATB._NOTE_TYPES[note].suffixes.indexOf(suffix) >= 0;
    }; // _SATB._IS_VALID_SUFFIX
    _SATB._PAIR_FUNC = function(note, datum, pair) {
        // Refers to reference tag THIS_GAME_BATTLER
        var suffix = pair.suffix1, noteFunc = _SATB._SUFFIX_FUNCS[suffix];
        var resultType = _SATB._NOTE_TYPES[note].result;
        return {
            canBind: _SATB._ARG_OBJ_SUFFIXES.indexOf(suffix) >= 0,
            datum: datum,
            unboundFunc: noteFunc(note, resultType, pair.entry1)
        };
        //
    }; // $._PAIR_FUNC

    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = { // Hotspot
        coreMax: function() {
            var coreMaxFunc = $gameSystem.satbParamFunc("coreMaxATBVal");
            return coreMaxFunc.call(this._battler);
        } // coreMax
    }; // _SATB._DEFAULT_RESULTS
    //
    // The last argument must be the latest chained notetag value result
    _SATB._NOTE_ARG_OBJS = { // Hotspot
        coreMax: function(func, datum, argObj_, latestMax) {
            return func(datum, datum.meta.satb.datumType, latestMax);
        } // coreMax
    }; // _SATB._NOTE_ARG_OBJS
    _SATB._NOTE_FUNCS = { // Potential Hotspot
        coreMax: function(content) {
            return new Function("datum", "datumType", "latestMax", content);
        } // coreMax
    }; // _SATB._NOTE_FUNCS
    //
    _SATB._RESULT_TYPES = { // Potential Hotspot
        boolean: function(result) { return result.toLowerCase() === "true"; },
        number: function(result) { return +result; },
        numberArray: function(result) {
            // Refers to reference tag NUMBER_ARRAY
            return result.split("_").map(function(r) { return +r; });
            //
        } // numberArray
    }; // _SATB._RESULT_TYPES
    // Refers to reference tag NOTE_SUFFIX
    _SATB._SUFFIX_FUNCS = { // Potential Hotspot
        cfg: function(noteType, resultType, entry) {
            return SATB.notes[noteType][entry];
        }, // cfg
        val: function(noteType, resultType, entry) {
            var f = _SATB._RESULT_TYPES[resultType];
            return f ? f.bind(_SATB, entry) : function() { return entry; };
        }, // val
        switch: function(noteType, resultType, entry) {
            return $gameSwitches.value.bind($gameSwitches, +entry);
        }, // switch
        event: function(noteType, resultType, entry) {
            return $gameTemp.reserveCommonEvent.bind($gameTemp, +entry);
        }, // event
        var: function(noteType, resultType, entry) {
            return $gameVariables.value.bind($gameVariables, +entry);
        }, // var
        // Function contents' not supposed to change frequently so it's ok here
        script: function(noteType, resultType, entry) {
            return _SATB._NOTE_FUNCS[noteType]($gameVariables.value(+entry));
        }, // script
        eval: function(noteType, resultType, entry) {
            return _SATB._NOTE_FUNCS[noteType](entry);
        } // eval
        //
    }; // _SATB._SUFFIX_FUNCS
    //

    _SATB._ARG_OBJ_SUFFIXES = ["cfg", "script", "eval"];

    // Refers to reference tag NOTE_SUFFIX
    _SATB._BASE_RUN_NOTES = { suffixes: ["cfg", "event", "script", "eval"] };
    _SATB._NUMBER_RESULT_NOTES = {
        result: "number",
        suffixes: ["cfg", "val", "switch", "var", "script", "eval"]
    }; // _SATB._NUMBER_RESULT_NOTES
    //
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTE_TYPES = { coreMax: _SATB._NUMBER_RESULT_NOTES };
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Battler} _battler: The battler owning the effective notetag list

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler owning effective notetag list
     */
    $.initialize = function(battler) { this._battler = battler; };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() { delete this._battler; /* Avoids memory leaks */ };

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The default result of the note
     */
    $.default = function(note, argObj_) {
        return _SATB._DEFAULT_RESULTS[note].call(this, argObj_);
    }; // $.default

    /**
     * Potential Hotspot/Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @returns {[PairFunc]} The list of unbound functions of the note involved
     */
    $.pairFuncs = function(note, datum_) {
        if (!datum_) return [];
        var pairs = datum_.meta.satb[note];
        if (!pairs) return [];
        var validPairs = pairs.filter(_SATB._IS_VALID_PAIR.bind(_SATB, note));
        return validPairs.map(_SATB._PAIR_FUNC.bind(this, note, datum_));
    }; // $.pairFuncs

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {<T>?} latestChainedResult_ - The latest chained notetag result
     * @returns {<T>?} The result of the notetag function involved
     */
    $.run_ = function(argObj_, note, pairFunc, latestChainedResult_) {
        // Using _NOTE_ARG_OBJS on the wrong suffix will have the wrong context
        var unboundFunc = pairFunc.unboundFunc;
        if (!pairFunc.canBind) return unboundFunc;
        var argObjFunc = _SATB._NOTE_ARG_OBJS[note];
        var boundFunc = unboundFunc.bind(this._battler), datum = pairFunc.datum;
        return argObjFunc(boundFunc, datum, argObj_, latestChainedResult_);
        //
    }; // $.run_

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBRules
 *      - Chains the effective notetag list into its results using the rules
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBRules.prototype, _SATB = SATB.Game_SATBRules = {};
    var GSATBN = SATB.Game_SATBNotes;

    // Refers to reference tag NOTE_OPERATORS
    _SATB._IS_ASSOCIATIVE_OPERATORS = {
        "+": true,
        "*": true,
        "-": false,
        "/": false,
        "%": false,
        // = is intended for unintended uses so it shouldn't be associative
        "=": false
        //
    }; // _SATB._IS_ASSOCIATIVE_OPERATORS
    //

    // The control coupling's to simplify the use of these functions
    _SATB._CONCAT_EVERY_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        if (result.length <= 0) return result;
        var runResult = this._pairs.run_(argObj_, note, pairFunc, result);
        if (!runResult) return [];
        // Only elements present in all arrays can stay
        return runResult.filter(function(r) { return result.indexOf(r) >= 0; });
        //
    }; // _SATB._CONCAT_EVERY_RESULT_FUNC
    _SATB._CONCAT_SOME_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var runResult = this._pairs.run_(argObj_, note, pairFunc, result);
        if (!runResult) return result;
        // It makes no sense to have duplicated elements
        return result.concat(runResult).filter(function(r, i, self) {
            // These array elements should be Javascript literals
            return self.indexOf(r) === i;
            //
        });
        //
    }; // _SATB._CONCAT_SOME_RESULT_FUNC
    _SATB._MIX_EVERY_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var keys = Object.keys(result);
        if (keys.length <= 0) return result;
        var runResult = this._pairs.run_(argObj_, note, pairFunc, result);
        if (!runResult) return {};
        // Only key value pairs present in all objects can stay
        var ks = Object.keys(runResult);
        keys.forEach(function(key) {
            if (ks.indexOf(key) < 0 || result[key] !== runResult[key]) {
                return delete result[key];
            }
        });
        //
        return result;
    }; // _SATB._MIX_EVERY_OBJ_RESULT_FUNC
    _SATB._MIX_SOME_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
    // Potential Hotspot
        var runResult = this._pairs.run_(argObj_, note, pairFunc, result);
        if (!runResult) return result;
        // Objects with lower priorities shouldn't override the higher ones
        Object.keys(runResult).forEach(function(key) {
            if (!result[key]) result[key] = runResult[key];
        });
        //
        return result;
    }; // _SATB._MIX_SOME_OBJ_RESULT_FUNC
    //
    _SATB._OPERATOR_RESULT_FUNC = function(operator) { // Potential Hotspot
        var content = [
            "var runResult = this._pairs.run_(argObj_, note, pairFunc, result);",
            "return result " + operator + " runResult;"
        ].join("\n");
        return new Function("note", "argObj_", "result", "pairFunc", content);
    }; // _SATB._OPERATOR_RESULT_FUNC
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, argObj_, note) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default(note, argObj_);
        return this._pairs.run_(argObj_, note, list[0]);
    }; // _SATB._FIRST_LIST_MONO_FUNC
    _SATB._LAST_LIST_MONO_FUNC = function(list, argObj_, note) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default(note, argObj_);
        return this._pairs.run_(argObj_, note, list[list.length - 1]);
    }; // _SATB._LAST_LIST_MONO_FUNC
    //
    _SATB._MONO_RESULT_CHAINING_RULES = function(func) { // Potential Hotspot
        // It's understood that associativity means nothing when running a list
        return { concat: func, mixObj: func, operator: func };
        //
    }; // _SATB._MONO_RESULT_CHAINING_RULES
    _SATB._RESULT_CHAINING_RULE_FUNC = function(func) { // Potential Hotspot
        // The this pointer is Game_SATBRules.prototype
        return function(list, note, argObj_, initVal_) { // Potential Hotspot
            func = func.bind(this, note, argObj_);
            if (GSATBN.IS_VALID_RESULT(initVal_)) {
                return list.reduce(func, initVal_);
            }
            var op = _SATB._RESULT_CHAINING_OPERATION[note];
            // The initial value of concat must be an Array
            return op === "concat" ? list.reduce(func, []) : list.reduce(func);
            //
        };
        //
    }; // _SATB._RESULT_CHAINING_RULE_FUNC
    _SATB._RESULT_CHAINING_RULES = { // Potential Hotspot
        every: {
            concat: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_EVERY_RESULT_FUNC),
            isAssociative: true,
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_EVERY_OBJ_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("&&"))
        }, // every
        some: {
            concat: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_SOME_RESULT_FUNC),
            isAssociative: true,
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_SOME_OBJ_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("||"))
        }, // some
        // Conforms with the chaining rule interface
        first: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._FIRST_LIST_MONO_FUNC),
        last: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._LAST_LIST_MONO_FUNC),
        //
    }; // _SATB._RESULT_CHAINING_RULES
    Object.keys(_SATB._IS_ASSOCIATIVE_OPERATORS).forEach(function(operator) {
        var func = _SATB._OPERATOR_RESULT_FUNC(operator);
        _SATB._RESULT_CHAINING_RULES[operator] = {
            isAssociative: _SATB._IS_ASSOCIATIVE_OPERATORS[operator],
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(func)
        }; // _SATB._RESULT_CHAINING_RULES[operator]
    });
    _SATB._RUN_LIST_CHAINING_RULES = { // Potential Hotspot
        every: function(list) { return list; },
        first: function(list) { return [list[0]]; },
        last: function(list) { return [list[list.length - 1]]; }
    }; // _RUN_LIST_CHAINING_RULES

    // Refers to reference tag DEFAULT_CHAINING_RULE_FIRST
    _SATB._DEFAULT_CHAINING_RULE = "first";
    //

    _SATB._NOTE_CHAINING_RULES = { coreMax: "_coreMaxATBValNoteChainingRule" };
    _SATB._NOTE_PRIORITIES = { coreMax: "_coreMaxATBValNotePriorities" };
    // Refers to reference tag NOTE_TYPE
    _SATB._RESULT_CHAINING_OPERATION = { coreMax: "operator" };
    //

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Game_SATBPairs} _pairs: The helper checking/returning note pair

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_SATBPairs} pairs - The note pair checker/user
     */
    $.initialize = function(pairs) { this._pairs = pairs; };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() { this._pairs.clear(); /* Avoids memory leaks */ };

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {Boolean} The check result
     */
    $.isAssociative = function(note) {
        var chainingRule = this._chainingRule(note);
        return _SATB._RESULT_CHAINING_RULES[chainingRule].isAssociative;
    }; // $.isAssociative

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @returns {*} The chained result from the notetag list of note involved
     */
    $.chainedResult = function(list, note, argObj_, initVal_) {
        var chainingRule = this._chainingRule(note);
        var op = _SATB._RESULT_CHAINING_OPERATION[note];
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        var resultFunc = _SATB._RESULT_CHAINING_RULES[chainingRule][op];
        return resultFunc.call(this, list, note, argObj_, initVal_);
        //
    }; // $.chainedResult

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {([PairFunc]) -> [PairFunc]} The function chaining the note list
     */
    $.chainedRunList = function(list, note) {
        return _SATB._RUN_LIST_CHAINING_RULES[this._chainingRule(note)](list);
    }; // $.chainedRunList

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[String]} The data type priority queue parameter value
     */
    $.priorities = function(note) {
        // Refers to reference tag NOTE_DATA_TYPES and THIS_GAME_BATTLER
        return $gameSystem.satbParam(_SATB._NOTE_PRIORITIES[note]);
        //
    }; // $.priorities

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @returns {ChainRule} The effective notetag chaining rule parameter value
     */
    $._chainingRule = function(note) {
        var rule = _SATB._NOTE_CHAINING_RULES[note];
        // Refers to reference tag THIS_GAME_BATTLER
        return $gameSystem.satbParam(rule) || _SATB._DEFAULT_CHAINING_RULE;
        //
    }; // $._chainingRule

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Party
 *      - Clears battler notes before save and inits them afterwards/upon load
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $ = Game_Party.prototype;

    ["initSATBNotes", "clearSATBNotes"].forEach(function(f) {
        /**
         * Idempotent
         * @interface @since v0.00a @version v0.00a
         */
        $[f] = function() { this.members().forEach(function(m) { m[f](); }); };
    });

})();

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Intercepts plugin command coming from this plugin as script calls
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Interpreter = { orig: {}, new: {} };
    var _GI = SATB.Game_Interpreter.orig, $ = Game_Interpreter.prototype;
    var _SATB = SATB.Game_Interpreter.new;

    _SATB._FILTERED_TARGETS = function(targetType, targets, targetGroup) {
        // Refers to reference tag PLUGIN_CMD_TARGET
        switch (_SATB._TARGET_GROUPS[targetType]) {
            case _SATB._TARGET_ID: {
                return _SATB._FILTERED_TARGET_IDS(targets, targetGroup);
            } case _SATB._TARGET_INDEX: {
                return _SATB._FILTERED_TARGET_INDICES(targets, targetGroup);
            }
        }
        return [];
        //
    }; // _SATB._FILTERED_TARGETS
    _SATB._FILTERED_TARGET_IDS = function(targets, targetGroup) {
      return targetGroup.filter(function(target) {
          if (isNaN(target)) return targets.indexOf(target.name()) >= 0;
          // targetGroup must only have actors for _SATB._TARGET_ID
          return targets.indexOf(target.actorId()) >= 0;
          //
      });
    }; // _SATB._FILTERED_TARGET_IDS
    _SATB._FILTERED_TARGET_INDICES = function(targets, targetGroup) {
        return targetGroup.filter(function(target, i) {
            if (isNaN(target)) return targets.indexOf(target.name()) >= 0;
            return targets.indexOf(i) >= 0;
        });
    }; // _SATB._FILTERED_TARGET_INDICES
    _SATB._IS_PLUGIN_CMD = function(cmd) {
        return _SATB._CMDS.indexOf(cmd) >= 0;
    }; // _SATB._IS_PLUGIN_CMD

    _SATB._TARGET_TYPES = {
        allParty: function() { return $gameParty.members(); },
        aliveParty: function() { return $gameParty.aliveMembers(); },
        deadParty: function() { return $gameParty.deadMembers(); },
        movableParty: function() { return $gameParty.movableMembers(); },
        allTroop: function() { return $gameTroop.members(); },
        aliveTroop: function() { return $gameTroop.aliveMembers(); },
        deadTroop: function() { return $gameTroop.deadMembers(); },
        movableTroop: function() { return $gameTroop.movableMembers(); },
        allActors: function() { return $gameActors._data; },
        aliveActors: function() {
            return $gameActors._data.filter(function(actor) {
                return actor.isAlive();
            });
        }, // aliveActors
        deadActors: function() {
            return $gameActors._data.filter(function(a) { return a.isDead(); });
        }, // deadActors
        movableActors: function() {
            return $gameActors._data.filter(function(actor) {
                return actor.canMove();
            });
        } // movableActors
    }; // _SATB._TARGET_TYPES

    _SATB._CMDS = SATB.Game_Battler.new.NOTE_FORWARDED_FUNCS;
    _SATB._TARGET_ID = "id", _SATB._TARGET_INDEX = "index";

    _SATB._TARGET_GROUPS = {
        allParty: _SATB._TARGET_INDEX,
        aliveParty: _SATB._TARGET_INDEX,
        deadParty: _SATB._TARGET_INDEX,
        movableParty: _SATB._TARGET_INDEX,
        allTroop: _SATB._TARGET_INDEX,
        aliveTroop: _SATB._TARGET_INDEX,
        deadTroop: _SATB._TARGET_INDEX,
        movableTroop: _SATB._TARGET_INDEX,
        allActors: _SATB._TARGET_ID,
        aliveActors: _SATB._TARGET_ID,
        deadActors: _SATB._TARGET_ID,
        movableActors: _SATB._TARGET_ID
    }; // _SATB._TARGET_GROUPS

    _GI.pluginCommand = $.pluginCommand;
    _SATB.pluginCommand = $.pluginCommand = function(command, args) {
    // v0.00a - v0.00a; Extended
        _GI.pluginCommand.apply(this, arguments);
        // Added to invoke the plugin command from this plugin
        _SATB._pluginCmd.call(this, command, args);
        //
    }; // $.pluginCommand

    /**
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @param {PluginCmd} cmd - The plugin command name
     * @param {PluginArgs} args - Plugin command arguments
     */
    _SATB._pluginCmd = function(cmd, args) {
        if (_SATB._IS_PLUGIN_CMD(cmd)) _SATB._usePluginCmd.call(this, args);
    }; // _SATB._pluginCmd

    /**
     * Plugin command's just another way of using script call
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @param {PluginCmd} cmd - The plugin command name
     * @param {PluginArgs} args - Plugin command arguments
     */
    _SATB._usePluginCmd = function(cmd, args) {
        // The 1st and 2nd arguments must always be the target type and target
        var targetType = args.shift(), targets = args.shift();
        //
        var battlers = _SATB._pluginCmdTargets.call(this, targetType, targets);
        // The function's easy, simple and small enough to be inlined
        battlers.forEach(function(t) { t[cmd].apply(this, args); }, this);
        //
    }; // _SATB._usePluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {TargetType} targetType - The battler group to be targeted
     * @param {[String|Number]} targets - Refer to reference tag
     *                                    PLUGIN_CMD_TARGET
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargets = function(targetType, targets) {
        var targetGroup = _SATB._pluginCmdTargetGroup.call(this, targetType);
        return _SATB._FILTERED_TARGETS(targetType, targets, targetGroup);
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {TargetType} targetType - The battler group to be targeted
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargetGroup = function(targetType) {
        if (!_SATB._TARGET_TYPES[targetType]) return [];
        return _SATB._TARGET_TYPES[targetType]();
    }; // _SATB._pluginCmdTargetGroup

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Edits the high level battle flow structure to run this plugin
 *----------------------------------------------------------------------------*/

 (function(SATB) {

     "use strict";

     SATB.Scene_Battle = { orig: {}, new: {} };
     var _SB = SATB.Scene_Battle.orig, $ = Scene_Battle.prototype;
     var _SATB = SATB.Scene_Battle.new;

     /*------------------------------------------------------------------------
      *    New private instance variables
      *------------------------------------------------------------------------*/
     // {{*}} _satb: The container of all other new variables
     //       {Boolean} canLastEsc: Whether the party can escape in last frame
     //       {Boolean} canLastDisplayWins: Whether the windows can be displayed

    _SB.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _SB.initialize.apply(this, arguments);
        // Added to initialize all the new variables as well
        _SATB._init.call(this);
        //
    }; // $.initialize

    _SB.updateBattleProcess = $.updateBattleProcess;
    _SATB.updateBattleProcess = $.updateBattleProcess = function() {
    // v0.00a - v0.00a; Extended
        // Added to abandon the default battle system action input and exec flow
        if (BattleManager.isSATB()) return _SATB._updateBattleProc.call(this);
        //
        _SB.updateBattleProcess.apply(this, arguments);
    }; // $.updateBattleProcess

    _SB.updateStatusWindow = $.updateStatusWindow;
    _SATB.updateStatusWindow = $.updateStatusWindow = function() {
    // v0.00a - v0.00a; Extended
        // Added to update the statuses of all selection windows in this plugin
        _SATB._updateInputWins.call(this);
        //
        _SB.updateStatusWindow.apply(this, arguments);
    }; // $.updateStatusWindow

    _SB.updateWindowPositions = $.updateWindowPositions;
    _SATB.updateWindowPositions = $.updateWindowPositions = function() {
    // v0.00a - v0.00a; Extended
        _SB.updateWindowPositions.apply(this, arguments);
        // Added to let the actor window completely cover the status window
        _SATB._updateActorWinPos.call(this);
        //
    }; // $.updateWindowPositions

    _SB.refreshStatus = $.refreshStatus;
    _SATB.refreshStatus = $.refreshStatus = function() {
    // v0.00a - v0.00a; Extended
        // Added to refresh the contents and visibilities of all selection wins
        this.refreshSATBInputWins();
        //
        _SB.refreshStatus.apply(this, arguments);
    }; // $.refreshStatus

    _SB.commandFight = $.commandFight;
    _SATB.commandFight = $.commandFight = function() {
    // v0.00a - v0.00a; Extended
        // Added to setup the inputable actor directly without selectNextCommand
        if (BattleManager.isSATB()) return _SATB._cmdFight.call(this);
        //
        _SB.commandFight.apply(this, arguments);
    }; // _SATB.commandFight

    _SB.commandEscape = $.commandEscape;
    _SATB.commandEscape = $.commandEscape = function() {
    // v0.00a - v0.00a; Extended
        // Added to ensure party escape attempt won't trigger when battle's busy
        if (!BattleManager.canSATBEsc(this)) {
            return this.startPartyCommandSelection();
        }
        //
        _SB.commandEscape.apply(this, arguments);
    }; // $.commandEscape

    _SB.selectNextCommand = $.selectNextCommand;
    _SATB.selectNextCommand = $.selectNextCommand = function() {
    // v0.00a - v0.00a; Extended
        // Added to avoid setting up the party command window upon next command
        if (BattleManager.isSATB()) return _SATB._selectNextCmd.call(this);
        //
        _SB.selectNextCommand.apply(this, arguments);
    }; // $.selectNextCommand

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    $.refreshSATBInputWins = function() {
        if (!BattleManager.isSATB()) return;
        // It's possible for the target list/availability to be changed
        if (this._actorWindow.visible) {
            this._actorWindow.refresh();
            return this._enemyWindow.deselect();
        } else if (this._enemyWindow.visible) {
            this._enemyWindow.refresh();
            return this._actorWindow.deselect();
        }
        //
        // It's to ensure that the stale targets aren't displayed as selected
        this._actorWindow.deselect();
        this._enemyWindow.deselect();
        //
        // It's possible for the skill/item usability/cost to be changed
        if (this._skillWindow.visible) return this._skillWindow.refresh();
        if (this._itemWindow.visible) return this._itemWindow.refresh();
        //
        if (!this._actorCommandWindow.visible) return;
        // It's possible for the command list/availability to be changed
        this._actorCommandWindow.refresh();
    }; // $.refreshSATBInputWins

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.closeSATBInputWins = function() {
        _SATB._hideSelectionWins.call(this);
        // It's not worth making _cmdWins just to group these codes together
        this._actorCommandWindow.close();
        this._partyCommandWindow.close();
        //
    }; // $.closeSATBInputWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() { this._satb = {}; };

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot
     * @since v0.00a @version v0.00a
     */
    _SATB._updateBattleProc = function() {
        // Reconstructs battle system action input and execution flows for atb
        _SATB._updateCanEsc.call(this);
        if (!BattleManager.canUpdateSATBProc()) {
            // It's possible for an inputable actor to die without ATB update
            return _SATB._updateActorSelection.call(this);
            //
        }
        BattleManager.updateCoreSATB();
        _SATB._updateActorSelection.call(this);
        BattleManager.updateSATBAct();
        //
    }; // _SATB._updateBattleProc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateCanEsc = function() {
        // Updates the party escape command availability if the window's active
        if (!this._partyCommandWindow.active) return;
        var canEsc = BattleManager.canSATBEsc();
        if (this._satb.canLastEsc === canEsc) return;
        this._partyCommandWindow.refresh();
        this._satb.canLastEsc = canEsc;
        //
    }; // _SATB._updateCanEsc

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @todo Breaks this excessive large method into several smaller methods
     */
    _SATB._updateActorSelection = function() {
        var inputableIndices = BattleManager.inputableSATBActorIndices();
        var selectedIndex = this._statusWindow.index();
        // The selected inputable actor remains inputable so no update's needed
        if (inputableIndices.indexOf(selectedIndex) >= 0) return;
        //
        // Deactivates the active input windows that should be no longer active
        if (selectedIndex >= 0) return _SATB._onDeselectActor.call(this);
        var hasNoInputableActor = inputableIndices.length <= 0;
        if (this._partyCommandWindow.active) {
            // There's no need to setup a new inputable actor in this case
            if (hasNoInputableActor) this._partyCommandWindow.close();
            return;
            //
        }
        //
        // Setups new inputable actors to input actions if there's such actors
        if (hasNoInputableActor) return;
        _SATB._onSelectActor.call(this, inputableIndices[0]);
        //
    }; // _SATB._updateActorSelection

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._onDeselectActor = function() {
        _SATB._deselectOpenStatusWin.call(this);
        _SATB._hideActiveSelectionWins.call(this);
        if (this._actorCommandWindow.active) this._actorCommandWindow.close();
    }; // _SATB._onDeselectActor

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._deselectOpenStatusWin = function() {
        // It's impossible to close the status win without closing actor cmd win
        if (_SATB._selectionWins.call(this).some(function(window) {
            return window.visible;
        })) this._statusWindow.open();
        //
        this._statusWindow.deselect();
    }; // _SATB._deselectOpenStatusWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._hideActiveSelectionWins = function() {
        // Close all selection windows for selected actor becoming not inputable
        _SATB._selectionWins.call(this).forEach(function(win) {
            if (win.active) win.hide();
        });
        //
    }; // _SATB._hideActiveSelectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateInputWins = function() {
        if (!BattleManager.isSATB()) return;
        var canDisplayWins = _SATB._canDisplayWins.call(this);
        if (this._satb.canLastDisplayWins === canDisplayWins) return;
        this._satb.canLastDisplayWins = canDisplayWins;
        // Reopens all commands windows after they become able to be open
        if (canDisplayWins) return _SATB._displayWins.call(this);
        //
        // Hides all selection windows as well when they can't be displayed
        _SATB._hideSelectionWins.call(this);
        //
    }; // _SATB._updateInputWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._canDisplayWins = function() {
        // Checks whether cases preventing windows to be open are all gone
        if ($gameMessage.isBusy()) return false;
        return this.isActive() && !this._messageWindow.isClosing();
        //
    }; // _SATB._canDisplayWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._displayWins = function() {
        if (this._actorWindow.active) return this.selectActorSelection();
        if (this._enemyWindow.active) return this.selectEnemySelection();
        if (this._skillWindow.active) return this.commandSkill();
        if (this._itemWindow.active) return this.commandItem();
        var actor = BattleManager.actor();
        if (actor) return this._actorCommandWindow.setup(actor);
        if (this._partyCommandWindow.active) this._partyCommandWindow.setup();
    }; // _SATB._displayWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._hideSelectionWins = function() {
        _SATB._selectionWins.call(this).forEach(function(win) { win.hide(); });
    }; // _SATB._hideSelectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {[Window_Selectable]} The list of selection windows
     */
    _SATB._selectionWins = function() {
        // Actor and party command windows are command but not selection windows
        return [
            this._actorWindow,
            this._enemyWindow,
            this._skillWindow,
            this._itemWindow
        ];
        //
    }; // _SATB._selectionWins

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._updateActorWinPos = function() {
        if (!_SATB._isUpdateActorWinPos.call(this)) return;
        // Ensure the actor window will completely cover the status window
        this._actorWindow.x = this._statusWindow.x;
        //
    }; // _SATB._updateActorWinPos

    /**
     * The this pointer is Scene_Battle.prototype
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {Boolean} The check result
     */
    _SATB._isUpdateActorWinPos = function() {
        if (!BattleManager.isSATB() || !this._actorWindow.active) return false;
        return this._actorWindow.x === this._statusWindow.x;
    }; // _SATB._isUpdateActorWinPos

    /**
     * The this pointer is Scene_Battle.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     */
    _SATB._cmdFight = function() {
        var inputableIndices = BattleManager.inputableSATBActorIndices();
        _SATB._onSelectActor.call(this, inputableIndices[0]);
    }; // _SATB._cmdFight

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Index} index - The index of the inputable actor in the party
     */
    _SATB._onSelectActor = function(index) {
        BattleManager.changeActor(index, 'waiting');
        this.startActorCommandSelection();
    }; // _SATB._onSelectActor

    /**
     * The this pointer is Scene_Battle.prototype
     * @since v0.00a @version v0.00a
     */
    _SATB._selectNextCmd = function(index) {
        BattleManager.selectNextCommand();
        // So actor cmd win will be immediately setup for next inputable actor
        if (BattleManager.isInputting() && BattleManager.actor()) {
            return this.startActorCommandSelection();
        }
        //
        this.endCommandSelection();
    }; // _SATB._selectNextCmd

})(DoubleX_RMMV.SATB);

/*============================================================================*/
