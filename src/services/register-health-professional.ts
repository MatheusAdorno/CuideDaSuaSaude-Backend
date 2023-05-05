import { hash } from 'bcryptjs'

import { HealthProfessionalsRepository } from '@/repositories/health-professionals-repository'
import { HealthProfessionalAlreadyExistsError } from './errors/health-professional/health-professional-already-exists-error'
import { HealthProfessional } from '@prisma/client'

interface registerHealthProfessionalServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterHealthProfessionalServiceResponse {
  healthProfessional: HealthProfessional
}

export class RegisterService {
  constructor(
    private healthProfessionalRepository: HealthProfessionalsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: registerHealthProfessionalServiceRequest): Promise<RegisterHealthProfessionalServiceResponse> {
    const password_hash = await hash(password, 6)

    const healthProfessionalWithSameEmail =
      await this.healthProfessionalRepository.findByEmail(email)

    if (healthProfessionalWithSameEmail) {
      throw new HealthProfessionalAlreadyExistsError()
    }

    const healthProfessional = await this.healthProfessionalRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      healthProfessional,
    }
  }
}
