import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Fitness App Backend API',
    version: '1.0.0',
    description: 'Documentación de los endpoints de la API REST',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/index/**/*.ts', './src/infrastructure/routes/**/*.ts', './src/presentation/controllers/**/*.ts'], // rutas de tus archivos con anotaciones
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
