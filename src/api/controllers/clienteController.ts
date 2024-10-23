import { createAsync, verificaLoginAsync } from '../services/clienteService'

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
      secure: false,
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

    res.status(201).json({ response })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' })
  }
}

export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body
    console.log(senha)
    // Chama o serviço para verificar o login e gerar o token
    const { token } = await verificaLoginAsync(email, senha)

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res
      .status(200)
      .json({ message: 'Login bem-sucedido', email, tipoUsuario: 'cliente' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
