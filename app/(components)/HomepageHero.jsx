'use client'

import toast from 'react-hot-toast';
import Test from "@/public/images/Book Lover.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';

const HomepageHero = ({ loginMsg, verificationMsg, session }) => {

    useEffect(() => {
        if (loginMsg) toast.success(loginMsg, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });

        if (verificationMsg) {
            console.log("this is it");
            toast.success(verificationMsg, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }
    }, [loginMsg, verificationMsg]);

    return (
        <div className="hero min-h-screen font-[family-name:var(--font-inter)] mt-14 lg:mt-0">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:w-[45%] text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Hey there 😉 ...this is <span className="font-[family-name:var(--font-pacifico)]">Bookly</span></h1>
                    <p className="py-4">
                        <span className="font-[family-name:var(--font-pacifico)] text-lg">Bookly</span> is a trusted collection of best sellers all over the world. Browse through our massive repository for any books of your choice, across all genres.
                    </p>
                    <Link href="/books" className="p-3 active:scale-95 transition-all rounded-lg bg-blue-600 text-white inline-flex items-center justify-center">Browse our collection
                        <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                    </Link>
                    {
                        !session &&
                        <p className="py-6">🤭 Pssst! We noticed you&apos;re not signed in. <Link href="/signin" className="underline underline-offset-2">Sign in here</Link> or <Link href="/signup" className="underline underline-offset-2">create a new account here</Link></p>
                    }
                </div>
                <Image className="w-full lg:w-[35%]" src={Test} alt="A man sitting on top of books and reading a book" />
            </div>
        </div>
    )
}

export default HomepageHero