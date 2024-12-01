import * as plantaService from '../services/plantaService'

// POST
export const cadastroPlanta = async (req, res) => {
  try {
    const {
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
      ativo,
      preco,
      quantidade,
      pedidoItems,
    } = req.body

    const plantaData = {
      idFornecedor,
      idNomeCientifico,
      idNomePopular,
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
      preco: preco,
      quantidade: quantidade,
      pedidoItems: pedidoItems,
    }

    const planta = await plantaService.createAsync(plantaData)

    const plantaResponse = {
      ...planta,
      fornecedor: JSON.stringify(plantaData.idFornecedor),
      pedidoItems: JSON.stringify(plantaData.pedidoItems),
    }

    return res.status(201).json(plantaResponse)
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar a planta' })
  }
}

export const getFornecedorPlantasDisponiveisAsync = async (req, res) => {
  try {
    const id = req.params.id
    const quantidade = req.params.quantidade

    const plantasDisponiveis = await plantaService.getPlantasDisponiveisAsync(
      id,
      quantidade
    )

    return res.status(201).json({
      sucess: true,
      data: plantasDisponiveis,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      error: 'Ocorreu um erro ao buscar as plantas.',
      message: error.message,
    })
  }
}

export const getPlantasByFornecedorIdAsync = async (req, res) => {
  try {
    const id = req.params.id
    const plantasFornecedor = await plantaService.getPlantasByFornecedorIdAsync(id)

    const response = plantasFornecedor.map(planta => ({
      id: planta.id,
      idFornecedor: planta.idFornecedor,
      idNomeCientifico: planta.idNomeCientifico,
      idNomePopular: planta.idNomePopular,
      cor_floracao: planta.cor_floracao,
      porte: planta.porte,
      topiaria: planta.topiaria,
      altura_total: planta.altura_total,
      quantidade: planta.quantidade,
      preco: planta.preco,
      ativo: planta.ativo,
    }))

    return res.status(200).json({
      success: true,
      data: response,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: 'Plantas não encontradas',
      message: error.message,
    })
  }
}

export const getPlantaByIdAsync = async (req, res) => {
  try {
    const { id } = req.params.id
    const planta = await plantaService.getPlantaByIdAsync(id)

    return res.status(200).json({
      success: true,
      data: planta,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: `Ocorreu um erro ao buscar a planta: ${error.message}`,
    })
  }
}

export const updateQuantidadeAsync = async (req, res) => {
  try {
    const { id, quantidade } = req.body
    const planta = await plantaService.updateQuantidadeAsync(id, quantidade)

    return res.status(200).json({
      success: true,
      data: planta,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: `Ocorreu um erro ao atualizar a quantidade: ${error.message}`,
    })
  }
}

export const alternaEstadoAsync = async (req, res) => {
  try {
    const { id } = req.body

    const ativo = await plantaService.alternaEstadoAsync(id)

    // Verifica se a conta foi ativada ou desativada
    if (ativo) {
      res.status(200).json({
        success: true,
        message: 'Planta ativada com sucesso',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Planta desativada com sucesso',
      })
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
