import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UsersSchema } from './User-schemas';
import { UserChatSchema } from './UserChat-schema';

@Table({ tableName: 'messages', timestamps: true })
export class UserMessageSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => UserChatSchema) // ← Añadido aquí
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare chat_id: number;

  @BelongsTo(() => UserChatSchema)
  declare chat: UserChatSchema;

  @AllowNull(false)
  @Column(DataType.ENUM('user', 'assistant'))
  declare senderType: 'user' | 'assistant';

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare content: string;

  @ForeignKey(() => UsersSchema) // Este ya está bien
  @Column(DataType.INTEGER)
  declare sender_id?: number;

  @BelongsTo(() => UsersSchema)
  declare sender?: UsersSchema;
}
