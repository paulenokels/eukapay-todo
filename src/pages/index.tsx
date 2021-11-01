import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import TodoForm from '../components/TodoForm/TodoForm'
import TodoItems from '../components/TodoItems/TodoItems'
import Grid from '@mui/material/Grid'
import { TodoContext } from '../contexts/todo/todo-context'
import todoService from '../services/todoService'
import todoItem from '../interfaces/todoItem.type'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

export const getServerSideProps : GetServerSideProps = async (context : any) => {
  const req =  await todoService.getTodoItems();
  const res = req.data;
  if (res.success) {
    const todos : todoItem[] | [] = res.todoItems;
    return {
      props: { todos }
   }
  }
  return {
    props: {}
  }
  }


  

  const Home : React.FC<{todos: todoItem[] | []}> = ({todos}) => {
  const [todoItems, setTodoItems] = useState(todos);

  //this is called when an item is successfully added to the backed
  //so the context state is updated
  const addTodo = (todo : todoItem) => {
    setTodoItems([...todoItems, todo]);
  }

  //this is called on successful delete on the backend
  //the item is removed from the context state
  const deleteTodo = (id:string) => {
    for (let i = 0; i<todoItems.length; i++) {
       if (todoItems[i].id == id) {
          todoItems.splice(i, 1);
          setTodoItems([...todoItems]);
          break;
       }
    }
  }
  
  //update operation on the context state, basically a find and replace
  const updateTodo = (todoItem: todoItem) => {
    for (let i = 0; i<todoItems.length; i++) {
      if (todoItems[i].id == todoItem.id) {
         todoItems[i] = todoItem;
         setTodoItems([...todoItems]);
         break;
      }
   }
  }


  return (
    <TodoContext.Provider value={{todoItems, addTodo, deleteTodo, updateTodo}}>
        <Layout>
          <Grid container
            direction="row"
            justifyContent="center"
            spacing={2}
          >

            <Grid item md={3} sm={5} xs={12}>
              <h4>Add Todo Item</h4>
              <TodoForm mode="add"/>
            </Grid>

         

            <Grid item md={6} sm={7} xs={12}>
              <h4>Todo Items</h4>
              <TodoItems />
            </Grid>

          </Grid>

        </Layout>
    </TodoContext.Provider>
  )
}

export default Home;