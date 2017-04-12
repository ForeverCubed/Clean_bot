const fs = require("fs");
var acceptedDebug = ["exports"];
var reqSettings = JSON.parse(fs.readFileSync('./settings-required.json', 'utf8'));

module.exports = function(omsg, args){
  if(omsg.author.id != "120806137816678402") return;
  var debug = [];
  if(args[1] != "none" || args[1]){
    for(var i = 1; i < args.length; i++){
      if(acceptedDebug.includes(args[i])) debug.push(args[i].toLowerCase());
    }
  }
  reqSettings.debug = debug;
  fs.writeFile('./settings-required.json', JSON.stringify(reqSettings, null, "\t"));
  omsg.reply("Successfully edited the global debug");
}
