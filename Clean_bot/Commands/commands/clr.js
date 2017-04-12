module.exports = function(omsg, args, powerlevel, server, users){
  try{
    var mentions = omsg.mentions.users.array();
    if(mentions[0]) {
      mentions = mentions[0];
    } else if(users[server.id][args[1]]){
      mentions = users[args[1]];
    }else{
      mentions = undefined;
    }
    if(server.debug.includes("clr.js")){
      console.log("     mentions: ")
      console.log("     "+mentions+"\n")
    }
    // done setting mentions.
    var checkAgainst = omsg.author.id; // sets checkAgainst to the ID chosen
    var print = "";
    var toDel = clrCheck(omsg, args, powerlevel, print, server, users);
    if(server.debug){
      console.log("     toDel "+toDel)
      console.log("     powerlevel "+powerlevel)
    }
    if(!toDel) return;
    if(!mentions && powerlevel >= 2){
      omsg.channel.fetchMessages({limit: toDel})
        .then(messages => omsg.channel.bulkDelete(messages));
        return;
    }
    if(powerlevel >= 2) checkAgainst = mentions.id
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
        console.log("     Cleared "+delmsgs.length+" messages!")
      });
    omsg.delete(3000) // lastly deletes !clr
  }catch(err){
    if(server.debug) console.log("     Uh oh! clr.js made a bad. \n"+err)
  }
}

function clrCheck(omsg, args, powerlevel, print, server, users){
      // this is assigned to toDel, line 10.
      var mentions = omsg.mentions.users.array();
      if(mentions[0]) {
        mentions = mentions[0];
      } else if(users[server.id][args[1]]){
        mentions = users[args[1]];
      }else{
        mentions = undefined;
      }
      // done setting mentions.
      try{ // just dumb stuff for debugging.
        console.log("     "+mentions.id)
        console.log("     "+mentions.username)
      }catch(err){}
      if(powerlevel < 1){
        print += "Only members can use !clr"
        omsg.channel.sendMessage(print);
        return undefined;
      } // if they're not allowed to use !clr
      if(mentions && powerlevel < 2){
        print += "Only admins may use ``!clr @username``"
        omsg.channel.sendMessage(print);
        return undefined;
      } // if they're not admin and have mentioned someone or their ID.
      if(parseInt(args[2],10) > 1 && parseInt(args[2],10) < 100){
        return parseInt(args[2],10);
      } // if args[2] is greater than 1 and less than 100.
      if(parseInt(args[1],10) > 1 && parseInt(args[1],10) < 100){
        return parseInt(args[1],10);
      }
      return 30;
      // if it gets here;
      //  ♦ powerlevel is >= 2
      //  ♦ mentions == undefined
      //  ♦ args[2] is <= 1 or >= 100 or even undefined.
    }
