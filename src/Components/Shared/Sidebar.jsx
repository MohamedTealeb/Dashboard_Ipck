import React, { useState } from 'react'
import im from '../../assets/304305481_470478301760187_6739104333513463181_n.jpg'
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const [sidenav, setSidenav] = useState(true);
    const location = useLocation();
  
    const toggleSidenav = () => {
      setSidenav(!sidenav);
    };
    
    
  
  return <>
  <div className="font-poppins fixed block antialiased">
    <div
      id="view" 
      className="h-full w-screen flex flex-row"
    >
      {/* Toggle button that's always visible */}
      <button
        onClick={toggleSidenav}
        className="p-2 bg-white rounded-md border border-gray-200 shadow-lg text-secondary hover:bg-black hover:text-white absolute top-0 cursor-pointer z-20"
        style={{ 
          left: sidenav ? '205px ' : '8px',
          transition: 'left 0.3s ease-in-out'
        }}
      >
        {sidenav ? (
          <svg className="w-5  h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        ) : (
          <svg className="w-5 bg-secondary text-white h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        )}
      </button>
      
      <div
        id="sidebar"
        className={`bg-secondary h-screen shadow-xl px-3 w-60 overflow-x-hidden transition-all duration-300 ease-in-out ${sidenav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
        
          <div id="profile" className="space-y-3">
            <img
              src={im}
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <p className="text-xs text-white text-center">Administrator</p>
            </div>
          </div>
         
          <div id="menu" className="flex flex-col space-y-2">
            <Link
              to={'/home'}
              className={`text-sm font-medium text-black  bg-black py-2 px-2 hover:text-base rounded-md transition duration-150 ease-in-out ${
                location.pathname === '/home' 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span className="">Dashboard</span>
            </Link>
            <Link
              to={'/products'}
              className={`text-sm font-medium text-black  bg-black py-2 px-2 hover:text-base rounded-md transition duration-150 ease-in-out ${
                location.pathname === '/products' 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                ></path>
              </svg>
              <span className="">Products</span>
            </Link>
          
          
           
            
           
            <Link
              to={'/admin'}
              className={`text-sm font-medium text-black  bg-black py-2 px-2 hover:text-base rounded-md transition duration-150 ease-in-out ${
                location.pathname === '/admin' 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`} >
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
              <span className="">Admin</span>
            </Link>
            <Link
              to={'/users'}
              className={`text-sm font-medium text-black  bg-black py-2 px-2 hover:text-base rounded-md transition duration-150 ease-in-out ${
                location.pathname === '/users' 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`} >
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
              <span className="">Users</span>
            </Link>
            <Link
              to={'/verify'}
              className={`text-sm font-medium text-black  bg-black py-2 px-2 hover:text-base rounded-md transition duration-150 ease-in-out ${
                location.pathname === '/verify' 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}  >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="">Verify</span>
            </Link>
          </div>
        </div>
      </div>
     
    </div>
  </div>
  </>
}
