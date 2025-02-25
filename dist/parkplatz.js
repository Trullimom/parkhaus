import { Car } from "./car";
var Parkplatz = /** @class */ (function () {
    function Parkplatz() {
        this.id = 0;
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
    Parkplatz.prototype.getCarInfo = function (kz, m, z) {
        this.car = new Car(kz, m, z);
    };
    Parkplatz.idCount = 1;
    return Parkplatz;
}());
export { Parkplatz };
//# sourceMappingURL=parkplatz.js.map