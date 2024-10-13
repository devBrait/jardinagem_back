"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaFornecedorAsync = void 0;
const prisma_1 = require("../../database/prisma");
const verificaFornecedorAsync = async (cnpj, email) => {
    try {
        const fornecedorCNPJ = await prisma_1.prisma.fornecedor.findUnique({
            where: { CNPJ: cnpj },
        });
        const fornecedorEmail = await prisma_1.prisma.fornecedor.findUnique({
            where: { email: email },
        });
        let mensagem = null;
        if (fornecedorCNPJ) {
            mensagem = 'CNPJ já cadastrado';
            return mensagem;
        }
        if (fornecedorEmail) {
            mensagem = 'Email já cadastrado';
            return mensagem;
        }
        return mensagem;
    }
    catch (error) {
        throw new Error(`Erro ao verificar fornecedor: ${error.message}`);
    }
};
exports.verificaFornecedorAsync = verificaFornecedorAsync;
//# sourceMappingURL=fornecedorRepositoy.js.map