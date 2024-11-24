import bcrypt from "bcrypt";
import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";
import { checkPwdStrength } from "@/app/(functions)/checkPwdStrength";

export async function PUT(req) {
    const json = await req.json();

    try {
        if (json.firstName) {
            const user = await User.findByIdAndUpdate(json.user_id, { firstName: json.firstName }, { new: true });

            if (user) return NextResponse.json({ message: "Your first name has been successfully updated!" }, { status: 201 });
        }

        if (json.lastName) {
            const user = await User.findByIdAndUpdate(json.user_id, { lastName: json.lastName }, { new: true });

            if (user) return NextResponse.json({ message: "Your last name has been successfully updated!" }, { status: 201 });
        }

        if (json.email) {
            const user = await User.findByIdAndUpdate(json.user_id, { email: json.email }, { new: true });

            if (user) return NextResponse.json({ message: "Your email has been successfully updated!" }, { status: 201 });
        }

        if (json.shippingAddress) {
            const user = await User.findByIdAndUpdate(json.user_id, { shippingAddress: json.shippingAddress }, { new: true });

            if (user) return NextResponse.json({ message: "Your shipping address has been successfully updated!" }, { status: 201 });
        }

        if (json.password) {
            const user = await User.findById(json.user_id);

            const isSamePwd = await bcrypt.compare(json.password.oldPassword, user.hashedPassword);

            if (isSamePwd) {
                const pwdCheckResponse = checkPwdStrength(json.password.newPassword);

                if (pwdCheckResponse !== true) {
                    return NextResponse.json({ message: pwdCheckResponse }, { status: 400 });
                } else {
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = await bcrypt.hash(json.password.newPassword, salt);

                    const user = await User.findByIdAndUpdate(json.user_id, { hashedPassword });

                    if (user) return NextResponse.json({ message: "Your password has been successfully updated!" }, { status: 201 });
                }
            } else {
                return NextResponse.json({ message: "Your old password is incorrect!" }, { status: 400 });
            }
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
