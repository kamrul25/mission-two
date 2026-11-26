import { pool } from "./db";

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(25) CHECK (role IN ('admin', 'member')) DEFAULT  'member'
    );

    CREATE TABLE IF NOT EXISTS books(
        id SERIAL PRIMARY KEY, 
        title VARCHAR(100) NOT NULL, 
        description VARCHAR(255) NOT NULL,
        author VARCHAR(150) NOT NULL, 
        isbn  VARCHAR(50) UNIQUE NOT NULL, 
        total_copies INT NOT NULL CHECK (total_copies >= 0), 
        available_copies  INT NOT NULL CHECK (available_copies >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

`;

export const initDatabase = async () => {
  await pool.query(createTableQuery);
  console.log("Database table created");
};
