import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UsersSchema } from './User-schemas';
import { UserChatParticipantsSchema } from './UserChatParticipant-schema';
import { UserMessageSchema } from './UserMessage-schema';

@Table({ tableName: 'user_chats', timestamps: true })
export class UserChatSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id_userChat: number;

  @AllowNull(false)
  @Column(DataType.ENUM('IA', 'PRIVATE', 'GROUP'))
  declare chatType: 'IA' | 'PRIVATE' | 'GROUP';

  @Column(DataType.STRING)
  declare name?: string;

  @BelongsToMany(() => UsersSchema, () => UserChatParticipantsSchema)
  declare participants: UsersSchema[];

  @HasMany(() => UserMessageSchema)
  declare messages: UserMessageSchema[];
}
