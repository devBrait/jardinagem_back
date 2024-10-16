import { createAsync } from '../services/pedidoService'

export const cadastraPedido = async (req, res) => {
  try {
    const { cliente, data_criacao, status, valor_total, pedidoItems } = req.body

    const pedidoData = {
      cliente: cliente,
      data_criacao: data_criacao,
      status: status,
      valor_total: valor_total,
      pedidoItems: pedidoItems,
    }

    const pedido = await createAsync(pedidoData)

    const pedidoResponse = {
      ...pedido,
      cliente: JSON.stringify(pedidoData.cliente),
      pedidoItems: JSON.stringify(pedidoData.pedidoItems),
    }

    return res.status(201).send(pedidoResponse)
  } catch (error) {
    res.status(500).json({ error: 'erro ao cadastrar pedido' })
  }
}
