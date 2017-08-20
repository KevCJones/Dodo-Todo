import { ITask } from './itask';
import { Injectable } from '@angular/core';
import { Warehouse } from 'ngx-warehouse';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class TaskStoreService {

  tasks: Array<ITask> = [];
  tasks$: BehaviorSubject<Array<ITask>> =  new BehaviorSubject([]);
  private storeKey = 'dodo-tasks';

  constructor(public warehouse: Warehouse) { }


  clearAll() {
    this.warehouse.destroy();
  }

  loadTasks() {
    this.warehouse.get(this.storeKey)
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.tasks = items;
        this.tasks$.next(this.tasks);
      });
  }

  addTask(label): ITask {
    const task: ITask = {
      id: Date.now(),
      label: label,
      deleted: false,
      done: false
    };
    this.tasks.push(task);
    this.warehouse.set(this.storeKey, this.tasks)
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.tasks$.next(this.tasks);
      });
    return task;
  }

  deleteTask(taskToDelete: ITask) {
    this.warehouse.set(this.storeKey, this.tasks$.value.filter( task => taskToDelete.id !== task.id ))
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.tasks = items;
        this.tasks$.next(this.tasks);
      });
  }



}
