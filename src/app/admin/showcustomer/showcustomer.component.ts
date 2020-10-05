import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/sharing/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcustomer',
  templateUrl: './showcustomer.component.html',
  styleUrls: ['./showcustomer.component.css']
})
export class ShowcustomerComponent implements OnInit {
  getcustomerlist: any;
  index: number;
  customer_id: any;
  customer_name: any;
  cust_email: any;
  address: any;
  total: any;
  v_time: any;
  subvchtype: any;
  vchtype: any;
  phno: any;

  constructor(public formBuilder: FormBuilder,private globalService: GlobalService, public route: Router) { }

  ngOnInit(): void {
    let token=localStorage.getItem("user_token");
    this.globalService.getApi("users/get-customer-list",token).subscribe(
      RespData=>{
        if (RespData.statusCode == 200) {
          this.getcustomerlist = RespData.respData;

          console.log(RespData)
          console.log(RespData.respData)
        }
        else {
          // alert(RespData.statusMessage);
          console.log(RespData)
        }
      })

  }
  // public editButtonClick(index:number){
  //   this.index = index;
  //   this.customer_name = this.getcustomerlist[index]["customer_name"];
  //   this.cust_email = this.getcustomerlist[index]["cust_email"];
  //   this.address = this.getcustomerlist[index]["address"];
  //   this.phno = this.getcustomerlist[index]["phno"];
  //   this.vchtype=this.getcustomerlist[index]["vchtype"];
  //   this.subvchtype=this.getcustomerlist[index]["subvchtype"];
  //   this.customer_id=this.getcustomerlist[index]["customer_id"];
  //   this.v_time=this.getcustomerlist[index]["v_time"];
  //   this.total=this.getcustomerlist[index]["total"];
  //  }
   editButtonClick(dataObj: any) {
    let obj = {
      customer_name: dataObj["customer_name"],
      cust_email: dataObj["cust_email"],
      address: dataObj["address"],
      phno: dataObj["phno"],
      vchtype: dataObj["vchtype"],
      subvchtype: dataObj["subvchtype"],
      customer_id: dataObj["customer_id"],
      v_time: dataObj["v_time"],
      total: dataObj["total"]
    }
    console.log(obj.customer_id);
   // this.route.navigate(['/admin/addcustomer/']);
   this.route.navigate(['/admin/addcustomer/', obj.customer_id]);

 //  let user_id=localStorage.getItem("user_id");
 //  this.route.navigate([this.user_id.route + '/lead-deatails-edit/' + obj.id]);


  }


}
