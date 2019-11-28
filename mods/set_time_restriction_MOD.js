module.exports = {

	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------

	name: "Set Time Restriction",

	//---------------------------------------------------------------------
	// Action Section
	//
	// This is the section the action will fall into.
	//---------------------------------------------------------------------

	section: "Other Stuff",

	//---------------------------------------------------------------------
	// Action Subtitle
	//
	// This function generates the subtitle displayed next to the name.
	//---------------------------------------------------------------------

	subtitle: function (data) {

		let value = parseInt(data.value);
		return `Command Cooldown: ${parseInt(data.value)/1000} seconds`;
	},

	//---------------------------------------------------------------------
	// DBM Mods Manager Variables (Optional but nice to have!)
	//
	// These are variables that DBM Mods Manager uses to show information
	// about the mods for people to see in the list.
	//---------------------------------------------------------------------

	// Who made the mod (If not set, defaults to "DBM Mods")
	author: "Aamon#9130",

	// The version of the mod (Defaults to 1.0.0)
	version: "1.9.5", //Added in 1.9.5

	mod_version: "3",

	// A short description to show on the mod line for this mod (Must be on a single line)
	short_description: "This mod will restrict a command",

	//---------------------------------------------------------------------

	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------

	variableStorage: function (data, varType) {
		const type = parseInt(data.storage);
		if (type !== varType) return;
		return ([data.varName, 'Number']);
	},

	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------

	fields: ["value", "iftrue", "iftrueVal", "iffalse", "iffalseVal", "storage", "varName"],

	//---------------------------------------------------------------------
	// Command HTML
	//
	// This function returns a string containing the HTML used for
	// editting actions.
	//
	// The "isEvent" parameter will be true if this action is being used
	// for an event. Due to their nature, events lack certain information,
	// so edit the HTML to reflect this.
	//
	// The "data" parameter stores constants for select elements to use.
	// Each is an array: index 0 for commands, index 1 for events.
	// The names are: sendTargets, members, roles, channels,
	//                messages, servers, variables
	//---------------------------------------------------------------------

	html: function (isEvent, data) {
		return `
	<div>
		<div>
			<p>
			Made by <b>${this.author}</b> and improved by <b>LeonZ</b>.<br>
			With this MOD you can now to adjust command time restriction. 
			</p>
		</div>
		<div style="float: left; width: 104%; padding-top: 8px;">
			Time:<br>
			<input id="value" class="round" type="text" placeholder="Insert Miliseconds Here (eg: 1000 for 1 second)..."><br>
		</div><br><br><br>
		<div style="padding-top: 8px;">
			${data.conditions[0]}
		</div><br><br><br>
		<div style="padding-top: 8px;">
			<div style="float: left; width: 35%;">
				Store Left Time In:<br>
				<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
					${data.variables[0]}
				</select>
			</div>
			<div id="varNameContainer" style="float: right; width: 60%; display: none;">
				Variable Name:<br>
				<input id="varName" class="round" type="text"><br>
			</div>
		</div>
	</div>`
	},

	//---------------------------------------------------------------------
	// Action Editor Init Code
	//
	// When the HTML is first applied to the action editor, this code
	// is also run. This helps add modifications or setup reactionary
	// functions for the DOM elements.
	//---------------------------------------------------------------------

	init: function () {
		const {glob, document} = this;

		glob.variableChange(document.getElementById('storage'), 'varNameContainer');
		glob.onChangeTrue(document.getElementById('iftrue'));
		glob.onChangeFalse(document.getElementById('iffalse'));
	},

	//---------------------------------------------------------------------
	// Action Bot Function
	//
	// This is the function for the action within the Bot's Action class.
	// Keep in mind event calls won't have access to the "msg" parameter,
	// so be sure to provide checks for variable existance.
	//---------------------------------------------------------------------

	action: function (cache) {
		const data = cache.actions[cache.index];
		const Files = this.getDBM().Files;
		const value = parseInt(data.value);
		const msg = this.getMessage(0, "", cache);

		//Get for the command object
		const Actions = cache.actions;
		let cmd;
		const allData = Files.data.commands;
		Object.keys(allData).forEach(function(command) {
			if (allData[command]) {
				if (JSON.stringify(allData[command].actions) === JSON.stringify(Actions)) {
					cmd = allData[command];
				}
			}
		});
		const timeLeft = (this.TimeRestriction(msg, cmd, value) / 1000).toFixed(1);
		//Check for the result

		let result;
		if (timeLeft > 0) {
			result = true;
		} else {
			result = false;
		}
		if (timeLeft !== undefined) {
			const storage = parseInt(data.storage);
			const varName2 = this.evalMessage(data.varName, cache);
			this.storeValue(timeLeft, storage, varName2, cache);
		};
		this.executeResults(result, data, cache);
	},

	//---------------------------------------------------------------------
	// Action Bot Mod
	//
	// Upon initialization of the bot, this code is run. Using the bot's
	// DBM namespace, one can add/modify existing functions if necessary.
	// In order to reduce conflictions between mods, be sure to alias
	// functions you wish to overwrite.
	//---------------------------------------------------------------------

	mod: function (DBM) {

		const Discord = require('discord.js');
		var Cooldown = new Discord.Collection();

		DBM.Actions.TimeRestriction = function (msg, cmd, value) {
			if (!Cooldown.has(cmd.name)) {
				Cooldown.set(cmd.name, new Discord.Collection());
			}
			let now = Date.now();
			let ChannelId;
			if (typeof msg.channel.guild !== "undefined") {
				ChannelId = msg.channel.guild.id;
			} else {
				ChannelId = msg.channel.id;
			}
			var Command = Cooldown.get(cmd.name);
			var cooldownAmount = (cmd.cooldown || value);
			cmd.cooldown = cooldownAmount;
			if (Command.has(msg.author.id)) {
				var Member = Command.get(msg.author.id)
				if (Member.has(ChannelId)) {
					let expirationTime = Member.get(ChannelId) + cooldownAmount;
					if (now < expirationTime) {
						return (expirationTime - now).toFixed(0);
					} else {
						Member.set(ChannelId, now)
						return 0;
					}
				} else {
					Command.get(msg.author.id).set(ChannelId, now);
					return 0;
				}
			} else {
				Command.set(msg.author.id, new Discord.Collection());
				Command.get(msg.author.id).set(ChannelId, now);
				return 0;
			}
		};
	}

}; // End of module