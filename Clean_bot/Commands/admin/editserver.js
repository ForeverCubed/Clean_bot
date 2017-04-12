const fs = require("fs");
module.exports = function(omsg, args, powerlevel, servers, users){
  try{
    var server = servers[omsg.guild.id];
    var print = ""
    args = omsg.content.split(" ");
    var loc = args[1];
    if(!args[1]){
      var serverProps = "```"
      for(var i = 0; i < servers.props.length; i++){
        serverProps += servers.props[i]+":"+server[servers.props[i]]+"\n"
      }
      omsg.channel.sendMessage(serverProps+"```");
      return;
    }
    if(!server.hasOwnProperty(loc)){
      print += "``settings."+loc+" does not exist.``"
      omsg.reply(print);
      return;
    }
    print += "``settings."+loc+"`` changed from ``"+server[loc]+"``";
    if(!args[1]){
      print = "settings."+loc+":"+server[loc]
      omsg.reply(print);
      return;
    }
    if(server.debug) console.log("     Before switch, args[2] = "+args[2])
    switch(args[2]){
      case "0":
        if(server.debug) console.log("     Setting to 0...")
        server[loc] = 0;
        break;
      case "true":
        if(server.debug) console.log("     Setting to true...")
        server[loc] = true;
        break;
      case "false":
        if(server.debug) console.log("     Setting to false...")
        server[loc] = false;
        break;
      default:
        if(parseInt(args[2], 10)){
          if(server.debug) console.log("     Default. setting to parseInt(args[2], 10)")
          server[loc] = parseInt(args[2], 10);
        }
    }
    print += " to ``"+server[loc]+"``";
    omsg.channel.sendMessage(print);
    servers[omsg.guild.id] = server;
    fs.writeFile('./util/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
    return true;
  }catch(err){
    if(servers[omsg.guild.id].debug){
      console.log("     "+err)
    }
    return false;
  }
}
