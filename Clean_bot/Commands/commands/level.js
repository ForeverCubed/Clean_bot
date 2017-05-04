const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server, allusers, globalDebug){
  var users = allusers[server.id];
  // setting the set of users to the current server's users.
  var mentions = check(omsg, args[1], users, server);
  if(!mentions){
    omsg.reply("User does not have a profile.");
    return undefined;
  }
  var user = users[mentions.id];
  var print = "**"+mentions.username+"\n";
  print += xpBar(user.level, user.exp, user.level*server.xpScale);
  var expToLevel = user.exp/(user.level*server.xpScale)
  expToLevel = Math.floor(expToLevel*1000)
  expToLevel /= 10;
  print += "\n"+ user.exp+"/"+user.level*server.xpScale+"exp**"
  omsg.channel.sendMessage(print);
  return undefined;
}

function check(omsg, arg, users, server){
  var mentions = omsg.mentions.users.array();
  if(mentions[0]) mentions = mentions[0];
  else if(!arg) return omsg.author;
  else if(users[arg]) mentions = users[arg];
  else mentions = undefined;
  return mentions;
}

function xpBar(level, exp, expToNext){
  var Bars = 10;
  var print = ""+level;
  // perc is a value 0 - 10 giving the percentage to next level
  var perc = Math.floor(exp/expToNext*(Bars*10))/10;
  // now just draw in the exp bar
  for(var bar = 0; bar < Bars; bar++){
    if(bar < perc) print += "▓"
    else print += "░"
  }
  print += level+1;
  return print;
}