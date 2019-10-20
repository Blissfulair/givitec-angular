import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Service } from 'src/app/service.interface';
import { TransactionService } from 'src/app/transaction.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  lists: Service[]=[];
  list:number;
  features=false;
  additions:[];
  add:boolean = false;
  total:number= 0.00;
  selected:number;
  selectedDisplay ='';
  additionals =[];
  messages = false;
  message ='';
  details = true;
  paystack = false;
  button = true;
  transactionRef = '';
  email = '';
  amount:number;
  key = this.trans.key;

  form:any;



  constructor(private service: ServiceService, private trans: TransactionService) {
 
   }

  ngOnInit() {
    this.form = this.trans.form
    this.services();
  }

  packages(){
    this.service.getServices(this.list).subscribe((data)=>{
      this.lists = data['services'];
    })
  }
  services(){
    this.service.getService('web').subscribe((data)=>{
      this.list = data['services'].id;
      this.packages();
      //this.additionalFeatures(this.list);
    })
  }

  //nested component function to get details and paystack values from ServicesComponent
  onChangeDetails(e:boolean){
   this.details = e;
   this.paystack =!e;
  }

  //Fetch package features
    additionalFeatures(id){
      this.service.getAdditionFeatures(id).subscribe((data)=>{
        this.additions = data['lists'];
        this.paystack= false;
        this.details = true;
        this.additionals = [];
        this.total = 0;
        if(this.additions.length > 0)
          this.features = true;
        else 
          this.features = false;
        let obj = this.lists.find(o => o.id == id);
        this.selected = obj.id;
        this.selectedDisplay = obj.name + " Package @ N";
    })
  }

  //Add additional features value
  getAddedValue(e){
    let test =this.additions.filter((data:[])=>data['name'].includes(e.parentNode.innerText.replace(':', '').split(' ')[0]))
      if(e.checked)
     {
      this.total += Number(e.value);
      this.additionals.push(test[0]['id']); 
     }
      else
      {
        this.total -= Number(e.value);

        this.additionals.splice(this.additionals.indexOf(test[0]['id']), 1)
      }
  }
}
