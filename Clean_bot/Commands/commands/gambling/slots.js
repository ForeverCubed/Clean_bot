//const fs = require("fs");
// module.exports = function(omsg, args, powerlevel, server){
  // var allusers = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
module.exports = function(omsg, args, powerlevel, server, allusers){
  var users = allusers[server.id];
  args[1] = Math.abs(args[1]);
  if(!args[1]){
    omsg.channel.sendMessage("``!slots n``");
    return undefined;
  }
  args[1] = parseInt(args[1], 10);
  if(!args[1]){
    omsg.reply("Error, make sure you follow the syntax of ``!slots [bet]``");
    return undefined;
  }
  if(users[omsg.author.id].money - args[1] < 0){
    omsg.reply("Insufficient noods.");
    return undefined;
  }
  var print = "```";
  var Slots = [
    Math.floor(Math.random()*9)+1,
    Math.floor(Math.random()*9)+1,
    Math.floor(Math.random()*9)+1
  ]
  print += "┏━━━━━━━┓ ┏━━━━━━━┓ ┏━━━━━━━┓\n"+
           "┃       ┃ ┃       ┃ ┃       ┃\n"+
           "┃   "+Slots[0]+"   ┃ ┃   "+Slots[1]+"   ┃ ┃   "+Slots[2]+"   ┃\n"+
           "┃       ┃ ┃       ┃ ┃       ┃\n"+
           "┗━━━━━━━┛ ┗━━━━━━━┛ ┗━━━━━━━┛```"
  users[omsg.author.id].money -= args[1];
  if(Slots[0] == Slots[1] || Slots[1] == Slots[2] || Slots[0] == Slots[2]){
    print += "Congratulations! You won "+args[1]*3+" Noods!";
    users[omsg.author.id].money += args[1]*3;
  }else
  if(Slots[0] == Slots[1] && Slots[1] == Slots[2] && Slots[0] == Slots[2]){
    print += "Congratulations! You won "+args[1]*50+" Noods!";
    users[omsg.author.id].money += args[1]*50;
  }else
  if(Slots[0] != Slots[1] && Slots[1] != Slots[2] && Slots[0] != Slots[2]){
    print += "Better luck next time!";
  }
  omsg.channel.sendMessage(print);
  allusers[users] = users;
  return allusers;
}
