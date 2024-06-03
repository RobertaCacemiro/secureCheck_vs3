import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ToolbarNavegationComponent } from 'src/app/components/toolbar-navegation/toolbar-navegation.component';


@NgModule({
  declarations: [ToolbarNavegationComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ToolbarNavegationComponent]
})
export class ToolbarNavegationModule { }
