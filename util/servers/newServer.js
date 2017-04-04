const fs = require("fs");
var serverSettings = JSON.parse(fs.readFileSync('./util/servers/serverSettings.json', 'utf8'));
var quotes = JSON.parse(fs.readFileSync('./util/servers/quotes.json', 'utf8'));

module.exports = function(server){
  quotes[server.id] = {"help":{
    "quote":"help",
    "creatorid":"120806137816678402",
    "creatorname":"ForeverCubed",
    "content":["kys"]
  }};
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
  fs.writeFile('./util/servers/quotes.json', JSON.stringify(quotes, null, "\t"));
}
