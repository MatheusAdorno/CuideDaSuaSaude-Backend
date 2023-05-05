import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { AuthenticateService } from '@/services/authenticate-patient'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

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
    const patientsRepository = new PrismaPatientsRepository()
    const authenticateService = new AuthenticateService(patientsRepository)

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
