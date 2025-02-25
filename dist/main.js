import { Parkhaus } from "./parkhaus";
import { kennzeichenArray } from "./rndKennzeichen";
var myprompt = require("prompt-sync")();
var parkhaus1 = new Parkhaus("Qpark", 5);
var tempCar;
var carArray = new Array(kennzeichenArray.length);
var today = new Date;
//console.log('new Date ohne runden klammern', today);
var fahrtZeit;
// for (let i = 0; i < kennzeichenArray.length; i++) {
//   tempCar = new Car(kennzeichenArray[i], autoModels[i]);
//   carArray[i] = tempCar;
// }
var rndCar = carArray[Math.floor(Math.random() * carArray.length)];
var einfahrtArray = new Array();
var ausfahrtArray = new Array();
var schleife = true;
while (schleife) {
    console.log("Bitte Ausw\u00E4hlen:\n      1. Einfahrt\n      2. Ausfahrt\n      3. Parkhaus Statistik ansehen\n      4. Einfahrt Liste ansehen\n      5. Ausfahrt Liste ansehen\n      6. Reset Parkhaus\n      7. Beenden\n      ");
    var auswahl = myprompt();
    switch (auswahl) {
        case "1":
            einfahren();
            break;
        case "2":
            ausfahren();
            break;
        case "3":
            getStatistik();
            break;
        case "4":
            getEinfahrtList();
            break;
        case "5":
            getAusfahrtList();
            break;
        case "6":
            reset();
            break;
        case "7":
            schleife = false;
            break;
    }
}
function einfahren() {
    var kennzeichen = myprompt("Gib Kennzeichen ein: ");
    var model = myprompt("Gib model von Ihrem Auto ein:");
    var zeit = myprompt("Gib die Uhrzeit ein (in 00:00 format): ");
    einparken(kennzeichen, model, zeit);
}
function einparken(kz, m, z) {
    for (var i = 0; i < parkhaus1.parkplatzArr.length; i++) {
        var platz = parkhaus1.parkplatzArr[i];
        if (platz.status === "frei") {
            platz.getCarInfo(kz, m, z);
            platz.isFree = false;
            console.log(platz);
            einfahrtArray.push([kz, z]);
            console.log("\n              Einpark Information: \n              Autokennzeichen: ".concat(kz, "\n              Einfahrtzeit: ").concat(getTimeFormat(z), "\n              Etage: ").concat(platz.whichFloor, "\n              Parkplatznummer: ").concat(platz.id));
            break;
        }
    }
}
function getEinfahrtList() {
    console.log("EinfahrtListe: ");
    var result = "";
    einfahrtArray.forEach(function (einfahrt) {
        if (einfahrt[0] !== "") {
            result += "\n            [".concat(einfahrt, "]\n            ");
        }
        else {
            return;
        }
    });
    console.log(result);
}
function getAusfahrtList() {
    console.log("AusfahrtListe: ");
    var result = "";
    ausfahrtArray.forEach(function (ausfahrt) {
        if (ausfahrt[0] !== "") {
            result += "\n            [".concat(ausfahrt, "]\n            ");
        }
        else {
            return;
        }
    });
    console.log(result);
}
function ausfahren() {
    console.log("\n      Ausfahren mit \n      1. Kennzeichen\n      2. Parkplatznummer\n      ");
    var auswahl = myprompt();
    if (auswahl === "1") {
        var kz = myprompt("Gib Ihr Kennzeichen ein: ");
        ausparkenMitKZ(kz);
    }
    else if (auswahl === "2") {
        var pn = parseInt(myprompt("Gib Parkplatznummer ein: "));
        ausparkenMitPN(pn);
    }
}
function ausparkenMitKZ(kz) {
    var _a, _b;
    for (var i = 0; i < parkhaus1.parkplatzArr.length; i++) {
        var platz = parkhaus1.parkplatzArr[i];
        if (((_a = platz.car) === null || _a === void 0 ? void 0 : _a.kennzeichen) === kz) {
            var kennz = (_b = platz.car) === null || _b === void 0 ? void 0 : _b.kennzeichen;
            ausfahrtArray.push([kennz, today]);
            platz.car = undefined;
            platz.isFree = true;
            console.log(ausfahrtArray);
            break;
        }
    }
}
function ausparkenMitPN(pn) {
    var platz = parkhaus1.parkplatzArr[pn - 1];
    if (platz.car) {
        var kennz = platz.car.kennzeichen;
        ausfahrtArray.push([kennz, today]);
        platz.car = undefined;
        platz.isFree = true;
    }
}
function getTimeFormat(zeit) {
    // let datum = new Date("2025-02-20 15:14:00")
    fahrtZeit = new Date("".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate(), " ").concat(zeit, ":00"));
    return fahrtZeit;
}
function getStatistik() {
    console.log(parkhaus1.parkplatzArr);
}
function reset() {
    parkhaus1.parkplatzArr.forEach(function (platz) {
        platz.isFree = true;
        platz.car = undefined;
    });
    console.log("Parkhaus ist jetzt leer");
}
//# sourceMappingURL=main.js.map