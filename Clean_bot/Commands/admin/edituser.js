const fs = require("fs");
module.exports = function edituser(omsg, args, powerlevel, servers, users){
  //var Command = args[0];
  //var User = args[1];
  //var Property = args[2];
  //var Value = args[3];
  try{
    var print = "";
    var mentions = checkMentions(omsg, args[1], users[omsg.guild.id], servers[omsg.guild.id]);
    if(checkEditUser(omsg, args, servers, print, users, mentions)) return undefined;
    var user = users[omsg.guild.id][mentions.id];
    var newValue = omsg.content.substring((args[1]+args[2]).length+13)
    if(parseInt(args[3], 10) && !args[4]) 
      newValue = parseInt(args[3], 10);
    else if(args[3] == 0 && !args[4]) 
      newValue = 0;
    user[args[2]] = newValue;
    var userProps = "```";
    for(i in users.props){
      userProps += users.props[i]+":"+user[users.props[i]]+"\n"
    }
    print += userProps+"```";
    omsg.channel.sendMessage(print);
    users[user.id] = user;
    return users;
  }catch(err){
    console.log(err);
  }
}

function checkEditUser(omsg, args, servers, print, users, mentions){
  try{
    if(!args[1] || !mentions){ // makes sure there are enough args and args[1] is a mention
      print += "Syntax is ``!edituser <mention> <property> <new property value>``"
      omsg.reply(print);
      return true;
    }
    if(mentions && !args[2]){
      var properties = users.props;
      var user = users[omsg.guild.id][mentions.id];
      var userProps = "```";
      for(i in users.props)
        userProps += users.props[i]+":"+user[users.props[i]]+"\n"
      omsg.channel.sendMessage(userProps+"```");
      return true;
    }
    if(!users.props.includes(args[2])){ // makes sure args[2] is an editable setting.
      print += args[2]+" is not editable or does not exist."
      omsg.reply(print);
      return true;
    }
    return false;
  }catch(err){
    console.log("!edituser fucked up."+err);
    omsg.reply("Err");
    return false;
  }
}

function checkMentions(omsg, arg, users, server){
  var mentions = omsg.mentions.users.array();
  if(mentions[0]) mentions = mentions[0];
  else if(users[arg]) mentions = users[arg];
  else mentions = undefined;
  return mentions;
}