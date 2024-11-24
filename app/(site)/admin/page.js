import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";

import { getCustomerProfiles } from "@/app/(functions)/getCustomerProfiles";
import { getOrders } from "@/app/(functions)/getOrders";
import { getBooks } from "@/app/(functions)/getBooks";

import AddBookForm from "@/app/(components)/AddBookForm";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    const customers = await getCustomerProfiles();
    const orders = await getOrders();
    const books = await getBooks();

    return (
        <section className='font-[family-name:var(--font-inter)] m-10'>
            <h1>Welcome {session.user.firstName} 🤗</h1>
            <p className="mt-2 text-md text-slate-400">This is your admin dashboard. What would you like to do today?</p>

            <section className="mt-10 mb-20">
                <h3 className="m-3">Statistics</h3>
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300 h-[30vh] flex flex-col justify-between'>
                        <h1 className="text-7xl">{customers.data.length}</h1>
                        <div className="flex items-end justify-between">
                            <p className="font-medium tracking-wider text-slate-400">CUSTOMERS</p>
                            <Link className="inline-flex items-center justify-center p-2 text-white transition-all bg-blue-600 rounded-lg active:scale-95" href="/admin/customers">See all customers
                                <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300 h-[30vh] flex flex-col justify-between'>
                        <h1 className="text-7xl">{orders.data.length}</h1>
                        <div className="flex items-end justify-between">
                            <p className="font-medium tracking-wider text-slate-400">ORDERS</p>
                            <Link className="inline-flex items-center justify-center p-2 text-white transition-all bg-blue-600 rounded-lg active:scale-95" href="/admin/orders">See all orders
                                <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white shadow-lg rounded-lg p-5 border border-slate-300 h-[30vh] flex flex-col justify-between'>
                        <h1 className="text-7xl">{books.data.length}</h1>
                        <div className="flex items-end justify-between">
                            <p className="font-medium tracking-wider text-slate-400">BOOKS</p>
                            <Link className="inline-flex items-center justify-center p-2 text-white transition-all bg-blue-600 rounded-lg active:scale-95" href="/books">See all books
                                <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <AddBookForm />
        </section>
    )
}

export default page