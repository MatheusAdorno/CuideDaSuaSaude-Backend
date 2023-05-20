import { HealthProfessional, Patient, Prisma } from '@prisma/client'

export interface PatientsRepository {
  findById(id: string): Promise<Patient | null>
  findByEmail(email: string): Promise<Patient | null>
  create(data: Prisma.PatientCreateInput): Promise<Patient>
  findGlucoseValues(id: string): Promise<Patient | null>
}
