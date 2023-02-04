import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import regeneratorRuntime from "regenerator-runtime";
function TableGlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {

    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState([globalFilter]);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    },300);

    return (
        <div className='flex justify-center items-center space-x-5 my-10'>
            <span className='italic text-lg'>Search</span>
            <input className='border-2 px-10 py-2 focus:border-blue-500 outline-none rounded-md text-gray-500' value={value} onChange={(e)=>{
                setValue(e.target.value);
                onChange(e.target.value)
            }} placeholder={`${count} records...`}
            />
        </div>
    );
}

export default TableGlobalFilter;