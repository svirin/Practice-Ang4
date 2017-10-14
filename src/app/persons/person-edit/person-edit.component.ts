import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonsService } from '../persons.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Person } from '../../shared/model/persons.model';
import { LabelsService } from '../../labels/labels.service';
import { Label } from '../../shared/model/labels.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  id: string;
  editMode = false;

  person: Person = new Person('', '', '', '', '', []);

  labels: Label[];

  changeSearchSubscription: Subscription;
  queryParamsSubscription: Subscription;
  personServiceSubscription: Subscription;
  labelsServiceSubscription: Subscription;

  @ViewChild('f') rpsForm: NgForm;

  constructor(
    private personService: PersonsService,
    private labelsService: LabelsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.personServiceSubscription.unsubscribe();
    this.labelsServiceSubscription.unsubscribe();
    this.changeSearchSubscription.unsubscribe();
  }

  ngOnInit() {

    this.labelsServiceSubscription = this.labelsService.labelsChanged.subscribe(
      (labels) => {
        this.labels = labels;
      });
    this.labelsService.loadLabels();

    this.changeSearchSubscription = this.personService.personsChangeSearch.subscribe(
      () => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });

    this.queryParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;        
        this.personServiceSubscription = this.personService.personChanged
          .subscribe(
            (person: Person) => {
              if (person) {
                let personsLabels: Label[] = [];

                for (let lb of person.labels) {
                  const label: Label = new Label(lb.id, lb.name, lb.color, lb.description, lb.imagePath);
                  personsLabels.push(label);
                }

                this.person = new Person(
                  person.id,
                  person.firstname,
                  person.lastname,
                  person.description,
                  person.imagePath,
                  personsLabels
                );

              } else {
                this.router.navigate(['../'], { relativeTo: this.route });
              }
            });

        if (this.id) {
          this.personService.loadSinglePerson(this.id);
        }
      });
  }

  onSubmit(form: NgForm) {
    this.personService.saveSinglePerson(this.person);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onLabelSelect(label: Label) {
    const isAlreadyExisted = this.isLabelExisted(label.id);
    if (this.person && !isAlreadyExisted) {
      this.person.labels.push(label);
    }
  }

  getLabels() {
    if (this.person) {
      return this.person.labels;
    }
  }

  isLabelExisted(id: string) {
    for (let lab of this.person.labels) {
      if (lab.id === id) {
        return true;
      }
    }
    return false;
  }

  onDeleteLabel(id: string) {
    if (this.person) {
      let counter = 0;
      for (let lab of this.person.labels) {
        if (lab.id === id) {
          this.person.labels.splice(counter, 1);
        }
        counter++;
      }
    }
  }
}
