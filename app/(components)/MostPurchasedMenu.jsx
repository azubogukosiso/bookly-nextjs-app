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

    return (
        <div className="mb-40">
            <header className="flex flex-col w-3/4 mb-10 lg:flex-row">
                <h1 className="flex items-center flex-grow h-32">Most Purchased</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center flex-grow h-32">Here&apos;s a collection of the most loved and most and purchased books on the platform - because we care about your convenience 😊</p>
            </header>
            <>
                {
                    data?.length > 0 ?
                        <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
                            {
                                data.map((book) => (
                                    <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} />
                                ))
                            }
                        </section>
                        :
                        <p className="text-slate-700 font-bold text-center bg-slate-200 rounded-lg p-10">No books available at the moment! 🙁 <br /> Make sure you have a strong internet connection or check in again some other time.</p>
                }
            </>
        </div>
    )
}

export default BookMenu
