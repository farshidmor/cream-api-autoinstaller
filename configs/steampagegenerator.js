// collect all dlc from the page
// must be on store.steampowered.com/app/{appid}
// copy paste this entire file into dev console (f12) and press enter
// file: cream_api.ini will automatically be downloaded

var parser_data = {
	name: "CreamApi config JS generator",
	version: "0.23"
}

var options = { // change your options here
	descriptions: false,
	inactive: false
}

HTMLElement.prototype.queryA = function(a) {return this.querySelectorAll(a)}
HTMLElement.prototype.query = function(a) {return this.querySelector(a)}
String.prototype.format = function() {
	var r = this;
	for (var i=0;i<arguments.length;i++) {
		var rstring = "{"+i.toString()+"}";
		r = r.replace(rstring,arguments[i]);
	}
	return r;
}

function collectDlc() {
	var output = {};
	var dlcs = document.body.queryA(".game_area_dlc_row");
	for (var i=0;i<dlcs.length;i++) {
		var dlcid = dlcs[i].getAttribute("data-ds-appid");
		var dlcname = dlcs[i].query(".game_area_dlc_name").innerText.replace("\n","").trim(" ");
		output[dlcid] = {value:dlcname,active:true};
	}
	return output;
}
function collectAppData() {
	var appid = window.location.pathname.split("/")[2];
	var appname = document.body.query(".apphub_AppName").innerText;
	var output = {
		appid: appid,
		name: appname
	};
	return output;
}
function generateFileText(options) {
	if (options == undefined) {
		options = {};
	}
	var data = {
		steam: {
			appid: {
				value: "0",
				description: "App id of game\n(http://store.steampowered.com/app/%appid%/)",
				active: true
			},
			language: {
				value: "english",
				description: "Force the usage of specific language.",
				active: false
			},
			unlockall: {
				value: "false",
				description: "Enable/disable automatic DLC unlock. Default option is set to \"false\".\nKeep in mind that this option is highly experimental and won't work if the game wants to call each DLC by index.",
				active: true
			},
			orgapi: {
				value: "steam_api_o.dll",
				description: "Original Valve's steam_api.dll. Default is \"steam_api64_o.dll\".",
				active: true
			},
			orgapi64: {
				value: "steam_api64_o.dll",
				description: "Original Valve's steam_api64.dll. Default is \"steam_api64_o.dll\".",
				active: true
			},
			extraprotection: {
				value: "false",
				description: "Enable/disable extra protection bypasser. Default is \"false\".",
				active: true
			},
			forceoffline: {
				value: "false",
				description: "This option will force the usage of the default Steam user data folder. Default is \"true\".",
				active: true
			},
			lowviolence: {
				value: "false",
				description: "Some games are checking for the low violence presence. Default is \"false\".",
				active: false
			},
			installdir: {
				value: "..\\",
				description: "Installation path for the game. Maximum number of parent directories: 5 (..\..\..\..\..\). Default is the path to current working directory.",
				active: false
			},
			dlcasinstalldir: {
				value: "false",
				description: "Use DLC id as the appended installation directory. e.g. <install_directory>\480 Default is \"true\".",
				active: false
			},
			purchasetimestamp: {
				value: "0",
				description: "Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm). Default is \"0\" (1970/01/01).",
				active: false
			},
			wrappermode: {
				value: "false",
				description: "Turn on the wrapper mode. Default is \"false\".",
				active: true
			}
		},
		steam_misc: {
			disableuserinterface: {
				value:"false",
				description: "Disables the internal SteamUser interface handler. Default is \"false\".\nDoes have an effect on the games that are using the license check for the DLC/application.",
				active: true
			},
			disableutilsinterface: {
				value: "false",
				description: "Disables the internal SteamUtils interface handler. Default is \"false\".\nDoes have an effect on the games that are checking for the actual AppId (only matters when \"wrappermode\" is set to \"true\").",
				active: true
			},
			disableregisterinterfacefuncs: {
				value: "false",
				description: "Disable the internal reserve hook of the \"Steam_RegisterInterfaceFuncs\" function. Default is \"false\".",
				active: true
			},
			unlockparentalrestrictions: {
				value: "false",
				description: "Unlock/Lock Steam parental restrictions. Default is \"true\".",
				active: false
			},
			steamid: {
				value: "0",
				description: "SteamId64 to override. Note that this action could be risky ! This option can only work if \"disableuserinterface = false\".",
				active: false
			},
			signaturebypass: {
				value: "true",
				description: "Bypass VAC signature check. Note that this action could be risky ! Default is \"false\".",
				active: false
			},
			printbacktrace: {
				value: "true",
				description: "Print the backtrace for the vital API functions. Default is \"false\".",
				active: false
			}
		},
		steam_wrapper: {
			newappid: {
				value: "0",
				description: "Application ID to override (used when the wrapper mode is on)",
				active: true
			},
			wrapperremotestorage: {
				value: "false",
				description: "Use the internal storage system. Default is \"false\".",
				active: true
			},
			wrapperuserstats: {
				value: "false",
				description: "Use the internal stats/achievements system. Default is \"false\".",
				active: true
			},
			wrapperugc: {
				value: "false",
				description: "Use the internal workshop (UGC) system. Default is \"false\".",
				active: true
			},
			saveindirectory: {
				value: "false",
				description: "Store the data in the current directory (incl. stats). By default the data will is stored at: %appdata%/CreamAPI/%appid%/\nDefault is \"false\".",
				active: true
			},
			forcefullsavepath: {
				value: "false",
				description: "Force the usage of a full save path instead of the relative one. Default is \"false\".",
				active: true
			},
			disablecallbacks: {
				value: "true",
				description: "Disable/Enable a StoreStats callback. Takes effect only if \"wrapperuserstats\" is set to \"true\". Default is \"true\".",
				active: false
			},
			storestatscallback: {
				value: "true",
				description: "Disable/Enable a StoreStats callback. Takes effect only if \"wrapperuserstats\" is set to \"true\". Default is \"true\".",
				active: false
			},
			achievementscount: {
				value: "0",
				description: "Fixed achievements count. Some games can only work if this option is configured properly (e.g. Wolfenstein II). Default is \"0\".",
				active: true
			}
		},
		dlc: {
		}
	};
	var appdata = collectAppData();
	data.steam.appid.value = appdata.appid;
	data.dlc = collectDlc();
	var serializeorder = ["steam","steam_misc","steam_wrapper","dlc"];
	var includedescriptions = false;
	if (options.descriptions == true) {
		includedescriptions = true;
	}
	var includeinactive = false;
	if (options.inactive == true) {
		includeinactive = true;
	}
	var output = "; auto-generated by {0} v{1}\n; Data source: {2}\n".format(parser_data.name,parser_data.version,window.location.href);
	for (var i=0;i<serializeorder.length;i++) {
		var module = "[{0}]\n".format(serializeorder[i]);
		for (var a in data[serializeorder[i]]) {
			if (data[serializeorder[i]][a].active == true || includeinactive == true) {
				if (includedescriptions == true && data[serializeorder[i]][a].description != undefined) {
					var description = "; "+data[serializeorder[i]][a].description.replace("\n","\n; ")+"\n";
					module += description;
				}
				var value = "{0} = {1}\n".format(a,data[serializeorder[i]][a].value);
				if (data[serializeorder[i]][a].active == false) {
					value = "; {0}".format(value);
				}
				module += value;
			}
		}
		output += module + "\n";
	}
	console.log("%cSuccessfully parsed. descriptions:{0}, inactivefiles:{1}".format(includedescriptions,includeinactive),"color:#2aef4b");
	return output;
}
function generateDownload(options) {
	var appdata = collectAppData();
	var filename = "cream_api.ini";
	var text = generateFileText(options);
	var blob = new Blob([text],{type:"text/plain"});
	var url = URL.createObjectURL(blob);
	
	var link = document.createElement("a");
	link.download = filename;
	link.href = url;
	link.target = "_blank";
	document.body.appendChild(link);
	link.click();
	link.remove();
}
generateDownload(options);
