import { createAsync } from '../services/plantaService'
import { getPlantasDisponiveisService } from '../services/plantaService'
import * as plantaService from '../services/plantaService'

// POST
export const cadastroPlanta = async (req, res) => {
  try {
    const {
      id_fornecedor,
      id_nome_cientifico,
      id_nome_popular,
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
    } = req.body

    const plantaData = {
      id_fornecedor,
      id_nome_cientifico,
      id_nome_popular,
      variedade: variedade,
      cor_floracao: cor_floracao,
      porte: porte,
      topiaria: topiaria,
      forma_tronco: forma_tronco,
      quant_ramos: quant_ramos,
      dap: dap,
      diametro_copa: diametro_copa,
      altura_ramo: altura_ramo,
      altura_total: altura_total,
      peso_medio: peso_medio,
      volume: volume,
      entouceirada: entouceirada,
      tutorada: tutorada,
      embalagem: embalagem,
      diametro_base: diametro_base,
      concatenar_diametro: concatenar_diametro,
      obs: obs,
      ativo: ativo,
      pedidoItems: pedidoItems,
    }

    const planta = await createAsync(plantaData)

    const plantaResponse = {
      ...planta,
      fornecedor: JSON.stringify(plantaData.id_fornecedor),
      pedidoItems: JSON.stringify(plantaData.pedidoItems),
    }

    return res.status(201).json(plantaResponse)
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar a planta' })
  }
}

export const getFornecedorPlantasDisponiveis = async (req, res) => {
  try {
    const id = req.params.id
    const quantidade = req.params.quantidade

    const plantasDisponiveis = await getPlantasDisponiveisService(id, quantidade)

    const response = 
      plantasDisponiveis.map((planta) => {
        fornecedor: planta.idFornecedor
        quantidade: planta.quantidade
    })

    const responseJson = JSON.stringify(response)
    
    return res.status(201).json({
      sucess: true,
      data: responseJson
    })
  }
  catch (error) {
    return res.status(500).json({ 
      success: false,
      error: "Ocorreu um erro ao buscar as plantas." ,
      message: error.message
    })
  }
}

export const getPlantaByFornecedorIdController = async (req, res) => {
  
  try {

    const id = req.params
    const plantasFornecedor = plantaService.getPlantasByFornecedorIdService(id);

    const response = (await plantasFornecedor).map((planta) => {
      id: planta.id
      idFornecedor: planta.idFornecedor
      idNomeCientifico: planta.idNomeCientifico
      idNomePopular: planta.idNomePopular
      variedade: planta.variedade
      cor_floracao: planta.cor_floracao
      porte: planta.porte
      topiaria: planta.topiaria
      forma_tronco: planta.forma_tronco
      quant_ramos: planta.quant_ramos
      dap: planta.dap
      diametro_copa: planta.diametro_copa
      altura_total: planta.altura_total
      peso_medio: planta.peso_medio
      volume: planta.volume
      entouceirada: planta.entouceirada
      tutorada: planta.tutorada
      embalagem: planta.embalagem
      diametro_base: planta.diametro_base
      concatenar_diametro: planta.concatenar_diametro
      obs: planta.obs
      quantidade: planta.quantidade
      ativo: planta.ativo
    })
    
    

    return res.status(200).json({
      success: true,
      data: response
    })
  }
  catch(error){
    return res.status(404).json({
      success: false,
      error: "Plantas não encontradas",
      message: error.message
    })
  }

}