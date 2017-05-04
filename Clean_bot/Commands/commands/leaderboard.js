module.exports = function(omsg, args, powerlevel, server, allusers, globalDebug){
  var users = allusers[server.id];
  var print = "```";
  var lb = [];
  for(id in users) lb[users[id].rank-1] = id;
  for(var i = 0; i < 5; i++){
  	if(lb[i]){
  		print += "\n #"+users[lb[i]].rank+" - "+users[lb[i]].username+", level: "+users[lb[i]].level;
  	}
  }
  //for(i in lb) print += "\n #"+users[lb[i]].rank+" - "+users[lb[i]].username+", level: "+users[lb[i]].level;
  omsg.channel.sendMessage(print+"```");
}
