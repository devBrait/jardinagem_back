"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaLoginAsync = exports.createAsync = void 0;
const fornecedorRepositoy_1 = require("../repositories/fornecedorRepositoy");
const prisma_1 = require("../../database/prisma");
const createAsync = async (data) => {
    const { CNPJ, nome, razao_social, empresa, telefone, ctt_2, telefone_2, email, site, instagram, CEP, obs, ativo, senha, } = data;
    const verificaFornecedor = await (0, fornecedorRepositoy_1.verificaFornecedorAsync)(CNPJ, email);
    // Tratamento de erro: CNPJ ou Email já cadastrados
    if (verificaFornecedor != null) {
        throw new Error(verificaFornecedor);
    }
    return await prisma_1.prisma.fornecedor.create({
        data: {
            CNPJ,
            nome_fantasia: nome,
            razao_social: empresa,
            ctt_1: nome,
            telefone_1: telefone,
            ctt_2: ctt_2 == null ? '' : ctt_2,
            telefone_2: telefone_2 == null ? 0 : telefone_2,
            email,
            site: site == null ? '' : site,
            instagram: instagram == null ? '' : instagram,
            CEP,
            obs: obs == null ? '' : obs,
            ativo: ativo !== null && ativo !== void 0 ? ativo : true, // Caso não seja fornecidor se ativo ou não
            senha,
        },
    });
};
exports.createAsync = createAsync;
const verificaLoginAsync = async (email, senha) => {
    const fornecedor = await prisma_1.prisma.fornecedor.findFirst({
        where: { email },
    });
    if (fornecedor == null) {
        throw new Error('Fornecedor não encontrado');
    }
    if (fornecedor.senha !== senha) {
        throw new Error('Senha incorreta');
    }
    return true;
};
exports.verificaLoginAsync = verificaLoginAsync;
//# sourceMappingURL=fornecedorService.js.map