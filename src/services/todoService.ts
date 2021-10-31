const uniqid = require('uniqid')
import axios from 'axios';
import todoItem from '../interfaces/todoItem.type';

 const todoService = {

    getTodoItems: async () => {
        try {
            return await axios.get('http://localhost:3000/api/todos');
         }
     
         catch(err) {
             return(err)
         }
    },

    getTodoItem : async(id: string) => {
        console.log(id);
        try {
            return await axios.get('http://localhost:3000/api/getTodo?id='+id);
         }
     
         catch(err) {
             return(err)
         }
    },

    addTodo :  async (item: todoItem) => {
    
        try {
           return await axios.post('/api/addTodo', item);
        }
    
        catch(err) {
            return(err)
        }
    },

    deleteTodo : async (id: string) => {
        try {
            return await axios.delete('/api/deleteTodo?id='+id);
         }
     
         catch(err) {
             return(err)
         }
    },

    updateTodo : async (todoItem: todoItem) => {
        
        try {
            return await axios.patch('/api/updateTodo', todoItem);
         }
     
         catch(err) {
             return(err)
         }
    }
}

export default todoService;
 