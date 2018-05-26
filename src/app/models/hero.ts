export class Hero {
    public Heroe_Id: number;
    public Name: string;
    public Points: number;

    constructor(name: string, points: number) {
        this.Heroe_Id = 0;
        this.Name = name;
        this.Points = points;
    }
}