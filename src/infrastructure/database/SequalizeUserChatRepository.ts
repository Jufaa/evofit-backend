import { UserChatParticipantsSchema } from '@infrastructure/schemas/UserChatParticipant-schema';
import { UsersSchema } from '@infrastructure/schemas/User-schemas';
import { userSchemaToDomain } from './utils';
import { User } from '@domain/entities';
import { IUserChatParticipantRepository } from '@domain/repositories/IUserChatRepository';

export class SequelizeUserChatParticipantRepository
  implements IUserChatParticipantRepository
{
  async addParticipantToChat(userId: number, chatId: number): Promise<void> {
    await UserChatParticipantsSchema.create({
      userId,
      userChatId: chatId,
    });
  }

  async removeParticipantFromChat(userId: number, chatId: number): Promise<void> {
    await UserChatParticipantsSchema.destroy({
      where: { userId, userChatId: chatId },
    });
  }

  async getParticipantsByChatId(chatId: number): Promise<User[]> {
    const users = await UsersSchema.findAll({
      include: {
        model: UserChatParticipantsSchema,
        where: { userChatId: chatId },
      },
    });

    return users.map(userSchemaToDomain);
  }

  async isUserInChat(userId: number, chatId: number): Promise<boolean> {
    const count = await UserChatParticipantsSchema.count({
      where: { userId, userChatId: chatId },
    });
    return count > 0;
  }
}
