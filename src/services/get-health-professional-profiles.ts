import { HealthProfessionalsRepository } from '@/repositories/health-professionals-repository'
import { HealthProfessional } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetHealthProfessionalProfileServiceRequest {
  healthProfessionalId: string
}

interface GetHealthProfessionalProfileServiceResponse {
  healthProfessional: HealthProfessional
}

export class GetHealthProfessionalProfileService {
  constructor(
    private healthProfessionalsRepository: HealthProfessionalsRepository,
  ) {}

  async execute({
    healthProfessionalId,
  }: GetHealthProfessionalProfileServiceRequest): Promise<GetHealthProfessionalProfileServiceResponse> {
    const healthProfessional =
      await this.healthProfessionalsRepository.findById(healthProfessionalId)

    if (!healthProfessional) {
      throw new ResourceNotFoundError()
    }

    return {
      healthProfessional,
    }
  }
}
