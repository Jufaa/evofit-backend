import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { MainMuscleSchema } from './SubMuscle-schema';
import { RoutineExercisesSchema } from './RoutinesExercises-schema';

@Table({ tableName: 'exercises', timestamps: false })
export class ExercisesSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare exercise_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @ForeignKey(() => MainMuscleSchema)
  @Column(DataType.INTEGER)
  declare main_muscle_id?: number;

  declare routineExercise?: RoutineExercisesSchema[];
}
