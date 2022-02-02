import { Component, OnInit } from '@angular/core';
import { TemperatureService, Temperature } from '../temperature.service';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})
export class TemperatureGraphComponent implements OnInit {

  temperatures: Temperature[] = [];
  timestamps: Date[] = [];
  tempVals: number[] = [];

  public graph = {
    data: [{}],
    layout: {},
  };

  constructor(private db: TemperatureService) { }

  ngOnInit(): void {
    this.db.getAllTemps().subscribe((temps) => {
      this.temperatures = temps;
      this.timestamps = temps.map(tempDoc => tempDoc.timestamp.toDate());
      this.tempVals = temps.map(tempDoc => tempDoc.temperature);
      console.log(this.timestamps);

      this.graph = {
          data: [
            { x: this.timestamps, y: this.tempVals, type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
          ],
          layout: {width: 320, height: 240, title: 'A Fancy Plot'}
        };

    }
    );
  }

}
