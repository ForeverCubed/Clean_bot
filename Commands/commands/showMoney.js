const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var users = JSON.parse(fs.readFileSync('./util/servers/userinfo.json', 'utf8'));
  console.log(users)
  omsg.reply("has "+users[omsg.guild.id][omsg.author.id].money+" noods!");
}
