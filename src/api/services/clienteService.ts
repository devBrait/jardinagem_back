import { verificaClienteAsync } from '../repositories/clienteRepositoy'
import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const senha_jwt = process.env.JWT_SECRET

export const createAsync = async data => {
  const { nome, CPF, email, data_nascimento, CEP, telefone, ativo, senha } =
    data

  // Criptografar a senha antes de salvar no banco
  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const dataNascimento =
    data_nascimento == null ? new Date() : new Date(data_nascimento)

  // Verifica se o cliente já existe pelo CPF ou email
  const verificaCliente = await verificaClienteAsync(CPF, email)

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
      CEP: CEP == null ? '' : CEP,
      telefone,
      ativo: ativo ?? true,
      senha: senhaCriptografada, // Usar a senha criptografada
    },
  })

  // Geração do token JWT com os dados do cliente
  const token = jwt.sign({ id: cliente.id, email: cliente.email }, senha_jwt, {
    expiresIn: '1h',
  })

  return { cliente, token }
}

export const verificaLoginAsync = async (email, senha) => {
  const cliente = await prisma.cliente.findFirst({
    where: { email },
  })

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
  const token = jwt.sign({ id: cliente.id, email: cliente.email }, senha_jwt, {
    expiresIn: '1h',
  })

  return { cliente, token }
}
