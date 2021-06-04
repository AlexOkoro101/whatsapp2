import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if(loading) return <Loading></Loading>
  if(!user) return <Login></Login>

  return <Component {...pageProps} />
}

export default MyApp
