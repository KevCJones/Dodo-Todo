

# Dodo 'Doo-Doo' - Another todo app 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.
[A Heroku Demo can be seen here](https://dodo-todo.herokuapp.com/).

## Introduction

> Brief set - Write an Angular 4 to do list application. 
 
>This application should allow to:
 
> - View all your tasks
> - Add additional tasks
> - Edit existing ones
 
>There is no API available for this application but please produce an API service that utilises local storage / IndexedDb for your database.
 
> Provide unit and E2E testing for the application.

## Additional aims

> Some additionally set features i would want from a todo app:
>1. Complete a task
>2. Task removed from list if you delete one alone or all [completed]

## Stories / Notes pre building

- A user should be able to create a task in the list
- A user should be able to edit a task in the list
- A user should be able to mark a task completed
- A user should be able to unmark a task completed
- A user should have a way to delete all completed tasks at once
- A user should be able to delete a single task

### Objects from stories

- User (but going to assume local user support only for now)
- Task
- List
- Store

#### Task :
- has a label
- can be done or not done
- can be edited
- can be saved after editing

#### List
- Can render zero or more tasks within it
- Can capture a new item and save into the store [ might be its own component eventually]

#### Store
- Contains 0 or more tasks
- Can create a new task
- Can save changes over an existing task
- Can delete a task from the store
- Can persist its contents (default localStorage - but should be extendable)
- Can prune the list on startup to save memory for long done tasks

## Installation

Prerequisite advised is to have [nvm installed ](https://github.com/creationix/nvm) so that you can switch between multiple versions of node. The setup below is so that you can ensure you have the same enviroment as was intended. Setting up a docker or vagrant image was beyond the scope of this task. 
1. Install node  v7.10.1 `nvm i 7.10.1`
2. Double check you have latest npm [personal preference] `npm i npm@latest`
3. Install angulars CLI project @1.3.1 `npm i -g @angular/cli@1.3.1`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test --sourcemaps=false` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
