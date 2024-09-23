import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppointmentCreatedUseCase } from "./useCases/AppointmentCreatedUseCase"
import { AppointmentCreatedQueueAdapterIN } from "../infra/messaging/AppointmentCreatedQueueAdapterIN"

dotenv.config()

const app = express()
app.disable("x-powered-by")
app.use(express.json())

const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''


app.listen(3000, '0.0.0.0', async () => {
    console.log(`Notification service running on port 3000`)

    const appointmentCreatedUseCase = new AppointmentCreatedUseCase()

    const appointmentCreatedConsumer = new AppointmentCreatedQueueAdapterIN(rabbitMqUrl, appointmentCreatedUseCase)
    await appointmentCreatedConsumer.consume()

})