import { createAsync, verificaLoginAsync } from '../services/clienteService'

export const cadastroAsync = async (req, res) => {
  try {
    const { email, senha, nome, telefone, CPF } = req.body
    const clienteData = {
      email: email,
      senha: senha,
      nome: nome,
      telefone: telefone,
      CPF: CPF,
    }
    const cliente = await createAsync(clienteData)

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
    console.error(error.message)
    return res
      .status(500)
      .json({ success: false, error: 'Erro ao realizar o login' })
  }
}
