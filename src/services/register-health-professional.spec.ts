import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register-health-professional'
import { compare } from 'bcryptjs'
import { InMemoryHealthProfessionalsRepository } from '@/repositories/in-memory/in-memory-health-professionals-repository'
import { HealthProfessionalAlreadyExistsError } from './errors/health-professional/health-professional-already-exists-error'

let healthProfessionalRepository: InMemoryHealthProfessionalsRepository
let registerHealthProfessionalService: RegisterService

describe('Register Health Professional Service', () => {
  beforeEach(() => {
    healthProfessionalRepository = new InMemoryHealthProfessionalsRepository()
    registerHealthProfessionalService = new RegisterService(
      healthProfessionalRepository,
    )
  })

  it('should be able to register', async () => {
    const { healthProfessional } =
      await registerHealthProfessionalService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(healthProfessional.id).toEqual(expect.any(String))
  })

  it('should hash health professional password upon registration', async () => {
    const { healthProfessional } =
      await registerHealthProfessionalService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      healthProfessional.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a health professional with same email', async () => {
    const email = 'johndoe@example.com'

    await registerHealthProfessionalService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerHealthProfessionalService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(HealthProfessionalAlreadyExistsError)
  })
})
