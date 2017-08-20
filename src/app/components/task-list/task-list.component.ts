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

  constructor(public fb: FormBuilder, public taskService: TaskStoreService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      'newItemControl': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])]
    });

    this.newItemControl = this.myForm.controls['newItemControl'];
    this.taskService.loadTasks();
    this.taskService.tasks$.subscribe( tasks => {
      this.tasks = tasks;
    });
  }

  onSubmit(value: {newItemControl}): void {
    this.taskService.addTask(value.newItemControl);
  }

  updateTask(task: ITask) {
    this.taskService.updateTask(task);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
