import { useContext, useState } from "react"
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';



import { TodoContext } from "../../contexts/todo/todo-context"
import styles from './todoitem.module.scss'

const TodoItems = () => {
    const { todoItems } = useContext(TodoContext);

    

    if (todoItems.length == 0) {
        return <div>
            <h4>You have not added any todo Items</h4>
        </div>
    }

    return <Grid container direction="column">
        {todoItems.map(item =>
            <Grid item key={item.id} className={styles.itemWrapper}>
                <Grid item >
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <p><Switch defaultChecked /> {item.content}</p>
                        </Grid>
                        <Grid item>
                            <p>{item.status}</p>
                        </Grid>

                    </Grid>
                    
                </Grid>
              
                <p className={styles.dueDate}>Due by {item.dueDate}</p>

               
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                  
                </Stack>
            </Grid>
        )}
    </Grid>

}

export default TodoItems