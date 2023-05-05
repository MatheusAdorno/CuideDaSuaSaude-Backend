import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { HealthProfessionalAlreadyExistsError } from '@/services/errors/health-professional/health-professional-already-exists-error'
import { makeRegisterHealthProfessionalService } from '@/services/factories/make-register-health-professional-service'

export async function registerHealthProfessional(
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
    const registerService = makeRegisterHealthProfessionalService()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HealthProfessionalAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send() // TODO: fix me  }
  }

  return reply.status(201).send()
}
