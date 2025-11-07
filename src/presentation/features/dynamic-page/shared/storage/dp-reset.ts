import { clear } from 'idb-keyval';
import { KEY_STORAGE_PROPS_DYNAMIC_PAGE } from '../constants/constants';
import { dpStore } from './dp-store';

export async function resetDynamicPageStorage() {
    
    localStorage.removeItem(KEY_STORAGE_PROPS_DYNAMIC_PAGE);

    await clear(dpStore);  
    await clear();
   
}
