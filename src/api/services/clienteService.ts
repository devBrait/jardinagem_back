import { verificaClienteAsync } from '../repositories/clienteRepositoy'
import { prisma } from '../../database/prisma'

export const createAsync = async data => {
  const { nome, CPF, email, data_nascimento, CEP, telefone, senha } = data

  const cpf_inteiro = Number.parseInt(CPF.replace(/\D/g, ''), 10)
  const dataNascimento = new Date(data_nascimento)
  const verificaCliente = await verificaClienteAsync(cpf_inteiro, email)

  // Tratamento de erro: CPF ou Email já cadastrados
  if (verificaCliente != null) {
    throw new Error(verificaCliente)
  }

  return await prisma.cliente.create({
    data: {
      nome,
      CPF: cpf_inteiro,
      email,
      data_nascimento: dataNascimento,
      CEP,
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
