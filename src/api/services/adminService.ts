import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const verificaAdminAsync = async (email, senha) => {
  const token = jwt.sign(
    { id: 1, email: email, tipoUsuario: 'admin' },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { token }
}
