import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useContext, useState } from 'react';
import styles from './todo.module.scss'
import notify from '../../utils/notify';
import { notifTypes, todoStatus } from '../../utils/constants';
import todoService from '../../services/todoService';
import todoItem from '../../interfaces/todoItem.type';
import { TodoContext } from '../../contexts/todo/todo-context';



const AddTodoForm = () => {

    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    
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
            dueDate: dueDate.format("YYYY-DD-MM"),
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

        <Grid item style={{marginTop: '15px'}}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={(dueDate) => {
                    setDueDate(dueDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>

        <Grid item>
            <Button
                className={styles.button}
                variant="outlined"
                size="large"
                onClick={addTodoItem}
                disabled={btnDisabled}
            >
                Add Todo Item
            </Button>
        </Grid>




    </Grid>
};

export default AddTodoForm;