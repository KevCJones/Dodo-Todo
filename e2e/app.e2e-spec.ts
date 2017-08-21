import { browser, protractor } from 'protractor';
import { AppPage } from './app.po';

describe('dodo App', () => {
  let page: AppPage;
  let originalCount;

   beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
    browser.waitForAngular();
  });

  beforeEach(() => {
    page.getTaskListItems().count().then(function(itemCount) {
      originalCount = itemCount;
    });
  });

  it('should navigate to the root okay' , () => {
    const title = page.getTitle().getText();
    expect(title).toEqual('Dodo Todo');
  });

  it('should display an input form with save button' , () => {
    expect(page.getInputField().isDisplayed()).toBe(true);
    expect(page.getSaveButton().isDisplayed()).toBe(true);
  });

  it('should not add empty items to the list' , () => {
    expect(page.getSaveButton().isEnabled()).toBe(false);
    page.getSaveButton().click();
    expect(page.getTaskListItems().count()).toEqual(originalCount);
  });

  it('should add some non-empty items to the list' , () => {
    page.setNewTask('ADDED');
    expect(page.getSaveButton().isEnabled()).toBe(true);
    page.getSaveButton().click();
    page.setNewTask('ADDED');
    page.getSaveButton().click();
    page.setNewTask('ADDED');
    page.getSaveButton().click();
    page.setNewTask('ADDED');
    page.getSaveButton().click();
    page.setNewTask('ADDED');
    page.getSaveButton().click();
    expect(page.getTaskListItems().count()).toEqual(originalCount + 5);
  });

  it('should edit task' , () => {
    expect(page.getFirstEditButton().isDisplayed()).toBe(true);
    page.getFirstEditButton().click()
    .then(() => page.setEditTask('EDITED'))
    .then(page.getFirstSaveButton().click)
    .then(page.getFirstTaskLabel().getText)
    .then(text => {
      expect(text).toEqual('EDITED');
    });
  });

  it('should delete a task' , () => {
    expect(page.getFirstEditButton().isDisplayed()).toBe(true);
    page.getFirstDeleteButton().click()
    .then(page.waitForAlert)
    .then(browser.switchTo().alert().accept)
    .then(page.getFirstTaskLabel().getText)
    .then(text => {
      expect(text).toEqual('ADDED');
    });
  });

  it('should mark tasks complete' , () => {
    page.getDoneCheckboxes().click()
    .then( () => {
      expect(page.getDoneCheckboxes().first().isSelected()).toBe(true);
    });
  });

  it('should clear tasks that are completed' , () => {
    page.getDeleteCompletedButton().click()
    .then(page.waitForAlert)
    .then(browser.switchTo().alert().accept)
    .then(() => {
      expect(page.getTaskListItems().count()).toEqual(0);
    });

  });


});
