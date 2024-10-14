import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API jardinagem',
      version: '1.0.0',
      description: 'API do projeto jardinagem usando nodeJS (express)',
    },
    servers: [
      {
        url: 'https://jardinagem-back.onrender.com/v1',
        description: 'API de teste',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
})

export { swaggerSpec, swaggerUi }
