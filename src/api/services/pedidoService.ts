import { prisma } from '../../database/prisma'

export const createAsync = async data => {
    const { cliente, data_criacao, status, valor_total, pedidoItems } = data

    const data_criacao_formatada = new Date(data_criacao)

    return await prisma.pedido.create({
        data: {
            cliente,
            data_criacao: data_criacao_formatada,
            status,
            valor_total,
            pedidoItems,
        }
    })
}