import OrderComponentCard from "@/app/(components)/OrderComponentCard";

const page = () => {
    return (
        <section className='font-[family-name:var(--font-inter)] m-10'>
            <section>
                <h3 className="m-3">Customer Profiles</h3>
            </section>
            <div className="grid w-full grid-cols-1 gap-6">
                <OrderComponentCard />
            </div>
        </section>
    )
}

export default page