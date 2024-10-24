import { verificaAdminAsync } from '../services/adminService'

// POST
export const loginAsync = async (req, res) => {
  try {
    const { email, senha } = req.body

    // Chama o serviço para verificar o login e gerar o token
    const { token } = await verificaAdminAsync(email, senha)

    // Define o cookie com o token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    })

    res.status(200).json({ success: true, message: 'Login bem-sucedido' })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
