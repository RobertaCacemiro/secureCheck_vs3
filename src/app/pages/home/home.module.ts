import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { ToolbarNavegationModule } from 'src/app/modulos/toolbar-navegation/toolbar-navegation.module';  // Importe o SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ToolbarNavegationModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
