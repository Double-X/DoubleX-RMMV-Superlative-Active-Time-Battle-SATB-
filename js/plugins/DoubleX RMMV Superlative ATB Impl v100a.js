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

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for this plugin
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    SATB.DataManager = { orig: {}, new: {} };
    var _DM = SATB.DataManager.orig, _SATB = SATB.DataManager.new;
    _SATB.switchIds = {}, _SATB.varIds = {};
    // Refers to reference tag NOTE_STRUCTURE
    _SATB._REG_EXP_ID = " *(?:doublex +rmmv +)?satb +(\\w+)";
    _SATB._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SATB._REG_EXP_ID +
                " +(\\w+(?: +\\w+)*) *: +(\\w+(?: *, +\\w+)*) *>", "gmi"),
        evalStart: new RegExp("<" + _SATB._REG_EXP_ID + " *>", "gmi"),
        evalEnd: new RegExp("< *\/" + _SATB._REG_EXP_ID + " *>", "gmi")
        //
    }; // _SATB._REG_EXPS
    //
    _SATB._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _SATB.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v0.00a - v0.00a; Extended
        // Edited to read all notetags of this plugin as well
        return _DM.isDatabaseLoaded.apply(this, arguments) &&
                _SATB._isDatabaseLoaded.call(this);
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
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @enum @param {String} noteType - The type of the notetag to be loaded
     * @param {String} suffix - The currently inspected suffix in the notetag
     * @param {String} entry - The currently inspected entry in the notetag
     */
    _SATB.updateSwitchVarIds = function(datumType, noteType, suffix, entry) {
        // Refer to reference tag SWITCH_VAR
        if (suffix === "switch") return _SATB._updateIds.call(
                this, datumType, noteType, +entry, _SATB.switchIds);
        if (suffix !== "var") return;
        //
        _SATB._updateIds.call(this, datumType, noteType, +entry, _SATB.varIds);
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
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @param {{*}?} datum_ - The datum to have notetags loaded
     */
    _SATB._loadNote = function(datumType, datum_) {
        if (!datum_) return;
        var lines = datum_.note.split(/[\r\n]+/);
        // Storing datumType is to streamline the notetag datum type reading
        var satb = datum_.meta.satb = { datumType: datumType };
        //
        _SATB._loadEvalNote.call(this, datumType, satb, lines);
        lines.forEach(_SATB._loadBaseNote.bind(this, datumType, satb));
    }; // _SATB._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @param {{*}} satb - The datum plugin notetag container
     * @param {[String]} lines - The list of lines being scanned for notetags
     *                           to be loaded
     */
    _SATB._loadEvalNote = function(datumType, satb, lines) {
        // It's tolerable and more performant than any declarative counterpart
        var isEval = false, note = "", funcLines = [];
        lines.forEach(function(line) {
            if (line.match(_SATB._REG_EXPS.evalStart)) {
                isEval = true;
                note = RegExp.$1;
            } else if (line.match(_SATB._REG_EXPS.evalEnd)) {
                isEval = false;
                // Refers to reference tag NOTETAG_MULTI
                if (note !== RegExp.$1) return;
                satb[note] = (satb[note] || []).concat(_SATB._notePairs.call(
                        this, datumType, note, ["eval"],
                        [funcLines.join("\n")]));
                //
            } else if (isEval) funcLines.push(line);
        }, this);
        //
    }; //  _SATB._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @param {{*}} satb - The datum plugin notetag container
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SATB._loadBaseNote = function(datumType, satb, line) {
        // Refers to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SATB._REG_EXPS.base)) return;
        var note = RegExp.$1, suffixes = RegExp.$2, entries = RegExp.$3;
        satb[note] = (satb[note] || []).concat(_SATB._notePairs.call(this,
                datumType, note, suffixes.split(/ +/), entries.split(/ *, +/)));
        //
    }; // _SATB._loadBaseNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @enum @param {String} noteType - The type of the notetag to be loaded
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     * @returns {{String}} The suffix-entry pair mapping
     */
    _SATB._notePairs = function(datumType, noteType, suffixes, entries) {
        // So those excessive suffixes/entries will be discarded right here
        var l = Math.min(suffixes.length, entries.length);
        //
        // It's tolerable and more performant than any declarative counterpart
        for (var i = 0, pairs = {}; i < l; i++) {
            // Refers to reference tag MULTI_SUFFIX_ENTRY
            var count = i + 1, suffix = suffixes[i], entry = entries[i];
            pairs["suffix" + count] = suffix;
            pairs["entry" + count] = entry;
            //
            // Users changing the switch/var note map should update it manually
            _SATB.updateSwitchVarIds.call(
                    this, datumType, noteType, suffix, entry);
            //
        }
        return pairs;
        //
    }; // _SATB._notePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} datumType - Refers to reference tag NOTE_DATA_TYPES
     * @enum @param {String} noteType - The type of the notetag to be loaded
     * @param {Id} id - The id of the switch/variable used in the notetag
     * @param {{{[String]}}} ids - The notetag switch/variable id factor mapping
     */
    _SATB._updateIds = function(datumType, noteType, id, ids) {
        var notes = ids[id] = ids[id] || {};
        var factors = notes[noteType] = notes[noteType] || [];
        if (factors.indexOf(datumType) < 0) factors.concat(datumType);
    }; // _SATB._updateIds

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
    _SATB._IS_FUNC_PARAM = function(param) { return param[0] !== "_"; };
    _SATB._0_ARG_FUNC = function(funcContent) {
        return new Function(funcContent);
    };
    _SATB.FUNCS = {
        params: {
            IsCoreEnabled: _SATB._0_ARG_FUNC,
            coreBaseFillATBFrame: _SATB._0_ARG_FUNC,
            coreBaseFillATBSec: _SATB._0_ARG_FUNC,
            coreTurnATBTime: function(funcContent) {
                return new Function("baseFillATB", funcContent);
            },
            coreTurnATBAct: _SATB._0_ARG_FUNC,
            canCoreTurnOverflow: _SATB._0_ARG_FUNC,
            coreMaxATBVal: _SATB._0_ARG_FUNC
        },
        notes: {
            // Refer to reference tag NOTE_TYPE
            coreMax: function(funcContent) {
                return new Function("max", "datum", "datumType", funcContent);
            }
            //
        }
    };
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
        _coreMaxATBValNotePriority: "core"
    };
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
        _coreMaxATBValNotePriority: function() {
            /*var mems = BattleManager._phase ?
                    BattleManager.allBattleMembers() : $gameParty.members();*/
            BattleManager.satbMems().forEach(function(mem) {
                mem.raiseSATBNoteChangeFactor("coreMax", "priority");
            });
        }
    };

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

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} funcType - "params", "notes"
     */
    $.extractSATBFuncContents = function(funcType) {
        // params becomes Param and notes becomes Note
        var type = funcType.charAt(0).toUpperCase() + funcType.slice(1, -1);
        //
        Object.keys(this._satb[funcType]).forEach(
                _SATB["_extract" + type + "FuncContents"], this);
    }; // $.extractSATBFuncContents

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} param - The parameter name
     * @returns {String} The function content as the parameter value
     */
    $.satbParam = function(param) {
        return this._satb.params[_SATB._PARAM_MODULES[param]][param];
    }; // $.satbParam

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} param - The parameter name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - "switch", "var"
     * @param {Id?} id_ - The switch/variable id
     * @enum @param {[String]?} dataTypes_ - Refers to reference tag
     *                                       NOTE_DATA_TYPES
     */
    $.setSATBParam = function(param, funcContent, switchVar_, id_, dataTypes_) {
        var module = _SATB._PARAM_MODULES[param];
        this._satb.params[type][param] = funcContent;
        if (!_SATB._IS_FUNC_PARAM(param)) return;
        SATB.params[module][param] = _SATB._paramFunc.call(this, module, param);
        var func = _SATB._PARAM_UPDATES[param];
        if (func) func.call(this, switchVar_, id_, dataTypes_);
    }; // $.setSATBParam

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @returns {String} The notetag function content
     */
    $.satbNote = function(noteType, name) {
        return this._satb.notes[noteType][name];
    }; // $.satbNote

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @enum @param {String} noteType - The notetag type
     * @param {String} name - The notetag value name
     * @param {String} funcContent - The function content as the parameter value
     * @enum @param {String?} switchVar_ - "switch", "var"
     * @param {Id?} id_ - The switch/variable id
     * @enum @param {[String]?} dataTypes_ - Refers to reference tag
     *                                       NOTE_DATA_TYPES
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
     * Pure function
     * @since v0.00a @version v1.00b
     * @returns {{String}} The raw parameter name-value mapping
     */
    _SATB._rawParams = function() {
        // There's no need to cache it as _rawParams should only be called once
        var params = PluginManager.parameters(
                DoubleX_RMMV.Superlative_ATB_Parameters_File);
        Object.keys(params).forEach(function(param) {
            if (!_SATB._IS_FUNC_PARAM(param)) return;
            params[param] = _SATB._jsonParam.call(this, param, params[param]);
        });
        return params;
        //
    }; // _SATB._rawParams

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v1.00b @version v1.00b
     * @enum @param {String} param - The parameter name
     * @param {String} val - The raw parameter value string
     * @returns {String} The normalized parameter value string
     */
    _SATB._jsonParam = function(param, val) {
        if (!val) return val;
        try {
            return JSON.parse(val);
        } catch (err) {
            console.warn([
              "The value of the parameter " + param + " is",
              val,
              "Which should be entered via note rather than text",
              "The relevant stacktrace of DoubleX RMMV Superlative ATB is:",
              err.stack
            ].join("\n"));
            return val;
        }
    }; // _SATB._jsonParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{String}} params - The parameter name-value map
     * @enum @param {String} param - The parameter name
     */
    _SATB._storeParam = function(params, param) {
        this.setSATBParam(param, _SATB._param.call(this, param, params[param]));
    }; // _SATB._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} param - The parameter name
     * @param {{String}} val - The parameter value
     * @returns {String} The function contents as parameter values
     */
    _SATB._param = function(param, val) {
        // Refers to reference tag PARAMETERS_CONFIGURATIONS
        return val || _SATB._funcContent.call(
                this, SATB.params[_SATB._PARAM_MODULES[param]][param]);
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
     * @enum @param {String} type - The type of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNoteModule = function(type) {
        Object.keys(SATB.notes[type]).forEach(
                _SATB._storeNote.bind(this, type));
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @enum @param {String} type - The type of the note
     * @param {String} name - The name of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNote = function(type, name) {
        this._satb.notes[type][name] =
              _SATB._funcContent.call(this, SATB.notes[type][name]);
    }; // _SATB._storeNote

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v0.00a @version v0.00a
     * @param {(**) -> *} func - The function as the value of the configuration
     * @returns {String} The parameter function contents in configuration plugin
     */
    _SATB._funcContent = function(func) {
        // Only the function contents are stored in save files
        return func.toString().
                replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
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
         * @param {String} funcModule - The module of stored function content
         */
        _SATB["_extract" + type + "FuncContents"] = function(module) {
            Object.keys(this._satb[t][module]).forEach(
                    _SATB[func].bind(this, module));
        }; // _SATB["_extract" + type + "FuncContents"]
    })

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} module - The module of the stored function content
     * @enum @param {String} name - The name of the stored function content
     */
    _SATB._extractParamFuncContent = function(module, name) {
        SATB.params[module][name] =
                _SATB.FUNCS.params[name](this._satb.params[module][name]);
    }; // _SATB._extractParamFuncContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} type - The type of the stored function content
     * @param {String} name - The name of the stored function content
     */
    _SATB._extractNoteFuncContent = function(type, name) {
        SATB.notes[type][name] =
                _SATB.FUNCS.notes[type](this._satb.notes[type][name]);
    }; // _SATB._extractNoteFuncContent

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} noteType - The notetag type
     * @enum @param {String} switchVar - "switch", "var"
     * @param {Id} id - The switch/variable id
     * @enum @param {[String]} dataTypes - Refers to reference tag
     *                                     NOTE_DATA_TYPES
     */
    _SATB._storeUpdatedSwitchVarIds = function(noteType, switchVar, id, dataTypes_) {
        if (dataType_) _SATB._updateSwitchVarIds.call(
                this, noteType, switchVar_, id_, dataTypes_);
        // It's just to play safe as it's possible to de-register a switch/var
        _SATB._storeSwitchVarIds.call(this);
        //
    }; // _SATB._storeUpdatedSwitchVarIds

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} noteType - The notetag type
     * @enum @param {String} switchVar - "switch", "var"
     * @param {Id} id - The switch/variable id
     * @enum @param {[String]} dataTypes - Refers to reference tag
     *                                     NOTE_DATA_TYPES
     */
    _SATB._updateSwitchVarIds = function(noteType, switchVar, id, dataTypes) {
        if (dataTypes.length > 0) return dataTypes.forEach(function(dataType) {
            // The function's easy, simple and small enough to be inlined
            DM.updateSwitchVarIds.call(
                    DataManager, dataType, noteType, switchVar, id);
            //
        }, this);
        // Refer to reference tag SWITCH_VAR
        if (switchVar === "switch") return _SATB._eraseSwitchVarIds.call(
                this, noteType, id, DM.switchIds);
        if (switchVar !== "var") return;
        //
        _SATB._eraseSwitchVarIds.call(this, noteType, id, DM.varIds);
    }; // _SATB._updateSwitchVarIds

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} type - The notetag type
     * @param {Id} id - The switch/variable id
     * @enum @param {{{[String]}}} ids - The notetag switch/variable id factors
     */
    _SATB._eraseSwitchVarIds = function(type, id, ids) {
        if (ids[id]) delete ids[id][type];
    }; // _SATB._eraseSwitchVarIds

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._storeSwitchVarIds = function() {
        // It's better not to clone them as users can edit DM counterparts too
        this._satb.switchIds = DM.switchIds;
        this._satb.varIds = DM.varIds;
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
            _SATB._raiseChangeFactors.call(this, $gameSystem.satbParam(param)[id]);
            //
        }; // $.setValue

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {{[String]}?} noteFactors_ - The notes and factors to be
         *                                     raised by this id
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
       invalidateSATBNoteList: "invalidateListCache"
    };
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
     * @enum @param {{[String]}} noteFactors - Refers to reference tag
     *                                         NOTE_DATA_TYPES
     */
    $.raiseSATBChangeFactors = function(noteFactors) {
        Object.keys(noteFactors).forEach(function(note) {
            noteFactors[note].forEach(
                    this.raiseSATBNoteChangeFactor.bind(this, note));
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
        var pairs = pairs || new Game_SATBPairs(this);
        this._satb.notes = new Game_SATBNotes(
                this, new Game_SATBCache(), pairs, new Game_SATBRules(pairs));
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
        return result !== null && result !== undefined;
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
        "raisePartChangeFactors",
        "raiseChangeFactor",
        "invalidateResultCache",
        "invalidateListCache"
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
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $.result = function(note, argObj_) {
        if (!$gameSystem.satbParam("_isCached")) return this._updatedResult(
                note, argObj_);
        var cache = this._cache.result_(note, argObj_);
        // It's possible for a cached result to be intentionally false
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        //
        return this._updatedResult(note, argObj_);
    }; // $.result

    /**
     * Hotspot
     * @interface @since v0.00a @version v0.00a
     * @param {[String]} notes - The list of notes to have their contents run
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     */
    $.run = function(notes, argObj_) {
        notes.forEach(this._run.bind(this, argObj_));
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
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._updatedResult = function(note, argObj_) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedResult(note, argObj_);
        if (!$gameSystem.satbParam("_isCached")) return result;
        this._cache.updateResultCaches(note, argObj_, result);
        return result;
        //
    }; // $._updatedResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The chained result from all effective notetags involved
     */
    $._uncachedResult = function(note, argObj_) {
        var chainingRule = this._rules.chainingRule(note);
        return this[this._updatedResultFunc(chainingRule)](
                note, argObj_, chainingRule);
    }; // $._uncachedResult

    /**
     * Potential Hotspot/Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {String} The name of the chaining rule function to be used
     */
    $._updatedResultFunc = function(chainingRule) {
        return this._rules.isAssociative(chainingRule) ?
                "_associativeResult" : "_nonAssociativeResult";
    }; // $._updatedResultFunc

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {*} The chained result from all effective notetags involved
     */
    $._associativeResult = function(note, argObj_, chainingRule) {
        return this._chainedResult(this._partResults(
                 note, argObj_, chainingRule), note, argObj_, chainingRule,
                 "parts", this._pairs.default(note, argObj_));
    }; // $._associativeResult

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {[[]]*} The chained results of all effective notetags parts
     */
    $._partResults = function(note, argObj_, chainingRule) {
        // Refers to reference tag NOTE_LIST_PART
        return this._rules.priority(note).map(this._partResult_.bind(
                this, note, argObj_, chainingRule)).filter(
                _SATB.IS_VALID_RESULT);
        //
    }; // $._partResults

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._partResult_ = function(note, argObj_, chainingRule, part) {
        if (!$gameSystem.satbParam("_isCached")) {
            return this._updatedPartResult_(note, argObj_, chainingRule, part);
        }
        var cache = this._cache.partResult_(note, argObj_, part);
        // It's possible for a cached result to be intentionally false
        if (_SATB.IS_VALID_RESULT(cache)) return cache;
        //
        return this._updatedPartResult_(note, argObj_, chainingRule, part);
    }; // $._partResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._updatedPartResult_ = function(note, argObj_, chainingRule, part) {
        // Refers to reference tag NOTE_RESULT_CACHE
        var result =
                this._uncachedPartResult_(note, argObj_, chainingRule, part);
        if (!$gameSystem.satbParam("_isCached")) return result;
        this._cache.updatePartResultCaches(note, argObj_, part, result);
        return result;
        //
    }; // $._updatedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*?} The chained result from this effective notetags part
     */
    $._uncachedPartResult_ = function(note, argObj_, chainingRule, part) {
        var list = this._listPart(note, part);
        // The 1st datum in the part list must be the initial value of the part
        return list.length <= 0 ? undefined :
                this._chainedResult(list, note, argObj_, chainingRule, "list");
        //
    }; // $._uncachedPartResult_

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {*} The chained result from all effective notetags involved
     */
    $._nonAssociativeResult = function(note, argObj_, chainingRule) {
        return this._chainedResult(this._list(note), note, argObj_,
                chainingRule, "list", this._pairs.default(note, argObj_));
    }; // $._nonAssociativeResult

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {[{*}]} list - The effective notetag list to be chained
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} rule - The effective notetag result chaining rule
     * @enum @param {String} type - Type of the list to be chained(list/parts)
     * @param {*?} initVal_ - The initial result to chain the notetag list
     * @returns {*} The chained result from all effective notetags involved
     */
    $._chainedResult = function(list, note, argObj_, rule, type, initVal_) {
        return this._rules.chainResultFunc(
                note, rule, type)(list, note, argObj_, initVal_);
    }; // $._chainedResult

    /**
     * Hotspot
     * @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} note - The note to have its contents run
     */
    $._run = function(argObj_, note) {
        // Refers to reference tag RUN_DEFAULT_FIRST
        this._pairs.default(note, argObj_);
        //
        this._rules.chainedRunListFunc(this._rules.chainingRule(note))(
                this._list(note)).forEach(
                this._pairs.run.bind(this._pairs, argObj_, note));
    }; // $._run

    /**
     * Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._list = function(note) {
        if (!$gameSystem.satbParam("_isCached")) return this._updatedList(note);
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.list_(note) || this._updatedList(note);
        //
    }; // $._list

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedList = function(note) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedList(note);
        if (!$gameSystem.satbParam("_isCached")) return list;
        this._cache.updateListCaches(note, list);
        return list;
        //
    }; // $._updatedList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedList = function(note) {
        // Refers to reference tag NOTE_LIST_PART
        return this._rules.priority(note).reduce(function(list, part) {
            // The function's easy, simple and small enough to be inlined
            return list.concat(this._listPart(note, part));
            //
        }.bind(this), []);
        //
    }; // $._uncachedList

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._listPart = function(note, part) {
        if (!$gameSystem.satbParam("_isCached")) return this._updatedListPart(
                note, part);
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.listPart_(note, part) ||
                this._updatedListPart(note, part);
        //
    }; // $._listPart

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedListPart = function(note, part) {
        // Refers to reference tag NOTE_LIST_CACHE
        var list = this._uncachedListPart(note, part);
        if (!$gameSystem.satbParam("_isCached")) return list;
        this._cache.updatePartListCaches(note, part, list);
        return list;
        //
    }; // $._updatedListPart

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedListPart = function(note, part) {
        return this._cache.partListData(part, this._battler).map(
                this._pairs.validData.bind(this._pairs, note)).filter(
                this._pairs.hasPairs.bind(this._pairs, note));
    }; // $._uncachedListPart

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
        if (!argObj_) return note;
        // It's infeasible to cache the target so an empty key means not caching
        return argObj_.target ? undefined : JSON.stringify(argObj_);
        //
    }; // _SATB._NOTE_KEY
    _SATB._NOTE_PART_KEY = function(argObj_, part) { // Hotspot
        if (!argObj_) return part;
        // It's infeasible to cache the target so an empty key means not caching
        return argObj_.target ? undefined : part + JSON.stringify(argObj_);
        //
    }; // _SATB._NOTE_PART_KEY
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
    };
    //
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = Object.keys(SATB.Game_System.new.FUNCS.notes);
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{[]}} _cachedLists: The mapping from a note to its notetag list
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{[]}}} _partLists: The mapping from a note to its notetag list parts
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
     * @param {[String]} factors - The change factors to be marked for all notes
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
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseAllChangeFactors = function() {
        // They use separate containers so it must be called multiple times
        this._cachedLists = {};
        this._cachedResults = this._allEmptyContainers();
        this._partLists = this._allEmptyContainers();
        this._partResults = this._allEmptyContainers();
        this._changeFactorMarks = this._allEmptyContainers();
        //
    }; // $.raiseAllChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {[String]} factors - The list of change factors to be raised
     */
    $.raisePartChangeFactors = function(factors) {
        _SATB._NOTES.forEach(function(note) {
            // The function's easy, simple and small enough to be inlined
            factors.forEach(this.raiseChangeFactor.bind(this, note));
            //
        }, this);
    }; // $.raisePartChangeFactors

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its change factor raised
     */
    $.raiseChangeFactor = function(note, factor) {
        this.invalidateResultCache(note, factor);
        this.invalidateListCache(note, factor);
        this._changeFactorMarks[note][factor] = false;
    }; // $.raiseChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its part result cache invalidated
     * @param {String} part - The note part to have its result cache invalidated
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
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its part list cache invalidated
     * @param {String} part - The note part to have its list cache invalidated
     */
    $.invalidateListCache = function(note, part) {
        delete this._partLists[note][part];
        delete this._cachedLists[note];
    }; // $.invalidateListCache

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*?} The requested result from all effective notetags involved
     */
    $.result_ = function(note, argObj_) {
        // It's just to play safe to not pass an undefined key into the object
        var key = _SATB._NOTE_KEY(note, argObj_);
        return key && this._cachedResults[note][key];
        //
    }; // $.result_

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*?} The requested result from all effective notetags involved
     */
    $.partResult_ = function(note, argObj_, part) {
        // It's just to play safe to not pass an undefined key into the object
        var key = _SATB._NOTE_PART_KEY(argObj_, part);
        return key && this._partResults[note][key];
        //
    }; // $.partResult_

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} part - The note part to have its part result retrieved
     * @param {*} result - The effective notetag list part result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updatePartResultCaches = function(note, argObj_, part, result) {
        var key = _SATB._NOTE_PART_KEY(argObj_, part);
        if (key) this._partResults[note][key] = result;
    }; // $.updatePartResultCaches

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {*} result - The effective notetag list result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updateResultCaches = function(note, argObj_, result) {
        var key = _SATB._NOTE_KEY(note, argObj_);
        if (key) this._cachedResults[note][key] = result;
    }; // $.updateResultCaches

    /**
     * Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]?} The list of data having the effective notetags involved
     */
    $.list_ = function(note) { return this._cachedLists[note]; };

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]?} The list of data having the effective notetags involved
     */
    $.listPart_ = function(note, part) { return this._partLists[note][part]; };

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @param {[{*}]} partList The list of data having the notetags involved
     */
    $.updatePartListCaches = function(note, part, partList) {
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][part] = partList; // partList.clone();
        //
    }; // $.updatePartListCaches

    /**
     * Potential Hotspot/Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {[{*}]} list - The list of data having the notetags involved
     */
    $.updateListCaches = function(note, list) {
        // list's supposed to be immutable so it's safe here
        this._cachedLists[note] = list; // list.clone();
        //
    }; // $.updateListCaches

    /**
     * Potential Hotspot/Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} part - The note part to have its effective list returned
     * @param {Game_Battler} battler - The battler with effective notetag list
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $.partListData = function(part, battler) {
        return _SATB._FACTOR_DATA[part](battler);
    }; // $.partListData

    /**
     * Potential Hotspot/Pure Function
     * @since v0.00a @version v0.00a
     * @returns {{{*}}} The requested mapping from a note to its container
     */
    $._allEmptyContainers = function() {
        // The function's easy, simple and small enough to be inlined
        return this._allNoteContainers(function() { return {}; });
        //
    }; // $._allEmptyContainers

    /**
     * Potential Hotspot/Pure Function
     * @since v0.00a @version v0.00a
     * @param {()} noteContainerFunc - The function returning a container
     * @returns {{{*}}} The mapping of each note to its container
     */
    $._allNoteContainers = function(noteContainerFunc) {
        // The function's easy, simple and small enough to be inlined
        return _SATB._NOTES.reduce(function(containers, note) {
            // The container must be created here to ensure its independence
            containers[note] = noteContainerFunc();
            //
            return containers;
        }, {});
        //
    }; // $._allNoteContainers

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        _SATB._NOTES.forEach(this._markNoteChangeFactor.bind(this, factor));
    }; // $._markChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} factor - The change factor to be marked for the note
     * @param {String} note - The note to have its change factor marked
     */
    $._markNoteChangeFactor = function(factor, note) {
        this._changeFactorMarks[note][factor] = true;
    }; // $._markNoteChangeFactor

    /**
     * Potential Hotspot/Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its marked change factors raised
     */
    $._raiseMarkedNoteChangeFactors = function(note) {
        this._raisedNoteChangeFactors(note).forEach(
                this.raiseChangeFactor.bind(this, note));
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its marked change factors raised
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        var factors = this._markedNoteChangeFactors(marks);
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        if (!this._hasUnknownChangeFactor || factors.length > 0) return factors;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return Object.keys(marks);
        //
    }; // $._raisedNoteChangeFactors

    /**
     * Potential Hotspot/Pure Function
     * @since v0.00a @version v0.00a
     * @param {{Boolean}} marks - The map of all the note change factor marks
     */
    $._markedNoteChangeFactors = function(marks) {
        // The function's easy, simple and small enough to be inlined
        return Object.keys(marks).filter(function(f) { return marks[f]; });
        //
    }; // $._markedNoteChangeFactors

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBPairs.prototype, _SATB = SATB.Game_SATBPairs = {};
    // Refers to reference tag NOTE_SUFFIX
    _SATB._FUNCS = {
        cfg: function(noteType, resultType, entry) {
            return SATB.notes[noteType][entry];
        },
        val: function(noteType, resultType, entry) {
            var f = _SATB._RESULTS[resultType];
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
        script: function(noteType, resultType,  entry) {
            return GB.FUNCS[noteType]($gameVariables.value(+entry));
        },
        eval: function(noteType, resultType, entry) {
            return GB.FUNCS[noteType](entry);
        }
        //
    }; // _SATB._FUNCS
    //
    _SATB._RESULTS = {
        boolean: function(result) { return result.toLowerCase() === "true"; },
        number: function(result) { return +result; },
        numberArray: function(result) {
            // Refers to reference tag NUMBER_ARRAY
            return result.split("_").map(function(r) { return +r; });
            //
        }
    }; // _SATB._RESULTS
    // Refers to reference tag NOTE_SUFFIX
    _SATB._SUFFIXES = {
        run: ["cfg", "event", "script", "eval"],
        result: ["cfg", "val", "switch", "var", "script", "eval"]
    };
    //
    _SATB._NUMBER_RESULT_NOTES = {
        hasPair: "_hasPair",
        pairFunc: "_pairFunc",
        result: "number",
        suffixes: _SATB._SUFFIXES.result
    };
    _SATB._BASE_RUN_NOTES = {
        hasPair: "_hasPair",
        pairFunc: "_pairFunc",
        suffixes: _SATB._SUFFIXES.run
    };
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = { coreMax: _SATB._NUMBER_RESULT_NOTES };
    //
    // Refers to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = {
        coreMax: function() {
            return SATB.params.core.coreMaxATBVal.call(this._battler);
        }
    };
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
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @returns {*} The default result of the note
     */
    $.default = function(note, argObj_) {
        return _SATB._DEFAULT_RESULTS[note].call(this, argObj_);
    }; // $.default

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum_ - The datum having the notetag involved
     * @returns {{*}?} The datum having the notetag involved
     */
    $.validData = function(note, datum_) {
        if (!datum_) return datum_;
        var satb = datum_.meta.satb, pairs = satb[note];
        satb[note] = pairs && pairs.filter(
                this[_SATB._NOTES[note].hasPair].bind(this, note));
        return datum_;
    }; // $.validData

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum_ - The datum having the notetag involved
     * @returns {Boolean} The check result
     */
    $.hasPairs = function(note, datum_) {
        var pairs = this._pairs_(note, datum_);
        return pairs && pairs.length > 0;
    }; // $.hasPairs

    /**
     * @interface @since v0.00a @version v0.00a
     * @param {{*}?} argObj_ - The arguments needed for the notetags involved
     * @param {String} note - The note to have its contents run
     * @param {{*}} datum - The datum having the note to have its contents run
     * @returns {[*]} The result of the notetag function involved
     */
    $.run = function(argObj_, note, datum) {
        var results = this.pairs(note, datum).map(function(func) {
            return func(datum, argObj);
        });
        if (_SATB._NOTES[note].result !== "numberArray") return results;
        return results.reduce(function(list, result) {
            return list.concat(result);
        }, []);
    }; // $.run

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum_ - The datum having the notetag involved
     * @returns {[(Id, {*}, Game_Battler?, Number?) -> *]} Functions referred
     *                                                    by the notetag pairs
     */
    $.pairs = function(note, datum_) {
        var pairs = this._pairs_(note, datum_);
        return pairs ? pairs.map(
                this[_SATB._NOTES[note].pairFunc].bind(this, note)) : [];
    }; // $.pairs

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}?} pair_ - The suffix-entry pairs of the note involved
     * @returns {Boolean} The check result
     */
    $._hasPair = function(note, pair_) {
        if (!pair_) return false;
        return pair_.entry1 && this._isValidSuffix(note, pair_.suffix1);
    }; // $._hasPair

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {String} suffix - The notetag suffix to be checked against
     * @returns {Boolean} The check result
     */
    $._isValidSuffix = function(note, suffix) {
        return _SATB._NOTES[note].suffixes.indexOf(suffix) >= 0;
    }; // $._isValidSuffix

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have their contents run
     * @param {{*}?} datum_ - The datum having the notetag involved
     * @returns {[{String}?]} The suffix-entry pairs of the note involved
     */
    $._pairs_ = function(note, datum_) {
        // Refers to reference tag NOTETAG_MULTI
        return datum_ && datum_.meta.satb[note];
        //
    }; // $._pairs_

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}} pairs - The suffix-entry pairsof the note involved
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function referred
     *                                                  by the notetag pairs
     */
    $._pairFunc = function(note, pair) {
        // Refers to reference tag THIS_GAME_BATTLER
        return _SATB._FUNCS[pair.suffix1](
                _SATB._NOTES[note].result, pair.entry1).bind(this._battler);
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
    _SATB._CHAINED_RESULT_FUNC = {
        // The control coupling's to simplify the use of these functions
        concat: function(isSome) {
            return new Function("chainedResult", "result", isSome ? [
                "var cr = chainedResult.concat(result);",
                /** @todo Makes this much more effective and efficient */
                "return cr.every(function(r) { return r; }) ? ",
                "        cr : cr.map(function() { return null; });"
                //
            ].join("\n") : "return chainedResult.concat(result);");
        },
        mixObject: function(isSome) {
            return new Function("chainedResult", "result", isSome ? [
                "if (!result) return chainedResult;",
                "result.forEach(function(r) {",
                "    var key = Object.keys(r)[0];",
                "    if (key) chainedResult[key] = r[key];",
                "});",
                "var keys = Object.keys(chainedResult);",
                /** @todo Makes this much more effective and efficient */
                "if (keys.some(function(k) { return !chainedResult[k]; })) {",
                "    keys.forEach(function(k) { chainedResult[k] = null; });",
                "}",
                //
                "return chainedResult;"
            ].join("\n") : [
                "if (result) result.forEach(function(r) {",
                "    var key = Object.keys(r)[0];",
                "    if (key) chainedResult[key] = r[key];",
                "});",
                "return chainedResult;"
            ].join("\n"));
        },
        //
        operator: function(operator) {
            return new Function("chainedResult", "result", [
                "return chainedResult " + operator + " result.reduce(function(cr, r) {",
                "    return cr " + operator + "r;",
                "});"
            ].join("\n"));
        }
    };
    _SATB._CHAINED_RESULT_FUNCS = {
        every: {
            concat: _SATB._CHAINED_RESULT_FUNC.concat(false),
            mixObject: _SATB._CHAINED_RESULT_FUNC.mixObject(false),
            operator: _SATB._CHAINED_RESULT_FUNC.operator("&&")
        },
        some: {
            concat: _SATB._CHAINED_RESULT_FUNC.concat(true),
            mixObject: _SATB._CHAINED_RESULT_FUNC.mixObject(true),
            operator: _SATB._CHAINED_RESULT_FUNC.operator("||")
        }
    };
    // Refers to reference tag NOTE_OPERATORS
    ["+", "*", "-", "/", "%", "="].forEach(function(operator) {
        _SATB._CHAINED_RESULT_FUNCS[operator] = {
            operator: _SATB._CHAINED_RESULT_FUNC.operator(operator)
        };
    });
    //
    _SATB._NOTE_CHAINING_RULES = { coreMax: "_coreMaxATBValNoteChainingRule" };
    _SATB._NOTE_PRIORITIES = { coreMax: "_coreMaxATBValNotePriority" };
    // Refers to reference tag DEFAULT_CHAINING_RULE_FIRST
    _SATB._DEFAULT_CHAINING_RULE = "first";
    //
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, argObj, note) {
        if (list.length <= 0) return this._pairs.default(note, argObj);
        return this._pairs.run(argObj, note, list[0])[0];
    };
    _SATB._LAST_LIST_MONO_FUNC = function(list, argObj, note) {
        if (list.length <= 0) return this._pairs.default(note, argObj);
        var pairs = this._pairs.run(argObj, note, list[list.length - 1]);
        return pairs[pairs.length - 1];
    };
    //
    // Refers to reference tag NOTE_TYPE
    _SATB._NOTES = {
        coreMax: "operator"
    };
    //
    _SATB._RESULT_CHAINING_RULE_FUNC = function(list, note, func, initialResult) {
        if (GSATBN.IS_VALID_RESULT(initialResult)) {
            // The initial value of concat must be an Array
            if (_SATB._NOTES[note] === "concat") return list.reduce(func, []);
            //
            return list.reduce(func);
        }
        return list.reduce(func, initialResult);
    };
    _SATB._RESULT_CHAINING_RULE_FUNCS = function(rule, type) {
        var func = _SATB._CHAINED_RESULT_FUNCS[rule][type];
        return {
            // The this pointer is Game_SATBRules.prototype
            list: function(list, skillId, note, target, value, initialResult) {
                // The only important invariant is the pair execution order
                return _SATB._RESULT_CHAINING_RULE_FUNC(list.map(function(datum) {
                    return this._pairs.run(skillId, note, datum, target, value);
                }, this), note, func, initialResult);
                //
            },
            //
            // The function signature must be consistent to keep the API sane
            parts: function(list, skillId, note, target, value, initialResult) {
                return _SATB._RESULT_CHAINING_RULE_FUNC(
                        list, note, func, initialResult);
            }
            //
        }
    };
    _SATB._MONO_RESULT_CHAINING_RULES = function(func) {
        var listParts = { list: func, parts: func };
        return { concat: listParts, mixObject: listParts, operator: listParts };
    };
    _SATB._RESULT_CHAINING_RULES = {
        every: {
            concat: _SATB._RESULT_CHAINING_RULE_FUNCS("every", "concat"),
            isAssociative: true,
            mixObject: _SATB._RESULT_CHAINING_RULE_FUNCS("every", "mixObject"),
            operator: _SATB._RESULT_CHAINING_RULE_FUNCS("every", "operator")
        },
        some: {
            concat: _SATB._RESULT_CHAINING_RULE_FUNCS("some", "concat"),
            isAssociative: true,
            mixObject: _SATB._RESULT_CHAINING_RULE_FUNCS("some", "mixObject"),
            operator: _SATB._RESULT_CHAINING_RULE_FUNCS("some", "operator")
        },
        "+": {
            isAssociative: true,
            operator: _SATB._RESULT_CHAINING_RULE_FUNCS("+", "operator")
        },
        "*": {
            isAssociative: true,
            operator: _SATB._RESULT_CHAINING_RULE_FUNCS("*", "operator")
        },
        "-": { operator: _SATB._RESULT_CHAINING_RULE_FUNCS("-", "operator") },
        "/": { operator: _SATB._RESULT_CHAINING_RULE_FUNCS("/", "operator") },
        "%": { operator: _SATB._RESULT_CHAINING_RULE_FUNCS("%", "operator") },
        // = is intended for unintended uses so it shouldn't be associative
        "=": { operator: _SATB._RESULT_CHAINING_RULE_FUNCS("=", "operator") },
        //
        // Conforms with the chaining rule interface
        first: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._FIRST_LIST_MONO_FUNC),
        last: _SATB._MONO_RESULT_CHAINING_RULES(_SATB._LAST_LIST_MONO_FUNC),
        //
    };
    _SATB._RUN_CHAINING_RULES = {
        every: function(list) { return list; },
        first: function(list) { return [list[0]]; },
        last: function(list) { return [list[list.length - 1]]; }
    };

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
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} chainingRule - The rule to chain effective notetag list
     * @returns {Boolean} The check result
     */
    $.isAssociative = function(chainingRule) {
        // It's understood that associativity means nothing when running a list
        return _SATB._RESULT_CHAINING_RULES[chainingRule].isAssociative;
        //
    }; // $.isAssociative

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective results chained
     * @param {String} rule - The rule to chain the effective notetag list
     * @enum @param {String} type - Type of the list to be chained(list/parts)
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function chaining
     *                                                  the notetag list
     */
    $.chainResultFunc = function(note, rule, type) {
        return _SATB._RESULT_CHAINING_RULES[rule][_SATB._NOTES[note]][type].
                bind(this);
    }; // $.chainResultFunc

    /**
     * Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {String} The effective notetag chaining rule parameter value
     */
    $.chainingRule = function(note) {
        // Refers to reference tag THIS_GAME_BATTLER
        return $gameSystem.satbParam(_SATB._NOTE_CHAINING_RULES[note]) ||
                _SATB._DEFAULT_CHAINING_RULE;
        //
    }; // $._chainingRule

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} rule - The rule to chain the effective notetag list
     * @returns {([{*}]) -> [{*}]} The function returning chained notetag list
     */
    $.chainedRunListFunc = function(rule) {
        return _SATB._RUN_CHAINING_RULES[rule];
    }; // $.chainedRunListFunc

    /**
     * Potential Hotspot/Nullipotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @returns {[String]} The data type priority queue parameter value
     */
    $.priority = function(note) {
        // Refers to reference tag NOTE_DATA_TYPES and THIS_GAME_BATTLER
        return $gameSystem.satbParam(_SATB._NOTE_PRIORITIES[note]);
        //
    }; // $.priority

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
    _SATB._CMDS = ["coreMaxSATB"];

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
     * @enum @param {String} cmd - The plugin command name
     * @param {[*]} args - The plugin command arguments
     */
    _SATB._pluginCmd = function(cmd, args) {
        if (!_SATB._isPluginCmd.call(this, cmd)) return;
        _SATB._usePluginCmd.call(this, args);
    }; // _SATB._pluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} cmd - The plugin command name
     * @returns {Boolean} The check result
     */
    _SATB._isPluginCmd = function(cmd) {
        return _SATB._CMDS.indexOf(cmd) >= 0;
    }; // _SATB._isPluginCmd

    /**
     * Script call's just another way of using plugin commands
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @enum @param {String} cmd - The plugin command name
     * @param {[*]} args - The plugin command arguments
     */
    _SATB._usePluginCmd = function(cmd, args) {
        // The 1st and 2nd arguments must always be the target type and target
        var targetType = args.shift(), target = args.shift();
        //
        var targets = _SATB._pluginCmdTargets.call(this, targetType, target);
        targets.forEach(function(t) { t[cmd].apply(this, args); }, this);
    }; // _SATB._usePluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} targetType - Refer to reference tag
     *                                    PLUGIN_CMD_TARGET_TYPE
     * @param {String} target - Refer to reference tag PLUGIN_CMD_TARGET
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdTargets = function(targetType, target) {
        return _SATB._pluginCmdFilteredTargets.call(this,
                _SATB._pluginCmdRawTargets.call(this, targetType), target);
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @enum @param {String} targetType - Refer to reference tag
     *                                    PLUGIN_CMD_TARGET_TYPE
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdRawTargets = function(targetType) {
        switch (targetType) {
            // Refers to reference tag PLUGIN_CMD_TARGET_TYPE
            case "allParty": return $gameParty.members();
            case "aliveParty": return $gameParty.aliveMembers();
            case "deadParty": return $gameParty.deadMembers();
            case "movableParty": return $gameParty.movableMembers();
            case "allTroop": return $gameTroop.members();
            case "aliveTroop": return $gameTroop.aliveMembers();
            case "deadTroop": return $gameTroop.deadMembers();
            case "movableTroop": return $gameTroop.movableMembers();
            case "allActors": return $gameActors._data;
            case "aliveActors": return $gameActors._data.filter(function(a) {
                return a.isAlive();
            });
            case "deadActors": return $gameActors._data.filter(function(actor) {
                return actor.isDead();
            });
            case "movableActors": return $gameActors._data.filter(function(a) {
                return a.canMove();
            });
            default: return [];
            //
        }
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {[Game_Battler]} targets - The battlers to be filtered from
     * @param {String} target - Refer to reference tag PLUGIN_CMD_TARGET
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdFilteredTargets = function(targets, target) {
        // Refers to reference tag PLUGIN_CMD_TARGET
        if (!isNaN(target)) return [targets[+target]];
        return targets.filter(function(t) { return t.name() === target; });
        //
    }; // _SATB._pluginCmdFilteredTargets

})(DoubleX_RMMV.SATB);

/*============================================================================*/
