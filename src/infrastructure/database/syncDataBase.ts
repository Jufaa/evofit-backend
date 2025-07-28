//sicroniza los modelos con la bd

import { sequelize } from './sync-db';

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos correctamente.');

    await sequelize.sync({ alter: true }); // Crea o actualiza tablas
    console.log('✅ Base de datos sincronizada correctamente.');
    console.log(
      'Modelos registrados en Sequelize:',
      Object.keys(sequelize.models),
    );
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
};

syncDatabase();
