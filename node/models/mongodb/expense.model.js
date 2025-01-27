import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    expense_name: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,  
        validate: {
            validator: (value) => !isNaN(new Date(value)), 
            message: 'Invalid date format',
        },
    },
    note: {
        type: String,
        maxLength: 300,
        trim: true,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    recurrence: {
        type: String,
        enum: ['weekly','monthly','yearly','one-time'],
        default: 'one-time'
    }

},{
    timestamps: true
})


export default mongoose.model('Expense',expenseSchema);