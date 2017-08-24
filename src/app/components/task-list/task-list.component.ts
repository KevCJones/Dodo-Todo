import { TaskStoreService } from './../../services/task-store/task-store.service';
import { ITask } from './../../services/task-store/itask';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  newItemControl: AbstractControl;
  tasks: Array<ITask> = [];
  subscription: Subscription;
  maxLength = 140;

  constructor(public fb: FormBuilder, public taskService: TaskStoreService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      'newItemControl': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(this.maxLength)])]
    });
    this.newItemControl = this.myForm.controls['newItemControl'];
    this.taskService.loadTasks();
    this.subscription = this.taskService.tasks$.subscribe( tasks => {
      this.tasks = tasks;
    });
  }

  createTask(value: {newItemControl}): void {
    this.taskService.addTask(value.newItemControl);
    this.newItemControl.reset('');
  }

  updateTask(task: ITask) {
    this.taskService.updateTask(task);
  }

  deleteCompletedTasks() {
    const deletingCount = this.tasks.filter(task => task.done ).length;
    if (confirm(`Are you sure you want to delete ${deletingCount} items`)) {
      this.taskService.tasks = this.tasks.filter(task => !task.done );
    }
  }

  canDeleteCompletedTasks() {
    return this.tasks.filter(task => task.done ).length > 0;
  }

  toggleCompletedTasks() {
    this.taskService.tasks = this.tasks.map(task => {
      task.done = !task.done;
      return task;
     });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
