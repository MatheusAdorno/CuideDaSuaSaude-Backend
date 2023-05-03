import { HealthProfessional, Prisma } from '@prisma/client'

export interface HealthProfessionalsRepository {
  findByEmail(email: string): Promise<HealthProfessional | null>
  create(
    data: Prisma.HealthProfessionalCreateInput,
  ): Promise<HealthProfessional>
}
