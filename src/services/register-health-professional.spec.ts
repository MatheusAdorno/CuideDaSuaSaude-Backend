import { expect, describe, it } from 'vitest'
import { RegisterService } from './register-health-professional'
import { compare } from 'bcryptjs'
import { InMemoryHealthProfessionalsRepository } from '@/repositories/in-memory/in-memory-health-professionals-repository'
import { HealthProfessionalAlreadyExistsError } from './errors/health-professional/health-professional-already-exists-error'

describe('Register Health Professional Service', () => {
  it('should be able to register', async () => {
    const healthProfessionalRepository =
      new InMemoryHealthProfessionalsRepository()
    const registerHealthProfessionalService = new RegisterService(
      healthProfessionalRepository,
    )

    const { healthProfessional } =
      await registerHealthProfessionalService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(healthProfessional.id).toEqual(expect.any(String))
  })

  it('should hash health professional password upon registration', async () => {
    const healthProfessionalRepository =
      new InMemoryHealthProfessionalsRepository()
    const registerHealthProfessionalService = new RegisterService(
      healthProfessionalRepository,
    )

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
    const healthProfessionalRepository =
      new InMemoryHealthProfessionalsRepository()
    const registerHealthProfessionaltService = new RegisterService(
      healthProfessionalRepository,
    )

    const email = 'johndoe@example.com'

    await registerHealthProfessionaltService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerHealthProfessionaltService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(HealthProfessionalAlreadyExistsError)
  })
})
