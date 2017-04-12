const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var users = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
  omsg.reply("has "+users[omsg.guild.id][omsg.author.id].money+" noods!");
}
