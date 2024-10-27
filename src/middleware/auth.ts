import jwt from 'jsonwebtoken'

const verificarToken = (req, res, next) => {
  const token = req.cookies.token

  // Se não houver token, retorna 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' })
    }

    req.user = decoded
    next()
  })
}

export default verificarToken
