import { prisma } from '../../database/prisma'
import {
  retornaPedido,
  retornaPedidosAsync,
} from '../repositories/pedidoRepository'
import * as plantaService from './plantaService'

export const createAsync = async data => {
  const {
    idCliente,
    data_criacao,
    status,
    valor_total,
    CEP,
    numero_endereco,
    pedidoItems,
  } = data

  const data_criacao_formatada = new Date(data_criacao)

  const prismaTransaction = await prisma.$transaction(async prisma => {
    // Atualizar a quantidade das plantas, uma por uma
    for (let i = 0; i < pedidoItems.create.length; i++) {
      await plantaService.updateQuantidadeAsync(
        pedidoItems.create[i].idPlanta,
        pedidoItems.create[i].quantidade
      )
    }

    // Criação do pedido
    const pedidoCriado = await prisma.pedido.create({
      data: {
        idCliente: idCliente,
        data_criacao: data_criacao_formatada,
        status,
        valor_total,
        CEP,
        numero_endereco: Number(numero_endereco),
        pedidoItems: {
          create: pedidoItems.create.map(item => ({
            idPlanta: item.idPlanta,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
          })),
        },
      },
    })

    return pedidoCriado
  })

  return prismaTransaction
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
