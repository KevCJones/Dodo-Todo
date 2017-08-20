import { ITask } from './../../services/task-store/itask';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

/*
  Task Component is as dumb as i can make it. It takes data from a source input, renders it
  watches for editing, marking as done events and emits the new content via a change event
*/
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;
  @Output() changed: EventEmitter<ITask> = new EventEmitter();
  isEditing = false;
  private beforeEditing: string;

  constructor() {
  }

  ngOnInit() {}

  set done( isDone: boolean) {
    this.task.done = isDone;
    this.emitChange();
  }

  get done() {
    return this.task.done;
  }

  edit() {
    this.isEditing = true;
    this.beforeEditing = this.task.label;
  }

  save() {
    this.isEditing = false;
    if (!this.task.label.length) {
      this.task.label = this.beforeEditing;
      this.delete();
    } else if (this.task.label !== this.beforeEditing) {
      this.emitChange();
    }
  }

  delete() {
    if (confirm('You are going to delete this task')) {
      this.task.deleted = true;
      this.emitChange();
    }
  }

  emitChange() {
    console.log(`Task Updated: ${this.task.label} - ${this.task.done}`);
    this.changed.emit(this.task);
  }

}
