import express from 'express'
import { swaggerSpec, swaggerUi } from './app/swagger'
import mainRouter from './routes/route'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 8080

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config({ path: '.env.production' })
}

// Configuração de CORS para múltiplas origens
const allowedOrigins = [
  'http://localhost:5173',
  'https://jardinagem-front.vercel.app',
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Verifica se a origem está na lista de permitidos
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Origem não permitida pelo CORS'))
      }
    },
    credentials: true, // Permite envio de cookies/credenciais
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api-jardinagem', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/v1', mainRouter)

app.listen(port, () => {
  console.log(`Server funcionando na porta ${port}`)
})
