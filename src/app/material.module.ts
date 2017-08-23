import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';

const modulesUsed = [MdButtonModule,
                     MdCheckboxModule,
                     MdInputModule];

@NgModule({
  imports: modulesUsed,
  exports: modulesUsed,
})
export class CustomMaterialModule { }

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
