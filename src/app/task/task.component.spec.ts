import { FormsModule } from '@angular/forms';
import { ITask } from './itask';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';


import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let element: any;

  function sendInput(inputElement: any, text: string) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  const helpers = {
    inputField: () => element.querySelector('.task-input'),
    saveButton: () => element.querySelector('.task-save-button'),
    editButton: () => element.querySelector('.task-edit-button'),
    checkbox: () => element.querySelector('.task-checkbox'),
    label: () => element.querySelector('.task-label'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: 'ITask', useValue: {} }
      ],
      declarations: [TaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    // mock some input for the TaskComponent - predominantly a view out , input in component
    component.task = {
      id: 0,
      done: false,
      label: 'Set Mocked Input'
    };

    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a label which is reflected to html', () => {
    expect(component).toHaveMember('label');
    component.label = 'Label Changed To';
    fixture.detectChanges();
    expect(helpers.label().innerText).toBe(component.label);
  });

  it('should have a checkbox that toggles done state', () => {
    helpers.checkbox().click();
    fixture.detectChanges();
    expect(helpers.checkbox().checked).toBe(true);
    expect(component.done).toBe(true);
  });

  it('should have an edit mode which displays current label', () => {
    expect(helpers.inputField()).toBeNull();
    helpers.editButton().click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(helpers.inputField().value).toBe(component.label);
    });
  });

  it('should be able to save changes', fakeAsync(() => {
    helpers.editButton().click();
    fixture.detectChanges();
    sendInput(helpers.inputField(), 'Inputted Content')
      .then(() => {
        helpers.saveButton().click();
        fixture.detectChanges();
        expect(helpers.label().innerText).toBe('Inputted Content');
        expect(component.label).toBe('Inputted Content');
      });
  }));

  it('emit a change event when done is checked', () => {
    spyOn(component.change, 'emit');
    helpers.checkbox().click();
    expect(component.change.emit).toHaveBeenCalled();
    expect(component.change.emit).toHaveBeenCalledWith(component.task);
  });

});
