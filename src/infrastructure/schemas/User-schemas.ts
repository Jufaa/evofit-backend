import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  Unique,
  HasMany,
  Model,
} from 'sequelize-typescript';
import { RoutinesSchema } from './Routines-schema';

@Table({ tableName: 'users', timestamps: false })
export class UsersSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare user_id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare lastName: string;

  @AllowNull(false)
  @Column(DataType.ENUM('admin', 'user'))
  declare role: 'admin' | 'user';

  @AllowNull(false)
  @Column(DataType.DATE)
  declare birthdate: Date;

  @HasMany(() => RoutinesSchema)
  declare routines?: RoutinesSchema[];
}
