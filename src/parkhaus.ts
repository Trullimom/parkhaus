import { Parkplatz } from "./parkplatz";

export class Parkhaus {
    private name: string = "";
    floors: number;
    parkplatzArr: Parkplatz[] = new Array(250);
    

    constructor(n: string, f: number = 5){
        this.name = n;
        this.floors = f;
        for(let i = 0 ; i < this.parkplatzArr.length; i++){
            this.parkplatzArr[i] = new Parkplatz();
        }
    }

    getName(): string {
        return this.name;
    }

    setParkPlatz(): void {
        for(let i = 0 ; i < 250; i++){
            let tempParkplatz = new Parkplatz();
            this.parkplatzArr[i] = tempParkplatz;
        }
    }

}