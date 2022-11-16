import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = null;
  userSel = 'list'
  @Output()
  propagar = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeStateUser(state: string) {
    if(this.user !== null) {
      this.userSel = state;
    }

  }
  continue() {
    if(this.user !== null) {
      if(this.user === 1){
        this.propagar.emit('Juan');
      }
      if(this.user === 2){
        this.propagar.emit('Claudia');
      }
      if(this.user === 3){
        this.propagar.emit('Roberto');
      }
    }
    
  }

  changeUser(user: any) {
    this.user = user;
  }

}
