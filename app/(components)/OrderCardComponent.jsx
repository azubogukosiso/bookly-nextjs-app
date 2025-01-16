"use client";

import { confirmOrder } from "@/app/(functions)/confirmOrder";
import { orderInTransit } from "@/app/(functions)/orderInTransit";
import { orderDelivered } from "@/app/(functions)/orderDelivered";

import { useState } from "react";
import getSymbolFromCurrency from 'currency-symbol-map';

const OrderCardComponent = ({ firstName, orderId, lastName, email, shippingAddress, dateOrdered, dateDelivered, orderedBooks, totalAmount, isConfirmed, inTransit, isDelivered, session }) => {

    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className='p-5 mb-5 bg-white border rounded-lg shadow-lg border-slate-300'>
            <p><span className="font-bold font-sm">Full Name</span> <br />{firstName} {lastName}</p>
            <p className="mt-3"><span className="font-bold">Email</span> <br />{email}</p>
            <p className="mt-3"><span className="font-bold">Shipping Address</span> <br />{shippingAddress}</p>
            <p className="mt-3"><span className="font-bold">Date Ordered</span> <br />{new Date(dateOrdered).toDateString()}</p>
            <p className="mt-3"><span className="font-bold">Date Delivered</span> <br />{dateDelivered ? new Date(dateDelivered).toDateString() : "Not yet delivered"}</p>
            <div className="mt-3">
                <p className="font-bold">Books Ordered</p>
                <ul className="ml-5">
                    {
                        orderedBooks.map((orderedBook, index) => (
                            <li key={orderedBook._id} className={`text-sm list-disc ${orderedBooks.length - 1 !== index && "mb-1"}`}>{orderedBook.title} - {orderedBook.qty} {parseInt(orderedBook.qty) > 1 ? "copies" : "copy"} @ {getSymbolFromCurrency("NGN")}{orderedBook.price} {parseInt(orderedBook.qty) > 1 && "each"}</li>
                        ))
                    }
                </ul>
            </div>
            <p className="mt-3"><span className="font-bold">Total Amount</span> <br />{getSymbolFromCurrency("NGN")}{totalAmount}</p>
            <div className="p-3 mt-3 bg-blue-200 border-l-4 border-blue-600 rounded-md">
                {
                    isConfirmed ?
                        inTransit ?
                            isDelivered ?
                                <p className="flex text-sm text-blue-600">
                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" /></svg>
                                    This order has been delivered. {session.user.role === "customer" && "Happy reading 😉"}
                                </p>
                                :
                                <p className="flex text-sm text-blue-600">
                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                                    This order is in transit. Please exercise some patience.
                                </p>
                            :
                            <p className="flex text-sm text-blue-600">
                                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                                {
                                    session.user.role === "customer" ? "This order has been confirmed by the admins and will soon be in transit. Please exercise some patience." : "This order has been confirmed."
                                }
                            </p>
                        :
                        <p className="flex text-sm text-blue-600">
                            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                            {
                                session.user.role === "customer" ? "This order is yet to be confirmed by the admins. Please exercise some patience." : "This order is yet to be confirmed."
                            }
                        </p>
                }
                {

                }
            </div>
            <div className="flex justify-end mt-3">
                <>
                    {
                        isConfirmed
                            ?
                            inTransit
                                ?
                                session.user.role === "admin"
                                    ?
                                    ""
                                    :
                                    isDelivered
                                        ?
                                        <></>
                                        :
                                        <button className={`p-3 ml-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95 ${isProcessing && "opacity-75 cursor-not-allowed"}`} onClick={() => orderDelivered(orderId, setIsProcessing)}>{!isProcessing ? "Mark Order as Delivered" : <span className='flex items-center justify-center text-center'><svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg> Processing...</span>}</button>
                                :
                                session.user.role === "admin" && <button className={`p-3 ml-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95 ${isProcessing && "opacity-75 cursor-not-allowed"}`} onClick={() => orderInTransit(orderId, setIsProcessing)}>{!isProcessing ? "Mark Order as in Transit" : <span className='flex items-center justify-center text-center'><svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg> Processing...</span>}</button>
                            :
                            session.user.role === "admin" && <button className={`p-3 ml-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95 ${isProcessing && "opacity-75 cursor-not-allowed"}`} onClick={() => confirmOrder(orderId, setIsProcessing)}>{!isProcessing ? "Confirm Order" : <span className='flex items-center justify-center text-center'><svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> Processing...</span>}</button>
                    }
                </>
            </div>
        </div>
    )
}

export default OrderCardComponent