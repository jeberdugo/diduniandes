import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
   stateServ = 'list';
   @Input()
   user:any;
   stepperState:number = 1;
   public qrdata: string = "";

  constructor() { }

  ngOnInit(): void {
    this.qrdata = 'Initial QR code data string';
  }

  changeStepperState(state: number) {
    this.stepperState = state;
  }

  changeStateServ(state: string) {
    this.stateServ = state;
  }

}
