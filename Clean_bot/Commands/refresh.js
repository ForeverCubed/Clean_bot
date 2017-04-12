const fs = require("fs");
module.exports = function(omsg, type, server, globalDebug){
  try{
    delete require.cashe[require.resolve("./Commands/masterCommandExports.js")];
    delete require.cashe[require.resolverequire("./Commands/masterAdminExports.js")];
    var commands = {};
    var ref = JSON.parse(fs.readFileSync('./Commands/masterReference.json', 'utf8'));
    var count = 0;
    switch(type){
      case "commands":
        ref = ref.commands;
        for(var i = 0; i < ref.length; i++){
          var pushModule = require(ref[i].path);
          commands[ref[i].name] = require(ref[i].path);
          if(globalDebug.includes("exports")) console.log("       Loaded command module "+ref[i].name)
          count++;
        }
        console.log("     Loaded "+count+" command modules.");
        return commands;
      case "admin":
        ref = ref.admin;
        for(var i = 0; i < ref.length; i++){
          var pushModule = require(ref[i].path);
          commands[ref[i].name] = require(ref[i].path);
          if(globalDebug.includes("exports")) console.log("       Loaded admin module "+ref[i].name)
          count++;
        }
        console.log("     Loaded "+count+" admin modules.");
        return commands;
    }
  }catch(err){
    console.log("     Refresh error,\n"+err)
    return undefined;
  }
}
