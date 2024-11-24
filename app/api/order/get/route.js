import { NextResponse } from "next/server";
import Order from "@/app/(models)/Order.model";

// GET ALL ORDERS
export async function GET() {
    try {
        const orders = await Order.find();

        if (orders) return NextResponse.json({ data: orders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}