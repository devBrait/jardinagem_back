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
