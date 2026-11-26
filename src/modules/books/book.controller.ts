import { RequestHandler } from "express";
import { bookService } from "./book.service";

const createBook: RequestHandler = async (req, res, next) => {
  try {
    const result = await bookService.createBook(req.body);
    res.send({
      message: "Book created successfully",
      data: result,
    });
  } catch (error: unknown) {
    // res.send({
    //   message: error instanceof Error ? error.message : "Something went wrong",
    //   data: error,
    // });

    next(error);
  }
};

const getBooks: RequestHandler = async (req, res) => {
  try {
    const result = await bookService.getBooks(req.query.search as string);
    res.send({
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.send({
      message: error instanceof Error ? error.message : "Something went wrong",
      data: error,
    });
  }
};

const updateBook: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await bookService.updateBook(id as string, req.body);
    res.send({
      message: "Book updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.send({
      message: error instanceof Error ? error.message : "Something went wrong",
      data: error,
    });
  }
};

const deleteBook: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await bookService.deleteBook(id as string);
    res.send({
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.send({
      message: error instanceof Error ? error.message : "Something went wrong",
      data: error,
    });
  }
};

export const bookController = { createBook, getBooks, updateBook, deleteBook };