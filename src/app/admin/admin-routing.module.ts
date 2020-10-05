import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { ShowcustomerComponent } from './showcustomer/showcustomer.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { SubvehicletypeComponent } from './subvehicletype/subvehicletype.component';


const routes: Routes = [
  {path:'',component:AdminComponent,children:[
    {path:'addcustomer',component:AddcustomerComponent},
    {path:'showcustomer',component:ShowcustomerComponent},
    {path:'vehicletype',component:VehicletypeComponent},
    {path:'subvehicletype',component:SubvehicletypeComponent},
    {path:'addcustomer/:uid',component:AddcustomerComponent}

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 // imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule]
})
export class AdminRoutingModule { }
