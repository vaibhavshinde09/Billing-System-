import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../sharing/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  invalidLogin: boolean;
 // private formSubmitAttempt: boolean;
 // constructor(private formBuilder: FormBuilder,
 //   private globalService: GlobalService, public route: Router) { }
constructor(public formBuilder: FormBuilder,private globalService: GlobalService, public route: Router) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public msg = '';
  login() {
    let requestArray = {
      "username": this.loginform.value.username,
      "password": this.loginform.value.password
    }

    // console.log(requestArray);
    this.globalService.postApi("login", requestArray, '').subscribe(
      RespData => {

        if (RespData.statusCode == 200) {

          sessionStorage.setItem("logged_in",RespData.respData.user_token);
          sessionStorage.setItem("logged_in",RespData.respData.user_id);

          this.route.navigate(["admin"]);
          console.log(RespData);
          console.log(RespData.respData.user_id);
          console.log(RespData.respData.user_token);
          localStorage.setItem("user_id", RespData.respData.user_id);
          localStorage.setItem("user_token", RespData.respData.user_token);
        }
        else {
          this.msg = RespData.statusMessage;
        }
      }
    );
  }

}
