import React from 'react'

function Footer() {
  return (
    <div className='sticky bottom-0'>
         <div className="py-2 text-xs md:text-sm font-Helvetica ">
        <div className="w-full border-t-2 border-white"></div>
      </div>
      <div className="container w-full p-4 mx-auto divide-gray-400 md:p-5 lg:flex-row bg-zinc-100">
        <div className="flex flex-col justify-center pt-6 lg:pt-0">
       
          <div className="self-center py-2 space-y-2 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
            <ul className="">
              <p> Copyright © {new Date().getFullYear()}</p>
              <p>
                <span className="text-justify text-pink-500">
                  <span> </span>Athulya Senior care.
                </span>
                <span> </span> All rights reserved.
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer