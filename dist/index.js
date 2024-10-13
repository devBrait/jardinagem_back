"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./app/swagger");
const route_1 = __importDefault(require("./routes/route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-jardinagem', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.use('/v1', route_1.default);
app.listen(port, () => {
    console.log(`Server funcionando na porta ${port}`);
});
//# sourceMappingURL=index.js.map