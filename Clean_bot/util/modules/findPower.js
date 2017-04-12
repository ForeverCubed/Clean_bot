module.exports = function(msg, server, globalDebug){
  var powerlevel = 0;
  if(msg.member.roles.find("name", server.admin)){
    powerlevel = 2;
  } else
  if(msg.member.roles.find("name", server.member)){
    powerlevel = 1;
  }
  return powerlevel;
}
