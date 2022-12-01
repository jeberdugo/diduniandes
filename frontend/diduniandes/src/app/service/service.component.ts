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
   base_url = this.proxyHeroku+
   'https://21ea-2803-1800-1106-198b-ec1e-5f03-6e3c-51b3.ngrok.io';
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
    this.http.get<any>(this.base_url + '/api/sign-in', {params: {caseOfUse}}).pipe(
      take(1),
      map((response) => {
        try{
          console.log(response);
          const data = response.clone();
          console.log(data);
          this.qrdata = JSON.stringify(data);
          console.log(this.qrdata);
          this.completed = true;
        }catch(error){
          console.log('Error parsing JSON: ', error);
        }
      })
    ).subscribe();
  }
}
