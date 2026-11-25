
import { type Express, type Request, type Response } from 'express';
import app from './app';
import "dotenv/config";

const port =process.env.PORT || 4000
const startServer = ()=>{
    try {
        app.listen(port, ()=>{
            console.log(`Server is running at port: ${port}`);
        })
    } catch (error) {
        console.error(`Error:`, error);
    }
}

startServer()