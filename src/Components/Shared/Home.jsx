import React, { useState } from 'react'
import Sidebar from './Sidebar'
export default function Home() {
 
  return <>
  <div className="relative">
      <div className="absolute inset-0">
        <div className="p-8 flex gap-4 ml-53">
          <h2 className='text-black text-2xl font-semibold'>Admins: <span className='text-black'>8</span></h2>
          <h2 className='text-black text-2xl font-semibold'>Users : <span className='text-black'>8</span></h2>
         
        </div>
      </div>
      <Sidebar />
      </div>
  </>
}
