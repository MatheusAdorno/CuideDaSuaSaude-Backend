import { PatientProfessionalConexion, Prisma } from '@prisma/client'
import { PatientProfessionalConexionsRepository } from '../patient-professional-conexions-repository'

export class InMemoryPatientProfessionalConexionsRepository
  implements PatientProfessionalConexionsRepository
{
  public items: PatientProfessionalConexion[] = []

  async create(data: Prisma.PatientProfessionalConexionUncheckedCreateInput) {
    const patientProfessionalConexion = {
      patient_id: data.patient_id,
      health_professional_id: data.health_professional_id,
      created_at: new Date(),
    }

    this.items.push(patientProfessionalConexion)

    return patientProfessionalConexion
  }
}
