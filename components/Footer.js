import Head from 'next/head';
import React from 'react';

function Footer(props) {
    return (
        <div className='fixed bottom-0 bg-purple-500 w-screen text-center text-white'>
            <Head>
                <title>Jan Sunvai</title>
                <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="/logo/jan-sunvai-logo.png" type="image/x-icon"></link>
            </Head>
            <p>All Rights Reserved To SP Office,Bihar Police</p>
        </div>
    );
}

export default Footer;