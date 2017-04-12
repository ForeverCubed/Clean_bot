const fs = require("fs");
//module.exports = function(omsg, args, powerlevel, server){
  //var allusers = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
module.exports = function(omsg, args, powerlevel, server, allusers){
  var users = allusers[server.id];
  args[1] = parseInt(args[1], 10);
  args[1] = Math.abs(args[1]);
  if(!args[2]){
    omsg.reply("Error, make sure you follow the syntax of ``!flip [bet] [guess]``");
    return;
  }
  if(users[omsg.author.id].money - args[1] < 0){
    omsg.reply("Insufficient noods.");
    return;
  }
  users[omsg.author.id].money -= args[1];
  var coinFlip = Math.random();
  var result = "H";
  if(coinFlip >= .5){
    result = "T";
  }
  var print = '``'+result + "``\n";
  //omsg.channel.sendMessage(result);
  var guess = args[2].toUpperCase();
  if(guess.startsWith(result)){
    print += "Congratulations, you won "+Math.ceil(args[1]*1.5)+" Noods!";
    users[omsg.author.id].money += Math.ceil(args[1]*1.5);
  } else {
    print += "Better luck next time!";
  }
  omsg.channel.sendMessage(print);
  allusers[users] = users;
  fs.writeFile('./util/modules/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
}
