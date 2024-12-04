import { NextResponse } from "next/server";
import Order from "@/app/(models)/Order.model";

// EDIT ORDER DETAILS
export async function PATCH(req) {
    const json = await req.json();

    const orderId = req.nextUrl.searchParams.get("orderId");

    const { isConfirmed, inTransit, isDelivered } = json;

    try {
        if (isConfirmed) {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { isConfirmed }, { new: true });

            if (updatedOrder) return NextResponse.json({ data: "Order has been confirmed!" }, { status: 201 });
        }

        if (inTransit) {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { inTransit }, { new: true });

            if (updatedOrder) return NextResponse.json({ data: "Order has been marked as in transit!" }, { status: 201 });
        }

        if (isDelivered) {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { isDelivered, dateDelivered: Date.now() }, { new: true });

            if (updatedOrder) return NextResponse.json({ data: "Order has been marked as delivered!" }, { status: 201 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}