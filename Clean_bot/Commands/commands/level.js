const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var users = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
  var users = users[omsg.guild.id];
  var mentions = omsg.mentions.users.array();
  var user = omsg.author.id;
  if(mentions[0]){
    if(!users[mentions[0].id]){
      omsg.reply("User does not have a profile.");
      return;
    }
    var user = mentions[0].id;
  }
  var tonextlvl = users[user].level*server.xpScale;
  var perc = ((users[user].exp/tonextlvl)*100);
  perc = Math.floor(perc)/10;
  var print = "**"
  print += users[user].level
  var a = false
  for(var xpbar = 0; xpbar < 10; xpbar++){
    if(xpbar < perc){
      //print += "═"
      print += "▓"
    } else //if(!a){
      //print += "╬"
      print += "░"
      //a = true;
    //}
    //print += "═"
  }
  print += (users[user].level+1)
  //print += " "+(users[user].level + 1)
  var expToLevel = users[user].exp/(users[user].level*server.xpScale)
  expToLevel = Math.floor(expToLevel*1000)
  expToLevel /= 10;
  print += "\n"+ users[user].exp+"/"+users[user].level*server.xpScale+"exp**"
  omsg.channel.sendMessage(print);
  return;
}
