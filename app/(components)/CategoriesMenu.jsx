import CategoryCard from "@/app/(components)/CategoryCard";
import Test from "@/public/images/School.svg";

const CategoriesMenu = () => {
    return (
        <div className="mb-20">
            <header className="flex w-3/4 flex-col lg:flex-row mb-10">
                <h1 className="flex items-center h-32 flex-grow">Categories</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center h-32 flex-grow">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, autem aut debitis aliquid exercitationem, voluptatem repellat ipsum.</p>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full text-white">
                <CategoryCard categoryText={"Adventure"} categoryImg={Test} categoryLink={"/books?category=adventure"} />

                <CategoryCard categoryText={"Humour"} categoryImg={Test} categoryLink={"/books?category=humour"} />

                <CategoryCard categoryText={"Romance"} categoryImg={Test} categoryLink={"/books?category=romance"} />

                <CategoryCard categoryText={"Horror"} categoryImg={Test} categoryLink={"/books?category=horror"} />

                <CategoryCard categoryText={"Mystery"} categoryImg={Test} categoryLink={"/books?category=mystery"} />

                <CategoryCard categoryText={"Biography"} categoryImg={Test} categoryLink={"/books?category=biography"} />

                <CategoryCard categoryText={"Autobiography"} categoryImg={Test} categoryLink={"/books?category=autobiography"} />

                <CategoryCard categoryText={"Motivational"} categoryImg={Test} categoryLink={"/books?category=motivational"} />
            </section>
        </div>
    )
}

export default CategoriesMenu