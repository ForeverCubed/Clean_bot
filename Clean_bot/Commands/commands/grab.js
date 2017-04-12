const fs = require("fs");
module.exports = function(omsg, args, powerlevel, server){
  var allusers = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
  var servers = JSON.parse(fs.readFileSync('./util/modules/servers/serverSettings.json', 'utf8'));
  var users = allusers[omsg.guild.id];
  if(server.freq <= 0){
    omsg.channel.sendMessage("Noodles are disabled for this server. Sorry!");
    return;
  }
  if(!server.money.onScreen || omsg.channel.id !== server.money.onChannel){
    omsg.reply("No lolis in sight, sir!");
    return;
  }
  server.money.onScreen = false;
  var msgs = [];
  var delmsgs = [];
  omsg.channel.fetchMessages({limit: 10}) // fetchs messages within the limit set earlier
    .then(messages => {
      msgs = messages.array(); // turns the messages collection into a useable array
      for(var i=0; i<msgs.length;i++){ // iterates through the msgs array and finds which ones to add to delmsgs
        if(msgs[i].author.id === "258426554739064833"){
          delmsgs.push(msgs[i]);
        }
      }
      omsg.channel.bulkDelete(delmsgs); // finally deletes all selected msgs
    });
  var noodsAmount = Math.ceil(Math.random()*4)+1;
  users[omsg.author.id].money += noodsAmount;
  omsg.delete(3000);
  omsg.reply("has collected "+noodsAmount+" noods from this loli!");
  allusers[omsg.guild.id] = users;
  fs.writeFile('./util/modules/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
  servers[omsg.guild.id] = server;
  fs.writeFile('./util/modules/servers/serverSettings.json', JSON.stringify(servers, null, "\t"));
}
