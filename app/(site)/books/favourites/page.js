import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookDisplayCard from "@/app/(components)/BookDisplayCard";

const fetchFavouriteBooks = async (user_id) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/favourites?userId=${user_id}`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const page = async () => {
    const session = await getServerSession(authOptions);

    const { data } = await fetchFavouriteBooks(session.user.id);

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <header className="flex w-3/4 flex-col lg:flex-row my-20">
                <h1 className="flex items-center h-32 w-[20%]">Your Favourites</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center h-32 w-[80%]">Here are a list of your favourite reads. Enjoy! 😊</p>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-20">
                {
                    data.length > 0 ?
                        data.map((book) => (
                            <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} isFavourite={true} />
                        ))
                        :
                        <h1>No Favourites added! 😕</h1>
                }
            </section>
        </section>
    )
}

export default page