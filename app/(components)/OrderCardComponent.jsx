"use client";

import { confirmOrder } from "@/app/(functions)/confirmOrder";
import { orderInTransit } from "@/app/(functions)/orderInTransit";
import { orderDelivered } from "@/app/(functions)/orderDelivered";
import getSymbolFromCurrency from 'currency-symbol-map';

const OrderCardComponent = ({ firstName, orderId, lastName, email, shippingAddress, dateOrdered, dateDelivered, orderedBooks, totalAmount, isConfirmed, inTransit, isDelivered, session }) => {

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
                                        <button className="p-3 ml-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95" onClick={() => orderDelivered(orderId)}>Mark Order as Delivered</button>
                                :
                                session.user.role === "admin" && <button className="p-3 ml-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95" onClick={() => orderInTransit(orderId)}>Mark Order as In Transit</button>
                            :
                            session.user.role === "admin" && <button className="p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95" onClick={() => confirmOrder(orderId)}>Confirm Order</button>
                    }
                </>
            </div>
        </div>
    )
}

export default OrderCardComponent