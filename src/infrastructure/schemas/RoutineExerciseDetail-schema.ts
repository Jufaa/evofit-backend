import {
  Table,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { RoutineExercisesSchema } from './RoutinesExercises-schema';
import { ExercisesSchema } from './Exercises-schema';

@Table({ tableName: 'routine_exercise_detail', timestamps: false })
export class RoutineExerciseDetailSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => RoutineExercisesSchema)
  @Column(DataType.INTEGER)
  declare routine_exercise_id: number;

  @ForeignKey(() => ExercisesSchema)
  @Column(DataType.INTEGER)
  declare exercise_id: number;
}
