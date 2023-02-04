import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import { useDispatch, useSelector } from 'react-redux'
import { complaintActions } from '@/store/complaintSlice'
import Card from '@/subComponents/Card'
import Table from '@/components/Table'
import Login from '@/components/Login'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { getAllComplaints, getComplaints, getUser } from '@/utils/data'
import { userActions } from '@/store/userSlice'
import { async } from '@firebase/util'
const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  // const complaints = useSelector(state => state.complaints);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  useEffect(() => {
    const setUser = async () => {
      if (status === 'authenticated') {
        const user = await getUser(['users', session?.user?.name]);
        dispatch(userActions.updateUser(user));
        const complaints = await getComplaints(user?.type, user?.name);
        dispatch(complaintActions.addComplaint(complaints));
      }
    }
    setUser();
  }, [status]);

  const user = useSelector(state => state?.user?.user);
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <div>
    <Header/>
    <div className='min-h-screen flex items-center justify-center text-purple-500 font-bold text-3xl'>
      <p>Please Login To Continue</p>
    </div>
    <Footer />
  </div>


  return (
    <>
      <Head>
        <title>Jan Sunvai</title>
        <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office"/>
        <meta name="author" content="Inderjit Shahi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" className='rounded-full' href="/logo/jan-sunvai-logo.png" type="image/x-icon"></link>
      </Head>
      <Header />
      {/* <Login/> */}
      <main className='flex flex-col items-center justify-center py-10 px-5 md:px-0 gap-10 flex-wrap md:flex-row'>
        {user?.type === 'admin' && <Card title="New Compliant" link="/newComplaint" img={'/logo/undraw_questions_re_1fy7.svg'} description={'Write a new complaint here'} />}
        <Card title="Complaints" link='/complaints' description={'See the ongoing complaints'} img={'/logo/undraw_to_do_list_re_9nt7.svg'} />
      </main>
      <Footer />
    </>
  )
}
