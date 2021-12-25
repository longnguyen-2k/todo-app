import { Router } from "express";
import * as TodoController from "../app/http/controllers/todo.controller.js";
const router = Router({ mergeParams: true });

router.post("/add", [TodoController.create]);
router.get("/all", [TodoController.findAll]);
router.get("/:idTodo", [TodoController.findOne]);
router.put("/:idTodo/edit", [TodoController.update]);
router.delete("/:idTodo/delete", [TodoController.deleteOne]);
router.delete("/deleteall", [TodoController.deleteAll]);
export default router;
