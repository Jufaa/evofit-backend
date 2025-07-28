import { RoutineExercise } from './Routine_exercises';

export class Routine {
  routine_id?: number;
  name: string;
  weeks: number;
  days: number;
  user_id: number;
  routineExercises?: RoutineExercise[];

  constructor(
    name: string,
    userId: number,
    weeks: number,
    days: number,
    id?: number,
    routineExercises?: RoutineExercise[],
  ) {
    this.routine_id = id;
    this.name = name;
    this.weeks = weeks;
    this.days = days;
    this.user_id = userId;
    this.routineExercises = routineExercises;
  }
}
