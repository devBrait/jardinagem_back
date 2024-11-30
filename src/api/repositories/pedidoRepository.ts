import { prisma } from '../../database/prisma'

export const getByIdAsync = async (id: number) => {
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: {
        pedidoItems: {
          include: {
            planta: {
              select: {
                nome_popular: true,
              },
            },
          },
        },
      },
    })

    if (!pedido) {
      throw new Error('Pedido não encontrado')
    }

    const pedidoComDetalhes = {
      id: pedido.id,
      status: pedido.status,
      itens: pedido.pedidoItems.map(item => ({
        id: item.id,
        nome: item.planta.nome_popular.nome,
        preco: item.preco_unitario,
        quantidade: item.quantidade,
        valorItem: item.preco_unitario * item.quantidade,
      })),
    }

    return pedidoComDetalhes
  } catch (error) {
    throw new Error(`Erro: ID não existe ${error.message}}`)
  }
}

export const retornaPedidosAsync = async (id: number) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: {
        idCliente: Number(id),
      },
      include: {
        pedidoItems: {
          include: {
            planta: {
              include: {
                fornecedor: true,
              },
            },
          },
        },
      },
    })

    const pedidosComDetalhes = pedidos.map(pedido => {
      const fornecedores = pedido.pedidoItems.reduce(
        (acc, item) => {
          const fornecedorId = item.planta.fornecedor.id
          if (!acc[fornecedorId]) {
            acc[fornecedorId] = {
              fornecedor: item.planta.fornecedor,
              quantidade: 0,
            }
          }
          acc[fornecedorId].quantidade += item.quantidade
          return acc
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        {} as Record<number, { fornecedor: any; quantidade: number }>
      )

      const principalFornecedor = Object.values(fornecedores).reduce(
        (max, fornecedor) =>
          fornecedor.quantidade > max.quantidade ? fornecedor : max
      )

      return {
        id: pedido.id,
        quantidade: pedido.pedidoItems.reduce(
          (sum, item) => sum + item.quantidade,
          0
        ),
        nomeFornecedor: principalFornecedor.fornecedor.nome_fantasia,
        status: pedido.status,
      }
    })

    return pedidosComDetalhes
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}

export const getAllByFornecedorAsync = async (id: number) => {
  try {
    const query = await prisma.pedido.findMany({
      where: {
        pedidoItems: {
          some: {
            planta: {
              idFornecedor: Number(id),
            },
          },
        },
      },
      include: {
        pedidoItems: {
          include: {
            planta: true,
          },
        },
      },
    })

    const pedidos = query.map(pedido => ({
      id: pedido.id,
      cep: pedido.CEP,
      totalPreco: pedido.pedidoItems.reduce(
        (total, item) => item.planta.quantidade * item.planta.preco,
        0
      ), // Soma dos preços das plantas
      items: pedido.pedidoItems.map(item => ({
        plantaId: item.planta.id,
        quantidade: item.quantidade,
        preco: item.planta.preco,
      })),
      status: pedido.status,
    }))

    return pedidos
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}

export const getAllPlantasByFornecedorAsync = async (
  idFornecedor: number,
  idPedido: number
) => {
  try {
    const query = await prisma.pedido.findUnique({
      where: {
        id: Number(idPedido),
      },
      select: {
        pedidoItems: {
          where: {
            planta: {
              idFornecedor: Number(idFornecedor),
            },
          },
          select: {
            planta: {
              select: {
                id: true,
                idFornecedor: true,
                nome_popular: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
            quantidade: true,
          },
        },
      },
    })
    const lstPlantas =
      query?.pedidoItems.map(item => ({
        id: item.planta.id,
        nome: item.planta.nome_popular.nome,
        quantidade: item.quantidade,
      })) || []

    return lstPlantas
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}
