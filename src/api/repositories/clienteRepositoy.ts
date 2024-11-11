import { prisma } from '../../database/prisma'

export const verificaClienteAsync = async (cpf: number, email: string) => {
  try {
    const clienteCPF = await prisma.cliente.findUnique({
      where: { CPF: cpf },
    })

    const clienteEmail = await prisma.cliente.findUnique({
      where: { email: email },
    })

    let mensagem = null

    if (clienteCPF) {
      mensagem = 'CPF já cadastrado'
      return mensagem
    }

    if (clienteEmail) {
      mensagem = 'Email já cadastrado'
      return mensagem
    }

    return mensagem
  } catch (error) {
    throw new Error(`Erro ao verificar cliente: ${error.message}`)
  }
}

export const getByEmailAsync = async (email: string) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email: email },
    })

    return cliente
  } catch (error) {
    throw new Error(`Erro ao buscar cliente por email: ${error.message}`)
  }
}

export const getAllAsync = async (limit, offset) => {
  try {
    const [clientes, total] = await prisma.$transaction([
      prisma.cliente.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.cliente.count(),
    ])

    return { clientes, total }
  } catch (error) {
    throw new Error(
      `Erro ao buscar clientes com contagem total: ${error.message}`
    )
  }
}
