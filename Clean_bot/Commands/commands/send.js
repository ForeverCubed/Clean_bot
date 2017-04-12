const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server, allusers){
  try{
  var users = allusers[server.id];
  args[2] = parseInt(args[2], 10);
  var mentions = omsg.mentions.users.array();
  if(mentions[0]) mentions = mentions[0];
  else if(users[args[1]]) mentions = users[args[1]];
  else mentions = undefined;

    // mentions = {
    //   "id": args[1],
    //   "username": users[args[1]].username
    // }
  console.log("     "+mentions.id);
  console.log("     "+mentions.username);
  if(!args[2] || args[2] <= 0 || !args[1].startsWith('<')){
    omsg.reply("Syntax is !send [@username] [amount]");
    return;
  }
  if(args[2] > users[omsg.author.id].money || !users[mentions.id]){
    omsg.reply("You do not have enough noods to send, or recipient does not have a profile.");
    return;
  }
  // here is only accessible if everything is good to go
  users[omsg.author.id].money -= args[2];
  users[mentions.id].money += args[2];
  omsg.channel.sendMessage(omsg.author.username+" has sent "+mentions.username+" "+args[2]+" noods!");
  //saveState("users");
  allusers[server.id] = users;
  fs.writeFile('./util/modules/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
}catch(err){
  console.log(err);
}
}
