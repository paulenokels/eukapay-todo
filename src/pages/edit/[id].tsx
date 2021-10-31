import Layout from '../../components/Layout/Layout'
import TodoForm from '../../components/TodoForm/TodoForm'
import Grid from '@mui/material/Grid'
import { TodoContext } from '../../contexts/todo/todo-context'
import todoService from '../../services/todoService'
import todoItem from '../../interfaces/todoItem.type'
import { useState } from 'react'
import ErrorPage from 'next/error'

export async function getServerSideProps(context) {
    const todoId : string = context.query.id;
    const req =  await todoService.getTodoItem(todoId);
    const res = req.data;
    if (!res) {
        return {
            props: {}
        }
    }
    if (res.success) {
        const todo = res.todoItem;
        return {
        props: { todo }
    }
    }
    return {
        props: {}
    }
    }

export default function Edit ({todo}) {
    if (!todo) return <ErrorPage statusCode={404} />
    return <Layout>
                <Grid container justifyContent="center">
                    <Grid item md={5}>
                        <TodoForm mode="edit" todo={todo}/>
                    </Grid>
                </Grid>
            </Layout>
}