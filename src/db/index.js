import fakeDb from './fakeDb.js';
import realDb from './realModels.js';

const isDev = process.env.NODE_ENV === 'development';
// export const db = isDev ? fakeDb : realDb;
export const db = realDb;
