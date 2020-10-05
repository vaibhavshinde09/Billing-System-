import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/sharing/global.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicletype',
  templateUrl: './vehicletype.component.html',
  styleUrls: ['./vehicletype.component.css']
})
export class VehicletypeComponent implements OnInit {
  vehicletypeform: FormGroup;
  submitted = false
 // public vchtype;
  user_id: any;
  getvchtypelist: any;
  index: any;
  vchtype: any;
  vid: any;
  constructor(public formBuilder: FormBuilder,private globalService: GlobalService, public route: Router) { }

  ngOnInit(): void {
    this.vehicletypeform=this.formBuilder.group({
      vchtype:[''],
      vid:[]
    })
    let token = localStorage.getItem("user_token");
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

  public deleteApi(vid:number,i:number)
  {
   let obj={
     "vid":vid
   }
   let token=localStorage.getItem("user_token");
   this.globalService.deleteApi("user/delete-vchtype",obj,token).subscribe(
     RespData =>{

       this.getvchtypelist.splice(i, 1);

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








 public  onSubmit()
 {
  this.submitted = true;
  if(this.vehicletypeform.invalid)
  {
      return;
 }

let data={
  "vchtype":this.vehicletypeform.value.vchtype,
}
let token = localStorage.getItem("user_token");
this.globalService.postApi("user/add-vchtype",data,token).subscribe(
  RespData =>{
    console.log(RespData);
        if(RespData.statusCode == 200){
          alert(RespData.statusMessage);
          this.vehicletypeform.reset();


        }
        else{
          alert(RespData.statusMessage);
        }
  }
)
 }
public editButtonClick(index:number)
{
  this.index =index;
  this.vchtype = this.getvchtypelist[index]["vchtype"];
  this.vid=this.getvchtypelist[index]["vid"];

}
public onUpdate()
{
  let obj={
    "vid":this.vehicletypeform.value.vid,
    "vchtype":this.vehicletypeform.value.vchtype
  }
  let token=localStorage.getItem("user_token");
  this.globalService.updateApi("user/update-vchtype",obj,token).subscribe(
    RespData=>{
      console.log(RespData);
      if(RespData.statusCode == 200){
        alert(RespData.statusMessage);
        this.vehicletypeform.reset();
      }
      else{
        alert(RespData.statusMessage);
      }
    }
  )
}

}
