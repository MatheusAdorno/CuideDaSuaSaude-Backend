import { Patient, Prisma } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'

export class InMemoryPatientsRepository implements PatientsRepository {
  public items: Patient[] = []

  async findById(id: string) {
    const patient = this.items.find((item) => item.id === id)

    if (!patient) {
      return null
    }

    return patient
  }

  async findByEmail(email: string) {
    const patient = this.items.find((item) => item.email === email)

    if (!patient) {
      return null
    }

    return patient
  }

  async create(data: Prisma.PatientCreateInput) {
    const patient = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      date_of_birth: null,
      health_problems: null,
      medications: null,
      phone: null,
      created_at: new Date(),
    }

    this.items.push(patient)

    return patient
  }
}
