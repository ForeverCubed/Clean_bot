const fs = require("fs");
module.exports = function edituser(omsg, args, powerlevel, servers, users){
  try{
    //var server = servers[omsg.guild.id];
    var print = "";
    if(checkEditUser(omsg, args, servers, print, users)) return;
    var user = omsg.mentions.users.array();
    user = users[omsg.guild.id][user[0].id]
    var newValue = omsg.content.substring((args[1]+args[2]).length+13)
    if(parseInt(args[3], 10) && !args[4]){
      newValue = parseInt(args[3], 10);
    } else if(args[3] == 0 && !args[4]) newValue = 0;
    user[args[2]] = newValue;
    //print += user.name+"'s new stats"
    var userProps = "```";
    for(i in users.props){
      userProps += users.props[i]+":"+user[users.props[i]]+"\n"
    }
    print += userProps+"```"
    //sendMsg(omsg, print, false)
    omsg.channel.sendMessage(print);
    users[user.id] = user;
    //saveState("users");
    fs.writeFile('./util/servers/userinfo.json', JSON.stringify(users, null, "\t"));
    return true;
  }catch(err){
    return false;
  }
}
function checkEditUser(omsg, args, servers, print, users){
  try{
    if(args[1].startsWith("<") && !args[2]){
      var properties = users.props;
      var user = omsg.mentions.users.array();
      user = users[user[0].id]
      var userProps = "```";
      for(i in users.props){
        console.log("     "+users.props[i])
        console.log("     "+user)
        userProps += users.props[i]+":"+user[users.props[i]]+"\n"
      }
      //sendMsg(omsg, userProps+"```", false)
      omsg.channel.sendMessage(userProps+"```");
      return true;
    }
    if(!users.props.includes(args[2])){ // makes sure args[2] is an editable setting.
      print += args[2]+" is not editable or does not exist."
      omsg.reply(print);
      return true;
    }
    if(!args[3] || !args[1].startsWith("<@")){ // makes sure there are enough args and args[1] is a mention
      print += "Syntax is ``!edit [@user] [property] [new property value]``"
      omsg.reply(print);
      return true;
    }
  }catch(err){
    if(!args[1]){
      print += "Syntax is ``!edit [@user] [property] [new property value]``"
      omsg.reply(print);
      return true;
    }
    console.log("     !edit fucked up."+err);
    omsg.reply("An error occured, please try again or ask ForeverCubed what the hell is happening.");
    return false;
  }
  return false;
}
    // if(!args[1]){
    //   print += "Syntax is ``!edit [@user] [property] [new property value]``"
    //   omsg.reply(print);
    //   return true;
    // }
