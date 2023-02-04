import React from 'react';

function Select({ label, children, register, required, type, name, options, disable }) {
    return (
        <div className="flex justify-center w-4/5">
            <div className="mb-3 w-full">
                <select
                    defaultValue={label}
                    disabled={disable}
                    {...register(name || "null", { required })}
                    type={type || "text"}
                    className={`
                    ${disable && "bg-gray-200"}
                    form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Default select example">
                    <option selected>{label}</option>
                    {options.map(item => {
                        return <option value={item} key={item}>{item}</option>
                    })}
                </select>
            </div>
        </div>
    );
}

export default Select;