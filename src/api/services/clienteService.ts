import { verificaClienteAsync } from '../repositories/clienteRepositoy'
import { prisma } from '../../database/prisma'

export const createAsync = async data => {
  const { nome, CPF, email, data_nascimento, CEP, telefone, senha } = data
  const dataNascimento =
    data_nascimento == null ? new Date() : new Date(data_nascimento)
  const verificaCliente = await verificaClienteAsync(CPF, email)

  // Tratamento de erro: CPF ou Email já cadastrados
  if (verificaCliente != null) {
    throw new Error(verificaCliente)
  }

  return await prisma.cliente.create({
    data: {
      nome,
      CPF,
      email,
      data_nascimento: dataNascimento,
      CEP: CEP == null ? '' : CEP,
      telefone,
      senha,
    },
  })
}

export const verificaLoginAsync = async (email, senha) => {
  const cliente = await prisma.cliente.findFirst({
    where: { email },
  })

  if (cliente == null) {
    throw new Error('Cliente não encontrado')
  }

  if (cliente.senha !== senha) {
    throw new Error('Senha incorreta')
  }

  return true
}
