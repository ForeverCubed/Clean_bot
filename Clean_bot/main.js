const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
console.log(fs.readFileSync("./JSON files/console/log.txt",'utf8'));
var reqSettings = JSON.parse(fs.readFileSync('./JSON files/settings.json', 'utf8'));
var token = reqSettings.token;
var globalDebug = reqSettings.debug;
var all_exports = require("./master_export.js");
var commands = all_exports.CommandModules;
var admincommands = all_exports.AdminModules;
var util = all_exports.UtilModules;
var ref = JSON.parse(fs.readFileSync('./master_ref.json', 'utf8'));
//fs.writeFile('./util/modules/console/consoleinfo.json', JSON.stringify({}, null, "\t"));

bot.on("message", (msg) => {
  try{// /JSON files
    var quotes = JSON.parse(fs.readFileSync('./JSON files/servers/quotes.json', 'utf8'));
    var servers  = JSON.parse(fs.readFileSync('./JSON files/servers/serverSettings.json', 'utf8'));
    var allusers = JSON.parse(fs.readFileSync('./JSON files/servers/userinfo.json', 'utf8'));
    // loads the files for all servers and users
    if(!servers[msg.guild.id]) {
      var newServer = util.newServer(msg.guild, globalDebug, servers, quotes);
      if(newServer){
        servers = newServer.servers;
        quotes = newServer.quotes;
      } else console.log("new server failed to create.");
      return;
      // creates a new server if needed at the msg's guild id then returns to avoid bugs.
    }
    var server = servers[msg.guild.id]; // sets msg's server
    if(server.console) util.showinconsole(msg);
    if(msg.author.bot) return;
    var powerlevel = util.findPower(msg, server, globalDebug); // find power. 0-2
    var args = util.msgFormalities(msg.content);
    var cSearch = util.cmdCheck(ref, msg, args, powerlevel, servers, allusers, globalDebug);
    if(cSearch.worked){ // does some stuff if the message is calling a command
      allusers = util.updateRank(allusers, server);
      switch(cSearch.type){
        case "admin":
          var isSaving = admincommands[cSearch.name](msg, args, powerlevel, servers, allusers, globalDebug);
          if(isSaving) {
            var filePath = ref.files[ref.admincommands[cSearch.index].fileio];
            fs.writeFile(filePath, JSON.stringify(isSaving, null, "\t"));
          }
          break;
        case "command": // all commands will return an array of strings depending on what needs saving.
          var isSaving = commands[cSearch.name](msg, args, powerlevel, server, allusers, globalDebug);
          fs.writeFile('./JSON files/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
          if(isSaving) {
            var filePath = ref.files[ref.commands[cSearch.index].fileio];
            fs.writeFile(filePath, JSON.stringify(isSaving, null, "\t"));
          }
          break;
      }
      return;
    }
    if(util.isaquote(msg, quotes[server.id])) return; // checks if the msg was calling a quote
    util.check(msg, args, powerlevel, servers); // checks for if a loli should appear
    fs.writeFile('./JSON files/servers/userinfo.json', JSON.stringify(util.updateUserInfo(msg, allusers), null, "\t"));
  }catch(err){
    // if an error occurs this catches it
    console.log(err);
  }
});
// lastly readys the bot and logs in!
// bot.on('ready', () => {
//   console.log(`Ready in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
// });
bot.login(token);
//not too sure how to clear the cashe yet. Will update once I find out.

// if(args[0] == "!refresh" && msg.author.id == "120806137816678402"){
//   var refresh = require("./Commands/refresh.js");
//   commands = refresh(msg, "commands", server, globalDebug);
//   admincommands = refresh(msg, "admin", server, globalDebug);
//   ref = JSON.parse(fs.readFileSync('./Commands/masterReference.json', 'utf8'));
//   reqSettings = JSON.parse(fs.readFileSync('./settings-required.json', 'utf8'));
//   msg.reply("Refresh complete!");
//   return;
// }// updates the commands and ref variables.
