import { NextResponse } from "next/server";

// PLACE AN ORDER
export async function POST(req) {

    try {
        const json = await req.json();

        const { customerId, email, totalAmount, orderedBooks, firstName, lastName } = json;

        const params = {
            email,
            amount: Math.round(parseFloat(totalAmount * 100)),
            callback_url: "http://localhost:3000",
            metadata: {
                customerId,
                firstName,
                lastName,
                orderedBooks,
                "cancel_action": "http://localhost:3000",
            }
        };

        async function initializeTransaction() {
            try {
                const response = await fetch('https://api.paystack.co/transaction/initialize', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                });

                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

                const data = await response.json();

                if (data) return data;
            } catch (error) {
                return error;
            }
        }

        const transaction_data = await initializeTransaction();

        if (transaction_data) return NextResponse.json({ transaction_data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}