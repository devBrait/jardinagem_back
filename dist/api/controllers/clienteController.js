"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAsync = exports.cadastroAsync = void 0;
const clienteService_1 = require("../services/clienteService");
const cadastroAsync = async (req, res) => {
    try {
        const { email, senha, nome, telefone, CPF } = req.body;
        const clienteData = {
            email: email,
            senha: senha,
            nome: nome,
            telefone: telefone,
            CPF: CPF,
        };
        const cliente = await (0, clienteService_1.createAsync)(clienteData);
        const clienteResponse = Object.assign(Object.assign({}, cliente), { CPF: Number(cliente.CPF), telefone: Number(cliente.telefone) });
        res.status(201).json(clienteResponse);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
};
exports.cadastroAsync = cadastroAsync;
const loginAsync = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const loginSuccessful = await (0, clienteService_1.verificaLoginAsync)(email, senha);
        return res
            .status(200)
            .json({ success: true, message: 'Login realizado com sucesso' });
    }
    catch (error) {
        console.error(error.message);
        return res
            .status(500)
            .json({ success: false, error: 'Erro ao realizar o login' });
    }
};
exports.loginAsync = loginAsync;
//# sourceMappingURL=clienteController.js.map