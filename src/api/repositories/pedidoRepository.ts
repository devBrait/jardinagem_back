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

export const retornaPedidosAsync = async (id: number) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: {
        idCliente: id,
      },
    })

    return pedidos
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}
