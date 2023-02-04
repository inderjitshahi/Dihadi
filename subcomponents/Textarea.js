import React from 'react';

function Textarea({ label, children, register, required, type, name, disable }) {
    // console.log(name,disable);
    return (
        <div className="flex justify-center  w-4/5">
            <div className="mb-3 w-full">
                <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
                >{label}</label
                >
                <textarea
                    disabled={disable}
                    {...register(name, { required })}
                    type={type || "text"}
                    className={`
                    ${disable && "bg-gray-200"}
              form-control
              block
              w-full
                px-3
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
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            `}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Your message"
                ></textarea>
            </div>
        </div>
    );
}

export default Textarea;