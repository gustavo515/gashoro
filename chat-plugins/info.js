exports.commands = {
	foro: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<a href=\"http://ultimatepsim.proboards.com\">Foro de Ultimate Server!</a>");
	},  
	ultimatebase: 'baseultimate', 
    bu: 'baseultimate', 
    ub: 'baseultimate',	
	baseultimate: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<a href=\"http://i.snag.gy/cNgSR.jpg\">Base Ultimate ORAS! (Code)</a>");
	}, 
	admins: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<strong>Administradores de Ultimate: Bryan AA, Topp Dogg, Evilness, The Bleeding, Black Petals, y Klaymore.</strong>");
	},  
	viph: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("Los usuarios vip (√) son aquellos que han donado al servidor.");
	},   
    vipfeatures: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<strong>- Vip Standard 5$ -</strong><br />" +
			              "- Custom Avatar<br />" + 
                          "- 60,000 pds<br />" + 
			              "- Rango vip<br />" + 
                          "<strong>- Vip Gold 10$ -</strong><br />" + 
                          "- Custom Avatar<br />" + 
                          "- 200,000 pds<br />" +
                          "- Sala propia (Publica o Privada)<br />" );
	}, 	 
	 afkhelp: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<strong> Comandos de Afk : </strong><br />" +
			              "/ausente <br />" + 
                          "/ocupado <br />" + 
			              "/comiendo <br />" +  
						  "/aburrido <br />" + 
                          "/durmiendo <br />" + 
                          "/grabando (Especialmente para los youtubers)<br />" + 
                          "/programando (Especialmente para los programadores del servidor).<br />" +  
                          "<br />" );
	}, 	
        stafflist: 'authlist',
	authlist: function (target, room, user, connection) {
		var rankLists = {};
		for (var u in Users.usergroups) {
			var rank = Users.usergroups[u][0];
			var name = Users.usergroups[u].slice(1);
			if (!rankLists[rank]) rankLists[rank] = [];
			if (name) name = name.replace("\n", "").replace("\r", "");
			rankLists[rank].push(name);
		}
		var buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return Config.groups[b].rank - Config.groups[a].rank;
		}).forEach(function (r) {
			buffer.push(Config.groups[r].name + "s (" + r + "):\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) {
			buffer = "This server has no auth.";
		}
		connection.popup(buffer.join("\n\n"));
	},

	fb: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<strong>Se est&aacute;n buscando batallas en ladder</strong>: " + Tools.escapeHTML(Object.keys(Rooms.rooms.global.searchers.reduce(function (prev, search) {
			prev[Tools.getFormat(search.formatid).name] = 1;
			return prev;
		}, {})).join(", ")));
	},

	clearall: function (target, room, user) {
		if (!this.can('makeroom')) return this.sendReply('/clearall - Access denied.');
		var len = room.log.length,
			users = [];
		while (len--) {
			room.log[len] = '';
		}
		for (var user in room.users) {
			users.push(user);
			Users.get(user).leaveRoom(room, Users.get(user).connections[0]);
		}
		len = users.length;
		setTimeout(function() {
			while (len--) {
				Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
			}
		}, 1000);
	},

	roomlist: function (target, room, user) {
		if (!this.can('roomlist')) return;
		var rooms = Object.keys(Rooms.rooms);
		var len = rooms.length;
		var official = ['<b><font color="#1a5e00" size="2">Salas oficiales:</font></b><br><br>'];
		var nonOfficial = ['<hr><b><font color="#000b5e" size="2">Salas no-oficiales:</font></b><br><br>'];
		var privateRoom = ['<hr><b><font color="#5e0019" size="2">Salas privadas:</font></b><br><br>'];
		while (len--) {
			var _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			if (_room.type === 'chat') {
				if (_room.isOfficial) {
					official.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a> |'));
				} else if (_room.isPrivate) {
					privateRoom.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a> |'));
				} else {
					nonOfficial.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a> |'));
				}
			}
		}
		this.sendReplyBox(official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' '));
	}
};
