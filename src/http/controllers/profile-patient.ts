import { makeGetPatientProfileService } from '@/services/factories/make-get-patient-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profilePatient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPatientProfile = makeGetPatientProfileService()

  const { patient } = await getPatientProfile.execute({
    patientId: request.user.sub,
  })

  return reply.status(200).send({
    patient: {
      ...patient,
      password_hash: undefined,
    },
  })
}
