'use client';

import { useState } from "react";

import { hyphenateTitle } from "@/app/(functions)/hyphenateTitle";
import { useCartContext } from "@/app/hooks/useCartContext";
import { addToCart } from '@/app/(functions)/addToCart';
import { addToFavourites } from "@/app/(functions)/addToFavourites";
import { removeFromFavourites } from "@/app/(functions)/removeFromFavourites";
import { deleteBook } from "@/app/(functions)/deleteBook";

import Image from "next/image";
import Link from "next/link";
import Test from "@/public/images/my CV.png";

const BookDisplayCard = ({ title, price, image, id, bookDetails, session, isFavourite }) => {
    const [isLoadingRemoveFromFavourites, setIsLoadingRemoveFromFavourites] = useState(false);
    const [isLoadingAddToFavourites, setIsLoadingAddToFavourites] = useState(false);
    const [isLoadingDeleteBook, setIsLoadingDeleteBook] = useState(false);

    const { booksInCart, dispatch } = useCartContext();

    return (
        <div className="p-1 border-2 border-gray-300 rounded-xl">
            <figure className="h-[50vh] relative overflow-hidden rounded-lg group">
                <Image src={!image ? Test : image} className="relative" alt="test image" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover" }} />

                <div className="absolute flex flex-col items-start justify-between w-full h-full p-5 transition-opacity opacity-0 pointer-events-none bg-gray-300/40 backdrop-blur-sm backdrop-brightness-50 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <div>
                        <h1 className="text-3xl text-white">{title}</h1>
                        <p className="text-xl text-white">${price}</p>
                    </div>
                    <div className="flex flex-col justify-between w-full lg:flex-row">
                        <div></div>
                        <div className="flex items-center justify-end">

                            {/* VIEW MORE DETAILS BTN */}
                            <Link href={`/books/details/${hyphenateTitle(title)}?id=${id}`}
                                className="p-4 ml-2 text-center text-white transition-all bg-blue-600 rounded-lg active:scale-90 tooltip tooltip-left" data-tip="More Details">
                                <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" /></svg>
                            </Link>

                            {
                                session?.user.role === "customer" &&
                                <>
                                    {/* ADD TO CART BTN */}
                                    <button className="p-4 ml-2 text-white transition-all bg-blue-600 rounded-lg active:scale-90 tooltip" data-tip="Add to Cart" onClick={() => addToCart(bookDetails, booksInCart, dispatch)}><svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" /></svg></button>

                                    {/* ADD TO FAVOURITES BTN */}
                                    {
                                        isFavourite ?
                                            <button className={`p-4 ml-2 text-white transition-all bg-blue-600 rounded-lg active:scale-90 ${isLoadingRemoveFromFavourites ? "opacity-75 cursor-not-allowed" : "tooltip tooltip-left"}`} data-tip="Remove from Favourites" onClick={() => removeFromFavourites(bookDetails, session.user.id, setIsLoadingRemoveFromFavourites)} disabled={isLoadingRemoveFromFavourites}>
                                                {
                                                    isLoadingRemoveFromFavourites ?
                                                        <svg aria-hidden="true" width="23" height="23" className="text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        :
                                                        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" /></svg>
                                                }
                                            </button>
                                            :
                                            <button className={`p-4 ml-2 text-white transition-all bg-blue-600 rounded-lg active:scale-90 ${isLoadingAddToFavourites ? "opacity-75 cursor-not-allowed" : "tooltip tooltip-left"}`} data-tip="Add to Favourites" onClick={() => addToFavourites(bookDetails, session.user.id, setIsLoadingAddToFavourites)} disabled={isLoadingAddToFavourites}>
                                                {
                                                    isLoadingAddToFavourites ?
                                                        <svg aria-hidden="true" width="23" height="23" className="text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        :
                                                        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z" /></svg>
                                                }
                                            </button>
                                    }
                                </>
                            }

                            {
                                session?.user.role === "admin" &&
                                <>
                                    {/* EDIT BOOK DETAILS BTN */}
                                    <Link href={`/admin/edit?id=${id}`}
                                        className="p-4 ml-2 text-center text-white transition-all bg-blue-600 rounded-lg active:scale-90 tooltip" data-tip="Edit Book Details">
                                        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" /></svg>
                                    </Link>

                                    {/* DELETE BOOK BTN */}
                                    <button className={`p-4 ml-2 text-white transition-all bg-blue-600 rounded-lg active:scale-90 tooltip tooltip-left ${isLoadingDeleteBook && "opacity-75 cursor-not-allowed"}`} data-tip="Delete Book" onClick={() => deleteBook(bookDetails._id, setIsLoadingDeleteBook)} disabled={isLoadingDeleteBook}>
                                        {
                                            isLoadingDeleteBook ?
                                                <svg aria-hidden="true" width="23" height="23" className="text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                :
                                                <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z" /></svg>
                                        }
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default BookDisplayCard