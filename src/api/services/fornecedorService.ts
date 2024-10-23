import { verificaFornecedorAsync } from '../repositories/fornecedorRepositoy'
import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const createAsync = async data => {
  const {
    CNPJ,
    nome,
    razao_social,
    empresa,
    telefone,
    ctt_2,
    telefone_2,
    email,
    site,
    instagram,
    CEP,
    obs,
    ativo,
    senha,
  } = data

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const verificaFornecedor = await verificaFornecedorAsync(CNPJ, email)

  // Tratamento de erro: CNPJ ou Email já cadastrados
  if (verificaFornecedor != null) {
    throw new Error(verificaFornecedor)
  }

  const fornecedor = await prisma.fornecedor.create({
    data: {
      CNPJ,
      nome_fantasia: nome,
      razao_social: empresa,
      ctt_1: nome,
      telefone_1: telefone,
      ctt_2: ctt_2 == null ? '' : ctt_2,
      telefone_2: telefone_2 == null ? 0 : telefone_2,
      email,
      site: site == null ? '' : site,
      instagram: instagram == null ? '' : instagram,
      CEP,
      obs: obs == null ? '' : obs,
      ativo: ativo ?? true, // Caso não seja fornecidor se ativo ou não
      senha: senhaCriptografada,
    },
  })

  // Geração do token JWT com os dados do cliente
  const token = jwt.sign(
    { id: fornecedor.id, email: fornecedor.email },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { fornecedor, token }
}

export const verificaLoginAsync = async (email, senha) => {
  const fornecedor = await prisma.fornecedor.findFirst({
    where: { email },
  })

  if (fornecedor == null) {
    throw new Error('Fornecedor não encontrado')
  }

  const senhaValida = await bcrypt.compare(senha, fornecedor.senha)

  if (!senhaValida) {
    throw new Error('Senha incorreta')
  }

  const token = jwt.sign(
    { id: fornecedor.id, email: fornecedor.email },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { fornecedor, token }
}
