import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import { useState } from 'react';
import styles from './todo.module.scss'

const AddTodoForm = () => {

    const [content, setContent] = useState(null);

    const handleChange = (e) => setContent(e.target.value);

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
                onChange={handleChange} />

            </Grid>
            
            <Grid item>
                <Button className={styles.button} variant="outlined" size="large">Add Todo Item</Button>
            </Grid>
            
           

            
    </Grid>
};

export default AddTodoForm;