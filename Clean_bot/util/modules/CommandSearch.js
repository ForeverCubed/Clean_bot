var ref, omsg, args, powerlevel, servers, users;

module.exports = function(ref, omsg, args, powerlevel, servers, users){
  //Properties:
  //  •cSearch.worked - boolean - true if the message is a command
  //  •cSearch.type   - String  - either "admin" or "command"
  //  •cSearch.name   - String  - name of the command called
  //  •cSearch.index  - int     - index of command in ref
  loadGlobalVar(ref, omsg, args, powerlevel, servers, users);
  var server = servers[omsg.guild.id];
  var result = {"worked":false};
  if(powerlevel >= 2){
    for(i in ref.admincommands){
      if(ref.admincommands[i].call == args[0]) {
        result.worked = true;
        result.type = "admin";
        result.name = ref.admincommands[i].name;
        result.index = i;
        break;
      }
    }
  }
  for(i in ref.commands){
    if(ref.commands[i].call.includes(args[0])){
      result.worked = true;
      result.type = "command";
      result.name = ref.commands[i].name;
      result.index = i;
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
