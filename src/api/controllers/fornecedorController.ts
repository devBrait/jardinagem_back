import {
  createAsync,
  novaSenhaAsync,
  verificaLoginAsync,
} from '../services/fornecedorService'
import nodemailer from 'nodemailer'

// POST
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
      secure: process.env.NODE_ENV === 'production',
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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bem-vindo ao nosso site!',
      text: `Olá ${nome},\n\nObrigado por se cadastrar no nosso site! Estamos felizes em tê-lo conosco.\n\nAtenciosamente,\nEquipe UmEntrePosto`,
    }

    res.status(201).json({ success: true, response })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Erro ao cadastrar fornecedor' })
  }
}

// POST
export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    const { token } = await verificaLoginAsync(email, senha)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}

// PUT
export const redefinirSenha = async (req, res) => {
  try {
    const { email, senha } = req.body

    await novaSenhaAsync(email, senha)

    res.status(200).json({
      success: true,
      message: 'Senha redefinida com sucesso',
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao redefinir a senha' })
  }
}
