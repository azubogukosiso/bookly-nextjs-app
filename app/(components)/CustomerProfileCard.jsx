const CustomerProfileCard = ({ firstName, lastName, email, shippingAddress, dateCreated }) => {
    return (
        <div className='p-5 bg-white border rounded-lg shadow-lg border-slate-300'>
            <p><span className="font-bold font-sm">Full Name</span> <br />{firstName} {lastName}</p>
            <p className="mt-3"><span className="font-bold">Email</span> <br />{email}</p>
            <p className="mt-3"><span className="font-bold">Shipping Address</span> <br />{shippingAddress ? shippingAddress : "Not yet provided"}</p>
            <p className="mt-3"><span className="font-bold">Date Created</span> <br />{new Date(dateCreated).toDateString()}</p>
        </div>
    )
}

export default CustomerProfileCard