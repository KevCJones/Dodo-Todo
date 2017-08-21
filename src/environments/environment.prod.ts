import { DRIVER_TYPE } from 'ngx-warehouse';
export const environment = {
  production: true,
  storageConfig: {
    driver: DRIVER_TYPE.LOCALSTORAGE,
    name: 'Dodotodo',
    version: 1.0,
    storeName: 'dodo_tasks', // Should be alphanumeric, with underscores.
    description: 'Todo app you do do daily...'
  }
};
