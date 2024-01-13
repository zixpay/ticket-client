
# ZixPay Ticket ⚜️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/YourUsername/YourRepository/blob/main/LICENSE)


O projeto é uma solução de pagamento que proporciona flexibilidade e controle financeiro ao usuário. Com este serviço, o usuário pode dividir o pagamento de boletos em até três parcelas, simplesmente inserindo o código de barras no sistema ZixPay. Essa plataforma foi projetada para atender a necessidade de pagamentos mais flexíveis e evitar dívidas recorrentes.

A utilização é simples: basta inserir o código de barras do boleto no sistema ZixPay. O sistema então calcula as parcelas disponíveis para o pagamento, permitindo ao usuário escolher a opção que melhor se encaixa no seu orçamento.

O ZixPay Ticket é uma excelente ferramenta para aqueles que buscam uma maneira mais eficiente e flexível de gerir suas finanças, garantindo que as contas sejam pagas a tempo, sem sobrecarregar o orçamento mensal.


## Stack utilizada

**Front-end:** React, TypeScript, Vite, TailwindCSS, React Hook Form and Radix.

**Back-end:** Node, TypeScript, Nest, PostgreSQL, Prisma and Docker.


## Como executar o projeto

###  Front-end:

Passos:

```bash
  # clonar o repositório:
  https://github.com/Stric-Pagamentos/zixpay-ticket-webapp.git

  # entrar na pasta do projeto:
  cd zixpay-ticket-webapp

  # instalar as dependências:
  npm install

  # executar o projeto:
  npm run dev
```

###  Back-end:

Passos:

Pré-requisitos: Node v18.12.0 (LTS)

```bash
  # clonar o repositório:
  https://github.com/Stric-Pagamentos/zixpay-ticket-api.git

  # entrar na pasta do projeto:
  cd zixpay-ticket-api

  # instalar as dependências:
  npm install

  # criar um container docker:
  docker run -d --name zixpay -p 5432:5432
    -e POSTGRESQL_USERNAME=postgres
    -e POSTGRESQL_PASSWORD=docker
    -e POSTGRESQL_DATABASE=zixpay bitnami/postgresql:latest

  # executar o projeto:
  npm run dev
```
## Rotas

 -  Generate dinamic page: http://localhost:3000/generate-page
 -  Home page: http://localhost:3000/dinamic-page-token
 -  Checkout: http://localhost:3000/checkout
 -  Payment: http://localhost:3000/payment
 -  Feedback: http://localhost:3000/feedback
## Autores

- Made with love by Bruno Vilefort! ❤️


### Powered by
![ZixLogo](https://media.licdn.com/dms/image/D4D16AQHOA016e9Tj8A/profile-displaybackgroundimage-shrink_350_1400/0/1675041510620?e=1695254400&v=beta&t=T3Yr67OaFVE909e2qeY2Cr1t8FDFepog0y-93TdYC7w)
