import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookDisplayCard from "@/app/(components)/BookDisplayCard";
import Link from "next/link";

const fetchBooks = async () => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/type?type=most-purchased`);
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const BookMenu = async () => {
    const session = await getServerSession(authOptions);

    const { data } = await fetchBooks();
    const firstFiveBooks = data.slice(0, 5);

    return (
        <div className="mb-20">
            <header className="flex flex-col w-3/4 mb-10 lg:flex-row">
                <h1 className="flex items-center flex-grow h-32">Most Purchased</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center flex-grow h-32">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, autem aut debitis aliquid exercitationem, voluptatem repellat ipsum.</p>
            </header>
            <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
                {
                    firstFiveBooks.map((book) => (
                        <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} />
                    ))
                }
                <div className="p-1 border-2 border-gray-300 rounded-xl">
                    <Link href="/books?type=most-purchased" className="h-[50vh] flex justify-center items-center hover:bg-gray-300 transition-all rounded-lg">
                        See more
                        <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default BookMenu
