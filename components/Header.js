import React from 'react';
import Image from 'next/image';
function Header(props) {
    return (
        <div className='bg-purple-600 flex justify-between py-2 px-2 md:px-10'>
            <div className='flex items-center space-x-3'>
                <div className='relative h-10 w-10 overflow-hidden'>
                    <Image src="/undraw_job_offers_re_634p.svg" fill alt='Logo'/>
                </div>
                <span className='text-2xl font-bold'>Dihadi</span>
            </div>
        </div>
    );
}

export default Header;