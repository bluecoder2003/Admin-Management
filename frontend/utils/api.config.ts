export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ApiEndpoints {
  GET_ROLES: string;
  GET_USERS: string;
  UPDATE_ROLE: string;
  UPDATE_USER: string;
  CREATE_ROLE: 'roles',
  CREATE_USER: 'users', 
}

export const ENDPOINTS: ApiEndpoints = {
    GET_ROLES: 'roles',
    CREATE_ROLE: 'roles',
    UPDATE_ROLE: 'roles',
    UPDATE_USER: 'users',
    GET_USERS: 'users',
    CREATE_USER: 'users',
  } as const;