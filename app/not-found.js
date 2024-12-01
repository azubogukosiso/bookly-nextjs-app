import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Image from "next/image";
import Link from "next/link";
import NotFoundSVG from "@/public/images/404 Page Not Found 1.svg";

export default async function NotFound() {
    const session = await getServerSession(authOptions);

    return (
        <section className="font-[family-name:var(--font-inter)] m-20 flex items-center justify-center">
            <figure className="relative overflow-hidden">
                <Image src={NotFoundSVG} className="relative w-full h-3/4" alt="A pair of hands popping out of hole with a '404 PAGE NOT FOUND' sign" style={{ objectFit: "cover" }} />
            </figure>
            <div className="ml-10">
                <p className="text-lg">Oops! Looks like the page you&apos;re looking for does not exist.</p>
                <div className="mt-3">
                    <Link href={`${session.user.role === "admin" ? "/admin" : "/"}`} className="inline-block p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95">Go back home</Link>
                    <Link href="/books" className="inline-block p-3 mt-3 ml-0 text-white transition-all bg-blue-600 rounded-lg md:ml-3 md:mt-0 active:scale-95">Check out our catalogue of books</Link>
                </div>
            </div>
        </section>
    )
}
