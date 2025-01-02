import { cloudinaryUpload } from "@/app/(functions)/cloudinaryUpload";
import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const json = await req.json();

        const { title, author, price, category, description, imageFile } = json.bookData;

        const priceAsNum = parseFloat(price);

        if (imageFile) {
            const imgURL = await cloudinaryUpload(imageFile, "bookly_uploads");

            if (imgURL) {
                const createdBook = await Book.create({
                    title, author, price: priceAsNum, category, description, image: imgURL
                })

                if (createdBook) {
                    console.log("Your book here: ", createdBook);
                    return NextResponse.json({ message: "Your book has been created successfully!" }, { status: 201 });
                }
            }
        } else {
            const createdBook = await Book.create({
                title, author, price: priceAsNum, category, description
            })

            if (createdBook) {
                console.log("Your book here: ", createdBook);
                return NextResponse.json({ message: "Your book has been created successfully!" }, { status: 201 });
            }
        }

    } catch (error) {
        console.log("this is the error guys: ", error);
        return NextResponse.json({ message: "Unable to create the book. Please ensure you're online and try again" }, { status: 500 });
    }
}