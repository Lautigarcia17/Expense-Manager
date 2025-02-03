import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan('dev')) // para que aparezcan las peticiones en consola
app.use(express.json())
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/expense', expenseRoutes);

export default app;