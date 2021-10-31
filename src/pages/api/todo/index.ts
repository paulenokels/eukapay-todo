import todoItem from "../../../interfaces/todoItem.type";

const todoRepo = require('../__db__/todoRepo')


export default function handler(req, res) {
        const todoItems : todoItem[] | [] = todoRepo.findAll();
        return res.status(200).json({success: true, todoItems})
  }

  