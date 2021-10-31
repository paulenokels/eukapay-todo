import todoItem from "../../../interfaces/todoItem.type";

const todoRepo = require('../__db__/todoRepo')

//route to get single todo item
export default function handler(req, res) {
        const id : string = req.query.id;
        const todoItem : todoItem | boolean = todoRepo.findOne(id);
        if(todoItem) {
            return res.status(200).json({success: true, todoItem})
        }
        return res.status(404).end();
  }

  