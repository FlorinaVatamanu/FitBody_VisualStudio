import { Component, OnInit } from '@angular/core';

import { Food } from 'src/app/models/food';
import { Breakfast } from 'src/app/models/breakfast';
import { Lunch } from 'src/app/models/lunch';
import { Dinner } from 'src/app/models/dinner';
import { Snack } from 'src/app/models/snack';

import { DataService } from 'src/app/services/data.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  foodsList: Food[] = [];
  breakfastList: Breakfast[] = [];
  lunchList: Lunch[] = [];
  dinnerList: Dinner[] = [];
  snackList: Snack[] = [];

  p: number = 1;
  active_user: string = '';
  servings: string = '';

  foodObj: Food = {
    id: '',
    food_name: '',
    calories: '',
    cantity: '',
    units: '',
    carbs: '',
    fat: '',
    fiber: '',
    protein: '',
    sugar: ''
  };

  id: string = '';
  food_name: string = '';
  calories: string = '';
  cantity: string = '';
  units: string = '';
  carbs: string = '';
  fat: string = '';
  fiber: string = '';
  protein: string = '';
  sugar: string = '';

  breakfastObj: Breakfast = {
    id: '',
    email: '',
    day: '',
    food_nameB: '',
    caloriesB: '',
    cantityB: '',
    unitsB: '',
    carbsB: '',
    fatB: '',
    fiberB: '',
    proteinB: '',
    sugarB: '',
    totalCarbsB: '',
    totalFatsB: '',
    totalProteinB: '',
    totalFiberB: '',
    totalSugarB: '',
    totalCalsBreakfast: ''
  };

  //idB: string = '';
  email: string = '';
  day: string = '';
  food_nameB: string = '';
  caloriesB: string = '';
  cantityB: string = '';
  unitsB: string = '';
  carbsB: string = '';
  fatB: string = '';
  fiberB: string = '';
  proteinB: string = '';
  sugarB: string = '';
  totalCarbsB: string = '';
  totalFatsB: string = '';
  totalProteinB: string = '';
  totalFiberB: string = '';
  totalSugarB: string = '';
  totalCalsBreakfast: string = '';

  lunchObj: Lunch = {
    id: '',
    emailL: '',
    dayL: '',
    food_nameL: '',
    caloriesL: '',
    cantityL: '',
    unitsL: '',
    carbsL: '',
    fatL: '',
    fiberL: '',
    proteinL: '',
    sugarL: '',
    totalCarbsL: '',
    totalFatsL: '',
    totalProteinL: '',
    totalFiberL: '',
    totalSugarL: '',
    totalCalsLunch: ''
  };

  //idL: string = '';
  emailL: string = '';
  dayL: string = '';
  food_nameL: string = '';
  caloriesL: string = '';
  cantityL: string = '';
  unitsL: string = '';
  carbsL: string = '';
  fatL: string = '';
  fiberL: string = '';
  proteinL: string = '';
  sugarL: string = '';
  totalCarbsL: string = '';
  totalFatsL: string = '';
  totalProteinL: string = '';
  totalFiberL: string = '';
  totalSugarL: string = '';
  totalCalsLunch: string = '';

  dinnerObj: Dinner = {
    id: '',
    emailD: '',
    dayD: '',
    food_nameD: '',
    caloriesD: '',
    cantityD: '',
    unitsD: '',
    carbsD: '',
    fatD: '',
    fiberD: '',
    proteinD: '',
    sugarD: '',
    totalCarbsD: '',
    totalFatsD: '',
    totalProteinD: '',
    totalFiberD: '',
    totalSugarD: '',
    totalCalsDinner: ''
  };

  //idD: string = '';
  emailD: string = '';
  dayD: string = '';
  food_nameD: string = '';
  caloriesD: string = '';
  cantityD: string = '';
  unitsD: string = '';
  carbsD: string = '';
  fatD: string = '';
  fiberD: string = '';
  proteinD: string = '';
  sugarD: string = '';
  totalCarbsD: string = '';
  totalFatsD: string = '';
  totalProteinD: string = '';
  totalFiberD: string = '';
  totalSugarD: string = '';
  totalCalsDinner: string = '';

  snackObj: Snack = {
    id: '',
    emailS: '',
    dayS: '',
    food_nameS: '',
    caloriesS: '',
    cantityS: '',
    unitsS: '',
    carbsS: '',
    fatS: '',
    fiberS: '',
    proteinS: '',
    sugarS: '',
    totalCarbsS: '',
    totalFatsS: '',
    totalProteinS: '',
    totalFiberS: '',
    totalSugarS: '',
    totalCalsSnacks: ''
  };

  //idS: string = '';
  emailS: string = '';
  dayS: string = '';
  food_nameS: string = '';
  caloriesS: string = '';
  cantityS: string = '';
  unitsS: string = '';
  carbsS: string = '';
  fatS: string = '';
  fiberS: string = '';
  proteinS: string = '';
  sugarS: string = '';
  totalCarbsS: string = '';
  totalFatsS: string = '';
  totalProteinS: string = '';
  totalFiberS: string = '';
  totalSugarS: string = '';
  totalCalsSnacks: string = '';

  piechartB: any;
  piechartD: any;
  piechartL: any;
  piechartS: any;

  constructor(private auth: AuthenticationService, private data: DataService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getAllFoods();

    this.getAllBreakfasts();
    this.getAllLunch();
    this.getAllDinner();
    this.getAllSnacks();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllFoods() {

    this.data.getAllFoods().subscribe(res => {

      this.foodsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching foods data.');
    })

  }

  getAllBreakfasts() {

    this.data.getAllBreakfasts().subscribe(res => {

      this.breakfastList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching breakfast data.');
    })

  }

  getAllLunch() {

    this.data.getAllLunch().subscribe(res => {

      this.lunchList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching lunch data.');
    })

  }

  getAllDinner() {

    this.data.getAllDinner().subscribe(res => {

      this.dinnerList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching dinner data.');
    })

  }

  getAllSnacks() {

    this.data.getAllSnacks().subscribe(res => {

      this.snackList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching snacks data.');
    })

  }

  Search() {
    if (this.food_name == "") {
      this.ngOnInit();
    } else {
      this.foodsList = this.foodsList.filter(res => {
        return res.food_name.toLocaleLowerCase().match(this.food_name.toLocaleLowerCase());
      });
    }
  }

  key: string = 'calories';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  resetForm() {
    this.id = '';
    this.food_name = '';
    this.calories = '';
    this.cantity = '';
    this.units = '';
    this.carbs = '';
    this.fat = '';
    this.fiber = '';
    this.protein = '';
    this.sugar = '';
  }

  addFood() {
    if (this.food_name == '' || this.calories == '' || this.cantity == '' || this.units == '' || this.carbs == '' || this.fat == '' || this.fiber == '' || this.protein == '' || this.sugar == '') {
      alert('Fill all input fields.');
      return;
    }

    this.foodObj.id = '';
    this.foodObj.food_name = this.food_name;
    this.foodObj.calories = this.calories;
    this.foodObj.cantity = this.cantity;
    this.foodObj.units = this.units;
    this.foodObj.carbs = this.carbs;
    this.foodObj.fat = this.fat;
    this.foodObj.fiber = this.fiber;
    this.foodObj.protein = this.protein;
    this.foodObj.sugar = this.sugar;

    this.data.addFood(this.foodObj);
    this.resetForm();

  }



  updateFood(food: Food) {
    if (this.food_name == '' || this.calories == '' || this.cantity == '' || this.units == '' || this.carbs == '' || this.fat == '' || this.fiber == '' || this.protein == '' || this.sugar == '') {
      alert('Fill all input fields.');
      return;
    }
    this.data.deleteFood(food);

    this.foodObj.id = '';
    this.foodObj.food_name = this.food_name;
    this.foodObj.calories = this.calories;
    this.foodObj.cantity = this.cantity;
    this.foodObj.units = this.units;
    this.foodObj.carbs = this.carbs;
    this.foodObj.fat = this.fat;
    this.foodObj.fiber = this.fiber;
    this.foodObj.protein = this.protein;
    this.foodObj.sugar = this.sugar;

    this.data.addFood(this.foodObj);
    this.resetForm();
  }

  deleteFood(food: Food) {
    if (window.confirm('Are you sure you want to delete ' + food.food_name + ' ?')) {
      this.data.deleteFood(food);
    }
  }


  totalCalsB: number = 0;
  caloriesPortion: number = 0;
  caloriesFinal: number = 0;

  totalC: number = 0;
  carbo: string | undefined;
  carbsFinal: number = 0;

  totalP: number = 0;
  proteinsFinal: number = 0;

  totalG: number = 0;
  fatsFinal: number = 0;

  totalS: number = 0;
  sugarsFinal: number = 0;

  totalF: number = 0;
  fibersFinal: number = 0;

  addBreakfast(food: Food) {

    if (this.day == '') {
      alert('Pick a date.');
      return;
    } else if (this.servings == '') {
      alert('Write number of servings.');
      return;
    } else {
      this.breakfastObj.id = '';
      this.breakfastObj.email = this.active_user;
      this.breakfastObj.day = this.day;
      this.breakfastObj.food_nameB = food.food_name;

      this.caloriesPortion = (Number(food.calories) * Number(this.servings)) / 100;
      this.caloriesFinal = Math.round((this.caloriesPortion + Number.EPSILON) * 100) / 100;
      this.breakfastObj.caloriesB = this.caloriesFinal.toString(10);

      this.breakfastObj.cantityB = this.servings;
      this.breakfastObj.unitsB = food.units;

      this.carbsFinal = (Number(food.carbs) * Number(this.servings)) / 100;
      this.carbsFinal = Math.round((this.carbsFinal + Number.EPSILON) * 100) / 100;
      this.breakfastObj.carbsB = this.carbsFinal.toString(10);

      this.fatsFinal = (Number(food.fat) * Number(this.servings)) / 100;
      this.fatsFinal = Math.round((this.fatsFinal + Number.EPSILON) * 100) / 100;
      this.breakfastObj.fatB = this.fatsFinal.toString(10);

      this.fibersFinal = (Number(food.fiber) * Number(this.servings)) / 100;
      this.fibersFinal = Math.round((this.fibersFinal + Number.EPSILON) * 100) / 100;
      this.breakfastObj.fiberB = this.fibersFinal.toString(10);

      this.proteinsFinal = (Number(food.protein) * Number(this.servings)) / 100;
      this.proteinsFinal = Math.round((this.proteinsFinal + Number.EPSILON) * 100) / 100;
      this.breakfastObj.proteinB = this.proteinsFinal.toString(10);

      this.sugarsFinal = (Number(food.sugar) * Number(this.servings)) / 100;
      this.sugarsFinal = Math.round((this.sugarsFinal + Number.EPSILON) * 100) / 100;
      this.breakfastObj.sugarB = this.sugarsFinal.toString(10);

      this.totalC = this.totalC + this.carbsFinal;
      this.breakfastObj.totalCarbsB = this.totalC.toString(10);
      this.carbo = this.totalCarbsB;

      this.totalP = this.totalP + this.proteinsFinal;
      this.breakfastObj.totalProteinB = this.totalP.toString(10);

      this.totalG = this.totalG + this.fatsFinal;
      this.breakfastObj.totalFatsB = this.totalG.toString(10);

      this.totalF = this.totalF + this.fibersFinal;
      this.breakfastObj.totalFiberB = this.totalF.toString(10);

      this.totalS = this.totalS + this.sugarsFinal;
      this.breakfastObj.totalSugarB = this.totalS.toString(10);

      this.totalCalsB = this.totalCalsB + this.caloriesFinal;
      this.breakfastObj.totalCalsBreakfast = this.totalCalsB.toString(10);

      this.data.addBreakfast(this.breakfastObj);
    }
  }

  //clear dupa fiecare modificare pt a calcula corect datele pt chart
  deleteBreakfast(breakfast: Breakfast) {
    if (window.confirm('Are you sure you want to delete ' + breakfast.food_nameB + ' ?')) {
      this.data.deleteBreakfast(breakfast);
    }
    this.calculateTotalsBreakfast(breakfast);
    this.drawTotalBreakfast();
  }

  calculateTotalsBreakfast(breakfast: Breakfast) {
    if (this.totalC != 0) {
      this.totalC = this.totalC - Number(breakfast.carbsB);
    }
    if (this.totalP != 0) {
      this.totalP = this.totalP - Number(breakfast.proteinB);
    }
    if (this.totalG != 0) {
      this.totalG = this.totalG - Number(breakfast.fatB);
    }
    if (this.totalF != 0) {
      this.totalF = this.totalF - Number(breakfast.fiberB);
    }
    if (this.totalS != 0) {
      this.totalS = this.totalS - Number(breakfast.sugarB);
    }
    if (this.totalCalsB != 0) {
      this.totalCalsB = this.totalCalsB - Number(breakfast.caloriesB);
    }
    else {
      this.resetTotals();
    }
  }

  resetTotals() {
    this.totalC = 0;
    this.totalP = 0;
    this.totalG = 0;
    this.totalF = 0;
    this.totalS = 0;
    this.totalCalsB = 0;
  }

  totalCalsL: number = 0;
  caloriesPortionL: number = 0;
  caloriesFinalL: number = 0;

  totalLunchC: number = 0;
  carbsFinalL: number = 0;

  totalLunchP: number = 0;
  proteinsFinalL: number = 0;

  totalLunchG: number = 0;
  fatsFinalL: number = 0;

  totalLunchS: number = 0;
  sugarsFinalL: number = 0;

  totalLunchF: number = 0;
  fibersFinalL: number = 0;

  addLunch(food: Food) {

    if (this.day == '') {
      alert('Pick a date.');
      return;
    } else if (this.servings == '') {
      alert('Write number of servings.');
      return;
    } else {
      this.lunchObj.id = '';
      this.lunchObj.emailL = this.active_user;
      this.lunchObj.dayL = this.day;
      this.lunchObj.food_nameL = food.food_name;

      this.caloriesPortionL = (Number(food.calories) * Number(this.servings)) / 100;
      this.caloriesFinalL = Math.round((this.caloriesPortionL + Number.EPSILON) * 100) / 100;
      this.lunchObj.caloriesL = this.caloriesFinalL.toString(10);

      this.lunchObj.cantityL = this.servings;
      this.lunchObj.unitsL = food.units;

      this.carbsFinalL = (Number(food.carbs) * Number(this.servings)) / 100;
      this.carbsFinalL = Math.round((this.carbsFinalL + Number.EPSILON) * 100) / 100;
      this.lunchObj.carbsL = this.carbsFinalL.toString(10);


      this.fatsFinalL = (Number(food.fat) * Number(this.servings)) / 100;
      this.fatsFinalL = Math.round((this.fatsFinalL + Number.EPSILON) * 100) / 100;
      this.lunchObj.fatL = this.fatsFinalL.toString(10);

      this.fibersFinalL = (Number(food.fiber) * Number(this.servings)) / 100;
      this.fibersFinalL = Math.round((this.fibersFinalL + Number.EPSILON) * 100) / 100;
      this.lunchObj.fiberL = this.fibersFinalL.toString(10);

      this.proteinsFinalL = (Number(food.protein) * Number(this.servings)) / 100;
      this.proteinsFinalL = Math.round((this.proteinsFinalL + Number.EPSILON) * 100) / 100;
      this.lunchObj.proteinL = this.proteinsFinalL.toString(10);

      this.sugarsFinalL = (Number(food.sugar) * Number(this.servings)) / 100;
      this.sugarsFinalL = Math.round((this.sugarsFinalL + Number.EPSILON) * 100) / 100;
      this.lunchObj.sugarL = this.sugarsFinalL.toString(10);

      this.totalLunchC = this.totalLunchC + this.carbsFinalL;
      this.lunchObj.totalCarbsL = this.totalLunchC.toString(10);

      this.totalLunchP = this.totalLunchP + this.proteinsFinalL;
      this.lunchObj.totalProteinL = this.totalLunchP.toString(10);

      this.totalLunchG = this.totalLunchG + this.fatsFinalL;
      this.lunchObj.totalFatsL = this.totalLunchG.toString(10);

      this.totalLunchF = this.totalLunchF + this.fibersFinalL;
      this.lunchObj.totalFiberL = this.totalLunchF.toString(10);

      this.totalLunchS = this.totalLunchS + this.sugarsFinalL;
      this.lunchObj.totalSugarL = this.totalLunchS.toString(10);

      this.totalCalsL = this.totalCalsL + this.caloriesFinalL;
      this.lunchObj.totalCalsLunch = this.totalCalsL.toString(10);

      this.data.addLunch(this.lunchObj);
    }
  }

  deleteLunch(lunch: Lunch) {
    if (window.confirm('Are you sure you want to delete ' + lunch.food_nameL + ' ?')) {
      this.data.deleteLunch(lunch);
    }
    this.calculateTotalsLunch(lunch);
    this.drawTotalLunch();
  }

  calculateTotalsLunch(lunch: Lunch) {
    if (this.totalLunchC != 0) {
      this.totalLunchC = this.totalLunchC - Number(lunch.carbsL);
    }
    if (this.totalLunchP != 0) {
      this.totalLunchP = this.totalLunchP - Number(lunch.proteinL);
    }
    if (this.totalLunchG != 0) {
      this.totalLunchG = this.totalLunchG - Number(lunch.fatL);
    }
    if (this.totalLunchF != 0) {
      this.totalLunchF = this.totalLunchF - Number(lunch.fiberL);
    }
    if (this.totalLunchS != 0) {
      this.totalLunchS = this.totalLunchS - Number(lunch.sugarL);
    }
    if (this.totalCalsL != 0) {
      this.totalCalsL = this.totalCalsL - Number(lunch.caloriesL);
    }
    else {
      this.resetTotalsLunch();
    }
  }

  resetTotalsLunch() {
    this.totalLunchC = 0;
    this.totalLunchP = 0;
    this.totalLunchF = 0;
    this.totalLunchG = 0;
    this.totalLunchS = 0;
    this.totalCalsL = 0;
  }


  totalCalsD: number = 0;
  caloriesPortionD: number = 0;
  caloriesFinalD: number = 0;

  totalDinnerC: number = 0;
  carbsFinalD: number = 0;

  totalDinnerP: number = 0;
  proteinsFinalD: number = 0;

  totalDinnerG: number = 0;
  fatsFinalD: number = 0;

  totalDinnerS: number = 0;
  sugarsFinalD: number = 0;

  totalDinnerF: number = 0;
  fibersFinalD: number = 0;

  addDinner(food: Food) {

    if (this.day == '') {
      alert('Pick a date.');
      return;
    } else if (this.servings == '') {
      alert('Write number of servings.');
      return;
    } else {
      this.dinnerObj.id = '';
      this.dinnerObj.emailD = this.active_user;
      this.dinnerObj.dayD = this.day;
      this.dinnerObj.food_nameD = food.food_name;

      this.caloriesPortionD = (Number(food.calories) * Number(this.servings)) / 100;
      this.caloriesFinalD = Math.round((this.caloriesPortionD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.caloriesD = this.caloriesFinalD.toString(10);

      this.dinnerObj.cantityD = this.servings;
      this.dinnerObj.unitsD = food.units;

      this.carbsFinalD = (Number(food.carbs) * Number(this.servings)) / 100;
      this.carbsFinalD = Math.round((this.carbsFinalD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.carbsD = this.carbsFinalD.toString(10);


      this.fatsFinalD = (Number(food.fat) * Number(this.servings)) / 100;
      this.fatsFinalD = Math.round((this.fatsFinalD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.fatD = this.fatsFinalD.toString(10);

      this.fibersFinalD = (Number(food.fiber) * Number(this.servings)) / 100;
      this.fibersFinalD = Math.round((this.fibersFinalD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.fiberD = this.fibersFinalD.toString(10);

      this.proteinsFinalD = (Number(food.protein) * Number(this.servings)) / 100;
      this.proteinsFinalD = Math.round((this.proteinsFinalD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.proteinD = this.proteinsFinalD.toString(10);

      this.sugarsFinalD = (Number(food.sugar) * Number(this.servings)) / 100;
      this.sugarsFinalD = Math.round((this.sugarsFinalD + Number.EPSILON) * 100) / 100;
      this.dinnerObj.sugarD = this.sugarsFinalD.toString(10);

      this.totalDinnerC = this.totalDinnerC + this.carbsFinalD;
      this.dinnerObj.totalCarbsD = this.totalDinnerC.toString(10);

      this.totalDinnerP = this.totalDinnerP + this.proteinsFinalD;
      this.dinnerObj.totalProteinD = this.totalDinnerP.toString(10);

      this.totalDinnerG = this.totalDinnerG + this.fatsFinalD;
      this.dinnerObj.totalFatsD = this.totalDinnerG.toString(10);

      this.totalDinnerF = this.totalDinnerF + this.fibersFinalD;
      this.dinnerObj.totalFiberD = this.totalDinnerF.toString(10);

      this.totalDinnerS = this.totalDinnerS + this.sugarsFinalD;
      this.dinnerObj.totalSugarD = this.totalDinnerS.toString(10);

      this.totalCalsD = this.totalCalsD + this.caloriesFinalD;
      this.dinnerObj.totalCalsDinner = this.totalCalsD.toString(10);

      this.data.addDinner(this.dinnerObj);
    }
  }

  deleteDinner(dinner: Dinner) {
    if (window.confirm('Are you sure you want to delete ' + dinner.food_nameD + ' ?')) {
      this.data.deleteDinner(dinner);
    }
    this.calculateTotalsDinner(dinner);
    this.drawTotalDinner();
  }

  calculateTotalsDinner(dinner: Dinner) {
    if (this.totalDinnerC != 0) {
      this.totalDinnerC = this.totalDinnerC - Number(dinner.carbsD);
    }
    if (this.totalDinnerP != 0) {
      this.totalDinnerP = this.totalDinnerP - Number(dinner.proteinD);
    }
    if (this.totalDinnerG != 0) {
      this.totalDinnerG = this.totalDinnerG - Number(dinner.fatD);
    }
    if (this.totalDinnerF != 0) {
      this.totalDinnerF = this.totalDinnerF - Number(dinner.fiberD);
    }
    if (this.totalDinnerS != 0) {
      this.totalDinnerS = this.totalDinnerS - Number(dinner.sugarD);
    }
    if (this.totalCalsD != 0) {
      this.totalCalsD = this.totalCalsD - Number(dinner.caloriesD);
    }
    else {
      this.resetTotalsDinner();
    }
  }

  resetTotalsDinner() {
    this.totalDinnerC = 0;
    this.totalDinnerP = 0;
    this.totalDinnerF = 0;
    this.totalDinnerG = 0;
    this.totalDinnerS = 0;
    this.totalCalsD = 0;
  }

  totalCalsS: number = 0;
  caloriesPortionS: number = 0;
  caloriesFinalS: number = 0;

  totalSnackC: number = 0;
  carbsFinalS: number = 0;

  totalSnackP: number = 0;
  proteinsFinalS: number = 0;

  totalSnackG: number = 0;
  fatsFinalS: number = 0;

  totalSnackS: number = 0;
  sugarsFinalS: number = 0;

  totalSnackF: number = 0;
  fibersFinalS: number = 0;

  addSnack(food: Food) {

    if (this.day == '') {
      alert('Pick a date.');
      return;
    } else if (this.servings == '') {
      alert('Write number of servings.');
      return;
    } else {
      this.snackObj.id = '';
      this.snackObj.emailS = this.active_user;
      this.snackObj.dayS = this.day;
      this.snackObj.food_nameS = food.food_name;

      this.caloriesPortionS = (Number(food.calories) * Number(this.servings)) / 100;
      this.caloriesFinalS = Math.round((this.caloriesPortionS + Number.EPSILON) * 100) / 100;
      this.snackObj.caloriesS = this.caloriesFinalS.toString(10);

      this.snackObj.cantityS = this.servings;
      this.snackObj.unitsS = food.units;

      this.carbsFinalS = (Number(food.carbs) * Number(this.servings)) / 100;
      this.carbsFinalS = Math.round((this.carbsFinalS + Number.EPSILON) * 100) / 100;
      this.snackObj.carbsS = this.carbsFinalS.toString(10);


      this.fatsFinalS = (Number(food.fat) * Number(this.servings)) / 100;
      this.fatsFinalS = Math.round((this.fatsFinalS + Number.EPSILON) * 100) / 100;
      this.snackObj.fatS = this.fatsFinalS.toString(10);

      this.fibersFinalS = (Number(food.fiber) * Number(this.servings)) / 100;
      this.fibersFinalS = Math.round((this.fibersFinalS + Number.EPSILON) * 100) / 100;
      this.snackObj.fiberS = this.fibersFinalS.toString(10);

      this.proteinsFinalS = (Number(food.protein) * Number(this.servings)) / 100;
      this.proteinsFinalS = Math.round((this.proteinsFinalS + Number.EPSILON) * 100) / 100;
      this.snackObj.proteinS = this.proteinsFinalS.toString(10);

      this.sugarsFinalS = (Number(food.sugar) * Number(this.servings)) / 100;
      this.sugarsFinalS = Math.round((this.sugarsFinalS + Number.EPSILON) * 100) / 100;
      this.snackObj.sugarS = this.sugarsFinalS.toString(10);

      this.totalSnackC = this.totalSnackC + this.carbsFinalS;
      this.snackObj.totalCarbsS = this.totalSnackC.toString(10);

      this.totalSnackP = this.totalSnackP + this.proteinsFinalS;
      this.snackObj.totalProteinS = this.totalSnackP.toString(10);

      this.totalSnackG = this.totalSnackG + this.fatsFinalS;
      this.snackObj.totalFatsS = this.totalSnackG.toString(10);

      this.totalSnackF = this.totalSnackF + this.fibersFinalS;
      this.snackObj.totalFiberS = this.totalSnackF.toString(10);

      this.totalSnackS = this.totalSnackS + this.sugarsFinalS;
      this.snackObj.totalSugarS = this.totalSnackS.toString(10);

      this.totalCalsS = this.totalCalsS + this.caloriesFinalS;
      this.snackObj.totalCalsSnacks = this.totalCalsS.toString(10);

      this.data.addSnack(this.snackObj);
    }
  }

  deleteSnack(snack: Snack) {
    if (window.confirm('Are you sure you want to delete ' + snack.food_nameS + ' ?')) {
      this.data.deleteSnack(snack);
    }
    this.calculateTotalsSnack(snack);
    this.drawTotalSnacks();
  }

  calculateTotalsSnack(snack: Snack) {
    if (this.totalSnackC != 0) {
      this.totalSnackC = this.totalSnackC - Number(snack.carbsS);
    }
    if (this.totalSnackP != 0) {
      this.totalSnackP = this.totalSnackP - Number(snack.proteinS);
    }
    if (this.totalSnackG != 0) {
      this.totalSnackG = this.totalSnackG - Number(snack.fatS);
    }
    if (this.totalSnackF != 0) {
      this.totalSnackF = this.totalSnackF - Number(snack.fiberS);
    }
    if (this.totalSnackS != 0) {
      this.totalSnackS = this.totalSnackS - Number(snack.sugarS);
    }
    if (this.totalCalsS != 0) {
      this.totalCalsS = this.totalCalsS - Number(snack.caloriesS);
    }
    else {
      this.resetTotalsSnacks();
    }
  }

  resetTotalsSnacks() {
    this.totalSnackC = 0;
    this.totalSnackP = 0;
    this.totalSnackF = 0;
    this.totalSnackG = 0;
    this.totalSnackS = 0;
    this.totalCalsS = 0;
  }

  drawTotalBreakfast() {
    this.piechartB = {
      labels: ['carbohydrate', 'fat', 'protein', 'fiber', 'sugar', 'calories'],
      datasets: [
        {
          data: [this.totalC, this.totalG, this.totalP, this.totalF, this.totalS, this.totalCalsB],
          backgroundColor: [
            "#FFEEF2",
            "#FFE4F3",
            "#FFC8FB",
            "#FF92C2",
            "#e04fb3"

          ],
          hoverBackgroundColor: [
            "#FFEEF2",
            "#FFE4F3",
            "#FFC8FB",
            "#FF92C2",
            "#e04fb3"
          ]
        }
      ]
    };

  }

  drawTotalLunch() {
    this.piechartL = {
      labels: ['carbohydrate', 'fat', 'protein', 'fiber', 'sugar', 'calories'],
      datasets: [
        {
          data: [this.totalLunchC, this.totalLunchG, this.totalLunchP, this.totalLunchF, this.totalLunchS, this.totalCalsL],
          backgroundColor: [
            "#D94496",
            "#F47DBB",
            "#FF99CC",
            "#FFB6D5",
            "#F741A8"

          ],
          hoverBackgroundColor: [
            "#D94496",
            "#F47DBB",
            "#FF99CC",
            "#FFB6D5",
            "#F741A8"
          ]
        }
      ]
    };

  }

  drawTotalDinner() {
    this.piechartD = {
      labels: ['carbohydrate', 'fat', 'protein', 'fiber', 'sugar', 'calories'],
      datasets: [
        {
          data: [this.totalDinnerC, this.totalDinnerG, this.totalDinnerP, this.totalDinnerF, this.totalDinnerS, this.totalCalsD],
          backgroundColor: [
            "#FE5FCE",
            "#ea94bd",
            "#f8d1ee",
            "#FFB6D5",
            "#f7b9de"

          ],
          hoverBackgroundColor: [
            "#FE5FCE",
            "#ea94bd",
            "#f8d1ee",
            "#FFB6D5",
            "#f7b9de"
          ]
        }
      ]
    };

  }

  drawTotalSnacks() {
    this.piechartS = {
      labels: ['carbohydrate', 'fat', 'protein', 'fiber', 'sugar', 'calories'],
      datasets: [
        {
          data: [this.totalSnackC, this.totalSnackG, this.totalSnackP, this.totalSnackF, this.totalSnackS, this.totalCalsS],
          backgroundColor: [
            "#edcddc",
            "#e3678c",
            "#f8d1ee",
            "#FFB6D5",
            "#ee8bad"

          ],
          hoverBackgroundColor: [
            "#edcddc",
            "#e3678c",
            "#f8d1ee",
            "#FFB6D5",
            "#ee8bad"
          ]
        }
      ]
    };

  }
}

