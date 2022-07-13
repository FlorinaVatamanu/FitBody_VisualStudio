import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { Breakfast } from 'src/app/models/breakfast';
import { Lunch } from 'src/app/models/lunch';
import { Dinner } from'src/app/models/dinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  piechartB: any;

  constructor() { }

  ngOnInit(): void {
  }

  drawTotalBreakfast() {
    this.piechartB = {
      labels: ['carbohydrate', 'fat', 'protein', 'fiber', 'sugar', 'calories'],
      datasets: [
        {
          data: [100, 30, 45, 67, 78, 79],
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
}
