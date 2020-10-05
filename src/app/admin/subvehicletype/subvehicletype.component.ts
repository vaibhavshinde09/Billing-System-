import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/sharing/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subvehicletype',
  templateUrl: './subvehicletype.component.html',
  styleUrls: ['./subvehicletype.component.css']
})
export class SubvehicletypeComponent implements OnInit {

  vehiclesubtypeform:FormGroup;
  submitted=false
  getvchsubtypelist: any;
  getvchtypelist: any;
  getApi: any;
  public index: number;
  subvchtype: any;
  rate: any;
  vchtype: any;
  id: any;
  A:number=1;
  B;number=2;
  vid: any;
  get f() { return this.vehiclesubtypeform.controls; }

  constructor(public formBuilder: FormBuilder,private globalService: GlobalService, public route: Router) { }
  ngOnInit(): void {
    this.vehiclesubtypeform=this.formBuilder.group({
      vchtype:[],
      id:[],
      subvchtype: ['', Validators.required],
      rate:[],

    });


    let token = localStorage.getItem("user_token");
    this.globalService.getApi("user/get-subvchtype-list",token).subscribe(
      RespData => {
        if (RespData.statusCode == 200) {
          this.getvchsubtypelist = RespData.respData;

          console.log(RespData)
          console.log(RespData.respData)
        }
        else {
          // alert(RespData.statusMessage);
          console.log(RespData)
        }
      }
    )
    this.globalService.getApi("user/get-vchtype-list",token).subscribe(
      RespData => {
        if (RespData.statusCode == 200) {
          this.getvchtypelist = RespData.respData;

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
 compareFn(a, b) {
  if (!a || !b) {
    return false;
  } else {
    return a.vchtype === b.vchtype;

    //<-- you can other property of name
  }
}

 public onSubmit()
 {
  this.submitted=true;


   if(this.vehiclesubtypeform.invalid)
   {
     return
   }

   let data={
     "vchtype":this.vehiclesubtypeform.value.vchtype,
      "subvchtype":this.vehiclesubtypeform.value.subvchtype,
      "rate":this.vehiclesubtypeform.value.rate
   }
    let token = localStorage.getItem("user_token");
    this.globalService.postApi("user/add-vchsubtype",data,token).subscribe(
  RespData =>{
    console.log(RespData);
        if(RespData.statusCode == 200){
          alert(RespData.statusMessage);
          this.vehiclesubtypeform.reset();
        }
        else{
          alert(RespData.statusMessage);

        }
       }
)
 }
 public deleteApi(id:number,i:number)
 {
  let obj={
    "id":id
  }
  let token=localStorage.getItem("user_token");
  this.globalService.deleteApi("user/delete-vchsubtype",obj,token).subscribe(
    RespData =>{

      this.getvchsubtypelist.splice(i, 1);

      if(RespData.statusCode==200)
      {
        alert(RespData.statusMessage);
      }
      else{
        alert(RespData.statusMessage);

      }
    }
  )
 }
 public editButtonClick(index:number){
  this.index = index;
  this.subvchtype = this.getvchsubtypelist[index]["subvchtype"];
  this.rate=this.getvchsubtypelist[index]["rate"];
  this.vchtype=this.getvchsubtypelist[index]["vchtype"];
  this.id=this.getvchsubtypelist[index]["id"];
  this.vid=this.getvchsubtypelist[index]["vid"];


 }

 public onUpdate()
 {
let data={
  "id":this.vehiclesubtypeform.value.id,
  "vchtype":this.vehiclesubtypeform.value.vchtype,
  "subvchtype":this.vehiclesubtypeform.value.subvchtype,
  "rate":this.vehiclesubtypeform.value.rate

}
console.log(data);
let token=localStorage.getItem("user_token");
this.globalService.updateApi("user/update-subvchtype",data,token).subscribe(
  RespData =>{
    if(RespData.statusCode == 200){
      alert(RespData.statusMessage);
      this.vehiclesubtypeform.reset();
    }
    else{
      alert(RespData.statusMessage);
    }
  }

)
 }
}
