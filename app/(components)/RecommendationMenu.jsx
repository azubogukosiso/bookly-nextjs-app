import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookDisplayCard from "@/app/(components)/BookDisplayCard";

const RecommendationMenu = async ({ recommendedBooks, title }) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="mt-20 lg:mt-0 mb-20">
            <h1 className="mb-3 text-3xl">Since you checked out <i className="font-normal">{title} ...</i></h1>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {
                    recommendedBooks && recommendedBooks.length > 0 ?
                        recommendedBooks.map((book) => (
                            <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} />
                        ))
                        :
                        <p className="text-xl">No recommendations for this category yet 😕</p>
                }
            </section>
        </div>
    )
}

export default RecommendationMenu