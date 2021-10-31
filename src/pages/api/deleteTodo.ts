
const todoRepo = require('./db/todoRepo')


export default function handler(req, res) {
        const id : string = req.query.id;
        const deleted : boolean =  todoRepo.delete(id);
        res.status(200).json({success: deleted});
  }

  