import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Food } from '../models/food';
import { Breakfast } from '../models/breakfast';
import { Lunch } from '../models/lunch';
import { Dinner } from '../models/dinner';
import { Snack } from '../models/snack';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore, private fireStorage: AngularFireStorage) { }


  // add food
  addFood(food: Food) {
    food.id = this.afs.createId();
    return this.afs.collection('/food').add(food);
  }

  addBreakfast(breakfast: Breakfast) {
    breakfast.id = this.afs.createId();
    return this.afs.collection('/breakfast').add(breakfast);
  }

  addLunch(lunch: Lunch) {
    lunch.id = this.afs.createId();
    return this.afs.collection('/lunch').add(lunch);
  }

  addDinner(dinner: Dinner) {
    dinner.id = this.afs.createId();
    return this.afs.collection('/dinner').add(dinner);
  }

  addSnack(snack: Snack) {
    snack.id = this.afs.createId();
    return this.afs.collection('/snack').add(snack);
  }

  // get all foods
  getAllFoods() {
    return this.afs.collection('/food').snapshotChanges();
  }

  getAllBreakfasts() {
    return this.afs.collection('/breakfast').snapshotChanges();
  }

  getAllLunch() {
    return this.afs.collection('/lunch').snapshotChanges();
  }

  getAllDinner() {
    return this.afs.collection('/dinner').snapshotChanges();
  }

  getAllSnacks() {
    return this.afs.collection('/snack').snapshotChanges();
  }

  // delete food
  deleteFood(food: Food) {
    this.afs.doc('/food/' + food.id).delete();
  }

  deleteBreakfast(breakfast: Breakfast) {
    this.afs.doc('/breakfast/' + breakfast.id).delete();
  }

  deleteLunch(lunch: Lunch) {
    this.afs.doc('/lunch/' + lunch.id).delete();
  }

  deleteDinner(dinner: Dinner) {
    this.afs.doc('/dinner/' + dinner.id).delete();
  }

  deleteSnack(snack: Snack) {
    this.afs.doc('/snack/' + snack.id).delete();
  }

  // update food
  updateFood(food: Food) {
    this.deleteFood(food);
    this.addFood(food);
  }

}


