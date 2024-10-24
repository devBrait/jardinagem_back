import {
  createAsync,
  senhaNovaAsync,
  verificaLoginAsync,
} from '../services/clienteService'
import nodemailer from 'nodemailer'

// POST
export const cadastroAsync = async (req, res) => {
  try {
    const { email, senha, nome, telefone, CPF, data_nascimento, CEP, ativo } =
      req.body

    // Chama o serviço para criar o cliente e gerar o token
    const { cliente, token } = await createAsync({
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    // Cria uma cópia do objeto cliente sem o campo 'senha' e converte os campos BigInt
    const { senha: senhaOmitida, ...clienteSemSenha } = cliente

    const response = {
      ...clienteSemSenha,
      CPF: Number(clienteSemSenha.CPF), // Converte BigInt para string
      telefone: Number(clienteSemSenha.telefone), // Converte BigInt para string
      tipoUsuario: 'cliente',
    }

    res.status(201).json({ success: true, response })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao cadastrar cliente' })
  }
}

// POST
export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body
    // Chama o serviço para verificar o login e gerar o token
    const { token } = await verificaLoginAsync(email, senha)

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res.status(200).json({ success: true, message: 'Login bem-sucedido' })
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message })
  }
}

// PUT
export const redefinirSenhaAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    await senhaNovaAsync(email, senha)

    res.status(200).json({
      success: true,
      message: 'Senha redefinida com sucesso',
    })
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message })
  }
}
