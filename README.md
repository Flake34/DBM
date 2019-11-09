# DBM
Discord Bot Maker Raw Data & Mods & Scripts

## Installation
- Raw Data - Copy raw and paste to Command raw data
- Script - Copy raw and paste to Run Script action
- Mods - Download and paste to DBM action folder ("\steamapps\common\Discord Bot Maker\actions")

## Mods Preview
- Store Image Info
- Unban Member
- Check Parameter
- Check if Channel in Category
- Variable Pattern
- Delete Bulk Message
- Clone Channel
- Delete Member Data
- Delete Server Data
- Image Packs
  - Canvas Create Image
  - Canvas Draw Text on Image
  - Canvas Draw Image on Image
  - Canvas Image Options
  - Canvas Send Image
- Base Convert
- Canvas Edit Image Border
- Canvas Generate Progress Bar
- Canvas Save Image
- Canvas Image Filter
- Convert Text to List
- Loop Packs
  - Loop Start
  - Loop End
- Anchor Packs
  - Create Anchor
  - Jump Anchor
- Delete Bulk Messages MOD
- Edit Embed Object MOD
- Set Time Restriction MOD
- Store Data List MOD
- Store Ban Info MOD
- Canvas Crop Image

## Raw Data Preview
- curse_word_detect_event
- rank_command
- unban_command
- Invite_system

## Script Preview
- Ban Script
- Check if channel in a Category
- Speedtest.net Script

## Mods Function
- **Store Image Info** Store only image `dimension x` and `dimentions y` in pixel
- **Unban Member** Unban by `member id` or `member name`
- **Check Parameter** Added option `less than or equal` and `more than or equal`

- **Check if Channel in Catergory** Check go by `if true` and `if false`

- **Variable Pattern**  Change variable value by adding pattern include `Repeat every character`, `Change character to character`, `Add character to Front`, `Add character to End`, `Add character to Specific Position`, `Store character from front`, `Store character from end`, `Store one character`
![Varaible Pattern](src/variable_pattern.png)
- **Delete Bulk Message** Solved error inside event `TypeError: Cannot read property 'id' of undefined`
- **Clone Channel**
  - Text channel able to clone include `Channel Name`, `Slow Mode`, `NSFW`, `Topic`, `Permissions`
  - Voice channel able to clone include `Channel Name`, `User Limit`, `Bitrate`, `Permissions`
- **Delete Member Data** Delete specific member data or leave it blank to delete all member data
- **Delete Server Data** Delete specific server data or leave it blank to delete all server data
- **Base Convert** Convert range from base-2 to base-36
- **Canvas Edit Image Border** Edit the image border with circle and rounded corner feature
- **Canvas Generate Progress Bar** Generate to basic progress bar or circle progress bar
- **Canvas Save Image** Save canvas image to local and turn to image url for other actions
- **Canvas Image Filter** Add filter with value to image
- **Convert Text to List** Directly convert text to list with separator
- **Loop Packs** Loop inside action, for lists and loops only
- **Anchor Packs** Allow user jump to specific action with ID call, no longer need action number, color and description just for note only

## Raw Data Function
- **curse_word_detect_event** This event will detect all message send by all of member and then detect if include in the `curse list`
- **rank_command** Require mod `Store Member Data List` A rank system allow find the command author `xp` data and rank in global
- **unban_command** unban by `Member_id`
- **Invite_system** This system will have 2 events, one event for getting store all invite code an refresh every 10 seconds. The other event getting which invite code when member join server

## Script Function
- **Ban Script** A ban system with bunch of function include `ban`, `unban`, `ban list`, `ban reason`, `ban member info`
- **Check if channel in a Category** Result will be `Category Object` if channel exist and inside category
- **Speedtest.net Script** Install `npm i speedtest-net`, test speed and send result in embed format

## Addition Note
1. **Canvas Draw Text on Image** error about and here is the solution (Windows tested only)
```
(node.exe:25264): Pango-WARNING **: 16:56:52.016: couldn't load font "Karma-Regular Not-Rotated 80px", falling back to "Sans Not-Rotated 80px", expect ugly output.
```
- Get font from here https://fonts.google.com/ , and you should download it with name **fonts.zip** or **Font-Name.zip**
- Put the `.ttf` file to bot's fonts directory
- Install the font to system
- Run the bot and check for console

2. **Canvas Image Filter** need install package from npm
- Link : https://www.npmjs.com/package/imagedata-filters
- Install `npm i imagedata-filters`

3. **Convert Text to List** Addition note to separator
- If your text is using newline, suggest put `[\r\n]+` to separator input box
- If your text is using `,`, put `,` to separator input box
