import todoItem from "../../interfaces/todoItem.type";

const todoRepo = require('./db/todoRepo')


export default function handler(req, res) {
        const id : string = req.query.id;
        const todoItem : todoItem | boolean = todoRepo.findOne(id);
        if(todoItem) {
            res.status(200).json({success: true, todoItem})
        }
        res.status(404).end();
  }

  