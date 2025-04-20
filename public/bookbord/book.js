// deno-lint-ignore-file
var number = 0; // Antal personer valgt
var time = "00:00"; // Valgt tidspunkt
var table = 0; // Bord ID valgt

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

function tjekbord(bord) {
  table = bord;
  document.getElementById("valgtbord").innerHTML = bordId;
}

function visknap(number) {
  skjulknap();
  /*console.log("virker stadig");*/

  if ((number == 1) || (number == 2)) {
    document.getElementById("1").classList.remove("hidden");
    document.getElementById("2").classList.remove("hidden");
    document.getElementById("3").classList.remove("hidden");
    document.getElementById("4").classList.remove("hidden");
  } else if (number == 3 || number == 4) {
    document.getElementById("5").classList.remove("hidden");
    document.getElementById("6").classList.remove("hidden");
    document.getElementById("7").classList.remove("hidden");
    document.getElementById("8").classList.remove("hidden");
  } else if (number == 5 || number == 6) {
    document.getElementById("9").classList.remove("hidden");
    document.getElementById("10").classList.remove("hidden");
  }
}

function skjulknap() {
  document.getElementById("1").classList.add("hidden");
  document.getElementById("2").classList.add("hidden");
  document.getElementById("3").classList.add("hidden");
  document.getElementById("4").classList.add("hidden");
  document.getElementById("5").classList.add("hidden");
  document.getElementById("6").classList.add("hidden");
  document.getElementById("7").classList.add("hidden");
  document.getElementById("8").classList.add("hidden");
  document.getElementById("9").classList.add("hidden");
  document.getElementById("10").classList.add("hidden");
}

function valg() {
    console.log("den virker");
    if (number != 0 && time != "00:00") {
    const navn = document.getElementById("navn").value;
    const telefon = document.getElementById("telefon").value;
    const tid = time;
    const antal = number;
    const bordId = table;
  
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
  } else {
    alert("Vælg venligst antal personer og tidspunkt");
  }
}

function slet(){
    console.log("den virker");
    if (number != 0 && time != "00:00") {

    const formData = new FormData();
    const bordId = table; 
    const tid = time;

    formData.set("bordId", bordId);
    formData.set("tid", tid);

    console.log("Sending data:", Object.fromEntries(formData));

    fetch("/api/delete_booking", {
        method: "POST",
        body: formData,
      })
    window.location.href = "/done"
    } else {
        alert("Vælg venligst antal personer og tidspunkt");
    }
}
