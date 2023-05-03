import { Patient, Prisma } from '@prisma/client'

export interface PatientsRepository {
  findByEmail(email: string): Promise<Patient | null>
  create(data: Prisma.PatientCreateInput): Promise<Patient>
}
