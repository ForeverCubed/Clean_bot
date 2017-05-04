const fs = require("fs");
var acceptedDebug = ["exports","server","admin","commands","util"];
var reqSettings = JSON.parse(fs.readFileSync('./JSON files/settings.json', 'utf8'));

module.exports = function(omsg, args){
  var print = "";
  if(omsg.author.id != "120806137816678402") return;
  var debug = [];
  if(!args[1]) {
    omsg.reply("Syntax is ``!editdebug <none/debug option>``");
    return undefined;
  }
  if(args[1] != "none" || args[1]){
    for(var i = 1; i < args.length; i++){
      if(acceptedDebug.includes(args[i])) debug.push(args[i].toLowerCase());
    }
  }
  reqSettings.debug = debug;
  var print = "";
  for(i in debug) print += i;
  if(print == "") print = "none";
  omsg.reply("Successfully changed the global debug to" + print);
  return reqSettings;
}
