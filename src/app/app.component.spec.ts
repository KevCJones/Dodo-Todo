import { CustomMaterialModule } from './custom.material.module';
import { environment } from './../environments/environment';
import { Warehouse, WarehouseConfig, DRIVER_TYPE, NgxWarehouseModule } from 'ngx-warehouse';
import { TaskStoreService } from './services/task-store/task-store.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

const config: WarehouseConfig = environment.storageConfig as WarehouseConfig;
config.storeName += '_unit_tests_only';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NgxWarehouseModule.configureWarehouse(config), CustomMaterialModule],
      providers: [TaskStoreService, Warehouse],
      declarations: [
        AppComponent,
        TaskListComponent,
        TaskComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Dodo Todo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Dodo Todo');
  }));
});
