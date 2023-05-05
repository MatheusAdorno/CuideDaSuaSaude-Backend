import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { AuthenticateService } from './authenticate-patient'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let patientsRepository: InMemoryPatientsRepository
let authenticatePatientService: AuthenticateService

describe('Authenticate Patient Service', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    authenticatePatientService = new AuthenticateService(patientsRepository)
  })

  it('should be able to authenticate', async () => {
    await patientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { patient } = await authenticatePatientService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(patient.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticatePatientService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await patientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticatePatientService.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
