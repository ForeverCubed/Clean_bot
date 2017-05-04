module.exports = function(omsg, args, powerlevel, server, allusers, globalDebug){
  omsg.reply("has "+allusers[omsg.guild.id][omsg.author.id].money+" noods!");
  return undefined;
}
