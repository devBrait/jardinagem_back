import { createAsync, verificaLoginAsync } from '../services/clienteService'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const cadastroAsync = async (req, res) => {
  try {
    const { email, senha, nome, telefone, CPF } = req.body
    const clienteData = {
      email,
      senha,
      nome,
      telefone,
      CPF,
    }

    // Criação do cliente
    const cliente = await createAsync(clienteData)

    // Geração do token JWT
    const token = jwt.sign(
      { id: cliente.id, email: cliente.email },
      senha_jwt,
      { expiresIn: '1h' }
    )

    // Remover a senha do objeto de resposta
    const response = {
      ...cliente,
      CPF: Number(cliente.CPF), // Problema de bigInt com json
      telefone: Number(cliente.telefone),
      token,
    }

    res.status(201).json({ response })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' })
  }
}

export const loginAsync = async (req, res) => {
  const { email, senha } = req.body
  try {
    const { token } = await verificaLoginAsync(email, senha)

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
    })
  } catch (error) {
    if (
      error.message === 'Cliente não encontrado' ||
      error.message === 'Senha incorreta'
    ) {
      return res.status(401).json({
        success: false,
        error: error.message,
      })
    }

    return res.status(500).json({
      success: false,
      error: 'Erro ao realizar o login',
    })
  }
}
