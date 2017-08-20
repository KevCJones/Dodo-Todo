import { ITask } from './itask';
import { Injectable } from '@angular/core';
import { Warehouse } from 'ngx-warehouse';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class TaskStoreService {

  tasks$: BehaviorSubject<Array<ITask>> =  new BehaviorSubject([]);
  private storeKey = 'dodo-tasks';

  constructor(public warehouse: Warehouse) { }

  set tasks(tasks) {
    this.warehouse.set(this.storeKey, tasks)
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.sortAndPushTasks(items);
      });
  }

  clearAll() {
    return this.warehouse.destroy();
  }

  loadTasks() {
    this.warehouse.get(this.storeKey)
      .take(1)
      .subscribe((items: Array<ITask>) => this.sortAndPushTasks(items));
  }

  addTask(label): ITask {
    const task: ITask = {
      id: Date.now(),
      label: label,
      deleted: false,
      done: false
    };
    const updatedTasks = this.tasks$.value.slice();
    updatedTasks.push(task);
    this.warehouse.set(this.storeKey, updatedTasks)
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.sortAndPushTasks(items);
      });
    return task;
  }

  updateTask(taskToUpdate: ITask) {
    const tasks = this.tasks$.value.filter( task => task.id !== taskToUpdate.id);
    tasks.push(taskToUpdate);
    this.warehouse.set(this.storeKey, tasks)
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.sortAndPushTasks(items);
      });
  }

  deleteTask(taskToDelete: ITask) {
    this.warehouse.set(this.storeKey, this.tasks$.value.filter( task => taskToDelete.id !== task.id ))
      .take(1)
      .subscribe((items: Array<ITask>) => {
        this.sortAndPushTasks(items);
      });
  }

  private sortAndPushTasks(items) {
    items = items || [];
    items.sort( (a, b) => a.id - b.id);
    this.tasks$.next(items);
  }



}
