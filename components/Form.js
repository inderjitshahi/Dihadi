import { db } from '@/firebase';
import Button from '@/subComponents/Button';
import Input from '@/subComponents/Input';
import Select from '@/subComponents/Select';
import Textarea from '@/subComponents/Textarea';
import { addComplaint, deleteComplaint, updateComplaint, UpdateComplaint } from '@/utils/data';
import { async } from '@firebase/util';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function Form({ form_label, update, defaultValues, disable, id }) {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            compliance_report: 'null',
            ...defaultValues
        }
    });
    const onSubmit = async (data) => {
        // alert( alert(JSON.stringify(data)));
        if (update === false) {
            const res = await addComplaint(data);
            if (res?.id) {
                router.push('/');
                alert(`Complaint Added Successfully with id: ${res.id}`);
            } else {
                alert("Can't Add Complaint");
                console.log(res);
            }
        } else {
            const res = await updateComplaint(form_label, data);
            if (res.status === "success") {
                router.push('/');
                alert(`Complaint Updated Successfully!!`);
            } else {
                alert("Can't Update Complaint");
            }
        }
    }
    const user = useSelector(status => status?.user?.user);
    const status = ["pending", "working", "completed"];
    const thana = ["Thana 1", "Thana 2", "Thana 3"];
    return (
        <div className='min-h-screen w-full flex items-center  flex-col space-y-5 py-5'>
            <h2 className='text-2xl font-semibold'>{form_label}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full md:w-3/4 max-w-7xl items-center py-10">
                <Input register={register} required disable={disable?.name} label={"Name"} name="name" type="text" />
                <Input register={register} required label={"Date"} disable={disable?.register_date} name="register_date" type="date" />
                <Input register={register} label={"Email"} name="email" disable={disable?.email} type="email" />
                <Input register={register} required label={"Phone Number"} disable={disable?.phone} name="phone" type={'tel'} />
                <Select label="Thana" options={thana} register={register} disable={disable?.thana} name="thana" />
                <Input register={register} label={"Case Number"} disable={disable?.case_number} name="case_number" type="number" />
                <Textarea register={register} required label={"Concerns"} disable={disable?.concern} name="concern" type="text" />
                <Textarea register={register} label={"Compliance Report"} disable={disable?.compliance_report} name="compliance_report" type="text" />
                <Input register={register} label={"Directions By SP Sir"} disable={disable?.directions} name="directions" type="text" />
                <Input register={register} required label={"Compliance Due Date"} disable={disable?.due_date} name="due_date" type="date" />
                <Select label="Status" options={status} register={register} name="status" />
                <div className='flex space-x-10'>
                    <Button type="submit" text={update === true ? "Update" : "Submit"} />
                    {update === true && user?.type === 'admin' && <Button del={true} func={async () => {
                        const YES = prompt("If you are sure to delete: type 'YES'");
                        if (YES === "YES") {
                            const res = await deleteComplaint(form_label);
                            alert(res.status);
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