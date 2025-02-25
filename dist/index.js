"use strict";
var myprompt = require("prompt-sync")({ sigint: true });
var platzStatus = new Array(11);
platzStatus[0] = [0, "Einfahrt", "", ""];
platzStatus[11] = [11, "Ausfahrt", "", ""];
for (var i = 1; i <= 10; i++) {
    platzStatus[i] = [i, "frei", "-", "-"];
}
var einfahrtArray = new Array(250);
var ausfahrtArray = new Array(250);
for (var i = 1; i <= 250; i++) {
    einfahrtArray[i] = [i, "", ""];
    ausfahrtArray[i] = [i, "", ""];
}
var kennZeichen;
var uhrzeit;
var eingeparkterPlatz = 0;
var heute = new Date(Date.now());
var ausfahrtZeit = "".concat(heute.getDate(), ".").concat(heute.getMonth() + 1, ".").concat(heute.getFullYear(), " ").concat(heute.getTime());
console.log(ausfahrtZeit);
var einfahrtZeit;
while (true) {
    console.log("Einfahrtlist:\n    ".concat(getEinfahrtList()));
    console.log("Ausfahrtlist:\n    ".concat(getAusfahrtList()));
    console.log("Parkhausstatus: \n    ".concat(getStatistik()));
    console.log("Einfahrt oder Ausfahrt? \n    1. Einfahrt\n    2. Ausfahrt\n    ");
    var einOderAus = myprompt();
    if (einOderAus === "admin") {
        var menu = myprompt("\n      W\u00E4hlen Sie aus:\n      1. Parkhaus Statistik ansehen\n      2. \n      ");
    }
    if (einOderAus === "1") {
        kennZeichen = myprompt("Gib Ihr Kennzeichen ein: ");
        uhrzeit = myprompt("Gib die Uhrzeit ein (in 00:00 format): ");
        einparken(kennZeichen, uhrzeit);
        console.log("Ihr Auto wurde um ".concat(getTimeFormat(uhrzeit), " in Parkplatznummer ").concat(eingeparkterPlatz, " geparkt."));
        console.log("Parkhausstatus: \n        ".concat(getStatistik()));
    }
    else if (einOderAus === "2") {
        console.log("Gib Parkplatznummer oder Kennzeichen ein: \n        1.Parkplatznummer\n        2.Kennzeichen");
        var nummerOderKenn = myprompt();
        if (nummerOderKenn === "1") { //TODO ausfahrtArray (beides kz, pn akzeptieren lassen)
            var num = myprompt("Gib Parkplatznummer ein: ");
            ausparkenPlatzNummer(num);
            console.log("Parkhausstatus: \n        ".concat(getStatistik()));
        }
        else if (nummerOderKenn === "2") {
            var num = myprompt("Gib Kennzeichen ein: ");
            ausparkenKennzeichen(num);
            console.log("Parkhausstatus: \n        ".concat(getStatistik()));
        }
        else {
            console.log("Ungültigeauswahl");
        }
    }
    else {
        console.log("Falsche Eingabe");
    }
}
function reset() {
    for (var i = 0; i < platzStatus.length; i++) {
        platzStatus[i][1] = "frei";
        platzStatus[i][2] = "-";
        platzStatus[i][3] = "-";
    }
}
function ausparkenPlatzNummer(pn) {
    for (var i = 1; i < platzStatus.length; i++) {
        if (platzStatus[i][0] === pn) {
            platzStatus[i][1] = "frei";
            platzStatus[i][2] = "-";
            platzStatus[i][3] = "-";
            ausfahrtArray[i][2] = ausfahrtZeit;
            break;
        }
        else {
            console.log("Ungültige Platznummer");
        }
    }
}
function ausparkenKennzeichen(kz) {
    for (var i = 1; i < platzStatus.length; i++) {
        if (platzStatus[i][2] === kz) {
            platzStatus[i][1] = "frei";
            platzStatus[i][2] = "-";
            platzStatus[i][3] = "-s";
            ausfahrtArray[i][1] = kz;
            ausfahrtArray[i][2] = ausfahrtZeit;
            break;
        }
        else {
            console.log("Ungültiges Kennzeichen");
        }
    }
}
function einparken(kz, z) {
    for (var i = 0; i < platzStatus.length; i++) {
        if (platzStatus[i][1] === "frei") {
            platzStatus[i][1] = "besetzt";
            platzStatus[i][2] = kz;
            platzStatus[i][3] = z;
            eingeparkterPlatz = i + 1;
            einfahrtArray[i][1] = kz;
            einfahrtArray[i][2] = z;
            break;
        }
    }
}
function getStatistik() {
    var result = "";
    platzStatus.forEach(function (platz) {
        return (result += "[".concat(platz, "]\n        "));
    });
    return result;
}
function getTimeFormat(zeit) {
    // let datum = new Date("2025-02-20 15:14:00")
    einfahrtZeit = new Date("".concat(heute.getFullYear(), "-").concat(heute.getMonth(), "-").concat(heute.getDate(), " ").concat(zeit, ":00"));
    return einfahrtZeit;
}
function getEinfahrtList() {
    var result = "";
    einfahrtArray.forEach(function (einfahrt) {
        if (einfahrt[2] !== "") {
            (result += "\n          [".concat(einfahrt, "]\n          "));
        }
        else {
            return;
        }
    });
    return result;
}
function getAusfahrtList() {
    var result = "";
    ausfahrtArray.forEach(function (ausfahrt) {
        if (ausfahrt[2] !== "") {
            (result += "\n          [".concat(ausfahrt, "]\n          "));
        }
        else {
            return;
        }
    });
    return result;
}
//# sourceMappingURL=index.js.map