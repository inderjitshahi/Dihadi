import Head from 'next/head';
import React from 'react';

function Footer(props) {
    return (
        <div className='fixed bottom-0 bg-purple-500 w-screen text-center text-white'>
            <Head>
                <title>Dihadi</title>
                <meta name="description" content="Employment at Lowest Level" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="https://cdn.dribbble.com/users/1536793/screenshots/3434500/media/8e69dcf7f37f09c5b5204d308e75ad43.gif" type="image/x-icon"></link>
            </Head>
            <p>All Rights Reserved To Team SDDI</p>
        </div>
    );
}

export default Footer;