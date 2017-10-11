import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../shared/model/persons.model';

@Component({
  selector: 'app-person-card-item',
  templateUrl: './person-card-item.component.html',
  styleUrls: ['./person-card-item.component.css']
})
export class PersonCardItemComponent implements OnInit {

  @Input() person: Person;

  constructor() { }

  ngOnInit() {

  }
}
