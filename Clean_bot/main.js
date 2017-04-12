const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var reqSettings = JSON.parse(fs.readFileSync('./settings-required.json', 'utf8'));
var token = reqSettings.token;
var globalDebug = reqSettings.debug;

var ref = JSON.parse(fs.readFileSync('./Commands/masterReference.json', 'utf8'));
var commands = require("./Commands/masterCommandExports.js");
var admincommands = require("./Commands/masterAdminExports.js");
var util = require("./util/exports.js");
fs.writeFile('./util/modules/console/consoleinfo.json', JSON.stringify({}, null, "\t"));

bot.on("message", (msg) => {
  try{
    var servers = JSON.parse(fs.readFileSync('./util/modules/servers/serverSettings.json', 'utf8'));
    var allusers = JSON.parse(fs.readFileSync('./util/modules/servers/userinfo.json', 'utf8'));
    if(!servers[msg.guild.id]) {
      util.newServer(msg.guild, globalDebug);
      return;
    }
    var server = servers[msg.guild.id];
    util.showinconsole(msg)
    if(msg.author.bot)return;
    var powerlevel = util.findPower(msg, server, globalDebug); // find power. 0-2
// aaand into the actual program!
    var args = util.msgFormalities(msg.content);

    var cSearch = util.cmdCheck(ref, msg, args, powerlevel, servers, allusers);
    if(cSearch.worked){
      switch(cSearch.type){
        case "admin":
          admincommands[cSearch.name](msg, args, powerlevel, servers, allusers);
          break;
        case "command":
          commands[cSearch.name](msg, args, powerlevel, server, allusers);
          break;
      }
      fs.writeFile('./util/modules/servers/userinfo.json', JSON.stringify(allusers, null, "\t"));
      return;
    }
    if(util.isaquote(msg)) return;
    util.check(msg, args, powerlevel, servers);
    util.updateUserInfo(msg);
  }catch(err) {
    if(servers[msg.guild.id].debug){
      console.log(err);
    }else console.log("Something went wrong in main.js");
  }
});

bot.on('ready', () => {
  console.log(`Ready in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});
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
