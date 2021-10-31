import todoItem from "../../interfaces/todoItem.type";

const todoRepo = require('./db/todoRepo')


export default function handler(req, res) {
        const todoItems : todoItem[] | [] = todoRepo.findAll();
        res.status(200).json({success: true, todoItems})
  }

  