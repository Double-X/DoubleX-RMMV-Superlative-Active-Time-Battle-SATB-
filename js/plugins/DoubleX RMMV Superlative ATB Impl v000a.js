/*:
 * @plugindesc The implementation plugin of DoubleX RMMV Superlative ATB
 * @author DoubleX
 */

/*============================================================================
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
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the note result/running helper for SATB
 *----------------------------------------------------------------------------*/

function Game_SATBNotes() { this.initialize.apply(this, arguments); };
// DON'T USE THESE DIRECTLY ON YOUR OWN UNLESS YOU REALLY KNOW WHAT YOU'RE DOING
function Game_SATBCache() { this.initialize.apply(this, arguments); };
function Game_SATBPairs() { this.initialize.apply(this, arguments); };
function Game_SATBRules() { this.initialize.apply(this, arguments); };
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
     * @type {{Boolean, Datum, (**) -> *}} PairFunc - Check _pairFunc in
     *                                                Game_SATBPairs
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
        var func = _SATB._UPDATE_IDS.bind(this, datumType, noteType, +entry);
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
            _SATB._updateNotePairs.call(
                    this, datumType, noteType, i + 1, suffixes[i], entries[i]);
        }
        return pairs;
        //
    }; // _SATB._notePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {DatumType} datumType - The type of the datum to be loaded
     * @param {NoteType} noteType - The type of the notetag to be loaded
     * @param {+Natural Number} count - The notetag suffix entry pair counter
     * @param {Suffix} suffix - The currently inspected suffix in the notetag
     * @param {String} entry - The currently inspected entry in the notetag
     */
    _SATB._updateNotePairs = function(datumType, noteType, count, suffix, entry) {
        // Refers to reference tag MULTI_SUFFIX_ENTRY
        pairs["suffix" + count] = suffix, pairs["entry" + count] = entry;
        //
        // Users changing the switch/var note map should update it manually
        _SATB.updateSwitchVarIds.call(
                this, noteType, suffix, entry, datumType);
        //
    }; // _SATB._updateNotePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._extractSaveContents = function() {
        ["params", "notes"].forEach(
                $gameSystem.extractSATBFuncContents, $gameSystem);
        $gameParty.initSATBNotes();
    }; // _SP._extractSaveContents

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
    _SATB._IS_FUNC_PARAM = function(param) { return param[0] !== "_"; };
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
    // Using Function.bind would cause the function to have the wrong contect
    _SATB._0_ARG_FUNC = function(content) { return new Function(content); };
    //

    _SATB.FUNCS = {
        params: {
            IsCoreEnabled: _SATB._0_ARG_FUNC,
            coreBaseFillATBFrame: _SATB._0_ARG_FUNC,
            coreBaseFillATBSec: _SATB._0_ARG_FUNC,
            coreTurnATBTime: function(content) {
                return new Function("baseFillATB", content);
            },
            coreTurnATBAct: _SATB._0_ARG_FUNC,
            canCoreTurnOverflow: _SATB._0_ARG_FUNC,
            coreMaxATBVal: _SATB._0_ARG_FUNC
        },
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(content) {
                return new Function("max", "datum", "datumType", content);
            }
            //
        }
    }; // _SATB.FUNCS
    /** @todo  Refactors these when editing BattleManager */
    _SATB._PARAM_UPDATES = {
        coreMaxATBVal: function(switchVar_, id_, dataTypes_) {
            _SATB._storeUpdatedSwitchVarIds.call(
                    this, "coreMax", switchVar_, id_, dataTypes_);
            /*var mems = BattleManager._phase ?
                    BattleManager.allBattleMembers() : $gameParty.members();*/
            // Only the default value might change so factor result is raised
            BattleManager.satbMems().forEach(function(mem) {
                mem.raiseSATBNoteChangeFactor("coreMax", "result");
            });
            //
        },
        _coreMaxATBValNoteChainingRule: function() {
            /*var mems = BattleManager._phase ?
                    BattleManager.allBattleMembers() : $gameParty.members();*/
            BattleManager.satbMems().forEach(function(mem) {
                mem.raiseSATBNoteChangeFactor("coreMax", "chainingRule");
            });
        },
        _coreMaxATBValNotePriorities: function() {
            /*var mems = BattleManager._phase ?
                    BattleManager.allBattleMembers() : $gameParty.members();*/
            BattleManager.satbMems().forEach(function(mem) {
                mem.raiseSATBNoteChangeFactor("coreMax", "priority");
            });
        }
    }; // _SATB._PARAM_UPDATES
    //

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
        canCoreTurnOverflow: "core",
        coreMaxATBVal: "core",
        _coreMaxATBValNoteChainingRule: "core",
        _coreMaxATBValNotePriorities: "core"
    }; // _SATB._PARAM_MODULES
    //

    _GS.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _GS.initialize.apply(this, arguments);
        _SATB._init.call(this); // Added to setup parameters/notetags
    }; // $.initialize

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{{*}}} _satb: The container of all other new variables
    //         {{{String}}} params: The container of all parameter values
    //         {{{String}}} notes: The container of all notetag function content
    //         {{[String]}} switchIds: The game switch notetag factor mapping
    //         {{[String]}} varIds: The game variable notetag factor mapping

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
     * Nullipotent
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
     * Idempotent
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
        _SATB._extractParamFuncContent.call(this, module, param);
        var func = _SATB._PARAM_UPDATES[param];
        if (func) func.call(this, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @returns {String} The notetag function content
     */
    $.satbNote = function(noteType, name) {
        return this._satb.notes[noteType][name];
    }; // $.satbNote

    /**
     * Idempotent
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
        _SATB._extractNoteFuncContent.call(this, type, name);
        _SATB._storeUpdatedSwitchVarIds.call(
                this, noteType, switchVar_, id_, dataTypes_);
    }; // $.setSATBNote

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
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
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._storeParams = function() {
        var params = _SATB._rawParams.call(this);
        Object.keys(params).forEach(_SATB._storeParam.bind(this, params));
    }; // _SATB._storeParams

    /**
     * The this pointer is Game_System.prototype
     * @since v0.00a @version v1.00b
     * @returns {{String}} The raw parameter name-value mapping
     */
    _SATB._rawParams = function() {
        // There's no need to cache it as _rawParams should only be called once
        var fileName = DoubleX_RMMV.Superlative_ATB_Parameters_File;
        var params = PluginManager.parameters(fileName);
        Object.keys(params).forEach(function(param) {
            if (!_SATB._IS_FUNC_PARAM(param)) return;
            params[param] = _SATB._TRY_JSON_PARAM(param, params[param]);
        });
        return params;
        //
    }; // _SATB._rawParams

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
     * @param {String} val - The parameter value
     * @returns {String} The function contents as parameter values
     */
    _SATB._param = function(param, val) {
        // It's better to explicitly state what these variables are
        var module = _SATB._PARAM_MODULES[param];
        var paramFunc = SATB.params[module][param];
        //
        // Refers to reference tag PARAMETERS_CONFIGURATIONS
        return val || _SATB._funcContent.call(this, paramFunc);
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
        this._satb.notes[type][name] = _SATB._funcContent.call(this, noteFunc);
    }; // _SATB._storeNote

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v0.00a @version v0.00a
     * @param {(**) -> *} func - The function as the value of the configuration
     * @returns {String} The parameter function contents in configuration plugin
     */
    _SATB._funcContent = function(func) {
        var funcStart = /^[^{]*{\s*/, funcEnd = /\s*}[^}]*$/;
        // Only the function contents are stored in save files
        return func.toString().replace(funcStart, "").replace(funcEnd, "");
        //
    }; // _SATB._funcContent

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
    })

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Module} module - The module of the stored function content
     * @param {Param} name - The name of the stored function content
     */
    _SATB._extractParamFuncContent = function(module, name) {
        // Converts the stored function content into a parameter function
        var content = this._satb.params[module][name];
        SATB.params[module][name] = _SATB.FUNCS.params[name](content);
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
        var content = this._satb.notes[type][name];
        SATB.notes[type][name] = _SATB.FUNCS.notes[type](content);
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
        if (switchVar && id_ && dataType_) _SATB._updateSwitchVarIds.call(
                this, noteType, switchVar_, id_, dataTypes_);
        // It's just to play safe as it's possible to de-register a switch/var
        _SATB._storeSwitchVarIds.call(this);
        //
    }; // _SATB._storeUpdatedSwitchVarIds

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} noteType - The notetag type
     * @enum @param {String} switchVar - Refer to reference tag SWITCH_VAR
     * @param {Id} id - The switch/variable id
     * @param {[DatumType]} dataTypes - The type of the data with switch/var
     */
    _SATB._updateSwitchVarIds = function(noteType, switchVar, id, dataTypes) {
        var updateSwitchVarIds = DM.updateSwitchVarIds.bind(
                DataManager, noteType, switchVar, id);
        if (dataTypes.length > 0) return dataTypes.forEach(updateSwitchVarIds);
        var func = SATB._ERASE_SWITCH_VAR_IDS.bind(this, noteType, id);
        // Refer to reference tag SWITCH_VAR
        if (DM.SWITCH_VARS[switchVar]) func(DM[DM.SWITCH_VARS[switchVar]]);
        //
    }; // _SATB._updateSwitchVarIds

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
            var noteFactors_ = $gameSystem.satbParam(param)[id];
            _SATB._raiseChangeFactors.call(this, noteFactors_);
            //
        }; // $.setValue

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {{[DatumType]}?} noteFactors_ - The notes and factors to be
         *                                        raised by this id
         * @todo Refactors this when editing BattleManager
         */
        _SATB._raiseChangeFactors = function(noteFactors_) {
            if ($gameSystem.satbParam("_isAlwaysRecacheAllSwitchVars")) {
                return BattleManager.satbMems().forEach(function(mem) {
                    mem.raiseAllSATBNoteChangeFactors();
                });
            }
            /*var mems = BattleManager._phase ?
                    BattleManager.allBattleMembers() : $gameParty.members();*/
            if (noteFactors_) BattleManager.satbMems().forEach(function(mem) {
                mem.raiseSATBChangeFactors(noteFactors_);
            });
        }; // _SATB._raiseChangeFactors

    });

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      -
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Battler = { orig: {}, new: {} };
    var _GB = SATB.Game_Battler.orig, _SATB = SATB.Game_Battler.new;
    var $ = Game_Battler.prototype, $$ = Game_BattlerBase.prototype;
    // All these functions are battler script calls
    _SATB._FORWARDED_FUNCS = {
       raiseAllSATBNoteChangeFactors: "raiseAllChangeFactors",
       raiseSATBNoteChangeFactor: "raiseChangeFactor",
       invalidateSATBNoteResult: "invalidateResultCache",
       invalidateSATBNoteList: "invalidatePairFuncListCache"
    }; // _SATB._FORWARDED_FUNCS
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Game_SATBNotes} notes: The notetag results

    _GA.initialize = $.initialize;
    _SATB.initialize = $.initialize = function(actorId) {
    // v0.00a - v0.00a; Extended
        _SATB._init.call(this); // Added to initialize all superlative ATB vars
        _GA.initialize.apply(this, arguments);
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

    _GB.refresh = $.refresh;
    _SATB.refresh = $.refresh = function() { // v0.00a - v0.00a; Extended
        _GB.refresh.apply(this, arguments);
        // Added to refreshes all superlative ATB notetags lists/results
        _SATB._refresh.call(this);
        //
    }; // $.refresh

    // Refers to the Game_SATBNotes counterparts
    Object.keys(_SATB._FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB._FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.notes[f].apply(this._satb.notes, arguments);
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
            var raiseFunc = this.raiseSATBNoteChangeFactor.bind(this, note);
            noteFactors[note].forEach(raiseFunc);
        });
    }; // $.raiseSATBChangeFactors

    /**
     * Script Call/Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @returns {+ve Number} The maximum ATB value of this battler
     */
    $.coreMaxSATB = function() { return this._satb.notes.result("coreMax"); };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() {
        // Setting the dependencies here's just to make this method less empty
        var pairs = new Game_SATBPairs(this);
        var cache = new Game_SATBCache();
        var rules = new Game_SATBRules(pairs);
        this._satb.notes = new Game_SATBNotes(this, cache, pairs, rules);
        //
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks as it's the battler as a dependency
        this._satb.notes.clear();
        delete this._satb.notes;
        //
    }; // $.clearSATBNotes

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
        // Refers to reference tag BATTLER_REFRESH_RECACHE_NOTE
        this._satb.notes.raiseMarkedChangeFactors();
        //
        // Refers to reference tag DECREASED_MAX_CORE_ATB_INPUTABLE
        _SATB._checkUpdatedCoreMaxSATB.call(this);
        // And INCREASED_MAX_CORE_ATB_NOT_INPUTABLE
    }; // _SATB._refresh

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      -
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.Game_Actor = { orig: {}, new: {} };
    var _GA = SATB.Game_Actor.orig, _SATB = SATB.Game_Actor.new;
    var $ = Game_Actor.prototype;

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

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Unit
 *      - Clears battler notes before save and inits them afterwards/upon load
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $ = Game_Unit.prototype;

    ["initSATBNotes", "clearSATBNotes"].forEach(function(f) {
        /**
         * Idempotent
         * @interface @since v0.00a @version v0.00a
         */
        $[f] = function() { this.members().forEach(function(m) { m[f](); }); };
    });

})();

/*----------------------------------------------------------------------------
 *    # New class: Game_SATBNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBNotes.prototype, _SATB = SATB.Game_SATBNotes = {};

    _SATB.IS_VALID_RESULT = function(result) {
        // Using undefined is most memory efficient and using null's play safe
        return result !== null && result !== undefined;
        //
    }; // _SATB.IS_VALID_RESULT

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
        this._init(battler, cache_, pairs_, rules_);
        this.raiseAllChangeFactors();
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
        "raiseChangeFactor",
        "invalidateResultCache",
        "invalidatePairFuncListCache"
    ].forEach(function(f) {
        // Refers to the Game_SATBCache counterparts
        $[f] = function() {
            return this._cache[f].apply(this._cache, arguments);
        }; // $[f]
        //
    });

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $.result = function(note, argObj_) {
        if (!$gameSystem.satbParam("_isCached")) {
            return this._updatedResult(note, argObj_);
        }
        var cache = this._cache.result_(note, argObj_);
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        return this._updatedResult(note, argObj_);
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
        var list = this._pairFuncList(note);
        var runFunc = this._pairs.run.bind(this._pairs, argObj_, note);
        this._rules.chainedRunListFunc(note)(list).forEach(runFunc);
    }; // $.run

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @param {Game_SATBCache?} cache_ - The helper caching notetag list/result
     * @param {Game_SATBPairs?} pairs_ - The helper checking/returning note pair
     * @param {Game_SATBRules?} rules_ - The helper using the rule to chain note
     */
    $._init = function(battler, cache_, pairs_, rules_) {
        this._battler = battler;
        // Not making these as needed explicit dependecies' to simplify its uses
        this._cache = cache_ || new Game_SATBCache();
        this._pairs = pairs_ || new Game_SATBPairs(battler);
        this._rules = rules_ || new Game_SATBRules(this._pairs);
        //
    }; // $._init

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._updatedResult = function(note, argObj_) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedResult(note, argObj_);
        if (!$gameSystem.satbParam("_isCached")) return result;
        this._cache.updateResult(note, argObj_, result);
        return result;
        //
    }; // $._updatedResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._uncachedResult = function(note, argObj_) {
        if (this._rules.isAssociative(note)) {
            return this._associativeResult(note, argObj_);
        }
        return this._nonAssociativeResult(note, argObj_);
    }; // $._uncachedResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._associativeResult = function(note, argObj_) {
        var partResults = this._partResults(note, argObj_);
        var default = this._pairs.default(note, argObj_);
        return this._chainedResult(partResults, note, argObj_, default);
    }; // $._associativeResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {[*]} The chained results of all effective notetags parts
     */
    $._partResults = function(note, argObj_) {
        // Refers to reference tag NOTE_LIST_PART
        var priorities = this._rules.priorities(note);
        var resultFunc = this._partResult_.bind(this, note, argObj_);
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
    $._partResult_ = function(note, argObj_, part) {
        if (!$gameSystem.satbParam("_isCached")) {
            return this._updatedPartResult_(note, argObj_, part);
        }
        var cache = this._cache.partResult_(note, argObj_, part);
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        return this._updatedPartResult_(note, argObj_, part);
    }; // $._partResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._updatedPartResult_ = function(note, argObj_, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedPartResult_(note, argObj_, part);
        if (!$gameSystem.satbParam("_isCached")) return result;
        this._cache.updatePartResult(note, argObj_, part, result);
        return result;
        //
    }; // $._updatedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._uncachedPartResult_ = function(note, argObj_, part) {
        var list = this._pairFuncListPart(note, part);
        // The 1st datum in the part list must be the initial value of the part
        if (list.length <= 0) return undefined;
        return this._chainedResult(list, note, argObj_);
        //
    }; // $._uncachedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._nonAssociativeResult = function(note, argObj_) {
        var list = this._pairFuncList(note);
        var default = this._pairs.default(note, argObj_);
        return this._chainedResult(list, note, argObj_, default);
    }; // $._nonAssociativeResult

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {[PairFunc]} list - The effective notetag list to be chained
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @returns {*} The chained result from all effective notetags involved
     */
    $._chainedResult = function(list, note, argObj_, initVal_) {
        var chainedResultFunc = this._rules.chainResultFunc(note);
        return chainedResultFunc(list, note, argObj_, initVal_);
    }; // $._chainedResult

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._pairFuncList = function(note) {
        if (!$gameSystem.satbParam("_isCached")) {
            return this._updatedPairFuncList(note);
        }
        if (!this._cache.pairFuncList_(note)) return undefined;
        return this._updatedPairFuncList(note);
    }; // $._pairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._updatedPairFuncList = function(note) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedPairFuncList(note);
        if (!$gameSystem.satbParam("_isCached")) return list;
        this._cache.updatePairFuncList(note, list);
        return list;
        //
    }; // $._updatedPairFuncList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @returns {[PairFunc]} The list of functions of the effective notetags
     */
    $._uncachedPairFuncList = function(note) {
        // Refers to reference tag NOTE_LIST_PART
        return this._rules.priorities(note).reduce(function(list, part) {
            // The function's easy, simple and small enough to be inlined
            return list.concat(this._pairFuncListPart(note, part));
            //
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
    $._pairFuncListPart = function(note, part) {
        if (!$gameSystem.satbParam("_isCached")) {
            return return this._updatedPairFuncListPart(note, part);
        }
        if (!this._cache.pairFuncListPart_(note, part)) return undefined;
        return this._updatedPairFuncListPart(note, part);
    }; // $._pairFuncListPart

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._updatedPairFuncListPart = function(note, part) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedPairFuncListPart(note, part);
        if (!$gameSystem.satbParam("_isCached")) return list;
        this._cache.updatePairFuncListPart(note, part, list);
        return list;
        //
    }; // $._updatedPairFuncListPart

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective function list
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]} The list of functions of the notetag part involved
     */
    $._uncachedPairFuncListPart = function(note, part) {
        var func = this._pairs.pairFuncs.bind(this._pairs, note);
        return this._cache.partListData(part, this._battler).map(func);
    }; // $._uncachedPairFuncListPart

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBCache
 *      - Caches the effective notetag lists and their end results
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBCache.prototype, _SATB = SATB.Game_SATBCache = {};

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
    _SATB._ALL_EMPTY_CONTAINERS = function() {
        return _SATB._NOTES.reduce(function(containers, note) {
            containers[note] = {};
            return containers;
        }, {});
    }; // _SATB._ALL_EMPTY_CONTAINERS
    _SATB._MARKED_NOTE_CHANGE_FACTORS = function(marks) {
        return Object.keys(marks).filter(function(f) { return marks[f]; });
    }; // _SATB._MARKED_NOTE_CHANGE_FACTORS

    // Refers to reference tag NOTE_DATA_TYPES
    _SATB._FACTOR_DATA = {
        actor: function(battler) {
            return battler.isActor() ? [battler.actor()] : [];
        },
        enemy: function(battler) {
            return battler.isEnemy() ? [battler.enemy()] : [];
        },
        class: function(battler) {
            return battler.isActor() ? [battler.currentClass()] : [];
        },
        weapons: function(battler) {
            return battler.isActor() ? [battler.weapons()] : [];
        },
        armors: function(battler) {
            return battler.isActor() ? [battler.armors()] : [];
        },
        skills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            return battler.isEnemy() ? battler.enemy().actions.map(function(a) {
                return $dataSkills[a.skillId];
            }) : battler.isActor() ? battler.skills() : [];
            //
        },
        usableSkills: function(battler) {
            // It's just to play safe to assume battler other than actor/enemy
            if (battler.isActor()) return battler.usableSkills();
            if (!battler.isEnemy()) return [];
            return battler.enemy().actions.filter(function(act) {
                return battler.isActionValid(act);
            }).map(function(act) { return $dataSkills[act.skillId]; });
            //
        },
        items: function(battler) {
            return battler.isActor() ? $gameParty.items() : [];
        },
        usableItems: function(battler) {
            return battler.isActor() ? $gameParty.items().filter(function(i) {
                return battler.canUse(i);
            }) : [];
        },
        states: function(battler) { return battler.states() },
        latestSkillItem: function(battler) {
            return battler.lastSATBItem ? [battler.lastSATBItem.item] : [];
        },
        priority: function() { return [] },
        chainingRule: function() { return [] },
        result: function() { return [] }
    }; // _SATB._FACTOR_DATA
    //

    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = Object.keys(SATB.Game_System.new.FUNCS.notes);
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{[(**) -> *]}} _cachedLists: The mapping from a note to its notetag func
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{[(**) -> *]}}} _partLists: Mapping from note to its list part function
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
     */
    $.raiseChangeFactor = function(note, factor) {
        this.invalidateResultCache(note, factor);
        this.invalidatePairFuncListCache(note, factor);
        this._changeFactorMarks[note][factor] = false;
    }; // $.raiseChangeFactor

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
        delete this._partLists[note][part];
        delete this._cachedLists[note];
    }; // $.invalidatePairFuncListCache

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The cached result from all effective notetags involved
     */
    $.result_ = function(note, argObj_) {
        // An undefined key means the result shouldn't be and isn't cached
        var key = _SATB._NOTE_KEY(note, argObj_);
        return key && this._cachedResults[note][key];
        //
    }; // $.result_

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {DatumType} part - The note part to have its part result retrieved
     * @returns {*?} The cached result from this notetag part involved
     */
    $.partResult_ = function(note, argObj_, part) {
        // An undefined key means the part result shouldn't be and isn't cached
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
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncList_ = function(note) { return this._cachedLists[note]; };

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective list returned
     * @param {DatumType} part - Note part to have its effective list returned
     * @returns {[PairFunc]?} List of functions of effective notetags involved
     */
    $.pairFuncListPart_ = function(note, part) {
        return this._partLists[note][part];
    }; // $.pairFuncListPart_

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
        var raiseFunc = this.raiseChangeFactor.bind(this, note);
        this._raisedNoteChangeFactors(note).forEach(raiseFunc);
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - Note to have its marked change factors raised
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        var factors = _SATB._MARKED_NOTE_CHANGE_FACTORS(marks);
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        if (!this._hasUnknownChangeFactor || factors.length > 0) return factors;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return Object.keys(marks);
        //
    }; // $._raisedNoteChangeFactors

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPairs.prototype, _SATB = SATB.Game_SATBPairs = {};

    _SATB._IS_VALID_SUFFIX = function(note, suffix) {
        return _SATB._NOTE_TYPES[note].suffixes.indexOf(suffix) >= 0;
    }; // _SATB._IS_VALID_SUFFIX
    _SATB._PAIRS_ = function(note, datum_) {
        // Refers to reference tag NOTETAG_MULTI
        return datum_ && datum_.meta.satb[note];
        //
    }; // _SATB._PAIRS_

    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = {
        coreMax: function() {
            return SATB.params.core.coreMaxATBVal.call(this._battler);
        }
    }; // _SATB._DEFAULT_RESULTS
    //
    // The last argument must be the latest chained notetag value result
    _SATB._NOTE_ARG_OBJS = {
        coreMax: function(func, datum) {
            return func.bind(this._battler, datum, datum.meta.satb.datumType);
        };
    }; // _SATB._NOTE_ARG_OBJS
    _SATB._NOTE_FUNCS = {
        coreMax: function(content) {
            return new Function("datum", "datumType", "latestMax", content);
        };
    }; // _SATB._NOTE_FUNCS
    //
    _SATB._RESULT_TYPES = {
        boolean: function(result) { return result.toLowerCase() === "true"; },
        number: function(result) { return +result; },
        numberArray: function(result) {
            // Refers to reference tag NUMBER_ARRAY
            return result.split("_").map(function(r) { return +r; });
            //
        }
    }; // _SATB._RESULT_TYPES
    // Refers to reference tag NOTE_SUFFIX
    _SATB._SUFFIX_FUNCS = {
        cfg: function(noteType, resultType, entry) {
            return SATB.notes[noteType][entry];
        },
        val: function(noteType, resultType, entry) {
            var f = _SATB._RESULT_TYPES[resultType];
            return f ? f.bind(_SATB, entry) : function() { return entry; };
        },
        switch: function(noteType, resultType, entry) {
            return $gameSwitches.value.bind($gameSwitches, +entry);
        },
        event: function(noteType, resultType, entry) {
            return $gameTemp.reserveCommonEvent.bind($gameTemp, +entry);
        },
        var: function(noteType, resultType, entry) {
            return $gameVariables.value.bind($gameVariables, +entry);
        },
        // Function contents' not supposed to change frequently so it's ok here
        script: function(noteType, resultType, entry) {
            return _SATB._NOTE_FUNCS[noteType]($gameVariables.value(+entry));
        },
        eval: function(noteType, resultType, entry) {
            return _SATB._NOTE_FUNCS[noteType](entry);
        }
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
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The default result of the note
     */
    $.default = function(note, argObj_) {
        return _SATB._DEFAULT_RESULTS[note].call(this, argObj_);
    }; // $.default

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs retrieved
     * @param {Datum?} datum_ - The datum having the notetag involved
     * @returns {[PairFunc]} The list of unbound functions of the note involved
     */
    $.pairFuncs = function(note, datum_) {
        if (!datum_) return [];
        var pairs = datum_.meta.satb[note];
        if (!pairs) return [];
        var validPairs = pairs.filter(this._isValidPair.bind(this, note));
        return validPairs.map(this._pairFunc.bind(this, note, datum_));
    }; // $.pairFuncs

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {NoteType} note - The note to have its contents run
     * @param {PairFunc} pairFunc - The unbounded function notetag pair
     * @param {<T>?} latestChainedResult_ - The latest chained notetag result
     * @returns {<T>} The result of the notetag function involved
     */
    $.run = function(argObj_, note, pairFunc, latestChainedResult_) {
        // Using _NOTE_ARG_OBJS on wrong suffix will have the wrong context
        var unboundFunc = pairFunc.unboundFunc;
        if (!unboundFunc.canBind) return unboundFunc;
        var argObjFunc = _SATB._NOTE_ARG_OBJS[note].bind(this);
        var datum = pairFunc.datum;
        return argObjFunc(unboundFunc, datum, argObj_)(latestChainedResult_);
        //
    }; // $.run

    /**
     * Potential Hotspot/Pure Function
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pairs checked
     * @param {Pair?} pair_ - The suffix-entry pairs of the note involved
     * @returns {Boolean} The check result
     */
    $._isValidPair = function(note, pair_) {
        if (!pair_) return false;
        return pair_.entry1 && _SATB._IS_VALID_SUFFIX(note, pair_.suffix1);
    }; // $._isValidPair

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its pair function retrieved
     * @param {Datum} datum - The datum having the notetag involved
     * @param {Pair} pair - The suffix-entry pair of the note involved
     * @returns {PairFunc} Unbounded function referred by notetag pair
     */
    $._pairFunc = function(note, datum, pair) {
        // Refers to reference tag THIS_GAME_BATTLER
        var suffix = pair.suffix1;
        var noteFunc = _SATB._SUFFIX_FUNCS[suffix];
        var resultType = _SATB._NOTE_TYPES[note].result;
        return {
            canBind: _SATB._ARG_OBJ_SUFFIXES.indexOf(suffix) >= 0
            datum: datum,
            unboundFunc: noteFunc(note, resultType, pair.entry1)
        };
        //
    }; // $._pairFunc

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
    _SATB._CONCAT_ALL_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
        var runResult = this._pairs.run(argObj_, note, pairFunc, result);
        return result.concat(runResult); // concat can accept non Array arguments
    }; // _SATB._CONCAT_ALL_RESULT_FUNC
    _SATB._CONCAT_SOME_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
        var runResult = this._pairs.run(argObj_, note, pairFunc, result);
         // concat can accept non Array arguments
        var chainedResult = result.concat(runResult);
        //
        /** @todo Makes this much more effective and efficient */
        return chainedResult.every(function(r) {
            return r;
        }) ? chainedResult : chainedResult.map(function() { return null; });
        //
    }; // _SATB._CONCAT_SOME_RESULT_FUNC
    _SATB._MIX_ALL_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
        var runResult = this._pairs.run(argObj_, note, pairFunc, result);
        if (runResult) runResult.forEach(function(r) {
            var key = Object.keys(r)[0];
            if (key) result[key] = r[key];
        });
        return result;
    }; // _SATB._MIX_ALL_OBJ_RESULT_FUNC
    _SATB._MIX_SOME_OBJ_RESULT_FUNC = function(note, argObj_, result, pairFunc) {
        var runResult = this._pairs.run(argObj_, note, pairFunc, result);
        if (!runResult) return result;
        runResult.forEach(function(r) {
            var key = Object.keys(r)[0];
            if (key) result[key] = r[key];
        });
        var keys = Object.keys(result);
        /** @todo Makes this much more effective and efficient */
        if (keys.some(function(k) { return !result[k]; })) {
            keys.forEach(function(k) { result[k] = null; });
        }
        //
        return result;
    }; // _SATB._MIX_SOME_OBJ_RESULT_FUNC
    //
    _SATB._OPERATOR_RESULT_FUNC = function(operator) { // Potential Hotspot
        var content = [
            "var runResult = this._pairs.run(argObj_, note, pairFunc, result);",
            "return result " + operator + " runResult;"
        ].join("\n");
        return new Function("note", "argObj_", "result", "pairFunc", content);
    }; // _SATB._OPERATOR_RESULT_FUNC
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, argObj_, note) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default(note, argObj_);
        return this._pairs.run(argObj_, note, list[0])[0];
    }; // _SATB._FIRST_LIST_MONO_FUNC
    _SATB._LAST_LIST_MONO_FUNC = function(list, argObj_, note) {
     // Potential Hotspot
        if (list.length <= 0) return this._pairs.default(note, argObj_);
        var pairs = this._pairs.run(argObj_, note, list[list.length - 1]);
        return pairs[pairs.length - 1];
    }; // _SATB._LAST_LIST_MONO_FUNC
    //
    _SATB._MONO_RESULT_CHAINING_RULES = function(func) { // Potential Hotspot
        // It's understood that associativity means nothing when running a list
        return { concat: func, mixObj: func, operator: func };
        //
    }; // _SATB._MONO_RESULT_CHAINING_RULES
    _SATB._RESULT_CHAINING_RULE_FUNC = function(func) { // Potential Hotspot
        // The this pointer is Game_SATBRules.prototype
        return function(list, note, argObj_, initVal_) {
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
                    _SATB._CONCAT_ALL_RESULT_FUNC),
            isAssociative: true,
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_ALL_OBJ_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("&&"))
        },
        some: {
            concat: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._CONCAT_SOME_RESULT_FUNC),
            isAssociative: true,
            mixObj: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._MIX_SOME_OBJ_RESULT_FUNC),
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(
                    _SATB._OPERATOR_RESULT_FUNC("||"))
        },
        // Conforms with the chaining rule interface
        first: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._FIRST_LIST_MONO_FUNC),
        last: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._LAST_LIST_MONO_FUNC),
        //
    }; // _SATB._RESULT_CHAINING_RULES
    Object.keys(_SATB._IS_ASSOCIATIVE_OPERATORS).forEach(function(operator) {
        var func = _SATB._OPERATOR_RESULT_FUNC(operator)
        _SATB._RESULT_CHAINING_RULES[operator] = {
            isAssociative: _SATB._IS_ASSOCIATIVE_OPERATORS[operator],
            operator: _SATB._RESULT_CHAINING_RULE_FUNC(func)
        }; // _SATB._RESULT_CHAINING_RULES[operator]
    });
    _SATB._RUN_CHAINING_RULES = { // Potential Hotspot
        every: function(list) { return list; },
        first: function(list) { return [list[0]]; },
        last: function(list) { return [list[list.length - 1]]; }
    }; // _RUN_CHAINING_RULES

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
     * Potential Hotspot/Pure Function
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
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {([{*}, String, {*}?, *?]) -> *} Function chaining notetag list
     */
    $.chainResultFunc = function(note) {
        var chainingRule = this._chainingRule(note);
        var op = _SATB._RESULT_CHAINING_OPERATION[note];
        // Checks _SATB._RESULT_CHAINING_RULE_FUNC for details
        return _SATB._RESULT_CHAINING_RULES[chainingRule][op].bind(this);
        //
    }; // $.chainResultFunc

    /**
     * Potential Hotspot/Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {NoteType} note - The note to have its effective results chained
     * @returns {([{*}]) -> [{Boolean, {*}, }]} The function returning chained
     *                                          notetag list
     */
    $.chainedRunListFunc = function(note) {
        return _SATB._RUN_CHAINING_RULES[this._chainingRule(note)];
    }; // $.chainedRunListFunc

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
        if (isNaN(target)) return targetGroup.filter(function(target) {
            return targets.indexOf(target.name()) >= 0;
        });
        var idIndex = _SATB._TARGET_GROUPS[targetGroup];
        if (idIndex === _SATB._TARGET_ID) {
            return targetGroup.filter(function(target) {
                // targetGroup must only have actors for _SATB._TARGET_ID
                return targets.indexOf(target.actorId()) >= 0;
                //
            });
        } else if (idIndex === _SATB._TARGET_INDEX) {
            return targetGroup.filter(function(target, i) {
                return targets.indexOf(i) >= 0;
            });
        }
        return [];
        //
    }; // _SATB._FILTERED_TARGETS
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
        },
        deadActors: function() {
            return $gameActors._data.filter(function(a) { return a.isDead(); });
        },
        movableActors: function() {
            return $gameActors._data.filter(function(actor) {
                return actor.canMove();
            });
        }
    }; // _SATB._TARGET_TYPES

    _SATB._CMDS = ["coreMaxSATB"];
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
        var targets = _SATB._pluginCmdTargets.call(this, targetType, targets);
        // The function's easy, simple and small enough to be inlined
        targets.forEach(function(t) { t[cmd].apply(this, args); }, this);
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

/*============================================================================*/
