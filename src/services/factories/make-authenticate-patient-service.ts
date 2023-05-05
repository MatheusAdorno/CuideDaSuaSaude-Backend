import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { AuthenticateService } from '../authenticate-patient'

export function makeAuthenticatePatientService() {
  const patientsRepository = new PrismaPatientsRepository()
  const authenticateService = new AuthenticateService(patientsRepository)

  return authenticateService
}
