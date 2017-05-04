const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server, allusers, globalDebug){
  var commands = JSON.parse(fs.readFileSync('./master_ref.json', 'utf8'));
  commands = commands.commands;
  var print = "```";
  for(i in commands){
    print += "\n"+commands[i].call[0];
  }
  print += "```";
  omsg.reply("Here are my commands:"+print);
}
