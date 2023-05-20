import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getListDextrosService } from '@/services/factories/list-dextros-service'

export async function listDextros(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const registerParamsSchema = z.object({
            pacientId: z.string(),
            initialDate: z.string().optional(),
            finalDate: z.string().optional()
        })

        const {
            pacientId,
            finalDate,
            initialDate
        } = registerParamsSchema.parse(request.query)

        console.log(finalDate)
        console.log(initialDate)

        const listDextrosService = getListDextrosService()

        const response = await listDextrosService.execute({ pacientId, initialDate, finalDate })

        reply.send({ response })
    } catch (err) {
        return reply.status(400).send({ message: err })
    }

    return reply.status(200).send()
}
