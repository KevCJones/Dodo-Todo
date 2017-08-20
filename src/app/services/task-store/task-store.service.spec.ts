import { Warehouse, WarehouseConfig, DRIVER_TYPE, NgxWarehouseModule } from 'ngx-warehouse';
import { TestBed, inject, async } from '@angular/core/testing';

import { TaskStoreService } from './task-store.service';

const config: WarehouseConfig = {
  driver: DRIVER_TYPE.LOCALSTORAGE,
  name: 'Dodotodo_tests2',
  version: 1.0,
  storeName: 'dodo_tasks_tests', // Should be alphanumeric, with underscores.
  description: 'Test version : Todo app you do do daily...'
};

describe('TaskStoreService', () => {
  let service: TaskStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxWarehouseModule.configureWarehouse(config)],
      providers: [TaskStoreService, Warehouse]
    });
  });

  beforeEach(inject([TaskStoreService], s => {
    service = s;
    service.clearAll();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks into array of objects of size 0', done => {
    service.loadTasks();
    service.tasks$
      .take(1)
      .subscribe(tasks => {
        expect(tasks).toBeArrayOfObjects();
        expect(tasks).toBeArrayOfSize(0);
        done();
      });
  });

  it('should add a task to the store', done => {
    service.addTask('Task adding');
    service.tasks$
      .skip(1)
      .take(1)
      .subscribe(tasks => {
        expect(tasks).toBeArrayOfObjects();
        expect(tasks).toBeArrayOfSize(1);
        done();
      });
  });

  it('should edit a task to the store', done => {
    const originalTask = service.addTask('Added');
    const expectedLabels = ['Added', 'Edited'];
    let index = 0;
    service.tasks$
      .skip(1)
      .take(expectedLabels.length)
      .subscribe(tasks => {
        console.log(tasks);
        expect(tasks[0].label).toEqual(expectedLabels[index++]);
        if (index === expectedLabels.length) {
          done();
        }else {
          originalTask.label = 'Edited';
          service.updateTask(originalTask);
        }
      });
  });

  it('should allow a task to be deleted from store', done => {
    const taskCreated = service.addTask('Task adding');
    const expectedSizes = [1, 0];
    let index = 0;
    service.tasks$
      .skip(1)
      .take(expectedSizes.length)
      .subscribe(tasks => {
        expect(tasks).toBeArrayOfSize(expectedSizes[index++]);
        service.deleteTask(taskCreated);
        if (index === expectedSizes.length) {
          done();
        }
      });
  });

});
