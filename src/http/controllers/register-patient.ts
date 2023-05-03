import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { RegisterService } from '@/services/register-patient'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { PatientAlreadyExistsError } from '@/services/errors/patient/patient-already-exists-error'

export async function registerPatient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const patientsRepository = new PrismaPatientsRepository()
    const registerService = new RegisterService(patientsRepository)

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof PatientAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
