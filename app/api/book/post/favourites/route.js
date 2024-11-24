import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";

// ADD A BOOK TO FAVOURITES
export async function POST(req) {
    const json = await req.json();
    try {
        const user = await User.findById(json.user_id);

        if (user.favBooks.length < 1) {
            const updatedBooks = await User.findByIdAndUpdate(json.user_id,
                { $push: { favBooks: json.book } },
                { new: true }
            );

            if (updatedBooks) return NextResponse.json(
                { data: "Added to favourites!" },
                { status: 201 }
            );
        } else {
            let isFavourite = false;
            user.favBooks.map(favourite => {
                if (favourite._id === json.book._id) {
                    isFavourite = true;
                    return;
                }
            })

            if (!isFavourite) {
                const updatedBooks = await User.findByIdAndUpdate(json.user_id,
                    { $push: { favBooks: json.book } },
                    { new: true }
                );

                if (updatedBooks) return NextResponse.json(
                    { data: "Added to favourites!" },
                    { status: 201 }
                );
            } else {
                return NextResponse.json(
                    { data: "Already a favourite!" },
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