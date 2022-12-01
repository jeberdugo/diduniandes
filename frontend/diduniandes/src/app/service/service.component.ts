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
   base_url = 'https://21ea-2803-1800-1106-198b-ec1e-5f03-6e3c-51b3.ngrok.io';
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
    if(this.stateServ === 'cuentaAhorros2'){
      this.createDataService('crearCuentaAhorros');
    }
  }

  async createDataService(caseOfUse: string) {
    this.completed = false;
    console.log( '/api/sign-in');
<<<<<<< HEAD
    this.http.get<any>(this.base_url + '/api/sign-in', {params: {caseOfUse}}).pipe(
=======
    this.http.get<any>( '/api/sign-in', {params: {caseOfUse}}).pipe(
>>>>>>> 4f883bc731d44b1eca119979f2582418db4bc980
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
