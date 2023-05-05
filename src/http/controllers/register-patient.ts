import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PatientAlreadyExistsError } from '@/services/errors/patient/patient-already-exists-error'
import { makeRegisterPatientService } from '@/services/factories/make-register-patient-service'

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
    const registerService = makeRegisterPatientService()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof PatientAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send() // TODO: fix me  }
  }

  return reply.status(201).send()
}
