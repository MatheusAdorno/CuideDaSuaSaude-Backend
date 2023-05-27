import { makeGetHealthProfessionalProfileService } from '@/services/factories/make-get-health-professional-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profileHealthProfessional(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getHealthProfessionalProfile = makeGetHealthProfessionalProfileService()

  const { healthProfessional } = await getHealthProfessionalProfile.execute({
    healthProfessionalId: request.user.sub,
  })

  return reply.status(200).send({
    healthProfessional: {
      ...healthProfessional,
      password_hash: undefined,
    },
  })
}
