import {
  fornecedorByEmailAsync,
  verificaFornecedorAsync,
} from '../repositories/fornecedorRepositoy'
import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const getDadosByEmail = async email => {
  const fornecedor = await fornecedorByEmailAsync(email)

  if (!fornecedor) {
    throw new Error('Fornecedor não encontrado')
  }

  const { senha, CNPJ, telefone_1, telefone_2, ...fornecedorSemSenha } =
    fornecedor

  const fornecedorConvertido = {
    ...fornecedorSemSenha,
    CNPJ: Number(CNPJ),
    telefone_1: Number(telefone_1),
    telefone_2: Number(telefone_2),
  }
  return fornecedorConvertido
}

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
    {
      id: fornecedor.id,
      email: fornecedor.email,
      tipoUsuario: 'fornecedor',
      ativo: ativo,
    },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { fornecedor, token }
}

export const verificaLoginAsync = async (email, senha) => {
  const fornecedor = await fornecedorByEmailAsync(email)

  if (fornecedor == null) {
    throw new Error('Fornecedor não encontrado')
  }

  const senhaValida = await bcrypt.compare(senha, fornecedor.senha)

  if (!senhaValida) {
    throw new Error('Senha incorreta')
  }

  const token = jwt.sign(
    {
      id: fornecedor.id,
      email: fornecedor.email,
      tipoUsuario: 'fornecedor',
      ativo: fornecedor.ativo,
    },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { token, ativo: fornecedor.ativo }
}

export const novaSenhaAsync = async (email, senha) => {
  const fornecedor = await fornecedorByEmailAsync(email)

  if (fornecedor == null) {
    throw new Error('Fornecedor não encontrado')
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  await prisma.fornecedor.update({
    where: { id: fornecedor.id },
    data: {
      senha: senhaCriptografada,
    },
  })

  return { message: 'Senha atualizada com sucesso' }
}

export const novosDadosAsync = async dadosFornecedor => {
  const {
    nome_fantasia,
    CNPJ,
    email,
    CEP,
    site,
    instagram,
    ctt_1,
    telefone_1,
    ctt_2,
    telefone_2,
    obs,
    razao_social,
  } = dadosFornecedor

  const fornecedor = await fornecedorByEmailAsync(email)

  if (!fornecedor) {
    throw new Error('Fornecedor não encontrado')
  }

  //Atualiza os dados do fornecedor
  await prisma.fornecedor.update({
    where: { email },
    data: {
      nome_fantasia,
      CNPJ,
      email,
      CEP,
      site,
      instagram,
      ctt_1,
      telefone_1,
      ctt_2,
      telefone_2: telefone_2 === '' ? 0 : telefone_2,
      obs,
      razao_social,
    },
  })

  return true
}

export const alternaEstadoAsync = async email => {
  const fornecedor = await fornecedorByEmailAsync(email)

  if (!fornecedor) {
    throw new Error('Fornecedor não encontrado')
  }

  const NovoEstado = !fornecedor.ativo //inverte o estado atual

  await prisma.fornecedor.update({
    where: { email: email },
    data: { ativo: NovoEstado },
  })

  return NovoEstado
}
