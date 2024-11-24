import { NextResponse } from "next/server";
import Order from "@/app/(models)/Order.model";

// VERIFY AN ORDER
export async function POST(req) {
    console.log("here we goooo!!!!");
    const json = await req.json();

    console.log("paystack verification: ", json);

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

                console.log("Here it is - the verification: ", data);

                if (data) return data;
            } catch (error) {
                console.log('Verification Error right here on the server:', error);
                return NextResponse.json({ message: "Error", error }, { status: 500 });
            }
        }

        const verification_data = await verifyTransaction();

        console.log("this is the json here: ", verification_data);

        if (verification_data) return NextResponse.json({ verification_data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}