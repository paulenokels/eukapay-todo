import Layout from '../../components/Layout/Layout'
import TodoForm from '../../components/TodoForm/TodoForm'
import Grid from '@mui/material/Grid'
import todoService from '../../services/todoService'
import ErrorPage from 'next/error'
import todoItem from '../../interfaces/todoItem.type'
import { GetServerSideProps } from 'next'

export const getServerSideProps : GetServerSideProps = async (context : any) => {
    const todoId : string = context.query.id;
    const req =  await todoService.getTodoItem(todoId);
    const res = req.data;
    if (!res) {
        return {
            props: {}
        }
    }
    if (res.success) {
        const todo : todoItem = res.todoItem;
        return {
        props: { todo }
    }
    }
    return {
        props: {}
    }
    }

const Edit : React.FC<{todo: todoItem}> = ({todo}) => {
    if (!todo) return <ErrorPage statusCode={404} />
    return <Layout>
                <Grid container  justifyContent="center">
                    
                    <Grid item md={5}>
                        <TodoForm mode="edit" todo={todo}/>
                    </Grid>
                </Grid>
            </Layout>
}

export default Edit;