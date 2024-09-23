import { InputAppointmentCreated } from "../../core/useCases/dtos/InputAppointmentCreated"
import { IAppointmentCreatedUseCase } from "../../core/useCases/IAppointmentCreatedUseCase"
import { transporter } from "../../infra/notification/EmailConfig"

export class AppointmentCreatedUseCase implements IAppointmentCreatedUseCase {

    static FROM_ADDRESS: string = process.env.EMAIL_FROM;

    private emailProvider: any

    constructor() {
        this.emailProvider = transporter
    }

    async execute(input: InputAppointmentCreated): Promise<boolean> {
        const { doctorEmail, doctorName, patientName,appointmentTime } = input

        // Garantir que appointmentTime seja um objeto Date
        const appointmentDate = new Date(appointmentTime)

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Formato 24 horas
            timeZone: 'UTC' // Usar o UTC para evitar problemas de fuso horário
        }

        // Formatando a data corretamente
        const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(appointmentDate)

        // Enviar o e-mail com a data formatada
        const info = await this.emailProvider.sendMail({
            from: AppointmentCreatedUseCase.FROM_ADDRESS, // sender address
            to: doctorEmail,
            subject: 'Health&Med - Nova consulta agendada',
            text: `Olá, Dr. ${doctorName}!\n\nVocê tem uma nova consulta marcada!\n\nPaciente: ${patientName}.\nData e horário: ${formattedDate}.\n\nSaudações, Health&Med.`
        })

        // Verificando o sucesso do envio do e-mail
        const success = info?.response.startsWith('250')

        return success
    }
}
