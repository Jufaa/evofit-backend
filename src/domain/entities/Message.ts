import { User } from './User';
import { UserChat } from './UserChat';

export class Message {
  constructor(
    public id: number | undefined,
    public chat: UserChat,
    public content: string,
    public sender: { type: 'user', user: User } | { type: 'assistant' },
    public createdAt: Date,
  ) {
    if (!chat || !content || !sender || !createdAt) {
      throw new Error('All fields are required');
    }
    this.id = id;
    this.chat = chat;
    this.content = content;
    this.sender = sender;
    this.createdAt = createdAt;
  }
}
