import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/sharing/global.service';
import { FormControl,FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  addcustomerform: FormGroup;
  user_id: any;
  leadstatusList: any;
  subvchtype: any;
  subvchtyperate: any;
  fname:string;
  total:any;

  rate:string;
  time:string;
  interval: number;
  totime:string;
  fromtime:string;
  timetotalid:any;
  getcustomerlist: any;
  geteditdatalist: any;
  customer_id: any;
  customer_name: any;
  cust_email: any;
  phno: any;
  address: any;
  vchtype: any;
  subvch?: any;


onKeyUp() {
 // var vt=this.time.replace(":",".");// appending the updated value to the variable
// this.total=parseFloat(this.rate) * parseFloat(this.time);
 //console.log(vt);
var ks:any=this.rate;
var vv=this.time;
 var ts:any[]= this.time.split(':');
 ts.reverse();
 var x = ts.length, y = 0,s=0,t=0, z;
 for (var i = 0; i < x; i++) {
     z =ts[i] * Math.pow(60, i);
     y += z;
     t=ks*y/60;
     this.total=Math.trunc(t);

 }
console.log(ks);
console.log(ts);
console.log(y);

}

//user_id: any;
//  constructor() { }
constructor(public formBuilder: FormBuilder,private globalService: GlobalService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((param: Params) => {
      let data = {

        customer_id: param.uid

      };
      let token = localStorage.getItem("user_token");

      this.globalService.postApi("get-cust-list",data,token).subscribe(
        RespData => {
          if (RespData.statusCode == 200) {
            let obj=RespData.respData[0];
            this.geteditdatalist = RespData.respData;
            this.customer_id=obj.customer_id
            this.customer_name=obj.customer_name
            this.cust_email=obj.cust_email
            this.phno=obj.phno
            this.rate=obj.rate
            this.address=obj.address
            this.vchtype=obj.vchtype

            this.subvch=obj.subvchtype
            this.total=obj.total
            this.time=obj.v_time



            console.log(this.subvch);
            console.log(RespData.respData)
          }
          else {
            // alert(RespData.statusMessage);
            console.log(RespData)
          }
        })
      //console.log(data);
    });


    this.addcustomerform = this.formBuilder.group({
      customer_name: ['', Validators.required],
      phno: ['', Validators.required],
      cust_email: ['', Validators.required],

      vchtype: ['', Validators.required],
      subvchtype: ['', Validators.required],
      address: ['', Validators.required],
      time: ['', Validators.required],
      rate: ['', Validators.required],
      total: ['', Validators.required],
      fromtime:[''],
      totime: [],
      timetotalid: []





    });



    let token = localStorage.getItem("user_token");
  this.globalService.getApi("user/get-vchtype-list",token).subscribe(
    RespData => {
      if (RespData.statusCode == 200) {
        this.leadstatusList = RespData.respData;

        console.log(RespData)
        console.log(RespData.respData)
      }
      else {
        // alert(RespData.statusMessage);
        console.log(RespData)
      }
    }
  )

}
  ingameee(ingameee: any, arg1: number): number {
    throw new Error("Method not implemented.");
  }
getjcbsubtype(flag,data){
  let token = localStorage.getItem("user_token");

  this.globalService.postApi("users/get-subtype-list",{flag:flag,vid:data.target.value},token).subscribe(RespData=>{
    console.log(RespData.respData);
    if(flag == 1)
      this.subvchtype = RespData.respData;
    else
    this.subvchtyperate = RespData.respData;
  })

//let token=localStorage.getItem("user_token");
   }

onSubmit()
{
  let token=localStorage.getItem("user_token");
let data={
  "customer_name":this.addcustomerform.value.customer_name,
  "cust_email":this.addcustomerform.value.cust_email,
  "address":this.addcustomerform.value.address,
  "phno":this.addcustomerform.value.phno,
  "vchtype":this.addcustomerform.value.vchtype,
  "subvchtype":this.addcustomerform.value.subvchtype,
  "rate":this.addcustomerform.value.rate,
  "v_time":this.addcustomerform.value.time,
  "total":this.total

}
this.globalService.postApi("users/add-customer",data,token).subscribe(
RespData=>
{
  console.log(RespData);
  if(RespData.statusCode == 200){
    alert(RespData.statusMessage);
    this.addcustomerform.reset();
  }
  else{
    alert(RespData.statusMessage);
  }

}
)
}


}
