import { CommonModule } from '@angular/common';
//import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ShowcustomerComponent } from './showcustomer/showcustomer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { SubvehicletypeComponent } from './subvehicletype/subvehicletype.component';
@NgModule({
  declarations: [ShowcustomerComponent,AddcustomerComponent,AdminComponent,VehicletypeComponent,SubvehicletypeComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FormsModule,ReactiveFormsModule]
})
export class AdminModule { }
