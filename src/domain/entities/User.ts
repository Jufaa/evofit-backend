import { Socket } from 'socket.io';
import { Routine } from './Routines';
import { UserChat } from './UserChat';
import { Message } from './Message';

export class User {
  id?: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  birthdate: Date;
  routines?: Routine[];
  chats?: UserChat[];
  sentMessages?: Message[];
  socket?: Socket;

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
    chats?: UserChat[],
    sentMessages?: Message[],
    socket?: Socket,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.birthdate = new Date(birthdate);
    this.routines = routines;
    this.chats = chats;
    this.sentMessages = sentMessages;
    this.socket = socket;
  }

  setSocket(socket: Socket) {
    this.socket = socket;
  }

  sendEvent(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  isConnected(): boolean {
    return !!this.socket;
  }
}
