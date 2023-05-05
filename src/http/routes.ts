import { FastifyInstance } from 'fastify'

import { registerPatient } from './controllers/register-patient'
import { registerHealthProfessional } from './controllers/register-health-professional'
import { authenticatePatient } from './controllers/authenticate-patient'
import { authenticateHealthProfessional } from './controllers/authenticate-health-professional'

export async function appRoutes(app: FastifyInstance) {
  app.post('/patients', registerPatient)
  app.post('/patients_sessions', authenticatePatient)

  app.post('/health_professionals', registerHealthProfessional)
  app.post('/health_professionals_sessions', authenticateHealthProfessional)
}
