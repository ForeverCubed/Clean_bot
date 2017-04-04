const fs = require("fs");

module.exports = function(omsg, args, powerlevel){
  var allquotes = JSON.parse(fs.readFileSync('./util/servers/quotes.json', 'utf8'));
  var quotes = allquotes[omsg.guild.id];
  console.log(allquotes)
  if(args[1] == "quotes"){
    omsg.channel.sendMessage("Pls no, that one is reserved.");
    return;
  }
  if(!args[2] || !args[1] || args[1] == ""){
    omsg.channel.sendMessage("Please specify a quotename and quote.");
    return;
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
  fs.writeFile('./util/servers/quotes.json', JSON.stringify(allquotes, null, "\t"));
  omsg.reply("Quote created!");
}
