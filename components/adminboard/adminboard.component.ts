import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MealPlan } from 'src/app/models/meal-plan';

import { MealPlanService } from 'src/app/services/mealplan.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.scss']
})
export class AdminboardComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;

  mealPlansList: MealPlan[] = [];

  mealObj: MealPlan = {
    id: '',
    description: '',
    meal_1: '',
    snack_1: '',
    meal_2: '',
    snack_2: '',
    meal_3: '',
    snack_3: '',
    kcals: '',
    proteins: '',
    carbohydrates: '',
    fats: ''
  };

  id: string = '';
  description: string = '';
  meal_1: string = '';
  snack_1: string = '';
  meal_2: string = '';
  snack_2: string = '';
  meal_3: string = '';
  snack_3: string = '';
  kcals: string = '';
  proteins: string = '';
  carbohydrates: string = '';
  fats: string = '';

  constructor(private auth: AuthenticationService, private data: MealPlanService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getAllMeals();
  }

  getAllMeals() {

    this.data.getAllMeals().subscribe(res => {

      this.mealPlansList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching foods data.');
    })

  }

  resetForm() {
    this.id = '';
    this.description = '';
    this.meal_1 = '';
    this.snack_1 = '';
    this.meal_2 = '';
    this.snack_2 = '';
    this.meal_3 = '';
    this.snack_3 = '';
    this.kcals = '';
    this.proteins = '';
    this.carbohydrates = '';
    this.fats = '';
  }

  addMealPlan() {
    if (this.description == '' || this.meal_1 == '' || this.snack_1 == '' || this.meal_2 == '' || this.snack_2 == '' || this.meal_3 == '' || this.snack_3 == '' || this.kcals == '' || this.proteins == '' || this.carbohydrates == '' || this.fats == '') {
      alert('Fill all input fields.');
      return;
    }

    this.mealObj.id = '';
    this.mealObj.description = this.description;
    this.mealObj.meal_1 = this.meal_1;
    this.mealObj.snack_1 = this.snack_1;
    this.mealObj.meal_2 = this.meal_2;
    this.mealObj.snack_2 = this.snack_2;
    this.mealObj.meal_3 = this.meal_3;
    this.mealObj.snack_3 = this.snack_3;
    this.mealObj.kcals = this.kcals;
    this.mealObj.proteins = this.proteins;
    this.mealObj.carbohydrates = this.carbohydrates;
    this.mealObj.fats = this.fats;

    this.data.addMeal(this.mealObj);
    this.resetForm();

  }

  updateMealPlan(meal: MealPlan) {
    if (this.description == '' || this.meal_1 == '' || this.snack_1 == '' || this.meal_2 == '' || this.snack_2 == '' || this.meal_3 == '' || this.snack_3 == '' || this.kcals == '' || this.proteins == '' || this.carbohydrates == '' || this.fats == '') {
      alert('Fill all input fields.');
      return;
    }
    this.data.deleteMeal(meal);

    this.mealObj.id = '';
    this.mealObj.description = this.description;
    this.mealObj.meal_1 = this.meal_1;
    this.mealObj.snack_1 = this.snack_1;
    this.mealObj.meal_2 = this.meal_2;
    this.mealObj.snack_2 = this.snack_2;
    this.mealObj.meal_3 = this.meal_3;
    this.mealObj.snack_3 = this.snack_3;
    this.mealObj.kcals = this.kcals;
    this.mealObj.proteins = this.proteins;
    this.mealObj.carbohydrates = this.carbohydrates;
    this.mealObj.fats = this.fats;

    this.data.addMeal(this.mealObj);
    this.resetForm();
  }

  deleteMealPlan(meal: MealPlan) {
    if (window.confirm('Are you sure you want to delete ' + meal.description + ' ?')) {
      this.data.deleteMeal(meal);
    }
  }

  convert(meal: MealPlan) {

    const doc = new jsPDF();
    //var col = [["Description", "Meal 1", "Snack 1", "Meal 2", "Snack 2", "Meal 3", "Snack 3", "Carbohydrates","Proteins", "Fats", "Kcals"]];
    //var title = "Meal Plan";

    

    /*this.mealPlansList.forEach(element => {
       [element.description, element.meal_1, element.snack_1, element.meal_2, element.snack_2, element.meal_3, element.snack_3, element.kcals, element.proteins, element.carbohydrates, element.fats];
    });*/

    //let values: any;
    //values = this.mealPlansList.map((x) => Object.values(x.description));

    autoTable(doc, {
      head: [["Description", "Meal 1", "Snack 1", "Meal 2", "Snack 2", "Meal 3", "Snack 3", "Carbohydrates", "Proteins", "Fats", "Kcals"]],
      body: [
        //['keto', 'oua, avocado, rosii', 'peanut butter', 'piept de pui, legume fierte', 'baton proteic', 'peste, legume', 'iaurt cu fructe de padure', '1300', '140', '10', '60']
        //values
        [meal.description, meal.meal_1, meal.snack_1, meal.meal_2, meal.snack_2, meal.meal_3, meal.snack_3, meal.kcals, meal.proteins, meal.carbohydrates, meal.fats]
      ],
    })
    //doc.text(title, 20, 20);
    doc.save('MealPlan.pdf');
  }

  Search() {
    if (this.description == "") {
      this.ngOnInit();
    } else {
      this.mealPlansList = this.mealPlansList.filter(res => {
        return res.description.toLocaleLowerCase().match(this.description.toLocaleLowerCase());
      });
    }
  }

  key: string = 'kcals';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
