const fs = require("fs");
module.exports = function(omsg, args, powerlevel, servers){
  var noodles = JSON.parse(fs.readFileSync('./util/cashsys/noodles.json', 'utf8'));
  var server = servers[omsg.guild.id];
  var secDelay = 1000 * .6;
  var spamFilter = 10;
  var freq = server.money.freq;
  server.money.onChannel = omsg.channel.id;
  if(omsg.author.id == server.money.spamCheck.id){
    server.money.spamCheck.count++;
  } else {
    server.money.spamCheck.id = omsg.author.id;
    server.money.spamCheck.count = 0;
  }
  if(omsg.createdTimestamp < secDelay+server.money.lastMsg || server.money.spamCheck.count >= spamFilter){
    server.money.lastMsg = omsg.createdTimestamp;
    servers[omsg.guild.id] = server;
    fs.writeFile('./util/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
    return;
  }
  // all spam is weeded out above.
  if(omsg.createdTimestamp%freq == 0 && !server.money.onScreen){
    server.money.onScreen = true;
    omsg.channel.sendMessage("A wild loli has appeared! \n"+
    noodles.lolipics[Math.floor(Math.random()*noodles.lolipics.length)]);
    omsg.channel.sendMessage("Type ``!grab`` to get that dolla dolla");
  }
  server.money.lastMsg = omsg.createdTimestamp;
  servers[omsg.guild.id] = server;
  fs.writeFile('./util/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
}
