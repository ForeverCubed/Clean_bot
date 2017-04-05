module.exports = function(omsg, args, powerlevel, server){
  var mentions = omsg.mentions.users.array();
  var checkAgainst = omsg.author.id; // sets checkAgainst to the ID chosen
  var print = "";
  var toDel = clrCheck(omsg, args, powerlevel, print, server);
  if(!toDel) return;
  if(!mentions[0] && powerlevel >= 2){
    omsg.channel.fetchMessages({limit: 30})
      .then(messages => omsg.channel.bulkDelete(messages));
      return;
  }
  if(powerlevel >= 2) checkAgainst = mentions[0].id
  var delmsgs = [];
  omsg.channel.fetchMessages({limit: 100}) // fetchs messages within the limit set earlier
    .then(messages => {
      var msgs = messages.array();
      for(var i=0; i<msgs.length; i++){ // iterates through the msgs array and finds which ones to add to delmsgs
        if(msgs[i].author.id === checkAgainst && delmsgs.length < toDel){
          delmsgs.push(msgs[i]);
        }
      }
      omsg.channel.bulkDelete(delmsgs); // finally deletes all selected msgs
    });
  omsg.delete(3000) // lastly deletes !clr
}

function clrCheck(omsg, args, powerlevel, print, server){
      var mentions = omsg.mentions.users.array();
      var clr = 30;
      if(powerlevel < 1){
        print += "Only members of "+server.settings.memberrole+" can use !clr"
        omsg.channel.sendMessage(print);
        clr = undefined
        return clr;
      }
      if(mentions[0] && powerlevel < 2){
        print += "Only admins may use ``!clr @username``"
        clr = undefined;
        omsg.channel.sendMessage(print);
      } else if(parseInt(args[2],10) > 1 && parseInt(args[2],10) < 100){
        clr = parseInt(args[2],10);
      }
      return clr;
    }
