import { InputAppointmentCreated } from "./dtos/InputAppointmentCreated"

export interface IAppointmentCreatedUseCase {
    execute( input: InputAppointmentCreated ): Promise<boolean>
}