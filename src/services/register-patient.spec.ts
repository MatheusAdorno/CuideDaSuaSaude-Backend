import { expect, describe, it } from 'vitest'
import { RegisterService } from './register-patient'
import { compare } from 'bcryptjs'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { PatientAlreadyExistsError } from './errors/patient/patient-already-exists-error'

describe('Register Patient Service', () => {
  it('should be able to register', async () => {
    const patientsRepository = new InMemoryPatientsRepository()
    const registerPatientService = new RegisterService(patientsRepository)

    const { patient } = await registerPatientService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(patient.id).toEqual(expect.any(String))
  })

  it('should hash patient password upon registration', async () => {
    const patientsRepository = new InMemoryPatientsRepository()
    const registerPatientService = new RegisterService(patientsRepository)

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
    const patientsRepository = new InMemoryPatientsRepository()
    const registerPatientService = new RegisterService(patientsRepository)

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
