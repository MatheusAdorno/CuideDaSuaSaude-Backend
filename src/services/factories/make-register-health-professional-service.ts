import { PrismaHealthProfessionalRepository } from '@/repositories/prisma/prisma-health-professionals-repository'
import { RegisterService } from '../register-health-professional'

export function makeRegisterHealthProfessionalService() {
  const healthProfessionalsRepository = new PrismaHealthProfessionalRepository()
  const registerService = new RegisterService(healthProfessionalsRepository)

  return registerService
}
