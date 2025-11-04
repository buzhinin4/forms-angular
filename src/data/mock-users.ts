import { IMockUsers } from '../types/mock-users.interface';

export const mockUsers: IMockUsers = {
  google: {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    country: 'United States',
    phonePrefix: '+1',
    phoneNumber: '3105557890',
    telephone: '+13105557890',
  },
  facebook: {
    name: 'Maria Garcia',
    email: 'maria.garcia@fb.com',
    country: 'United States',
    phonePrefix: '+1',
    phoneNumber: '2125550123',
    telephone: '+12125550123',
  },
  github: {
    name: 'Alex Chen',
    email: 'alex.chen@github.io',
    country: 'United States',
    phonePrefix: '+1',
    phoneNumber: '5551234567',
    telephone: '+15551234567',
  },
};
