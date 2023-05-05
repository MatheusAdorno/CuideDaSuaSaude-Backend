import { hash } from 'bcryptjs'

import { PatientsRepository } from '@/repositories/patients-repository'
import { PatientAlreadyExistsError } from './errors/patient/patient-already-exists-error'
import { Patient } from '@prisma/client'

interface registerPatientServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterPatientServiceResponse {
  patient: Patient
}

export class RegisterService {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerPatientServiceRequest): Promise<RegisterPatientServiceResponse> {
    const password_hash = await hash(password, 6)

    const patientWithSameEmail = await this.patientsRepository.findByEmail(
      email,
    )

    if (patientWithSameEmail) {
      throw new PatientAlreadyExistsError()
    }

    const patient = await this.patientsRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      patient,
    }
  }
}
