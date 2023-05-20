import { DextrosRepository } from '@/repositories/dextros-repository'
import { GlucoseValue } from '@prisma/client'

interface measurementTimeRequest {
    pacientId: string,
    initialDate?: string,
    finalDate?: string
}

interface RegisterDextroServiceResponse {
    dextros: Array<GlucoseValue>
}

export class GetListDextrosService {
    constructor(private dextrosRepository: DextrosRepository) { }

    async execute({
        pacientId,
        initialDate,
        finalDate
    }: measurementTimeRequest): Promise<RegisterDextroServiceResponse> {

        const dextros = await this.dextrosRepository.findByPatientId(pacientId)

        const listOfDextros: Array<GlucoseValue> = [];

        if (dextros) {
            if (initialDate) {
                let todayDate = new Date().getTime()
                if (!finalDate) {
                    dextros.forEach(element => {
                        const timeDif = todayDate - element.measurement_time.getTime()
                        if (timeDif <= parseInt(initialDate) * 86400000) {
                            console.log(timeDif, parseInt(initialDate) * 86400000)
                            listOfDextros.push(element)
                        }
                    });
                } else {
                    // initialDate format: YYYY-MM-DD
                    // finalDate format: YYYY-MM-DD
                    const minimumDate = new Date(initialDate)
                    const maximumDate = new Date(finalDate)
                    dextros.forEach(element => {
                        if (
                            element.measurement_time >= minimumDate
                            && element.measurement_time <= maximumDate
                        ) {
                            listOfDextros.push(element)
                        }
                    });
                }

            } else {
                return { dextros };
            }

            return { dextros: listOfDextros };
        } else {
            throw Error('deu erro aqui em')
        }
    }
}
