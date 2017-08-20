import { ITask } from './itask';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;
  @Output() change: EventEmitter<ITask> = new EventEmitter();
  isEditing = false;

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

  doneEditing() {
    this.isEditing = false;
    this.change.emit(this.task);
  }

  startEditing() {
    this.isEditing = true;
  }

}
