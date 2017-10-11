import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PersonsService } from './persons.service';

/**
 * Used for set to service current selected url - id and mode.
 * Occurs after click and before redirect 
 */
@Injectable()
export class PersonsResolverService implements Resolve<boolean> {

  constructor(private personsService: PersonsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (route.params['id'])
      this.personsService.selectedPersonId = route.params['id'];
    else
      this.personsService.selectedPersonId = null;

    return true;
  }
}
