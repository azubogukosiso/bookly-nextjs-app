const CustomerProfileCard = ({ firstName, lastName, email, shippingAddress, dateCreated }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300'>
            <p><span className="font-bold font-sm">Full Name</span> <br />{firstName} {lastName}</p>
            <p className="mt-3"><span className="font-bold">Email</span> <br />{email}</p>
            <p className="mt-3"><span className="font-bold">Shipping Address</span> <br />{shippingAddress}</p>
            <p className="mt-3"><span className="font-bold">Date Created</span> <br />{new Date(dateCreated).toDateString()}</p>
        </div>
    )
}

export default CustomerProfileCard