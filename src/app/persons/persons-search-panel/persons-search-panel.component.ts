import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PersonsService } from '../persons.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-persons-search-panel',
  templateUrl: './persons-search-panel.component.html',
  styleUrls: ['./persons-search-panel.component.css']
})
export class PersonsSearchPanelComponent implements OnInit, OnDestroy {

  @ViewChild('search') search: ElementRef;

  personsUpdatedServiceSubscription: Subscription;

  constructor
  (
    private personsService: PersonsService
  ) { }

  ngOnInit() {

    this.personsUpdatedServiceSubscription = this.personsService.personsUpdated
      .subscribe
      (() => {
        this.personsService.loadPersonsByText(this.search.nativeElement.value);
      });
  }

  ngOnDestroy() {
    this.personsUpdatedServiceSubscription.unsubscribe();
  }

  onTextSearchChange() {
    this.personsService.loadPersonsByText(this.search.nativeElement.value);
    this.personsService.personsChangeSearch.next();
  }
}
