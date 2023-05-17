import { GlucoseValue, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { DextrosRepository } from '../dextros-repository'

export class PrismaDextrosRepository implements DextrosRepository {
    async findById(id: string): Promise<GlucoseValue | null> {
        const dextro = await prisma.glucoseValue.findUnique({
            where: {
                id
            }
        })
        return dextro;
        // throw new Error('Method not implemented.')
    }

    async findByPatientId(id: string) {
        throw new Error('Method not implemented.')
    }

    async create(data: Prisma.GlucoseValueUncheckedCreateInput) {
        const dextro = await prisma.glucoseValue.create({
            data,
        })

        return dextro
    }
}
