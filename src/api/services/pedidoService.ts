import { prisma } from '../../database/prisma'
import {
  retornaPedido,
  retornaPedidosAsync,
} from '../repositories/pedidoRepository'

export const createAsync = async data => {
  const {
    id,
    data_criacao,
    status,
    valor_total,
    CEP,
    numero_endereco,
    pedidoItems,
  } = data

  const data_criacao_formatada = new Date(data_criacao)

  return await prisma.pedido.create({
    data: {
      idCliente: id,
      data_criacao: data_criacao_formatada,
      status,
      valor_total,
      CEP,
      numero_endereco,
      pedidoItems: {
        create: pedidoItems.map(item => ({
          idPlanta: item.idPlanta,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        })),
      },
    },
  })
}

export const retornaStatus = async (id: number) => {
  try {
    const pedido = await retornaPedido(id)
    const status = pedido.status

    return status
  } catch (error) {
    return error
  }
}

export const getAllAsync = async (id: number) => {
  try {
    const pedidos = await retornaPedidosAsync(id)

    return pedidos
  } catch (error) {
    return error
  }
}
