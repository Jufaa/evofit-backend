import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  Model,
  Unique,
  BelongsTo,
} from 'sequelize-typescript';
import { MainMuscleSchema } from './MainMuscle-schema';

@Table({ tableName: 'submuscles', timestamps: false })
export class SubMuscleSchema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare submuscle_id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  // Relación con el grupo muscular
  @ForeignKey(() => MainMuscleSchema)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare main_muscle_id: number;
  @BelongsTo(() => MainMuscleSchema)
  declare mainMuscle?: MainMuscleSchema;
}
export { MainMuscleSchema };
