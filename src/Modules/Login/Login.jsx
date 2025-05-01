import React, { useState } from 'react';
import logo from '../../assets/304305481_470478301760187_6739104333513463181_n.jpg';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useDispatch } from "react-redux";
import { loginUser } from "../../Apis/LoginApi/LoginApi";

export default function Login() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const isAuthinticated = !!localStorage.getItem("token");

 
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const result = await dispatch(loginUser(values)).unwrap();
                if(result.user.role==="admin"){
                    navigate('/home')
                }else {
                    setErrorMsg("You are not authorized to access the admin area.");
                }

            } catch (error) {
                setErrorMsg("Invalid email or password");
            }
        }
        ,
        validate: (values) => {
            let errors = {};
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(values.email)) {
                errors.email = "Email must be valid.";
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "Password must be between 6 and 12 characters.";
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
                                <div className="alert text-red-600 text-center mb-2">
                                    {formik.errors.email}
                                </div>
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
                                <div className="alert text-red-600 text-center mb-2">
                                    {formik.errors.password}
                                </div>
                            )}

                            {errorMsg && (
                                <div className="alert text-red-600 text-center mb-4">
                                    {errorMsg || "An Error has happen"}
                                   
                                </div>
                            )}

                            <button
                                type="submit"
                                className="transition duration-200 bg-white text-black hover:cursor-pointer hover:bg-black focus:bg-black focus:shadow-sm focus:ring-4 focus:text-white focus:ring-black focus:ring-opacity-50 hover:text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Login</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

