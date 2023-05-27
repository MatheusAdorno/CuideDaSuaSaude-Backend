import { PrismaDextrosRepository } from '@/repositories/prisma/prisma-dextro-repository'
import { RegisterService } from '../register-dextro'

export function makeRegisterDextroService() {
  const dextrosRepository = new PrismaDextrosRepository()
  const registerService = new RegisterService(dextrosRepository)

  return registerService
}
