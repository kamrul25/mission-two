import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.send({
      message: "User Registered Successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.send({
      message: error instanceof Error ? error.message : "Something went wrong",
      data: error,
    });
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.send({
      message: "User Logged in Successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.send({
      message: error instanceof Error ? error.message : "Something went wrong",
      data: error,
    });
  }
};

export const authController = { register, login };