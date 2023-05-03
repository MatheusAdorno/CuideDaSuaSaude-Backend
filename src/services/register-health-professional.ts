import { hash } from 'bcryptjs'

import { HealthProfessionalsRepository } from '@/repositories/health-professionals-repository'
import { HealthProfessionalAlreadyExistsError } from './errors/health-professional/health-professional-already-exists-error'

interface registerHealthProfessionalServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(
    private healthProfessionalRepository: HealthProfessionalsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: registerHealthProfessionalServiceRequest) {
    const password_hash = await hash(password, 6)

    const healthProfessionalWithSameEmail =
      await this.healthProfessionalRepository.findByEmail(email)

    if (healthProfessionalWithSameEmail) {
      throw new HealthProfessionalAlreadyExistsError()
    }

    await this.healthProfessionalRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
