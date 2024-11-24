import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";

// GET FAVOURITES OF A USER
export async function GET(req) {
    const user_id = req.nextUrl.searchParams.get("userId");
    console.log("user id here!", user_id);

    try {
        const favourites = await User.findById(user_id, 'favBooks -_id'); // RETRIEVE ONLY THE FAVOURITES ARRAY AND EXCLUDE ID FIELD        

        return NextResponse.json(
            { data: favourites.favBooks },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}