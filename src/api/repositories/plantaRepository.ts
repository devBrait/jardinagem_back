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

export const getAllPlantaById = async (id: number, quantidade: number) => {
  try {
    const plantaPopular = await getPlantaPopularByIdAsync(id)
    const idPlantaCientifica = plantaPopular.idNomeCientifico

    let plantasDisponiveis = await prisma.planta.findMany({
      where: {
        idNomeCientifico: idPlantaCientifica,
        quantidade: {
          gte: Number(quantidade),
        },
      },
      include: {
        fornecedor: {
          select: {
            nome_fantasia: true,
          },
        },
      },
    })

    if (plantasDisponiveis.length === 0) {
      plantasDisponiveis = await prisma.planta.findMany({
        where: {
          idNomeCientifico: idPlantaCientifica,
        },
        include: {
          fornecedor: {
            select: {
              nome_fantasia: true,
            },
          },
        },
      })
    }

    return plantasDisponiveis
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}

export const getPlantasByFornecedorId = async (id: number) => {
  try {
    const plantasFornecedor = await prisma.planta.findMany({
      where: {
        idFornecedor: Number(id),
      },
    })

    if (!plantasFornecedor) {
      throw new Error('Erro: fornecedor não existe')
    }

    return plantasFornecedor
  } catch (error) {
    throw new Error(`Erro: ${error.message}`)
  }
}

export const getPlantaByIdAsync = async (id: number) => {
  try {
    const planta = await prisma.planta.findUnique({
      where: { id: id },
    })
    if (!planta) {
      throw new Error('Erro: ID não existe')
    }
    return planta
  } catch (error) {
    throw new Error(`Erro: ID não existe ${error.message}`)
  }
}
