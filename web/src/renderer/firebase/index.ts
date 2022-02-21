import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import config from 'config.json';

// Initialize Firebase application
export const app = initializeApp(config.firebase);

// Initialize Firebase database
export const db = getDatabase(app);

// Initialize Firebase auth
export const auth = getAuth(app);
