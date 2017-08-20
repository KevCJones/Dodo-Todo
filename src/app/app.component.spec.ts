import { Warehouse, WarehouseConfig, DRIVER_TYPE, NgxWarehouseModule } from 'ngx-warehouse';
import { TaskStoreService } from './services/task-store/task-store.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

const config: WarehouseConfig = {
  driver: DRIVER_TYPE.LOCALSTORAGE,
  name: 'Dodotodo_tests2',
  version: 1.0,
  storeName: 'dodo_tasks_tests', // Should be alphanumeric, with underscores.
  description: 'Test version : Todo app you do do daily...'
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NgxWarehouseModule.configureWarehouse(config)],
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

  it(`should have as title 'Doo Doo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Doo Doo');
  }));
});
