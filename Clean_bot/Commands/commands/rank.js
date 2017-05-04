module.exports = function(omsg, args, powerlevel, server, allusers, globalDebug){
  omsg.channel.sendMessage("Your rank is #"+allusers[server.id][omsg.author.id].rank)
}
