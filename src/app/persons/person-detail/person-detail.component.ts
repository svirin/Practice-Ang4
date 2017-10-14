import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from '../persons.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Person } from '../../shared/model/persons.model';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit, OnDestroy {

  id: string;
  person: Person = new Person('', '', '', '', '', []);

  changeSearchSubscription: Subscription;
  queryParamsSubscription: Subscription;
  personServiceSubscription: Subscription;

  constructor
  (
    private personService: PersonsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.changeSearchSubscription = this.personService.personsChangeSearch.subscribe(
      () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });

    this.queryParamsSubscription = this.route.params.subscribe
    (
      (params: Params) => {
        this.id = params['id'];

        this.personServiceSubscription = this.personService.personChanged
          .subscribe(
            (person: Person) => {
              if (person) {
                this.person = person;
              } else {
                this.router.navigate(['../'], { relativeTo: this.route });
              }
            });

        this.personService.loadSinglePerson(this.id);
      });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.personServiceSubscription.unsubscribe();
    this.changeSearchSubscription.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeletePerson() {
    this.personService.deleteSinglePerson(this.id);
    this.onCancel();
  }

  onEditPerson() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  getPersonLabels() {
    if (this.person.labels) {
      return this.person.labels;
    }
  }
}
