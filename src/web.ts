import { table } from "console";

class Parkplatz {
    private static idCount: number = 1;
    id: number = 0;
    //car?: Car;
    whichFloor: number = 0;
    isFree: boolean = true;
    status: string = "frei";
  
    constructor() {
      this.id = Parkplatz.idCount;
      Parkplatz.idCount++;
  
      if (this.id > 0 && this.id <= 50) {
        this.whichFloor = 0;
      } else if (this.id > 51 && this.id <= 100) {
        this.whichFloor = 1;
      } else if (this.id > 100 && this.id <= 150) {
        this.whichFloor = 2;
      } else if (this.id > 150 && this.id <= 200) {
        this.whichFloor = 3;
      } else {
        this.whichFloor = 4;
      }
  
      if (!this.isFree) {
        this.status = "besetzt";
      }
    }
}

// interface IParkhaus{
//     name: string,
//     floors: number,
//     parkplatzArr: Parkplatz[]

// }

// let parkplatzArray: Parkplatz[] = new Array(250);
// for(let i = 0 ; i < parkplatzArray.length; i++){
//     parkplatzArray[i] = new Parkplatz();
// }

// const parkhaus2: IParkhaus = {
//     name : "qpark",
//     floors : 5,
//     parkplatzArr : parkplatzArray
// }


class Parkhaus {
    name: string = "";
    floors: number;
    parkplatzArr: Parkplatz[] = new Array();
    
    constructor(n: string, f: number = 5){
        this.name = n;
        this.floors = f;

        for(let i = 0 ; i < 250; i++){
            this.parkplatzArr.push(new Parkplatz());
        }
    }
}

const parkhaus1 = new Parkhaus("Qpark", 5);
const parkplatzArray = parkhaus1.parkplatzArr;
const parkhausName = document.getElementById("parkhaus") as HTMLElement;
parkhausName.innerHTML += `${parkhaus1.name}`;
let container = document.getElementById('container') as HTMLElement;

let tableData = document.getElementById("tableData") as HTMLElement;

const statistikBtn = document.getElementById('stat') as HTMLElement;
statistikBtn.addEventListener('click', getStatistik);

getStatistik();

function getStatistik(): void{

  for(let i = 0 ; i < parkplatzArray.length; i++){
    
    tableData.innerHTML += ` 
                    <tr>                
                        <td>${parkplatzArray[i].whichFloor}</td>
                        <td>${parkplatzArray[i].id}</td>
                        <td>${parkplatzArray[i].status}</td>
                        <td>autoinfo</td>  
                      </tr>              
                    `;
    }
    container.innerHTML += tableData.innerHTML;
}

// const homeBtn = document.getElementById('home') as HTMLElement;
// homeBtn.addEventListener('click', getStatistik);

const einfahrtBtn = document.getElementById("ein") as HTMLElement;
einfahrtBtn.addEventListener("click", einfahren);


function einfahren(): void {
  container.innerHTML = `
    <form id="carInfoForm">
        <label>Gib Kennzeichen ein: </label>
        <input type="text" id = "kennzeichen" value="" />
        <label>Gib Model ein: </label>
        <input type="text" id = "model" value="" />
        <label>Gib Uhrzeit ein: </label>
        <input id = "einfahrtZeit" value="" />
        <button id="submitBtn" type="submit">senden</button>
    </form>
  `;

  let loginForm = document.getElementById('carInfoForm') as HTMLElement;
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let kennzeichen = document.getElementById('kennzeichen');
    let model = document.getElementById('model');
    let einfahrtZeit = document.getElementById('einfahrtZeit');
  
    if(kennzeichen === null || einfahrtZeit === null){
        alert("Bitte Ihre Infos eingeben!");
    }else{
        einparken1(kennzeichen, model, einfahrtZeit);
    }
  });
 
}
let platzeingeparked: Parkplatz;


function einparken1(kz:string, m: string, z:string): void {
    for (let i = 0; i < parkhaus1.parkplatzArr.length; i++) {
            let platz: Parkplatz = parkhaus1.parkplatzArr[i];
            if (platz.status === "frei") {
              //platz.getCarInfo(kz, m, z);
              platz.isFree = false;
              platzeingeparked = platz;
            }
        }
    
    container.innerHTML = `
        <h3>Einfahrt Daten: </h3>
        <hr>    
        <p>Kennzeichen: ${kz.value}</p>
        <p>Model: ${model.value}</p>
        <p>Einfahrtzeit: ${z.value}</p>
        <p>Etage: ${platzeingeparked.whichFloor}</p>
        <p>Parkplatznummer: ${platzeingeparked.id}</p>        
    `;
}
