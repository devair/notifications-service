import amqpCallback from "amqplib/callback_api"
import { IAppointmentCreatedUseCase } from "../../core/useCases/IAppointmentCreatedUseCase"
import { InputAppointmentCreated } from "../../core/useCases/dtos/InputAppointmentCreated"
import { QueueNames } from "../../core/messaging/QueueNames"

export class AppointmentCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private appointmentCreatedUseCase: IAppointmentCreatedUseCase
    ) { }

    async consume() {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err
                }
                channel.assertQueue(QueueNames.APPOINTMENT_CREATED, { durable: true })
                channel.consume(QueueNames.APPOINTMENT_CREATED, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                 
                            console.log(JSON.parse(msg.content.toString()))           
                            const appointment: InputAppointmentCreated = JSON.parse(msg.content.toString())

                            console.log('Appointment - Received:', appointment)

                            // Aqui o servico persiste e publica na mesma transacao para o proximo canal
                            await this.appointmentCreatedUseCase.execute(appointment)
                            channel.ack(msg)
                        } catch (error) {
                            console.error('Processing error', error.message)
                            // Rejeita a mensagem e reencaminha para a fila
                            channel.nack(msg)
                        }
                    }
                }, { noAck: false })
            })
        })
    }

}