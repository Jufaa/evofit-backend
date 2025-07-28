import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { MainMuscleSchema } from './SubMuscle-schema';
import { RoutineExercisesSchema } from './RoutinesExercises-schema';
import { RoutineExerciseDetailSchema } from './RoutineExerciseDetail-schema';

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

  @BelongsToMany(() => RoutineExercisesSchema, {
    through: () => RoutineExerciseDetailSchema,
    foreignKey: 'exercise_id',
    otherKey: 'routine_exercise_id',
  })
  declare routineExercise?: RoutineExercisesSchema[];
}
