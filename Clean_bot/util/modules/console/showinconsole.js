const fs = require("fs");
module.exports = function(omsg){
  try{
    var consoleinfo = JSON.parse(fs.readFileSync('./JSON files/console/consoleinfo.json', 'utf8'));
    var picArr = omsg.attachments.array();
    var log = fs.readFileSync('./JSON files/console/log.txt', 'utf8');
    if(consoleinfo.lastChannel != omsg.channel.id){
      if(consoleinfo.lastGuild != omsg.guild.id){
        console.log("     "+omsg.guild.name+":")
        log += "     "+omsg.guild.name+":"+"\n"
        consoleinfo.lastGuild = omsg.guild.id
      }
      console.log("  "+omsg.channel.name+":")
      log += "  "+omsg.channel.name+":"+"\n"
      consoleinfo.lastChannel = omsg.channel.id
      consoleinfo.lastUser = omsg.author.id
    }
    if(omsg.author.bot) {
      console.log("BOT "+omsg.author.username+": "+omsg.content)
      log += "BOT "+omsg.author.username+": "+omsg.content+"\n"
    } else {
      console.log(omsg.author.username+": "+omsg.content);
      log += omsg.author.username+": "+omsg.content+"\n"
    }
    if(picArr[0]){
      console.log("Picture url: " + picArr[0].url);
      log += "Picture url: " + picArr[0].url+"\n"
    }
    fs.writeFile('./JSON files/console/log.txt', log);
    fs.writeFile('./JSON files/console/consoleinfo.json', JSON.stringify(consoleinfo, null, "\t"));
  }catch(err){
    console.log(err);
  }
}

// module.exports = function(omsg, consoleinfo){
//   try{
//     //var consoleinfo = JSON.parse(fs.readFileSync('./util/modules/console/consoleinfo.json', 'utf8'));
//     var picArr = omsg.attachments.array();
//     if(consoleinfo.lastChannel != omsg.channel.id){
//       if(consoleinfo.lastGuild != omsg.guild.id){
//         console.log("     "+omsg.guild.name+":")
//         consoleinfo.lastGuild = omsg.guild.id
//       }
//       console.log("  "+omsg.channel.name+":")
//       consoleinfo.lastChannel = omsg.channel.id
//       consoleinfo.lastUser = omsg.author.id
//     }
//     if(omsg.author.bot) console.log("BOT "+omsg.author.username+": "+omsg.content)
//     else console.log(omsg.author.username+": "+omsg.content);
//     if(picArr[0]){
//       console.log("Picture url: " + picArr[0].url);
//     }
//     return consoleinfo
//   }catch(err){
//     console.log(err);
//   }
// }
