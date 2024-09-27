# Notification Service - Microservice

Projeto exemplo para Hackaton com objetivo de propor uma solução para gestão de cadastro e agendamento de consultas entre médicos e pacientes.

## Contexto

Este microserviço é parte da aplicação e abrange apenas as funcionalidades de recepção das mensagens contendo os agendamentos realizados pelo microserviço [appointments-service](https://github.com/devair/appointments-service).

Foi desenvolvido em Node.js utilizando TypeScript, RabbitMQ, e segue o padrão de arquitetura em camadas com princípios SOLID. 

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Execução com demais microsserviços

Este microsserviço deve ser executado via docker compose utilizando o projeto contido no repositorio [Hackaton](https://github.com/devair/hackaton-2024), pois existe a dependência de um container com o RabbitMQ e uma instância do Postgres.


## Variáveis de ambiente
Abaixo segue um exemplo das variáveis de ambientes utilizadas nesta aplicação:

```bash
EMAIL_HOST=smtp.exemplo.com
EMAIL_PORT=587
EMAIL_USER=usuario-do-email
EMAIL_PASS=senha-do-email
EMAIL_FROM=email-remetente

# Configurações do RabbitMQ
RABBITMQ_URL=amqp://localhost

# Configuraçao para geraçao do token JWT
JWT_SECRET=MySeCrEt
```