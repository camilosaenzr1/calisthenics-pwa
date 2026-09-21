import { db } from './db';

export async function seedDatabase() {
  const usersCount = await db.users.count();
  if (usersCount > 0) return; // Ya hay datos

  // Crear usuarios iniciales
  await db.users.bulkAdd([
    {
      name: 'Camilo',
      age: 30,
      height: 170,
      weight: 74.5,
      activity_level: 'moderado',
      goal: 'perder_grasa',
      created_at: new Date().toISOString()
    },
    {
      name: 'Esposa de Camilo',
      age: 30,
      height: 160,
      weight: 60,
      activity_level: 'ligero',
      goal: 'mantener',
      created_at: new Date().toISOString()
    }
  ]);

  // Ejercicios Nivel 1 y 2
  await db.exercises.bulkAdd([
    {
      name: 'Flexiones en Pared',
      pattern: 'Push Horizontal',
      level: 1,
      description: 'De pie, empujando la pared. 3x15 repeticiones fluidas.',
      next_level_criteria: '3x15'
    },
    {
      name: 'Flexiones Inclinadas',
      pattern: 'Push Horizontal',
      level: 2,
      description: 'Manos apoyadas en mesa o silla estable. 3x12 repeticiones.',
      next_level_criteria: '3x12'
    },
    {
      name: 'Remos de Puerta',
      pattern: 'Pull Horizontal',
      level: 1,
      description: 'Sosteniéndose del marco de una puerta, dejarse caer y traccionar.',
      next_level_criteria: '3x15'
    },
    {
      name: 'Remo Australiano Inclinado',
      pattern: 'Pull Horizontal',
      level: 2,
      description: 'Usando una mesa resistente o sábanas en la puerta.',
      next_level_criteria: '3x10'
    },
    {
      name: 'Flexiones de Pica (Alta)',
      pattern: 'Push Vertical',
      level: 1,
      description: 'Flexión inclinada con cadera a 90 grados.',
      next_level_criteria: '3x10'
    },
    {
      name: 'Deslizamientos de Pared',
      pattern: 'Pull Vertical',
      level: 1,
      description: 'Brazos en W subiendo a Y contra la pared.',
      next_level_criteria: '3x12'
    },
    {
      name: 'Sentadilla Asistida',
      pattern: 'Piernas',
      level: 1,
      description: 'Sosteniéndose del marco de la puerta.',
      next_level_criteria: '3x15'
    },
    {
      name: 'Bicho Muerto (Dead Bug)',
      pattern: 'Core',
      level: 1,
      description: 'Acostado, extender brazo y pierna contraria.',
      next_level_criteria: '3x16'
    }
  ]);
}
