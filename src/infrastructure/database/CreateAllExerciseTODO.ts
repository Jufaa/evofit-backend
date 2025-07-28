import { MainMuscleSchema } from '../schemas/MainMuscle-schema';
import { SubMuscleSchema } from '../schemas/SubMuscle-schema';
import { ExercisesSchema } from '../schemas/Exercises-schema';
import { sequelize } from './sync-db';

export const insertData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // 🔹 1. Insertar los grupos musculares
    await MainMuscleSchema.bulkCreate([
      { name: 'Chest' },
      { name: 'Back' },
      { name: 'Legs' },
      { name: 'Biceps' },
      { name: 'Triceps' },
      { name: 'Shoulders' },
      { name: 'Abs' },
    ]);
    console.log('✅ Muscle groups inserted');

    // 🔹 2. Obtener los grupos musculares correctamente desde la base de datos
    const muscleGroups = await MainMuscleSchema.findAll({
      where: {
        name: [
          'Chest',
          'Back',
          'Legs',
          'Biceps',
          'Triceps',
          'Shoulders',
          'Abs',
        ],
      },
    });

    // 🔹 3. Crear un mapa con los IDs correctos
    const muscleGroupMap = Object.fromEntries(
      muscleGroups.map((g) => [g.name, g.main_muscle_id]),
    );

    // 🔹 4. Insertar los músculos con los IDs correctos
    await SubMuscleSchema.bulkCreate([
      { name: 'Pectoralis Major', main_muscle_id: muscleGroupMap['Chest'] },
      { name: 'Pectoralis Minor', main_muscle_id: muscleGroupMap['Chest'] },
      { name: 'Latissimus Dorsi', main_muscle_id: muscleGroupMap['Back'] },
      { name: 'Trapezius', main_muscle_id: muscleGroupMap['Back'] },
      { name: 'Rhomboids', main_muscle_id: muscleGroupMap['Back'] },
      { name: 'Quadriceps', main_muscle_id: muscleGroupMap['Legs'] },
      { name: 'Hamstrings', main_muscle_id: muscleGroupMap['Legs'] },
      { name: 'Calves', main_muscle_id: muscleGroupMap['Legs'] },
      { name: 'Glutes', main_muscle_id: muscleGroupMap['Legs'] },
      { name: 'Biceps Brachii', main_muscle_id: muscleGroupMap['Biceps'] },
      { name: 'Triceps Brachii', main_muscle_id: muscleGroupMap['Triceps'] },
      { name: 'Deltoids', main_muscle_id: muscleGroupMap['Shoulders'] },
      { name: 'Rectus Abdominis', main_muscle_id: muscleGroupMap['Abs'] },
    ]);
    console.log('✅ Muscles inserted');

    // 🔹 3. Insert Exercises
    await ExercisesSchema.bulkCreate([
      // Chest
      {
        name: 'Bench Press',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A chest exercise using a barbell or dumbbells to press weights upwards.',
      },

      {
        name: 'Incline Bench Press',
        main_muscle_id: muscleGroupMap.Chest,
        description:
          'A chest exercise using a barbell or dumbbells to press weights upwards.',
      },
      {
        name: 'Decline Bench Press',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A variation of the bench press with a decline angle to target the lower chest.',
      },
      {
        name: 'Dumbbell Fly',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A chest exercise that isolates the chest muscles using dumbbells.',
      },
      {
        name: 'Cable Fly',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A cable exercise for the chest that involves bringing the hands together in front of the body.',
      },
      {
        name: 'Push-Up',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A bodyweight exercise that targets the chest and triceps.',
      },
      {
        name: 'Incline Push-Up',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A variation of the push-up with the hands elevated to target the upper chest.',
      },
      {
        name: 'Chest Dips',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A bodyweight exercise where the chest is targeted by lowering and raising the body on parallel bars.',
      },
      {
        name: 'Pec Deck Machine',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A machine exercise that isolates the chest by bringing the arms together in front of the body.',
      },
      {
        name: 'Svend Press',
        main_muscle_id: muscleGroupMap['Chest'],
        description:
          'A chest exercise involving a pressing motion with a plate or hands.',
      },

      // Back exercises
      {
        name: 'Pull-Up',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A bodyweight exercise that primarily targets the upper back and arms.',
      },
      {
        name: 'Chin-Up',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A variation of the pull-up with an underhand grip to emphasize the biceps.',
      },
      {
        name: 'Lat Pulldown',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A machine exercise targeting the latissimus dorsi muscles.',
      },
      {
        name: 'Seated Row',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A seated exercise to target the back muscles, especially the middle back.',
      },
      {
        name: 'Bent Over Row',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A free weight exercise targeting the back with a focus on the lats and traps.',
      },
      {
        name: 'T-Bar Row',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A back exercise using a barbell or T-bar to focus on the mid-back.',
      },
      {
        name: 'Single Arm Dumbbell Row',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A dumbbell row performed one arm at a time to isolate the back muscles.',
      },
      {
        name: 'Deadlift',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A full-body exercise that targets the lower back, glutes, and hamstrings.',
      },
      {
        name: 'Rack Pull',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A variation of the deadlift where the bar is lifted from a raised position, emphasizing the back.',
      },
      {
        name: 'Face Pull',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'An exercise that works the rear deltoids and upper back muscles using a rope attachment on a cable machine.',
      },
      {
        name: 'Inverted Row',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A bodyweight exercise targeting the upper back by pulling the chest up to a bar.',
      },
      {
        name: 'Good Morning',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A lower back and hamstring exercise where the body bends forward at the hips.',
      },
      {
        name: 'Reverse Fly',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'An exercise to target the rear deltoids and upper back using dumbbells or cables.',
      },
      {
        name: 'Shrug',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'An exercise that targets the trapezius by shrugging the shoulders with a barbell or dumbbells.',
      },
      {
        name: 'Hyperextension',
        main_muscle_id: muscleGroupMap['Back'],
        description:
          'A lower back exercise using a hyperextension bench to work the spinal erectors.',
      },

      // Legs exercises
      {
        name: 'Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      },
      {
        name: 'Front Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A variation of the squat where the barbell is placed in front of the body to target the quads.',
      },
      {
        name: 'Hack Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise that isolates the quadriceps and reduces stress on the back.',
      },
      {
        name: 'Leg Press',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine-based exercise that targets the quads, hamstrings, and glutes.',
      },
      {
        name: 'Lunge',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A lower body exercise that works the legs and glutes by stepping forward and lowering the body.',
      },
      {
        name: 'Bulgarian Split Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A single-leg squat with the rear foot elevated to target the quads and glutes.',
      },
      {
        name: 'Step-Up',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'An exercise that involves stepping onto a raised platform to target the legs and glutes.',
      },
      {
        name: 'Leg Curl',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise to target the hamstrings by curling the legs upward.',
      },
      {
        name: 'Leg Extension',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise that isolates the quadriceps by extending the legs.',
      },
      {
        name: 'Romanian Deadlift',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A hamstring exercise that involves lowering the barbell to the shins while keeping the legs straight.',
      },
      {
        name: 'Stiff-Leg Deadlift',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A variation of the deadlift that targets the hamstrings and lower back.',
      },
      {
        name: 'Calf Raise',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A calf exercise that involves rising onto the toes to target the calf muscles.',
      },
      {
        name: 'Seated Calf Raise',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise that isolates the calves while seated.',
      },
      {
        name: 'Glute Bridge',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'An exercise to target the glutes and hamstrings by lifting the hips off the ground.',
      },
      {
        name: 'Hip Thrust',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A glute-dominant exercise that involves lifting the hips while your back is supported on a bench.',
      },
      {
        name: 'Leg Adduction',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise targeting the inner thighs by bringing the legs together.',
      },
      {
        name: 'Leg Abduction',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A machine exercise that targets the outer thighs by spreading the legs apart.',
      },
      {
        name: 'Box Jump',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A plyometric exercise that involves jumping onto a raised box to improve explosive power.',
      },
      {
        name: 'Pistol Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A one-legged squat variation that targets the quads and glutes.',
      },
      {
        name: 'Goblet Squat',
        main_muscle_id: muscleGroupMap['Legs'],
        description:
          'A squat variation holding a dumbbell or kettlebell close to the chest.',
      },

      // Biceps exercises
      {
        name: 'Bicep Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A basic exercise that targets the biceps using a barbell or dumbbells.',
      },
      {
        name: 'Hammer Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A variation of the bicep curl with a neutral grip that also targets the brachialis muscle.',
      },
      {
        name: 'Concentration Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A focused bicep curl where the arm is braced against the inner thigh for maximum contraction.',
      },
      {
        name: 'Preacher Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'An exercise using a preacher bench that isolates the biceps.',
      },
      {
        name: 'Cable Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A bicep curl using a cable machine to provide constant tension throughout the movement.',
      },
      {
        name: 'Incline Dumbbell Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A curl performed on an incline bench that stretches the biceps for a greater range of motion.',
      },
      {
        name: 'Spider Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A bicep curl done on an incline bench with the chest supported.',
      },
      {
        name: 'Reverse Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A curl variation that targets the brachioradialis muscle by using an overhand grip.',
      },
      {
        name: 'Zottman Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description:
          'A curl that combines both regular and reverse curls to target different parts of the biceps and forearms.',
      },
      {
        name: 'Barbell Curl',
        main_muscle_id: muscleGroupMap['Biceps'],
        description: 'A basic exercise using a barbell to target the biceps.',
      },

      // Triceps exercises
      {
        name: 'Tricep Pushdown',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A cable machine exercise that targets the triceps by pushing a bar downward.',
      },
      {
        name: 'Tricep Kickback',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'An exercise that involves extending the arms behind the body to isolate the triceps.',
      },
      {
        name: 'Overhead Tricep Extension',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'An exercise targeting the long head of the triceps by extending the arms overhead.',
      },
      {
        name: 'Skull Crusher',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A tricep exercise that involves lowering a barbell toward the forehead and extending it back up.',
      },
      {
        name: 'Close-Grip Bench Press',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A bench press variation where the hands are placed closer to target the triceps more than the chest.',
      },
      {
        name: 'Diamond Push-Up',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A push-up variation where the hands are placed close together in a diamond shape to target the triceps.',
      },
      {
        name: 'Tricep Dips',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A bodyweight exercise where the triceps are targeted by lowering and raising the body on parallel bars.',
      },
      {
        name: 'Bench Dip',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A tricep exercise where the body is lowered and raised using a bench for support.',
      },
      {
        name: 'Cable Tricep Kickback',
        main_muscle_id: muscleGroupMap['Triceps'],
        description:
          'A tricep kickback using a cable machine to isolate the triceps.',
      },

      // Shoulder exercises
      {
        name: 'Overhead Press',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'A pressing movement that targets the deltoid muscles, especially the front and middle heads.',
      },
      {
        name: 'Lateral Raise',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'An isolation exercise for the middle deltoid that involves lifting the arms out to the sides.',
      },
      {
        name: 'Front Raise',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'A raise targeting the front deltoids by lifting the arms in front of the body.',
      },
      {
        name: 'Reverse Fly',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'An exercise to target the rear deltoids by pulling the arms backward.',
      },
      {
        name: 'Arnold Press',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'A shoulder press that involves rotating the hands to target all parts of the deltoid.',
      },
      {
        name: 'Upright Row',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'An exercise that targets the traps and deltoids by lifting a barbell or dumbbells up to the chest.',
      },
      {
        name: 'Face Pull',
        main_muscle_id: muscleGroupMap['Shoulders'],
        description:
          'A cable exercise that works the rear deltoids and upper back.',
      },

      // Abs exercises
      {
        name: 'Crunch',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'A classic abdominal exercise that involves flexing the spine to engage the core.',
      },
      {
        name: 'Plank',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'An isometric exercise where the body is held in a push-up position to engage the entire core.',
      },
      {
        name: 'Leg Raise',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'An exercise that targets the lower abs by raising the legs off the ground while lying down.',
      },
      {
        name: 'Russian Twist',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'A rotational exercise to target the obliques by twisting the torso side to side while seated.',
      },
      {
        name: 'Mountain Climber',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'A full-body exercise that engages the core while moving the legs in a running motion.',
      },
      {
        name: 'Bicycle Crunch',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'A variation of the crunch that involves bringing the elbows to opposite knees while cycling the legs.',
      },
      {
        name: 'V-Up',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'A core exercise where the legs and upper body are raised simultaneously to form a V-shape.',
      },
      {
        name: 'Ab Rollout',
        main_muscle_id: muscleGroupMap['Abs'],
        description:
          'An advanced abdominal exercise performed using an ab wheel to engage the core.',
      },
    ]);
    console.log('✅ Exercises inserted');

    await sequelize.close();
    console.log('✅ Database connection closed successfully');
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  }
};
