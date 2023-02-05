import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

function signUp(props) {
    return (
        <div>
            <Header />
            <p className='text-center text-2xl font-bold my-5'>Start Your New Journey Here</p>
            <Form signUp={true}/>
            <Footer />
        </div>
    );
}

export default signUp;