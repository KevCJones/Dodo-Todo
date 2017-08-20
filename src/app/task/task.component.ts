import { ITask } from './itask';
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
  @Output() change: EventEmitter<ITask> = new EventEmitter();
  private beforeEditing: string;
  private isEditing = false;

  constructor() {}

  ngOnInit() {}

  set label( label: string) {
    this.task.label = label;
  }

  get label(): string {
    return this.task.label;
  }

  set done( isDone: boolean) {
    this.task.done = isDone;
    this.change.emit(this.task);
  }

  get done() {
    return this.task.done;
  }

  set editing(isEditing) {
    this.isEditing = isEditing;
    if (!isEditing && (this.label !== this.beforeEditing)) {
      this.change.emit(this.task);
    } else if (isEditing) {
      this.isEditing = true;
    this.beforeEditing = this.label;
    }
  }

  get editing() {
    return this.isEditing;
  }

}
