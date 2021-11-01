
const todoRepo = require('../__db__/todoRepo')


export default function handler(req, res) {
        const id : string = req.query.id;
        const deleted : boolean =  todoRepo.delete(id);
        return res.status(200).json({success: deleted});
  }

  