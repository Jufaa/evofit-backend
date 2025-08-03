import { Message } from '@domain/entities/Message';
import { IMessageRepository } from '@domain/repositories/IMessageRepository';
import { UserMessageSchema } from '@infrastructure/schemas/UserMessage-schema';
import { userChatSchemaToDomain, userSchemaToDomain } from './utils';
import { UsersSchema } from '@infrastructure/schemas/User-schemas';
import { UserChatSchema } from '@infrastructure/schemas/UserChat-schema';

export class SequealizeUserMessageRepository implements IMessageRepository {
  async getMessageById(messageId: number): Promise<Message> {
    if (!messageId || isNaN(messageId)) throw new Error('Invalid message ID');

    const message = await UserMessageSchema.findByPk(messageId, {
      include: [
        { model: UserChatSchema, as: 'chat' },
        { model: UsersSchema, as: 'sender' },
      ],
    });

    if (!message) throw new Error('Message not found');
    return this.toDomain(message);
  }

  async getAllMessages(): Promise<Message[]> {
    const messages = await UserMessageSchema.findAll({
      include: [
        { model: UserChatSchema, as: 'chat' },
        { model: UsersSchema, as: 'sender' },
      ],
    });

    return messages.map((msg) => this.toDomain(msg));
  }

  async getMessagesByChatId(chatId: number): Promise<Message[]> {
    if (!chatId || isNaN(chatId)) throw new Error('Invalid chat ID');

    const messages = await UserMessageSchema.findAll({
      where: { chat_id: chatId },
      include: [
        { model: UserChatSchema, as: 'chat' },
        { model: UsersSchema, as: 'sender' },
      ],
    });

    return messages.map((msg) => this.toDomain(msg));
  }

  async getMessagesByChatIdPaginated(
    chatId: number,
    limit: number,
    offset: number,
  ): Promise<Message[]> {
    if (!chatId || isNaN(chatId)) throw new Error('Invalid chat ID');

    const messages = await UserMessageSchema.findAll({
      where: { chat_id: chatId },
      limit,
      offset,
      include: [
        { model: UserChatSchema, as: 'chat' },
        { model: UsersSchema, as: 'sender' },
      ],
    });

    return messages.map((msg) => this.toDomain(msg));
  }

  async createMessage(message: Message): Promise<Message> {
  const { chat, content, sender } = message;

  const created = await UserMessageSchema.create({
    chat_id: chat.id_userChat,
    content,
    senderType: sender.type,
    sender_id: sender.type === 'user' ? sender.user.id : null,
  });

  const full = await UserMessageSchema.findByPk(created.id, {
    include: [{ model: UserChatSchema, as: 'chat' }, { model: UsersSchema, as: 'sender' }],
  });

  if (!full) throw new Error('Failed to fetch created message');
  return this.toDomain(full);
}

  async updateMessage(messageId: number, content: string): Promise<void> {
    if (!messageId || isNaN(messageId)) throw new Error('Invalid message ID');

    await UserMessageSchema.update({ content }, { where: { id: messageId } });
  }

  async deleteMessage(messageId: number): Promise<void> {
    if (!messageId || isNaN(messageId)) throw new Error('Invalid message ID');

    await UserMessageSchema.destroy({ where: { id: messageId } });
  }

  private toDomain(messageSchema: UserMessageSchema): Message {
    return new Message(
  messageSchema.id,
  userChatSchemaToDomain(messageSchema.chat),
  messageSchema.content,
  messageSchema.senderType === 'user'
    ? { type: 'user', user: userSchemaToDomain(messageSchema.sender) }
    : { type: 'assistant' },
  messageSchema.createdAt,
);

  }
}
