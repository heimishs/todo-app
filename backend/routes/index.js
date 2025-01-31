const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

// get/api-server
router.get("/", controller.getIndex);

// get/api-server/user
router.get("/user", controller.getUser);

// GET GET /api-server/todos
router.get("/todos", controller.getTodos);

// POST /api-server/todo
router.post("/todo", controller.addTodo);

//  PATCH /api-server/todo/:todoId
router.patch("/todo/:todoId", controller.patchDoneState);

// DELETE
router.delete("/todo/:todoId", controller.deleteTodo);

// PATCH
router.patch("/content", controller.patchContent);

module.exports = router;
