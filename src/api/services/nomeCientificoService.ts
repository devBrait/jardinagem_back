import * as nomeCientificoRepository from '../repositories/nomeCientificoRepository'
import { prisma } from '../../database/prisma'

export const getAllAsync = async (page = 1, limit = 10, search = '') => {
  try {
    const validPage = Math.max(1, page)
    const validLimit = Math.max(1, Math.min(100, limit))

    const result = await nomeCientificoRepository.getAllAsync(
      validPage,
      validLimit,
      search
    )

    return {
      items: result.items,
      total: result.total,
      totalPages: Math.ceil(result.total / validLimit),
      currentPage: validPage,
    }
  } catch (error) {
    throw new Error(`Erro ao buscar nomes: ${error.message}`)
  }
}

export const getCientificoAndPopularAsync = async (
  skip: number,
  limit: number
) => {
  try {
    const { lstNomes, total } =
      await nomeCientificoRepository.getCientificoAndPopularAsync(skip, limit)

    return {
      lstNomes,
      total,
    }
  } catch (error) {
    throw new Error(`Erro ao buscar nomes: ${error.message}`)
  }
}

export const getCientificoAndPopularSemPaginacaoAsync = async () => {
  try {
    const lstNomes =
      await nomeCientificoRepository.getCientificoAndPopularSemPaginacaoAsync()

    return lstNomes
  } catch (error) {
    throw new Error(`Erro ao buscar nomes: ${error.message}`)
  }
}

export const AddAsync = async (nome: string) => {
  try {
    const nomeExiste = await prisma.nome_Cientifico.findFirst({
      where: {
        nome,
      },
    })

    if (nomeExiste) {
      throw new Error('Nome já existe')
    }

    await prisma.nome_Cientifico.create({
      data: {
        nome,
      },
    })
  } catch (error) {
    throw new Error(`Erro ao adicionar nome: ${error.message}`)
  }
}
