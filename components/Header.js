import Button from '@/subComponents/Button';
import Link from 'next/link';
import React from 'react';
import { userActions } from '@/store/userSlice';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';
function Header(props) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    return (
        <div className='w-full h-16 md:h-20 bg-purple-600 text-white flex items-center justify-between px-10'>
            <Head>
                <title>Jan Sunvai</title>
                <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="/logo/jan-sunvai-logo.png" type="image/x-icon"></link>
            </Head>
            <div>
                <Link href={'/'}>
                    <div className='flex items-center space-x-5'>
                        <div className='relative overflow-hidden h-10 w-10 rounded-full'>
                            <Image fill src="/logo/jan-sunvai-logo.png" alt="logo" />
                        </div>
                        <p className=' text-lg md:text-2xl font-bold'>Jan Sunvai</p>
                    </div>
                </Link>
            </div>
            <div>

                {status === 'unauthenticated' && <Button text="Login" func={() => {
                    signIn();
                }} />}
                {status === 'authenticated' && <div className='flex items-center space-x-5'>
                    <p className='rounded-full text-sm bg-violet-800 px-6 py-2 overflow-hidden'><span>{user?.name}</span></p>
                    <Button text="Logout" func={() => {
                        dispatch(userActions.removeUser());
                        signOut();
                    }} />
                </div>}
            </div>
        </div>
    );
}

export default Header;