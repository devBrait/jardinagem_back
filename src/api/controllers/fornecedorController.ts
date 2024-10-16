import { createAsync, verificaLoginAsync } from '../services/fornecedorService'

export const cadastroAsync = async (req, res) => {
  try {
    const { email, senha, nome, telefone, CNPJ, CEP, empresa } = req.body
    const fornecedorData = {
      email: email,
      senha: senha,
      nome: nome,
      telefone: telefone,
      CNPJ: CNPJ,
      CEP: CEP,
      empresa: empresa,
    }
    const fornecedor = await createAsync(fornecedorData)

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
    console.error(error.message)
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}
