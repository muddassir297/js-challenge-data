import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { CommonServiceService } from '../services/common-service.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private setUrl;
  private customerData;
  public customers;
  private customer_id;
  @ViewChild('confirmModal') confirmModal;
  public customerFormData ={
    fname:'',
    lname:'',
    gender:'',
    birtdate:'',
    lastContact:'',
    customerLifetimeValue:''
  }
  constructor(private _httpService: HttpServiceService, private _commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.setUrl = "/customers";
    this._httpService.getData(this.setUrl) 
      .subscribe(customerData => {this.customerData = customerData
        this.customers = this.customerData.data
        console.log(this.customers);
      });
  }

  getCustomerById(id){
    this.setUrl = `/customer/${id}`;
    this._httpService.getData(this.setUrl)
      .subscribe(customerData => {this.customerData = customerData
        this.customerFormData = this.customerData.data;
        //console.log(this.customerData.data);
      });
  }

  deleteCustomer(){
    console.log(this.customer_id);
    this.setUrl = `/customer/${this.customer_id}`;
    this._httpService.delete(this.setUrl) 
      .subscribe(customerData => {this.customerData = customerData
        this.customers = this.customerData.data
        this.confirmModal.nativeElement.click();
        console.log(this.customers);
      });
  }

  receivedFormData(p) {
    this.customers = p;
  }
  getCustomerId(id){
    this.customer_id = id;
  }  
  resetForm(){
    this._commonService.resetFormaData();
  }

}
