import { compare } from 'bcryptjs'

import { PatientsRepository } from '@/repositories/patients-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Patient } from '@prisma/client'

interface AuthenticatePatientServiceRequest {
  email: string
  password: string
}

interface AuthenticatePatientServiceResponse {
  patient: Patient
}

export class AuthenticateService {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticatePatientServiceRequest): Promise<AuthenticatePatientServiceResponse> {
    const patient = await this.patientsRepository.findByEmail(email)

    if (!patient) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, patient.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      patient,
    }
  }
}
