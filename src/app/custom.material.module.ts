import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdListModule,
         MdIconModule, MdInputModule, MdToolbarModule } from '@angular/material';

const modules = [MdButtonModule, MdCheckboxModule, MdListModule, MdIconModule, MdInputModule, MdToolbarModule];
@NgModule({
  imports: modules,
  exports: modules,

})
export class CustomMaterialModule { }
