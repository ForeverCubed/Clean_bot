const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var allquotes = JSON.parse(fs.readFileSync('./util/servers/quotes.json', 'utf8'));
  var quotes = allquotes[omsg.guild.id];
  if(!args[1] || !quotes[args[1]]){
    omsg.channel.sendMessage("Please specify an existing quote.");
    return;
  }
  for(i in quotes){
    if(quotes[i].quote == args[1] && quotes[i].creatorid != omsg.author.id && omsg.author.id != botsettings.ownerID){
      var print = "Only ``"+quotes[i].creatorname+"`` may only remove elements of ``"+quotes[i].quote+"``. "
      print += "Please contact an admin if you really need that quote removed."
      omsg.reply(print);
      return;
    }
  }
  if(args[2] || quotes[args[1]].content.length == 1){
    if(args[2] == "all" || quotes[args[1]].content.length == 1){
      delete quotes[args[1]];
      allquotes[omsg.guild.id] = quotes;
      omsg.reply("... "+args[1]+" deleted!");
      fs.writeFile('./util/servers/quotes.json', JSON.stringify(allquotes, null, "\t"));
      return;
    }
    quotes[args[1]].content.splice((args[2]-1), 1);
    allquotes[omsg.guild.id] = quotes;
    omsg.reply("Done!");
    fs.writeFile('./util/servers/quotes.json', JSON.stringify(allquotes, null, "\t"));
    return;
  }
  var print = "\n"//'\n**Which quote would you like to delete? _!delquote [all] will delete all_**'+"\n";
  print += '**Which quote would you like to delete?'
  print += "\n_!delquote [quotename] all_ will delete all**\n"
  for(i in quotes[args[1]].content){
    var quote = "``... "+args[1]+" "+quotes[args[1]].content[i]+"``";
    i++;
    print += "\n"+i+" "+quote
    i--;
  }
  omsg.reply(print);
  return;
  for(i in quotes[args[2]]){
    if(quotes[args[2]][i] == args[1]){
      quotes[args[2]].splice(i, 1);
      args[2] = i;
      break;
    }
  }
  omsg.reply(args[1]+" "+quotes[args[2]]+" deleted!");
  allquotes[omsg.guild.id] = quotes;
  fs.writeFile('./util/servers/quotes.json', JSON.stringify(allquotes, null, "\t"));
  return;
}
