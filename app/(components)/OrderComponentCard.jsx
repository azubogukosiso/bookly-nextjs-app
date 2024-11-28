"use client"

const OrderComponentCard = ({ firstName, lastName, email, shippingAddress, dateOrdered, dateDelivered, orderedBooks, totalAmount, isConfirmed, inTransit, isDelivered, session }) => {

    return (
        <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300'>
            <p><span className="font-bold font-sm">Full Name</span> <br />{firstName} {lastName}</p>
            <p className="mt-3"><span className="font-bold">Email</span> <br />{email}</p>
            <p className="mt-3"><span className="font-bold">Shipping Address</span> <br />{shippingAddress}</p>
            <p className="mt-3"><span className="font-bold">Date Ordered</span> <br />{new Date(dateOrdered).toDateString()}</p>
            <p className="mt-3"><span className="font-bold">Date Delivered</span> <br />{dateDelivered ? dateDelivered : "Not yet delivered"}</p>
            <div className="mt-3">
                <p className="font-bold">Books Ordered</p>
                <ul className="ml-5">
                    {
                        orderedBooks.map((orderedBook, index) => (
                            <li key={orderedBook._id} className={`text-sm list-disc ${orderedBooks.length - 1 !== index && "mb-1"}`}>{orderedBook.title} - {orderedBook.qty} {parseInt(orderedBook.qty) > 1 ? "copies" : "copy"} @ ${orderedBook.price} each</li>
                        ))
                    }
                </ul>
            </div>
            <p className="mt-3"><span className="font-bold">Total Amount</span> <br />${totalAmount}</p>
            <div className="mt-3 p-3 rounded-md bg-blue-200 border-l-4 border-blue-600">
                {
                    isConfirmed ?
                        inTransit ? <p className="text-sm text-blue-600 flex">
                            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                            This order is in transit. Please exercise some patience.
                        </p>
                            :
                            <p className="text-sm text-blue-600 flex">
                                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                                This order has been confirmed by the admins and will soon be in transit. Please exercise some patience.
                            </p>
                        :
                        <p className="text-sm text-blue-600 flex">
                            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" /></svg>
                            This order is yet to be confirmed by the admins. Please exercise some patience.
                        </p>
                }
                {

                }
            </div>
            <div className="mt-3 flex justify-end">
                {session.user.role === "admin" &&
                    <>
                        <button className="bg-blue-600 p-3 text-white rounded-lg">Confirm Order</button>
                        <button className="bg-blue-600 p-3 text-white rounded-lg ml-3">Mark Order as In Transit</button>
                    </>
                }
                <button className="bg-blue-600 p-3 text-white rounded-lg ml-3" disabled={isDelivered}>Mark Order as Delivered</button>
            </div>
        </div>
    )
}

export default OrderComponentCard