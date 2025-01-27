import dotenv from "dotenv";

dotenv.config(); // cargar las variables de entorno  --->  .env


export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI ;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "lapapaya"