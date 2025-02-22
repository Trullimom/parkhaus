"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parkhaus = void 0;
var parkplatz_1 = require("./parkplatz");
var Parkhaus = /** @class */ (function () {
    function Parkhaus(n, f) {
        if (f === void 0) { f = 5; }
        this.name = "";
        this.parkplatzArr = new Array(250);
        this.name = n;
        this.floors = f;
        for (var i = 0; i < this.parkplatzArr.length; i++) {
            this.parkplatzArr[i] = new parkplatz_1.Parkplatz();
        }
    }
    Parkhaus.prototype.getName = function () {
        return this.name;
    };
    Parkhaus.prototype.setParkPlatz = function () {
        for (var i = 0; i < 250; i++) {
            var tempParkplatz = new parkplatz_1.Parkplatz();
            this.parkplatzArr[i] = tempParkplatz;
        }
    };
    return Parkhaus;
}());
exports.Parkhaus = Parkhaus;
//# sourceMappingURL=parkhaus.js.map