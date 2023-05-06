import { HealthProfessional, Prisma } from '@prisma/client'

export interface HealthProfessionalsRepository {
  findById(id: string): Promise<HealthProfessional | null>
  findByEmail(email: string): Promise<HealthProfessional | null>
  create(
    data: Prisma.HealthProfessionalCreateInput,
  ): Promise<HealthProfessional>
}
