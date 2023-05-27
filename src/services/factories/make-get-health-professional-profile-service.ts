import { PrismaHealthProfessionalRepository } from '@/repositories/prisma/prisma-health-professionals-repository'
import { GetHealthProfessionalProfileService } from '../get-health-professional-profiles'

export function makeGetHealthProfessionalProfileService() {
  const healthProfessionalsRepository = new PrismaHealthProfessionalRepository()
  const getProfileService = new GetHealthProfessionalProfileService(
    healthProfessionalsRepository,
  )

  return getProfileService
}
