import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getOrders } from "@/app/(functions)/getOrders";

import OrderCardComponent from "@/app/(components)/OrderCardComponent";

const page = async () => {
    const session = await getServerSession(authOptions);

    const { data } = await getOrders(session.user.id);

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <h1 className="mt-20 mb-10">Orders</h1>
            <section className="w-full mb-20">
                {
                    data?.length > 0 ?
                        data.map(order =>
                            <OrderCardComponent key={order._id} orderId={order._id} firstName={order.firstName} lastName={order.lastName} email={order.email} shippingAddress={session.user.shippingAddress} dateOrdered={order.dateOrdered} dateDelivered={order.dateDelivered} orderedBooks={order.orderedBooks} totalAmount={order.totalAmount} isConfirmed={order.isConfirmed} inTransit={order.inTransit} isDelivered={order.isDelivered} session={session} />
                        )
                        :
                        <h3>No orders made yet 😕</h3>
                }
            </section>
        </section>
    )
}

export default page