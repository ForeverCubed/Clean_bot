//mentions_check.js

module.exports = function(omsg, users, server){
	var mentions = omsg.mentions.users.array();
	if(mentions[0]) mentions = mentions[0];
	else if(!args[1]) mentions = omsg.author.id;
	else if(users[server.id][args[1]]) mentions = users[args[1]];
	else mentions = undefined;
	return mentions;
}