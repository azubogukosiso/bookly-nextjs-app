import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { base64ToBlob } from "@/app/(functions)/base64ToBlob";

import EditBookForm from "@/app/(components)/EditBookForm";

const fetchBookDetails = async (id) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/book/get/details?id=${id}`);
        return res.json();
    } catch (error) {
        console.log("Couldn't get the books - ", error);
    }
}

const page = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);

    const { id } = searchParams;

    const { data } = await fetchBookDetails(id);

    console.log("the data: ", data);

    return (
        <section className="font-[family-name:var(--font-inter)] mx-10">
            <EditBookForm book={data} session={session} />
        </section>
    )
};

export default page;