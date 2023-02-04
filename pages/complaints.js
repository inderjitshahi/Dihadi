import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { async } from '@firebase/util';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { } from 'next-redux-wrapper'
import Head from 'next/head';
// import { wrapper } from '@/store';
function Complaints({ session1 }) {
    const user = useSelector(state => state?.user.user);
    const { data: session, status } = useSession();
    console.log("complaints", session1);
    const router = useRouter();
    if (status === "unauthenticated") router.push('/');
    return (
        <div className=''>
            <Head>
                <title>Jan Sunvai</title>
                <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="/logo/jan-sunvai-logo.png" type="image/x-icon"></link>
            </Head>
            <Header />
            <main className='md:mx-10'>
                <Table />
            </main>
            <Footer />
        </div>
    );
}

export default Complaints;

// export const getStaticProps= wrapper.getStaticProps(async (store,req)=>{
//     const user=store.getState();
//     console.log(user);
//     return {
//         props:{}
//     }
// });

// export async function getServerSideProps(context) {
//     const session1=await getSession();
//     console.log(session1);
//     return {
//       props: {
//         session1
//       }, // will be passed to the page component as props
//     }
//   }