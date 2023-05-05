import { compare } from 'bcryptjs'

import { HealthProfessionalsRepository } from '@/repositories/health-professionals-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { HealthProfessional } from '@prisma/client'

interface AuthenticateHealthProfessionalServiceRequest {
  email: string
  password: string
}

interface AuthenticateHealthProfessionalServiceResponse {
  healthProfessional: HealthProfessional
}

export class AuthenticateService {
  constructor(
    private healthProfessionalsRepository: HealthProfessionalsRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateHealthProfessionalServiceRequest): Promise<AuthenticateHealthProfessionalServiceResponse> {
    const healthProfessional =
      await this.healthProfessionalsRepository.findByEmail(email)

    if (!healthProfessional) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      healthProfessional.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      healthProfessional,
    }
  }
}
