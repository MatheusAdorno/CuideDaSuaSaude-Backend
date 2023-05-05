import { HealthProfessional, Prisma } from '@prisma/client'
import { HealthProfessionalsRepository } from '../health-professionals-repository'

export class InMemoryHealthProfessionalsRepository
  implements HealthProfessionalsRepository
{
  public items: HealthProfessional[] = []

  async findByEmail(email: string) {
    const healthProfessional = this.items.find((item) => item.email === email)

    if (!healthProfessional) {
      return null
    }

    return healthProfessional
  }

  async create(data: Prisma.HealthProfessionalCreateInput) {
    const healthProfessional = {
      id: 'user-1',
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
