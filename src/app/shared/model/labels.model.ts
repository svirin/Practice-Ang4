export class Label {
  public id: string;
  public name: string;
  public color: string;
  public description: string;
  public imagePath: string;

  constructor(id: string, name: string, color: string, desc: string, imagePath: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
