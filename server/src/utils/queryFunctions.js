import { pool } from '../models/pool';
import {
  insertProfile,
  dropProfileTable,
  createProfileTable,
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const dropTables = () => executeQueryArray([ dropProfileTable ]);
export const createTables = () => executeQueryArray([ createProfileTable ]);
export const insertIntoTables = () => executeQueryArray([ insertProfile]);