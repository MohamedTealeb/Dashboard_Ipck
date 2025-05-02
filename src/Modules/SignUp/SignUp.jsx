import React, { useState } from 'react';
import logo from '../../assets/304305481_470478301760187_6739104333513463181_n.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('role', values.role);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('phone', values.phone);

        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },

           
        });

        navigate('/login');
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    },
    validate: (values) => {
      let errors = {};
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^(?:\+20|01)(0|1|2|5|7|8|9)([- ]?\d{4}){2}$/;

      if (!values.email) {
        errors.email = 'Email is required.';
      } else if (!emailPattern.test(values.email)) {
        errors.email = 'Email must be valid.';
      }

      if (!values.password) {
        errors.password = 'Password is required.';
      } else if (values.password.length < 6 || values.password.length > 12) {
        errors.password = 'Password must be between 6 and 12 characters.';
      }

      if (!values.role) {
        errors.role = 'Role is required.';
      }

      if (!values.firstName) {
        errors.firstName = 'First name is required.';
      }

      if (!values.lastName) {
        errors.lastName = 'Last name is required.';
      }

      if (!values.phone) {
        errors.phone = 'Phone number is required.';
      } else if (!phonePattern.test(values.phone)) {
        errors.phone = 'Phone number must be a valid Egyptian number (e.g., +201234567890 or 012-345-6789).';
      }

      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="min-h-screen bg-[#046584] flex flex-col justify-center sm:py-12">
        <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
          <img
            className="mx-auto rounded-2xl"
            style={{ width: '150px', height: '125px' }}
            src={logo}
            alt="Logo"
          />
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-black pb-1 block">First Name</label>
              <input
                type="text"
                name="firstName"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.firstName}</div>
              )}

              <label className="font-semibold text-sm text-black pb-1 block">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.lastName}</div>
              )}

              <label className="font-semibold text-sm text-black pb-1 block">E-mail</label>
              <input
                type="email"
                name="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.email}</div>
              )}

              <label className="font-semibold text-sm text-black pb-1 block">Password</label>
              <input
                type="password"
                name="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.password}</div>
              )}

              <label className="font-semibold text-sm text-black pb-1 block">Role</label>
              <select
                name="role"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="user">User</option>
              </select>
              {formik.errors.role && formik.touched.role && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.role}</div>
              )}

              <label className="font-semibold text-sm text-black pb-1 block">Phone</label>
              <input
                type="text"
                name="phone"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="e.g., +201234567890 or 012-345-6789"
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="alert text-red-600 text-center mb-2">{formik.errors.phone}</div>
              )}

              {errorMsg && <div className="alert text-red-600 text-center mb-4">{errorMsg}</div>}

              <button
                type="submit"
                className="transition duration-200 bg-white text-black hover:cursor-pointer hover:bg-black focus:bg-black focus:shadow-sm focus:ring-4 focus:text-white focus:ring-black focus:ring-opacity-50 hover:text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-sm text-black font-semibold hover:text-white hover:bg-black hover:cursor-pointer transition duration-200 rounded-lg px-4 py-2 inline-block"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}