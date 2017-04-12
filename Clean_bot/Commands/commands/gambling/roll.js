const fs = require("fs");
//module.exports = function(omsg, args, powerlevel, server){
  //var allusers = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
module.exports = function(omsg, args, powerlevel, server, allusers){
  var users = allusers[server.id];
  args[1] = parseInt(args[1], 10);
  args[2] = parseInt(args[2], 10);
  if(!args[1] || !args[2]){
    omsg.reply("Error, make sure you follow the syntax of ``!roll [bet] [1-6]``");
    return;
  }
  if(users[omsg.author.id].money - args[1] < 0){
    omsg.reply("Insufficient noods.");
    return;
  }
  args[1] = Math.abs(args[1]);
  users[omsg.author.id].money -= args[1];
  var result = Math.floor(Math.random()*6)+1;
  var print = "```"+omsg.author.username+" rolled \n";
  switch(result){
    case 1:
      print += "┏━━━━━━━┓\n"+"┃       ┃\n"+"┃   O   ┃\n"+"┃       ┃\n"+"┗━━━━━━━┛```"
      break;
    case 2:
      print += "┏━━━━━━━┓\n"+"┃     O ┃\n"+"┃       ┃\n"+"┃ O     ┃\n"+"┗━━━━━━━┛```"
      break;
    case 3:
      print += "┏━━━━━━━┓\n"+"┃     O ┃\n"+"┃   O   ┃\n"+"┃ O     ┃\n"+"┗━━━━━━━┛```"
      break;
    case 4:
      print += "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃       ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```"
      break;
    case 5:
      print += "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃   O   ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```"
      break;
    case 6:
      print += "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃ O   O ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```"
      break;
  }
  if(args[2] != result){
    print += "\nBetter luck next time!";
  } else {
    print += "Congratulations, you won "+args[1]*10+" Noods!";
    users[omsg.author.id].money += args[1]*10;
  }
  omsg.channel.sendMessage(print);
  allusers[users] = users;
  fs.writeFile('./util/modules/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
}
