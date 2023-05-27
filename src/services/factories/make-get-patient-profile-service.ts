import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { GetPatientProfileService } from '../get-patient-profile'

export function makeGetPatientProfileService() {
  const patientsRepository = new PrismaPatientsRepository()
  const getProfileService = new GetPatientProfileService(patientsRepository)

  return getProfileService
}
