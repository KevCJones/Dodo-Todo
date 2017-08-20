import { FormsModule } from '@angular/forms';
import { ITask } from './itask';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';


import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let element: any;

  // for cleaner test reading
  const helpers = {
    inputField: () => element.querySelector('.task-input'),
    saveButton: () => element.querySelector('.task-save-button'),
    editButton: () => element.querySelector('.edit-btn'),
    deleteButton: () => element.querySelector('.delete-btn'),
    checkbox: () => element.querySelector('.done-checkbox'),
    label: () => element.querySelector('.task-label'),
    sendInput: (inputElement: any, text: string) => {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    }
  };

  beforeAll(() => {
    window.confirm = () => true;
  });

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
      label: 'Set Mocked Input',
      deleted: false
    };

    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a label which is reflected to html', () => {
    component.task.label = 'Label Changed To';
    fixture.detectChanges();
    expect(helpers.label().innerText).toBe(component.task.label);
  });

  it('should have a checkbox that toggles done state', () => {
    helpers.checkbox().click();
    fixture.detectChanges();
    expect(helpers.checkbox().checked).toBe(true);
    expect(component.task.done).toBe(true);
  });

  it('should have an edit mode which displays current label', () => {
    expect(helpers.inputField()).toBeNull();
    helpers.editButton().click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(helpers.inputField().value).toBe(component.task.label);
    });
  });

  it('should be able to save changes and emit change event', fakeAsync(() => {
    spyOn(component.change, 'emit');
    helpers.editButton().click();
    fixture.detectChanges();
    helpers.sendInput(helpers.inputField(), 'Inputted Content')
      .then(() => {
        helpers.saveButton().click();
        fixture.detectChanges();
        expect(helpers.label().innerText).toBe('Inputted Content');
        expect(component.task.label).toBe('Inputted Content');
        expect(component.change.emit).toHaveBeenCalledWith(component.task);
      });
  }));

  it('should emit a change event when checkbox is clicked', () => {
    spyOn(component.change, 'emit');
    helpers.checkbox().click();
    expect(component.change.emit).toHaveBeenCalledWith(component.task);
  });

  it('should mark item as done and emit change if the label is clicked', () => {
    spyOn(component.change, 'emit');
    helpers.label().click();
    expect(component.change.emit).toHaveBeenCalled();
  });

  it('should not to emit a change event when save is performed with no changes', () => {
    spyOn(component.change, 'emit');
    helpers.editButton().click();
    fixture.detectChanges();
    helpers.saveButton().click();
    expect(component.change.emit).not.toHaveBeenCalled();
  });

  it('should be able to send a delete event', () => {
    spyOn(component.change, 'emit');
    helpers.deleteButton().click();
    expect(component.task.deleted).toBeTrue();
    expect(component.change.emit).toHaveBeenCalledWith(component.task);
  });

  it('should delete the task if you save an empty string', () => {
    spyOn(component.change, 'emit');
    const beforeDeleteLabel = component.task.label;
    helpers.editButton().click();
    fixture.detectChanges();
    helpers.sendInput(helpers.inputField(), '')
      .then(() => {
        helpers.saveButton().click();
        fixture.detectChanges();
        expect(helpers.label().innerText).toBe(beforeDeleteLabel);
        expect(component.task.deleted).toBeTrue();
        expect(component.change.emit).toHaveBeenCalledWith(component.task);
      });
  });

});
