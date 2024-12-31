import NextAuth from "next-auth/next";
import User from "@/app/(models)/User.model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { checkUserDetails } from "@/app/(functions)/checkUserDetails";

export const authOptions = {
    providers: [
        {
            id: "google_customer",
            name: "google_customer",
            type: "oauth",
            wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            checks: ["pkce", "state"],
            async profile(profile) {
                try {
                    const user = await User.findOne({ email: profile.email, role: "customer" });

                    console.log("the user and the profile are here: ", user, profile);

                    if (user) {
                        return user;
                    } else {
                        const newUser = await User.create({
                            firstName: profile.given_name,
                            lastName: profile.family_name,
                            email: profile.email,
                            isGoogleAccount: true,
                            role: "customer",
                        });

                        if (newUser) return newUser;
                    }
                } catch (error) {
                    return { ...profile, error }
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        },

        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                if (!credentials.firstName && !credentials.lastName) { // IF SIGNING IN (I.E. NO FIRST NAME AND LAST NAME INPUTS)
                    const checkResponse = await checkUserDetails(credentials);

                    if (checkResponse.hasError && checkResponse.errObj) {
                        if (checkResponse.hasError === true) {
                            throw new Error(JSON.stringify(checkResponse.errObj));
                        }
                    } else return checkResponse;
                } else { // IF SIGNING UP (I.E. FIRST NAME AND LAST NAME INPUTS PRESENT)
                    const emailInSmallCaps = credentials.email.toLowerCase();
                    credentials.email = emailInSmallCaps;

                    const checkResponse = await checkUserDetails(credentials);

                    const { errObj, hasError } = checkResponse;

                    if (hasError) throw new Error(JSON.stringify(errObj));

                    const { firstName, lastName, email, password, shippingAddress } = credentials;

                    const salt = await bcrypt.genSalt();
                    const hashedPassword = await bcrypt.hash(password, salt);

                    const user = { firstName, lastName, email, hashedPassword, shippingAddress };

                    const createdUser = await User.create(user);

                    return createdUser;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // PASS USER'S ID, ROLE, FIRST NAME, LAST NAME, SHIPPING ADDR. AND ACCOUNT TYPE TO TOKEN OBJECT
            if (user) {
                return {
                    ...token,
                    id: user._id,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    shippingAddress: user.shippingAddress,
                    isGoogleAccount: user.isGoogleAccount
                };
            }

            if (trigger === "update") {
                return {
                    ...token,
                    firstName: session.firstName,
                    lastName: session.lastName,
                    email: session.email,
                    shippingAddress: session.shippingAddress,
                    isGoogleAccount: token.isGoogleAccount
                }
            }

            return token;
        },

        async session({ session, token }) {
            // PASS TOKEN'S ID, ROLE, FIRST NAME, LAST NAME, SHIPPING ADDR. AND ACCOUNT TYPE (PASSED IN FROM USER OBJECT ABOVE) TO SESSION
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    shippingAddress: token.shippingAddress,
                    isGoogleAccount: token.isGoogleAccount
                }
            };
        },

        async signIn({ user, account }) {
            const { error } = user; // DEFINED BY GOOGLE PROVIDER PROFILE CALLBACK            

            if (!error) return true; // USER IS GOOD TO GO

            if (account?.provider === "google_customer") {
                return `/signin?error=${error}`;
            }
        }
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
