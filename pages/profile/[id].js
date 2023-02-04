import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import { getAllComplaints, getAllUsers, getComplaint, getComplaints, getUser, getUserByID } from '@/utils/data';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Curasole from '@/subComponents/Curasole';
import Button from '@/subComponents/Button';
function Complaint({ complaint }) {
    // console.log(complaint);
    const router = useRouter()
    const user = useSelector(state => state?.user?.user);
    const { data: session, status } = useSession();
    if (status === 'loading') return <div>Loading....</div>
    if (status === 'unauthenticated') router.push('/');
    const img = [complaint?.portfolio1, complaint?.portfolio2, complaint?.portfolio3]
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
            <div className='flex flex-col items-center justify-center my-10'>
                <div className='relative h-20 w-20 rounded-full overflow-hidden'>
                    <Image src={complaint.profile_image} fill alt="image" />
                </div>
                <div className='my-10 flex flex-col space-y-3'>
                    <p className='space-x-10 font-semibold text-xl italic grid grid-cols-2'><span className='text-purple-500 grid-cols-1'>Name:</span><span>{complaint.name}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Experience:</span><span>{complaint?.experience || '0'} years</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Phone:</span><span>{complaint.phone}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Email:</span><span>{complaint?.email || "not available"}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Service:</span><span>{complaint.service || "not provided"}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Location:</span><span>{complaint.location || "not provided"}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Service:</span><span>{complaint.service || "not provided"}</span></p>
                    <p className='grid grid-cols-2 space-x-10 font-semibold text-xl italic'><span className='text-purple-500 grid-cols-1'>Skills:</span><span>{`${complaint.skill1}, ${complaint.skill2}, ${complaint.skill3} ` || "not provided"}</span></p>
                    <Button text={'Hire'} />
                </div>
                <div className='w-full max-w-7xl md:w-[90%]'>
                    <p className='text-3xl text-purple-500 font-semibold my-3 text-center'>Portfolio</p>
                    <Curasole img={img} />
                </div>
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
        fallback: 'blocking', // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id;
    let complaint = await getUserByID(id);
    console.log(id);
    complaint = { id, ...complaint }
    console.log(complaint);
    return {
        props: {
            complaint
        },
        revalidate: 10,
    }
}
