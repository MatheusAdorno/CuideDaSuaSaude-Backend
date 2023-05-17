import { GlucoseValue, Prisma } from '@prisma/client'

export interface DextrosRepository {
    findById(id: string): Promise<GlucoseValue | null>
    findByPatientId(id: string): Promise<GlucoseValue | void>
    create(data: Prisma.GlucoseValueUncheckedCreateInput): Promise<GlucoseValue>
}
