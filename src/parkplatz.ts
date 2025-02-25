import { Car } from "./car";

export class Parkplatz {
  private static idCount: number = 1;
  id: number = 0;
  car?: Car;
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

  getCarInfo(kz: string, m: string, z: string): void {
    this.car = new Car(kz, m, z);
  }
  
}
