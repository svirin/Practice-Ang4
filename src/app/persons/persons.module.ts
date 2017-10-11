import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonsComponent } from './persons.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonListItemComponent } from './persons-list/person-list-item/person-list-item.component';
import { PersonsCardsComponent } from './persons-cards/persons-cards.component';
import { PersonCardItemComponent } from "./persons-cards/person-card-item/person-card-item.component";
import { PersonsSearchLabelsComponent } from "./persons-search-labels/persons-search-labels.component";
import { PersonsSearchPanelComponent } from "./persons-search-panel/persons-search-panel.component";
import { PersonModeSelectorComponent } from './person-mode-selector/person-mode-selector.component';
import { SharedModule } from '../shared/shared.module';
import { PersonEmptyComponent } from './person-empty/person-empty.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditComponent } from './person-edit/person-edit.component';

@NgModule({
  declarations:
  [
    PersonsComponent,
    PersonsListComponent,
    PersonListItemComponent,
    PersonsCardsComponent,
    PersonCardItemComponent,
    PersonsSearchLabelsComponent,
    PersonsSearchPanelComponent,
    PersonModeSelectorComponent,
    PersonEmptyComponent,
    PersonDetailComponent,
    PersonEditComponent
  ],
  imports:
  [
    FormsModule,
    CommonModule,
    PersonsRoutingModule,
    SharedModule
  ]
})
export class PersonsModule { }
