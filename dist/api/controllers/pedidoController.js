"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastraPedido = void 0;
const pedidoService_1 = require("../services/pedidoService");
const cadastraPedido = async (req, res) => {
    try {
        const { cliente, data_criacao, status, valor_total, pedidoItems } = req.body;
        const pedidoData = {
            cliente: cliente,
            data_criacao: data_criacao,
            status: status,
            valor_total: valor_total,
            pedidoItems: pedidoItems,
        };
        const pedido = await (0, pedidoService_1.createAsync)(pedidoData);
        const pedidoResponse = Object.assign(Object.assign({}, pedido), { cliente: JSON.stringify(pedidoData.cliente), pedidoItems: JSON.stringify(pedidoData.pedidoItems) });
        return res.status(201).send(pedidoResponse);
    }
    catch (error) {
        res.status(500).json({ error: 'erro ao cadastrar pedido' });
    }
};
exports.cadastraPedido = cadastraPedido;
//# sourceMappingURL=pedidoController.js.map