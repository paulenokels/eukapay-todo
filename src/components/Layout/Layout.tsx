import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from './layout.module.scss'

export default function Layout({ children }) {
    return <div >
        
            <Header />

            <main className={styles.mainWrapper}>
                {children}
            </main>

                <Footer />

            </div>
  }