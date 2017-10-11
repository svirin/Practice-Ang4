import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Label } from '../../shared/model/labels.model';
import { LabelsService } from '../labels.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.css']
})
export class LabelDetailComponent implements OnInit, OnDestroy {


  id: string;
  routeSubscription: Subscription;
  labelsServiceSubscription: Subscription;

  label: Label = new Label('', '', '', '', '');

  constructor
  (
    private labelsService: LabelsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        this.labelsServiceSubscription = this.labelsService.labelChanged
          .subscribe(
          (label: Label) => {
            if (label) {
              this.label = label;
            } else {
              this.router.navigate(['/labels']);
            }
          });

        this.labelsService.loadSingleLabel(this.id);

      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.labelsServiceSubscription.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteLabel() {
    this.labelsService.deleteSingleLabel(this.id);
    this.onCancel();
  }

  onEditLabel() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
