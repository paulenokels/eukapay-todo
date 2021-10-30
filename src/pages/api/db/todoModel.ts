import  todoItem  from "../../../interfaces/todoItem.type";

const fs = require('fs');
const path = require('path');
const db = require('./db');
const uniqid = require('uniqid')

const todoConst = {
    UNFINISHED: 'unfinished',
    DONE: 'done'
}

const dbPath = path.resolve('./src/pages/api/db', 'dbFile.json');



const todoModel = {
    addTodo : (content : string, dueDate: Date) : (todoItem | boolean) => {
        const item : todoItem = {
            id: uniqid(),
            content,
            dueDate,
            status: todoConst.UNFINISHED,
        }
        let todos : todoItem[] = db.todos;
        
        todos.push(item);

        try {
            fs.writeFileSync(dbPath, JSON.stringify(db));
            return item;
        }
        catch(err) {
            console.log(err)
            return false;
        }


    }
}

export default todoModel;

module.exports = todoModel;