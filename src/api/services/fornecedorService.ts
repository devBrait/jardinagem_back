import { verificaFornecedorAsync } from '../repositories/fornecedorRepositoy'
import { prisma } from '../../database/prisma'

export const createAsync = async data => {
  const {
    CNPJ,
    nome_fantasia,
    razao_social,
    ctt_1,
    telefone_1,
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

  const cnpj_inteiro = Number.parseInt(CNPJ.replace(/\D/g, ''), 10)

  const verificaFornecedor = await verificaFornecedorAsync(CNPJ, email)

  // Tratamento de erro: CNPJ ou Email já cadastrados
  if (verificaFornecedor != null) {
    throw new Error(verificaFornecedor)
  }

  return await prisma.fornecedor.create({
    data: {
      CNPJ: cnpj_inteiro,
      nome_fantasia,
      razao_social,
      ctt_1,
      telefone_1,
      ctt_2,
      telefone_2,
      email,
      site,
      instagram,
      CEP,
      obs,
      ativo: ativo ?? true, // Caso não seja fornecidor se ativo ou não
      senha,
    },
  })
}

export const verificaLoginAsync = async (email, senha) => {
  const fornecedor = await prisma.fornecedor.findFirst({
    where: { email },
  })

  if (fornecedor == null) {
    throw new Error('Fornecedor não encontrado')
  }

  if (fornecedor.senha !== senha) {
    throw new Error('Senha incorreta')
  }

  return true
}
