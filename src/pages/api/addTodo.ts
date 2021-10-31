import todoItem from "../../interfaces/todoItem.type";

const todoRepo = require('./db/todoRepo')


export default function handler(req, res) {
   if (req.method == 'POST') {
       const { content, dueDate, status } = req.body;
      const item : todoItem | false = todoRepo.save(content, dueDate, status);
      if (item) {
        res.status(200).json({success: true, item})
      }
   }
   
    res.status(405).end()

    
  }

  