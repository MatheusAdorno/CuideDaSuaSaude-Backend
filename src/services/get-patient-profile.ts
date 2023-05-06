import { PatientsRepository } from '@/repositories/patients-repository'
import { Patient } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPatientProfileServiceRequest {
  patientId: string
}

interface GetPatientProfileServiceResponse {
  patient: Patient
}

export class GetPatientProfileService {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    patientId,
  }: GetPatientProfileServiceRequest): Promise<GetPatientProfileServiceResponse> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    return {
      patient,
    }
  }
}
