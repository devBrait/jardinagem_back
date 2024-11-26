import { prisma } from '../../database/prisma'

export const GetAllAsync = async () => {
  try {
    const lstNomes = await prisma.nome_Popular.findMany()

    return lstNomes
  } catch (error) {
    throw new Error(`Erro ao buscar: ${error.message}`)
  }
}
