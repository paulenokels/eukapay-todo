import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import TodoForm from '../components/TodoForm/TodoForm'
import TodoItems from '../components/TodoItems/TodoItems'
import Grid from '@mui/material/Grid'
import { TodoContext } from '../contexts/todo/todo-context'
import todoService from '../services/todoService'
import todoItem from '../interfaces/todoItem.type'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const req =  await todoService.getTodoItems();
  const res = req.data;
  if (res.success) {
    const todos = res.todoItems;
    return {
      props: { todos }
   }
  }
  return {
    props: {}
  }
  }
  

export default function Home({todos}) {
  const [todoItems, setTodoItems] = useState(todos);
  const addTodo = (todo : todoItem) => {
    setTodoItems([...todoItems, todo]);
  }
  return (
    <TodoContext.Provider value={{todoItems, addTodo}}>
        <Layout>
          <Grid container
            direction="row"
            justifyContent="center"
            spacing={10}
          >

            <Grid item>
              <h4>Add Todo Item</h4>
              <TodoForm />
            </Grid>

            <Grid item  style={{borderRight: '5px solid blue'}}>
              </Grid>

            <Grid item md={6}>
              <h4>Todo Items</h4>
              <TodoItems />
            </Grid>

          </Grid>

        </Layout>
    </TodoContext.Provider>
  )
}
