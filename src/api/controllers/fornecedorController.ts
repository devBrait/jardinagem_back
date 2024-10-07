import { createAsync, verificaLoginAsync } from '../services/fornecedorService'

export const cadastroAsync = async (req, res) => {
  try {
    const fornecedor = await createAsync(req.body)

    const fornecedorResponse = {
      ...fornecedor,
      CNPJ: fornecedor.CNPJ.toString(),
      telefone_1: Number(fornecedor.telefone_1),
      telefone_2: Number(fornecedor.telefone_2),
    }

    res.status(201).json(fornecedorResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar fornecedor' })
  }
}

export const loginAsync = async (req, res) => {
  const { email, senha } = req.body
  try {
    await verificaLoginAsync(email, senha)
    res
      .status(200)
      .json({ success: true, message: 'Login realizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}
