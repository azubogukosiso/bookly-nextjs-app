import { cloudinaryUpload } from "@/app/(functions)/cloudinaryUpload";
import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const json = await req.json();

        console.log("json here: ", json);

        const { title, author, price, category, description, imageFile } = json.bookData;

        const priceAsNum = parseFloat(price);

        const imgURL = await cloudinaryUpload(imageFile, "bookly_uploads");

        console.log("the image's url: ", imgURL);

        const createdBook = await Book.create({
            title, author, price: priceAsNum, category, description, image: imgURL
        })

        if (createdBook) {
            console.log("Your book here: ", createdBook);
            return NextResponse.json({ message: "Your book has been created successfully!" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}