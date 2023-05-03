import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PatientsRepository } from '../patients-repository'

export class PrismaPatientsRepository implements PatientsRepository {
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
