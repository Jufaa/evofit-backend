/* eslint-disable no-unused-vars */
import { MainMuscleSchema } from '@infrastructure/schemas/MainMuscle-schema';
import { ExercisesSchema } from '../schemas/Exercises-schema';
import { sequelize } from './sync-db';
import { SubMuscleSchema } from '@infrastructure/schemas/SubMuscle-schema';

export const insertData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // 🔹 Insertar musculos principales
    const muscleGroups = await MainMuscleSchema.bulkCreate(
      [
        { name: 'Chest' },
        { name: 'Back' },
        { name: 'Legs' },
        { name: 'Biceps' },
        { name: 'Triceps' },
        { name: 'Shoulders' },
        { name: 'Abs' },
      ],
      { returning: true },
    );

    console.log('✅ Muscle groups inserted');

    // Obtener IDs de los grupos musculares
    const chest = muscleGroups[0]?.main_muscle_id;
    const back = muscleGroups[1]?.main_muscle_id;
    const legs = muscleGroups[2]?.main_muscle_id;
    const biceps = muscleGroups[3]?.main_muscle_id;
    const triceps = muscleGroups[4]?.main_muscle_id;
    const shoulders = muscleGroups[5]?.main_muscle_id;
    const abs = muscleGroups[6]?.main_muscle_id;

    // 🔹 Insertar SubMúsculos
    const subMuscles = await SubMuscleSchema.bulkCreate(
      [
        { name: 'Pectoralis Major', main_muscle_id: chest },
        { name: 'Pectoralis Middle', main_muscle_id: chest },
        { name: 'Pectoralis Minor', main_muscle_id: chest },
        { name: 'Latissimus Dorsi', main_muscle_id: back },
        { name: 'Trapezius', main_muscle_id: back },
        { name: 'Rhomboids', main_muscle_id: back },
        { name: 'Erector Spinae', main_muscle_id: back },
        { name: 'Quadriceps', main_muscle_id: legs },
        { name: 'Hamstrings', main_muscle_id: legs },
        { name: 'Calves', main_muscle_id: legs },
        { name: 'Glutes', main_muscle_id: legs },
        { name: 'Biceps Brachii', main_muscle_id: biceps },
        { name: 'Brachialis', main_muscle_id: biceps },
        { name: 'Brachioradialis', main_muscle_id: biceps },
        { name: 'Triceps Brachii', main_muscle_id: triceps },
        { name: 'Triceps Long Head', main_muscle_id: triceps },
        { name: 'Triceps Lateral Head', main_muscle_id: triceps },
        { name: 'Triceps Medial Head', main_muscle_id: triceps },
        { name: 'Deltoids', main_muscle_id: shoulders },
        { name: 'Medial Deltoid', main_muscle_id: shoulders },
        { name: 'Anterior Deltoid', main_muscle_id: shoulders },
        { name: 'Lateral Deltoid', main_muscle_id: shoulders },
        { name: 'Posterior Deltoid', main_muscle_id: shoulders },
        { name: 'Rectus Abdominis', main_muscle_id: abs },
        { name: 'Obliques', main_muscle_id: abs },
        { name: 'Transverse Abdominis', main_muscle_id: abs },
        { name: 'Lower Abs', main_muscle_id: abs },
        { name: 'Upper Abs', main_muscle_id: abs },
      ],
      { returning: true },
    );

    console.log('✅ Muscles inserted');

    // Crear un mapa de IDs de los músculos específicos
    const muscleIds = subMuscles.reduce(
      (acc, muscle) => {
        acc[muscle.name] = muscle.main_muscle_id;
        return acc;
      },
      {} as Record<string, number | undefined>,
    );

    // Obtener los IDs de los músculos específicos usando el mapa
    const pectoralisMajorId = muscleIds['Pectoralis Major'];
    const pectoralisMiddleId = muscleIds['Pectoralis Middle'];
    const pectoralisMinorId = muscleIds['Pectoralis Minor'];
    const latissimusDorsiId = muscleIds['Latissimus Dorsi'];
    const trapeziusId = muscleIds['Trapezius'];
    const rhomboidsId = muscleIds['Rhomboids'];
    const erectorSpinaeId = muscleIds['Erector Spinae'];
    const quadricepsId = muscleIds['Quadriceps'];
    const hamstringsId = muscleIds['Hamstrings'];
    const calvesId = muscleIds['Calves'];
    const glutesId = muscleIds['Glutes'];
    const bicepsBrachiiId = muscleIds['Biceps Brachii'];
    const brachialisId = muscleIds['Brachialis'];
    const brachioradialisId = muscleIds['Brachioradialis'];
    const tricepsBrachiiId = muscleIds['Triceps Brachii'];
    const tricepsLongHeadId = muscleIds['Triceps Long Head'];
    const tricepsLateralHeadId = muscleIds['Triceps Lateral Head'];
    const tricepsMedialHeadId = muscleIds['Triceps Medial Head'];
    const deltoidsId = muscleIds['Deltoids'];
    const medialDeltoidId = muscleIds['Medial Deltoid'];
    const anteriorDeltoidId = muscleIds['Anterior Deltoid'];
    const lateralDeltoidId = muscleIds['Lateral Deltoid'];
    const posteriorDeltoidId = muscleIds['Posterior Deltoid'];
    const rectusAbdominisId = muscleIds['Rectus Abdominis'];
    const obliquesId = muscleIds['Obliques'];
    const transverseAbdominisId = muscleIds['Transverse Abdominis'];
    const lowerAbsId = muscleIds['Lower Abs'];
    const upperAbsId = muscleIds['Upper Abs'];

    // 🔹 Insertar Ejercicios (usando los IDs reales de los músculos principales)
    const exercisesData = [
      // Chest
      {
        name: 'Bench Press',
        description:
          'A chest exercise using a barbell or dumbbells to press weights upwards.',
        main_muscle_id: chest,
        sub_muscle_id: [
          pectoralisMajorId,
          pectoralisMiddleId,
          pectoralisMinorId,
        ],
      },
      {
        name: 'Incline Bench Press',
        description:
          'A chest exercise using a barbell or dumbbells to press weights upwards.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMiddleId],
      },
      {
        name: 'Decline Bench Press',
        description:
          'A variation of the bench press with a decline angle to target the lower chest.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },
      {
        name: 'Dumbbell Fly',
        description:
          'A chest exercise that isolates the chest muscles using dumbbells.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },
      {
        name: 'Cable Fly',
        description:
          'A cable exercise for the chest that involves bringing the hands together in front of the body.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },
      {
        name: 'Push-Up',
        description:
          'A bodyweight exercise that targets the chest and triceps.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },
      {
        name: 'Incline Push-Up',
        description:
          'A variation of the push-up with the hands elevated to target the upper chest.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMiddleId],
      },
      {
        name: 'Chest Dips',
        description:
          'A bodyweight exercise where the chest is targeted by lowering and raising the body on parallel bars.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },
      {
        name: 'Pec Deck Machine',
        description:
          'A machine exercise that isolates the chest by bringing the arms together in front of the body.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId],
      },
      {
        name: 'Svend Press',
        description:
          'A chest exercise involving a pressing motion with a plate or hands.',
        main_muscle_id: chest,
        sub_muscle_id: [pectoralisMajorId, pectoralisMinorId],
      },

      // Legs
      {
        name: 'Squat',
        description:
          'A compound leg exercise targeting the quadriceps, hamstrings, and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, hamstringsId, glutesId],
      },
      {
        name: 'Front Squat',
        description: 'A squat variation targeting the quadriceps and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, glutesId],
      },
      {
        name: 'Hack Squat',
        description:
          'A machine-based squat targeting the quadriceps and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, glutesId],
      },
      {
        name: 'Leg Press',
        description:
          'A machine exercise to strengthen the quadriceps, hamstrings, and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, hamstringsId, glutesId],
      },
      {
        name: 'Lunge',
        description:
          'A lower-body exercise targeting the quadriceps, hamstrings, and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, hamstringsId, glutesId],
      },
      {
        name: 'Bulgarian Split Squat',
        description:
          'A single-leg squat with the rear foot elevated to target the quads and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, glutesId],
      },
      {
        name: 'Step-Up',
        description:
          'An exercise that involves stepping onto a raised platform to target the legs and glutes.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId, glutesId],
      },
      {
        name: 'Leg Curl',
        description:
          'A machine exercise to target the hamstrings by curling the legs upward.',
        main_muscle_id: legs,
        sub_muscle_id: [hamstringsId],
      },
      {
        name: 'Leg Extension',
        description:
          'A machine exercise that isolates the quadriceps by extending the legs.',
        main_muscle_id: legs,
        sub_muscle_id: [quadricepsId],
      },
      {
        name: 'Romanian Deadlift',
        description:
          'A hamstring exercise that involves lowering the barbell to the shins while keeping the legs straight.',
        main_muscle_id: legs,
        sub_muscle_id: [hamstringsId, glutesId],
      },
      // Biceps
      {
        name: 'Bicep Curl',
        description:
          'A basic exercise that targets the biceps using a barbell or dumbbells.',
        main_muscle_id: biceps,
        sub_muscle_id: [bicepsBrachiiId, brachialisId],
      },
      {
        name: 'Hammer Curl',
        description:
          'A variation of the bicep curl with a neutral grip that also targets the brachialis muscle.',
        main_muscle_id: biceps,
        sub_muscle_id: [brachialisId, brachioradialisId],
      },
      {
        name: 'Concentration Curl',
        description:
          'A focused bicep curl where the arm is braced against the inner thigh for maximum contraction.',
        main_muscle_id: biceps,
        sub_muscle_id: [bicepsBrachiiId],
      },
      {
        name: 'Preacher Curl',
        description:
          'An exercise using a preacher bench that isolates the biceps.',
        main_muscle_id: biceps,
        sub_muscle_id: [bicepsBrachiiId],
      },
      {
        name: 'Cable Curl',
        description:
          'A bicep curl using a cable machine to provide constant tension throughout the movement.',
        main_muscle_id: biceps,
        sub_muscle_id: [bicepsBrachiiId],
      },

      // Triceps
      {
        name: 'Tricep Pushdown',
        description:
          'A cable machine exercise that targets the triceps by pushing a bar downward.',
        main_muscle_id: triceps,
        sub_muscle_id: [tricepsBrachiiId],
      },
      {
        name: 'Tricep Kickback',
        description:
          'An exercise that involves extending the arms behind the body to isolate the triceps.',
        main_muscle_id: triceps,
        sub_muscle_id: [tricepsBrachiiId],
      },
      {
        name: 'Overhead Tricep Extension',
        description:
          'An exercise targeting the long head of the triceps by extending the arms overhead.',
        main_muscle_id: triceps,
        sub_muscle_id: [tricepsLongHeadId],
      },

      // Shoulders
      {
        name: 'Overhead Press',
        description:
          'A pressing movement that targets the deltoid muscles, especially the front and middle heads.',
        main_muscle_id: shoulders,
        sub_muscle_id: [anteriorDeltoidId, medialDeltoidId],
      },
      {
        name: 'Lateral Raise',
        description:
          'An isolation exercise for the middle deltoid that involves lifting the arms out to the sides.',
        main_muscle_id: shoulders,
        sub_muscle_id: [medialDeltoidId],
      },
      {
        name: 'Front Raise',
        description:
          'A raise targeting the front deltoids by lifting the arms in front of the body.',
        main_muscle_id: shoulders,
        sub_muscle_id: [anteriorDeltoidId],
      },

      // Abs
      {
        name: 'Crunch',
        description:
          'A classic abdominal exercise that involves flexing the spine to engage the core.',
        main_muscle_id: abs,
        sub_muscle_id: [rectusAbdominisId],
      },
      {
        name: 'Plank',
        description:
          'An isometric exercise where the body is held in a push-up position to engage the entire core.',
        main_muscle_id: abs,
        sub_muscle_id: [rectusAbdominisId, transverseAbdominisId],
      },
      {
        name: 'Leg Raise',
        description:
          'An exercise that targets the lower abs by raising the legs off the ground while lying down.',
        main_muscle_id: abs,
        sub_muscle_id: [rectusAbdominisId, lowerAbsId],
      },
    ];
    const createdExercises = await ExercisesSchema.bulkCreate(
      exercisesData.map(({ sub_muscle_id, ...exercise }) => exercise), // Quitamos sub_muscle_ids antes de insertar
      { returning: true },
    );
    console.log('✅ Exercises inserted');
    //const createdExercises = await ExercisesSchema.bulkCreate( // IS NOT WORKS
    //  exercisesData.map(({ sub_muscle_id, ...exercise }) => exercise) // Quitamos sub_muscle_ids antes de insertar
    //);
    //
    //// Asociar los submúsculos después de la inserción
    //await Promise.all(
    //  createdExercises.map((exercise, index) =>
    //    exercise.$set('subMuscles', exercisesData[index].sub_muscle_id.filter((id): id is number => id !== undefined))
    //  )
    //);
    //console.log('✅ Exercises inserted');
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  }
};

insertData();
