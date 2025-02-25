import { Parkhaus } from "./parkhaus";
import { kennzeichenArray, autoModels } from "./rndKennzeichen";
import { Car } from "./car";
import { Parkplatz } from "./parkplatz";

var myprompt = require("prompt-sync")();

const parkhaus1 = new Parkhaus("Qpark", 5);

let tempCar: Car;
let carArray: Car[] = new Array(kennzeichenArray.length);
let today: Date = new Date;
//console.log('new Date ohne runden klammern', today);
let fahrtZeit: Date;

// for (let i = 0; i < kennzeichenArray.length; i++) {
//   tempCar = new Car(kennzeichenArray[i], autoModels[i]);
//   carArray[i] = tempCar;
// }

let rndCar = carArray[Math.floor(Math.random() * carArray.length)];

type MultiTypeArray1 = (string | Date)[][];
let einfahrtArray: MultiTypeArray1 = new Array();
let ausfahrtArray: MultiTypeArray1 = new Array();

let schleife: boolean = true;
while (schleife) {
  console.log(`Bitte Auswählen:
      1. Einfahrt
      2. Ausfahrt
      3. Parkhaus Statistik ansehen
      4. Einfahrt Liste ansehen
      5. Ausfahrt Liste ansehen
      6. Reset Parkhaus
      7. Beenden
      `);
  let auswahl: string = myprompt();

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

function einfahren(): void {
  let kennzeichen = myprompt("Gib Kennzeichen ein: ");
  let model = myprompt("Gib model von Ihrem Auto ein:");
  let zeit = myprompt("Gib die Uhrzeit ein (in 00:00 format): ");
  einparken(kennzeichen, model, zeit);
}

function einparken(kz: string, m: string, z: string): void {
  for (let i = 0; i < parkhaus1.parkplatzArr.length; i++) {
    let platz: Parkplatz = parkhaus1.parkplatzArr[i];
    if (platz.status === "frei") {
      platz.getCarInfo(kz, m, z);
      platz.isFree = false;

      console.log(platz);

      einfahrtArray.push([kz, z]);

      console.log(`
              Einpark Information: 
              Autokennzeichen: ${kz}
              Einfahrtzeit: ${getTimeFormat(z)}
              Etage: ${platz.whichFloor}
              Parkplatznummer: ${platz.id}`);
      break;
    }
  }
}

function getEinfahrtList(): void {
  console.log("EinfahrtListe: ");
  let result: string = "";
  einfahrtArray.forEach((einfahrt) => {
    if (einfahrt[0] !== "") {
      result += `
            [${einfahrt}]
            `;
    } else {
      return;
    }
  });
  console.log(result);
}

function getAusfahrtList(): void {
  console.log("AusfahrtListe: ");
  let result: string = "";
  ausfahrtArray.forEach((ausfahrt) => {
    if (ausfahrt[0] !== "") {
      result += `
            [${ausfahrt}]
            `;
    } else {
      return;
    }
  });
  console.log(result);
}
function ausfahren(): void {
  console.log(`
      Ausfahren mit 
      1. Kennzeichen
      2. Parkplatznummer
      `);
  let auswahl = myprompt();
  if (auswahl === "1") {
    let kz = myprompt("Gib Ihr Kennzeichen ein: ");
    ausparkenMitKZ(kz);
  } else if (auswahl === "2") {
    let pn = parseInt(myprompt("Gib Parkplatznummer ein: "));
    ausparkenMitPN(pn);
  }
}

function ausparkenMitKZ(kz: string): void {
  for (let i = 0; i < parkhaus1.parkplatzArr.length; i++) {
    let platz: Parkplatz = parkhaus1.parkplatzArr[i];
    if (platz.car?.kennzeichen === kz) {
      let kennz = platz.car?.kennzeichen;
      ausfahrtArray.push([kennz, today]);
      platz.car = undefined;
      platz.isFree = true;

      console.log(ausfahrtArray);
      break;
    }
  }
}

function ausparkenMitPN(pn: number): void {
  let platz: Parkplatz = parkhaus1.parkplatzArr[pn - 1];
  if(platz.car){
    let kennz = platz.car.kennzeichen;
    ausfahrtArray.push([kennz, today]);
    platz.car = undefined;
    platz.isFree = true;
  }
}

function getTimeFormat(zeit: string): Date {
  // let datum = new Date("2025-02-20 15:14:00")
  fahrtZeit = new Date(
    `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${zeit}:00`
  );
  return fahrtZeit;
}

function getStatistik(): void {
  console.log(parkhaus1.parkplatzArr);
}
function reset(): void {
  parkhaus1.parkplatzArr.forEach((platz) => {
    platz.isFree = true;
    platz.car = undefined;
  });
  console.log("Parkhaus ist jetzt leer");
}
