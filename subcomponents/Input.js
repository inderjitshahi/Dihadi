import React from 'react';

function Input({ label, children, register, required, type, name, value, func, disable }) {
    return (
        <div className="form-floating mb-3 w-4/5">
            <input
                disabled={disable}
                value={value}
                onChange={func}
                {...register(name || "null", { required })}
                type={type || "text"} className={`
                ${disable && "bg-gray-200"}
                form-control
        block
        px-3
        w-full
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput" className="text-gray-700">{label}</label>
        </div>

    );
}

export default Input;