export class RoutineExercise {
  routine_id: number;
  exercise_id: number;
  sets: number;
  reps: number;
  weight: number;

  constructor(
    routineId: number,
    exerciseId: number,
    sets: number,
    reps: number,
    weight: number,
  ) {
    this.routine_id = routineId;
    this.exercise_id = exerciseId;
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
  }
}
