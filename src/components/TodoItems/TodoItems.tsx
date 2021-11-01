import { useContext } from "react"
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { TodoContext } from "../../contexts/todo/todo-context"
import styles from './todoitem.module.scss'
import { notifTypes, todoStatus } from "../../utils/constants";
import todoItem from "../../interfaces/todoItem.type";
import { FormControlLabel } from "@mui/material";
import todoService from "../../services/todoService";
import notify from "../../utils/notify";

const TodoItems : React.FC = () => {
    const { todoItems, deleteTodo, updateTodo } = useContext(TodoContext);
    const router = useRouter();

    const deleteItem = async (id: string) => {
        notify({ type: notifTypes.INFO, msg: 'Deleting todo...' });
        const req = await todoService.deleteTodo(id);
        const res = req.data;
        if (res.success) {
            notify({ type: notifTypes.SUCCESS, msg: 'Item deleted successfully...' });
            //delete item from context
            deleteTodo(id);
        }
        else {
            notify({ type: notifTypes.ERROR, msg: 'Error removing todo...' });
        }

    }

    const todoStatusChanged = async (item: todoItem, checked: boolean) => {
        if (checked) item.status = todoStatus.DONE;
        else item.status = todoStatus.UNFINISHED;

        //update the context state
        updateTodo(item);

        //update the database on the server
        const req = await todoService.updateTodo(item);
        const res = req.data;
        if (!res || !res.success) {
            notify({ type: notifTypes.ERROR, msg: 'Error updating item, check connection' });
            //update failed, revert changes done to the context
            item.status == todoStatus.DONE ? todoStatus.UNFINISHED : todoStatus.DONE;
            updateTodo(item);
        }

    }


    if (todoItems.length == 0) {
        return <div className={styles.wrapper}>
            <h4>You have not added any todo Items</h4>
        </div>
    }

    return <Grid container direction="column" className={styles.wrapper}>
        {todoItems.map((item: todoItem) =>
            <Grid item key={item.id} className={styles.itemWrapper}>
                <Grid item >
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <FormControlLabel
                                aria-label="change-status"
                                control={
                                    <Checkbox
                                        checked={item.status == todoStatus.DONE}
                                        onChange={(event) => todoStatusChanged(item, event.target.checked)}
                                       />
                                }
                                label={item.content}
                            />
                        </Grid>
                        <Grid item>
                            <p>{item.status}</p>
                        </Grid>
                    </Grid>

                </Grid>

                <p className={styles.dueDate}>Due by {item.dueDate}</p>


                <Stack direction="row" spacing={2}>
                    <Button aria-label="edit" variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => router.push(`/edit/${item.id}`)}>
                        Edit
                    </Button>
                    <Button aria-label="delete" onClick={() => deleteItem(item.id)} variant="outlined" size="small" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                </Stack>
            </Grid>
        )}
    </Grid>

}

export default TodoItems