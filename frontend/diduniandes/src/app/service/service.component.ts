import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { take, takeUntil, tap, map } from 'rxjs';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
   stateServ = 'list';
   @Input()
   user:any;
   infoqr: any;
   stepperState:number = 1;
   public qrdata: string = "";
   proxyHeroku = "https://radiant-harbor-95836.herokuapp.com/"
   base_url = 'localhost:8080';
   completed: boolean = true;

  constructor(
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.qrdata = 'Initial QR code data string';
   }

  changeStepperState(state: number) {
    this.stepperState = state;
  }

  changeStateServ(state: string) {
    this.stateServ = state;
  }

  async createDataService(caseOfUse: string) {
    this.completed = false;
    console.log( '/api/sign-in');
    this.http.get<any>('https://896d-186-154-33-227.ngrok.io' + '/api/sign-in', {params: {caseOfUse}}).pipe(
      take(1),
      map((response) => {
        console.log(response);
        this.qrdata = JSON.stringify(response);
        console.log(this.qrdata);
        this.completed = true;
      })
    ).subscribe();
  }
}
