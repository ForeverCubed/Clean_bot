const fs = require("fs");
var mref = JSON.parse(fs.readFileSync('./master_ref.json', 'utf8'));
var reqSettings = JSON.parse(fs.readFileSync('./JSON files/settings.json', 'utf8'));
var globalDebug = reqSettings.debug;
try{
	console.log("Loading modules...");
	module.exports.CommandModules = loadCmdModules();
	module.exports.AdminModules = loadAdminModules();
	module.exports.UtilModules = loadUtilModules();
	console.log("Done.");
	return;
}catch(err){
	console.log("Error exporting in allCommands.js.")
	console.log(err);
}

function loadUtilModules(){
	try{
		var modules = {};
		var ref = mref.util;
		var count = 0;
		for(var i = 0; i < ref.length; i++){
			var pushModule = require(ref[i].path);
			modules[ref[i].name] = pushModule;
			if(globalDebug.includes("exports")) console.log(" Loaded util module "+ref[i].name)
			count++;
		}
		console.log("Loaded "+count+" util modules.");
		return modules;
	}catch(err){
		console.log("Error exporting in allCommands.js - loadUtilModules()")
		console.log(err);
	}
}


function loadCmdModules(){
	try{
		var modules = {};
		var ref = mref.commands;
		var count = 0;
		for(var i = 0; i < ref.length; i++){
			var pushModule = require(ref[i].path);
			modules[ref[i].name] = pushModule;
			if(globalDebug.includes("exports")) console.log("  Loaded command module "+ref[i].name)
			count++;
		}
		console.log("Loaded "+count+" command modules.");
		return modules;
	}catch(err){
		console.log("Error exporting in allCommands.js - loadCmdModules()")
		console.log(err);
	}
}

function loadAdminModules(){
	try{
		var modules = {};
		var ref = mref.admincommands;
		var count = 0;
		for(var i = 0; i < ref.length; i++){
			var pushModule = require(ref[i].path);
			modules[ref[i].name] = pushModule;
			if(globalDebug.includes("exports")) console.log("  Loaded admin module "+ref[i].name)
			count++;
		}
		console.log("Loaded "+count+" admin modules.");
		return modules;
	}catch(err){
		console.log("Error exporting in allCommands.js - loadAdminModules()")
		console.log(err);
	}
}