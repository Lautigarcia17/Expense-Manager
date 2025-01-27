import { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { AuthController } from "../controllers/auth.controller.js";
import { validateSchema} from "../middlewares/validator.middleware.js";
const router = Router();


router.post('/login', validateSchema(loginSchema), AuthController.login)
router.post('/register', validateSchema(registerSchema), AuthController.register);
router.post('/logout', AuthController.verifyToken ,AuthController.logout);


export default router