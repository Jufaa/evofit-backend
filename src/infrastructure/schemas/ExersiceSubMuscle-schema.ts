import {
  Table,
  ForeignKey,
  Column,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { ExercisesSchema } from './Exercises-schema';
import { SubMuscleSchema } from './SubMuscle-schema';

@Table({ tableName: 'submuscules_exercise', timestamps: false })
export class ExerciseSubMuscleSchema extends Model {
  @ForeignKey(() => ExercisesSchema)
  @Column
  declare exercise_id: number;

  @ForeignKey(() => SubMuscleSchema)
  @Column
  declare sub_muscle_id: number;

  @BelongsTo(() => ExercisesSchema)
  declare exercise?: ExercisesSchema;

  @BelongsTo(() => SubMuscleSchema)
  declare subMuscle?: SubMuscleSchema;
}
