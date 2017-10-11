import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Label } from './model/labels.model';
import * as firebase from 'firebase';


@Injectable()
export class DataStorageService {

  labelLoaded = new Subject<Label>();
  labelsLoaded = new Subject<Label[]>();

  constructor(private http: Http) {
    firebase.initializeApp({
      apiKey: "AIzaSyDdZpMgvVaksH4vBNXA-y385kuhQ1Q3BhQ",
      authDomain: "projecta-2331e.firebaseapp.com",
      databaseURL: "https://projecta-2331e.firebaseio.com",
      projectId: "projecta-2331e",
      storageBucket: "projecta-2331e.appspot.com",
      messagingSenderId: "648974309604"
    });
  }

  getAllLabels() {
    //var promise = this.http.get('https://projecta-2331e.firebaseio.com/labels.json');

    let promise = firebase.app().database().ref('labels').orderByKey();
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          const labs: Label[] = [];
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          for (let idx = 0; idx < keys.length; idx++) {
            let label: Label =
              new Label(
                keys[idx],
                values[idx].name,
                values[idx].color,
                values[idx].description,
                values[idx].imagePath
              );
            labs.push(label);
          }
          this.labelsLoaded.next(labs);
        }
      });
  }

  getSingleLabel(id: string): any {
    let promise = firebase.app().database().ref('labels').orderByKey().equalTo(id);
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          let idx = 0;
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          let label: Label =
            new Label(
              keys[idx],
              values[idx].name,
              values[idx].color,
              values[idx].description,
              values[idx].imagePath
            );
          this.labelLoaded.next(label);
        } else {
          this.labelLoaded.next(null);
        }
      });
  }

  deleteSingleLabel(id: string): any {

    var delPromise = firebase.app().database().ref('labels').orderByKey().equalTo(id);
    delPromise.once("child_added",
      snap => {
        snap.ref.remove();
      });

  }

  saveSingleLabel(label: Label) {

    if (label.id) {
      let promise = firebase.app().database().ref('labels').orderByKey().equalTo(label.id);
      promise.on('child_added',
        snap => {
          const requestedItem = snap.val();
          if (requestedItem) {
            //promise.once("child_added",
            //  snap => {
                snap.ref.update(
                  {
                    name: label.name,
                    color: label.color,
                    description: label.description,
                    imagePath: label.imagePath
                  });
              //});
          } else {
            this.insertSingleLabel(label);
          }
        }
      );
    } else {
      this.insertSingleLabel(label);
    }
  }

  insertSingleLabel(label: Label): any {
    firebase.app().database().ref("labels").push(
      {
        id: '',
        name: label.name,
        color: label.color,
        description: label.description,
        imagePath: label.imagePath
      });
  }

  //getSingleLabel(id: string): any {
  //  //return firebase.app().database().ref('labels').orderByChild('id').equalTo(id);
  //  return firebase.app().database().ref('labels').orderByKey().equalTo(id);
  //}
}
