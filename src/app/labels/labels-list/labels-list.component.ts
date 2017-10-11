import { Component, OnInit } from '@angular/core';
import { LabelsService } from '../labels.service';
import { Label } from '../../shared/model/labels.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.css']
})
export class LabelsListComponent implements OnInit {

  isCollectionChanged: boolean;
  labels: Label[];
  filterName: string = '';
  labelsServiceSubscription: Subscription;

  constructor(
    private labelsService: LabelsService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.isCollectionChanged = true; }

  ngOnInit() {
    this.labelsServiceSubscription = this.labelsService.labelsChanged.subscribe(
      (labels) => {
        this.labels = labels;
      });
    this.labelsService.loadLabels();
  }

  ngOnDestroy() {
    this.labelsServiceSubscription.unsubscribe();
  }

  onNewLabel() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
