"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(kz, m, z) {
        this.kennzeichen = "";
        this.model = "";
        this.ausfahrtZeit = null;
        this.kennzeichen = kz;
        this.model = m;
        this.einfahrtZeit = z;
    }
    Car.prototype.setEinfahrtZeit = function (ez) {
        this.einfahrtZeit = ez;
    };
    Car.prototype.setAusfarhtZeit = function (az) {
        this.ausfahrtZeit = az;
    };
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map