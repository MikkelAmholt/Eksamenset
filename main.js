function myFunction() {
}

var number = "0";
var time = "00:00";

function tjekPers(antal){
   number = antal;
   document.getElementById("antalpersoner").innerHTML = number;
   
}
function tjektid(tid){
    time  = tid;
    document.getElementById("tidspukt").innerHTML = time;

}

function valg(){
    if(number != "0" && time != "00:00"){
        window.location.href="/bookbord/vælgbord.html";
    } else {
        alert("Pleace select party size and arrival time");
    }
}    
