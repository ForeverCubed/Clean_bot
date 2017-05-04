module.exports = function(server, globalDebug, serverSettings, quotes){
  if(globalDebug.includes("server")) console.log("    Creating new server "+msg.guild.name);
  quotes[server.id] = {
    "help":{
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
  return {"servers":serverSettings, "quotes":quotes};
  //fs.writeFile('./util/modules/servers/serverSettings.json', JSON.stringify(serverSettings, null, "\t"));
  //fs.writeFile('./util/modules/servers/quotes.json', JSON.stringify(quotes, null, "\t"));
}
