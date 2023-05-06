import { Patient, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PatientsRepository } from '../patients-repository'

export class PrismaPatientsRepository implements PatientsRepository {
  findById(id: string): Promise<Patient | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        email,
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
