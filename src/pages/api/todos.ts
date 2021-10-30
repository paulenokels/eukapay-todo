import todoItem from "../../interfaces/todoItem.type";

const todoModel = require('./db/todoModel')


export default function handler(req, res) {
        const todoItems : todoItem[] | [] = todoModel.getTodoItems();
        res.status(200).json({success: true, todoItems})
  }

  