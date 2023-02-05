import Payment from '@/components/Payment';
import React, { useState } from 'react';

function payment(props) {    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <p className='text-purple-500 text-3xl font-semibold'>Proceeded To Hire Skill</p>
            <Payment/>
        </div>
    );
}

export default payment;