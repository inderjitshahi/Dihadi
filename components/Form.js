import { userActions } from '@/store/userSlice';
import Input from '@/subComponents/Input';
import Select from '@/subComponents/Select';
// import Button from '@/subComponents/Button';
// import Input from '@/subComponents/Input';
// import Select from '@/subComponents/Select';
// import Textarea from '@/subComponents/Textarea';
import { addUser, deleteUser, updateUser } from '@/utils/data';
import { signOut } from 'next-auth/react';
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
    // const user = useSelector(status => status?.user?.user);
    const type = ["worker", "contractor"];
    return (
        <div className='min-h-screen w-full flex items-center  flex-col space-y-5 py-5'>
            <h2 className='text-2xl font-semibold'>{defaultValues?.name}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full md:w-3/4 max-w-7xl items-center py-10">
                <Select options={type} register={register} required label={"User Type"} name="type" type="text" />
                <Input register={register} className="border-2" placeholder='Name' required disable={disable?.name} label={"Name"} name="name" type="text" />
                <input register={register} required label={"Password"} name="password" type="password" />
                <input register={register} label={"Email"} name="email" disable={disable?.email} type="email" />
                <input register={register} required label={"Phone Number"} disable={disable?.phone} name="phone" type={'tel'} />
                <input register={register} required label={"DOB"} name="dob" type="date" />
                <input register={register} required label={"Location"} name="location" type="text" />
                <input register={register} label={"Experience Years"} name="experience" type="number" />
                <input register={register} disable={disable?.name} label={"Adhar Number"} name="adhar" type="text" />
                <input register={register} label={"Skill 1"} name="skill1" type="text" />
                <input register={register} label={"Skill 2"} name="skill2" type="text" />
                <input register={register} label={"Skill 3"} name="skill3" type="text" />
                <input register={register} label={"Service/Occupation"} name="service" type="text" />
                <input register={register} label={"Profile Image Url"} name="profile_image" type="url" />
                <input register={register} label={"Portfolio Url 1"} name="portfolio1" type="url" />
                <input register={register} label={"Portfolio Url 2"} name="portfolio2" type="url" />
                <input register={register} label={"Portfolio Url 3"} name="portfolio2" type="url" />
                <textarea register={register} label={"Describe About Your Self"} name="bio" type="text" />
                <div className='flex space-x-10'>
                    <button type="submit" text="Submit" />
                    {update === true && <button del={true} func={async () => {
                        const YES = prompt("If you are sure to delete: type 'YES'");
                        if (YES === "YES") {
                            const res = await deleteUser(defaultValues.id);
                            alert(res.status);
                            if (res.status === 'success') signOut();
                            router.push('/');
                        }
                    }
                    } text='Delete' />}
                </div>
            </form>
        </div>
    );
}


export default Form;