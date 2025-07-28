import { MainMuscle } from './MainMuscle';

export class SubMuscle {
  submuscle_id: number;
  name: string;
  main_muscle_id: number;
  mainMuscle?: MainMuscle;

  constructor(
    submuscle_id: number,
    name: string,
    main_muscle_id: number,
    mainMuscle?: MainMuscle,
  ) {
    this.submuscle_id = submuscle_id;
    this.name = name;
    this.main_muscle_id = main_muscle_id;
    this.mainMuscle = mainMuscle;
  }
}
