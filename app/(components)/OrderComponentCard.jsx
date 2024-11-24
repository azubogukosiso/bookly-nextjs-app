"use client"

const OrderComponentCard = ({ firstName, lastName, email, shippingAddress, dateCreated }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300 flex justify-between'>
            <div className="w-1/2">
                <p><span className="font-bold font-sm">Full Name</span> <br />Lorem Ipsum</p>
                <p className="mt-3"><span className="font-bold">Email</span> <br />loremipsum@gmail.com</p>
                <p className="mt-3"><span className="font-bold">Shipping Address</span> <br />The Lorem Ipsum Complex</p>
                <p className="mt-3"><span className="font-bold">Date Purchased</span> <br />Sun 20 October 2024</p>
                <p className="mt-3"><span className="font-bold">Items Purchased</span> <br /></p>
            </div>
            <div className="flex flex-col">
                <button className="bg-blue-600 p-3 text-white rounded-lg">Confirm Order</button>
                <button className="bg-blue-600 p-3 text-white rounded-lg mt-3">Mark Order as &rdquo;in transit&rdquo;</button>
            </div>
        </div>
    )
}

export default OrderComponentCard