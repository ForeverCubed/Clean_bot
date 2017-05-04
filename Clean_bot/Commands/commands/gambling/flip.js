module.exports = function(omsg, args, powerlevel, server, allusers){
  var users = allusers[server.id];
  args[1] = parseInt(args[1], 10);
  args[1] = Math.abs(args[1]);
  // starts by taking args[1] (the bet) and making sure it's a positive int
  if(!args[2] || (args[2].startsWith("H") || args[2].startsWith("T"))){
    omsg.reply("Error, make sure you follow the syntax of ``!flip [bet] [H/T]``");
    return undefined;
  }
  if(users[omsg.author.id].money - args[1] < 0){
    omsg.reply("Insufficient noods.");
    return undefined;
  }
  // returns if the user does not have enough money or the syntax is incorrect
  var bet = args[1];
  users[omsg.author.id].money -= bet;
  var coin_flip = Math.random();
  var result = "H";
  if(coin_flip >= .5){
    result = "T";
  }
  var print = '``'+result + "``\n";
  // starts the print string that will be sent last.
  var guess = args[2].charAt(0).toUpperCase();
  if(guess.startsWith(result)){ // if the flip was T and they bet tails, Tails, t, or T
    print += "Congratulations, you won "+Math.ceil(bet*1.5)+" Noods!";
    users[omsg.author.id].money += Math.ceil(bet*1.5);
  } else {
    print += "Better luck next time!";
  }
  omsg.channel.sendMessage(print);
  allusers[users] = users;
  return allusers;
}
