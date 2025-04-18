import React, { useState } from 'react'
import Sidebar from './Sidebar'
export default function Home() {
 
  return <>
  <div className="relative">
      <div className="absolute inset-0">
        <div className="p-8 ml-30">
          <h2 className='text-black text-2xl font-semibold'>mooooo</h2>
          {/* Add your products content here */}
        </div>
      </div>
      <Sidebar />
      </div>
  </>
}
