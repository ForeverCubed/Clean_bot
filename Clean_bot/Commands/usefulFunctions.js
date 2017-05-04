// usefulFunctions.js

function checkMentions(omsg, arg, users, server){
  var mentions = omsg.mentions.users.array();
  if(mentions[0]) mentions = mentions[0];
  else if(!arg) return omsg.author;
  else if(users[arg]) mentions = users[arg];
  else mentions = undefined;
  return mentions;
} // this function will take a message, where you expect the mention, users, and the current server and check if
  // they mentioned someone, their ID, or themself then returns their profile.

