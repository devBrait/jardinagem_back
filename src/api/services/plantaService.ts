import { prisma } from '../../database/prisma'
import { getAllPlantaById } from '../repositories/plantaRepository'
import * as plantaRepository from '../repositories/plantaRepository'

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
    preco,
    pedidoItems,
  } = data

  const lstPlantas =
    await plantaRepository.getPlantasByFornecedorId(idFornecedor)

  if (
    lstPlantas.some(
      planta =>
        planta.idNomeCientifico === idNomeCientifico &&
        planta.idNomePopular === idNomePopular
    )
  ) {
    throw new Error('Planta já cadastrada para esse fornecedor.')
  }

  return await prisma.planta.create({
    data: {
      idFornecedor: idFornecedor,
      idNomeCientifico: idNomeCientifico,
      idNomePopular: idNomePopular,
      variedade: variedade || '',
      cor_floracao,
      porte,
      topiaria,
      forma_tronco: forma_tronco || '',
      quant_ramos: quant_ramos || 0,
      dap: dap || 0,
      diametro_copa: diametro_copa || 0,
      altura_ramo: altura_ramo || 0,
      altura_total,
      peso_medio: peso_medio || 0,
      volume: volume || 0,
      entouceirada: entouceirada || false,
      tutorada: tutorada || false,
      embalagem: embalagem || '',
      diametro_base: diametro_base || 0,
      concatenar_diametro: concatenar_diametro || false,
      obs: obs || '',
      quantidade,
      preco,
      ativo: ativo || true,
    },
  })
}

export const getPlantasDisponiveisService = async (
  id: number,
  quantidade: number
) => {
  try {
    const plantas = await getAllPlantaById(id)

    const plantasDisponiveis = plantas.filter(planta => {
      planta.quantidade >= quantidade
    })

    if (plantasDisponiveis.length === 0) {
      throw new Error('Não há plantas disponíveis para essa quantidade.')
    }

    return plantasDisponiveis
  } catch (error) {
    throw new Error('Ocorreu um erro ao buscar as plantas.')
  }
}

export const getPlantasByFornecedorId = async (id: number) => {
  try {
    const plantasFornecedor = plantaRepository.getPlantasByFornecedorId(id)
    return plantasFornecedor
  } catch (error) {
    throw new Error('Ocorreu um erro ao buscar as plantas.')
  }
}

export const getPlantaByIdService = async (id: number) => {
  try {
    const planta = await plantaRepository.getPlantaByIdAsync(id)
    
    return planta
  } 
  catch (error) {
    throw Error(`Ocorreu um erro: ${error.message}`)
  }
}
