import express from 'express'
import { swaggerSpec, swaggerUi } from './app/swagger'
import mainRouter from './routes/route'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/api-jardinagem', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/v1', mainRouter)

app.listen(port, () => {
  console.log(`Server funcionando na porta ${port}`)
})
