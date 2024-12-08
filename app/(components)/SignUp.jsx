'use client'

import { useState } from 'react';
import Link from "next/link";
import { signIn } from 'next-auth/react';

const SignUp = () => {
    const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '', shippingAddress: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
    const [lastNameErrMsg, setLastNameErrMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const signUpCustomer = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        setFirstNameErrMsg('');
        setLastNameErrMsg('');
        setEmailErrMsg('');
        setPasswordErrMsg('');

        const res = await signIn('credentials', { ...data, redirect: false });
        if (res?.error) {
            setIsLoading(false);
            const errorRes = await JSON.parse(res.error);
            console.log("this is the error: ", errorRes);
            if (errorRes.firstName) setFirstNameErrMsg(errorRes.firstName);
            if (errorRes.lastName) setLastNameErrMsg(errorRes.lastName);
            if (errorRes.email) setEmailErrMsg(errorRes.email);
            if (errorRes.password) setPasswordErrMsg(errorRes.password);
        } else if (res?.ok) {
            window.location.href = "/";
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row my-20 min-h-[70vh]">
            <div className="flex flex-col justify-between w-full p-10 text-white bg-blue-600 rounded-lg lg:w-1/3">
                <h1 className="mb-5 lg:mb-0">Sign Up</h1>
                <p className="font">Create your <span className="font-[family-name:var(--font-pacifico)]">Bookly</span> account here. If you already have an account, click here to <Link href="/signin" className="underline">sign in</Link>.</p>
            </div>

            <form className="flex flex-col justify-center w-full mt-10 lg:ml-10 lg:mt-0 lg:w-3/5" onSubmit={signUpCustomer}>
                <div className="flex justify-between">
                    <div className="w-[47%]">
                        <label htmlFor="firstName">First Name</label> <br />
                        <input type="text" name="firstName" id="firstName" placeholder="Enter your first name here" className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" value={data.firstName}
                            onChange={e => setData({ ...data, firstName: e.target.value })} required={true} />
                        {firstNameErrMsg && <p className="mt-2 text-red-500">{firstNameErrMsg}</p>}
                    </div>

                    <div className="w-[47%]">
                        <label htmlFor="lastName">Last Name</label> <br />
                        <input type="text" name="lastName" id="lastName" placeholder="Enter your last name here" className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} required={true} />
                        {lastNameErrMsg && <p className="mt-2 text-red-500">{lastNameErrMsg}</p>}
                    </div>
                </div>

                <div className="mt-10">
                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" placeholder="Enter your email here" className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} required={true} />
                    {emailErrMsg && <p className="mt-2 text-red-500">{emailErrMsg}</p>}
                </div>

                <div className="mt-10">
                    <label htmlFor="password">Password</label> <br />
                    <div className="flex justify-between p-1 border-2 border-gray-400 rounded-lg">
                        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter a strong password here" className="focus:!outline-none p-2 rounded-lg w-full" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} required={true} />
                        <button type="button" className="text-white bg-blue-600 btn" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="23" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z" /></svg> :
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="23" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" /></svg>
                            }
                        </button>
                    </div>
                    {passwordErrMsg && <p className="mt-2 text-red-500">{passwordErrMsg}</p>}
                </div>

                <div className="mt-10">
                    <label htmlFor="shipping-address">Shipping Address (skip if you haven&apos;t made up your mind yet)</label> <br />
                    <input type="text" name="shipping-address" id="shipping-address" placeholder="Enter your shipping address" className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" value={data.shippingAddress} onChange={e => setData({ ...data, shippingAddress: e.target.value })} />
                </div>

                <button type="submit" className={`p-3 rounded-lg mt-10 text-white bg-blue-600 transition-all active:scale-90 ${isLoading && "opacity-75 cursor-not-allowed"}`} disabled={isLoading}>{isLoading ? <span className='flex items-center justify-center text-center'>
                    <svg aria-hidden="true" className="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    Creating your account...
                </span> : "Create Account"}</button>
            </form>
        </div>
    )
}

export default SignUp