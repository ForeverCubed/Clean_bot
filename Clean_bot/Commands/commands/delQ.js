const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var allquotes = JSON.parse(fs.readFileSync('./util/modules/servers/quotes.json', 'utf8'));
  var quotes = allquotes[omsg.guild.id];
  if(!args[1] || !quotes[args[1]]){
    omsg.channel.sendMessage("Please specify an existing quote.");
    return undefined;
  }
  for(i in quotes){
    if(quotes[i].quote == args[1] && quotes[i].creatorid != omsg.author.id){
      var print = "Only ``"+quotes[i].creatorname+"`` may only remove elements of ``"+quotes[i].quote+"``. "
      print += "\nPlease contact an admin if you really need that quote removed."
      omsg.reply(print);
      return undefined;
    }
  }
  if(args[2] || quotes[args[1]].content.length == 1){
    if(args[2] == "all" || quotes[args[1]].content.length == 1){
      delete quotes[args[1]];
      allquotes[omsg.guild.id] = quotes;
      omsg.reply(args[1]+" deleted!");
      return allquotes;
    }
    quotes[args[1]].content.splice((args[2]-1), 1);
    allquotes[omsg.guild.id] = quotes;
    omsg.reply("Done!");
    return allquotes;
  }
  var print = "\n"
  print += '**Which quote would you like to delete?'
  print += "\n_!delquote [quotename] all_ will delete all**\n"
  for(i in quotes[args[1]].content){ // adds all the quotes to print
    var quote = "`` "+quotes[args[1]].content[i]+"``";
    i++;
    print += "\n"+i+" "+quote
    i--;
  }
  omsg.reply(print);
  return undefined;
}
