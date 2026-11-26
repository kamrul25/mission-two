import  express  from "express";
import cors from "cors";
import { type Express, type Request, type Response } from 'express';
import authRouter from "./modules/auth/auth.routes";
import bookRouter from "./modules/books/book.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express()

app.use(cors({origin: `http://localhost:3000/`}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/",(req: Request, res: Response)=>{
    res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(globalErrorHandler)

export default app