import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register-patient'
import { compare } from 'bcryptjs'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { PatientAlreadyExistsError } from './errors/patient/patient-already-exists-error'

let patientsRepository: InMemoryPatientsRepository
let registerPatientService: RegisterService

describe('Register Patient Service', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    registerPatientService = new RegisterService(patientsRepository)
  })

  it('should be able to register', async () => {
    const { patient } = await registerPatientService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(patient.id).toEqual(expect.any(String))
  })

  it('should hash patient password upon registration', async () => {
    const { patient } = await registerPatientService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      patient.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a patient with same email', async () => {
    const email = 'johndoe@example.com'

    await registerPatientService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerPatientService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(PatientAlreadyExistsError)
  })
})
