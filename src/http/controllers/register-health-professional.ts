import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { RegisterService } from '@/services/register-health-professional'
import { PrismaHealthProfessionalRepository } from '@/repositories/prisma/prisma-health-professionals-repository'
import { HealthProfessionalAlreadyExistsError } from '@/services/errors/health-professional/health-professional-already-exists-error'

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
    const healthProfessionalsRepository =
      new PrismaHealthProfessionalRepository()
    const registerService = new RegisterService(healthProfessionalsRepository)

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
