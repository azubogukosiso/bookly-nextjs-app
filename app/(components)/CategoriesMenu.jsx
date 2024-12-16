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
            link: "/books?category=adventure",
            alt: "A hiker standing a hill and looking into the distance"
        },
        {
            text: "Humour",
            image: Humour,
            link: "/books?category=humour",
            alt: "A man with a laughing emoji for a face"
        },
        {
            text: "Romance",
            image: Romance,
            link: "/books?category=romance",
            alt: "A couple walking with an umbrella under the rain"
        },
        {
            text: "Horror",
            image: Horror,
            link: "/books?category=horror",
            alt: "A person dressed as ghost holding a pumpkin and a candle for Halloween"
        },
        {
            text: "Mystery",
            image: Mystery,
            link: "/books?category=mystery",
            alt: "An alien being beamed down from a spaceship"
        },
        {
            text: "Biography",
            image: Biography,
            link: "/books?category=biography",
            alt: "A woman interviewing a man in a podacast"
        },
        {
            text: "Autobiography",
            image: Autobiography,
            link: "/books?category=autobiography",
            alt: "A man typing on his laptop"
        },
        {
            text: "Motivational",
            image: Motivational,
            link: "/books?category=motivational",
            alt: "A superhero employee flying with a cape and a briefcase"
        }
    ]
    return (
        <div className="mb-20">
            <header className="flex flex-col w-3/4 mb-10 lg:flex-row">
                <h1 className="flex items-center flex-grow h-32">Categories</h1>
                <div className="bg-gray-500 w-[0.5px] mx-5"></div>
                <p className="flex items-center flex-grow h-32">We have diverse books for diverse readers! Narrow down your search to the categories you love the best.</p>
            </header>
            <section className="grid w-full grid-cols-1 gap-6 text-white lg:grid-cols-2">
                {
                    categoryProps.map((category, index) => <CategoryCard key={index} categoryText={category.text} categoryImg={category.image} categoryLink={category.link} categoryAltText={category.alt} />)
                }
            </section>
        </div>
    )
}

export default CategoriesMenu