import { FastifyInstance } from 'fastify'

import { registerPatient } from './controllers/register-patient'
import { registerHealthProfessional } from './controllers/register-health-professional'

export async function appRoutes(app: FastifyInstance) {
  app.post('/patients', registerPatient)
  app.post('/health_professionals', registerHealthProfessional)
}
