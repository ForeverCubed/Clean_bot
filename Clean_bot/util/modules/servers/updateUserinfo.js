var maxexp = 25;
var minexp = 10;
var timeToScore = 4; // in seconds.
var toLevelUp = 250;
// all the settings for exp ^^
module.exports = function(omsg, allusers){
  var userinfo = allusers;
  try{
    var server = omsg.guild.id;
    var user = omsg.author.id;
    // if the server doesn't yet exist it creates an empty object for it
    if(!userinfo[server])
      userinfo[server] = {};
    // if the user doesn't yet exist yet it creates a new profile for them
    if(!userinfo[server][user]){
      userinfo[server][user] = {
        "username":omsg.author.username,
        "discriminator":omsg.author.discriminator,
        "id":user,
        "exp":0,
        "level":1,
        "money":0,
        "totalexp":0,
        "lastmsg":0
      }
    }
    // here we set easy to user variables
    var exp = userinfo[server][user].exp;
    var level = userinfo[server][user].level;
    var lastmsg = omsg.createdTimestamp-userinfo[server][user].lastmsg;
    // now it's time to check if the message is spam and add score!
    if(lastmsg > 1000 * timeToScore){
      var newexp = Math.floor(Math.random()*(maxexp-minexp))+minexp;
      exp += newexp;
    }
    // aaand now to check if they have leveled up.
    if(exp > level * toLevelUp){
      exp -= level * toLevelUp;
      level++;
    }
    userinfo[server][user].lastmsg = omsg.createdTimestamp;
    userinfo[server][user].exp = exp;
    userinfo[server][user].level = level;
    userinfo[server][user].totalexp = checkTotalExp(level, exp);
    return userinfo;
  } catch(err){
    return userinfo;
  }
}

function checkTotalExp(level, exp){
  var totalexp = exp;
  for(var i = 0; i < level; i++){
    totalexp += i * toLevelUp;
  }
  return totalexp;
}