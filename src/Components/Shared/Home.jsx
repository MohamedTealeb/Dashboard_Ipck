import React, { useState } from 'react'
import Sidebar from './Sidebar'
export default function Home() {
 
  return <>
  <div className='flex min-h-screen'>
  <Sidebar />
  <main className='flex-1 ml-50 transition-all duration-300' style={{ marginRight: '80px' }}>
        <div className='p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='bg-[#3c8dad] text-white rounded-lg shadow-lg flex flex-col items-center p-8'>
              <div className='text-2xl'>
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              </div>
              <h3 className="lg:text-lg text-sm font-semibold">Admin</h3>
              <p className='text-xl font-bold'>39</p>
            </div>
            <div className='bg-[#3c8dad] text-white rounded-lg shadow-lg flex flex-col items-center p-8'>
              <div className='text-2xl'>
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
              </svg>
              </div>
              <h3 className="lg:text-lg text-sm font-semibold">Users</h3>
              <p className='text-xl font-bold'>39</p>
            </div>
            </div>
            </div>
            </main>
  </div>
 
  </>
}
