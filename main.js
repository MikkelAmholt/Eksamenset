var number = 0; // Antal personer valgt
var time = "00:00"; // Valgt tidspunkt

function tjekPers(antal) {
    number = antal;
    document.getElementById("antalpersoner").innerHTML = number;
    if (number != 0 && time != "00:00") { 
        visknap(number);
    }else{

    }
}

function tjektid(tid) {
    time = tid;
    document.getElementById("tidspukt").innerHTML = time;
    if (number != 0 && time != "00:00") { 
        visknap(number);
    }else{
        
    }
}

function valg() {
    
    if (number != 0 && time != "00:00") { 
        localStorage.setItem("number", number);
        /*window.location.href="/bookbord/vælgbord.html";*/

    } else {
        alert("Vælg venligst antal personer og tidspunkt");
    }
} 



function visknap(number){
    skjulknap();
    /*alert("virker stadig");*/

    if((number == 1) || (number ==2)
    ){
        document.getElementById("k1").classList.remove("hidden");
        document.getElementById("k2").classList.remove("hidden");
        document.getElementById("k3").classList.remove("hidden");
        document.getElementById("k4").classList.remove("hidden");
    
    } else if(number == 3 || number == 4){
        document.getElementById("k5").classList.remove("hidden");
        document.getElementById("k6").classList.remove("hidden");
        document.getElementById("k7").classList.remove("hidden");
        document.getElementById("k8").classList.remove("hidden");

    } else if(number == 5 || number ==6){
        document.getElementById("k9").classList.remove("hidden");
        document.getElementById("k10").classList.remove("hidden");
    }

}


function skjulknap(){
    document.getElementById("k1").classList.add("hidden");
    document.getElementById("k2").classList.add("hidden");
    document.getElementById("k3").classList.add("hidden");
    document.getElementById("k4").classList.add("hidden");
    document.getElementById("k5").classList.add("hidden");
    document.getElementById("k6").classList.add("hidden");
    document.getElementById("k7").classList.add("hidden");
    document.getElementById("k8").classList.add("hidden");
    document.getElementById("k9").classList.add("hidden");
    document.getElementById("k10").classList.add("hidden");
}

function valg() {
    alert("den virker");
    const navn = document.getElementById("navn").value;
    const telefon = document.getElementById("telefon").value;
    const bordId = localStorage.getItem("valgtBord");

    if (!number || time === "00:00" || !navn || !telefon || !bordId) {
        alert("Udfyld alle felter og vælg et bord.");
        return;
    }

    fetch("/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navn, telefon, bordId, tid: time })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Fejl:", error));
}

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("/bookbord/bord.JSON");
    const data = await response.json();
    const container = document.querySelector(".borde2, .borde4, .borde6");

    data.bord.forEach(bord => {
        let button = document.getElementById(`k${bord.id}`);
        if (button) {
            button.onclick = () => {
                localStorage.setItem("valgtBord", bord.id);
                alert(`Bord ${bord.id} valgt.`);
            };
        }
    });
});