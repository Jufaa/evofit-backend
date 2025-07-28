import { SubMuscle } from './Submuscle';

export class MainMuscle {
  main_muscle_id: number;
  name: string;
  subMuscles?: SubMuscle[];

  constructor(main_muscle_id: number, name: string, subMuscles?: SubMuscle[]) {
    this.main_muscle_id = main_muscle_id;
    this.name = name;
    this.subMuscles = subMuscles;
  }
}
