import { MockStoreService } from './../../services/task-store/task-store.mock';
import { BehaviorSubject } from 'rxjs/Rx';
import { TaskStoreService } from './../../services/task-store/task-store.service';
import { TaskStoreModule } from './../../services/task-store/task-store.module';
import { ITask } from './../../services/task-store/itask';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskComponent } from './../task/task.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let element: any;
  // for cleaner test reading
  const helpers = {
    inputField: () => element.querySelector('.add-task-input'),
    addButton: () => element.querySelector('.add-task-button'),
    deleteButton: () => element.querySelector('.delete-completed-button'),
    toggleButton: () => element.querySelector('.toggle-completed-button'),
    listContainer: () => element.querySelector('.task-list-container'),
    sendInput: (inputElement: any, text: string) => {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    }
  };

  beforeAll( () => {
    window.confirm = () => true;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TaskStoreModule.forRoot()],
      declarations: [TaskListComponent],
      providers: [FormBuilder,
        {provide: TaskStoreService, useClass: MockStoreService}],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    jasmine.clock().install();
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    element =  fixture.nativeElement;
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

  it('should deletect when there are tasks that can be deleted', fakeAsync(() => {
    expect(component.canDeleteCompletedTasks()).toBe(false);
    component.toggleCompletedTasks();
    expect(component.canDeleteCompletedTasks()).toBe(true);
  }));

  it('should delete all selected when pressing delete all button', done => {
    let index = 0;
    const expected = [3, 0, 0];
    component.taskService.tasks$.subscribe( tasks => {
      expect (tasks.length).toBe(expected[index++]);
      switch (index) {
        case 1: component.deleteCompletedTasks();
        break;
        case 2: done();
      }
    });
    component.toggleCompletedTasks();
  });

  it('should let us toggle the completed tasks', () => {
    const before = component.tasks.map( (task) => task.done);
    expect(component.tasks.length).toBeGreaterThan(0);
    helpers.toggleButton().click();
    fixture.detectChanges();
    const after = component.tasks.map( (task) => task.done);
    expect(before.map( (done, index) => after[index] === done).filter( bool => bool).length).toBe(0);
  });


});
