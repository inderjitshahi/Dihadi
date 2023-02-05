import { userActions } from '@/store/userSlice';
// import Input from '@/subComponents/Input';
// import Select from '@/subComponents/Select';
// import Button from '@/subComponents/Button';
// import Input from '@/subComponents/Input';
// import Select from '@/subComponents/Select';
// import Textarea from '@/subComponents/Textarea';
import { addUser, deleteUser, updateUser } from '@/utils/data';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function Form({ form_label, defaultValues, disable, signUp, update }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            ...defaultValues
        }
    });
    const onSubmit = async (data) => {
        // alert( alert(JSON.stringify(data)));
        let res;
        if (update === true) {
            console.log("id", defaultValues?.id);
            res = await updateUser(defaultValues?.id, data);
        } else {
            res = await addUser(data);
        }
        alert(res?.status);
        if (res.error) {
            console.log(res.error);
        } else {
            dispatch(userActions.updateUser(data));
            router.push('/');
        }
    }
    // const { data: session, status } = useSession();
    // if (status === 'authenticated') router.push('/');
    // const user = useSelector(status => status?.user?.user);
    const type = ["worker", "contractor"];
    return (
        <div className='min-h-screen w-full flex items-center  flex-col space-y-5 py-5'>
            <h2 className='text-2xl font-semibold'>{defaultValues?.name}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5 w-full md:w-3/4 max-w-7xl items-center py-10">

                <select options={type} className="w-3/4 py-2 border-2 rounded-lg px-5" {...register('type')} required label={"User Type"}>

                    {
                        type.map(item => {
                            return <option value={item} key={item}>{item}</option>
                        })
                    }
                </select>
                <input {...register('name',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder='Name' required disable={disable?.name} label={"Name"} name="name" type="text" />
                <input {...register('password',)} className="w-3/4 py-2 border-2 rounded-lg px-5" required placeholder={"Password"} name="password" type="password" />
                <input {...register('email',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Email"} name="email" disable={disable?.email} type="email" />
                <input {...register('phone',)} className="w-3/4 py-2 border-2 rounded-lg px-5" required placeholder={"Phone Number"} disable={disable?.phone} name="phone" type={'tel'} />
                <input {...register('dob',)} className="w-3/4 py-2 border-2 rounded-lg px-5" required placeholder={"DOB"} name="dob" type="date" />
                <input {...register('location',)} className="w-3/4 py-2 border-2 rounded-lg px-5" required placeholder={"Location"} name="location" type="text" />
                <input {...register('experience',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Experience Years"} name="experience" type="number" />
                <input {...register('adhar',)} className="w-3/4 py-2 border-2 rounded-lg px-5" disable={disable?.name} placeholder={"Adhar Number"} name="adhar" type="text" />
                <input {...register('skill1',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Skill 1"} name="skill1" type="text" />
                <input {...register('skill2',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Skill 2"} name="skill2" type="text" />
                <input {...register('skill3',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Skill 3"} name="skill3" type="text" />
                <input {...register('service',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Service/Occupation"} name="service" type="text" />
                <input {...register('profile_image',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Profile Image Url"} type="url" />
                <input {...register('portfolio1',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Portfolio Url 1"} name="portfolio1" type="url" />
                <input {...register('portfolio2',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Portfolio Url 2"} name="portfolio2" type="url" />
                <input {...register('portfolio3',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Portfolio Url 3"} name="portfolio2" type="url" />
                <textarea {...register('bio',)} className="w-3/4 py-2 border-2 rounded-lg px-5" placeholder={"Describe About Your Self"} name="bio" type="text" />
                <div className='flex space-x-10'>
                    <button type="submit" className='bg-blue-500 px-5 py-1 rounded-lg' data-mdb-ripple="true"
                        data-mdb-ripple-color="light" text="Submit" >Submit</button>
                    {update === true && <button del={true} data-mdb-ripple="true"
                        data-mdb-ripple-color="light" className='bg-red-500 px-5 py-1 rounded-lg' onClick={async () => {
                            const YES = prompt("If you are sure to delete: type 'YES'");
                            if (YES === "YES") {
                                const res = await deleteUser(defaultValues.id);
                                alert(res.status);
                                if (res.status === 'success') signOut();
                                router.push('/');
                            }
                        }
                        } text='Delete' >Delete</button>}
                </div>
            </form>
        </div>
    );
}


export default Form;