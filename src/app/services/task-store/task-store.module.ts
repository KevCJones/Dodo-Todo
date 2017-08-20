import { TaskStoreService } from './task-store.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWarehouseModule, WarehouseConfig, DRIVER_TYPE } from 'ngx-warehouse';

const config: WarehouseConfig = {
  driver: DRIVER_TYPE.LOCALSTORAGE,
  name: 'Dodotodo',
  version: 1.0,
  storeName: 'dodo_tasks', // Should be alphanumeric, with underscores.
  description: 'Todo app you do do daily...'
};

@NgModule({
  imports: [
    CommonModule,
    NgxWarehouseModule.configureWarehouse(config)
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
