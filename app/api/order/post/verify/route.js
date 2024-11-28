import { NextResponse } from "next/server";
import Order from "@/app/(models)/Order.model";

// VERIFY AN ORDER
export async function POST(req) {
    const json = await req.json();

    try {
        async function verifyTransaction() {
            try {
                const response = await fetch(`https://api.paystack.co/transaction/verify/${json.reference}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (data) return data;
            } catch (error) {
                return NextResponse.json({ message: "Error", error }, { status: 500 });
            }
        }

        const verification_data = await verifyTransaction();

        const email = verification_data.data.customer.email;

        const totalAmount = verification_data.data.amount / 100;

        const { customerId, firstName, lastName, orderedBooks } = verification_data.data.metadata;

        const order = await Order.create({ customerId, email, totalAmount, firstName, lastName, orderedBooks });

        if (order) {
            return NextResponse.json({ order }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}