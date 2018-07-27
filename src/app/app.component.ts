import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { BarObj } from './Bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  bars: BarObj = {
    buttons: Array<number>(),
    bars: Array<number>(),
    limit: 0
  };
  barLimit: number = 0;
  selectedBar: number = 0;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getBars()
  }
  getBars(): void {
    this.appService.getBarsApi()
      .subscribe(bar => {
        this.bars = bar;
        this.barLimit = bar.limit
      })
  }

  onBarSelected(barNumber: number): void {
    this.selectedBar = barNumber;
  }

  onCLickEditProgress(value: number): void {
    let currValue = this.bars.bars[this.selectedBar];
    if((currValue + value)<=0){
      this.bars.bars[this.selectedBar] = 0
    } else if (this.bars.bars[this.selectedBar] > 0) {
      this.bars.bars[this.selectedBar] += value;
    } else if (this.bars.bars[this.selectedBar] <= 0 && value > 0) {
      this.bars.bars[this.selectedBar] += value;
    }
  }
}
