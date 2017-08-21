import { TaskStoreService } from './../../services/task-store/task-store.service';
import { TaskStoreModule } from './../../services/task-store/task-store.module';
import { ITask } from './../../services/task-store/itask';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskComponent } from './../task/task.component';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let element: any;
  const tasks: Array<ITask> = [
    {id: 0, label: 'Item X', deleted: false, done: false},
    {id: 1, label: 'Item Y', deleted: false, done: false},
    {id: 2, label: 'Item Z', deleted: false, done: false},
  ];

  // for cleaner test reading
  const helpers = {
    inputField: () => element.querySelector('.add-task-input'),
    addButton: () => element.querySelector('.add-task-button'),
    deleteButton: () => element.querySelector('.delete-completed-button'),
    listContainer: () => element.querySelector('.task-list-container'),
    sendInput: (inputElement: any, text: string) => {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TaskStoreModule.forRoot()],
      declarations: [TaskListComponent],
      providers: [FormBuilder, TaskStoreService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    jasmine.clock().install();
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    element =  fixture.nativeElement;
    component.tasks = tasks;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input form', () => {
    expect(helpers.addButton).toBeDefined();
    expect(helpers.inputField).toBeDefined();
    expect(component.myForm).toBeDefined();
  });

  it('should not let the user submit empty tasks', () => {
    spyOn(component, 'createTask');
    helpers.addButton().click();
    fixture.detectChanges();
    expect(component.createTask).not.toHaveBeenCalled();
    expect(component.tasks).not.toEqual( jasmine.objectContaining({label: ''}));
  });

  it('should let the user add tasks when a valid input has been added', fakeAsync(() => {
    spyOn(component, 'createTask');
    helpers.sendInput(helpers.inputField(), 'Added Task')
      .then(() => {
        helpers.addButton().click();
        fixture.detectChanges();
        expect(component.createTask).toHaveBeenCalled();
      });
  }));

  it('should let the user add tasks when a valid input has been added', fakeAsync(() => {
    spyOn(component, 'createTask');
    helpers.sendInput(helpers.inputField(), 'Added Task')
      .then(() => {
        helpers.addButton().click();
        fixture.detectChanges();
        expect(component.createTask).toHaveBeenCalled();
      });
  }));


});
