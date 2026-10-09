import * as migration_20261009_100418_initial from './20261009_100418_initial';

export const migrations = [
  {
    up: migration_20261009_100418_initial.up,
    down: migration_20261009_100418_initial.down,
    name: '20261009_100418_initial'
  },
];
