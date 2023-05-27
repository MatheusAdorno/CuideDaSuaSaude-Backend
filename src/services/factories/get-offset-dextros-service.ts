import { PrismaDextrosRepository } from '@/repositories/prisma/prisma-dextro-repository'
import { GetOffsetDextroService } from '../offset-dextro'

export function getOffsetDextroService() {
  const dextrosRepository = new PrismaDextrosRepository()
  const offsetDextroService = new GetOffsetDextroService(dextrosRepository)

  return offsetDextroService
}
