import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateHealthProfessionalService } from '@/services/factories/make-authenticate-health-professional-service'

export async function authenticateHealthProfessional(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateHealthProfessionalService()

    const { healthProfessional } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: healthProfessional.id,
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
