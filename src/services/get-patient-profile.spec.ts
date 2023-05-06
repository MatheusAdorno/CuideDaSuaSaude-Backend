import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { GetPatientProfileService } from './get-patient-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let patientsRepository: InMemoryPatientsRepository
let getPatientProfileService: GetPatientProfileService

describe('Get Patient Profile Service', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    getPatientProfileService = new GetPatientProfileService(patientsRepository)
  })

  it('should be able to get a patient profile', async () => {
    const createdPatient = await patientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { patient } = await getPatientProfileService.execute({
      patientId: createdPatient.id,
    })

    expect(patient.id).toEqual(expect.any(String))
    expect(patient.name).toEqual('John Doe')
  })

  it('should not be able to get a patient profile with a wrong id', async () => {
    await expect(() =>
      getPatientProfileService.execute({
        patientId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
