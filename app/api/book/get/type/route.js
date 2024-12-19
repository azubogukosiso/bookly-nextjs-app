import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

// GET BOOKS BY TYPE
export async function GET(req) {
    const type = req.nextUrl.searchParams.get("type");

    if (type === "recent") {
        try {
            const books = await Book.find().sort({ createdAt: -1 });

            return NextResponse.json(
                { data: books },
                { status: 200 }
            );
        } catch (err) {
            return NextResponse.json(
                { message: "Error", err },
                { status: 400 }
            );
        }
    }

    if (type === "most-purchased") {
        try {
            const books = await Book.find();

            return NextResponse.json(
                { data: books },
                { status: 200 }
            );
        } catch (err) {
            return NextResponse.json(
                { message: "Error", err },
                { status: 400 }
            );
        }
    }

}