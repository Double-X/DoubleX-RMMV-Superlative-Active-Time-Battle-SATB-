/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Preloaded Resources
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
 *         (No capability on Javascript ES5 experience but can still make
 *         reasonable guesses on readable novice codes up to 100 LoC scale)
 *      2. Little RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *         (Elementary Javascript ES5 exposures being able to write beginner
 *         codes up to 300LoC scale )
 *----------------------------------------------------------------------------
 *    # Links
 *      This Plugin:
 *      1. https://pastebin.com/qjqn9sE0
 *      Posts:
 *      1. https://forums.rpgmakerweb.com/index.php?threads/doublex-rmmv-preloaded-resources.123760/
 *      2. https://www.rpgmakercentral.com/topic/42479-doublex-rmmv-preloaded-resources/
 *      3. https://rpgmaker.net/scripts/789/
 *      4. http://www.hbgames.org/forums/viewtopic.php?f=332&t=80223
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. The default plugin parameters file name is
 *         doublex rmmv preloaded resources v100a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Preloaded_Resources_File, which must be done via
 *         opening this plugin js file directly
 *----------------------------------------------------------------------------
 *    # Contributors
 *      Authors:
 *      1. DoubleX
 *      Plugin Development Collaborators:
 *      - None So Far
 *      Bug Reporters:
 *      - None So Far
 *      Compatibility Issue Raisers:
 *      - None So Far
 *      Feature Requesters:
 *      - None So Far
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1500 7-Jul-2020):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*~struct~PreloadedAnimation:
 * @param filename
 * @type file
 * @dir img/animations/
 * @desc The filename of the animation to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the animation to be preloaded
 */
/*~struct~PreloadedBattleBack1:
 * @param filename
 * @type file
 * @dir img/battlebacks1/
 * @desc The filename of the 1st battle back to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the 1st battle back to be preloaded
 */
/*~struct~PreloadedBattleBack2:
 * @param filename
 * @type file
 * @dir img/battlebacks2/
 * @desc The filename of the 2nd battle back to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the 2nd battle back to be preloaded
 */
/*~struct~PreloadedCharacter:
 * @param filename
 * @type file
 * @dir img/characters/
 * @desc The filename of the character to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the character to be preloaded
 */
/*~struct~PreloadedEnemy:
 * @param filename
 * @type file
 * @dir img/enemies/
 * @desc The filename of the enemy to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the enemy to be preloaded
 */
/*~struct~PreloadedFace:
 * @param filename
 * @type file
 * @dir img/faces/
 * @desc The filename of the face to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the face to be preloaded
 */
/*~struct~PreloadedParallax:
 * @param filename
 * @type file
 * @dir img/parallaxes/
 * @desc The filename of the parallax to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the parallax to be preloaded
 */
/*~struct~PreloadedPicture:
 * @param filename
 * @type file
 * @dir img/pictures/
 * @desc The filename of the picture to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the parallax to be preloaded
 */
/*~struct~PreloadedSVActor:
 * @param filename
 * @type file
 * @dir img/sv_actors/
 * @desc The filename of the sideview actor to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the sideview actor to be preloaded
 */
/*~struct~PreloadedSVEnemy:
 * @param filename
 * @type file
 * @dir img/sv_enemies/
 * @desc The filename of the sideview enemy to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the sideview enemy to be preloaded
 */
/*~struct~PreloadedSystem:
 * @param filename
 * @type file
 * @dir img/system/
 * @desc The filename of the system image to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the system image to be preloaded
 */
/*~struct~PreloadedTileset:
 * @param filename
 * @type file
 * @dir img/tilesets/
 * @desc The filename of the tileset to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the tileset to be preloaded
 */
/*~struct~PreloadedTitle1:
 * @param filename
 * @type file
 * @dir img/titles1/
 * @desc The filename of the 1st title to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the 1st title to be preloaded
 */
/*~struct~PreloadedTitle2:
 * @param filename
 * @type file
 * @dir img/titles2/
 * @desc The filename of the 2nd title to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the 2nd title to be preloaded
 */
/*~struct~PreloadedMiscImage:
 * @param path
 * @type file
 * @dir img/
 * @desc The filename of the misc image to be preloaded
 * @param hues
 * @type number[]
 * @max 360
 * @min 0
 * @desc The hue of the misc image to be preloaded
 * @param smooth
 * @type boolean
 * @desc The smooth of the misc image to be preloaded
 */
/*:
 * @plugindesc (v1.00a)Lets you sets some audios/images to be loaded upon game start
 * This should boost the FPS on phones noticeably if there's enough memory
 * @author DoubleX
 *
 * @param IsPreloadAudio
 * @type boolean
 * @desc Sets whether the specified audios will be preloaded
 * @default true
 *
 * @param preloadAudioMSInterval
 * @parent IsPreloadAudio
 * @type number
 * @desc Sets the number of milliseconds to wait before loading the
 * next audio included by the same parameter(0 means no wait)
 * @default 0
 *
 * @param preloadedBGMs
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/bgm/
 * @desc Sets the list of BGMs to be preloaded
 * @default []
 *
 * @param preloadedBGSs
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/bgs/
 * @desc Sets the list of BGSs to be preloaded
 * @default []
 *
 * @param preloadedMEs
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/me/
 * @desc Sets the list of MEs to be preloaded
 * @default []
 *
 * @param preloadedSEs
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/se/
 * @desc Sets the list of SEs to be preloaded
 * @default []
 *
 * @param preloadedStaticSEs
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/se/
 * @desc Sets the list of static SEs to be preloaded
 * @default []
 *
 * @param preloadedMiscAudios
 * @parent IsPreloadAudio
 * @type file[]
 * @dir audio/
 * @desc Sets the list of other audio files to be preloaded
 * @default []
 *
 * @param IsPreloadImage
 * @type boolean
 * @desc Sets whether the specified images will be preloaded
 * @default true
 *
 * @param preloadImageMSInterval
 * @parent IsPreloadImage
 * @type number
 * @desc Sets the number of milliseconds to wait before loading the
 * next hue and image under the same parameter(0 means no wait)
 * @default 0
 *
 * @param preloadedAnimations
 * @parent IsPreloadImage
 * @type struct<PreloadedAnimation>[]
 * @desc Sets the list of animations to be preloaded
 * @default []
 *
 * @param preloadedBattleBack1s
 * @parent IsPreloadImage
 * @type struct<PreloadedBattleBack1>[]
 * @desc Sets the list of 1st battle backs to be preloaded
 * @default []
 *
 * @param preloadedBattleBack2s
 * @parent IsPreloadImage
 * @type struct<PreloadedBattleBack2>[]
 * @desc Sets the list of 2nd battle backs to be preloaded
 * @default []
 *
 * @param preloadedCharacters
 * @parent IsPreloadImage
 * @type struct<PreloadedCharacter>[]
 * @desc Sets the list of characters to be preloaded
 * @default []
 *
 * @param preloadedEnemies
 * @parent IsPreloadImage
 * @type struct<PreloadedEnemy>[]
 * @desc Sets the list of enemies to be preloaded
 * @default []
 *
 * @param preloadedFaces
 * @parent IsPreloadImage
 * @type struct<PreloadedFace>[]
 * @desc Sets the list of faces to be preloaded
 * @default []
 *
 * @param preloadedParallaxes
 * @parent IsPreloadImage
 * @type struct<PreloadedParallax>[]
 * @desc Sets the list of parallaxes to be preloaded
 * @default []
 *
 * @param preloadedPictures
 * @parent IsPreloadImage
 * @type struct<PreloadedPicture>[]
 * @desc Sets the list of pictures to be preloaded
 * @default []
 *
 * @param preloadedSVActors
 * @parent IsPreloadImage
 * @type struct<PreloadedSVActor>[]
 * @desc Sets the list of sideview actors to be preloaded
 * @default []
 *
 * @param preloadedSVEnemies
 * @parent IsPreloadImage
 * @type struct<PreloadedSVEnemy>[]
 * @desc Sets the list of sideview enemies to be preloaded
 * @default []
 *
 * @param preloadedSystem
 * @parent IsPreloadImage
 * @type struct<PreloadedSystem>[]
 * @desc Sets the list of system images to be preloaded
 * @default []
 *
 * @param preloadedTilesets
 * @parent IsPreloadImage
 * @type struct<PreloadedTileset>[]
 * @desc Sets the list of tilesets to be preloaded
 * @default []
 *
 * @param preloadedTitles1
 * @parent IsPreloadImage
 * @type struct<PreloadedTitle1>[]
 * @desc Sets the list of 1st titles to be preloaded
 * @default []
 *
 * @param preloadedTitles2
 * @parent IsPreloadImage
 * @type struct<PreloadedTitle2>[]
 * @desc Sets the list of 2nd titles to be preloaded
 * @default []
 *
 * @param preloadedMiscImages
 * @parent IsPreloadImage
 * @type struct<PreloadedMiscImage>[]
 * @desc Sets the list of other image files to be preloaded
 * @default []
 *
 * @help
 *============================================================================
 * 1. You should only preload resources that are actually used or the game can
 *    take an excessively and unnecessarily long time to start
 * 2. You might have to test the values of preloadAudioMSInterval and
 *    preloadImageMSInterval to have the optimal preload time for your project
 * 3. Setting preloadAudioMSInterval/preloadImageMSInterval as 0 might block
 *    the UI thread for too long and thus crashing/freezing the game in phones
 * 4. You should consider not preloading resources that are only rarely used
 *    in case the preloading times are still too long
 * 5. Some plugins might use HTML5Audio instead of WebAudio, and preloading
 *    audios using HTML5Audio is meaningless HTML5Audio is a static class
 *    having nothing to preload
 * 6. You should compress the resources to be preoloaded for phones or the
 *    extra memory consumption from preloading them can quickly crash/free the
 *    game there
 * 7. No identical resource should be duplicated in the same parameter or
 *    across parameters(this plugin won't explicitly skip those duplicates as
 *    simplifying the codes this way can actually reduce preload time)
 * 8. If you want to keep the current parameter values in the plugin manager
 *    upon using a newer version, you can do the following:
 *    - Renames the newer version to be that of the older version
 *    - Edits the value of DoubleX_RMMV.Preloaded_Resources_File to be the
 *      filename of the older version, which must be done via opening this
 *      plugin js file directly
 * 9. (Advanced)By default, the images are cached upon first used, and the
 *    cache is a Least Recently Used(LRU) cache. This plugin reserves all
 *    preloaded images so the LRU will never release them unless they're
 *    explicitly told to be released via a script call
 *============================================================================
 *    ## (Advanced)Script Call Info
 *----------------------------------------------------------------------------
 *    # Image manipulations
 *      1. ImageManager.releasePreloadedFolderImg(param, filename, hue)
 *         - Releases the image with the filename filename and hue hue
 *           specified in parameter param
 *         - This can be useful when an image becomes rarely used and/or the
 *           preloaded images are consuming too much memory
 *         - Please note that using this script call doesn't always remove the
 *           image from the LRU cache instantly as it's still up to the LRU
 *           cache to determine when to remove that image now that it can be
 *           removed due to no longer being reserved
 *         - param and filename are supposed to be String
 *         - hue is supposed to be an integer from 0 to 360 inclusive
 *         - The script call's supposed to be Idempotent
 *      2. ImageManager.releasePreloadedMiscImg(path, hue, smooth)
 *         - Releases the image with the path path, hue hue and smooth smooth
 *         - This can be useful when an image becomes rarely used and/or the
 *           preloaded images are consuming too much memory
 *         - Please note that using this script call doesn't always remove the
 *           image from the LRU cache instantly as it's still up to the LRU
 *           cache to determine when to remove that image now that it can be
 *           removed due to no longer being reserved
 *         - path is supposed to be a String
 *         - hue is supposed to be an integer from 0 to 360 inclusive
 *         - smooth is supposed to be a Boolean
 *         - The script call's supposed to be Idempotent
 *    # Audio manipulations
 *      1. AudioManager.invalidateCachedWebAudio(folder, name)
 *         - Releases the audio with folder folder and filename name from the
 *           audio cache
 *         - This only works for non static SE audio loaded as WebAudio
 *         - folder is supposed to be a String
 *         - name is supposed to be a String
 *         - The script call's supposed to be Idempotent
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Preloaded Resources"] = "v1.00a";

// The plugin file name must be the same as
// DoubleX_RMMV.Preloaded_Resources_File
DoubleX_RMMV.Preloaded_Resources_File =
        "doublex rmmv preloaded resources v100a";
//

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what Graphics, DataManager, ImageManager and
 *           AudioManager do in general
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *           plugin
 *           (Basic knowledge on what RMMV plugin development does in general
 *           with several easy, simple and small plugins written without
 *           nontrivial bugs up to 1000 LoC scale but still being
 *           inexperienced)
 *      2. Parameter/Return value of type * means it might be of any type
 *      3. Function signature with (**) means it might take any number of
 *         parameters of any type
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Preloaded_Resources = {};

/*----------------------------------------------------------------------------
 *    # Edit class: Graphics
 *      - Preloads all resources specified in parameters upon game start
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    // It's unlikely that the original version's needed
    Graphics._paintUpperCanvas = function() { // v1.00a - v1.00a; Rewritten
        this._clearUpperCanvas();
        // It's unlikely that these codes will be edited
        if (isPaintUpperCanvas.call(this)) paintUpperCanvas.call(this);
        //
    }; // Graphics._paintUpperCanvas
    //

    var MIN_LOADING_COUNT = 20;

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @return {Boolean} The check result
     */
    function isPaintUpperCanvas() { // It's unlikely that it'll ever be reused
        return this._loadingImage && this._loadingCount >= MIN_LOADING_COUNT;
    } // isPaintUpperCanvas

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @todo Stops redrawing the loading image every frame
     */
    function paintUpperCanvas() { // It's unlikely that it'll ever be reused
        var context = this._upperCanvas.getContext("2d");
        context.save();
        var alpha = ((this._loadingCount - MIN_LOADING_COUNT) / 30).clamp(0, 1);
        context.globalAlpha = alpha;
        var dx = (this._width - this._loadingImage.width) / 2;
        var dy = (this._height - this._loadingImage.height) / 2;
        context.drawImage(this._loadingImage, dx, dy);
        drawPreloadProgressBar.call(this, context, dx, dy);
        context.restore();
    } // paintUpperCanvas

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {CanvasRenderingContext2D} context - The 2D canvas context
     * @param {Int} dx - The starting x coordinate of the canvas drawing
     * @param {Int} dy - The starting y coordinate of the canvas drawing
     * @todo Breaks this excessively long function into several shorter pieces
     */
    function drawPreloadProgressBar(context, dx, dy) {
        if (!this.isDrawPreloadProgressBar) return;
        var num = DataManager.preloadResourceNum;
        if (num <= 0) return;
        var fillStyle = context.fillStyle;
        context.fillStyle = "white";
        var y = dy + this._loadingImage.height;
        var width = this._loadingImage.width;
        var height = this._loadingImage.height / 4;
        context.fillRect(dx, y, width, height);
        context.fillStyle = "green";
        var progress = DataManager.preloadResourceProgress;
        context.fillRect(dx, y, width * progress / num, height);
        context.fillStyle = "blue";
        var font = context.font;
        context.font = "16px GameFont";
        var text = "Preloaded " + progress + "/" + num + " specified resources";
        var textX = dx + width / 2 - context.measureText(text).width / 2;
        // The formalu of textY is derived from actual testings
        var textY = y + height / 2 + 4, lineJoin = context.lineJoin;
        //
        context.lineJoin = "round";
        context.strokeText(text, textX, textY, width);
        context.fillText(text, textX, textY, width);
        context.lineJoin = lineJoin;
        context.font = font, context.fillStyle = fillStyle;
    } // drawPreloadProgressBar

})(); // Graphics

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Preloads all resources specified in parameters upon game start
 *----------------------------------------------------------------------------*/

(function(PR) {

    "use strict";

    PR.DataManager = { orig: {}, new: {} };
    var _DM = PR.DataManager.orig, _PR = PR.DataManager.new;

    _PR.BOOL_PARAM_RESULT = function(val) {
        return val && (val === "true" || val !== "false");
    }; // _PR.BOOL_PARAM_RESULT

    _PR._PARSE_IMG_PARAM = function(parsedVal, v, i) {
        var obj = parsedVal[i] = JSON.parse(v), hues = JSON.parse(obj.hues);
        hues.forEach(function(hue, j) { hues[j] = JSON.parse(hue); });
        // Smooth is either true or false so an array of smoothes' not needed
        obj.hues = hues, obj.smooth = obj.smooth && JSON.parse(obj.smooth);
        //
    }; // _PR._PARSE_IMG_PARAM
    _PR._PARSED_IMG_PARAM = function(parsedVal) {
        // Not using declarative counterparts' minimize perload time and memory
        parsedVal.forEach(function(v, i) {
            _PR._PARSE_IMG_PARAM(parsedVal, v, i);
        });
        return parsedVal;
        //
    }; // _PR._PARSED_IMG_PARAM
    _PR._PARSED_PARAM = function(param, val) {
        var parsedVal = JSON.parse(val);
        if (PR.ImageManager.new.PRELOAD_IMG_PARAMS.contains(param)) {
            return _PR._PARSED_IMG_PARAM(parsedVal);
        }
        return parsedVal;
    }; // _PR._PARSED_PARAM
    _PR._PARSED_PARAMS = function(params) {
        Object.keys(params).forEach(function(param) {
            params[param] = _PR._PARSED_PARAM(param, params[param]);
        });
        return params;
    }; // _PR._PARSED_PARAMS

    // Marks whether the parameters in the parent are all preloaded or skipped
    DataManager._isParentParamPreloaded = { // New private variable
        IsPreloadAudio: false,
        IsPreloadImage: false
    }; // DataManager._isParentParamPreloaded
    //

    DataManager.preloadResourceNum = DataManager.preloadResourceProgress = 0;

    _PR._PARENT_PARAMS = Object.keys(DataManager._isParentParamPreloaded);

    _DM.loadDatabase = DataManager.loadDatabase;
    _PR.loadDatabase = DataManager.loadDatabase = function() {
    // v1.00a - v1.00a; Extended
        _DM.loadDatabase.apply(this, arguments);
        // Added to preload all specified audio and image resources as well
        _PR._preload.call(this);
        //
    }; // DataManager.loadDatabase

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _PR.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v1.00a - v1.00a; Extended
        // Edited to start the game only after all resources are preloaded too
        if (!_DM.isDatabaseLoaded.apply(this, arguments)) return false;
        return this._areAllResourcesPreloaded;
        //
    }; // DataManager.isDatabaseLoaded

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Param} parentParam - The parameter as the parent of other ones
     */
    DataManager.onFinishPreload = function(parentParam) {
        console.info("All parameters under " + parentParam + " are preloaded.");
        this._isParentParamPreloaded[parentParam] = true;
        if (!_PR._areAllParentParamsPreloaded.call(this)) return;
        _PR._onFinishPreload.call(this);
    }; // DataManager.onFinishPreload

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _PR._preload = function() {
        // Ensures this method will only be called once
        if (this._isPreloadResourceRun) return;
        Graphics.isDrawPreloadProgressBar = true;
        _PR._preloadStartNow = Date.now();
        _PR._preloadResources.call(this);
        this._isPreloadResourceRun = true; // New private variable
        //
    }; // _PR._preload

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _PR._preloadResources = function() {
        var params = _PR._parsedParams.call(this);
        // They must be placed here to have the most accurate report
        var elapsedMs = Date.now() - _PR._preloadStartNow;
        console.info("Parameters parsing time: " + elapsedMs + " milliseconds");
        //
        ImageManager.preloadImgs(params);
        AudioManager.preloadAudios(params);
    }; // _PR._preloadResources

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {{*}} The mapping of all parameter name-value pairs
     */
    _PR._parsedParams = function() {
        // This method's called only once anyway so it won't hurt performance
        var filename = DoubleX_RMMV.Preloaded_Resources_File;
        var params = PluginManager.parameters(filename);
        //
        // Parsing the whole thing all at once's much faster than parsing later
        return _PR._PARSED_PARAMS(JsonEx.makeDeepCopy(params));
        // The original plugin parameter container shouldn't be ever edited
    }; // _PR._parsedParams

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The check result
     */
    _PR._areAllParentParamsPreloaded = function() {
        return _PR._PARENT_PARAMS.every(_PR._isParentParamPreloaded, this);
    }; // _PR._areAllParentParamsPreloaded

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Param} parentParam - The parameter as the parent of other ones
     * @returns {Boolean} The check result
     */
    _PR._isParentParamPreloaded = function(parentParam) {
        return this._isParentParamPreloaded[parentParam];
    }; // _PR._isParentParamPreloaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _PR._onFinishPreload = function() {
        // It's better to be clear by using 2 variables even when 1 is suffice
        this._areAllResourcesPreloaded = true;
        Graphics.isDrawPreloadProgressBar = false;
        //
        var elapsedMs = Date.now() - _PR._preloadStartNow;
        console.info("Preload time elapsed: " + elapsedMs + " milliseconds");
    }; // _PR._onFinishPreload

})(DoubleX_RMMV.Preloaded_Resources); // DataManager

/*----------------------------------------------------------------------------
 *    # Edit class: ImageManager
 *      - Preloads all specified image resources upon game start
 *----------------------------------------------------------------------------*/

(function(PR) {

    "use strict";

    PR.ImageManager = { orig: {}, new: {} };
    var DM = PR.DataManager.new, _PR = PR.ImageManager.new;

    _PR._FOLDER_IMG_RESERVATION_ID = function(param, filename, hue) {
        return JSON.stringify({ param: param, filename: filename, hue: hue });
    }; // _PR._FOLDER_IMG_RESERVATION_ID
    _PR._IMG_HUE_COUNT = function(imgs) {
        return imgs.reduce(_PR._REDUCED_IMG_HUE_COUNT, 0);
    }; // _PR._IMG_HUE_COUNT
    _PR._IS_VALID_HUE = function(hue) {
        return Number.isInteger(hue) && hue >= 0 && hue <= 360;
    }; // _PR._IS_VALID_HUE
    _PR._MISC_IMG_RESERVATION_ID = function(path, hue, smooth) {
        return JSON.stringify({ path: path, hue: hue, smooth: smooth });
    }; // _PR._MISC_IMG_RESERVATION_ID
    _PR._REDUCED_IMG_HUE_COUNT = function(imgHueCount, img) {
        return imgHueCount + img.hues.length;
    }; // _PR._REDUCED_IMG_HUE_COUNT
    _PR._SHOW_INVALID_IMG_HUE = function(name, hue) {
        try { asdasdasdasdasdasd; /* Forcibly throws an error */ } catch (err) {
            console.warn([
                "The hue of image " + name + " is " + hue + ".",
                "But hue must be an integer from 0 to 360 inclusive!",
                "The relevant stacktrace is as follows:",
                err.stack
            ].join("\n"));
        }
    }; // _PR._SHOW_INVALID_IMG_HUE

    // Maps the preload image parameter to the ImageManager function to be used
    _PR._PRELOAD_IMG_PARAM_FUNCS = {
        preloadedAnimations: "reserveAnimation",
        preloadedBattleBack1s: "reserveBattleback1",
        preloadedBattleBack2s: "reserveBattleback2",
        preloadedCharacters: "reserveCharacter",
        preloadedEnemies: "reserveEnemy",
        preloadedFaces: "reserveFace",
        preloadedParallaxes: "reserveParallax",
        preloadedPictures: "reservePicture",
        preloadedSVActors: "reserveSvActor",
        preloadedSVEnemies: "reserveSvEnemy",
        preloadedSystem: "reserveSystem",
        preloadedTilesets: "reserveTileset",
        preloadedTitles1: "reserveTitle1",
        preloadedTitles2: "reserveTitle2"
    }; // _PR._PRELOAD_IMG_PARAM_FUNCS
    //

    _PR.PRELOAD_IMG_PARAMS = Object.keys(_PR._PRELOAD_IMG_PARAM_FUNCS);
    _PR.PRELOAD_IMG_PARAMS.push("preloadedMiscImages");

    // Marks which image parameters have finished preloading image files
    ImageManager._isImgParamPreloaded = {}; // New private variable
    //

    /**
     * DON'T CALL THIS MANUALLY UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    ImageManager.preloadImgs = function(params) {
        if (DM.BOOL_PARAM_RESULT(params.IsPreloadImage)) {
            return _PR._preloadImgs.call(this, params);
        }
        DataManager.onFinishPreload("IsPreloadImage");
    }; // ImageManager.preloadImgs

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     * @param {String} filename - The name of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     */
    ImageManager.releasePreloadedFolderImg = function(param, filename, hue) {
        var id = _PR._FOLDER_IMG_RESERVATION_ID(param, filename, hue);
        this.releaseReservation(id);
    }; // ImageManager.releasePreloadedFolderImg

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} path - The path of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     * @param {Boolean} smooth - The smooth of the image to be preloaded
     */
    ImageManager.releasePreloadedMiscImg = function(path, hue, smooth) {
        var reservationId = _PR._MISC_IMG_RESERVATION_ID(path, hue, smooth);
        this.releaseReservation(reservationId);
    }; // ImageManager.releasePreloadedMiscImg

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    _PR._preloadImgs = function(params) {
        _PR._preloadImgsInFolders.call(this, params, interval);
        var interval = params.preloadImageMSInterval;
        _PR._preloadMiscImgs.call(this, params.preloadedMiscImages, interval);
    }; // _PR._preloadImgs

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    _PR._preloadImgsInFolders = function(params) {
        // This method's called only once anyway so it won't hurt performance
        Object.keys(_PR._PRELOAD_IMG_PARAM_FUNCS).forEach(function(param) {
            _PR._preloadImgsInFolder.call(this, params, param);
        }, this);
        // Not binding _preloadImgsInFolder is to minimize preload memory leaks
    }; // _PR._preloadImgsInFolders

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     * @param {Param} param - The name of the parameter of images in folder
     */
    _PR._preloadImgsInFolder = function(params, param) {
        var imgs = params[param], interval = params.preloadImageMSInterval;
        // Not binding _preloadImgHues is to minimize preload memory leaks
        var preloadHuesFunc = function(image, nextFunc) {
            var self = ImageManager;
            _PR._preloadImgHues.call(self, param, interval, image, nextFunc);
        };
        //
        _PR._runPreloadImgQueue.call(this, imgs, param, preloadHuesFunc);
    }; // _PR._preloadImgsInFolder

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     * @param {Number} interval - The number of milliseconds as interval
     * @param {{String, [Hue]}} img - The image information to preload image
     * @param {()} nextFunc - The function as the image preload queue
     */
    _PR._preloadImgHues = function(param, interval, img, nextFunc) {
        // Not binding _callReserveImgFunc is to minimize preload memory leaks
        var filename = img.filename, hues = img.hues, callFunc = function(hue) {
            _PR._callReserveImgFunc.call(ImageManager, param, filename, hue);
        };
        //
        _PR._runPreloadHueQueue.call(this, hues, nextFunc, callFunc, interval);
    }; // _PR._preloadImgHues

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     * @param {String} filename - The name of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     */
    _PR._callReserveImgFunc = function(param, filename, hue) {
        if (!_PR._IS_VALID_HUE(hue)) { // Users might input raw values directly
            return _PR._SHOW_INVALID_IMG_HUE(filename, hue);
        }
        // Users might input raw values or empty images directly
        if (filename) _PR._reserveImg.call(this, param, filename, hue);
        //
    }; // _PR._callReserveImgFunc

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     * @param {String} filename - The name of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     */
    _PR._reserveImg = function(param, filename, hue) {
        var id = _PR._FOLDER_IMG_RESERVATION_ID(param, filename, hue);
        // _PR._PRELOAD_IMG_PARAM_FUNCS[param] is the reserve image function
        this[_PR._PRELOAD_IMG_PARAM_FUNCS[param]](filename, hue, id);
        //
    }; // _PR._reserveImg

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[String]} imgs - The list of misc image file paths
     * @param {Number} interval - The number of milliseconds as interval
     */
    _PR._preloadMiscImgs = function(imgs, interval) {
        // Not binding _preloadMiscImgHues is to minimize preload memory leaks
        var preloadHuesFunc = function(img, nextFunc) {
            _PR._preloadMiscImgHues.call(ImageManager, interval, img, nextFunc);
        };
        //
        var param = "preloadedMiscImages";
        _PR._runPreloadImgQueue.call(this, imgs, param, preloadHuesFunc);
    }; // _PR._preloadMiscImgs

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[{String, [Hue], Boolean]}} imgs - image files to be preloaded
     * @param {Param} param - The name of the parameter of images in folder
     * @param {(**)} preloadFunc - The function preloading the image hues
     */
    _PR._runPreloadImgQueue = function(imgs, param, preloadHuesFunc) {
        DataManager.preloadResourceNum += _PR._IMG_HUE_COUNT(imgs);
        // Otherwise loading too many images all at once can be too slow
        (function preload() {
            if (imgs.length <= 0) {
                return _PR._onFinishPreloadImgs.call(ImageManager, param);
            }
            preloadHuesFunc(imgs.shift(), preload);
        })();
        /** @todo Thinks of a way to eliminate the inner function memory leak */
    }; // _PR._runPreloadImgQueue

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     */
    _PR._onFinishPreloadImgs = function(param) {
        console.info("All images specified in " + param + " are preloaded.");
        this._isImgParamPreloaded[param] = true;
        if (!_PR._areAllImgParamsPreloaded.call(this)) return;
        DataManager.onFinishPreload("IsPreloadImage");
    }; // _PR._onFinishPreloadImgs

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The check result
     */
    _PR._areAllImgParamsPreloaded = function() {
        return _PR.PRELOAD_IMG_PARAMS.every(_PR._isImgParamPreloaded, this);
    }; // _PR._areAllImgParamsPreloaded

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of images in folder
     * @returns {Boolean} The check result
     */
    _PR._isImgParamPreloaded = function(param) {
        return this._isImgParamPreloaded[param];
    }; // _PR._isImgParamPreloaded

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Number} interval - The number of milliseconds as interval
     * @param {{String, [Hue], Boolean}} img - Misc image file to be preloaded
     * @param {()} nextFunc - The function as the image preload queue
     */
    _PR._preloadMiscImgHues = function(interval, img, nextFunc) {
        // smooth is either true or false so an array of smoothes' not needed
        var path = img.path, smooth = img.smooth, hues = img.hues;
        //
        // Not binding _preloadMiscImg is to minimize preload memory leaks
        var preload = function(hue) {
            _PR._preloadMiscImg.call(ImageManager, path, smooth, hue);
        };
        //
        _PR._runPreloadHueQueue.call(this, hues, nextFunc, preload, interval);
    }; // _PR._preloadMiscImgHues

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[Hue]} hues - The list of hues of the current image to preload
     * @param {()} nextFunc - The as the image preload queue
     * @param {(**)} preloadFunc - The function preloading the image hue
     * @param {Number} interval - The number of milliseconds as interval
     */
    _PR._runPreloadHueQueue = function(hues, nextFunc, preloadFunc, interval) {
        // Using inner function's more performant by avoiding repeated bindings
        var isSetTimeout = interval > 0; // It's better than redundant checkings
        (function preload() {
            if (hues.length <= 0) return nextFunc();
            // Extracting them into a function can hurt perload time and memory
            preloadFunc(hues.shift());
            DataManager.preloadResourceProgress++;
            isSetTimeout ? setTimeout(preload, interval) : preload();
            //
        })();
        /** @todo Thinks of a way to eliminate the inner function memory leak */
    }; // _PR._runPreloadHueQueue

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} path - The path of the image to be preloaded
     * @param {Boolean} smooth - The smooth of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     */
    _PR._preloadMiscImg = function(path, smooth, hue) {
        if (!_PR._IS_VALID_HUE(hue)) { // Users might input raw values directly
            return _PR._SHOW_INVALID_IMG_HUE(path, hue);
        }
        _PR._preloadValidMiscImg.call(this, path, hue, smooth);
    }; // _PR._preloadMiscImg

    /**
     * The this pointer is ImageManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} path - The path of the image to be preloaded
     * @param {Hue} hue - The hue of the image to be preloaded
     * @param {Boolean} smooth - The smooth of the image to be preloaded
     */
    _PR._preloadValidMiscImg = function(path, hue, smooth) {
        var folderFilename = path.split("/"), filename = folderFilename[1];
        var folder = "img/" + folderFilename[0] + "/";
        // Users might input raw values or empty images directly
        if (!folder && filename) return; // Empty images are allowed
        //
        // Extracting them into a method would pass redundant variables
        var reservationId = _PR._MISC_IMG_RESERVATION_ID(path, hue, smooth);
        this.reserveBitmap(folder, filename, hue, smooth, reservationId);
        //
    }; // _PR._preloadValidMiscImg

})(DoubleX_RMMV.Preloaded_Resources); // ImageManager

/*----------------------------------------------------------------------------
 *    # Edit class: AudioManager
 *      - Caches all previously created WebAudios and preloads them all
 *----------------------------------------------------------------------------*/

(function(PR) {

    "use strict";

    PR.AudioManager = { orig: {}, new: {} };
    var DM = PR.DataManager.new;
    var _AM = PR.AudioManager.orig, _PR = PR.AudioManager.new;

    _PR._PRELOAD_AUDIO_PARAM_FOLDERS = {
        preloadedBGMs: "bgm",
        preloadedBGSs: "bgs",
        preloadedMEs: "me",
        preloadedSEs: "se"
    }; // _PR._PRELOAD_AUDIO_PARAM_FOLDERS

    _PR._PRELOAD_AUDIO_PARAMS = Object.keys(_PR._PRELOAD_AUDIO_PARAM_FOLDERS);
    _PR._PRELOAD_AUDIO_PARAMS.push("preloadedStaticSEs");
    _PR._PRELOAD_AUDIO_PARAMS.push("preloadedMiscAudios");

    // Marks which audio parameters have finished preloading audio files
    AudioManager._isAudioParamPreloaded = {}; // New private variable
    //
    // Stores the mapping from all urls to their preloaded web audios
    AudioManager._preloadedWebAudios = {}; // New private variable
    //

    _AM.createBuffer = AudioManager.createBuffer;
    _PR.createBuffer = AudioManager.createBuffer = function(folder, name) {
    // v1.00a - v1.00a; Rewritten
        // Rewritten to cache the already created WebAudio instead
        var url = _PR._bufferUrl.call(this, folder, name);
        if (_PR._isHTML5Audio.call(this, folder)) {
            return _PR._html5Audio.call(this, url);
        } else return _PR._webAudio.call(this, url);
        //
    }; // AudioManager.createBuffer

    /**
     * DON'T CALL THIS MANUALLY UNLESS YOU REALLY KNOW WHAT YOU'RE TRULY DOING
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    AudioManager.preloadAudios = function(params) {
        if (DM.BOOL_PARAM_RESULT(params.IsPreloadAudio)) {
            return _PR._preloadAudios.call(this, params);
        }
        DataManager.onFinishPreload("IsPreloadAudio");
    }; // AudioManager.preloadAudios

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} folder - The name of the folder under the audio folder
     * @param {String}  name - The name of the audio to create its buffer
     */
    AudioManager.invalidateCachedWebAudio = function(folder, name) {
        var url = _PR._bufferUrl.call(this, folder, name);
        // Using isStaticSe might risk name collision for non se audios
        if (!this._staticBuffers.contains(this._preloadedWebAudios[url])) {
            delete this._preloadedWebAudios[url];
        }
        //
    }; // AudioManager.invalidateCachedWebAudio

    /**
     * The this pointer is AudioManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {String} folder - The name of the folder under the audio folder
     * @param {String}  name - The name of the audio to create its buffer
     * @returns {String} The url of the audio buffer to be created
     */
    _PR._bufferUrl = function(folder, name) {
        var ext = this.audioFileExt();
        return this._path + folder + "/" + encodeURIComponent(name) + ext;
    }; // _PR._bufferUrl

    /**
     * The this pointer is AudioManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {String} folder - The name of the folder under the audio folder
     * @returns {Boolean} The check result
     */
    _PR._isHTML5Audio = function(folder) {
        // shouldUseHtml5Audio is false now but might be changed by plugins
        return folder === "bgm" && this.shouldUseHtml5Audio();
        //
    }; // _PR._isHTML5Audio

    /**
     * The this pointer is AudioManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {String} url - The url of the audio buffer to be created
     * @returns {Html5Audio} The Html5Audio as the audio buffer to be created
     */
    _PR._html5Audio = function(url) {
        Html5Audio.setup(this._blobUrl || url);
        return Html5Audio;
    }; // _PR._html5Audio

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} url - The url of the audio buffer to be created
     * @returns {WebAudio} The WebAudio as the audio buffer to be created
     */
    _PR._webAudio = function(url) {
        if (!this._preloadedWebAudios[url]) {
            this._preloadedWebAudios[url] = new WebAudio(url);
        }
        return this._preloadedWebAudios[url];
    }; // _PR._webAudio

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    _PR._preloadAudios = function(params) {
        _PR._preloadAudioInFolders.call(this, params);
         var interval = params.preloadAudioMSInterval;
        _PR._preloadStaticSEs.call(this, params.preloadedStaticSEs, interval);
        _PR._preloadMiscAudios.call(this, params.preloadedMiscAudios, interval);
    }; // _PR._preloadAudios

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     */
    _PR._preloadAudioInFolders = function(params) {
        // This method's called only once anyway so it won't hurt performance
        Object.keys(_PR._PRELOAD_AUDIO_PARAM_FOLDERS).forEach(function(param) {
            _PR._preloadAudioInFolder.call(this, params, param);
        }, this);
        // Not binding _preloadAudioInFolder is to minimize preload memory leaks
    }; // _PR._preloadAudioInFolders

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The mapping of all parameter name-value pairs
     * @param {Param} param - The name of the parameter of audios in folder
     */
    _PR._preloadAudioInFolder = function(params, param) {
        var folder = _PR._PRELOAD_AUDIO_PARAM_FOLDERS[param];
        // Not binding _preloadAudio is to minimize preload memory leaks
        var func = function(audio) {
            _PR._preloadAudio.call(AudioManager, folder, audio);
        }, audios = params[param];
        //
        var interval = params.preloadAudioMSInterval;
        _PR._runPreloadAudioQueue.call(this, audios, param, func, interval);
    }; // _PR._preloadAudioInFolder

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[String]} audios - The list of misc audio file paths
     * @param {Number} interval - The number of milliseconds as interval
     */
    _PR._preloadStaticSEs = function(audios, interval) {
        // Not binding loadStaticSe is to minimize preload memory leaks
        var func = function(audio) { AudioManager.loadStaticSe(audio); };
        //
        var param = "preloadedStaticSEs";
        _PR._runPreloadAudioQueue.call(this, audios, param, func, interval);
    }; // _PR._preloadStaticSEs

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[String]} audios - The list of misc audio file paths
     * @param {Number} interval - The number of milliseconds as interval
     */
    _PR._preloadMiscAudios = function(audios, interval) {
        // Not binding _preloadMiscAudio is to minimize preload memory leaks
        var func = function(audio) {
            _PR._preloadMiscAudio.call(AudioManager, audio);
        }, param = "preloadedMiscAudios";
        //
        _PR._runPreloadAudioQueue.call(this, audios, param, func, interval);
    }; // _PR._preloadMiscAudios

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} audios - The list of filenames of the audios to preload
     * @param {Param} param - The name of the parameter of audios in folder
     * @param {(**)} preloadFunc - The function preloading the audio file
     * @param {Number} interval - The number of milliseconds as interval
     */
    _PR._runPreloadAudioQueue = function(audios, param, preloadFunc, interval) {
        DataManager.preloadResourceNum += audios.length;
        // Using inner function's more performant by avoiding repeated bindings
        var isSetTimeout = interval > 0; // It's better than redundant checkings
        (function preload() {
            if (audios.length <= 0) {
                return _PR._onFinishPreloadAudios.call(AudioManager, param);
            }
            // Extracting them into a function can hurt perload time and memory
            preloadFunc(audios.shift());
            DataManager.preloadResourceProgress++;
            isSetTimeout ? setTimeout(preload, interval) : preload();
            //
        })();
        /** @todo Thinks of a way to eliminate the inner function memory leak */
    }; // _PR._runPreloadAudioQueue

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of audios in folder
     */
    _PR._onFinishPreloadAudios = function(param) {
        console.info("All audios specified in " + param + " are preloaded.");
        this._isAudioParamPreloaded[param] = true;
        if (!_PR._areAllAudioParamsPreloaded.call(this)) return;
        DataManager.onFinishPreload("IsPreloadAudio");
    }; // _PR._onFinishPreloadAudios

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The check result
     */
    _PR._areAllAudioParamsPreloaded = function() {
        var preloadAudioParams = _PR._PRELOAD_AUDIO_PARAMS;
        return preloadAudioParams.every(_PR._isAudioParamPreloaded, this);
    }; // _PR._areAllAudioParamsPreloaded

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Param} param - The name of the parameter of audios in folder
     * @returns {Boolean} The check result
     */
    _PR._isAudioParamPreloaded = function(param) {
        return this._isAudioParamPreloaded[param];
    }; // _PR._isAudioParamPreloaded

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} preloadedMiscAudio - The misc audio file to be preloaded
     */
    _PR._preloadMiscAudio = function(preloadedMiscAudio) {
        var args = preloadedMiscAudio.split("/");
        _PR._preloadAudio.call(this, args[0], args[1]);
    }; // _PR._preloadMiscAudio

    /**
     * The this pointer is AudioManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} folder - The name of the folder under the audio folder
     * @param {String} name - The name of the audio to be preloaded
     */
    _PR._preloadAudio = function(folder, name) {
        // Users might input raw values or empty audios directly
        if (folder && name) this.createBuffer(folder, name);
        //
    }; // _PR._preloadAudio

})(DoubleX_RMMV.Preloaded_Resources); // AudioManager
