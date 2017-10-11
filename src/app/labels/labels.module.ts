import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LabelsComponent } from './labels.component';
import { LabelsRoutingModule } from './labels-routing.module';
import { LabelsListComponent } from './labels-list/labels-list.component';
import { LabelItemComponent } from './labels-list/label-item/label-item.component';
import { LabelEditComponent } from './label-edit/label-edit.component';
import { LabelEmptyComponent } from './label-empty/label-empty.component';
import { LabelDetailComponent } from './label-detail/label-detail.component';

import { FilterPipe } from './labels-list/filter.pipe';
import { ColorPaletteComponent } from '../shared/color-palette/color-palette.component';


@NgModule({
  declarations:
  [
    LabelsComponent,
    LabelsListComponent,
    LabelItemComponent,
    LabelEditComponent,
    LabelDetailComponent,
    LabelEmptyComponent,
    ColorPaletteComponent,
    FilterPipe
  ],
  imports:
  [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LabelsRoutingModule
  ]
})
export class LabelsModule { }
