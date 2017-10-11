import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelsComponent } from "./labels.component";
import { LabelEmptyComponent } from './label-empty/label-empty.component';
import { LabelDetailComponent } from './label-detail/label-detail.component';
import { LabelEditComponent } from './label-edit/label-edit.component';

const labelsRoutes: Routes =
  [
    {
      path: '', component: LabelsComponent, children:
      [
        { path: '', component: LabelEmptyComponent },
        { path: 'new', component: LabelEditComponent },
        { path: ':id', component: LabelDetailComponent },
        { path: ':id/edit', component: LabelEditComponent }
      ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(labelsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LabelsRoutingModule {

}
