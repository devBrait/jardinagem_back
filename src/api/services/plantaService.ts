import { prisma } from '../../database/prisma'
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
    await plantaRepository.getPlantasByFornecedorIdAsync(idFornecedor)

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

export const getPlantasDisponiveisAsync = async (
  id: number,
  quantidade: number
) => {
  try {
    const plantasDisponiveis = await plantaRepository.getAllPlantaByIdAsync(id, quantidade)

    const response = plantasDisponiveis.map(planta => {
      const quantidadeFinal =
        quantidade >= planta.quantidade ? planta.quantidade : quantidade

      return {
        idPlanta: planta.id,
        id_fornecedor: planta.idFornecedor,
        nome_fornecedor: planta.fornecedor.nome_fantasia,
        preco: planta.preco,
        quantidade: quantidadeFinal,
      }
    })

    return response
  } catch (error) {
    throw new Error('Ocorreu um erro ao buscar as plantas.')
  }
}

export const getPlantasByFornecedorIdAsync = async (id: number) => {
  try {
    const plantasFornecedor =
      await plantaRepository.getPlantasByFornecedorIdAsync(id)
    return plantasFornecedor
  } catch (error) {
    throw new Error('Ocorreu um erro ao buscar as plantas.')
  }
}

export const getPlantaByIdAsync = async (id: number) => {
  try {
    const planta = await plantaRepository.getPlantaByIdAsync(id)

    return planta
  } catch (error) {
    throw Error(`Ocorreu um erro: ${error.message}`)
  }
}

export const updateQuantidadeAsync = async (id: number, quantidade: number) => {
  try {
    let ativo = true
    console.log(quantidade)
    if (quantidade === 0) {
      ativo = false
    }

    const planta = await prisma.planta.update({
      where: { id: id },
      data: { quantidade: quantidade, ativo: ativo },
    })

    return planta
  } catch (error) {
    throw Error(`Ocorreu um erro: ${error.message}`)
  }
}

export const alternaEstadoAsync = async id => {
  const planta = await plantaRepository.getPlantaByIdAsync(id)

  if (!planta) {
    throw new Error('Planta não encontrada')
  }

  const novoEstado = !planta.ativo // Inverte o estado atual

  await prisma.planta.update({
    where: { id: id },
    data: { ativo: novoEstado },
  })

  return novoEstado
}
