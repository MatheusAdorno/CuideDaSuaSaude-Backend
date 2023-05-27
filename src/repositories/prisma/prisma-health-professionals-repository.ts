import { HealthProfessional, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { HealthProfessionalsRepository } from '../health-professionals-repository'

export class PrismaHealthProfessionalRepository
  implements HealthProfessionalsRepository
{
  async findById(id: string): Promise<HealthProfessional | null> {
    const healthProfessional = await prisma.healthProfessional.findUnique({
      where: {
        id,
      },
    })

    return healthProfessional
  }

  async findByEmail(email: string) {
    const healthProfessional = await prisma.healthProfessional.findUnique({
      where: {
        email,
      },
    })

    return healthProfessional
  }

  // async findByPatientEmail(email: string) {
  //   const healthProfessional = await prisma.healthProfessional.findMany({
  //     where: {
  //       PatientHealthProfessional: email,
  //     },
  //   })

  //   return healthProfessional
  // }

  async create(data: Prisma.HealthProfessionalCreateInput) {
    const healthProfessional = await prisma.healthProfessional.create({
      data,
    })

    return healthProfessional
  }
}
