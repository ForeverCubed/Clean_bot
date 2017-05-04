module.exports = function(msg, quotes){
  if(args[0] == "..." && quotes[args[1]]){
    var content = quotes[args[1]].content;
    var randomQuote = Math.floor(Math.random()*content.length);
    msg.channel.sendMessage(":mega: "+content[randomQuote]);
    return true;
  } else if(args[0] == "..." && args[1] == 'quotes'){
    var print = "**";
    for(i in quotes){
      print += "``"+quotes[i].quote+"`` with "+quotes[i].content.length+" quotes\n";
    }
    msg.channel.sendMessage(print+"**");
    return true;
  }
  return false;
}
