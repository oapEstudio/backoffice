import { createStore } from 'idb-keyval';

export const dpStore = createStore('dp-db', 'dp-store');