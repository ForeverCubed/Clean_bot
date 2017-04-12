const fs = require("fs");
module.exports = function(omsg, args, powerlevel, servers){
  var noodles = JSON.parse(fs.readFileSync('./util/modules/cashsys/noodles.json', 'utf8'));
  var server = servers[omsg.guild.id];
  // returns if the server disabled money.
  if(server.money.freq <= 0) return;
  // setting the timings and frequency.
  var secDelay = 1000 * .6;
  var spamFilter = 10;
  var freq = server.freq;
  server.money.onChannel = omsg.channel.id; // sets the last active channel.
  // starts weeding out spam.
  if(omsg.author.id == server.money.spamCheck.id){
    server.money.spamCheck.count++;
  } else {
    server.money.spamCheck.id = omsg.author.id;
    server.money.spamCheck.count = 0;
  }
  if(omsg.createdTimestamp < secDelay+server.money.lastMsg || server.money.spamCheck.count >= spamFilter){
    server.money.lastMsg = omsg.createdTimestamp;
    servers[omsg.guild.id] = server;
    fs.writeFile('./util/modules/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
    return;
  }
  // all spam is weeded out above.
  // checks if their timestamp (in milis) mod freq is 0 and if there isn't already a loli on screen.
  if(omsg.createdTimestamp%freq == 0 && !server.money.onScreen){
    server.money.onScreen = true; // flags this server with an active loli
    var randPic = noodles.lolipics[Math.floor(Math.random()*noodles.lolipics.length)];
    var print = "A wild loli has appeared! \n"
    print += randPic+"\n";
    //print += "Type ``!grab`` to get that dolla dolla";
    omsg.channel.sendMessage(print);
    omsg.channel.sendMessage("Type ``!grab`` to get that dolla dolla");
  }
  server.money.lastMsg = omsg.createdTimestamp;
  servers[omsg.guild.id] = server;
  fs.writeFile('./util/modules/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
}
