import { Injectable } from '@angular/core';
import { Person } from '../shared/model/persons.model';
import { Label } from '../shared/model/labels.model';
import { Subject } from "rxjs/Subject";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class PersonsService {

  listMode: string = 'list';
  selectedPersonId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  this.route.params.subscribe(
      (params: Params) => {
        this.selectedPersonId = params['id'];
      });
  }


  personsUpdated = new Subject<any>();
  personChanged = new Subject<Person>();
  personsChanged = new Subject<Person[]>();

  persons: Person[] =
  [
    new Person('1', 'Arik', 'Sharon', 'Test', 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Ariel_Sharon%2C_by_Jim_Wallace_%28Smithsonian_Institution%29.jpg',
      [
        new Label('1', 'Label', 'red', 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/US_Army_logo.svg/2000px-US_Army_logo.svg.png'),
        new Label('2', 'Label', 'green', 'test', 'http://incrent.com/isramun-org/wp-content/uploads/College-of-Management.png')
      ]),
    new Person('2', 'Itzhak', 'Rabin', 'Test', 'https://cdn.thinglink.me/api/image/852985415068549120/1240/10/scaletowidth',
      [
        new Label('1', 'Label', 'red', 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/US_Army_logo.svg/2000px-US_Army_logo.svg.png'),
        new Label('2', 'Label', 'green', 'test', 'http://incrent.com/isramun-org/wp-content/uploads/College-of-Management.png')
      ]),
    new Person('3', 'Golda', 'Meir', 'Test', 'http://www.jewishmag.com/49mag/goldameir/title2.jpg',
      [
        new Label('1', 'Label', 'red', 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/US_Army_logo.svg/2000px-US_Army_logo.svg.png'),
        new Label('2', 'Label', 'green', 'test', 'http://incrent.com/isramun-org/wp-content/uploads/College-of-Management.png')
      ]),
    new Person('4', 'Levi', 'Eshkol', 'Test', 'http://www.levi-eshkol.org.il/files/a87bb06179ee16616053f7e24bb2c0e3/Harris%2C%20David3.jpg',
      [
        new Label('1', 'Label', 'red', 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/US_Army_logo.svg/2000px-US_Army_logo.svg.png'),
        new Label('2', 'Label', 'green', 'test', 'http://incrent.com/isramun-org/wp-content/uploads/College-of-Management.png')
      ])
  ];

  loadSinglePerson(id: string) {
    this.personChanged.next(this.persons[0]);
  }

  deleteSinglePerson(id: string) {
    this.selectedPersonId = '';
    this.persons.splice(0, 1);
    this.personsUpdated.next();
  }

  getPersons() {
    return this.persons.slice();
  }

  loadPersonsByLabel(labelId: string) {
    this.personsChanged.next(this.persons.slice());
  }

  saveSinglePerson(person: Person) {
    //this.dataStorageService.saveSingleLabel(label);
  }
}
