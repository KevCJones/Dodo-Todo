import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/', 3000);
  }

  getTitle() {
    return element(by.css('h1'));
  }

  getInputField() {
    return element(by.css('.add-task-input'));
  }

  getSaveButton() {
    return element(by.css('.add-task-button'));
  }

  getFirstEditButton() {
    return element(by.css('.edit-btn'));
  }

  getFirstSaveButton() {
    return element(by.css('.task-save-button'));
  }

  getFirstDeleteButton() {
    return element(by.css('.delete-btn'));
  }

  getDeleteCompletedButton() {
    return element(by.css('.delete-completed-button'));
  }

  getTaskListItems() {
    return element.all(by.css('.task-item'));
  }

  getFirstTaskLabel() {
    return element(by.css('.mat-checkbox-layout'));
  }

  getClickablePartOfCheckboxes() {
    return element.all(by.css('.mat-checkbox-inner-container'));
  }

  getTaskListEditingItems() {
    return element.all(by.css('.task-item-edit'));
  }

  getEditInputField() {
    return element(by.css('.task-input'));
  }

  setNewTask(str) {
    const taskInput = this.getInputField();
    return taskInput.clear().then( () => {
      taskInput.sendKeys(str);
    });
  }

  setEditTask(str) {
    const taskInput = this.getEditInputField();
    return taskInput.clear().then( () => {
      taskInput.sendKeys(str);
    });
  }

  waitForAlert() {
    const EC = protractor.ExpectedConditions;
    return browser.wait(EC.alertIsPresent(), 5000, 'Alert is not getting presented :(');
  }

}
