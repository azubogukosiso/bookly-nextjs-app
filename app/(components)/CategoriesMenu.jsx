import CategoryCard from "@/app/(components)/CategoryCard";
import Adventure from "@/public/images/Hiking 2.svg";
import Humour from "@/public/images/Happy Face.svg";
import Romance from "@/public/images/Couple.svg";
import Horror from "@/public/images/Halloween.svg";
import Mystery from "@/public/images/Alien 1.svg";
import Biography from "@/public/images/Podcaster.svg";
import Autobiography from "@/public/images/Laptop.svg";
import Motivational from "@/public/images/Hero Employee.svg";

const CategoriesMenu = () => {
    const categoryProps = [
        {
            text: "Adventure",
            image: Adventure,
            link: "/books?category=adventure"
        },
        {
            text: "Humour",
            image: Humour,
            link: "/books?category=humour"
        },
        {
            text: "Romance",
            image: Romance,
            link: "/books?category=romance"
        },
        {
            text: "Horror",
            image: Horror,
            link: "/books?category=horror"
        },
        {
            text: "Mystery",
            image: Mystery,
            link: "/books?category=mystery"
        },
        {
            text: "Biography",
            image: Biography,
            link: "/books?category=biography"
        },
        {
            text: "Autobiography",
            image: Autobiography,
            link: "/books?category=autobiography"
        },
        {
            text: "Motivational",
            image: Motivational,
            link: "/books?category=motivational"
        }
    ]
    return (
        <div className="mb-20">
            <header className="flex flex-col w-3/4 mb-10 lg:flex-row">
                <h1 className="flex items-center flex-grow h-32">Categories</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center flex-grow h-32">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, autem aut debitis aliquid exercitationem, voluptatem repellat ipsum.</p>
            </header>
            <section className="grid w-full grid-cols-1 gap-6 text-white lg:grid-cols-2">
                {
                    categoryProps.map((category, index) => <CategoryCard key={index} categoryText={category.text} categoryImg={category.image} categoryLink={category.link} />)
                }
            </section>
        </div>
    )
}

export default CategoriesMenu