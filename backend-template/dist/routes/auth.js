"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const STATIC_CREDENTIALS = {
    email: 'test@example.com',
    password: 'password123'
};
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                email: email,
                name: 'Test User',
                role: 'USER'
            }
        });
    }
    return res.status(401).json({
        data: {
            success: false,
            message: 'Invalid email or password'
        }
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map