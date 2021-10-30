import  todoItem  from "../../../interfaces/todoItem.type";
import { todoStatus } from "../../../utils/constants";

const fs = require('fs');
const path = require('path');
const db = require('./db');
const uniqid = require('uniqid')
const dbPath = path.resolve('./src/pages/api/db', 'dbFile.json');

const writeDb = (obj) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(obj));
        return true;
    }
    catch(err) {
        console.log(err)
        return false;
    }
}

const todoModel = {
    addTodo : (content : string, dueDate: Date) : (todoItem | boolean) => {
        const item : todoItem = {
            id: uniqid(),
            content,
            dueDate,
            status: todoStatus.UNFINISHED,
        }
        let todos : todoItem[] = db.todos;
        
        todos.push(item);

        if (writeDb(db)) return item;
        return false;
     


    },

    getTodoItems : () : (todoItem[] | []) => {
        return db.todos
    },

    updateTodoItem : (updatedItem: todoItem) : (todoItem | false) => {

        const todos: todoItem[] = db.todos;

        for (let item of todos) {
            if (item.id == updatedItem.id) {
                item = updatedItem;
                if(writeDb(db)) return updatedItem
            }
        }

        return false;

    },

    deleteTodoItem : (id: string) : boolean => {
        const todos : todoItem[] = db.todos;
        for (let i = 0; i<todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
                if(writeDb(db)) return true;
            }
        }

        return false;
    },

    clearItems : () : boolean =>  {
        db.todos = [];
        if(writeDb(db)) return true;
        return false;
    }


}

export default todoModel;

module.exports = todoModel;