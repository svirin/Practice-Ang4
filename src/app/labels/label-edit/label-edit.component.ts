import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Label } from '../../shared/model/labels.model';
import { LabelsService } from '../labels.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.css']
})
export class LabelEditComponent implements OnInit, OnDestroy {

  id: string;
  editMode = false;
  labelsForm: FormGroup;
  routeSubscription: Subscription;
  labelsServiceSubscription: Subscription;

  constructor(
    private labelsService: LabelsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  onColorChanged(color: string) {
    this.labelsForm.patchValue({ 'color': color });
  }

  ngOnInit() {
    this.routeSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.labelsServiceSubscription.unsubscribe();
  }

  sizeValidate(control: FormControl, size: number): { [s: string]: boolean } {
    if (control.value.length > size) {
      return { 'labelSizeValidate': true };
    }
    return null;
  }

  nameValidate(control: FormControl): { [s: string]: boolean } {
    if (control.value.indexOf('Label') === -1) {
      return { 'labelNameValidate': true };
    }
    return null;
  }

  private initForm() {
    this.labelsForm = new FormGroup({
      //'id': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'name': new FormControl('', [Validators.required, Validators.maxLength(30), this.nameValidate.bind(this)]),
      'color': new FormControl('', Validators.required),
      'imagePath': new FormControl(''),
      'description': new FormControl('', [Validators.maxLength(150)])
    });
    
    if (this.editMode) {

      this.labelsServiceSubscription = this.labelsService.labelChanged
        .subscribe(
          (label: Label) => {
            if (label) {
              this.labelsForm.setValue(
                {
                  'name': label.name,
                  'color': label.color,
                  'description': label.description,
                  'imagePath': label.imagePath
                });
            } else {
              this.router.navigate(['/labels']);
            }
        });

      this.labelsService.loadSingleLabel(this.id);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    const label: Label = new Label(
      this.id,
      this.labelsForm.get('name').value,
      this.labelsForm.get('color').value,
      this.labelsForm.get('description').value,
      this.labelsForm.get('imagePath').value);
    this.labelsService.saveSingleLabel(label);
    this.onCancel();
  }
}
