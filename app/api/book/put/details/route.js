import { cloudinaryUpload } from "@/app/(functions)/cloudinaryUpload";
import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

// GET A BOOK'S DETAILS
export async function PUT(req) {
    const json = await req.json();

    console.log("this is the book data: ", json.bookData);

    try {
        // if ()
        const imgURL = await cloudinaryUpload(json.bookData.imageFile, "bookly_uploads");

        json.bookData.image = imgURL;

        const book = await Book.findByIdAndUpdate(json.bookData.id, json.bookData, { new: true });

        if (book) return NextResponse.json(
            { message: "Details updated successfully!" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}
