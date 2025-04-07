import { fakeDb } from './fakeDb.js';
import * as realDb from './realModels.js';

const isDev = process.env.NODE_ENV === 'development';

export const db = isDev ? fakeDb : realDb;