import { PrismaDextrosRepository } from '@/repositories/prisma/prisma-dextro-repository'
import { GetListDextrosService } from '../list-dextros'

export function getListDextrosService() {
    const dextrosRepository = new PrismaDextrosRepository()
    const listDextrosService = new GetListDextrosService(dextrosRepository)

    return listDextrosService
}
