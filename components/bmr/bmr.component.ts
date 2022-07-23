import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { BmrService } from 'src/app/services/bmr.service';
import { ProfileUser } from 'src/app/models/user-profile';
import { Bmr } from 'src/app/models/bmr';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent implements OnInit {

  usersList: ProfileUser[] = [];
  bmrList: Bmr[] = [];

  bmrObj: Bmr = {
    id: '',
    email: '',
    gender: '',
    weight: '',
    height: '',
    age: '',
    activity_level: '',
    kcals: '',
    carbohydrates: '',
    fats: '',
    proteins: ''
  }

  id: string = '';
  email: string = '';
  gender: string = '';
  weight: string = '';
  height: string = '';
  age: string = '';
  activity_level: string = '';
  kcals: string = '';
  carbohydrates: string = '';
  fats: string = '';
  proteins: string = '';

  piechart: any;
  piechartK: any;
  active: number | undefined;
  carbsK: string | undefined;
  fatsK: string | undefined;
  proteinsK: string | undefined;
  constructor(private auth: AuthenticationService, private data: BmrService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getAllBmr();
  }

  getAllBmr() {

    this.data.getAllBmr().subscribe(res => {

      this.bmrList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.email = e.payload.doc.email;
        return data;
      })

    }, err => {
      alert('Error while fetching bmr data.');
    })

  }

  resetForm() {
    this.id = '';
    this.email = '';
    this.gender = '';
    this.weight = '';
    this.height = '';
    this.age = '';
    this.activity_level = '';
    this.kcals = '';
    this.carbohydrates = '';
    this.fats = '';
    this.proteins = '';
  }

  addBmr() {
    if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '' || this.activity_level == '') {
      alert('Fill all input fields.');
      return;
    }

    this.bmrObj.id = '';
    this.bmrObj.email = '';
    this.bmrObj.gender = this.gender;
    this.bmrObj.weight = this.weight;
    this.bmrObj.height = this.height;
    this.bmrObj.age = this.age;
    this.bmrObj.activity_level = this.activity_level;
    this.bmrObj.kcals = '';
    this.bmrObj.carbohydrates = '';
    this.bmrObj.fats = '';
    this.bmrObj.proteins = '';

    this.data.addBmr(this.bmrObj);
    this.resetForm();

  }

  updateBmr(bmr: Bmr) {
    if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '' || this.activity_level == '') {
      alert('Fill all input fields.');
      return;
    }
    this.data.deleteBmr(bmr);

    this.bmrObj.id = '';
    this.bmrObj.email = this.email;
    this.bmrObj.gender = this.gender;
    this.bmrObj.weight = this.weight;
    this.bmrObj.height = this.height;
    this.bmrObj.age = this.age;
    this.bmrObj.activity_level = this.activity_level;
    this.bmrObj.kcals = this.kcals;
    this.bmrObj.carbohydrates = this.carbohydrates;
    this.bmrObj.fats = this.fats;
    this.bmrObj.proteins = this.proteins;

    this.data.addBmr(this.bmrObj);
    this.resetForm();
  }

  deleteBmr(bmr: Bmr) {
    if (window.confirm('Are you sure you want to delete ' + bmr.id + ' ?')) {
      this.data.deleteBmr(bmr);
    }
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  calculateBMR() {
    if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '') {
      alert('Fill all input fields.');
      return;
    }
    var varsta = Number(this.age);
    var inaltime = Number(this.height);
    var greutate = Number(this.weight);

    let calories = 0;
    if (this.gender == 'Female') {
      //females =  655.09 + 9.56 x (Weight in kg) + 1.84 x (Height in cm) - 4.67 x age
      calories = 655.09 + (9.56 * greutate) + (1.84 * inaltime) - (4.67 * varsta);
    }
    else {
      calories = 66.47 + (13.75 * greutate) + (5 * inaltime) - (6.75 * varsta);
    }

    calories = Math.round((calories + Number.EPSILON) * 100) / 100;
    this.kcals = String(calories);
    console.log(this.kcals);
  }

  calculateActivityLevel() {
    if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '') {
      alert('Fill all input fields.');
      return;
    }
    var varsta = Number(this.age);
    var inaltime = Number(this.height);
    var greutate = Number(this.weight);
    var nivel_activitate = Number(this.activity_level);
    let calories = 0;
    let caloriesA = 0;
    if (this.gender == 'Female') {
      //females =  655.09 + 9.56 x (Weight in kg) + 1.84 x (Height in cm) - 4.67 x age
      calories = 655.09 + (9.56 * greutate) + (1.84 * inaltime) - (4.67 * varsta);
      calories = Math.round((calories + Number.EPSILON) * 100) / 100;
      caloriesA = nivel_activitate * calories;
    }
    else {
      calories = 66.47 + (13.75 * greutate) + (5 * inaltime) - (6.75 * varsta);
      calories = Math.round((calories + Number.EPSILON) * 100) / 100;
      caloriesA = nivel_activitate * calories;
    }
    this.kcals = String(calories);
    caloriesA = Math.round((caloriesA + Number.EPSILON) * 100) / 100;
    this.active = caloriesA;

    console.log(this.active);
  }

  calculateCarbs() {
    var carbs1 = 0;
    //var carbs2 = 0;
    this.carbsK = (Math.round((((0.5 * Number(this.kcals)) + Number.EPSILON) * 100) / 100)).toString(10);
    carbs1 = 0.5 * Number(this.kcals) / 4;
    //carbs2 = 0.65 * this.bmr_rez / 4;
    carbs1 = Math.round((carbs1 + Number.EPSILON) * 100) / 100;
    //carbs2 = Math.round((carbs2 + Number.EPSILON) * 100) / 100;
    this.carbohydrates = carbs1.toString(10);// + ' - ' + carbs2.toString(10);
    console.log(this.carbohydrates);
  }

  calculateFats() {
    var fats1 = 0;
    //var fats2 = 0;
    this.fatsK = (Math.round((((0.3 * Number(this.kcals)) + Number.EPSILON) * 100) / 100)).toString(10);
    fats1 = 0.3 * Number(this.kcals) / 9;
    //fats2 = 0.35 * this.bmr_rez / 9;
    fats1 = Math.round((fats1 + Number.EPSILON) * 100) / 100;
    //fats2 = Math.round((fats2 + Number.EPSILON) * 100) / 100;
    this.fats = fats1.toString(10);// + ' - ' + fats2.toString(10);
    console.log(this.fats);
  }

  calculateProteins() {
    var protein1 = 0;
    //var protein2 = 0;
    this.proteinsK = (Math.round((((0.2 * Number(this.kcals)) + Number.EPSILON) * 100) / 100)).toString(10);
    protein1 = 0.2 * Number(this.kcals) / 4;
    //protein2 = 0.35 * this.bmr_rez / 4;
    protein1 = Math.round((protein1 + Number.EPSILON) * 100) / 100;
    //protein2 = Math.round((protein2 + Number.EPSILON) * 100) / 100;
    this.proteins = protein1.toString(10);//+ ' - ' + protein2.toString(10);
    console.log(this.proteins);
  }

  draw() {
    this.piechart = {
      labels: ['carbohydrates', 'fats', 'proteins'],
      datasets: [
        {
          data: [this.carbohydrates, this.fats, this.proteins],
          backgroundColor: [
            "#FFCE56",
            "#51d850",
            "#ff885d"
          ],
          hoverBackgroundColor: [
            "#FFCE56",
            "#51d850",
            "#ff885d"
          ]
        }
      ]
    };

  }

  drawKcals() {
    this.piechartK = {
      labels: ['Kcal~C', 'Kcal~F', 'Kcal~P'],
      datasets: [
        {
          data: [this.carbsK, this.fatsK, this.proteinsK],
          backgroundColor: [
            "#fbc983",
            "#aeed83",
            "#ff9e7d"
          ],
          hoverBackgroundColor: [
            "#fbc983",
            "#aeed83",
            "#ff9e7d"
          ]
        }
      ]
    };

  }

  async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {

      this.bmrObj.email = user.email;
      this.bmrObj.gender = this.gender;
      this.bmrObj.weight = this.weight;
      this.bmrObj.height = this.height;
      this.bmrObj.age = this.age;
      this.bmrObj.activity_level = this.activity_level;
      this.bmrObj.kcals = this.kcals;
      this.bmrObj.carbohydrates = this.carbohydrates;
      this.bmrObj.fats = this.fats;
      this.bmrObj.proteins = this.proteins;

      this.data.addBmr(this.bmrObj);

      //console.log(user.email);
    } else {
      // do something else
    }
  }

  resetFormular() {
    this.resetForm();
  }

}
