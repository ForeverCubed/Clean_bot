const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var commands = require("./Commands/exports.js");
var cref = JSON.parse(fs.readFileSync('./Commands/ref.json', 'utf8'));
var util = require("./util/exports.js");

bot.on("message", (msg) => {
  try{
    var servers = JSON.parse(fs.readFileSync('./util/servers/serverSettings.json', 'utf8'));
    if(!servers[msg.guild.id]) {
      util.newServer(msg.guild);
      return;
    }
    var server = servers[msg.guild.id];
    console.log(msg.author.username+": "+msg.content);
    if(msg.author.bot) return;
    if(msg.content.startsWith("<@!258426554739064833>") || msg.content.startsWith("<@258426554739064833>")){
      msg.reply("https://puu.sh/v9j17/818ec2992f.png");
    }
    var powerlevel = util.findPower(msg, server);
    var args = util.msgFormalities(msg.content);
    for(i in cref){
      if(cref[i].call == args[0]) {
        commands[cref[i].name](msg, args, powerlevel);
      }
    }
    util.isaquote(msg);
    util.updateUserInfo(msg);
  }catch(err) {
    console.log(err);
  }
});

bot.on('ready', () => {
  console.log(`Ready in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});
bot.login();
