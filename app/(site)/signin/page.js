import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import SignIn from "@/app/(components)/SignIn";

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
            <SignIn />
        </section>
    )
}

export default page