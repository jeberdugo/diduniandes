import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Iden3ServiceService {

  url = '';
  constructor(private http: HttpClient) { }

  getQrCuentaAhorro(){
    this.http.get(this.url + 'initTarjetaCredito' ).subscribe(data => {
      console.log(data);
    });
  }
  getQrTarjetaCredito(){
    this.http.get('https://reqres.in/api/users?page=2').subscribe(data => {
      console.log(data);
    });
  }
  getQrFondoInversion(){
    this.http.get('https://reqres.in/api/users?page=2').subscribe(data => {
      console.log(data);
    });
  }
}
