module.exports = function(omsg, args, powerlevel, server, allusers){
  var users = allusers[server.id];
  args[1] = parseInt(args[1], 10);
  args[2] = parseInt(args[2], 10);
  if(!args[1] || !args[2]){
    omsg.reply("Error, make sure you follow the syntax of ``!roll [bet] [1-6]``");
    return undefined;
  }
  if(users[omsg.author.id].money - args[1] < 0){
    omsg.reply("Insufficient noods.");
    return undefined;
  }
  args[1] = Math.abs(args[1]);
  users[omsg.author.id].money -= args[1];
  var result = Math.floor(Math.random()*6)+1;
  var print = "```You rolled \n";
  print += toDice(result); // changes the random 1-6 number to a string that looks like dice.
  if(args[2] != result){
    print += "\nBetter luck next time!";
  } else {
    print += "Congratulations, you won "+args[1]*10+" Noods!";
    users[omsg.author.id].money += args[1]*10;
  }
  omsg.channel.sendMessage(print);
  allusers[users] = users;
  return allusers;
}

function toDice(n){
  switch(n){
    case 1:
      return "┏━━━━━━━┓\n"+"┃       ┃\n"+"┃   O   ┃\n"+"┃       ┃\n"+"┗━━━━━━━┛```";
    case 2:
      return "┏━━━━━━━┓\n"+"┃     O ┃\n"+"┃       ┃\n"+"┃ O     ┃\n"+"┗━━━━━━━┛```";
    case 3:
      return "┏━━━━━━━┓\n"+"┃     O ┃\n"+"┃   O   ┃\n"+"┃ O     ┃\n"+"┗━━━━━━━┛```";
    case 4:
      return "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃       ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```";
    case 5:
      return "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃   O   ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```";
    case 6:
      return "┏━━━━━━━┓\n"+"┃ O   O ┃\n"+"┃ O   O ┃\n"+"┃ O   O ┃\n"+"┗━━━━━━━┛```";
  }
}
