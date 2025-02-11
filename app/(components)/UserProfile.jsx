import { useState } from 'react';
import { useSession } from "next-auth/react";
import { changeUserDetails } from "@/app/(functions)/changeUserDetails";

import ToasterContext from "@/app/(components)/ToasterContext";
import Link from "next/link";

const UserProfile = ({ session }) => {
    const { update } = useSession();

    const [firstName, setFirstName] = useState(session?.user.firstName);
    const [isLoadingFirstName, setIsLoadingFirstName] = useState(false);
    const [lastName, setLastName] = useState(session?.user.lastName);
    const [isLoadingLastName, setIsLoadingLastName] = useState(false);
    const [email, setEmail] = useState(session?.user.email);
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(session?.user.shippingAddress);
    const [isLoadingShippingAddress, setIsLoadingShippingAddress] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);

    async function handleSessionEdit() {
        await update({ firstName, lastName, email, shippingAddress });
    }

    return (
        <>
            <button className="p-3 bg-blue-700 rounded-full" onClick={() => document.getElementById('profileModal').showModal()}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                    strokeLinejoin="round" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z" strokeWidth="2" /></svg>
            </button>

            <dialog id="profileModal" className="text-black modal">
                <div className="w-11/12 max-w-5xl modal-box bg-white">

                    <h4>User Profile</h4>

                    <>
                        {
                            session.user.isGoogleAccount ? <div>
                                <span className="text-sm font-bold text-slate-600">First Name</span> <br />
                                <span className="text-lg">{firstName}</span>
                            </div> :
                                <form className="mt-4" onSubmit={(e) => changeUserDetails(e, firstName, "firstName", session.user.id, setIsLoadingFirstName, handleSessionEdit)}>
                                    <label htmlFor="firstName">First Name:</label> <br />
                                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} id="firstName" name="firstName" className="bg-white border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your first name here" /> <br />
                                    <button disabled={isLoadingFirstName} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingFirstName && "opacity-75 cursor-not-allowed"}`}>
                                        {
                                            isLoadingFirstName ?
                                                <span className='flex items-center justify-center text-center'>
                                                    <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    Changing your First Name...
                                                </span> : "Change First Name"
                                        }
                                    </button>
                                </form>
                        }

                        {
                            session.user.isGoogleAccount ? <div className="mt-3">
                                <span className="text-sm font-bold text-slate-600">Last Name</span> <br />
                                <span className="text-lg">{lastName}</span>
                            </div> :
                                <form className="mt-4" onSubmit={(e) => changeUserDetails(e, lastName, "lastName", session.user.id, setIsLoadingLastName, handleSessionEdit)}>
                                    <label htmlFor="lastName">Last Name:</label> <br />
                                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} id="lastName" name="lastName" className="bg-white border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your last name here" /> <br />
                                    <button disabled={isLoadingLastName} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingLastName && "opacity-75 cursor-not-allowed"}`}>{
                                        isLoadingLastName ?
                                            <span className='flex items-center justify-center text-center'>
                                                <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                Changing your Last Name...
                                            </span> : "Change  Last Name"
                                    }</button>
                                </form>
                        }

                        {
                            session.user.isGoogleAccount ? <div className="mt-3">
                                <span className="text-sm font-bold text-slate-600">Email</span> <br />
                                <span className="text-lg">{email}</span>
                            </div> :
                                <form className="mt-4" onSubmit={(e) => changeUserDetails(e, email, "email", session.user.id, setIsLoadingEmail, handleSessionEdit)}>
                                    <label htmlFor="email">Email:</label> <br />
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="email" className="bg-white border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your email here" /> <br />
                                    <button disabled={isLoadingEmail} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingEmail && "opacity-75 cursor-not-allowed"}`}>
                                        {
                                            isLoadingEmail ?
                                                <span className='flex items-center justify-center text-center'>
                                                    <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    Changing your Email...
                                                </span> : "Change Email"
                                        }
                                    </button>
                                </form>
                        }

                        {
                            session.user.role === "customer" &&
                            (
                                session.user.isGoogleAccount ? <form className="mt-3" onSubmit={(e) => changeUserDetails(e, shippingAddress, "shippingAddress", session.user.id, setIsLoadingShippingAddress, handleSessionEdit)}>
                                    <label htmlFor="shipping-address">Shipping Address:</label> <br />
                                    <input type="text" value={shippingAddress ? shippingAddress : ""} onChange={e => setShippingAddress(e.target.value)} id="shipping-address" className="bg-white border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your shipping address here" /> <br />
                                    <button disabled={isLoadingShippingAddress} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingShippingAddress && "opacity-75 cursor-not-allowed"}`}>
                                        {
                                            isLoadingShippingAddress ?
                                                <span className='flex items-center justify-center text-center'>
                                                    <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    Changing your Shipping Address...
                                                </span> : "Change Shipping Address"
                                        }
                                    </button>
                                </form> :
                                    <form className="mt-4" onSubmit={(e) => changeUserDetails(e, shippingAddress, "shippingAddress", session.user.id, setIsLoadingShippingAddress, handleSessionEdit)}>
                                        <label htmlFor="shipping-address">Shipping Address:</label> <br />
                                        <input type="text" value={shippingAddress ? shippingAddress : ""} onChange={e => setShippingAddress(e.target.value)} id="shipping-address" className="bg-white border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your shipping address here" /> <br />
                                        <button disabled={isLoadingShippingAddress} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingShippingAddress && "opacity-75 cursor-not-allowed"}`}>
                                            {
                                                isLoadingShippingAddress ?
                                                    <span className='flex items-center justify-center text-center'>
                                                        <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        Changing your Shipping Address...
                                                    </span> : "Change Shipping Address"
                                            }
                                        </button>
                                    </form>
                            )
                        }

                        {
                            !session.user.isGoogleAccount &&
                            <form className="mt-4" onSubmit={(e) => changeUserDetails(e, { oldPassword, newPassword }, "password", session.user.id, setIsLoadingPassword, handleSessionEdit)}>
                                <label htmlFor="old-password">Old Password:</label> <br />
                                <div className="flex justify-between p-1 mb-2 border-2 border-gray-400 rounded-lg">
                                    <input type={showOldPassword ? "text" : "password"} value={oldPassword} onChange={e => setOldPassword(e.target.value)} id="old-password" name="old-password" className="bg-white focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your old password here" />
                                    <button type="button" className="p-1 px-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all" onClick={() => setShowOldPassword(!showOldPassword)}>
                                        {
                                            showOldPassword ?
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z" /></svg> :
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" /></svg>
                                        }
                                    </button>
                                </div>

                                <label htmlFor="new-password">New Password:</label> <br />
                                <div className="flex justify-between p-1 border-2 border-gray-400 rounded-lg">
                                    <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} id="new-password" name="new-password" className="bg-white focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter your password here" />
                                    <button type="button" className="p-1 px-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all" onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {
                                            showNewPassword ?
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z" /></svg> :
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" /></svg>
                                        }
                                    </button>
                                </div>
                                <button disabled={isLoadingPassword} type="submit" className={`px-2 py-1 mt-2 text-white bg-blue-600 rounded-lg active:scale-95 transition-all ${isLoadingPassword && "opacity-75 cursor-not-allowed"}`}>
                                    {
                                        isLoadingPassword ?
                                            <span className='flex items-center justify-center text-center'>
                                                <svg aria-hidden="true" className="w-2 h-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                Changing your Password...
                                            </span> : "Change Password"
                                    }
                                </button>
                            </form>
                        }

                        <Link className="inline-block float-right p-3 mt-5 text-white transition-all bg-red-600 rounded-lg active:scale-95" href="/api/auth/signout?callbackUrl=/">Log Out</Link>
                    </>

                    <form method="dialog">
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                </div>

                <ToasterContext />

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default UserProfile