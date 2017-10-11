import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { PersonsService } from '../persons.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-person-mode-selector',
  templateUrl: './person-mode-selector.component.html',
  styleUrls: ['./person-mode-selector.component.css']
})
export class PersonModeSelectorComponent implements OnInit, OnDestroy {

  @Input() modeStyle;
  routeSubscription: Subscription;
  editmodeSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private personsService: PersonsService) { }

  ngOnInit() {
    this.routeSubscription = this.route.children[0].url
      .subscribe(
        (segments: UrlSegment[]) => {
          this.personsService.listMode = segments[0].path;
      });


  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getButtonStyle(buttonStyle: string) {
    return buttonStyle === this.personsService.listMode ? 'btn btn-success' : 'btn btn-default';
  }

  changeListMode(mode: string) {
    this.personsService.listMode = mode;
    console.log(this.route);

    let editMode = this.router.url.indexOf('/edit') !== -1 ? 'edit' : null;
    let selectedPersonId = this.personsService.selectedPersonId ? this.personsService.selectedPersonId : null;

    if (selectedPersonId) {
      this.router.navigate(['./', this.personsService.listMode, selectedPersonId], { relativeTo: this.route });
      if (editMode) {
        this.router.navigate(['./', this.personsService.listMode, selectedPersonId, editMode],{ relativeTo: this.route });
      }
    } else {
      this.router.navigate(['./', this.personsService.listMode], { relativeTo: this.route });
    }
    //this.router.navigate(['./', this.personsService.listMode, selectedPersonId, editMode], { relativeTo: this.route });
  }
}
