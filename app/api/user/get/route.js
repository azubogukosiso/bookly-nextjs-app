import { NextResponse } from "next/server";
import User from "@/app/(models)/User.model";

// GET ALL CUSTOMER PROFILES
export async function GET() {
    try {
        const customers = await User.find({ role: "customer" });

        if (customers) return NextResponse.json({ data: customers }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}