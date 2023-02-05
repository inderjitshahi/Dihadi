import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import { useDispatch, useSelector } from 'react-redux'
import { complaintActions } from '@/store/complaintSlice'
import Card from '@/subComponents/Card'
import Table from '@/components/Table'
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
  console.log("index",session);
  useEffect(() => {
    const setUser = async () => {
      if (status === 'authenticated') {
        const user = await getUser(['users', session?.user?.name]);
        dispatch(userActions.updateUser({id:session?.user?.name,...user}));
      }
    }
    setUser();
  }, [status]);

  const user = useSelector(state => state?.user?.user);
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <div>
    <Header />
    <div className='min-h-screen flex items-center justify-center text-purple-500 font-bold text-3xl'>
      <p>Please Login To Continue</p>
    </div>
    <Footer />
  </div>
  return (
    <>
      <Head>
        <title>Dihadi</title>
        <meta name="description" content="Employment at Lowest Level" />
        <meta name="author" content="Inderjit Shahi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" className='rounded-full' href="https://cdn.dribbble.com/users/1536793/screenshots/3434500/media/8e69dcf7f37f09c5b5204d308e75ad43.gif" type="image/x-icon"></link>
      </Head>
      <Header />
      {/* <Login/> */}
      <main className='flex flex-col items-center justify-center py-10 px-5 md:px-0 gap-10 flex-wrap md:flex-row'>
        <Card title="Edit Profile" link={`/complaint/${user?.id}`} img={'/logo/undraw_updated_resume_re_7r9j.svg'} description={'Write a new complaint here'} />
        <Card title="Hire" link='/workers' description={'See the ongoing complaints'} img={'/logo/undraw_swipe_profiles_re_tvqm.svg'} />
      </main>
      <Footer />
    </>
  )
}
