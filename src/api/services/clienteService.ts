import { verificaClienteAsync } from '../repositories/clienteRepositoy'
import { prisma } from '../../database/prisma'

export const createAsync = async data => {
  const { nome, CPF, email, data_nascimento, CEP, telefone } = data

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
      data_nascimento,
      CEP,
      telefone,
    },
  })
}
