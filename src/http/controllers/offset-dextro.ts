import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getOffsetDextroService } from '@/services/factories/get-offset-dextros-service'

export async function offsetDextro(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const registerParamsSchema = z.object({
            pacientId: z.string(),
        })

        const { pacientId } = registerParamsSchema.parse(request.params)

        const offsetDextroService = getOffsetDextroService()

        const response = await offsetDextroService.execute({ pacientId })

        reply.send({ response })
    } catch (err) {
        return reply.status(400).send({ message: err })
    }

    return reply.status(200).send()
}
