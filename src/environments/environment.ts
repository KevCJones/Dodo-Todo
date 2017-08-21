import { DRIVER_TYPE } from 'ngx-warehouse';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  storageConfig: {
    driver: DRIVER_TYPE.LOCALSTORAGE,
    name: 'Dodotodo',
    version: 1.0,
    storeName: 'dodo_tasks', // Should be alphanumeric, with underscores.
    description: 'Todo app you do do daily...'
  }
};
