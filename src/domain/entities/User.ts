import { Routine } from './Routines';

export class User {
  user_id?: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  birthdate: Date;
  routines?: Routine[];

  constructor(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    role: 'admin' | 'user',
    birthdate: Date,
    id?: number,
    routines?: Routine[],
  ) {
    this.user_id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.birthdate = new Date(birthdate);
    this.routines = routines;
  }
}
