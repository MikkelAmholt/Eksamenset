var number = 0; // Antal personer valgt
var time = "00:00"; // Valgt tidspunkt

function tjekPers(antal) {
    number = antal;
    document.getElementById("antalpersoner").innerHTML = number;
}

function tjektid(tid) {
    time = tid;
    document.getElementById("tidspukt").innerHTML = time;
}

function valg() {
    if (number != 0 && time != "00:00") { 
        window.location.href="/bookbord/vælgbord.html";
    } else {
        alert("Vælg venligst antal personer og tidspunkt");
    }
} 
