import { Patient, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PatientsRepository } from '../patients-repository'

export class PrismaPatientsRepository implements PatientsRepository {
  async findById(id: string): Promise<Patient | null> {
    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
    })

    return patient
  }

  async findByEmail(email: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        email,
      },
    })

    return patient
  }

  async findGlucoseValues(id: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
    })

    return patient
  }

  async findProfessionalsFromPatientEmail(id: string) {
    const patient = await prisma.patient.findMany({
      where: {
        // health_professional_id: id,
      },
    })

    return patient
  }

  async create(data: Prisma.PatientCreateInput) {
    const patient = await prisma.patient.create({
      data,
    })

    return patient
  }
}
