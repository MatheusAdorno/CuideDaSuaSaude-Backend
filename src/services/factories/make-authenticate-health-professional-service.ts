import { PrismaHealthProfessionalRepository } from '@/repositories/prisma/prisma-health-professionals-repository'
import { AuthenticateService } from '../authenticate-health-professional'

export function makeAuthenticateHealthProfessionalService() {
  const healthProfessionalsRepository = new PrismaHealthProfessionalRepository()
  const authenticateService = new AuthenticateService(
    healthProfessionalsRepository,
  )

  return authenticateService
}
