import { NextFunction, RequestHandler } from "express";
import { jwtHelpers } from "../utils/jwtHelpers";
import { JwtPayload } from "jsonwebtoken";



const verifyToken: RequestHandler = async(req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new Error("Access Denied! Token not found!")
    }

    try {
        const decoded = jwtHelpers.verifyToken(authHeader);
        console.log({decoded})
        req.user = decoded as JwtPayload;
        next();
    } catch {
        throw new Error("Invalid or expired token.")
    }
};


const authorizedRoles = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error("Forbidden: You don't have access!");
      res.status(403);
      return next(error);
    }

    next();
  };
};

export const authMiddleware = { verifyToken, authorizedRoles };