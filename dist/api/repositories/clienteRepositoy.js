"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaClienteAsync = void 0;
const prisma_1 = require("../../database/prisma");
const verificaClienteAsync = async (cpf, email) => {
    try {
        const clienteCPF = await prisma_1.prisma.cliente.findUnique({
            where: { CPF: cpf },
        });
        const clienteEmail = await prisma_1.prisma.cliente.findUnique({
            where: { email: email },
        });
        let mensagem = null;
        if (clienteCPF) {
            mensagem = 'CPF já cadastrado';
            return mensagem;
        }
        if (clienteEmail) {
            mensagem = 'Email já cadastrado';
            return mensagem;
        }
        return mensagem;
    }
    catch (error) {
        throw new Error(`Erro ao verificar cliente: ${error.message}`);
    }
};
exports.verificaClienteAsync = verificaClienteAsync;
//# sourceMappingURL=clienteRepositoy.js.map