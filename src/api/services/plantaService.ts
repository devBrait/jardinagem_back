import { error } from 'console'
import { prisma } from '../../database/prisma'
import { getAllPlantaById } from '../repositories/plantaRepository'

export const createAsync = async data => {
  const {
    idFornecedor,
    idNomeCientifico,
    idNomePopular,
    quantidade,
    variedade,
    cor_floracao,
    porte,
    topiaria,
    forma_tronco,
    quant_ramos,
    dap,
    diametro_copa,
    altura_ramo,
    altura_total,
    peso_medio,
    volume,
    entouceirada,
    tutorada,
    embalagem,
    diametro_base,
    concatenar_diametro,
    obs,
    ativo,
    pedidoItems,
  } = data

  return await prisma.planta.create({
    data: {
      idFornecedor,
      idNomeCientifico,
      idNomePopular,
      variedade,
      cor_floracao,
      porte,
      topiaria,
      forma_tronco,
      quant_ramos,
      dap,
      diametro_copa,
      altura_ramo,
      altura_total,
      peso_medio,
      volume,
      entouceirada,
      tutorada,
      embalagem,
      diametro_base,
      concatenar_diametro,
      obs,
      quantidade,
      ativo,
      pedidoItems: {
        connect: pedidoItems.map(id => ({ id })), // Se pedidoItems é um array de IDs
      },
    },
  })
}

export const getPlantasDisponiveisService =  async (id: number, quantidade: number) => {
  
  try {
    const plantas = await getAllPlantaById(id)

    const plantasDisponiveis = plantas.filter((planta) => {
      planta.quantidade >= quantidade
    })

    if (plantasDisponiveis.length === 0) {
      throw new Error(`Não há plantas disponíveis para essa quantidade.`)
    }

    return plantasDisponiveis
  }
  catch (error){
    throw error
  }
}

