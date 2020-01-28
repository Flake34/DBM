module.exports = {

	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
	
	name: "Store Audit Log List MOD",
	
	//---------------------------------------------------------------------
	// Action Section
	//
	// This is the section the action will fall into.
	//---------------------------------------------------------------------
	
	section: "Server Control",
	
	//---------------------------------------------------------------------
	// Action Subtitle
	//
	// This function generates the subtitle displayed next to the name.
	//---------------------------------------------------------------------
	
	subtitle: function(data) {
		const storage = ['All Member', 'Mentioned User', 'Command Author', 'tempVars', 'serverVars', 'globalVars'];
		const type = ['All Type', 'Update Server', 'Create Channel', 'Update Channel','Delete Channel', 'Create Channel Permission', 'Update Channel Permission', 'Delete Channel Permission', 'Kick Member', 'Prune Members', 'Ban Member', 'Unban Member', 'Update Member', 'Update Member Roles', 'Move Member', 'Disconnect Member', 'Add Bot', 'Create Role', 'Update Role', 'Delete Role', 'Create Invite', 'Update Invite', 'Delete Invite', 'Create Webhook', 'Update Webhook', 'Delete Webhook', 'Create Emoji', 'Update Emoji', 'Delete Emoji', 'Delete Messages', 'Bulk Delete Messages', 'Pin Message', 'Unpin Message', 'Create Integration', 'Update Intergration', 'Delete Integration'];
		if (data.storage == 0 || data.storage == 1 || data.storage == 2) {
			return `Store ${storage[parseInt(data.storage)]} - ${type[parseInt(data.type)]}`;
		} else {
			return `Store ${storage[parseInt(data.storage)]}("${data.varName}") - ${type[parseInt(data.type)]}`;
		};
	},
	
	//https://github.com/LeonZ2019/
	author: "LeonZ",
	version: "1.1.0",
	
	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------
	
	variableStorage: function(data, varType) {
		const type = parseInt(data.storage2);
		if(type !== varType) return;
		const info = parseInt(data.info);
		let dataType = 'Audit Log List';
		return ([data.varName2, dataType]);
	},
	
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
	
	fields: ["storage", "varName", "type", "before", "after", "limit", "storage2", "varName2"],
	
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
	
	html: function(isEvent, data) {
		return `
	<div>
		<div style="float: left; width: 35%;">
			Filter Member:<br>
			<select id="storage" class="round" onchange="glob.onChange0(this)">
				<option value="0" selected>All</option>
				<option value="1">Mentioned User</option>
				<option value="2">Command Author</option>
				<option value="3">Temp Variable</option>
				<option value="4">Server Variable</option>
				<option value="5">Global Variable</option>
			</select><br>
		</div>
		<div id="varNameContainer" style="display: none; float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName" class="round" type="text"><br>
		</div>
	</div><br><br><br>
	<div>
		<div style="float: left; width: 94%;">
			Action Type:<br>
			<select id="type" class="round">
				<option value="0" selected>All</option>
				<option value="1">Update Server</option>
				<option value="2">Create Channel</option>
				<option value="3">Update Channel</option>
				<option value="4">Delete Channel</option>
				<option value="5">Create Channel Permission</option>
				<option value="6">Update Channel Permission</option>
				<option value="7">Delete Channel Permission</option>
				<option value="8">Kick Member</option>
				<option value="9">Prune Members</option>
				<option value="10">Ban Member</option>
				<option value="11">Unban Member</option>
				<option value="12">Update Member</option>
				<option value="13">Update Member Roles</option>
				<option value="14">Move Member</option>
				<option value="15">Disconnect Member</option>
				<option value="16">Add Bot</option>
				<option value="17">Create Role</option>
				<option value="18">Update Role</option>
				<option value="19">Delete Role</option>
				<option value="20">Create Invite</option>
				<option value="21">Update Invite</option>
				<option value="22">Delete Invite</option>
				<option value="23">Create Webhook</option>
				<option value="24">Update Webhook</option>
				<option value="25">Delete Webhook</option>
				<option value="26">Create Emoji</option>
				<option value="27">Update Emoji</option>
				<option value="28">Delete Emoji</option>
				<option value="29">Delete Messages</option>
				<option value="30">Bulk Delete Messages</option>
				<option value="31">Pin Message</option>
				<option value="32">Unpin Message</option>
				<option value="33">Create Integration</option>
				<option value="34">Update Integration</option>
				<option value="35">Delete Integration</option>
			</select><br>
		</div>
	</div><br><br><br>
	<div>
		<div style="float: left; width: 48%;">
			Before Entry / Timestamp:<br>
			<input id="before" class="round" type="text" placeholder="Leave it blank for None."><br>
		</div>
		<div style="float: left; width: 51%; padding-left: 3px">
			After Entry / Timestamp:<br>
			<input id="after" class="round" type="text" placeholder="Leave it blank for None."><br>
		</div>
	</div><br><br><br>
	<div>
		<div style="float: left; width: 104%;">
			Amount to Fetch:<br>
			<input id="limit" class="round" type="text" placeholder="Leave it blank for All."><br>
		</div>
	</div><br><br><br>
	<div>
		<div style="float: left; width: 35%;">
			Store In:<br>
			<select id="storage2" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div style="float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName2" class="round" type="text">
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
	
	init: function() {
		const {glob, document} = this;
		const varNameContainer = document.getElementById('varNameContainer');
		
		glob.onChange0 = function(storage) {
			switch(parseInt(storage.value)) {
				case 0:
				case 1:
				case 2:
					varNameContainer.style.display = 'none';
					break;
				default:
					varNameContainer.style.display = null;
					break;
			}
		}
	
		glob.onChange0(document.getElementById('storage'));
	},
	
	//---------------------------------------------------------------------
	// Action Bot Function
	//
	// This is the function for the action within the Bot's Action class.
	// Keep in mind event calls won't have access to the "msg" parameter, 
	// so be sure to provide checks for variable existance.
	//---------------------------------------------------------------------
	
	action: function(cache) {
		const data = cache.actions[cache.index];
		const server = cache.server;
		if (!server) {
			this.callNextAction(cache);
			return;
		}
		const member = parseInt(data.storage);
		let mem;
		switch (member) {
			case 0:
				break;
			default:
				const varName = this.evalMessage(data.varName, cache);
				mem = this.getMember(member-1, varName, cache);
				break;
		}
		let before = this.evalMessage(data.before, cache);
		let after = this.evalMessage(data.after, cache);
		let limit = parseInt(this.evalMessage(data.limit, cache));
		let type = parseInt(data.type);
		const options = {};
		if (type != 0) {
			options.type = type;
		} else {
			options.type = null;
		}
		if (typeof before == "object" || !isNaN(before)) {
			options.before = before;
		}
		if (typeof after == "object" || !isNaN(after)) {
			options.after = after;
		}
		if (limit && !isNaN(limit)) {
			options.limit = limit;
		}
		if (mem) {
			options.user = mem;
		}
		let result = [];
		server.fetchAuditLogs(options).then(audits => {
  			audits.entries.forEach(function(entry) {
				result.push(entry)
			  })
			const storage2 = parseInt(data.storage2);
			const varName2 = this.evalMessage(data.varName2, cache);
			if (result.length != 0) {
				this.storeValue(result, storage2, varName2, cache);
			}
			this.callNextAction(cache);
		})
	},
	
	//---------------------------------------------------------------------
	// Action Bot Mod
	//
	// Upon initialization of the bot, this code is run. Using the bot's
	// DBM namespace, one can add/modify existing functions if necessary.
	// In order to reduce conflictions between mods, be sure to alias
	// functions you wish to overwrite.
	//---------------------------------------------------------------------
	
	mod: function(DBM) {
	}
	
	}; // End of module