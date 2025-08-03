/* eslint-disable no-unused-vars */
import { Message } from './Message';
import { User } from './User';

export class UserChat {
  id_userChat?: number;
  chatType: ChatType;
  name?: string; // solo si es grupo o IA
  participants: User[];
  messages: Message[] = [];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    chatType: ChatType,
    participants: User[],
    name?: string,
    messages?: Message[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (chatType === ChatType.GROUP || chatType === ChatType.IA) {
      if (!name) throw new Error(`${chatType} chat must have a name`);
    }

    if (chatType === ChatType.PRIVATE && participants.length !== 2) {
      throw new Error('Private chat must have exactly 2 participants');
    }

    this.chatType = chatType;
    this.participants = participants;
    this.name = name;
    this.messages = messages || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt;
  }
}

export enum ChatType {
  IA = 'IA',
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}
//crear chat con ia
//const iaChat = new UserChat(false, true, [juan]);
//Crear un chat privado entre dos personas:
//const privateChat = new UserChat(false, false, [juan, maria]);
//Crear un chat grupal:
//const groupChat = new UserChat(true, false, [juan, maria, pedro], "Grupo Gym");
//Agregar un mensaje:
//const msg = new Message(chat.id!, chat, "Hola!", "user", juan, juan.id);
//chat.addMessage(msg);
