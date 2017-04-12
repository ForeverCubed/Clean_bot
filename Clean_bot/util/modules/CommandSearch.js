var ref, omsg, args, powerlevel, servers, users;

module.exports = function(ref, omsg, args, powerlevel, servers, users){
  loadGlobalVar(ref, omsg, args, powerlevel, servers, users);
  var server = servers[omsg.guild.id];
  var result = {"worked":false};
  if(powerlevel >= 2){
    for(i in ref.admin){
      if(ref.admin[i].call == args[0]) {
        result.worked = true;
        result.type = "admin";
        result.name = ref.admin[i].name;
        break;
      }
    }
  }
  for(i in ref.commands){
    if(ref.commands[i].call.includes(args[0])){
      result.worked = true;
      result.type = "command";
      result.name = ref.commands[i].name;
      break;
    }
  }
  return result;
}
function loadGlobalVar(ref, omsg, args, powerlevel, servers, users){
  ref = ref;
  omsg = omsg;
  args = args;
  powerlevel = powerlevel;
  servers = servers;
  users = users;
}
