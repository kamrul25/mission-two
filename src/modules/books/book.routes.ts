import { Router } from "express";
import { bookController } from "./book.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const bookRouter = Router();

bookRouter.post("/", bookController.createBook);
bookRouter.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.authorizedRoles("member"),
  bookController.getBooks,
);
bookRouter.patch("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;