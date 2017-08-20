import { ITask } from './../../services/task-store/itask';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  myForm: FormGroup;
  newItemControl: AbstractControl;

  @Input() tasks: Array<ITask>;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      'newItemControl': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])]
    });

    this.newItemControl = this.myForm.controls['newItemControl'];
  }

  onSubmit(value: {newItemControl}): void {
    const task: ITask = {
      id: Date.now(),
      label: value.newItemControl,
      deleted: false,
      done: false
    };
    this.tasks.push(task);
  }

}
