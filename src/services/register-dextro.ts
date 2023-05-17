import { DextrosRepository } from '@/repositories/dextros-repository'
import { GlucoseValue, MeasurementCharacteristic } from '@prisma/client'

interface registerDextroServiceRequest {
    value: string,
    measurementTime?: Date | string,
    measurementCharacteristic?: MeasurementCharacteristic,
    observations?: string,
    patientId: string
}

interface RegisterDextroServiceResponse {
    dextro: GlucoseValue
}

export class RegisterService {
    constructor(private dextrosRepository: DextrosRepository) { }

    async execute({
        value,
        measurementCharacteristic,
        measurementTime,
        observations,
        patientId
    }: registerDextroServiceRequest): Promise<RegisterDextroServiceResponse> {

        const dextro = await this.dextrosRepository.create({
            value,
            measurement_characteristic: measurementCharacteristic,
            measurement_time: measurementTime,
            observations,
            patient_id: patientId
        })

        return {
            dextro,
        }
    }
}
