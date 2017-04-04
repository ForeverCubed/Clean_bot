const fs = require("fs");
var serverSettings = JSON.parse(fs.readFileSync('./util/servers/serverSettings.json', 'utf8'));

module.exports = function(server){
  try{
  serverSettings[server.id] = {
    "info":{
      "name":server.name,
      "id":server.id
    },
    "score_time":2,
    "admin":"admin",
    "member":"member",
    "xpScale":250,
    "console":true,
    "debug":false,
    "money":{
      "freq":30,
      "onChannel":"",
      "onScreen":false,
      "lastMsg":0,
      "spamCheck":{
        "count":0,
        "userid":""
      }
    }
  }
  fs.writeFile('./util/servers/serverSettings.json', JSON.stringify(serverSettings, null, "\t"));
  return true;
}catch(err){
  return false;
}
}
