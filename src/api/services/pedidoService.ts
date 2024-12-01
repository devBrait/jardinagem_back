import { prisma } from '../../database/prisma'
import * as pedidoRepository from '../repositories/pedidoRepository'
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

export const retornaStatusAsync = async (id: number) => {
  try {
    const pedido = await pedidoRepository.getByIdAsync(id)
    const status = pedido.status

    return status
  } catch (error) {
    return error
  }
}

export const getAllAsync = async (id: number) => {
  try {
    const pedidos = await pedidoRepository.retornaPedidosAsync(id)

    return pedidos
  } catch (error) {
    return error
  }
}

export const getByIdAsync = async (id: number) => {
  try {
    const pedido = await pedidoRepository.getByIdAsync(id)

    return pedido
  } catch (error) {
    return error
  }
}

export const getAllByFornecedorAsync = async (id: number) => {
  try {
    const pedidos = await pedidoRepository.getAllByFornecedorAsync(id)

    return pedidos
  } catch (error) {
    return error
  }
}

export const getAllPlantasByFornecedorAsync = async (
  idFornecedor: number,
  idPedido: number
) => {
  try {
    const lstPlantas = await pedidoRepository.getAllPlantasByFornecedorAsync(
      idFornecedor,
      idPedido
    )

    return lstPlantas
  } catch (error) {
    return error
  }
}

export const alternaEstadoAsync = async (id: number) => {
  try {
    await prisma.pedido.update({
      where: { id: id },
      data: { status: 'Cancelado' },
    })

    return { success: true }
  } catch (error) {
    return error
  }
}
