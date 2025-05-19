"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // ✅ Use `app` directly
const PORT = process.env.PORT || 5004;
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
