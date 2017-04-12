const fs = require("fs");
var serverSettings = JSON.parse(fs.readFileSync('./util/modules/servers/serverSettings.json', 'utf8'));
var quotes = JSON.parse(fs.readFileSync('./util/modules/servers/quotes.json', 'utf8'));

module.exports = function(server, globalDebug){
  quotes[server.id] = {"help":{
    "quote":"help",
    "creatorid":"120806137816678402",
    "creatorname":"ForeverCubed",
    "content":["kys"]
  }};
  serverSettings[server.id] = {
    "name":server.name,
    "id":server.id,
    "score_time":2,
    "admin":"admin",
    "member":"member",
    "xpScale":250,
    "console":true,
    "debug":[],
    "freq":30,
    "money":{
      "onChannel":"",
      "onScreen":false,
      "lastMsg":0,
      "spamCheck":{
        "count":0,
        "userid":""
      }
    }
  }
  fs.writeFile('./util/modules/servers/serverSettings.json', JSON.stringify(serverSettings, null, "\t"));
  fs.writeFile('./util/modules/servers/quotes.json', JSON.stringify(quotes, null, "\t"));
}
