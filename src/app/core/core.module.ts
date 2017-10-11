import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { LabelsService } from '../labels/labels.service';
import { DataStorageService } from '../shared/data-storage.service';
import { SharedModule } from '../shared/shared.module';
import { PersonsService } from '../persons/persons.service';
import { PersonsResolverService } from '../persons/persons-resolver.service';

@NgModule({
  declarations:
  [
    HeaderComponent,
    HomeComponent
  ],
  imports:
  [
    AppRoutingModule,
    SharedModule
  ],
  exports:
  [
    AppRoutingModule,
    HeaderComponent
  ],
  providers:
  [
    LabelsService,
    PersonsService,
    DataStorageService,
    PersonsResolverService
  ]
})
export class CoreModule { }
