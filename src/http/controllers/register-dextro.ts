import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeRegisterDextroService } from '@/services/factories/make-register-dextro-service'

export async function registerDextro(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const MeasurementCharacteristic = ["FASTING", "PREPRANDIAL", "POSTPRANDIAL"] as const
    const registerBodySchema = z.object({
        value: z.string(),
        measurementTime: z.string().datetime().optional(),
        measurementCharacteristic: z.enum(MeasurementCharacteristic).optional(),
        observations: z.string().optional(),
        patientId: z.string()
    })

    const {
        measurementCharacteristic,
        measurementTime,
        observations,
        patientId,
        value
    } = registerBodySchema.parse(request.body)

    try {
        const registerService = makeRegisterDextroService()

        await registerService.execute({
            measurementCharacteristic,
            measurementTime,
            observations,
            patientId,
            value
        })
    } catch (err) {
        // if (err instanceof PatientAlreadyExistsError) {
        // }
        return reply.status(409).send({ message: err })

        return reply.status(500).send() // TODO: fix me  }
    }

    return reply.status(201).send()
}
