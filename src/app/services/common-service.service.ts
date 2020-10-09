import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public customerFormData ={
    fname:'',
    lname:'',
    gender:'',
    birtdate:'',
    lastContact:'',
    customerLifetimeValue:''
  }
  constructor() { }

  resetFormaData(){
    return this.customerFormData;
  }
}
