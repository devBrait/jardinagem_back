import { createAsync, getAllAsync } from '../services/pedidoService'
import { retornaStatus } from '../services/pedidoService'

// POST
export const cadastraPedido = async (req, res) => {
  try {
    const {
      idCliente,
      data_criacao,
      status,
      valor_total,
      CEP,
      numero_endereco,
      pedidoItems,
    } = req.body
    console.log(req.body)

    const pedidoData = {
      idCliente: idCliente,
      data_criacao: data_criacao,
      status: status,
      valor_total: valor_total,
      CEP: CEP,
      numero_endereco: numero_endereco,
      pedidoItems: pedidoItems,
    }

    const pedido = await createAsync(pedidoData)

    const pedidoResponse = {
      ...pedido,
      cliente: JSON.stringify(pedidoData.idCliente),
      pedidoItems: JSON.stringify(pedidoData.pedidoItems),
    }

    return res.status(201).send(pedidoResponse)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'erro ao cadastrar pedido' })
  }
}

// GET
export const verificaStatus = async (req, res) => {
  try {
    const id = req.params
    const status = await retornaStatus(id)

    return res.status(201).json(status)
  } catch (error) {
    res.status(500).json({ error: 'ocorreu um erro ao ler o status do pedido' })
  }
}

// GET
export const getAllByUserAsync = async (req, res) => {
  try {
    const { id } = req.params

    const pedidos = await getAllAsync(id)

    res.status(200).json({ success: true, data: pedidos || [] })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
}
