import { PatientProfessionalConexion, Prisma } from '@prisma/client'

export interface PatientProfessionalConexionsRepository {
  create(
    data: Prisma.PatientProfessionalConexionUncheckedCreateInput,
  ): Promise<PatientProfessionalConexion>
}
