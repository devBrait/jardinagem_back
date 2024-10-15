import { prisma } from '../../database/prisma'

export const retornaPedido = async (id: number) => {
  try {
    const pedido = prisma.pedido.findUnique({
      where: { id: id },
    })
    return pedido
  } catch (error) {
    throw new Error(`Erro: ID não existe ${error.message}}`)
  }
}
