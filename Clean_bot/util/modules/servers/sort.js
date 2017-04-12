
var list = [1,2,3,4,5,6];

module.exports = function(){
  

}

function Sorter(list){
  this.data = [list];

}

function pair(a, b){
  this.a = a;
  this.b = b;

  this.compare = function(a, b){ // returns the larger of the two ints.
    if(a > b) return a;
    return b;
  }
}
