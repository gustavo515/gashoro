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
		this.sendReplyBox("Los usuarios vip (v) son aquellos que han donado al servidor.");
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
	},
	
	/*********************************************************
	 * Clan commands
	 *********************************************************/

	ayudagremio: 'ayudagremios',
	comandosgremios: 'ayudagremios',
	comandosgremio: 'ayudagremios',
	ayudagremios: function () {
		if (!this.canBroadcast()) return false;
		this.sendReplyBox(
			"<big><b>Comandos Básicos:</b></big><br /><br />" +
			"/gremios - Lista los gremios.<br />" +
			"/comprarplaza - compra una plaza para el gremio al que se pertenece.<br />" +
			"/gremio (gremio/miembro) - Muestra la ficha/perfil de un gremio.<br />" +
			"/miembrosgremio (gremio/miembro) - muestra los miembros con los que cuenta un gremio.<br />" +
			"/gremioauth (gremio/miembro) - muestra la jerarquía de miembros de un gremio.<br />" +
			"/warlog (gremio/miembro) - muestra las 10 últimas wars de un gremio.<br />" +
			"/invitar - Invita a un usuario a unirse al gremio. Requiere ser Oficial del gremio.<br />" +
			"/expulsar (miembro) - Expulsa a un miembro del gremio. Requiere ser sub-lider del gremio.<br />" +
			"/aceptar (gremio) - Acepta una invitación al gremio.<br />" +
			"/invitacionesgremio (gremio/miembro) - Lista a los usuarios invitados a un gremio.<br />" +
			"/borrarinvitaciones - Borra las invitaciones pendientes al gremio. Requiere ser líder del gremio.<br />" +
			"/abandonargremio - Abandona el gremio.<br />" +
			"<br />" +
			"<big><b>Comandos de Autoridad:</b></big><br /><br />" +
			"/lidergremio (miembro) - Nombra a un miembro líder del gremio. Requiere ~<br />" +
			"/sublider (miembro) - Nombra a un miembro sub-líder del gremio. Requiere ser Líder del gremio.<br />" +
			"/oficial (miembro) - Nombra a un miembro oficial del gremio. Requiere ser sub-lider del gremio.<br />" +
			"/demotegremio (miembro) - Borra a un miembro del staff del gremio. Requiere ser Líder del gremio y ~ para demotear a un Líder.<br />" +
			"/lemagremio (lema) - Establece el Lema del gremio.<br />" +
			"/logogremio (logo) - Establece el Logotipo del gremio.<br />" +
			"/closeroom - Bloquea una sala de gremio a todos los que no sean miembros de dicho gremio, salvo administradores.<br />" +
			"/openroom - Elimina el bloqueo del comando /closeroom.<br />" +
			"/llamarmiembros o /fjg - Llama a los miembros de un gremio a su sala.<br />" +
			"/rk o /roomkick - Expulsa a un usuario de una sala. Requiere @ o superior.<br />" +
			"<br />" +
			"<big><b>Comandos de Administración:</b></big><br /><br />" +
			"/creategremio &lt;name> - Crea un gremio.<br />" +
			"/deletegremio &lt;name> - Elimina un gremio.<br />" +
			"/addmember &lt;gremio>, &lt;user> - Fuerza a un usuario a unirse a un gremio.<br />" +
			"/removemember &lt;gremio>, &lt;user> - Expulsa a un usuario del gremio.<br />" +
			"/setsalagremio &lt;gremio>,&lt;sala> - Establece una sala para un gremio.<br />" +
			"/setgxegremio &lt;gremio>,&lt;wins>,&lt;losses>,&lt;draws> - Establece la puntuación de un gremio.<br />" +
			"/serankgremio &lt;gremio>,&lt;puntos> - Establece la puntuación de un gremio.<br />" +
			"/settitlegremio &lt;gremio>&lt;puntos> - Estable un título para el gremio.<br />"
		);
	},

	creategremio: function (target) {
		if (!this.can('clans')) return false;
		if (target.length < 2)
			this.sendReply("El nombre del gremio es demasiado corto");
		else if (!Clans.createClan(target))
			this.sendReply("No se pudo crear el gremio. Es posible que ya exista otro con el mismo nombre.");
		else
			this.sendReply("Gremio: " + target + " creado con éxito.");

	},

	deletegremio: function (target) {
		if (!this.can('clans')) return false;
		if (!Clans.deleteClan(target))
			this.sendReply("No se pudo eliminar el gremio. Es posble que no exista o que se encuentre en war.");
		else
			this.sendReply("Gremio: " + target + " eliminado con éxito.");
	},

	listagremios: 'gremios',
	gremios: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var clansTableTitle = "Lista de Gremios";
		if (toId(target) === 'rank' || toId(target) === 'monedas' || toId(target) === 'prestigio' || toId(target) === 'puntuacion') {
			target = "rank";
			clansTableTitle = "Lista de Gremios por Número de Monedas";
		}
		if (toId(target) === 'miembros' || toId(target) === 'members') {
			target = "members";
			clansTableTitle = "Lista de Gremios por Miembros";
		}
		var clansTable = '<center><big><big><strong>' + clansTableTitle + '</strong></big></big><center><br /><table class="clanstable" width="100%" border="1" cellspacing="0" cellpadding="3" target="_blank"><tr><td><center><strong>Gremio</strong></center></td><td><center><strong>Nombre Completo</strong></center></td><td><center><strong>Miembros</strong></center></td><td><center><strong>Sala</strong></center></td><td><center><strong>Wars</strong></center></td><td><center><strong>Monedas</strong></center></td></tr>';
		var clansList = Clans.getClansList(toId(target));
		var auxRating = {};
		var nMembers = 0;
		var membersClan = {};
		var auxGxe = 0;
		for (var m in clansList) {
			auxRating = Clans.getElementalData(m);
			membersClan = Clans.getMembers(m);
			if (!membersClan) {
				nMembers = 0;
			} else {
				nMembers = membersClan.length;
			}
			clansTable += '<tr><td><center>' + Tools.escapeHTML(Clans.getClanName(m)) + '</center></td><td><center>' +Tools.escapeHTML(auxRating.compname) + '</center></td><td><center>' + nMembers + '</center></td><td><center>' + '<button name="send" value="/join ' + Tools.escapeHTML(auxRating.sala) + '" target="_blank">' + Tools.escapeHTML(auxRating.sala) + '</button>' + '</center></td><td><center>' + (auxRating.wins + auxRating.losses + auxRating.draws) + '</center></td><td><center>' + auxRating.rating + '</center></td></tr>';
		}
		clansTable += '</table>';
		this.sendReply("|raw| " + clansTable);
	},

	authgremio: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("El gremio especificado no existe o no está disponible.");
			return;
		}
		//html codes for clan ranks
		var leaderClanSource = Clans.getAuthMembers(target, 3);
		if (leaderClanSource !== "") {
			leaderClanSource = "<big><b>Líderes</b></big><br /><br />" + leaderClanSource + "</b></big></big><br /><br />";
		}
		var subLeaderClanSource = Clans.getAuthMembers(target, 2);
		if (subLeaderClanSource !== "") {
			subLeaderClanSource = "<big><b>Sub-Líderes</b></big><br /><br />" + subLeaderClanSource + "</b></big></big><br /><br />";
		}
		var oficialClanSource = Clans.getAuthMembers(target, 1);
		if (oficialClanSource !== "") {
			oficialClanSource = "<big><b>Oficiales</b></big><br /><br />" + oficialClanSource + "</b></big></big><br /><br />";
		}
		var memberClanSource = Clans.getAuthMembers(target, 0);
		if (memberClanSource !== "") {
			memberClanSource = "<big><b>Resto de Miembros</b></big><br /><br />" + memberClanSource + "</b></big></big><br /><br />";
		}

		this.sendReplyBox(
			"<center><big><big><b>Jerarquía del gremio " + Tools.escapeHTML(Clans.getClanName(target)) + "</b></big></big> <br /><br />" + leaderClanSource + subLeaderClanSource + oficialClanSource + memberClanSource + '</center>'
		);
	},

	miembros: 'miembrosgremio',
	miembrosgremio: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("El gremio especificado no existe o no está disponible.");
			return;
		}
		var nMembers = 0;
		var membersClan = Clans.getMembers(target);
		if (!membersClan) {
			nMembers = 0;
		} else {
			nMembers = membersClan.length;
		}
		this.sendReplyBox(
			"<strong>Miembros del gremio " + Tools.escapeHTML(Clans.getClanName(target)) + ":</strong> " + Clans.getAuthMembers(target, "all") + '<br /><br /><strong>Número de miembros: ' + nMembers + '</strong>'
		);
	},
	invitacionesgremio: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("El gremio especificado no existe o no está disponible.");
			return;
		}
		this.sendReplyBox(
			"<strong>Invitaciones pendientes del gremio " + Tools.escapeHTML(Clans.getClanName(target)) + ":</strong> " + Tools.escapeHTML(Clans.getInvitations(target).sort().join(", "))
		);
	},
	
	gremio: function (target, room, user) {
		var autoClan = false;
		var memberClanProfile = false;
		var clanMember = "";
		if (!target) autoClan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getProfile(target);
		if (!clan) {
			clanMember = target;
			target = Clans.findClanFromMember(target);
			memberClanProfile = true;
			if (target)
				clan = Clans.getProfile(target);
		}
		if (!clan && autoClan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getProfile(target);
			memberClanProfile = true;
			clanMember = user.name;
		}
		if (!clan) {
			this.sendReply("El gremio especificado no existe o no está disponible.");
			return;
		}
		var salaClanSource = "";
		if (clan.sala === "none") {
			salaClanSource = 'Aún no establecida.';
		} else {
			salaClanSource = '<button name="send" value="/join ' + Tools.escapeHTML(clan.sala) + '" target="_blank">' + Tools.escapeHTML(clan.sala) + '</button>';
		}
		var clanTitle = "";
		if (memberClanProfile) {
			var authValue = Clans.authMember(target, clanMember);
			if (authValue === 3) {
				clanTitle = clanMember + " - Líder del gremio " + clan.compname;
			} else if (authValue === 2) {
				clanTitle = clanMember + " - Sub-Líder del gremio " + clan.compname;
			} else if (authValue === 1) {
				clanTitle = clanMember + " - Oficial del gremio " + clan.compname;
			} else {
				clanTitle = clanMember + " - Miembro del gremio " + clan.compname;
			}
		} else {
			clanTitle = clan.compname;
		}
		var medalsClan = '';
		if (clan.medals) {
			for (var u in clan.medals) {
				medalsClan += '<img id="' + u + '" src="' + encodeURI(clan.medals[u].logo) + '" width="32" title="' + Tools.escapeHTML(clan.medals[u].desc) + '" />&nbsp;&nbsp;';
			}
		}
		this.sendReplyBox(
			'<div class="fichaclan">' +
			'<h4><center><p> <br />' + Tools.escapeHTML(clanTitle) + '</center></h4><hr width="90%" />' +
			'<table width="90%" border="0" align="center"><tr><td width="180" rowspan="2"><div align="center"><img src="' + encodeURI(clan.logo) +
			'" width="160" height="160" /></div></td><td height="64" align="left" valign="middle"><span class="lemaclan">'+ Tools.escapeHTML(clan.lema) +
			'</span></td> </tr>  <tr>    <td align="left" valign="middle"><strong>Sala Propia</strong>: ' + salaClanSource +
			' <p style="font-style: normal;font-size: 16px;"><strong>Puntuación</strong>:&nbsp;' + clan.rating +
			' Monedas (' + clan.wins + ' Victorias, ' + clan.losses + ' Derrotas, ' + clan.draws + ' Empates) | <b>Plazas:</b> ' + Clans.getPlaces(target) + '<br />' +
			' </p> <p style="font-style: normal;font-size: 16px;">&nbsp;' + medalsClan +
			'</p></td>  </tr></table></div>'
		);
	},

	settitlegremio: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /settitlegremio gremio, titulo");

		if (!Clans.setCompname(params[0], params[1]))
			this.sendReply("El gremio no existe o el título es mayor de 80 caracteres.");
		else {
			this.sendReply("El nuevo titulo del gremio " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setrankgremio: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setrankgremio gremio, valor");

		if (!Clans.setRanking(params[0], params[1]))
			this.sendReply("El gremio no existe o el valor no es válido.");
		else {
			this.sendReply("El nuevo rank para el gremio " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setgxegremio: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Usage: /setgxegremio gremio, wins, losses, ties");

		if (!Clans.setGxe(params[0], params[1], params[2], params[3]))
			this.sendReply("El gremio no existe o el valor no es válido.");
		else {
			this.sendReply("El nuevo GXE para el gremio " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setsalagremio: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setsalagremio gremio, sala");

		if (!Clans.setSala(params[0], params[1]))
			this.sendReply("El gremio no existe o el nombre de la sala es mayor de 80 caracteres.");
		else {
			this.sendReply("La nueva sala del gremio " + params[0] + " ha sido establecida con éxito.");
		}
	},
	
	giveclanmedal: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Usage: /giveclanmedal clan, medallaId, imagen, desc");

		if (!Clans.addMedal(params[0], params[1], params[2], params[3]))
			this.sendReply("El clan no existe o alguno de los datos no es correcto");
		else {
			this.sendReply("Has entegado una medalla al clan " + params[0]);
		}
	},
	
	removeclanmedal: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /removeclanmedal clan, medallaId");

		if (!Clans.deleteMedal(params[0], params[1]))
			this.sendReply("El clan no existe o no podeía dicha medalla");
		else {
			this.sendReply("Has quitado una medalla al clan " + params[0]);
		}
	},

	lemagremio: function (target, room, user) {
		if (!this.can('clans')) return false;
		var permisionClan = false;
		if (!target) return this.sendReply("Debe especificar un lema.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			if (!this.can('clans')) return false;
			var clanRoom = Clans.findClanFromRoom(room.id);
			if (!clanRoom) return this.sendReply("Este comando solo puede ser usado en la sala del gremio.");
			clanUser = clanRoom;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLema(clanUser, target))
				this.sendReply("El lema es mayor de 80 caracteres.");
			else {
				this.addModCommand("Un nuevo lema para el gremio " + clanUser + " ha sido establecido por " + user.name);
			}
		} else {
			this.sendReply("Este comando solo puede ser usado en la sala del gremio.");
		}
	},

	logogremio: function (target, room, user) {
		if (!this.can('clans')) return false;
		var permisionClan = false;
		if (!target) return this.sendReply("Debe especificar un logo.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			if (!this.can('clans')) return false;
			var clanRoom = Clans.findClanFromRoom(room.id);
			if (!clanRoom) return this.sendReply("Este comando solo puede ser usado en la sala del gremio.");
			clanUser = clanRoom;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLogo(clanUser, target))
				this.sendReply("El logo es mayor de 120 caracteres.");
			else {
				this.addModCommand("Un nuevo logotipo para el gremio " + clanUser + " ha sido establecido por " + user.name);
			}
		} else {
			this.sendReply("Este comando solo puede ser usado en la sala del gremio.");
		}
	},

	llamarmiembros: 'fjg',
	fjg: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 2 || perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			var clanMembers = Clans.getMembers(clanUser);
			var targetUser;
			for (var i = 0; i < clanMembers.length; ++i) {
				if (!room.users[toId(clanMembers[i])]) {
					targetUser = Users.get(clanMembers[i])
					if (targetUser && targetUser.connected) {
						targetUser.joinRoom(room.id);
						targetUser.popup('Has sido llamado a la sala ' + claninfo.sala.trim() + ' por ' + user.name + '.');
					}
				}
			}
			this.addModCommand("Los miembros del gremio " + clanUser + " han sido llamados a la sala " + toId(claninfo.sala) + ' por ' + user.name + '.');
		} else {
			this.sendReply("Este comando solo puede ser usado en la sala del gremio.");
		}
	},

	addmember: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (params.length !== 2) return this.sendReply("Usage: /addmember gremio, member");

		var user = Users.getExact(params[1]);
		if (!user || !user.connected) return this.sendReply("User: " + params[1] + " is not online.");

		if (!Clans.addMember(params[0], params[1]))
			this.sendReply("Could not add the user to the guild. Does the clan exist or is the user already in another guild?");
		else {
			this.sendReply("User: " + user.name + " successfully added to the guild.");
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " se ha unido al gremio: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},

	lidergremio: function (target, room, user) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params) return this.sendReply("Usage: /lidergremio member");

		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("Usuario: " + params[0] + " no existe o no está disponible.");

		if (!Clans.addLeader(params[0]))
			this.sendReply("El usuario no existe, no pertenece a ningún clan o ya era líder de su gremio.");
		else {
			var clanUser = Clans.findClanFromMember(params[0]);
			this.sendReply("Usuario: " + userk.name + " nombrado correctamente líder del clan " + clanUser + ".");
			userk.popup(user.name + " te ha nombrado Líder del gremio " + clanUser + ".\nUtiliza el comando /ayudagremios para más información.");
		}
	},

	oficial: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Usage: /oficial member");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if ((perminsionValue === 2 || perminsionValue === 3) && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("Usuario: " + params[0] + " no existe o no está disponible.");
		if (clanTarget) {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.addOficial(params[0]))
			this.sendReply("El usuario no existe, no pertenece a ningún clan o ya era oficial de su gremio.");
		else {
			this.sendReply("Usuario: " + userk.name + " nombrado correctamente oficial del clan " + clanTarget + ".");
			userk.popup(user.name + " te ha nombrado Oficial del gremio " + clanTarget + ".\nUtiliza el comando /ayudagremios para más información.");
		}
	},
	
	sublider: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Usage: /sublider member");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue === 3 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("Usuario: " + params[0] + " no existe o no está disponible.");
		if (clanTarget) {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.addSubLeader(params[0]))
			this.sendReply("El usuario no existe, no pertenece a ningún clan o ya era sub-lider de su gremio.");
		else {
			this.sendReply("Usuario: " + userk.name + " nombrado correctamente sub-lider del gremio " + clanTarget + ".");
			userk.popup(user.name + " te ha nombrado Sub-Lider del gremio " + clanTarget + ".\nUtiliza el comando /ayudagremios para más información.");
		}
	},

	demotegremio: 'declanauth',
	declanauth: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
			return this.sendReply("Usage: /demotegremio member");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue >= 2 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!clanTarget) {
			return this.sendReply("El usuario no existe o no pertenece a ningún gremio.");
		} else {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.deleteLeader(params[0])) {
			if (!Clans.deleteOficial(params[0])) {
				this.sendReply("El usuario no poseía ninguna autoridad dentro del gremio.");
			} else {
				if (!userk || !userk.connected) {
					this.addModCommand(params[0] + " ha sido degradado de rango en " + clanTarget + " por " + user.name);
				} else {
					this.addModCommand(userk.name + " ha sido degradado de rango en " + clanTarget + " por " + user.name);
				}
			}
		} else {
			var oficialDemote = Clans.deleteOficial(params[0]);
			if (!userk || !userk.connected) {
				this.addModCommand(params[0] + " ha sido degradado de rango en " + clanTarget + " por " + user.name);
			} else {
				this.addModCommand(userk.name + " ha sido degradado de rango en " + clanTarget + " por " + user.name);
			}
		}
	},

	invitar: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var permisionValue = Clans.authMember(clanUserid, iduserwrit);
			if (permisionValue > 0) permisionClan = true;
		}
		if (!permisionClan) return this.sendReply("/invitar - Acceso denegado");
		var params = target.split(',');
		if (!params) return this.sendReply("Usage: /invitar user");
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("Usuario: " + params[0] + " no existe o no está disponible.");
		if (!Clans.addInvite(clanUser, params[0]))
			this.sendReply("No se pudo invitar al usuario. ¿No existe, ya está invitado o está en otro gremio?");
		else {
			clanUser = Clans.findClanFromMember(user.name);
			userk.popup(user.name + " te ha invitado a unirte al gremio " + clanUser + ".\nPara unirte al clan escribe en el chat /aceptar " + clanUser);
			this.addModCommand(userk.name + " ha sido invitado a unirse al gremio " + clanUser + " por " + user.name);
		}
	},
	aceptar: 'aceptargremio',
	aceptargremio: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			return this.sendReply("Ya perteneces a un gremio. No te puedes unir a otro.");
		}
		var params = target.split(',');
		if (!params) return this.sendReply("Usage: /aceptar [gremio]");
		var clanpropio = Clans.getClanName(params[0]);
		if (!clanpropio) return this.sendReply("El gremio no existe o no está disponible.");

		if (!Clans.aceptInvite(params[0], user.name))
			this.sendReply("El gremio no existe o no has sido invitado a este.");
		else {
			this.sendReply("Te has unido correctamente al gremio" + clanpropio);
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " se ha unido al gremio: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},
	inviteclear: 'borrarinvitaciones',
	borrarinvitaciones: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (!target) {
			if (clanUser) {
				var clanUserid = toId(clanUser);
				var iduserwrit = toId(user.name);
				var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
				if (perminsionvalue === 3) permisionClan = true;
			}
			if (!permisionClan) return false;
		} else {
			if (!this.can('clans')) return;
			clanUser = target;
		}
		if (!Clans.clearInvitations(clanUser))
			this.sendReply("El gremio no existe o no está disponible.");
		else {
			this.sendReply("Lista de Invitaciones pendientes del gremio " + clanUser + " borrada correctamente.");
		}
	},

	removemember: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (params.length !== 2) return this.sendReply("Usage: /removemember clan, member");
		if (!Clans.removeMember(params[0], params[1]))
			this.sendReply("Could not remove the user from the clan. Does the clan exist or has the user already been removed from it?");
		else {
			this.sendReply("User: " + params[1] + " successfully removed from the clan.");
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(params[1]) + " ha abandonado el gremio: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},

	expulsar: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Usage: /expulsargremio member");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue >= 2 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var currentWar = War.findClan(clanTarget);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(params[0])] || currentWarParticipants.teamBMembers[toId(params[0])]) return this.sendReply("No puedes expulsar del gremio si el miembro estaba participando en una war.");
		}
		var userk = Users.getExact(params[0]);
		if (!clanTarget) {
			return this.sendReply("El usuario no existe o no pertenece a ningún gremio.");
		} else {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.removeMember(clanTarget, params[0])) {
			this.sendReply("El usuario no pudo ser expulsado del gremio.");
		} else {
			if (!userk || !userk.connected) {
				this.addModCommand(params[0] + " ha sido expulsado del gremio " + clanTarget + " por " + user.name);
			} else {
				this.addModCommand(userk.name + " ha sido expulsado del gremio " + clanTarget + " por " + user.name);
			}
		}
	},

	 salirdelgremio: 'abandonargremio',
	 abandonargremio: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (!clanUser) {
			return this.sendReply("No perteneces a ningún gremio.");
		}
		var currentWar = War.findClan(clanUser);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(user.name)] || currentWarParticipants.teamBMembers[toId(user.name)]) return this.sendReply("No puedes salir del gremio si estabas participando en una war.");
		}
		if (!Clans.removeMember(clanUser, user.name)) {
			 this.sendReply("Error al intentar salir del gremio.");
		} else {
			this.sendReply("Has salido del clan" + clanUser);
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " ha abandonado el gremio: " + Tools.escapeHTML(Clans.getClanName(clanUser)) + '</div>');
		}
	},


	//new war system
	resetclanranking: function (target, room, user) {
		if (!this.can('clans')) return false;
		if (room.id !== 'staff') return this.sendReply("Este comando solo puede ser usado en la sala Staff");
		Clans.resetClansRank();
		this.addModCommand(user.name + " ha reiniciado el ranking de clanes.");
	},
	
	resetwarlog: function (target, room, user) {
		if (!this.can('clans')) return false;
		if (room.id !== 'staff') return this.sendReply("Este comando solo puede ser usado en la sala Staff");
		Clans.resetWarLog();
		this.addModCommand(user.name + " ha borrado todos los warlogs.");
	},
	
	pendingwars: 'wars',
	wars: function (target, room, user) {
		this.parse("/war search");
	},

	viewwar: 'vw',
	warstatus: 'vw',
	vw: function (target, room, user) {
		this.parse("/war round");
	},
	
	endwar: function (target, room, user) {
		this.parse("/war end");
	},
	
	warlog: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("El clan especificado no existe o no está disponible.");
			return;
		}

		var f = new Date();
		var dateWar = f.getDate() + '-' + f.getMonth() + ' ' + f.getHours() + 'h';
		this.sendReply(
			"|raw| <center><big><big><b>Ultimas Wars del clan " + Tools.escapeHTML(Clans.getClanName(target)) + "</b></big></big> <br /><br />" + Clans.getWarLogTable(target) + '<br /> Fecha del servidor: ' + dateWar + '</center>'
		);
	},
	
	cerrarsala: 'closeroom',
	closeroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Esta no es una sala de ningun Gremio.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.closeRoom(room.id, clanRoom))
			this.sendReply("Error al intentar cerrar la sala. Es posible que ya esté cerrada.");
		else {
			this.addModCommand("Esta sala ha sido cerrada a quienes no sean miembros de " + clanRoom + " por " + user.name);
		}
	},
	
	abrirsala: 'openroom',
	openroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Esta no es una sala de Clan.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.openRoom(room.id, clanRoom))
			this.sendReply("Error al intentar abrir la sala. Es posible que ya esté abierta.");
		else {
			this.addModCommand("Esta sala ha sido abierta a todos los usuarios por " + user.name);
		}
	},
	
	kickall: function (target, room, user, connection) {
		if (user.locked || room.isMuted(user)) return this.sendReply("You cannot do this while unable to talk.");
		if (!this.can('makeroom')) return false;
		var targetUser;
		for (var f in room.users) {
			targetUser = Users.getExact(room.users[f]);
			if (!targetUser) {
				delete room.users[f];
			} else {
				targetUser.leaveRoom(room.id);
			}
		}
		room.userCount = 0;
		this.addModCommand("" + user.name + " has kicked all users from room " + room.id + '.');
		setTimeout(function () {user.joinRoom(room.id);}, 2000);
	},
	
	/*********************************************************
	 * Shop commands
	 *********************************************************/

	mercado: 'shop',
	shop: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		this.sendReplyBox(
			"<b><u><center><big><big>Artículos (Tienda actualmente en construccion)</center></u></b><br /><br />" +
			"<b>Plaza</b> - compra una plaza para el gremio al que se pertenece (1500 -> 3000 -> 6000 -> 10000 pds)<br />" +
			"<b>Custom Avatar</b> - compra un customavatar para tu user permanente. (6000 pds)<br />"
			);
	},
	
	buyplace: 'comprarplaza',
	comprarplaza: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (!clanUser) {
			return this.sendReply("No perteneces a ningún gremio.");
		}
		var perminsionvalue = Clans.authMember(clanUser, user.userid);
		if (perminsionvalue <= 2 && !this.can('clans')) return false;
		var places = Clans.getPlaces(clanUser);
		var prize = 0;
		if (places < 5) {
			prize = 1500;
		} else if (places < 6) {
			prize = 3000;
		} else if (places < 7) {
			prize = 6000;
		} else if (places === 7) {
			prize = 10000;
		} else {
			return this.sendReply("Tu gremio ya posee 8 plazas.");
		}
		var coins = Clans.getRating(clanUser).rating;
		if (coins < prize) return this.sendReply("Tu clan no tiene suficientes monedas.");
		Clans.addPlaces(clanUser, 1);
		places++;
		Clans.setRanking(clanUser, coins - prize);
		this.addModCommand(user.name + " ha comprado una plaza para el gremio " + clanUser + ".");
		return this.sendReply("Has comprado una plaza para tu gremio, ahora tu gremio dispone de " + places + " plazas.");
	},
	
	comprar: 'buy',
	buy: function (target, room, user) {
		var params = target.split(',');
		var prize = 0;
		if (!params) return this.sendReply("Usage: /buy object");
		var article = toId(params[0]);
		switch (article) {
			case 'customtc':
				prize = 8000;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				var tcUser = Shop.getTrainerCard(user.name);
				if (!tcUser) {
					Shop.giveTrainerCard(user.name);
					tcUser = Shop.getTrainerCard(user.name);
				}
				if (tcUser.customTC) return this.sendReply("Ya poseías este artículo.");
				Shop.setCustomTrainerCard(user.name, true);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has comprado una Tarjeta de entreador personalizada. Consulta /shophelp para más información.");
				break;
			case 'tc':
				prize = 3000;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				var tcUser = Shop.getTrainerCard(user.name);
				if (tcUser) return this.sendReply("Ya poseías este artículo.");
				Shop.giveTrainerCard(user.name);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has comprado una Tarjeta de Entrenador. Revisa /shophelp para saber como editarla.");
				break;
			case 'sprite':
				prize = 100;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				var tcUser = Shop.getTrainerCard(user.name);
				if (!tcUser) return this.sendReply("Necesitas comprar primero una Tarjeta de entrenador.");
				if (tcUser.nPokemon > 5) return this.sendReply("Ya tienes 6 Pokemon para tu tarjeta de entrenador.");
				if (tcUser.customTC) return this.sendReply("Tu tarjeta es Personalizada. Usa /tchtml pata modificarla.");
				Shop.nPokemonTrainerCard(user.name, tcUser.nPokemon + 1);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has comprado un Sprite de un pokemon para tu TC. Revisa /shophelp para más información.");
				break;
			case 'symbol':
				prize = 4000;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				if (Shop.symbolPermision(user.name)) return this.sendReply("Ya posees este artículo.");
				Shop.setSymbolPermision(user.name, true);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has comprado el permiso para usar los comandos /customsymbol y /resetsymbol. Para más información consulta /shophelp.");
				break;
			case 'avatar':
				prize = 1000;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				if (!Config.customAvatars[user.userid]) return this.sendReply("No tenías un avatar personalizado.");
				if (params.length !== 2) return this.sendReply("Usa el comando así: /buy avatar,[imagen]");
				var err = Shop.addPendingAvatar(user.userid, params[1]);
				if (err) return this.sendReply(err);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has solicitado un cambio de tu avatar personalizado. Espera a que un admin revise tu compra.");
				break;
			case 'customavatar':
				prize = 6000;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				if (Config.customAvatars[user.userid]) return this.sendReply("Ya habías comprado este artículo. Para cambiar tu avatar compra la opcion Avatar");
				if (params.length !== 2) return this.sendReply("Usa el comando así: /buy avatar,[imagen]");
				var err = Shop.addPendingAvatar(user.userid, params[1]);
				if (err) return this.sendReply(err);
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has solicitado un avatar personalizado. Espera a que un admin revise tu compra.");
				break;
			case 'botphrase':
				prize = 1500;
				if (Shop.getUserMoney(user.name) < prize) return this.sendReply("No tienes suficiente dinero.");
				if (Shop.getBotPhrase(user.name)) return this.sendReply("Ya posees este articulo.");
				if (params.length < 2) return this.sendReply("Usa el comando así: /buy botphrase, [texto]");
				if (toId(params[1]) === 'off') return this.sendReply("Usa el comando así: /buy botphrase, [texto]");
				if (params[1].length > 150) return this.sendReply("La frase es demasiado larga. Debe ser menor a 150 caracteres.");
				Shop.changeBotPhrase(user.name, Tools.escapeHTML(target.substr(params[0].length + 1)));
				Shop.removeMoney(user.name, prize);
				return this.sendReply("Has comprado una frase personalizada para el comando .whois del Bot. Puedes cambiarla tantas veces como quieras con /botphrase.");
				break;
			default:
				return this.sendReply("No has especificado ningún artículo válido.");
		}
	},
	
	moneyhelp: 'pdhelp',
	pdhelp: function () {
		if (!this.canBroadcast()) return false;
		this.sendReplyBox(
			"<b><u>Comandos referentes a los PDs</u></b><br /><br />" +
			"/pd (user) - muestra los ahorros de un usuario.<br />" +
			"/donate (user), (money) - Dona una cantidad determinada a otro usuario.<br />" +
			"/givemoney (user), (pds) - Da una cantidad de Pds a un usuario.<br />" +
			"/removemoney (user), (pds) - Quita una cantidad de Pds a un usuario.<br />"
		);
	},

	money: 'pd',
	pd: function (target, room, user) {
		var autoData = false;
		if (!target) autoData = true;
		if (!this.canBroadcast()) return false;

		var pds = 0;
		var userName = user.name;
		if (autoData) {
			pds = Shop.getUserMoney(user.name);
		} else {
			pds = Shop.getUserMoney(target);
			userName = toId(target);
			var userh = Users.getExact(target);
			if (userh) userName = userh.name;
		}
		this.sendReplyBox('Ahorros de <b>' + userName + '</b>: ' + pds + ' pd');
	},

	givemoney: function (target, room, user) {
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /givemoney usuario, pds");
		if (!this.can('givemoney')) return false;

		var pds = parseInt(params[1]);
		if (pds <= 0) return this.sendReply("La cantidad no es valida.");
		var userh = Users.getExact(params[0]);
		if (!userh || !userh.connected) return this.sendReply("El usuario no existe o no está disponible");
		var userName = userh.name;
		if (!Shop.giveMoney(params[0], pds)) {
			this.sendReply("Error desconocido.");
		} else {
			this.sendReply(userName + ' ha recibido ' + pds + ' pd');
		}
	},

	removemoney: function (target, room, user) {
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /removemoney usuario, pds");
		if (!this.can('givemoney')) return false;

		var pds = parseInt(params[1]);
		if (pds <= 0) return this.sendReply("La cantidad no es valida.");
		var userh = Users.getExact(params[0]);
		var userName = toId(params[0]);
		if (userh) userName = userh.name;
		if (!Shop.removeMoney(params[0], pds)) {
			this.sendReply("El usuario no tenía suficientes Pds.");
		} else {
			this.sendReply(userName + ' ha perdido ' + pds + ' pd');
		}
	},

	donar: 'donate',
	donate: function (target, room, user) {
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /donate usuario, pds");

		var pds = parseInt(params[1]);
		if (!pds || pds <= 0) return this.sendReply("La cantidad no es valida.");
		var userh = Users.getExact(params[0]);
		if (!userh || !userh.connected) return this.sendReply("El usuario no existe o no está disponible");
		var userName = userh.name;
		if (!Shop.transferMoney(user.name, params[0], pds)) {
			this.sendReply("No tienes suficientes pds.");
		} else {
			this.sendReply('Has donado ' + pds + ' pd al usuario ' + userName + '.');
		}
	},
	
	symbolpermision: function (target, room, user) {
		if (!this.can('givemoney')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /symbolpermision usuario, [on/off]");
		var permision = false;
		if (toId(params[1]) !== 'on' && toId(params[1]) !== 'off') return this.sendReply("Usage: /symbolpermision usuario, [on/off]");
		if (toId(params[1]) === 'on') permision = true;
		if (permision) {
			var userh = Users.getExact(params[0]);
			if (!userh || !userh.connected) return this.sendReply("El usuario no existe o no está disponible");
			if (Shop.setSymbolPermision(params[0], permision)) return this.sendReply("Permiso para customsymbols concedido a " + userh.name);
			return this.sendReply("El usuario ya poseía permiso para usar los customsymbols.");
		} else {
			if (Shop.setSymbolPermision(params[0], permision)) return this.sendReply("Permiso para customsymbols retirado a " + params[0]);
			return this.sendReply("El usuario no tenía ningún permiso que quitar.");
		}
	},

	hideauth: 'customsymbol',
	symbol: 'customsymbol',
	simbolo: 'customsymbol',
	customsymbol: function (target, room, user, connection, cmd) {
		if (!user.can('customsymbol') && !Shop.symbolPermision(user.name)) return  this.sendReply('Debes comprar este comando en la tienda para usarlo.');
		if (!target && cmd === 'hideauth') target = ' ';
		if (!target || target.length > 1) return this.sendReply('Debes especificar un caracter como simbolo.');
		if (target.match(/[A-Za-z0-9\d]+/g)) return this.sendReply('Tu simbolo no puede ser un caracter alfanumerico.');
		if (!user.can('customsymbol')) {
			if ('?!$+\u2605%@\u2295&~#'.indexOf(target) >= 0) return this.sendReply('No tienes permiso para elegir un rango como simbolo');
		}
		user.getIdentity = function (roomid) {
			if (this.locked) {
				return '‽' + this.name;
			}
			if (roomid) {
				var room = Rooms.rooms[roomid];
				if (room.isMuted(this)) {
					return '!' + this.name;
				}
				if (room && room.auth) {
					if (room.auth[this.userid]) {
						return room.auth[this.userid] + this.name;
					}
					if (room.isPrivate === true) return ' ' + this.name;
				}
			}
			return target + this.name;
		};
		user.updateIdentity();
		user.hasCustomSymbol = true;
		this.sendReply('Tu simbolo ha cambiado a "' + target + '"');
	},
	showauth: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.hasCustomSymbol) return this.sendReply('No tienes nigún simbolo personalizado.');
		user.getIdentity = function (roomid) {
			if (this.locked) {
				return '‽' + this.name;
			}
			if (roomid) {
				var room = Rooms.rooms[roomid];
				if (room.isMuted(this)) {
					return '!' + this.name;
				}
				if (room && room.auth) {
					if (room.auth[this.userid]) {
						return room.auth[this.userid] + this.name;
					}
					if (room.isPrivate === true) return ' ' + this.name;
				}
			}
			return this.group + this.name;
		};
		user.hasCustomSymbol = false;
		user.updateIdentity();
		this.sendReply('Tu simbolo se ha restablecido.');
	},
	
	jugando: 'afk',
	ocupado: 'afk',  
	comiendo: 'afk', 
	durmiendo: 'afk', 
	grabando: 'afk',	
	programando: 'afk',
	ausente: 'afk',
	away: 'afk',
	afk: function(target, room, user, connection, cmd) {
		if (!this.canTalk) return false;
		var t = 'Away';
		switch (cmd) {
			case 'jugando':
			t = 'ⒿⓊⒼⒶⓃⒹⓄ';  
			s = 'Jugando'
			break;  
                        case 'comiendo':
			t = 'ⒸⓄⓂⒾⒺⓃⒹⓄ';
			s = 'Comiendo'
			break;  
                        case 'grabando':
			t = 'ⒼⓇⒶⒷⒶⓃⒹⓄ';
			s = 'Grabando'
			break;			
			case 'durmiendo':
			t = 'ⒹⓊⓇⓂⒾⒺⓃⒹⓄ';
			s = 'Durmiendo'
			break; 
			case 'programando':
			t = 'ⓅⓇⓄⒼⓇⒶⓂⒶⓃⒹⓄ';
			s = 'Programando'
			break;
			case 'ocupado':
			t = 'ⓄⒸⓊⓅⒶⒹⓄ';
			s = 'Ocupado'
			break;
			default:
			t = 'ⒶⓊⓈⒺⓃⓉⒺ'
			s = 'Ausente'
			break;
		}

		if (!user.isAway) {
			user.originalName = user.name;
			var awayName = user.name + ' - '+t;
			//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
			delete Users.get(awayName);
			user.forceRename(awayName, undefined, true);

			if (user.isStaff) this.add('|raw|<b> <font color="#2EFEF7">' + Tools.escapeHTML(user.originalName) +'</font color></b> esta '+s.toLowerCase()+'. '+ (target ? " (" + escapeHTML(target) + ")" : ""));

			user.isAway = true;
			user.blockChallenges = true;
		}
		else {
			return this.sendReply('Tu estas como ausente, digita /back.');
		}

		user.updateIdentity();
	},

	back: 'unafk',
	regresar: 'unafk',
	unafk: function(target, room, user, connection) {
		if (!this.canTalk) return false;

		if (user.isAway) {
			if (user.name === user.originalName) {
				user.isAway = false;
				return this.sendReply('Tu nombre no ha cambiado y ya no estas ausente.');
			}

			var newName = user.originalName;

			//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
			delete Users.get(newName);

			user.forceRename(newName, undefined, true);

			//user will be authenticated
			user.authenticated = true;

			if (user.isStaff) this.add('|raw|<b> <font color="#2EFEF7">' + Tools.escapeHTML(newName) + '</font color></b> regreso.');

			user.originalName = '';
			user.isAway = false;
			user.blockChallenges = false;
		}
		else {
			return this.sendReply('Tu no estas ausente.');
		}

		user.updateIdentity();
	}, 
	
	img: 'image',
        image: function(target, room, user) {
                if (!user.can('wall', null, room)) return false;
                if (!target) return this.sendReply('/image [url], [tamaño]');
                var targets = target.split(',');
                var url = targets[0];
                var width = targets[1];
                if (!url || !width) return this.sendReply('/image [url], [width percentile]');
                if (url.indexOf('.png') === -1 && url.indexOf('.jpg') === -1 && url.indexOf('.gif') === -1) {
                        return this.sendReply('La url debe terminar en .png, .jpg o .gif');
                }
                if (isNaN(width)) return this.sendReply('El tamaño debe ser un numero.');
                if (width < 1 || width > 100) return this.sendReply('El tamaño debe ser mayor que 0 y menor que 100.');
                this.add('|raw|<center><img width="'+width+'%" src="'+url+'"></center>');
        }, 
		
	masspm: 'pmall',
    pmall: function (target, room, user) {
        if (!this.can('pmall')) return;
        if (!target) return this.parse('/help pmall');

        var pmName = '~Ultimate PM[No Respondas]';

        for (var i in Users.users) {
            var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
            Users.users[i].send(message);
        }
    },  
	
	show: function (target, room, user) {
        if (!this.can('lock')) return;
        delete user.getIdentity
        user.hiding = false;
        user.updateIdentity();
        this.sendReply('Has revelado tu símbolo de staff.');
        return false;
    },

    hide: function (target, room, user) {
        // add support for away
        if (!this.can('lock')) return;
        user.getIdentity = function () {
            var name = this.name + (this.away ? " - ????" : "");
            if (this.locked) return '?' + name;
            if (this.muted) return '!' + name;
            return ' ' + name;
        };
        user.hiding = true;
        user.updateIdentity();
        this.sendReply('Has escondido tu símbolo de staff.');
    }
};
