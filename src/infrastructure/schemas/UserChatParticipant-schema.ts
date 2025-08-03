import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserChatSchema } from './UserChat-schema';
import { UsersSchema } from './User-schemas';

@Table({ tableName: 'user_chat_participants', timestamps: false })
export class UserChatParticipantsSchema extends Model {
  @ForeignKey(() => UsersSchema)
  @Column(DataType.INTEGER)
  declare userId: number;

  @ForeignKey(() => UserChatSchema)
  @Column(DataType.INTEGER)
  declare userChatId: number;
}
