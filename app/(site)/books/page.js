import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookDisplayCard from "@/app/(components)/BookDisplayCard";

const fetchAllBooks = async () => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/all`);
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books: ", error);
    }
}

const fetchBooksByCategory = async (category) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/category?category=${category}`);
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const fetchBooksByType = async (type) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/type?type=${type}`);
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const page = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);

    const { type } = searchParams;
    const { category } = searchParams;

    let header = "All Books";
    let books;

    if (type !== undefined) {
        if (type === "recent") header = "Recent Additions";
        if (type === "most-purchased") header = "Most Purchased";

        books = await fetchBooksByType(type);
    } else if (category !== undefined) {
        header = `${category.charAt(0).toUpperCase() + category.slice(1)} Books`;

        books = await fetchBooksByCategory(category);
    } else {
        books = await fetchAllBooks();
    }

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <h1 className="mt-20 mb-10">{header}</h1>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-20">
                {
                    books.data.length > 0 ?
                        books.data.map((book) => (
                            <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} />
                        ))
                        :
                        <h1>No books for this category 😕</h1>
                }
            </section>
        </section>
    )
}

export default page