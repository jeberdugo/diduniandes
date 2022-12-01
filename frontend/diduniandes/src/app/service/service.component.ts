import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { take, takeUntil, tap, map } from 'rxjs';
import { interval, Subscription} from 'rxjs';
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
   mySubscription: Subscription;
   reqState = 0;
   stepperState:number = 1;
   public qrdata: string = "";
   proxyHeroku = "https://radiant-harbor-95836.herokuapp.com/"
   base_url = this.proxyHeroku+'https://610a-186-84-135-86.ngrok.io';
   sessionId = "-1";
   completed: boolean = true;
   completed2: boolean = true;


  constructor(
    private http: HttpClient 
  ) { this.mySubscription = interval(2000).subscribe((x =>{
    this.getRequestState();
})); }

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
    this.http.get<any>( '/api/sign-in', {params: {caseOfUse}}).pipe(
      take(1),
      map((response) => {
        let url = JSON.stringify(response.body.callbackUrl).split('=')[1];
        if(url !== undefined || url !== null){
          this.sessionId = url.substring(0, url.length-1);
        }

        
        this.qrdata = JSON.stringify(response);
        this.completed = true;
        
        
      })
    ).subscribe();
  }

  getRequestState() {
    if(this.sessionId != null){
    
    this.http.get<any>( '/api/requestStatus/'+this.sessionId).pipe(
      take(1),
      map((response) => {
        //this.stepperState++;
        this.reqState = response.state
        if(this.reqState === 2){
          this.stepperState==2;
        }

      })
    ).subscribe();
    }
  }
}
