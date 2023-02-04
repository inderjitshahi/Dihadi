import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import { getAllComplaints, getComplaint, getComplaints } from '@/utils/data';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function Complaint({ complaint }) {
    const router = useRouter()
    const user = useSelector(state => state?.user?.user);
    const { data: session, status } = useSession();
    const disable = {
        name: user?.type === 'thana' ? true : false,
        directions: user?.type === 'thana' ? true : false,
        register_date: true,
        thana: user?.type === 'thana' ? true : false,
        status: false,
        due_date: user?.type === 'thana' ? true : false,
        email: user?.type === 'thana' ? true : false,
        concern: user?.type === 'thana' ? true : false,
        compliance_report: false,
        phone: user?.type === 'thana' ? true : false,
        case_number: user?.type === 'thana' ? true : false,
    }
    if (status === 'loading') return <div>Loading....</div>
    if (status === 'unauthenticated') router.push('/');
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
            <div className='flex flex-col items-center justify-center min-h-[30vh]'>
                <Form form_label={complaint.id} update={true} defaultValues={{ ...complaint }} disable={disable} />
            </div>
            <Footer />
        </div>
    );
}

export default Complaint;

export async function getStaticPaths() {
    const complaints = await getAllComplaints();
    const paths = complaints.map((item) => { return { params: { id: item.id } } });
    return {
        paths,
        fallback:'blocking', // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id;
    const complaint = await getComplaint(id);
    return {
        props: {
            complaint,
        },
        revalidate: 10,
    }
}
