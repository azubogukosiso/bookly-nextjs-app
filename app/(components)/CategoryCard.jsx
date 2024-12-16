import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ categoryText, categoryImg, categoryLink, categoryAltText }) => {
    return (
        <Link href={categoryLink} className="bg-blue-600 rounded-lg h-[50vh] p-5 flex flex-col justify-between">
            <Image src={categoryImg} alt={categoryAltText} className="w-full md:w-1/2 h-3/4 p-0" priority={false} />
            <div className="flex items-end justify-between">
                <p className="text-2xl">{categoryText}</p>

                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" /></svg>
            </div>
        </Link>
    )
}

export default CategoryCard