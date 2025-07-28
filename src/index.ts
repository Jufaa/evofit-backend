import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
// Import routes
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morganMiddleware from 'infrastructure/middlewares/morganMiddleware';
import UserRouter from './presentation/routes/UserRouter';
import ProtectedRouter from './presentation/routes/ProtectedRouter';
import RoutineRouter from './presentation/routes/RoutineRouter';
import RoutineExerciseRouter from './presentation/routes/RoutineExerciseRouter';
import ExerciseRouter from './presentation/routes/ExerciseRouter';
import SubMuscleRouter from './presentation/routes/SubMuscleRouter';
import MainMuscleRouter from './presentation/routes/MainMuscleRouter';
import { syncDatabase } from '@infrastructure/database/sync-db';

const app = express();
const port = process.env.PORT;

// Add JSON middleware to parse incoming requests
app.use(express.json());
// Use Helmet to secure Express app by setting various HTTP headers
app.use(helmet());
// Enable CORS with various options
app.use(cors());
// Use Morgan middleware for logging requests
app.use(morganMiddleware);
// Use routes
app.use('/auth', UserRouter);
app.use('/protected', ProtectedRouter);
app.use('/exercise', ExerciseRouter);
app.use('/routines', RoutineRouter);
app.use('/routine-exercise', RoutineExerciseRouter);
app.use('/submuscle', SubMuscleRouter);
app.use('/mainmuscle', MainMuscleRouter);
// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express application',
    },
  },
  apis: ['./src/presentation/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server and export the server instance
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

syncDatabase()
// Export both the app and the server for testing later
export { app, server };
