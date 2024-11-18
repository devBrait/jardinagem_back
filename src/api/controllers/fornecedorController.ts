import * as fornecedorService from '../services/fornecedorService'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// GET - retorna dados do fornecedor
export const getByEmailAsync = async (req, res) => {
  try {
    const { email } = req.params
    const fornecedor = await fornecedorService.getByEmailAsync(email)
    res.status(200).json({
      success: true,
      fornecedor,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const getAllAsync = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const offset = (page - 1) * limit

    const { fornecedoresConvertidos, total } =
      await fornecedorService.getAllAsync(limit, offset)

    res.status(200).json({
      success: true,
      data: fornecedoresConvertidos,
      pagination: {
        total: fornecedoresConvertidos.length,
        totalPages: total,
        currentPage: page,
        itemsPerPage: limit,
        hasNext: page < total,
        hasPrevious: page > 1,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

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
    const { fornecedor, token, id } =
      await fornecedorService.cadastroAsync(fornecedorData)
    const { senha: senhaOmitida, ...fornecedorSemSenha } = fornecedor

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    const response = {
      ...fornecedorSemSenha,
      CNPJ: fornecedorSemSenha.CNPJ.toString(),
      telefone_1: Number(fornecedorSemSenha.telefone_1),
      telefone_2: Number(fornecedorSemSenha.telefone_2),
      tipoUsuario: 'fornecedor',
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bem-vindo à nossa plataforma!',
      text: `Olá ${nome},\n\nSua conta foi criada com sucesso!\n\nAtenciosamente,\nEquipe UmEntrePosto`,
      html: `<p>Olá ${nome},</p><p>Sua conta foi criada com sucesso!</p><p>Atenciosamente,<br>UmEntrePosto</p>`,
    })

    res.status(201).json({ success: true, response, id })
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

    const { token, ativo, id } = await fornecedorService.loginAsync(
      email,
      senha
    )

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      ativo,
      id,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar o login' })
  }
}

// PUT
export const redefinirSenhaAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    await fornecedorService.redefinirSenhaAsync(email, senha)

    res.status(200).json({
      success: true,
      message: 'Senha redefinida com sucesso',
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao redefinir a senha' })
  }
}

//PUT - atualizar dados fornecedor
export const atualizarDadosAsync = async (req, res) => {
  try {
    const {
      nome_fantasia,
      CNPJ,
      email,
      CEP,
      site,
      instagram,
      ctt_1,
      telefone_1,
      ctt_2,
      telefone_2,
      obs,
      razao_social,
    } = req.body

    await fornecedorService.atualizarDadosAsync({
      nome_fantasia,
      CNPJ,
      email,
      CEP,
      site,
      instagram,
      ctt_1,
      telefone_1,
      ctt_2,
      telefone_2,
      obs,
      razao_social,
    })

    res.status(200).json({
      success: true,
      message: 'Dados alterados com sucesso.',
    })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

//PUT - altera estado da conta do fornecedor
export const alternaEstadoContaAsync = async (req, res) => {
  try {
    const { email } = req.body

    const ativo = await fornecedorService.alternaEstadoContaAsync(email)

    //verifica se a conta esta ativa ou desativada
    if (ativo) {
      res.status(200).json({
        succes: true,
        message: 'conta ativada com sucesso.',
      })
    } else {
      res.status(200).json({
        succes: true,
        message: 'Conta desativada com sucesso.',
      })
    }
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}
