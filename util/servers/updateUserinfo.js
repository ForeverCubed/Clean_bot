const fs = require("fs");
const userinfopath = './util/servers/userinfo.json';

module.exports = function(msg){
  try{
    var maxexp = 25;
    var minexp = 10;
    var timeToScore = 2; // in seconds.
    var toLevelUp = 250;
    // all the settings for exp ^^
    var server = msg.guild.id;
    var user = msg.author.id;
    var userinfo = JSON.parse(fs.readFileSync(userinfopath, 'utf8'));
    if(!userinfo[server]){ // if the server doesn't yet exist
      userinfo[server] = {};
    }
    if(!userinfo[server][user]){ // if the user doesn't yet exist
      userinfo[server][user] = {
        "name":msg.author.username,
        "discriminator":msg.author.discriminator,
        "id":user,
        "exp":0,
        "level":1,
        "money":0,
        "totalexp":0,
        "lastmsg":0
      }
    }
    if(msg.createdTimestamp-userinfo[server][user].lastmsg > 1000 * timeToScore){
      var exp = Math.floor(Math.random()*(maxexp-minexp))+minexp;
      userinfo[server][user].exp += exp;
      userinfo[server][user].totalexp += exp;
    }
    if(userinfo[server][user].exp > userinfo[server][user].level * toLevelUp){
      userinfo[server][user].exp -= userinfo[server][user].level * toLevelUp;
      userinfo[server][user].level++;
    }
    userinfo[server][user].lastmsg = msg.createdTimestamp;
    fs.writeFile(userinfopath, JSON.stringify(userinfo, null, "\t"));
    return true;
  } catch(err){
    return false;
  }
}
