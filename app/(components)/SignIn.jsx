'use client'

import { useState } from 'react';
import Link from "next/link";
import { signIn } from 'next-auth/react';

const SignIn = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const signInCustomer = async (e) => {

        console.log("here we are");

        e.preventDefault();

        setIsLoading(true);

        setEmailErrMsg('');
        setPasswordErrMsg('');

        const res = await signIn('credentials', { ...data, redirect: false });
        if (res?.error) {
            setIsLoading(false);
            const errorRes = await JSON.parse(res.error);
            if (errorRes.email) setEmailErrMsg(errorRes.email);
            if (errorRes.password) setPasswordErrMsg(errorRes.password);
        } else if (res?.ok) {
            window.location.href = "/";
            setIsLoading(false);
        }
    }

    const googleLogin = async (e) => {
        try {
            e.preventDefault();
            setIsGoogleLoading(true);
            const res = await signIn('google-customer', { callbackUrl: '/' });
            if (res) {
                setIsGoogleLoading(false);
            }
        } catch (err) {
            console.log("this is it here: ", err);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row my-20 min-h-[70vh]">
            <div className="flex flex-col justify-between w-full p-10 text-white bg-blue-600 rounded-lg lg:w-1/3">
                <h1 className="mb-5 lg:mb-0">Sign In</h1>
                <p className="font">Create your <span className="font-[family-name:var(--font-pacifico)]">Bookly</span> account here. If you don&apos;have an account, click here to <Link href="/signup" className="underline">sign up</Link>.</p>
            </div>

            <form className="flex flex-col justify-center w-full mt-10 lg:ml-10 lg:mt-0 lg:w-3/5" onSubmit={signInCustomer}>
                <div>
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

                <button type="submit" className={`p-3 rounded-lg mt-10 text-white bg-blue-600 ${isLoading && "opacity-75 cursor-not-allowed"}`} disabled={isLoading}>{isLoading ?
                    <span className='flex items-center justify-center text-center'>
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        Signing In...
                    </span> : "Sign In"}</button>

                <p className="my-5 text-center">OR</p>

                <button disabled={isGoogleLoading} className={`btn bg-slate-200 w-full active:scale-95 transition-all ${isGoogleLoading && "opacity-75 cursor-not-allowed"}`} onClick={googleLogin}>
                    {
                        isGoogleLoading ?
                            <span className='flex items-center justify-center py-2 text-center'>
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                Signing in with Google...
                            </span>
                            : <span className='flex items-center justify-center text-center'>
                                <svg width="40" height="40" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M120 76.1C120 73 119.7 69.8 119.2 66.8H75.8999V84.5H100.7C99.6999 90.2 96.3999 95.2 91.4999 98.4L106.3 109.9C115 101.8 120 90 120 76.1Z" fill="#4280EF" />
                                    <path d="M75.8999 120.9C88.2999 120.9 98.6999 116.8 106.3 109.8L91.4999 98.4C87.3999 101.2 82.0999 102.8 75.8999 102.8C63.8999 102.8 53.7999 94.7 50.0999 83.9L34.8999 95.6C42.6999 111.1 58.4999 120.9 75.8999 120.9Z" fill="#34A353" />
                                    <path d="M50.0999 83.8C48.1999 78.1 48.1999 71.9 50.0999 66.2L34.8999 54.4C28.3999 67.4 28.3999 82.7 34.8999 95.6L50.0999 83.8Z" fill="#F6B704" />
                                    <path d="M75.8999 47.3C82.3999 47.2 88.7999 49.7 93.4999 54.2L106.6 41C98.2999 33.2 87.2999 29 75.8999 29.1C58.4999 29.1 42.6999 38.9 34.8999 54.4L50.0999 66.2C53.7999 55.3 63.8999 47.3 75.8999 47.3Z" fill="#E54335" />
                                </svg>
                                Sign in with Google
                            </span>
                    }
                </button>
            </form>
        </div>
    )
}

export default SignIn