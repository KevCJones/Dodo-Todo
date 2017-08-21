import { TaskStoreService } from './task-store.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWarehouseModule, WarehouseConfig, DRIVER_TYPE } from 'ngx-warehouse';
import { environment } from './../../../environments/environment';


@NgModule({
  imports: [
    CommonModule,
    NgxWarehouseModule.configureWarehouse(environment.storageConfig as WarehouseConfig)
  ]
})
export class TaskStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskStoreModule,
      providers: [TaskStoreService]
    };
  }
}
