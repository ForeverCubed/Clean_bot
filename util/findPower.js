module.exports = function(msg, server){
  var power = 0;
  if(msg.member.roles.find("name", server.admin)){ // powerlevel 2
  powerlevel = 2;
  } else
  if(msg.member.roles.find("name", server.member)){ // powerlevel 1
    powerlevel = 1;
  }
  return powerlevel;
}
