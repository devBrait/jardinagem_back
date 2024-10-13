"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = void 0;
const prisma_1 = require("../../database/prisma");
const createAsync = async (data) => {
    const { cliente, data_criacao, status, valor_total, pedidoItems } = data;
    const data_criacao_formatada = new Date(data_criacao);
    return await prisma_1.prisma.pedido.create({
        data: {
            cliente,
            data_criacao: data_criacao_formatada,
            status,
            valor_total,
            pedidoItems,
        }
    });
};
exports.createAsync = createAsync;
//# sourceMappingURL=pedidoService.js.map