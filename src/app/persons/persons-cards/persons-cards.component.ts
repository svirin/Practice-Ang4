import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

    constructor
    (
      private personsService: PersonsService,
      private router: Router,
      private route: ActivatedRoute
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

  onNewPerson() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
