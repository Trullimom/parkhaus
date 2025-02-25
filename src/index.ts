
let myprompt = require("prompt-sync")({ sigint: true });

type MultiTypeArray = (number | string | string | string)[][];
let platzStatus: MultiTypeArray = new Array(11);
platzStatus[0] = [0, "Einfahrt", "", ""];
platzStatus[11] = [11, "Ausfahrt", "", ""];
for (let i = 1; i <= 10; i++) {
  platzStatus[i] = [i, "frei", "-", "-"];
} 

type MultiTypeArray1 = (number | string | Date)[][];
let einfahrtArray: MultiTypeArray1 = new Array(250);
let ausfahrtArray: MultiTypeArray1 = new Array(250);
for(let i = 1 ; i <= 250; i++){
  einfahrtArray[i] = [i, "", ""];
  ausfahrtArray[i] = [i, "", ""];
}


let kennZeichen: string;
let uhrzeit: string;
let eingeparkterPlatz: number = 0;

let heute: Date = new Date(Date.now());
let ausfahrtZeit: string = `${heute.getDate()}.${heute.getMonth()+1}.${heute.getFullYear()} ${heute.getTime()}`;
console.log(ausfahrtZeit);
let einfahrtZeit: Date;

while (true) {
  console.log(`Einfahrtlist:
    ${getEinfahrtList()}`);
  console.log(`Ausfahrtlist:
    ${getAusfahrtList()}`);
  console.log(`Parkhausstatus: 
    ${getStatistik()}`);

  console.log(`Einfahrt oder Ausfahrt? 
    1. Einfahrt
    2. Ausfahrt
    `);
  let einOderAus: string = myprompt();

  if(einOderAus === "admin"){
    let menu = myprompt(`
      Wählen Sie aus:
      1. Parkhaus Statistik ansehen
      2. 
      `); 
  }

  if (einOderAus === "1") {
    kennZeichen = myprompt("Gib Ihr Kennzeichen ein: ");
    uhrzeit = myprompt("Gib die Uhrzeit ein (in 00:00 format): ");
    einparken(kennZeichen, uhrzeit);
    console.log(
      `Ihr Auto wurde um ${getTimeFormat(
        uhrzeit
      )} in Parkplatznummer ${eingeparkterPlatz} geparkt.`
    );
    console.log(`Parkhausstatus: 
        ${getStatistik()}`);
  } else if (einOderAus === "2") {
    console.log(`Gib Parkplatznummer oder Kennzeichen ein: 
        1.Parkplatznummer
        2.Kennzeichen`);
    let nummerOderKenn = myprompt();
    if (nummerOderKenn === "1") {   //TODO ausfahrtArray (beides kz, pn akzeptieren lassen)
      let num = myprompt("Gib Parkplatznummer ein: ");
      ausparkenPlatzNummer(num);
      console.log(`Parkhausstatus: 
        ${getStatistik()}`);
    } else if (nummerOderKenn === "2") {
      let num = myprompt("Gib Kennzeichen ein: ");
      ausparkenKennzeichen(num);
      console.log(`Parkhausstatus: 
        ${getStatistik()}`);
    } else {
      console.log("Ungültigeauswahl");
    }
  } else {
    console.log("Falsche Eingabe");
  }
}

function reset(){
  for(let i = 0 ; i < platzStatus.length; i++){
    platzStatus[i][1] = "frei";
    platzStatus[i][2] = "-";
    platzStatus[i][3] = "-";
  }
}


function ausparkenPlatzNummer(pn: string) {
  for (let i = 1; i < platzStatus.length; i++) {
    if (platzStatus[i][0] === pn) {
      platzStatus[i][1] = "frei";
      platzStatus[i][2] = "-";
      platzStatus[i][3] = "-";
      
      ausfahrtArray[i][2] = ausfahrtZeit;
      break;
    } else {
      console.log("Ungültige Platznummer");
    }
  }
}

function ausparkenKennzeichen(kz: string) {
  for (let i = 1; i < platzStatus.length; i++) {
    if (platzStatus[i][2] === kz) {
      platzStatus[i][1] = "frei";
      platzStatus[i][2] = "-";
      platzStatus[i][3] = "-s";
      ausfahrtArray[i][1] = kz;
      ausfahrtArray[i][2] = ausfahrtZeit;
      break;
    } else {
      console.log("Ungültiges Kennzeichen");
    }
  }
}

function einparken(kz: string, z: string) {
  for (let i = 0; i < platzStatus.length; i++) {
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
  let result: string = "";
  platzStatus.forEach(
    (platz) =>
      (result += `[${platz}]
        `)
  );
  return result;
}

function getTimeFormat(zeit: string) {
  // let datum = new Date("2025-02-20 15:14:00")
  einfahrtZeit = new Date(
    `${heute.getFullYear()}-${heute.getMonth()}-${heute.getDate()} ${zeit}:00`
  );
  return einfahrtZeit;
}


function getEinfahrtList(){
  let result: string = "";
  einfahrtArray.forEach(
    (einfahrt) => {
      if(einfahrt[2] !== ""){
        (result += `
          [${einfahrt}]
          `)
      }else{
        return;
      }    
    }      
  );
  return result;
}

function getAusfahrtList(){
  let result: string = "";
  ausfahrtArray.forEach(
    (ausfahrt) => {
      if(ausfahrt[2] !== ""){
        (result += `
          [${ausfahrt}]
          `)
      }else{
        return;
      }    
    }      
  );
  return result;
}



