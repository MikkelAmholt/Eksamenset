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
        // Send antal personer via URL til vælgbord.html
    } else {
        alert("Vælg venligst antal personer og tidspunkt");
    }
} 
