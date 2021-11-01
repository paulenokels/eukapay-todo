import { AppProps } from 'next/app'
import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';


function App({ Component, pageProps }: AppProps) {
  return <>
          <Component {...pageProps} />

          {/* Required for react-toastify library */}
          <ToastContainer autoClose={3000} pauseOnFocusLoss={false}/>
        </>
}

export default App;