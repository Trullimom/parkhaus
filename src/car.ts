export class Car {
    kennzeichen: string = "";
    model: string = "";
    einfahrtZeit?: string;
    ausfahrtZeit: string | null = null;

    constructor(kz: string, m: string, z: string) {
        this.kennzeichen = kz;
        this.model = m;
        this.einfahrtZeit = z;
    }

    setEinfahrtZeit(ez: string): void {
        this.einfahrtZeit = ez;
    }

    setAusfarhtZeit(az: string): void {
        this.ausfahrtZeit = az;
    }

}