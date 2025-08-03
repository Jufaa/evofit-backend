/* eslint-disable no-unused-vars */
import { User } from '@domain/entities';

export interface IUserChatParticipantRepository {
  addParticipantToChat(userId: number, chatId: number): Promise<void>;
  removeParticipantFromChat(userId: number, chatId: number): Promise<void>;
  getParticipantsByChatId(chatId: number): Promise<User[]>;
  isUserInChat(userId: number, chatId: number): Promise<boolean>;
}
