import React from 'react';

function Button({text,children,type,func, del}) {
    return (
        <button
        onClick={func}
        type={type||'button'}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className={`inline-block px-6 py-2.5 ${del===true?"bg-red-500":"bg-blue-600"} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:${del===true?"bg-red-700":"bg-blue-700"}hover:shadow-lg focus:${del===true?"bg-red-700":"bg-blue-700"} focus:shadow-lg focus:outline-none focus:ring-0 active${del===true?"bg-red-800":"bg-blue-800"} active:shadow-lg transition duration-150 ease-in-out`}
    >{text}</button>
    );
}

export default Button;