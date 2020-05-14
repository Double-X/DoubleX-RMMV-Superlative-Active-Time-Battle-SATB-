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
// These classes should be private and used by Game_SATBNotes only
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
    // Refer to reference tag NOTE_STRUCTURE
    _SATB._REG_EXP_ID = " *(?:doublex +rmmv +)?satb +(\\w+)";
    _SATB._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SATB._REG_EXP_ID +
                " +(\\w+(?: +\\w+)*) *: +(\\w+(?: *, +\\w+)*) *>", "gmi"),
        evalStart: new RegExp("<" + _SATB._REG_EXP_ID + " *>", "gmi"),
        evalEnd: new RegExp("< *\/" + _SATB._REG_EXP_ID + " *>", "gmi")
        //
    };
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
        _SATB._data.call(this).forEach(_SATB._loadNote, this);
    }; // _SATB._loadAllNotes

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @returns {[{*}]} The list of data to have notetags loaded
     */
    _SATB._data = function() {
        // The function's easy, simple and small enough to be inlined
        return [
            $dataActors,
            $dataEnemies,
            $dataClasses,
            $dataWeapons,
            $dataArmors,
            $dataStates,
            $dataSkills
        ].reduce(function(allData, data) {
            return allData.concat(data.filter(function(d) { return d; }));
        }, []);
        //
    }; // _SATB._data

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{*}} datum - The datum to have notetags loaded
     */
    _SATB._loadNote = function(datum) {
        // Script call/plugin command
        var lines = datum.note.split(/[\r\n]+/);
        _SATB._loadEvalNote.call(this, datum.meta.satb = {}, lines);
        lines.forEach(_SATB._loadBaseNote.bind(this, datum.meta.satb));
        //
    }; // _SATB._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{{String}}} satb - The loaded note values
     * @param {[String]} lines - The list of lines being scanned for notetags
     *                           to be loaded
     */
    _SATB._loadEvalNote = function(satb, lines) {
        // It's tolerable and more performant than any declarative counterpart
        var isEval = false, type = "", funcLines = [];
        lines.forEach(function(line) {
            if (line.match(_SATB._REG_EXPS.evalStart)) {
                isEval = true;
                type = RegExp.$1;
            } else if (line.match(_SATB._REG_EXPS.evalEnd)) {
                isEval = false;
                // Refer to reference tag NOTETAG_MULTI
                if (type !== RegExp.$1 || satb[type]) return;
                satb[type] = (satb[type] || []).concat(_SATB._notePairs.call(
                        this, ["eval"], [funcLines.join("\n")]));
                //
            } else if (isEval) funcLines.push(line);
        }, this);
        //
    }; //  _SATB._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {{{String}}} satb - The loaded note values
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SATB._loadBaseNote = function(satb, line) {
        // Refer to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SATB._REG_EXPS.base)) return;
        var type = RegExp.$1, suffixes = RegExp.$2, entries = RegExp.$3;
        satb[type] = (satb[type] || []).concat(_SATB._notePairs.call(
                this, suffixes.split(/ +/), entries.split(/ *, +/)));
        //
    }; // _SATB._loadBaseNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     * @returns {{String}} The suffix-entry pair mapping
     */
    _SATB._notePairs = function(suffixes, entries) {
        // So those excessive suffixes/entries will be discarded right here
        var l = Math.min(suffixes.length, entries.length);
        //
        // It's tolerable and more performant than any declarative counterpart
        for (var i = 0, pairs = {}; i < l; i++) {
            // Refer to reference tag MULTI_SUFFIX_ENTRY
            var count = i + 1;
            pairs["suffix" + count] = suffixes[i];
            pairs["entry" + count] = entries[i];
            //
        }
        return pairs;
        //
    }; // _SATB._notePairs

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
    var $ = Game_System.prototype;
    _SATB._0_ARG_FUNC = function(funcContent) {
        return new Function(funcContent);
    };
    _SATB._FUNCS = {
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
            coreMax: function(funcContent) {
                return new Function("max", "datum", funcContent);
            }
        }
    };
    _SATB._IS_FUNC_PARAM = function(param) { return param[0] !== "_"; };
    _SATB._PARAM_MODULE = {
        IsCoreEnabled: "core",
        coreBaseFillATBFrame: "core",
        coreBaseFillATBSec: "core",
        coreTurnATBTime: "core",
        coreTurnATBAct: "core",
        canCoreTurnOverflow: "core",
        coreMaxATBVal: "core"
    }

    _GS.initialize = $.initialize;
    _SATB.initialize = $.initialize = function() { // v0.00a - v0.00a; Extended
        _GS.initialize.apply(this, arguments);
        _SATB._init.call(this); // Added to setup parameters/notetags
    }; // $.initialize

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{{*}}} _satb: The container of all other new variables
    //                {{*}} params: The container of all parameter values
    //                {{*}} notes: The container of all notetag function content

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} funcType - The params/notes label
     */
    $.extractSATBFuncContents = function(funcType) {
        Object.keys(this._satb[funcType]).forEach(
                _SATB._extractFuncTypeContent.bind(this, funcType));
    }; // $.extractSATBFuncContents

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        _SATB._initContainers.call(this);
        _SATB._storeParams.call(this);
        _SATB._storeNotes.call(this);
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
                DoubleX_RMMV.Superlative_ATB_Params_File);
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
     * @param {String} param - The parameter name
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
     * @param {String} param - The parameter name
     */
    _SATB._storeParam = function(params, param) {
        var type = _SATB._PARAM_MODULE[param];
        this._satb.params[type][param] = _SATB._param.call(this, params, param);
        if (!_SATB._IS_FUNC_PARAM(param)) return;
        SATB.params[type][param] =
                _SATB._func.call(this, "params", type, param);
    }; // _SATB._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {{String}} params - The parameter name-value map
     * @param {String} param - The parameter name
     * @returns {String} The function contents as parameter values
     */
    _SATB._param = function(params, param) {
        // Refer to reference tag PARAMETERS_CONFIGURATIONS
        return params[param] || _SATB._funcContent.call(
                this, SATB.params[_SATB._PARAM_MODULE[param]][param]);
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
     * @param {String} type - The type of the note
     * @since v0.00a @version v0.00a
     */
    _SATB._storeNoteModule = function(type) {
        Object.keys(SATB.notes).forEach(_SATB._storeNote.bind(this, type));
    }; // _SATB._storeNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {String} type - The type of the note
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
     * @param {()} func - The function as the value of the configuration
     * @returns {String} The parameters in the configuration plugin
     */
    _SATB._funcContent = function(func) {
        // Only the function contents are stored in save files
        return func.toString().
                replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
        //
    }; // _SATB._funcContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} funcType - The params/notes label
     * @param {String} funcModule - The module of the stored function content
     */
    _SATB._extractFuncTypeContent = function(funcType, funcModule) {
        Object.keys(this._satb[funcType][funcModule]).forEach(
                _SATB._extractFuncContent.bind(this, funcType, funcModule));
    }; // _SATB._extractFuncTypeContent

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} funcType - The params/notes label
     * @param {String} funcModule - The module of the stored function content
     * @param {String} funcName - The name of the stored function content
     */
    _SATB._extractFuncContent = function(funcType, funcModule, funcName) {
        SATB[funcType][funcModule][funcName] =
                _SATB._func(funcType, funcModule, funcName);
    }; // _SATB._extractFuncContent

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v0.00a @version v0.00a
     * @param {String} funcType - The params/notes label
     * @param {String} funcModule - The module of the stored function content
     * @param {String} funcName - The name of the stored function content
     * @returns {(**) -> *} The function with the stored content
     */
    _SATB._func = function(funcType, funcModule, funcName) {
        var funcContent = this._satb[funcType][funcModule][funcName];
        if (funcType === "params") {
            return _SATB._FUNCS.params[funcName](funcContent);
        }
        return _SATB._FUNCS.notes[funcModule](funcContent);
    }; // _SATB._func

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Switches/Game_Variables
 *      - Raises the note change factors linked to the game switches/variables
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var classes = {
        Game_Switches: { proto: Game_Switches.prototype, param: "_switchIds" },
        Game_Variables: { proto: Game_Variables.prototype, param: "_varIds" }
    };
    Object.keys(classes).forEach(function(klass) {

        SATB[klass] = { orig: {}, new: {} };
        var _GSV = SATB[klass].orig, _SATB = SATB[klass].new;
        var $ = classes[klass].proto, param = classes[klass].param;

        _GSV.setValue = $.setValue;
        _SATB.setValue = $.setValue = function(id, val) {
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
         * @param {Id} id - The id to have its involved change factors raised
         */
        _SATB._raiseChangeFactors = function(id) {
            var ids = SATB.params[param]();
            // Emphasizes the differences between the Array and Object forms
            if (Array.isArray(ids)) {
                return _SATB._raiseAllChangeFactors.call(this, id, ids);
            }
            _SATB._raiseNoteChangeFactors.call(this, ids[id]);
            //
        }; // _SATB._raiseChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {Id} id - The id to have its involved change factors raised
         * @param {[Id]} ids - The list of ids used by this plugin
         */
        _SATB._raiseAllChangeFactors = function(id, ids) {
            if (ids.indexOf(id) >= 0) $gameParty.members().forEach(function(m) {
                m.raiseAllSATBNoteChangeFactors();
            });
        }; // _SATB._raiseAllChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v0.00a @version v0.00a
         * @param {{[String], [String]}} noteFactors - The notes and factors to
         *                                             be raised by this id
         */
        _SATB._raiseNoteChangeFactors = function(noteFactors) {
            if (noteFactors) $gameParty.members().forEach(function(mem) {
                noteFactors.notes.forEach(function(note) {
                    noteFactors.factors.forEach(mem.
                            raiseSATBNoteChangeFactor.bind(mem, note));
                });
            });
        }; // _SATB._raiseNoteChangeFactors

    });

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
    var $$ = Game_Battler.prototype, $$$ = Game_BattlerBase.prototype;
    // All these functions are actor script calls
    _SATB._FORWARDED_FUNCS = {
        raiseAllSATBNoteChangeFactors: "raiseAllChangeFactors",
        raiseSATBNoteChangeFactor: "raiseChangeFactor",
        satbNoteResult: "cachedPartResult",
        invalidateSATBNoteResult: "invalidateResultCache"
    };
    _SATB._RESULT_FUNCS = {
        /** @returns {+ve Number} The max ATB value of the battler involved */
        maxSATB: "max",
        //
    };
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _satb: The container of all other new variables
    //       {Game_SATBNotes} notes: The notetag results
    //       {{Boolean}} isEnded: Marks whether the skill has ended progress
    //       {{Number}} exps: The skill progress experience container

    // It's to avoid overwriting paySkillCost in Game_Actor/Battler from plugins
    _GA.paySkillCost = $.paySkillCost || $$.paySkillCost || $$$.paySkillCost;
    //
    _SATB.paySkillCost = $.paySkillCost = function(skill) {
    // v0.00a - v0.00a; Extended
        // Added to trigger the skill progress upon using the skill
        _SATB._onUseSkill.call(this, skill.id);
        //
        _GA.paySkillCost.apply(this, arguments);
    }; // $.paySkillCost

    ["addState", "removeState"].forEach(function(func) {
        // It's to avoid overwriting func in Game_Actor from other plugins
        _GA[func] = $[func] || $$[func];
        //
        _SATB[func] = $[func] = function(stateId) { // v0.00a - v0.00a; Extended
            // Added to mark that state notetags might have changed
            this._satb.notes.markChangeFactors(["states"]);
            //
            _GA[func].apply(this, arguments);
        }; // $[func]
    });

    _GA.initialize = $.initialize;
    _SATB.initialize = $.initialize = function(actorId) {
    // v0.00a - v0.00a; Extended
        _SATB._init.call(this); // Added to initialize all skill progress vars
        _GA.initialize.apply(this, arguments);
    }; // $.initialize

    _GA.refresh = $.refresh;
    _SATB.refresh = $.refresh = function() { // v0.00a - v0.00a; Extended
        _GA.refresh.apply(this, arguments);
        // Added to refreshes all skill progress notetags lists/results
        _SATB._refresh.call(this);
        //
    }; // $.refresh

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
        this._satb.notes.markChangeFactors(["currentClass"]);
        //
        _GA.changeClass.apply(this, arguments);
    }; // $.changeClass

    // Refer to _SATB._RESULT_FUNCS and Game_SATBNotes for signatures
    Object.keys(_SATB._RESULT_FUNCS).forEach(function(func) {
        var note = _SATB._RESULT_FUNCS[func];
        // It's ok to list unused arguments as long as they're consistent
        $[func] = function(skillId, target, value) {
            return this._satb.notes.result(
                    note, skillId, target, value);
        }; // $[func]
        //
    });

    // Refer to the Game_SATBNotes counterparts
    Object.keys(_SATB._FORWARDED_FUNCS).forEach(function(func) {
        var f = _SATB._FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._satb.notes[f].apply(
                    this._satb.notes, arguments);
        }; // $[func]
        //
    });
    //

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.initSATBNotes = function() {
        this._satb.notes = new Game_SATBNotes(this);
    }; // $.initSATBNotes

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clearSATBNotes = function() {
        // Avoids memory leaks
        this._satb.notes.clear();
        delete this._satb.notes;
        //
    }; // $.clearSATBNotes

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._init = function() {
        // The master container must be ready first before adding anything else
        this._satb = { isEnded: {}, exps: {} };
        this.initSATBNotes();
        //
    }; // _SATB._init

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    _SATB._refresh = function() {
        // Refer to reference tag ACTOR_REFRESH_RECACHE_NOTE
        this._satb.notes.raiseMarkedChangeFactors();
        //
        // Refer to reference tag REDUCED_MAX_END_SKILL_PROGRESS
        _SATB._checkUpdatedMaxSATBes.call(this);
        //
    }; // _SATB._refresh

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

    var $ = Game_SATBNotes.prototype;
    var _SATB = SATB.Game_SATBNotes = {};
    // Refer to reference tag DEFAULT_CHAINING_RULE_FIRST
    _SATB._DEFAULT_CHAINING_RULE = "first";
    //
    _SATB._IS_VALID_RESULT = function(result) {
        return result !== null && result !== undefined;
    }; // _SATB._IS_VALID_RESULT

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Actor} _actor: The actor owning the effective notetag list
    // {Game_SATBCache} _cache: The helper caching notetag list/result
    // {Game_SATBPairs} _pairs: The helper checking/returning note pair
    // {Game_SATBRules} _rules: The helper using the rule to chain note

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $.initialize = function(actor) {
        this._init(actor);
        this.raiseAllChangeFactors();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() {
        // Avoids memory leaks
        delete this._actor;
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
        "cachedPartResult",
        "invalidateResultCache"
    ].forEach(function(f) {
        // Refer to the Game_SATBCache counterparts
        $[f] = function() {
            return this._cache[f].apply(this._cache, arguments);
        }; // $[f]
        //
    });

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.result = function(note, skillId, target, value) {
        // It's infeasible to cache target so value's not used here to miss it
        var cache = this._cache.result(note, skillId);
        //
        // It's possible for a cached result to be intentionally false
        if (_SATB._IS_VALID_RESULT(cache)) return cache;
        //
        // It's better to return an invalid result than to spoil the cache
        if (!skillId) return this._pairs.default(note, skillId, target, value);
        return this._updatedResult(note, skillId, target, value);
        //
    }; // $.result

    /**
     * @interface @since v0.00a @version v0.00a
     * @param {[String]} notes - The list of notes to have their contents run
     * @param {Id} skillId - The id of the skill involved
     */
    $.run = function(notes, skillId) {
        notes.forEach(this._run.bind(this, skillId));
    }; // $.run

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $._init = function(actor) {
        this._actor = actor;
        // Not making these as explicit dependecies' to simplify its uses
        this._cache = new Game_SATBCache();
        this._pairs = new Game_SATBPairs(actor);
        this._rules = new Game_SATBRules(this._pairs);
        //
    }; // $._init

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._updatedResult = function(note, skillId, target, value) {
        // Refer to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedResult(note, skillId, target, value);
        this._cache.updateResultCaches(skillId, target, value, note, result);
        return result;
        //
    }; // $._updatedResult

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._uncachedResult = function(note, skillId, target, value) {
        var chainingRule = this._chainingRule(skillId, note);
        return this[this._updatedResultFunc(chainingRule)](
                note, skillId, target, value, chainingRule);
    }; // $._uncachedResult

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {String} The requested name of the function to be used
     */
    $._updatedResultFunc = function(chainingRule) {
        return this._rules.isAssociative(chainingRule) ?
                "_associativeResult" : "_nonAssociativeResult";
    }; // $._updatedResultFunc

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainRule - The effective notetag result chaining rule
     * @returns {*} The requested result from all effective notetags involved
     */
    $._associativeResult = function(note, skillId, target, value, chainRule) {
        var partResults =
                this._partResults(note, skillId, target, value, chainRule);
        var defaultResult = this._pairs.default(note, skillId, target, value);
        return this._chainedResult(partResults, skillId, note, target, value,
                chainRule, "parts", defaultResult);
    }; // $._associativeResult

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainRule - The effective notetag result chaining rule
     * @returns {[[]]*} The requested results of all effective notetags parts
     */
    $._partResults = function(note, skillId, target, value, chainRule) {
        // Refer to reference tag NOTE_LIST_PART
        var partResults = this._priority(skillId, note).map(this._partResult.
                bind(this, note, skillId, target, value, chainRule));
        //
        return partResults.filter(_SATB._IS_VALID_RESULT);
    }; // $._partResults

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._partResult = function(note, skillId, target, value, chainingRule, part) {
        var cache = this._cache.partResult(note, part);
        // It's possible for a cached result to be intentionally false
        if (_SATB._IS_VALID_RESULT(cache)) return cache;
        //
        return this._updatedPartResult(
                note, skillId, target, value, chainingRule, part);
    }; // $._partResult

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._updatedPartResult = function(note, skillId, target, value, rule, part) {
        // Refer to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedPartResult(note, skillId, target, value,
                rule, part);
        this._cache.updatePartResultCaches(note, skillId, part, result);
        return result;
        //
    }; // $._updatedPartResult

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._uncachedPartResult = function(note, skillId, target, value, rule, part) {
        var list = this._listPart(skillId, note, part);
        // The 1st datum in the part list must be the initial value of the part
        return list.length <= 0 ? undefined : this._chainedResult(
                list, skillId, note, target, value, rule, "list");
        //
    }; // $._uncachedPartResult

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @returns {*} The requested result from all effective notetags involved
     */
    $._nonAssociativeResult = function(note, skillId, target, value, rule) {
        var defaultResult = this._pairs.default(note, skillId, target, value);
        return this._chainedResult(this._list(skillId, note), skillId, note,
                target, value, rule, "list", defaultResult);
    }; // $._nonAssociativeResult

    /**
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {[{*}]} list - The effective notetag list to be chained
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its end result retrieved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} r - The effective notetag result chaining rule
     * @param {String} t - The type of the list to be chained(list/parts)
     * @param {*?} i - The initial result to chain the notetag list
     * @returns {*} The requested result from all effective notetags involved
     */
    $._chainedResult = function(list, skillId, note, target, value, r, t, i) {
        return this._rules.chainResultFunc(note, r, t)(
                list, skillId, note, target, value, i);
    }; // $._chainedResult

    /**
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its contents run
     */
    $._run = function(skillId, note) {
        // Refer to reference tag RUN_DEFAULT_FIRST
        this._pairs.default(note, skillId);
        //
        if (!skillId) return; // It's better to be no-op than to spoil the cache
        var list = this._rules.chainedRunListFunc(
                this._chainingRule(skillId, note))(this._list(skillId, note));
        // Binding run here would cause target and value to be index and list
        list.forEach(function(d) { this._pairs.run(skillId, note, d); }, this);
        //
    }; // $._run

    /**
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {String} The requested effective notetag chaining rule
     */
    $._chainingRule = function(skillId, note) {
        // Refer to reference tag THIS_GAME_ACTOR
        return SATB.params[note + "NoteChainingRule"].call(
                this._actor, skillId) || _SATB._DEFAULT_CHAINING_RULE;
        //
    }; // $._chainingRule

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._list = function(skillId, note) {
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.list(skillId, note) ||
                this._updatedList(skillId, note);
        //
    }; // $._list

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedList = function(skillId, note) {
        // Refer to reference tag NOTE_LIST_CACHE
        var list = this._uncachedList(skillId, note);
        this._cache.updateListCaches(skillId, note, list);
        return list;
        //
    }; // $._updatedList

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedList = function(skillId, note) {
        // Refer to reference tag NOTE_LIST_PART
        return this._priority(skillId, note).reduce(function(list, part) {
            // The function's easy, simple and small enough to be inlined
            return list.concat(this._listPart(skillId, note, part));
            //
        }.bind(this), []);
        //
    }; // $._uncachedList

    /**
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[String]} The requested data type priority queue
     */
    $._priority = function(skillId, note) {
        // Refer to reference tag NOTE_DATA_TYPES and THIS_GAME_ACTOR
        return ["skills"].concat(
                SATB.params[note + "NotePriority"].call(this._actor, skillId));
        //
    }; // $._priority

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._listPart = function(skillId, note, part) {
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.listPart(note, part) ||
                this._updatedListPart(skillId, note, part);
        //
    }; // $._listPart

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedListPart = function(skillId, note, part) {
        // Refer to reference tag NOTE_LIST_CACHE
        var list = this._uncachedListPart(skillId, note, part);
        this._cache.updatePartListCaches(skillId, note, part, list);
        return list;
        //
    }; // $._updatedListPart

    /**
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedListPart = function(skillId, note, part) {
        return this._partList(skillId, part).map(
                this._pairs.validData.bind(this._pairs, note)).filter(
                this._pairs.hasPairs.bind(this._pairs, note));
    }; // $._uncachedListPart

    /**
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._partList = function(skillId, part) {
        var list = part === "skills" ?
                [$dataSkills[skillId]] : this._actor[part]();
        return Array.isArray(list) ? list : [list];
    }; // $._partList

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBCache
 *      - Caches the effective notetag lists and their end results
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBCache.prototype;
    var _SATB = SATB.Game_SATBCache = {};
    // Otherwise the skill part might be mixed up by different skill ids
    _SATB._FACTOR_PART_KEY = function(skillId, fp) {
        return skillId && fp === "skills" ? fp + skillId : fp;
    }; // _SATB._FACTOR_PART_KEY
    //
    // Refer to reference tag NOTE_DATA_TYPES
    _SATB._FACTORS = [
        "actor",
        "currentClass",
        "weapons",
        "armors",
        "skills",
        "states",
        "priority",
        "chainingRule",
        "result"
    ];
    //
    // Refer to reference tag NOTE_TYPE
    _SATB._NOTES = [
        "cond",
        "max",
        "useGain",
        "hitGain",
        "next",
        "keepCurrent",
        "willEnd",
        "didEnd"
    ];
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{{*}}} _cachedLists: The mapping from a note to its notetag list
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{Boolean}}} _changeFactors: The map of all change factors for all notes
    // {{{Boolean}}} _isSameLists: The map of whether the list cache's valid
    // {{{Boolean}}} _isSameResults: The map of whether the result cache's valid
    // {{{*}}} _partLists: The mapping from a note to its notetag list parts
    // {{{*}}} _partResults: The mapping from a note to its cached result parts
    // (Advanced){Boolean} _hasUnknownChangeFactor: ADVANCED_SCRIPT_CALLS_ONLY

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     */
    $.initialize = function() {
        this._init();
        this.raiseAllChangeFactors();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {[String]} factors - The change factors to be marked for all notes
     */
    $.markChangeFactors = function(factors) {
        factors.forEach(this._markChangeFactor, this);
    }; // $.markChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseMarkedChangeFactors = function() {
        // Not using raiseAllChangeFactors is to be flexible with creative uses
        _SATB._NOTES.forEach(this._raiseMarkedNoteChangeFactors, this);
        //
    }; // $.raiseMarkedChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.raiseAllChangeFactors = function() {
        // They use separate containers so it must be called multiple times
        this._changeFactorMarks = this._allEmptyContainers();
        this._changeFactors = this._allRaisedChangeFactors();
        this._isSameLists = this._allEmptyContainers();
        this._isSameResults = this._allEmptyContainers();
        //
    }; // $.raiseAllChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {[String]} factors - The list of change factors to be raised
     * @param {Id?} skillId - The id of the skill involved
     */
    $.raisePartChangeFactors = function(factors, skillId) {
        // The function's easy, simple and small enough to be inlined
        _SATB._NOTES.forEach(function(note) {
            factors.forEach(function(factor) {
                // The argument list must be in this order as it's script call
                this.raiseChangeFactor(note, factor, skillId);
                //
            }, this);
        }, this);
        //
    }; // $.raisePartChangeFactors

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its change factor raised
     * @param {String} factor - The change factor to be raised for the note
     * @param {Id?} skillId - The id of the skill involved
     */
    $.raiseChangeFactor = function(note, factor, skillId) {
        var key = _SATB._FACTOR_PART_KEY(skillId, factor);
        this._changeFactors[note][key] = true;
        this._changeFactorMarks[note][key] = false;
        // The cache validity flags should be erased upon any factor change
        this._isSameLists[note] = {};
        this._isSameResults[note] = {};
        //
    }; // $.raiseChangeFactor

    /**
     * Nullipotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to having its part result caches
     * @param {String} part - The note part to have its part result cache
     * @returns {*} The requested effective notetag list part result cache
     */
    $.cachedPartResult = function(note, part) {
        return this._partResults[note][part];
    }; // $.cachedPartResult

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its part result cache invalidated
     * @param {String} part - The note part to have its result cache invalidated
     */
    $.invalidateResultCache = function(note, part) {
        delete this._partResults[note][part];
        // The cache validity flags should be erased upon any factor change
        this._isSameResults[note] = {};
        //
    }; // $.invalidateResultCache

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.result = function(note, skillId) {
        // It's infeasible to cache target so value's not used here to miss it
        if (!this._isSameResults[note][skillId]) return undefined;
        return this._cachedResults[note][skillId];
        //
    }; // $.result

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.partResult = function(note, part) {
        // The skill change factor's raised upon changing skills so it's ok here
        if (this._changeFactors[note][part]) return undefined;
        return this.cachedPartResult(note, part);
        //
    }; // $.partResult

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {String} part - The note part to have its part result retrieved
     * @param {*} result - The effective notetag list part result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updatePartResultCaches = function(note, skillId, part, result) {
        var key = _SATB._FACTOR_PART_KEY(skillId, part);
        this._partResults[note][key] = result;
        this._changeFactors[note][key] = false;
    }; // $.updatePartResultCaches

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} note - The note to have its end result retrieved
     * @param {*} result - The effective notetag list result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updateResultCaches = function(skillId, target, value, note, result) {
        // It's infeasible to cache target so value's used here to miss it later
        var key = target ?
                JSON.stringify({ skillId: skillId, value: value }) : skillId;
        this._cachedResults[note][key] = result;
        //
        this._isSameResults[note][skillId] = true;
    }; // $.updateResultCaches

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $.list = function(skillId, note) {
        // A valid list must be truthy so this shorthand can be used
        return this._isSameLists[note][skillId]
                && this._cachedLists[note][skillId];
        //
    }; // $.list

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $.listPart = function(note, part) {
        // The skill change factor's raised upon changing skills so it's ok here
        return !this._changeFactors[note][part] && this._partLists[note][part];
        //
    }; // $.listPart

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @param {[{*}]} partList The list of data having the notetags involved
     */
    $.updatePartListCaches = function(skillId, note, part, partList) {
        var key = _SATB._FACTOR_PART_KEY(skillId, part);
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][key] = partList; // partList.clone();
        //
        this._changeFactors[note][key] = false;
    }; // $.updatePartListCaches

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {[{*}]} list - The list of data having the notetags involved
     */
    $.updateListCaches = function(skillId, note, list) {
        // list's supposed to be immutable so it's safe here
        this._cachedLists[note][skillId] = list; // list.clone();
        //
        this._isSameLists[note][skillId] = true;
    }; // $.updateListCaches

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     */
    $._init = function() {
        // They use separate containers so it must be called multiple times
        this._cachedLists = this._allEmptyContainers();
        this._cachedResults = this._allEmptyContainers();
        this._partLists = this._allEmptyContainers();
        this._partResults = this._allEmptyContainers();
        //
        // Set it as false only if you're sure this plugin's all change factors
        this._hasUnknownChangeFactor = true;
        //
    }; // $._init

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @returns {{{*}}} The requested mapping from a note to its container
     */
    $._allEmptyContainers = function() {
        // The function's easy, simple and small enough to be inlined
        return this._allNoteContainers(function() { return {}; });
        //
    }; // $._allEmptyContainers

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @returns {{{Boolean}}} The mapping of all change factors for all notes
     */
    $._allRaisedChangeFactors = function() {
        return this._allNoteContainers(this._raisedChangeFactors.bind(this));
    }; // $._allRaisedChangeFactors

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @returns {{Boolean}} The mapping of all change factors for all notes
     */
    $._raisedChangeFactors = function() {
        // The function's easy, simple and small enough to be inlined
        return _SATB._FACTORS.reduce(function(factors, factor) {
            factors[factor] = true;
            return factors;
        }, {});
        //
    }; // $._raisedChangeFactors

    /**
     * Pure Function
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
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        _SATB._NOTES.forEach(this._markNoteChangeFactor.bind(this, factor));
    }; // $._markChangeFactor

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} factor - The change factor to be marked for the note
     * @param {String} note - The note to have its change factor marked
     */
    $._markNoteChangeFactor = function(factor, note) {
        this._changeFactorMarks[note][factor] = true;
    }; // $._markNoteChangeFactor

    /**
     * Idempotent
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its marked change factors raised
     */
    $._raiseMarkedNoteChangeFactors = function(note) {
        this._raisedNoteChangeFactors(note).forEach(
                this.raiseChangeFactor.bind(this, note));
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Nullipotent
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
     * Pure Function
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

    var $ = Game_SATBPairs.prototype;
    var _SATB = SATB.Game_SATBPairs = {};
    // Refer to reference tag NOTE_SUFFIX
    _SATB._FUNCS = {
        cfg: function(type, entry) { return SATB.notes[entry]; },
        val: function(type, entry) {
            var func = _SATB._RESULTS[type];
            return func ? func.bind(_SATB, entry) : function() { return entry; };
        },
        switch: function(type, entry) {
            return $gameSwitches.value.bind($gameSwitches, +entry);
        },
        event: function(type, entry) {
            return $gameTemp.reserveCommonEvent.bind($gameTemp, +entry);
        },
        var: function(type, entry) {
            var f = _SATB._RESULTS[type];
            if (!f) return $gameVariables.value.bind($gameVariables, +entry);
            return function() { return f($gameVariables.value(+entry)); };
        },
        // Function contents' not supposed to change frequently so it's ok here
        script: function(type, entry) {
            return new Function("skillId", "datum", "target", "value",
                    $gameVariables.value(+entry));
        },
        eval: function(type, entry) {
            return new Function("skillId", "datum", "target", "value", entry);
        }
        //
    };
    //
    _SATB._RESULTS = {
        boolean: function(result) { return result.toLowerCase() === "true"; },
        number: function(result) { return +result; },
        numberArray: function(result) {
            // Refer to reference tag NUMBER_ARRAY
            return result.split("_").map(function(r) { return +r; });
            //
        }
    };
    // Refer to reference tag NOTE_SUFFIX
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
    // Refer to reference tag NOTE_TYPE
    _SATB._NOTES = {
        cond: {
            hasPair: "_hasCondPair",
            pairFunc: "_condPairFunc",
            suffixes: _SATB._SUFFIXES.result
        },
        max: _SATB._NUMBER_RESULT_NOTES,
        useGain: _SATB._NUMBER_RESULT_NOTES,
        hitGain: _SATB._NUMBER_RESULT_NOTES,
        next: {
            hasPair: "_hasPair",
            pairFunc: "_pairFunc",
            result: "numberArray",
            suffixes: _SATB._SUFFIXES.result
        },
        keepCurrent: {
            hasPair: "_hasPair",
            pairFunc: "_pairFunc",
            result: "boolean",
            suffixes: _SATB._SUFFIXES.result
        },
        willEnd: _SATB._BASE_RUN_NOTES,
        didEnd: _SATB._BASE_RUN_NOTES
    };
    //
    // Refer to reference tag NOTE_DEFAULT_RESULTS
    _SATB._DEFAULT_RESULTS = {
        // Using {} would cause inconsistent mixObject result argument type
        cond: function() { return [] },
        //
        next: function() { return [] }
    };
    //

    var notes = {
        max: "defaultMax",
        useGain: "defaultUseGain",
        hitGain: "defaultHitGain",
        keepCurrent: "defaultKeepCurrent",
        willEnd: "willEnd",
        didEnd: "didEnd"
    };
    Object.keys(notes).forEach(function(note) {
        var param = notes[note];
        // The this pointer is Game_SATBPairs.prototype
        _SATB._DEFAULT_RESULTS[note] = function(skillId, target, value) {
            // It's possible that SATB.params[param] changes midway
            return SATB.params[param].call(this._actor, skillId, target, value);
            //
        };
        //
    });

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Actor} _actor: The actor owning the effective notetag list

    /**
     * Idempotent
     * @constructor @since v0.00a @version v0.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $.initialize = function(actor) { this._actor = actor; };

    /**
     * Idempotent
     * @interface @since v0.00a @version v0.00a
     */
    $.clear = function() { delete this._actor; /* Avoids memory leaks */ };

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The default result of the note
     */
    $.default = function(note, skillId, target, value) {
        return _SATB._DEFAULT_RESULTS[note].call(this, skillId, target, value);
    }; // $.default

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {{*}?} The datum having the notetag involved
     */
    $.validData = function(note, datum) {
        if (!datum) return datum;
        var satb = datum.meta.satb;
        var pairs = satb[note];
        satb[note] = pairs && pairs.filter(
                this[_SATB._NOTES[note].hasPair].bind(this, note));
        return datum;
    }; // $.validData

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {Boolean} The check result
     */
    $.hasPairs = function(note, datum) {
        var pairs = this._pairs(note, datum);
        return pairs && pairs.length > 0;
    }; // $.hasPairs

    /**
     * @interface @since v0.00a @version v0.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its contents run
     * @param {{*}} datum - The datum having the note to have its contents run
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {[*]} The result of the notetag function involved
     */
    $.run = function(skillId, note, datum, target, value) {
        var results = this.pairs(note, datum).map(function(func) {
            return func(skillId, datum, target, value);
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
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {[(Id, {*}, Game_Battler?, Number?) -> *]} The functions referred
     *                                                    by the notetag pairs
     */
    $.pairs = function(note, datum) {
        var pairs = this._pairs(note, datum);
        return pairs ? pairs.map(
                this[_SATB._NOTES[note].pairFunc].bind(this, note)) : [];
    }; // $.pairs

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}?} pair - The suffix-entry pair of the note involved
     * @returns {Boolean} The check result
     */
    $._hasCondPair = function(note, pair) {
        if (!pair || !pair.entry1 || !pair.entry2) return false;
        return [pair.suffix1, pair.suffix2].every(
                this._isValidSuffix.bind(this, note));
    }; // $._hasCondPair

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}?} pair - The suffix-entry pairs of the note involved
     * @returns {Boolean} The check result
     */
    $._hasPair = function(note, pair) {
        return pair && pair.entry1 && this._isValidSuffix(note, pair.suffix1);
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
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {[{String}?]} The suffix-entry pairs of the note involved
     */
    $._pairs = function(note, datum) {
        // Refer to reference tag NOTETAG_MULTI
        return datum && datum.meta.satb[note];
        //
    }; // $._pairs

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}} pair - The suffix-entry pair of the note involved
     * @returns {(Id, {*}, ) -> String} The function referred by the cond pairs
     */
    $._condPairFunc = function(note, pair) {
        var descFunc = _SATB._FUNCS[pair.suffix2]("string", pair.entry2);
        var condFunc = _SATB._FUNCS[pair.suffix1]("boolean", pair.entry1);
        return function(skillId, datum) {
            // Refer to reference tag THIS_GAME_ACTOR
            var result = {}, desc = descFunc.call(this._actor, skillId, datum);
            //
            // Refer to reference tag INVALID_COND_DESC and THIS_GAME_ACTOR
            if (desc) result[desc] = condFunc.call(this._actor, skillId, datum);
            //
            return result;
        }.bind(this);
    }; // $._condPairFunc

    /**
     * Pure Function
     * @since v0.00a @version v0.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}} pairs - The suffix-entry pairsof the note involved
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function referred
     *                                                  by the notetag pairs
     */
    $._pairFunc = function(note, pair) {
        // Refer to reference tag THIS_GAME_ACTOR
        return _SATB._FUNCS[pair.suffix1](
                _SATB._NOTES[note].result, pair.entry1).bind(this._actor);
        //
    }; // $._pairFunc

})(DoubleX_RMMV.SATB);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SATBRules
 *      - Chains the effective notetag list into its results using the rules
 *----------------------------------------------------------------------------*/

(function(SATB) {

    "use strict";

    var $ = Game_SATBRules.prototype;
    var _SATB = SATB.Game_SATBRules = {};
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
    // Refer to reference tag NOTE_OPERATORS
    ["+", "*", "-", "/", "%", "="].forEach(function(operator) {
        _SATB._CHAINED_RESULT_FUNCS[operator] = {
            operator: _SATB._CHAINED_RESULT_FUNC.operator(operator)
        };
    });
    //
    // The this pointer is Game_SATBRules.prototype
    _SATB._FIRST_LIST_MONO_FUNC = function(list, skillId, note) {
        if (list.length <= 0) return this._pairs.default(note, skillId);
        return this._pairs.run(skillId, note, list[0])[0];
    };
    _SATB._LAST_LIST_MONO_FUNC = function(list, skillId, note) {
        if (list.length <= 0) return this._pairs.default(note, skillId);
        var pairs = this._pairs.run(skillId, note, list[list.length - 1]);
        return pairs[pairs.length - 1];
    };
    //
    // Refer to reference tag NOTE_TYPE
    _SATB._NOTES = {
        cond: "mixObject",
        max: "operator",
        useGain: "operator",
        hitGain: "operator",
        next: "concat",
        keepCurrent: "operator"
    };
    //
    _SATB._RESULT_CHAINING_RULE_FUNC = function(list, note, func, initialResult) {
        if (initialResult === null || initialResult === undefined) {
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
     * @param {String} type - The type of the list to be chained(list/parts)
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function chaining
     *                                                  the notetag list
     */
    $.chainResultFunc = function(note, rule, type) {
        return _SATB._RESULT_CHAINING_RULES[rule][_SATB._NOTES[note]][type].
                bind(this);
    }; // $.chainResultFunc

    /**
     * Pure Function
     * @interface @since v0.00a @version v0.00a
     * @param {String} rule - The rule to chain the effective notetag list
     * @returns {([{*}]) -> [{*}]} The function returning chained notetag list
     */
    $.chainedRunListFunc = function(rule) {
        return _SATB._RUN_CHAINING_RULES[rule];
    }; // $.chainedRunListFunc

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
    _SATB._CMDS = [];

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
     * @param {String} cmd - The plugin command name
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
     * @param {String} cmd - The plugin command name
     * @returns {Boolean} The check result
     */
    _SATB._isPluginCmd = function(cmd) {
        return _SATB._CMDS.indexOf(cmd) >= 0;
    }; // _SATB._isPluginCmd

    /**
     * Script call's just another way of using plugin commands
     * The this pointer is Game_Interpreter.prototype
     * @since v0.00a @version v0.00a
     * @param {String} cmd - The plugin command name
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
     * @param {String} targetType - The plugin command target type
     * @param {String} target - The plugin command target identifier
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
     * @param {String} targetType - The plugin command target type
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdRawTargets = function(targetType) {
        switch (targetType) {
            case "party": return $gameParty.members();
            case "aliveParty": return $gameParty.aliveMembers();
            case "troop": return $gameTroop.members();
            case "aliveTroop": return $gameTroop.aliveMembers();
            case "actor": return $gameActors._data;
            case "aliveActor": return $gameActors._data.filter(function(actor) {
                return actor.isAlive();
            })
            default: return [];
        }
    }; // _SATB._pluginCmdTargets

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v0.00a @version v0.00a
     * @param {[Game_Battler]} targets - The battlers to be filtered from
     * @param {String} target - The plugin command target identifier
     * @returns {[Game_Battler]} The battlers involved in the plugin command
     */
    _SATB._pluginCmdFilteredTargets = function(targets, target) {
        if (!isNaN(target)) return [targets[+target]];
        return targets.filter(function(t) { return t.name() === target; });
    }; // _SATB._pluginCmdFilteredTargets

})(DoubleX_RMMV.SATB);

/*============================================================================*/
