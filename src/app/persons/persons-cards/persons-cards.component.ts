import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PersonsService } from '../persons.service';
import { Person } from '../../shared/model/persons.model';

@Component({
  selector: 'app-persons-cards',
  templateUrl: './persons-cards.component.html',
  styleUrls: ['./persons-cards.component.css']
})
export class PersonsCardsComponent implements OnInit, OnDestroy {

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
    this.persons = this.personsService.getPersons();
  }

  ngOnDestroy() {
    this.personsServiceSubscription.unsubscribe();
  }
}
