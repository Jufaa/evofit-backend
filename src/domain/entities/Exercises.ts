export class Exercise {
  exercise_id: number;
  name: string;
  description: string;
  main_muscle_id?: number;
  //el submuscle me lo da el mainmuscle
  constructor(
    exercise_id: number,
    name: string,
    description: string,
    main_muscle_id?: number,
  ) {
    this.exercise_id = exercise_id;
    this.name = name;
    this.description = description;
    this.main_muscle_id = main_muscle_id;
  }
}
