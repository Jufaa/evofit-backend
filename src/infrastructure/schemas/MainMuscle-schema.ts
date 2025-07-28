import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { SubMuscleSchema } from './SubMuscle-schema';
import { ExercisesSchema } from './Exercises-schema';

@Table({ tableName: 'main_muscles', timestamps: false })
export class MainMuscleSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare main_muscle_id: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @HasMany(() => SubMuscleSchema, { foreignKey: 'main_muscle_id' })
  declare subMuscles?: SubMuscleSchema[];
  @HasMany(() => ExercisesSchema, { foreignKey: 'main_muscle_id' })
  declare exercises?: ExercisesSchema[];
}
