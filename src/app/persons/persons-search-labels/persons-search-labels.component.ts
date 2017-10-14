import { Component, OnInit } from '@angular/core';
import { Label } from '../../shared/model/labels.model';
import { LabelsService } from '../../labels/labels.service';
import { Subscription } from 'rxjs/Subscription';
import { PersonsService } from '../persons.service';
import { Person } from '../../shared/model/persons.model';

@Component({
  selector: 'app-persons-search-labels',
  templateUrl: './persons-search-labels.component.html',
  styleUrls: ['./persons-search-labels.component.css']
})
export class PersonsSearchLabelsComponent implements OnInit {

  selectedLabelId: string;
  selectedLabelName: string;
  selectedLabelColor: string;
  labels: Label[];

  labelsServiceSubscription: Subscription;
  personsUpdatedServiceSubscription: Subscription;

  constructor
    (
    private labelsService: LabelsService,
    private personsService: PersonsService
  ) { }

  ngOnInit() {

    this.labelsServiceSubscription = this.labelsService.labelsChanged.subscribe(
      (labels) => {
        this.labels = labels;
      });

    this.personsUpdatedServiceSubscription = this.personsService.personsUpdated
      .subscribe
      (() => {
        this.personsService.loadPersonsByLabel(this.selectedLabelId);
      });

    this.labelsService.loadLabels();
  }

  ngOnDestroy() {
    this.labelsServiceSubscription.unsubscribe();
    this.personsUpdatedServiceSubscription.unsubscribe();
  }

  onLabelSelect(label: Label) {
    this.selectedLabelId = label.id;
    this.selectedLabelName = label.name;
    this.selectedLabelColor = label.color;
    this.onChange();
  }

  onChange() {
    this.personsService.loadPersonsByLabel(this.selectedLabelId);
    this.personsService.personsChangeSearch.next();
  }
}
