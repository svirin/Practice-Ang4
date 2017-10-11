import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { LabelsComponent } from './labels/labels.component';
import { PersonsComponent } from './persons/persons.component';

const appRoutes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'labels', loadChildren: './labels/labels.module#LabelsModule' }
];

@NgModule({

  imports:
  [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports:
  [
    [RouterModule]
  ]
})
export class AppRoutingModule { }
