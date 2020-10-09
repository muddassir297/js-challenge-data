import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { CommonServiceService } from '../services/common-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public customer;
  public customer_id;
  private setUrl;
  private customerData;
  private newdate;
  public customerFormData ={
    fname:'',
    lname:'',
    gender:'',
    birtdate:'',
    lastContact:'',
    customerLifetimeValue:''
  }
  constructor(private _httpService: HttpServiceService, private _commonService: CommonServiceService, 
    private route: ActivatedRoute,private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.customer_id = params.get('id');
      this.getCustomerById(this.customer_id);
    });
  }

  getCustomerById(id){
    this.setUrl = `/customer/${id}`;
    this._httpService.getData(this.setUrl)
      .subscribe(customerData => {this.customerData = customerData
        this.customer = this.customerData.data;
        this.customerFormData = this.customer;
        console.log(this.customer);
      });
  }
  
  getFormatDate(ndate, format){
    if (ndate && typeof ndate === 'object' && ndate.constructor === Object){
      return ndate='';
    }else{
      this.newdate = new Date(ndate);
      return this.datepipe.transform(this.newdate, format);
    }
  }

  getGender(gender){
    switch (gender) {
      case 'm':
        gender='Male'      
        break;
      case 'w':
        gender='Female'      
        break;
      default:
        gender='';
        break;
    }
    return gender; 
  }  
}
