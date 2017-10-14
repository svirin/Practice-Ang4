import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Label } from './model/labels.model';
import { Person } from "./model/persons.model";

import * as firebase from 'firebase';



@Injectable()
export class DataStorageService {

  labelLoaded = new Subject<Label>();
  labelsLoaded = new Subject<Label[]>();

  personLoaded = new Subject<Person>();
  personsLoaded = new Subject<Person[]>();

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

  getAllPersons() {
    let promise = firebase.app().database().ref('persons').orderByKey();
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          const persons: Person[] = [];
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          for (let idx = 0; idx < keys.length; idx++) {
            let person: Person =
              new Person(
                keys[idx],
                values[idx].firstname,
                values[idx].lastname,
                values[idx].description,
                values[idx].imagePath,
                values[idx].labels
              );
            persons.push(person);
          }
          this.personsLoaded.next(persons);
        }
      });
  }

  getPersonsByLabel(labelId: string) {
    let promise = firebase.app().database().ref('persons').orderByKey();
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          const persons: Person[] = [];
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          for (let idx = 0; idx < keys.length; idx++) {
            let person: Person =
              new Person(
                keys[idx],
                values[idx].firstname,
                values[idx].lastname,
                values[idx].description,
                values[idx].imagePath,
                values[idx].labels
              );
            if (person.labels.find(lb => lb.id === labelId)) {
              persons.push(person);
            }
          }
          this.personsLoaded.next(persons);
        }
      });
  }

  getPersonsByText(text: string) {
    let promise = firebase.app().database().ref('persons').orderByKey();
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          const persons: Person[] = [];
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          for (let idx = 0; idx < keys.length; idx++) {
            let person: Person =
              new Person(
                keys[idx],
                values[idx].firstname,
                values[idx].lastname,
                values[idx].description,
                values[idx].imagePath,
                values[idx].labels
              );
            if (person.firstname.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
                person.lastname.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
                person.description.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
              persons.push(person);
            }
          }
          this.personsLoaded.next(persons);
        }
      });
  }

  getSinglePerson(id: string): any {
    let promise = firebase.app().database().ref('persons').orderByKey().equalTo(id);
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          let idx = 0;
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          let person: Person =
            new Person(
              keys[idx],
              values[idx].firstname,
              values[idx].lastname,
              values[idx].description,
              values[idx].imagePath,
              values[idx].labels
            );
          this.personLoaded.next(person);
        } else {
          this.personLoaded.next(null);
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
            snap.ref.update(
              {
                name: label.name,
                color: label.color,
                description: label.description,
                imagePath: label.imagePath
              });
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

  saveSinglePerson(person: Person) {
    if (person.id) {
      let promise = firebase.app().database().ref('persons').orderByKey().equalTo(person.id);
      promise.on('child_added',
        snap => {
          const requestedItem = snap.val();
          if (requestedItem) {
            snap.ref.update(
              {
                firstname: person.firstname,
                lastname: person.lastname,
                description: person.description,
                imagePath: person.imagePath,
                labels: person.labels
              });
          } else {
            this.insertSinglePerson(person);
          }
        }
      );
    } else {
      this.insertSinglePerson(person);
    }
  }

  insertSinglePerson(person: Person): any {
    firebase.app().database().ref("persons").push(
      {
        id: '',
        firstname: person.firstname,
        lastname: person.lastname,
        description: person.description,
        imagePath: person.imagePath,
        labels: person.labels
      });
  }

  //getSingleLabel(id: string): any {
  //  //return firebase.app().database().ref('labels').orderByChild('id').equalTo(id);
  //  return firebase.app().database().ref('labels').orderByKey().equalTo(id);
  //}
}
