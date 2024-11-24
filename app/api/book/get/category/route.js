import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

// GET BOOKS BY CATEGORY
export async function GET(req) {
    const category = req.nextUrl.searchParams.get("category");

    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    console.log("category here!", categoryCapitalized);

    try {
        const books = await Book.find({ category: categoryCapitalized });

        console.log("books here: ", books);

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