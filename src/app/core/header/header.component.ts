import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { PersonsService } from '../../persons/persons.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private personsService: PersonsService) { }

  onSearchByName() {
    this.personsService.selectedPersonId = null;
    this.router.navigate(['./persons', 'search', this.personsService.listMode]);
  }

  onSearchByLabel() {
    this.personsService.selectedPersonId = null;
    this.router.navigate(['./persons', 'labels', this.personsService.listMode]);
  }

  ngOnInit() {

  }
}
