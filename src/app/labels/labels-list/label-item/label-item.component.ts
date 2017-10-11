import { Component, OnInit, Input } from '@angular/core';
import { Label } from '../../../shared/model/labels.model';

@Component({
  selector: 'app-label-item',
  templateUrl: './label-item.component.html',
  styleUrls: ['./label-item.component.css']
})
export class LabelItemComponent implements OnInit {

  @Input() label: Label;

  ngOnInit() {

  }
}
