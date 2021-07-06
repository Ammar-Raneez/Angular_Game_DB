import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public gameRating : number;

  constructor() {
    this.gameRating = 0;
  }

  ngOnInit(): void {
  }

  getColor(value : number) : string {
    if (value > 75) {
      return '#5EE432';
    } else if (value > 50) {
      return '#FFFA50';
    } else if (value > 30) {
      return '#F7AA38'; 
    }
    return '#EF4655';
  }
}
