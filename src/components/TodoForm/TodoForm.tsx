import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useRouter } from 'next/router'


import { useContext, useState, useEffect } from 'react';
import styles from './todo.module.scss'
import notify from '../../utils/notify';
import { notifTypes, todoStatus } from '../../utils/constants';
import todoService from '../../services/todoService';
import todoItem from '../../interfaces/todoItem.type';
import { TodoContext } from '../../contexts/todo/todo-context';
const moment = require('moment');

type Props = {
    mode: "add" | "edit";// this form can be used for adding and editing
    todo? : todoItem,
}

const TodoForm = (props) => {
    const mode : string = props.mode;
    let todo : todoItem = props.todo;

    let [content, setContent] = useState('');
    let [dueDate, setDueDate] = useState(null);
    let [btnDisabled, setBtnDisabled] = useState(false);

    const dateFormat : string = "YYYY-MM-DD";
    const router = useRouter();


    useEffect(()=> {
        if (todo) {
            setContent(todo.content);
            setDueDate(todo.dueDate);
        }
    }, [])
    
    const { addTodo } = useContext(TodoContext);

    const handleChange = (e) => setContent(e.target.value);

    const addTodoItem = async () => {
        if (!content || !dueDate) {
            notify({type: notifTypes.ERROR, msg: 'Please input todo content and due date'});
            return
        }

        notify({type: notifTypes.INFO, msg: 'Adding todo item...'});
        setBtnDisabled(true);

        const body : todoItem = {
            content,
            dueDate: moment(dueDate).format(dateFormat),
            status: todoStatus.UNFINISHED
        }

        const req = await todoService.addTodo(body);
        const res = req.data;

        if (!res) {
            notify({type: notifTypes.ERROR, msg: 'Something went wrong, check your internet and try again'});
        }

        else if (res.success) {
            const item : todoItem = res.item
            notify({type: notifTypes.SUCCESS, msg: 'Item added successfully'});
            setContent('');
            addTodo(item);

        }

        //Re-activate "add todo" button
        setBtnDisabled(false);
        


    }
    

    const updateItem = async () => {
        if (!content || !dueDate) {
            notify({type: notifTypes.ERROR, msg: 'Please input todo content and due date'});
            return;
        }

        notify({type: notifTypes.INFO, msg: 'Updating todo item...'});
        setBtnDisabled(true);
        dueDate =  moment(dueDate).format(dateFormat);
        todo = { ...todo, content, dueDate}
        const req = await todoService.updateTodo(todo);
        const res = req.data;

        if (!res) {
            notify({type: notifTypes.ERROR, msg: 'Something went wrong, check your internet and try again'});
        }

        else if (res.success) {
            const item : todoItem = res.item
            notify({type: notifTypes.SUCCESS, msg: 'Item updated successfully'});
          

        }

        //Re-activate "add todo" button
        setBtnDisabled(false);


    }

    return <Grid container
        direction="column"
    >

        <Grid item>
            <TextField
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                minRows={5}
                maxRows={10}
                value={content}
                style={{width: '100%'}}
                onChange={handleChange} />

        </Grid>

        <Grid item className={styles.date}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={(dueDate) => {
                        setDueDate(dueDate);
                    }}
                    minDate={moment(new Date())}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>

        <Grid item>
            <Stack direction="row">
                <Button
                    className={styles.button}
                    variant="contained"
                    size="large"
                    onClick={mode == 'add'? addTodoItem : updateItem}
                    disabled={btnDisabled}
                >
                    {mode == 'add' ? 'Add Todo item' : 'Update Item'}
                </Button>
                { mode == 'edit' && 
                    <Button
                    className={styles.button}
                    variant="outlined"
                    size="large"
                    onClick={() => router.back()}
                    disabled={btnDisabled}
                >
                    Cancel
                    </Button>
                }
            </Stack>
        </Grid>




    </Grid>
};

export default TodoForm;