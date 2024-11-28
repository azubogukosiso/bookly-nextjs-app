import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import OrderComponentCard from "@/app/(components)/OrderComponentCard";

const fetchAllOrders = async () => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/order/get`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        console.log("Couldn't get orders: ", error);
    }
}

const fetchCustomerOrders = async (customerId) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/order/get/customer?id=${customerId}`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        console.log("Couldn't get orders: ", error);
    }
}

const page = async () => {
    const session = await getServerSession(authOptions);

    let orders;

    if (session.user.role === "admin") {
        orders = await fetchAllOrders();
    } else {
        orders = await fetchCustomerOrders(session.user.id);
    }
    console.log("RETURNED ORDERS: ", orders);

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <h1 className="mt-20 mb-10">Orders</h1>
            <section className="w-full mb-20">
                {
                    orders.data.length > 0 ?
                        orders.data.map(order =>
                            <OrderComponentCard key={order._id} firstName={order.firstName} lastName={order.lastName} email={order.email} shippingAddress={session.user.shippingAddress} dateOrdered={order.dateOrdered} dateDelivered={order.dateDelivered} orderedBooks={order.orderedBooks} totalAmount={order.totalAmount} isConfirmed={order.isConfirmed} inTransit={order.inTransit} isDelivered={order.isDelivered} session={session} />
                        )
                        :
                        <h3>No orders made yet 😕</h3>
                }
            </section>
        </section>
    )
}

export default page