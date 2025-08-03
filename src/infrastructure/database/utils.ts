import { UserChatSchema } from '@infrastructure/schemas/UserChat-schema';
import { Message, Routine, User, UserChat } from '@domain/entities';
import { ChatType } from '@domain/entities/UserChat';

export function messageSchemaToDomain(messageSchema: any): Message {
  if (!messageSchema.chat) {
    throw new Error('Message must have a chat');
  }
  if (!messageSchema.sender) {
    throw new Error('Message must have a sender');
  }

  return new Message(
    messageSchema.chat_id,
    userChatSchemaToDomain(messageSchema.chat),
    messageSchema.content,
    messageSchema.senderType,
    userSchemaToDomain(messageSchema.sender),
    messageSchema.sender_id,
  );
}

export function userChatSchemaToDomain(chatSchema: UserChatSchema): UserChat {
  return new UserChat(
    chatSchema.chatType as ChatType,
    chatSchema.participants
      ? chatSchema.participants.map(userSchemaToDomain)
      : [],
    chatSchema.name,
    chatSchema.messages ? chatSchema.messages.map(messageSchemaToDomain) : [],
    chatSchema.createdAt,
    chatSchema.updatedAt,
  );
}

export function routineSchemaToDomain(r: any): Routine {
  return new Routine(r.id, r.title, r.description, r.user_id);
}

export function userSchemaToDomain(userSchema: any): User {
  return new User(
    userSchema.email,
    userSchema.password,
    userSchema.username,
    userSchema.firstName,
    userSchema.lastName,
    userSchema.role,
    userSchema.birthdate,
    userSchema.id,
    userSchema.routines ? userSchema.routines.map(routineSchemaToDomain) : [],
    userSchema.chats ? userSchema.chats.map(userChatSchemaToDomain) : [],
    userSchema.sentMessages
      ? userSchema.sentMessages.map(messageSchemaToDomain)
      : [],
    userSchema.socket,
  );
}
