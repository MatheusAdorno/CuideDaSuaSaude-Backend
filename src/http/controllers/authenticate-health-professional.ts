import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaHealthProfessionalRepository } from '@/repositories/prisma/prisma-health-professionals-repository'
import { AuthenticateService } from '@/services/authenticate-health-professional'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

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
    const healthProfessionalsRepository =
      new PrismaHealthProfessionalRepository()
    const authenticateService = new AuthenticateService(
      healthProfessionalsRepository,
    )

    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
