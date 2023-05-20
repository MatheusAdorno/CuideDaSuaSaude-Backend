import { DextrosRepository } from '@/repositories/dextros-repository'
import { GlucoseValue } from '@prisma/client'

interface pacientIdRequest {
    pacientId: string,
}

interface RegisterDextroServiceResponse {
    offsetDextros: Array<GlucoseValue>
}

export class GetOffsetDextroService {
    constructor(private dextrosRepository: DextrosRepository) { }

    async execute({
        pacientId
    }: pacientIdRequest): Promise<RegisterDextroServiceResponse> {

        const dextros = await this.dextrosRepository.findByPatientId(pacientId)

        const offsetDextros: Array<GlucoseValue> = [];

        if (dextros)
            dextros.forEach(element => {
                if (
                    element.measurement_characteristic === "POSTPRANDIAL"
                    && parseInt(element.value) > 180
                )
                    offsetDextros.push(element)
                if (
                    element.measurement_characteristic === "PREPRANDIAL"
                    && parseInt(element.value) > 130
                    || parseInt(element.value) < 80
                )
                    offsetDextros.push(element)
            });

        if (dextros) {
            return { offsetDextros };
        } else {
            throw Error('deu erro aqui em')
        }
    }
}
