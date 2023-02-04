import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';

function newComplaint(props) {
    return (
        <div>
            <Head>
                <title>Dihadi</title>
                <meta name="description" content="Employment at Lowest Level" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="/undraw_job_offers_re_634p.svg" type="image/x-icon"></link>
            </Head>
            <Header />
            <Form update={false} />
            <Footer />
        </div>
    );
}

export default newComplaint;