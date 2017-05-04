const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var allquotes = JSON.parse(fs.readFileSync('./util/modules/servers/quotes.json', 'utf8'));
  var quotes = allquotes[omsg.guild.id];
  if(args[1] == "quotes"){
    omsg.channel.sendMessage("Pls no, that one is reserved.");
    return undefined;
  }
  if(!args[2] || !args[1] || args[1] == ""){
    omsg.channel.sendMessage("Please specify a quotename and quote.");
    return undefined;
  }
  if(!quotes[args[1]]){
    var newQuote = {
      "quote":args[1],
      "creatorid":omsg.author.id,
      "creatorname":omsg.author.username,
      "content":[]
    }
    quotes[args[1]] = newQuote;
  }
  pushQuote = omsg.content.substring(args[0].length + args[1].length + 2);
  quotes[args[1]].content.push(pushQuote);
  allquotes[omsg.guild.id] = quotes;
  omsg.reply("Quote created!");
  return allquotes;
}
