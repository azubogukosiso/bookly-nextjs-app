import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import SignUp from "@/app/(components)/SignUp";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        if (session.user.role = "admin") {
            redirect("/admin");
        } else {
            redirect("/");
        }
    }

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <SignUp />
        </section>
    )
}

export default page