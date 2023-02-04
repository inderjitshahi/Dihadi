import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import { getAllComplaints, getAllUsers, getComplaint, getComplaints, getUser, getUserByID } from '@/utils/data';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function Complaint({ complaint }) {
    // console.log(complaint);
    const router = useRouter()
    const user = useSelector(state => state?.user?.user);
    const { data: session, status } = useSession();
    if (status === 'loading') return <div>Loading....</div>
    if (status === 'unauthenticated') router.push('/');
    return (
        <div className=''>
            <Head>
                <title>Dihadi</title>
                <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="https://cdn.dribbble.com/users/1536793/screenshots/3434500/media/8e69dcf7f37f09c5b5204d308e75ad43.gif" type="image/x-icon"></link>
            </Head>
            <Header />
            <div className='flex flex-col items-center justify-center min-h-[30vh]'>
                <Form form_label={complaint?.id} update={true} defaultValues={{ ...complaint }} />
            </div>
            <Footer />
        </div>
    );
}

export default Complaint;

export async function getStaticPaths() {
    const complaints = await getAllUsers();
    const paths = complaints.map((item) => { return { params: { id: item.id } } });
    return {
        paths,
        fallback:'blocking', // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id;
    let complaint = await getUserByID(id);
    console.log(id);
    complaint={id,...complaint}
    // console.log(complaint);
    return {
        props: {
            complaint
        },
        revalidate: 10,
    }
}
