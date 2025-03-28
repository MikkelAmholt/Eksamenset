// deno-lint-ignore-file
var number = 0; // Antal personer valgt
var time = "00:00"; // Valgt tidspunkt

function tjekPers(antal) {
  number = antal;
  document.getElementById("antalpersoner").innerHTML = number;
  if (number != 0 && time != "00:00") {
    visknap(number);
  } else {
  }
}

function tjektid(tid) {
  time = tid;
  document.getElementById("tidspukt").innerHTML = time;
  if (number != 0 && time != "00:00") {
    visknap(number);
  } else {
  }
}

function valg() {
  if (number != 0 && time != "00:00") {
    localStorage.setItem("number", number);
    /*window.location.href="/bookbord/vælgbord.html";*/
  } else {
    console.log("Vælg venligst antal personer og tidspunkt");
  }
}

function visknap(number) {
  skjulknap();
  /*console.log("virker stadig");*/

  if ((number == 1) || (number == 2)) {
    document.getElementById("k1").classList.remove("hidden");
    document.getElementById("k2").classList.remove("hidden");
    document.getElementById("k3").classList.remove("hidden");
    document.getElementById("k4").classList.remove("hidden");
  } else if (number == 3 || number == 4) {
    document.getElementById("k5").classList.remove("hidden");
    document.getElementById("k6").classList.remove("hidden");
    document.getElementById("k7").classList.remove("hidden");
    document.getElementById("k8").classList.remove("hidden");
  } else if (number == 5 || number == 6) {
    document.getElementById("k9").classList.remove("hidden");
    document.getElementById("k10").classList.remove("hidden");
  }
}

function skjulknap() {
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
    console.log("den virker");
    const navn = document.getElementById("navn").value;
    const telefon = document.getElementById("telefon").value;
    const tid = time;
    const antal = number;
    const bordId = localStorage.getItem("valgtBord");
  
    const formData = new FormData();
    formData.set("navn", navn);
    formData.set("telefon", telefon);
    formData.set("tid", tid);
    formData.set("antal", antal);
    formData.set("bordId", bordId);
  
    console.log("Sending data:", Object.fromEntries(formData));
  
    fetch("/api/booking", {
      method: "POST",
      body: formData,
    })
    window.location.href = "/done"


}

function slet(){
    console.log("den virker");

    const formData = new FormData();
    const bordId = localStorage.getItem("valgtBord");
    const tid = time;

    formData.set("bordId", bordId);
    formData.set("tid", tid);

    console.log("Sending data:", Object.fromEntries(formData));

    fetch("/api/delete_booking", {
        method: "POST",
        body: formData,
      })
    window.location.href = "/done"
}
