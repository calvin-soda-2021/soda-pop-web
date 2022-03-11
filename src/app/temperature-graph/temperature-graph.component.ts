import { Component, OnInit } from '@angular/core';
import { TemperatureService, Temperature } from '../services/temperature.service';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {DocumentChangeAction} from '@angular/fire/firestore';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})
export class TemperatureGraphComponent implements OnInit {

  temperatures: DocumentChangeAction<any>[] = [];
  timestamps: Date[] = [];
  tempVals: number[] = [];

  public graph = {
    data: [{}],
    layout: {},
    config: {}
  };

  constructor(private db: TemperatureService) { }

  ngOnInit(): void {
    this.db.getTemps().subscribe((temps) => {
      for (const doc of temps ) {
        try {
          // @ts-ignore
          const temp = doc.payload.doc.data().timestamp.seconds;
        } catch (err) {
          console.log(doc.payload.doc.id);
        }
      }
      this.temperatures = temps.sort((a, b) => {
        // @ts-ignore
        return a.payload.doc.data().timestamp - b.payload.doc.data().timestamp;
      });
      // @ts-ignore
      this.timestamps = this.temperatures.map(tempDoc => tempDoc.payload.doc.data().timestamp.toDate());
      // @ts-ignore
      this.tempVals = this.temperatures.map(tempDoc => tempDoc.payload.doc.data().temperature);

      // const dates = this.timestamps.map(timestamp => timestamp.seconds);
      // console.log(this.temperatures[0].payload.doc.data().timestamp.toDate());

      this.graph = {
          data: [
            { x: this.timestamps, y: this.tempVals, type: 'scatter', mode: 'lines', marker: {color: 'red'} },
          ],
          layout: {autosize: true, title: 'Pop Machine Temperature'},
          config: {responsive: true}
        };

    }
    );
  }

}
