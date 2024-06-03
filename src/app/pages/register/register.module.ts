import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

import { ToolbarNavegationModule } from 'src/app/modulos/toolbar-navegation/toolbar-navegation.module';  // Importe o SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ToolbarNavegationModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
