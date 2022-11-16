import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  }]
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChildren('stepperIcon') 
  private matStepperIconViewChildren: { toArray: () => any[]; } | undefined;
  id:number = 0;

  user:any = null;

  matStepperIcons: any[] | undefined;

  ngAfterViewInit(): void {
    if(this.matStepperIconViewChildren !== undefined) {
      this.matStepperIcons = this.matStepperIconViewChildren.toArray();
    }
    
  }
  constructor() {}
  ngOnInit(): void {
    let date: Date = new Date();
    let id:string = ""+ date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds()+(Math.floor(Math.random() * (9999-1000))+1000);
    this.id = parseInt(id);
    sessionStorage.setItem("sessionId", ""+this.id)
    console.log(sessionStorage.getItem("sessionId"));
  }
}
