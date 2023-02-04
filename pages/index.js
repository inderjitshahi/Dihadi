import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   const setUser = async () => {
  //     if (status === 'authenticated') {
  //       const user = await getUser(['users', session?.user?.name]);
  //       dispatch(userActions.updateUser(user));
  //       const complaints = await getComplaints(user?.type, user?.name);
  //       dispatch(complaintActions.addComplaint(complaints));
  //     }
  //   }
  //   setUser();
  // }, [status]);

  // const user = useSelector(state => state?.user?.user);
  // if (status === 'loading') return <p>Loading...</p>;
  // if (status === 'unauthenticated') return <div></div>
  return (
    <>
      <Head>
        <title>Dihadi</title>
        <meta name="description" content="Dihadi, Employment at lowest level" />
        <meta name="author" content="SDDI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/undraw_job_offers_re_634p.svg" />
      </Head>
      <Header />
      <Footer />
    </>
  )
}
