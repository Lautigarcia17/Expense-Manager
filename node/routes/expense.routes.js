import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller.js";
import { authToken } from "../middlewares/authToken.middleware.js";
import { validatePartialSchema, validateSchema } from "../middlewares/validator.middleware.js";
import { expenseSchema } from "../schemas/expense.schema.js";
const router = Router()


router.get('/', authToken,ExpenseController.getAll);
router.get('/:id', authToken,ExpenseController.getById);
router.post('/create', validateSchema(expenseSchema),authToken,ExpenseController.createExpense);
router.post('/delete/:id', authToken,ExpenseController.deleteExpense);
router.post('/update/:id', validatePartialSchema(expenseSchema) ,authToken,ExpenseController.updateExpense);

export default router