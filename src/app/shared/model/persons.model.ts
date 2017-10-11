import { Label } from './labels.model';

export class Person {
  public id: string;
  public firstname: string;
  public lastname: string;
  public description: string;
  public imagePath: string;
  public labels: Label[];

  constructor(id: string, firstname: string, lastname: string, desc: string, imagePath: string, labels: Label[]) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = desc;
    this.imagePath = imagePath;
    this.labels = labels;
  }
}
