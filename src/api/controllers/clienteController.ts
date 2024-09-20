import { createAsync } from '../services/clienteService'

export const registerAsync = async (req, res) => {
  try {
    const user = await createAsync(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' })
  }
}
