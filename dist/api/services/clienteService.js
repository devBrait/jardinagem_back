"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaLoginAsync = exports.createAsync = void 0;
const clienteRepositoy_1 = require("../repositories/clienteRepositoy");
const prisma_1 = require("../../database/prisma");
const createAsync = async (data) => {
    const { nome, CPF, email, data_nascimento, CEP, telefone, senha } = data;
    const dataNascimento = data_nascimento == null ? new Date() : new Date(data_nascimento);
    const verificaCliente = await (0, clienteRepositoy_1.verificaClienteAsync)(CPF, email);
    // Tratamento de erro: CPF ou Email já cadastrados
    if (verificaCliente != null) {
        throw new Error(verificaCliente);
    }
    return await prisma_1.prisma.cliente.create({
        data: {
            nome,
            CPF,
            email,
            data_nascimento: dataNascimento,
            CEP: CEP == null ? '' : CEP,
            telefone,
            senha,
        },
    });
};
exports.createAsync = createAsync;
const verificaLoginAsync = async (email, senha) => {
    const cliente = await prisma_1.prisma.cliente.findFirst({
        where: { email },
    });
    if (cliente == null) {
        throw new Error('Cliente não encontrado');
    }
    if (cliente.senha !== senha) {
        throw new Error('Senha incorreta');
    }
    return true;
};
exports.verificaLoginAsync = verificaLoginAsync;
//# sourceMappingURL=clienteService.js.map