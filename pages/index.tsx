import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import AddTodoForm from '../components/AddTodoForm/AddTodoForm'
import TodoItems from '../components/TodoItems/TodoItems'
import Grid from '@mui/material/Grid'


export default function Home() {
  return (
    <Layout>
      <Grid container
        direction="row"
        justifyContent="space-around"
      >

        <Grid item>
          <h4>Add Todo Item</h4>
          <AddTodoForm />
        </Grid>

        <Grid item>
          <TodoItems />
        </Grid>

      </Grid>

    </Layout>
  )
}
