import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import BookDetailDisplay from "@/app/(components)/BookDetailDisplay";
import RecommendationMenu from "@/app/(components)/RecommendationMenu";

const fetchBookDetails = async (id) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/details?id=${id}&recommend=true`, { cache: 'no-store' });
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const page = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);

    const { id } = searchParams;

    const { data } = await fetchBookDetails(id);

    console.log("this is it: ", data);

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <BookDetailDisplay book={data?.book} session={session} />
            <RecommendationMenu recommendedBooks={data?.recommendedBooks} title={data?.book?.title} />
        </section>
    )
}

export default page