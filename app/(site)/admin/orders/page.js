import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getOrders } from "@/app/(functions)/getOrders";

import OrderCardComponent from "@/app/(components)/OrderCardComponent";

const page = async () => {
    const session = await getServerSession(authOptions);

    const orders = await getOrders();

    console.log("RETURNED ORDERS: ", orders);

    return (
        <section className='font-[family-name:var(--font-inter)] m-10'>
            <h1 className="mt-20 mb-10">Orders</h1>
            <div className="grid w-full grid-cols-1 gap-6">
                {
                    orders.data.length > 0 ?
                        orders.data.map(order =>
                            <OrderCardComponent key={order._id} orderId={order._id} firstName={order.firstName} lastName={order.lastName} email={order.email} shippingAddress={order.shippingAddress} dateOrdered={order.dateOrdered} dateDelivered={order.dateDelivered} orderedBooks={order.orderedBooks} totalAmount={order.totalAmount} isConfirmed={order.isConfirmed} inTransit={order.inTransit} isDelivered={order.isDelivered} session={session} />
                        )
                        :
                        <h3>No orders made yet 😕</h3>
                }
            </div>
        </section>
    )
}

export default page