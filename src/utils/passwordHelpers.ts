import bcrypt from "bcryptjs"

const hashPassword = async(plainPassword: string)=>{
    return await bcrypt.hash(plainPassword, 10);
}


const compareHash = async(plainPassword: string, hashedPassword: string)=>{
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export const passwordHelpers ={
    hashPassword,
    compareHash,
}