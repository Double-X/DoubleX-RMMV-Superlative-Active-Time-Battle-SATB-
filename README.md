My patreon: https://www.patreon.com/doublex

Mentioned patreon supporters: https://www.patreon.com/posts/71738797

IMPORTANT: YOU MUST OWN A LEGEL COPY OF THE RMMV SOFTWARE TO USE THIS PROJECT

Please note that this plugin's still under developement. Currently the following modules are completed:
1. Core Module
   - Lets you enable and disable this plugin on the fly
   - Lets you define the battle turn in terms of number of actions executed, or frames/seconds elapsed
   - Lets you set the maximum ATB value of each battler
   - Lets you set some states to have their turn counts updated right before the battler involved executes actions
2. Hotkey Module(v0.01a+)
   - Lets you set some hotkeys to change the currently selected inputable actors
3. Wait Module(v0.02a+)
   - Lets you set the ATB frame update wait conditions
   - Lets you show the ATB frame update force status
   - Lets you set some hotkeys to forcibly run/stop the ATB frame updates
   - Lets you show some clickable command windows behaving like the aforementioned hotkeys
4. Bar Module(v0.03a+)
   - Lets you show the battler ATB bars on the battler sprites
   - Lets you show the actor ATB bars attached to the status window
5. Charge Module(v0.04a+)
    - Lets you set some skills/items to need to be charged before being executed
    - Lets you set some hotkeys to cancel the action being charged(this applies to those not needing charging as well if the players cancel fast enough)
    - Lets you set some hotkeys to force the action charge so it can be executed before the charge's full or overcharged beyond the maximum charge value
6. Cooldown Module(v0.05a+)
   - Lets you set some skills/items to cause the battler involved need to be cooled down after executing those skills/items
   - Lets you set some hotkeys to cancel the the battler cooldown
7. Countdown Module(v0.12a+)
   - Lets you set some states to have their turn count updated basedon the number of frames/seconds elapsed, with additional effectstriggered upon each turn count update
8. CTB Module(v0.13a+)
   - Lets you change toggle the battle system between ATB and CTB on the fly and even during the same battle(you can actually set a hotkey to do that in battle)
9. Delay Module(v0.15a+)
   - Lets you set the amount of delay between becoming able to input actions and actually inputting them for battlers can't have their actions inputted by the player(enemies and actors with auto battle or confusion)
10. Event Module(v0.06a+)
    - Lets you set some additional events to be triggered upon important timings inthe ATB system
10. Order Module(v0.14a)+
    - Lets you show the ATB values of all battlers in the same ATB bar
    - Lets you show the battler action ordering in the CTB system style(You should only use this with the full wait mode unless you really know what you're truly doing)
11. Rate Module(v0.10a+)
    - Lets you set the ATB, charge and cooldown fill rate for each battler
12. Reset Module(v0.07a+)
    - Lets you set the ATB value of each battler right after that battler has executed an action and becomes out of virtual action slots
13. Speed Module(v0.08a+)
    - Lets you set the action execution priority among all battlers being able to execute actions(it likely means next to nothing in the full wait mode)
14. Start Module(v0.09a+)
    - Lets you set the starting ATB value upon normal, preemptive and surprise battle starts
15. Turn Module(v0.11a+)
    - Lets you show the progress of the current battle turn

While the following modules are upcoming:
1. Exchange Module
   - Lets you set some skills/items to exchange the charging skill/item of the targets with the cooldown of the action exeuction subject triggering the exchange
   - This can apply to skills/items with multiple targets but the setup can be very complicated and convoluted this way
2. Status Module
   - Shows the charge, cooldown, action cost and ATB reset settings for each skill/item in battle and outside battle
   - Shows the ATB statues for each actor in the actor status window outside battle
3. Action Module
   - Lets you set the number of virtual action slots needed for skills/items
   - Lets you demands players to input all the virtual action slots at once before executing them all as a batch
   - Lets you set how the virtual action slots are gained(gain all upon a single full ATB or gain 1 upon each full ATB then empties the ATB afterwards until the number of virtual action slots reaches the limited specified by Action Times+)
   - Lets you abandon the concept of virtual action slots altogether and base the action cost in the form of subtracting the battler ATB value
4. Combo Module
   - Lets you set some charging skills/items made by different battlers to form a new combo skills under certain conditions
5. Escape Module
   - Lets you set the conditions allowing party escape attempt
   - Lets you set the charging requirements for the party escape attempt
   - Lets you set the cooldown requirements for the failed party escape attempt
   - Lets you set the cost for failed party escape attempts
6. Overload Module
   - Lets you sets the ATB value of battlers to be beyond their maximum, but it'll slowly drop until it's dropped to its maximum
7. Pool Module
   - Lets you bind some battlers to share the same ATB pool
8. Unison Module
   - Lets you set some skills/items to be unison ones
And the following modules are possibly upcoming:
1. Type Module
   - Lets you have multiple ATB bars for each battler

IMPORTANT: THE COMPATIBILITY PLUGIN WILL NEVER ADDRESS ANY COMPATIBILITY ISSUE WITH ANY PLUGIN THAT ARE SUPPOSED TO HAVE RESTRICTED ACCESSES CURRENTLY(ESPECIALLY COMMERCIAL PLUGINS) WITHOUT THE DEMONSTRABLY EXPLICIT CONSENTS FROM THEIR RESPECTIVE AUTHORS TO AVOID VIOLATING THEIR TERMS OF USE

The following foreign plugins are addressed by the compatibility plugin:
1. MOG_BattleHud
   - https://atelierrgss.wordpress.com/rmv-battle-hud/
2. Yanfly Engine Plugins - Battle Engine Core
   - http://www.yanfly.moe/wiki/Battle_Engine_Core_(YEP)
3. (v0.05b+)SEK_ChangeActor
   - https://forums.rpgmakerweb.com/index.php?threads/sek_changeactor.63822/

The following foreign plugins are helpful when using this project:
1. QInput
   - https://quxios.github.io/plugins/QInput

Please note that I'll only place plugins that are made by myself in this repository.

Videos:
1. DoubleX RMMV Superlative ATB(Core Module Only)
   - https://www.youtube.com/watch?v=ZmW8ZGVwfy0
2. DoubleX RMMV Superlative ATB Compatibility(With MOG_BattleHud Only)
   - https://www.youtube.com/watch?v=0_v0KzU733E
3. DoubleX RMMV Superlative ATB Compatibility(With Yanfly Engine Plugins - Battle Engine Core Only)
   - https://www.youtube.com/watch?v=c6ZSvDVj0WM
4. (v0.01a+)Core And Hotkey Module Only
   - https://www.youtube.com/watch?v=4YyBFcj-nP0
5. (v0.02a+)DoubleX RMMV Superlative ATB(Core And Wait Module Only)
   - https://www.youtube.com/watch?v=8EfYexx8gVU
6. (v0.03a+)DoubleX RMMV Superlative ATB(Core And Bar Module Only)
   - https://www.youtube.com/watch?v=20UXh_qctNE
7. (v0.04a+)DoubleX RMMV Superlative ATB(Core And Charge Module Only)
   - https://www.youtube.com/watch?v=kkvGK2AoOY8
8. (v0.05a+)DoubleX RMMV Superlative ATB(Core And Cooldown Module Only)
   - https://www.youtube.com/watch?v=H3B4TU8cs2U
9. (v0.05b+)DoubleX RMMV Superlative ATB Compatibility(With SEK_ChangeActor Only)
   - https://www.youtube.com/watch?v=dgx51xE5Svw
10. (v0.06a+)DoubleX RMMV Superlative ATB(Core And Event Module Only)
    - https://www.youtube.com/watch?v=RVeEoSa-IdY
11. (v0.07a+)DoubleX RMMV Superlative ATB(Core And Reset Module Only)
    - https://www.youtube.com/watch?v=3KRIllS_rWc
12. (v0.08a+)DoubleX RMMV Superlative ATB(Core And Speed Module Only)
    - https://www.youtube.com/watch?v=r3g6H4r8ws0
13. (v0.09a+)DoubleX RMMV Superlative ATB(Core And Start Module Only)
    - https://www.youtube.com/watch?v=zOpBlz6G0YA
14. (v0.10a)DoubleX RMMV Superlative ATB(Core And Rate Module Only)
    - https://www.youtube.com/watch?v=kvrxnhagO4I
15. (v0.11a+)DoubleX RMMV Superlative ATB(Core And Turn Module Only)
    - https://www.youtube.com/watch?v=Nv1bEQAl3ik
16. (v0.12a+)DoubleX RMMV Superlative ATB(Core And Countdown Module Only)
    - https://www.youtube.com/watch?v=yw5UgvzTAIw
17. (v0.13a+)DoubleX RMMV Superlative ATB(Core And CTB Module Only)
    - https://www.youtube.com/watch?v=HaUuQnOlgfs
18. (v0.14a+)DoubleX RMMV Superlative ATB(Core And Order Module Only)
    - https://www.youtube.com/watch?v=5D8HR-sNH_w
19. (v0.15a+)(v0.15a+)DoubleX RMMV Superlative ATB(Core And Delay Module Only)
    - https://www.youtube.com/watch?v=WaPU38sIV2I

Posts:
1. https://www.patreon.com/doublex?filters[tag]=SATB

Articles(For fellow plugin developers who're interesting in thoroughly comprehending ATB system plugins):
1. 

Installation Instructions:
1. Create a new RMMV project
2. Download this repository as a zipped file
3. Unzip the zipped file into that new RMMV project(After clicking into the "DoubleX-RMMV-Superlative-Active-Time-Battle-SATB--master" folder)

Plugins Ordering:
1. DoubleX RMMV Superlative ATB Parameters(Mandatory as not all parameters have the configuration counterparts)
2. DoubleX RMMV Superlative ATB Configurations(Mandatory even if you never access the configurations yourselves)
3. DoubleX RMMV Superlative ATB Implementations(Mandatory)
4. DoubleX RMMV Superlative ATB Unit Tests(Optional but useful when debugging by validating parameters/configuration/notetag values and script call/plugin command arguments)
5. DoubleX RMMV Superlative ATB Compatibilities(Optional but should be placed below all addressed plugins when needed)
6. DoubleX RMMV Superlative ATB Compatibility Tests(Optional but useful when the unit test plugin's also enabled)
7. DoubleX RMMV Superlative ATB Documentations(Optional but highly recommended to check plugin versions and make reading documentations easier)

Getting Started:
1. Only the core, bar, hotkey and wait modules should be enabled when you first experience SATB
2. Play the demo to be familiar with the essential features and the demo first
3. Enable other modules of interest one at a time to be familiar with them one by one by playing the demo
4. Enable other compatible plugins to determine whether SATB suits your needs with those plugins
5. Only read the directly related parts of the documentation plugin and the help section of the parameters plugin when you've issues using this plugin, as they're too long to be read all at once :)

Plugin Users:
1. You're welcome to make bug reports, compatibility problem reports and feature requests as raising issues
2. You'll be in the contributor list for raising accetped issues if you want(you can also tell me how you want me to credit you)

Fellow Plugin Developers:
1. The SATB folder stores the flowchart of some parts of the implementations of this plugin and all the plugin older versions
2. Reference tags in this plugin are supposed to be searched across the same plugin file and multiple plugin files
4. You're welcome to submit pull requests for this project
5. You'll be in the contributor list for submitting accepted pull requests if you want(you can also tell me how you want me to credit you)

Using Older Versions:
1. Download the older version of the documentation plugin
2. That documentation plugin will tell you which versions of the other plugins to download
