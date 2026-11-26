import { pool } from "../../config/db";
import { jwtHelpers } from "../../utils/jwtHelpers";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { IUser } from "./auth.interface"


const register = async(payload: IUser)=>{
    const {name, email, role, password} = payload;

    const hashedPassword = passwordHelpers.hashPassword(password);

    const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email, hashedPassword, role],
  );

  return result.rows[0];

}

const login = async (email: string, password: string) => {
  const isUserExists = await pool.query<IUser>(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  const user = isUserExists.rows[0];

    if (!user || !passwordHelpers.compareHash(password, user.password)) {
    const error = new Error("Invalid Email or Password");
    throw error;
  }

  const token = jwtHelpers.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, token };

}

export const authService ={
    register,
    login
}