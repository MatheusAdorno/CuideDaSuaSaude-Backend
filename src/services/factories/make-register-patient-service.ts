import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { RegisterService } from '../register-patient'

export function makeRegisterPatientService() {
  const patientsRepository = new PrismaPatientsRepository()
  const registerService = new RegisterService(patientsRepository)

  return registerService
}
