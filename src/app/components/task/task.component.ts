import { ITask } from './../../services/task-store/itask';
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
declare var window: Window;
/*
  Task Component is as dumb as i can make it. It takes data from a source input, renders it
  watches for editing, marking as done events and emits the new content via a change event
*/
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  static taskBeingEdited: TaskComponent = null;
  @Input() task: ITask;
  @Output() changed: EventEmitter<ITask> = new EventEmitter();
  @Output() focused: EventEmitter<boolean> = new EventEmitter();
  isEditing = false;
  private beforeEditing: string;

  constructor(private el: ElementRef) { }

  set done(isDone: boolean) {
    this.task.done = isDone;
    this.emitChange();
  }

  get done() {
    return this.task.done;
  }

  edit() {
    if (TaskComponent.taskBeingEdited) {
      TaskComponent.taskBeingEdited.save();
    }
    TaskComponent.taskBeingEdited = this;
    this.isEditing = true;
    this.focused.emit(true);
    this.beforeEditing = this.task.label;
  }

  save() {
    this.isEditing = false;
    this.focused.emit(false);
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
