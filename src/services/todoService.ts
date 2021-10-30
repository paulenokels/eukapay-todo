const uniqid = require('uniqid')
import axios from 'axios';
import todoItem from '../interfaces/todoItem.type';

 const todoService = {

    addTodo :  async (item: todoItem) => {
    
        try {
           return await axios.post('/api/addTodo', item);
        }
    
        catch(err) {
            return(err)
        }
    }
}

export default todoService;
 