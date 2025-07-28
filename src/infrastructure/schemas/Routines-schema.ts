import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  Model,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { UsersSchema } from './User-schemas';
import { RoutineExercisesSchema } from './RoutinesExercises-schema';

@Table({ tableName: 'routines', timestamps: false })
export class RoutinesSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare routine_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare weeks: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare days: number;

  @ForeignKey(() => UsersSchema)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare user_id: number;

  @BelongsTo(() => UsersSchema)
  declare user?: UsersSchema;

  @HasMany(() => RoutineExercisesSchema)
  declare routineExercises?: RoutineExercisesSchema[];
}
