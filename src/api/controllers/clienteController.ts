import { createAsync, verificaLoginAsync } from '../services/clienteService'

export const cadastroAsync = async (req, res) => {
  try {
    const cliente = await createAsync(req.body)

    const clienteResponse = {
      ...cliente,
      CPF: Number(cliente.CPF), // Problema de bigInt com json
      telefone: Number(cliente.telefone),
    }

    res.status(201).json(clienteResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' })
  }
}
export const loginAsync = async (req, res) => {
  const { email, senha } = req.body
  try {
    const loginSuccessful = await verificaLoginAsync(email, senha)
    return res
      .status(200)
      .json({ success: true, message: 'Login realizado com sucesso' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Erro ao realizar o login' })
  }
}
