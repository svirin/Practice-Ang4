import { Injectable } from '@angular/core';
import { Person } from '../shared/model/persons.model';
import { Label } from '../shared/model/labels.model';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class PersonsService {

  listMode: string = 'list';
  selectedPersonId: string = '';

  constructor
    (
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
    ) {

    this.route.params.subscribe(
      (params: Params) => {
        this.selectedPersonId = params['id'];
      });

    dataStorageService.personLoaded.subscribe
      ((person: Person) => {
        this.personChanged.next(person);
      });

    dataStorageService.personsLoaded.subscribe
      ((persons: Person[]) => {
        this.persons = persons;
        this.personsChanged.next(this.persons);
      });
  }

  personsUpdated = new Subject<any>();
  personChanged = new Subject<Person>();
  personsChanged = new Subject<Person[]>();
  personsChangeSearch = new Subject<any>();

  persons: Person[] = [];

  loadSinglePerson(id: string) {
    this.dataStorageService.getSinglePerson(id);
  }

  deleteSinglePerson(id: string) {
    this.selectedPersonId = '';
    this.persons.splice(0, 1);
    this.personsUpdated.next();
  }

  loadPersons() {
    //this.dataStorageService.getAllPersons();
    this.personsChanged.next(this.persons);
  }

  loadPersonsByLabel(labelId: string) {
    this.dataStorageService.getPersonsByLabel(labelId);
  }

  loadPersonsByText(text: string) {
    this.dataStorageService.getPersonsByText(text);
  }

  saveSinglePerson(person: Person) {
    this.dataStorageService.saveSinglePerson(person);
  }
}
