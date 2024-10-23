import { verificaAdminAsync } from '../services/adminService'

export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    // Chama o serviço para verificar o login e gerar o token
    const { admin, token } = await verificaAdminAsync(email, senha)

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res
      .status(200)
      .json({ message: 'Login bem-sucedido', admin, tipoUsuario: 'admin' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
