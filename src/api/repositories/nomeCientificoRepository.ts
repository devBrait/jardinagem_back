import { prisma } from '../../database/prisma'

export const getAllAsync = async (page = 1, limit = 10, search = '') => {
  try {
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [{ nome: { contains: search, mode: 'insensitive' as const } }],
        }
      : {}

    // Busca os itens paginados
    const [items, total] = await Promise.all([
      prisma.nome_Cientifico.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          nome: 'asc',
        },
      }),
      prisma.nome_Cientifico.count({ where }),
    ])

    return {
      items,
      total,
    }
  } catch (error) {
    throw new Error(`Erro no repositório: ${error.message}`)
  }
}
