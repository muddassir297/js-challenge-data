import { Component, OnInit,Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { CommonServiceService } from '../services/common-service.service';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css']
})
export class ModalformComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @Output() modalformData = new EventEmitter();
  @Input() customerFormData;
  private setUrl;
  private response;
  
  constructor(private _httpService: HttpServiceService, private _commonService: CommonServiceService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.customerFormData.birthday = this.changeISOString(this.customerFormData.birthday);
    this.customerFormData.lastContact = this.changeISOString(this.customerFormData.lastContact);
    console.log(this.customerFormData);
    
    if (this.customerFormData.customerID){
      this.updateCustomerData();
    }else{
      this.createCustomerData();
    }
  }

  updateCustomerData(){
    this.setUrl = `/customer/${this.customerFormData.customerID}`
    this._httpService.updateData(this.setUrl, JSON.stringify(this.customerFormData))
    .subscribe(
    response=> { this.response = response
      this.customerFormData = this.response.data;
      this.modalformData.emit(this.customerFormData);
      console.log(this.response.data)
      this.closebutton.nativeElement.click();  
      this.customerFormData = this._commonService.resetFormaData();      
    },
    error =>console.log('Error!', error)
    );
  }

  createCustomerData(){
    this.setUrl = "/add"
    this._httpService.postData(this.setUrl, JSON.stringify(this.customerFormData))
    .subscribe(
    response=> { this.response = response
      this.customerFormData = this.response.data;
      this.modalformData.emit(this.customerFormData);
      console.log(this.response.data)
      this.closebutton.nativeElement.click();  
      this.customerFormData = this._commonService.resetFormaData();      
    },
    error =>console.log('Error!', error)
    );
  }
  
  changeISOString(dateobj){
    if (dateobj){
      let bd = new Date(dateobj['year']+'-'+dateobj['month']+'-'+dateobj['day']).toISOString();
      dateobj = bd;
    }else{
      dateobj = '';
    }
    return dateobj;
  }
}
