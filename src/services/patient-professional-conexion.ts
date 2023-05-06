import { PatientProfessionalConexion } from '@prisma/client'
import { PatientProfessionalConexionsRepository } from '@/repositories/patient-professional-conexions-repository'

interface PatientProfessionalConexionServiceRequest {
  patientId: string
  healthProfessionalId: string
}

interface PatientProfessionalConexionServiceResponse {
  patientProfessionalConexion: PatientProfessionalConexion
}

export class PatientProfessionalConexionService {
  constructor(
    private patientProfessionalConexionsRepository: PatientProfessionalConexionsRepository,
  ) {}

  async execute({
    patientId,
    healthProfessionalId,
  }: PatientProfessionalConexionServiceRequest): Promise<PatientProfessionalConexionServiceResponse> {
    const patientProfessionalConexion =
      await this.patientProfessionalConexionsRepository.create({
        patient_id: patientId,
        health_professional_id: healthProfessionalId,
      })

    return {
      patientProfessionalConexion,
    }
  }
}
