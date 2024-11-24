import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    const bookId = req.nextUrl.searchParams.get("id");

    console.log("the book id: ", bookId);

    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (deletedBook) return NextResponse.json(
            { message: "Book deleted successfully!" },
            { status: 201 }
        );
    } catch (err) {
        console.log("this is the error: ", err);
        return NextResponse.json(
            { message: err },
            { status: 400 }
        );
    }
}
