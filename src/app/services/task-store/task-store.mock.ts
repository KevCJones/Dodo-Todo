import { ITask } from './itask';
import { BehaviorSubject } from 'rxjs/Rx';

const MockTasksInStore = [
    {id: 0, label: 'Item X', deleted: false, done: false},
    {id: 1, label: 'Item Y', deleted: false, done: false},
    {id: 2, label: 'Item Z', deleted: false, done: false},
];

export class MockStoreService {
  tasks$: BehaviorSubject<Array<ITask>> =  new BehaviorSubject(MockTasksInStore);
  set tasks(tasks) { this.tasks$.next(tasks); }
  clearAll() { return this.tasks$.next([]); }
  loadTasks() { this.tasks$.next(MockTasksInStore); }
}
