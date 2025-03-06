function myFunction() {
}


var number = "0";
var time = "00:00";

function tjekPers(antal){
   
   number = antal;
   document.getElementById("antalpersoner").innerHTML = number;
   
}
function test(){
    alert("You chose " + number + " at " + time);
}    
