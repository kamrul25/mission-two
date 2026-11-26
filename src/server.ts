
import app from './app';
import config from './config';
import { pool } from './config/db';
import { initDatabase } from './config/initDb';


const startServer = async()=>{
    try {
        const time  = await pool.query("SELECT NOW()");
        console.log("Database connected successfully on: ", time.rows[0].now);

        initDatabase();

        app.listen(config.port, ()=>{
            console.log(`Server is running at port: ${config.port}`);
        });
    } catch (error) {
        console.error(`Failed to connect server`, error);
    }
}

startServer()