const fs = require("fs");
var ref = JSON.parse(fs.readFileSync('./util/ref.json', 'utf8'));
var reqSettings = JSON.parse(fs.readFileSync('./settings-required.json', 'utf8'));
var globalDebug = reqSettings.debug;

try{
  var count = 0;
  for(var i = 0; i < ref.length; i++){
    var pushModule = require(ref[i].path);
    module.exports[ref[i].name] = pushModule;
    if(globalDebug.includes("exports")) console.log("  Loaded util module "+ref[i].name)
    count++;
  }
  console.log("Loaded "+count+" util modules.");
}catch(err){
  console.log(err);
}
