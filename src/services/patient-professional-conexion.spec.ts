import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPatientProfessionalConexionsRepository } from '@/repositories/in-memory/in-memory-patient-professional-conexions-repository'
import { PatientProfessionalConexionService } from './patient-professional-conexion'

let patientProfessionalConexionsRepository: InMemoryPatientProfessionalConexionsRepository
let patientProfessionalConexionService: PatientProfessionalConexionService

describe('Patient Professional Service', () => {
  beforeEach(() => {
    patientProfessionalConexionsRepository =
      new InMemoryPatientProfessionalConexionsRepository()
    patientProfessionalConexionService = new PatientProfessionalConexionService(
      patientProfessionalConexionsRepository,
    )
  })

  it('should be able to create a conexions between a patient and a health professional', async () => {
    const { patientProfessionalConexion } =
      await patientProfessionalConexionService.execute({
        patientId: 'patient-01',
        healthProfessionalId: 'health-professional-01',
      })

    expect(patientProfessionalConexion.patient_id).toEqual(expect.any(String))
    expect(patientProfessionalConexion.health_professional_id).toEqual(
      expect.any(String),
    )
  })
})
