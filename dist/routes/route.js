"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_routes_1 = __importDefault(require("./cliente.routes"));
const fornecedor_routes_1 = __importDefault(require("./fornecedor.routes"));
const pedido_routes_1 = __importDefault(require("./pedido.routes"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/clientes', cliente_routes_1.default);
mainRouter.use('/fornecedores', fornecedor_routes_1.default);
mainRouter.use('/pedidos', pedido_routes_1.default);
exports.default = mainRouter;
//# sourceMappingURL=route.js.map