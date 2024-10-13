"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = require("../api/controllers/pedidoController");
const pedidoRouter = (0, express_1.Router)();
pedidoRouter.post('/pedido', pedidoController_1.cadastraPedido);
exports.default = pedidoRouter;
//# sourceMappingURL=pedido.routes.js.map