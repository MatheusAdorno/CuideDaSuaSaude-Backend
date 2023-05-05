import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate-health-professional'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryHealthProfessionalsRepository } from '@/repositories/in-memory/in-memory-health-professionals-repository'

let healthProfessionalsRepository: InMemoryHealthProfessionalsRepository
let authenticateHealthProfessionalService: AuthenticateService

describe('Authenticate Health Professional Service', () => {
  beforeEach(() => {
    healthProfessionalsRepository = new InMemoryHealthProfessionalsRepository()
    authenticateHealthProfessionalService = new AuthenticateService(
      healthProfessionalsRepository,
    )
  })

  it('should be able to authenticate', async () => {
    await healthProfessionalsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { healthProfessional } =
      await authenticateHealthProfessionalService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(healthProfessional.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateHealthProfessionalService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await healthProfessionalsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateHealthProfessionalService.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
