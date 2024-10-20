import { createAsync, verificaLoginAsync } from '../services/fornecedorService'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

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

    const token = jwt.sign(
      { id: fornecedor.id, email: fornecedor.email },
      senha_jwt,
      { expiresIn: '1h' }
    )

    const response = {
      ...fornecedor,
      CNPJ: fornecedor.CNPJ.toString(),
      telefone_1: Number(fornecedor.telefone_1),
      telefone_2: Number(fornecedor.telefone_2),
      token,
    }

    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar fornecedor' })
  }
}

export const loginAsync = async (req, res) => {
  const { email, senha } = req.body
  try {
    const { token } = await verificaLoginAsync(email, senha)
    res
      .status(200)
      .json({ success: true, message: 'Login realizado com sucesso', token })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}
