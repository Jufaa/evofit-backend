/* eslint-disable no-unused-vars */

import { Message } from '../entities';

export interface IMessageRepository {
  getMessageById(messageId: number): Promise<Message>;
  getAllMessages(): Promise<Message[]>;
  getMessagesByChatId(chatId: number): Promise<Message[]>;
  getMessagesByChatIdPaginated(
    chatId: number,
    limit: number,
    offset: number,
  ): Promise<Message[]>;

  createMessage(message: Message): Promise<Message>;
  updateMessage(messageId: number, content: string): Promise<void>;
  deleteMessage(messageId: number): Promise<void>;
}
