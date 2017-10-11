import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PersonsService } from '../persons.service';
import { Person } from '../../shared/model/persons.model';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit, OnDestroy {

  persons: Person[];
  personsServiceSubscription: Subscription;

  constructor(
    private personsService: PersonsService
  ) { }

  ngOnInit() {

    this.personsServiceSubscription = this.personsService.personsChanged.subscribe(
      (persons) => {
        this.persons = persons;
      });
    this.personsService.loadPersons();
  }

  ngOnDestroy() {
    this.personsServiceSubscription.unsubscribe();
  }
}
