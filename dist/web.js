var Parkplatz = /** @class */ (function () {
    function Parkplatz() {
        this.id = 0;
        //car?: Car;
        this.whichFloor = 0;
        this.isFree = true;
        this.status = "frei";
        this.id = Parkplatz.idCount;
        Parkplatz.idCount++;
        if (this.id > 0 && this.id <= 50) {
            this.whichFloor = 0;
        }
        else if (this.id > 51 && this.id <= 100) {
            this.whichFloor = 1;
        }
        else if (this.id > 100 && this.id <= 150) {
            this.whichFloor = 2;
        }
        else if (this.id > 150 && this.id <= 200) {
            this.whichFloor = 3;
        }
        else {
            this.whichFloor = 4;
        }
        if (!this.isFree) {
            this.status = "besetzt";
        }
    }
    Parkplatz.idCount = 1;
    return Parkplatz;
}());
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
var Parkhaus = /** @class */ (function () {
    function Parkhaus(n, f) {
        if (f === void 0) { f = 5; }
        this.name = "";
        this.parkplatzArr = new Array();
        this.name = n;
        this.floors = f;
        for (var i = 0; i < 250; i++) {
            this.parkplatzArr.push(new Parkplatz());
        }
    }
    return Parkhaus;
}());
var parkhaus1 = new Parkhaus("Qpark", 5);
var parkplatzArray = parkhaus1.parkplatzArr;
var parkhausName = document.getElementById("parkhaus");
parkhausName.innerHTML += "".concat(parkhaus1.name);
var container = document.getElementById('container');
var tableData = document.getElementById("tableData");
var statistikBtn = document.getElementById('stat');
statistikBtn.addEventListener('click', getStatistik);
getStatistik();
function getStatistik() {
    for (var i = 0; i < parkplatzArray.length; i++) {
        tableData.innerHTML += " \n                    <tr>                \n                        <td>".concat(parkplatzArray[i].whichFloor, "</td>\n                        <td>").concat(parkplatzArray[i].id, "</td>\n                        <td>").concat(parkplatzArray[i].status, "</td>\n                        <td>autoinfo</td>  \n                      </tr>              \n                    ");
    }
    container.innerHTML += tableData.innerHTML;
}
// const homeBtn = document.getElementById('home') as HTMLElement;
// homeBtn.addEventListener('click', getStatistik);
var einfahrtBtn = document.getElementById("ein");
einfahrtBtn.addEventListener("click", einfahren);
function einfahren() {
    container.innerHTML = "\n    <form id=\"carInfoForm\">\n        <label>Gib Kennzeichen ein: </label>\n        <input type=\"text\" id = \"kennzeichen\" value=\"\" />\n        <label>Gib Model ein: </label>\n        <input type=\"text\" id = \"model\" value=\"\" />\n        <label>Gib Uhrzeit ein: </label>\n        <input id = \"einfahrtZeit\" value=\"\" />\n        <button id=\"submitBtn\" type=\"submit\">senden</button>\n    </form>\n  ";
    var loginForm = document.getElementById('carInfoForm');
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var kennzeichen = document.getElementById('kennzeichen');
        var model = document.getElementById('model');
        var einfahrtZeit = document.getElementById('einfahrtZeit');
        if (kennzeichen === null || einfahrtZeit === null) {
            alert("Bitte Ihre Infos eingeben!");
        }
        else {
            einparken1(kennzeichen, model, einfahrtZeit);
        }
    });
}
var platzeingeparked;
function einparken1(kz, m, z) {
    for (var i = 0; i < parkhaus1.parkplatzArr.length; i++) {
        var platz = parkhaus1.parkplatzArr[i];
        if (platz.status === "frei") {
            //platz.getCarInfo(kz, m, z);
            platz.isFree = false;
            platzeingeparked = platz;
        }
    }
    container.innerHTML = "\n        <h3>Einfahrt Daten: </h3>\n        <hr>    \n        <p>Kennzeichen: ".concat(kz.value, "</p>\n        <p>Model: ").concat(model.value, "</p>\n        <p>Einfahrtzeit: ").concat(z.value, "</p>\n        <p>Etage: ").concat(platzeingeparked.whichFloor, "</p>\n        <p>Parkplatznummer: ").concat(platzeingeparked.id, "</p>        \n    ");
}
//export {};
//# sourceMappingURL=web.js.map