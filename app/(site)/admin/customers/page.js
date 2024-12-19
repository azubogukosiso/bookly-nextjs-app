import CustomerProfileCard from "@/app/(components)/CustomerProfileCard";
import { getCustomerProfiles } from "@/app/(functions)/getCustomerProfiles";

const page = async () => {
    const { data } = await getCustomerProfiles();

    return (
        <section className='font-[family-name:var(--font-inter)] m-10'>
            <section>
                <h1 className="my-10">Customer Profiles</h1>
            </section>
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
                {
                    data ? data.map(profile => <CustomerProfileCard key={profile._id} firstName={profile.firstName} lastName={profile.lastName} email={profile.email} shippingAddress={profile.shippingAddress} dateCreated={profile.createdAt} />)
                        : <h3 className="text-center">No customers yet.</h3>
                }
            </div>
        </section>
    )
}

export default page