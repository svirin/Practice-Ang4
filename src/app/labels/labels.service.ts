import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataStorageService } from '../shared/data-storage.service';
import { Label } from '../shared/model/labels.model';

@Injectable()
export class LabelsService {

  labelChanged = new Subject<Label>();
  labelsChanged = new Subject<Label[]>();
  private labels: Label[] = [];

  constructor(private dataStorageService: DataStorageService) {

    dataStorageService.labelLoaded.subscribe
    ((label: Label) => {
      this.labelChanged.next(label);
    });

    dataStorageService.labelsLoaded.subscribe
    ((labels: Label[]) => {
      this.labelsChanged.next(labels);
    });
  }

  loadLabels() {
    this.dataStorageService.getAllLabels();
  }

  loadSingleLabel(id: string) {
    this.dataStorageService.getSingleLabel(id);
  }

  deleteSingleLabel(id: string) {
    this.dataStorageService.deleteSingleLabel(id);
    this.loadLabels();
  }

  saveSingleLabel(label: Label) {
    this.dataStorageService.saveSingleLabel(label);
  }
}
