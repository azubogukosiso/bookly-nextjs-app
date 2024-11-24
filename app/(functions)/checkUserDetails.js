import User from "@/app/(models)/User.model";
import { checkPwdStrength } from "@/app/(functions)/checkPwdStrength";
import bcrypt from 'bcrypt';

export const checkUserDetails = async (credentials) => {
    let hasError = false;
    const errObj = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    if (!credentials.firstName && !credentials.lastName) {
        if (!credentials.email) {
            errObj.email = "Please input your email address.";
            hasError = true;
        }

        if (!credentials.password) {
            errObj.password = "Please input your password.";
            hasError = true;
        }

        const userDetails = await User.findOne({ email: credentials.email });

        if (!userDetails) {
            errObj.email = "No user with this email address exists.";
            hasError = true;
        } else {
            if (userDetails.isGoogleAccount === true) {
                errObj.email = "This email belongs to a Google account. Please sign in using Google.";
                hasError = true;
            } else {
                const pwdMatch = await bcrypt.compare(credentials.password, userDetails.hashedPassword);

                if (!pwdMatch) {
                    errObj.password = "The password your provided is incorrect.";
                    hasError = true;
                } else {
                    return userDetails;
                }
            }
        }
    } else {
        if (!credentials.firstName) {
            errObj.firstName = "Please input your first name.";
            hasError = true;
        }

        if (!credentials.lastName) {
            errObj.lastName = "Please input your last name.";
            hasError = true;
        }

        if (!credentials.email) {
            errObj.email = "Please input your email address.";
            hasError = true;
        }

        if (!credentials.password) {
            errObj.password = "Please input your password.";
            hasError = true;
        } else {
            const pwdCheckResponse = checkPwdStrength(credentials.password);

            if (pwdCheckResponse !== true) {
                errObj.password = pwdCheckResponse;
                hasError = true;
            }
        }

        const emailExists = await User.findOne({ email: credentials.email });
        if (emailExists) {
            errObj.email = "This email address is already in use. Please use another.";
            hasError = true;
        }
    }

    return { errObj, hasError };
}
