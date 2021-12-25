import db from "../../models/index.model.js";
import HTTPStatus from "http-status";

const Todo = db.Todos;

const create = async (req, res, next) => {
  const { content } = req.body;

  try {
    if (!content)
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .send("Missing content. Try to change data form");

    const todo = await Todo.create({
      content,
    });
    if (todo) return res.status(HTTPStatus.OK).send(todo);
  } catch (error) {
    console.log(error);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};
const findOne = async (req, res, next) => {
  const { idTodo } = req.params;

  try {
    if (!idTodo) return res.status(HTTPStatus.BAD_REQUEST).send("Missing ID");
    const todo = await Todo.findById(idTodo);
    if (todo) return res.status(HTTPStatus.OK).send(todo);
    return res.status(HTTPStatus.NOT_FOUND).send("");
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};
const findAll = async (req, res, next) => {
  let { sort } = req.query;
  try {
    
    if (["des", "descending"].includes(sort)) sort = "descending";
    if (["asc", "ascending"].includes(sort)) sort = "ascending";
    if (!["asc", "ascending","des", "descending"].includes(sort)) sort = "descending";
    const todos = await Todo.find({}).limit(100).sort({ createdAt: sort });
    if (todos) return res.status(HTTPStatus.OK).json(todos);
    return res.status(HTTPStatus.NOT_FOUND).send("");
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};
const deleteOne = async (req, res, next) => {
  const { idTodo } = req.params;

  try {
    if (!idTodo) return res.status(HTTPStatus.BAD_REQUEST).send("Missing ID");
    const todo = await Todo.findByIdAndRemove(idTodo);
    todo._doc.message = "Delete success";
    if (todo) return res.status(HTTPStatus.OK).json(todo);
    return res.status(HTTPStatus.NOT_FOUND).send("Not Found");
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};
const update = async (req, res, next) => {
  const { idTodo } = req.params;
  const { content } = req.body;
  try {
    if (!idTodo) return res.status(HTTPStatus.BAD_REQUEST).send("Missing ID");
    if (!content)
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .send("Missing content. Try to change data form");
    const todo = await Todo.findByIdAndUpdate(
      idTodo,
      { content: content },
      {
        new: true,
      }
    );
    todo._doc.message = "Update success";
    if (todo) return res.status(HTTPStatus.OK).json(todo);
    return res.status(HTTPStatus.NOT_FOUND).send("Update fail");
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};
const deleteAll = async (req, res, next) => {
  try {
    const todos = await Todo.deleteMany({});
    if (todos)
      return res.status(HTTPStatus.OK).json({ message: "delete success" });
    return res.status(HTTPStatus.NOT_FOUND).send("Delete fail");
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
  }
};

export { create, findAll, findOne, deleteOne, deleteAll, update };
