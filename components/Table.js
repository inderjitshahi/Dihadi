import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { BiSortAlt2 } from 'react-icons/bi'
import TableGlobalFilter from './TableGlobalFilter';
import { useSelector } from 'react-redux';
import { getAllUsers, getComplaints, getWorkers } from '@/utils/data';
import { useSession } from 'next-auth/react';

function Table(props) {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user?.user);
    console.log("in Table",user);
    // const {status}=useSession();
    useEffect(() => {
        if (user?.type) {
            async function getData() {
                const complaints = await getWorkers();
                console.log("table",complaints);
                setData(complaints);
            }
            getData();
        }
    }, [user]);

    const products = useMemo(() => {
        return data;
    }, [data]);

    const columns = useMemo(() => (data[0] ?
        Object.keys(data[0]).filter((key => (key !== 'email' && key !== 'type' && key !== 'profile_image' && key !== 'bio' && key !== 'adhar' && key !== 'id' && key !== 'dob' && key !== 'password' && key !== 'portfolio1' && key !== 'portfolio2' && key !== 'portfolio3' && key !== 'phone'))).map((key) => {
            if (key === 'image') {
                return {
                    Header: key,
                    accessor: key,
                    Cell: ({ value }) => <Image src={value} width="30" height={'30'} alt="img" />
                }
            }
            return { Header: key, accessor: key };
        })
        : []), [data]);

    // const tableHooks = (hooks) => {
    //     hooks.visibleColumns.push((columns) => [
    //         ...columns,
    //         {
    //             id: "Edit",
    //             Header: 'Edit',
    //             Cell: ({ row }) => (
    //                 <Button text={'Edit'} func={() => alert(row.values.price)}></Button>
    //             )
    //         }
    //     ])
    // };

    const tableInstances = useTable({ columns, data: products }, useGlobalFilter, useSortBy);
    const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstances;

    return (
        <>
            <TableGlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
            <div className="flex flex-col mb-10">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full" {...getTableProps()}>
                                <thead className="border-b">
                                    {headerGroups.map((headerGroup) => (<tr key={Math.random()} className="bg-black text-white" {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th key={Math.random()} scope="col" className="text-md font-medium  px-6 py-4 text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                <p className='flex items-center space-x-1'>
                                                    <span>
                                                        {column.render("Header")}
                                                    </span>
                                                    <BiSortAlt2 />
                                                </p>
                                            </th>
                                        ))}
                                    </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, idx) => {
                                        prepareRow(row);
                                        const id = row.original.id;
                                        // console.log(row);
                                        return <tr key={Math.random()} className={`border-b ${idx % 2 == 0 && "bg-purple-200"}`} {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell, idx) => {
                                                    // let id;
                                                    // if(cell.column.Header==='id')id=cell.value;
                                                    // console.log("id",id);
                                                    return (
                                                        <td key={Math.random()} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
                                                            <Link href={`/profile/${id}`}>
                                                                {cell.render("Cell")}
                                                            </Link>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;