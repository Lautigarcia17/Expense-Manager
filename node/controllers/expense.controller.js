
import Expense from '../models/mongodb/expense.model.js'
import { ERROR_MESSAGES} from '../constants/errorMessages.js'

export class ExpenseController{

    static async getAll(req,res){
        try {
            const expenses = await Expense.find({ user_id: req.user.id });
            if (!expenses || expenses.length === 0) {
                return res.status(404).json({ 
                    code: 'EXPENSE_NOT_FOUND_USER',
                    message: ERROR_MESSAGES.expenses.EXPENSE_NOT_FOUND_USER 
                }
                );
            }
            res.json(expenses);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            });
        }
    }
    static async getById(req,res){
        try {
            const {id} = req.params;
            const expense = await Expense.findById(id);
            if (!expense) return res.status(404).json({ message: "Expense not found" });
            return res.json(expense);
          } catch (error) {
            console.log(error);
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            });
          }
    }
    static async createExpense(req,res){
        try {
            const {expense_name,date,note = null,recurrence,amount} = req.body;
            const user_id = req.user.id;
         
            const newExpense = new Expense({
                expense_name,
                date,
                note,
                recurrence,
                amount,
                user_id
            })
    
            await newExpense.save();
    
            res.status(201).json({
                message: 'Expense added successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            });
        }


    }
    static async deleteExpense(req,res){

        try {
            const {id} = req.params;
        
            const deletedExpense = await Expense.findByIdAndDelete(id);
            if (!deletedExpense) {
                return res.status(404).json({
                    code: "EXPENSE_NOT_FOUND",
                    message: ERROR_MESSAGES.expenses.EXPENSE_NOT_FOUND
                });
            }
    
            res.status(201).json({message: 'Expense deleted successfully'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            }); 
        }

    }

    static async updateExpense(req, res) {
        try {
            const { id } = req.params;
            const allowedUpdates = ['note', 'expense_name', 'date', 'amount', 'recurrence'];
            const updates = Object.fromEntries(
                Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
            );
    
            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ 
                    code: 'NO_VALID_FIELDS_UPDATE',
                    message: ERROR_MESSAGES.expenses.NO_VALID_FIELDS_UPDATE
                });
            }
    
            const updatedExpense = await Expense.findOneAndUpdate({ _id: id }, updates, { new: true });
    
            if (!updatedExpense) {
                return res.status(404).json({
                    code: "EXPENSE_NOT_FOUND",
                    message: ERROR_MESSAGES.expenses.EXPENSE_NOT_FOUND
                });
            }
    
            res.json({ id: updatedExpense._id, updates });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            });
        }
    }
}