import {
  Table,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  Model,
} from 'sequelize-typescript';
import { RoutinesSchema } from './Routines-schema';
import { ExercisesSchema } from './Exercises-schema';

@Table({ tableName: 'routine_exercises', timestamps: false })
export class RoutineExercisesSchema extends Model {
  @PrimaryKey
  @ForeignKey(() => RoutinesSchema)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare routine_id: number;

  @PrimaryKey
  @ForeignKey(() => ExercisesSchema)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare exercise_id: number;
  
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare sets: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare reps: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare weight: number;

}
