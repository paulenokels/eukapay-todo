
const todoModel = require('./db/todoModel')


export default function handler(req, res) {
        const id : string = req.query.id;
        const deleted : boolean =  todoModel.deleteTodo(id);
        res.status(200).json({success: deleted});
  }

  