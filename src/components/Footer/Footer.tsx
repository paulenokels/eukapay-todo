import styles from './footer.module.scss'
import Grid from '@mui/material/Grid';

const Footer = () => 
<Grid container
     direction="column" 
     alignItems="center" 
     className={styles.footerWrapper}
     >
    <Grid item>
        <p>Made with love by Enokela Acheme Paul</p>
    </Grid>
</Grid>

export default Footer;