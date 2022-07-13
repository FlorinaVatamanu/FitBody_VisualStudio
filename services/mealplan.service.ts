import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MealPlan } from '../models/meal-plan';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  constructor(private afs: AngularFirestore, private fireStorage: AngularFireStorage) { }

  // add meal
  addMeal(meal: MealPlan) {
    meal.id = this.afs.createId();
    return this.afs.collection('/mealplans').add(meal);
  }

  // get all meals
  getAllMeals() {
    return this.afs.collection('/mealplans').snapshotChanges();
  }

  // delete meal
  deleteMeal(meal: MealPlan) {
    this.afs.doc('/mealplans/' + meal.id).delete();
  }

  // update meal
  updateFood(meal: MealPlan) {
    this.deleteMeal(meal);
    this.addMeal(meal);
  }

}
