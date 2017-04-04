// this file here creates all the modules for commands.
// gets all paths and names from ref.

const fs = require("fs");
var ref = JSON.parse(fs.readFileSync('./Commands/ref.json', 'utf8'));
try{
  for(var i = 0; i < ref.length; i++){
    module.exports[ref[i].name] = require(ref[i].path);
  } // creates command modules
}catch(err){
  console.log(err);
}
