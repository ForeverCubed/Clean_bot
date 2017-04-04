// this file here creates all the modules for utils.
// gets all paths and names from ref.

const fs = require("fs");
var ref = JSON.parse(fs.readFileSync('./util/ref.json', 'utf8'));
//module.exports.calls = {};
try{
  for(var i = 0; i < ref.length; i++){
    module.exports[ref[i].name] = require(ref[i].path);
    //module.exports.calls[ref[i].call] = ref[i].name;
  } // creates util modules
}catch(err){
  console.log(err);
}
