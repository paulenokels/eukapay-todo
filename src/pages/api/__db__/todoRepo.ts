import  todoItem  from "../../../interfaces/todoItem.type";
import { todoStatus } from "../../../utils/constants";

const fs = require('fs');
const path = require('path');
const db = require('./db');
const dbPath = path.resolve('./src/pages/api/__db__', 'dbFile.json');

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

const todoRepo = {
    save : (item : todoItem) : (todoItem | boolean) => {
        let todos : todoItem[] = db.todos;
        todos.push(item);
        if (writeDb(db)) return item;
        return false;

    },

    findAll : () : (todoItem[] | []) => {
        return db.todos
    },

    findOne : (id: string) : (todoItem | boolean ) => {
       for (let item of db.todos) {
           if (item.id == id) {
               return item;
           }
       }
       return false
    },

    update : (todoItem: todoItem) : (todoItem | false) => {

        const todos: todoItem[] = db.todos;

        for (let item of todos) {
            if (item.id == todoItem.id) {
                item.content = todoItem.content;
                item.dueDate = todoItem.dueDate;
                item.status = todoItem.status
                if(writeDb(db)) return item;
            }
        }

        return false;

    },

    delete : (id: string) : boolean => {
        const todos : todoItem[] = db.todos;
        for (let i = 0; i<todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
                if(writeDb(db)) return true;
            }
        }

        return false;
    },

    deleteAll : () : boolean =>  {
        db.todos = [];
        if(writeDb(db)) return true;
        return false;
    }


}

export default todoRepo;

module.exports = todoRepo;