import todoItem from "../../../interfaces/todoItem.type";
const uniqid = require('uniqid')

const todoRepo = require('../__db__/todoRepo')


export default function handler(req, res) {
   if (req.method == 'POST') {
       let newItem : todoItem = req.body;
       //add id to the new item;
       newItem = {...newItem, id: uniqid()}
      const item : todoItem | false = todoRepo.save(newItem);
      if (item) {
       return res.status(200).json({success: true, item})
      }
      return res.status(200).json({success: false, msg: "Error saving item"});

   }
   
    return res.status(405).end()

    
  }

  