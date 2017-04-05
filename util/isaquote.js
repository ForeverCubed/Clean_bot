const fs = require("fs");
module.exports = function(msg){
  var allquotes = JSON.parse(fs.readFileSync('./util/servers/quotes.json', 'utf8'));
  var quotes = allquotes[msg.guild.id];
  if(args[0] == "..." && quotes[args[1]]){
    var randomQuote = Math.floor(Math.random()*quotes[args[1]].content.length);
    msg.channel.sendMessage(":mega: "+quotes[args[1]].content[randomQuote]);
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
