import express from 'express'

const app = express()
const port = process.env.PORT || 8080

import { swaggerSpec, swaggerUi } from './app/swagger';

app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "olá mundo"}).status(200)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
    console.log(`Server funcionando na porta ${port}`)
})