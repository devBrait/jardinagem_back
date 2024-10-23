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
    const { fornecedor, token } = await createAsync(fornecedorData)
    const { senha: senhaOmitida, ...fornecedorSemSenha } = fornecedor

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    const response = {
      ...fornecedorSemSenha,
      CNPJ: fornecedorSemSenha.CNPJ.toString(),
      telefone_1: Number(fornecedorSemSenha.telefone_1),
      telefone_2: Number(fornecedorSemSenha.telefone_2),
      tipoUsuario: 'fornecedor',
    }

    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar fornecedor' })
  }
}

export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    const { token } = await verificaLoginAsync(email, senha)

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      email,
      tipoUsuario: 'fornecedor',
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}
