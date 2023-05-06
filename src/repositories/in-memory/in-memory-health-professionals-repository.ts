import { HealthProfessional, Prisma } from '@prisma/client'
import { HealthProfessionalsRepository } from '../health-professionals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryHealthProfessionalsRepository
  implements HealthProfessionalsRepository
{
  public items: HealthProfessional[] = []

  async findById(id: string) {
    const healthProfessional = this.items.find((item) => item.id === id)

    if (!healthProfessional) {
      return null
    }

    return healthProfessional
  }

  async findByEmail(email: string) {
    const healthProfessional = this.items.find((item) => item.email === email)

    if (!healthProfessional) {
      return null
    }

    return healthProfessional
  }

  async create(data: Prisma.HealthProfessionalCreateInput) {
    const healthProfessional = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      office_adress: null,
      phone: null,
      specialty: null,
      created_at: new Date(),
    }

    this.items.push(healthProfessional)

    return healthProfessional
  }
}
