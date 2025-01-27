
import Expense from '../models/mongodb/expense.model.js'

export class ExpenseController{

    static async getAll(req,res){
        try {
            const expenses = await Expense.find({ user_id: req.user.id });
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getById(req,res){
        try {
            const {id} = req.params;
            const expense = await Expense.findById(id);
            if (!expense) return res.status(404).json({ message: "Expense not found" });
            return res.json(expense);
          } catch (error) {
            return res.status(500).json({ message: error.message });
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
            res.status(500).json({ message: error.message });
        }


    }
    static async deleteExpense(req,res){
        const {id} = req.params;
        
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            res.status(404).json({message: "Expense not found"});
        }

        res.status(201).json({message: 'Expense deleted successfully'});
    }

    static async updateExpense(req, res) {
        try {
            const { id } = req.params;
            const allowedUpdates = ['note', 'expense_name', 'date', 'amount', 'recurrence'];
            const updates = Object.fromEntries(
                Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
            );
    
            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ message: 'No valid fields provided for update' });
            }
    
            const updatedExpense = await Expense.findOneAndUpdate({ _id: id }, updates, { new: true });
    
            if (!updatedExpense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
    
            res.json({ id: updatedExpense._id, updates });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}