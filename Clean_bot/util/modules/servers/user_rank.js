
module.exports = function(allusers, server){
  var users = allusers[server.id];
  var list = [];
  var i = 0;
  for(user in users){
    list[i] = users[user];
    i++;
  }
  list = insertionSort(list);
  for(var i = 0; i < list.length; i++){
    users[list[i].id].rank = i+1;
  }
  allusers[server.id] = users;
  return allusers;
}

function insertionSort(data){
  var sorted = 0;
  var newList = [];
  while(sorted < data.length){
    var biggest = sorted;
    for(var i = sorted; i < data.length; i++){
      if(data[i].totalexp > data[biggest].totalexp){
        biggest = i;
      }
    }
    var temp = data[sorted];
    data[sorted] = data[biggest];
    data[biggest] = temp;
    sorted++;
  }
  return data;
}