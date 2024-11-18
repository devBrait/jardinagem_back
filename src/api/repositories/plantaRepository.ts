import { prisma } from '../../database/prisma'

export const getPlantaPopularByIdAsync = async (id: number) => {
  try {
    const plantaPopular = prisma.nome_Popular.findUnique({
      where: { id: Number(id) },
    })

    if (!plantaPopular) {
      throw new Error('Erro: ID verificado não existe.')
    }

    return plantaPopular
  } catch (error) {
    throw new Error(`Erro: ID verificado não existe : ${error.message}}`)
  }
}

export const getAllPlantaById = async (id: number) => {
  try {
    const plantaPopular = await getPlantaPopularByIdAsync(id)
    const idPlantaCientifica = plantaPopular.idNomeCientifico

    const nomePlantaCientifica = await prisma.nome_Cientifico.findUnique({
      where: {
        id: idPlantaCientifica,
      },
      select: {
        nome: true,
      },
    })

    if (!nomePlantaCientifica) {
      throw new Error('Planta verificada não existe.')
    }

    const plantas = await prisma.planta.findMany({
      where: {
        nome_cientifico: nomePlantaCientifica,
      },
    })

    return plantas
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}

export const getPlantasByFornecedorIdRepository = async (id: number) => {
  try {
    const plantasFornecedor = prisma.planta.findMany({
      where: {
        idFornecedor: Number(id),
      },
    })

    if (!plantasFornecedor) {
      throw new Error('Erro: fornecedor não existe')
    }

    if ((await plantasFornecedor).length === 0) {
      throw new Error('Não há plantas para este fornecedor')
    }

    return plantasFornecedor
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}
