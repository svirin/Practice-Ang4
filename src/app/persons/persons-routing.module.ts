import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsCardsComponent } from './persons-cards/persons-cards.component';
import { PersonsComponent } from './persons.component';
import { PersonsSearchLabelsComponent } from './persons-search-labels/persons-search-labels.component';
import { PersonsSearchPanelComponent } from './persons-search-panel/persons-search-panel.component';
import { PersonEmptyComponent } from './person-empty/person-empty.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { PersonsResolverService } from './persons-resolver.service';

const personsRoutes: Routes =
[
  {
    path: 'persons',
    component: PersonsComponent,
    children:
    [
      {
        path: '',
        component: PersonsSearchPanelComponent,
        resolve: { serverRouterParam: PersonsResolverService },
        children:
        [
          {
            path: 'list', component: PersonsListComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          },
          {
            path: 'cards', component: PersonsCardsComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          }
        ]
      },
      {
        path: 'search',
        component: PersonsSearchPanelComponent,
        resolve: { serverRouterParam: PersonsResolverService },
        children:
        [
          {
            path: 'list', component: PersonsListComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          },
          {
            path: 'cards', component: PersonsCardsComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          }
        ]
      },
      {
        path: 'labels',
        component: PersonsSearchLabelsComponent,
        resolve: { serverRouterParam: PersonsResolverService },
        children:
        [
          {
            path: 'list', component: PersonsListComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          },
          {
            path: 'cards', component: PersonsCardsComponent,
            resolve: { serverRouterParam: PersonsResolverService },
            children:
            [
              { path: '', component: PersonEmptyComponent },
              { path: 'new', component: PersonEditComponent },
              {
                path: ':id', component: PersonDetailComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              },
              {
                path: ':id/edit', component: PersonEditComponent,
                resolve: { serverRouterParam: PersonsResolverService }
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(personsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonsRoutingModule {

}
