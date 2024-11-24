import Book from "@/app/(models)/Book.model";
import { NextResponse } from "next/server";

// GET A BOOK'S DETAILS
export async function GET(req) {
    const id = req.nextUrl.searchParams.get("id");
    const recommend = req.nextUrl.searchParams.get("recommend");

    try {
        const book = await Book.findById(id);

        if (book) {
            if (recommend) {
                const totalBooksOfCategory = await Book.find({ category: book.category });
                let recommendedBooks;

                if (totalBooksOfCategory.length > 3) {
                    recommendedBooks = await Book.aggregate([
                        {
                            $match: {
                                category: book.category, // SELECT DOCS WITH THE SPECIFIED CATEGORY
                                _id: { $ne: book._id } // EXCLUDE THE ORIGNIAL BOOK
                            }
                        },
                        { $sample: { size: 3 } } // GET ONLY 3 BOOKS
                    ]);
                } else {
                    recommendedBooks = await Book.aggregate([
                        {
                            $match: {
                                category: book.category, // SELECT DOCS WITH THE SPECIFIED CATEGORY
                                _id: { $ne: book._id } // EXCLUDE THE ORIGNIAL BOOK
                            }
                        }
                    ]);
                }

                if (recommendedBooks) {
                    const bookDetails = {
                        book, recommendedBooks
                    }

                    return NextResponse.json(
                        { data: bookDetails },
                        { status: 200 }
                    );
                }
            } else {
                return NextResponse.json(
                    { data: book },
                    { status: 200 }
                );
            }
        }

    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}