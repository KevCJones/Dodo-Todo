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

  // bound to ngModels works nicer with a get set combo
  set label( label: string) {
    this.task.label = label;
  }
  get label(): string {
    return this.task.label;
  }

  set done( isDone: boolean) {
    this.task.done = isDone;
    this.emitChange();
  }
  get done() {
    return this.task.done;
  }

  edit() {
    this.isEditing = true;
    this.beforeEditing = this.label;
  }

  save() {
    this.isEditing = false;
    if (!this.label.length) {
      this.task.label = this.beforeEditing;
      this.delete();
    } else if (this.label !== this.beforeEditing) {
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
    this.change.emit(this.task);
  }

}
