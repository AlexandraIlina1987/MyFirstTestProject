import { environment } from '../../../environments/environment';

export const API = {
  auth: `${environment.server}/auth`,
  register: `${environment.server}/register`,
  tours: `${environment.server}/tours`,
  tourDetails: `${environment.server}/tour`,
  // order: `${environment.server}/order`,
} as const;
