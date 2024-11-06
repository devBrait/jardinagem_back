import { prisma } from '../../database/prisma'

export const addAsync = async (nome, idNomeCientifico) => {
  try {
    const nomeExiste = await prisma.nome_Popular.findFirst({
      where: {
        nome,
        idNomeCientifico: idNomeCientifico,
      },
    })

    if (nomeExiste) {
      throw new Error('nome já existe')
    }

    await prisma.nome_Popular.create({
      data: {
        nome,
        idNomeCientifico,
      },
    })
  } catch (error) {
    throw new Error(`Erro ao adicionar: ${error.message}`)
  }
}
