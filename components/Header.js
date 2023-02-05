// import Button from '@/subComponents/Button';
import Link from 'next/link';
import React from 'react';
import { userActions } from '@/store/userSlice';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';
import { async } from '@firebase/util';
import { useRouter } from 'next/router';
function Header(props) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const router=useRouter();
    const signUp=()=>{
        router.push('/signUp');
    }
    return (
        <div className='w-full h-16 md:h-20 bg-purple-600 text-white flex items-center justify-between px-10'>
            <Head>
                <title>Dihadi</title>
                <meta name="description" content="Portal to resolve public issues. Completely Managed and Operated By SP Office" />
                <meta name="author" content="Inderjit Shahi" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" className='rounded-full' href="/logo/jan-sunvai-logo.png" type="image/x-icon"></link>
            </Head>
            <div>
                <Link href={'/'}>
                    <div className='flex items-center space-x-5'>
                        <div className='relative overflow-hidden h-10 w-10 rounded-full'>
                            <Image fill src="https://cdn.dribbble.com/users/1536793/screenshots/3434500/media/8e69dcf7f37f09c5b5204d308e75ad43.gif" alt="logo" />
                        </div>
                        <p className=' text-lg md:text-2xl font-bold'>Dihadi</p>
                    </div>
                </Link>
            </div>
            <div>

                {status === 'unauthenticated' && <div className='flex space-x-5'>
                    <button text="Login" data-mdb-ripple="true"
                        data-mdb-ripple-color="light"  className='bg-blue-500 px-5 py-1 rounded-lg' onClick={() => {
                        signIn();
                    }} >SignIn</button>
                    <button text="SignUp" data-mdb-ripple="true"
                        data-mdb-ripple-color="light"  className='bg-blue-500 px-5 py-1 rounded-lg' onClick={() => {
                        signUp();
                    }} >SignUp</button>
                </div>
                }
                {status === 'authenticated' && <div className='flex items-center space-x-5'>
                    <p className='rounded-full text-sm bg-violet-800 px-6 py-2 overflow-hidden'><span>{user?.name}</span></p>
                    <button text="Logout" data-mdb-ripple="true"
                        data-mdb-ripple-color="light"  className='bg-blue-500 px-5 py-1 rounded-lg' onClick={() => {
                        dispatch(userActions.removeUser());
                        signOut();
                    }} >Logout</button>
                </div>}
            </div>
        </div>
    );
}

export default Header;