import { Component, OnInit } from '@angular/core';
import { TemperatureService, Temperature } from './temperature.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'soda-pop-web';

  temperatures: Temperature[];

  constructor(private db: TemperatureService) { }

  ngOnInit(): void {
    this.db.getAllTemps().subscribe(temps => this.temperatures = temps);
    console.log(this.temperatures)
  }

}
