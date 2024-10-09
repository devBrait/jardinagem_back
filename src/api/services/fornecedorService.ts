import { verificaFornecedorAsync } from '../repositories/fornecedorRepositoy'
import { prisma } from '../../database/prisma'

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
  const verificaFornecedor = await verificaFornecedorAsync(CNPJ, email)

  // Tratamento de erro: CNPJ ou Email já cadastrados
  if (verificaFornecedor != null) {
    throw new Error(verificaFornecedor)
  }

  return await prisma.fornecedor.create({
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
