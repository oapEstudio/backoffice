import { regexFromEnv } from "../../presentation/utils/regexFromEnv";

const SPECIALS_BLOCK_RE = /^[^+*?\[\]^$(){}|\\!"#$%&/()='¡|]+$/;

export const env = {
  baseURL: import.meta.env.VITE_BASE_URL + "api/" || "http://localhost:3000",
  pageSize: import.meta.env.VITE_PAGE_SIZE_DEFAULT || 10,
  patternInputText: regexFromEnv(`${SPECIALS_BLOCK_RE}`, SPECIALS_BLOCK_RE),
  authMode: (import.meta.env.VITE_AUTH_MODE as 'enabled' | 'mock' | 'disabled') ?? 'enabled',
  resources: {
    profiles: { 
      dim: {
        availability: {
           endpoint: 'profiles/availability',   
            version: 'v1'
        },
        statuses: {
           endpoint: 'profiles/statuses',   
           version: 'v1'
        },
        dataset: {
           endpoint: 'profiles/dataset/{dataset}',   
           version: 'v1'
        }
      },    
      getAll: {   
         endpoint: 'profiles',   
         version: 'v1'
      },
      create: {
         endpoint: 'profiles',   
         version: 'v1'
      },
      edit: {
        groups: {
         endpoint: 'profiles/{id}/groups',   
         version: 'v1'
        },
        profile: {
          endpoint: 'profiles/{id}',   
          version: 'v1'
        }
      }
    },
    AD:{
      groups: {
        getAll: {
          endpoint: 'AD/groups',
          version: 'v1'
        }
      }
    },
    menu: {
      getAll: {
         endpoint: 'Items/tree',   
         version: 'v1'
      },
      create: {
         endpoint: 'Items',   
         version: 'v1'
      },
      edit: {
        groupsProfile: {
         endpoint: 'Items/{id}/profiles',   
         version: 'v1'
        },
        menu: {
          endpoint: 'Items/{id}',   
          version: 'v1'
        },
        order: {
          endpoint: 'Items/{id}/children/order',
          version: 'v1'
        },
        orderRoot: {
          endpoint: 'Items/parents/order',
          version: 'v1'
        },
         highlight: {
          endpoint: 'Items/highlighteds/{id}',
          version: 'v1'
        }
      },
      delete: {
        endpoint: 'Items/{id}',   
        version: 'v1'
      },
      highlight: {        
        endpoint: 'Items/highlighteds',   
         version: 'v1'
      }
    },
    notifications: { 
      dim: {      
        dataset: {
           endpoint: 'notifications/dataset/{dataset}',   
           version: 'v1'
        }
      },    
      getAll: {   
         endpoint: 'notifications',   
         version: 'v1'
      },
      create: {
         endpoint: 'notifications',   
         version: 'v1'
      },
      edit: {
        profiles: {
         endpoint: 'notifications/{id}/profiles',   
         version: 'v1'
        },
        notification: {
          endpoint: 'notifications/{id}',   
          version: 'v1'
        },
         status: {
          endpoint: 'notifications/{id}/status',   
          version: 'v1'
        }
      }
    },
  }
};

