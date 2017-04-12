const fs = require("fs");
module.exports = function(omsg){
  try{
    var consoleinfo = JSON.parse(fs.readFileSync('./util/modules/console/consoleinfo.json', 'utf8'));
    var picArr = omsg.attachments.array();
    if(consoleinfo.lastChannel != omsg.channel.id){
      if(consoleinfo.lastGuild != omsg.guild.id){
        console.log(omsg.guild.name+":")
        consoleinfo.lastGuild = omsg.guild.id
      }
      console.log("  "+omsg.channel.name+":")
      consoleinfo.lastChannel = omsg.channel.id
      //console.log("    "+omsg.author.username+":")
      consoleinfo.lastUser = omsg.author.id
      //saveState("consoleinfo")
    }
    console.log("     "+omsg.author.username+": "+omsg.content)
    if(picArr[0]){
      console.log("    Picture url: " + picArr[0].url);
    }
    fs.writeFile('./util/modules/console/consoleinfo.json', JSON.stringify(consoleinfo));
  }catch(err){
    console.log(err);
  }
}
