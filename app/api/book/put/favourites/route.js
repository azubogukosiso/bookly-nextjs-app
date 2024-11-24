import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";

// REMOVE FAVOURITES OF A USER
export async function PUT(req) {
    const json = await req.json();

    try {
        const user = await User.findById(json.user_id);

        const newFavBooks = user.favBooks.filter(favourite => favourite._id !== json.book._id);

        const updatedUser = await User.findByIdAndUpdate(json.user_id, { favBooks: newFavBooks }, { new: true });

        if (updatedUser) return NextResponse.json(
            { data: "Removed from favourites!" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}