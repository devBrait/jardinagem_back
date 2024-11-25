import * as clienteService from '../services/clienteService'
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

// GET - retorna dados do cliente
export const getAllByEmailAsync = async (req, res) => {
  try {
    const { email } = req.params
    const cliente = await clienteService.getAllByEmailAsync(email)

    res.status(200).json({
      success: true,
      cliente,
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

    const { clientesConvertidos, total } = await clienteService.getAllAsync(
      limit,
      offset
    )

    res.status(200).json({
      success: true,
      data: clientesConvertidos,
      pagination: {
        total: clientesConvertidos.length,
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

// POST - cadastro de cliente
export const cadastroAsync = async (req, res) => {
  try {
    const { email, senha, nome, telefone, CPF, data_nascimento, CEP, ativo } =
      req.body

    // Chama o serviço para criar o cliente e gerar o token
    const { cliente, token, id } = await clienteService.cadastroAsync({
      email,
      senha,
      nome,
      telefone,
      CPF,
      data_nascimento,
      CEP,
      ativo,
    })

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    // Cria uma cópia do objeto cliente sem o campo 'senha' e converte os campos BigInt
    const { senha: senhaOmitida, ...clienteSemSenha } = cliente

    const response = {
      ...clienteSemSenha,
      CPF: Number(clienteSemSenha.CPF),
      telefone: Number(clienteSemSenha.telefone),
      tipoUsuario: 'cliente',
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
    console.log(error.message)
    res.status(500).json({ success: false, error: 'Erro ao cadastrar cliente' })
  }
}

// POST - login de cliente
export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body
    // Chama o serviço para verificar o login e gerar o token
    const { token, ativo, id } = await clienteService.loginAsync(email, senha)

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res
      .status(200)
      .json({ success: true, message: 'Login bem-sucedido', ativo, id })
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message })
  }
}

// PUT - redefinir senha
export const redefinirSenhaAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    await clienteService.redefinirSenhaAsync(email, senha)

    res.status(200).json({
      success: true,
      message: 'Senha redefinida com sucesso',
    })
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message })
  }
}

// PUT - atualizar dados do cliente
export const atualizarDadosAsync = async (req, res) => {
  try {
    const { email, nome, telefone, CPF, data_nascimento, cep, ativo } = req.body

    await clienteService.atualizarDadosAsync({
      email,
      nome,
      telefone,
      CPF,
      data_nascimento,
      cep,
      ativo,
    })

    res.status(200).json({
      success: true,
      message: 'Dados atualizados com sucesso',
    })
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message })
  }
}
// PUT - alterna estado da conta do cliente
export const alternaEstadoContaAsync = async (req, res) => {
  try {
    const { email } = req.body

    const ativo = await clienteService.alternaEstadoContaAsync(email)

    // Verifica se a conta foi ativada ou desativada
    if (ativo) {
      res.status(200).json({
        success: true,
        message: 'Conta ativada com sucesso',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Conta desativada com sucesso',
      })
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
