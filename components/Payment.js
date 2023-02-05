import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Payment(props) {
    const [price, setPrice] = useState(1000);
    const [days, setDays] = useState(1);
    const router=useRouter();
    return (
        <div className='my-5 flex space-y-5 flex-col'>
            <label htmlFor='price'>Price</label>
            <p className='border-2 px-3 py-1 rounded-lg' >{price}</p>
            <label htmlFor='days'>Days</label>
            <input placeholder='days' value={days} className='border-2 px-3 py-1 rounded-lg' type={'number'} onChange={(e) => { setDays(e.target.value); setPrice((+days) * 1000); }} min={1} max={365} />
            <button text="Login" data-mdb-ripple="true"
                data-mdb-ripple-color="light" className='bg-blue-500 px-5 py-1 rounded-lg text-white' onClick={() => {
                    router.push('/');
                }} >Checkout</button>
        </div>
    );
}

export default Payment;