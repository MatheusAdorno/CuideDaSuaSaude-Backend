import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryHealthProfessionalsRepository } from '@/repositories/in-memory/in-memory-health-professionals-repository'
import { GetHealthProfessionalProfileService } from './get-health-professional-profiles'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let healthProfessionalsRepository: InMemoryHealthProfessionalsRepository
let getHealthProfessionalProfileService: GetHealthProfessionalProfileService

describe('Get Health Professional Profile Service', () => {
  beforeEach(() => {
    healthProfessionalsRepository = new InMemoryHealthProfessionalsRepository()
    getHealthProfessionalProfileService =
      new GetHealthProfessionalProfileService(healthProfessionalsRepository)
  })

  it('should be able to get a health professional profile', async () => {
    const createdHealthProfessional =
      await healthProfessionalsRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      })

    const { healthProfessional } =
      await getHealthProfessionalProfileService.execute({
        healthProfessionalId: createdHealthProfessional.id,
      })

    expect(healthProfessional.id).toEqual(expect.any(String))
    expect(healthProfessional.name).toEqual('John Doe')
  })

  it('should not be able to get a health professional profile with a wrong id', async () => {
    await expect(() =>
      getHealthProfessionalProfileService.execute({
        healthProfessionalId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
