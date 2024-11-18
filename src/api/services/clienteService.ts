import * as clienteRepository from '../repositories/clienteRepositoy'
import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const getAllByEmailAsync = async email => {
  const cliente = await clienteRepository.getByEmailAsync(email)

  if (!cliente) {
    throw new Error('Cliente não encontrado')
  }

  const { senha, CPF, telefone, ...clienteSemSenha } = cliente

  const clienteConvertido = {
    ...clienteSemSenha,
    cpf: Number(CPF),
    telefone: Number(telefone),
  }

  return clienteConvertido
}

export const getAllAsync = async (limit, offset) => {
  const { clientes, total } = await clienteRepository.getAllAsync(limit, offset)

  const clientesConvertidos = clientes.map(cliente => {
    const { senha, CPF, telefone, ...clienteSemSenha } = cliente
    return {
      ...clienteSemSenha,
      cpf: Number(CPF),
      telefone: Number(telefone),
    }
  })

  return { clientesConvertidos, total }
}

export const cadastroAsync = async data => {
  const { nome, CPF, email, data_nascimento, CEP, telefone, ativo, senha } =
    data

  // Criptografar a senha antes de salvar no banco
  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const dataNascimento =
    data_nascimento == null ? new Date() : new Date(data_nascimento)

  // Verifica se o cliente já existe pelo CPF ou email
  const verificaCliente = await clienteRepository.verificaClienteAsync(
    CPF,
    email
  )

  // Tratamento de erro: CPF ou Email já cadastrados
  if (verificaCliente != null) {
    throw new Error(verificaCliente)
  }

  // Criação do cliente no banco de dados
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      CPF,
      email,
      data_nascimento: dataNascimento,
      CEP,
      telefone,
      ativo: ativo ?? true,
      senha: senhaCriptografada, // Usar a senha criptografada
    },
  })

  // Geração do token JWT com os dados do cliente
  const token = jwt.sign(
    {
      id: cliente.id,
      email: cliente.email,
      tipoUsuario: 'cliente',
      ativo: ativo,
    },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { cliente, token, id: cliente.id }
}

export const loginAsync = async (email, senha) => {
  const cliente = await clienteRepository.getByEmailAsync(email)

  // Verificar se o cliente existe
  if (!cliente) {
    throw new Error('Cliente não encontrado')
  }

  // Compara a senha criptografada
  const senhaValida = await bcrypt.compare(senha, cliente.senha)

  if (!senhaValida) {
    throw new Error('Senha incorreta')
  }

  // Geração do token JWT com os dados do cliente
  const token = jwt.sign(
    {
      id: cliente.id,
      email: cliente.email,
      tipoUsuario: 'cliente',
      ativo: cliente.ativo,
    },
    senha_jwt,
    {
      expiresIn: '1h',
    }
  )

  return { token, ativo: cliente.ativo, id: cliente.id }
}

export const redefinirSenhaAsync = async (email, senha) => {
  const cliente = await clienteRepository.getByEmailAsync(email)

  if (cliente == null) {
    throw new Error('Cliente não encontrado')
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  await prisma.cliente.update({
    where: { email },
    data: {
      senha: senhaCriptografada,
    },
  })

  return {
    message: 'Senha alterada com sucesso',
  }
}

export const atualizarDadosAsync = async dadosCliente => {
  const { nome, CPF, email, data_nascimento, cep, telefone, ativo } =
    dadosCliente

  const cliente = await clienteRepository.getByEmailAsync(email)

  if (!cliente) {
    throw new Error('Cliente não encontrado')
  }

  // Atualiza os dados do cliente
  await prisma.cliente.update({
    where: { email },
    data: {
      nome,
      CPF,
      email,
      data_nascimento:
        data_nascimento == null ? new Date() : new Date(data_nascimento),
      CEP: cep,
      telefone,
      ativo: ativo ?? true,
    },
  })

  return true
}

export const alternaEstadoContaAsync = async email => {
  const cliente = await clienteRepository.getByEmailAsync(email)

  if (!cliente) {
    throw new Error('Cliente não encontrado')
  }

  const novoEstado = !cliente.ativo // Inverte o estado atual

  await prisma.cliente.update({
    where: { email: email },
    data: { ativo: novoEstado },
  })

  return novoEstado
}
