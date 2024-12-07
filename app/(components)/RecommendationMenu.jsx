import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookDisplayCard from "@/app/(components)/BookDisplayCard";

const RecommendationMenu = async ({ recommendedBooks, title }) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="mt-20 mb-20 lg:mt-0">
            <h1 className="mb-3 text-3xl">Since you checked out <i className="font-normal">{title} ...</i></h1>
            {
                recommendedBooks && recommendedBooks.length > 0 ?
                    <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
                        {

                            recommendedBooks.map((book) => (
                                <BookDisplayCard key={book._id} title={book.title} price={book.price} image={book.image} id={book._id} bookDetails={book} session={session} />
                            ))
                        }
                    </section>
                    :
                    <p className="text-xl">No recommendations for this category yet 😕</p>
            }

        </div>
    )
}

export default RecommendationMenu