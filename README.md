

# Dodo 'Doo-Doo' - Another todo app 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Introduction

> Challenge set - Write an Angular 4 to do list application. 
 
>This application should allow to:
 
> - View all your tasks
> - Add additional tasks
> - Edit existing ones
 
>There is no API available for this application but please produce an API service that utilises local storage / IndexedDb for your database.
 
> Provide unit and E2E testing for the application.

## Additional aims

> Some additionally set features i would want from a todo app:
>1. Complete a task
>2. Task removed from list when completed in past (days)

## Installation

Prerequisite advised is to have [nvm installed ](https://github.com/creationix/nvm) so that you can switch between multiple versions of node. The setup below is so that you can ensure you have the same enviroment as was intended. Setting up a docker or vagrant image was beyond the scope of this task. 
1. Install node  v7.10.1 `nvm i 7.10.1`
2. Double check you have latest npm [personal preference] `npm i npm@latest`
3. Install angulars CLI project @1.3.1 `npm i -g @angular/cli@1.3.1`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test --sourcemaps=false` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
