import { NextResponse } from "next/server";
import Order from "@/app/(models)/Order.model";

// GET ALL ORDERS
export async function GET(req) {
    const id = req.nextUrl.searchParams.get("id");

    console.log("THE ID: ", id);

    try {
        const orders = await Order.find({ customerId: id });

        console.log("CUS ORDERS: ", orders);

        if (orders) return NextResponse.json({ data: orders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}