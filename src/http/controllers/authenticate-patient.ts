import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticatePatientService } from '@/services/factories/make-authenticate-patient-service'

export async function authenticatePatient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticatePatientService()

    const { patient } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: patient.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
