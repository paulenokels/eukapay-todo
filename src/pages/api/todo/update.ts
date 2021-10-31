import todoItem from "../../../interfaces/todoItem.type";

const todoRepo = require('../__db__/todoRepo')


export default function handler(req, res) {
  //accept only patch method
   if (req.method == 'PATCH') {
       const  itemToUpdate : todoItem = req.body;
      const item : todoItem | false = todoRepo.update(itemToUpdate);
      if (item) {
        return res.status(200).json({success: true, item})
      }
     return res.status(200).json({success: false, msg: 'Error updating todo'})

   }
   
   return res.status(405).end()

    
  }

  