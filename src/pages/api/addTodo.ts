import todoItem from "../../interfaces/todoItem.type";

const todoModel = require('./db/todoModel')


export default function handler(req, res) {
   if (req.method == 'POST') {
       const { content, dueDate } = req.body;
      const item : todoItem | false = todoModel.addTodo(content, dueDate);
      if (item) {
        res.status(200).json({success: true, item})
      }
   }
   
    res.status(405).end()

    
  }

  