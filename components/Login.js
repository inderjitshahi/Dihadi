import React from 'react';
import { useForm } from 'react-hook-form';
import Footer from './Footer';
import Input from '@/subComponents/Input';
import Button from '@/subComponents/Button';
import { signIn } from 'next-auth/react';
function Login(props) {
    const {register,handleSubmit}=useForm();
    const onSubmit=(data)=>{
        signIn()
        // alert(JSON.stringify(data));
    }
    return (

        <div className='flex flex-col  justify-center items-center min-h-screen'>
            <p className='text-purple-600 font-bold text-2xl text-center'>Please Enter Your Credentials</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full md:w-3/4 max-w-7xl items-center py-10">
                <Input register={register} required label={"UserID"} name="userID" type="text"/>
                <Input register={register} required label={"Password"} name="password" type="password"/>
                <Button type="submit" text='Login'/>
            </form>
        </div>
    );
}

export default Login;