import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
function Card({ title, img, description, link }) {
  return (
    <Link href={link || '/'}>
      <div className="flex justify-center items-center h-[35vh]">
        <div className="rounded-lg shadow-lg bg-white max-w-sm h-full grid grid-cols-2">
          <div data-mdb-ripple="true" data-mdb-ripple-color="light" className='relative rounded-lg overflow-hidden grid-col-1'>
            <Image src={img || "https://mdbootstrap.com/img/new/standard/nature/182.jpg"} alt="image" fill />
          </div>
          <div className="p-6 overflow-hidden">
            <h5 className="text-gray-900 text-md md:text-xl font-medium mb-2">{title}</h5>
            <p className="text-gray-500 text-sm md:text-md mb-4">
              {description || ""}
            </p>
            <Button type="button" text="Open" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;